"use client";

import { useState, useCallback, useEffect, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════
// ILM OS v3 — I LOVE MODELS — Agency Operations System
// Multi-user, RBAC, Missions, Agenda, Instagram, Personas
// Data source: Google Sheets ILM_Suivi_Comptes_Instagram
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

// ═══════════════════════════════════════════════════════════════
// DATA: INSTAGRAM ACCOUNTS (from Google Sheet)
// ═══════════════════════════════════════════════════════════════

const IG_ACCOUNTS = {
  vanessa: [
    { num: 1, handle: "MadameVanessaxoxo", resp: "Jordan", phone: "iPhone 11", gmail: "lolacaline.ilm@gmail.com", created: "2026-03-30", status: "Warm-up", phase: "J1", niche: "Lifestyle / Mode", followers: 0, bio: false, notes: "", priority: "HAUTE" },
    { num: 2, handle: "Prettyvanessabanks", resp: "Jordan", phone: "iPhone 11", gmail: "", created: "", status: "À renseigner", phase: "—", niche: "Lifestyle / Mode", followers: 0, bio: false, notes: "", priority: "HAUTE" },
    { num: 3, handle: "Sophiebbbanks", resp: "Marvin", phone: "iPhone 11", gmail: "sophie.bbbankss@gmail.com", created: "02/01/2026", status: "À renseigner", phase: "—", niche: "Lifestyle / Mode", followers: 0, bio: false, notes: "", priority: "MOYENNE" },
    { num: 4, handle: "vanessaspicyyy", resp: "Marvin", phone: "iPhone 13", gmail: "Camillecyron1@gmail.com", created: "05/04/2026", status: "À renseigner", phase: "—", niche: "", followers: 0, bio: false, notes: "", priority: "" },
    { num: 5, handle: "Madamevanessaoff", resp: "Sophie", phone: "iPhone 13", gmail: "Madamevanessaof@gmail.com", created: "2025-04-30", status: "Opérationnel", phase: "—", niche: "Lifestyle / Mode", followers: 35000, bio: true, notes: "Compte principal — 35k — Récupéré", priority: "HAUTE", main: true },
    { num: 6, handle: "Queenvanessa_off", resp: "Sophie", phone: "iPhone 13", gmail: "", created: "2025-08-15", status: "Opérationnel", phase: "—", niche: "", followers: 0, bio: false, notes: "Restreint par IG", priority: "" },
    { num: 7, handle: "Prettyvanessa_off", resp: "Sophie", phone: "iPhone 13", gmail: "msophiebanks@gmail.com", created: "2025-08-15", status: "Actif", phase: "—", niche: "", followers: 0, bio: false, notes: "", priority: "" },
    { num: 8, handle: "mllevanessaoff", resp: "Marvin", phone: "iPhone 13", gmail: "marvinmartinm91@gmail.com", created: "2026-03-28", status: "Actif", phase: "S2", niche: "", followers: 0, bio: false, notes: "", priority: "" },
    { num: 9, handle: "mme_vanessa", resp: "Marvin", phone: "iPhone 13", gmail: "dana.ilovemodels@gmail.com", created: "2026-03-30", status: "Warm-up", phase: "J5", niche: "", followers: 0, bio: false, notes: "", priority: "" },
    { num: 10, handle: "queenvanessaoff", resp: "Florian", phone: "iPhone 15", gmail: "emmarocca.ilm@gmail.com", created: "", status: "À renseigner", phase: "—", niche: "", followers: 0, bio: false, notes: "", priority: "" },
    { num: 11, handle: "princessvanessaoff", resp: "Florian", phone: "iPhone 15", gmail: "alisonporshnikova1@gmail.com", created: "", status: "À renseigner", phase: "—", niche: "", followers: 0, bio: false, notes: "", priority: "" },
    { num: 12, handle: "Mmevanessabanks", resp: "Jordan", phone: "iPhone 11", gmail: "", created: "", status: "À renseigner", phase: "—", niche: "", followers: 0, bio: false, notes: "", priority: "" },
  ],
  olesia: [
    { num: 1, handle: "Olesiaxoxo", resp: "Ned", phone: "Samsung", gmail: "amelia.dumaslim@gmail.com", created: "2026-04-01", status: "Warm-up", phase: "J1", niche: "Étudiante", followers: 0, bio: false, notes: "Attente contenu Réels", priority: "" },
    { num: 2, handle: "Olesiiaaxo", resp: "Ned", phone: "Samsung", gmail: "artemys.ilovemodels@gmail.com", created: "2026-04-01", status: "Warm-up", phase: "J1", niche: "Étudiante", followers: 0, bio: false, notes: "", priority: "" },
    { num: 3, handle: "Olessiiaaaxo", resp: "Ned", phone: "Samsung", gmail: "dora.ilovemodels@gmail.com", created: "2026-04-01", status: "Warm-up", phase: "J1", niche: "Étudiante", followers: 0, bio: false, notes: "", priority: "" },
  ],
  juliette: [
    { num: 1, handle: "", resp: "", phone: "", gmail: "", created: "", status: "En réflexion", phase: "—", niche: "À définir (IA)", followers: 0, bio: false, notes: "Attente sélections niches Louis — Contrat à signer", priority: "HAUTE" },
  ],
};

// ═══════════════════════════════════════════════════════════════
// DATA: PERSONAS (from Google Sheet)
// ═══════════════════════════════════════════════════════════════

const PERSONAS = {
  vanessa: {
    age: 28, country: "France", flag: "🇫🇷", type: "Face visible", niche: "Lifestyle / Mode / Glamour",
    positioning: "Femme glamour et assumée. Style chic, photos travaillées, ambiance luxe accessible. Visage principal de l'agence.",
    personality: "Charismatique, directe, séductrice naturelle. Aime le luxe, les voyages, la mode.",
    tone: "Sensuel, élégant, confiant",
    chatGuide: "Vanessa est une femme de 28 ans, glamour et sensuelle. Elle parle avec assurance et un brin de mystère. Ton chaleureux mais jamais vulgaire.",
    chatTone: "Confiant, taquin, légèrement dominant. Jamais soumis. Elle provoque avec élégance.",
    forbidden: "Pas de langage vulgaire gratuit. Pas de supplications.",
    topics: "Mode, voyages, sorties, sport, vie parisienne, séduction",
  },
  olesia: {
    age: 25, country: "Ukraine", flag: "🇺🇦", type: "Face visible", niche: "Étudiante",
    positioning: "Jeune femme ukrainienne, look slave, étudiante. Beauté froide et élégante avec un côté accessible et doux.",
    personality: "Douce, un peu réservée, beauté naturelle, charme slave.",
    tone: "À définir",
    chatGuide: "Olesia est une jeune ukrainienne de 25 ans. Charme slave naturel, léger accent. Douce mais pas soumise. Aime la culture, les arts, côté romantique.",
    chatTone: "Doux, romantique, légèrement distant au début puis plus chaleureux.",
    forbidden: "Pas de stéréotypes négatifs. Pas de clichés sur l'Ukraine. Rester élégant.",
    topics: "Études, art, musique, voyages, culture, cuisine",
  },
  juliette: {
    age: 21, country: "France", flag: "🇫🇷", type: "Soft / Masquée — possibilité IA", niche: "À définir",
    positioning: "Modèle soft/masquée avec possibilité d'utiliser l'IA pour le visage. Positionnement en cours de réflexion stratégique.",
    personality: "À définir",
    tone: "À définir",
    chatGuide: "À construire une fois le positionnement tranché (masquée classique vs IA vs soft sans visage).",
    chatTone: "À définir après validation DA",
    forbidden: "À définir",
    topics: "À définir",
  },
};

// ═══════════════════════════════════════════════════════════════
// DATA: TEAM & PHONES (from Google Sheet)
// ═══════════════════════════════════════════════════════════════

const TEAM_PHONES = [
  { name: "Jordan", role: "CEO / Direction", phone: "iPhone 11 + iPhone 8", models: "Tous (supervision)", notes: "" },
  { name: "Sophie", role: "Gestionnaire comptes", phone: "iPhone 13", models: "Vanessa", notes: "" },
  { name: "Marvin", role: "Resp. chatting", phone: "iPhone 13", models: "", notes: "Vacances 16-26/04" },
  { name: "Ned", role: "Bras droit opérationnel", phone: "iPhone 13 PRO + Samsung", models: "Olesia", notes: "" },
  { name: "Louis", role: "Responsable I.A", phone: "", models: "Juliette", notes: "Contrat à signer" },
  { name: "Florian", role: "Opérationnel", phone: "iPhone 15", models: "Vanessa (comptes IG)", notes: "" },
  { name: "Kocé", role: "Chatteur", phone: "", models: "", notes: "" },
];

// --- DATA: MODELS (3 models — Andréa & Elisa removed) ---
const MODELS_DATA = [
  {
    id: "vanessa",
    name: "Vanessa",
    status: "active",
    onboarding: 90,
    manager: "Sophie + Jordan",
    niche: "Lifestyle / Mode / Glamour",
    face: true,
    ig_count: 12,
    ig_main: "Madamevanessaoff",
    ig_followers: 35000,
    ig_engagement: 3.2,
    ig_active: 4,
    ig_warmup: 2,
    ig_alerts: 0,
    ig_priority_high: 3,
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
    photo: null,
    country: "🇫🇷", age: 28,
  },
  {
    id: "olesia",
    name: "Olesia",
    status: "onboarding",
    onboarding: 35,
    manager: "Ned",
    niche: "Fitness / Sporty / Étudiante",
    face: true,
    ig_count: 3,
    ig_main: "Olesiaxoxo",
    ig_followers: 0,
    ig_engagement: 0,
    ig_active: 0,
    ig_warmup: 3,
    ig_alerts: 0,
    ig_priority_high: 0,
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
    photo: null,
    country: "🇺🇦", age: 25,
  },
  {
    id: "juliette",
    name: "Juliette (Arthemys)",
    status: "onboarding",
    onboarding: 20,
    manager: "Louis + Jordan",
    niche: "Biker girl mystérieuse / No face / IA",
    face: false,
    ig_count: 0,
    ig_main: "arthemys.off",
    ig_followers: 0,
    ig_engagement: 0,
    ig_active: 0,
    ig_warmup: 0,
    ig_alerts: 0,
    ig_priority_high: 1,
    of: true,
    mym: false,
    stage: "onboarding",
    autonomy: 10,
    assets_stock: 10,
    content_stock: 5,
    friction: "Feed IG à construire, contenu IA en cours, contrat à signer",
    next_actions: ["Sélection niches (Louis)", "Signer contrat", "Créer premiers comptes IG", "Contenu IA first batch"],
    alert: "Aucun compte IG — En réflexion",
    revenue: { of_mtd: 0, mym_mtd: 0, of_target: 800, mym_target: 0, last_month_total: 0 },
    photo: null,
    country: "🇫🇷", age: 21,
  },
];

// IG KPI from sheet
const IG_KPI = {
  totalAccounts: 15,
  operational: 4,
  warmup: 5,
  alerts: 0,
  totalFollowers: 35000,
  toComplete: 4,
  waiting: 3,
  priorityHigh: 4,
};

// --- DATA: REVENUE HISTORY (last 6 months) ---
const REVENUE_HISTORY = [
  { month: "Nov", of: 1800, mym: 900 },
  { month: "Déc", of: 2400, mym: 1100 },
  { month: "Jan", of: 2900, mym: 1400 },
  { month: "Fév", of: 3100, mym: 1600 },
  { month: "Mar", of: 3200, mym: 1800 },
  { month: "Avr", of: 2960, mym: 1350 },
];

// --- DATA: EDITORIAL CALENDAR (Elisa removed) ---
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
  { id: 12, model: "juliette", date: "2026-04-28", type: "post", platform: "OF", title: "Moto leather set", status: "idea" },
  { id: 13, model: "juliette", date: "2026-04-25", type: "reel", platform: "IG", title: "Biker girl intro reel", status: "script" },
];

