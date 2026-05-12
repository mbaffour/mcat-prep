import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createDemoQuestions, MCAT_SECTIONS } from "../js/demoData.js";

const targetCount = Number(process.argv[2] || 2400);
const shardSize = Number(process.argv[3] || 2500);
const now = new Date().toISOString();
const letters = ["A", "B", "C", "D"];

const scenarios = [
  "a lab experiment",
  "a patient vignette",
  "a passage-based data set",
  "a physiology model",
  "a molecular pathway",
  "a public health study",
  "a behavioral intervention",
  "a graph interpretation item",
  "a control-condition comparison",
  "a high-yield review session"
];

const conceptBank = [
  c(2, "Biochemistry", "Enzyme kinetics", "Competitive inhibition", "increases apparent Km without changing Vmax", ["decreases Km without changing Vmax", "increases Vmax by stabilizing product", "eliminates the need for substrate"], "Competitive inhibitors compete with substrate at the active site and can be overcome by high substrate concentration.", ["Km", "Vmax", "Michaelis-Menten"]),
  c(2, "Biochemistry", "Enzyme kinetics", "Noncompetitive inhibition", "decreases Vmax without necessarily changing Km", ["increases Vmax at high substrate", "only changes reaction pH", "requires covalent DNA modification"], "Pure noncompetitive inhibition reduces active enzyme capacity, lowering maximal rate.", ["Vmax", "Allosteric inhibition"]),
  c(2, "Biochemistry", "Amino acids", "Lysine at physiological pH", "usually carries a positive charge", ["is usually negatively charged", "is always nonpolar", "forms peptide bonds only at low pH"], "Lysine has a basic side chain that is commonly protonated near physiological pH.", ["Basic residues", "pKa"]),
  c(2, "Biochemistry", "Protein structure", "Hydrophobic core stability", "is favored by buried nonpolar residues", ["is maximized by burying charged residues", "does not depend on side-chain polarity", "requires every residue to be glycine"], "Protein cores are stabilized when nonpolar side chains cluster away from water.", ["Hydrophobic effect", "Folding"]),
  c(2, "Biochemistry", "Metabolism", "AMPK activation", "promotes ATP-generating catabolic pathways", ["stimulates energy-consuming synthesis", "blocks fatty acid oxidation", "prevents glucose uptake in every tissue"], "AMPK senses low energy and shifts metabolism toward restoring ATP.", ["Energy charge", "Catabolism"]),
  c(2, "Biochemistry", "Metabolism", "Glycolysis regulation", "phosphofructokinase-1 is activated by AMP", ["ATP activates PFK-1 as a low-energy signal", "citrate strongly activates PFK-1", "PFK-1 removes phosphate from glucose"], "PFK-1 is a committed glycolysis step stimulated by low-energy signals such as AMP.", ["PFK-1", "ATP", "AMP"]),
  c(2, "Biology", "Membrane transport", "Hypertonic solution", "causes water to leave a cell", ["causes water to enter the cell", "prevents osmosis entirely", "requires ATP-driven water pumps"], "Water moves toward the higher effective solute concentration.", ["Osmosis", "Tonicity"]),
  c(2, "Biology", "Membrane transport", "Facilitated diffusion", "can show saturation when transporters are occupied", ["requires direct ATP hydrolysis for every solute", "cannot transport polar molecules", "has no upper transport limit"], "Carrier-mediated transport depends on finite protein binding sites.", ["Transporters", "Saturation"]),
  c(2, "Biology", "Cell cycle", "Anaphase", "separates sister chromatids toward opposite poles", ["aligns chromosomes at the metaphase plate", "duplicates DNA", "reforms the nuclear envelope first"], "Anaphase begins when sister chromatids separate and move apart.", ["Mitosis", "Chromatids"]),
  c(2, "Biology", "Organelles", "Rough ER", "synthesizes secreted and membrane proteins", ["stores genetic information", "performs oxidative phosphorylation", "digests only extracellular bacteria"], "Ribosomes on rough ER translate proteins entering the secretory pathway.", ["Signal peptide", "Golgi"]),
  c(2, "Genetics", "Transcription", "Promoter mutation", "can reduce RNA polymerase recruitment", ["directly prevents tRNA charging", "always creates a missense mutation", "only changes ribosome translocation"], "Promoters help initiate transcription by recruiting transcription machinery.", ["RNA polymerase", "Gene regulation"]),
  c(2, "Genetics", "Hardy-Weinberg", "Carrier frequency", "is approximately 2q for rare recessive alleles", ["equals q squared for heterozygotes", "is always 50 percent", "does not depend on allele frequency"], "For rare recessive conditions, q is small and 2pq is approximately 2q.", ["p² + 2pq + q²", "Population genetics"]),
  c(2, "Physiology", "Renal physiology", "Clearance above GFR", "indicates net tubular secretion", ["indicates complete reabsorption", "means the substance is not filtered", "requires zero urine flow"], "Clearance greater than GFR means secretion adds solute to the filtrate.", ["GFR", "Renal clearance"]),
  c(2, "Physiology", "Respiration", "Left shift in hemoglobin curve", "indicates increased oxygen affinity", ["indicates decreased oxygen affinity", "means hemoglobin cannot bind oxygen", "requires higher carbon dioxide in every case"], "A left shift increases saturation at a given oxygen partial pressure.", ["Bohr effect", "Hemoglobin"]),
  c(2, "Physiology", "Cardiovascular", "Mean arterial pressure", "increases when total peripheral resistance rises at constant cardiac output", ["falls whenever resistance increases", "is unrelated to blood flow", "equals residual lung volume"], "MAP is approximated by cardiac output times total peripheral resistance.", ["MAP", "CO", "TPR"]),
  c(2, "Research methods", "Controls", "Negative control", "omits the independent variable while preserving other conditions", ["contains the known positive treatment", "changes every variable at once", "is never needed in cell culture"], "A negative control helps identify baseline effects of handling and measurement.", ["Independent variable", "Experimental design"]),
  c(0, "General Chemistry", "Acid-base", "Henderson-Hasselbalch", "relates pH, pKa, and conjugate base-to-acid ratio", ["calculates kinetic energy from mass", "predicts magnetic field strength", "states that entropy is always zero"], "The Henderson-Hasselbalch equation is central for buffer calculations.", ["pH", "pKa", "Buffers"]),
  c(0, "General Chemistry", "Thermodynamics", "Negative enthalpy and negative entropy", "favor spontaneity at low temperature", ["favor only high temperature", "are spontaneous at no temperature by definition", "make Gibbs free energy irrelevant"], "When entropy change is negative, the unfavorable -TΔS term grows with temperature.", ["ΔG", "ΔH", "ΔS"]),
  c(0, "General Chemistry", "Equilibrium", "Le Chatelier principle", "predicts shifts that oppose disturbances", ["states catalysts change equilibrium constants", "requires all reactions to stop", "applies only to irreversible reactions"], "Equilibrium systems respond to reduce the effect of a perturbation.", ["Reaction quotient", "Equilibrium"]),
  c(0, "General Chemistry", "Electrochemistry", "Oxidation at the anode", "occurs in both galvanic and electrolytic cells", ["occurs only at the cathode", "cannot involve electron loss", "requires protein translation"], "An Ox: oxidation occurs at the anode.", ["Redox", "Galvanic cell"]),
  c(0, "General Chemistry", "Solutions", "Dilution", "conserves moles of solute", ["creates solute from solvent", "changes molar mass", "requires equilibrium vapor pressure"], "M1V1 = M2V2 follows from conserving solute amount.", ["Molarity", "Dilution"]),
  c(0, "Organic Chemistry", "Carbonyl chemistry", "Sodium borohydride", "reduces aldehydes to primary alcohols", ["oxidizes aldehydes to carboxylic acids", "adds bromine across aromatics only", "removes all stereocenters"], "NaBH4 is a mild hydride reducing agent for aldehydes and ketones.", ["Hydride", "Reduction"]),
  c(0, "Organic Chemistry", "Stereochemistry", "Enantiomers", "have opposite configuration at every chiral center", ["differ only by connectivity", "are always achiral", "must have different molecular formulas"], "Enantiomers are non-superimposable mirror images.", ["R/S", "Chirality"]),
  c(0, "Organic Chemistry", "Nucleophilic substitution", "SN2 conditions", "favor strong nucleophiles and less hindered substrates", ["favor tertiary substrates with weak nucleophiles", "require a stable carbocation intermediate", "always proceed with racemization"], "SN2 is a concerted backside attack and is slowed by steric hindrance.", ["SN2", "Leaving group"]),
  c(0, "Physics", "Circuits", "Parallel resistance", "is less than the smallest branch resistance", ["equals the sum of all resistances", "is always zero", "depends only on wire color"], "Parallel circuits add reciprocal resistances, creating more paths for current.", ["Ohm's law", "Resistance"]),
  c(0, "Physics", "Fluids", "Poiseuille radius dependence", "makes resistance inversely proportional to radius to the fourth power", ["makes resistance proportional to radius squared", "ignores viscosity", "applies only to sound waves"], "Small changes in vessel radius strongly affect laminar-flow resistance.", ["Laminar flow", "Viscosity"]),
  c(0, "Physics", "Optics", "Real image from converging lens", "is inverted", ["is always upright", "must be on the object side", "cannot be projected"], "Real images form where rays converge and are inverted for a single converging lens.", ["Lens equation", "Magnification"]),
  c(0, "Physics", "Waves and sound", "Wave speed equation", "links speed to frequency times wavelength", ["states amplitude equals pH", "requires frequency to equal mass", "makes wavelength independent of medium"], "For waves, v = fλ.", ["Frequency", "Wavelength"]),
  c(0, "Physics", "Kinematics", "Constant acceleration", "changes velocity according to v = v0 + at", ["prevents velocity from changing", "requires circular motion", "depends only on pressure"], "Uniform acceleration changes velocity linearly with time.", ["Velocity", "Acceleration"]),
  c(0, "Statistics", "Error analysis", "Precision versus accuracy", "distinguishes reproducibility from closeness to truth", ["uses the same definition for both terms", "applies only to genetics", "requires all data to be qualitative"], "Precision is consistency; accuracy is closeness to the true value.", ["Systematic error", "Random error"]),
  c(3, "Psychology", "Learning", "Negative reinforcement", "increases behavior by removing an aversive stimulus", ["decreases behavior by adding punishment", "pairs two neutral stimuli", "requires genetic drift"], "Reinforcement increases behavior; negative means removal.", ["Operant conditioning", "Punishment"]),
  c(3, "Psychology", "Memory", "Procedural memory", "supports learned skills without conscious recall", ["stores exact autobiographical episodes only", "lasts less than one second", "is identical to sensory adaptation"], "Procedural memory is implicit and supports skills and habits.", ["Implicit memory", "Basal ganglia"]),
  c(3, "Psychology", "Sensation", "Response criterion", "reflects willingness to report detecting a signal", ["is the physical minimum stimulus intensity", "equals retinal wavelength", "is unrelated to decision bias"], "Signal detection theory separates sensitivity from decision threshold.", ["Signal detection", "False alarm"]),
  c(3, "Psychology", "Development", "Conservation", "recognizes quantity can remain constant despite appearance changes", ["means objects disappear when hidden", "is the belief that objects are alive", "requires formal operational algebra"], "Conservation is characteristic of concrete operational reasoning.", ["Piaget", "Centration"]),
  c(3, "Psychology", "Emotion", "James-Lange theory", "places physiological arousal before conscious emotion", ["claims emotion and arousal happen independently", "denies bodily responses", "focuses only on social norms"], "James-Lange theory proposes that perception of bodily arousal contributes to emotion.", ["Emotion theories", "Arousal"]),
  c(3, "Psychology", "Attention", "Inattentional blindness", "is failure to notice visible stimuli when attention is elsewhere", ["is memory loss from later information", "is stronger performance in a group", "is a retinal disease by definition"], "Attention determines whether visible information reaches awareness.", ["Selective attention", "Cognitive load"]),
  c(3, "Psychology", "Identity", "Cognitive dissonance", "is discomfort from inconsistency between beliefs and behavior", ["is reduced sensory response after repeated exposure", "is automatic motor memory", "is the same as social facilitation"], "People often reduce dissonance by changing attitudes or justifying behavior.", ["Attitudes", "Self-concept"]),
  c(3, "Sociology", "Social stratification", "Social reproduction", "describes intergenerational persistence of advantage or disadvantage", ["means memories are copied exactly", "is a form of classical conditioning", "eliminates institutional inequality"], "Institutions and resources can maintain stratification across generations.", ["Inequality", "Cultural capital"]),
  c(3, "Sociology", "Norms", "Informal negative sanction", "is unofficial disapproval that discourages behavior", ["is a formal award", "is always a legal penalty", "is a neurotransmitter response"], "Informal sanctions occur through everyday social interactions.", ["Norms", "Deviance"]),
  c(3, "Sociology", "Healthcare disparities", "Social determinants of health", "are social and structural conditions shaping health outcomes", ["are only DNA mutations", "are always randomized treatments", "are irrelevant to access to care"], "Resources, environment, and institutions influence health beyond individual biology.", ["Access to care", "Structural inequality"]),
  c(3, "Research methods", "Validity", "Test-retest reliability", "measures consistency across repeated administrations", ["proves the tool measures the intended construct", "requires random assignment", "is the same as external validity"], "Reliability is consistency of measurement over time or items.", ["Reliability", "Measurement"]),
  c(3, "Research methods", "Sampling", "External validity", "concerns whether findings generalize beyond the study sample", ["means the dependent variable is reliable", "is guaranteed by any sample size", "prevents attrition"], "A narrow or biased sample can limit generalizability.", ["Sampling", "Generalizability"]),
  c(3, "Statistics", "Correlation", "Negative correlation", "means one variable tends to decrease as the other increases", ["proves causation", "means no relationship", "means both variables always increase"], "Correlation describes association, not causation.", ["Correlation coefficient", "Causality"])
];

