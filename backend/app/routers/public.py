from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Certification, Education, Experience, Profile, Project, Publication, Skill
from app.schemas import (
    CertificationResponse,
    EducationResponse,
    ExperienceResponse,
    ProfileResponse,
    ProjectResponse,
    PublicationResponse,
    SkillResponse,
)

router = APIRouter(prefix="/api", tags=["public"])


@router.get("/profile", response_model=ProfileResponse)
def get_profile(db: Session = Depends(get_db)):
    p = db.query(Profile).first()
    if not p:
        raise HTTPException(status_code=404, detail="Profile not configured")
    return p


@router.get("/education", response_model=list[EducationResponse])
def list_education(db: Session = Depends(get_db)):
    return db.query(Education).order_by(Education.id.asc()).all()


@router.get("/experience", response_model=list[ExperienceResponse])
def list_experience(db: Session = Depends(get_db)):
    return db.query(Experience).order_by(Experience.sort_order.asc(), Experience.id.desc()).all()


@router.get("/projects", response_model=list[ProjectResponse])
def list_projects(db: Session = Depends(get_db)):
    return db.query(Project).order_by(Project.sort_order.asc(), Project.id.desc()).all()


@router.get("/skills", response_model=list[SkillResponse])
def list_skills(db: Session = Depends(get_db)):
    return db.query(Skill).order_by(Skill.category.asc(), Skill.sort_order.asc(), Skill.id.asc()).all()


@router.get("/certifications", response_model=list[CertificationResponse])
def list_certifications(db: Session = Depends(get_db)):
    return db.query(Certification).order_by(Certification.id.asc()).all()


@router.get("/publications", response_model=list[PublicationResponse])
def list_publications(db: Session = Depends(get_db)):
    return db.query(Publication).order_by(Publication.id.asc()).all()
