"use client";

import { useState, useCallback, useEffect, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════
// ILM OS — I LOVE MODELS — Agency Operations System v2
// CRM / CSM / Content Engine / Revenue / Calendar
// Stack cible: Next.js + Supabase + Vercel
// ═══════════════════════════════════════════════════════════════

// --- THEME ---
const T = {
  bg: "#06060E",
  surface: "#0C0C18",
  card: "#111122",
  card2: "#161630",
  border: "#1C1C3A",
  borderHover: "#2A2A50",
  gold: "#C9A84C",
  goldLight: "#E2C97E",
  goldDim: "rgba(201,168,76,0.15)",
  purple: "#7C5CFC",
  purpleDim: "rgba(124,92,252,0.12)",
  green: "#10D078",
  greenDim: "rgba(16,208,120,0.12)",
  orange: "#F59E0B",
  orangeDim: "rgba(245,158,11,0.12)",
  red: "#EF4444",
  redDim: "rgba(239,68,68,0.12)",
  blue: "#3B82F6",
  blueDim: "rgba(59,130,246,0.12)",
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
    next_actions: ["Contenu shooting batch", "Lien Sophie sur MYM", "Lives réguliers", "Calendrier éditorial semaine"],
    alert: null,
    revenue: { of_mtd: 2840, mym_mtd: 1350, of_target: 5000, mym_target: 3000, last_month_total: 3200 },
  },
  {
    id: "olesia",
    name: "Olesia",
    status: "onboarding",
    onboarding: 35,
    manager: "Ned",
    niche: "Fitness / Sporty",
    face: true,
    ig_count: 3,
    ig_main: "Olesiaxoxo",
    of: true,
    mym: false,
    stage: "onboarding",
    autonomy: 15,
    assets_stock: 20,
    content_stock: 10,
    friction: "Manque contenu, MYM pas setup",
    next_actions: ["Réels IG (Ned)", "Setup MYM", "Premier batch contenu", "Infloww OF"],
    alert: "MYM non setup",
    revenue: { of_mtd: 120, mym_mtd: 0, of_target: 1500, mym_target: 1000, last_month_total: 0 },
  },
  {
    id: "elisa",
    name: "Elisa (Liya Bunnie)",
    status: "onboarding",
    onboarding: 30,
    manager: "Jordan",
    niche: "No Face — Cute / Aesthetic",
    face: false,
    ig_count: 1,
    ig_main: "liyabunnie",
    of: true,
    mym: false,
    stage: "onboarding",
    autonomy: 15,
    assets_stock: 15,
    content_stock: 10,
    friction: "Stock contenu faible, niche à affiner",
    next_actions: ["2nd compte IG + drive", "Batch photos", "Setup MYM", "Calendrier contenu"],
    alert: "Stock contenu bas",
    revenue: { of_mtd: 85, mym_mtd: 0, of_target: 1000, mym_target: 500, last_month_total: 0 },
  },
  {
    id: "juliette",
    name: "Juliette (Arthemys)",
    status: "onboarding",
    onboarding: 20,
    manager: "Louis + Jordan",
    niche: "Biker girl mystérieuse / No face",
    face: false,
    ig_count: 1,
    ig_main: "arthemys.off",
    of: true,
    mym: false,
    stage: "onboarding",
    autonomy: 10,
    assets_stock: 10,
    content_stock: 5,
    friction: "Feed IG à construire, contenu IA en cours",
    next_actions: ["Feed IG warm-up (Louis)", "Drive organisé", "OF certifié", "Contenu IA first batch"],
    alert: "Feed IG vide",
    revenue: { of_mtd: 0, mym_mtd: 0, of_target: 800, mym_target: 0, last_month_total: 0 },
  },
];

// --- DATA: REVENUE HISTORY (last 6 months) ---
const REVENUE_HISTORY = [
  { month: "Nov", of: 1800, mym: 900 },
  { month: "Déc", of: 2400, mym: 1100 },
  { month: "Jan", of: 2900, mym: 1400 },
  { month: "Fév", of: 3100, mym: 1600 },
  { month: "Mar", of: 3200, mym: 1800 },
  { month: "Avr", of: 3045, mym: 1350 },
];

// --- DATA: EDITORIAL CALENDAR ---
const CALENDAR_DATA = [
  { id: 1, model: "vanessa", date: "2026-04-22", type: "post", platform: "OF", title: "Shooting lingerie set 1", status: "ready" },
  { id: 2, model: "vanessa", date: "2026-04-22", type: "story", platform: "IG", title: "Behind the scenes teaser", status: "ready" },
  { id: 3, model: "vanessa", date: "2026-04-23", type: "post", platform: "MYM", title: "Exclusive set premium", status: "edit" },
  { id: 4, model: "vanessa", date: "2026-04-24", type: "reel", platform: "IG", title: "Transition outfit reveal", status: "script" },
  { id: 5, model: "vanessa", date: "2026-04-25", type: "post", platform: "OF", title: "Pool shoot set", status: "shoot" },
  { id: 6, model: "vanessa", date: "2026-04-26", type: "live", platform: "OF", title: "Live Q&A samedi soir", status: "idea" },
  { id: 7, model: "vanessa", date: "2026-04-27", type: "post", platform: "MYM", title: "Sunday mood gallery", status: "idea" },
  { id: 8, model: "vanessa", date: "2026-04-28", type: "reel", platform: "IG", title: "GRWM lundi", status: "idea" },
  { id: 9, model: "olesia", date: "2026-04-23", type: "reel", platform: "IG", title: "Workout clip teaser", status: "shoot" },
  { id: 10, model: "olesia", date: "2026-04-25", type: "post", platform: "OF", title: "First exclusive set", status: "script" },
  { id: 11, model: "olesia", date: "2026-04-27", type: "story", platform: "IG", title: "Gym vlog stories", status: "idea" },
  { id: 12, model: "elisa", date: "2026-04-24", type: "post", platform: "OF", title: "Aesthetic bedroom set", status: "edit" },
  { id: 13, model: "elisa", date: "2026-04-26", type: "reel", platform: "IG", title: "No face aesthetic transition", status: "idea" },
  { id: 14, model: "juliette", date: "2026-04-28", type: "post", platform: "OF", title: "Moto leather set", status: "idea" },
  { id: 15, model: "juliette", date: "2026-04-25", type: "reel", platform: "IG", title: "Biker girl intro reel", status: "script" },
];

