import { initRouter } from "./router.js";
import { store } from "./storage.js";
import { MCAT_SECTIONS, TOPICS } from "./demoData.js";
import { MCAT_BLUEPRINT, MCAT_TEST_DAY_FLOW, blueprintForSection, mcatContentMinutes, mcatQuestionTotal } from "./mcatBlueprint.js";
import { CONCEPT_BADGES, MCAT_TIPS, MNEMONICS, QUICK_CHALLENGES, SCIENCE_GRAPHICS, SCIENCE_JOKES, STUDY_RITUALS } from "./funScience.js";
import { summarizeAttempts, recentActivity } from "./analytics.js";
import { allQuestions, filterQuestions, loadInitialQuestions, parseQuestionsFromText, publishDraft, questionBankMeta, questionsToCsv, upsertQuestion } from "./questionBank.js";
import { createSession, recordAnswer, scoreSession } from "./quizEngine.js";
import { dueQuestions } from "./spacedRepetition.js";
import { canPublish, validateQuestion } from "./schemaValidator.js";
import { extractFormulas, extractKeyTerms, extractLearningObjectives, generateDraftQuestions, suggestSectionAndTopic } from "./contentIngestion.js";

const app = document.querySelector("#app");
const toastRegion = document.querySelector("#toastRegion");
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modalContent");
const themeToggle = document.querySelector("#themeToggle");
const backupButton = document.querySelector("#backupButton");

let state = store.load();
let activeSession = null;
let activeQuestionSet = [];
let quizTimerId = null;
let activeKeyHandler = null;

function setKeyHandler(handler) {
  if (activeKeyHandler) document.removeEventListener("keydown", activeKeyHandler);
  activeKeyHandler = handler;
  if (handler) document.addEventListener("keydown", handler);
}

render(`
  <section class="loading-shell">
    <div class="brand-mark" aria-hidden="true">M</div>
    <h1>Loading Project 528</h1>
    <p>Preparing the question bank and local progress.</p>
    <div class="progress indeterminate"><span></span></div>
  </section>
`);
await loadInitialQuestions(state);
store.save(state);
applyTheme();

function save() {
  store.save(state);
}

function questions() {
  return allQuestions(state);
}

function render(html) {
  clearQuizTimer();
  setKeyHandler(null);
  app.innerHTML = html;
  app.classList.remove("page-enter");
  void app.offsetWidth;
  app.classList.add("page-enter");
  app.focus({ preventScroll: true });
}

function renderQuizHtml(html) {
  app.innerHTML = html;
  app.focus({ preventScroll: true });
}

function clearQuizTimer() {
  if (quizTimerId) {
    clearInterval(quizTimerId);
    quizTimerId = null;
  }
}

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function toast(message) {
  const lower = message.toLowerCase();
  const icon = lower.includes("error") || lower.includes("invalid") || lower.includes("paste") || lower.includes("add a few") || lower.includes("least") ? "⚠" : lower.includes("reset") || lower.includes("reloading") || lower.includes("expired") ? "⏱" : "✓";
  const item = document.createElement("div");
  item.className = "toast";
  item.innerHTML = `<span class="toast-icon">${icon}</span><span>${esc(message)}</span>`;
  toastRegion.append(item);
  setTimeout(() => item.remove(), 4200);
}

function openModal(html) {
  modalContent.innerHTML = html;
  modal.showModal();
}

document.querySelector(".modal-close").addEventListener("click", () => modal.close());

function download(filename, text, type = "application/json") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function applyTheme() {
  document.documentElement.dataset.theme = state.settings.theme;
}

themeToggle.addEventListener("click", () => {
  state.settings.theme = state.settings.theme === "dark" ? "light" : "dark";
  applyTheme();
  save();
});

backupButton.addEventListener("click", () => {
  openModal(`
    <h2>Backup and Restore</h2>
    <p class="lede">Export all local progress, custom questions, draft questions, source registry entries, and settings.</p>
    <div class="toolbar">
      <button id="exportBackup" type="button">Export backup</button>
      <button id="resetProgress" class="ghost-button" type="button">Reset progress</button>
      <button id="resetBank" class="danger-button" type="button">Reset all app data</button>
    </div>
    <label class="field">Import backup JSON<textarea id="backupText" class="json-box" placeholder="Paste backup JSON"></textarea></label>
    <button id="importBackup" type="button">Import backup</button>
  `);
  document.querySelector("#exportBackup").addEventListener("click", () => download("project-528-backup.json", store.exportBackup()));
  document.querySelector("#importBackup").addEventListener("click", () => {
    try {
      state = store.importBackup(document.querySelector("#backupText").value);
      applyTheme();
      toast("Backup restored.");
      modal.close();
      location.reload();
    } catch (error) {
      toast(error.message);
    }
  });
  document.querySelector("#resetProgress").addEventListener("click", () => {
    store.resetProgress();
    state = store.load();
    toast("Progress reset.");
    modal.close();
    routeDashboard();
  });
  document.querySelector("#resetBank").addEventListener("click", () => {
    store.resetAll();
    toast("All app data reset. Reloading.");
    location.reload();
  });
});

function header(kicker, title, lede = "", action = "") {
  return `
    <section class="page-header">
      <div>
        <p class="page-kicker">${esc(kicker)}</p>
        <h1 class="page-title">${esc(title)}</h1>
        ${lede ? `<p class="lede">${esc(lede)}</p>` : ""}
      </div>
      ${action}
    </section>
  `;
}

function metric(label, value, detail = "") {
  return `<article class="card metric"><span>${esc(label)}</span><strong>${esc(value)}</strong>${detail ? `<small>${esc(detail)}</small>` : ""}</article>`;
}

function progressBar(value) {
  return `<div class="progress" aria-label="${value}%"><span style="--value:${Math.max(0, Math.min(100, value))}%"></span></div>`;
}

