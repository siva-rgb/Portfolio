from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import get_current_admin
from app.database import get_db
from app.models import (
    Certification,
    Education,
    Experience,
    Profile,
    Project,
    Publication,
    Skill,
)
from app.schemas import (
    CertificationCreate,
    CertificationResponse,
    CertificationUpdate,
    EducationCreate,
    EducationResponse,
    EducationUpdate,
    ExperienceCreate,
    ExperienceResponse,
    ExperienceUpdate,
    ProfileResponse,
    ProfileUpdate,
    ProjectCreate,
    ProjectResponse,
    ProjectUpdate,
    PublicationCreate,
    PublicationResponse,
    PublicationUpdate,
    SkillCreate,
    SkillResponse,
    SkillUpdate,
)

router = APIRouter(prefix="/api/admin", tags=["admin"], dependencies=[Depends(get_current_admin)])


@router.put("/profile", response_model=ProfileResponse)
def update_profile(
    body: ProfileUpdate,
    db: Annotated[Session, Depends(get_db)],
):
    p = db.query(Profile).first()
    if not p:
        raise HTTPException(status_code=404, detail="No profile")
    data = body.model_dump(exclude_unset=True)
    for k, v in data.items():
        setattr(p, k, v)
    db.add(p)
    db.commit()
    db.refresh(p)
    return p


# --- Education ---
@router.post("/education", response_model=EducationResponse)
def create_education(
    body: EducationCreate,
    db: Annotated[Session, Depends(get_db)],
):
    e = Education(**body.model_dump())
    db.add(e)
    db.commit()
    db.refresh(e)
    return e


@router.put("/education/{item_id}", response_model=EducationResponse)
def update_education(
    item_id: int,
    body: EducationUpdate,
    db: Annotated[Session, Depends(get_db)],
):
    e = db.get(Education, item_id)
    if not e:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in body.model_dump(exclude_unset=True).items():
        setattr(e, k, v)
    db.add(e)
    db.commit()
    db.refresh(e)
    return e


@router.delete("/education/{item_id}")
def delete_education(
    item_id: int,
    db: Annotated[Session, Depends(get_db)],
):
    e = db.get(Education, item_id)
    if not e:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(e)
    db.commit()
    return {"ok": True}


# --- Experience ---
@router.post("/experience", response_model=ExperienceResponse)
def create_experience(
    body: ExperienceCreate,
    db: Annotated[Session, Depends(get_db)],
):
    x = Experience(**body.model_dump())
    db.add(x)
    db.commit()
    db.refresh(x)
    return x


@router.put("/experience/{item_id}", response_model=ExperienceResponse)
def update_experience(
    item_id: int,
    body: ExperienceUpdate,
    db: Annotated[Session, Depends(get_db)],
):
    x = db.get(Experience, item_id)
    if not x:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in body.model_dump(exclude_unset=True).items():
        setattr(x, k, v)
    db.add(x)
    db.commit()
    db.refresh(x)
    return x


@router.delete("/experience/{item_id}")
def delete_experience(
    item_id: int,
    db: Annotated[Session, Depends(get_db)],
):
    x = db.get(Experience, item_id)
    if not x:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(x)
    db.commit()
    return {"ok": True}


# --- Projects ---
@router.post("/projects", response_model=ProjectResponse)
def create_project(
    body: ProjectCreate,
    db: Annotated[Session, Depends(get_db)],
):
    p = Project(**body.model_dump())
    db.add(p)
    db.commit()
    db.refresh(p)
    return p


@router.put("/projects/{item_id}", response_model=ProjectResponse)
def update_project(
    item_id: int,
    body: ProjectUpdate,
    db: Annotated[Session, Depends(get_db)],
):
    p = db.get(Project, item_id)
    if not p:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in body.model_dump(exclude_unset=True).items():
        setattr(p, k, v)
    db.add(p)
    db.commit()
    db.refresh(p)
    return p


@router.delete("/projects/{item_id}")
def delete_project(
    item_id: int,
    db: Annotated[Session, Depends(get_db)],
):
    p = db.get(Project, item_id)
    if not p:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(p)
    db.commit()
    return {"ok": True}


# --- Skills ---
@router.post("/skills", response_model=SkillResponse)
def create_skill(
    body: SkillCreate,
    db: Annotated[Session, Depends(get_db)],
):
    s = Skill(**body.model_dump())
    db.add(s)
    db.commit()
    db.refresh(s)
    return s


@router.put("/skills/{item_id}", response_model=SkillResponse)
def update_skill(
    item_id: int,
    body: SkillUpdate,
    db: Annotated[Session, Depends(get_db)],
):
    s = db.get(Skill, item_id)
    if not s:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in body.model_dump(exclude_unset=True).items():
        setattr(s, k, v)
    db.add(s)
    db.commit()
    db.refresh(s)
    return s


@router.delete("/skills/{item_id}")
def delete_skill(
    item_id: int,
    db: Annotated[Session, Depends(get_db)],
):
    s = db.get(Skill, item_id)
    if not s:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(s)
    db.commit()
    return {"ok": True}


# --- Certifications ---
@router.post("/certifications", response_model=CertificationResponse)
def create_certification(
    body: CertificationCreate,
    db: Annotated[Session, Depends(get_db)],
):
    c = Certification(**body.model_dump())
    db.add(c)
    db.commit()
    db.refresh(c)
    return c


@router.put("/certifications/{item_id}", response_model=CertificationResponse)
def update_certification(
    item_id: int,
    body: CertificationUpdate,
    db: Annotated[Session, Depends(get_db)],
):
    c = db.get(Certification, item_id)
    if not c:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in body.model_dump(exclude_unset=True).items():
        setattr(c, k, v)
    db.add(c)
    db.commit()
    db.refresh(c)
    return c


@router.delete("/certifications/{item_id}")
def delete_certification(
    item_id: int,
    db: Annotated[Session, Depends(get_db)],
):
    c = db.get(Certification, item_id)
    if not c:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(c)
    db.commit()
    return {"ok": True}


# --- Publications ---
@router.post("/publications", response_model=PublicationResponse)
def create_publication(
    body: PublicationCreate,
    db: Annotated[Session, Depends(get_db)],
):
    pub = Publication(**body.model_dump())
    db.add(pub)
    db.commit()
    db.refresh(pub)
    return pub


@router.put("/publications/{item_id}", response_model=PublicationResponse)
def update_publication(
    item_id: int,
    body: PublicationUpdate,
    db: Annotated[Session, Depends(get_db)],
):
    pub = db.get(Publication, item_id)
    if not pub:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in body.model_dump(exclude_unset=True).items():
        setattr(pub, k, v)
    db.add(pub)
    db.commit()
    db.refresh(pub)
    return pub


@router.delete("/publications/{item_id}")
def delete_publication(
    item_id: int,
    db: Annotated[Session, Depends(get_db)],
):
    pub = db.get(Publication, item_id)
    if not pub:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(pub)
    db.commit()
    return {"ok": True}
