from datetime import datetime

from sqlalchemy import JSON, Boolean, Column, DateTime, Integer, String, Text

from app.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    title = Column(String(255), nullable=False)
    tagline = Column(String(500), default="")
    bio = Column(Text, default="")
    location = Column(String(255), default="")
    phone = Column(String(64), default="")
    email = Column(String(255), default="")
    linkedin = Column(String(512), default="")
    github = Column(String(512), default="")
    resume_url = Column(String(512), default="")
    photo_url = Column(String(512), default="")


class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)
    institution = Column(String(255), nullable=False)
    degree = Column(String(255), nullable=False)
    location = Column(String(255), default="")
    gpa = Column(String(32), default="")
    start_date = Column(String(64), default="")
    end_date = Column(String(64), default="")


class Experience(Base):
    __tablename__ = "experience"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    location = Column(String(255), default="")
    start_date = Column(String(64), default="")
    end_date = Column(String(64), default="")
    is_current = Column(Boolean, default=False)
    sort_order = Column(Integer, default=0)
    bullets = Column(JSON, default=list)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, default="")
    tech_stack = Column(JSON, default=list)
    github_url = Column(String(512), default="")
    live_url = Column(String(512), default="")
    image_url = Column(String(512), default="")
    featured = Column(Boolean, default=True)
    sort_order = Column(Integer, default=0)


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(128), nullable=False)
    name = Column(String(255), nullable=False)
    proficiency = Column(Integer, default=3)  # 1-5
    sort_order = Column(Integer, default=0)


class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    issuer = Column(String(255), default="")
    date = Column(String(64), default="")
    credential_id = Column(String(255), default="")
    url = Column(String(512), default="")


class Publication(Base):
    __tablename__ = "publications"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(Text, nullable=False)
    publisher = Column(String(255), default="")
    date = Column(String(64), default="")
    url = Column(String(512), default="")


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(128), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)


class Visit(Base):
    __tablename__ = "visits"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(128), nullable=False, index=True)
    ip = Column(String(64), default="")
    country = Column(String(128), default="")
    city = Column(String(128), default="")
    browser = Column(String(128), default="")
    device = Column(String(64), default="")
    os = Column(String(128), default="")
    referrer = Column(String(1024), default="")
    page = Column(String(512), default="/")
    user_agent = Column(Text, default="")
    is_new_visitor = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
