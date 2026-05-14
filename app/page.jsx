"use client";

import { useEffect, useMemo, useState } from "react";

const defaultTasks = [
  { id: "mind", label: "Clarifier les 3 priorites du jour", mode: "CEO", done: false },
  { id: "body", label: "Manger + boire de l'eau avant de replonger", mode: "Survie", done: false },
  { id: "money", label: "Noter une action argent/compta a ne pas oublier", mode: "Standard", done: false },
  { id: "agency", label: "Ouvrir ILM OS et traiter une mission equipe", mode: "CEO", done: false }
];

const modeNotes = {
  Survie: "Version minimale : garder le cap, faire simple, ne pas te cramer.",
  Standard: "Jour normal : avancer sans forcer, ranger ce qui traine.",
  CEO: "Flux fort : decisions, structure, delegation, gros leviers.",
  Recovery: "Recuperation : remettre le systeme propre, dormir, revenir clair."
};

export default function PersonalHome() {
  const [mode, setMode] = useState("CEO");
  const [tasks, setTasks] = useState(defaultTasks);
  const [note, setNote] = useState("");
  const [goal, setGoal] = useState("Faire avancer ILM sans oublier Jordan.");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("jordan_personal_os") || "{}");
      if (saved.mode) setMode(saved.mode);
      if (Array.isArray(saved.tasks)) setTasks(saved.tasks);
      if (typeof saved.note === "string") setNote(saved.note);
      if (typeof saved.goal === "string") setGoal(saved.goal);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("jordan_personal_os", JSON.stringify({ mode, tasks, note, goal }));
  }, [goal, mode, note, ready, tasks]);

  const filteredTasks = useMemo(() => {
    const exact = tasks.filter((task) => task.mode === mode);
    return exact.length ? exact : tasks;
  }, [mode, tasks]);

  function toggleTask(id) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  }

  function addTask(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const label = String(new FormData(form).get("task") || "").trim();
    if (!label) return;
    setTasks((current) => [
      ...current,
      {
        id: `${Date.now()}`,
        label,
        mode,
        done: false
      }
    ]);
    form.reset();
  }

  function resetDay() {
    setTasks((current) => current.map((task) => ({ ...task, done: false })));
    setNote("");
  }

  const completed = tasks.filter((task) => task.done).length;

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <div>
            <p style={styles.eyebrow}>Jordan OS personnel</p>
            <h1 style={styles.title}>Aujourd'hui, on pilote ta vie avant de piloter l'agence.</h1>
          </div>
          <div style={styles.actions}>
            <a href="/dashboard" style={styles.primaryLink}>ILM dashboard</a>
            <a href="https://os.ilovemodels.fr/dashboard" style={styles.secondaryLink}>OS live</a>
          </div>
        </header>

        <section style={styles.grid}>
          <article style={styles.panel}>
            <p style={styles.label}>Mode du moment</p>
            <div style={styles.modeGrid}>
              {Object.keys(modeNotes).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMode(item)}
                  style={{ ...styles.modeButton, ...(mode === item ? styles.modeButtonActive : {}) }}
                >
                  {item}
                </button>
              ))}
            </div>
            <p style={styles.muted}>{modeNotes[mode]}</p>
          </article>

          <article style={styles.panel}>
            <p style={styles.label}>Objectif principal</p>
            <textarea
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              rows={4}
              style={styles.textarea}
            />
          </article>

          <article style={styles.panel}>
            <p style={styles.label}>Progression</p>
            <div style={styles.bigNumber}>{completed}/{tasks.length}</div>
            <p style={styles.muted}>Actions cochees aujourd'hui.</p>
            <button type="button" onClick={resetDay} style={styles.lightButton}>Reset jour</button>
          </article>
        </section>

        <section style={styles.workArea}>
          <article style={styles.todoPanel}>
            <div style={styles.panelHeader}>
              <div>
                <p style={styles.label}>To-do perso</p>
                <h2 style={styles.sectionTitle}>{mode}</h2>
              </div>
            </div>
            <div style={styles.list}>
              {filteredTasks.map((task) => (
                <label key={task.id} style={styles.task}>
                  <input checked={task.done} onChange={() => toggleTask(task.id)} type="checkbox" />
                  <span style={task.done ? styles.doneText : undefined}>{task.label}</span>
                  <small style={styles.badge}>{task.mode}</small>
                </label>
              ))}
            </div>
            <form onSubmit={addTask} style={styles.addForm}>
              <input name="task" placeholder={`Ajouter une action ${mode.toLowerCase()}`} style={styles.input} />
              <button type="submit" style={styles.primaryButton}>Ajouter</button>
            </form>
          </article>

          <article style={styles.todoPanel}>
            <p style={styles.label}>Notes rapides</p>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Google Keep, mais dans ton cockpit local. Idees, rappels, choses a ne pas oublier..."
              rows={13}
              style={styles.largeTextarea}
            />
          </article>
        </section>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f0e8",
    color: "#171411",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    padding: "32px"
  },
  shell: {
    maxWidth: "1180px",
    margin: "0 auto"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: "24px",
    alignItems: "flex-start",
    marginBottom: "28px"
  },
  eyebrow: {
    margin: "0 0 10px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: "12px",
    color: "#806f5c"
  },
  title: {
    maxWidth: "720px",
    margin: 0,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(36px, 6vw, 76px)",
    fontWeight: 500,
    lineHeight: 0.95,
    letterSpacing: 0
  },
  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "flex-end"
  },
  primaryLink: {
    background: "#171411",
    color: "#fff8ec",
    padding: "12px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 700
  },
  secondaryLink: {
    border: "1px solid rgba(23,20,17,.18)",
    color: "#171411",
    padding: "12px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 700
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "14px",
    marginBottom: "14px"
  },
  panel: {
    background: "rgba(255,255,255,.66)",
    border: "1px solid rgba(23,20,17,.1)",
    borderRadius: "8px",
    padding: "18px",
    boxShadow: "0 18px 50px rgba(55,43,29,.08)"
  },
  label: {
    margin: "0 0 12px",
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    color: "#806f5c",
    letterSpacing: "0.08em"
  },
  modeGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    marginBottom: "14px"
  },
  modeButton: {
    border: "1px solid rgba(23,20,17,.14)",
    background: "#fffaf1",
    borderRadius: "8px",
    padding: "12px",
    color: "#171411",
    cursor: "pointer",
    fontWeight: 800
  },
  modeButtonActive: {
    background: "#dcc99f",
    borderColor: "#b79d66"
  },
  muted: {
    margin: 0,
    color: "#6f6255",
    lineHeight: 1.45
  },
  textarea: {
    width: "100%",
    border: "1px solid rgba(23,20,17,.14)",
    borderRadius: "8px",
    padding: "12px",
    resize: "vertical",
    background: "#fffaf1",
    color: "#171411",
    font: "inherit",
    boxSizing: "border-box"
  },
  bigNumber: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "64px",
    lineHeight: 1
  },
  lightButton: {
    marginTop: "18px",
    border: "1px solid rgba(23,20,17,.14)",
    background: "transparent",
    borderRadius: "8px",
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: 800
  },
  workArea: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
    gap: "14px"
  },
  todoPanel: {
    background: "rgba(255,255,255,.76)",
    border: "1px solid rgba(23,20,17,.1)",
    borderRadius: "8px",
    padding: "18px",
    boxShadow: "0 18px 50px rgba(55,43,29,.08)"
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center"
  },
  sectionTitle: {
    margin: 0,
    fontSize: "24px"
  },
  list: {
    display: "grid",
    gap: "10px",
    marginTop: "16px"
  },
  task: {
    display: "grid",
    gridTemplateColumns: "24px minmax(0, 1fr) auto",
    gap: "10px",
    alignItems: "center",
    padding: "12px",
    border: "1px solid rgba(23,20,17,.1)",
    borderRadius: "8px",
    background: "#fffaf1"
  },
  doneText: {
    textDecoration: "line-through",
    color: "#8b8074"
  },
  badge: {
    border: "1px solid rgba(23,20,17,.12)",
    borderRadius: "999px",
    padding: "4px 8px",
    color: "#6f6255"
  },
  addForm: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    gap: "8px",
    marginTop: "14px"
  },
  input: {
    border: "1px solid rgba(23,20,17,.14)",
    borderRadius: "8px",
    padding: "12px",
    background: "#fffaf1",
    color: "#171411",
    font: "inherit"
  },
  primaryButton: {
    border: 0,
    borderRadius: "8px",
    padding: "12px 16px",
    background: "#171411",
    color: "#fff8ec",
    cursor: "pointer",
    fontWeight: 800
  },
  largeTextarea: {
    width: "100%",
    minHeight: "320px",
    border: "1px solid rgba(23,20,17,.14)",
    borderRadius: "8px",
    padding: "14px",
    resize: "vertical",
    background: "#fffaf1",
    color: "#171411",
    font: "inherit",
    lineHeight: 1.5,
    boxSizing: "border-box"
  }
};
