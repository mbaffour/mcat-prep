import { labValuesTable } from "./tableGenerators.mjs";

// ── Inline passage objects (defined before vignettes array uses them) ─────────

const enzymeKineticsPassage = {
  title: "Experimental Passage: Enzyme Inhibition Kinetics",
  text: "Researchers investigated the kinetics of a hepatic enzyme responsible for metabolizing a prodrug to its active form. The enzyme was incubated with varying concentrations of substrate in the presence or absence of a small-molecule inhibitor at a fixed concentration of 50 μM. Reaction velocity was measured by monitoring product formation spectrophotometrically over 5 minutes. Results are shown in Table 1. A Lineweaver-Burk (double-reciprocal) plot was subsequently constructed; the inhibited and control lines intersect on the y-axis, while the x-intercept shifted closer to zero in the presence of the inhibitor.",
  tables: [{
    title: "Table 1. Reaction velocity (μmol/min) at varying substrate concentrations",
    columns: ["[S] (mM)", "Velocity — control (μmol/min)", "Velocity — + inhibitor (μmol/min)"],
    rows: [["1","17","9"],["5","50","33"],["10","67","50"],["50","91","83"],["100","95","91"]],
  }],
  figures: [],
};

// ── Vignette definitions ──────────────────────────────────────────────────────

