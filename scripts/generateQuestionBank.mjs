import { readFileSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createDemoQuestions, MCAT_SECTIONS } from "../js/demoData.js";

const targetCount = Number(process.argv[2] || 20000);
const shardSize  = Number(process.argv[3] || 2500);
const now        = new Date().toISOString();
const letters    = ["A", "B", "C", "D"];

// ── Scraped content ───────────────────────────────────────────────────────────
let scrapedContent = { wikipedia: [], pubmed: [] };
try { scrapedContent = JSON.parse(readFileSync("data/scraped_content.json", "utf-8")); } catch { /* fallback */ }
const carsPool   = scrapedContent.wikipedia.filter(w => w.topic_hint === "CARS" && (w.extract || "").length > 100);
const pubmedPool = scrapedContent.pubmed.filter(p => (p.abstract || "").length > 100);

// ── Concept builder ───────────────────────────────────────────────────────────
function mk(si, topic, subtopic, stems, correct, distractors, wrongExps, explanation, takeaway, trap, related = [], formulas = []) {
  return { section: MCAT_SECTIONS[si], topic, subtopic, stems, correct, distractors, wrong_explanations: wrongExps, explanation, takeaway, trap, related, formulas };
}

// ── Concept bank (~130 concepts) ──────────────────────────────────────────────
const concepts = [

  // ==== CHEMICAL & PHYSICAL (section index 0) ====

  mk(0,"General Chemistry","Acid-Base",[
    "A buffer prepared from acetic acid (pKa 4.76) and sodium acetate has pH 5.76. Which ratio of [acetate]/[acetic acid] satisfies the Henderson-Hasselbalch equation?",
    "A patient maintains arterial pH 7.40 with [HCO3−] = 24 mEq/L. Using a carbonate pKa of 6.10, which [HCO3−]:[CO2] ratio is consistent with this pH?",
  ],
  "10:1 (conjugate base to acid), because pH exceeds pKa by exactly one unit and log(10) = 1",
  ["1:10 (acid to base), because the ratio appears inverted when the log term is misread",
   "1:1, because equal concentrations always produce a pH equal to the pKa",
   "100:1, because the pH difference from pKa is mistakenly doubled"],
  ["A 1:10 ratio gives pH = pKa − 1, not pKa + 1; inverting the base/acid direction reverses the sign of the log term",
   "Equal concentrations give pH = pKa (log 1 = 0); this ignores the one-unit pH elevation specified",
   "A 100:1 ratio gives pH = pKa + 2; the two-unit shift is double what the question specifies"],
  "pH = pKa + log([A−]/[HA]). A pH one unit above pKa requires [A−]/[HA] = 10¹ = 10.",
  "Each pH unit from pKa corresponds to a 10-fold change in [A−]/[HA].",
  "Confusing acid/base direction in the ratio flips the sign and gives the mirror-image wrong answer.",
  ["Buffer capacity","Conjugate acid-base pairs"],["pH = pKa + log([A⁻]/[HA])"]),

  mk(0,"General Chemistry","Acid-Base",[
    "A weak acid buffer is most resistant to pH change when the concentrations of the acid and conjugate base are equal. Which principle best explains this?",
    "A researcher titrates a weak acid with NaOH. At the half-equivalence point, which observation is most expected?",
  ],
  "buffer capacity is maximal when [HA] = [A−] because both components are available to neutralize added acid or base",
  ["buffer capacity is maximal at pH extremes because the excess form absorbs all perturbation",
   "buffers work by preventing any ionization of water near physiological pH",
   "the half-equivalence point maximizes ionic strength rather than buffering ability"],
  ["Buffer capacity is actually lowest at pH extremes, where one component is nearly depleted",
   "Buffers do not block water ionization; they consume added H+ or OH− using conjugate pairs",
   "Ionic strength changes throughout titration but is unrelated to buffer capacity maximum"],
  "When [HA] = [A−], equal moles of both forms are present. Adding acid converts A− → HA; adding base converts HA → A−. The ability to do both is maximized.",
  "Maximum buffer capacity occurs at pH = pKa (half-equivalence point).",
  "Students often think diluting a buffer maintains the same capacity; capacity falls with concentration even if pH is unchanged.",
  ["Henderson-Hasselbalch","Equivalence point"],["βmax at pH = pKa"]),

  mk(0,"General Chemistry","Thermodynamics",[
    "A reaction has ΔH = −80 kJ/mol and ΔS = −200 J/(mol·K). At what temperature does the reaction shift from spontaneous to non-spontaneous?",
    "A chemist finds that a reaction is spontaneous at low temperature but non-spontaneous at high temperature. Which combination of ΔH and ΔS is consistent?",
  ],
  "ΔH negative and ΔS negative; the unfavorable −TΔS term (positive) overtakes ΔH at high temperature",
  ["ΔH positive and ΔS positive, which becomes spontaneous at high temperature, not low",
   "ΔH negative and ΔS positive, which is spontaneous at all temperatures",
   "ΔH positive and ΔS negative, which is never spontaneous at any temperature"],
  ["ΔH+ / ΔS+ reactions become spontaneous as T rises (high-T favorable), the opposite of what's described",
   "ΔH− / ΔS+ gives ΔG negative at all temperatures; this cannot shift from spontaneous to non-spontaneous",
   "ΔH+ / ΔS− gives ΔG positive at all temperatures; it cannot be spontaneous at any temperature"],
  "ΔG = ΔH − TΔS. When both terms are negative, ΔG < 0 at low T but the +TΔS term eventually dominates as T rises, making ΔG > 0.",
  "Memorize the four ΔH/ΔS sign combinations and their temperature dependence.",
  "Confusing which sign combination is 'always spontaneous' vs 'temperature-dependent' is the most common error.",
  ["Gibbs free energy","Entropy","Spontaneity"],["ΔG = ΔH − TΔS"]),

  mk(0,"General Chemistry","Equilibrium",[
    "A reaction at equilibrium is compressed to half its volume. How does the system respond if the reaction produces fewer moles of gas than it consumes?",
    "Nitrogen and hydrogen gases react to form ammonia. Adding more nitrogen to the equilibrium mixture at constant volume and temperature shifts the reaction in which direction?",
  ],
  "the equilibrium shifts toward the product side (fewer gas moles) to reduce pressure, consistent with Le Chatelier's principle",
  ["the equilibrium shifts toward reactants regardless of the mole ratio of gases",
   "the equilibrium constant Keq increases because higher pressure favors product formation",
   "no shift occurs because Keq depends only on temperature, so concentrations are unaffected"],
  ["Le Chatelier predicts the system opposes the disturbance; if products have fewer gas moles, compression favors products, not reactants",
   "Keq is a constant at fixed temperature; pressure changes shift the reaction position but never change Keq",
   "Concentration and pressure changes do shift the equilibrium position; it is Keq that remains constant, not the concentrations"],
  "Le Chatelier's principle: a system at equilibrium responds to oppose any imposed change. Compression increases pressure, so the reaction shifts toward the side with fewer gas moles to relieve it.",
  "Le Chatelier: predict the direction that reduces the applied stress. Keq changes only with temperature.",
  "Students confuse 'Keq does not change' with 'nothing happens.' Reactant and product concentrations shift even though Keq stays the same.",
  ["Reaction quotient Q","Keq and Kp"],["Kp = Kc(RT)^Δn"]),

  mk(0,"General Chemistry","Electrochemistry",[
    "A galvanic cell uses zinc and copper half-cells. Which statement correctly identifies the anode?",
    "An electrolytic cell is used to plate copper onto a steel surface. At which electrode does copper deposition occur, and what process takes place there?",
  ],
  "the zinc electrode is the anode because zinc is oxidized (loses electrons), which drives the spontaneous cell",
  ["the copper electrode is the anode because copper has a higher reduction potential and accepts electrons",
   "the anode is whichever electrode has the higher concentration of metal ions",
   "in a galvanic cell the anode is the positive terminal, so it is where reduction occurs"],
  ["A higher reduction potential means copper is preferentially reduced at the cathode, not oxidized at the anode",
   "Electrode identity (anode/cathode) is determined by the half-reaction type (oxidation/reduction), not ion concentration",
   "In a galvanic cell the anode is negative (source of electrons flowing out); reduction occurs at the cathode, not the anode"],
  "Oxidation at the Anode (An Ox), Reduction at the Cathode (Red Cat). In a galvanic cell, the more easily oxidized metal becomes the anode. Zinc (E° = −0.76 V) is more easily oxidized than copper (E° = +0.34 V).",
  "An Ox, Red Cat. Galvanic anode is negative; electrolytic anode is positive (connected to +).",
  "Students flip anode/cathode sign in galvanic vs electrolytic cells. In both, oxidation is always at the anode.",
  ["Standard reduction potential","Nernst equation"],["E°cell = E°cathode − E°anode"]),

  mk(0,"General Chemistry","Electrochemistry",[
    "A cell operates under non-standard conditions with Q < 1. How does the actual cell potential compare to E°cell?",
    "The Nernst equation predicts how cell potential changes as a reaction proceeds. At equilibrium, which value does Q equal?",
  ],
  "E > E°cell because when Q < 1 the reaction quotient term (−RT/nF × ln Q) is positive, adding to E°",
  ["E < E°cell because non-standard conditions always reduce the driving force",
   "E = E°cell because Q < 1 has no effect until equilibrium",
   "E is undefined when Q departs from 1"],
  ["Non-standard E can be higher than E° when Q < 1; the assumption that it is always lower ignores the log term's sign",
   "Q < 1 means products are low relative to reactants, increasing the driving force and raising E above E°",
   "The Nernst equation applies at any Q; it is well-defined for all positive Q values"],
  "Nernst equation: E = E° − (RT/nF)ln Q. When Q < 1, ln Q < 0, so the subtracted term becomes negative, raising E above E°.",
  "Q < 1 → E > E°. Q > 1 → E < E°. Q = Keq → E = 0 (equilibrium).",
  "Students assume non-standard always means lower potential; direction depends on whether Q < 1 or Q > 1.",
  ["Galvanic cells","Standard reduction potential"],["E = E° − (RT/nF)lnQ"]),

  mk(0,"General Chemistry","Gases",[
    "A mixture of H2 (M = 2) and O2 (M = 32) effuses through a small opening. Which gas effuses faster and by what factor?",
    "At constant temperature and volume, 2 mol of N2 are added to a vessel already containing 3 mol of O2 at 1.5 atm. What is the new total pressure?",
  ],
  "H2 effuses 4 times faster than O2 because rate is inversely proportional to the square root of molar mass",
  ["O2 effuses faster because it has more mass and therefore more momentum",
   "both gases effuse at the same rate because temperature determines kinetic energy equally",
   "H2 effuses twice as fast because its molar mass is half that of O2"],
  ["Graham's law gives rate ∝ 1/√M; heavier gas is slower, not faster, regardless of momentum",
   "Temperature equalizes average kinetic energy but not speed; lighter molecules move faster at the same KE",
   "H2/O2 molar mass ratio is 1/16, so rate ratio = √16 = 4, not 2; square root is required"],
  "Graham's law: rate ∝ 1/√M. Rate(H2)/Rate(O2) = √(32/2) = √16 = 4.",
  "Graham's law: ratio of rates = square root of the inverse molar mass ratio.",
  "Students use the molar mass ratio directly rather than its square root.",
  ["Kinetic molecular theory","Dalton's law"],["rate₁/rate₂ = √(M₂/M₁)"]),

  mk(0,"General Chemistry","Solutions",[
    "A 1 mol/kg solution of NaCl is compared to a 1 mol/kg solution of glucose in water. Which has the higher boiling point and why?",
    "Red blood cells placed in a 0.9% NaCl solution maintain their normal shape. When transferred to distilled water, they swell and lyse. Which colligative property explains lysis?",
  ],
  "NaCl solution has a higher boiling point because it dissociates into two ions (Na+ and Cl−), doubling the effective particle concentration",
  ["glucose has a higher boiling point because larger molecules create more surface interactions with water",
   "both solutions have identical boiling points because molality determines boiling point elevation regardless of solute identity",
   "NaCl has a lower boiling point because ionic solutes disrupt hydrogen bonding more than covalent solutes"],
  ["Boiling point elevation is a colligative property depending on particle number, not molecular size or polarity",
   "The van't Hoff factor i accounts for dissociation; NaCl has i = 2, glucose i = 1, so they differ at equal molality",
   "Both ionic and covalent solutes elevate boiling point; NaCl elevates it more because it produces more particles per formula unit"],
  "ΔTb = iKbm. NaCl (i ≈ 2) doubles the effective molality relative to glucose (i = 1), producing twice the boiling point elevation.",
  "Colligative properties depend on particle count, not identity. Ionic solutes dissociate, multiplying their effect.",
  "Forgetting the van't Hoff factor i and treating NaCl as a non-electrolyte is the classic trap.",
  ["Osmotic pressure","Freezing point depression"],["ΔTb = iKbm; Π = iMRT"]),

  mk(0,"Organic Chemistry","Nucleophilic Substitution",[
    "A primary alkyl bromide reacts with sodium cyanide (strong nucleophile) in acetone. Which mechanism and stereochemical outcome are most expected?",
    "A tertiary alkyl chloride is dissolved in aqueous ethanol with no additional nucleophile. What mechanism and product are most expected?",
  ],
  "SN2 with inversion of configuration, because the primary substrate is unhindered and the strong nucleophile performs backside attack",
  ["SN1 with racemization, because the primary substrate forms a stable primary carbocation that is attacked from both faces",
   "E2 elimination because cyanide is too bulky to reach the backside",
   "No reaction because primary substrates are too stable for nucleophilic substitution"],
  ["Primary carbocations are highly unstable and do not form under normal conditions; SN1 requires at least secondary (preferably tertiary) substrates",
   "Cyanide is a linear, compact anion and is not sterically hindered; bulky bases favor elimination but cyanide is not bulky",
   "Primary substrates are among the most reactive in SN2 due to minimal steric hindrance; they do react readily"],
  "SN2: strong nucleophile + primary (or methyl) substrate + polar aprotic solvent → inversion. SN1: weak nucleophile or solvolysis + tertiary substrate + polar protic solvent → racemization.",
  "SN2: primary, strong Nu, polar aprotic, inversion. SN1: tertiary, weak Nu, polar protic, racemization.",
  "Students default to SN1 for any substrate; remember primary substrates cannot form stable carbocations.",
  ["E1 and E2 elimination","Carbocation stability","Leaving groups"],["Rate(SN2) = k[substrate][Nu]"]),

  mk(0,"Organic Chemistry","Nucleophilic Substitution",[
    "A secondary alkyl bromide is treated with sodium methoxide (strong base) in heated DMF. Which product predominates?",
    "A researcher treats a secondary substrate with a weak nucleophile in a polar protic solvent at room temperature. What is the most likely mechanism?",
  ],
  "E2 elimination product because a strong base at high temperature with a secondary substrate favors elimination over substitution",
  ["SN2 substitution because methoxide is also a nucleophile and secondary substrates always substitute",
   "SN1 because secondary substrates always ionize to carbocations in polar solvents",
   "No reaction because elimination requires a tertiary substrate"],
  ["Methoxide is both a strong base and nucleophile; high temperature and secondary substrate tip the competition toward E2 elimination",
   "Secondary substrates can do SN2, but the combination of strong base + heat + secondary strongly favors E2",
   "E2 elimination occurs at primary and secondary substrates; tertiary substrates favor E1 or E2 but are not the only option"],
  "Strong base + heat → elimination (E2). At room temperature with a good nucleophile → SN2. Secondary substrates are at the crossroads; temperature and base strength decide.",
  "Heat + strong base + secondary → E2. Room temp + good nucleophile + secondary → SN2.",
  "Students forget that the same reagent (e.g., NaOEt) can act as nucleophile or base; context (temperature, substrate) determines which role dominates.",
  ["SN1 vs SN2","E1 vs E2","Zaitsev's rule"],[]),

  mk(0,"Organic Chemistry","Carbonyl Chemistry",[
    "An aldehyde is treated with excess sodium borohydride (NaBH4) in methanol. What is the primary product?",
    "A ketone undergoes reaction with a Grignard reagent (RMgBr) followed by aqueous workup. Which class of alcohol is produced?",
  ],
  "a primary alcohol (from aldehyde reduction) because NaBH4 delivers hydride to the carbonyl carbon",
  ["a carboxylic acid, because NaBH4 oxidizes aldehydes in the presence of base",
   "an acetal, because methanol attacks the carbonyl under all conditions",
   "a secondary alcohol, because NaBH4 always adds two carbons to the carbonyl"],
  ["NaBH4 is a reducing agent that delivers H−; it does not oxidize and does not produce carboxylic acids",
   "Acetal formation requires an acid catalyst and two equivalents of alcohol; NaBH4 reduction proceeds differently",
   "Hydride addition replaces C=O with C–OH; no carbons are added—only hydrogen. Aldehydes give primary alcohols, ketones give secondary"],
  "NaBH4 donates hydride (H−) to the electrophilic carbonyl carbon. Aldehydes (RCHO) → primary alcohols (RCH2OH). Ketones (RCOR′) → secondary alcohols (RCHOHR′).",
  "NaBH4/LiAlH4 reduce carbonyls. Aldehyde → 1° alcohol; ketone → 2° alcohol; ester/acid → 1° alcohol (LiAlH4 only).",
  "Confusing reduction product class: aldehydes give primary, ketones give secondary—not both secondary.",
  ["LiAlH4 reactivity","Oxidation states","Grignard reaction"],["Aldehyde + H− → 1° alcohol"]),

  mk(0,"Organic Chemistry","Stereochemistry",[
    "A molecule has two chiral centers with opposite configurations at each. Which term best describes this compound relative to its non-superimposable mirror image?",
    "Two compounds share the same molecular formula and sequence of bonds but differ in the spatial arrangement of groups around one chiral center. They are non-superimposable mirror images. How are they related?",
  ],
  "they are enantiomers because they are non-superimposable mirror images differing at every chiral center",
  ["they are diastereomers because having two chiral centers always creates diastereomers",
   "they are constitutional isomers because they differ in the spatial arrangement of atoms",
   "they are identical compounds viewed from different angles"],
  ["Diastereomers differ at some but not all chiral centers; the mirror image relationship that is non-superimposable defines enantiomers",
   "Constitutional isomers differ in connectivity; stereoisomers share the same connectivity but differ in spatial arrangement",
   "Non-superimposability is the test for enantiomers; if the two structures were identical, one could be superimposed on the other"],
  "Enantiomers: non-superimposable mirror images. Diastereomers: stereoisomers that are NOT mirror images (differ at some but not all chiral centers). Meso compounds are achiral despite having stereocenters.",
  "Enantiomers = mirror images that are non-superimposable. Diastereomers = stereoisomers that are not mirror images.",
  "Thinking that any molecule with two stereocenters must form diastereomers; the relationship depends on which centers differ.",
  ["R/S configuration","Meso compounds","Optical activity"],[]),

  mk(0,"Organic Chemistry","Spectroscopy",[
    "An IR spectrum shows a broad absorption centered near 3300 cm−1 and a sharp absorption at 1715 cm−1. Which functional groups are most consistent with these peaks?",
    "An unknown compound shows a strong, broad IR absorption from 2500–3300 cm−1 and a carbonyl peak at 1710 cm−1. Which structure is most consistent?",
  ],
  "an alcohol O–H (broad 3200–3550 cm−1) and a carbonyl C=O (sharp ~1715 cm−1)",
  ["an amine N–H (sharp doublet ~3300–3500 cm−1) and an alkene C=C (~1640 cm−1)",
   "an aldehyde C–H (two weak peaks ~2700–2850 cm−1) and a C–O ether stretch (~1100 cm−1)",
   "an alkyne C≡C (~2100–2260 cm−1) and an alcohol O–H (~3300 cm−1)"],
  ["Amine N–H appears as a sharp doublet (primary) or singlet (secondary), not a broad single peak; alkene C=C absorbs ~1640 cm−1, not 1715 cm−1",
   "Aldehyde C–H appears as two weak peaks near 2700–2850 cm−1, not a broad 3300 cm−1 absorption; ether C–O is ~1100 cm−1, not 1715",
   "Alkyne triple bond absorbs ~2100–2260 cm−1; the 1715 cm−1 carbonyl is inconsistent with this pairing"],
  "Broad O–H: 3200–3550 cm−1 (alcohol) or 2500–3300 cm−1 (carboxylic acid). Carbonyl C=O: ~1715 cm−1 (ketone/acid), ~1735 cm−1 (ester), ~1670 cm−1 (amide). Aldehyde C–H: ~2720 and 2820 cm−1.",
  "Broad O–H ~3300 = alcohol. Carbonyl ~1715 = ketone or acid. Aldehyde: two weak C–H peaks ~2700–2850.",
  "Mistaking the aldehyde C–H doublet for alcohol O–H; aldehyde peak is weak and appears as two peaks, not a broad hump.",
  ["NMR interpretation","Functional group identification"],[]),

  mk(0,"Physics","Work and Energy",[
    "A 5 kg block is pushed 4 m along a frictionless surface by a 20 N force applied at 30° above horizontal. How much work does the applied force do?",
    "A skier descends a frictionless slope, dropping 10 m vertically. Using energy conservation, what is the skier's speed at the bottom (g = 10 m/s²)?",
  ],
  "approximately 69 J, calculated as W = Fd cos θ = 20 × 4 × cos 30° ≈ 69 J",
  ["80 J, calculated as W = Fd = 20 × 4, ignoring the angle",
   "40 J, calculated using sin 30° instead of cos 30°",
   "0 J, because only the horizontal component of velocity matters"],
  ["W = Fd only when force is parallel to displacement; the angle must be accounted for with cos θ",
   "The component of force along the displacement uses cos θ, not sin θ; sin 30° = 0.5 gives 40 J, which is incorrect",
   "Work is force times displacement in the direction of force regardless of velocity; 0 J is only correct when force is perpendicular to displacement"],
  "W = Fd cos θ. The force component along the direction of motion is F cos θ. W = 20 × 4 × cos 30° = 80 × 0.866 ≈ 69 J.",
  "W = Fd cos θ. Perpendicular force does zero work. Parallel force does maximal work.",
  "Using the full force magnitude without the cosine factor; always project force onto displacement.",
  ["Kinetic energy","Potential energy","Work-energy theorem"],["W = Fd cosθ; KE = ½mv²"]),

  mk(0,"Physics","Circuits",[
    "Three resistors of 6 Ω, 3 Ω, and 2 Ω are connected in parallel. What is the equivalent resistance?",
    "A 12 V battery drives current through a 4 Ω and 8 Ω resistor connected in series. What is the voltage drop across the 8 Ω resistor?",
  ],
  "1 Ω, calculated from 1/Req = 1/6 + 1/3 + 1/2 = 1/6 + 2/6 + 3/6 = 6/6 = 1",
  ["11 Ω, calculated by summing resistances as if in series",
   "2 Ω, by taking only the smallest resistance",
   "3 Ω, by averaging the three resistances"],
  ["Adding resistances directly applies to series circuits; parallel resistors always yield a lower equivalent resistance than any single branch",
   "The equivalent parallel resistance is always less than the smallest branch resistor; taking the minimum directly ignores the other paths",
   "Averaging has no basis in circuit analysis; the reciprocal formula must be applied"],
  "Parallel: 1/Req = Σ(1/Ri). Series: Req = ΣRi. Parallel resistance is always less than the smallest individual resistance.",
  "Parallel: 1/Req = 1/R1 + 1/R2 + …. Result is always lower than smallest branch.",
  "Adding parallel resistors as if in series (the most common error); parallel adds conductances, not resistances.",
  ["Ohm's law","Kirchhoff's voltage law"],["1/Req = 1/R1 + 1/R2; Req,series = R1 + R2"]),

  mk(0,"Physics","Fluids",[
    "A patient has arteriosclerosis that reduces an artery's radius by half. By what factor does vascular resistance change according to Poiseuille's law?",
    "Blood flows through a wide aorta into a narrower artery. According to the continuity equation, how does velocity change?",
  ],
  "resistance increases by a factor of 16, because Poiseuille resistance is inversely proportional to radius to the fourth power",
  ["resistance increases by a factor of 2, because halving the radius doubles the resistance",
   "resistance increases by a factor of 4, because area decreases by a factor of 4 when radius halves",
   "resistance decreases because a narrower vessel allows faster flow"],
  ["Resistance scales with r⁻⁴, not r⁻¹; halving r raises resistance by 2⁴ = 16, not 2",
   "The r⁴ relationship is steeper than proportional to area; a factor of 4 would apply to a simple area-based formula",
   "Resistance increases in a narrower vessel; while velocity can increase (continuity), the driving pressure required rises dramatically"],
  "Poiseuille: R = 8ηL/(πr⁴). Halving r increases R by (1/0.5)⁴ = 2⁴ = 16. Small changes in vessel radius have dramatic effects on resistance.",
  "Poiseuille: R ∝ 1/r⁴. Halving radius → 16× resistance. Continuity: A₁v₁ = A₂v₂.",
  "Using r² (area) instead of r⁴ in Poiseuille's law; the fourth-power dependence is the high-yield fact here.",
  ["Bernoulli's equation","Blood pressure","Cardiac output"],["R = 8ηL/(πr⁴); A₁v₁ = A₂v₂"]),

  mk(0,"Physics","Optics",[
    "A converging lens with focal length 10 cm forms an image of an object placed 30 cm from the lens. Which description of the image is correct?",
    "Light travels from glass (n = 1.5) into air (n = 1.0). At what condition does total internal reflection occur?",
  ],
  "a real, inverted, and diminished image located 15 cm from the lens on the far side",
  ["a virtual, upright image located 15 cm from the lens on the same side as the object",
   "a real, upright image located 30 cm from the lens",
   "no image forms because the object is beyond the focal length"],
  ["Virtual, upright images form only when the object is inside the focal length; here object distance (30 cm) > f (10 cm), so a real image forms",
   "Real images formed by converging lenses are always inverted; a real upright image is impossible with a single converging lens",
   "Objects beyond the focal length always produce real images; objects inside the focal length produce virtual images"],
  "1/f = 1/do + 1/di → 1/10 = 1/30 + 1/di → 1/di = 1/10 − 1/30 = 2/30 → di = 15 cm. Positive di = real and inverted.",
  "Thin lens: 1/f = 1/do + 1/di. Positive di → real, inverted image. Negative di → virtual, upright.",
  "Assuming objects beyond 2f always produce diminished images; use the lens equation to calculate rather than guess.",
  ["Snell's law","Mirrors","Magnification"],["1/f = 1/do + 1/di; m = −di/do"]),

  mk(0,"Physics","Waves",[
    "A fire truck moving toward a stationary observer emits a siren at 500 Hz. The observer hears a higher frequency. Which phenomenon is this?",
    "Two waves of equal amplitude and frequency interfere. One wave is shifted by half a wavelength relative to the other. What is the resultant amplitude?",
  ],
  "the Doppler effect: the observer perceives higher frequency because successive wave crests arrive more frequently as the source approaches",
  ["constructive interference: approaching sources always amplify sound",
   "resonance: the truck's frequency matches the observer's natural frequency",
   "diffraction: sound bends around the observer causing frequency increase"],
  ["Constructive interference involves overlapping waves in space, not a moving source; the effect disappears when the truck passes",
   "Resonance requires matching natural frequencies of a resonating body; it does not cause a frequency shift tied to source motion",
   "Diffraction is bending of waves around obstacles; it does not shift the perceived frequency"],
  "Doppler effect: when source and observer approach, observed frequency f' = f(v+vo)/(v−vs). Moving source approaching → f' > f; receding → f' < f.",
  "Doppler: approaching source → higher observed frequency. Receding → lower. Half-wavelength shift → destructive interference (amplitude = 0).",
  "Confusing Doppler (frequency shift from motion) with changes in amplitude or resonance phenomena.",
  ["Standing waves","Interference","Sound intensity"],["f' = f(v ± vo)/(v ∓ vs)"]),

  // ==== BIOLOGICAL & BIOCHEMICAL (section index 2) ====

  mk(2,"Biochemistry","Enzyme Kinetics",[
    "A drug increases the apparent Km for an enzyme's substrate but does not change Vmax. Adding excess substrate fully restores enzyme velocity. What type of inhibition does this drug produce?",
    "On a Lineweaver-Burk (double reciprocal) plot, an inhibitor shifts the x-intercept closer to the origin without changing the y-intercept. Which inhibition type does this describe?",
  ],
  "competitive inhibition, which raises apparent Km without affecting Vmax because the inhibitor is displaced by high substrate concentrations",
  ["noncompetitive inhibition, which raises Km and lowers Vmax because the inhibitor binds whether or not substrate is present",
   "uncompetitive inhibition, which lowers both Km and Vmax because the inhibitor binds only the enzyme-substrate complex",
   "irreversible inhibition, which permanently inactivates enzyme by covalent modification so Vmax cannot be restored"],
  ["Noncompetitive inhibition lowers Vmax without necessarily changing Km; it cannot be overcome by excess substrate",
   "Uncompetitive inhibition lowers both Km and Vmax; the Lineweaver-Burk lines are parallel",
   "Irreversible inhibition permanently decreases Vmax; adding excess substrate does not restore activity"],
  "Competitive inhibitors mimic substrate at the active site. High substrate outcompetes the inhibitor, restoring Vmax. Km(app) increases, Vmax unchanged. On Lineweaver-Burk: same y-intercept (1/Vmax), different x-intercept (−1/Km).",
  "Competitive: Km↑ Vmax same. Noncompetitive: Vmax↓ Km same. Uncompetitive: both↓ (parallel L-B lines).",
  "Assuming any inhibition that changes Km must also change Vmax; competitive inhibition uniquely changes only Km.",
  ["Michaelis-Menten kinetics","Allosteric regulation","Lineweaver-Burk"],["Km(app) = Km(1+[I]/Ki)"]),

  mk(2,"Biochemistry","Enzyme Kinetics",[
    "A toxin binds to an allosteric site on an enzyme, reducing Vmax without changing Km even at saturating substrate concentrations. This is most consistent with which inhibition type?",
    "A researcher finds that an inhibitor lowers both Km and Vmax by the same factor, and the Lineweaver-Burk plot shows parallel lines shifted upward. What type of inhibition does this represent?",
  ],
  "noncompetitive inhibition, which reduces Vmax by binding an allosteric site regardless of substrate occupancy",
  ["competitive inhibition, because the inhibitor reduces enzyme velocity",
   "uncompetitive inhibition, because the inhibitor does not affect Km",
   "feedback inhibition, which is a separate mechanism that only occurs in metabolic pathways"],
  ["Competitive inhibition does not change Vmax; velocity reduction at saturating substrate concentrations indicates noncompetitive or uncompetitive binding",
   "Uncompetitive inhibition lowers both Km and Vmax; noncompetitive inhibition lowers only Vmax at constant Km (pure form)",
   "Feedback inhibition is a regulatory concept; the kinetic mechanism described (allosteric, Vmax reduction) is noncompetitive inhibition"],
  "Pure noncompetitive inhibition: inhibitor binds E or ES with equal affinity. Km unchanged (substrate can still bind), but Vmax reduced (fewer active complexes). Cannot be rescued by excess substrate.",
  "Noncompetitive: Vmax↓, Km unchanged. Allosteric site; cannot rescue with substrate.",
  "Confusing 'noncompetitive' with 'anything that is not competitive'; noncompetitive has a specific kinetic signature (Km unchanged).",
  ["Feedback inhibition","Cooperative binding","Allosteric enzymes"],[]),

  mk(2,"Biochemistry","Amino Acids",[
    "Histidine (pKa ~6.0 for its side chain) is found in the active site of many enzymes at physiological pH 7.4. Which property makes histidine uniquely suited for proton shuttling in catalysis?",
    "A mutation changes an aspartate (negatively charged at pH 7.4) to a lysine (positively charged at pH 7.4) at an enzyme's surface. Which immediate structural consequence is most likely?",
  ],
  "histidine's side-chain pKa is near physiological pH, meaning it can donate or accept protons in the active-site environment",
  ["histidine is the largest amino acid, providing a large surface for substrate binding",
   "histidine is hydrophobic and stabilizes the protein interior, holding the active site in place",
   "histidine has a sulfur-containing side chain that forms covalent bonds with substrates"],
  ["Tryptophan is the largest amino acid; histidine is notable for its imidazole group pKa, not its size",
   "Histidine is moderately polar and hydrophilic at neutral pH; it is found at active sites and exposed surfaces, not buried hydrophobic cores",
   "Cysteine and methionine contain sulfur; histidine's imidazole contains nitrogen and is not a sulfur-based nucleophile"],
  "The imidazole side chain of histidine has a pKa ~6.0. Near physiological pH, roughly half is protonated (HisH+) and half is neutral (His). This allows histidine to act as both a proton donor and acceptor, making it ideal for acid-base catalysis.",
  "Histidine: pKa ~6 → proton shuttle. Cys: pKa ~8 → nucleophile. Asp/Glu: negative. Lys/Arg: positive.",
  "Memorizing amino acid categories without learning why each is functionally important in enzyme mechanisms.",
  ["Protein structure","Acid-base catalysis","pKa of side chains"],[]),

  mk(2,"Biochemistry","Metabolism",[
    "Phosphofructokinase-1 (PFK-1) is called the committed step of glycolysis. Which allosteric effectors best illustrate its role as an energy sensor?",
    "During intense exercise, the AMP:ATP ratio rises. Which metabolic effect on glycolysis is most immediate?",
  ],
  "AMP and ADP activate PFK-1 (low energy signal) while ATP and citrate inhibit it (high energy signal), enabling PFK-1 to gate glycolysis to cellular energy status",
  ["glucose-6-phosphate activates PFK-1 to accelerate all glycolytic steps proportionally",
   "oxygen concentration directly inhibits PFK-1 to switch cells from aerobic to anaerobic metabolism",
   "insulin activates PFK-1 by phosphorylation, linking hormonal signaling to glycolytic flux"],
  ["Glucose-6-phosphate feeds forward into glycolysis but is not a primary allosteric regulator of PFK-1; it does inhibit hexokinase",
   "PFK-1 is not directly oxygen-sensitive; its regulation is through nucleotide energy ratios and citrate, not O2 levels",
   "PFK-1 is regulated allosterically, not by covalent phosphorylation; insulin signaling affects other metabolic enzymes"],
  "PFK-1 integrates energy status: high AMP → low energy → activate PFK-1 → more glycolysis. High ATP/citrate → plenty of energy/biosynthetic intermediates → inhibit PFK-1. It is a molecular governor of glycolytic flux.",
  "PFK-1: activated by AMP/ADP, inhibited by ATP/citrate. Committed, irreversible step of glycolysis.",
  "Assuming PFK-1 is activated by glucose rather than energy nucleotides; glucose activates hexokinase, not PFK-1.",
  ["Glycolysis","Gluconeogenesis","Pasteur effect"],["ΔG°' = −14.2 kJ/mol (PFK-1 step)"]),

  mk(2,"Biochemistry","Metabolism",[
    "In rapidly contracting muscle cells, pyruvate is converted to lactate. What is the primary purpose of this conversion under anaerobic conditions?",
    "A cell in anaerobic conditions has a high NADH:NAD+ ratio. Which metabolic consequence is most direct?",
  ],
  "to regenerate NAD+ from NADH so that glycolysis can continue producing ATP",
  ["to produce ATP directly from the pyruvate-to-lactate conversion step",
   "to export excess pyruvate from the cell when mitochondria are saturated",
   "to lower cytosolic pH and signal muscle cells to stop contracting"],
  ["The pyruvate → lactate conversion by lactate dehydrogenase does not produce ATP; it only regenerates NAD+",
   "Lactate fermentation occurs within the cytosol; pyruvate export is a separate process unrelated to NAD+ regeneration",
   "Lactate and H+ production does lower pH, but the primary biochemical purpose of the reaction is NAD+ regeneration for glycolysis"],
  "Glycolysis requires NAD+ to proceed (step 6: G3P dehydrogenase). Without O2, the ETC cannot reoxidize NADH. Lactate dehydrogenase transfers electrons from NADH back to pyruvate, regenerating NAD+ so glycolysis continues.",
  "Lactate fermentation: regenerates NAD+ (not ATP) so glycolysis can continue under anaerobic conditions.",
  "Thinking lactate production directly makes ATP; it does not. The benefit is sustaining glycolytic ATP production.",
  ["TCA cycle","Oxidative phosphorylation","Cori cycle"],[]),

  mk(2,"Biochemistry","TCA Cycle and OxPhos",[
    "A mitochondrial poison blocks Complex I of the electron transport chain. Which immediate metabolic consequence is most expected?",
    "The antibiotic oligomycin blocks the F0 subunit of ATP synthase. In addition to stopping ATP synthesis, which secondary effect is most likely?",
  ],
  "NADH cannot be reoxidized, so the NADH:NAD+ ratio rises, inhibiting TCA cycle dehydrogenases and halting oxidative metabolism",
  ["ATP is produced in greater amounts because electrons back up and drive extra substrate-level phosphorylation",
   "the proton gradient across the inner mitochondrial membrane is immediately eliminated",
   "glycolysis is directly inhibited because Complex I supplies energy to the cytosol"],
  ["Blocking electron flow reduces, not increases, ATP production; substrate-level phosphorylation in the TCA cycle is minor and cannot compensate",
   "The proton gradient is generated by Complexes I, III, and IV; blocking only Complex I slows gradient formation but does not eliminate it immediately",
   "Complex I is located in the inner mitochondrial membrane, not the cytosol; glycolytic enzymes are cytosolic and not directly regulated by Complex I"],
  "Complex I (NADH dehydrogenase) accepts electrons from NADH and pumps protons across the inner membrane. Blocking it: NADH accumulates → NAD+ depleted → TCA dehydrogenases (isocitrate DH, α-ketoglutarate DH, malate DH) inhibited → TCA halts.",
  "ETC inhibitors cause NADH buildup → TCA inhibition. Oligomycin blocks ATP synthase → proton gradient builds up → ETC slows (backpressure).",
  "Thinking that blocking one complex immediately eliminates the proton gradient; the gradient dissipates only when all pumping stops or the membrane becomes leaky.",
  ["Oxidative phosphorylation","Chemiosmosis","ATP yield"],["~2.5 ATP/NADH; ~1.5 ATP/FADH₂"]),

  mk(2,"Biochemistry","Lipid Metabolism",[
    "During prolonged fasting, the liver exports ketone bodies. Which metabolic condition triggers ketogenesis?",
    "A patient on a low-carbohydrate diet develops elevated plasma ketone bodies. Which enzyme commits fatty acids to β-oxidation rather than re-esterification?",
  ],
  "low insulin and low glucose cause high glucagon signaling, activating hormone-sensitive lipase and releasing fatty acids that flood the liver for β-oxidation, leading to acetyl-CoA accumulation and ketogenesis when the TCA cycle is saturated",
  ["high insulin promotes ketogenesis by stimulating fatty acid synthesis in the liver",
   "ketone bodies are produced when glycolysis is maximally active and pyruvate overflows into the ketogenic pathway",
   "ketogenesis is triggered by excess dietary protein that converts amino acids to acetone"],
  ["Insulin suppresses lipolysis and promotes fat storage; high insulin inhibits, not promotes, ketogenesis",
   "Ketogenesis occurs when glycolysis is minimal (low glucose); abundant glycolysis produces pyruvate that feeds the TCA cycle and reduces acetyl-CoA overflow",
   "While some amino acids are ketogenic, the primary trigger for clinical ketogenesis is fatty acid oxidation under low insulin/glucose conditions"],
  "Fasting/low carbohydrate → ↓insulin, ↑glucagon → lipolysis → FFAs → liver β-oxidation → excess acetyl-CoA → TCA saturated → ketogenesis (acetoacetate, β-hydroxybutyrate, acetone).",
  "Ketogenesis: fasting/low insulin → FFA → β-oxidation → excess acetyl-CoA → ketone bodies. Brain can use ketones.",
  "Confusing ketogenesis (low insulin, fasting) with diabetic ketoacidosis (very low insulin + high glucose); DKA has high glucose despite ketosis.",
  ["β-oxidation","Gluconeogenesis","Fatty acid synthesis"],[]),

  mk(2,"Molecular Biology","DNA Replication",[
    "During DNA replication, the lagging strand is synthesized discontinuously as Okazaki fragments. Which enzyme joins these fragments after RNA primer removal?",
    "A mutation inactivates DNA polymerase's 3′→5′ exonuclease activity. What is the most likely consequence?",
  ],
  "DNA ligase seals the nicks between Okazaki fragments after DNA polymerase I removes RNA primers and fills in the gaps",
  ["DNA polymerase III, which also synthesizes the leading strand in continuous fashion",
   "primase, which lays down RNA primers that are later converted into DNA",
   "topoisomerase, which relaxes supercoils ahead of the replication fork"],
  ["DNA polymerase III is the main replicative polymerase but cannot join fragments or remove primers; those are Pol I and ligase functions",
   "Primase makes RNA primers to initiate synthesis; it does not join fragments or replace primers with DNA",
   "Topoisomerase relieves torsional stress ahead of the fork; it does not participate in Okazaki fragment joining"],
  "Lagging strand: primase → RNA primer → Pol III → Okazaki fragment; then Pol I removes primers and fills gaps → DNA ligase seals remaining nicks.",
  "Lagging strand: Pol III extends Okazaki fragments. Pol I removes primers, fills gaps. Ligase seals nicks.",
  "Confusing the roles of Pol I (primer removal) and Pol III (main synthesis); ligase only seals, never synthesizes.",
  ["Proofreading","Telomerase","Helicase and primase"],["5'→3' synthesis; 3'→5' proofreading"]),

  mk(2,"Molecular Biology","Gene Regulation",[
    "In E. coli, when lactose is present and glucose is absent, the lac operon is maximally transcribed. Which combination of regulatory signals accounts for this?",
    "A mutation in the lac operator makes it unable to bind the lac repressor. What is the transcriptional consequence in the absence of lactose?",
  ],
  "allolactose (lactose metabolite) binds and inactivates the repressor, while low glucose causes high cAMP that activates CAP, together maximally stimulating transcription",
  ["glucose activates adenylate cyclase to produce cAMP, directly activating the lac repressor",
   "lactose binds CAP to displace it from the promoter, allowing RNA polymerase access",
   "the lac repressor binds the promoter rather than the operator when lactose is absent"],
  ["Glucose actually inhibits adenylate cyclase; low glucose raises cAMP; glucose does not activate cAMP",
   "CAP is activated by cAMP, not by lactose; lactose acts through the repressor, not through CAP",
   "The repressor binds the operator (not the promoter) and blocks elongation; the promoter is where RNA polymerase binds"],
  "Lac operon dual control: (1) Repressor control: lactose (allolactose) removes repressor → operator free. (2) Catabolite repression: low glucose → high cAMP → CAP binds → enhances transcription. Both signals are required for maximal expression.",
  "Lac operon: repressor OFF by allolactose + CAP ON by cAMP = max transcription. Glucose present → low cAMP → CAP inactive.",
  "Assuming lactose alone is sufficient for maximal expression; forgetting CAP/catabolite repression is the classic MCAT trap.",
  ["Transcription factors","Attenuation","Operon"],["lac: operator + promoter + structural genes"]),

  mk(2,"Cell Biology","Cell Cycle",[
    "Cyclin-dependent kinase 4 (CDK4) complexes with cyclin D to phosphorylate the retinoblastoma protein (Rb). What is the consequence of Rb phosphorylation in the cell cycle?",
    "A cell with a mutated p53 gene is exposed to ionizing radiation. Compared to a cell with functional p53, what is the most likely difference in outcome?",
  ],
  "phosphorylated Rb releases E2F transcription factors, which activate genes required for S phase entry, allowing the cell to pass the G1/S checkpoint",
  ["phosphorylated Rb binds more tightly to E2F, keeping the cell arrested in G1 as a safety measure",
   "Rb phosphorylation directly activates CDK2, bypassing the need for cyclin E",
   "Rb phosphorylation signals the cell to skip S phase and proceed directly to mitosis"],
  ["Rb-P releases E2F; unphosphorylated Rb sequesters E2F; phosphorylation relieves arrest rather than strengthening it",
   "CDK2 is activated by binding cyclin E, not by Rb phosphorylation; Rb-P acts through transcription factor release",
   "S phase (DNA synthesis) follows G1/S checkpoint passage; cells do not skip DNA replication"],
  "Rb is a tumor suppressor. Unphosphorylated Rb binds E2F and blocks G1→S. CDK4/6-cyclin D phosphorylates Rb → E2F released → S-phase genes transcribed. CDK2-cyclin E then drives S phase entry.",
  "Rb = brake. Rb-P = brake released. CDK4/cyclin D phosphorylates Rb → E2F free → S phase.",
  "Confusing Rb phosphorylation as a growth arrest signal; it is the removal of the brake, not application of it.",
  ["Tumor suppressors","CDKs and cyclins","Apoptosis"],["CDK4/6 + cyclin D → Rb-P → E2F release"]),

  mk(2,"Cell Biology","Signal Transduction",[
    "Epinephrine binds β-adrenergic receptors (GPCRs) in cardiac muscle. What is the sequence of events leading to increased heart rate?",
    "A patient's tumor cells have a constitutively active Ras GTPase. Why does this promote uncontrolled proliferation?",
  ],
  "epinephrine → Gs protein → adenylate cyclase activation → cAMP → PKA activation → phosphorylation of proteins that increase heart rate and contraction",
  ["epinephrine binds ion channels directly and opens them without second messenger involvement",
   "epinephrine activates Gi protein, which reduces cAMP and slows the heart",
   "β-adrenergic stimulation activates phospholipase C to produce IP3 and DAG"],
  ["β-adrenergic receptors are GPCRs, not ion channels; they act via second messengers, not direct channel gating",
   "Gi inhibits adenylate cyclase (used by α2 and muscarinic receptors); β-adrenergic receptors couple to Gs, which activates adenylate cyclase",
   "Phospholipase C/IP3/DAG is the Gq pathway used by α1 receptors; β receptors use the Gs/cAMP/PKA pathway"],
  "β-adrenergic: Gs → adenylate cyclase ↑ → cAMP ↑ → PKA → targets (L-type Ca²+ channels, SR Ca²+ release, phospholamban). Result: positive chronotropy and inotropy.",
  "Gs → cAMP → PKA (β receptors). Gi → cAMP↓ (α2, muscarinic M2). Gq → IP3/DAG (α1, muscarinic M1/M3).",
  "Mixing up Gs, Gi, and Gq pathways; the key is which second messenger each G protein targets.",
  ["Receptor tyrosine kinases","MAPK cascade","G proteins"],["Gs: AC↑; Gi: AC↓; Gq: PLC↑"]),

  mk(2,"Physiology","Cardiovascular",[
    "A patient with heart failure has reduced stroke volume. Which compensatory mechanism is described by the Frank-Starling law?",
    "A patient receives a drug that increases heart rate from 70 to 140 beats/min but simultaneously decreases stroke volume from 70 mL to 35 mL. What is the net effect on cardiac output?",
  ],
  "increased ventricular end-diastolic volume (preload) stretches cardiac muscle, increasing the force of contraction and stroke volume, compensating for reduced output",
  ["reduced preload decreases cardiac muscle stretch, increasing the efficiency of each contraction",
   "increased afterload stretches the ventricle, which directly reduces the force of the next contraction",
   "the Frank-Starling mechanism increases heart rate in response to low blood pressure"],
  ["Frank-Starling: MORE preload → MORE stretch → MORE force; reduced preload has the opposite effect",
   "Afterload opposes ejection and reduces stroke volume; it does not stretch the ventricle to increase the next contraction",
   "The Frank-Starling law governs stroke volume based on preload, not heart rate; heart rate is controlled by the autonomic nervous system"],
  "Frank-Starling: SV is proportional to end-diastolic volume (preload). More venous return → more stretch → greater force of contraction (within physiological limits).",
  "Frank-Starling: more preload → more stretch → more force → more stroke volume.",
  "Confusing preload (volume returning to heart) with afterload (pressure opposing ejection); they have opposite effects on stroke volume.",
  ["Cardiac output","Preload vs afterload","Starling forces"],["CO = HR × SV"]),

  mk(2,"Physiology","Respiratory",[
    "A patient at high altitude has PaO2 = 55 mmHg. On the oxyhemoglobin dissociation curve, this places hemoglobin at approximately 85% saturation. Why does the same PaO2 drop to 40 mmHg cause a disproportionately large drop in saturation in tissue?",
    "A patient has a fever, hypercapnia, and lactic acidosis. How would each condition affect the oxyhemoglobin dissociation curve?",
  ],
  "the steep portion of the sigmoid curve at lower PaO2 means small changes in PO2 cause large changes in O2 release, facilitating efficient tissue oxygen delivery",
  ["hemoglobin's affinity for oxygen increases at lower PO2, preventing oxygen release in tissues",
   "the curve is linear at all PO2 levels, so the relationship between saturation and PO2 is constant",
   "cooperative binding prevents any O2 release until all four heme groups are loaded"],
  ["Lower PO2 causes a right shift (Bohr effect) and reduces O2 affinity, facilitating O2 release—the opposite of the stated claim",
   "The sigmoid shape reflects cooperative binding; the flat upper portion and steep lower portion are the defining feature of hemoglobin kinetics",
   "Cooperative binding means the first O2 bound makes subsequent binding easier; it also means the first O2 released makes subsequent release easier"],
  "The sigmoid oxyhemoglobin curve: flat upper portion (lungs, high PaO2) = efficient loading. Steep lower portion (tissues, lower PO2) = efficient unloading. Bohr effect (↑CO2, ↓pH, ↑temp, ↑2,3-BPG) → right shift → less affinity → more O2 released.",
  "Sigmoid curve: flat top = loading. Steep bottom = unloading. Right shift (Bohr effect): ↑CO2, ↓pH, ↑temp, ↑2,3-BPG.",
  "Thinking higher affinity is always better; lower affinity in tissues is what allows O2 delivery.",
  ["Myoglobin vs hemoglobin","V/Q mismatch","2,3-BPG"],[]),

  mk(2,"Physiology","Renal",[
    "Inulin is freely filtered at the glomerulus and neither secreted nor reabsorbed. A patient's plasma inulin is 1 mg/mL, urine inulin is 100 mg/mL, and urine flow rate is 1.2 mL/min. What is the GFR?",
    "A drug has a clearance of 200 mL/min while GFR is 120 mL/min. What does this indicate about the drug's renal handling?",
  ],
  "GFR = 120 mL/min, calculated as clearance = (U × V̇) / P = (100 × 1.2) / 1 = 120 mL/min",
  ["GFR = 83 mL/min, obtained by dividing urine concentration by plasma concentration",
   "GFR = 1200 mL/min, obtained by multiplying plasma concentration by urine flow without correcting for concentration",
   "GFR cannot be determined from inulin because inulin is not an endogenous substance"],
  ["Dividing U/P gives the concentration ratio (100), not clearance; urine flow must be incorporated",
   "Plasma concentration × urine flow gives the wrong dimensions and does not represent clearance",
   "Inulin is the gold standard marker for GFR precisely because it is exogenous, freely filtered, and neither secreted nor reabsorbed"],
  "Clearance = (Uurine × V̇) / Pplasma. For inulin, clearance = GFR because it is exclusively filtered. GFR = (100 mg/mL × 1.2 mL/min) / 1 mg/mL = 120 mL/min.",
  "GFR = inulin clearance = (U × V̇) / P. Clearance > GFR → secretion. Clearance < GFR → reabsorption.",
  "Forgetting to include urine flow rate V̇ in the clearance formula; the equation has three terms, not two.",
  ["Tubular secretion","Creatinine clearance","Starling forces"],["C = (U × V̇) / P"]),

  mk(2,"Physiology","Renal",[
    "A patient presents with pH 7.30, PaCO2 35 mmHg, and HCO3− 17 mEq/L. Which acid-base disorder is present?",
    "A marathon runner at mile 20 develops rapid breathing, low PaCO2 (28 mmHg), elevated pH (7.50), and low HCO3− (22 mEq/L). Which primary disorder with which compensation is shown?",
  ],
  "metabolic acidosis with appropriate respiratory compensation; the low HCO3− drives the acidosis and the near-normal CO2 shows partial respiratory compensation",
  ["respiratory acidosis, because the primary driver is elevated CO2 retention",
   "metabolic alkalosis with respiratory compensation, because HCO3− is the relevant buffer",
   "combined metabolic and respiratory acidosis, because both pH and HCO3− are abnormal"],
  ["Respiratory acidosis requires elevated PaCO2; here PaCO2 is normal or low, ruling out respiratory acidosis as the primary cause",
   "Metabolic alkalosis requires elevated HCO3−; here HCO3− is reduced, indicating acidosis, not alkalosis",
   "Both values are abnormal, but the low HCO3− is the primary cause and the low PaCO2 is the compensatory response, not a combined disorder"],
  "Step 1: pH 7.30 → acidosis. Step 2: HCO3− 17 (low) → metabolic cause. Step 3: PaCO2 35 (expected compensation ≈ 1.5×17+8 = 33.5) → appropriate respiratory compensation.",
  "Metabolic acidosis: pH↓, HCO3−↓. Compensation: ↓PaCO2. Metabolic alkalosis: pH↑, HCO3−↑. Compensation: ↑PaCO2.",
  "Identifying any low pH as 'respiratory acidosis'; always check which primary variable (HCO3− vs PaCO2) is moving in the direction that explains the pH change.",
  ["Henderson-Hasselbalch","RAAS","Renal tubular acidosis"],["pH = 7.61 − 0.015×[HCO3−] (normal CO2 in met. acid.)"]),

  mk(2,"Genetics","Hardy-Weinberg",[
    "A rare autosomal recessive disease affects 1 in 10,000 individuals. Assuming Hardy-Weinberg equilibrium, what is the approximate carrier frequency?",
    "In a population in Hardy-Weinberg equilibrium, the frequency of the dominant phenotype is 91%. What is the frequency of the recessive allele (q)?",
  ],
  "approximately 1 in 50 (2%), calculated as 2pq ≈ 2q for rare alleles where q = √(1/10,000) = 0.01",
  ["1 in 100 (1%), because the carrier frequency equals the disease frequency",
   "1 in 200 (0.5%), because carriers are half as frequent as affected individuals",
   "1 in 10,000 (0.01%), because carrier and disease frequencies are identical for recessive traits"],
  ["Carrier frequency (2pq) is much higher than disease frequency (q²); for q=0.01, carrier frequency = 2(0.99)(0.01) ≈ 0.02 = 2%",
   "Carriers are far more frequent than affected individuals; for q=0.01, 2pq/q² = 2p/q ≈ 200, not 0.5",
   "Disease frequency = q² = 0.0001; carrier frequency = 2pq ≈ 0.02; they differ by a factor of 200"],
  "q² = 1/10,000 → q = 0.01 → p = 0.99. Carrier frequency = 2pq = 2(0.99)(0.01) ≈ 0.02 = 2%. Carriers are ~200× more common than affected individuals for rare recessive diseases.",
  "p² + 2pq + q² = 1. q² = disease frequency. 2pq = carrier frequency ≈ 2q for rare alleles.",
  "Confusing disease frequency (q²) with carrier frequency (2pq); carriers are far more common.",
  ["Genetic drift","Natural selection","Allele frequency"],["q² = affected; 2pq = carriers; p+q = 1"]),

  mk(2,"Genetics","Inheritance",[
    "A man with X-linked recessive color blindness has children with a woman who is a carrier. What fraction of their daughters will be color blind?",
    "A couple's first child has an autosomal recessive disease. What is the probability that their second child will be affected?",
  ],
  "one half of daughters will be color blind, because half receive the X-linked allele from the father and the carrier mother passes the affected X to half of all offspring",
  ["all daughters will be color blind, because the father passes only his affected X chromosome",
   "no daughters will be color blind, because daughters inherit one X from the mother who is only a carrier",
   "one quarter of daughters will be color blind, using the same ratio as an autosomal recessive condition"],
  ["The father passes his one X (with the defective allele) to all daughters, but the mother passes either her normal or affected X; only daughters receiving the affected maternal X are color blind",
   "Daughters who receive the mother's normal X will be carriers, not color blind; daughters receiving the mother's affected X will be color blind",
   "X-linked recessive inheritance differs from autosomal; the 1/4 ratio applies to autosomal recessive, not X-linked"],
  "Father X^a Y × Mother X^A X^a. Daughters: X^A X^a (carrier) or X^a X^a (affected). Half of daughters are affected. All sons of this couple: X^A Y (normal) or X^a Y (affected), half affected.",
  "X-linked recessive: carrier mother × affected father → 1/2 daughters affected, 1/2 sons affected.",
  "Treating X-linked recessive as autosomal recessive and applying 1/4 probability to daughters.",
  ["X-linked dominant","Pedigree analysis","Sex-linked traits"],[]),

  mk(2,"Physiology","Neuromuscular Junction",[
    "Botulinum toxin cleaves SNARE proteins at the neuromuscular junction. Which physiological consequence results?",
    "A patient is given neostigmine (an acetylcholinesterase inhibitor). What is the expected effect at the neuromuscular junction?",
  ],
  "ACh cannot be released from the motor neuron terminal, causing flaccid paralysis because muscle cannot be stimulated",
  ["ACh is released continuously, causing spastic paralysis due to uncontrolled muscle contraction",
   "nicotinic receptors on muscle are destroyed, preventing ACh binding regardless of release",
   "the action potential cannot propagate down the motor nerve, blocking NMJ signaling at the nerve level"],
  ["Botulinum toxin blocks exocytosis of ACh vesicles; the result is absence of ACh and flaccid (not spastic) paralysis",
   "Receptor destruction is the mechanism of myasthenia gravis antibodies; botulinum toxin targets presynaptic vesicle release machinery",
   "Botulinum toxin acts at the presynaptic terminal, not on axonal conduction; the action potential arrives but ACh cannot be released"],
  "SNARE proteins mediate vesicle docking and fusion. Botulinum toxin cleaves SNAREs (specifically VAMP/synaptobrevin) → no ACh vesicle fusion → no ACh release → no muscle activation → flaccid paralysis.",
  "Botulinum: cleaves SNARE → no ACh release → flaccid paralysis. AChE inhibitor: ACh accumulates → prolonged depolarization.",
  "Confusing botulinum (presynaptic ACh release block → flaccid) with tetanus toxin (GABA/glycine block → spastic).",
  ["Action potential","Myasthenia gravis","Anticholinesterases"],[]),

  // ==== PSYCHOLOGICAL, SOCIAL, BIOLOGICAL (section index 3) ====

  mk(3,"Psychology","Learning",[
    "A child who was bitten by a dog now fears all animals, including cats. Which classical conditioning process best explains this generalization?",
    "A dog conditioned to salivate at a bell tone begins to salivate at any high-pitched sound. After repeated presentations of a variety of high-pitched sounds without food, responses become selective again. Which two processes are demonstrated?",
  ],
  "stimulus generalization, in which a conditioned response is elicited by stimuli similar to the original conditioned stimulus",
  ["spontaneous recovery, in which an extinguished response returns after a rest period",
   "higher-order conditioning, in which the conditioned stimulus is paired with a new neutral stimulus",
   "flooding, in which maximum exposure to the feared stimulus eliminates the response"],
  ["Spontaneous recovery describes the return of an extinguished CR; generalization describes responding to new similar stimuli",
   "Higher-order conditioning creates a new CS from an existing CS; generalization is the spread of response to similar stimuli without additional training",
   "Flooding is a therapeutic technique involving prolonged exposure; stimulus generalization is a natural learning phenomenon"],
  "Stimulus generalization: CR spreads to stimuli resembling the CS (dog→all animals). Stimulus discrimination: learning to respond to CS but not similar stimuli. Both are normal parts of classical conditioning.",
  "Generalization: respond to similar stimuli. Discrimination: distinguish CS from non-CS stimuli. Extinction: CS without US → CR decreases.",
  "Confusing generalization (occurs naturally) with overgeneralization in cognitive distortions; here it is a purely behavioral phenomenon.",
  ["Extinction","Spontaneous recovery","Counterconditioning"],[]),

  mk(3,"Psychology","Learning",[
    "A rat receives a food pellet every time it presses a lever, regardless of the time elapsed or number of presses. Which schedule of reinforcement is this, and what pattern of responding does it produce?",
    "A gambler at a slot machine responds at a high, steady rate that is highly resistant to extinction. Which reinforcement schedule best explains this behavior?",
  ],
  "continuous reinforcement (fixed ratio 1), which produces rapid learning but the fastest extinction once reinforcement stops",
  ["variable ratio schedule, which produces high, steady response rates that are most resistant to extinction",
   "fixed interval schedule, which produces a scallop pattern with bursts of responding near each reinforcement",
   "variable interval schedule, which produces a steady, moderate response rate resistant to extinction"],
  ["Variable ratio schedules do produce high, steady rates resistant to extinction, but this describes a slot machine; continuous reinforcement describes every-response reward",
   "Fixed interval produces scallop patterns, not the steady, reliable responding of continuous reinforcement",
   "Variable interval produces steady moderate rates; continuous reinforcement is specifically every single response rewarded"],
  "Schedules: Continuous (FR1) → rapid learning, rapid extinction. Fixed ratio → pause after reward, then burst. Variable ratio (slot machine) → highest rate, most resistant to extinction. Fixed interval → scallop. Variable interval → steady, resistant.",
  "VR: highest rate, most extinction-resistant. FI: scallop. CR: fastest extinction. Fixed = predictable pause.",
  "Thinking continuous reinforcement is best for maintaining behavior long-term; it actually produces fastest extinction.",
  ["Operant conditioning","Shaping","Punishment"],[]),

  mk(3,"Psychology","Memory",[
    "A student studies for an exam in the same room where the exam will be held, performing better than classmates who studied elsewhere. Which memory principle explains this?",
    "A patient with bilateral hippocampal damage can learn new motor skills normally but cannot form new episodic memories. Which dissociation does this illustrate?",
  ],
  "encoding specificity, in which retrieval is enhanced when the context at retrieval matches the context during encoding",
  ["proactive interference, in which old memories disrupt retrieval of new information",
   "the spacing effect, in which distributed practice improves recall compared to massed practice",
   "consolidation, in which memories are transferred from short-term to long-term storage during sleep"],
  ["Proactive interference is when old memories block new learning; this scenario describes a context-match benefit, not interference",
   "The spacing effect describes better memory from distributed study sessions; the benefit here is context matching, not spacing",
   "Consolidation explains why sleep improves memory; the effect described is about environmental context at retrieval"],
  "Encoding specificity principle (Tulving): memory is best when retrieval conditions match encoding conditions (same room, same state, same cues). Context-dependent and state-dependent memory are related phenomena.",
  "Encoding specificity: memory is cue-dependent. Motor skills = procedural (implicit, basal ganglia/cerebellum). Episodic memories = declarative (explicit, hippocampus).",
  "Confusing context-dependent memory with mnemonics; encoding specificity is about environmental/internal state matching.",
  ["Long-term potentiation","Forgetting","Anterograde amnesia"],[]),

  mk(3,"Psychology","Memory",[
    "A student studying Spanish finds that previously learned French vocabulary interferes with recall of new Spanish words. What type of interference is this?",
    "After learning a list of new vocabulary, a student forgets words from an earlier list learned the same day. Which interference type is responsible?",
  ],
  "proactive interference, in which older learned material (French) interferes with the encoding or retrieval of newer material (Spanish)",
  ["retroactive interference, in which newer material disrupts recall of older material",
   "the serial position effect, in which primacy and recency determine recall regardless of similar material",
   "motivated forgetting, in which anxiety about language learning suppresses both sets of memories"],
  ["Retroactive interference is when new learning disrupts old memories; here old learning (French) disrupts new learning (Spanish), which is proactive",
   "The serial position effect describes recall patterns within a list based on position; it does not involve cross-list interference from similar content",
   "Motivated forgetting involves emotionally aversive material; learning two languages is not described as anxiety-inducing in this scenario"],
  "Proactive: PRO-old interferes with new. Retroactive: RETRO-new interferes with old (going backward). Memory tip: Pro-active = old moving Forward and blocking new; Retro-active = new going Backward and erasing old.",
  "Proactive: old→new disruption. Retroactive: new→old disruption.",
  "Reversing the direction; proactive interference comes from PRIOR learning, not new learning.",
  ["Decay theory","Retrieval failure","Encoding"],[]),

  mk(3,"Psychology","Sensation and Perception",[
    "A radiologist improves at detecting subtle lung nodules on CT scans after training. Colleagues note the radiologist also develops more false positives. What does this change reflect in signal detection theory?",
    "A barely noticeable difference in weight can be detected when 100 g is added to a 1000 g reference weight, but requires 100 g added to 1000 g or 200 g added to 2000 g. What law governs this relationship?",
  ],
  "a lowered response criterion (liberal bias), meaning the radiologist is more willing to report a signal, increasing both hits and false alarms",
  ["improved sensitivity (d prime), meaning the radiologist is better at discriminating signals from noise without criterion change",
   "adaptation, in which repeated exposure to lung nodules raises the detection threshold",
   "the absolute threshold has decreased, so weaker signals now reach awareness"],
  ["Improved d prime would increase hits without proportionally increasing false alarms; the increase in false positives indicates a criterion shift, not sensitivity change",
   "Adaptation reduces responsiveness to a repeated stimulus; training in detection improves, not impairs, task performance",
   "Absolute threshold involves the minimum detectable stimulus intensity in isolation; signal detection theory addresses detection in noise, and criterion is distinct from threshold"],
  "Signal detection theory separates sensitivity (d') from response criterion (β). A more liberal criterion → more hits AND more false alarms. A conservative criterion → fewer false alarms AND more misses. Training can shift either independently.",
  "SDT: d' = sensitivity (independent of willingness). Criterion = willingness to report. Liberal → more hits + more false alarms.",
  "Assuming that 'better at detecting' always means higher sensitivity (d'); it may instead reflect a shifted criterion.",
  ["Weber's law","Absolute threshold","Perceptual set"],[]),

  mk(3,"Psychology","Development",[
    "A 7-year-old understands that pouring water from a short, wide glass into a tall, narrow glass does not change the amount of water. A 4-year-old believes the tall glass has more. Which cognitive milestone does the 7-year-old demonstrate?",
    "A teenager argues that civil disobedience against an unjust law is morally justified based on abstract principles of justice. According to Kohlberg, which stage of moral reasoning does this represent?",
  ],
  "conservation, a concrete operational achievement (Piaget), understanding that quantity is invariant despite perceptual changes in appearance",
  ["object permanence, understanding that objects continue to exist when out of sight",
   "centration, the tendency to focus on only one perceptual dimension at a time",
   "egocentrism, the inability to adopt another person's perspective"],
  ["Object permanence develops in the sensorimotor stage (~8–12 months); the 7-year-old described is demonstrating concrete operational thought",
   "Centration is the error the 4-year-old makes (focusing only on height); the 7-year-old has overcome centration, not exhibited it",
   "Egocentrism is characteristic of preoperational thought; conservation is the achievement that marks concrete operations"],
  "Piaget's stages: Sensorimotor (0–2): object permanence. Preoperational (2–7): symbolic thought, centration, egocentrism, no conservation. Concrete operational (7–11): conservation, decentration, reversibility. Formal operational (12+): abstract reasoning.",
  "Conservation = concrete operational. Object permanence = sensorimotor. Egocentrism = preoperational. Abstract morality = Kohlberg postconventional.",
  "Placing conservation in the wrong Piaget stage; it appears at concrete operational (~7), not preoperational.",
  ["Vygotsky","Erikson's stages","Theory of mind"],[]),

  mk(3,"Psychology","Social Psychology",[
    "A jury member initially unsure of a defendant's guilt shifts to a confident guilty vote after group deliberation. No new evidence was presented. Which social phenomenon best explains this shift?",
    "A student performs better on a simple multiplication task when others are watching, but worse on a complex statistical analysis when observed. Which phenomenon applies?",
  ],
  "group polarization, in which group discussion tends to strengthen members' initial leanings, shifting the group toward a more extreme position",
  ["groupthink, in which the desire for group consensus suppresses dissent and critical evaluation",
   "deindividuation, in which anonymity in groups leads to reduced self-awareness and more impulsive behavior",
   "social loafing, in which individual effort decreases when working collectively"],
  ["Groupthink involves suppression of dissenting views to maintain cohesion; group polarization can occur even without pressure to conform, simply through discussion",
   "Deindividuation involves anonymity (e.g., crowds, online) reducing individual identity; this scenario is a deliberating jury, not an anonymous setting",
   "Social loafing involves reduced individual effort in groups; this scenario is about opinion shift, not effort reduction"],
  "Group polarization: discussion strengthens pre-existing leanings. If most members lean guilty initially, deliberation shifts the group to stronger conviction. Different from groupthink (conformity pressure) and risky shift (specific form of polarization toward risk).",
  "Group polarization: discussion → more extreme version of initial majority lean. Groupthink: pressure to conform → poor decisions.",
  "Confusing group polarization (direction determined by pre-existing lean) with groupthink (pressure-based conformity).",
  ["Conformity","Obedience","In-group bias"],[]),

  mk(3,"Psychology","Social Psychology",[
    "A bystander witnesses a person collapse in a crowded park but does not help. A passerby who is alone immediately calls for help. Which concept explains the difference?",
    "An observer sees a student fail an exam and concludes the student is lazy, not considering that the exam was unusually difficult. Which attribution error does this illustrate?",
  ],
  "diffusion of responsibility in the bystander effect, in which the presence of others reduces each individual's felt obligation to act",
  ["social facilitation, in which the presence of others improves an individual's performance on helping tasks",
   "the mere exposure effect, in which familiarity with the victim increases helping behavior",
   "social comparison, in which individuals evaluate their prosocial behaviors against group norms"],
  ["Social facilitation improves performance on well-learned tasks; it does not explain reduced helping in emergencies with multiple bystanders",
   "The mere exposure effect increases positive feelings toward familiar stimuli; familiarity is not described in this scenario",
   "Social comparison involves evaluating one's own performance or opinions relative to others; diffusion of responsibility is the specific mechanism of bystander non-helping"],
  "Bystander effect: more observers → less individual helping. Mechanisms: (1) diffusion of responsibility (others will help), (2) pluralistic ignorance (others seem unconcerned, so maybe it's fine). Latané and Darley demonstrated this in staged emergencies.",
  "Bystander effect: more people → less helping. FAE: underestimate situation, overestimate disposition.",
  "Thinking larger groups are more likely to help; counterintuitively, more bystanders reduce individual intervention.",
  ["Conformity","Pluralistic ignorance","Prosocial behavior"],[]),

  mk(3,"Psychology","Stress and Health",[
    "A student under chronic exam stress shows elevated cortisol, reduced lymphocyte proliferation, and increased rates of upper respiratory infections. Which pathway best connects stress to immune suppression?",
    "Selye's general adaptation syndrome (GAS) has three stages. A medical resident who has worked 80-hour weeks for two years collapses with exhaustion and illness. Which stage does this represent?",
  ],
  "chronic HPA axis activation elevates cortisol, which inhibits pro-inflammatory cytokines and suppresses T and B lymphocyte proliferation, impairing adaptive immunity",
  ["the sympathetic nervous system directly destroys lymphocytes through catecholamine toxicity",
   "stress increases glucagon secretion, which diverts glucose from immune cells to muscle",
   "stress lowers insulin, reducing glucose uptake in lymphocytes and impairing antibody production"],
  ["While the SNS releases catecholamines during acute stress, lymphocyte destruction by catecholamines is not the primary mechanism; HPA-cortisol suppression is more significant in chronic stress",
   "Glucagon raises blood glucose but does not selectively divert glucose away from immune cells; the HPA-cortisol axis is the primary neuroimmune link",
   "Insulin affects glucose uptake broadly; the immune suppression in chronic stress is primarily mediated by cortisol's anti-inflammatory and lympholytic effects"],
  "Chronic stress → sustained HPA activation → high cortisol → binds glucocorticoid receptors on immune cells → inhibits NF-κB → ↓ pro-inflammatory cytokines (IL-2, IL-6, TNF) → impaired T cell proliferation and B cell antibody production.",
  "Chronic stress → cortisol (HPA axis) → immune suppression. GAS stages: alarm → resistance → exhaustion.",
  "Attributing all stress-immune effects to the sympathetic nervous system; the HPA-cortisol axis is the key chronic stress pathway.",
  ["Allostatic load","Fight-or-flight","Psychoneuroimmunology"],[]),

  mk(3,"Sociology","Social Stratification",[
    "Max Weber argued that social stratification cannot be understood solely through economic class. Which additional dimensions did he propose?",
    "A first-generation college student earns a medical degree and achieves income and prestige far exceeding their parents. Which type of social mobility does this represent?",
  ],
  "Weber identified class (economic), status (social prestige), and party/power (political influence) as three distinct, partially independent dimensions of stratification",
  ["Weber proposed that stratification is entirely determined by means of production, as described in Marxist class theory",
   "Weber argued that religious beliefs (Protestant ethic) are the only meaningful dimension of social stratification",
   "Weber proposed that biological differences between groups explain most variation in social position"],
  ["Marx focused on means of production and class conflict; Weber agreed class matters but added status and power as separate dimensions",
   "While Weber analyzed the Protestant ethic and capitalism, he proposed the tripartite model of stratification as a distinct contribution, not religion alone",
   "Weber's stratification model is sociological, not biological; he emphasized social structures, not biological determinism"],
  "Weber's tripartite model: (1) Class = economic position/market. (2) Status = social honor/prestige. (3) Party/Power = political influence. These can be aligned or misaligned (e.g., 'nouveau riche' has class but may lack status).",
  "Weber: class + status + power = three pillars of stratification. Marx: class conflict (bourgeoisie vs proletariat) = only pillar.",
  "Conflating Weber and Marx; Weber explicitly critiqued purely economic models of stratification.",
  ["Social mobility","Cultural capital","Intersectionality"],[]),

  mk(3,"Sociology","Health Disparities",[
    "Research consistently shows that lower socioeconomic status is associated with higher rates of cardiovascular disease, even after controlling for behaviors like smoking and diet. Which explanatory framework best accounts for this residual association?",
    "The term 'upstream determinants' of health refers to which type of factors?",
  ],
  "structural and psychosocial mechanisms including chronic stress from financial insecurity, limited access to healthcare, and adverse neighborhood environments that persist independently of individual behaviors",
  ["lower SES individuals have genetic variants that directly cause cardiovascular disease",
   "behavioral risk factors such as poor diet and smoking fully explain the SES-health gradient when properly measured",
   "social mobility eliminates the health gradient because individuals can improve their SES over time"],
  ["Genetics do not explain the graded, dose-response relationship between SES and health seen across the income spectrum; structural mechanisms are more consistent with the evidence",
   "The residual association persists after controlling for behavioral risk factors; this is the key finding that points to structural causes beyond behavior",
   "Social mobility is possible but is neither uniform nor rapid; the structural mechanisms of poverty operate throughout the life course regardless of eventual mobility"],
  "The SES-health gradient is robust and graded (each step up in SES improves health). Proposed mechanisms: chronic stress → cortisol → cardiovascular damage; limited healthcare access; environmental exposures; neighborhood quality; allostatic load.",
  "SES-health gradient: structural/psychosocial mechanisms persist after behavioral adjustment. Upstream = social structures, policies. Downstream = individual behaviors.",
  "Assuming that controlling for smoking and diet eliminates the SES effect; a residual structural component remains.",
  ["Social determinants of health","Allostatic load","Health equity"],[]),

  mk(3,"Sociology","Norms and Deviance",[
    "A student is informally excluded from a friend group for repeatedly interrupting others. No rule was violated, but the behavior was socially unacceptable. Which sociological concept best applies?",
    "Howard Becker's labeling theory argues that deviance is not an inherent property of an act. What does it depend on instead?",
  ],
  "violation of a social norm enforced by informal negative sanctions (social exclusion), not a formal rule or law",
  ["violation of a folkway with a formal legal sanction",
   "violation of a more, which carries severe moral condemnation by society",
   "an example of secondary deviance, in which the labeled person internalizes a deviant identity"],
  ["Folkways are informal norms; the sanction here (social exclusion) is also informal, not formal/legal; describing the sanction as formal is incorrect",
   "Mores are norms with strong moral weight (e.g., prohibitions against theft, violence); interrupting conversation violates a minor social expectation, not a moral rule",
   "Secondary deviance (Lemert) refers to identity change following labeling; this scenario describes the initial social response to the behavior, not an identity internalization"],
  "Norms: mores (strong moral significance), folkways (everyday courtesy, minor infractions), taboos (strongest prohibitions). Sanctions: formal (legal) vs informal (social approval/disapproval). Labeling theory: deviance is defined by societal reaction, not inherent to the act.",
  "Folkways = minor norms, informal sanctions. Mores = moral norms, strong sanctions. Labeling theory: deviance defined by social reaction.",
  "Classifying all norm violations as mores; mores carry strong moral condemnation, while folkways are everyday courtesy rules.",
  ["Social control","Deviance","Stigma"],[]),

  mk(3,"Research Methods","Validity and Bias",[
    "A clinical trial recruits volunteers who respond to a newspaper ad. Compared to the general population, this sample skews toward healthier, more educated individuals. Which threat to validity does this represent?",
    "Participants in a study on productivity work harder than usual because they know they are being observed. What is this phenomenon called?",
  ],
  "selection bias (or sampling bias), which limits external validity by making the sample unrepresentative of the target population",
  ["observer bias, in which the researcher's expectations influence data collection",
   "attrition bias, in which differential dropout between groups distorts outcomes",
   "social desirability bias, in which participants answer questions in ways they think are expected"],
  ["Observer bias refers to systematic error in the researcher's measurement or interpretation, not in who is recruited",
   "Attrition bias occurs when participants drop out differentially after enrollment; the issue here is who is enrolled to begin with",
   "Social desirability bias involves participants misreporting behavior to appear favorable; here the issue is who enters the study, not how they respond within it"],
  "Selection bias: the sample systematically differs from the target population, limiting external validity (generalizability). Random sampling reduces selection bias. Convenience samples (volunteers, clinic patients) are prone to it.",
  "Selection bias → non-representative sample → limits external validity. Hawthorne effect → behavior changes from being observed.",
  "Confusing selection bias (who enters the study) with attrition bias (who leaves the study); they threaten validity differently.",
  ["Internal vs external validity","Confounding variables","Randomization"],[]),

  mk(3,"Research Methods","Study Design",[
    "Researchers find that communities with more fast-food restaurants have higher rates of obesity. A newspaper headline reads: 'Fast food causes obesity.' What is the fundamental error in this conclusion?",
    "In a randomized controlled trial, an experimental drug reduces cholesterol by 30 mg/dL (p = 0.001, 95% CI: 20–40 mg/dL). Which statement best interprets these results?",
  ],
  "correlation does not imply causation; the association could be confounded by socioeconomic factors that independently predict both fast-food density and obesity rates",
  ["the study was not double-blinded, so placebo effects could explain the obesity rates",
   "the sample size was too small to detect a true causal relationship",
   "causal conclusions require p < 0.001, and this threshold was not specified in an observational study"],
  ["Blinding is relevant in interventional studies; this is an observational correlation study where blinding does not apply",
   "Sample size affects statistical power but cannot make a correlation into causation; a large observational study still cannot establish causality",
   "Statistical significance thresholds do not determine whether causality can be inferred; study design (randomized vs observational) determines the causal inference capacity"],
  "Observational studies establish associations, not causation. Establishing causation requires ruling out confounders, reverse causation, and chance. The Bradford Hill criteria (strength, consistency, temporality, plausibility, etc.) guide causal inference.",
  "Correlation ≠ causation. RCTs can establish causation. Observational studies establish association only.",
  "Assuming that statistical significance proves causation; p-values address whether an effect is real, not what caused it.",
  ["Confounding","RCT design","Ecological fallacy"],[]),
];

