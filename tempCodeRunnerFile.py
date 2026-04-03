from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class SuggestionRequest(BaseModel):
    title: str
    category: str
    description: str

class RTIRequest(BaseModel):
    name: str
    query: str
    department: str

@app.get("/")
def home():
    return {"message": "JanSeva backend is running!"}

@app.post("/analyze-suggestion")
def analyze_suggestion(req: SuggestionRequest):
    analysis = "Severity: High\n\nDepartment: PWD Haryana\n\nAction: Immediate inspection needed within 7 days.\n\nRTI Needed: Yes\n\nTimeline: 15 to 30 days"
    return {"analysis": analysis}

@app.post("/generate-rti")
def generate_rti(req: RTIRequest):
    rti = "To,\nThe Public Information Officer,\n" + req.department + "\n\nSubject: RTI Application under RTI Act 2005\n\nI, " + req.name + ", request the following information:\n\n1. " + req.query + "\n\n2. Current status and timeline.\n\n3. Copies of all relevant orders.\n\nFee: Rs 10 enclosed.\n\nYours faithfully,\n" + req.name
    return {"rti": rti}