function routeDashboard() {
  const all = questions();
  const questionById = new Map(all.map((question) => [question.id, question]));
  const summary = summarizeAttempts(all, state.attempts);
  const meta = questionBankMeta();
  const ritual = dailyItem(STUDY_RITUALS);
  const badge = dailyItem(CONCEPT_BADGES, 3);
  const sectionRows = MCAT_SECTIONS.map((section) => {
    const total = all.filter((question) => question.section === section).length;
    const completed = state.attempts.filter((attempt) => questionById.get(attempt.questionId)?.section === section).length;
    return `<div class="bar-row"><strong>${esc(shortSection(section))}</strong>${progressBar(total ? Math.round((completed / total) * 100) : 0)}<span>${formatNumber(completed)}/${formatNumber(total)}</span></div>`;
  }).join("");
  const weak = summary.weakTopics.length ? summary.weakTopics.map((row) => `<span class="pill warn">${esc(row.label)} ${row.accuracy}%</span>`).join("") : `<span class="pill good">No weak topics yet</span>`;
  const activity = recentActivity(state.attempts).map((attempt) => {
    const question = questionById.get(attempt.questionId);
    return `<tr><td>${esc(question?.topic || "Unknown")}</td><td>${attempt.correct ? "Correct" : "Missed"}</td><td>${new Date(attempt.createdAt).toLocaleString()}</td></tr>`;
  }).join("") || `<tr><td colspan="3">No attempts yet. Start with Learning mode.</td></tr>`;

  render(`
    ${header("Dashboard", "Your MCAT command center", "Track progress across all four sections, identify weak topics, and launch targeted practice sessions.")}
    <section class="hero-panel">
      <div>
        <p class="page-kicker">Question Bank</p>
        <h2>${formatNumber(all.length)} questions loaded</h2>
        <p>Static sharded bank · ${formatNumber(meta.shards || 0)} shards · ${esc(meta.source)} source</p>
      </div>
      <div class="hero-actions">
        <a class="button" href="#/test">Start timed set</a>
        <a class="button ghost-button" href="#/bank">Browse bank</a>
      </div>
    </section>
    <section class="daily-mission">
      <div>
        <p class="page-kicker">Today’s Mission</p>
        <h2>${esc(ritual)}</h2>
        <p>Your study persona today: <strong>${esc(badge)}</strong></p>
      </div>
      <div class="mission-actions">
        <a class="button" href="#/practice">10-question warmup</a>
        <a class="button ghost-button" href="#/fun">Memory boost</a>
      </div>
    </section>
    <section class="grid metrics">
      ${metric("Total questions", formatNumber(all.length), `${state.draftQuestions.length} drafts waiting`)}
      ${metric("Completed", formatNumber(summary.completed), "question attempts")}
      ${metric("Accuracy", `${summary.accuracy}%`, "all attempts")}
      ${metric("Study streak", state.streak.current || 0, "days")}
      ${metric("Readiness", `${summary.readiness}%`, "early estimate")}
    </section>
    <section class="grid two" style="margin-top:1rem">
      <article class="card">
        <h2>Quick Start</h2>
        <div class="mode-grid">
          ${modeCard("#/learn", "📖 Learn", "Unseen questions first", "Explanations after each answer.")}
          ${modeCard("#/practice", "🎯 Practice", "Build a custom set", "Filter section, topic, difficulty, type.")}
          ${modeCard("#/test", "⏱ Timed", "Exam-style pressure", "Feedback hidden until you submit.")}
          ${modeCard("#/simulation", "🧪 Full Length", "All four sections", "Official-style flow and timing.")}
          ${modeCard("#/review", "🔴 Mistakes", "Turn misses into wins", "Retry every question you got wrong.")}
          ${modeCard("#/spaced", "🔁 Spaced Rep", "Smart review queue", "Due questions ranked by confidence.")}
          ${modeCard("#/analytics", "📊 Analytics", "Track your trends", "Accuracy by section, topic, difficulty.")}
          ${modeCard("#/fun", "⚡ Fun Science", "Memory hooks", "Mnemonics, visual cards, quick challenges.")}
        </div>
      </article>
      <article class="card">
        <h2>Weak Topics</h2>
        <div class="status-row">${weak}</div>
      </article>
    </section>
    <section class="grid two" style="margin-top:1rem">
      <article class="card">
        <h2>Progress by MCAT Section</h2>
        <div class="chart">${sectionRows}</div>
      </article>
      <article class="card">
        <h2>Recent Activity</h2>
        <div class="table-wrap"><table><thead><tr><th>Topic</th><th>Result</th><th>When</th></tr></thead><tbody>${activity}</tbody></table></div>
      </article>
    </section>
  `);
}

function quick(href, label) {
  return `<a class="button" href="${href}">${esc(label)}</a>`;
}

function modeCard(href, title, meta, detail) {
  return `<a class="mode-card" href="${href}"><span>${esc(meta)}</span><strong>${esc(title)}</strong><small>${esc(detail)}</small></a>`;
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString();
}

function shortSection(section) {
  return section
    .replace("Chemical and Physical Foundations of Biological Systems", "Chem/Phys")
    .replace("Critical Analysis and Reasoning Skills", "CARS")
    .replace("Biological and Biochemical Foundations of Living Systems", "Bio/Biochem")
    .replace("Psychological, Social, and Biological Foundations of Behavior", "Psych/Soc");
}

function filterControls(prefix = "filter", includeCount = true) {
  return `
    <label class="field"><span>Section</span><select id="${prefix}Section"><option value="all">All sections</option>${MCAT_SECTIONS.map((section) => `<option>${esc(section)}</option>`).join("")}</select></label>
    <label class="field"><span>Topic</span><select id="${prefix}Topic"><option value="all">All topics</option>${[...new Set(Object.values(TOPICS).flat())].map((topic) => `<option>${esc(topic)}</option>`).join("")}</select></label>
    <label class="field compact"><span>Difficulty</span><select id="${prefix}Difficulty"><option value="all">All</option><option>easy</option><option>medium</option><option>hard</option></select></label>
    <label class="field compact"><span>Type</span><select id="${prefix}Type"><option value="all">All</option><option value="discrete">Discrete</option><option value="passage">Passage</option><option value="cars">CARS</option><option value="data_interpretation">Data</option><option value="experimental_design">Experiment</option><option value="calculation">Calculation</option><option value="graph_table">Graph/table</option></select></label>
    ${includeCount ? `<label class="field compact"><span>Count</span><input id="${prefix}Count" type="number" min="1" max="230" value="10"></label>` : ""}
  `;
}

function readFilters(prefix = "filter") {
  return {
    section: document.querySelector(`#${prefix}Section`)?.value,
    topic: document.querySelector(`#${prefix}Topic`)?.value,
    difficulty: document.querySelector(`#${prefix}Difficulty`)?.value,
    question_type: document.querySelector(`#${prefix}Type`)?.value
  };
}

function sortByStudyPriority(pool, attempts) {
  const bestResult = new Map();
  for (const a of attempts) {
    if (!bestResult.has(a.questionId) || (bestResult.get(a.questionId) === true && !a.correct)) {
      bestResult.set(a.questionId, a.correct);
    }
  }
  const unseen  = shuffleArray(pool.filter(q => !bestResult.has(q.id)));
  const wrong   = shuffleArray(pool.filter(q => bestResult.get(q.id) === false));
  const correct = shuffleArray(pool.filter(q => bestResult.get(q.id) === true));
  return [...unseen, ...wrong, ...correct];
}

function startSession(mode, sourceQuestions, options = {}) {
  const pool = sourceQuestions.length ? sourceQuestions : questions();
  activeQuestionSet = sortByStudyPriority(pool, state.attempts);
  activeSession = createSession(activeQuestionSet, { mode, shuffle: false, ...options });
  renderQuiz();
}

function buildMcatSectionSet(blueprint) {
  const sectionPool = shuffleArray(questions().filter((question) => question.section === blueprint.section));
  if (blueprint.section === MCAT_SECTIONS[1]) {
    return sectionPool.filter((question) => question.question_type === "cars").slice(0, blueprint.questions);
  }

  const independentTypes = new Set(["discrete", "calculation"]);
  const passageTypes = new Set(["passage", "data_interpretation", "experimental_design", "graph_table"]);
  const independent = sectionPool
    .filter((question) => independentTypes.has(question.question_type))
    .slice(0, blueprint.independentQuestions);
  const independentIds = new Set(independent.map((question) => question.id));
  const passageLike = sectionPool
    .filter((question) => passageTypes.has(question.question_type) && !independentIds.has(question.id))
    .slice(0, blueprint.questions - independent.length);
  const selected = [...passageLike, ...independent];
  const selectedIds = new Set(selected.map((question) => question.id));
  if (selected.length < blueprint.questions) {
    selected.push(...sectionPool.filter((question) => !selectedIds.has(question.id)).slice(0, blueprint.questions - selected.length));
  }
  return selected.slice(0, blueprint.questions);
}

function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function routeLearning() {
  render(`
    ${header("Learning Mode", "Practice with immediate teaching feedback", "Answer one question at a time, then inspect explanations, traps, related concepts, and spaced-repetition controls.")}
    <section class="card">
      <div class="toolbar">${filterControls("learn")}</div>
      <button id="startLearn" type="button">Start Learning</button>
    </section>
  `);
  document.querySelector("#startLearn").addEventListener("click", () => {
    const selected = filterQuestions(questions(), readFilters("learn"), true);
    startSession("learning", selected, {
      count: document.querySelector("#learnCount").value,
      showExplanations: "after_each"
    });
  });
}