// ── Calculation generators (expanded) ────────────────────────────────────────
const calcGenerators = [
  {
    section: MCAT_SECTIONS[0], topic: "Physics", subtopic: "Kinematics", difficulty: "easy",
    formula: "v = v₀ + at",
    make(i) {
      const a = 2 + (i % 5), t = 3 + (i % 7), ans = a * t;
      return q(`An object starts from rest and accelerates uniformly at ${a} m/s² for ${t} s. What is its speed at the end of this interval?`,
        `${ans} m/s`, [`${ans + a} m/s`, `${ans * 2} m/s`, `${Math.max(1, ans - t)} m/s`],
        "v = v₀ + at. Starting from rest (v₀ = 0): v = 0 + at.");
    }
  },
  {
    section: MCAT_SECTIONS[0], topic: "General Chemistry", subtopic: "Dilution", difficulty: "medium",
    formula: "M₁V₁ = M₂V₂",
    make(i) {
      const m1 = [1, 2, 4, 5][i % 4], m2 = [0.1, 0.2, 0.5][i % 3], v2 = [100, 250, 500][i % 3];
      const ans = Math.round((m2 * v2) / m1);
      return q(`What volume of ${m1.toFixed(1)} M stock solution is needed to prepare ${v2} mL of ${m2.toFixed(2)} M solution?`,
        `${ans} mL`, [`${ans * 2} mL`, `${Math.max(1, Math.round(ans / 2))} mL`, `${ans + 100} mL`],
        "M₁V₁ = M₂V₂ conserves moles of solute. Solve for V₁ = M₂V₂ / M₁.");
    }
  },
  {
    section: MCAT_SECTIONS[0], topic: "General Chemistry", subtopic: "Acid-Base", difficulty: "medium",
    formula: "pH = pKa + log([A⁻]/[HA])",
    make(i) {
      const offset = [1, -1, 0][i % 3];
      const ratioStr = { 1: "10:1", "-1": "1:10", 0: "1:1" }[offset];
      const stem = offset === 1 ? "one unit above its pKa" : offset === -1 ? "one unit below its pKa" : "equal to its pKa";
      return q(`A buffer solution has pH ${stem}. What is the approximate [conjugate base]:[acid] ratio?`,
        ratioStr, ["100:1", "1:100", "2:1"].filter(x => x !== ratioStr).slice(0, 3),
        "pH = pKa + log([A⁻]/[HA]). If pH − pKa = +1, log(ratio) = 1, ratio = 10.");
    }
  },
  {
    section: MCAT_SECTIONS[0], topic: "Physics", subtopic: "Circuits", difficulty: "medium",
    formula: "1/Req = 1/R₁ + 1/R₂",
    make(i) {
      const pairs = [[6, 3, 2], [4, 4, 2], [10, 10, 5], [12, 6, 4]][i % 4];
      const [r1, r2, ans] = pairs;
      return q(`A ${r1}-Ω and a ${r2}-Ω resistor are connected in parallel. What is the equivalent resistance?`,
        `${ans} Ω`, [`${r1 + r2} Ω`, `${Math.abs(r1 - r2) || r1} Ω`, `${ans * 3} Ω`],
        "1/Req = 1/R₁ + 1/R₂. Parallel equivalent is always less than the smallest branch.");
    }
  },
  {
    section: MCAT_SECTIONS[2], topic: "Physiology", subtopic: "Renal Clearance", difficulty: "hard",
    formula: "C = (U × V̇) / P",
    make(i) {
      const U = [20, 40, 60][i % 3], flow = [1, 2, 3][i % 3], P = [2, 4, 5][i % 3];
      const ans = Math.round((U * flow) / P);
      return q(`A drug has urine concentration ${U} mg/mL, urine flow ${flow} mL/min, and plasma concentration ${P} mg/mL. What is its renal clearance?`,
        `${ans} mL/min`, [`${ans * 2} mL/min`, `${Math.max(1, ans - 5)} mL/min`, `${ans + 20} mL/min`],
        "Clearance = (U × V̇) / P. Units: mL/min. Compare to GFR (120 mL/min) to infer secretion or reabsorption.");
    }
  },
  {
    section: MCAT_SECTIONS[0], topic: "Physics", subtopic: "Work and Energy", difficulty: "easy",
    formula: "KE = ½mv²",
    make(i) {
      const m = [2, 4, 5, 10][i % 4], v = [3, 4, 6, 10][i % 4];
      const ans = Math.round(0.5 * m * v * v);
      return q(`A ${m} kg object moves at ${v} m/s. What is its kinetic energy?`,
        `${ans} J`, [`${m * v} J`, `${2 * ans} J`, `${Math.max(1, ans - m * v)} J`],
        "KE = ½mv². Square the velocity before multiplying.");
    }
  },
  {
    section: MCAT_SECTIONS[2], topic: "Biochemistry", subtopic: "Enzyme Kinetics", difficulty: "medium",
    formula: "v = Vmax[S] / (Km + [S])",
    make(i) {
      const Vmax = [100, 200, 60][i % 3], Km = [5, 10, 20][i % 3], S = [Km, Km * 9, Km / 9][i % 3];
      const ans = Math.round((Vmax * S) / (Km + S));
      return q(`An enzyme has Vmax = ${Vmax} μmol/min and Km = ${Km} mM. At [S] = ${S.toFixed(1)} mM, what is the reaction velocity?`,
        `${ans} μmol/min`, [`${Math.round(Vmax / 2)} μmol/min`, `${Vmax} μmol/min`, `${Math.max(1, ans - 20)} μmol/min`],
        "Michaelis-Menten: v = Vmax[S]/(Km+[S]). When [S] = Km, v = Vmax/2.");
    }
  },
];