// --- DATA: CHATTERS ---
const CHATTERS_DATA = [
  {
    id: "marvin",
    name: "Marvin",
    role: "Resp. Chatting & Pôle Média",
    models: "Toutes",
    kpi_messages: 342,
    kpi_revenue: 2150,
    kpi_customs: 8,
    rigueur: 72,
    progression: 65,
    notes: "Manager Sophie + Kocé. Rétro-planning. MYM Vanessa quotidien.",
    trend: "up",
  },
  {
    id: "koce",
    name: "Kocé",
    role: "Chatteur",
    models: "Toutes (sous Marvin)",
    kpi_messages: 215,
    kpi_revenue: 890,
    kpi_customs: 3,
    rigueur: 55,
    progression: 48,
    notes: "Chatting quotidien OF + MYM. Suivi scripts Marvin.",
    trend: "stable",
  },
];

// --- DATA: TEAM ---
const TEAM = [
  { name: "Jordan", role: "CEO", access: "full", status: "active" },
  { name: "Sophie", role: "Gestionnaire comptes", access: "model_vanessa", status: "active" },
  { name: "Marvin", role: "Resp. Chatting & Média", access: "chatting_all", status: "active" },
  { name: "Ned", role: "Social Media Manager", access: "model_olesia", status: "active" },
  { name: "Florian", role: "Opérationnel", access: "model_vanessa", status: "active" },
  { name: "Kocé", role: "Chatteur", access: "chatting_read", status: "active" },
  { name: "Louis", role: "Resp. Pôle I.A", access: "model_juliette", status: "active" },
];

// --- DATA: DEADLINES ---
const DEADLINES = [
  { date: "22/04", task: "Calendrier éditorial Vanessa semaine", resp: "Marvin", status: "urgent" },
  { date: "23/04", task: "Setup MYM Olesia", resp: "Ned+Jordan", status: "pending" },
  { date: "24/04", task: "Batch contenu Elisa (no face)", resp: "Jordan+Elisa", status: "pending" },
  { date: "25/04", task: "Feed IG Juliette — 9 posts minimum", resp: "Louis", status: "pending" },
  { date: "25/04", task: "Infloww tous OF", resp: "Marvin", status: "pending" },
  { date: "26/04", task: "Scripts chatting premium Vanessa", resp: "Marvin", status: "todo" },
  { date: "28/04", task: "Rétro-planning TOUTES modèles", resp: "Marvin", status: "todo" },
  { date: "28/04", task: "Premier live Vanessa OF", resp: "Sophie+Vanessa", status: "todo" },
  { date: "30/04", task: "Bilan revenus avril — all models", resp: "Jordan", status: "todo" },
  { date: "30/04", task: "Review process chatting", resp: "Marvin+Jordan", status: "todo" },
];

// --- DATA: CONTENT PIPELINE ---
const CONTENT_STAGES = [
  { key: "idea", label: "Idée", icon: "💡", color: T.muted },
  { key: "script", label: "Script", icon: "📝", color: T.blue },
  { key: "shoot", label: "Tournage", icon: "📸", color: T.purple },
  { key: "edit", label: "Montage", icon: "🎬", color: T.orange },
  { key: "ready", label: "Prêt", icon: "✅", color: T.gold },
  { key: "posted", label: "Posté", icon: "🚀", color: T.green },
];

// --- DATA: FRICTIONS ---
const FRICTIONS = [
  { zone: "Onboarding", level: "high", detail: "3/4 modèles < 40% onboarding", impact: "Retard revenu", suggestion: "Checklist onboarding automatisée" },
  { zone: "Contenu", level: "high", detail: "Stock < 20% sur 3/4 modèles", impact: "Pas de régularité posting", suggestion: "Sessions batch bi-mensuelles" },
  { zone: "MYM Setup", level: "high", detail: "3 modèles sans MYM actif", impact: "Revenu manqué sur plateforme", suggestion: "Sprint setup MYM cette semaine" },
  { zone: "Validation", level: "medium", detail: "Pas de process validation async", impact: "Dépendance calls", suggestion: "Workflow Notion/Slack async" },
  { zone: "Communication", level: "medium", detail: "Trop de calls, pas assez d'async", impact: "Temps perdu", suggestion: "Daily standup écrit + weekly call" },
  { zone: "Assets", level: "high", detail: "Manque photos/réels partout sauf Vanessa", impact: "IG warm-up bloqué", suggestion: "Shootings batch organisés par modèle" },
  { zone: "IA / Juliette", level: "medium", detail: "Feed IG vide, contenu IA en cours", impact: "Lancement retardé", suggestion: "Deadline Louis 25/04 pour 9 posts" },
];

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const font = "'Cormorant Garamond', Georgia, serif";
const fontSans = "'DM Sans', 'Segoe UI', sans-serif";

function Badge({ children, color, bg, size = "sm" }) {
  const sizes = {
    sm: { fontSize: 10, padding: "3px 10px" },
    md: { fontSize: 11, padding: "4px 12px" },
    lg: { fontSize: 12, padding: "5px 14px" },
  };
  return (
    <span
      style={{
        ...sizes[size],
        fontWeight: 700,
        fontFamily: fontSans,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        borderRadius: 20,
        display: "inline-block",
        color: color || T.white,
        background: bg || T.card2,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function StatCard({ label, value, sub, accent, icon }) {
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
        transition: "border-color 0.2s, transform 0.15s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, color: T.muted, fontFamily: fontSans, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</div>
        {icon && <span style={{ fontSize: 16, opacity: 0.5 }}>{icon}</span>}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: T.white, fontFamily: font }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: T.mutedLight, fontFamily: fontSans, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function RevenueBar({ label, current, target, color }) {
  const pct = Math.min(100, target > 0 ? (current / target) * 100 : 0);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.mutedLight, marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ color: T.white, fontWeight: 600 }}>{current.toLocaleString()}€ <span style={{ color: T.muted, fontWeight: 400 }}>/ {target.toLocaleString()}€</span></span>
      </div>
      <div style={{ background: T.border, borderRadius: 6, height: 8, width: "100%", overflow: "hidden" }}>
        <div style={{
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          height: "100%",
          width: `${pct}%`,
          borderRadius: 6,
          transition: "width 0.8s ease",
          boxShadow: `0 0 8px ${color}44`,
        }} />
      </div>
      <div style={{ fontSize: 10, color: pct >= 80 ? T.green : pct >= 50 ? T.orange : T.red, marginTop: 2, textAlign: "right" }}>{Math.round(pct)}%</div>
    </div>
  );
}

function MiniChart({ data, height = 60, color = T.gold }) {
  const max = Math.max(...data.map(d => d.value), 1);
  const w = 100 / data.length;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height, padding: "0 2px" }}>
      {data.map((d, i) => {
        const h = (d.value / max) * height;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{
              width: "100%",
              height: h,
              background: `linear-gradient(180deg, ${color}, ${color}66)`,
              borderRadius: "4px 4px 2px 2px",
              minHeight: 3,
              transition: "height 0.5s ease",
            }} />
            <div style={{ fontSize: 8, color: T.muted }}>{d.label}</div>
          </div>
        );
      })}
    </div>
  );
}