function routePractice() {
  render(`
    ${header("Practice Mode", "Build a targeted set", "Choose section, topic, difficulty, type, count, timing, and explanation timing.")}
    <section class="card">
      <div class="toolbar">
        ${filterControls("practice")}
        <label class="field compact"><span>Timing</span><select id="practiceTimed"><option value="0">Untimed</option><option value="1">Timed</option></select></label>
        <label class="field"><span>Explanations</span><select id="practiceExplain"><option value="after_each">After each question</option><option value="end">At the end</option></select></label>
      </div>
      <button id="startPractice" type="button">Start Practice</button>
    </section>
  `);
  document.querySelector("#startPractice").addEventListener("click", () => {
    const selected = filterQuestions(questions(), readFilters("practice"), true);
    startSession("practice", selected, {
      count: document.querySelector("#practiceCount").value,
      timed: document.querySelector("#practiceTimed").value === "1",
      seconds: Number(document.querySelector("#practiceCount").value) * 90,
      showExplanations: document.querySelector("#practiceExplain").value
    });
  });
}

function routeTimed() {
  const distribution = sectionDistribution(questions());
  render(`
    ${header("Timed Test", "Exam-style practice", "Feedback stays hidden until submission. Flag questions, track unanswered items, then review explanations after scoring.")}
    <section class="sim-hero">
      <div>
        <p class="page-kicker">Simulator</p>
        <h2>Build a focused timed block</h2>
        <p>Choose content, set the clock, and work inside a test-like interface with a live timer, item palette, flagging, and post-test review.</p>
      </div>
      <div class="score-ring" style="--score:${Math.min(100, Math.round((state.attempts.length / 230) * 100))}">
        <strong>${formatNumber(state.attempts.length)}</strong>
        <span>attempts</span>
      </div>
    </section>
    <section class="grid two">
      <article class="card">
        <h2>Test Builder</h2>
        <div class="toolbar">${filterControls("timed")}<label class="field compact"><span>Minutes</span><input id="timedMinutes" type="number" min="1" value="15"></label></div>
        <button id="startTimed" type="button">Start Timed Test</button>
      </article>
      <aside class="card">
        <h2>Bank Coverage</h2>
        <div class="section-tiles">${distribution.map((row) => `<div class="section-tile"><span>${esc(shortSection(row.section))}</span><strong>${formatNumber(row.count)}</strong></div>`).join("")}</div>
      </aside>
    </section>
    <section class="card">
      <h2>Official-Style Section Presets</h2>
      <div class="blueprint-grid">
        ${MCAT_BLUEPRINT.map((item) => `
          <article class="blueprint-card">
            <span>${esc(item.shortName)}</span>
            <strong>${item.questions} questions · ${item.minutes} min</strong>
            <small>${item.passageSets} passage sets (${esc(item.passageQuestionRange)} each)${item.independentQuestions ? ` · ${item.independentQuestions} independent` : ""}</small>
            <button class="start-mcat-section" data-section="${esc(item.section)}" type="button">Start ${esc(item.shortName)}</button>
          </article>
        `).join("")}
      </div>
    </section>
  `);
  document.querySelector("#startTimed").addEventListener("click", () => {
    const selected = filterQuestions(questions(), readFilters("timed"), true);
    startSession("timed_test", selected, {
      count: document.querySelector("#timedCount").value,
      timed: true,
      seconds: Number(document.querySelector("#timedMinutes").value) * 60,
      showExplanations: "end"
    });
  });
  document.querySelectorAll(".start-mcat-section").forEach((button) => {
    button.addEventListener("click", () => {
      const blueprint = blueprintForSection(button.dataset.section);
      const selected = buildMcatSectionSet(blueprint);
      startSession("mcat_section", selected, {
        count: blueprint.questions,
        timed: true,
        seconds: blueprint.minutes * 60,
        showExplanations: "end",
        shuffle: false
      });
    });
  });
}