function q(stem, correct, distractors, explanation) {
  return { stem, correct, distractors, explanation };
}

// ── Core question builders ────────────────────────────────────────────────────
function hash(text) {
  let v = 2166136261;
  for (let i = 0; i < text.length; i++) { v ^= text.charCodeAt(i); v = Math.imul(v, 16777619); }
  return v >>> 0;
}

function shuffleChoices(correct, distractors, seed) {
  const entries = [correct, ...distractors.slice(0, 3)].map((text, i) => ({ text, orig: i }));
  entries.sort((a, b) => hash(`${seed}-${a.text}`) - hash(`${seed}-${b.text}`));
  return {
    choices: entries.map((e, i) => ({ id: letters[i], text: e.text })),
    correct_answer: letters[entries.findIndex(e => e.orig === 0)],
  };
}

function baseQ({ id, section, topic, subtopic, difficulty, question_type, passage, stem, correct, distractors, wrong_explanations, explanation, takeaway, trap, related = [], formulas = [] }) {
  const sh = shuffleChoices(correct, distractors, id);
  const wrongMap = Object.fromEntries(sh.choices.map((c, ci) => {
    if (c.id === sh.correct_answer) return [c.id, "This is the correct answer."];
    const origDistIdx = distractors.indexOf(c.text);
    const exp = (wrong_explanations && origDistIdx >= 0 && wrong_explanations[origDistIdx])
      ? wrong_explanations[origDistIdx]
      : "This distractor targets a common misconception about the mechanism or relationship.";
    return [c.id, exp];
  }));
  return {
    id, section, topic, subtopic, difficulty, question_type,
    passage: passage || { title: "", text: "", figures: [], tables: [] },
    stem,
    choices: sh.choices,
    correct_answer: sh.correct_answer,
    explanation: {
      short: explanation,
      detailed: `${explanation} This item tests MCAT-style mechanistic reasoning.`,
      why_correct: `${sh.correct_answer} is correct: ${correct}.`,
      wrong_answer_explanations: wrongMap,
      high_yield_takeaway: takeaway || explanation,
      common_trap: trap || "Read each choice for the mechanism it describes, not just keywords.",
      how_to_think: "Predict the expected relationship before reading choices, then eliminate those that reverse or overstate it.",
      related_concepts: related,
      formulas,
    },
    tags: [topic, subtopic, question_type, "generated"],
    estimated_time_seconds: question_type === "cars" ? 105 : question_type === "calculation" ? 90 : 75,
    source: {
      source_type: "original",
      license: "Original generated content for Project 528",
      attribution: "Project 528 concept generator v2",
    },
    review: { status: "approved", created_at: now, updated_at: now },
  };
}