function ScoreRing({ score, size = 120, label }) {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 70 ? T.green : score >= 40 ? T.orange : T.red;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ width: size, height: size, position: "relative" }}>
        <svg width={size} height={size}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.border} strokeWidth={6} />
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke={color} strokeWidth={6}
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, fontWeight: 700, color: T.white, fontFamily: font,
        }}>
          {score}
        </div>
      </div>
      {label && <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>}
    </div>
  );
}

function ProgressBar({ value, max = 100, color, height = 6, glow = false }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ background: T.border, borderRadius: height, height, width: "100%", overflow: "hidden" }}>
      <div style={{
        background: color || T.gold,
        height: "100%",
        width: `${pct}%`,
        borderRadius: height,
        transition: "width 0.6s ease",
        ...(glow ? { boxShadow: `0 0 6px ${color || T.gold}44` } : {}),
      }} />
    </div>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontFamily: font, fontSize: 28, fontWeight: 600, color: T.goldLight, margin: 0, letterSpacing: "0.02em" }}>
        {children}
      </h2>
      {sub && <div style={{ fontSize: 12, color: T.muted, fontFamily: fontSans, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function SubTitle({ children, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "28px 0 14px" }}>
      <h3 style={{ fontFamily: fontSans, fontSize: 13, fontWeight: 600, color: T.mutedLight, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
        {children}
      </h3>
      {action}
    </div>
  );
}

function Card({ children, style: s, hover = true, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 14,
        padding: 20,
        transition: "border-color 0.2s, transform 0.15s",
        ...(onClick ? { cursor: "pointer" } : {}),
        ...s,
      }}
      onMouseEnter={hover ? (e) => { e.currentTarget.style.borderColor = T.borderHover; if (onClick) e.currentTarget.style.transform = "translateY(-2px)"; } : undefined}
      onMouseLeave={hover ? (e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; } : undefined}
    >
      {children}
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, color: T.muted }}>
      <span style={{ fontSize: 32, marginBottom: 8, opacity: 0.5 }}>{icon}</span>
      <span style={{ fontSize: 12 }}>{text}</span>
    </div>
  );
}

