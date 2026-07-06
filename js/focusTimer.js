// Pomodoro-style focus timer for the study/quiz view.
//
// Self-contained module with its own interval so it never collides with the
// quiz countdown timer in app.js. State lives at module scope so the timer
// keeps running across quiz re-renders; call mountFocusTimer(container) after
// each render to (re)attach the UI to a fresh DOM node.

const FOCUS_MINUTES = 25;
const BREAK_MINUTES = 5;

const state = {
  mode: "focus", // "focus" | "break"
  remaining: FOCUS_MINUTES * 60,
  running: false,
  completedFocus: 0,
  intervalId: null,
  container: null
};

function durationFor(mode) {
  return (mode === "focus" ? FOCUS_MINUTES : BREAK_MINUTES) * 60;
}

function formatClock(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

function tick() {
  if (!state.running) return;
  state.remaining = Math.max(0, state.remaining - 1);
  if (state.remaining <= 0) {
    if (state.mode === "focus") state.completedFocus += 1;
    state.mode = state.mode === "focus" ? "break" : "focus";
    state.remaining = durationFor(state.mode);
    state.running = false;
    stopInterval();
  }
  paint();
}

function startInterval() {
  if (state.intervalId) return;
  state.intervalId = setInterval(tick, 1000);
}

function stopInterval() {
  if (state.intervalId) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }
}

function template() {
  const label = state.mode === "focus" ? "Focus" : "Break";
  return `
    <div class="focus-timer" data-mode="${state.mode}">
      <div class="focus-timer-head">
        <span>${label} timer</span>
        <span class="focus-timer-count">${state.completedFocus} done</span>
      </div>
      <div class="focus-timer-clock" id="focusClock">${formatClock(state.remaining)}</div>
      <div class="focus-timer-controls">
        <button type="button" class="ghost-button" data-focus-action="toggle">${state.running ? "Pause" : "Start"}</button>
        <button type="button" class="ghost-button" data-focus-action="reset">Reset</button>
        <button type="button" class="ghost-button" data-focus-action="skip">Skip</button>
      </div>
    </div>
  `;
}

function paint() {
  if (!state.container) return;
  const clock = state.container.querySelector("#focusClock");
  const wrap = state.container.querySelector(".focus-timer");
  const toggle = state.container.querySelector('[data-focus-action="toggle"]');
  if (!clock || !wrap || !toggle) {
    // DOM was replaced by a re-render; re-mount into the stored container.
    state.container.innerHTML = template();
    bindControls();
    return;
  }
  clock.textContent = formatClock(state.remaining);
  wrap.dataset.mode = state.mode;
  toggle.textContent = state.running ? "Pause" : "Start";
  const count = state.container.querySelector(".focus-timer-count");
  if (count) count.textContent = `${state.completedFocus} done`;
}

function handleAction(action) {
  if (action === "toggle") {
    state.running = !state.running;
    if (state.running) startInterval();
    else stopInterval();
  } else if (action === "reset") {
    state.running = false;
    stopInterval();
    state.remaining = durationFor(state.mode);
  } else if (action === "skip") {
    state.running = false;
    stopInterval();
    state.mode = state.mode === "focus" ? "break" : "focus";
    state.remaining = durationFor(state.mode);
  }
  paint();
}

function bindControls() {
  if (!state.container) return;
  state.container.querySelectorAll("[data-focus-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.focusAction));
  });
}

// Render the focus timer into container and (re)bind its controls. Safe to call
// on every quiz render; the countdown keeps running in the background.
export function mountFocusTimer(container) {
  if (!container) return;
  state.container = container;
  container.innerHTML = template();
  bindControls();
}
