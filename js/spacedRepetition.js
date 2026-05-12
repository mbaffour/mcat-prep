const dayMs = 24 * 60 * 60 * 1000;

export function updateSpacedRecord(record = {}, attempt) {
  const confidence = Number(attempt.confidence || 3);
  const attempts = (record.attempts || 0) + 1;
  const previousInterval = record.intervalDays || 0;
  let intervalDays;

  if (!attempt.correct) {
    intervalDays = confidence <= 2 ? 1 : 2;
  } else if (confidence >= 4) {
    intervalDays = Math.max(3, Math.round((previousInterval || 2) * 2.2));
  } else {
    intervalDays = Math.max(2, Math.round((previousInterval || 1) * 1.45));
  }

  if (attempt.markedWeak) intervalDays = Math.min(intervalDays, 2);

  const now = new Date();
  return {
    attempts,
    lastReviewed: now.toISOString(),
    intervalDays,
    dueAt: new Date(now.getTime() + intervalDays * dayMs).toISOString(),
    confidence,
    correctStreak: attempt.correct ? (record.correctStreak || 0) + 1 : 0,
    weak: Boolean(attempt.markedWeak || !attempt.correct)
  };
}

export function dueQuestions(questions, spaced) {
  const now = Date.now();
  return questions.filter((question) => {
    const record = spaced[question.id];
    return !record || new Date(record.dueAt).getTime() <= now;
  });
}