function renderQuiz(showReview = false) {
  if (!activeSession?.questions.length) {
    render(`${header("No Questions", "No matching questions found", "Try broader filters or add more approved questions.")}`);
    return;
  }
  const question = activeSession.questions[activeSession.index];
  const answer = activeSession.answers[question.id];
  const reveal = showReview || (activeSession.showExplanations === "after_each" && answer);
  const score = scoreSession(activeSession);
  const elapsed = Math.round((Date.now() - activeSession.startedAt) / 1000);
  const remaining = activeSession.seconds ? Math.max(0, activeSession.seconds - elapsed) : 0;
  const progressValue = Math.round(((activeSession.index + 1) / activeSession.questions.length) * 100);
  const answeredPercent = Math.round((score.answered / activeSession.questions.length) * 100);
  const currentNumber = activeSession.index + 1;
  const total = activeSession.questions.length;
  const currentFlagged = activeSession.flagged.includes(question.id);
  const isLast = activeSession.index === total - 1;
  const modeName = activeSession.mode.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  renderQuizHtml(`
    <div class="quiz-chrome">
      <div class="quiz-header">
        <span class="quiz-mode-label">${esc(modeName)}</span>
        <div class="quiz-progress-group">
          <span class="quiz-count">${currentNumber} / ${total}</span>
          ${progressBar(progressValue)}
          <span class="quiz-answered-label">${score.answered} answered</span>
        </div>
        <div class="quiz-header-right">
          ${activeSession.timed ? `<span class="timer${remaining <= 120 ? " urgent" : ""}" id="liveTimer">${formatTime(remaining)}</span>` : ""}
          <button id="submitSessionTop" class="ghost-button" type="button">Submit</button>
        </div>
      </div>
    </div>
    <section class="exam-layout">
      <article class="card question-panel quiz-question-card">
        <div class="meta-row">
          <span class="pill">${esc(shortSection(question.section))}</span>
          <span class="pill">${esc(question.topic)}</span>
          <span class="pill pill-${esc(question.difficulty)}">${esc(question.difficulty)}</span>
          <span class="pill">${esc(question.question_type.replace(/_/g, " "))}</span>
        </div>
        ${question.passage?.text ? `
          <div class="passage">
            <p class="passage-title">${esc(question.passage.title || "Passage")}</p>
            <p>${esc(question.passage.text)}</p>
            ${renderTables(question.passage.tables)}
          </div>` : ""}
        <p class="quiz-stem">${esc(question.stem)}</p>
        <div class="choices">
          ${question.choices.map((choice) => {
            const selected = answer?.choiceId === choice.id;
            const isCorrect = reveal && choice.id === question.correct_answer;
            const isWrong = reveal && selected && !isCorrect;
            const classes = ["choice", selected ? "selected" : "", isCorrect ? "correct" : "", isWrong ? "incorrect" : ""].filter(Boolean).join(" ");
            return `<button class="${classes}" data-choice="${choice.id}" type="button" ${answer && activeSession.showExplanations === "after_each" ? "disabled" : ""}>
              <span class="choice-id">${esc(choice.id)}</span>
              <span class="choice-text">${esc(choice.text)}</span>
            </button>`;
          }).join("")}
        </div>
        ${reveal ? renderExplanation(question) : ""}
        <div class="quiz-footer">
          <div class="quiz-footer-secondary">
            <button id="flagQuestion" class="ghost-button" type="button">${currentFlagged ? "⚑ Unflag" : "⚐ Flag"}</button>
            <button id="saveQuestion" class="ghost-button" type="button">♥ Save</button>
            <button id="weakQuestion" class="ghost-button" type="button">⚠ Weak</button>
            <label class="field compact confidence-field"><span>Confidence</span><select id="confidence"><option value="1">1 — low</option><option value="2">2</option><option value="3" selected>3 — mid</option><option value="4">4</option><option value="5">5 — high</option></select></label>
          </div>
          <div class="quiz-nav">
            <button id="prevQuestion" class="ghost-button" type="button" ${activeSession.index === 0 ? "disabled" : ""}>← Prev</button>
            <button id="submitSession" class="ghost-button" type="button">Submit</button>
            <button id="nextQuestion" class="quiz-next-btn" type="button">${isLast ? "Finish ✓" : "Next →"}</button>
          </div>
        </div>
        <div class="quiz-key-hints">
          <kbd class="kbd">A–D</kbd> select &nbsp;·&nbsp; <kbd class="kbd">←</kbd><kbd class="kbd">→</kbd> navigate &nbsp;·&nbsp; <kbd class="kbd">F</kbd> flag &nbsp;·&nbsp; <kbd class="kbd">Enter</kbd> advance
        </div>
      </article>
      <aside class="card exam-sidebar">
        <h2>Navigator</h2>
        <div class="score-ring compact" style="--score:${answeredPercent}">
          <strong>${score.answered}</strong>
          <span>answered</span>
        </div>
        <div class="exam-stats">
          <span><strong>${score.unanswered}</strong> unanswered</span>
          <span><strong>${activeSession.flagged.length}</strong> flagged</span>
          <span><strong>${formatNumber(total)}</strong> total</span>
        </div>
        <div class="question-palette" aria-label="Question navigation">
          ${activeSession.questions.map((item, index) => {
            const isCurrent = index === activeSession.index;
            return `<button class="palette-item${isCurrent ? " current" : ""}${activeSession.answers[item.id] ? " answered" : ""}${activeSession.flagged.includes(item.id) ? " flagged" : ""}" data-index="${index}" type="button" aria-label="Question ${index + 1}">${index + 1}</button>`;
          }).join("")}
        </div>
        <div class="palette-legend">
          <span><i class="legend-box answered"></i>Answered</span>
          <span><i class="legend-box flagged"></i>Flagged</span>
          <span><i class="legend-box current"></i>Current</span>
        </div>
      </aside>
    </section>
  `);
  if (activeSession.timed) startLiveTimer();

  document.querySelectorAll(".choice").forEach((button) => {
    button.addEventListener("click", () => {
      recordAnswer(state, activeSession, question, button.dataset.choice, document.querySelector("#confidence").value);
      save();
      renderQuiz(activeSession.showExplanations === "end" ? false : showReview);
    });
  });
  document.querySelector("#prevQuestion").addEventListener("click", () => {
    activeSession.index -= 1;
    renderQuiz(showReview);
  });
  document.querySelector("#nextQuestion").addEventListener("click", () => {
    if (activeSession.index === activeSession.questions.length - 1) renderSessionResult();
    else {
      activeSession.index += 1;
      renderQuiz(showReview);
    }
  });
  document.querySelector("#submitSession").addEventListener("click", renderSessionResult);
  document.querySelector("#submitSessionTop").addEventListener("click", renderSessionResult);
  document.querySelector("#flagQuestion").addEventListener("click", () => {
    activeSession.flagged = activeSession.flagged.includes(question.id) ? activeSession.flagged.filter((id) => id !== question.id) : [...activeSession.flagged, question.id];
    state.flags = [...new Set([...state.flags, question.id])];
    save();
    renderQuiz(showReview);
  });
  document.querySelector("#saveQuestion").addEventListener("click", () => {
    state.savedQuestions = [...new Set([...state.savedQuestions, question.id])];
    save();
    toast("Question saved.");
  });
  document.querySelector("#weakQuestion").addEventListener("click", () => {
    state.weakTopics = [...new Set([...state.weakTopics, question.topic])];
    save();
    toast("Topic added to weak topics.");
  });
  document.querySelectorAll(".palette-item").forEach((button) => {
    button.addEventListener("click", () => {
      activeSession.index = Number(button.dataset.index);
      renderQuiz(showReview);
    });
  });

  setKeyHandler((e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;
    const key = e.key.toLowerCase();
    const choiceMap = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 };
    if (!answer && key in choiceMap) {
      const choice = question.choices[choiceMap[key]];
      if (choice) {
        recordAnswer(state, activeSession, question, choice.id, document.querySelector("#confidence")?.value || "3");
        save();
        renderQuiz(activeSession.showExplanations === "end" ? false : showReview);
      }
    } else if (e.key === "ArrowLeft") {
      if (activeSession.index > 0) { activeSession.index -= 1; renderQuiz(showReview); }
    } else if (e.key === "ArrowRight" || (e.key === "Enter" && answer)) {
      e.preventDefault();
      if (activeSession.index === activeSession.questions.length - 1) renderSessionResult();
      else { activeSession.index += 1; renderQuiz(showReview); }
    } else if (key === "f" && !e.ctrlKey && !e.metaKey) {
      activeSession.flagged = activeSession.flagged.includes(question.id)
        ? activeSession.flagged.filter((id) => id !== question.id)
        : [...activeSession.flagged, question.id];
      state.flags = [...new Set([...state.flags, question.id])];
      save();
      renderQuiz(showReview);
    }
  });
}

function startLiveTimer() {
  clearQuizTimer();
  quizTimerId = setInterval(() => {
    if (!activeSession?.timed) {
      clearQuizTimer();
      return;
    }
    const timer = document.querySelector("#liveTimer");
    const elapsed = Math.round((Date.now() - activeSession.startedAt) / 1000);
    const remaining = Math.max(0, activeSession.seconds - elapsed);
    if (timer) {
      timer.textContent = formatTime(remaining);
      timer.classList.toggle("urgent", remaining <= 120);
    }
    if (remaining <= 0) {
      clearQuizTimer();
      toast("Time expired. Submitting test.");
      renderSessionResult();
    }
  }, 1000);
}

function renderTables(tables = []) {
  return tables.map((table) => `
    <div class="table-wrap"><table><caption>${esc(table.title || "")}</caption><thead><tr>${table.columns.map((column) => `<th>${esc(column)}</th>`).join("")}</tr></thead><tbody>${table.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
  `).join("");
}

