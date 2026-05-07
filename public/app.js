const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

let activeFilter = "all";
let searchTerm = "";
const STORAGE_KEY = "ilm-os-state-v1";
const storedState = loadState();
const taskStatuses = storedState.taskStatuses || {};
const kpiValues = storedState.kpiValues || {};
let ceoNotes = storedState.ceoNotes || [];
let runtimeStatus = null;

function cookieValue(name) {
  return document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`))
    ?.split("=")[1];
}

function currentRole() {
  return decodeURIComponent(cookieValue("ilm_role") || "Jordan");
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    taskStatuses,
    kpiValues,
    ceoNotes,
    savedAt: new Date().toISOString()
  }));
}

function badge(text, tone = "") {
  return `<span class="pill ${tone}">${text}</span>`;
}

function progressBar(value, tone) {
  return `<div class="progress" aria-label="${value}%"><span class="${tone}" style="width:${value}%"></span></div>`;
}

function matchesSearch(text) {
  return text.toLowerCase().includes(searchTerm.toLowerCase());
}

function priorityTone(priority) {
  return {
    High: "danger",
    Medium: "warning",
    Low: ""
  }[priority] || "";
}

function statusTone(status) {
  return {
    "To do": "danger",
    "In progress": "warning",
    Done: "success"
  }[status] || "";
}

function taskStatus(task) {
  return taskStatuses[task.id] || task.status;
}

function renderTaskCards(tasks, targetSelector) {
  $(targetSelector).innerHTML = tasks.map((task) => {
    const status = taskStatus(task);
    return `
      <article class="todo-card ${status === "Done" ? "done" : ""}" data-task-id="${task.id}">
        <div class="todo-check" aria-hidden="true">${status === "Done" ? "OK" : ""}</div>
        <div class="todo-content">
          <div class="todo-head">
            <div>
              <h4>${task.title}</h4>
              <p>${task.summary}</p>
            </div>
            <div class="todo-badges">
              ${badge(task.priority, priorityTone(task.priority))}
              ${badge(task.owner)}
            </div>
          </div>
          <div class="todo-meta">
            <label>
              <span>Status</span>
              <select data-status-control="${task.id}">
                ${["To do", "In progress", "Done"].map((option) => `<option value="${option}" ${option === status ? "selected" : ""}>${option}</option>`).join("")}
              </select>
            </label>
            <span>${task.deadline || "No deadline"}</span>
          </div>
          <ul>${task.actions.map((action) => `<li>${action}</li>`).join("")}</ul>
        </div>
      </article>
    `;
  }).join("");
}

function renderStats() {
  const active = ILM_DATA.models.filter((model) => model.status === "Active").length;
  const onboarding = ILM_DATA.models.filter((model) => model.status === "Onboarding").length;
  const urgent = ILM_DATA.models.reduce((sum, model) => sum + model.risks.length, 0);
  const igAccounts = ILM_DATA.models.reduce((sum, model) => sum + (model.instagram?.filter((account) => account.url).length || 0), 0);
  const stats = [
    ["Modeles", ILM_DATA.models.length, "Portefeuille total"],
    ["Actives", active, "En production"],
    ["Onboarding", onboarding, "A structurer"],
    ["Comptes IG", igAccounts, "Comptes identifies"],
    ["Points rouges", urgent, "Risques / blocages"]
  ];
  $("#statsGrid").innerHTML = stats.map(([label, value, note]) => `
    <article class="stat">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${note}</small>
    </article>
  `).join("");
}

function renderRoleBadge() {
  const role = currentRole();
  $("#roleBadge").textContent = `Connecte: ${role}`;
  $("#roleBadge").className = `pill ${role === "Jordan" ? "success" : ""}`;
}

function renderCeoNotes() {
  const isJordan = currentRole() === "Jordan";
  $("#ceoNotesPanel").classList.toggle("hidden", !isJordan);
  if (!isJordan) return;

  const openNotes = ceoNotes.filter((note) => !note.done);
  $("#ceoNotesCount").textContent = `${openNotes.length} ouvertes`;
  $("#ceoNotesList").innerHTML = ceoNotes.length ? ceoNotes.map((note) => `
    <article class="ceo-note ${note.done ? "done" : ""}" data-note-id="${note.id}">
      <button type="button" data-note-toggle="${note.id}" aria-label="Basculer note">${note.done ? "OK" : ""}</button>
      <div>
        <strong>${note.text}</strong>
        <small>${new Date(note.createdAt).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</small>
      </div>
      <div class="ceo-note-actions">
        ${badge(note.priority, priorityTone(note.priority))}
        <button type="button" data-note-delete="${note.id}" aria-label="Supprimer note">Supprimer</button>
      </div>
    </article>
  `).join("") : `<p class="empty">Aucune note. Tu peux remplacer Google Keep ici pour les pense-betes rapides.</p>`;
}

function renderDashboard() {
  const critical = ILM_DATA.deadlines.filter((deadline) => !deadline[3]).slice(0, 7);
  const vanessaTasks = ILM_DATA.operationalTasks.filter((task) => task.group === "Vanessa / Sophie Banks");
  const openVanessaTasks = vanessaTasks.filter((task) => taskStatus(task) !== "Done").length;
  $("#criticalCount").textContent = `${critical.length} a traiter`;
  $("#vanessaTodoCount").textContent = `${openVanessaTasks} ouvertes`;
  renderCeoNotes();
  renderConnections();
  renderKpiModels();
  renderTaskCards(vanessaTasks, "#vanessaTaskList");
  renderDailyOps();
  renderDomains();
  renderTeamWorkspaces();

  $("#criticalTasks").innerHTML = critical.map(([date, task, owner]) => `
    <article class="task-row">
      <span class="date-chip">${date}</span>
      <div>
        <strong>${task}</strong>
        <small>${owner}</small>
      </div>
    </article>
  `).join("");

  $("#pipelineList").innerHTML = ILM_DATA.models.map((model) => `
    <article class="pipeline-row">
      <div>
        <strong>${model.name}${model.alias ? ` (${model.alias})` : ""}</strong>
        <small>${model.manager} · ${model.niche}</small>
      </div>
      <div class="pipeline-progress">
        <span>${model.progress}%</span>
        ${progressBar(model.progress, model.color)}
      </div>
    </article>
  `).join("");
}

function connectionTone(status) {
  return {
    Live: "success",
    "In progress": "warning",
    "Ready to plan": "warning",
    "To configure": "danger",
    Blocked: "danger",
    "Manual first": "warning",
    "To do": ""
  }[status] || "";
}

function renderConnections() {
  const openConnections = ILM_DATA.connections.filter((item) => !["Live", "In progress"].includes(item.status)).length;
  $("#connectionCount").textContent = `${openConnections} a brancher`;
  $("#connectionList").innerHTML = ILM_DATA.connections.map((item) => `
    <article class="connection-row">
      <div class="connection-head">
        <div>
          <strong>${item.name}</strong>
          <small>${item.owner}</small>
        </div>
        <div class="connection-badges">
          ${badge(item.status, connectionTone(item.status))}
          ${badge(item.priority, priorityTone(item.priority))}
        </div>
      </div>
      <p>${item.purpose}</p>
      <div class="next-step">
        <span>Prochaine action</span>
        <strong>${item.next}</strong>
      </div>
    </article>
  `).join("");
}

function renderKpiModels() {
  $("#kpiModelGrid").innerHTML = ILM_DATA.kpiBlueprints.map((item) => `
    <article class="kpi-model-card">
      <div class="kpi-model-head">
        <div>
          <strong>${item.model}</strong>
          <small>${item.owner}</small>
        </div>
        ${badge("KPI")}
      </div>
      <p>${item.focus}</p>
      <div class="kpi-list">
        ${item.metrics.map(([label, value]) => {
          const key = `${item.model}:${label}`;
          const currentValue = kpiValues[key] || value;
          return `
          <div class="kpi-row">
            <span>${label}</span>
            <input value="${currentValue}" data-kpi-control="${key}" aria-label="${item.model} ${label}">
          </div>
        `;
        }).join("")}
      </div>
    </article>
  `).join("");
}

function renderDomains() {
  $("#domainList").innerHTML = ILM_DATA.deeplinkDomains.map((domain) => `
    <article class="domain-row">
      <div>
        <strong>${domain.name}</strong>
        <p>${domain.note}</p>
      </div>
      <div class="domain-badges">
        ${badge(domain.status, ["Available", "Live", "Selected"].includes(domain.status) ? "success" : "danger")}
        ${badge(domain.priority, priorityTone(domain.priority))}
        ${domain.purchaseUrl ? `<a class="mini-link" href="${domain.purchaseUrl}" target="_blank" rel="noreferrer" data-track="Domain ${domain.name}">Vercel</a>` : ""}
      </div>
    </article>
  `).join("");
}

function renderTeamWorkspaces() {
  const role = currentRole();
  $("#teamWorkspaceGrid").innerHTML = ILM_DATA.teamWorkspaces.map((member) => `
    <article class="workspace-card ${member.name === role ? "current-role" : ""}">
      <div class="workspace-head">
        <div>
          <strong>${member.name}</strong>
          <small>${member.role}</small>
        </div>
        ${badge("env pret")}
      </div>
      <p>${member.objective}</p>
      <code>${member.access}</code>
      <ul>${member.tasks.map((task) => `<li>${task}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function renderAccessMatrix() {
  const role = currentRole();
  $("#accessMatrix").innerHTML = ILM_DATA.accessMatrix.map((item) => {
    const configured = runtimeStatus?.auth?.[item.role];
    const tone = configured ? "success" : "warning";
    const text = configured ? "Configure" : "A definir";
    return `
      <article class="access-row">
        <div>
          <strong>${item.role}${item.role === role ? " - session actuelle" : ""}</strong>
          <small>${item.scope}</small>
        </div>
        <div>
          ${badge(text, tone)}
          <code>${item.passwordEnv}</code>
        </div>
      </article>
    `;
  }).join("");
}

function renderRuntimeStatus() {
  if (!runtimeStatus) {
    $("#runtimeStatus").textContent = "Verification";
    $("#runtimeGrid").innerHTML = `<p class="muted">Chargement de la configuration Vercel...</p>`;
    renderAccessMatrix();
    return;
  }

  const integrations = Object.entries(runtimeStatus.integrations);
  const configured = integrations.filter(([, value]) => value).length;
  $("#runtimeStatus").textContent = `${configured}/${integrations.length} connectes`;
  $("#runtimeGrid").innerHTML = integrations.map(([name, value]) => `
    <article class="runtime-row">
      <span>${name}</span>
      ${badge(value ? "Configure" : "Manquant", value ? "success" : "warning")}
    </article>
  `).join("");
  renderAccessMatrix();
}

function renderRecipe() {
  renderRuntimeStatus();
  $("#recipeGrid").innerHTML = ILM_DATA.recipes.map((item) => `
    <article class="recipe-card">
      <div class="recipe-head">
        <div>
          <span class="eyebrow">${item.owner}</span>
          <h3>${item.title}</h3>
        </div>
        ${badge(item.status, item.status.includes("Bloque") ? "danger" : item.status.includes("Live") ? "success" : "warning")}
      </div>
      <p>${item.goal}</p>
      <ol>${item.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
    </article>
  `).join("");
}

async function loadRuntimeStatus() {
  try {
    const response = await fetch("/api/status", { cache: "no-store" });
    if (!response.ok) throw new Error("Status unavailable");
    runtimeStatus = await response.json();
  } catch {
    runtimeStatus = {
      auth: {},
      integrations: {
        notion: false,
        meta: false,
        tiktok: false,
        telegram: false,
        x: false,
        analytics: false
      }
    };
  }
  renderRecipe();
}

function renderDailyOps() {
  const { doneToday, nextTasks } = ILM_DATA.dailyOps;
  const openNextTasks = nextTasks.filter((task) => taskStatus(task) !== "Done").length;

  $("#dailyOpsCount").textContent = `${doneToday.length} faits / ${openNextTasks} a faire`;
  $("#todayDoneList").innerHTML = doneToday.map((item) => `
    <article class="ops-row">
      <span class="ops-dot"></span>
      <div>
        <div class="ops-row-head">
          <strong>${item.title}</strong>
          ${badge(item.owner, "success")}
        </div>
        <p>${item.summary}</p>
        <small>${item.area}</small>
      </div>
    </article>
  `).join("");

  renderTaskCards(nextTasks, "#tomorrowTaskList");
}

function renderModels() {
  const models = ILM_DATA.models.filter((model) => {
    const filterOk = activeFilter === "all" || model.status === activeFilter;
    const haystack = JSON.stringify(model);
    return filterOk && matchesSearch(haystack);
  });

  $("#modelGrid").innerHTML = models.map((model) => `
    <article class="model-card">
      <div class="model-photo-wrap ${model.image ? "" : "empty-photo"}">
        ${model.image ? `<img class="model-photo" src="${model.image}" alt="${model.name}">` : `<span>Photo a ajouter</span>`}
      </div>
      <div class="model-head">
        <div>
          <span class="eyebrow">${model.type}</span>
          <h3>${model.name}${model.alias ? `<small>${model.alias}</small>` : ""}</h3>
        </div>
        ${badge(model.status, model.status === "Active" ? "success" : "warning")}
      </div>
      ${progressBar(model.progress, model.color)}
      <dl class="meta">
        <div><dt>Manager</dt><dd>${model.manager}</dd></div>
        <div><dt>Niche</dt><dd>${model.niche}</dd></div>
        <div><dt>IG principal</dt><dd>${model.principal}</dd></div>
      </dl>
      ${model.persona ? `<p class="persona">${model.persona}</p>` : ""}
      <div class="tag-list">${model.platforms.map((item) => `<span>${item}</span>`).join("")}</div>
      ${model.instagram ? `<div class="instagram-list">${model.instagram.map((account) => account.url ? `<a href="${account.url}" target="_blank" rel="noreferrer" data-track="${model.name} Instagram ${account.label}">@${account.label}</a>` : `<span>@${account.label}</span>`).join("")}</div>` : ""}
      ${model.revenueLinks ? `<div class="revenue-list">${model.revenueLinks.map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer" data-track="${model.name} ${link.type} ${link.label}"><span>${link.type}</span>${link.label}</a>`).join("")}</div>` : ""}
      <div class="split-list">
        <div>
          <h4>Risques</h4>
          <ul>${model.risks.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
        <div>
          <h4>A faire</h4>
          <ul>${model.tasks.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      </div>
    </article>
  `).join("") || `<p class="empty">Aucun modele ne correspond a la recherche.</p>`;
}

function renderTeam() {
  $("#teamGrid").innerHTML = ILM_DATA.team.map(([name, role, models, phone]) => `
    <article class="team-card">
      <h3>${name}</h3>
      <p>${role}</p>
      <div class="team-meta">
        <span>${models}</span>
        <span>${phone}</span>
      </div>
      ${ILM_DATA.missions[name] ? `<ul>${ILM_DATA.missions[name].map((mission) => `<li>${mission}</li>`).join("")}</ul>` : ""}
    </article>
  `).join("");

  $("#phoneTable").innerHTML = `
    <div class="table-row table-head"><span>Telephone</span><span>Affecte</span><span>Modele</span><span>Comptes</span></div>
    ${ILM_DATA.phones.map((row) => `<div class="table-row">${row.map((cell) => `<span>${cell}</span>`).join("")}</div>`).join("")}
  `;
}

function renderDeadlines() {
  const showDone = $("#showDone").checked;
  const rows = ILM_DATA.deadlines.filter(([date, task, owner, done]) => {
    return (showDone || !done) && matchesSearch(`${date} ${task} ${owner}`);
  });

  $("#deadlineList").innerHTML = rows.map(([date, task, owner, done]) => `
    <article class="timeline-row ${done ? "done" : ""}">
      <span class="date-chip">${date}</span>
      <div>
        <strong>${task}</strong>
        <small>${owner}</small>
      </div>
      ${badge(done ? "fait" : "ouvert", done ? "success" : "danger")}
    </article>
  `).join("") || `<p class="empty">Aucune deadline ne correspond a la recherche.</p>`;
}

function renderProcess() {
  $("#processGrid").innerHTML = ILM_DATA.processes.map(([title, body]) => `
    <article class="process-card">
      <h3>${title}</h3>
      <p>${body}</p>
    </article>
  `).join("");
}

function renderNotion() {
  const pageCards = ILM_DATA.notionPages.map(([title, id]) => `
    <article class="notion-card">
      <strong>${title}</strong>
      <code>${id}</code>
    </article>
  `).join("");
  const dbCards = ILM_DATA.databases.map((db) => `
    <article class="notion-card database">
      <strong>${db.name}</strong>
      <code>${db.id}</code>
      <p>${db.columns.join(" · ")}</p>
    </article>
  `).join("");
  $("#notionGrid").innerHTML = `
    <a class="notion-link" href="${ILM_DATA.notionRoot.url}" target="_blank" rel="noreferrer">Ouvrir la page Notion source</a>
    ${dbCards}
    ${pageCards}
  `;
}

function setRoute(route) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === route));
  $$(".nav a").forEach((link) => link.classList.toggle("active", link.dataset.route === route));
}