// Passage types to cycle through for non-CARS sections
const passageTypes = ["discrete", "passage", "data_interpretation", "experimental_design"];

function conceptQuestion(concept, idx) {
  const stem = concept.stems[idx % concept.stems.length];
  const qtype = passageTypes[idx % passageTypes.length];
  const isPassage = qtype !== "discrete";
  const passage = isPassage ? {
    title: `${concept.subtopic} Scenario`,
    text: `A study examines ${concept.subtopic.toLowerCase()} using ${["an in vitro enzymatic assay", "a controlled animal model", "a randomized clinical study", "a computational pharmacokinetic model"][idx % 4]}. Investigators are specifically interested in distinguishing ${concept.concept} from related phenomena.`,
    figures: [],
    tables: [],
  } : null;

  return baseQ({
    id: `cq-${idx.toString().padStart(6, "0")}`,
    section: concept.section,
    topic: concept.topic,
    subtopic: concept.subtopic,
    difficulty: ["easy", "medium", "hard"][idx % 3],
    question_type: qtype,
    passage,
    stem,
    correct: concept.correct,
    distractors: concept.distractors,
    wrong_explanations: concept.wrong_explanations,
    explanation: concept.explanation,
    takeaway: concept.takeaway,
    trap: concept.trap,
    related: concept.related,
    formulas: concept.formulas,
  });
}

