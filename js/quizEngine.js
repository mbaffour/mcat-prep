import { updateStreak } from "./analytics.js";
import { updateSpacedRecord } from "./spacedRepetition.js";

export function createSession(questions, options = {}) {
  const count = Number(options.count || questions.length || 1);
  const shuffled = options.shuffle === false ? [...questions] : [...questions].sort(() => Math.random() - 0.5);
  return {
    id: `session-${Date.now()}`,
    mode: options.mode || "learning",
    questions: shuffled.slice(0, count),
    index: 0,
    answers: {},
    flagged: [],
    startedAt: Date.now(),
    submitted: false,
    showExplanations: options.showExplanations || "after_each",
    timed: Boolean(options.timed),
    seconds: Number(options.seconds || 0)
  };
}

export function recordAnswer(state, session, question, choiceId, confidence = 3, markedWeak = false) {
  session.answers[question.id] = { choiceId, confidence, markedWeak, answeredAt: Date.now() };
  const correct = choiceId === question.correct_answer;
  const attempt = {
    id: `attempt-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    questionId: question.id,
    mode: session.mode,
    selected: choiceId,
    correctAnswer: question.correct_answer,
    correct,
    confidence: Number(confidence),
    markedWeak,
    timeSeconds: Math.max(1, Math.round((Date.now() - session.startedAt) / 1000 / Math.max(1, session.index + 1))),
    createdAt: new Date().toISOString()
  };
  state.attempts.push(attempt);
  if (!correct && !state.weakTopics.includes(question.topic)) state.weakTopics.push(question.topic);
  if (markedWeak && !state.weakTopics.includes(question.topic)) state.weakTopics.push(question.topic);
  state.spaced[question.id] = updateSpacedRecord(state.spaced[question.id], attempt);
  updateStreak(state);
  return attempt;
}

export function scoreSession(session) {
  const total = session.questions.length;
  const answered = Object.keys(session.answers).length;
  const correct = session.questions.filter((question) => session.answers[question.id]?.choiceId === question.correct_answer).length;
  return { total, answered, unanswered: total - answered, correct, accuracy: total ? Math.round((correct / total) * 100) : 0 };
}
