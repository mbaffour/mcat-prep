const requiredQuestionFields = [
  "id",
  "section",
  "topic",
  "subtopic",
  "difficulty",
  "question_type",
  "stem",
  "choices",
  "correct_answer",
  "explanation",
  "source",
  "review"
];

const allowedDifficulties = ["easy", "medium", "hard"];
const allowedTypes = ["discrete", "passage", "cars", "data_interpretation", "experimental_design", "calculation", "graph_table"];
const allowedReview = ["draft", "needs_review", "approved", "rejected"];
const allowedSourceTypes = ["original", "user_created", "open_license", "public_domain", "concept_generated"];

export function validateQuestion(question, options = {}) {
  const errors = [];
  const warnings = [];

  requiredQuestionFields.forEach((field) => {
    if (question[field] === undefined || question[field] === null || question[field] === "") {
      errors.push(`Missing required field: ${field}`);
    }
  });

  if (!allowedDifficulties.includes(question.difficulty)) errors.push("difficulty must be easy, medium, or hard.");
  if (!allowedTypes.includes(question.question_type)) errors.push("question_type is not supported.");
  if (!Array.isArray(question.choices) || question.choices.length !== 4) errors.push("choices must contain exactly four options.");
  if (!question.choices?.some((choice) => choice.id === question.correct_answer)) errors.push("correct_answer must match one choice id.");

  const explanation = question.explanation || {};
  ["short", "detailed", "why_correct", "wrong_answer_explanations", "high_yield_takeaway"].forEach((field) => {
    if (!explanation[field]) errors.push(`explanation.${field} is required.`);
  });

  const source = question.source || {};
  if (!allowedSourceTypes.includes(source.source_type)) errors.push("source.source_type is not recognized.");
  if (!source.license || !source.attribution) errors.push("source license and attribution are required.");
  if (["open_license", "public_domain", "concept_generated"].includes(source.source_type) && !source.source_url) {
    warnings.push("Reusable-source questions should include source_url when available.");
  }

  const review = question.review || {};
  if (!allowedReview.includes(review.status)) errors.push("review.status must be draft, needs_review, approved, or rejected.");
  if (options.requireApproved && review.status !== "approved") errors.push("Only approved questions can enter the official bank.");
  if (options.requireHumanReview && !review.reviewer_notes) errors.push("Human reviewer notes are required before publishing.");

  if (question.similarity?.max_overlap_ratio >= 0.22) {
    errors.push("Similarity overlap is too high for approval; rewrite from concepts.");
  } else if (question.similarity?.max_overlap_ratio >= 0.14) {
    warnings.push("Similarity overlap is elevated; inspect wording carefully.");
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateSource(source) {
  const errors = [];
  ["title", "license", "attribution", "source_type"].forEach((field) => {
    if (!source[field]) errors.push(`Source ${field} is required.`);
  });
  if (!allowedSourceTypes.includes(source.source_type)) errors.push("Source type is not supported.");
  if (source.source_type === "open_license" && !source.url) errors.push("Open-license sources should include a URL.");
  return { valid: errors.length === 0, errors };
}

export function canPublish(question) {
  const result = validateQuestion(question, { requireApproved: true, requireHumanReview: true });
  if (question.review?.status !== "approved") result.errors.push("Human approval is required.");
  if (question.ingestion_status && question.ingestion_status !== "human_approved") {
    result.errors.push("Ingested drafts must be marked human_approved before publishing.");
  }
  return { ...result, valid: result.errors.length === 0 };
}