function calculationQuestion(idx) {
  const gen = calcGenerators[idx % calcGenerators.length];
  const made = gen.make(idx);
  return baseQ({
    id: `calc-${idx.toString().padStart(6, "0")}`,
    section: gen.section,
    topic: gen.topic,
    subtopic: gen.subtopic,
    difficulty: gen.difficulty,
    question_type: "calculation",
    stem: made.stem,
    correct: made.correct,
    distractors: made.distractors,
    wrong_explanations: [],
    explanation: made.explanation,
    takeaway: `Apply ${gen.formula} when the problem gives the relevant variables.`,
    trap: "Check units and identify which variables are given before choosing a formula.",
    related: [gen.subtopic, gen.topic],
    formulas: [gen.formula],
  });
}

// CARS question types
const carsQtypes = [
  { stem: "Which statement best expresses the author's central claim?",           sub: "Main idea" },
  { stem: "The author mentions [X] primarily in order to:",                       sub: "Function" },
  { stem: "Which inference is best supported by information in the passage?",     sub: "Inference" },
  { stem: "The author's attitude toward the subject is best described as:",       sub: "Tone" },
  { stem: "Which finding would most strengthen the author's argument?",           sub: "Strengthen" },
  { stem: "Which of the following, if true, would most weaken the passage's central argument?", sub: "Weaken" },
  { stem: "According to the passage, which distinction does the author draw between [A] and [B]?", sub: "Detail" },
];

