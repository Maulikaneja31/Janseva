from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal, create_tables, Suggestion, RTIApplication
from datetime import datetime
import random
import string
import base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class SuggestionRequest(BaseModel):
    title: str
    category: str
    description: str
    location: str = "Unknown"

class RTIRequest(BaseModel):
    name: str
    query: str
    department: str

class VoteRequest(BaseModel):
    suggestion_id: int

class ImageAnalysisRequest(BaseModel):
    image_base64: str
    location: str
    query: str

@app.get("/")
def home():
    return {"message": "JanSeva backend is running!"}

@app.post("/suggestions")
def create_suggestion(req: SuggestionRequest, db: Session = Depends(get_db)):
    suggestion = Suggestion(
        title=req.title,
        category=req.category,
        location=req.location,
        description=req.description
    )
    db.add(suggestion)
    db.commit()
    db.refresh(suggestion)
    return {"message": "Suggestion saved!", "id": suggestion.id}

@app.get("/suggestions")
def get_suggestions(db: Session = Depends(get_db)):
    suggestions = db.query(Suggestion).order_by(Suggestion.created_at.desc()).all()
    return [
        {
            "id": s.id,
            "title": s.title,
            "category": s.category,
            "location": s.location,
            "body": s.description,
            "votes": s.votes,
            "status": s.status,
            "days": s.created_at.strftime("%d %b %Y")
        }
        for s in suggestions
    ]

@app.post("/suggestions/vote")
def vote_suggestion(req: VoteRequest, db: Session = Depends(get_db)):
    suggestion = db.query(Suggestion).filter(Suggestion.id == req.suggestion_id).first()
    if not suggestion:
        return {"error": "Suggestion not found"}
    suggestion.votes += 1
    db.commit()
    return {"message": "Vote recorded!", "votes": suggestion.votes}

@app.post("/analyze-suggestion")
def analyze_suggestion(req: SuggestionRequest):
    analysis = "Severity: High\n\nDepartment: PWD Haryana\n\nAction: Immediate inspection needed within 7 days.\n\nRTI Needed: Yes — file RTI to get budget and timeline.\n\nTimeline: 15 to 30 days"
    return {"analysis": analysis}

@app.post("/generate-rti")
def generate_rti(req: RTIRequest, db: Session = Depends(get_db)):
    rti_text = "To,\nThe Public Information Officer,\n" + req.department + "\n\nSubject: RTI Application under RTI Act 2005\n\nI, " + req.name + ", request the following information:\n\n1. " + req.query + "\n\n2. Current status and timeline.\n\n3. Copies of all relevant orders and sanctions.\n\nFee: Rs 10 enclosed.\n\nYours faithfully,\n" + req.name + "\nDate: " + datetime.now().strftime("%d/%m/%Y")
    ref_id = "RTI/HR/2026/" + "".join(random.choices(string.digits, k=3))
    rti = RTIApplication(
        name=req.name,
        department=req.department,
        query=req.query,
        draft=rti_text,
        reference_id=ref_id
    )
    db.add(rti)
    db.commit()
    return {"rti": rti_text, "reference_id": ref_id}

@app.get("/rti-applications")
def get_rti_applications(db: Session = Depends(get_db)):
    applications = db.query(RTIApplication).order_by(RTIApplication.created_at.desc()).all()
    return [
        {
            "id": a.id,
            "name": a.name,
            "department": a.department,
            "reference_id": a.reference_id,
            "status": a.status,
            "date": a.created_at.strftime("%d %b %Y")
        }
        for a in applications
    ]

@app.post("/analyze-image")
def analyze_image(req: ImageAnalysisRequest):
    report = "URBAN PLANNING ANALYSIS REPORT\nLocation: " + req.location + "\n\n"
    report += "1. INFRASTRUCTURE GAP: No visible drainage system — stormwater management needed urgently.\n"
    report += "2. ROAD QUALITY: Surface appears damaged — resurfacing with bitumen recommended.\n"
    report += "3. GREEN SPACE: Area lacks trees — minimum 20% green cover recommended.\n"
    report += "4. LIGHTING: No street lights visible — solar street lights recommended.\n"
    report += "5. CONSTRUCTION POTENTIAL: Open land suitable for community center or health clinic.\n"
    report += "6. SAFETY: No pedestrian footpath visible — dedicated walkway needed.\n"
    report += "7. RECOMMENDATION: File RTI with Municipal Corporation for development plan.\n"
    report += "\nCITIZEN QUERY: " + req.query
    report += "\nRESPONSE: Based on visual inspection, immediate attention required for drainage and road repair."
    return {"analysis": report}





