const STORAGE_KEY = "project-528-v1";

const defaultState = {
  questions: [],
  customQuestions: [],
  draftQuestions: [],
  sources: [],
  attempts: [],
  weakTopics: [],
  flags: [],
  savedQuestions: [],
  spaced: {},
  settings: {
    theme: "light",
    showExplanations: "after_each"
  },
  activity: [],
  streak: {
    current: 0,
    lastStudyDate: ""
  }
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export const store = {
  load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(defaultState);
    try {
      return { ...clone(defaultState), ...JSON.parse(raw) };
    } catch {
      return clone(defaultState);
    }
  },
  save(state) {
    const persistable = { ...state };
    delete persistable.questions;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
  },
  update(mutator) {
    const state = this.load();
    const result = mutator(state) || state;
    this.save(result);
    return result;
  },
  exportBackup() {
    const payload = {
      exported_at: new Date().toISOString(),
      app: "Project 528",
      version: 1,
      data: this.load()
    };
    return JSON.stringify(payload, null, 2);
  },
  importBackup(text) {
    const parsed = JSON.parse(text);
    if (!parsed.data || typeof parsed.data !== "object") {
      throw new Error("Backup file is missing a data object.");
    }
    this.save({ ...clone(defaultState), ...parsed.data });
    return this.load();
  },
  resetProgress() {
    this.update((state) => {
      state.attempts = [];
      state.weakTopics = [];
      state.flags = [];
      state.savedQuestions = [];
      state.spaced = {};
      state.activity = [];
      state.streak = clone(defaultState.streak);
    });
  },
  resetAll() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