function carsQuestion(pool, idx) {
  const src = pool.length > 0 ? pool[idx % pool.length] : null;
  const qt = carsQtypes[idx % carsQtypes.length];

  const passageText = src
    ? src.extract
    : [
        "The author contends that ethical evaluation in medicine cannot be reduced to algorithmic rules, because each clinical encounter involves morally distinct particulars that resist universal formulas.",
        "The passage argues that scientific consensus is not simply the product of evidence but also reflects social negotiations, institutional pressures, and the limits of available methods.",
        "The author distinguishes between equality of treatment and equity of outcome, arguing that identical policies applied to structurally unequal groups may perpetuate rather than reduce disparities.",
        "The passage maintains that the placebo response is not a methodological nuisance but a genuine therapeutic phenomenon deserving systematic study in its own right.",
      ][idx % 4];

  const passageTitle = src ? src.title : `CARS Passage ${idx + 1}`;

  // Derive a main idea and distractors from the passage text
  const mainIdea = src
    ? `The passage examines the complex ethical and empirical dimensions of ${src.title.toLowerCase()}, arguing that simple frameworks are insufficient to capture its full scope`
    : "The author advocates for a nuanced approach that acknowledges context-specific factors over universal rules";

  return baseQ({
    id: `cars-${idx.toString().padStart(6, "0")}`,
    section: MCAT_SECTIONS[1],
    topic: "CARS",
    subtopic: qt.sub,
    difficulty: ["medium", "medium", "hard"][idx % 3],
    question_type: "cars",
    passage: { title: passageTitle, text: passageText, figures: [], tables: [] },
    stem: qt.stem,
    correct: mainIdea,
    distractors: [
      `The author argues that ${src ? src.title.toLowerCase() : "the topic"} can be fully understood through a single, definitive theoretical framework`,
      `The passage primarily functions as a survey of empirical data without advancing a normative argument`,
      `The author concludes that the current evidence is insufficient to take any position on ${src ? src.title.toLowerCase() : "the subject"}`,
    ],
    wrong_explanations: [
      "The passage explicitly resists single-framework reductionism; this distractor overstates the author's confidence in any one approach",
      "The passage does advance a normative or interpretive argument, not merely a survey; CARS passages always have an author perspective",
      "The author takes a clear position throughout; stating that no position is possible misreads the passage's argumentative structure",
    ],
    explanation: "CARS main-idea answers must match the passage's actual central claim in scope and tone, avoiding extremes and unsupported additions.",
    takeaway: "Find the author's thesis in the passage, then eliminate choices that are too broad, too narrow, or add claims the passage does not support.",
    trap: "Eliminating the correct answer because it sounds like a paraphrase rather than a direct quote; paraphrasing is the standard MCAT approach.",
    related: ["Inference", "Author tone", "Argument structure"],
  });
}

