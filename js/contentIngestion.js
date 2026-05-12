import { MCAT_SECTIONS, TOPICS } from "./demoData.js";
import { validateSource } from "./schemaValidator.js";

const STOP_WORDS = new Set("a an and are as at be by for from has have in into is it its of on or that the their this to with without within which while".split(" "));

const sectionHints = {
  "Chemical and Physical Foundations of Biological Systems": ["acid", "base", "equilibrium", "force", "circuit", "fluid", "lens", "thermodynamic", "organic", "reaction", "enzyme", "molecule", "energy", "physics", "chemistry"],
  "Critical Analysis and Reasoning Skills": ["argument", "author", "claim", "tone", "inference", "passage", "critic", "historian", "essay", "novel", "implies"],
  "Biological and Biochemical Foundations of Living Systems": ["cell", "gene", "protein", "enzyme", "membrane", "organ", "DNA", "RNA", "metabolism", "physiology", "immune", "neuron"],
  "Psychological, Social, and Biological Foundations of Behavior": ["behavior", "social", "memory", "learning", "motivation", "identity", "culture", "study", "survey", "stress", "sociology", "psychology"]
};

export function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9+\-Δ\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

export function extractKeyTerms(text, limit = 18) {
  const counts = new Map();
  tokenize(text).forEach((word) => counts.set(word, (counts.get(word) || 0) + 1));
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([term, count]) => ({ term, count }));
}

export function extractFormulas(text) {
  const matches = (text || "").match(/[A-ZΔ][A-Za-z0-9Δ_./\-\s]*\s*=\s*[^.;\n]+/g) || [];
  return [...new Set(matches.map((item) => item.trim()))].slice(0, 10);
}

export function extractLearningObjectives(text) {
  const terms = extractKeyTerms(text, 8).map((item) => item.term);
  return terms.slice(0, 5).map((term) => `Explain how ${term} affects an MCAT-relevant system or argument.`);
}

export function suggestSectionAndTopic(text) {
  const lower = (text || "").toLowerCase();
  const ranked = MCAT_SECTIONS.map((section) => {
    const score = sectionHints[section].reduce((sum, hint) => sum + (lower.includes(hint.toLowerCase()) ? 1 : 0), 0);
    return { section, score };
  }).sort((a, b) => b.score - a.score);
  const section = ranked[0]?.score ? ranked[0].section : MCAT_SECTIONS[2];
  const topic = TOPICS[section].find((candidate) => lower.includes(candidate.toLowerCase().split(" ")[0])) || TOPICS[section][0];
  return { section, topic, subtopic: "Concept extraction" };
}

function shingles(text, size = 6) {
  const words = tokenize(text);
  const output = new Set();
  for (let index = 0; index <= words.length - size; index += 1) {
    output.add(words.slice(index, index + size).join(" "));
  }
  return output;
}

export function similaritySafetyCheck(sourceText, question) {
  const sourceShingles = shingles(sourceText);
  const qText = [
    question.stem,
    ...(question.choices || []).map((choice) => choice.text),
    question.explanation?.short,
    question.explanation?.detailed
  ].join(" ");
  const questionShingles = shingles(qText);
  if (!sourceShingles.size || !questionShingles.size) {
    return { max_overlap_ratio: 0, shared_phrases: [], level: "low" };
  }
  const shared = [...questionShingles].filter((phrase) => sourceShingles.has(phrase));
  const ratio = shared.length / Math.max(1, questionShingles.size);
  return {
    max_overlap_ratio: Number(ratio.toFixed(3)),
    shared_phrases: shared.slice(0, 8),
    level: ratio >= 0.22 ? "blocked" : ratio >= 0.14 ? "review" : "low"
  };
}

export function generateDraftQuestions({ source, text }) {
  const sourceValidation = validateSource(source);
  if (!sourceValidation.valid) {
    throw new Error(sourceValidation.errors.join(" "));
  }

  const keyTerms = extractKeyTerms(text, 12);
  const formulas = extractFormulas(text);
  const objectives = extractLearningObjectives(text);
  const mapping = suggestSectionAndTopic(`${source.title} ${text}`);
  const createdAt = new Date().toISOString();

  const drafts = keyTerms.slice(0, 5).map((item, index) => {
    const term = item.term;
    const question = {
      id: `draft-${Date.now()}-${index + 1}`,
      section: mapping.section,
      topic: mapping.topic,
      subtopic: mapping.subtopic,
      difficulty: index < 2 ? "easy" : "medium",
      question_type: index % 2 ? "experimental_design" : "discrete",
      passage: { title: "", text: "", figures: [], tables: [] },
      stem: `Which statement best applies the concept of ${term} in an MCAT-style problem?`,
      choices: [
        { id: "A", text: `${term} should be analyzed by identifying the mechanism, variable, or relationship being tested before choosing an answer.` },
        { id: "B", text: `${term} can be answered accurately by matching the longest answer choice to the source wording.` },
        { id: "C", text: `${term} is only relevant when a passage explicitly defines the term in the question stem.` },
        { id: "D", text: `${term} questions should ignore experimental controls and focus only on vocabulary recall.` }
      ],
      correct_answer: "A",
      explanation: {
        short: `This draft tests conceptual application of ${term}.`,
        detailed: `The original source is used only to identify the concept. A finished item should ask the learner to apply ${term} to a fresh scenario, dataset, or reasoning task rather than recall the source wording.`,
        why_correct: "A is correct because MCAT-style reasoning emphasizes applying a concept to a new context.",
        wrong_answer_explanations: {
          A: "Application-first reasoning is appropriate for MCAT-style items.",
          B: "Answering by source-word matching risks shallow recall and unsafe copying.",
          C: "Concepts can be tested even when the exact term is not named.",
          D: "Controls and variables are central to many MCAT science questions."
        },
        high_yield_takeaway: `Turn ${term} into a mechanism, comparison, calculation, or experimental reasoning task.`,
        common_trap: "Do not copy, lightly paraphrase, or preserve source phrasing.",
        how_to_think: "Use source material to choose concepts, then write a new scenario from scratch.",
        related_concepts: keyTerms.slice(0, 6).map((entry) => entry.term),
        formulas,
        step_by_step_solution: "1. Identify the concept. 2. Write a fresh MCAT-style context. 3. Test one clear reasoning objective. 4. Write plausible distractors from common misconceptions."
      },
      tags: [mapping.topic, mapping.subtopic, term, "ingested-draft"],
      estimated_time_seconds: 90,
      source: {
        source_type: source.source_type,
        source_url: source.url || "",
        license: source.license,
        attribution: source.attribution,
        source_notes: `Concept-generated draft from source "${source.title}". Author: ${source.author || "not specified"}. Accessed: ${source.accessed || createdAt.slice(0, 10)}.`
      },
      review: {
        status: "needs_review",
        reviewer_notes: "",
        created_at: createdAt,
        updated_at: createdAt
      },
      ingestion_status: "draft_generated_requires_human_review",
      generated_from_source_id: source.id
    };
    question.similarity = similaritySafetyCheck(text, question);
    return question;
  });

  return {
    source,
    concepts: keyTerms,
    formulas,
    objectives,
    mapping,
    drafts
  };
}
