const STORAGE_KEY = "project-528-v1";
const SCHEMA_VERSION = 1;

// Portable progress subset: study stats + spaced-repetition state. Kept
// separate from a full backup so progress can move between devices without
// carrying custom questions, drafts, sources, or settings.
const PROGRESS_KEYS = ["attempts", "weakTopics", "flags", "savedQuestions", "spaced", "activity", "streak"];

const defaultState = {
  questions: [],
  customQuestions: [],
  draftQuestions: [],
  sources: [],
  feedback: [],
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

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

// Validate a parsed backup payload against the known shape before applying it.
// Returns the inner data object or throws an Error with a clear message.
function validateBackup(parsed) {
  if (!isPlainObject(parsed)) {
    throw new Error("Backup file is not a valid backup object.");
  }
  const version = parsed.schemaVersion ?? parsed.version;
  if (version !== undefined && Number(version) !== SCHEMA_VERSION) {
    throw new Error(`Unsupported backup schema version: ${version} (expected ${SCHEMA_VERSION}).`);
  }
  const data = parsed.data;
  if (!isPlainObject(data)) {
    throw new Error("Backup file is missing a data object.");
  }
  // Each known field, when present, must match the type of its default.
  for (const [key, defaultValue] of Object.entries(defaultState)) {
    if (data[key] === undefined) continue;
    if (Array.isArray(defaultValue)) {
      if (!Array.isArray(data[key])) {
        throw new Error(`Backup field "${key}" must be an array.`);
      }
    } else if (isPlainObject(defaultValue)) {
      if (!isPlainObject(data[key])) {
        throw new Error(`Backup field "${key}" must be an object.`);
      }
    }
  }
  return data;
}

// Validate a parsed progress export against the known shape before applying it.
// Returns the inner progress object or throws an Error with a clear message.
function validateProgress(parsed) {
  if (!isPlainObject(parsed)) {
    throw new Error("Progress file is not a valid progress object.");
  }
  const version = parsed.schemaVersion ?? parsed.version;
  if (version !== undefined && Number(version) !== SCHEMA_VERSION) {
    throw new Error(`Unsupported progress schema version: ${version} (expected ${SCHEMA_VERSION}).`);
  }
  const progress = parsed.progress;
  if (!isPlainObject(progress)) {
    throw new Error("Progress file is missing a progress object.");
  }
  for (const key of PROGRESS_KEYS) {
    if (progress[key] === undefined) continue;
    const defaultValue = defaultState[key];
    if (Array.isArray(defaultValue) && !Array.isArray(progress[key])) {
      throw new Error(`Progress field "${key}" must be an array.`);
    }
    if (isPlainObject(defaultValue) && !isPlainObject(progress[key])) {
      throw new Error(`Progress field "${key}" must be an object.`);
    }
  }
  return progress;
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
      version: SCHEMA_VERSION,
      schemaVersion: SCHEMA_VERSION,
      data: this.load()
    };
    return JSON.stringify(payload, null, 2);
  },
  importBackup(text) {
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Backup file is not valid JSON.");
    }
    const data = validateBackup(parsed);
    this.save({ ...clone(defaultState), ...data });
    return this.load();
  },
  exportProgress() {
    const state = this.load();
    const progress = {};
    for (const key of PROGRESS_KEYS) {
      progress[key] = clone(state[key]);
    }
    const payload = {
      exported_at: new Date().toISOString(),
      app: "Project 528",
      kind: "progress",
      schemaVersion: SCHEMA_VERSION,
      progress
    };
    return JSON.stringify(payload, null, 2);
  },
  importProgress(text) {
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Progress file is not valid JSON.");
    }
    const progress = validateProgress(parsed);
    return this.update((state) => {
      for (const key of PROGRESS_KEYS) {
        if (progress[key] !== undefined) state[key] = progress[key];
      }
    });
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