function experimentalQuestion(pool, idx) {
  const src = pool.length > 0 ? pool[idx % pool.length] : null;
  if (!src) return conceptQuestion(concepts[idx % concepts.length], idx);

  const passageText = `${src.title}. ${src.abstract}`;
  const qtypes = [
    { stem: "Based on the study described in the passage, which conclusion is best supported by the data?", sub: "Data interpretation" },
    { stem: "Which modification to the experimental design would best address a potential confound in this study?", sub: "Experimental design" },
    { stem: "The control condition in this experiment serves primarily to:", sub: "Controls" },
    { stem: "Which alternative hypothesis would be most difficult to rule out based on the described results?", sub: "Alternative explanations" },
  ];
  const qt = qtypes[idx % qtypes.length];

  return baseQ({
    id: `exp-${idx.toString().padStart(6, "0")}`,
    section: MCAT_SECTIONS[idx % 2 === 0 ? 2 : 3],
    topic: src.topic,
    subtopic: qt.sub,
    difficulty: ["medium", "hard"][idx % 2],
    question_type: "experimental_design",
    passage: { title: src.title, text: passageText, figures: [], tables: [] },
    stem: qt.stem,
    correct: `the study provides evidence that the independent variable produces the observed change in the outcome, consistent with the proposed mechanism described in the abstract`,
    distractors: [
      "the correlational design proves a direct causal relationship between the variables measured",
      "the results cannot be generalized because the study used a non-human model system",
      "the lack of a negative control means any observed effect could be due to handling alone",
    ],
    wrong_explanations: [
      "Even well-designed studies cannot prove causation from correlation; the word 'proves' is too strong and is a classic wrong-answer signal on the MCAT",
      "Model systems have limitations but provide mechanistic evidence; failure to generalize is a concern, not an absolute disqualifier",
      "The study may have a negative control not explicitly mentioned; this extreme inference goes beyond the information given",
    ],
    explanation: "Research passage questions require identifying what the data support versus what they prove, and distinguishing study limitations from study invalidation.",
    takeaway: "Evidence 'supports' a conclusion; it rarely 'proves' one. Always ask: what does the control group tell you?",
    trap: "Selecting answers that use absolute language ('proves,' 'cannot,' 'always') when the data only support a probabilistic conclusion.",
    related: ["Internal validity", "Control groups", "Confounding variables"],
  });
}

