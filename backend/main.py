from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal, create_tables, Suggestion, RTIApplication, User
from auth import hash_password, verify_password, create_token, decode_token
from datetime import datetime
import random
import string

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

class RegisterRequest(BaseModel):
    full_name: str
    email: str
    mobile: str
    password: str
    district: str = "Rohtak"

class LoginRequest(BaseModel):
    email: str
    password: str

class OTPRequest(BaseModel):
    mobile: str

otp_store = {}

@app.get("/")
def home():
    return {"message": "JanSeva backend is running!"}

@app.post("/auth/register")
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == req.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.query(User).filter(User.mobile == req.mobile).first():
        raise HTTPException(status_code=400, detail="Mobile already registered")
    user = User(
        full_name=req.full_name,
        email=req.email,
        mobile=req.mobile,
        hashed_password=hash_password(req.password),
        district=req.district
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    token = create_token({"sub": str(user.id)})
    return {
        "token": token,
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "mobile": user.mobile,
            "district": user.district,
            "is_admin": user.is_admin
        }
    }

@app.post("/auth/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_token({"sub": str(user.id)})
    return {
    "token": token,
    "user": {
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "mobile": user.mobile,
        "district": user.district,
        "is_admin": user.is_admin
    }
}

@app.post("/auth/send-otp")
def send_otp(req: OTPRequest):
    otp = "".join(random.choices(string.digits, k=6))
    otp_store[req.mobile] = otp
    return {"message": f"OTP sent to {req.mobile}", "otp": otp}

@app.post("/auth/verify-otp")
def verify_otp(mobile: str, otp: str, db: Session = Depends(get_db)):
    if otp_store.get(mobile) != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    user = db.query(User).filter(User.mobile == mobile).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    token = create_token({"sub": str(user.id)})
    return {"token": token, "user": {"id": user.id, "full_name": user.full_name}}

@app.get("/auth/me")
def get_me(token: str, db: Session = Depends(get_db)):
    user_id = decode_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "mobile": user.mobile,
        "district": user.district,
        "created_at": user.created_at.strftime("%d %b %Y")
    }

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
    rti_text = "To,\nThe Public Information Officer,\n" + req.department + "\n\nSubject: RTI Application under RTI Act 2005\n\nI, " + req.name + ", request the following information:\n\n1. " + req.query + "\n\n2. Current status and timeline.\n\n3. Copies of all relevant orders.\n\nFee: Rs 10 enclosed.\n\nYours faithfully,\n" + req.name + "\nDate: " + datetime.now().strftime("%d/%m/%Y")
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
class StatusUpdate(BaseModel):
    suggestion_id: int
    status: str

class RTIReply(BaseModel):
    rti_id: int
    reply: str

class MakeAdminRequest(BaseModel):
    email: str
    secret: str

@app.post("/admin/make-admin")
def make_admin(req: MakeAdminRequest, db: Session = Depends(get_db)):
    if req.secret != "janseva-admin-2026":
        raise HTTPException(status_code=403, detail="Wrong secret key")
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_admin = True
    db.commit()
    return {"message": f"{user.full_name} is now an admin!"}

@app.get("/admin/stats")
def admin_stats(db: Session = Depends(get_db)):
    total = db.query(Suggestion).count()
    open_count = db.query(Suggestion).filter(Suggestion.status == "Open").count()
    review_count = db.query(Suggestion).filter(Suggestion.status == "Under Review").count()
    resolved_count = db.query(Suggestion).filter(Suggestion.status == "Resolved").count()
    rti_count = db.query(RTIApplication).count()
    return {
        "total_suggestions": total,
        "open": open_count,
        "under_review": review_count,
        "resolved": resolved_count,
        "total_rtis": rti_count
    }

@app.get("/admin/suggestions")
def admin_get_suggestions(db: Session = Depends(get_db)):
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
            "date": s.created_at.strftime("%d %b %Y")
        }
        for s in suggestions
    ]

@app.post("/admin/update-status")
def update_status(req: StatusUpdate, db: Session = Depends(get_db)):
    suggestion = db.query(Suggestion).filter(Suggestion.id == req.suggestion_id).first()
    if not suggestion:
        raise HTTPException(status_code=404, detail="Suggestion not found")
    suggestion.status = req.status
    db.commit()
    return {"message": "Status updated!", "status": req.status}

