import hashlib
import threading
import time
from typing import Any

import requests
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from user_agents import parse as parse_ua

from app.database import get_db
from app.models import Visit
from app.schemas import TrackRequest

router = APIRouter(prefix="/api", tags=["tracking"])

_geo_cache: dict[str, dict[str, str]] = {}
_geo_lock = threading.Lock()
_GEO_TTL = 3600  # seconds
_geo_times: dict[str, float] = {}


def _is_private_ip(ip: str) -> bool:
    if not ip:
        return True
    if ip in ("127.0.0.1", "::1", "localhost"):
        return True
    parts = ip.split(".")
    if len(parts) == 4 and all(p.isdigit() for p in parts):
        a = int(parts[0])
        if a == 10:
            return True
        if a == 172 and 16 <= int(parts[1]) <= 31:
            return True
        if a == 192 and int(parts[1]) == 168:
            return True
    return False


def lookup_geo(ip: str) -> tuple[str, str]:
    if _is_private_ip(ip):
        return "Local", "Local"
    now = time.time()
    with _geo_lock:
        if ip in _geo_cache and now - _geo_times.get(ip, 0) < _GEO_TTL:
            g = _geo_cache[ip]
            return g.get("country", ""), g.get("city", "")
    country, city = "", ""
    try:
        r = requests.get(f"https://ipapi.co/{ip}/json/", timeout=3)
        if r.ok:
            data: dict[str, Any] = r.json()
            country = str(data.get("country_name") or data.get("country") or "")
            city = str(data.get("city") or "")
    except Exception:
        country, city = "Unknown", "Unknown"
    with _geo_lock:
        _geo_cache[ip] = {"country": country or "Unknown", "city": city or "Unknown"}
        _geo_times[ip] = now
    return country or "Unknown", city or "Unknown"


def client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for") or request.headers.get("X-Forwarded-For")
    if fwd:
        return fwd.split(",")[0].strip()
    if request.client:
        return request.client.host or ""
    return ""


@router.post("/track")
def track_visit(
    body: TrackRequest,
    request: Request,
    db: Session = Depends(get_db),
):
    ip = client_ip(request)
    ua_string = body.user_agent or request.headers.get("user-agent") or ""
    raw = f"{ip}|{ua_string}".encode()
    session_id = hashlib.sha256(raw).hexdigest()[:48]

    exists = db.query(Visit.id).filter(Visit.session_id == session_id).first()
    is_new = exists is None

    ua = parse_ua(ua_string)
    browser = f"{ua.browser.family} {ua.browser.version_string}".strip()
    device = ua.device.family or "Other"
    os_name = f"{ua.os.family} {ua.os.version_string}".strip()

    country, city = lookup_geo(ip)

    row = Visit(
        session_id=session_id,
        ip=ip,
        country=country,
        city=city,
        browser=browser or "Unknown",
        device=device,
        os=os_name or "Unknown",
        referrer=(body.referrer or request.headers.get("referer") or "")[:1024],
        page=body.page[:512] if body.page else "/",
        user_agent=ua_string[:2000],
        is_new_visitor=is_new,
    )
    db.add(row)
    db.commit()
    return {"ok": True, "session_id": session_id, "is_new_visitor": is_new}