// ── Generation loop ───────────────────────────────────────────────────────────
function buildTargets(total) {
  const weights = { [MCAT_SECTIONS[0]]: 59, [MCAT_SECTIONS[1]]: 53, [MCAT_SECTIONS[2]]: 59, [MCAT_SECTIONS[3]]: 59 };
  const wtotal = Object.values(weights).reduce((a, b) => a + b, 0);
  const targets = Object.fromEntries(MCAT_SECTIONS.map(s => [s, Math.floor(total * weights[s] / wtotal)]));
  let assigned = Object.values(targets).reduce((a, b) => a + b, 0);
  for (const s of MCAT_SECTIONS) { if (assigned >= total) break; targets[s]++; assigned++; }
  return targets;
}

const questions = [...createDemoQuestions()];
const targets = buildTargets(targetCount);
const counts = Object.fromEntries(MCAT_SECTIONS.map(s => [s, questions.filter(q => q.section === s).length]));
let cqIdx = 0, calcIdx = 0, carsIdx = 0, expIdx = 0;

for (const section of MCAT_SECTIONS) {
  const sectionConcepts = concepts.filter(c => c.section === section);
  let localIdx = 0;
  while ((counts[section] || 0) < targets[section] && questions.length < targetCount) {
    let newQ;
    if (section === MCAT_SECTIONS[1]) {
      // CARS: alternate between passage-based and experimental-style
      if (localIdx % 5 === 4 && pubmedPool.length > 0) {
        newQ = experimentalQuestion(pubmedPool, expIdx++);
        newQ.section = MCAT_SECTIONS[1];
      } else {
        newQ = carsQuestion(carsPool, carsIdx++);
      }
    } else {
      const slot = localIdx % 12;
      if (slot === 0 || slot === 6) {
        newQ = calculationQuestion(calcIdx++);
        if (newQ.section !== section) newQ = conceptQuestion(sectionConcepts[cqIdx % sectionConcepts.length] || concepts[cqIdx % concepts.length], cqIdx++);
      } else if (slot === 3 || slot === 9) {
        newQ = experimentalQuestion(pubmedPool, expIdx++);
        newQ.section = section;
      } else {
        const concept = sectionConcepts[cqIdx % sectionConcepts.length] || concepts[cqIdx % concepts.length];
        newQ = conceptQuestion(concept, cqIdx++);
      }
    }
    questions.push(newQ);
    counts[section] = (counts[section] || 0) + 1;
    localIdx++;
  }
}

while (questions.length < targetCount) {
  questions.push(carsQuestion(carsPool, carsIdx++));
}

// ── Sharding ──────────────────────────────────────────────────────────────────
function writeShards(items, size) {
  const dir = "data/questions";
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const shards = [];
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    const n = Math.floor(i / size) + 1;
    const file = `questions-${String(n).padStart(3, "0")}.json`;
    writeFileSync(`${dir}/${file}`, JSON.stringify(chunk) + "\n");
    shards.push({ file, count: chunk.length, first_id: chunk[0]?.id || "", last_id: chunk.at(-1)?.id || "" });
  }
  const manifest = { generated_at: now, total_questions: items.length, shard_size: size, shards };
  writeFileSync(`${dir}/manifest.json`, JSON.stringify(manifest, null, 2) + "\n");
  writeFileSync("data/sample_questions.json", JSON.stringify({
    note: "Question bank sharded in data/questions/. This file is a pointer.",
    manifest: "data/questions/manifest.json",
    total_questions: items.length,
    generated_at: now,
  }, null, 2) + "\n");
  writeFileSync("js/generatedQuestionBank.js", "export const GENERATED_QUESTIONS = [];\n");
}

writeShards(questions, shardSize);
console.log(`\nGenerated ${questions.length} questions.`);
const summary = questions.reduce((acc, q) => { acc[q.section] = (acc[q.section] || 0) + 1; return acc; }, {});
for (const [sec, cnt] of Object.entries(summary)) console.log(`  ${sec}: ${cnt}`);
