import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createDemoQuestions } from "../js/demoData.js";
import { MCAT_BLUEPRINT, mcatContentMinutes, mcatQuestionTotal } from "../js/mcatBlueprint.js";
import { generateDraftQuestions, similaritySafetyCheck } from "../js/contentIngestion.js";
import { canPublish, validateQuestion } from "../js/schemaValidator.js";
import { publishDraft } from "../js/questionBank.js";

const demoQuestions = createDemoQuestions();
const manifest = JSON.parse(readFileSync("data/questions/manifest.json", "utf8"));
const firstShard = JSON.parse(readFileSync(`data/questions/${manifest.shards[0].file}`, "utf8"));
const secondShard = JSON.parse(readFileSync(`data/questions/${manifest.shards[1].file}`, "utf8"));
const bundledSample = [...firstShard.slice(0, 180), ...secondShard.slice(0, 80)];

assert.equal(demoQuestions.length, 60, "curated demo seed bank should contain 60 questions");
demoQuestions.forEach((question) => {
  const result = validateQuestion(question);
  assert.equal(result.valid, true, `${question.id} should validate: ${result.errors.join("; ")}`);
  assert.equal(question.review.status, "approved", `${question.id} should be approved demo content`);
});

assert.ok(manifest.total_questions >= 100000, "bundled static bank should contain at least 100,000 questions");
assert.equal(mcatQuestionTotal(), 230, "official-style full-length should contain 230 questions");
assert.equal(mcatContentMinutes(), 375, "official-style full-length should contain 375 content minutes");
assert.deepEqual(MCAT_BLUEPRINT.map((item) => item.questions), [59, 53, 59, 59], "section question counts should match the MCAT structure");
assert.ok(manifest.shards.every((shard) => shard.count <= manifest.shard_size), "shards should respect configured size");
bundledSample.forEach((question) => {
  const result = validateQuestion(question);
  assert.equal(result.valid, true, `${question.id} should validate: ${result.errors.join("; ")}`);
});

const legalSource = {
  id: "source-test-1",
  title: "User notes on enzyme inhibition",
  url: "",
  author: "Local user",
  license: "User-created original notes",
  attribution: "Local user",
  source_type: "user_created",
  accessed: "2026-05-11"
};

const legalText = `
Enzyme inhibition can be evaluated by comparing reaction velocity at different substrate concentrations.
Competitive inhibition increases apparent Km while preserving Vmax because a sufficiently high substrate
concentration can outcompete the inhibitor. Noncompetitive inhibition lowers Vmax when catalytic capacity
is reduced. A careful experiment should vary substrate concentration, hold enzyme concentration constant,
and include controls without inhibitor.
`;

const generated = generateDraftQuestions({ source: legalSource, text: legalText });
assert.ok(generated.concepts.length >= 5, "concept extraction should return key terms");
assert.ok(generated.drafts.length >= 3, "ingestion should produce draft question ideas");
generated.drafts.forEach((draft) => {
  assert.equal(draft.review.status, "needs_review", "generated drafts must require review");
  assert.equal(draft.ingestion_status, "draft_generated_requires_human_review", "generated drafts must stay out of approved bank");
  assert.equal(validateQuestion(draft).valid, true, "generated draft should satisfy base schema");
  assert.equal(canPublish(draft).valid, false, "unreviewed generated drafts must not publish");
});

const copiedQuestion = {
  ...generated.drafts[0],
  stem: legalText,
  choices: [
    { id: "A", text: legalText },
    { id: "B", text: "A different distractor." },
    { id: "C", text: "Another different distractor." },
    { id: "D", text: "A final different distractor." }
  ]
};
copiedQuestion.similarity = similaritySafetyCheck(legalText, copiedQuestion);
assert.equal(copiedQuestion.similarity.level, "blocked", "high source overlap should be blocked");
assert.equal(canPublish({ ...copiedQuestion, review: { ...copiedQuestion.review, status: "approved", reviewer_notes: "Reviewed." }, ingestion_status: "human_approved" }).valid, false, "blocked similarity must prevent publishing");

const state = { customQuestions: [], draftQuestions: [generated.drafts[0]] };
assert.throws(() => publishDraft(state, generated.drafts[0].id), /Human approval|required|review/i, "publishDraft must reject unapproved drafts");

state.draftQuestions[0].review.status = "approved";
state.draftQuestions[0].review.reviewer_notes = "Reviewed for originality, accuracy, and license metadata.";
state.draftQuestions[0].similarity = { max_overlap_ratio: 0, shared_phrases: [], level: "low" };
publishDraft(state, state.draftQuestions[0].id);
assert.equal(state.customQuestions.length, 1, "approved low-similarity draft should publish");
assert.equal(state.draftQuestions.length, 0, "published draft should leave draft registry");

console.log("content pipeline tests passed");
