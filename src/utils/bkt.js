// Bayesian Knowledge Tracing, as implemented in the AdaptMATH backend
// (backend/models/bkt.py): a posterior update on the observed answer, then a learning
// transition. Defaults match the repository.
export const BKT_DEFAULTS = {
  initial: 0.3,
  slip: 0.1,
  guess: 0.05,
  learn: 0.15,
  threshold: 0.8,
  requiredRun: 3
};

export function updateMastery(prior, correct, params = BKT_DEFAULTS) {
  const { slip, guess, learn } = params;
  const posterior = correct
    ? (prior * (1 - slip)) / (prior * (1 - slip) + (1 - prior) * guess)
    : (prior * slip) / (prior * slip + (1 - prior) * (1 - guess));
  return posterior + (1 - posterior) * learn;
}

// Sustained evidence: every signal-bearing observation must leave the estimate at or
// above the threshold. One that doesn't resets the run.
export function nextRun(mastery, run, params = BKT_DEFAULTS) {
  return mastery >= params.threshold ? run + 1 : 0;
}
