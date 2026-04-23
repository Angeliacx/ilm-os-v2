import { useState, useCallback, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// ILM OS — I LOVE MODELS — Agency Operations System
// CRM / CSM / Content Engine — Single-file React App
// Stack cible: Next.js + Supabase + Vercel
// ═══════════════════════════════════════════════════════════════

// --- THEME ---
const T = {
  bg: "#06060E",
  surface: "#0C0C18",
  card: "#111122",
  card2: "#161630",
  border: "#1C1C3A",
  gold: "#C9A84C",
  goldLight: "#E2C97E",
  goldDim: "rgba(201,168,76,0.15)",
  purple: "#7C5CFC",
  green: "#10D078",
  greenDim: "rgba(16,208,120,0.12)",
  orange: "#F59E0B",
  orangeDim: "rgba(245,158,11,0.12)",
  red: "#EF4444",
  redDim: "rgba(239,68,68,0.12)",
  blue: "#3B82F6",
  white: "#F1EEFF",
  muted: "#6B7280",
  mutedLight: "#9CA3AF",
};

// --- DATA: MODELS ---
const MODELS_DATA = [
  {
    id: "vanessa",
    name: "Vanessa",
    status: "active",
    onboarding: 90,
    manager: "Sophie + Jordan",
    niche: "Lifestyle / Mode / Glamour",
    face: true,
    ig_count: 11,
    ig_main: "Madamevanessaoff (35k)",
    of: true,
    mym: true,
    stage: "execution",
    autonomy: 75,
    assets_stock: 60,
    content_stock: 45,
    friction: "MYM quotidien, répartition MYM/OF",
    next_actions: ["Contenu avant 18/04", "Lien Sophie sur MYM", "Lives"],
    alert: "Vacances 18-26 avril",
    revenue_mtd: 0,
  },
  {
    id: "andrea",
    name: "Andréa",
    status: "onboarding",
    onboarding: 30,
    manager: "Jordan + Ned",
    niche: "Petite / Étudiante",
    face: true,
    ig_count: 3,
    ig_main: "Emmyjolii",
    of: false,
    mym: true,
    stage: "strategie",
    autonomy: 20,
    assets_stock: 15,
    content_stock: 10,
    friction: "Manque contenu, OF pas setup",
    next_actions: ["IG à jour (Ned)", "MYM+OF photos (Marvin)", "TikTok Lives"],
    alert: "Besoin contenu urgent",
    revenue_mtd: 0,
  },
  {
    id: "olesia",
    name: "Olesia",
    status: "onboarding",
    onboarding: 20,
    manager: "Ned",
    niche: "🔴 À trouver",
    face: true,
    ig_count: 3,
    ig_main: "Olesiaxoxo",
    of: false,
    mym: false,
    stage: "onboarding",
    autonomy: 10,
    assets_stock: 5,
    content_stock: 5,
    friction: "Niche non définie, pas d'OF/MYM",
    next_actions: ["Niche (Jordan+Ned)", "Réels (Ned)", "IG à jour", "OF Infloww"],
    alert: "Niche manquante — bloquant",
    revenue_mtd: 0,
  },
  {
    id: "elisa",
    name: "Elisa (Liya Bunnie)",
    status: "onboarding",
    onboarding: 10,
    manager: "À confirmer",
    niche: "No Face — à définir",
    face: false,
    ig_count: 1,
    ig_main: "liyabunnie",
    of: false,
    mym: false,
    stage: "onboarding",
    autonomy: 5,
    assets_stock: 0,
    content_stock: 0,
    friction: "Carte ID, niches, photos, arrivée 16/04",
    next_actions: ["Carte ID", "2nd compte + drive", "Niches", "Photos/réels"],
    alert: "Arrive 16 avril",
    revenue_mtd: 0,
  },
  {
    id: "juliette",
    name: "Juliette (Arthemys)",
    status: "onboarding",
    onboarding: 10,
    manager: "Louis + Jordan",
    niche: "Biker girl mystérieuse / No face",
    face: false,
    ig_count: 0,
    ig_main: "À créer",
    of: false,
    mym: false,
    stage: "onboarding",
    autonomy: 10,
    assets_stock: 5,
    content_stock: 0,
    friction: "4 questions Louis, drive, OF certifier, IG warm-up",
    next_actions: ["Questions Louis", "Drive", "OF n°2 certifier", "Warm-up IG"],
    alert: "Questions IA en attente 🔴",
    revenue_mtd: 0,
  },
];

// --- DATA: CHATTERS ---
const CHATTERS_DATA = [
  {
    id: "marvin",
    name: "Marvin",
    role: "Resp. Chatting & Pôle Média",
    models: "Toutes",
    kpi_messages: 0,
    kpi_revenue: 0,
    kpi_customs: 0,
    rigueur: 70,
    progression: 60,
    notes: "Manager Sophie + Kocé. Rétro-planning. MYM Vanessa quotidien.",
  },
  {
    id: "koce",
    name: "Kocé",
    role: "Chatteur",
    models: "Toutes (sous Marvin)",
    kpi_messages: 0,
    kpi_revenue: 0,
    kpi_customs: 0,
    rigueur: 50,
    progression: 40,
    notes: "Chatting quotidien OF + MYM. Suivi scripts Marvin.",
  },
];

// --- DATA: TEAM ---
const TEAM = [
  { name: "Jordan", role: "CEO", access: "full" },
  { name: "Sophie", role: "Gestionnaire comptes", access: "model_vanessa" },
  { name: "Marvin", role: "Resp. Chatting & Média", access: "chatting_all" },
  { name: "Ned", role: "Social Media Manager", access: "model_andrea_olesia" },
  { name: "Florian", role: "Opérationnel", access: "model_vanessa" },
  { name: "Kocé", role: "Chatteur", access: "chatting_read" },
  { name: "Louis", role: "Resp. Pôle I.A", access: "model_juliette" },
];

// --- DATA: DEADLINES ---
const DEADLINES = [
  { date: "10/04", task: "MYM Vanessa + répartition MYM/OF", resp: "Marvin", status: "pending" },
  { date: "10/04", task: "Questions Juliette (casque, moto, IA)", resp: "Louis+Jordan", status: "pending" },
  { date: "11/04", task: "Niche Olesia", resp: "Jordan+Ned", status: "pending" },
  { date: "11/04", task: "Emploi du temps chatteurs", resp: "Marvin", status: "pending" },
  { date: "12/04", task: "Réels Olesia", resp: "Ned", status: "todo" },
  { date: "12/04", task: "Scripts chatting Vanessa", resp: "Marvin", status: "todo" },
  { date: "12/04", task: "Infloww tous OF", resp: "Marvin", status: "todo" },
  { date: "14/04", task: "OF n°2 Juliette certifier", resp: "Jordan", status: "todo" },
  { date: "14/04", task: "IG Olesia+Andréa à jour", resp: "Ned", status: "todo" },
  { date: "16/04", task: "Arrivée Elisa — contenu", resp: "Jordan+Elisa", status: "todo" },
  { date: "16/04", task: "Feed Juliette", resp: "Louis", status: "todo" },
  { date: "16/04", task: "Rétro-planning TOUTES modèles", resp: "Marvin", status: "todo" },
  { date: "Avant 18/04", task: "Contenu Vanessa", resp: "Jordan", status: "urgent" },
];

// --- DATA: CONTENT PIPELINE ---
const CONTENT_STAGES = [
  { key: "idea", label: "Idée / Veille", color: T.muted },
  { key: "script", label: "Script / Brief", color: T.blue },
  { key: "shoot", label: "À tourner", color: T.purple },
  { key: "edit", label: "Montage", color: T.orange },
  { key: "validate", label: "Validation", color: T.gold },
  { key: "ready", label: "Prêt à poster", color: T.green },
  { key: "posted", label: "Posté", color: T.greenDim },
];

// --- DATA: FRICTIONS ---
const FRICTIONS = [
  { zone: "Onboarding", level: "high", detail: "3/5 modèles < 30% onboarding", impact: "Retard revenu" },
  { zone: "Niche", level: "critical", detail: "Olesia sans niche définie", impact: "Bloque tout le pipeline" },
  { zone: "Contenu", level: "high", detail: "Stock < 20% sur 4/5 modèles", impact: "Pas de régularité posting" },
  { zone: "Validation", level: "medium", detail: "Pas de process validation async", impact: "Dépendance calls" },
  { zone: "MYM/OF Setup", level: "high", detail: "3 modèles sans OF actif", impact: "0 revenu possible" },
  { zone: "Communication", level: "medium", detail: "Trop de calls, pas assez d'async", impact: "Temps perdu" },
  { zone: "Assets", level: "high", detail: "Manque photos/réels partout sauf Vanessa", impact: "IG warm-up bloqué" },
  { zone: "IA / Juliette", level: "medium", detail: "4 questions bloquantes non résolues", impact: "Feed bloqué" },
];

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const font = "'Cormorant Garamond', Georgia, serif";
const fontSans = "'DM Sans', 'Segoe UI', sans-serif";

function Badge({ children, color, bg }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        fontFamily: fontSans,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "3px 10px",
        borderRadius: 20,
        display: "inline-block",
        color: color || T.white,
        background: bg || T.card2,
      }}
    >
      {children}
    </span>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 14,
        padding: "18px 20px",
        borderTop: `2px solid ${accent || T.gold}`,
        minWidth: 140,
        flex: 1,
      }}
    >
      <div style={{ fontSize: 10, color: T.muted, fontFamily: fontSans, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: T.white, fontFamily: font }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: T.mutedLight, fontFamily: fontSans, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function ScoreRing({ score, size = 120 }) {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 70 ? T.green : score >= 40 ? T.orange : T.red;
  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.border} strokeWidth={6} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 700,
          color: T.white,
          fontFamily: font,
        }}
      >
        {score}
      </div>
    </div>
  );
}