function renderAll() {
  renderRoleBadge();
  renderStats();
  renderDashboard();
  renderModels();
  renderTeam();
  renderDeadlines();
  renderProcess();
  renderRecipe();
  renderNotion();
}

window.addEventListener("hashchange", () => setRoute(location.hash.replace("#", "") || "dashboard"));

$("#globalSearch").addEventListener("input", (event) => {
  searchTerm = event.target.value.trim();
  renderModels();
  renderDeadlines();
});

$$(".segmented button").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    $$(".segmented button").forEach((item) => item.classList.toggle("active", item === button));
    renderModels();
  });
});

$("#showDone").addEventListener("change", renderDeadlines);

document.addEventListener("change", (event) => {
  const taskId = event.target.dataset.statusControl;
  const kpiId = event.target.dataset.kpiControl;

  if (taskId) {
    taskStatuses[taskId] = event.target.value;
    saveState();
    renderDashboard();
    renderRecipe();
  }

  if (kpiId) {
    kpiValues[kpiId] = event.target.value.trim();
    saveState();
  }
});

document.addEventListener("click", (event) => {
  const toggleId = event.target.dataset.noteToggle;
  const deleteId = event.target.dataset.noteDelete;

  if (toggleId) {
    ceoNotes = ceoNotes.map((note) => note.id === toggleId ? { ...note, done: !note.done } : note);
    saveState();
    renderCeoNotes();
  }

  if (deleteId) {
    ceoNotes = ceoNotes.filter((note) => note.id !== deleteId);
    saveState();
    renderCeoNotes();
  }

  const trackedLink = event.target.closest("a[data-track]");
  if (trackedLink && window.va) {
    window.va("event", {
      name: "ILM Link Click",
      data: {
        label: trackedLink.dataset.track,
        href: trackedLink.href
      }
    });
  }
});

$("#ceoNoteForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = $("#ceoNoteInput");
  const text = input.value.trim();
  if (!text) return;

  ceoNotes = [
    {
      id: `note-${Date.now()}`,
      text,
      priority: $("#ceoNotePriority").value,
      done: false,
      createdAt: new Date().toISOString()
    },
    ...ceoNotes
  ];
  input.value = "";
  saveState();
  renderCeoNotes();
});

$("#exportSnapshot").addEventListener("click", () => {
  const snapshot = {
    exportedAt: new Date().toISOString(),
    taskStatuses,
    kpiValues,
    ceoNotes,
    models: ILM_DATA.models.map(({ name, status, progress, manager, niche }) => ({ name, status, progress, manager, niche })),
    connections: ILM_DATA.connections,
    kpiBlueprints: ILM_DATA.kpiBlueprints,
    dailyOps: ILM_DATA.dailyOps
  };
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ilm-snapshot-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

renderAll();
setRoute(location.hash.replace("#", "") || "dashboard");
loadRuntimeStatus();
