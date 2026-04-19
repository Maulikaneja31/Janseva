import { useState } from "react"

const API = "https://janseva-backend.onrender.com"
let currentLang = "en"

const translations = {
  en: {
    dashboard: "Dashboard", suggestions: "Suggestions", fileRti: "File RTI",
    urbanAi: "🏙 Urban AI", login: "Login", civicOverview: "Civic Overview — Rohtak, Haryana",
    realtimeSnapshot: "Real-time snapshot of citizen activity",
    suggestionsFiled: "Suggestions Filed", issuesResolved: "Issues Resolved",
    rtisFiled: "RTIs Filed", avgResponse: "Avg Response Time",
    issuesByCategory: "Issues by Category", publicSuggestions: "Public Suggestions",
    submitUpvote: "Submit and upvote civic issues", newSuggestion: "+ New Suggestion",
    submitIssue: "Submit a Civic Issue", category: "Category", issueTitle: "Issue Title",
    description: "Description", submit: "Submit", aiAnalyze: "🤖 AI Analyze",
    aiAnalysis: "AI Analysis", fileRtiTitle: "File an RTI Application",
    fileRtiSub: "AI will draft your official RTI and route it to the right authority",
    yourName: "Your Full Name", department: "Department (optional)",
    whatToKnow: "What do you want to know? (Hindi या English)",
    generateRti: "🤖 Generate RTI Draft", fileThis: "✅ File This RTI", edit: "← Edit",
    rtiSuccess: "RTI Successfully Filed!", rtiExpected: "Expected response within 30 days as per RTI Act 2005",
    fileAnother: "File Another RTI", welcome: "Welcome to JanSeva",
    civicVoice: "Your civic voice, amplified by AI", signIn: "Sign In", register: "Register",
    createAccount: "Create Account", fullName: "Full Name", email: "Email address",
    mobile: "+91 Mobile Number", district: "District", password: "Password",
    verifiedCitizen: "Verified Citizen ✅", profileDetails: "Profile Details",
    signOut: "Sign Out", yourActivity: "Your Activity", suggestionsFiled2: "Suggestions Filed",
    urbanTitle: "🏙 AI Urban Planning Vision",
    urbanSub: "Upload a photo of any area — AI will analyze and suggest what to build",
    uploadPhoto: "Click to upload a photo", location: "Location / Area Name",
    yourQuestion: "Your Question (optional)", analyzeAi: "🤖 Analyze with AI",
    aiPlanningReport: "🤖 AI Planning Report", download: "⬇ Download Report",
    analyzingImage: "AI is examining the image...",
    uploadFirst: "Upload an image and click analyze to see AI recommendations",
  },
  hi: {
    dashboard: "डैशबोर्ड", suggestions: "सुझाव", fileRti: "RTI दर्ज करें",
    urbanAi: "🏙 शहरी AI", login: "लॉगिन", civicOverview: "नागरिक अवलोकन — रोहतक, हरियाणा",
    realtimeSnapshot: "नागरिक गतिविधि का रियल-टाइम सारांश",
    suggestionsFiled: "सुझाव दर्ज", issuesResolved: "समस्याएं हल",
    rtisFiled: "RTI दर्ज", avgResponse: "औसत प्रतिक्रिया समय",
    issuesByCategory: "श्रेणी अनुसार समस्याएं", publicSuggestions: "सार्वजनिक सुझाव",
    submitUpvote: "नागरिक समस्याएं दर्ज करें और वोट करें", newSuggestion: "+ नया सुझाव",
    submitIssue: "नागरिक समस्या दर्ज करें", category: "श्रेणी", issueTitle: "समस्या का शीर्षक",
    description: "विवरण", submit: "जमा करें", aiAnalyze: "🤖 AI विश्लेषण",
    aiAnalysis: "AI विश्लेषण", fileRtiTitle: "RTI आवेदन दर्ज करें",
    fileRtiSub: "AI आपका आधिकारिक RTI तैयार करेगा",
    yourName: "आपका पूरा नाम", department: "विभाग (वैकल्पिक)",
    whatToKnow: "आप क्या जानना चाहते हैं?",
    generateRti: "🤖 RTI मसौदा तैयार करें", fileThis: "✅ यह RTI दर्ज करें",
    edit: "← संपादित करें", rtiSuccess: "RTI सफलतापूर्वक दर्ज हुई!",
    rtiExpected: "RTI अधिनियम 2005 के अनुसार 30 दिनों में उत्तर अपेक्षित",
    fileAnother: "एक और RTI दर्ज करें", welcome: "JanSeva में आपका स्वागत है",
    civicVoice: "आपकी नागरिक आवाज़, AI द्वारा प्रवर्धित", signIn: "साइन इन",
    register: "पंजीकरण", createAccount: "खाता बनाएं", fullName: "पूरा नाम",
    email: "ईमेल पता", mobile: "+91 मोबाइल नंबर", district: "जिला",
    password: "पासवर्ड", verifiedCitizen: "सत्यापित नागरिक ✅",
    profileDetails: "प्रोफ़ाइल विवरण", signOut: "साइन आउट",
    yourActivity: "आपकी गतिविधि", suggestionsFiled2: "सुझाव दर्ज",
    urbanTitle: "🏙 AI शहरी नियोजन दृष्टि",
    urbanSub: "फ़ोटो अपलोड करें — AI विश्लेषण करेगा",
    uploadPhoto: "फ़ोटो अपलोड करने के लिए क्लिक करें",
    location: "स्थान / क्षेत्र का नाम", yourQuestion: "आपका प्रश्न (वैकल्पिक)",
    analyzeAi: "🤖 AI से विश्लेषण करें", aiPlanningReport: "🤖 AI नियोजन रिपोर्ट",
    download: "⬇ रिपोर्ट डाउनलोड करें", analyzingImage: "AI छवि की जांच कर रहा है...",
    uploadFirst: "AI की सिफारिशें देखने के लिए छवि अपलोड करें",
  }
}