// --- DATA: CHATTERS ---
const CHATTERS_DATA = [
  {
    id: "marvin", name: "Marvin", role: "Resp. Chatting & Pôle Média", models: "Toutes",
    kpi_messages: 342, kpi_revenue: 2150, kpi_customs: 8, rigueur: 72, progression: 65,
    notes: "Manager Sophie + Kocé. Rétro-planning. MYM Vanessa quotidien. Vacances 16-26/04.",
    trend: "up",
  },
  {
    id: "koce", name: "Kocé", role: "Chatteur", models: "Toutes (sous Marvin)",
    kpi_messages: 215, kpi_revenue: 890, kpi_customs: 3, rigueur: 55, progression: 48,
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

// --- DATA: DEADLINES (Elisa removed) ---
const DEADLINES = [
  { date: "22/04", task: "Calendrier éditorial Vanessa semaine", resp: "Marvin", status: "urgent" },
  { date: "23/04", task: "Setup MYM Olesia", resp: "Ned+Jordan", status: "pending" },
  { date: "25/04", task: "Sélection niches Juliette (Louis)", resp: "Louis", status: "pending" },
  { date: "25/04", task: "Infloww tous OF", resp: "Marvin", status: "pending" },
  { date: "26/04", task: "Scripts chatting premium Vanessa", resp: "Marvin", status: "todo" },
  { date: "28/04", task: "Rétro-planning TOUTES modèles", resp: "Marvin", status: "todo" },
  { date: "28/04", task: "Premier live Vanessa OF", resp: "Sophie+Vanessa", status: "todo" },
  { date: "30/04", task: "Bilan revenus avril — all models", resp: "Jordan", status: "todo" },
  { date: "30/04", task: "Review process chatting", resp: "Marvin+Jordan", status: "todo" },
  { date: "30/04", task: "Signer contrats Juliette + Louis", resp: "Jordan", status: "todo" },
];

const CONTENT_STAGES = [
  { key: "idea", label: "Idée", icon: "💡", color: T.muted },
  { key: "script", label: "Script", icon: "📝", color: T.blue },
  { key: "shoot", label: "Tournage", icon: "📸", color: T.purple },
  { key: "edit", label: "Montage", icon: "🎬", color: T.orange },
  { key: "ready", label: "Prêt", icon: "✅", color: T.gold },
  { key: "posted", label: "Posté", icon: "🚀", color: T.green },
];

// --- DATA: FRICTIONS (Elisa removed) ---
const FRICTIONS = [
  { zone: "Onboarding", level: "high", detail: "2/3 modèles < 40% onboarding", impact: "Retard revenu", suggestion: "Checklist onboarding automatisée" },
  { zone: "Contenu", level: "high", detail: "Stock < 20% sur 2/3 modèles", impact: "Pas de régularité posting", suggestion: "Sessions batch bi-mensuelles" },
  { zone: "MYM Setup", level: "high", detail: "2 modèles sans MYM actif", impact: "Revenu manqué sur plateforme", suggestion: "Sprint setup MYM cette semaine" },
  { zone: "Validation", level: "medium", detail: "Pas de process validation async", impact: "Dépendance calls", suggestion: "Workflow Notion/Slack async" },
  { zone: "Communication", level: "medium", detail: "Trop de calls, pas assez d'async", impact: "Temps perdu", suggestion: "Daily standup écrit + weekly call" },
  { zone: "Assets", level: "high", detail: "Manque photos/réels partout sauf Vanessa", impact: "IG warm-up bloqué", suggestion: "Shootings batch organisés par modèle" },
  { zone: "IA / Juliette", level: "medium", detail: "Aucun compte IG, contenu IA en cours", impact: "Lancement retardé", suggestion: "Deadline Louis 25/04 pour sélection niches" },
  { zone: "Contrats", level: "high", detail: "Contrats Juliette + Louis non signés", impact: "Risque juridique", suggestion: "Signer avant lancement" },
];

// --- DATA: MISSIONS ---
const MISSIONS_DATA = {
  vanessa: {
    todos: [
      { id: 1, text: "Shooting batch lingerie + lifestyle", done: true },
      { id: 2, text: "Planifier 3 lives OF cette semaine", done: false },
      { id: 3, text: "Répondre aux DM IG prioritaires", done: false },
      { id: 4, text: "Valider calendrier éditorial semaine", done: true },
      { id: 5, text: "Créer 5 stories IG teaser", done: false },
    ],
    objectives: [
      { label: "Revenue OF", current: 2840, target: 5000, unit: "€" },
      { label: "Revenue MYM", current: 1350, target: 3000, unit: "€" },
      { label: "Posts publiés", current: 12, target: 25, unit: "" },
      { label: "Followers IG", current: 35000, target: 40000, unit: "" },
    ],
  },
  olesia: {
    todos: [
      { id: 1, text: "Tourner 3 réels IG fitness", done: false },
      { id: 2, text: "Setup compte MYM complet", done: false },
      { id: 3, text: "Premier batch contenu OF", done: false },
      { id: 4, text: "Créer bio + highlights IG", done: true },
    ],
    objectives: [
      { label: "Revenue OF", current: 120, target: 1500, unit: "€" },
      { label: "Revenue MYM", current: 0, target: 1000, unit: "€" },
      { label: "Posts publiés", current: 3, target: 15, unit: "" },
      { label: "Followers IG", current: 0, target: 8000, unit: "" },
    ],
  },
  juliette: {
    todos: [
      { id: 1, text: "Sélection niches avec Louis", done: false },
      { id: 2, text: "Signer contrat", done: false },
      { id: 3, text: "Créer premiers comptes IG", done: false },
      { id: 4, text: "Premier batch contenu IA", done: false },
    ],
    objectives: [
      { label: "Revenue OF", current: 0, target: 800, unit: "€" },
      { label: "Posts publiés", current: 0, target: 10, unit: "" },
      { label: "Comptes IG créés", current: 0, target: 5, unit: "" },
    ],
  },
};

// --- DATA: AGENDA ---
const AGENDA_DATA = [
  { id: 1, date: "2026-04-22", time: "10:00", title: "Call équipe chatting", participants: ["Jordan", "Marvin", "Kocé"], type: "call", duration: 30 },
  { id: 2, date: "2026-04-22", time: "14:00", title: "Shooting Vanessa", participants: ["Vanessa", "Sophie"], type: "shooting", duration: 120 },
  { id: 3, date: "2026-04-23", time: "09:00", title: "Setup MYM Olesia", participants: ["Ned", "Jordan", "Olesia"], type: "task", duration: 60 },
  { id: 4, date: "2026-04-24", time: "15:00", title: "Point Louis — IA Juliette", participants: ["Louis", "Jordan"], type: "call", duration: 30 },
  { id: 5, date: "2026-04-25", time: "11:00", title: "Réels IG Olesia", participants: ["Ned", "Olesia"], type: "shooting", duration: 90 },
  { id: 6, date: "2026-04-25", time: "17:00", title: "Weekly team — bilan semaine", participants: ["Jordan", "Sophie", "Marvin", "Ned", "Louis"], type: "call", duration: 45 },
  { id: 7, date: "2026-04-26", time: "20:00", title: "Live Vanessa OF", participants: ["Vanessa", "Sophie"], type: "live", duration: 60 },
  { id: 8, date: "2026-04-28", time: "10:00", title: "Rétro-planning toutes modèles", participants: ["Marvin", "Jordan"], type: "task", duration: 60 },
  { id: 9, date: "2026-04-30", time: "14:00", title: "Signature contrats Juliette + Louis", participants: ["Jordan", "Juliette", "Louis"], type: "task", duration: 30 },
];

const AGENDA_TYPE_COLORS = { call: T.blue, shooting: T.purple, task: T.gold, live: T.red, meeting: T.green };

// Google Sheet link
const GSHEET_URL = "https://docs.google.com/spreadsheets/d/12RS5bmKiC9S797tUtXPe0B4aijDeXAGY/edit?gid=2019210794#gid=2019210794";

// ═══════════════════════════════════════════════════════════════
// RBAC HELPERS
// ═══════════════════════════════════════════════════════════════

function canSeeModel(user, modelId) {
  if (!user) return false;
  if (user.role === "ceo") return true;
  if (user.role === "model") return user.modelId === modelId;
  if (user.role === "manager" && user.managedModels) return user.managedModels.includes(modelId);
  if (user.role === "chatter_lead") return true;
  return false;
}
function canSeeRevenue(user) { return ["ceo", "manager", "chatter_lead"].includes(user?.role); }
function canSeeTeam(user) { return user?.role === "ceo"; }
function canSeeChatting(user) { return ["ceo", "chatter_lead", "chatter"].includes(user?.role); }
function canSeeFrictions(user) { return ["ceo", "manager", "chatter_lead"].includes(user?.role); }
function canSeeAllModels(user) { return user?.role === "ceo" || user?.role === "chatter_lead"; }

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const font = "'Cormorant Garamond', Georgia, serif";
const fontSans = "'DM Sans', 'Segoe UI', sans-serif";

function Badge({ children, color, bg, size = "sm" }) {
  const sizes = { sm: { fontSize: 10, padding: "3px 10px" }, md: { fontSize: 11, padding: "4px 12px" }, lg: { fontSize: 12, padding: "5px 14px" } };
  return <span style={{ ...sizes[size], fontWeight: 700, fontFamily: fontSans, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 20, display: "inline-block", color: color || T.white, background: bg || T.card2, whiteSpace: "nowrap" }}>{children}</span>;
}

function StatCard({ label, value, sub, accent, icon }) {
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "18px 20px", borderTop: `2px solid ${accent || T.gold}`, minWidth: 140, flex: 1, transition: "border-color 0.2s, transform 0.15s" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
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
        <div style={{ background: `linear-gradient(90deg, ${color}, ${color}dd)`, height: "100%", width: `${pct}%`, borderRadius: 6, transition: "width 0.8s ease", boxShadow: `0 0 8px ${color}44` }} />
      </div>
      <div style={{ fontSize: 10, color: pct >= 80 ? T.green : pct >= 50 ? T.orange : T.red, marginTop: 2, textAlign: "right" }}>{Math.round(pct)}%</div>
    </div>
  );
}

function MiniChart({ data, height = 60, color = T.gold }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height, padding: "0 2px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: "100%", height: (d.value / max) * height, background: `linear-gradient(180deg, ${color}, ${color}66)`, borderRadius: "4px 4px 2px 2px", minHeight: 3, transition: "height 0.5s ease" }} />
          <div style={{ fontSize: 8, color: T.muted }}>{d.label}</div>
        </div>
      ))}
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
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.border} strokeWidth={6} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={6} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition: "stroke-dashoffset 0.8s ease" }} />
        </svg>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: T.white, fontFamily: font }}>{score}</div>
      </div>
      {label && <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>}
    </div>
  );
}

