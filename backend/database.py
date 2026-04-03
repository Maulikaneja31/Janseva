from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

engine = create_engine("sqlite:///janseva.db")
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String)
    email = Column(String, unique=True, index=True)
    mobile = Column(String, unique=True)
    hashed_password = Column(String)
    district = Column(String, default="Rohtak")
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now)

class Suggestion(Base):
    __tablename__ = "suggestions"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    category = Column(String)
    location = Column(String)
    description = Column(String)
    votes = Column(Integer, default=0)
    status = Column(String, default="Open")
    user_id = Column(Integer, default=0)
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
    user_id = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.now)

def create_tables():
    Base.metadata.create_all(bind=engine)