// Calendar helpers
function getDaysInWeek(startDate) {
  const days = [];
  const d = new Date(startDate);
  const dow = d.getDay() === 0 ? 6 : d.getDay() - 1; // Monday=0
  d.setDate(d.getDate() - dow);
  for (let i = 0; i < 7; i++) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function formatDate(d) {
  return d.toISOString().split("T")[0];
}

const DAY_NAMES = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const CONTENT_STATUS_COLORS = {
  idea: T.muted,
  script: T.blue,
  shoot: T.purple,
  edit: T.orange,
  ready: T.gold,
  posted: T.green,
};

const PLATFORM_COLORS = {
  OF: "#00AFF0",
  MYM: T.gold,
  IG: "#E1306C",
  TikTok: "#000000",
};

// ═══════════════════════════════════════════════════════════════
// NAV ITEMS
// ═══════════════════════════════════════════════════════════════

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: "◉" },
  { key: "models", label: "Modèles", icon: "♛" },
  { key: "revenue", label: "Revenue", icon: "◆" },
  { key: "calendar", label: "Calendrier", icon: "▦" },
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
  const [calendarWeekOffset, setCalendarWeekOffset] = useState(0);
  const [calendarFilter, setCalendarFilter] = useState("all");
  const [hoveredNav, setHoveredNav] = useState(null);

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

  // --- REVENUE TOTALS ---
  const totalRevenueMTD = MODELS_DATA.reduce((a, m) => a + m.revenue.of_mtd + m.revenue.mym_mtd, 0);
  const totalTargetMTD = MODELS_DATA.reduce((a, m) => a + m.revenue.of_target + m.revenue.mym_target, 0);
  const totalOF = MODELS_DATA.reduce((a, m) => a + m.revenue.of_mtd, 0);
  const totalMYM = MODELS_DATA.reduce((a, m) => a + m.revenue.mym_mtd, 0);
  const totalLastMonth = MODELS_DATA.reduce((a, m) => a + m.revenue.last_month_total, 0);
  const revenueGrowth = totalLastMonth > 0 ? Math.round(((totalRevenueMTD - totalLastMonth) / totalLastMonth) * 100) : 0;

  // --- CALENDAR ---
  const today = new Date("2026-04-22");
  const calendarStart = new Date(today);
  calendarStart.setDate(calendarStart.getDate() + calendarWeekOffset * 7);
  const weekDays = getDaysInWeek(calendarStart);

  const filteredCalendar = calendarFilter === "all"
    ? CALENDAR_DATA
    : CALENDAR_DATA.filter(c => c.model === calendarFilter);

  // ═══════ RENDER ═══════
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: fontSans, color: T.white }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* SIDEBAR */}
      <div style={{
        width: 230,
        minHeight: "100vh",
        background: T.surface,
        borderRight: `1px solid ${T.border}`,
        padding: "28px 0",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
      }}>
        <div style={{ padding: "0 24px 28px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: T.goldLight, letterSpacing: "0.12em" }}>
            I LOVE
          </div>
          <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: T.goldLight, letterSpacing: "0.12em" }}>
            MODELS
          </div>
          <div style={{ fontSize: 9, color: T.muted, marginTop: 6, letterSpacing: "0.15em", textTransform: "uppercase" }}>Agency OS v2</div>
        </div>

        <nav style={{ padding: "16px 0", flex: 1, overflowY: "auto" }}>
          {NAV.map((n) => (
            <button
              key={n.key}
              onClick={() => { setTab(n.key); setSelectedModel(null); }}
              onMouseEnter={() => setHoveredNav(n.key)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "11px 24px",
                background: tab === n.key ? T.goldDim : hoveredNav === n.key ? "rgba(201,168,76,0.06)" : "transparent",
                border: "none",
                borderLeft: tab === n.key ? `2px solid ${T.gold}` : "2px solid transparent",
                color: tab === n.key ? T.goldLight : hoveredNav === n.key ? T.white : T.mutedLight,
                fontSize: 13,
                fontFamily: fontSans,
                fontWeight: tab === n.key ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 14, width: 20, textAlign: "center" }}>{n.icon}</span>
              {n.label}
              {n.key === "deadlines" && pendingDeadlines > 0 && (
                <span style={{
                  marginLeft: "auto",
                  background: T.red,
                  color: "#fff",
                  fontSize: 9,
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: 10,
                  minWidth: 16,
                  textAlign: "center",
                }}>
                  {pendingDeadlines}
                </span>
              )}
              {n.key === "frictions" && criticalFrictions > 0 && (
                <span style={{
                  marginLeft: "auto",
                  background: T.orange,
                  color: "#fff",
                  fontSize: 9,
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: 10,
                }}>
                  {criticalFrictions}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar footer — Revenue mini */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Revenue MTD</div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: font, color: T.goldLight }}>{totalRevenueMTD.toLocaleString()}€</div>
          <ProgressBar value={totalRevenueMTD} max={totalTargetMTD} color={T.gold} height={4} />
          <div style={{ fontSize: 9, color: T.muted, marginTop: 6 }}>ILM OS v2 — Avril 2026</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "32px 40px", overflowY: "auto", maxHeight: "100vh" }}>

        {/* ══════════════════════ DASHBOARD ══════════════════════ */}
        {tab === "dashboard" && (
          <div>
            <SectionTitle sub="Vue d'ensemble de l'agence — Avril 2026">Dashboard CEO</SectionTitle>

            <div style={{ display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 8 }}>
              <ScoreRing score={globalScore} size={140} label="Score Global" />

              <div style={{ display: "flex", gap: 14, flex: 1, flexWrap: "wrap" }}>
                <StatCard label="Revenue MTD" value={`${totalRevenueMTD.toLocaleString()}€`} sub={`Objectif: ${totalTargetMTD.toLocaleString()}€`} accent={T.gold} icon="💰" />
                <StatCard label="Modèles actives" value={activeModels} sub={`${onboardingModels} en onboarding`} accent={T.green} icon="♛" />
                <StatCard label="Onboarding moyen" value={`${avgOnboarding}%`} accent={T.orange} icon="📊" />
                <StatCard label="Stock assets" value={`${avgAssets}%`} accent={T.purple} icon="📸" />
                <StatCard label="Frictions critiques" value={criticalFrictions} sub={`sur ${FRICTIONS.length} total`} accent={T.red} icon="⚡" />
                <StatCard label="Deadlines urgentes" value={pendingDeadlines} accent={T.gold} icon="⏱" />
              </div>
            </div>

            {/* Revenue mini chart */}
            <SubTitle>Évolution Revenue (6 mois)</SubTitle>
            <Card>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.muted, marginBottom: 8 }}>OnlyFans</div>
                  <MiniChart data={REVENUE_HISTORY.map(r => ({ label: r.month, value: r.of }))} color="#00AFF0" height={50} />
                </div>
                <div style={{ width: 1, background: T.border }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.muted, marginBottom: 8 }}>MYM</div>
                  <MiniChart data={REVENUE_HISTORY.map(r => ({ label: r.month, value: r.mym }))} color={T.gold} height={50} />
                </div>
                <div style={{ width: 1, background: T.border }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.muted, marginBottom: 8 }}>Total</div>
                  <MiniChart data={REVENUE_HISTORY.map(r => ({ label: r.month, value: r.of + r.mym }))} color={T.green} height={50} />
                </div>
              </div>
            </Card>

            <SubTitle>Pipeline Modèles</SubTitle>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {MODELS_DATA.map((m) => (
                <Card
                  key={m.id}
                  onClick={() => { setTab("models"); setSelectedModel(m.id); }}
                  style={{ minWidth: 220, flex: 1, borderLeft: `3px solid ${m.status === "active" ? T.green : T.orange}` }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontFamily: font, fontSize: 18, fontWeight: 600 }}>{m.name}</span>
                    <Badge color={m.status === "active" ? T.green : T.orange} bg={m.status === "active" ? T.greenDim : T.orangeDim}>
                      {m.status === "active" ? "Active" : `Onb. ${m.onboarding}%`}
                    </Badge>
                  </div>
                  <ProgressBar value={m.onboarding} color={m.status === "active" ? T.green : T.orange} glow />
                  <div style={{ fontSize: 11, color: T.mutedLight, marginTop: 8 }}>{m.niche}</div>
                  <div style={{ fontSize: 11, color: T.goldLight, marginTop: 4 }}>{(m.revenue.of_mtd + m.revenue.mym_mtd).toLocaleString()}€ MTD</div>
                  {m.alert && <div style={{ fontSize: 10, color: T.red, marginTop: 6, fontWeight: 600 }}>⚠ {m.alert}</div>}
                </Card>
              ))}
            </div>

            <SubTitle>Deadlines immédiates</SubTitle>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              {DEADLINES.filter((d) => d.status === "urgent" || d.status === "pending")
                .slice(0, 6)
                .map((d, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", gap: 14, padding: "11px 18px",
                      borderBottom: `1px solid ${T.border}`, fontSize: 12,
                      background: d.status === "urgent" ? T.redDim : "transparent",
                    }}
                  >
                    <span style={{ color: d.status === "urgent" ? T.red : T.gold, fontWeight: 700, minWidth: 60 }}>{d.date}</span>
                    <span style={{ flex: 1, color: T.white }}>{d.task}</span>
                    <Badge color={T.mutedLight}>{d.resp}</Badge>
                  </div>
                ))}
            </Card>
          </div>
        )}

        {/* ══════════════════════ MODELES ══════════════════════ */}
        {tab === "models" && (
          <div>
            <SectionTitle sub="Suivi individuel par modèle">CSM — Suivi Modèles</SectionTitle>

            {!selectedModel ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
                {MODELS_DATA.map((m) => (
                  <Card
                    key={m.id}
                    onClick={() => setSelectedModel(m.id)}
                    style={{ borderLeft: `3px solid ${m.status === "active" ? T.green : T.orange}` }}
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

                    {/* Revenue mini */}
                    <div style={{ background: T.card2, borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
                      <div style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>Revenue MTD</div>
                      <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: T.goldLight }}>{(m.revenue.of_mtd + m.revenue.mym_mtd).toLocaleString()}€</div>
                    </div>

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {m.face ? <Badge color={T.green} bg={T.greenDim}>Face</Badge> : <Badge color={T.purple} bg="rgba(124,92,252,0.15)">No Face</Badge>}
                      {m.of && <Badge color="#00AFF0" bg="rgba(0,175,240,0.12)">OF</Badge>}
                      {m.mym && <Badge color={T.gold} bg={T.goldDim}>MYM</Badge>}
                      <Badge color={T.mutedLight}>IG ×{m.ig_count}</Badge>
                    </div>

                    {m.alert && <div style={{ fontSize: 11, color: T.red, marginTop: 10, fontWeight: 600 }}>⚠ {m.alert}</div>}
                  </Card>
                ))}
              </div>
            ) : (
              (() => {
                const m = MODELS_DATA.find((x) => x.id === selectedModel);
                if (!m) return null;
                const modelCalendar = CALENDAR_DATA.filter(c => c.model === m.id).slice(0, 5);
                return (
                  <div>
                    <button
                      onClick={() => setSelectedModel(null)}
                      style={{ background: "none", border: "none", color: T.gold, fontFamily: fontSans, fontSize: 12, cursor: "pointer", marginBottom: 16, padding: 0 }}
                    >
                      ← Retour aux modèles
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
                      <div style={{
                        width: 64, height: 64, borderRadius: "50%",
                        background: `linear-gradient(135deg, ${T.gold}, ${T.purple})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: font, fontSize: 28, fontWeight: 700, color: T.bg,
                      }}>
                        {m.name[0]}
                      </div>
                      <div>
                        <h2 style={{ fontFamily: font, fontSize: 30, fontWeight: 700, margin: 0, color: T.goldLight }}>{m.name}</h2>
                        <div style={{ fontSize: 12, color: T.mutedLight }}>{m.niche} — Manager: {m.manager}</div>
                      </div>
                      <Badge size="md" color={m.status === "active" ? T.green : T.orange} bg={m.status === "active" ? T.greenDim : T.orangeDim}>
                        {m.status}
                      </Badge>
                    </div>

                    {/* Scores */}
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
                      <StatCard label="Onboarding" value={`${m.onboarding}%`} accent={T.orange} />
                      <StatCard label="Autonomie" value={`${m.autonomy}%`} accent={T.blue} />
                      <StatCard label="Stock Assets" value={`${m.assets_stock}%`} accent={T.purple} />
                      <StatCard label="Stock Contenu" value={`${m.content_stock}%`} accent={T.gold} />
                      <StatCard label="IG Comptes" value={m.ig_count} sub={m.ig_main} accent={T.green} />
                    </div>

                    {/* Revenue detail */}
                    <SubTitle>Revenue</SubTitle>
                    <Card>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                        <div>
                          <RevenueBar label="OnlyFans" current={m.revenue.of_mtd} target={m.revenue.of_target} color="#00AFF0" />
                          <RevenueBar label="MYM" current={m.revenue.mym_mtd} target={m.revenue.mym_target} color={T.gold} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                          <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase" }}>Total MTD</div>
                          <div style={{ fontFamily: font, fontSize: 36, fontWeight: 700, color: T.goldLight }}>
                            {(m.revenue.of_mtd + m.revenue.mym_mtd).toLocaleString()}€
                          </div>
                          {m.revenue.last_month_total > 0 && (
                            <div style={{ fontSize: 11, color: T.mutedLight }}>
                              Mois dernier: {m.revenue.last_month_total.toLocaleString()}€
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>

                    {/* Friction */}
                    {m.friction && (
                      <div style={{ background: T.redDim, border: `1px solid rgba(239,68,68,0.3)`, borderRadius: 10, padding: "12px 16px", marginTop: 16 }}>
                        <div style={{ fontSize: 10, color: T.red, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Friction</div>
                        <div style={{ fontSize: 13, color: T.white }}>{m.friction}</div>
                      </div>
                    )}

                    {/* Next actions */}
                    <SubTitle>Prochaines Actions</SubTitle>
                    <Card style={{ padding: 0, overflow: "hidden" }}>
                      {m.next_actions.map((a, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderBottom: `1px solid ${T.border}`, fontSize: 13 }}>
                          <span style={{
                            width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${T.gold}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 10, color: T.gold, flexShrink: 0, fontWeight: 700,
                          }}>
                            {i + 1}
                          </span>
                          {a}
                        </div>
                      ))}
                    </Card>

                    {/* Upcoming content */}
                    {modelCalendar.length > 0 && (
                      <>
                        <SubTitle>Contenus à venir</SubTitle>
                        <Card style={{ padding: 0, overflow: "hidden" }}>
                          {modelCalendar.map((c) => (
                            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: `1px solid ${T.border}`, fontSize: 12 }}>
                              <span style={{ color: T.mutedLight, minWidth: 50 }}>{c.date.slice(5)}</span>
                              <Badge color={PLATFORM_COLORS[c.platform] || T.muted} bg={`${PLATFORM_COLORS[c.platform] || T.muted}20`}>{c.platform}</Badge>
                              <span style={{ flex: 1 }}>{c.title}</span>
                              <Badge color={CONTENT_STATUS_COLORS[c.status]} bg={`${CONTENT_STATUS_COLORS[c.status]}20`}>{c.status}</Badge>
                            </div>
                          ))}
                        </Card>
                      </>
                    )}

                    {/* Platforms */}
                    <SubTitle>Plateformes</SubTitle>
                    <div style={{ display: "flex", gap: 10 }}>
                      <div style={{ background: m.of ? "rgba(0,175,240,0.12)" : T.redDim, border: `1px solid ${m.of ? "rgba(0,175,240,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: 8, padding: "10px 18px", fontSize: 13, fontWeight: 600 }}>
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

        {/* ══════════════════════ REVENUE ══════════════════════ */}
        {tab === "revenue" && (
          <div>
            <SectionTitle sub="Suivi financier par modèle et plateforme">Revenue Tracking</SectionTitle>

            {/* Top KPIs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 8 }}>
              <StatCard label="Revenue MTD" value={`${totalRevenueMTD.toLocaleString()}€`} sub={`Objectif: ${totalTargetMTD.toLocaleString()}€`} accent={T.gold} icon="💰" />
              <StatCard label="OnlyFans MTD" value={`${totalOF.toLocaleString()}€`} accent="#00AFF0" icon="🔵" />
              <StatCard label="MYM MTD" value={`${totalMYM.toLocaleString()}€`} accent={T.gold} icon="🟡" />
              <StatCard label="vs. Mois dernier" value={`${revenueGrowth > 0 ? "+" : ""}${revenueGrowth}%`} sub={`${totalLastMonth.toLocaleString()}€ en mars`} accent={revenueGrowth >= 0 ? T.green : T.red} icon={revenueGrowth >= 0 ? "📈" : "📉"} />
            </div>

            {/* Global progress */}
            <SubTitle>Progression vs. Objectif</SubTitle>
            <Card>
              <RevenueBar label="Total Agence" current={totalRevenueMTD} target={totalTargetMTD} color={T.gold} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 8 }}>
                <RevenueBar label="OnlyFans" current={totalOF} target={MODELS_DATA.reduce((a, m) => a + m.revenue.of_target, 0)} color="#00AFF0" />
                <RevenueBar label="MYM" current={totalMYM} target={MODELS_DATA.reduce((a, m) => a + m.revenue.mym_target, 0)} color={T.gold} />
              </div>
            </Card>

            {/* Revenue evolution chart */}
            <SubTitle>Évolution (6 mois)</SubTitle>
            <Card>
              <div style={{ display: "flex", gap: 30 }}>
                <div style={{ flex: 2 }}>
                  <MiniChart data={REVENUE_HISTORY.map(r => ({ label: r.month, value: r.of + r.mym }))} color={T.gold} height={80} />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
                  {REVENUE_HISTORY.map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                      <span style={{ color: T.muted }}>{r.month}</span>
                      <span style={{ color: T.white, fontWeight: 600 }}>{(r.of + r.mym).toLocaleString()}€</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Per model breakdown */}
            <SubTitle>Détail par Modèle</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {MODELS_DATA.map((m) => {
                const total = m.revenue.of_mtd + m.revenue.mym_mtd;
                const target = m.revenue.of_target + m.revenue.mym_target;
                return (
                  <Card key={m.id} style={{ borderLeft: `3px solid ${m.status === "active" ? T.green : T.orange}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontFamily: font, fontSize: 18, fontWeight: 600 }}>{m.name}</span>
                      <span style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: T.goldLight }}>{total.toLocaleString()}€</span>
                    </div>
                    <RevenueBar label="OnlyFans" current={m.revenue.of_mtd} target={m.revenue.of_target} color="#00AFF0" />
                    <RevenueBar label="MYM" current={m.revenue.mym_mtd} target={m.revenue.mym_target} color={T.gold} />
                    {m.revenue.last_month_total > 0 && (
                      <div style={{ fontSize: 10, color: T.mutedLight, marginTop: 4, textAlign: "right" }}>
                        Mois dernier: {m.revenue.last_month_total.toLocaleString()}€
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════ CALENDAR ══════════════════════ */}
        {tab === "calendar" && (
          <div>
            <SectionTitle sub="Planning de publication par modèle">Calendrier Éditorial</SectionTitle>

            {/* Controls */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setCalendarWeekOffset(w => w - 1)}
                  style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, color: T.white, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: fontSans }}
                >
                  ← Sem. préc.
                </button>
                <button
                  onClick={() => setCalendarWeekOffset(0)}
                  style={{ background: T.goldDim, border: `1px solid rgba(201,168,76,0.3)`, borderRadius: 8, color: T.goldLight, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: fontSans }}
                >
                  Aujourd'hui
                </button>
                <button
                  onClick={() => setCalendarWeekOffset(w => w + 1)}
                  style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, color: T.white, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: fontSans }}
                >
                  Sem. suiv. →
                </button>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => setCalendarFilter("all")}
                  style={{
                    background: calendarFilter === "all" ? T.goldDim : T.card,
                    border: `1px solid ${calendarFilter === "all" ? "rgba(201,168,76,0.3)" : T.border}`,
                    borderRadius: 8, color: calendarFilter === "all" ? T.goldLight : T.mutedLight,
                    padding: "6px 12px", cursor: "pointer", fontSize: 11, fontFamily: fontSans, fontWeight: calendarFilter === "all" ? 600 : 400,
                  }}
                >
                  Toutes
                </button>
                {MODELS_DATA.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setCalendarFilter(m.id)}
                    style={{
                      background: calendarFilter === m.id ? T.goldDim : T.card,
                      border: `1px solid ${calendarFilter === m.id ? "rgba(201,168,76,0.3)" : T.border}`,
                      borderRadius: 8, color: calendarFilter === m.id ? T.goldLight : T.mutedLight,
                      padding: "6px 12px", cursor: "pointer", fontSize: 11, fontFamily: fontSans, fontWeight: calendarFilter === m.id ? 600 : 400,
                    }}
                  >
                    {m.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Week grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
              {weekDays.map((day, di) => {
                const dateStr = formatDate(day);
                const isToday = dateStr === formatDate(today);
                const dayItems = filteredCalendar.filter(c => c.date === dateStr);
                return (
                  <div key={di} style={{ minHeight: 180 }}>
                    <div style={{
                      textAlign: "center",
                      padding: "8px 0",
                      marginBottom: 6,
                      borderRadius: 8,
                      background: isToday ? T.goldDim : T.card,
                      border: `1px solid ${isToday ? "rgba(201,168,76,0.3)" : T.border}`,
                    }}>
                      <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase" }}>{DAY_NAMES[di]}</div>
                      <div style={{ fontSize: 18, fontFamily: font, fontWeight: 700, color: isToday ? T.goldLight : T.white }}>
                        {day.getDate()}
                      </div>
                      <div style={{ fontSize: 9, color: T.muted }}>
                        {day.toLocaleDateString("fr-FR", { month: "short" })}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {dayItems.map(item => {
                        const modelData = MODELS_DATA.find(m => m.id === item.model);
                        return (
                          <div
                            key={item.id}
                            style={{
                              background: T.card,
                              border: `1px solid ${T.border}`,
                              borderLeft: `3px solid ${CONTENT_STATUS_COLORS[item.status]}`,
                              borderRadius: 6,
                              padding: "6px 8px",
                              fontSize: 10,
                              transition: "border-color 0.2s",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                              <Badge color={PLATFORM_COLORS[item.platform]} bg={`${PLATFORM_COLORS[item.platform]}20`}>{item.platform}</Badge>
                              <span style={{ color: T.muted, fontSize: 9 }}>{item.type}</span>
                            </div>
                            <div style={{ color: T.white, fontSize: 10, lineHeight: 1.3, marginBottom: 3 }}>{item.title}</div>
                            <div style={{ color: T.mutedLight, fontSize: 9 }}>{modelData?.name.split(" ")[0]}</div>
                          </div>
                        );
                      })}
                      {dayItems.length === 0 && (
                        <div style={{ textAlign: "center", padding: "16px 0", color: T.muted, fontSize: 10 }}>—</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Status legend */}
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 20 }}>
              {CONTENT_STAGES.filter(s => s.key !== "posted").map(s => (
                <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: T.mutedLight }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                  {s.label}
                </div>
              ))}
            </div>

            {/* Upcoming list view */}
            <SubTitle>Liste des contenus planifiés</SubTitle>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "80px 60px 60px 1fr 100px 80px", padding: "10px 16px", fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${T.border}` }}>
                <span>Date</span>
                <span>Modèle</span>
                <span>Platef.</span>
                <span>Contenu</span>
                <span>Type</span>
                <span>Statut</span>
              </div>
              {filteredCalendar
                .sort((a, b) => a.date.localeCompare(b.date))
                .map(c => {
                  const modelData = MODELS_DATA.find(m => m.id === c.model);
                  return (
                    <div key={c.id} style={{
                      display: "grid", gridTemplateColumns: "80px 60px 60px 1fr 100px 80px",
                      padding: "10px 16px", borderBottom: `1px solid ${T.border}`, fontSize: 12, alignItems: "center",
                    }}>
                      <span style={{ color: T.gold, fontWeight: 600 }}>{c.date.slice(5)}</span>
                      <span style={{ fontSize: 11, color: T.mutedLight }}>{modelData?.name.split(" ")[0]}</span>
                      <Badge color={PLATFORM_COLORS[c.platform]} bg={`${PLATFORM_COLORS[c.platform]}20`}>{c.platform}</Badge>
                      <span>{c.title}</span>
                      <Badge color={T.mutedLight}>{c.type}</Badge>
                      <Badge color={CONTENT_STATUS_COLORS[c.status]} bg={`${CONTENT_STATUS_COLORS[c.status]}20`}>{c.status}</Badge>
                    </div>
                  );
                })}
            </Card>
          </div>
        )}

        {/* ══════════════════════ CHATTERS ══════════════════════ */}
        {tab === "chatters" && (
          <div>
            <SectionTitle sub="Performance et suivi quotidien">Module Chatters</SectionTitle>

            {/* KPI Summary */}
            <div style={{ display: "flex", gap: 14, marginBottom: 8 }}>
              <StatCard label="Messages total" value={CHATTERS_DATA.reduce((a, c) => a + c.kpi_messages, 0)} accent={T.blue} icon="💬" />
              <StatCard label="Revenue chatting" value={`${CHATTERS_DATA.reduce((a, c) => a + c.kpi_revenue, 0).toLocaleString()}€`} accent={T.gold} icon="💰" />
              <StatCard label="Customs total" value={CHATTERS_DATA.reduce((a, c) => a + c.kpi_customs, 0)} accent={T.purple} icon="🎯" />
            </div>

            <SubTitle>Performance Individuelle</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {CHATTERS_DATA.map((c) => (
                <Card key={c.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontFamily: font, fontSize: 22, fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: T.mutedLight }}>{c.role} — {c.models}</div>
                    </div>
                    <Badge
                      color={c.trend === "up" ? T.green : c.trend === "down" ? T.red : T.muted}
                      bg={c.trend === "up" ? T.greenDim : c.trend === "down" ? T.redDim : T.card2}
                      size="md"
                    >
                      {c.trend === "up" ? "↑ Progression" : c.trend === "down" ? "↓ Baisse" : "→ Stable"}
                    </Badge>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                    {[
                      { label: "Messages", value: c.kpi_messages, color: T.blue },
                      { label: "Revenue", value: `${c.kpi_revenue}€`, color: T.gold },
                      { label: "Customs", value: c.kpi_customs, color: T.purple },
                    ].map((k) => (
                      <div key={k.label} style={{ background: T.card2, borderRadius: 8, padding: "10px 12px", textAlign: "center", borderTop: `2px solid ${k.color}` }}>
                        <div style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>{k.label}</div>
                        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: font }}>{k.value}</div>
                      </div>
                    ))}
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
                        <ProgressBar value={s.v} color={s.v >= 60 ? T.green : T.orange} glow />
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: 11, color: T.mutedLight, fontStyle: "italic", padding: "8px 0", borderTop: `1px solid ${T.border}` }}>{c.notes}</div>
                </Card>
              ))}
            </div>

            <SubTitle>Workflow Chatter Quotidien</SubTitle>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              {[
                { step: "Consulter scripts / SOP du jour", icon: "📋" },
                { step: "Vérifier messages en attente (OF + MYM)", icon: "📩" },
                { step: "Répondre aux DMs prioritaires (customs d'abord)", icon: "💬" },
                { step: "Saisir résultats dans le tracker", icon: "📊" },
                { step: "Remonter blocages / questions", icon: "🚩" },
                { step: "Mini-report fin de journée (messages, revenue, customs)", icon: "📝" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "11px 18px", borderBottom: i < 5 ? `1px solid ${T.border}` : "none", fontSize: 13 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: "50%", background: T.goldDim,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, flexShrink: 0,
                  }}>
                    {s.icon}
                  </span>
                  {s.step}
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* ══════════════════════ CONTENT ══════════════════════ */}
        {tab === "content" && (
          <div>
            <SectionTitle sub="Pipeline de production et Kanban">Content Engine</SectionTitle>

            {/* Stage counts */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              {CONTENT_STAGES.map((s) => {
                const count = CALENDAR_DATA.filter(c => c.status === s.key).length;
                return (
                  <Card key={s.key} style={{ minWidth: 100, flex: 1, borderTop: `2px solid ${s.color}`, textAlign: "center", padding: "14px 16px" }}>
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                    <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, fontFamily: font, color: T.white }}>{count}</div>
                    <div style={{ fontSize: 10, color: T.mutedLight }}>contenus</div>
                  </Card>
                );
              })}
            </div>

            <SubTitle>Pipeline Kanban</SubTitle>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 10 }}>
              {CONTENT_STAGES.map((s) => {
                const items = CALENDAR_DATA.filter(c => c.status === s.key);
                return (
                  <div key={s.key} style={{ minWidth: 180, flex: 1 }}>
                    <div style={{
                      fontSize: 11, fontWeight: 700, color: s.color, textTransform: "uppercase",
                      letterSpacing: "0.08em", marginBottom: 10, padding: "8px 12px",
                      background: T.card, borderRadius: 8, textAlign: "center",
                      borderBottom: `2px solid ${s.color}`,
                    }}>
                      {s.icon} {s.label} ({items.length})
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {items.length > 0 ? items.map(item => {
                        const modelData = MODELS_DATA.find(m => m.id === item.model);
                        return (
                          <div key={item.id} style={{
                            background: T.card,
                            border: `1px solid ${T.border}`,
                            borderRadius: 8,
                            padding: "10px 12px",
                            fontSize: 11,
                          }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                              <Badge color={PLATFORM_COLORS[item.platform]} bg={`${PLATFORM_COLORS[item.platform]}20`}>{item.platform}</Badge>
                              <span style={{ color: T.muted, fontSize: 9 }}>{item.date.slice(5)}</span>
                            </div>
                            <div style={{ color: T.white, marginBottom: 3 }}>{item.title}</div>
                            <div style={{ color: T.mutedLight, fontSize: 10 }}>{modelData?.name.split(" ")[0]} — {item.type}</div>
                          </div>
                        );
                      }) : (
                        <div style={{ background: T.surface, border: `1px dashed ${T.border}`, borderRadius: 8, padding: "20px 10px", textAlign: "center", color: T.muted, fontSize: 10 }}>
                          Aucun contenu
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <SubTitle>Process Contenu</SubTitle>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              {[
                { step: "Veille concurrentielle → sauver références", icon: "🔍" },
                { step: "Bible vidéos → banque d'inspiration", icon: "📚" },
                { step: "Créer hooks / angles / concepts", icon: "💡" },
                { step: "Rédiger script court (brief modèle)", icon: "📝" },
                { step: "Tourner le contenu (batch session)", icon: "📸" },
                { step: "Monter / éditer", icon: "🎬" },
                { step: "Soumettre à validation", icon: "✅" },
                { step: "Poster selon calendrier éditorial", icon: "🚀" },
                { step: "Recycler / recombiner les meilleurs contenus", icon: "♻️" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 18px", borderBottom: i < 8 ? `1px solid ${T.border}` : "none", fontSize: 13 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: "50%", background: T.goldDim,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0,
                  }}>
                    {s.icon}
                  </span>
                  {s.step}
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* ══════════════════════ DEADLINES ══════════════════════ */}
        {tab === "deadlines" && (
          <div>
            <SectionTitle sub="Tâches et échéances — Avril 2026">Deadlines</SectionTitle>

            <Card style={{ padding: 0, overflow: "hidden" }}>
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
                    display: "grid", gridTemplateColumns: "80px 1fr 140px 90px",
                    padding: "11px 18px", borderBottom: `1px solid ${T.border}`,
                    fontSize: 12, alignItems: "center",
                    background: d.status === "urgent" ? T.redDim : "transparent",
                    transition: "background 0.15s",
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
            </Card>
          </div>
        )}

        {/* ══════════════════════ FRICTIONS ══════════════════════ */}
        {tab === "frictions" && (
          <div>
            <SectionTitle sub="Points de blocage identifiés et suggestions">Carte des Frictions</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
              {FRICTIONS.map((f, i) => {
                const c = f.level === "critical" ? T.red : f.level === "high" ? T.orange : T.gold;
                const bg = f.level === "critical" ? T.redDim : f.level === "high" ? T.orangeDim : T.goldDim;
                return (
                  <Card key={i} style={{ borderLeft: `3px solid ${c}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontFamily: font, fontSize: 17, fontWeight: 600 }}>{f.zone}</span>
                      <Badge color={c} bg={bg} size="md">{f.level}</Badge>
                    </div>
                    <div style={{ fontSize: 12, color: T.white, marginBottom: 6 }}>{f.detail}</div>
                    <div style={{ fontSize: 11, color: T.mutedLight, marginBottom: 8 }}>Impact: {f.impact}</div>
                    {f.suggestion && (
                      <div style={{
                        fontSize: 11, color: T.green, background: T.greenDim,
                        padding: "6px 10px", borderRadius: 6, display: "flex", gap: 6, alignItems: "center",
                      }}>
                        <span>💡</span> {f.suggestion}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════ TEAM ══════════════════════ */}
        {tab === "team" && (
          <div>
            <SectionTitle sub="Organisation et accès">Équipe & Rôles</SectionTitle>

            <Card style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "140px 200px 1fr 80px", padding: "10px 18px", fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: `1px solid ${T.border}` }}>
                <span>Membre</span>
                <span>Rôle</span>
                <span>Accès</span>
                <span>Statut</span>
              </div>
              {TEAM.map((t, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "140px 200px 1fr 80px",
                  padding: "12px 18px", borderBottom: `1px solid ${T.border}`,
                  fontSize: 13, alignItems: "center",
                  transition: "background 0.15s",
                }}>
                  <span style={{ fontWeight: 600, color: T.goldLight }}>{t.name}</span>
                  <span style={{ color: T.mutedLight }}>{t.role}</span>
                  <Badge color={T.mutedLight}>{t.access}</Badge>
                  <Badge color={T.green} bg={T.greenDim}>{t.status}</Badge>
                </div>
              ))}
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
