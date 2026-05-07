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
        title="Fullstack AI/ML Engineer",
        tagline="Full-Stack Engineer focused on Agentic AI, intelligent automation, and scalable ML systems.",
        bio=(
            "Associate at PwC focused on multi-cloud data observability, data quality, and "
            "Agentic AI applications. Former ML research intern at Samsung Prism with strong "
            "foundation in Python, GCP, and production data pipelines."
        ),
        location="Bhubaneswar, India",
        phone="+91 9776507009",
        email="",
        linkedin="https://www.linkedin.com/in/sivananda-panda-56a121169/",
        github="https://github.com/siva-rgb",
        resume_url="https://drive.google.com/file/d/1iG_zci1OG2ygcWh-xqRQdNjPqfJkmHWo/view?usp=sharing",
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
                "The IAM audit team was spending significant manual effort generating audit reports and handling repetitive ServiceNow triage tasks, Developed a Cyber IAM Audit Agent and an L2 Copilot Triage Assistant to automate audit report generation and ServiceNow ticket triage. The AI agents parse natural language to formulate step-by-step multi-platformretrieval plans, automatically package evidence, map tickets to known patterns, and propose Knowledge Base(KB) updates, collectively saving the IAM team 280+ hours per month.",
                "Developed a novel Data Quality application leveraging Agentic AI to proactively identify complex data anomalies and quality issues, resulting in faster incident detection and resolution.",
                "Cyber SecOps analysts faced delays during alert investigations due to fragmented log retrieval and dependency on manual knowledge lookup processes.uild an AI-powered investigation workflow that could accelerate triage and improve analyst productivity.Architected and Developed Agentic AI applications integrated with Splunk using a custom MCP server for intelligent log retrieval. Implemented a RAG-based reasoning system grounded on internal cyber policies, SOPs, and operational playbooks.Reduced average alert triage time by nearly 80%, improving investigation speed and operational responsiveness.",
                "Enterprise knowledge sources such as KB articles, SOPs, and runbooks were distributed across systems, making retrieval and utilization inefficient for AI applications.Build a scalable and automated knowledge ingestion pipeline for enterprise AI systems.Designed and implemented a scalable RAG pipeline using Databricks and Azure Data Factory to automate ingestion, transformation, and indexing of enterprise knowledge repositories.Designed and implemented a scalable RAG pipeline using Databricks and Azure Data Factory to automate ingestion, transformation, and indexing of enterprise knowledge repositories.Enabled reliable enterprise-scale AI retrieval workflows and significantly improved response accuracy for AI copilots and agents.",
                "Traditional rule-based data quality checks were insufficient for identifying complex anomalies and hidden inconsistencies in enterprise datasets.Develop a smarter AI-driven data quality solution capable of proactive anomaly detection.Built an Agentic AI-powered Data Quality platform leveraging intelligent reasoning workflows and anomaly detection techniques to identify complex data issues automatically. Enabled and created data observability pltform using python and cloud API. Improved incident detection speed, reduced manual debugging effort, and enhanced overall data governance efficiency."
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
