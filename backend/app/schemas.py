from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


# --- Profile ---
class ProfileBase(BaseModel):
    name: str
    title: str
    tagline: str = ""
    bio: str = ""
    location: str = ""
    phone: str = ""
    email: str = ""
    linkedin: str = ""
    github: str = ""
    resume_url: str = ""
    photo_url: str = ""


class ProfileCreate(ProfileBase):
    pass


class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    tagline: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    resume_url: Optional[str] = None
    photo_url: Optional[str] = None


class ProfileResponse(ProfileBase):
    id: int

    model_config = {"from_attributes": True}


# --- Education ---
class EducationBase(BaseModel):
    institution: str
    degree: str
    location: str = ""
    gpa: str = ""
    start_date: str = ""
    end_date: str = ""


class EducationCreate(EducationBase):
    pass


class EducationUpdate(BaseModel):
    institution: Optional[str] = None
    degree: Optional[str] = None
    location: Optional[str] = None
    gpa: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None


class EducationResponse(EducationBase):
    id: int

    model_config = {"from_attributes": True}


# --- Experience ---
class ExperienceBase(BaseModel):
    company: str
    role: str
    location: str = ""
    start_date: str = ""
    end_date: str = ""
    is_current: bool = False
    sort_order: int = 0
    bullets: list[str] = Field(default_factory=list)


class ExperienceCreate(ExperienceBase):
    pass


class ExperienceUpdate(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    is_current: Optional[bool] = None
    sort_order: Optional[int] = None
    bullets: Optional[list[str]] = None


class ExperienceResponse(ExperienceBase):
    id: int

    model_config = {"from_attributes": True}


# --- Project ---
class ProjectBase(BaseModel):
    title: str
    description: str = ""
    tech_stack: list[str] = Field(default_factory=list)
    github_url: str = ""
    live_url: str = ""
    image_url: str = ""
    featured: bool = True
    sort_order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tech_stack: Optional[list[str]] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: Optional[bool] = None
    sort_order: Optional[int] = None


class ProjectResponse(ProjectBase):
    id: int

    model_config = {"from_attributes": True}


# --- Skill ---
class SkillBase(BaseModel):
    category: str
    name: str
    proficiency: int = Field(ge=1, le=5, default=3)
    sort_order: int = 0


class SkillCreate(SkillBase):
    pass


class SkillUpdate(BaseModel):
    category: Optional[str] = None
    name: Optional[str] = None
    proficiency: Optional[int] = Field(None, ge=1, le=5)
    sort_order: Optional[int] = None


class SkillResponse(SkillBase):
    id: int

    model_config = {"from_attributes": True}


# --- Certification ---
class CertificationBase(BaseModel):
    name: str
    issuer: str = ""
    date: str = ""
    credential_id: str = ""
    url: str = ""


class CertificationCreate(CertificationBase):
    pass


class CertificationUpdate(BaseModel):
    name: Optional[str] = None
    issuer: Optional[str] = None
    date: Optional[str] = None
    credential_id: Optional[str] = None
    url: Optional[str] = None


class CertificationResponse(CertificationBase):
    id: int

    model_config = {"from_attributes": True}


# --- Publication ---
class PublicationBase(BaseModel):
    title: str
    publisher: str = ""
    date: str = ""
    url: str = ""


class PublicationCreate(PublicationBase):
    pass


class PublicationUpdate(BaseModel):
    title: Optional[str] = None
    publisher: Optional[str] = None
    date: Optional[str] = None
    url: Optional[str] = None


class PublicationResponse(PublicationBase):
    id: int

    model_config = {"from_attributes": True}


# --- Auth ---
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    username: str
    password: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str = Field(min_length=6)


# --- Tracking ---
class TrackRequest(BaseModel):
    page: str = "/"
    referrer: str = ""
    user_agent: str = ""


# --- Analytics ---
class AnalyticsSummary(BaseModel):
    total_visits: int
    unique_visitors: int
    new_visitors_period: int
    returning_percent: float


class DailyCount(BaseModel):
    date: str
    visits: int


class NamedCount(BaseModel):
    name: str
    count: int


class AnalyticsGeoRow(BaseModel):
    country: str
    city: str
    count: int


class AnalyticsDeviceRow(BaseModel):
    browser: str
    device: str
    os: str
    count: int
