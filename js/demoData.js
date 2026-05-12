export const MCAT_SECTIONS = [
  "Chemical and Physical Foundations of Biological Systems",
  "Critical Analysis and Reasoning Skills",
  "Biological and Biochemical Foundations of Living Systems",
  "Psychological, Social, and Biological Foundations of Behavior"
];

export const TOPICS = {
  "Chemical and Physical Foundations of Biological Systems": [
    "General Chemistry",
    "Organic Chemistry",
    "Physics",
    "Biochemistry",
    "Statistics",
    "Experimental design",
    "Data interpretation"
  ],
  "Critical Analysis and Reasoning Skills": [
    "CARS reasoning",
    "Passage analysis",
    "Argument structure",
    "Inference"
  ],
  "Biological and Biochemical Foundations of Living Systems": [
    "Biology",
    "Biochemistry",
    "Genetics",
    "Cell biology",
    "Physiology",
    "Research methods"
  ],
  "Psychological, Social, and Biological Foundations of Behavior": [
    "Psychology",
    "Sociology",
    "Research methods",
    "Statistics",
    "Behavior",
    "Social structures"
  ]
};

const now = new Date().toISOString();

function choiceSet(correct, distractors) {
  return [correct, ...distractors].map((text, index) => ({
    id: ["A", "B", "C", "D"][index],
    text
  }));
}

function makeQuestion(seed, index) {
  const correctId = "A";
  return {
    id: seed.id || `demo-${String(index + 1).padStart(3, "0")}`,
    section: seed.section,
    topic: seed.topic,
    subtopic: seed.subtopic,
    difficulty: seed.difficulty || "medium",
    question_type: seed.question_type || "discrete",
    passage: seed.passage || { title: "", text: "", figures: [], tables: [] },
    stem: seed.stem,
    choices: choiceSet(seed.correct, seed.distractors),
    correct_answer: correctId,
    explanation: {
      short: seed.short,
      detailed: seed.detailed,
      why_correct: `A is correct because ${seed.why}`,
      wrong_answer_explanations: {
        A: seed.why,
        B: seed.wrong?.[0] || "This choice describes a related idea but does not answer the stem.",
        C: seed.wrong?.[1] || "This choice confuses the direction or mechanism tested.",
        D: seed.wrong?.[2] || "This choice is not supported by the passage or concept."
      },
      high_yield_takeaway: seed.takeaway,
      common_trap: seed.trap || "Do not match vocabulary alone; identify the tested mechanism.",
      how_to_think: seed.thinking || "Name the concept, predict the answer, then compare each option to that prediction.",
      related_concepts: seed.related || [seed.topic, seed.subtopic],
      formulas: seed.formulas || [],
      step_by_step_solution: seed.steps || seed.detailed
    },
    tags: seed.tags || [seed.topic, seed.subtopic, seed.question_type || "discrete"],
    estimated_time_seconds: seed.time || 90,
    source: {
      source_type: "original",
      source_url: "",
      license: "Original demo content generated for this local app",
      attribution: "Project 528 demo bank",
      source_notes: "Original teaching question; not copied or paraphrased from a third-party question bank."
    },
    review: {
      status: "approved",
      reviewer_notes: "Demo seed question.",
      created_at: now,
      updated_at: now
    }
  };
}