const calculationGenerators = [
  {
    section: MCAT_SECTIONS[0],
    topic: "Physics",
    subtopic: "Kinematics",
    difficulty: "easy",
    formula: "v = v0 + at",
    make(index) {
      const a = 2 + index % 5;
      const t = 3 + index % 7;
      const answer = a * t;
      return numericQuestion(this, `An object starts from rest and accelerates uniformly at ${a} m/s² for ${t} s. What is its final speed?`, `${answer} m/s`, [`${answer + a} m/s`, `${answer * 2} m/s`, `${Math.max(1, answer - t)} m/s`], "Final speed equals initial speed plus acceleration times time.");
    }
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "General Chemistry",
    subtopic: "Dilution",
    difficulty: "medium",
    formula: "M1V1 = M2V2",
    make(index) {
      const m1 = [1, 2, 4, 5][index % 4];
      const m2 = [0.1, 0.2, 0.5][index % 3];
      const v2 = [100, 250, 500][index % 3];
      const answer = Math.round((m2 * v2) / m1);
      return numericQuestion(this, `What volume of ${m1.toFixed(1)} M stock is needed to prepare ${v2} mL of ${m2.toFixed(2)} M solution?`, `${answer} mL`, [`${answer * 2} mL`, `${Math.max(1, Math.round(answer / 2))} mL`, `${answer + 100} mL`], "Dilution conserves moles of solute.");
    }
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "General Chemistry",
    subtopic: "Acid-base",
    difficulty: "medium",
    formula: "pH = pKa + log([A-]/[HA])",
    make(index) {
      const offset = [1, -1, 0][index % 3];
      const ratios = { 1: "10:1", "-1": "1:10", 0: "1:1" };
      return numericQuestion(this, `A buffer has pH ${offset === 1 ? "one unit above" : offset === -1 ? "one unit below" : "equal to"} its pKa. What is the approximate ratio of conjugate base to acid?`, ratios[offset], ["100:1", "1:100", "2:1"].filter((x) => x !== ratios[offset]).slice(0, 3), "Use the Henderson-Hasselbalch equation to connect pH offset to the base-to-acid ratio.");
    }
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Physiology",
    subtopic: "Renal clearance",
    difficulty: "hard",
    formula: "Clearance = (U x V) / P",
    make(index) {
      const u = [20, 40, 60][index % 3];
      const flow = [1, 2, 3][index % 3];
      const p = [2, 4, 5][index % 3];
      const answer = Math.round((u * flow) / p);
      return numericQuestion(this, `A solute has urine concentration ${u} mg/mL, urine flow ${flow} mL/min, and plasma concentration ${p} mg/mL. What is its clearance?`, `${answer} mL/min`, [`${answer * 2} mL/min`, `${Math.max(1, answer - 5)} mL/min`, `${answer + 20} mL/min`], "Clearance equals urinary excretion rate divided by plasma concentration.");
    }
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "Physics",
    subtopic: "Circuits",
    difficulty: "medium",
    formula: "1/Req = 1/R1 + 1/R2",
    make(index) {
      const pairs = [[6, 3, 2], [4, 4, 2], [10, 10, 5], [12, 6, 4]];
      const [r1, r2, answer] = pairs[index % pairs.length];
      return numericQuestion(this, `A ${r1}-ohm resistor and a ${r2}-ohm resistor are connected in parallel. What is the equivalent resistance?`, `${answer} ohms`, [`${r1 + r2} ohms`, `${Math.abs(r1 - r2) || r1} ohms`, `${answer * 3} ohms`], "Parallel resistors add reciprocally, so equivalent resistance is lower than the smallest branch.");
    }
  }
];

