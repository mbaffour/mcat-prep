export function summarizeAttempts(questions, attempts) {
  const completed = attempts.length;
  const correct = attempts.filter((attempt) => attempt.correct).length;
  const accuracy = completed ? Math.round((correct / completed) * 100) : 0;
  const questionMap = new Map(questions.map((question) => [question.id, question]));
  const bySection = groupAccuracy(attempts, (attempt) => questionMap.get(attempt.questionId)?.section || "Unknown");
  const byTopic = groupAccuracy(attempts, (attempt) => questionMap.get(attempt.questionId)?.topic || "Unknown");
  const byDifficulty = groupAccuracy(attempts, (attempt) => questionMap.get(attempt.questionId)?.difficulty || "Unknown");
  const byType = groupAccuracy(attempts, (attempt) => questionMap.get(attempt.questionId)?.question_type || "Unknown");
  const avgTime = completed ? Math.round(attempts.reduce((sum, attempt) => sum + (attempt.timeSeconds || 0), 0) / completed) : 0;
  const weakTopics = [...byTopic].sort((a, b) => a.accuracy - b.accuracy).slice(0, 5);
  const strongTopics = [...byTopic].filter((row) => row.total >= 2).sort((a, b) => b.accuracy - a.accuracy).slice(0, 5);
  const readiness = Math.min(99, Math.round(accuracy * 0.7 + Math.min(completed / 120, 1) * 30));
  return { completed, correct, accuracy, bySection, byTopic, byDifficulty, byType, avgTime, weakTopics, strongTopics, readiness };
}

function groupAccuracy(attempts, keyFn) {
  const map = new Map();
  attempts.forEach((attempt) => {
    const key = keyFn(attempt);
    const row = map.get(key) || { label: key, total: 0, correct: 0, accuracy: 0 };
    row.total += 1;
    if (attempt.correct) row.correct += 1;
    row.accuracy = Math.round((row.correct / row.total) * 100);
    map.set(key, row);
  });
  return [...map.values()].sort((a, b) => b.total - a.total || a.label.localeCompare(b.label));
}

export function recentActivity(attempts, limit = 8) {
  return [...attempts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}

export function updateStreak(state) {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  if (state.streak.lastStudyDate === today) return state.streak;
  state.streak.current = state.streak.lastStudyDate === yesterday ? state.streak.current + 1 : 1;
  state.streak.lastStudyDate = today;
  return state.streak;
}