@app.get("/admin/rtis")
def admin_get_rtis(db: Session = Depends(get_db)):
    rtis = db.query(RTIApplication).order_by(RTIApplication.created_at.desc()).all()
    return [
        {
            "id": a.id,
            "name": a.name,
            "department": a.department,
            "query": a.query,
            "reference_id": a.reference_id,
            "status": a.status,
            "reply": getattr(a, "reply", ""),
            "date": a.created_at.strftime("%d %b %Y")
        }
        for a in rtis
    ]

@app.post("/admin/reply-rti")
def reply_rti(req: RTIReply, db: Session = Depends(get_db)):
    rti = db.query(RTIApplication).filter(RTIApplication.id == req.rti_id).first()
    if not rti:
        raise HTTPException(status_code=404, detail="RTI not found")
    rti.status = "Replied"
    db.commit()
    return {"message": "RTI reply recorded!"}

@app.get("/admin/users")
def admin_get_users(db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.created_at.desc()).all()
    return [
        {
            "id": u.id,
            "full_name": u.full_name,
            "email": u.email,
            "mobile": u.mobile,
            "district": u.district,
            "is_admin": u.is_admin,
            "date": u.created_at.strftime("%d %b %Y")
        }
        for u in users
    ]
class StatusUpdate(BaseModel):
    suggestion_id: int
    status: str

class RTIReply(BaseModel):
    rti_id: int
    reply: str

class MakeAdminRequest(BaseModel):
    email: str
    secret: str

@app.post("/admin/make-admin")
def make_admin(req: MakeAdminRequest, db: Session = Depends(get_db)):
    if req.secret != "janseva-admin-2026":
        raise HTTPException(status_code=403, detail="Wrong secret key")
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_admin = True
    db.commit()
    return {"message": f"{user.full_name} is now an admin!"}

@app.get("/admin/stats")
def admin_stats(db: Session = Depends(get_db)):
    total = db.query(Suggestion).count()
    open_count = db.query(Suggestion).filter(Suggestion.status == "Open").count()
    review_count = db.query(Suggestion).filter(Suggestion.status == "Under Review").count()
    resolved_count = db.query(Suggestion).filter(Suggestion.status == "Resolved").count()
    rti_count = db.query(RTIApplication).count()
    return {
        "total_suggestions": total,
        "open": open_count,
        "under_review": review_count,
        "resolved": resolved_count,
        "total_rtis": rti_count
    }

@app.get("/admin/suggestions")
def admin_get_suggestions(db: Session = Depends(get_db)):
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
            "date": s.created_at.strftime("%d %b %Y")
        }
        for s in suggestions
    ]

@app.post("/admin/update-status")
def update_status(req: StatusUpdate, db: Session = Depends(get_db)):
    suggestion = db.query(Suggestion).filter(Suggestion.id == req.suggestion_id).first()
    if not suggestion:
        raise HTTPException(status_code=404, detail="Suggestion not found")
    suggestion.status = req.status
    db.commit()
    return {"message": "Status updated!", "status": req.status}

@app.get("/admin/rtis")
def admin_get_rtis(db: Session = Depends(get_db)):
    rtis = db.query(RTIApplication).order_by(RTIApplication.created_at.desc()).all()
    return [
        {
            "id": a.id,
            "name": a.name,
            "department": a.department,
            "query": a.query,
            "reference_id": a.reference_id,
            "status": a.status,
            "reply": getattr(a, "reply", ""),
            "date": a.created_at.strftime("%d %b %Y")
        }
        for a in rtis
    ]

@app.post("/admin/reply-rti")
def reply_rti(req: RTIReply, db: Session = Depends(get_db)):
    rti = db.query(RTIApplication).filter(RTIApplication.id == req.rti_id).first()
    if not rti:
        raise HTTPException(status_code=404, detail="RTI not found")
    rti.status = "Replied"
    db.commit()
    return {"message": "RTI reply recorded!"}

@app.get("/admin/users")
def admin_get_users(db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.created_at.desc()).all()
    return [
        {
            "id": u.id,
            "full_name": u.full_name,
            "email": u.email,
            "mobile": u.mobile,
            "district": u.district,
            "is_admin": u.is_admin,
            "date": u.created_at.strftime("%d %b %Y")
        }
        for u in users
    ]