function ProgressBar({ value, max = 100, color, height = 6 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ background: T.border, borderRadius: height, height, width: "100%", overflow: "hidden" }}>
      <div style={{ background: color || T.gold, height: "100%", width: `${pct}%`, borderRadius: height, transition: "width 0.6s ease" }} />
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontFamily: font,
        fontSize: 26,
        fontWeight: 600,
        color: T.goldLight,
        margin: "0 0 20px 0",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </h2>
  );
}

function SubTitle({ children }) {
  return (
    <h3 style={{ fontFamily: fontSans, fontSize: 13, fontWeight: 600, color: T.mutedLight, textTransform: "uppercase", letterSpacing: "0.1em", margin: "24px 0 12px" }}>
      {children}
    </h3>
  );
}

// ═══════════════════════════════════════════════════════════════
// NAV ITEMS
// ═══════════════════════════════════════════════════════════════

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: "◉" },
  { key: "models", label: "Modèles", icon: "♛" },
  { key: "chatters", label: "Chatters", icon: "✦" },
  { key: "content", label: "Contenu", icon: "◈" },
  { key: "deadlines", label: "Deadlines", icon: "⏱" },
  { key: "frictions", label: "Frictions", icon: "⚡" },
  { key: "team", label: "Équipe", icon: "◎" },
];

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function ILMOS() {
  const [tab, setTab] = useState("dashboard");
  const [selectedModel, setSelectedModel] = useState(null);

  // --- GLOBAL SCORES ---
  const avgOnboarding = Math.round(MODELS_DATA.reduce((a, m) => a + m.onboarding, 0) / MODELS_DATA.length);
  const avgAutonomy = Math.round(MODELS_DATA.reduce((a, m) => a + m.autonomy, 0) / MODELS_DATA.length);
  const avgAssets = Math.round(MODELS_DATA.reduce((a, m) => a + m.assets_stock, 0) / MODELS_DATA.length);
  const avgContent = Math.round(MODELS_DATA.reduce((a, m) => a + m.content_stock, 0) / MODELS_DATA.length);
  const activeModels = MODELS_DATA.filter((m) => m.status === "active").length;
  const onboardingModels = MODELS_DATA.filter((m) => m.status === "onboarding").length;
  const criticalFrictions = FRICTIONS.filter((f) => f.level === "critical" || f.level === "high").length;
  const pendingDeadlines = DEADLINES.filter((d) => d.status === "pending" || d.status === "urgent").length;

  const globalScore = Math.round(avgOnboarding * 0.3 + avgAutonomy * 0.25 + avgAssets * 0.2 + avgContent * 0.25);

  // ═══════ RENDER ═══════
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: fontSans, color: T.white }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* SIDEBAR */}
      <div
        style={{
          width: 220,
          minHeight: "100vh",
          background: T.surface,
          borderRight: `1px solid ${T.border}`,
          padding: "28px 0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div style={{ padding: "0 24px 28px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: T.goldLight, letterSpacing: "0.12em" }}>
            I LOVE
          </div>
          <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: T.goldLight, letterSpacing: "0.12em" }}>
            MODELS
          </div>
          <div style={{ fontSize: 9, color: T.muted, marginTop: 6, letterSpacing: "0.15em", textTransform: "uppercase" }}>Agency OS</div>
        </div>

        <nav style={{ padding: "16px 0", flex: 1 }}>
          {NAV.map((n) => (
            <button
              key={n.key}
              onClick={() => { setTab(n.key); setSelectedModel(null); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "10px 24px",
                background: tab === n.key ? T.goldDim : "transparent",
                border: "none",
                borderLeft: tab === n.key ? `2px solid ${T.gold}` : "2px solid transparent",
                color: tab === n.key ? T.goldLight : T.mutedLight,
                fontSize: 13,
                fontFamily: fontSans,
                fontWeight: tab === n.key ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 14 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 24px", borderTop: `1px solid ${T.border}`, fontSize: 10, color: T.muted }}>
          ILM OS v1 — Avril 2026
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "32px 36px", overflowY: "auto", maxHeight: "100vh" }}>
        {/* ══════════════════════ DASHBOARD ══════════════════════ */}
        {tab === "dashboard" && (
          <div>
            <SectionTitle>Dashboard CEO</SectionTitle>

            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <ScoreRing score={globalScore} size={140} />
                <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Score Global</div>
              </div>

              <div style={{ display: "flex", gap: 14, flex: 1, flexWrap: "wrap" }}>
                <StatCard label="Modèles actives" value={activeModels} sub={`${onboardingModels} en onboarding`} accent={T.green} />
                <StatCard label="Onboarding moyen" value={`${avgOnboarding}%`} accent={T.orange} />
                <StatCard label="Stock assets" value={`${avgAssets}%`} accent={T.purple} />
                <StatCard label="Frictions critiques" value={criticalFrictions} sub={`sur ${FRICTIONS.length} total`} accent={T.red} />
                <StatCard label="Deadlines urgentes" value={pendingDeadlines} accent={T.gold} />
                <StatCard label="Autonomie moyenne" value={`${avgAutonomy}%`} accent={T.blue} />
              </div>
            </div>

            <SubTitle>Pipeline Modèles</SubTitle>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {MODELS_DATA.map((m) => (
                <div
                  key={m.id}
                  onClick={() => { setTab("models"); setSelectedModel(m.id); }}
                  style={{
                    background: T.card,
                    border: `1px solid ${T.border}`,
                    borderRadius: 12,
                    padding: "16px 18px",
                    minWidth: 200,
                    flex: 1,
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                    borderLeft: `3px solid ${m.status === "active" ? T.green : T.orange}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontFamily: font, fontSize: 18, fontWeight: 600 }}>{m.name}</span>
                    <Badge color={m.status === "active" ? T.green : T.orange} bg={m.status === "active" ? T.greenDim : T.orangeDim}>
                      {m.status === "active" ? "Active" : `Onb. ${m.onboarding}%`}
                    </Badge>
                  </div>
                  <ProgressBar value={m.onboarding} color={m.status === "active" ? T.green : T.orange} />
                  <div style={{ fontSize: 11, color: T.mutedLight, marginTop: 8 }}>{m.niche}</div>
                  {m.alert && (
                    <div style={{ fontSize: 10, color: T.red, marginTop: 6, fontWeight: 600 }}>⚠ {m.alert}</div>
                  )}
                </div>
              ))}
            </div>

            <SubTitle>Deadlines immédiates</SubTitle>
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
              {DEADLINES.filter((d) => d.status === "urgent" || d.status === "pending")
                .slice(0, 8)
                .map((d, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "10px 18px",
                      borderBottom: `1px solid ${T.border}`,
                      fontSize: 12,
                    }}
                  >
                    <span style={{ color: d.status === "urgent" ? T.red : T.gold, fontWeight: 700, minWidth: 70 }}>{d.date}</span>
                    <span style={{ flex: 1, color: T.white }}>{d.task}</span>
                    <Badge color={T.mutedLight}>{d.resp}</Badge>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ══════════════════════ MODELES ══════════════════════ */}
        {tab === "models" && (
          <div>
            <SectionTitle>CSM — Suivi Modèles</SectionTitle>

            {!selectedModel ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
                {MODELS_DATA.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedModel(m.id)}
                    style={{
                      background: T.card,
                      border: `1px solid ${T.border}`,
                      borderRadius: 14,
                      padding: 20,
                      cursor: "pointer",
                      borderLeft: `3px solid ${m.status === "active" ? T.green : T.orange}`,
                      transition: "transform 0.15s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: font, fontSize: 20, fontWeight: 600 }}>{m.name}</span>
                      <Badge color={m.status === "active" ? T.green : T.orange} bg={m.status === "active" ? T.greenDim : T.orangeDim}>
                        {m.stage}
                      </Badge>
                    </div>

                    <div style={{ fontSize: 12, color: T.mutedLight, margin: "8px 0 14px" }}>{m.niche} — {m.manager}</div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                      {[
                        { l: "Onboarding", v: m.onboarding },
                        { l: "Autonomie", v: m.autonomy },
                        { l: "Assets", v: m.assets_stock },
                        { l: "Contenu", v: m.content_stock },
                      ].map((s) => (
                        <div key={s.l}>
                          <div style={{ fontSize: 10, color: T.muted, marginBottom: 3 }}>{s.l}</div>
                          <ProgressBar value={s.v} color={s.v >= 60 ? T.green : s.v >= 30 ? T.orange : T.red} />
                          <div style={{ fontSize: 10, color: T.mutedLight, marginTop: 2 }}>{s.v}%</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {m.face ? <Badge color={T.green} bg={T.greenDim}>Face</Badge> : <Badge color={T.purple} bg="rgba(124,92,252,0.15)">No Face</Badge>}
                      {m.of && <Badge color={T.green} bg={T.greenDim}>OF</Badge>}
                      {m.mym && <Badge color={T.gold} bg={T.goldDim}>MYM</Badge>}
                      <Badge color={T.mutedLight}>IG ×{m.ig_count}</Badge>
                    </div>

                    {m.alert && <div style={{ fontSize: 11, color: T.red, marginTop: 10, fontWeight: 600 }}>⚠ {m.alert}</div>}
                  </div>
                ))}
              </div>
            ) : (
              // --- MODEL DETAIL ---
              (() => {
                const m = MODELS_DATA.find((x) => x.id === selectedModel);
                if (!m) return null;
                return (
                  <div>
                    <button
                      onClick={() => setSelectedModel(null)}
                      style={{
                        background: "none",
                        border: "none",
                        color: T.gold,
                        fontFamily: fontSans,
                        fontSize: 12,
                        cursor: "pointer",
                        marginBottom: 16,
                        padding: 0,
                      }}
                    >
                      ← Retour aux modèles
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${T.gold}, ${T.purple})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: font,
                          fontSize: 28,
                          fontWeight: 700,
                          color: T.bg,
                        }}
                      >
                        {m.name[0]}
                      </div>
                      <div>
                        <h2 style={{ fontFamily: font, fontSize: 30, fontWeight: 700, margin: 0, color: T.goldLight }}>{m.name}</h2>
                        <div style={{ fontSize: 12, color: T.mutedLight }}>{m.niche} — Manager: {m.manager}</div>
                      </div>
                      <Badge color={m.status === "active" ? T.green : T.orange} bg={m.status === "active" ? T.greenDim : T.orangeDim}>
                        {m.status}
                      </Badge>
                    </div>

                    {/* Scores */}
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
                      <StatCard label="Onboarding" value={`${m.onboarding}%`} accent={T.orange} />
                      <StatCard label="Autonomie" value={`${m.autonomy}%`} accent={T.blue} />
                      <StatCard label="Stock Assets" value={`${m.assets_stock}%`} accent={T.purple} />
                      <StatCard label="Stock Contenu" value={`${m.content_stock}%`} accent={T.gold} />
                      <StatCard label="IG Comptes" value={m.ig_count} sub={m.ig_main} accent={T.green} />
                    </div>

                    {/* Friction */}
                    {m.friction && (
                      <div style={{ background: T.redDim, border: `1px solid rgba(239,68,68,0.3)`, borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
                        <div style={{ fontSize: 10, color: T.red, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Friction</div>
                        <div style={{ fontSize: 13, color: T.white }}>{m.friction}</div>
                      </div>
                    )}

                    {/* Next actions */}
                    <SubTitle>Prochaines Actions</SubTitle>
                    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
                      {m.next_actions.map((a, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderBottom: `1px solid ${T.border}`, fontSize: 13 }}>
                          <span style={{ width: 20, height: 20, borderRadius: 4, border: `1.5px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: T.gold, flexShrink: 0 }}>
                            {i + 1}
                          </span>
                          {a}
                        </div>
                      ))}
                    </div>

                    {/* Platforms */}
                    <SubTitle>Plateformes</SubTitle>
                    <div style={{ display: "flex", gap: 10 }}>
                      <div style={{ background: m.of ? T.greenDim : T.redDim, border: `1px solid ${m.of ? "rgba(16,208,120,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600 }}>
                        OF: {m.of ? "✓ Actif" : "✗ Non setup"}
                      </div>
                      <div style={{ background: m.mym ? T.goldDim : T.redDim, border: `1px solid ${m.mym ? "rgba(201,168,76,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600 }}>
                        MYM: {m.mym ? "✓ Actif" : "✗ Non setup"}
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}

        {/* ══════════════════════ CHATTERS ══════════════════════ */}
        {tab === "chatters" && (
          <div>
            <SectionTitle>Module Chatters</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {CHATTERS_DATA.map((c) => (
                <div key={c.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontFamily: font, fontSize: 22, fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: T.mutedLight }}>{c.role} — {c.models}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                    <div style={{ background: T.card2, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>Messages</div>
                      <div style={{ fontSize: 20, fontWeight: 700, fontFamily: font }}>{c.kpi_messages}</div>
                    </div>
                    <div style={{ background: T.card2, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>Revenue</div>
                      <div style={{ fontSize: 20, fontWeight: 700, fontFamily: font }}>{c.kpi_revenue}€</div>
                    </div>
                    <div style={{ background: T.card2, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>Customs</div>
                      <div style={{ fontSize: 20, fontWeight: 700, fontFamily: font }}>{c.kpi_customs}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    {[
                      { l: "Rigueur", v: c.rigueur },
                      { l: "Progression", v: c.progression },
                    ].map((s) => (
                      <div key={s.l} style={{ marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.mutedLight, marginBottom: 3 }}>
                          <span>{s.l}</span>
                          <span>{s.v}%</span>
                        </div>
                        <ProgressBar value={s.v} color={s.v >= 60 ? T.green : T.orange} />
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: 11, color: T.mutedLight, fontStyle: "italic" }}>{c.notes}</div>
                </div>
              ))}
            </div>

            <SubTitle>Workflow Chatter Quotidien</SubTitle>
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18 }}>
              {[
                "Consulter scripts / SOP du jour",
                "Vérifier messages en attente (OF + MYM)",
                "Répondre aux DMs prioritaires (customs d'abord)",
                "Saisir résultats dans le tracker",
                "Remonter blocages / questions",
                "Fin de journée : mini-report (messages, revenue, customs)",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 0", borderBottom: i < 5 ? `1px solid ${T.border}` : "none", fontSize: 13 }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: T.goldDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: T.gold, flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════ CONTENT ══════════════════════ */}
        {tab === "content" && (
          <div>
            <SectionTitle>Content Engine</SectionTitle>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              {CONTENT_STAGES.map((s) => (
                <div
                  key={s.key}
                  style={{
                    background: T.card,
                    border: `1px solid ${T.border}`,
                    borderRadius: 10,
                    padding: "14px 18px",
                    minWidth: 120,
                    flex: 1,
                    borderTop: `2px solid ${s.color}`,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, fontFamily: font, color: T.white }}>0</div>
                  <div style={{ fontSize: 10, color: T.mutedLight }}>contenus</div>
                </div>
              ))}
            </div>

            <SubTitle>Pipeline Kanban — Contenu</SubTitle>
            <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 10 }}>
              {CONTENT_STAGES.map((s) => (
                <div key={s.key} style={{ minWidth: 180, flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, padding: "6px 10px", background: T.card, borderRadius: 6, textAlign: "center" }}>
                    {s.label}
                  </div>
                  <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, minHeight: 120, padding: 10 }}>
                    <div style={{ fontSize: 11, color: T.muted, textAlign: "center", paddingTop: 30 }}>Aucun contenu</div>
                  </div>
                </div>
              ))}
            </div>

            <SubTitle>Micro-Actions Contenu (Process)</SubTitle>
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18 }}>
              {[
                "Veille concurrentielle → sauver références",
                "Bible vidéos → alimenter banque d'inspiration",
                "Créer hooks / angles / concepts",
                "Rédiger script court (brief modèle)",
                "Tourner le contenu (batch session)",
                "Monter / éditer",
                "Soumettre à validation",
                "Poster selon calendrier éditorial",
                "Recycler / recombiner les meilleurs contenus",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 0", borderBottom: i < 8 ? `1px solid ${T.border}` : "none", fontSize: 13 }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: T.goldDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: T.gold, flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════ DEADLINES ══════════════════════ */}
        {tab === "deadlines" && (
          <div>
            <SectionTitle>Deadlines — Avril 2026</SectionTitle>

            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 140px 90px", padding: "10px 18px", fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: `1px solid ${T.border}` }}>
                <span>Date</span>
                <span>Tâche</span>
                <span>Responsable</span>
                <span>Statut</span>
              </div>
              {DEADLINES.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 140px 90px",
                    padding: "11px 18px",
                    borderBottom: `1px solid ${T.border}`,
                    fontSize: 12,
                    alignItems: "center",
                    background: d.status === "urgent" ? T.redDim : "transparent",
                  }}
                >
                  <span style={{ fontWeight: 700, color: d.status === "urgent" ? T.red : T.gold }}>{d.date}</span>
                  <span>{d.task}</span>
                  <Badge color={T.mutedLight}>{d.resp}</Badge>
                  <Badge
                    color={d.status === "urgent" ? T.red : d.status === "pending" ? T.orange : T.muted}
                    bg={d.status === "urgent" ? T.redDim : d.status === "pending" ? T.orangeDim : T.card2}
                  >
                    {d.status}
                  </Badge>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, padding: "14px 18px", background: T.orangeDim, border: "1px solid rgba(245,158,11,0.3)", borderRadius: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.orange }}>⚠ Vacances Marvin + Sophie + Vanessa : 18-26 avril</div>
              <div style={{ fontSize: 11, color: T.mutedLight, marginTop: 4 }}>Tout contenu Vanessa doit être prêt avant le 18/04. Anticiper le planning chatting.</div>
            </div>
          </div>
        )}

        {/* ══════════════════════ FRICTIONS ══════════════════════ */}
        {tab === "frictions" && (
          <div>
            <SectionTitle>Carte des Frictions</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
              {FRICTIONS.map((f, i) => {
                const c = f.level === "critical" ? T.red : f.level === "high" ? T.orange : T.gold;
                const bg = f.level === "critical" ? T.redDim : f.level === "high" ? T.orangeDim : T.goldDim;
                return (
                  <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18, borderLeft: `3px solid ${c}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontFamily: font, fontSize: 16, fontWeight: 600 }}>{f.zone}</span>
                      <Badge color={c} bg={bg}>{f.level}</Badge>
                    </div>
                    <div style={{ fontSize: 12, color: T.white, marginBottom: 6 }}>{f.detail}</div>
                    <div style={{ fontSize: 11, color: T.mutedLight }}>Impact: {f.impact}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════ TEAM ══════════════════════ */}
        {tab === "team" && (
          <div>
            <SectionTitle>Équipe & Rôles</SectionTitle>

            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "140px 200px 1fr", padding: "10px 18px", fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: `1px solid ${T.border}` }}>
                <span>Membre</span>
                <span>Rôle</span>
                <span>Accès</span>
              </div>
              {TEAM.map((t, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 200px 1fr", padding: "12px 18px", borderBottom: `1px solid ${T.border}`, fontSize: 13, alignItems: "center" }}>
                  <span style={{ fontWeight: 600, color: T.goldLight }}>{t.name}</span>
                  <span style={{ color: T.mutedLight }}>{t.role}</span>
                  <Badge color={T.mutedLight}>{t.access}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