const bioSeeds = [
  {
    section: MCAT_SECTIONS[2],
    topic: "Biochemistry",
    subtopic: "Enzyme kinetics",
    difficulty: "medium",
    question_type: "data_interpretation",
    stem: "An enzyme is tested with and without an inhibitor. Vmax is unchanged, but the apparent Km increases. Which inhibition pattern is most consistent with these observations?",
    correct: "Competitive inhibition",
    distractors: ["Noncompetitive inhibition", "Uncompetitive inhibition", "Irreversible covalent inhibition"],
    short: "Competitive inhibitors increase apparent Km without changing Vmax.",
    detailed: "If enough substrate is added, substrate can outcompete a competitive inhibitor, so the maximal rate can still be reached. More substrate is required to reach half-maximal velocity, which appears as an increased Km.",
    why: "the inhibitor competes with substrate at the active site and can be overcome by high substrate concentration.",
    takeaway: "Competitive inhibition: Km increases, Vmax is unchanged.",
    formulas: ["v = Vmax[S] / (Km + [S])"],
    related: ["Michaelis-Menten kinetics", "Active site", "Lineweaver-Burk plots"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Biology",
    subtopic: "Membrane transport",
    difficulty: "easy",
    stem: "A red blood cell is placed in a hypertonic solution. What is the most likely immediate effect?",
    correct: "Water leaves the cell and the cell shrinks",
    distractors: ["Water enters the cell and the cell swells", "Solute leaves the cell until osmolarity matches", "The membrane actively pumps water inward"],
    short: "Water moves toward the higher effective solute concentration.",
    detailed: "A hypertonic extracellular environment has a higher effective osmolarity than the cytosol. Water exits the cell by osmosis, causing crenation or shrinkage.",
    why: "osmosis drives water from lower effective solute concentration toward higher effective solute concentration.",
    takeaway: "Hypertonic outside means water exits the cell.",
    related: ["Osmosis", "Tonicity", "Aquaporins"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Genetics",
    subtopic: "Transcription",
    difficulty: "medium",
    stem: "A mutation disrupts the promoter of a protein-coding gene. Which direct effect is most likely?",
    correct: "Reduced recruitment of RNA polymerase to the gene",
    distractors: ["Premature termination of the polypeptide", "Failure of tRNA charging", "Increased ribosomal translocation"],
    short: "Promoters help initiate transcription.",
    detailed: "Promoter sequences are binding sites for transcription machinery. A promoter mutation is most likely to alter initiation of RNA synthesis rather than translation elongation or aminoacyl-tRNA formation.",
    why: "promoters regulate transcription initiation by helping recruit transcription factors and RNA polymerase.",
    takeaway: "Promoter problems are transcription-initiation problems.",
    related: ["RNA polymerase", "Gene regulation", "Transcription factors"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Physiology",
    subtopic: "Renal filtration",
    difficulty: "hard",
    stem: "A freely filtered molecule has a clearance greater than the glomerular filtration rate. What must be true?",
    correct: "The molecule undergoes net tubular secretion",
    distractors: ["The molecule is completely reabsorbed", "The molecule is protein-bound and not filtered", "The molecule lowers hydrostatic pressure in Bowman's space"],
    short: "Clearance above GFR implies secretion adds material to the filtrate.",
    detailed: "For a freely filtered substance, clearance equals GFR if it is neither reabsorbed nor secreted. Clearance greater than GFR indicates that additional solute entered the tubule by secretion.",
    why: "secretion increases urinary excretion beyond filtration alone.",
    takeaway: "Clearance > GFR means net secretion.",
    formulas: ["Clearance = (urine concentration x urine flow) / plasma concentration"],
    related: ["GFR", "PAH", "Tubular reabsorption"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Cell biology",
    subtopic: "Signal transduction",
    difficulty: "medium",
    stem: "A ligand activates a Gs-coupled receptor in a target cell. Which second messenger change is expected?",
    correct: "Increased cAMP production",
    distractors: ["Decreased adenylate cyclase activity", "Direct opening of nuclear pores", "Increased degradation of peptide bonds"],
    short: "Gs stimulates adenylate cyclase, raising cAMP.",
    detailed: "The stimulatory G protein alpha subunit activates adenylate cyclase, which converts ATP to cAMP. cAMP can then activate protein kinase A.",
    why: "Gs signaling stimulates adenylate cyclase and increases intracellular cAMP.",
    takeaway: "Gs goes up: adenylate cyclase and cAMP rise.",
    related: ["GPCRs", "Adenylate cyclase", "Protein kinase A"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Biochemistry",
    subtopic: "Amino acids",
    difficulty: "easy",
    stem: "Which amino acid side chain is most likely to be positively charged at physiological pH?",
    correct: "Lysine",
    distractors: ["Aspartate", "Serine", "Phenylalanine"],
    short: "Lysine has a basic side chain.",
    detailed: "Lysine contains an amino group in its side chain that is typically protonated near physiological pH, making it positively charged.",
    why: "lysine's basic side chain is usually protonated under physiological conditions.",
    takeaway: "Basic residues: lysine, arginine, and often histidine.",
    related: ["Amino acid properties", "pKa", "Protein structure"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Biology",
    subtopic: "Mitosis",
    difficulty: "easy",
    stem: "During which phase of mitosis do sister chromatids separate and move toward opposite poles?",
    correct: "Anaphase",
    distractors: ["Prophase", "Metaphase", "Telophase"],
    short: "Sister chromatids separate in anaphase.",
    detailed: "In anaphase, cohesin is cleaved and microtubules pull sister chromatids toward opposite spindle poles.",
    why: "anaphase is defined by separation of sister chromatids.",
    takeaway: "Metaphase aligns; anaphase separates.",
    related: ["Cell cycle", "Spindle", "Chromatids"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Biochemistry",
    subtopic: "Metabolism",
    difficulty: "medium",
    stem: "A cell with low ATP and high AMP activates AMP-activated protein kinase. Which process is most likely increased?",
    correct: "Fatty acid oxidation",
    distractors: ["Fatty acid synthesis", "Glycogen synthesis", "Protein translation initiation"],
    short: "AMPK promotes catabolic ATP-generating pathways.",
    detailed: "AMPK senses low-energy states and shifts metabolism toward ATP production while suppressing energy-consuming anabolic pathways.",
    why: "fatty acid oxidation is a catabolic pathway that helps restore ATP.",
    takeaway: "AMPK turns on energy-producing pathways and turns down biosynthesis.",
    related: ["Energy charge", "Catabolism", "Anabolism"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Research methods",
    subtopic: "Controls",
    difficulty: "medium",
    question_type: "experimental_design",
    stem: "Researchers test whether a growth factor increases cell proliferation. Which condition is the best negative control?",
    correct: "Cells treated identically except without growth factor",
    distractors: ["Cells treated with a known mitogen", "Cells from a different species grown in another medium", "Cells exposed to growth factor and an unrelated drug"],
    short: "A negative control omits the independent variable while preserving other conditions.",
    detailed: "The best negative control differs only by absence of the growth factor. This isolates the effect of the independent variable.",
    why: "it controls for handling, media, and incubation without adding the tested factor.",
    takeaway: "Good controls change one thing at a time.",
    related: ["Negative controls", "Independent variables", "Cell culture"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Physiology",
    subtopic: "Cardiovascular",
    difficulty: "hard",
    stem: "An increase in total peripheral resistance with unchanged cardiac output most directly increases which variable?",
    correct: "Mean arterial pressure",
    distractors: ["Venous compliance", "Pulmonary residual volume", "Alveolar oxygen diffusion distance"],
    short: "MAP depends on cardiac output and total peripheral resistance.",
    detailed: "Mean arterial pressure is approximated by cardiac output multiplied by total peripheral resistance plus central venous pressure. If cardiac output is unchanged, increasing resistance increases MAP.",
    why: "MAP rises when resistance rises at a given flow.",
    takeaway: "MAP is driven by flow times resistance.",
    formulas: ["MAP ≈ CO x TPR"],
    related: ["Hemodynamics", "Blood pressure", "Cardiac output"]
  }
];

const chemSeeds = [
  {
    section: MCAT_SECTIONS[0],
    topic: "General Chemistry",
    subtopic: "Acid-base",
    difficulty: "medium",
    question_type: "calculation",
    stem: "A weak acid has pKa = 4.8. At pH 5.8, what is the approximate ratio of conjugate base to acid?",
    correct: "10:1",
    distractors: ["1:10", "1:1", "100:1"],
    short: "One pH unit above pKa means tenfold more conjugate base.",
    detailed: "Using Henderson-Hasselbalch, pH = pKa + log(A-/HA). A pH one unit above pKa gives log(A-/HA) = 1, so A-/HA = 10.",
    why: "the Henderson-Hasselbalch relationship gives a tenfold base-to-acid ratio.",
    takeaway: "At pH = pKa + 1, conjugate base:acid is 10:1.",
    formulas: ["pH = pKa + log([A-]/[HA])"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "Physics",
    subtopic: "Circuits",
    difficulty: "medium",
    question_type: "calculation",
    stem: "A 6-ohm and 3-ohm resistor are connected in parallel. What is the equivalent resistance?",
    correct: "2 ohms",
    distractors: ["9 ohms", "4.5 ohms", "1 ohm"],
    short: "Parallel resistances add reciprocally.",
    detailed: "1/Req = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2, so Req = 2 ohms.",
    why: "parallel circuits provide multiple current paths, lowering equivalent resistance.",
    takeaway: "Equivalent resistance in parallel is smaller than the smallest branch.",
    formulas: ["1/Req = 1/R1 + 1/R2"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "Organic Chemistry",
    subtopic: "Carbonyl chemistry",
    difficulty: "medium",
    stem: "Which reagent would reduce an aldehyde to a primary alcohol under standard MCAT conditions?",
    correct: "NaBH4",
    distractors: ["PCC", "H2CrO4", "Br2 in water"],
    short: "Sodium borohydride reduces aldehydes and ketones.",
    detailed: "NaBH4 delivers hydride to the carbonyl carbon, converting aldehydes to primary alcohols after protonation.",
    why: "NaBH4 is a mild hydride reducing agent for aldehydes and ketones.",
    takeaway: "NaBH4 reduces aldehydes to primary alcohols.",
    related: ["Hydride reduction", "Carbonyls", "Oxidation states"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "Physics",
    subtopic: "Fluids",
    difficulty: "hard",
    stem: "If the radius of a blood vessel is halved while other variables remain constant, how does resistance change according to Poiseuille's law?",
    correct: "It increases by a factor of 16",
    distractors: ["It increases by a factor of 2", "It decreases by a factor of 4", "It remains unchanged"],
    short: "Resistance varies inversely with radius to the fourth power.",
    detailed: "Poiseuille resistance is proportional to 1/r^4. Halving radius gives 1/(1/2)^4 = 16 times the original resistance.",
    why: "small radius changes strongly affect laminar-flow resistance.",
    takeaway: "Radius is the high-leverage variable in Poiseuille flow.",
    formulas: ["R = 8ηL / (πr^4)"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "General Chemistry",
    subtopic: "Thermodynamics",
    difficulty: "medium",
    stem: "A reaction has negative ΔH and negative ΔS. At which temperature range is it most likely spontaneous?",
    correct: "Low temperature",
    distractors: ["High temperature", "All temperatures", "No temperatures"],
    short: "Negative enthalpy helps; negative entropy hurts more at high temperature.",
    detailed: "ΔG = ΔH - TΔS. When ΔH is negative and ΔS is negative, the -TΔS term is positive. Low temperature minimizes that unfavorable term.",
    why: "the favorable negative ΔH dominates when T is small.",
    takeaway: "Negative ΔH and negative ΔS favors low-temperature spontaneity.",
    formulas: ["ΔG = ΔH - TΔS"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "Biochemistry",
    subtopic: "Separations",
    difficulty: "medium",
    stem: "In SDS-PAGE, proteins are primarily separated by which property?",
    correct: "Molecular mass",
    distractors: ["Native charge", "Isoelectric point", "Ligand-binding affinity"],
    short: "SDS masks native charge and gives proteins similar charge-to-mass ratios.",
    detailed: "SDS denatures proteins and coats them with negative charge, so migration mostly reflects size. Smaller proteins travel farther through the gel.",
    why: "SDS reduces charge differences, leaving mass as the main determinant.",
    takeaway: "SDS-PAGE separates mostly by size.",
    related: ["Gel electrophoresis", "Western blot", "Protein denaturation"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "General Chemistry",
    subtopic: "Equilibrium",
    difficulty: "easy",
    stem: "Adding product to a reversible reaction at equilibrium will initially shift the reaction in which direction?",
    correct: "Toward reactants",
    distractors: ["Toward products", "No shift occurs", "Only the catalyst concentration changes"],
    short: "Le Chatelier's principle predicts a shift away from added product.",
    detailed: "A system disturbed by added product responds by consuming some product, shifting the reaction toward reactants until a new equilibrium is reached.",
    why: "the reaction quotient temporarily exceeds K, favoring reverse reaction.",
    takeaway: "Equilibrium shifts oppose disturbances.",
    related: ["Le Chatelier's principle", "Reaction quotient", "Equilibrium constant"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "Physics",
    subtopic: "Optics",
    difficulty: "medium",
    stem: "A converging lens forms a real image. Which statement about that image is always true?",
    correct: "It is inverted relative to the object",
    distractors: ["It is virtual", "It is on the same side as the object", "It must be smaller than the object"],
    short: "Real images from a single converging lens are inverted.",
    detailed: "For a real image, light rays actually converge on the opposite side of the lens. The image is inverted; magnification depends on object distance.",
    why: "ray crossing after the lens produces an inverted real image.",
    takeaway: "Real lens images are inverted; virtual images are upright.",
    formulas: ["1/f = 1/o + 1/i"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "Organic Chemistry",
    subtopic: "Stereochemistry",
    difficulty: "hard",
    stem: "Two molecules have the same connectivity and opposite configuration at every chiral center. What is their relationship?",
    correct: "Enantiomers",
    distractors: ["Diastereomers", "Constitutional isomers", "Identical compounds"],
    short: "Opposite configuration at every stereocenter indicates enantiomers.",
    detailed: "Enantiomers are non-superimposable mirror images. For molecules with multiple stereocenters, inversion at all stereocenters gives the enantiomer.",
    why: "complete stereochemical inversion creates mirror-image pairs.",
    takeaway: "All centers inverted: enantiomers. Some but not all: diastereomers.",
    related: ["Chirality", "R/S configuration", "Stereoisomers"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "Statistics",
    subtopic: "Error analysis",
    difficulty: "medium",
    question_type: "data_interpretation",
    stem: "A measurement method gives values consistently 12% higher than the known standard but has low scatter. Which description is best?",
    correct: "High precision but low accuracy",
    distractors: ["High accuracy but low precision", "High accuracy and high precision", "Low accuracy and low precision"],
    short: "Consistent bias reduces accuracy while tight clustering indicates precision.",
    detailed: "Precision describes reproducibility; accuracy describes closeness to the true value. A consistent offset is systematic error.",
    why: "the measurements cluster together but away from the true value.",
    takeaway: "Precision is tightness; accuracy is truth.",
    related: ["Systematic error", "Random error", "Validity"]
  }
];

const psychSeeds = [
  {
    section: MCAT_SECTIONS[3],
    topic: "Psychology",
    subtopic: "Learning",
    difficulty: "easy",
    stem: "A student studies because completing each assignment removes an annoying reminder notification. Which learning principle is illustrated?",
    correct: "Negative reinforcement",
    distractors: ["Positive punishment", "Extinction", "Classical conditioning"],
    short: "Negative reinforcement increases behavior by removing an aversive stimulus.",
    detailed: "The behavior increases because an unpleasant reminder is removed. Reinforcement increases behavior; negative means removal.",
    why: "the removal of the notification strengthens assignment completion.",
    takeaway: "Negative reinforcement is not punishment; it increases behavior by removing something aversive.",
    related: ["Operant conditioning", "Reinforcement", "Punishment"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Sociology",
    subtopic: "Social stratification",
    difficulty: "medium",
    stem: "A study links neighborhood resources, school quality, and health outcomes across generations. Which sociological concept is most directly implicated?",
    correct: "Social reproduction",
    distractors: ["Group polarization", "Bystander effect", "Role strain"],
    short: "Social reproduction describes persistence of advantage or disadvantage across generations.",
    detailed: "Unequal access to institutions and resources can reproduce class and health differences over time.",
    why: "the scenario describes intergenerational maintenance of social inequality.",
    takeaway: "Social reproduction explains how inequality persists through institutions.",
    related: ["Stratification", "Cultural capital", "Social mobility"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Psychology",
    subtopic: "Memory",
    difficulty: "medium",
    stem: "A patient can learn a mirror-tracing task but cannot remember practicing it. Which memory system is relatively preserved?",
    correct: "Implicit procedural memory",
    distractors: ["Episodic memory", "Semantic memory", "Iconic memory"],
    short: "Skill learning without conscious recall reflects procedural memory.",
    detailed: "Procedural memory supports learned motor and cognitive skills and can remain intact despite impaired explicit recall.",
    why: "the patient improves on a skill despite lacking conscious memory of training.",
    takeaway: "Procedural memory is implicit skill memory.",
    related: ["Hippocampus", "Basal ganglia", "Amnesia"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Research methods",
    subtopic: "Study design",
    difficulty: "medium",
    stem: "Researchers randomly assign participants to a mindfulness program or waitlist control. What is the main advantage of random assignment?",
    correct: "It reduces baseline differences between groups",
    distractors: ["It guarantees a double-blind design", "It prevents all attrition", "It converts correlation into measurement reliability"],
    short: "Random assignment helps balance confounders.",
    detailed: "Random assignment makes treatment and control groups more comparable at baseline, supporting causal inference.",
    why: "known and unknown participant characteristics are more likely to be distributed across groups.",
    takeaway: "Random assignment supports causal inference by reducing confounding.",
    related: ["Experiments", "Confounding", "Internal validity"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Psychology",
    subtopic: "Sensation",
    difficulty: "hard",
    stem: "According to signal detection theory, a radiologist who becomes more willing to call a scan positive will most directly change which parameter?",
    correct: "Response criterion",
    distractors: ["Absolute threshold", "Weber fraction", "Sensory adaptation rate"],
    short: "Willingness to say signal is present reflects criterion.",
    detailed: "Signal detection theory separates sensitivity from decision threshold. A liberal or conservative bias changes the response criterion.",
    why: "the radiologist's decision rule changes, not necessarily perceptual sensitivity.",
    takeaway: "Criterion is decision bias; sensitivity is discriminability.",
    related: ["Hits", "False alarms", "d prime"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Sociology",
    subtopic: "Norms",
    difficulty: "easy",
    stem: "A person receives disapproving looks for speaking loudly in a quiet library. What type of social control is this?",
    correct: "Informal negative sanction",
    distractors: ["Formal positive sanction", "Formal negative sanction", "Role exit"],
    short: "Disapproval from others is an informal negative sanction.",
    detailed: "Informal sanctions arise from everyday social interactions rather than official institutions. Negative sanctions discourage behavior.",
    why: "the disapproving looks are unofficial social penalties.",
    takeaway: "Informal sanctions come from social interactions, not formal rules.",
    related: ["Norms", "Sanctions", "Deviance"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Psychology",
    subtopic: "Development",
    difficulty: "medium",
    stem: "A child understands that liquid poured into a wider glass is still the same amount. Which Piagetian ability is demonstrated?",
    correct: "Conservation",
    distractors: ["Object permanence", "Centration", "Animism"],
    short: "Conservation is understanding that quantity can remain stable despite appearance changes.",
    detailed: "The child recognizes that changing container shape does not necessarily alter volume, a hallmark of concrete operational thinking.",
    why: "the child understands quantity remains constant despite perceptual transformation.",
    takeaway: "Conservation emerges in concrete operational reasoning.",
    related: ["Piaget", "Concrete operational stage", "Centration"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Statistics",
    subtopic: "Correlation",
    difficulty: "medium",
    stem: "A correlation coefficient of -0.82 between sleep debt and test performance indicates what?",
    correct: "A strong negative association",
    distractors: ["A weak positive association", "No association", "Proof that sleep debt causes lower scores"],
    short: "The sign gives direction; magnitude gives strength.",
    detailed: "A value near -1 indicates a strong inverse relationship. Correlation alone does not prove causation.",
    why: "as one variable tends to increase, the other tends to decrease strongly.",
    takeaway: "Correlation strength is magnitude; causality requires design and controls.",
    related: ["Correlation", "Causation", "Scatterplots"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Psychology",
    subtopic: "Motivation",
    difficulty: "medium",
    stem: "A runner continues training because running fits her identity and personal goals. Which motivation type best describes this?",
    correct: "Intrinsic motivation",
    distractors: ["External regulation", "Negative punishment", "Fixed-ratio reinforcement"],
    short: "Intrinsic motivation comes from internal satisfaction and values.",
    detailed: "The behavior is sustained by personal meaning rather than an external reward or punishment schedule.",
    why: "the reason for behavior is internally valued and self-endorsed.",
    takeaway: "Intrinsic motivation is driven by internal value or enjoyment.",
    related: ["Self-determination theory", "Motivation", "Identity"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Sociology",
    subtopic: "Demographics",
    difficulty: "hard",
    stem: "A country moves from high birth and death rates to low birth and death rates as it industrializes. Which model describes this pattern?",
    correct: "Demographic transition model",
    distractors: ["Epidemiologic triad", "Social constructionism", "Exchange-rational choice model"],
    short: "The demographic transition model links industrialization with changing birth and death rates.",
    detailed: "As societies industrialize, mortality tends to fall first, followed by fertility, changing population growth patterns.",
    why: "the scenario tracks population changes associated with modernization.",
    takeaway: "Demographic transition: high-high to low-low birth and death rates.",
    related: ["Population pyramids", "Fertility", "Mortality"]
  }
];

const carsPassages = [
  "An architect argued that public buildings should invite lingering rather than merely direct traffic. In her view, stairs, benches, and windows shape civic behavior because they tell visitors whether they are welcome to pause. Critics replied that efficiency is itself a public good, especially in crowded institutions. The debate reveals a tension between movement and belonging: a building can move people quickly while still making them feel incidental.",
  "A historian of technology cautioned against treating inventions as inevitable. Many devices that now appear obvious depended on local habits, materials, and institutional incentives. To say that a technology was bound to emerge is often to erase the ordinary negotiations that made it useful. The historian's target was not progress, but the lazy storytelling that turns uncertain events into destiny.",
  "A novelist described revision as an ethical practice. Early drafts, she said, often flatten characters into functions. Revising forces the writer to ask what each person in the story can see that the narrator cannot. A polished sentence matters, but only when it allows a more honest relation among the voices in the work.",
  "A museum curator defended displaying unfinished studies next to famous paintings. Viewers often assume mastery arrives fully formed, but sketches reveal hesitation, correction, and abandoned alternatives. The curator believed that seeing process makes excellence less mystical without making it less impressive.",
  "An essayist claimed that boredom has been unfairly maligned. In a culture that treats attention as a resource to be harvested, boredom may protect the mind from constant capture. The point was not that boredom is pleasant, but that it can create a clearing in which unplanned thought becomes possible."
];

const carsSeeds = carsPassages.map((text, index) => ({
  section: MCAT_SECTIONS[1],
  topic: "CARS reasoning",
  subtopic: index % 2 ? "Inference" : "Passage analysis",
  difficulty: index > 2 ? "hard" : "medium",
  question_type: "cars",
  passage: { title: `CARS Passage ${index + 1}`, text, figures: [], tables: [] },
  stem: [
    "Which statement best captures the author's central claim?",
    "The author's attitude toward inevitability in historical explanation is best described as:",
    "The passage suggests that revision is valuable mainly because it:",
    "The curator's view most strongly implies that unfinished studies:",
    "The author would most likely agree that boredom can:"
  ][index],
  correct: [
    "Design can influence whether public spaces communicate belonging as well as efficiency.",
    "Skeptical, because it can obscure the contingent work behind technological adoption.",
    "Expands the writer's awareness of perspectives inside the work.",
    "Reveal the disciplined uncertainty behind artistic achievement.",
    "Create mental space that resists constant external capture."
  ][index],
  distractors: [
    ["Efficiency should be rejected in all public architecture.", "Aesthetic beauty is more important than civic function.", "Crowded institutions cannot make visitors feel welcome."],
    ["Enthusiastic, because inevitability proves that progress is reliable.", "Neutral, because inevitability is unrelated to technology.", "Dismissive of all technological development."],
    ["Eliminates ambiguity from every character.", "Makes sentence-level polish irrelevant.", "Ensures that the narrator dominates the story."],
    ["Diminish the value of completed masterpieces.", "Prove that artistic talent is mostly accidental.", "Should replace finished paintings in museums."],
    ["Guarantee productive creativity.", "Function only as a failure of attention.", "Eliminate the need for deliberate focus."]
  ][index],
  short: "The correct answer follows the passage's main reasoning rather than a single phrase.",
  detailed: "CARS items reward tracking the author's purpose, qualifications, and contrast structure. The correct choice preserves the passage's nuance without overextending it.",
  why: "it captures the author's claim while avoiding extreme or unsupported language.",
  takeaway: "For CARS, choose the answer that matches the author's scope and tone.",
  trap: "Extreme answer choices often sound decisive but outrun the passage."
}));

const expSeeds = [
  {
    section: MCAT_SECTIONS[0],
    topic: "Experimental design",
    subtopic: "Enzyme assay",
    difficulty: "hard",
    question_type: "experimental_design",
    passage: {
      title: "Kinase Assay",
      text: "A kinase is incubated with substrate peptide and ATP. Product formation is measured every minute for five minutes. A mutant kinase shows product formation of 2, 4, 6, 8, and 10 nmol. The wild-type enzyme shows 5, 10, 15, 20, and 25 nmol under identical conditions.",
      figures: [],
      tables: [{ title: "Product formation", columns: ["Minute", "Mutant", "Wild-type"], rows: [["1", "2", "5"], ["2", "4", "10"], ["3", "6", "15"], ["4", "8", "20"], ["5", "10", "25"]] }]
    },
    stem: "Which conclusion is best supported by the data?",
    correct: "The mutant has a lower initial reaction rate than wild type",
    distractors: ["The mutant reaches a higher Vmax", "The assay cannot compare rates because time is measured", "The wild-type enzyme is inactive"],
    short: "The slope of product versus time is lower for the mutant.",
    detailed: "Initial rate is estimated from early product formation over time. The mutant forms 2 nmol/min, while wild type forms 5 nmol/min.",
    why: "the product-time slope is smaller for the mutant.",
    takeaway: "Rate is the slope of product formation over time.",
    formulas: ["rate = Δproduct / Δtime"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Data interpretation",
    subtopic: "Gene expression",
    difficulty: "medium",
    question_type: "data_interpretation",
    passage: {
      title: "Stress Response Transcript",
      text: "Cells exposed to heat shock show a fourfold increase in mRNA for Protein X after 30 minutes, while total protein level rises only after 90 minutes.",
      figures: [],
      tables: []
    },
    stem: "Which explanation best accounts for the timing difference?",
    correct: "Transcriptional changes can precede detectable protein accumulation",
    distractors: ["mRNA is translated before it is transcribed", "Heat shock immediately degrades all ribosomes", "Protein levels cannot be measured experimentally"],
    short: "mRNA changes often appear before protein changes.",
    detailed: "Transcription, mRNA processing, translation, folding, and accumulation take time. A lag between mRNA and protein is expected.",
    why: "protein accumulation requires steps after mRNA abundance increases.",
    takeaway: "Gene expression measurements depend on the level being measured.",
    related: ["qPCR", "Western blot", "Translation"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Research methods",
    subtopic: "Validity",
    difficulty: "medium",
    question_type: "experimental_design",
    passage: {
      title: "Survey Study",
      text: "A stress questionnaire is administered twice to the same group one week apart. Scores are nearly identical across administrations.",
      figures: [],
      tables: []
    },
    stem: "The repeated similarity of scores most directly supports which property?",
    correct: "Test-retest reliability",
    distractors: ["Construct validity", "External validity", "Random assignment"],
    short: "Stable repeated scores support test-retest reliability.",
    detailed: "Reliability concerns consistency of measurement. Test-retest reliability is assessed by repeating the same measure over time.",
    why: "the same people receive similar scores on repeated administrations.",
    takeaway: "Reliability is consistency; validity is whether the tool measures the intended construct."
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "Data interpretation",
    subtopic: "Graph analysis",
    difficulty: "medium",
    question_type: "graph_table",
    passage: {
      title: "Transporter Saturation",
      text: "Transport rate rises steeply at low solute concentration but approaches a plateau at high concentration.",
      figures: [],
      tables: []
    },
    stem: "Which mechanism best explains the plateau?",
    correct: "A finite number of transporter binding sites become saturated",
    distractors: ["Simple diffusion has stopped permanently", "The solute no longer has mass", "The membrane potential must be zero"],
    short: "Carrier-mediated transport can saturate.",
    detailed: "Transport proteins have finite capacity. Once many binding sites are occupied, increasing substrate concentration produces smaller rate increases.",
    why: "limited transporter availability produces saturable kinetics.",
    takeaway: "Plateaus often signal saturation of a finite process.",
    related: ["Facilitated diffusion", "Michaelis-Menten", "Transport maximum"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Experimental design",
    subtopic: "Blinding",
    difficulty: "hard",
    question_type: "experimental_design",
    passage: {
      title: "Pain Study",
      text: "Participants are assigned to receive either a new analgesic or placebo. The clinician rating pain outcomes knows which treatment each participant received.",
      figures: [],
      tables: []
    },
    stem: "Which design improvement most directly reduces observer expectancy bias?",
    correct: "Blind the outcome assessor to treatment assignment",
    distractors: ["Remove the placebo group", "Measure only participants with extreme pain", "Tell assessors the study hypothesis in more detail"],
    short: "Blinding assessors reduces biased outcome measurement.",
    detailed: "If assessors know treatment assignments, expectations can influence ratings. Blinding the outcome assessor protects measurement objectivity.",
    why: "the person measuring outcomes cannot let treatment knowledge influence ratings.",
    takeaway: "Blinding protects against expectation-driven measurement bias.",
    related: ["Placebo control", "Observer bias", "Randomized trials"]
  }
];

const extraSeeds = [
  {
    section: MCAT_SECTIONS[2],
    topic: "Biochemistry",
    subtopic: "Protein structure",
    difficulty: "medium",
    stem: "A missense mutation replaces a buried valine with glutamate in the hydrophobic core of an enzyme. Which effect is most likely?",
    correct: "Reduced protein stability due to unfavorable burial of a charged side chain",
    distractors: ["Increased stability from stronger hydrophobic packing", "No effect because all amino acids have identical polarity", "Direct conversion of beta sheets into nucleic acids"],
    short: "Charged residues are usually unfavorable in a hydrophobic core.",
    detailed: "Valine is nonpolar and often stabilizes hydrophobic interiors. Glutamate is negatively charged near physiological pH, so burying it can disrupt folding and lower stability.",
    why: "a charged glutamate side chain is energetically unfavorable in a nonpolar protein core.",
    takeaway: "Hydrophobic cores favor nonpolar residues; buried charges can destabilize proteins.",
    related: ["Hydrophobic effect", "Amino acid polarity", "Protein folding"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Biology",
    subtopic: "Endocrine physiology",
    difficulty: "medium",
    stem: "After a carbohydrate-rich meal, which hormonal change most directly promotes glucose uptake into skeletal muscle and adipose tissue?",
    correct: "Increased insulin secretion",
    distractors: ["Increased glucagon secretion", "Decreased GLUT4 translocation", "Increased cortisol-driven gluconeogenesis"],
    short: "Insulin promotes GLUT4-mediated glucose uptake.",
    detailed: "Insulin is released by pancreatic beta cells after blood glucose rises. It stimulates GLUT4 translocation in skeletal muscle and adipose tissue.",
    why: "insulin signals fed-state glucose storage and uptake.",
    takeaway: "Insulin lowers blood glucose by increasing uptake and storage.",
    related: ["GLUT4", "Pancreatic beta cells", "Fed state"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Genetics",
    subtopic: "Hardy-Weinberg",
    difficulty: "hard",
    question_type: "calculation",
    stem: "In a population at Hardy-Weinberg equilibrium, a recessive disease occurs in 1 out of 10,000 individuals. What is the approximate carrier frequency?",
    correct: "2%",
    distractors: ["0.01%", "1%", "50%"],
    short: "q² = 1/10,000, so q = 0.01 and 2pq is about 0.02.",
    detailed: "For a recessive disease, affected frequency equals q². If q² = 0.0001, then q = 0.01 and p ≈ 0.99. Carrier frequency is 2pq ≈ 2(0.99)(0.01) ≈ 0.02.",
    why: "the heterozygote frequency is approximately 2q when q is small.",
    takeaway: "For rare recessive diseases, carrier frequency is roughly 2q.",
    formulas: ["p² + 2pq + q² = 1"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Cell biology",
    subtopic: "Organelles",
    difficulty: "easy",
    stem: "A protein destined for secretion is most likely synthesized by ribosomes associated with which structure?",
    correct: "Rough endoplasmic reticulum",
    distractors: ["Smooth endoplasmic reticulum", "Peroxisome", "Cytosolic glycogen granule"],
    short: "Secreted proteins enter the rough ER during translation.",
    detailed: "Signal peptides target translating ribosomes to the rough ER, where nascent proteins enter the secretory pathway.",
    why: "rough ER-bound ribosomes synthesize secreted and membrane proteins.",
    takeaway: "Secreted proteins move through rough ER, Golgi, vesicles, and plasma membrane.",
    related: ["Signal peptide", "Golgi apparatus", "Secretory pathway"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Physiology",
    subtopic: "Respiration",
    difficulty: "medium",
    stem: "A left shift in the hemoglobin oxygen dissociation curve indicates which change?",
    correct: "Increased hemoglobin affinity for oxygen",
    distractors: ["Decreased oxygen binding in the lungs", "Increased carbon dioxide unloading from tissues only", "Complete loss of cooperative binding"],
    short: "A left shift means hemoglobin holds oxygen more tightly.",
    detailed: "Lower temperature, lower CO2, higher pH, and fetal hemoglobin can shift the curve left, increasing oxygen affinity.",
    why: "at a given PO2, saturation is higher after a left shift.",
    takeaway: "Left shift loads oxygen; right shift unloads oxygen.",
    related: ["Bohr effect", "Hemoglobin", "Oxygen saturation"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "General Chemistry",
    subtopic: "Electrochemistry",
    difficulty: "medium",
    stem: "In a galvanic cell, oxidation occurs at which electrode?",
    correct: "Anode",
    distractors: ["Cathode", "Salt bridge", "Voltmeter"],
    short: "Oxidation always occurs at the anode.",
    detailed: "The mnemonic An Ox and Red Cat applies: anode oxidation, reduction cathode. In galvanic cells, electrons flow from anode to cathode.",
    why: "the anode is the site where electrons are produced by oxidation.",
    takeaway: "Anode oxidation is true for both galvanic and electrolytic cells.",
    related: ["Redox", "Galvanic cells", "Electron flow"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "Physics",
    subtopic: "Kinematics",
    difficulty: "easy",
    question_type: "calculation",
    stem: "A car accelerates uniformly from rest at 3 m/s² for 4 seconds. What is its final speed?",
    correct: "12 m/s",
    distractors: ["7 m/s", "16 m/s", "24 m/s"],
    short: "Use v = v0 + at.",
    detailed: "The car starts from rest, so v0 = 0. With a = 3 m/s² and t = 4 s, final speed is 12 m/s.",
    why: "constant acceleration changes velocity by acceleration times time.",
    takeaway: "For constant acceleration, v = v0 + at.",
    formulas: ["v = v0 + at"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "Organic Chemistry",
    subtopic: "Nucleophilic substitution",
    difficulty: "medium",
    stem: "Which condition most favors an SN2 reaction?",
    correct: "A strong nucleophile reacting with a primary alkyl halide",
    distractors: ["A tertiary carbocation in a protic solvent", "A weak nucleophile with a tertiary alkyl halide", "High heat with a bulky base and no electrophile"],
    short: "SN2 favors strong nucleophiles and less hindered substrates.",
    detailed: "SN2 reactions occur by backside attack in one concerted step. Steric hindrance slows the reaction, so methyl and primary substrates are favored.",
    why: "a primary substrate is accessible for backside attack by a strong nucleophile.",
    takeaway: "SN2: strong nucleophile, low steric hindrance, backside attack.",
    related: ["SN1", "Leaving groups", "Stereochemical inversion"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "Physics",
    subtopic: "Waves and sound",
    difficulty: "medium",
    stem: "If the frequency of a sound wave increases while its speed in air remains constant, what happens to its wavelength?",
    correct: "It decreases",
    distractors: ["It increases", "It remains constant", "It becomes equal to amplitude"],
    short: "Wave speed equals frequency times wavelength.",
    detailed: "For a wave traveling in the same medium, speed is constant. Since v = fλ, increasing frequency decreases wavelength.",
    why: "frequency and wavelength are inversely related when speed is fixed.",
    takeaway: "Higher frequency means shorter wavelength in the same medium.",
    formulas: ["v = fλ"]
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "General Chemistry",
    subtopic: "Solutions",
    difficulty: "hard",
    question_type: "calculation",
    stem: "What volume of 2.0 M NaCl stock is needed to prepare 500 mL of 0.20 M NaCl?",
    correct: "50 mL",
    distractors: ["5 mL", "100 mL", "250 mL"],
    short: "Use M1V1 = M2V2.",
    detailed: "V1 = M2V2/M1 = (0.20 M)(500 mL)/(2.0 M) = 50 mL.",
    why: "dilution conserves moles of solute.",
    takeaway: "For dilutions, concentrated stock volume is M2V2 divided by M1.",
    formulas: ["M1V1 = M2V2"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Psychology",
    subtopic: "Emotion",
    difficulty: "medium",
    stem: "According to the James-Lange theory of emotion, which sequence is most accurate?",
    correct: "Physiological arousal occurs before the conscious experience of emotion",
    distractors: ["Emotion occurs before any bodily response", "Arousal and emotion occur independently with no relationship", "Emotion depends only on social labeling and never on arousal"],
    short: "James-Lange proposes that bodily responses precede emotion.",
    detailed: "In this theory, a stimulus produces physiological changes, and perception of those changes contributes to the emotional experience.",
    why: "the theory places bodily arousal before conscious emotion.",
    takeaway: "James-Lange: body first, emotion second.",
    related: ["Cannon-Bard", "Schachter-Singer", "Emotion theories"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Sociology",
    subtopic: "Healthcare disparities",
    difficulty: "medium",
    stem: "A community has limited clinics, poor transportation, and fewer grocery stores with fresh food. These are best described as examples of:",
    correct: "Social determinants of health",
    distractors: ["Operant conditioning schedules", "Absolute sensory thresholds", "Innate releasing mechanisms"],
    short: "Social conditions can shape health outcomes.",
    detailed: "Social determinants of health include environmental, economic, and structural conditions that influence disease risk and access to care.",
    why: "the scenario describes contextual factors affecting health beyond individual biology.",
    takeaway: "Health outcomes are shaped by social and structural context.",
    related: ["Access to care", "Food deserts", "Structural inequality"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Psychology",
    subtopic: "Attention",
    difficulty: "hard",
    stem: "A participant fails to notice a visible object because attention is focused on a demanding counting task. This is best described as:",
    correct: "Inattentional blindness",
    distractors: ["Retroactive interference", "Feature detection failure in the retina", "Social loafing"],
    short: "Inattentional blindness is missing visible stimuli when attention is elsewhere.",
    detailed: "Attention is selective. A stimulus can be physically visible yet fail to reach awareness if attentional resources are engaged by another task.",
    why: "the object is missed due to attention allocation, not sensory absence.",
    takeaway: "Awareness depends on attention, not just sensory input.",
    related: ["Selective attention", "Change blindness", "Cognitive load"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Research methods",
    subtopic: "Sampling",
    difficulty: "medium",
    stem: "A psychology study recruits only introductory psychology students at one university. Which limitation is most directly affected?",
    correct: "External validity",
    distractors: ["Random assignment within the sample", "Operational definition of the dependent variable", "The arithmetic mean of all scores"],
    short: "A narrow sample can limit generalizability.",
    detailed: "External validity concerns whether findings generalize beyond the study sample and setting. A convenience sample from one university may not represent broader populations.",
    why: "the sample may not generalize to the target population.",
    takeaway: "Sampling affects external validity.",
    related: ["Convenience sampling", "Generalizability", "Population"]
  },
  {
    section: MCAT_SECTIONS[3],
    topic: "Psychology",
    subtopic: "Identity",
    difficulty: "medium",
    stem: "A person feels tension because their behavior conflicts with a strongly held belief. Which concept best describes this discomfort?",
    correct: "Cognitive dissonance",
    distractors: ["Habituation", "Primary appraisal", "Deindividuation"],
    short: "Cognitive dissonance is discomfort from inconsistent beliefs or behaviors.",
    detailed: "People are motivated to reduce inconsistency between attitudes, beliefs, and actions, often by changing beliefs or justifying behavior.",
    why: "the discomfort arises from inconsistency between belief and action.",
    takeaway: "Dissonance pushes people to restore internal consistency.",
    related: ["Attitudes", "Self-perception", "Justification"]
  },
  {
    section: MCAT_SECTIONS[1],
    topic: "CARS reasoning",
    subtopic: "Function",
    difficulty: "medium",
    question_type: "cars",
    passage: {
      title: "CARS Passage 6",
      text: "A critic argued that translation is not a transparent window but a second act of authorship. Every choice about rhythm, idiom, and emphasis brings one possibility forward while letting another recede. The critic did not mean that translations are unfaithful; rather, fidelity itself requires judgment because languages divide experience differently.",
      figures: [],
      tables: []
    },
    stem: "The passage most strongly suggests that faithful translation requires:",
    correct: "Interpretive choices that preserve meaning across differences between languages",
    distractors: ["Literal word-for-word replacement in every sentence", "Removing rhythm and idiom from the translated work", "Avoiding all judgment by the translator"],
    short: "The author presents translation as judgment-guided fidelity.",
    detailed: "The critic argues that language differences make translation an interpretive act. Faithfulness is not mechanical copying; it requires choices about meaning, rhythm, and emphasis.",
    why: "the passage says fidelity requires judgment across languages that structure experience differently.",
    takeaway: "For CARS, preserve the author's nuance and avoid extreme literalism.",
    trap: "Do not choose an answer that turns a qualified claim into an absolute rule."
  },
  {
    section: MCAT_SECTIONS[1],
    topic: "Passage analysis",
    subtopic: "Main idea",
    difficulty: "medium",
    question_type: "cars",
    passage: {
      title: "CARS Passage 7",
      text: "The popularity of ruins in landscape painting may seem like nostalgia for collapse. Yet many painters used ruins to measure continuity rather than loss. A broken arch beside a living tree could suggest that human projects fade while other forms of time continue without needing our approval.",
      figures: [],
      tables: []
    },
    stem: "Which statement best expresses the passage's main idea?",
    correct: "Ruins in landscape painting can represent continuity beyond human ambition",
    distractors: ["Ruins always celebrate political failure", "Landscape painting avoids questions about time", "Painters included trees only for decorative balance"],
    short: "The passage reframes ruins as symbols of continuity.",
    detailed: "The author contrasts a simple nostalgia-for-collapse view with a more nuanced interpretation: ruins can show human transience alongside ongoing natural time.",
    why: "it captures the contrast between human projects and continuing forms of time.",
    takeaway: "Main-idea answers should include the passage's central contrast.",
    trap: "Beware choices that use 'always' or reduce a nuanced claim."
  },
  {
    section: MCAT_SECTIONS[1],
    topic: "CARS reasoning",
    subtopic: "Inference",
    difficulty: "hard",
    question_type: "cars",
    passage: {
      title: "CARS Passage 8",
      text: "A philosopher warned that measuring public debate only by speed rewards the quickest reply rather than the strongest reason. Still, she did not romanticize slowness. A delayed answer can be evasive; an immediate answer can be just. Her concern was whether the tempo of response leaves room for accountability.",
      figures: [],
      tables: []
    },
    stem: "The philosopher would most likely agree that:",
    correct: "The quality of public reasoning depends partly on whether response norms support accountability",
    distractors: ["Fast replies are always intellectually inferior", "Delayed replies are always more ethical", "Public debate should avoid accountability when emotions are high"],
    short: "The author evaluates speed by its effect on accountable reasoning.",
    detailed: "The passage rejects simple speed-versus-slowness thinking. The real concern is whether the pace of debate allows reasons and accountability to matter.",
    why: "it preserves the author's qualified view of tempo and accountability.",
    takeaway: "CARS inference answers should extend the claim without exaggerating it.",
    trap: "Avoid answers that turn qualifications into universal claims."
  },
  {
    section: MCAT_SECTIONS[0],
    topic: "Data interpretation",
    subtopic: "Experimental controls",
    difficulty: "hard",
    question_type: "experimental_design",
    passage: {
      title: "Transport Inhibitor Study",
      text: "Cells expressing Transporter Y import labeled glucose analog at 100 units/min. Addition of Compound P lowers uptake to 40 units/min. Cells lacking Transporter Y show uptake of 12 units/min with or without Compound P.",
      figures: [],
      tables: [{ title: "Uptake rate", columns: ["Condition", "Rate"], rows: [["Transporter Y", "100"], ["Transporter Y + P", "40"], ["No Transporter Y", "12"], ["No Transporter Y + P", "12"]] }]
    },
    stem: "Which conclusion is best supported?",
    correct: "Compound P inhibits Transporter Y-dependent uptake",
    distractors: ["Compound P increases nonspecific uptake", "Transporter Y is unnecessary for uptake", "Compound P only affects cells lacking Transporter Y"],
    short: "P reduces uptake only when Transporter Y is present.",
    detailed: "The no-transporter condition estimates nonspecific uptake and is unchanged by Compound P. The large reduction in Transporter Y-expressing cells supports inhibition of transporter-dependent uptake.",
    why: "the effect of P appears in the transporter-expressing condition but not the negative control.",
    takeaway: "Use negative controls to distinguish specific from nonspecific effects.",
    related: ["Transporters", "Negative controls", "Specificity"]
  },
  {
    section: MCAT_SECTIONS[2],
    topic: "Data interpretation",
    subtopic: "Dose response",
    difficulty: "medium",
    question_type: "data_interpretation",
    passage: {
      title: "Dose-Response Curve",
      text: "Drug A and Drug B reach the same maximal response. Drug A reaches half-maximal response at 2 nM, while Drug B reaches half-maximal response at 20 nM.",
      figures: [],
      tables: []
    },
    stem: "Which interpretation is best?",
    correct: "Drug A is more potent, but both drugs have similar efficacy",
    distractors: ["Drug B is more potent and more efficacious", "Drug A has lower efficacy because it requires less drug", "Potency cannot be compared using half-maximal response"],
    short: "Lower EC50 means higher potency; same maximum means same efficacy.",
    detailed: "Potency refers to the concentration needed for an effect. Efficacy refers to maximal effect. Drug A has lower EC50, so it is more potent, while both have the same maximum.",
    why: "Drug A requires less concentration to produce half-maximal response.",
    takeaway: "Potency is left-right position; efficacy is maximum height.",
    related: ["EC50", "Efficacy", "Pharmacodynamics"]
  }
];

export function createDemoQuestions() {
  return [...bioSeeds, ...chemSeeds, ...psychSeeds, ...carsSeeds, ...expSeeds, ...extraSeeds].map(makeQuestion);
}