const getT = () => translations[currentLang]

export default function App() {
  const [page, setPage] = useState("dashboard")
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [lang, setLang] = useState("en")
  const t = translations[lang]
  currentLang = lang
  fetch(`${API}/`).catch(() => {})

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#FDF8F0" }}>
      <header style={{ background: "#0D1B3E", padding: "0 2rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", background: "#FF6B1A", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700" }}>JS</div>
          <div>
            <div style={{ color: "#fff", fontWeight: "600", fontSize: "1.1rem" }}>JanSeva</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem" }}>जन सेवा · Civic Platform</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {["dashboard", "suggestions", "rti", "vision", "account"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={{ padding: "7px 14px", borderRadius: "6px", border: "none", cursor: "pointer", background: page === p ? "rgba(255,107,26,0.2)" : "transparent", color: page === p ? "#FF6B1A" : "rgba(255,255,255,0.6)", fontWeight: "500", fontSize: "0.82rem" }}>
              {p === "rti" ? t.fileRti : p === "vision" ? t.urbanAi : p === "account" ? (user ? "👤 " + user.full_name.split(" ")[0] : t.login) : p === "dashboard" ? t.dashboard : t.suggestions}
            </button>
          ))}
          <button onClick={() => setLang(lang === "en" ? "hi" : "en")} style={{ padding: "7px 14px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: "0.82rem", fontWeight: "700", marginLeft: "8px" }}>
            {lang === "en" ? "हिं" : "EN"}
          </button>
        </nav>
      </header>
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        {page === "dashboard" && <Dashboard />}
        {page === "suggestions" && <Suggestions />}
        {page === "rti" && <RTI />}
        {page === "vision" && <VisionAnalysis />}
        {page === "account" && (user && user.is_admin ? <AdminDashboard user={user} token={token} setUser={setUser} setToken={setToken} /> : <Account user={user} token={token} setUser={setUser} setToken={setToken} setPage={setPage} />)}
      </main>
    </div>
  )
}

