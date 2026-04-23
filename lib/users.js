// ═══════════════════════════════════════════════════════════════
// ILM OS — User accounts & roles
// 10 accounts: 7 team + 3 models
// Default password: ilm2026 (configurable per user)
// ═══════════════════════════════════════════════════════════════

export const USERS = [
  // --- TEAM ---
  {
    id: "jordan",
    name: "Jordan",
    username: "jordan",
    password: "ilm2026",
    role: "ceo",
    access: "full",
    color: "#C9A84C",
  },
  {
    id: "sophie",
    name: "Sophie",
    username: "sophie",
    password: "ilm2026",
    role: "manager",
    access: "model_vanessa",
    managedModels: ["vanessa"],
    color: "#E1306C",
  },
  {
    id: "marvin",
    name: "Marvin",
    username: "marvin",
    password: "ilm2026",
    role: "chatter_lead",
    access: "chatting_all",
    managedModels: [],
    color: "#3B82F6",
  },
  {
    id: "ned",
    name: "Ned",
    username: "ned",
    password: "ilm2026",
    role: "manager",
    access: "model_olesia",
    managedModels: ["olesia"],
    color: "#10D078",
  },
  {
    id: "florian",
    name: "Florian",
    username: "florian",
    password: "ilm2026",
    role: "manager",
    access: "model_vanessa",
    managedModels: ["vanessa"],
    color: "#F59E0B",
  },
  {
    id: "koce",
    name: "Kocé",
    username: "koce",
    password: "ilm2026",
    role: "chatter",
    access: "chatting_read",
    managedModels: [],
    color: "#7C5CFC",
  },
  {
    id: "louis",
    name: "Louis",
    username: "louis",
    password: "ilm2026",
    role: "manager",
    access: "model_juliette",
    managedModels: ["juliette"],
    color: "#00AFF0",
  },
  // --- MODELS ---
  {
    id: "vanessa",
    name: "Vanessa",
    username: "vanessa",
    password: "ilm2026",
    role: "model",
    access: "self_only",
    modelId: "vanessa",
    color: "#E1306C",
  },
  {
    id: "olesia",
    name: "Olesia",
    username: "olesia",
    password: "ilm2026",
    role: "model",
    access: "self_only",
    modelId: "olesia",
    color: "#10D078",
  },

  {
    id: "juliette",
    name: "Juliette",
    username: "juliette",
    password: "ilm2026",
    role: "model",
    access: "self_only",
    modelId: "juliette",
    color: "#7C5CFC",
  },
];

// Get user by username (case insensitive)
export function findUser(username) {
  return USERS.find(u => u.username.toLowerCase() === username.toLowerCase());
}

// Authenticate user
export function authenticateUser(username, password) {
  const user = findUser(username);
  if (!user) return null;
  if (user.password !== password) return null;
  // Return safe user info (no password)
  const { password: _, ...safeUser } = user;
  return safeUser;
}

// Get safe user by id (no password)
export function getUserById(id) {
  const user = USERS.find(u => u.id === id);
  if (!user) return null;
  const { password: _, ...safeUser } = user;
  return safeUser;
}

// Check if user can see a model's data
export function canAccessModel(user, modelId) {
  if (!user) return false;
  if (user.role === "ceo") return true;
  if (user.role === "model") return user.modelId === modelId;
  if (user.role === "manager") return user.managedModels?.includes(modelId);
  if (user.role === "chatter_lead") return true; // Chatting lead sees all
  return false;
}

// Check if user can see revenue data
export function canAccessRevenue(user) {
  if (!user) return false;
  return ["ceo", "manager", "chatter_lead"].includes(user.role);
}

// Check if user can see team data
export function canAccessTeam(user) {
  if (!user) return false;
  return user.role === "ceo";
}

// Check if user can see chatting data
export function canAccessChatting(user) {
  if (!user) return false;
  return ["ceo", "chatter_lead", "chatter"].includes(user.role);
}