export const vignettes = [
  {
    scenario: "metabolic_acidosis",
    passage() {
      return {
        title: "Clinical Vignette: Acid-Base Disturbance",
        text: "A 24-year-old man with type 1 diabetes mellitus is brought to the emergency department by his roommate, who found him confused and breathing rapidly. He has not taken insulin for three days. On examination, he is tachycardic (HR 118 bpm), hypotensive (BP 92/60 mmHg), and his breathing is deep and labored. His breath has a fruity odor. Laboratory values are shown in Table 1. Serum ketones are markedly elevated. Urinalysis reveals glucosuria and ketonuria.",
        tables: [labValuesTable("metabolic_acidosis")],
        figures: [],
      };
    },
    stems: [
      "Based on the laboratory data in Table 1, which acid-base disturbance is present, and what is the primary cause?",
      "The patient's rapid, deep breathing is best described as which compensatory response?",
      "Which anion gap calculation is consistent with the laboratory findings, and what does an elevated anion gap indicate in this patient?",
    ],
    correct: "high anion gap metabolic acidosis caused by ketoacid accumulation from uncontrolled diabetes mellitus",
    distractors: [
      "respiratory acidosis with metabolic compensation caused by hypoventilation from altered consciousness",
      "normal anion gap metabolic acidosis caused by bicarbonate loss through diarrhea or renal tubular acidosis",
      "respiratory alkalosis with metabolic compensation caused by hyperventilation from anxiety or pain",
    ],
    wrong_explanations: [
      "Respiratory acidosis requires elevated PaCO₂; Table 1 shows low PaCO₂ (28 mmHg), indicating hyperventilation rather than hypoventilation",
      "Normal anion gap acidosis (AG = Na − Cl − HCO₃ = 138 − 108 − 12 = 18, elevated > 12) does not fit; the increased AG points to unmeasured ketoacids, not bicarbonate loss",
      "Respiratory alkalosis requires elevated pH; Table 1 shows pH 7.22, confirming acidosis, not alkalosis",
    ],
    explanation: "DKA: insulin deficiency → lipolysis → β-oxidation → acetyl-CoA overflow → ketone bodies → high anion gap metabolic acidosis. Kussmaul respirations (deep, labored breathing) lower PaCO₂ as respiratory compensation.",
    topic: "Physiology", subtopic: "Acid-Base", section: 2,
  },

  {
    scenario: "renal_failure",
    passage() {
      return {
        title: "Clinical Vignette: Chronic Kidney Disease",
        text: "A 68-year-old woman with a 15-year history of type 2 diabetes mellitus and hypertension presents for follow-up. She reports progressive fatigue, decreased urine output, and bilateral leg swelling over the past month. Medications include lisinopril, metformin, and amlodipine. Blood pressure is 158/96 mmHg; she has 2+ pitting edema to the knees. Laboratory values are shown in Table 1. Urinalysis shows 3+ protein. Renal ultrasound reveals bilaterally small, echogenic kidneys.",
        tables: [labValuesTable("renal_failure")],
        figures: [],
      };
    },
    stems: [
      "Based on Table 1, which mechanism best explains the elevated serum potassium in this patient?",
      "The BUN:creatinine ratio in Table 1 is 16. Which renal condition does this ratio suggest?",
      "A nephrologist adds a loop diuretic. Which mechanism of action makes furosemide effective for this patient's edema?",
    ],
    correct: "reduced GFR from chronic diabetic nephropathy impairs potassium secretion in the cortical collecting duct, leading to hyperkalemia",
    distractors: [
      "elevated potassium results from transcellular shifts caused by metabolic alkalosis shifting K⁺ into cells",
      "hyperkalemia results from decreased filtered potassium load, preventing renal potassium excretion",
      "hyperkalemia is caused by ACE inhibitor use alone, independent of any reduction in GFR",
    ],
    wrong_explanations: [
      "This patient has metabolic acidosis (HCO₃⁻ 14 mEq/L), which shifts K⁺ out of cells (raising plasma K⁺); alkalosis would shift it in; the primary cause is reduced tubular secretion",
      "Potassium excretion is driven primarily by secretion in the collecting duct, not filtered load; GFR reduction impairs secretory capacity in remaining nephrons",
      "While ACE inhibitors reduce aldosterone-mediated K⁺ secretion, the primary driver here is CKD reducing functional nephron mass and tubular secretory capacity overall",
    ],
    explanation: "In CKD, fewer functional nephrons means reduced aldosterone-responsive collecting duct capacity for K⁺ secretion. Concurrent metabolic acidosis (from impaired H⁺ excretion) shifts K⁺ out of cells, further raising plasma levels.",
    topic: "Physiology", subtopic: "Renal", section: 2,
  },

  {
    scenario: "adrenal_insufficiency",
    passage() {
      return {
        title: "Clinical Vignette: Adrenal Cortex Pathology",
        text: "A 34-year-old woman presents with a six-month history of fatigue, weight loss, nausea, and salt craving. Physical examination reveals hyperpigmentation of the buccal mucosa, skin folds, and elbows. Blood pressure is 88/56 mmHg supine and drops further on standing. Laboratory values are shown in Table 1. A cosyntropin stimulation test fails to produce an appropriate cortisol rise.",
        tables: [labValuesTable("adrenal_insufficiency")],
        figures: [],
      };
    },
    stems: [
      "The laboratory pattern in Table 1 (low Na⁺, high K⁺, low glucose, low cortisol, high ACTH) best localizes this patient's pathology to which site?",
      "The hyperpigmentation in this patient results from which molecular mechanism?",
      "Which axis and feedback relationship explains the elevated ACTH seen despite low cortisol?",
    ],
    correct: "primary adrenal insufficiency (Addison's disease): destruction of the adrenal cortex eliminates both cortisol and aldosterone, removing cortisol's negative feedback on the pituitary and causing compensatory ACTH elevation",
    distractors: [
      "secondary adrenal insufficiency from pituitary failure, which would cause low ACTH and low cortisol without aldosterone deficiency or hyperpigmentation",
      "tertiary adrenal insufficiency from hypothalamic CRH deficiency, which would reduce both ACTH and cortisol without mineralocorticoid loss",
      "Cushing's syndrome with adrenal hyperplasia, which causes cortisol excess and would suppress ACTH in most primary adrenal forms",
    ],
    wrong_explanations: [
      "Secondary insufficiency: the pituitary fails → ACTH is low (not high); aldosterone is relatively preserved because it is regulated by RAAS rather than ACTH",
      "Tertiary insufficiency: low CRH → low ACTH → low cortisol; ACTH would be low, not elevated as shown; mineralocorticoids remain intact",
      "Cushing's syndrome presents with cortisol excess, not deficiency; the patient's low cortisol and high ACTH pattern is opposite to Cushing's",
    ],
    explanation: "Primary adrenal insufficiency (Addison's): autoimmune destruction of all three cortical zones → absent cortisol (removes negative feedback → ↑ACTH) and absent aldosterone (→ Na⁺ wasting, K⁺ retention, hypotension). High ACTH cross-reacts with melanocortin-1 receptors in skin → hyperpigmentation.",
    topic: "Endocrinology", subtopic: "Adrenal Cortex", section: 2,
  },

  {
    scenario: "enzyme_kinetics_experiment",
    passage() { return enzymeKineticsPassage; },
    stems: [
      "Based on the Lineweaver-Burk data described in the passage, which inhibition type does this compound exhibit?",
      "At very high [S] (>> Km), how would the inhibited velocity compare to the control velocity?",
      "To increase inhibitory potency using a competitive mechanism, a medicinal chemist should optimize which property of the inhibitor?",
    ],
    correct: "competitive inhibition, because the y-intercept (1/Vmax) is unchanged while the x-intercept (−1/Km) shifts, indicating elevated apparent Km without altered Vmax",
    distractors: [
      "noncompetitive inhibition, because velocity is reduced at all substrate concentrations tested",
      "uncompetitive inhibition, because both Km and Vmax would decrease proportionally, giving parallel Lineweaver-Burk lines",
      "irreversible inhibition, because substrate excess at 100 mM does not fully restore velocity to the uninhibited value",
    ],
    wrong_explanations: [
      "Noncompetitive inhibition shifts the y-intercept (changes 1/Vmax) without changing the x-intercept; here the y-intercept is the same for inhibited and control",
      "Uncompetitive inhibition produces parallel Lineweaver-Burk lines (both intercepts shift equally); here only the x-intercept shifts",
      "At 100 mM in Table 1 the inhibited velocity (91) approaches the control (95), showing convergence at high [S] — the hallmark of competitive, not irreversible, inhibition",
    ],
    explanation: "Competitive inhibitors bind the active site reversibly and are displaced by high substrate. This raises apparent Km (inhibitor effectively requires more substrate to compete) without altering Vmax. Lineweaver-Burk: same y-intercept (1/Vmax), shifted x-intercept (−1/Km(app)).",
    topic: "Biochemistry", subtopic: "Enzyme Kinetics", section: 2,
  },
];

export function buildVignette(v) {
  return v.passage();
}
