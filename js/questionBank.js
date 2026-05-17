import { createDemoQuestions } from "./demoData.js";
import { validateQuestion, canPublish } from "./schemaValidator.js";

let bundledQuestions = [];
let bankMeta = {
  source: "fallback",
  count: 0,
  shards: 0
};

export async function loadInitialQuestions(state) {
  let questions = [];
  bankMeta = { source: "fallback", count: 0, shards: 0 };
  try {
    const manifestResponse = await fetch("data/questions/manifest.json");
    if (manifestResponse.ok) {
      const manifest = await manifestResponse.json();
      const shardLists = await Promise.all((manifest.shards || []).map(async (shard) => {
        const response = await fetch(`data/questions/${shard.file}`);
        if (!response.ok) throw new Error(`Unable to load ${shard.file}`);
        return response.json();
      }));
      questions = shardLists.flat();
      bankMeta = {
        source: "sharded",
        count: manifest.total_questions || questions.length,
        shards: manifest.shards?.length || shardLists.length,
        generated_at: manifest.generated_at
      };
    }
  } catch {
    questions = [];
  }
  if (!Array.isArray(questions) || questions.length < 10) {
    try {
      const response = await fetch("data/sample_questions.json");
      if (response.ok) {
        questions = await response.json();
        bankMeta = { source: "legacy-json", count: questions.length, shards: 1 };
      }
    } catch {
      questions = [];
    }
  }
  if (!Array.isArray(questions) || questions.length < 10) {
    try {
      const generated = await import("./generatedQuestionBank.js");
      questions = generated.GENERATED_QUESTIONS;
      bankMeta = { source: "js-fallback", count: questions.length, shards: 1 };
    } catch {
      questions = state.questions?.length ? state.questions : createDemoQuestions();
      bankMeta = { source: "demo-fallback", count: questions.length, shards: 0 };
    }
  }
  if (!Array.isArray(questions) || questions.length < 10) {
    questions = createDemoQuestions();
    bankMeta = { source: "demo-fallback", count: questions.length, shards: 0 };
  }
  bundledQuestions = questions;
  delete state.questions;
  return bundledQuestions;
}

export function allQuestions(state) {
  return state.customQuestions?.length ? [...bundledQuestions, ...state.customQuestions] : bundledQuestions;
}

export function questionBankMeta() {
  return { ...bankMeta, loaded: bundledQuestions.length };
}

export function filterQuestions(questions, filters = {}, deduplicate = false) {
  const seenStems = deduplicate ? new Set() : null;
  return questions.filter((question) => {
    if (filters.search) {
      const haystack = `${question.stem} ${question.topic} ${question.subtopic} ${question.tags?.join(" ")}`.toLowerCase();
      if (!haystack.includes(filters.search.toLowerCase())) return false;
    }
    const passes = ["section", "topic", "subtopic", "difficulty", "question_type"].every((field) => {
      return !filters[field] || filters[field] === "all" || question[field] === filters[field];
    });
    if (!passes) return false;
    if (seenStems) {
      const stemKey = question.stem.trim().slice(0, 120);
      if (seenStems.has(stemKey)) return false;
      seenStems.add(stemKey);
    }
    return true;
  });
}

export function upsertQuestion(state, question, target = "customQuestions") {
  const validation = validateQuestion(question);
  if (!validation.valid) throw new Error(validation.errors.join(" "));
  const list = state[target] || [];
  const index = list.findIndex((item) => item.id === question.id);
  if (index >= 0) list[index] = question;
  else list.push(question);
  state[target] = list;
  return question;
}

export function publishDraft(state, draftId) {
  const draft = state.draftQuestions.find((item) => item.id === draftId);
  if (!draft) throw new Error("Draft not found.");
  draft.ingestion_status = "human_approved";
  const validation = canPublish(draft);
  if (!validation.valid) throw new Error(validation.errors.join(" "));
  state.customQuestions.push({ ...draft, id: draft.id.replace(/^draft-/, "custom-") });
  state.draftQuestions = state.draftQuestions.filter((item) => item.id !== draftId);
  return draft;
}

export function parseQuestionsFromText(text) {
  const parsed = JSON.parse(text);
  if (!Array.isArray(parsed)) throw new Error("Question import must be a JSON array.");
  parsed.forEach((question, index) => {
    const validation = validateQuestion(question);
    if (!validation.valid) throw new Error(`Question ${index + 1}: ${validation.errors.join(" ")}`);
  });
  return parsed;
}

export function questionsToCsv(questions) {
  const columns = ["id", "section", "topic", "subtopic", "difficulty", "question_type", "stem", "correct_answer", "review_status"];
  const rows = questions.map((question) => [
    question.id,
    question.section,
    question.topic,
    question.subtopic,
    question.difficulty,
    question.question_type,
    question.stem,
    question.correct_answer,
    question.review?.status
  ]);
  return [columns, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}