function renderExplanation(question) {
  const exp = question.explanation;
  const wrong = Object.entries(exp.wrong_answer_explanations || {})
    .filter(([id]) => id !== question.correct_answer)
    .map(([id, text]) => `<div class="wrong-item"><span class="choice-id wrong-badge">${esc(id)}</span><p>${esc(text)}</p></div>`)
    .join("");
  return `
    <section class="explanation">
      <div class="explanation-header">
        <span class="explanation-label">Explanation</span>
        <span class="correct-badge">Correct: ${esc(question.correct_answer)}</span>
      </div>
      <p class="explanation-short">${esc(exp.short)}</p>
      <div class="explanation-sections">
        <details open><summary>Why this answer is correct</summary><p>${esc(exp.why_correct)}</p></details>
        ${wrong ? `<details><summary>Why the other choices are wrong</summary><div class="wrong-list">${wrong}</div></details>` : ""}
        <details><summary>High-yield takeaway</summary><p>${esc(exp.high_yield_takeaway)}</p></details>
        <details><summary>Common trap</summary><p>${esc(exp.common_trap)}</p></details>
        ${exp.related_concepts?.length ? `<details><summary>Related concepts</summary><p>${esc(exp.related_concepts.join(" · "))}</p></details>` : ""}
        ${exp.formulas?.length ? `<details><summary>Formulas</summary><p class="formula-list">${esc(exp.formulas.join(" · "))}</p></details>` : ""}
      </div>
    </section>
  `;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

function launchConfetti() {
  const colors = ["#0f8f7d", "#49a7ff", "#ef5d83", "#f4bc32", "#8a6df1", "#f08a3c"];
  for (let i = 0; i < 90; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    const size = 5 + Math.random() * 8;
    el.style.cssText = `left:${Math.random() * 100}vw;width:${size}px;height:${size}px;background:${colors[i % colors.length]};border-radius:${Math.random() > 0.5 ? "50%" : "2px"};animation:confetti-fall ${1.2 + Math.random() * 1.8}s ${Math.random() * 0.6}s ease-in forwards;transform:rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
}

function renderSessionResult() {
  clearQuizTimer();
  const score = scoreSession(activeSession);
  const msg = score.accuracy >= 90 ? "Outstanding! You're mastering this material." : score.accuracy >= 80 ? "Great work! Consistent scores like this build confidence." : score.accuracy >= 70 ? "Solid performance! Keep targeting your weak spots." : score.accuracy >= 60 ? "Good effort. Review the explanations and retry the misses." : "Every miss is a lesson. Let's review together and close those gaps.";
  render(`
    ${header("Session Complete", `${score.accuracy}%`, `${score.correct} correct out of ${score.total}; ${score.unanswered} unanswered.`)}
    <section class="result-hero">
      <div class="score-ring large" style="--score:${score.accuracy}">
        <strong>${score.accuracy}%</strong>
        <span>score</span>
      </div>
      <div>
        <p class="page-kicker">Performance</p>
        <h2>${score.correct} correct · ${score.unanswered} unanswered</h2>
        <p>${esc(msg)}</p>
      </div>
    </section>
    <section class="card">
      <div class="toolbar">
        <button id="reviewSession" type="button">Review explanations</button>
        <a class="button" href="#/dashboard">Dashboard</a>
        <a class="button" href="#/analytics">Analytics</a>
      </div>
    </section>
  `);
  if (score.accuracy >= 60) launchConfetti();
  document.querySelector("#reviewSession").addEventListener("click", () => {
    activeSession.index = 0;
    renderQuiz(true);
  });
}

function routeSimulation() {
  const rows = MCAT_BLUEPRINT.map((item) => `<tr><td><strong>${esc(item.shortName)}</strong><br><span class="muted">${esc(item.focus)}</span></td><td><input data-section="${esc(item.section)}" class="sim-count" type="number" min="1" value="${item.questions}"></td><td><input data-section="${esc(item.section)}" class="sim-minutes" type="number" min="1" value="${item.minutes}"></td><td>${item.passageSets} sets · ${item.independentQuestions} independent</td></tr>`).join("");
  render(`
    ${header("Full-Length Simulation", "MCAT-style full-length", `${mcatQuestionTotal()} questions · ${mcatContentMinutes()} content minutes · official-style section order.`)}
    <section class="sim-hero">
      <div>
        <p class="page-kicker">Full-Length Builder</p>
        <h2>Four-section MCAT flow</h2>
        <p>Defaults follow the official section counts and timing. This simulator approximates the section structure while using original generated questions.</p>
      </div>
      <div class="section-stack">
        ${MCAT_BLUEPRINT.map((item) => `<span>${esc(item.shortName)} · ${item.minutes}m</span>`).join("")}
      </div>
    </section>
    <section class="card">
      <h2>Test-Day Flow</h2>
      <div class="timeline">${MCAT_TEST_DAY_FLOW.map((item) => `<span class="${esc(item.type)}">${esc(item.label)}<strong>${item.minutes}m</strong></span>`).join("")}</div>
    </section>
    <section class="card">
      <div class="table-wrap"><table><thead><tr><th>Section</th><th>Questions</th><th>Minutes</th><th>Structure</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="toolbar"><button id="startSimulation" type="button">Start Simulation</button></div>
    </section>
  `);
  document.querySelector("#startSimulation").addEventListener("click", () => {
    const selected = [];
    let seconds = 0;
    document.querySelectorAll(".sim-count").forEach((input) => {
      const section = input.dataset.section;
      const blueprint = { ...blueprintForSection(section), questions: Number(input.value) };
      selected.push(...buildMcatSectionSet(blueprint));
    });
    document.querySelectorAll(".sim-minutes").forEach((input) => {
      seconds += Number(input.value) * 60;
    });
    startSession("full_length_simulation", selected, { count: selected.length, timed: true, seconds, showExplanations: "end", shuffle: false });
  });
}

function sectionDistribution(items) {
  return MCAT_SECTIONS.map((section) => ({
    section,
    count: items.filter((question) => question.section === section).length
  }));
}

function routeReview() {
  const missedIds = new Set(state.attempts.filter((attempt) => !attempt.correct).map((attempt) => attempt.questionId));
  const missed = questions().filter((question) => missedIds.has(question.id));
  render(`
    ${header("Review Mistakes", "Turn misses into targeted reps", "Retry missed questions, filter by topic, and mark weak areas mastered once performance improves.")}
    <section class="card">
      <p><strong>${missed.length}</strong> missed questions available.</p>
      <div class="toolbar">
        <button id="retryMisses" type="button" ${missed.length ? "" : "disabled"}>Retry missed questions</button>
        <button id="markMastered" class="ghost-button" type="button">Clear weak topic list</button>
      </div>
    </section>
    ${questionTable(missed)}
  `);
  document.querySelector("#retryMisses").addEventListener("click", () => startSession("review_mistakes", missed, { count: missed.length, showExplanations: "after_each" }));
  document.querySelector("#markMastered").addEventListener("click", () => {
    state.weakTopics = [];
    save();
    toast("Weak topic list cleared.");
    routeReview();
  });
}

function routeSpaced() {
  const due = dueQuestions(questions(), state.spaced);
  render(`
    ${header("Spaced Repetition", "Due questions", "Correctness, confidence, attempts, weak marks, and last review date control the due schedule.")}
    <section class="card">
      <p><strong>${due.length}</strong> questions are due now.</p>
      <button id="startSpaced" type="button" ${due.length ? "" : "disabled"}>Start due review</button>
    </section>
    ${questionTable(due)}
  `);
  document.querySelector("#startSpaced").addEventListener("click", () => startSession("spaced_repetition", due, { count: due.length, showExplanations: "after_each" }));
}

function routeBank() {
  const meta = questionBankMeta();
  render(`
    ${header("Question Bank", "Search and inspect approved questions", "The official bank includes approved demo questions and approved custom questions. Drafts remain separate.")}
    <section class="hero-panel">
      <div>
        <p class="page-kicker">Loaded Bank</p>
        <h2>${formatNumber(questions().length)} approved questions</h2>
        <p>${formatNumber(meta.shards || 0)} deployable shards · table preview capped for fast browsing</p>
      </div>
      <div class="hero-actions">
        <a class="button" href="#/practice">Build practice set</a>
        <a class="button ghost-button" href="#/editor">Add question</a>
      </div>
    </section>
    <section class="card">
      <div class="toolbar">
        <label class="field"><span>Search</span><input id="bankSearch" placeholder="Search stems, topics, tags"></label>
        ${filterControls("bank", false)}
        <button id="applyBank" type="button">Apply</button>
        <button id="exportBank" class="ghost-button" type="button">Export approved JSON</button>
      </div>
    </section>
    <div id="bankResults">${questionTable(questions())}</div>
  `);
  document.querySelector("#applyBank").addEventListener("click", () => {
    const selected = filterQuestions(questions(), { ...readFilters("bank"), search: document.querySelector("#bankSearch").value });
    document.querySelector("#bankResults").innerHTML = questionTable(selected);
    toast(`${formatNumber(selected.length)} matching questions.`);
  });
  document.querySelector("#exportBank").addEventListener("click", () => download("approved_questions.json", JSON.stringify(questions(), null, 2)));
}

function questionTable(items) {
  const visible = items.slice(0, 500);
  const rows = visible.map((question) => `<tr><td>${esc(question.id)}</td><td>${esc(shortSection(question.section))}</td><td>${esc(question.topic)}</td><td>${esc(question.difficulty)}</td><td>${esc(question.question_type)}</td><td>${esc(question.stem)}</td></tr>`).join("");
  const note = items.length > visible.length ? `<p class="lede">Showing first ${visible.length.toLocaleString()} of ${items.length.toLocaleString()} matching questions. Use filters/search or export for the full set.</p>` : "";
  return `<section class="card">${note}<div class="table-wrap"><table><thead><tr><th>ID</th><th>Section</th><th>Topic</th><th>Difficulty</th><th>Type</th><th>Stem</th></tr></thead><tbody>${rows || `<tr><td colspan="6">No questions found.</td></tr>`}</tbody></table></div></section>`;
}

function routeAnalytics() {
  const summary = summarizeAttempts(questions(), state.attempts);
  render(`
    ${header("Analytics", "Performance trends", "Use section, topic, difficulty, and question-type accuracy to guide your next session.")}
    <section class="grid metrics">
      ${metric("Completed", summary.completed)}
      ${metric("Accuracy", `${summary.accuracy}%`)}
      ${metric("Avg time", `${summary.avgTime}s`)}
      ${metric("Readiness", `${summary.readiness}%`)}
      ${metric("Drafts", state.draftQuestions.length)}
    </section>
    <section class="grid two" style="margin-top:1rem">
      ${chartCard("Accuracy by section", summary.bySection)}
      ${chartCard("Accuracy by topic", summary.byTopic)}
      ${chartCard("Accuracy by difficulty", summary.byDifficulty)}
      ${chartCard("Accuracy by question type", summary.byType)}
    </section>
  `);
}

function routeFunScience() {
  const joke = SCIENCE_JOKES[Math.floor(Math.random() * SCIENCE_JOKES.length)];
  const challenge = dailyItem(QUICK_CHALLENGES, 5);
  const badge = dailyItem(CONCEPT_BADGES, 7);
  render(`
    ${header("Fun Science", "Project 528 memory lab", "Mnemonics, visual hooks, tips, and a little science humor for the long study road.")}
    <section class="fun-hero">
      <div>
        <p class="page-kicker">Study Fuel</p>
        <h2>Make the sticky stuff stick</h2>
        <p>Use these as quick mental handles before practice sets. The MCAT still asks for reasoning, but memory hooks make reasoning faster.</p>
      </div>
      <div class="atom-graphic" aria-hidden="true">
        <span></span><span></span><span></span><strong>528</strong>
      </div>
    </section>
    <section class="concept-grid">
      ${SCIENCE_GRAPHICS.map((item) => `
        <article class="concept-card ${esc(item.color)}">
          <div class="concept-icon">${esc(item.icon)}</div>
          <h2>${esc(item.title)}</h2>
          <p>${esc(item.blurb)}</p>
          <code>${esc(item.formula)}</code>
        </article>
      `).join("")}
    </section>
    <section class="grid two" style="margin-top:1rem">
      <article class="card challenge-card">
        <p class="page-kicker">60-Second Challenge</p>
        <h2>${esc(challenge.prompt)}</h2>
        <details>
          <summary>Reveal answer</summary>
          <p><strong>${esc(challenge.answer)}</strong></p>
          <p>${esc(challenge.why)}</p>
        </details>
      </article>
      <aside class="card badge-card">
        <p class="page-kicker">Study Persona</p>
        <div class="badge-orbit"><strong>${esc(badge)}</strong></div>
        <p class="lede">Not an official score. Just the app gently telling you to keep going.</p>
      </aside>
    </section>
    <section class="grid two" style="margin-top:1rem">
      <article class="card">
        <h2>Mnemonic Wall</h2>
        <div class="mnemonic-list">
          ${MNEMONICS.map((item) => `
            <div class="mnemonic-item">
              <span class="pill">${esc(item.section)}</span>
              <h3>${esc(item.title)}</h3>
              <strong>${esc(item.phrase)}</strong>
              <p>${esc(item.meaning)}</p>
            </div>
          `).join("")}
        </div>
      </article>
      <aside class="card">
        <h2>Tips And Tricks</h2>
        <div class="tip-list">
          ${MCAT_TIPS.map((item) => `
            <div class="tip-item">
              <span>${esc(item.tag)}</span>
              <strong>${esc(item.title)}</strong>
              <p>${esc(item.text)}</p>
            </div>
          `).join("")}
        </div>
      </aside>
    </section>
    <section class="joke-strip">
      <p class="page-kicker">Tiny Brain Break</p>
      <blockquote>${esc(joke)}</blockquote>
      <button id="newJoke" class="ghost-button" type="button">Another one</button>
    </section>
  `);
  document.querySelector("#newJoke").addEventListener("click", routeFunScience);
}

function dailyItem(items, salt = 0) {
  const day = new Date().toISOString().slice(0, 10);
  const seed = [...day].reduce((sum, char) => sum + char.charCodeAt(0), salt);
  return items[seed % items.length];
}

function routeFeedback() {
  render(`
    ${header("Feedback", "Tell the maker something", "Report bugs, flag content issues, request features, or send a note about what would make Project 528 better.")}
    <section class="feedback-hero">
      <div>
        <p class="page-kicker">Student Signal</p>
        <h2>Make the simulator sharper</h2>
        <p>This static app cannot submit to a server directly, so feedback opens as a prefilled GitHub Issue. You can also save it locally and export your feedback log.</p>
      </div>
      <a class="button" href="https://github.com/mbaffour/mcat-prep/issues" target="_blank" rel="noreferrer">View GitHub Issues</a>
    </section>
    <section class="grid two">
      <article class="card">
        <h2>Feedback Form</h2>
        <div class="toolbar">
          <label class="field"><span>Type</span><select id="feedbackType"><option>Bug report</option><option>Content correction</option><option>Feature request</option><option>Question quality issue</option><option>Note to maker</option></select></label>
          <label class="field"><span>Page</span><input id="feedbackPage" value="${esc(location.href)}"></label>
        </div>
        <label class="field">Title<input id="feedbackTitle" placeholder="Short summary"></label>
        <label class="field">Details<textarea id="feedbackDetails" placeholder="What happened? What did you expect? Add question ID, section, browser, or steps if useful."></textarea></label>
        <label class="field">Contact optional<input id="feedbackContact" placeholder="Email or GitHub username if you want follow-up"></label>
        <div class="toolbar">
          <button id="openIssue" type="button">Open GitHub Issue</button>
          <button id="saveFeedback" class="ghost-button" type="button">Save locally</button>
          <button id="exportFeedback" class="ghost-button" type="button">Export feedback log</button>
        </div>
      </article>
      <aside class="card">
        <h2>Helpful Reports Include</h2>
        <div class="tip-list">
          <div class="tip-item"><span>Bug</span><strong>Steps to reproduce</strong><p>Tell me what you clicked, what page you were on, and what went wrong.</p></div>
          <div class="tip-item"><span>Content</span><strong>Question ID</strong><p>Include the question ID and why the answer, explanation, or topic mapping seems off.</p></div>
          <div class="tip-item"><span>Feature</span><strong>Use case</strong><p>Describe what you are trying to study or track, not just the button you want.</p></div>
          <div class="tip-item"><span>Vibe</span><strong>Student experience</strong><p>Tell me what feels motivating, confusing, too dry, too flashy, or missing.</p></div>
        </div>
        <p class="lede">${formatNumber(state.feedback.length)} feedback drafts saved locally.</p>
      </aside>
    </section>
  `);
  document.querySelector("#openIssue").addEventListener("click", openFeedbackIssue);
  document.querySelector("#saveFeedback").addEventListener("click", () => {
    const item = collectFeedback();
    state.feedback.push(item);
    save();
    toast("Feedback saved locally.");
    routeFeedback();
  });
  document.querySelector("#exportFeedback").addEventListener("click", () => download("project-528-feedback.json", JSON.stringify(state.feedback, null, 2)));
}

function collectFeedback() {
  return {
    type: document.querySelector("#feedbackType").value,
    page: document.querySelector("#feedbackPage").value,
    title: document.querySelector("#feedbackTitle").value.trim() || "Project 528 feedback",
    details: document.querySelector("#feedbackDetails").value.trim(),
    contact: document.querySelector("#feedbackContact").value.trim(),
    created_at: new Date().toISOString()
  };
}

function openFeedbackIssue() {
  const item = collectFeedback();
  if (!item.details) {
    toast("Add a few details before opening an issue.");
    return;
  }
  const body = [
    `Type: ${item.type}`,
    `Page: ${item.page}`,
    `Contact: ${item.contact || "Not provided"}`,
    "",
    "Details:",
    item.details
  ].join("\n");
  const params = new URLSearchParams({
    title: `[${item.type}] ${item.title}`,
    body
  });
  window.open(`https://github.com/mbaffour/mcat-prep/issues/new?${params.toString()}`, "_blank", "noopener,noreferrer");
}

function chartCard(title, rows) {
  const body = rows.length ? rows.map((row) => `<div class="bar-row"><strong>${esc(row.label)}</strong>${progressBar(row.accuracy)}<span>${row.accuracy}%</span></div>`).join("") : `<p>No data yet.</p>`;
  return `<article class="card"><h2>${esc(title)}</h2><div class="chart">${body}</div></article>`;
}

function routeEditor() {
  const starter = JSON.stringify(createQuestionTemplate(), null, 2);
  render(`
    ${header("Question Editor", "Create, validate, import, and export", "Human-created items can be approved here. Concept-generated drafts still go through ingestion review controls.")}
    <section class="editor-layout">
      <aside class="card">
        <h2>Tools</h2>
        <div class="list">
          <button id="newQuestion" type="button">Load blank template</button>
          <button id="validateQuestion" class="ghost-button" type="button">Validate schema</button>
          <button id="saveQuestionEditor" type="button">Save custom question</button>
          <button id="importJson" class="ghost-button" type="button">Import JSON array</button>
          <button id="exportCsv" class="ghost-button" type="button">Export CSV index</button>
        </div>
        <div id="editorStatus" class="callout" style="margin-top:1rem">Validation results appear here.</div>
      </aside>
      <article class="card">
        <label class="field">Question JSON<textarea id="questionJson" class="json-box">${esc(starter)}</textarea></label>
      </article>
    </section>
  `);
  document.querySelector("#newQuestion").addEventListener("click", () => document.querySelector("#questionJson").value = starter);
  document.querySelector("#validateQuestion").addEventListener("click", validateEditorQuestion);
  document.querySelector("#saveQuestionEditor").addEventListener("click", () => {
    try {
      const question = JSON.parse(document.querySelector("#questionJson").value);
      question.review.updated_at = new Date().toISOString();
      upsertQuestion(state, question, "customQuestions");
      save();
      toast("Custom question saved.");
      validateEditorQuestion();
    } catch (error) {
      document.querySelector("#editorStatus").innerHTML = `<strong>Error:</strong> ${esc(error.message)}`;
    }
  });
  document.querySelector("#importJson").addEventListener("click", () => {
    try {
      const imported = parseQuestionsFromText(document.querySelector("#questionJson").value);
      imported.forEach((question) => upsertQuestion(state, question, "customQuestions"));
      save();
      toast(`${imported.length} questions imported.`);
    } catch (error) {
      toast(error.message);
    }
  });
  document.querySelector("#exportCsv").addEventListener("click", () => download("question-index.csv", questionsToCsv(questions()), "text/csv"));
}

function validateEditorQuestion() {
  try {
    const question = JSON.parse(document.querySelector("#questionJson").value);
    const result = validateQuestion(question);
    document.querySelector("#editorStatus").innerHTML = result.valid
      ? `<strong>Valid.</strong> ${result.warnings.map(esc).join(" ")}`
      : `<strong>Needs work:</strong><ul>${result.errors.map((error) => `<li>${esc(error)}</li>`).join("")}</ul>`;
  } catch (error) {
    document.querySelector("#editorStatus").innerHTML = `<strong>Invalid JSON:</strong> ${esc(error.message)}`;
  }
}

function createQuestionTemplate() {
  const created = new Date().toISOString();
  return {
    id: `custom-${Date.now()}`,
    section: MCAT_SECTIONS[2],
    topic: "Biology",
    subtopic: "Custom concept",
    difficulty: "medium",
    question_type: "discrete",
    passage: { title: "", text: "", figures: [], tables: [] },
    stem: "Write an original MCAT-style question stem here.",
    choices: [{ id: "A", text: "Correct choice" }, { id: "B", text: "Distractor" }, { id: "C", text: "Distractor" }, { id: "D", text: "Distractor" }],
    correct_answer: "A",
    explanation: {
      short: "Short explanation.",
      detailed: "Detailed explanation.",
      why_correct: "Explain why the correct answer is correct.",
      wrong_answer_explanations: { A: "Correct.", B: "Wrong because...", C: "Wrong because...", D: "Wrong because..." },
      high_yield_takeaway: "High-yield takeaway.",
      common_trap: "Common trap.",
      how_to_think: "Reasoning process.",
      related_concepts: [],
      formulas: [],
      step_by_step_solution: ""
    },
    tags: [],
    estimated_time_seconds: 90,
    source: { source_type: "user_created", source_url: "", license: "User-created original content", attribution: "User", source_notes: "" },
    review: { status: "approved", reviewer_notes: "Human-created and reviewed.", created_at: created, updated_at: created }
  };
}

function routeIngestion() {
  render(`
    ${header("Safe Content Ingestion", "Legal concepts in, original drafts out", "Paste legal educational text, user notes, open-license material, or public-domain text. The app extracts concepts and creates drafts that require human review before publishing.")}
    <section class="callout danger">
      <strong>Boundary:</strong> Do not import copyrighted MCAT questions, paywalled banks, leaked exams, copied PDF dumps, or question dumps. This workflow is for concepts, explanations, formulas, definitions, and lawful source metadata.
    </section>
    <section class="ingestion-layout" style="margin-top:1rem">
      <aside class="card">
        <h2>Source Metadata</h2>
        <label class="field">Title<input id="sourceTitle" required></label>
        <label class="field">URL<input id="sourceUrl" placeholder="https://..."></label>
        <label class="field">Author<input id="sourceAuthor"></label>
        <label class="field">License<input id="sourceLicense" required placeholder="CC BY 4.0, public domain, own notes"></label>
        <label class="field">Attribution<input id="sourceAttribution" required placeholder="Attribution text"></label>
        <label class="field">Source type<select id="sourceType"><option value="open_license">open_license</option><option value="public_domain">public_domain</option><option value="user_created">user_created</option><option value="original">original</option><option value="concept_generated">concept_generated</option></select></label>
        <label class="field">Date accessed<input id="sourceAccessed" type="date"></label>
        <button id="analyzeSource" type="button">Analyze and generate drafts</button>
      </aside>
      <article class="card">
        <h2>Legal Source Text or Notes</h2>
        <textarea id="sourceText" class="json-box" placeholder="Paste legal MCAT-relevant educational text, formulas, definitions, or your own notes."></textarea>
      </article>
    </section>
    <section id="ingestionResults" style="margin-top:1rem"></section>
  `);
  document.querySelector("#sourceAccessed").value = new Date().toISOString().slice(0, 10);
  document.querySelector("#analyzeSource").addEventListener("click", runIngestion);
}

function runIngestion() {
  const text = document.querySelector("#sourceText").value.trim();
  const source = {
    id: `source-${Date.now()}`,
    title: document.querySelector("#sourceTitle").value.trim(),
    url: document.querySelector("#sourceUrl").value.trim(),
    author: document.querySelector("#sourceAuthor").value.trim(),
    license: document.querySelector("#sourceLicense").value.trim(),
    attribution: document.querySelector("#sourceAttribution").value.trim(),
    source_type: document.querySelector("#sourceType").value,
    accessed: document.querySelector("#sourceAccessed").value
  };
  if (text.length < 120) {
    toast("Paste at least 120 characters of legal concept material.");
    return;
  }
  try {
    const result = generateDraftQuestions({ source, text });
    state.sources.push({ ...source, text_excerpt: text.slice(0, 600), created_at: new Date().toISOString() });
    state.draftQuestions.push(...result.drafts);
    save();
    renderIngestionResult(result);
  } catch (error) {
    toast(error.message);
  }
}

function renderIngestionResult(result) {
  const conceptPills = result.concepts.map((item) => `<span class="pill">${esc(item.term)} (${item.count})</span>`).join("");
  const draftRows = result.drafts.map((draft) => `
    <tr>
      <td>${esc(draft.id)}</td>
      <td>${esc(draft.topic)}</td>
      <td><span class="pill ${draft.similarity.level === "blocked" ? "bad" : draft.similarity.level === "review" ? "warn" : "good"}">${draft.similarity.max_overlap_ratio}</span></td>
      <td>${esc(draft.review.status)}</td>
      <td><button class="ghost-button inspect-draft" data-id="${draft.id}" type="button">Inspect</button></td>
    </tr>
  `).join("");
  document.querySelector("#ingestionResults").innerHTML = `
    <section class="grid two">
      <article class="card">
        <h2>Extracted Concepts</h2>
        <div class="status-row">${conceptPills}</div>
        <h3>Suggested MCAT Mapping</h3>
        <p>${esc(shortSection(result.mapping.section))} · ${esc(result.mapping.topic)} · ${esc(result.mapping.subtopic)}</p>
        <h3>Formulas</h3>
        <p>${esc(result.formulas.join(", ") || "No formulas detected.")}</p>
        <h3>Learning Objectives</h3>
        <ul>${result.objectives.map((objective) => `<li>${esc(objective)}</li>`).join("")}</ul>
      </article>
      <article class="card">
        <h2>Draft Questions</h2>
        <p>Drafts are separate from the approved bank. High-similarity drafts are blocked from publishing.</p>
        <div class="table-wrap"><table><thead><tr><th>ID</th><th>Topic</th><th>Similarity</th><th>Status</th><th></th></tr></thead><tbody>${draftRows}</tbody></table></div>
        <div class="toolbar">
          <button id="exportDrafts" class="ghost-button" type="button">Export draft questions</button>
          <button id="exportApprovedOnly" type="button">Export approved questions</button>
        </div>
      </article>
    </section>
  `;
  document.querySelectorAll(".inspect-draft").forEach((button) => button.addEventListener("click", () => inspectDraft(button.dataset.id)));
  document.querySelector("#exportDrafts").addEventListener("click", () => download("draft_questions.json", JSON.stringify(state.draftQuestions, null, 2)));
  document.querySelector("#exportApprovedOnly").addEventListener("click", () => download("approved_questions.json", JSON.stringify(questions(), null, 2)));
}

function inspectDraft(id) {
  const draft = state.draftQuestions.find((item) => item.id === id);
  if (!draft) return;
  const publishCheck = canPublish(draft);
  openModal(`
    <h2>Draft Review</h2>
    <p><strong>${esc(draft.stem)}</strong></p>
    <p>Similarity: <span class="pill ${draft.similarity.level === "blocked" ? "bad" : draft.similarity.level === "review" ? "warn" : "good"}">${draft.similarity.max_overlap_ratio}</span></p>
    <p>Shared phrases: ${esc(draft.similarity.shared_phrases.join("; ") || "none detected")}</p>
    <label class="field">Reviewer notes<textarea id="reviewerNotes">${esc(draft.review.reviewer_notes || "")}</textarea></label>
    <label class="field">Review status<select id="reviewStatus"><option>needs_review</option><option>approved</option><option>rejected</option></select></label>
    <div class="callout ${publishCheck.valid ? "good" : "danger"}">${publishCheck.valid ? "Ready to publish." : esc(publishCheck.errors.join(" "))}</div>
    <div class="toolbar">
      <button id="saveDraftReview" type="button">Save review</button>
      <button id="publishDraft" type="button">Publish to approved bank</button>
      <button id="exportThisDraft" class="ghost-button" type="button">Export this draft</button>
    </div>
  `);
  document.querySelector("#reviewStatus").value = draft.review.status;
  document.querySelector("#saveDraftReview").addEventListener("click", () => {
    draft.review.status = document.querySelector("#reviewStatus").value;
    draft.review.reviewer_notes = document.querySelector("#reviewerNotes").value;
    draft.review.updated_at = new Date().toISOString();
    save();
    toast("Draft review saved.");
    modal.close();
  });
  document.querySelector("#publishDraft").addEventListener("click", () => {
    try {
      draft.review.status = document.querySelector("#reviewStatus").value;
      draft.review.reviewer_notes = document.querySelector("#reviewerNotes").value;
      draft.review.updated_at = new Date().toISOString();
      publishDraft(state, id);
      save();
      toast("Draft published to approved custom bank.");
      modal.close();
      routeIngestion();
    } catch (error) {
      toast(error.message);
    }
  });
  document.querySelector("#exportThisDraft").addEventListener("click", () => download(`${draft.id}.json`, JSON.stringify(draft, null, 2)));
}

function routeDrafts() {
  render(`
    ${header("Draft Registry", "Generated drafts awaiting review", "Drafts can be exported independently and cannot enter the official bank until human review, metadata, and similarity checks pass.")}
    ${questionTable(state.draftQuestions)}
  `);
}

initRouter({
  "/dashboard": routeDashboard,
  "/learn": routeLearning,
  "/practice": routePractice,
  "/test": routeTimed,
  "/simulation": routeSimulation,
  "/review": routeReview,
  "/spaced": routeSpaced,
  "/bank": routeBank,
  "/analytics": routeAnalytics,
  "/fun": routeFunScience,
  "/feedback": routeFeedback,
  "/editor": routeEditor,
  "/ingestion": routeIngestion,
  "/drafts": routeDrafts
}, () => {});
