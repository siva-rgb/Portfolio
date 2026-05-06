from sqlalchemy.orm import Session

from app.auth import hash_password
from app.models import (
    AdminUser,
    Certification,
    Education,
    Experience,
    Profile,
    Project,
    Publication,
    Skill,
)


def ensure_seed(db: Session) -> None:
    if db.query(Profile).first() is not None:
        if db.query(AdminUser).first() is None:
            db.add(
                AdminUser(
                    username="admin",
                    password_hash=hash_password("admin123"),
                )
            )
            db.commit()
        return

    profile = Profile(
        name="Sivananda Panda",
        title="Data & AI Engineer",
        tagline="Building reliable data platforms, observability, and Agentic AI solutions.",
        bio=(
            "Associate at PwC focused on multi-cloud data observability, data quality, and "
            "Agentic AI applications. Former ML research intern at Samsung Prism with strong "
            "foundation in Python, GCP, and production data pipelines."
        ),
        location="Bhubaneswar, India",
        phone="+91 9776507009",
        email="",
        linkedin="https://linkedin.com/in/",
        github="https://github.com/",
        resume_url="",
        photo_url="",
    )
    db.add(profile)

    db.add(
        Education(
            institution="C.V. Raman Global University",
            degree="Bachelor of Technology (B.Tech) in Electronics & Telecommunication",
            location="Bhubaneswar, Odisha, India",
            gpa="8.3",
            start_date="",
            end_date="03/2022",
        )
    )

    db.add(
        Experience(
            company="PwC",
            role="Associate 2",
            location="Bangalore, Karnataka, India",
            start_date="03/2022",
            end_date="Present",
            is_current=True,
            sort_order=0,
            bullets=[
                "Architected and deployed comprehensive multi-cloud Data Observability and Data Quality systems across both GCP and Azure platforms, ensuring consistent monitoring and reliability for critical internal and client projects.",
                "Developed a novel Data Quality application leveraging Agentic AI to proactively identify complex data anomalies and quality issues, resulting in faster incident detection and resolution.",
                "Engineered and maintained high-throughput backend ETL data pipelines crucial for automated data transformation, loading, and continuous system monitoring processes.",
                "Built and delivered several end-to-end Agentic AI applications that streamlined high-value business tasks, including automated Report Analysis, Idea Evaluation, and quantitative ROI Assessment.",
            ],
        )
    )
    db.add(
        Experience(
            company="Samsung Prism",
            role="Machine Learning Research Intern",
            location="",
            start_date="06/2021",
            end_date="01/2022",
            is_current=False,
            sort_order=1,
            bullets=[
                "Building web scraping module for scraping web articles & creating datasets.",
                "Data analysis & ML model evaluation.",
                "Built classification model for web article detection with 96% accuracy.",
            ],
        )
    )

    db.add(
        Project(
            title="Air Quality Monitoring Using Remote Sensing Technology",
            description=(
                "Create maps of greenhouse gas levels and predict pollution using Sentinel-5P "
                "satellite data. Compared deep learning approaches (LSTM, ARIMA, Seasonal ARIMA) "
                "to minimize prediction error."
            ),
            tech_stack=["Python", "Deep Learning", "LSTM", "ARIMA", "Remote Sensing", "Sentinel-5P"],
            featured=True,
            sort_order=0,
        )
    )
    db.add(
        Project(
            title="Breast Cancer Tumor Classification using FNA Data",
            description=(
                "End-to-end ML pipeline for benign vs malignant classification from fine needle "
                "aspirate data. Applied feature selection (univariate analysis, PCA), experimented "
                "with Random Forest, XGBoost, and ANN; tracked experiments in MLflow. Achieved 98.4% "
                "accuracy with ensemble methods."
            ),
            tech_stack=["Python", "scikit-learn", "XGBoost", "PCA", "MLflow", "Ensemble Learning"],
            featured=True,
            sort_order=1,
        )
    )

    skills_data = [
        ("ML & AI", "Machine Learning", 5),
        ("ML & AI", "Agentic AI", 5),
        ("ML & AI", "LangGraph", 4),
        ("ML & AI", "LangChain", 4),
        ("ML & AI", "scikit-learn", 5),
        ("Data Engineering", "Python", 5),
        ("Data Engineering", "SQL / RDBMS", 5),
        ("Data Engineering", "BigQuery", 4),
        ("Data Engineering", "Apache Airflow", 4),
        ("Data Engineering", "PySpark", 4),
        ("Data Engineering", "NumPy & Pandas", 5),
        ("Data Engineering", "Data Analytics & Statistics", 5),
        ("Data Engineering", "Web Scraping", 4),
        ("Cloud & Platforms", "GCP", 5),
        ("Cloud & Platforms", "Azure", 4),
        ("Apps & Visualization", "Flask / Streamlit", 4),
        ("Apps & Visualization", "Seaborn", 4),
        ("Computer Science", "Data Structures & Algorithms", 4),
    ]
    for i, (cat, name, prof) in enumerate(skills_data):
        db.add(Skill(category=cat, name=name, proficiency=prof, sort_order=i))

    db.add(
        Certification(
            name="AWS Certified Machine Learning – Specialty",
            issuer="AWS",
            date="",
            credential_id="MLS-C01",
            url="",
        )
    )
    db.add(
        Certification(
            name="Oracle Database SQL Certified Associate",
            issuer="Oracle",
            date="",
            credential_id="1Z0-071",
            url="",
        )
    )

    db.add(
        Publication(
            title="Investigation of Satellite Data for Monitoring Air Quality Over Remote Sensing Technology",
            publisher="Springer Nature",
            date="Nov 24, 2024",
            url="",
        )
    )

    db.add(
        AdminUser(
            username="admin",
            password_hash=hash_password("admin123"),
        )
    )

    db.commit()
