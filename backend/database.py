from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

engine = create_engine("sqlite:///janseva.db")
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)

class Suggestion(Base):
    __tablename__ = "suggestions"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    category = Column(String)
    location = Column(String)
    description = Column(String)
    votes = Column(Integer, default=0)
    status = Column(String, default="Open")
    created_at = Column(DateTime, default=datetime.now)

class RTIApplication(Base):
    __tablename__ = "rti_applications"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    department = Column(String)
    query = Column(String)
    draft = Column(String)
    reference_id = Column(String)
    status = Column(String, default="Filed")
    created_at = Column(DateTime, default=datetime.now)

def create_tables():
    Base.metadata.create_all(bind=engine)