const carsThemes = [
  ["craft", "The author argues that skilled work is less a sudden gift than a disciplined sequence of revisions, constraints, and judgment.", "Mastery depends on iterative judgment rather than effortless inspiration."],
  ["history", "The passage warns that calling events inevitable can erase the local decisions and institutions that made them possible.", "Historical outcomes should be understood as contingent rather than predetermined."],
  ["technology", "The author suggests that tools shape habits, but users and institutions also reshape tools for local purposes.", "Technology and social practice influence one another."],
  ["art", "The passage claims that unfinished studies reveal uncertainty without diminishing the value of completed works.", "Visible process can make excellence more intelligible without cheapening it."],
  ["public debate", "The author rejects judging arguments by speed alone and asks whether a response allows accountability.", "The pace of debate matters because it can support or undermine accountability."],
  ["architecture", "The passage argues that public spaces communicate values through circulation, rest, visibility, and access.", "Built environments can express civic priorities."],
  ["translation", "The author presents translation as an act of fidelity that requires judgment rather than word replacement.", "Faithful translation requires interpretive choices."],
  ["education", "The author argues that assessment should reveal how students reason, not only whether they recall terms.", "Good assessment measures reasoning as well as recall."]
];

function c(sectionIndex, topic, subtopic, concept, correct, distractors, explanation, related = []) {
  return {
    section: MCAT_SECTIONS[sectionIndex],
    topic,
    subtopic,
    concept,
    correct,
    distractors,
    explanation,
    related
  };
}