function Dashboard() {
  const t = getT()
  const stats = [
    { num: "2,847", label: t.suggestionsFiled, color: "#FF6B1A" },
    { num: "68%", label: t.issuesResolved, color: "#128807" },
    { num: "341", label: t.rtisFiled, color: "#0D1B3E" },
    { num: "4.2 days", label: t.avgResponse, color: "#D4A017" },
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
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "4px" }}>{t.civicOverview}</h1>
      <p style={{ color: "#6B7280", marginBottom: "1.5rem", fontSize: "0.9rem" }}>{t.realtimeSnapshot}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.2rem", borderLeft: `4px solid ${s.color}` }}>
            <div style={{ fontSize: "1.8rem", fontWeight: "700" }}>{s.num}</div>
            <div style={{ fontSize: "0.75rem", color: "#6B7280", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>{t.issuesByCategory}</h2>
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

function AdminDashboard({ user, token, setUser, setToken }) {
  const [tab, setTab] = useState("overview")
  const [suggestions, setSuggestions] = useState([])
  const [rtis, setRtis] = useState([])
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [replyText, setReplyText] = useState({})

  // Helper: adds Authorization header to every admin request
  const authHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }

  const load = async () => {
    try {
      const [s, r, u, st] = await Promise.all([
        fetch(`${API}/admin/suggestions`, { headers: authHeaders }).then(x => x.json()),
        fetch(`${API}/admin/rtis`,        { headers: authHeaders }).then(x => x.json()),
        fetch(`${API}/admin/users`,       { headers: authHeaders }).then(x => x.json()),
        fetch(`${API}/admin/stats`,       { headers: authHeaders }).then(x => x.json()),
      ])
      // If any call returns a 401/403 detail, the response is an error object
      if (s.detail || r.detail || u.detail || st.detail) {
        alert("Session expired. Please log in again.")
        setUser(null); setToken(null); localStorage.removeItem("token")
        return
      }
      setSuggestions(s); setRtis(r); setUsers(u); setStats(st)
      setLoaded(true)
    } catch { alert("Could not load admin data") }
  }

  if (!loaded) { load(); return <div style={{ textAlign: "center", padding: "3rem" }}>Loading admin data...</div> }

  const updateStatus = async (id, status) => {
    await fetch(`${API}/admin/update-status`, {
      method: "POST", headers: authHeaders,
      body: JSON.stringify({ suggestion_id: id, status })
    })
    load()
  }

  const replyRTI = async (id) => {
    await fetch(`${API}/admin/reply-rti`, {
      method: "POST", headers: authHeaders,
      body: JSON.stringify({ rti_id: id, reply: replyText[id] || "Your RTI has been acknowledged." })
    })
    load()
  }

  const logout = () => { setUser(null); setToken(null); localStorage.removeItem("token") }

  const statusColor = { "Open": "#F59E0B", "Under Review": "#3B82F6", "Resolved": "#16A34A", "Filed": "#8B5CF6", "Replied": "#16A34A" }
  const tabs = ["overview", "issues", "rtis", "users"]

  return (
    <div>
      {/* Admin Header */}
      <div style={{ background: "linear-gradient(135deg,#0D1B3E,#1A2E5A)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>Admin Dashboard</div>
          <div style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "700" }}>👮 {user.full_name}</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Government Official · JanSeva Admin</div>
        </div>
        <button onClick={logout} style={{ padding: "8px 16px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", color: "#fff", cursor: "pointer", fontSize: "0.82rem" }}>Sign Out</button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 18px", borderRadius: "8px", border: "none", cursor: "pointer", background: tab === t ? "#FF6B1A" : "#fff", color: tab === t ? "#fff" : "#6B7280", fontWeight: "600", fontSize: "0.85rem", border: "1px solid #E5E0D5" }}>
            {t === "overview" ? "📊 Overview" : t === "issues" ? "💬 Issues" : t === "rtis" ? "📋 RTIs" : "👥 Users"}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === "overview" && stats && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { num: stats.total_suggestions, label: "Total Issues", color: "#FF6B1A" },
              { num: stats.open, label: "Open", color: "#F59E0B" },
              { num: stats.under_review, label: "Under Review", color: "#3B82F6" },
              { num: stats.resolved, label: "Resolved", color: "#16A34A" },
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.2rem", borderLeft: `4px solid ${s.color}` }}>
                <div style={{ fontSize: "2rem", fontWeight: "700" }}>{s.num}</div>
                <div style={{ fontSize: "0.75rem", color: "#6B7280", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>📋 RTI Summary</h3>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: "#0D1B3E" }}>{stats.total_rtis}</div>
              <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>Total RTIs Filed</div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>👥 Citizens</h3>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: "#0D1B3E" }}>{users.length}</div>
              <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>Registered Users</div>
            </div>
          </div>
        </div>
      )}

      {/* Issues Tab */}
      {tab === "issues" && (
        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem" }}>All Citizen Issues ({suggestions.length})</h2>
          {suggestions.map(s => (
            <div key={s.id} style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.2rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div>
                  <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>{s.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6B7280", marginTop: "2px" }}>📍 {s.location} · {s.category} · 👍 {s.votes} votes · {s.date}</div>
                </div>
                <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "600", background: s.status === "Resolved" ? "#D1FAE5" : s.status === "Under Review" ? "#DBEAFE" : "#FEF3C7", color: statusColor[s.status] }}>
                  {s.status}
                </span>
              </div>
              <div style={{ fontSize: "0.82rem", color: "#4B5563", marginBottom: "10px" }}>{s.body}</div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => updateStatus(s.id, "Under Review")} style={{ padding: "5px 12px", background: "#DBEAFE", color: "#1E40AF", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem", fontWeight: "600" }}>
                  Mark Under Review
                </button>
                <button onClick={() => updateStatus(s.id, "Resolved")} style={{ padding: "5px 12px", background: "#D1FAE5", color: "#065F46", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem", fontWeight: "600" }}>
                  Mark Resolved ✅
                </button>
                <button onClick={() => updateStatus(s.id, "Open")} style={{ padding: "5px 12px", background: "#FEF3C7", color: "#92400E", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem", fontWeight: "600" }}>
                  Reopen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RTIs Tab */}
      {tab === "rtis" && (
        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem" }}>All RTI Applications ({rtis.length})</h2>
          {rtis.map(r => (
            <div key={r.id} style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.2rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div>
                  <div style={{ fontWeight: "600", fontSize: "0.85rem", color: "#FF6B1A" }}>{r.reference_id}</div>
                  <div style={{ fontWeight: "600", fontSize: "0.95rem", marginTop: "2px" }}>{r.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{r.department} · {r.date}</div>
                </div>
                <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "600", background: r.status === "Replied" ? "#D1FAE5" : "#EDE9FE", color: r.status === "Replied" ? "#065F46" : "#5B21B6" }}>
                  {r.status}
                </span>
              </div>
              <div style={{ fontSize: "0.82rem", color: "#4B5563", marginBottom: "10px", background: "#F9F5EE", padding: "8px 12px", borderRadius: "6px" }}>
                <strong>Query:</strong> {r.query}
              </div>
              {r.status !== "Replied" && (
                <div>
                  <textarea
                    placeholder="Type your official reply here..."
                    value={replyText[r.id] || ""}
                    onChange={e => setReplyText({ ...replyText, [r.id]: e.target.value })}
                    rows={2}
                    style={{ width: "100%", padding: "8px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.82rem", resize: "vertical", marginBottom: "8px" }}
                  />
                  <button onClick={() => replyRTI(r.id)} style={{ padding: "6px 14px", background: "#128807", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.78rem", fontWeight: "600" }}>
                    Send Reply ✅
                  </button>
                </div>
              )}
              {r.status === "Replied" && <div style={{ fontSize: "0.78rem", color: "#16A34A", fontWeight: "600" }}>✅ Reply sent</div>}
            </div>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {tab === "users" && (
        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem" }}>Registered Citizens ({users.length})</h2>
          <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F9F5EE" }}>
                  {["Name", "Email", "Mobile", "District", "Role", "Joined"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", fontSize: "0.78rem", fontWeight: "600", color: "#6B7280", textAlign: "left", borderBottom: "1px solid #E5E0D5" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "10px 14px", fontSize: "0.82rem", fontWeight: "500" }}>{u.full_name}</td>
                    <td style={{ padding: "10px 14px", fontSize: "0.82rem", color: "#6B7280" }}>{u.email}</td>
                    <td style={{ padding: "10px 14px", fontSize: "0.82rem", color: "#6B7280" }}>{u.mobile}</td>
                    <td style={{ padding: "10px 14px", fontSize: "0.82rem", color: "#6B7280" }}>{u.district}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "0.68rem", fontWeight: "600", background: u.is_admin ? "#DBEAFE" : "#F3F4F6", color: u.is_admin ? "#1E40AF" : "#6B7280" }}>
                        {u.is_admin ? "Admin" : "Citizen"}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px", fontSize: "0.78rem", color: "#6B7280" }}>{u.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function Suggestions() {
  const t = getT()
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [voted, setVoted] = useState(new Set())

  const loadSuggestions = async () => {
    try {
      const res = await fetch(`${API}/suggestions`)
      const data = await res.json()
      setSuggestions(data)
    } catch { console.log("Could not load suggestions") }
  }

  useState(() => { loadSuggestions() }, [])

  const analyze = async () => {
    if (!title || !description) return alert("Please fill title and description first")
    setLoading(true); setAnalysis("")
    const res = await fetch(`${API}/analyze-suggestion`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, description, location: "Rohtak" })
    })
    const data = await res.json()
    setAnalysis(data.analysis)
    setLoading(false)
  }

  const submit = async () => {
    if (!title || !category || !description) return alert("Please fill all fields")
    await fetch(`${API}/suggestions`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, location: "Rohtak", description })
    })
    await loadSuggestions()
    setTitle(""); setCategory(""); setDescription(""); setAnalysis(""); setShowForm(false)
  }

  const vote = async (id) => {
    await fetch(`${API}/suggestions/vote`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ suggestion_id: id })
    })
    await loadSuggestions()
  }

  const statusColor = { "Open": "#F59E0B", "Under Review": "#3B82F6", "Resolved": "#16A34A" }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700" }}>{t.publicSuggestions}</h1>
          <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>{t.submitUpvote}</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: "10px 20px", background: "#FF6B1A", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
          {t.newSuggestion}
        </button>
      </div>
      {showForm && (
        <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>{t.submitIssue}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>{t.category}</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem" }}>
                <option value="">Select</option>
                <option>Road</option><option>Water</option><option>Electric</option><option>Health</option><option>Sanitation</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>{t.issueTitle}</label>
              <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem" }} />
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>{t.description}</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem", resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={submit} style={{ padding: "9px 18px", background: "#FF6B1A", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>{t.submit}</button>
            <button onClick={analyze} disabled={loading} style={{ padding: "9px 18px", background: "#0D1B3E", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
              {loading ? "..." : t.aiAnalyze}
            </button>
          </div>
          {analysis && (
            <div style={{ marginTop: "1rem", background: "#f0f7ff", border: "1.5px solid #C7D9F0", borderRadius: "10px", padding: "1rem" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: "700", color: "#0D1B3E", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>{t.aiAnalysis}</div>
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

function RTI() {
  const t = getT()
  const [name, setName] = useState("")
  const [dept, setDept] = useState("")
  const [query, setQuery] = useState("")
  const [draft, setDraft] = useState("")
  const [loading, setLoading] = useState(false)
  const [filed, setFiled] = useState(false)
  const [refId, setRefId] = useState("")

  const generate = async () => {
    if (!name || !query) return alert("Please fill your name and query")
    setLoading(true); setDraft("")
    const res = await fetch(`${API}/generate-rti`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, query, department: dept || "Public Works Department, Haryana" })
    })
    const data = await res.json()
    setDraft(data.rti); setRefId(data.reference_id)
    setLoading(false)
  }

  if (filed) return (
    <div style={{ textAlign: "center", padding: "3rem", background: "#fff", borderRadius: "12px", border: "1px solid #E5E0D5" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
      <h2 style={{ color: "#16A34A", fontSize: "1.3rem", marginBottom: "8px" }}>{t.rtiSuccess}</h2>
      <p style={{ color: "#6B7280", marginBottom: "6px" }}>Reference ID: <strong style={{ color: "#FF6B1A" }}>{refId}</strong></p>
      <p style={{ color: "#6B7280", fontSize: "0.85rem" }}>{t.rtiExpected}</p>
      <button onClick={() => { setFiled(false); setDraft(""); setName(""); setQuery(""); setDept("") }} style={{ marginTop: "1.5rem", padding: "9px 20px", background: "#F9F5EE", border: "1px solid #E5E0D5", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
        {t.fileAnother}
      </button>
    </div>
  )

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "4px" }}>{t.fileRtiTitle}</h1>
      <p style={{ color: "#6B7280", marginBottom: "1.5rem", fontSize: "0.9rem" }}>{t.fileRtiSub}</p>
      <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>{t.yourName}</label>
            <input value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem" }} />
          </div>
          <div>
            <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>{t.department}</label>
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
          <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>{t.whatToKnow}</label>
          <textarea value={query} onChange={e => setQuery(e.target.value)} rows={4} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem", resize: "vertical" }} />
        </div>
        <button onClick={generate} disabled={loading} style={{ padding: "10px 22px", background: "#FF6B1A", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }}>
          {loading ? "⏳ Generating..." : t.generateRti}
        </button>
      </div>
      {draft && (
        <div>
          <div style={{ background: "#f0f7ff", border: "1.5px solid #C7D9F0", borderRadius: "12px", padding: "1.2rem", marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: "700", color: "#0D1B3E", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>🤖 AI Generated RTI Draft</div>
            <pre style={{ fontSize: "0.83rem", lineHeight: "1.8", whiteSpace: "pre-wrap", margin: 0 }}>{draft}</pre>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setFiled(true)} style={{ padding: "10px 22px", background: "#128807", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>{t.fileThis}</button>
            <button onClick={() => setDraft("")} style={{ padding: "10px 22px", background: "#F9F5EE", border: "1px solid #E5E0D5", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>{t.edit}</button>
          </div>
        </div>
      )}
    </div>
  )
}

function VisionAnalysis() {
  const t = getT()
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
    reader.onload = (ev) => { setPreview(ev.target.result); setImage(ev.target.result.split(",")[1]) }
    reader.readAsDataURL(file)
  }

  const analyze = async () => {
    if (!image) return alert("Please upload an image first")
    if (!location) return alert("Please enter the location")
    setLoading(true); setAnalysis("")
    const res = await fetch(`${API}/analyze-image`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_base64: image, location, query: query || "What should be built or improved here?" })
    })
    const data = await res.json()
    setAnalysis(data.analysis)
    setLoading(false)
  }

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "4px" }}>{t.urbanTitle}</h1>
      <p style={{ color: "#6B7280", marginBottom: "1.5rem", fontSize: "0.9rem" }}>{t.urbanSub}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem" }}>
          <div style={{ border: "2px dashed #E5E0D5", borderRadius: "10px", padding: "2rem", textAlign: "center", marginBottom: "1rem", cursor: "pointer", background: "#F9F5EE" }} onClick={() => document.getElementById("img-upload").click()}>
            {preview ? <img src={preview} alt="preview" style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px", objectFit: "cover" }} /> : (
              <div><div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>📸</div><div style={{ fontSize: "0.85rem", color: "#6B7280" }}>{t.uploadPhoto}</div></div>
            )}
          </div>
          <input id="img-upload" type="file" accept="image/*" onChange={handleImage} style={{ display: "none" }} />
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>{t.location}</label>
            <input value={location} onChange={e => setLocation(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem" }} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>{t.yourQuestion}</label>
            <textarea value={query} onChange={e => setQuery(e.target.value)} rows={3} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem", resize: "vertical" }} />
          </div>
          <button onClick={analyze} disabled={loading} style={{ width: "100%", padding: "11px", background: "#FF6B1A", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }}>
            {loading ? "⏳ Analyzing..." : t.analyzeAi}
          </button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem" }}>
          {!analysis && !loading && <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#9CA3AF" }}><div style={{ fontSize: "2.5rem" }}>🏗</div><div style={{ fontSize: "0.85rem", marginTop: "8px" }}>{t.uploadFirst}</div></div>}
          {loading && <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#6B7280" }}><div style={{ fontSize: "2rem" }}>🤖</div><div style={{ fontSize: "0.85rem", marginTop: "8px" }}>{t.analyzingImage}</div></div>}
          {analysis && (
            <div style={{ background: "#f0f7ff", border: "1.5px solid #C7D9F0", borderRadius: "10px", padding: "1rem" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: "700", color: "#0D1B3E", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>{t.aiPlanningReport}</div>
              <pre style={{ fontSize: "0.82rem", lineHeight: "1.8", whiteSpace: "pre-wrap", margin: 0, color: "#1F2937" }}>{analysis}</pre>
              <button onClick={() => { const el = document.createElement("a"); el.href = "data:text/plain;charset=utf-8," + encodeURIComponent(analysis); el.download = "urban-analysis-report.txt"; el.click() }} style={{ marginTop: "1rem", padding: "8px 16px", background: "#0D1B3E", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "600" }}>
                {t.download}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Account({ user, token, setUser, setToken, setPage }) {
  const t = getT()
  const [mode, setMode] = useState(user ? "profile" : "login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [mobile, setMobile] = useState("")
  const [district, setDistrict] = useState("Rohtak")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [realOtp, setRealOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [loginMethod, setLoginMethod] = useState("email")

  const login = async () => {
    if (!email || !password) return setError("Please fill all fields")
    setLoading(true); setError("")
    const res = await fetch(`${API}/auth/login`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) { setLoading(false); return setError(data.detail || "Login failed") }
    setUser(data.user); setToken(data.token)
    localStorage.setItem("token", data.token)
    setMode("profile")
    setLoading(false)
  }

  const register = async () => {
    if (!fullName || !email || !mobile || !password) return setError("Please fill all fields")
    setLoading(true); setError("")
    const res = await fetch(`${API}/auth/register`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: fullName, email, mobile, password, district })
    })
    const data = await res.json()
    if (!res.ok) { setLoading(false); return setError(data.detail || "Registration failed") }
    setUser(data.user); setToken(data.token)
    localStorage.setItem("token", data.token)
    setMode("profile")
    setLoading(false)
  }

  const sendOtp = async () => {
    if (!mobile) return setError("Enter mobile number first")
    setLoading(true)
    const res = await fetch(`${API}/auth/send-otp`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile })
    })
    const data = await res.json()
    setRealOtp(data.otp); setOtpSent(true)
    setError(`OTP sent! (Demo OTP: ${data.otp})`)
    setLoading(false)
  }

  const logout = () => {
    setUser(null); setToken(null)
    localStorage.removeItem("token")
    setMode("login")
  }

  const inp = { width: "100%", padding: "10px 14px", border: "1.5px solid #E5E0D5", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "1rem", fontFamily: "sans-serif" }
  const btn = { width: "100%", padding: "11px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem", marginBottom: "8px" }

  if (mode === "profile" && user) return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "2rem", textAlign: "center", marginBottom: "1rem" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg,#FF6B1A,#D4A017)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: "2rem", color: "#fff", fontWeight: "700" }}>
          {user.full_name[0].toUpperCase()}
        </div>
        <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "4px" }}>{user.full_name}</h2>
        <p style={{ color: "#6B7280", fontSize: "0.85rem" }}>{t.verifiedCitizen}</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>{t.profileDetails}</h3>
        {[{ label: "Email", value: user.email }, { label: "Mobile", value: user.mobile }, { label: "District", value: user.district }].map(item => (
          <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>
            <span style={{ fontSize: "0.82rem", color: "#6B7280", fontWeight: "600" }}>{item.label}</span>
            <span style={{ fontSize: "0.82rem", color: "#1F2937" }}>{item.value}</span>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>{t.yourActivity}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{ background: "#FFF7ED", borderRadius: "8px", padding: "1rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#FF6B1A" }}>0</div>
            <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{t.suggestionsFiled2}</div>
          </div>
          <div style={{ background: "#F0FDF4", borderRadius: "8px", padding: "1rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#16A34A" }}>0</div>
            <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{t.rtisFiled}</div>
          </div>
        </div>
      </div>
      <button onClick={logout} style={{ ...btn, background: "#FEE2E2", color: "#991B1B" }}>{t.signOut}</button>
    </div>
  )

  return (
    <div style={{ maxWidth: "420px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ fontSize: "3rem" }}>🏛️</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "4px" }}>{t.welcome}</h1>
        <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>{t.civicVoice}</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid #E5E0D5", borderRadius: "12px", padding: "1.5rem" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem" }}>
          <button onClick={() => { setMode("login"); setError("") }} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "none", cursor: "pointer", background: mode === "login" ? "#FF6B1A" : "#F9F5EE", color: mode === "login" ? "#fff" : "#6B7280", fontWeight: "600", fontSize: "0.85rem" }}>{t.signIn}</button>
          <button onClick={() => { setMode("register"); setError("") }} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: "none", cursor: "pointer", background: mode === "register" ? "#FF6B1A" : "#F9F5EE", color: mode === "register" ? "#fff" : "#6B7280", fontWeight: "600", fontSize: "0.85rem" }}>{t.register}</button>
        </div>
        {error && <div style={{ padding: "10px 14px", background: error.includes("OTP") ? "#F0FDF4" : "#FEF2F2", borderRadius: "8px", fontSize: "0.82rem", color: error.includes("OTP") ? "#166534" : "#991B1B", marginBottom: "1rem" }}>{error}</div>}
        {mode === "login" && (
          <>
            <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
              <button onClick={() => setLoginMethod("email")} style={{ flex: 1, padding: "7px", borderRadius: "6px", border: `1.5px solid ${loginMethod === "email" ? "#FF6B1A" : "#E5E0D5"}`, background: "transparent", cursor: "pointer", fontSize: "0.8rem", color: loginMethod === "email" ? "#FF6B1A" : "#6B7280", fontWeight: "500" }}>Email</button>
              <button onClick={() => setLoginMethod("mobile")} style={{ flex: 1, padding: "7px", borderRadius: "6px", border: `1.5px solid ${loginMethod === "mobile" ? "#FF6B1A" : "#E5E0D5"}`, background: "transparent", cursor: "pointer", fontSize: "0.8rem", color: loginMethod === "mobile" ? "#FF6B1A" : "#6B7280", fontWeight: "500" }}>Mobile OTP</button>
            </div>
            {loginMethod === "email" ? (
              <>
                <input style={inp} placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} />
                <input style={inp} type="password" placeholder={t.password} value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={login} disabled={loading} style={{ ...btn, background: "#FF6B1A", color: "#fff" }}>{loading ? "..." : t.signIn}</button>
              </>
            ) : (
              <>
                <input style={inp} placeholder={t.mobile} value={mobile} onChange={e => setMobile(e.target.value)} />
                {!otpSent ? (
                  <button onClick={sendOtp} disabled={loading} style={{ ...btn, background: "#FF6B1A", color: "#fff" }}>{loading ? "..." : "Send OTP"}</button>
                ) : (
                  <>
                    <input style={inp} placeholder="Enter 6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} />
                    <button onClick={() => otp === realOtp ? setError("OTP verified!") : setError("Wrong OTP")} style={{ ...btn, background: "#FF6B1A", color: "#fff" }}>Verify OTP</button>
                  </>
                )}
              </>
            )}
          </>
        )}
        {mode === "register" && (
          <>
            <input style={inp} placeholder={t.fullName} value={fullName} onChange={e => setFullName(e.target.value)} />
            <input style={inp} placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} />
            <input style={inp} placeholder={t.mobile} value={mobile} onChange={e => setMobile(e.target.value)} />
            <select style={inp} value={district} onChange={e => setDistrict(e.target.value)}>
              <option>Rohtak</option><option>Gurugram</option><option>Faridabad</option>
              <option>Ambala</option><option>Hisar</option><option>Mohali</option>
              <option>Chandigarh</option><option>Ludhiana</option><option>Amritsar</option>
            </select>
            <input style={inp} type="password" placeholder={t.password} value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={register} disabled={loading} style={{ ...btn, background: "#FF6B1A", color: "#fff" }}>{loading ? "..." : t.createAccount}</button>
          </>
        )}
      </div>
    </div>
  )
}
