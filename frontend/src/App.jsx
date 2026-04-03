import { useState } from "react"

const API = "http://localhost:8000"

export default function App() {
  const [page, setPage] = useState("dashboard")

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#FDF8F0" }}>
      
      {/* HEADER */}
      <header style={{ background: "#0D1B3E", padding: "0 2rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", background: "#FF6B1A", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700" }}>JS</div>
          <div>
            <div style={{ color: "#fff", fontWeight: "600", fontSize: "1.1rem" }}>JanSeva</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem" }}>जन सेवा · Civic Platform</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: "4px" }}>
          {["dashboard", "suggestions", "rti", "vision"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={{ padding: "7px 16px", borderRadius: "6px", border: "none", cursor: "pointer", background: page === p ? "rgba(255,107,26,0.2)" : "transparent", color: page === p ? "#FF6B1A" : "rgba(255,255,255,0.6)", fontWeight: "500", fontSize: "0.85rem", textTransform: "capitalize" }}>
              {p === "rti" ? "File RTI" : p === "vision" ? "🏙 Urban AI" : p}
            </button>
          ))}
        </nav>
      </header>

      {/* PAGES */}
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        {page === "dashboard" && <Dashboard />}
        {page === "suggestions" && <Suggestions />}
        {page === "rti" && <RTI />}
        {page === "vision" && <VisionAnalysis />}
      </main>
    </div>
  )
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const stats = [
    { num: "2,847", label: "Suggestions Filed", color: "#FF6B1A" },
    { num: "68%", label: "Issues Resolved", color: "#128807" },
    { num: "341", label: "RTIs Filed", color: "#0D1B3E" },
    { num: "4.2 days", label: "Avg Response Time", color: "#D4A017" },
  ]
  const issues = [
    { label: "Road & Infrastructure", val: 38, color: "#E85D24" },
    { label: "Water Supply", val: 22, color: "#3B82F6" },
    { label: "Electricity", val: 16, color: "#D97706" },
    { label: "Health", val: 12, color: "#16A34A" },
    { label: "Sanitation", val: 8, color: "#9333EA" },
  ]
  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "4px" }}>Civic Overview — Rohtak, Haryana</h1>
      <p style={{ color: "#6B7280", marginBottom: "1.5rem", fontSize: "0.9rem" }}>Real-time snapshot of citizen activity</p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.2rem", borderLeft: `4px solid ${s.color}` }}>
            <div style={{ fontSize: "1.8rem", fontWeight: "700" }}>{s.num}</div>
            <div style={{ fontSize: "0.75rem", color: "#6B7280", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>Issues by Category</h2>
        {issues.map(i => (
          <div key={i.label} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
            <div style={{ minWidth: "160px", fontSize: "0.82rem", fontWeight: "500" }}>{i.label}</div>
            <div style={{ flex: 1, height: "10px", background: "#F3F4F6", borderRadius: "5px", overflow: "hidden" }}>
              <div style={{ width: `${i.val * 2.5}%`, height: "100%", background: i.color, borderRadius: "5px" }} />
            </div>
            <div style={{ fontSize: "0.78rem", color: "#6B7280", minWidth: "36px" }}>{i.val}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── SUGGESTIONS ───────────────────────────────────────────────────────────────
function Suggestions() {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  const loadSuggestions = async () => {
    try {
      const res = await fetch(`${API}/suggestions`)
      const data = await res.json()
      setSuggestions(data)
    } catch {
      console.log("Could not load suggestions")
    }
  }

  useState(() => { loadSuggestions() }, [])
  const [voted, setVoted] = useState(new Set())

  const analyze = async () => {
    if (!title || !description) return alert("Please fill title and description first")
    setLoading(true)
    setAnalysis("")
    try {
      const res = await fetch(`${API}/analyze-suggestion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, description })
      })
      const data = await res.json()
      setAnalysis(data.analysis)
    } catch {
      setAnalysis("Could not connect to backend. Make sure it is running on port 8000.")
    }
    setLoading(false)
  }

  const submit = async () => {
    if (!title || !category || !description) return alert("Please fill all fields")
    try {
      await fetch(`${API}/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, location: "Rohtak", description })
      })
      await loadSuggestions()
      setTitle(""); setCategory(""); setDescription(""); setAnalysis(""); setShowForm(false)
    } catch {
      alert("Could not save suggestion")
    }
  }

  const vote = async (id) => {
    try {
      await fetch(`${API}/suggestions/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suggestion_id: id })
      })
      await loadSuggestions()
    } catch {
      console.log("Vote failed")
    }
  }

  const statusColor = { "Open": "#F59E0B", "Under Review": "#3B82F6", "Resolved": "#16A34A" }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Public Suggestions</h1>
          <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>Submit and upvote civic issues</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: "10px 20px", background: "#FF6B1A", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
          + New Suggestion
        </button>
      </div>

      {showForm && (
        <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>Submit a Civic Issue</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem" }}>
                <option value="">Select category</option>
                <option>Road</option><option>Water</option><option>Electric</option><option>Health</option><option>Sanitation</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>Issue Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Brief title" style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem" }} />
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the issue in detail..." rows={3} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem", resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={submit} style={{ padding: "9px 18px", background: "#FF6B1A", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>Submit</button>
            <button onClick={analyze} disabled={loading} style={{ padding: "9px 18px", background: "#0D1B3E", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
              {loading ? "Analyzing..." : "🤖 AI Analyze"}
            </button>
          </div>
          {analysis && (
            <div style={{ marginTop: "1rem", background: "#f0f7ff", border: "1.5px solid #C7D9F0", borderRadius: "10px", padding: "1rem" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: "700", color: "#0D1B3E", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>🤖 AI Analysis</div>
              <pre style={{ fontSize: "0.83rem", lineHeight: "1.7", whiteSpace: "pre-wrap", margin: 0 }}>{analysis}</pre>
            </div>
          )}
        </div>
      )}

      {suggestions.map(s => (
        <div key={s.id} style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.2rem 1.4rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>{s.title}</div>
            <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "600", background: "#FEE2E2", color: "#991B1B" }}>{s.category}</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "#6B7280", marginBottom: "6px" }}>📍 {s.location}</div>
          <div style={{ fontSize: "0.83rem", color: "#4B5563", lineHeight: "1.6" }}>{s.body}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
            <button onClick={() => vote(s.id)} style={{ padding: "5px 12px", border: `1px solid ${voted.has(s.id) ? "#FF6B1A" : "#E5E0D5"}`, borderRadius: "6px", background: voted.has(s.id) ? "rgba(255,107,26,0.1)" : "#F9F5EE", cursor: "pointer", fontSize: "0.78rem", color: voted.has(s.id) ? "#FF6B1A" : "#6B7280" }}>
              👍 {s.votes}
            </button>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: statusColor[s.status] || "#F59E0B", display: "inline-block" }} />
            <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>{s.status}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── RTI ───────────────────────────────────────────────────────────────────────
function RTI() {
  const [name, setName] = useState("")
  const [dept, setDept] = useState("")
  const [query, setQuery] = useState("")
  const [draft, setDraft] = useState("")
  const [loading, setLoading] = useState(false)
  const [filed, setFiled] = useState(false)
  const [refId, setRefId] = useState("")

  const generate = async () => {
    if (!name || !query) return alert("Please fill your name and query")
    setLoading(true)
    setDraft("")
    try {
      const res = await fetch(`${API}/generate-rti`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, query, department: dept || "Public Works Department, Haryana" })
      })
      const data = await res.json()
      setDraft(data.rti)
    } catch {
      setDraft("Could not connect to backend. Make sure it is running on port 8000.")
    }
    setLoading(false)
  }

  const fileRTI = () => {
    const id = "RTI/HR/2026/" + Math.floor(Math.random() * 900 + 100)
    setRefId(id)
    setFiled(true)
  }

  if (filed) return (
    <div style={{ textAlign: "center", padding: "3rem", background: "#fff", borderRadius: "12px", border: "1px solid #E5E0D5" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
      <h2 style={{ color: "#16A34A", fontSize: "1.3rem", marginBottom: "8px" }}>RTI Successfully Filed!</h2>
      <p style={{ color: "#6B7280", marginBottom: "6px" }}>Reference ID: <strong style={{ color: "#FF6B1A" }}>{refId}</strong></p>
      <p style={{ color: "#6B7280", fontSize: "0.85rem" }}>Expected response within 30 days as per RTI Act 2005</p>
      <button onClick={() => { setFiled(false); setDraft(""); setName(""); setQuery(""); setDept("") }} style={{ marginTop: "1.5rem", padding: "9px 20px", background: "#F9F5EE", border: "1px solid #E5E0D5", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
        File Another RTI
      </button>
    </div>
  )

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "4px" }}>File an RTI Application</h1>
      <p style={{ color: "#6B7280", marginBottom: "1.5rem", fontSize: "0.9rem" }}>AI will draft your official RTI and route it to the right authority</p>

      <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>Your Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Rajesh Kumar" style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem" }} />
          </div>
          <div>
            <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>Department (optional)</label>
            <select value={dept} onChange={e => setDept(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem" }}>
              <option value="">Let AI suggest</option>
              <option>Public Works Department, Haryana</option>
              <option>Municipal Corporation, Rohtak</option>
              <option>PHED Haryana</option>
              <option>Health Department, Haryana</option>
              <option>HVPN Haryana</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>What do you want to know? (Hindi या English)</label>
          <textarea value={query} onChange={e => setQuery(e.target.value)} placeholder="Describe what information you need from the government..." rows={4} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem", resize: "vertical" }} />
        </div>
        <button onClick={generate} disabled={loading} style={{ padding: "10px 22px", background: "#FF6B1A", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }}>
          {loading ? "⏳ Generating..." : "🤖 Generate RTI Draft"}
        </button>
      </div>

      {draft && (
        <div>
          <div style={{ background: "#f0f7ff", border: "1.5px solid #C7D9F0", borderRadius: "12px", padding: "1.2rem", marginBottom: "1rem", position: "relative" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: "700", color: "#0D1B3E", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>🤖 AI Generated RTI Draft</div>
            <pre style={{ fontSize: "0.83rem", lineHeight: "1.8", whiteSpace: "pre-wrap", margin: 0 }}>{draft}</pre>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={fileRTI} style={{ padding: "10px 22px", background: "#128807", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>✅ File This RTI</button>
            <button onClick={() => setDraft("")} style={{ padding: "10px 22px", background: "#F9F5EE", border: "1px solid #E5E0D5", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>← Edit</button>
          </div>
        </div>
      )}
    </div>
  )
}
function VisionAnalysis() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [location, setLocation] = useState("")
  const [query, setQuery] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setPreview(ev.target.result)
      setImage(ev.target.result.split(",")[1])
    }
    reader.readAsDataURL(file)
  }

  const analyze = async () => {
    if (!image) return alert("Please upload an image first")
    if (!location) return alert("Please enter the location")
    setLoading(true)
    setAnalysis("")
    try {
      const res = await fetch(`${API}/analyze-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_base64: image,
          location: location,
          query: query || "What should be built or improved here?"
        })
      })
      const data = await res.json()
      setAnalysis(data.analysis)
    } catch {
      setAnalysis("Could not connect to backend. Make sure it is running on port 8000.")
    }
    setLoading(false)
  }

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "4px" }}>
        🏙 AI Urban Planning Vision
      </h1>
      <p style={{ color: "#6B7280", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
        Upload a photo of any area — AI will analyze and suggest what to build or improve
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        
        {/* LEFT — Upload */}
        <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>Upload Area Photo</h2>
          
          <div style={{ border: "2px dashed #E5E0D5", borderRadius: "10px", padding: "2rem", textAlign: "center", marginBottom: "1rem", cursor: "pointer", background: "#F9F5EE" }}
            onClick={() => document.getElementById("img-upload").click()}>
            {preview ? (
              <img src={preview} alt="preview" style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px", objectFit: "cover" }} />
            ) : (
              <div>
                <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>📸</div>
                <div style={{ fontSize: "0.85rem", color: "#6B7280" }}>Click to upload a photo</div>
                <div style={{ fontSize: "0.75rem", color: "#9CA3AF", marginTop: "4px" }}>JPG, PNG supported</div>
              </div>
            )}
          </div>
          <input id="img-upload" type="file" accept="image/*" onChange={handleImage} style={{ display: "none" }} />

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>Location / Area Name</label>
            <input value={location} onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Sector 14, Rohtak, Haryana"
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem" }} />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>Your Question (optional)</label>
            <textarea value={query} onChange={e => setQuery(e.target.value)}
              placeholder="e.g. What can be built on this empty plot? What infrastructure is missing?"
              rows={3}
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem", resize: "vertical" }} />
          </div>

          <button onClick={analyze} disabled={loading}
            style={{ width: "100%", padding: "11px", background: "#FF6B1A", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }}>
            {loading ? "⏳ AI is analyzing..." : "🤖 Analyze with AI"}
          </button>
        </div>

        {/* RIGHT — Results */}
        <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>AI Analysis Report</h2>
          {!analysis && !loading && (
            <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#9CA3AF" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🏗</div>
              <div style={{ fontSize: "0.85rem" }}>Upload an image and click analyze to see AI recommendations</div>
            </div>
          )}
          {loading && (
            <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#6B7280" }}>
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🤖</div>
              <div style={{ fontSize: "0.85rem" }}>AI is examining the image...</div>
            </div>
          )}
          {analysis && (
            <div style={{ background: "#f0f7ff", border: "1.5px solid #C7D9F0", borderRadius: "10px", padding: "1rem" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: "700", color: "#0D1B3E", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                🤖 AI Planning Report
              </div>
              <pre style={{ fontSize: "0.82rem", lineHeight: "1.8", whiteSpace: "pre-wrap", margin: 0, color: "#1F2937" }}>{analysis}</pre>
              <button onClick={() => {
                const el = document.createElement("a")
                el.href = "data:text/plain;charset=utf-8," + encodeURIComponent(analysis)
                el.download = "urban-analysis-report.txt"
                el.click()
              }} style={{ marginTop: "1rem", padding: "8px 16px", background: "#0D1B3E", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "600" }}>
                ⬇ Download Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}