function hash(text) {
  let value = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    value ^= text.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function shuffleChoices(correct, distractors, seed) {
  const entries = [correct, ...distractors.slice(0, 3)].map((text, index) => ({ text, original: index }));
  entries.sort((a, b) => hash(`${seed}-${a.text}`) - hash(`${seed}-${b.text}`));
  return {
    choices: entries.map((entry, index) => ({ id: letters[index], text: entry.text })),
    correct_answer: letters[entries.findIndex((entry) => entry.original === 0)]
  };
}

function baseQuestion({ id, section, topic, subtopic, difficulty, question_type, stem, correct, distractors, explanation, takeaway, related = [], formulas = [], passage = { title: "", text: "", figures: [], tables: [] } }) {
  const shuffled = shuffleChoices(correct, distractors, id);
  return {
    id,
    section,
    topic,
    subtopic,
    difficulty,
    question_type,
    passage,
    stem,
    choices: shuffled.choices,
    correct_answer: shuffled.correct_answer,
    explanation: {
      short: explanation,
      detailed: `${explanation} This item is original concept-generated practice intended to test MCAT-style reasoning rather than recall of a copied question.`,
      why_correct: `${shuffled.correct_answer} is correct because ${correct}.`,
      wrong_answer_explanations: Object.fromEntries(shuffled.choices.map((choice) => [
        choice.id,
        choice.id === shuffled.correct_answer ? "This matches the tested concept." : "This distractor reflects a common misconception or mismatched concept."
      ])),
      high_yield_takeaway: takeaway,
      common_trap: "Do not answer by keyword matching; identify the mechanism, variable, or reasoning relationship.",
      how_to_think: "Name the concept, predict the expected relationship, then eliminate choices that reverse or overstate it.",
      related_concepts: related,
      formulas,
      step_by_step_solution: `1. Identify ${subtopic}. 2. State the expected relationship. 3. Compare each choice to the prediction.`
    },
    tags: [topic, subtopic, question_type, "bulk-original"],
    estimated_time_seconds: question_type === "cars" ? 100 : question_type === "calculation" ? 90 : 75,
    source: {
      source_type: "original",
      source_url: "",
      license: "Original generated content for Project 528",
      attribution: "Project 528 original concept generator",
      source_notes: "Generated from internal high-yield concept templates; not copied or paraphrased from third-party MCAT question banks."
    },
    review: {
      status: "approved",
      reviewer_notes: "Auto-generated original concept item; validated by schema tests. Human content QA recommended before high-stakes use.",
      created_at: now,
      updated_at: now
    }
  };
}

function conceptQuestion(concept, index) {
  const scenario = scenarios[index % scenarios.length];
  const type = ["discrete", "passage", "data_interpretation", "experimental_design"][index % 4];
  const passage = type === "passage" || type === "data_interpretation" || type === "experimental_design"
    ? {
        title: `${concept.concept} Scenario`,
        text: `In ${scenario}, a learner must apply ${concept.concept} to distinguish a supported mechanism from plausible but incorrect alternatives. The setup asks for the best interpretation of ${concept.subtopic}.`,
        figures: [],
        tables: []
      }
    : { title: "", text: "", figures: [], tables: [] };
  return baseQuestion({
    id: `bulk-${String(index + 1).padStart(5, "0")}`,
    section: concept.section,
    topic: concept.topic,
    subtopic: concept.subtopic,
    difficulty: ["easy", "medium", "hard"][index % 3],
    question_type: type,
    passage,
    stem: `In ${scenario}, which statement best applies ${concept.concept}?`,
    correct: `${concept.concept} ${concept.correct}`,
    distractors: concept.distractors.map((distractor) => `${concept.concept} ${distractor}`),
    explanation: concept.explanation,
    takeaway: `${concept.concept}: ${concept.correct}.`,
    related: concept.related
  });
}

function numericQuestion(template, stem, correct, distractors, explanation) {
  return { template, stem, correct, distractors, explanation };
}

function calculationQuestion(index) {
  const generator = calculationGenerators[index % calculationGenerators.length];
  return calculationQuestionFromGenerator(generator, index);
}

function calculationQuestionForSection(section, index) {
  const options = calculationGenerators.filter((generator) => generator.section === section);
  if (!options.length) return null;
  const generator = options[index % options.length];
  return calculationQuestionFromGenerator(generator, index);
}

function calculationQuestionFromGenerator(generator, index) {
  const made = generator.make(index);
  return baseQuestion({
    id: `calc-${String(index + 1).padStart(5, "0")}`,
    section: generator.section,
    topic: generator.topic,
    subtopic: generator.subtopic,
    difficulty: generator.difficulty,
    question_type: "calculation",
    stem: made.stem,
    correct: made.correct,
    distractors: made.distractors,
    explanation: made.explanation,
    takeaway: `Use ${generator.formula} when the variables match the setup.`,
    related: [generator.subtopic, generator.topic],
    formulas: [generator.formula]
  });
}

function carsQuestion(index) {
  const [theme, passagePoint, mainIdea] = carsThemes[index % carsThemes.length];
  const contrast = [
    "The author does not reject the opposing view entirely, but limits its scope.",
    "The passage turns on a contrast between surface appearance and underlying process.",
    "The author favors a qualified position rather than an extreme conclusion.",
    "The passage asks readers to notice what a common explanation leaves out."
  ][index % 4];
  return baseQuestion({
    id: `cars-${String(index + 1).padStart(5, "0")}`,
    section: MCAT_SECTIONS[1],
    topic: "CARS reasoning",
    subtopic: ["Main idea", "Inference", "Function", "Tone"][index % 4],
    difficulty: ["medium", "medium", "hard"][index % 3],
    question_type: "cars",
    passage: {
      title: `CARS Original Passage ${index + 1}`,
      text: `${passagePoint} ${contrast} This gives the discussion of ${theme} a measured tone, since the author is less interested in winning a slogan than in clarifying how judgment should be made.`,
      figures: [],
      tables: []
    },
    stem: ["Which statement best captures the main idea?", "Which inference is best supported by the passage?", "The author's tone is best described as:", "The contrast in the passage mainly functions to:"][index % 4],
    correct: mainIdea,
    distractors: [
      `The author believes ${theme} can be explained by one simple rule in every case.`,
      `The author rejects all disagreement about ${theme} as irrational.`,
      `The passage is mainly a technical manual for measuring ${theme}.`
    ],
    explanation: "The correct answer preserves the author's qualified central claim without adding an extreme or unsupported conclusion.",
    takeaway: "CARS answers should match scope, tone, and logical function.",
    related: ["Main idea", "Inference", "Author tone"]
  });
}

const questions = [...createDemoQuestions()];
const sectionTargets = buildSectionTargets(targetCount);
const sectionCounts = countBySection(questions);
let bulkIndex = 0;
let calcIndex = 0;
let carsIndex = 0;

for (const section of MCAT_SECTIONS) {
  const target = sectionTargets[section];
  const concepts = conceptBank.filter((concept) => concept.section === section);
  let localIndex = 0;
  while ((sectionCounts[section] || 0) < target && questions.length < targetCount) {
    if (section === MCAT_SECTIONS[1]) {
      questions.push(carsQuestion(carsIndex++));
    } else {
      const slot = localIndex % 10;
      const calc = slot === 0 || slot === 5 ? calculationQuestionForSection(section, calcIndex++) : null;
      if (calc) {
        questions.push(calc);
      } else {
        const concept = concepts[bulkIndex % concepts.length] || conceptBank[bulkIndex % conceptBank.length];
        questions.push(conceptQuestion(concept, bulkIndex));
        bulkIndex += 1;
      }
    }
    sectionCounts[section] = (sectionCounts[section] || 0) + 1;
    localIndex += 1;
  }
}

while (questions.length < targetCount) {
  questions.push(carsQuestion(carsIndex++));
}

writeShardedBank(questions, shardSize);
console.log(`Generated ${questions.length} questions.`);
console.log(JSON.stringify(questions.reduce((acc, question) => {
  acc[question.section] = (acc[question.section] || 0) + 1;
  return acc;
}, {}), null, 2));

function buildSectionTargets(total) {
  const weights = {
    [MCAT_SECTIONS[0]]: 59,
    [MCAT_SECTIONS[1]]: 53,
    [MCAT_SECTIONS[2]]: 59,
    [MCAT_SECTIONS[3]]: 59
  };
  const weightTotal = Object.values(weights).reduce((sum, value) => sum + value, 0);
  const targets = Object.fromEntries(MCAT_SECTIONS.map((section) => [section, Math.floor((total * weights[section]) / weightTotal)]));
  let assigned = Object.values(targets).reduce((sum, value) => sum + value, 0);
  for (const section of MCAT_SECTIONS) {
    if (assigned >= total) break;
    targets[section] += 1;
    assigned += 1;
  }
  return targets;
}

function countBySection(items) {
  return items.reduce((acc, question) => {
    acc[question.section] = (acc[question.section] || 0) + 1;
    return acc;
  }, {});
}

function writeShardedBank(items, size) {
  const outputDir = "data/questions";
  rmSync(outputDir, { recursive: true, force: true });
  mkdirSync(outputDir, { recursive: true });

  const shards = [];
  for (let index = 0; index < items.length; index += size) {
    const chunk = items.slice(index, index + size);
    const shardIndex = Math.floor(index / size) + 1;
    const file = `questions-${String(shardIndex).padStart(3, "0")}.json`;
    writeFileSync(`${outputDir}/${file}`, `${JSON.stringify(chunk)}\n`);
    shards.push({
      file,
      count: chunk.length,
      first_id: chunk[0]?.id || "",
      last_id: chunk.at(-1)?.id || ""
    });
  }

  const manifest = {
    generated_at: now,
    total_questions: items.length,
    shard_size: size,
    shards
  };
  writeFileSync(`${outputDir}/manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`);
  writeFileSync("data/sample_questions.json", `${JSON.stringify({
    note: "The deployable question bank is sharded in data/questions/. This placeholder keeps each repository file below GitHub's normal file-size limit.",
    manifest: "data/questions/manifest.json",
    total_questions: items.length,
    generated_at: now
  }, null, 2)}\n`);
  writeFileSync("js/generatedQuestionBank.js", "export const GENERATED_QUESTIONS = [];\n");
}
