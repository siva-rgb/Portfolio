from datetime import datetime, timedelta
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import Visit
from app.schemas import (
    AnalyticsDeviceRow,
    AnalyticsGeoRow,
    AnalyticsSummary,
    DailyCount,
    NamedCount,
)

router = APIRouter(prefix="/api/admin/analytics", tags=["analytics"], dependencies=[Depends(get_current_admin)])


def _range_start(days: int) -> Optional[datetime]:
    if days <= 0:
        return None
    return datetime.utcnow() - timedelta(days=days)


def _visit_time_filter(q, days: int):
    start = _range_start(days)
    if start is not None:
        return q.filter(Visit.created_at >= start)
    return q


@router.get("/summary", response_model=AnalyticsSummary)
def analytics_summary(
    db: Annotated[Session, Depends(get_db)],
    days: int = Query(30, ge=0, le=3650),
):
    start = _range_start(days)

    q_visits = _visit_time_filter(db.query(Visit), days)
    total_visits = q_visits.count()

    uq = db.query(func.count(func.distinct(Visit.session_id))).select_from(Visit)
    if start is not None:
        uq = uq.filter(Visit.created_at >= start)
    unique_visitors = int(uq.scalar() or 0)

    first_sub = (
        db.query(Visit.session_id, func.min(Visit.created_at).label("first_at"))
        .group_by(Visit.session_id)
        .subquery()
    )
    nq = db.query(func.count()).select_from(first_sub)
    if start is not None:
        nq = nq.filter(first_sub.c.first_at >= start)
    new_in_period = int(nq.scalar() or 0)

    returning_pct = 0.0
    if unique_visitors > 0:
        returning_pct = round(max(0, unique_visitors - new_in_period) / unique_visitors * 100, 1)

    return AnalyticsSummary(
        total_visits=total_visits,
        unique_visitors=unique_visitors,
        new_visitors_period=new_in_period,
        returning_percent=returning_pct,
    )


@router.get("/daily", response_model=list[DailyCount])
def analytics_daily(
    db: Annotated[Session, Depends(get_db)],
    days: int = Query(30, ge=1, le=365),
):
    start = _range_start(days)
    q = db.query(
        func.date(Visit.created_at).label("d"),
        func.count(Visit.id).label("c"),
    ).group_by(func.date(Visit.created_at))
    if start is not None:
        q = q.filter(Visit.created_at >= start)
    rows = q.order_by(func.date(Visit.created_at).asc()).all()
    return [DailyCount(date=str(r.d), visits=int(r.c)) for r in rows]


@router.get("/geo", response_model=list[AnalyticsGeoRow])
def analytics_geo(
    db: Annotated[Session, Depends(get_db)],
    days: int = Query(30, ge=0, le=3650),
    limit: int = Query(20, ge=1, le=100),
):
    start = _range_start(days)
    q = (
        db.query(Visit.country, Visit.city, func.count(Visit.id).label("c"))
        .group_by(Visit.country, Visit.city)
        .order_by(func.count(Visit.id).desc())
    )
    if start is not None:
        q = q.filter(Visit.created_at >= start)
    rows = q.limit(limit).all()
    return [AnalyticsGeoRow(country=r[0] or "", city=r[1] or "", count=int(r[2])) for r in rows]


@router.get("/devices", response_model=list[AnalyticsDeviceRow])
def analytics_devices(
    db: Annotated[Session, Depends(get_db)],
    days: int = Query(30, ge=0, le=3650),
):
    start = _range_start(days)
    q = (
        db.query(Visit.browser, Visit.device, Visit.os, func.count(Visit.id).label("c"))
        .group_by(Visit.browser, Visit.device, Visit.os)
        .order_by(func.count(Visit.id).desc())
    )
    if start is not None:
        q = q.filter(Visit.created_at >= start)
    rows = q.limit(50).all()
    return [
        AnalyticsDeviceRow(browser=r[0] or "", device=r[1] or "", os=r[2] or "", count=int(r[3]))
        for r in rows
    ]


@router.get("/pages", response_model=list[NamedCount])
def analytics_pages(
    db: Annotated[Session, Depends(get_db)],
    days: int = Query(30, ge=0, le=3650),
    limit: int = Query(20, ge=1, le=100),
):
    start = _range_start(days)
    q = (
        db.query(Visit.page, func.count(Visit.id).label("c"))
        .group_by(Visit.page)
        .order_by(func.count(Visit.id).desc())
    )
    if start is not None:
        q = q.filter(Visit.created_at >= start)
    rows = q.limit(limit).all()
    return [NamedCount(name=r[0] or "/", count=int(r[1])) for r in rows]


@router.get("/referrers", response_model=list[NamedCount])
def analytics_referrers(
    db: Annotated[Session, Depends(get_db)],
    days: int = Query(30, ge=0, le=3650),
    limit: int = Query(20, ge=1, le=100),
):
    start = _range_start(days)
    q = (
        db.query(Visit.referrer, func.count(Visit.id).label("c"))
        .group_by(Visit.referrer)
        .order_by(func.count(Visit.id).desc())
    )
    if start is not None:
        q = q.filter(Visit.created_at >= start)
    rows = q.limit(limit).all()
    return [NamedCount(name=r[0] or "(direct)", count=int(r[1])) for r in rows]