function ProgressBar({ value, max = 100, color, height = 6, glow = false }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ background: T.border, borderRadius: height, height, width: "100%", overflow: "hidden" }}>
      <div style={{ background: color || T.gold, height: "100%", width: `${pct}%`, borderRadius: height, transition: "width 0.6s ease", ...(glow ? { boxShadow: `0 0 6px ${color || T.gold}44` } : {}) }} />
    </div>
  );
}

function SectionTitle({ children, sub, action }) {
  return (
    <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <h2 style={{ fontFamily: font, fontSize: 28, fontWeight: 600, color: T.goldLight, margin: 0, letterSpacing: "0.02em" }}>{children}</h2>
        {sub && <div style={{ fontSize: 12, color: T.muted, fontFamily: fontSans, marginTop: 4 }}>{sub}</div>}
      </div>
      {action}
    </div>
  );
}

function SubTitle({ children, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "28px 0 14px" }}>
      <h3 style={{ fontFamily: fontSans, fontSize: 13, fontWeight: 600, color: T.mutedLight, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>{children}</h3>
      {action}
    </div>
  );
}

function Card({ children, style: s, hover = true, onClick }) {
  return (
    <div onClick={onClick} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20, transition: "border-color 0.2s, transform 0.15s", ...(onClick ? { cursor: "pointer" } : {}), ...s }}
      onMouseEnter={hover ? (e) => { e.currentTarget.style.borderColor = T.borderHover; if (onClick) e.currentTarget.style.transform = "translateY(-2px)"; } : undefined}
      onMouseLeave={hover ? (e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; } : undefined}>
      {children}
    </div>
  );
}

function EmptyState({ icon, text }) {
  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, color: T.muted }}><span style={{ fontSize: 32, marginBottom: 8, opacity: 0.5 }}>{icon}</span><span style={{ fontSize: 12 }}>{text}</span></div>;
}

function ModelAvatar({ model, size = 64 }) {
  if (model.photo) return <img src={model.photo} alt={model.name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border: `2px solid ${T.gold}` }} />;
  return <div style={{ width: size, height: size, borderRadius: "50%", background: `linear-gradient(135deg, ${T.gold}, ${T.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, fontSize: size * 0.44, fontWeight: 700, color: T.bg, flexShrink: 0 }}>{model.name[0]}</div>;
}

function UserAvatar({ user, size = 36 }) {
  return <div style={{ width: size, height: size, borderRadius: "50%", background: `linear-gradient(135deg, ${user.color || T.gold}, ${T.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, fontSize: size * 0.4, fontWeight: 700, color: T.bg, flexShrink: 0 }}>{user.name[0]}</div>;
}

// IG Status badge color
function igStatusColor(status) {
  if (status === "Opérationnel" || status === "Actif") return T.green;
  if (status === "Warm-up") return T.orange;
  if (status === "En attente" || status === "En réflexion") return T.blue;
  return T.muted;
}

// Calendar helpers
function getDaysInWeek(startDate) {
  const days = [];
  const d = new Date(startDate);
  const dow = d.getDay() === 0 ? 6 : d.getDay() - 1;
  d.setDate(d.getDate() - dow);
  for (let i = 0; i < 7; i++) { days.push(new Date(d)); d.setDate(d.getDate() + 1); }
  return days;
}
function formatDate(d) { return d.toISOString().split("T")[0]; }
const DAY_NAMES = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const CONTENT_STATUS_COLORS = { idea: T.muted, script: T.blue, shoot: T.purple, edit: T.orange, ready: T.gold, posted: T.green };
const PLATFORM_COLORS = { OF: "#00AFF0", MYM: T.gold, IG: "#E1306C" };

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function ILMOS({ currentUser }) {
  const [tab, setTab] = useState("dashboard");
  const [selectedModel, setSelectedModel] = useState(null);
  const [calendarWeekOffset, setCalendarWeekOffset] = useState(0);
  const [calendarFilter, setCalendarFilter] = useState("all");
  const [hoveredNav, setHoveredNav] = useState(null);
  const [todoChecked, setTodoChecked] = useState({});
  const [agendaWeekOffset, setAgendaWeekOffset] = useState(0);
  const [igSelectedModel, setIgSelectedModel] = useState(null);

  const isModel = currentUser?.role === "model";
  const isCEO = currentUser?.role === "ceo";

  const visibleModels = useMemo(() => {
    if (canSeeAllModels(currentUser)) return MODELS_DATA;
    return MODELS_DATA.filter(m => canSeeModel(currentUser, m.id));
  }, [currentUser]);

  // Build navigation based on role
  const NAV = useMemo(() => {
    const nav = [];
    if (isModel) {
      nav.push({ key: "my-profile", label: "Mon Profil", icon: "♛" });
      nav.push({ key: "missions", label: "Missions", icon: "🎯" });
      nav.push({ key: "calendar", label: "Calendrier", icon: "▦" });
      nav.push({ key: "agenda", label: "Agenda", icon: "📅" });
      nav.push({ key: "instagram", label: "Instagram", icon: "📷" });
    } else {
      nav.push({ key: "dashboard", label: "Dashboard", icon: "◉" });
      nav.push({ key: "models", label: "Modèles", icon: "♛" });
      if (canSeeRevenue(currentUser)) nav.push({ key: "revenue", label: "Revenue", icon: "◆" });
      nav.push({ key: "missions", label: "Missions", icon: "🎯" });
      nav.push({ key: "calendar", label: "Calendrier", icon: "▦" });
      nav.push({ key: "agenda", label: "Agenda", icon: "📅" });
      nav.push({ key: "instagram", label: "Instagram", icon: "📷" });
      if (canSeeChatting(currentUser)) nav.push({ key: "chatters", label: "Chatters", icon: "✦" });
      if (canSeeChatting(currentUser)) nav.push({ key: "personas", label: "Personas", icon: "🎭" });
      nav.push({ key: "content", label: "Contenu", icon: "◈" });
      nav.push({ key: "deadlines", label: "Deadlines", icon: "⏱" });
      if (canSeeFrictions(currentUser)) nav.push({ key: "frictions", label: "Frictions", icon: "⚡" });
      if (canSeeTeam(currentUser)) nav.push({ key: "team", label: "Équipe", icon: "◎" });
    }
    return nav;
  }, [currentUser, isModel]);

  useEffect(() => { if (isModel && tab === "dashboard") setTab("my-profile"); }, [isModel, tab]);

  // Scores
  const avgOnboarding = Math.round(MODELS_DATA.reduce((a, m) => a + m.onboarding, 0) / MODELS_DATA.length);
  const avgAutonomy = Math.round(MODELS_DATA.reduce((a, m) => a + m.autonomy, 0) / MODELS_DATA.length);
  const avgAssets = Math.round(MODELS_DATA.reduce((a, m) => a + m.assets_stock, 0) / MODELS_DATA.length);
  const avgContent = Math.round(MODELS_DATA.reduce((a, m) => a + m.content_stock, 0) / MODELS_DATA.length);
  const activeModels = MODELS_DATA.filter(m => m.status === "active").length;
  const onboardingModels = MODELS_DATA.filter(m => m.status === "onboarding").length;
  const criticalFrictions = FRICTIONS.filter(f => f.level === "critical" || f.level === "high").length;
  const pendingDeadlines = DEADLINES.filter(d => d.status === "pending" || d.status === "urgent").length;
  const globalScore = Math.round(avgOnboarding * 0.3 + avgAutonomy * 0.25 + avgAssets * 0.2 + avgContent * 0.25);

  // Revenue
  const totalRevenueMTD = MODELS_DATA.reduce((a, m) => a + m.revenue.of_mtd + m.revenue.mym_mtd, 0);
  const totalTargetMTD = MODELS_DATA.reduce((a, m) => a + m.revenue.of_target + m.revenue.mym_target, 0);
  const totalOF = MODELS_DATA.reduce((a, m) => a + m.revenue.of_mtd, 0);
  const totalMYM = MODELS_DATA.reduce((a, m) => a + m.revenue.mym_mtd, 0);
  const totalLastMonth = MODELS_DATA.reduce((a, m) => a + m.revenue.last_month_total, 0);
  const revenueGrowth = totalLastMonth > 0 ? Math.round(((totalRevenueMTD - totalLastMonth) / totalLastMonth) * 100) : 0;

  // Calendar
  const today = new Date("2026-04-23");
  const calendarStart = new Date(today); calendarStart.setDate(calendarStart.getDate() + calendarWeekOffset * 7);
  const weekDays = getDaysInWeek(calendarStart);
  const filteredCalendar = useMemo(() => {
    let data = CALENDAR_DATA;
    if (!canSeeAllModels(currentUser)) data = data.filter(c => canSeeModel(currentUser, c.model));
    if (isModel) data = data.filter(c => c.model === currentUser.modelId);
    if (calendarFilter !== "all") data = data.filter(c => c.model === calendarFilter);
    return data;
  }, [currentUser, calendarFilter, isModel]);

  // Agenda
  const agendaStart = new Date(today); agendaStart.setDate(agendaStart.getDate() + agendaWeekOffset * 7);
  const agendaWeekDays = getDaysInWeek(agendaStart);
  const filteredAgenda = useMemo(() => {
    if (isModel) { const md = MODELS_DATA.find(m => m.id === currentUser.modelId); return AGENDA_DATA.filter(a => a.participants.includes(md?.name || "")); }
    if (isCEO) return AGENDA_DATA;
    return AGENDA_DATA.filter(a => a.participants.includes(currentUser.name));
  }, [currentUser, isModel, isCEO]);

  const toggleTodo = (modelId, todoId) => setTodoChecked(prev => ({ ...prev, [`${modelId}-${todoId}`]: !prev[`${modelId}-${todoId}`] }));

  const handleLogout = async () => { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/login"; };

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: fontSans, color: T.white }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* ═══ SIDEBAR ═══ */}
      <div style={{ width: 230, minHeight: "100vh", background: T.surface, borderRight: `1px solid ${T.border}`, padding: "28px 0", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "0 24px 20px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: T.goldLight, letterSpacing: "0.12em" }}>I LOVE</div>
          <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: T.goldLight, letterSpacing: "0.12em" }}>MODELS</div>
          <div style={{ fontSize: 9, color: T.muted, marginTop: 6, letterSpacing: "0.15em", textTransform: "uppercase" }}>Agency OS v3</div>
        </div>
        <div style={{ padding: "16px 24px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <UserAvatar user={currentUser} size={32} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.white, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentUser.name}</div>
            <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase" }}>{currentUser.role === "ceo" ? "CEO" : currentUser.role}</div>
          </div>
          <button onClick={handleLogout} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer", fontSize: 14, padding: 4 }} title="Déconnexion">↗</button>
        </div>
        <nav style={{ padding: "12px 0", flex: 1, overflowY: "auto" }}>
          {NAV.map(n => (
            <button key={n.key} onClick={() => { setTab(n.key); setSelectedModel(null); setIgSelectedModel(null); }} onMouseEnter={() => setHoveredNav(n.key)} onMouseLeave={() => setHoveredNav(null)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 24px", background: tab === n.key ? T.goldDim : hoveredNav === n.key ? "rgba(201,168,76,0.06)" : "transparent", border: "none", borderLeft: tab === n.key ? `2px solid ${T.gold}` : "2px solid transparent", color: tab === n.key ? T.goldLight : hoveredNav === n.key ? T.white : T.mutedLight, fontSize: 13, fontFamily: fontSans, fontWeight: tab === n.key ? 600 : 400, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
              <span style={{ fontSize: 14, width: 20, textAlign: "center" }}>{n.icon}</span>
              {n.label}
              {n.key === "deadlines" && pendingDeadlines > 0 && <span style={{ marginLeft: "auto", background: T.red, color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 10, minWidth: 16, textAlign: "center" }}>{pendingDeadlines}</span>}
              {n.key === "frictions" && criticalFrictions > 0 && <span style={{ marginLeft: "auto", background: T.orange, color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 10 }}>{criticalFrictions}</span>}
            </button>
          ))}
        </nav>
        {canSeeRevenue(currentUser) && (
          <div style={{ padding: "16px 24px", borderTop: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Revenue MTD</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: font, color: T.goldLight }}>{totalRevenueMTD.toLocaleString()}€</div>
            <ProgressBar value={totalRevenueMTD} max={totalTargetMTD} color={T.gold} height={4} />
            <div style={{ fontSize: 9, color: T.muted, marginTop: 6 }}>ILM OS v3 — Avril 2026</div>
          </div>
        )}
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div style={{ flex: 1, padding: "32px 40px", overflowY: "auto", maxHeight: "100vh" }}>

        {/* ════════════ DASHBOARD ════════════ */}
        {tab === "dashboard" && !isModel && (
          <div>
            <SectionTitle sub={`Vue d'ensemble — Avril 2026 — Bonjour ${currentUser.name}`}>Dashboard {isCEO ? "CEO" : ""}</SectionTitle>
            <div style={{ display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 8 }}>
              {isCEO && <ScoreRing score={globalScore} size={140} label="Score Global" />}
              <div style={{ display: "flex", gap: 14, flex: 1, flexWrap: "wrap" }}>
                <StatCard label="Revenue MTD" value={`${totalRevenueMTD.toLocaleString()}€`} sub={`Obj: ${totalTargetMTD.toLocaleString()}€`} accent={T.gold} icon="💰" />
                <StatCard label="OnlyFans" value={`${totalOF.toLocaleString()}€`} accent="#00AFF0" />
                <StatCard label="MYM" value={`${totalMYM.toLocaleString()}€`} accent={T.gold} />
                {isCEO && <StatCard label="Modèles" value={`${activeModels} / ${MODELS_DATA.length}`} sub={`${onboardingModels} onboarding`} accent={T.green} />}
                <StatCard label="IG Comptes" value={IG_KPI.totalAccounts} sub={`${IG_KPI.operational} opé / ${IG_KPI.warmup} warm-up`} accent="#E1306C" icon="📷" />
                <StatCard label="IG Followers" value={IG_KPI.totalFollowers.toLocaleString()} accent="#E1306C" />
              </div>
            </div>

            <SubTitle>Évolution Revenue (6 mois)</SubTitle>
            <Card>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ flex: 1 }}><div style={{ fontSize: 11, color: T.muted, marginBottom: 8 }}>OnlyFans</div><MiniChart data={REVENUE_HISTORY.map(r => ({ label: r.month, value: r.of }))} color="#00AFF0" height={50} /></div>
                <div style={{ width: 1, background: T.border }} />
                <div style={{ flex: 1 }}><div style={{ fontSize: 11, color: T.muted, marginBottom: 8 }}>MYM</div><MiniChart data={REVENUE_HISTORY.map(r => ({ label: r.month, value: r.mym }))} color={T.gold} height={50} /></div>
                <div style={{ width: 1, background: T.border }} />
                <div style={{ flex: 1 }}><div style={{ fontSize: 11, color: T.muted, marginBottom: 8 }}>Total</div><MiniChart data={REVENUE_HISTORY.map(r => ({ label: r.month, value: r.of + r.mym }))} color={T.green} height={50} /></div>
              </div>
            </Card>

            <SubTitle>Pipeline Modèles</SubTitle>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {visibleModels.map(m => (
                <Card key={m.id} onClick={() => { setTab("models"); setSelectedModel(m.id); }} style={{ minWidth: 260, flex: 1, borderLeft: `3px solid ${m.status === "active" ? T.green : T.orange}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <ModelAvatar model={m} size={32} />
                      <div>
                        <span style={{ fontFamily: font, fontSize: 18, fontWeight: 600 }}>{m.name}</span>
                        <span style={{ fontSize: 11, color: T.muted, marginLeft: 6 }}>{m.country} {m.age}ans</span>
                      </div>
                    </div>
                    <Badge color={m.status === "active" ? T.green : T.orange} bg={m.status === "active" ? T.greenDim : T.orangeDim}>{m.status === "active" ? "Active" : `Onb. ${m.onboarding}%`}</Badge>
                  </div>
                  <ProgressBar value={m.onboarding} color={m.status === "active" ? T.green : T.orange} glow />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11 }}>
                    <span style={{ color: T.goldLight }}>{(m.revenue.of_mtd + m.revenue.mym_mtd).toLocaleString()}€ MTD</span>
                    <span style={{ color: "#E1306C" }}>{m.ig_count} IG — {m.ig_followers > 0 ? `${(m.ig_followers/1000).toFixed(1)}k` : "0"}</span>
                  </div>
                  {m.alert && <div style={{ fontSize: 10, color: T.red, marginTop: 6, fontWeight: 600 }}>⚠ {m.alert}</div>}
                </Card>
              ))}
            </div>

            <SubTitle>Deadlines immédiates</SubTitle>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              {DEADLINES.filter(d => d.status === "urgent" || d.status === "pending").slice(0, 6).map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 18px", borderBottom: `1px solid ${T.border}`, fontSize: 12, background: d.status === "urgent" ? T.redDim : "transparent" }}>
                  <span style={{ color: d.status === "urgent" ? T.red : T.gold, fontWeight: 700, minWidth: 60 }}>{d.date}</span>
                  <span style={{ flex: 1 }}>{d.task}</span>
                  <Badge color={T.mutedLight}>{d.resp}</Badge>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* ════════════ MODEL SELF-VIEW ════════════ */}
        {tab === "my-profile" && isModel && (() => {
          const m = MODELS_DATA.find(x => x.id === currentUser.modelId);
          if (!m) return <EmptyState icon="?" text="Profil non trouvé" />;
          const missions = MISSIONS_DATA[m.id];
          const accounts = IG_ACCOUNTS[m.id] || [];
          return (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
                <ModelAvatar model={m} size={80} />
                <div>
                  <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 700, margin: 0, color: T.goldLight }}>{m.name}</h2>
                  <div style={{ fontSize: 13, color: T.mutedLight }}>{m.niche} — {m.country} {m.age} ans</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    {m.face ? <Badge color={T.green} bg={T.greenDim}>Face</Badge> : <Badge color={T.purple} bg={T.purpleDim}>No Face</Badge>}
                    {m.of && <Badge color="#00AFF0" bg="rgba(0,175,240,0.12)">OF</Badge>}
                    {m.mym && <Badge color={T.gold} bg={T.goldDim}>MYM</Badge>}
                    <Badge color="#E1306C" bg="rgba(225,48,108,0.12)">IG ×{m.ig_count}</Badge>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 8 }}>
                <StatCard label="Revenue MTD" value={`${(m.revenue.of_mtd + m.revenue.mym_mtd).toLocaleString()}€`} accent={T.gold} icon="💰" />
                <StatCard label="Followers IG" value={m.ig_followers > 0 ? m.ig_followers.toLocaleString() : "—"} accent="#E1306C" icon="📷" />
                <StatCard label="Comptes IG" value={m.ig_count} sub={`${m.ig_active} actifs / ${m.ig_warmup} warm-up`} accent="#E1306C" />
              </div>
              {missions && (
                <>
                  <SubTitle>Objectifs du mois</SubTitle>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                    {missions.objectives.map((obj, i) => {
                      const pct = obj.target > 0 ? Math.round((obj.current / obj.target) * 100) : 0;
                      return (
                        <Card key={i} style={{ padding: 16, borderTop: `2px solid ${pct >= 80 ? T.green : pct >= 50 ? T.orange : T.red}` }}>
                          <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", marginBottom: 6 }}>{obj.label}</div>
                          <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700 }}>{obj.current.toLocaleString()}{obj.unit}</div>
                          <ProgressBar value={obj.current} max={obj.target} color={pct >= 80 ? T.green : pct >= 50 ? T.orange : T.red} glow />
                          <div style={{ fontSize: 10, color: T.mutedLight, marginTop: 4 }}>Obj: {obj.target.toLocaleString()}{obj.unit} — {pct}%</div>
                        </Card>
                      );
                    })}
                  </div>
                  <SubTitle>To-do</SubTitle>
                  <Card style={{ padding: 0, overflow: "hidden" }}>
                    {missions.todos.map(todo => {
                      const checked = todoChecked[`${m.id}-${todo.id}`] ?? todo.done;
                      return (
                        <div key={todo.id} onClick={() => toggleTodo(m.id, todo.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: `1px solid ${T.border}`, cursor: "pointer", opacity: checked ? 0.5 : 1, transition: "opacity 0.2s" }}>
                          <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checked ? T.green : T.border}`, background: checked ? T.greenDim : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: T.green, flexShrink: 0 }}>{checked && "✓"}</div>
                          <span style={{ fontSize: 13, textDecoration: checked ? "line-through" : "none" }}>{todo.text}</span>
                        </div>
                      );
                    })}
                  </Card>
                </>
              )}
            </div>
          );
        })()}

        {/* ════════════ MODELES ════════════ */}
        {tab === "models" && !isModel && (
          <div>
            <SectionTitle sub="Suivi individuel par modèle — 3 modèles actives">CSM — Suivi Modèles</SectionTitle>
            {!selectedModel ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
                {visibleModels.map(m => (
                  <Card key={m.id} onClick={() => setSelectedModel(m.id)} style={{ borderLeft: `3px solid ${m.status === "active" ? T.green : T.orange}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <ModelAvatar model={m} size={36} />
                        <div><span style={{ fontFamily: font, fontSize: 20, fontWeight: 600 }}>{m.name}</span><span style={{ fontSize: 10, color: T.muted, marginLeft: 6 }}>{m.country}</span></div>
                      </div>
                      <Badge color={m.status === "active" ? T.green : T.orange} bg={m.status === "active" ? T.greenDim : T.orangeDim}>{m.stage}</Badge>
                    </div>
                    <div style={{ fontSize: 12, color: T.mutedLight, margin: "8px 0 14px" }}>{m.niche} — {m.manager}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                      {[{ l: "Onboarding", v: m.onboarding }, { l: "Autonomie", v: m.autonomy }, { l: "Assets", v: m.assets_stock }, { l: "Contenu", v: m.content_stock }].map(s => (
                        <div key={s.l}><div style={{ fontSize: 10, color: T.muted, marginBottom: 3 }}>{s.l}</div><ProgressBar value={s.v} color={s.v >= 60 ? T.green : s.v >= 30 ? T.orange : T.red} /><div style={{ fontSize: 10, color: T.mutedLight, marginTop: 2 }}>{s.v}%</div></div>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ background: T.card2, borderRadius: 8, padding: "6px 12px" }}><div style={{ fontSize: 10, color: T.muted }}>Revenue MTD</div><div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: T.goldLight }}>{(m.revenue.of_mtd + m.revenue.mym_mtd).toLocaleString()}€</div></div>
                      <div style={{ background: T.card2, borderRadius: 8, padding: "6px 12px" }}><div style={{ fontSize: 10, color: T.muted }}>Instagram</div><div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: "#E1306C" }}>{m.ig_count} comptes</div></div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {m.face ? <Badge color={T.green} bg={T.greenDim}>Face</Badge> : <Badge color={T.purple} bg={T.purpleDim}>No Face</Badge>}
                      {m.of && <Badge color="#00AFF0" bg="rgba(0,175,240,0.12)">OF</Badge>}
                      {m.mym && <Badge color={T.gold} bg={T.goldDim}>MYM</Badge>}
                    </div>
                    {m.alert && <div style={{ fontSize: 11, color: T.red, marginTop: 10, fontWeight: 600 }}>⚠ {m.alert}</div>}
                  </Card>
                ))}
              </div>
            ) : (() => {
              const m = visibleModels.find(x => x.id === selectedModel);
              if (!m) return <EmptyState icon="🔒" text="Accès non autorisé" />;
              const modelCalendar = CALENDAR_DATA.filter(c => c.model === m.id).slice(0, 5);
              const missions = MISSIONS_DATA[m.id];
              const accounts = IG_ACCOUNTS[m.id] || [];
              return (
                <div>
                  <button onClick={() => setSelectedModel(null)} style={{ background: "none", border: "none", color: T.gold, fontFamily: fontSans, fontSize: 12, cursor: "pointer", marginBottom: 16, padding: 0 }}>← Retour aux modèles</button>
                  <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
                    <ModelAvatar model={m} size={72} />
                    <div>
                      <h2 style={{ fontFamily: font, fontSize: 30, fontWeight: 700, margin: 0, color: T.goldLight }}>{m.name}</h2>
                      <div style={{ fontSize: 12, color: T.mutedLight }}>{m.niche} — Manager: {m.manager} — {m.country} {m.age} ans</div>
                    </div>
                    <Badge size="md" color={m.status === "active" ? T.green : T.orange} bg={m.status === "active" ? T.greenDim : T.orangeDim}>{m.status}</Badge>
                  </div>

                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
                    <StatCard label="Onboarding" value={`${m.onboarding}%`} accent={T.orange} />
                    <StatCard label="Autonomie" value={`${m.autonomy}%`} accent={T.blue} />
                    <StatCard label="Assets" value={`${m.assets_stock}%`} accent={T.purple} />
                    <StatCard label="Contenu" value={`${m.content_stock}%`} accent={T.gold} />
                    <StatCard label="IG Comptes" value={m.ig_count} sub={`${m.ig_active} actifs / ${m.ig_warmup} warm-up`} accent="#E1306C" />
                  </div>

                  {canSeeRevenue(currentUser) && (<><SubTitle>Revenue</SubTitle><Card><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}><div><RevenueBar label="OnlyFans" current={m.revenue.of_mtd} target={m.revenue.of_target} color="#00AFF0" /><RevenueBar label="MYM" current={m.revenue.mym_mtd} target={m.revenue.mym_target} color={T.gold} /></div><div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}><div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase" }}>Total MTD</div><div style={{ fontFamily: font, fontSize: 36, fontWeight: 700, color: T.goldLight }}>{(m.revenue.of_mtd + m.revenue.mym_mtd).toLocaleString()}€</div>{m.revenue.last_month_total > 0 && <div style={{ fontSize: 11, color: T.mutedLight }}>Mois dernier: {m.revenue.last_month_total.toLocaleString()}€</div>}</div></div></Card></>)}

                  {/* IG Accounts inline */}
                  {accounts.length > 0 && (<><SubTitle action={<a href={GSHEET_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#E1306C", textDecoration: "none" }}>Google Sheet ↗</a>}>Comptes Instagram ({accounts.filter(a => a.handle).length})</SubTitle><Card style={{ padding: 0, overflow: "hidden" }}><div style={{ display: "grid", gridTemplateColumns: "30px 160px 90px 90px 80px 80px 1fr", padding: "10px 16px", fontSize: 9, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${T.border}` }}><span>#</span><span>Handle</span><span>Resp.</span><span>Statut</span><span>Phase</span><span>Followers</span><span>Notes</span></div>
                    {accounts.filter(a => a.handle).map(a => (
                      <div key={a.num} style={{ display: "grid", gridTemplateColumns: "30px 160px 90px 90px 80px 80px 1fr", padding: "9px 16px", borderBottom: `1px solid ${T.border}`, fontSize: 11, alignItems: "center" }}>
                        <span style={{ color: T.muted }}>{a.num}</span>
                        <a href={`https://instagram.com/${a.handle}`} target="_blank" rel="noopener noreferrer" style={{ color: "#E1306C", textDecoration: "none", fontWeight: a.main ? 700 : 400 }}>@{a.handle}{a.main ? " ★" : ""}</a>
                        <span style={{ color: T.mutedLight }}>{a.resp}</span>
                        <Badge color={igStatusColor(a.status)} bg={`${igStatusColor(a.status)}20`}>{a.status}</Badge>
                        <span style={{ color: T.muted }}>{a.phase}</span>
                        <span style={{ color: a.followers > 0 ? T.white : T.muted, fontWeight: a.followers > 0 ? 600 : 400 }}>{a.followers > 0 ? a.followers.toLocaleString() : "—"}</span>
                        <span style={{ color: T.mutedLight, fontSize: 10 }}>{a.notes}</span>
                      </div>
                    ))}
                  </Card></>)}

                  {missions && (<><SubTitle>Objectifs du mois</SubTitle><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>{missions.objectives.map((obj, i) => { const pct = obj.target > 0 ? Math.round((obj.current / obj.target) * 100) : 0; return (<Card key={i} style={{ padding: 14, borderTop: `2px solid ${pct >= 80 ? T.green : pct >= 50 ? T.orange : T.red}` }}><div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", marginBottom: 4 }}>{obj.label}</div><div style={{ fontFamily: font, fontSize: 20, fontWeight: 700 }}>{obj.current.toLocaleString()}{obj.unit}</div><ProgressBar value={obj.current} max={obj.target} color={pct >= 80 ? T.green : pct >= 50 ? T.orange : T.red} glow /><div style={{ fontSize: 9, color: T.mutedLight, marginTop: 3 }}>/ {obj.target.toLocaleString()}{obj.unit}</div></Card>); })}</div></>)}

                  {m.friction && <div style={{ background: T.redDim, border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", marginTop: 16 }}><div style={{ fontSize: 10, color: T.red, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Friction</div><div style={{ fontSize: 13 }}>{m.friction}</div></div>}

                  <SubTitle>Prochaines Actions</SubTitle>
                  <Card style={{ padding: 0, overflow: "hidden" }}>
                    {m.next_actions.map((a, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderBottom: `1px solid ${T.border}`, fontSize: 13 }}><span style={{ width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${T.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: T.gold, flexShrink: 0, fontWeight: 700 }}>{i+1}</span>{a}</div>)}
                  </Card>

                  {modelCalendar.length > 0 && (<><SubTitle>Contenus à venir</SubTitle><Card style={{ padding: 0, overflow: "hidden" }}>{modelCalendar.map(c => (<div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: `1px solid ${T.border}`, fontSize: 12 }}><span style={{ color: T.mutedLight, minWidth: 50 }}>{c.date.slice(5)}</span><Badge color={PLATFORM_COLORS[c.platform]} bg={`${PLATFORM_COLORS[c.platform]}20`}>{c.platform}</Badge><span style={{ flex: 1 }}>{c.title}</span><Badge color={CONTENT_STATUS_COLORS[c.status]} bg={`${CONTENT_STATUS_COLORS[c.status]}20`}>{c.status}</Badge></div>))}</Card></>)}
                </div>
              );
            })()}
          </div>
        )}

        {/* ════════════ REVENUE ════════════ */}
        {tab === "revenue" && canSeeRevenue(currentUser) && (
          <div>
            <SectionTitle sub="Suivi financier par modèle et plateforme">Revenue Tracking</SectionTitle>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 8 }}>
              <StatCard label="Revenue MTD" value={`${totalRevenueMTD.toLocaleString()}€`} sub={`Obj: ${totalTargetMTD.toLocaleString()}€`} accent={T.gold} icon="💰" />
              <StatCard label="OnlyFans" value={`${totalOF.toLocaleString()}€`} accent="#00AFF0" />
              <StatCard label="MYM" value={`${totalMYM.toLocaleString()}€`} accent={T.gold} />
              <StatCard label="vs. Mois dernier" value={`${revenueGrowth > 0 ? "+" : ""}${revenueGrowth}%`} sub={`${totalLastMonth.toLocaleString()}€ en mars`} accent={revenueGrowth >= 0 ? T.green : T.red} />
            </div>
            <SubTitle>Progression vs. Objectif</SubTitle>
            <Card>
              <RevenueBar label="Total Agence" current={totalRevenueMTD} target={totalTargetMTD} color={T.gold} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 8 }}>
                <RevenueBar label="OnlyFans" current={totalOF} target={MODELS_DATA.reduce((a, m) => a + m.revenue.of_target, 0)} color="#00AFF0" />
                <RevenueBar label="MYM" current={totalMYM} target={MODELS_DATA.reduce((a, m) => a + m.revenue.mym_target, 0)} color={T.gold} />
              </div>
            </Card>
            <SubTitle>Évolution (6 mois)</SubTitle>
            <Card><div style={{ display: "flex", gap: 30 }}><div style={{ flex: 2 }}><MiniChart data={REVENUE_HISTORY.map(r => ({ label: r.month, value: r.of + r.mym }))} color={T.gold} height={80} /></div><div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>{REVENUE_HISTORY.map((r, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}><span style={{ color: T.muted }}>{r.month}</span><span style={{ color: T.white, fontWeight: 600 }}>{(r.of + r.mym).toLocaleString()}€</span></div>)}</div></div></Card>
            <SubTitle>Détail par Modèle</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {visibleModels.map(m => (<Card key={m.id} style={{ borderLeft: `3px solid ${m.status === "active" ? T.green : T.orange}` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><ModelAvatar model={m} size={28} /><span style={{ fontFamily: font, fontSize: 18, fontWeight: 600 }}>{m.name}</span></div><span style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: T.goldLight }}>{(m.revenue.of_mtd + m.revenue.mym_mtd).toLocaleString()}€</span></div><RevenueBar label="OnlyFans" current={m.revenue.of_mtd} target={m.revenue.of_target} color="#00AFF0" /><RevenueBar label="MYM" current={m.revenue.mym_mtd} target={m.revenue.mym_target} color={T.gold} /></Card>))}
            </div>
          </div>
        )}

        {/* ════════════ MISSIONS ════════════ */}
        {tab === "missions" && (
          <div>
            <SectionTitle sub="To-do et objectifs mensuels par modèle">Missions</SectionTitle>
            {(isModel ? [MODELS_DATA.find(m => m.id === currentUser.modelId)] : visibleModels).filter(Boolean).map(m => {
              const missions = MISSIONS_DATA[m.id]; if (!missions) return null;
              return (
                <div key={m.id} style={{ marginBottom: 40 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}><ModelAvatar model={m} size={40} /><div><div style={{ fontFamily: font, fontSize: 22, fontWeight: 600, color: T.goldLight }}>{m.name}</div><div style={{ fontSize: 11, color: T.mutedLight }}>{m.niche}</div></div></div>
                  <SubTitle>Objectifs Avril 2026</SubTitle>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                    {missions.objectives.map((obj, i) => { const pct = obj.target > 0 ? Math.round((obj.current / obj.target) * 100) : 0; return (<Card key={i} style={{ padding: 16, borderTop: `2px solid ${pct >= 80 ? T.green : pct >= 50 ? T.orange : T.red}` }}><div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", marginBottom: 6 }}>{obj.label}</div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}><span style={{ fontFamily: font, fontSize: 24, fontWeight: 700 }}>{obj.current.toLocaleString()}{obj.unit}</span><span style={{ fontSize: 11, color: T.mutedLight }}>/ {obj.target.toLocaleString()}{obj.unit}</span></div><ProgressBar value={obj.current} max={obj.target} color={pct >= 80 ? T.green : pct >= 50 ? T.orange : T.red} height={8} glow /><div style={{ fontSize: 10, color: pct >= 80 ? T.green : pct >= 50 ? T.orange : T.red, marginTop: 4, textAlign: "right", fontWeight: 600 }}>{pct}%</div></Card>); })}
                  </div>
                  <SubTitle>To-do</SubTitle>
                  <Card style={{ padding: 0, overflow: "hidden" }}>
                    {missions.todos.map(todo => { const checked = todoChecked[`${m.id}-${todo.id}`] ?? todo.done; return (
                      <div key={todo.id} onClick={() => toggleTodo(m.id, todo.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: `1px solid ${T.border}`, cursor: "pointer", opacity: checked ? 0.5 : 1, transition: "opacity 0.2s" }}>
                        <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked ? T.green : T.border}`, background: checked ? T.greenDim : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: T.green, flexShrink: 0 }}>{checked && "✓"}</div>
                        <span style={{ fontSize: 13, textDecoration: checked ? "line-through" : "none" }}>{todo.text}</span>
                      </div>); })}
                  </Card>
                </div>
              );
            })}
          </div>
        )}

        {/* ════════════ CALENDAR ════════════ */}
        {tab === "calendar" && (
          <div>
            <SectionTitle sub="Planning de publication par modèle">Calendrier Éditorial</SectionTitle>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setCalendarWeekOffset(w => w-1)} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, color: T.white, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: fontSans }}>← Sem. préc.</button>
                <button onClick={() => setCalendarWeekOffset(0)} style={{ background: T.goldDim, border: "1px solid rgba(201,168,76,0.3)", borderRadius: 8, color: T.goldLight, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: fontSans }}>Aujourd'hui</button>
                <button onClick={() => setCalendarWeekOffset(w => w+1)} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, color: T.white, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: fontSans }}>Sem. suiv. →</button>
              </div>
              {!isModel && <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setCalendarFilter("all")} style={{ background: calendarFilter === "all" ? T.goldDim : T.card, border: `1px solid ${calendarFilter === "all" ? "rgba(201,168,76,0.3)" : T.border}`, borderRadius: 8, color: calendarFilter === "all" ? T.goldLight : T.mutedLight, padding: "6px 12px", cursor: "pointer", fontSize: 11, fontFamily: fontSans }}>Toutes</button>
                {visibleModels.map(m => <button key={m.id} onClick={() => setCalendarFilter(m.id)} style={{ background: calendarFilter === m.id ? T.goldDim : T.card, border: `1px solid ${calendarFilter === m.id ? "rgba(201,168,76,0.3)" : T.border}`, borderRadius: 8, color: calendarFilter === m.id ? T.goldLight : T.mutedLight, padding: "6px 12px", cursor: "pointer", fontSize: 11, fontFamily: fontSans }}>{m.name.split(" ")[0]}</button>)}
              </div>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
              {weekDays.map((day, di) => {
                const dateStr = formatDate(day); const isToday = dateStr === formatDate(today);
                const dayItems = filteredCalendar.filter(c => c.date === dateStr);
                return (
                  <div key={di} style={{ minHeight: 180 }}>
                    <div style={{ textAlign: "center", padding: "8px 0", marginBottom: 6, borderRadius: 8, background: isToday ? T.goldDim : T.card, border: `1px solid ${isToday ? "rgba(201,168,76,0.3)" : T.border}` }}>
                      <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase" }}>{DAY_NAMES[di]}</div>
                      <div style={{ fontSize: 18, fontFamily: font, fontWeight: 700, color: isToday ? T.goldLight : T.white }}>{day.getDate()}</div>
                      <div style={{ fontSize: 9, color: T.muted }}>{day.toLocaleDateString("fr-FR", { month: "short" })}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {dayItems.map(item => { const md = MODELS_DATA.find(m => m.id === item.model); return (
                        <div key={item.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid ${CONTENT_STATUS_COLORS[item.status]}`, borderRadius: 6, padding: "6px 8px", fontSize: 10 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><Badge color={PLATFORM_COLORS[item.platform]} bg={`${PLATFORM_COLORS[item.platform]}20`}>{item.platform}</Badge><span style={{ color: T.muted, fontSize: 9 }}>{item.type}</span></div>
                          <div style={{ color: T.white, fontSize: 10, lineHeight: 1.3, marginBottom: 3 }}>{item.title}</div>
                          <div style={{ color: T.mutedLight, fontSize: 9 }}>{md?.name.split(" ")[0]}</div>
                        </div>); })}
                      {dayItems.length === 0 && <div style={{ textAlign: "center", padding: "16px 0", color: T.muted, fontSize: 10 }}>—</div>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 20 }}>{CONTENT_STAGES.filter(s => s.key !== "posted").map(s => <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: T.mutedLight }}><div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />{s.label}</div>)}</div>
          </div>
        )}

        {/* ════════════ AGENDA ════════════ */}
        {tab === "agenda" && (
          <div>
            <SectionTitle sub={isModel ? "Vos rendez-vous" : "Planning d'équipe"}>Agenda</SectionTitle>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <button onClick={() => setAgendaWeekOffset(w => w-1)} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, color: T.white, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: fontSans }}>← Sem. préc.</button>
              <button onClick={() => setAgendaWeekOffset(0)} style={{ background: T.goldDim, border: "1px solid rgba(201,168,76,0.3)", borderRadius: 8, color: T.goldLight, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: fontSans }}>Cette semaine</button>
              <button onClick={() => setAgendaWeekOffset(w => w+1)} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, color: T.white, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: fontSans }}>Sem. suiv. →</button>
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>{Object.entries(AGENDA_TYPE_COLORS).map(([type, color]) => <div key={type} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: T.mutedLight }}><div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />{type.charAt(0).toUpperCase() + type.slice(1)}</div>)}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
              {agendaWeekDays.map((day, di) => {
                const dateStr = formatDate(day); const isToday = dateStr === formatDate(today);
                const dayEvents = filteredAgenda.filter(a => a.date === dateStr).sort((a, b) => a.time.localeCompare(b.time));
                return (
                  <div key={di} style={{ minHeight: 200 }}>
                    <div style={{ textAlign: "center", padding: "8px 0", marginBottom: 6, borderRadius: 8, background: isToday ? T.goldDim : T.card, border: `1px solid ${isToday ? "rgba(201,168,76,0.3)" : T.border}` }}>
                      <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase" }}>{DAY_NAMES[di]}</div>
                      <div style={{ fontSize: 18, fontFamily: font, fontWeight: 700, color: isToday ? T.goldLight : T.white }}>{day.getDate()}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {dayEvents.map(evt => (
                        <div key={evt.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid ${AGENDA_TYPE_COLORS[evt.type] || T.muted}`, borderRadius: 6, padding: "6px 8px", fontSize: 10 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><span style={{ fontWeight: 700, color: AGENDA_TYPE_COLORS[evt.type] }}>{evt.time}</span><span style={{ color: T.muted, fontSize: 9 }}>{evt.duration}min</span></div>
                          <div style={{ color: T.white, fontSize: 10, lineHeight: 1.3, marginBottom: 3 }}>{evt.title}</div>
                          <div style={{ color: T.mutedLight, fontSize: 9 }}>{evt.participants.slice(0, 3).join(", ")}{evt.participants.length > 3 ? ` +${evt.participants.length-3}` : ""}</div>
                        </div>
                      ))}
                      {dayEvents.length === 0 && <div style={{ textAlign: "center", padding: "16px 0", color: T.muted, fontSize: 10 }}>—</div>}
                    </div>
                  </div>
                );
              })}
            </div>
            <SubTitle>Liste des événements</SubTitle>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              {filteredAgenda.filter(a => { const d = new Date(a.date); return d >= agendaWeekDays[0] && d <= agendaWeekDays[6]; }).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)).map(evt => (
                <div key={evt.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 18px", borderBottom: `1px solid ${T.border}`, fontSize: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 80 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: AGENDA_TYPE_COLORS[evt.type] }} /><span style={{ color: T.gold, fontWeight: 700 }}>{evt.date.slice(5)}</span></div>
                  <span style={{ color: T.goldLight, fontWeight: 600, minWidth: 50 }}>{evt.time}</span>
                  <span style={{ flex: 1 }}>{evt.title}</span>
                  <span style={{ fontSize: 10, color: T.mutedLight }}>{evt.duration}min</span>
                  <div style={{ display: "flex", gap: 3 }}>{evt.participants.slice(0, 3).map((p, i) => <Badge key={i} color={T.mutedLight}>{p}</Badge>)}</div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* ════════════ INSTAGRAM (FULL) ════════════ */}
        {tab === "instagram" && (
          <div>
            <SectionTitle sub="Comptes, statuts, accès et KPI — Données Google Sheet"
              action={<a href={GSHEET_URL} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 16px", background: "linear-gradient(135deg, #E1306C, #7C5CFC)", borderRadius: 8, color: "#fff", fontSize: 12, fontWeight: 600, textDecoration: "none", fontFamily: fontSans }}>Ouvrir Google Sheet ↗</a>}>
              Instagram
            </SectionTitle>

            {/* Global KPI */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 8 }}>
              <StatCard label="Total Comptes" value={IG_KPI.totalAccounts} sub={`créés (3 modèles)`} accent="#E1306C" icon="📷" />
              <StatCard label="Opérationnels" value={IG_KPI.operational} sub="prêts à publier" accent={T.green} />
              <StatCard label="Warm-up" value={IG_KPI.warmup} sub="en chauffe" accent={T.orange} />
              <StatCard label="Followers Total" value={IG_KPI.totalFollowers.toLocaleString()} accent="#E1306C" />
              <StatCard label="À renseigner" value={IG_KPI.toComplete} sub="comptes incomplets" accent={T.muted} />
              <StatCard label="Priorité Haute" value={IG_KPI.priorityHigh} accent={T.red} />
            </div>

            {/* Per-model summary */}
            <SubTitle>Synthèse par Modèle</SubTitle>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "50px 1fr 70px 70px 70px 70px 100px 80px", padding: "10px 16px", fontSize: 9, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${T.border}` }}>
                <span></span><span>Modèle</span><span>Comptes</span><span>Actifs</span><span>Warm-up</span><span>Alertes</span><span>Abonnés</span><span>Priorité</span>
              </div>
              {visibleModels.map(m => (
                <div key={m.id} onClick={() => setIgSelectedModel(igSelectedModel === m.id ? null : m.id)} style={{ display: "grid", gridTemplateColumns: "50px 1fr 70px 70px 70px 70px 100px 80px", padding: "12px 16px", borderBottom: `1px solid ${T.border}`, fontSize: 12, alignItems: "center", cursor: "pointer", background: igSelectedModel === m.id ? T.goldDim : "transparent", transition: "background 0.15s" }}>
                  <ModelAvatar model={m} size={28} />
                  <div><span style={{ fontWeight: 600, color: T.goldLight }}>{m.name}</span><span style={{ fontSize: 10, color: T.muted, marginLeft: 6 }}>{m.country} {m.age}ans</span></div>
                  <span style={{ fontWeight: 600 }}>{m.ig_count}</span>
                  <span style={{ color: T.green }}>{m.ig_active}</span>
                  <span style={{ color: T.orange }}>{m.ig_warmup}</span>
                  <span style={{ color: m.ig_alerts > 0 ? T.red : T.muted }}>{m.ig_alerts}</span>
                  <span style={{ fontWeight: 600, color: m.ig_followers > 0 ? T.white : T.muted }}>{m.ig_followers > 0 ? m.ig_followers.toLocaleString() : "—"}</span>
                  <span style={{ color: m.ig_priority_high > 0 ? T.red : T.muted, fontWeight: m.ig_priority_high > 0 ? 600 : 400 }}>{m.ig_priority_high > 0 ? `${m.ig_priority_high} haute` : "—"}</span>
                </div>
              ))}
            </Card>

            {/* Detailed accounts when model selected */}
            {igSelectedModel && IG_ACCOUNTS[igSelectedModel] && (() => {
              const m = MODELS_DATA.find(x => x.id === igSelectedModel);
              const accounts = IG_ACCOUNTS[igSelectedModel].filter(a => a.handle);
              if (!m || accounts.length === 0) return <EmptyState icon="📷" text="Aucun compte créé" />;
              return (
                <div style={{ marginTop: 20 }}>
                  <SubTitle>{m.name} — {accounts.length} comptes Instagram</SubTitle>
                  <Card style={{ padding: 0, overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "30px 150px 80px 80px 90px 70px 80px 1fr", padding: "10px 14px", fontSize: 9, color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${T.border}` }}>
                      <span>#</span><span>Handle</span><span>Resp.</span><span>Téléphone</span><span>Statut</span><span>Phase</span><span>Followers</span><span>Notes</span>
                    </div>
                    {accounts.map(a => (
                      <div key={`${igSelectedModel}-${a.num}`} style={{ display: "grid", gridTemplateColumns: "30px 150px 80px 80px 90px 70px 80px 1fr", padding: "9px 14px", borderBottom: `1px solid ${T.border}`, fontSize: 11, alignItems: "center", background: a.main ? T.goldDim : "transparent" }}>
                        <span style={{ color: T.muted }}>{a.num}</span>
                        <a href={`https://instagram.com/${a.handle}`} target="_blank" rel="noopener noreferrer" style={{ color: "#E1306C", textDecoration: "none", fontWeight: a.main ? 700 : 400, fontSize: 11 }}>@{a.handle}{a.main ? " ★" : ""}</a>
                        <span style={{ color: T.mutedLight, fontSize: 10 }}>{a.resp}</span>
                        <span style={{ color: T.muted, fontSize: 10 }}>{a.phone}</span>
                        <Badge color={igStatusColor(a.status)} bg={`${igStatusColor(a.status)}20`}>{a.status}</Badge>
                        <span style={{ color: T.muted, fontSize: 10 }}>{a.phase}</span>
                        <span style={{ color: a.followers > 0 ? T.white : T.muted, fontWeight: a.followers > 0 ? 600 : 400 }}>{a.followers > 0 ? a.followers.toLocaleString() : "—"}</span>
                        <span style={{ color: T.mutedLight, fontSize: 10 }}>{a.notes}</span>
                      </div>
                    ))}
                  </Card>

                </div>
              );
            })()}

            {/* If no model selected, show all accounts */}
            {!igSelectedModel && (
              <>
                {visibleModels.map(m => {
                  const accounts = (IG_ACCOUNTS[m.id] || []).filter(a => a.handle);
                  if (accounts.length === 0) return (
                    <div key={m.id} style={{ marginTop: 20 }}>
                      <SubTitle>{m.name} — Aucun compte</SubTitle>
                      <Card><EmptyState icon="📷" text={`Aucun compte Instagram créé — ${m.friction || "En attente"}`} /></Card>
                    </div>
                  );
                  return (
                    <div key={m.id} style={{ marginTop: 20 }}>
                      <SubTitle>{m.name} — {accounts.length} comptes</SubTitle>
                      <Card style={{ padding: 0, overflow: "hidden" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "30px 150px 80px 80px 90px 70px 80px 1fr", padding: "10px 14px", fontSize: 9, color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${T.border}` }}>
                          <span>#</span><span>Handle</span><span>Resp.</span><span>Tél.</span><span>Statut</span><span>Phase</span><span>Follow.</span><span>Notes</span>
                        </div>
                        {accounts.map(a => (
                          <div key={`${m.id}-${a.num}`} style={{ display: "grid", gridTemplateColumns: "30px 150px 80px 80px 90px 70px 80px 1fr", padding: "9px 14px", borderBottom: `1px solid ${T.border}`, fontSize: 11, alignItems: "center", background: a.main ? T.goldDim : "transparent" }}>
                            <span style={{ color: T.muted }}>{a.num}</span>
                            <a href={`https://instagram.com/${a.handle}`} target="_blank" rel="noopener noreferrer" style={{ color: "#E1306C", textDecoration: "none", fontWeight: a.main ? 700 : 400 }}>@{a.handle}{a.main ? " ★" : ""}</a>
                            <span style={{ color: T.mutedLight, fontSize: 10 }}>{a.resp}</span>
                            <span style={{ color: T.muted, fontSize: 10 }}>{a.phone}</span>
                            <Badge color={igStatusColor(a.status)} bg={`${igStatusColor(a.status)}20`}>{a.status}</Badge>
                            <span style={{ color: T.muted, fontSize: 10 }}>{a.phase}</span>
                            <span style={{ color: a.followers > 0 ? T.white : T.muted, fontWeight: a.followers > 0 ? 600 : 400 }}>{a.followers > 0 ? a.followers.toLocaleString() : "—"}</span>
                            <span style={{ color: T.mutedLight, fontSize: 10 }}>{a.notes}</span>
                          </div>
                        ))}
                      </Card>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* ════════════ CHATTERS ════════════ */}
        {tab === "chatters" && canSeeChatting(currentUser) && (
          <div>
            <SectionTitle sub="Performance et suivi quotidien">Module Chatters</SectionTitle>
            <div style={{ display: "flex", gap: 14, marginBottom: 8 }}>
              <StatCard label="Messages total" value={CHATTERS_DATA.reduce((a, c) => a + c.kpi_messages, 0)} accent={T.blue} icon="💬" />
              <StatCard label="Revenue chatting" value={`${CHATTERS_DATA.reduce((a, c) => a + c.kpi_revenue, 0).toLocaleString()}€`} accent={T.gold} icon="💰" />
              <StatCard label="Customs total" value={CHATTERS_DATA.reduce((a, c) => a + c.kpi_customs, 0)} accent={T.purple} icon="🎯" />
            </div>
            <SubTitle>Performance Individuelle</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {CHATTERS_DATA.map(c => (
                <Card key={c.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div><div style={{ fontFamily: font, fontSize: 22, fontWeight: 600 }}>{c.name}</div><div style={{ fontSize: 11, color: T.mutedLight }}>{c.role}</div></div>
                    <Badge color={c.trend === "up" ? T.green : c.trend === "down" ? T.red : T.muted} bg={c.trend === "up" ? T.greenDim : c.trend === "down" ? T.redDim : T.card2} size="md">{c.trend === "up" ? "↑ Progression" : c.trend === "down" ? "↓ Baisse" : "→ Stable"}</Badge>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                    {[{ label: "Messages", value: c.kpi_messages, color: T.blue }, { label: "Revenue", value: `${c.kpi_revenue}€`, color: T.gold }, { label: "Customs", value: c.kpi_customs, color: T.purple }].map(k => (
                      <div key={k.label} style={{ background: T.card2, borderRadius: 8, padding: "10px 12px", textAlign: "center", borderTop: `2px solid ${k.color}` }}><div style={{ fontSize: 10, color: T.muted, marginBottom: 4 }}>{k.label}</div><div style={{ fontSize: 20, fontWeight: 700, fontFamily: font }}>{k.value}</div></div>
                    ))}
                  </div>
                  {[{ l: "Rigueur", v: c.rigueur }, { l: "Progression", v: c.progression }].map(s => <div key={s.l} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.mutedLight, marginBottom: 3 }}><span>{s.l}</span><span>{s.v}%</span></div><ProgressBar value={s.v} color={s.v >= 60 ? T.green : T.orange} glow /></div>)}
                  <div style={{ fontSize: 11, color: T.mutedLight, fontStyle: "italic", padding: "8px 0", borderTop: `1px solid ${T.border}` }}>{c.notes}</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ════════════ PERSONAS ════════════ */}
        {tab === "personas" && canSeeChatting(currentUser) && (
          <div>
            <SectionTitle sub="Fiches persona pour le chatting — Confidentiel">Personas Modèles</SectionTitle>
            {visibleModels.map(m => {
              const p = PERSONAS[m.id]; if (!p) return null;
              return (
                <Card key={m.id} style={{ marginBottom: 20, borderLeft: `3px solid ${T.gold}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <ModelAvatar model={m} size={56} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: font, fontSize: 24, fontWeight: 700, color: T.goldLight }}>{m.name}</div>
                      <div style={{ fontSize: 12, color: T.mutedLight }}>{p.flag} {p.age} ans — {p.type} — {p.niche}</div>
                    </div>
                    <Badge size="lg" color={m.status === "active" ? T.green : T.orange} bg={m.status === "active" ? T.greenDim : T.orangeDim}>{m.status}</Badge>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <div>
                      <div style={{ fontSize: 10, color: T.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontWeight: 700 }}>Positionnement</div>
                      <div style={{ fontSize: 12, color: T.white, lineHeight: 1.5, marginBottom: 16 }}>{p.positioning}</div>
                      <div style={{ fontSize: 10, color: T.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontWeight: 700 }}>Personnalité</div>
                      <div style={{ fontSize: 12, color: T.white, lineHeight: 1.5, marginBottom: 16 }}>{p.personality}</div>
                      <div style={{ fontSize: 10, color: T.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontWeight: 700 }}>Ton général</div>
                      <div style={{ fontSize: 12, color: T.white }}>{p.tone}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: T.blue, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontWeight: 700 }}>Guide Chatting</div>
                      <div style={{ fontSize: 12, color: T.white, lineHeight: 1.5, marginBottom: 16, background: T.card2, padding: 12, borderRadius: 8 }}>{p.chatGuide}</div>
                      <div style={{ fontSize: 10, color: T.purple, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontWeight: 700 }}>Ton à adopter</div>
                      <div style={{ fontSize: 12, color: T.white, marginBottom: 16 }}>{p.chatTone}</div>
                      <div style={{ fontSize: 10, color: T.red, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontWeight: 700 }}>Interdit</div>
                      <div style={{ fontSize: 12, color: T.white, marginBottom: 16 }}>{p.forbidden}</div>
                      <div style={{ fontSize: 10, color: T.green, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontWeight: 700 }}>Sujets</div>
                      <div style={{ fontSize: 12, color: T.white }}>{p.topics}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* ════════════ CONTENT ════════════ */}
        {tab === "content" && (
          <div>
            <SectionTitle sub="Pipeline de production et Kanban">Content Engine</SectionTitle>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              {CONTENT_STAGES.map(s => { const count = filteredCalendar.filter(c => c.status === s.key).length; return (
                <Card key={s.key} style={{ minWidth: 100, flex: 1, borderTop: `2px solid ${s.color}`, textAlign: "center", padding: "14px 16px" }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div><div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{s.label}</div><div style={{ fontSize: 24, fontWeight: 700, fontFamily: font }}>{count}</div>
                </Card>); })}
            </div>
            <SubTitle>Pipeline Kanban</SubTitle>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 10 }}>
              {CONTENT_STAGES.map(s => { const items = filteredCalendar.filter(c => c.status === s.key); return (
                <div key={s.key} style={{ minWidth: 180, flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, padding: "8px 12px", background: T.card, borderRadius: 8, textAlign: "center", borderBottom: `2px solid ${s.color}` }}>{s.icon} {s.label} ({items.length})</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {items.length > 0 ? items.map(item => { const md = MODELS_DATA.find(m => m.id === item.model); return (
                      <div key={item.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 12px", fontSize: 11 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><Badge color={PLATFORM_COLORS[item.platform]} bg={`${PLATFORM_COLORS[item.platform]}20`}>{item.platform}</Badge><span style={{ color: T.muted, fontSize: 9 }}>{item.date.slice(5)}</span></div>
                        <div style={{ color: T.white, marginBottom: 3 }}>{item.title}</div><div style={{ color: T.mutedLight, fontSize: 10 }}>{md?.name.split(" ")[0]} — {item.type}</div>
                      </div>); }) : <div style={{ background: T.surface, border: `1px dashed ${T.border}`, borderRadius: 8, padding: "20px 10px", textAlign: "center", color: T.muted, fontSize: 10 }}>Aucun contenu</div>}
                  </div>
                </div>); })}
            </div>
          </div>
        )}

        {/* ════════════ DEADLINES ════════════ */}
        {tab === "deadlines" && (
          <div>
            <SectionTitle sub="Tâches et échéances — Avril 2026">Deadlines</SectionTitle>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 140px 90px", padding: "10px 18px", fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: `1px solid ${T.border}` }}><span>Date</span><span>Tâche</span><span>Responsable</span><span>Statut</span></div>
              {DEADLINES.map((d, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 140px 90px", padding: "11px 18px", borderBottom: `1px solid ${T.border}`, fontSize: 12, alignItems: "center", background: d.status === "urgent" ? T.redDim : "transparent" }}>
                  <span style={{ fontWeight: 700, color: d.status === "urgent" ? T.red : T.gold }}>{d.date}</span>
                  <span>{d.task}</span>
                  <Badge color={T.mutedLight}>{d.resp}</Badge>
                  <Badge color={d.status === "urgent" ? T.red : d.status === "pending" ? T.orange : T.muted} bg={d.status === "urgent" ? T.redDim : d.status === "pending" ? T.orangeDim : T.card2}>{d.status}</Badge>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* ════════════ FRICTIONS ════════════ */}
        {tab === "frictions" && canSeeFrictions(currentUser) && (
          <div>
            <SectionTitle sub="Points de blocage et suggestions">Carte des Frictions</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
              {FRICTIONS.map((f, i) => { const c = f.level === "critical" ? T.red : f.level === "high" ? T.orange : T.gold; const bg = f.level === "critical" ? T.redDim : f.level === "high" ? T.orangeDim : T.goldDim; return (
                <Card key={i} style={{ borderLeft: `3px solid ${c}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><span style={{ fontFamily: font, fontSize: 17, fontWeight: 600 }}>{f.zone}</span><Badge color={c} bg={bg} size="md">{f.level}</Badge></div>
                  <div style={{ fontSize: 12, marginBottom: 6 }}>{f.detail}</div>
                  <div style={{ fontSize: 11, color: T.mutedLight, marginBottom: 8 }}>Impact: {f.impact}</div>
                  {f.suggestion && <div style={{ fontSize: 11, color: T.green, background: T.greenDim, padding: "6px 10px", borderRadius: 6, display: "flex", gap: 6, alignItems: "center" }}><span>💡</span> {f.suggestion}</div>}
                </Card>); })}
            </div>
          </div>
        )}

        {/* ════════════ TEAM ════════════ */}
        {tab === "team" && canSeeTeam(currentUser) && (
          <div>
            <SectionTitle sub="Organisation, accès, téléphones et comptes">Équipe & Rôles</SectionTitle>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "140px 180px 160px 1fr 80px", padding: "10px 18px", fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: `1px solid ${T.border}` }}><span>Membre</span><span>Rôle</span><span>Téléphone</span><span>Modèle(s)</span><span>Statut</span></div>
              {TEAM_PHONES.map((t, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 180px 160px 1fr 80px", padding: "12px 18px", borderBottom: `1px solid ${T.border}`, fontSize: 13, alignItems: "center" }}>
                  <span style={{ fontWeight: 600, color: T.goldLight }}>{t.name}</span>
                  <span style={{ color: T.mutedLight, fontSize: 12 }}>{t.role}</span>
                  <span style={{ color: T.mutedLight, fontSize: 11 }}>{t.phone || "—"}</span>
                  <span style={{ color: T.mutedLight, fontSize: 11 }}>{t.models || "—"}</span>
                  <Badge color={T.green} bg={T.greenDim}>actif</Badge>
                </div>
              ))}
            </Card>
            <SubTitle>Comptes Modèles</SubTitle>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "60px 160px 200px 1fr 80px", padding: "10px 18px", fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: `1px solid ${T.border}` }}><span></span><span>Modèle</span><span>Niche</span><span>Manager</span><span>Statut</span></div>
              {MODELS_DATA.map((m, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 160px 200px 1fr 80px", padding: "12px 18px", borderBottom: `1px solid ${T.border}`, fontSize: 13, alignItems: "center" }}>
                  <ModelAvatar model={m} size={28} />
                  <span style={{ fontWeight: 600, color: T.goldLight }}>{m.name} {m.country}</span>
                  <span style={{ color: T.mutedLight, fontSize: 12 }}>{m.niche}</span>
                  <span style={{ color: T.mutedLight, fontSize: 12 }}>{m.manager}</span>
                  <Badge color={m.status === "active" ? T.green : T.orange} bg={m.status === "active" ? T.greenDim : T.orangeDim}>{m.status}</Badge>
                </div>
              ))}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
