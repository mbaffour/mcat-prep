import { MCAT_SECTIONS } from "../../js/demoData.js";

function mk(si, topic, subtopic, stems, correct, distractors, wrongExps, explanation, takeaway, trap, related = [], formulas = []) {
  return { section: MCAT_SECTIONS[si], topic, subtopic, stems, correct, distractors, wrong_explanations: wrongExps, explanation, takeaway, trap, related, formulas };
}

export const chemPhysConcepts = [

  // 1. Hess's Law
  mk(0, "Thermochemistry", "Hess's Law",
    [
      "A researcher cannot directly measure the enthalpy of combustion of carbon to CO because CO₂ forms simultaneously. Which approach allows indirect determination of ΔH for C(s) + ½O₂(g) → CO(g)?",
      "Given: C(s) + O₂(g) → CO₂(g), ΔH₁ = −393.5 kJ; CO(g) + ½O₂(g) → CO₂(g), ΔH₂ = −283.0 kJ. What is ΔH for C(s) + ½O₂(g) → CO(g)?",
      "A student adds two thermochemical equations and cancels CO₂ from both sides. Which law justifies this algebraic manipulation of enthalpy values?",
    ],
    "Hess's Law states that enthalpy is a state function, so ΔH for a reaction equals the sum of ΔH values for any series of steps connecting the same reactants and products; reversing a step negates its ΔH.",
    [
      "Hess's Law applies only when all steps occur at the same temperature and pressure",
      "Enthalpy changes must be measured directly because they depend on the reaction pathway",
      "Reversing a reaction step does not change the sign of ΔH, only its magnitude",
    ],
    [
      "Hess's Law holds at any constant pressure regardless of temperature because enthalpy is a state function, not pathway-dependent",
      "Enthalpy is explicitly a state function, meaning it is entirely pathway-independent and can always be summed algebraically",
      "Reversing a reaction reverses the direction of heat flow, so ΔH must change sign (e.g., endothermic becomes exothermic)",
    ],
    "Hess's Law follows from enthalpy being a state function: ΔH depends only on initial and final states, not on the route taken. To find ΔH for C(s) + ½O₂ → CO, reverse reaction 2 (ΔH = +283.0 kJ) and add it to reaction 1 (ΔH = −393.5 kJ), giving ΔH = −110.5 kJ. Intermediates that appear on both sides cancel.",
    "Hess's Law: ΔH_rxn = Σ(ΔH steps); reverse a step → flip the sign of ΔH.",
    "Students forget to flip the sign of ΔH when reversing a reaction step, leading to an answer that is off by 2× the reversed step's value.",
    ["Gibbs free energy", "bond dissociation energy", "standard enthalpy of formation"],
    ["ΔH_rxn = Σ ΔH_steps", "ΔH_reverse = −ΔH_forward"]
  ),

  // 2. Specific heat capacity
  mk(0, "Thermochemistry", "Specific Heat Capacity",
    [
      "A patient ingests 500 mL of water at 4 °C. The body must warm this water to 37 °C. Assuming c = 4.18 J/(g·°C) and density ≈ 1 g/mL, how much heat does the body expend?",
      "Two metals of equal mass are heated with the same amount of energy. Metal A shows a 10 °C rise; Metal B shows a 25 °C rise. Which metal has the higher specific heat capacity?",
      "In a coffee-cup calorimeter experiment, a student measures q_solution to be −2090 J after dissolving a salt. If m = 100 g and ΔT = +5 °C, what is c for the solution?",
    ],
    "Specific heat capacity (c) relates heat flow to mass and temperature change by q = mcΔT; a substance with a high c requires more energy per gram per degree, making water (c = 4.18 J/g·°C) an exceptional thermal buffer.",
    [
      "q = mΔT only; specific heat capacity is not needed if mass and temperature change are known",
      "A higher specific heat capacity means a substance heats up faster for the same energy input",
      "Specific heat capacity and heat capacity are interchangeable terms regardless of sample mass",
    ],
    [
      "The equation requires all three variables—mass, specific heat capacity, and ΔT—because q = mcΔT, not q = mΔT",
      "A higher specific heat capacity means a substance heats up more slowly (smaller ΔT) for the same energy input, not faster",
      "Specific heat capacity (c) is an intensive property (per gram), while heat capacity (C) is extensive (for a given sample); C = mc",
    ],
    "The equation q = mcΔT quantifies heat exchange: q in joules, m in grams, c in J/(g·°C), and ΔT = T_final − T_initial. Water's unusually high specific heat (4.18 J/g·°C) arises from extensive hydrogen bonding and is crucial for temperature homeostasis in biological systems. In calorimetry, q_solution = −q_reaction by conservation of energy.",
    "q = mcΔT; water's high specific heat (4.18 J/g·°C) stabilizes biological temperatures.",
    "Students confuse specific heat capacity (intensive, per gram) with heat capacity (extensive, for whole sample), causing errors when masses differ.",
    ["Hess's Law", "calorimetry", "colligative properties"],
    ["q = mcΔT", "C = mc"]
  ),

  // 3. Gas Laws
  mk(0, "Physical Chemistry", "Ideal Gas Laws",
    [
      "A sealed syringe contains 60 mL of gas at 1 atm. The plunger is pushed until the pressure is 3 atm at constant temperature. What is the new volume?",
      "A gas occupies 4.0 L at 300 K. If the temperature is raised to 600 K at constant pressure, what is the new volume?",
      "A gas sample has P = 2 atm, V = 3 L, and T = 300 K. How many moles of gas are present? (R = 0.0821 L·atm/mol·K)",
    ],
    "The ideal gas law PV = nRT unifies Boyle's Law (PV = constant at fixed T,n) and Charles's Law (V/T = constant at fixed P,n); for the MCAT, recognize that doubling T at constant P doubles V, and halving V at constant T doubles P.",
    [
      "Boyle's Law states that volume is directly proportional to pressure at constant temperature",
      "Charles's Law states that volume is inversely proportional to temperature at constant pressure",
      "The ideal gas law applies accurately to all gases under all conditions of pressure and temperature",
    ],
    [
      "Boyle's Law states volume is inversely proportional to pressure (PV = k), so increasing pressure decreases volume",
      "Charles's Law states volume is directly proportional to absolute temperature (V/T = k), so increasing temperature increases volume",
      "The ideal gas law is an approximation that fails at high pressures and low temperatures where intermolecular forces and finite molecular volume become significant",
    ],
    "PV = nRT is the cornerstone ideal gas relationship. Boyle's Law (P₁V₁ = P₂V₂ at constant T) and Charles's Law (V₁/T₁ = V₂/T₂ at constant P) are special cases. Temperature must always be in Kelvin. For the syringe problem: V₂ = (1 atm × 60 mL)/3 atm = 20 mL. For moles: n = PV/RT = (2 × 3)/(0.0821 × 300) ≈ 0.24 mol.",
    "PV = nRT; always use Kelvin; Boyle's: P₁V₁ = P₂V₂; Charles's: V₁/T₁ = V₂/T₂.",
    "Students use Celsius instead of Kelvin in gas law calculations, producing dramatically wrong answers, especially near 0 °C.",
    ["van der Waals equation", "Graham's law", "kinetic molecular theory"],
    ["PV = nRT", "P₁V₁ = P₂V₂", "V₁/T₁ = V₂/T₂"]
  ),

  // 4. Van der Waals equation
  mk(0, "Physical Chemistry", "Real Gases and Van der Waals Equation",
    [
      "At high pressure and low temperature, a real gas deviates significantly from ideal behavior. Which factor causes the measured volume to be larger than predicted by the ideal gas law?",
      "The van der Waals equation is (P + a/V²)(V − b) = nRT. A gas with a large 'a' constant has which property?",
      "NH₃ and Ne are compared at the same T and P. Which gas deviates more from ideal behavior, and why?",
    ],
    "The van der Waals equation corrects for two non-ideal behaviors: the 'a' term (a/V²) accounts for attractive intermolecular forces that reduce effective pressure, while the 'b' term accounts for the finite volume of gas molecules that reduces available free volume.",
    [
      "The 'a' correction in van der Waals accounts for the finite size (volume) of gas molecules",
      "Real gases deviate from ideal behavior only at low pressures where molecules are far apart",
      "The 'b' correction accounts for intermolecular attractions that reduce the observed pressure",
    ],
    [
      "The 'a' correction accounts for intermolecular attractions (not molecular size); 'b' accounts for finite molecular volume",
      "Real gases deviate most at high pressures (molecules are close, volume matters) and low temperatures (molecules move slowly, attractions matter more)",
      "The 'b' correction accounts for the excluded volume of molecules themselves, not for intermolecular attractions",
    ],
    "Ideal gas law assumes point-mass molecules with no intermolecular forces. Real gases deviate: at high P, molecular volume (b term) causes V_real > V_ideal; at low T, attractions (a term) cause P_real < P_ideal. NH₃ deviates more than Ne because NH₃ has strong hydrogen bonding (large a) and larger molecular volume (large b), while Ne is a small noble gas with only weak London dispersion forces.",
    "Van der Waals: 'a' corrects for attractions (reduces P), 'b' corrects for molecular volume (reduces V); polar/large molecules deviate most.",
    "Students mix up which correction term (a vs b) corresponds to which physical property—attractions vs molecular size.",
    ["ideal gas law", "intermolecular forces", "kinetic molecular theory"],
    ["(P + a/V²)(V − b) = nRT", "Z = PV/nRT (compressibility factor)"]
  ),

  // 5. Ksp and common-ion effect
  mk(0, "Equilibrium Chemistry", "Ksp and Common-Ion Effect",
    [
      "A patient's urine contains calcium and oxalate ions. Adding more calcium chloride to the urine sample causes calcium oxalate to precipitate more readily. What principle explains this?",
      "For CaF₂ (Ksp = 3.9 × 10⁻¹¹), what is the molar solubility in pure water compared to in 0.10 M NaF solution?",
      "If Q > Ksp for a slightly soluble salt, what will happen in the solution?",
    ],
    "The common-ion effect reduces the solubility of a slightly soluble salt when a soluble salt sharing a common ion is added; the added ion shifts the equilibrium toward precipitation, decreasing solubility as predicted by Le Chatelier's principle.",
    [
      "Adding a common ion increases solubility by providing more ions to stabilize the crystal lattice",
      "Ksp changes when a common ion is added because the ionic strength of the solution changes",
      "When Q > Ksp, the solution is unsaturated and no precipitation occurs",
    ],
    [
      "Adding a common ion decreases solubility by shifting equilibrium toward the solid precipitate per Le Chatelier's principle",
      "Ksp is a constant at a given temperature and does not change with added ions; only solubility (the amount dissolved) changes",
      "When Q > Ksp, the solution is supersaturated and precipitation occurs until Q = Ksp",
    ],
    "Ksp is the solubility product constant for dissolution equilibrium: CaF₂ ⇌ Ca²⁺ + 2F⁻, Ksp = [Ca²⁺][F⁻]². In pure water, s = (Ksp/4)^(1/3) ≈ 2.1 × 10⁻⁴ M. In 0.10 M NaF, [F⁻] ≈ 0.10 M, so s = Ksp/(0.10)² = 3.9 × 10⁻⁹ M—about 50,000× less soluble. This is the common-ion effect: a shared ion suppresses dissolution.",
    "Common-ion effect: adding a shared ion suppresses solubility; Ksp stays constant but molar solubility decreases dramatically.",
    "Students confuse Ksp (which is constant at fixed T) with molar solubility (which changes with common ions), claiming Ksp 'decreases' when a common ion is added.",
    ["Le Chatelier's principle", "Henderson-Hasselbalch", "precipitation reactions"],
    ["Ksp = [A^m+]^m[B^n-]^n", "s = (Ksp/4)^(1/3) for AB₂"]
  ),

  // 6. Kw, pOH, water autoionization
  mk(0, "Acid-Base Chemistry", "Kw and Water Autoionization",
    [
      "At 37 °C (body temperature), Kw = 2.4 × 10⁻¹⁴. What is the pH of a neutral solution at body temperature?",
      "A solution has [OH⁻] = 1 × 10⁻³ M at 25 °C. What is the pH?",
      "Why does the pH of neutral water decrease as temperature increases, even though the solution remains neutral?",
    ],
    "Water autoionizes according to 2H₂O ⇌ H₃O⁺ + OH⁻ with Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25 °C; at 25 °C, pH + pOH = 14, and a neutral solution has pH = pOH = 7, but Kw increases with temperature so neutral pH < 7 at elevated temperatures.",
    [
      "At 37 °C, neutral pH is still 7.0 because neutrality is defined as pH 7 regardless of temperature",
      "pOH = 14 − pH at all temperatures because Kw is always 10⁻¹⁴",
      "As temperature rises, water becomes acidic because more H⁺ ions are produced than OH⁻ ions",
    ],
    [
      "Neutral pH is defined as pH = pOH (equal [H⁺] and [OH⁻]), not as pH = 7; at 37 °C, neutral pH = ½ × pKw = ½ × 13.62 ≈ 6.81",
      "pOH = pKw − pH, and pKw only equals 14 at 25 °C; at higher temperatures pKw decreases, so pH + pOH < 14",
      "Water's autoionization is endothermic, so higher T increases both [H⁺] and [OH⁻] equally; the solution remains neutral (equal concentrations) but pH falls because pKw decreases",
    ],
    "Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25 °C; taking −log of both sides gives pH + pOH = pKw = 14. If [OH⁻] = 10⁻³ M, pOH = 3, pH = 11. At 37 °C, Kw = 2.4 × 10⁻¹⁴ so pKw = 13.62; neutral pH = 6.81, not 7.0. Neutrality means [H⁺] = [OH⁻], not pH = 7.",
    "pH + pOH = pKw = 14 at 25 °C; neutral means [H⁺] = [OH⁻], so neutral pH = 7 only at 25 °C.",
    "Students assume neutral pH = 7 at all temperatures; at body temperature, neutral pH is closer to 6.8.",
    ["Henderson-Hasselbalch", "buffer capacity", "Arrhenius acid-base definition"],
    ["Kw = [H⁺][OH⁻]", "pH + pOH = pKw", "pH = −log[H⁺]"]
  ),

  // 7. Alpha decay
  mk(0, "Nuclear Chemistry", "Alpha Decay",
    [
      "Radon-222 undergoes alpha decay in homes and is a leading cause of lung cancer. What daughter nucleus is produced when ²²²Rn undergoes alpha decay?",
      "An alpha particle is emitted from ²³⁸U. What are the atomic number and mass number of the daughter nuclide?",
      "Why is alpha radiation stopped by a sheet of paper or the outer layer of skin, while it causes significant internal damage when inhaled?",
    ],
    "In alpha (α) decay, the nucleus emits a ⁴He nucleus (2 protons, 2 neutrons), decreasing the parent's atomic number by 2 and mass number by 4, producing a daughter nuclide two elements to the left on the periodic table.",
    [
      "Alpha decay decreases the atomic number by 1 and mass number by 2, equivalent to emitting a deuterium nucleus",
      "Alpha particles penetrate most materials easily due to their high kinetic energy",
      "Alpha decay does not change the element because the nuclear charge is preserved by emitting equal numbers of protons and neutrons",
    ],
    [
      "Alpha decay decreases atomic number by 2 and mass number by 4 (a ⁴He nucleus), not by 1 and 2",
      "Alpha particles are heavily ionizing but have very short range in matter (~5 cm in air) and are stopped by paper or skin due to their large mass and charge (+2)",
      "Alpha decay ejects 2 protons, reducing atomic number by 2 and changing the element to one two positions left in the periodic table",
    ],
    "An alpha particle (⁴He, Z=2, A=4) is emitted: Z_daughter = Z_parent − 2; A_daughter = A_parent − 4. For ²³⁸U (Z=92): daughter is ²³⁴Th (Z=90). For ²²²Rn (Z=86): daughter is ²¹⁸Po (Z=84). Despite low penetrating power, inhaled alpha emitters cause severe local tissue damage because all ionizing energy is deposited in a tiny volume.",
    "α decay: atomic number −2, mass number −4; daughter is two elements left on periodic table.",
    "Students subtract 2 from the mass number instead of 4 when predicting the daughter nuclide.",
    ["beta decay", "half-life", "nuclear binding energy"],
    ["Z_daughter = Z_parent − 2", "A_daughter = A_parent − 4"]
  ),

  // 8. Beta decay and gamma emission
  mk(0, "Nuclear Chemistry", "Beta Decay and Gamma Emission",
    [
      "Carbon-14 dating is used to determine the age of organic artifacts. ¹⁴C undergoes β⁻ decay. What is the daughter nuclide, and what is emitted besides the beta particle?",
      "¹³¹I is used in thyroid cancer treatment and undergoes β⁻ decay followed by γ emission. Why does γ emission not change the nuclide's atomic or mass number?",
      "In positron emission (β⁺ decay), a proton converts to a neutron. How do the atomic number and mass number of the daughter nuclide change?",
    ],
    "In β⁻ decay, a neutron converts to a proton plus an electron (β⁻ particle) and an antineutrino, increasing atomic number by 1 with no change in mass number; γ emission releases excess nuclear energy as a high-energy photon without changing atomic or mass number.",
    [
      "Beta decay decreases the mass number by 1 because an electron is lost from the nucleus",
      "Gamma emission increases the atomic number by 1 because of the high-energy photon released",
      "In β⁺ decay, a neutron converts to a proton, so the atomic number increases by 1",
    ],
    [
      "Beta particles are electrons ejected from the nucleus but not from orbital electrons; mass number does not change because mass is conserved in the neutron→proton conversion",
      "Gamma emission is a pure energy release with no change in mass or charge; it lowers the nucleus from an excited state to the ground state",
      "In β⁺ decay, a proton converts to a neutron, so the atomic number decreases by 1 (not increases); for ¹⁴C β⁻ decay, Z increases from 6 to 7, giving ¹⁴N",
    ],
    "β⁻ decay: n → p⁺ + e⁻ + ν̄; atomic number increases by 1, mass number unchanged. ¹⁴C (Z=6) → ¹⁴N (Z=7). β⁺ decay: p → n + e⁺ + ν; atomic number decreases by 1. γ emission releases only energy (E = hf) from an excited nucleus, changing neither Z nor A. All three types are used clinically: ¹³¹I delivers β⁻ and γ radiation to thyroid tissue.",
    "β⁻: Z+1, A unchanged; β⁺: Z−1, A unchanged; γ: neither Z nor A changes.",
    "Students think beta particles come from orbital electrons and therefore assume they affect electron configuration rather than nuclear composition.",
    ["alpha decay", "half-life", "photoelectric effect"],
    ["β⁻: n → p + e⁻ + ν̄", "β⁺: p → n + e⁺ + ν", "E = hf (gamma)"]
  ),

  // 9. Radioactive half-life
  mk(0, "Nuclear Chemistry", "Radioactive Half-Life",
    [
      "Iodine-131 has a half-life of 8 days. A patient receives a therapeutic dose of 1200 MBq. How much activity remains after 24 days?",
      "A fossil contains 25% of the original ¹⁴C activity (t₁/₂ = 5730 years). What is the approximate age of the fossil?",
      "Which mathematical relationship correctly describes radioactive decay, and why is it called 'first-order' kinetics?",
    ],
    "Radioactive decay follows first-order kinetics: N(t) = N₀(½)^(t/t₁/₂) or N(t) = N₀e^(−λt) where λ = 0.693/t₁/₂; after each half-life, exactly half the remaining nuclei decay, making the rate proportional to the current number of nuclei.",
    [
      "Radioactive decay is zero-order, so the same number of nuclei decay per unit time regardless of how many remain",
      "After 24 days with t₁/₂ = 8 days, the activity of ¹³¹I drops to 25% of the original because 3 half-lives have passed",
      "The half-life of a radioactive isotope increases as the sample decays because fewer nuclei are available",
    ],
    [
      "Radioactive decay is first-order: rate = λN, meaning the rate is proportional to N, not constant; as N decreases, the rate of decay also decreases",
      "After 3 half-lives (24 days), activity = 1200 × (½)³ = 1200/8 = 150 MBq, not 25%—25% would be after 2 half-lives",
      "Half-life is a constant property of a given isotope that does not change with sample size, age, or the amount remaining",
    ],
    "First-order decay: N(t) = N₀(½)^(t/t₁/₂). For ¹³¹I after 24 days: 24/8 = 3 half-lives; N = 1200 × (½)³ = 150 MBq. For ¹⁴C at 25% remaining: (½)² = 0.25, so 2 half-lives = 2 × 5730 = 11,460 years. The decay constant λ = ln2/t₁/₂ ≈ 0.693/t₁/₂ relates to the probability of decay per unit time.",
    "N(t) = N₀(½)^(t/t₁/₂); each half-life halves the remaining activity; t₁/₂ = 0.693/λ.",
    "Students apply half-life linearly (e.g., claiming activity is zero after enough half-lives) rather than exponentially—the quantity asymptotically approaches zero.",
    ["alpha decay", "beta decay", "rate law"],
    ["N(t) = N₀(½)^(t/t₁/₂)", "λ = 0.693/t₁/₂", "N(t) = N₀e^(−λt)"]
  ),

  // 10. Faraday's laws of electrolysis
  mk(0, "Electrochemistry", "Faraday's Laws of Electrolysis",
    [
      "An electrolytic cell deposits copper metal at the cathode. If a current of 2.0 A flows for 96,500 seconds and Cu²⁺ is reduced, how many moles of Cu are deposited?",
      "In electrolysis of molten NaCl, Na metal is produced at the cathode. If 0.5 mol of Na is deposited, how many coulombs of charge were transferred?",
      "Silver (Ag⁺ + e⁻ → Ag) and copper (Cu²⁺ + 2e⁻ → Cu) are electroplated in series cells using the same current for the same time. Which metal deposits more moles?",
    ],
    "Faraday's first law states that the mass of substance deposited is proportional to the total charge passed (Q = It); Faraday's second law states that equivalent quantities of different substances are deposited by the same charge, where 1 mole of electrons (1 Faraday = 96,485 C) deposits 1/n moles of an ion with charge n.",
    [
      "The mass deposited in electrolysis depends on the voltage applied, not on the total charge transferred",
      "One Faraday of charge (96,485 C) always deposits exactly one mole of any metal, regardless of the ion's charge",
      "Silver and copper cells in series would deposit equal moles of each metal because the same current passes through both",
    ],
    [
      "Faraday's laws explicitly relate deposited mass to charge (Q = It), not voltage; voltage determines whether electrolysis occurs but not how much product forms",
      "One Faraday deposits 1/n moles of a metal whose ion has charge n; Cu²⁺ requires 2 F per mole, Ag⁺ requires only 1 F per mole",
      "Series cells carry the same charge, but Ag⁺ needs 1 electron per atom while Cu²⁺ needs 2; thus twice as many moles of Ag deposit compared to Cu for the same charge",
    ],
    "Faraday's laws: moles deposited = Q/(nF) = It/(nF), where n = charge on the ion and F = 96,485 C/mol e⁻. For Cu²⁺ with 2.0 A for 96,500 s: Q = 193,000 C; moles Cu = 193,000/(2 × 96,485) ≈ 1.0 mol. For 0.5 mol Na (n=1): Q = 0.5 × 96,485 ≈ 48,243 C. Ag (n=1) deposits twice the moles of Cu (n=2) for the same charge.",
    "moles deposited = It/(nF); 1 Faraday = 96,485 C deposits 1/n mol of an ion with charge n.",
    "Students forget to divide by n (the ionic charge), depositing twice as many moles as correct for divalent ions like Cu²⁺.",
    ["Galvanic vs electrolytic cells", "Nernst equation", "standard reduction potential"],
    ["Q = It", "moles = Q/(nF)", "F = 96,485 C/mol e⁻"]
  ),

  // 11. Standard reduction potential
  mk(0, "Electrochemistry", "Standard Reduction Potential and Cell Voltage",
    [
      "A galvanic cell uses Zn/Zn²⁺ (E° = −0.76 V) at the anode and Cu/Cu²⁺ (E° = +0.34 V) at the cathode. What is the standard cell potential?",
      "Which half-reaction occurs at the cathode in a galvanic cell, and how does the standard reduction potential predict which electrode acts as the cathode?",
      "If E°_cell > 0 for a reaction, what can be concluded about ΔG° for that reaction?",
    ],
    "Standard cell potential E°_cell = E°_cathode − E°_anode; a positive E°_cell indicates a spontaneous reaction (ΔG° = −nFE°_cell < 0), and the electrode with the higher (more positive) standard reduction potential acts as the cathode where reduction occurs.",
    [
      "E°_cell = E°_anode + E°_cathode because both half-reactions contribute positively to the cell voltage",
      "The electrode with the lower (more negative) standard reduction potential acts as the cathode",
      "A positive E°_cell means ΔG° is positive and the reaction is non-spontaneous",
    ],
    [
      "E°_cell = E°_cathode − E°_anode (not the sum); for Zn/Cu: E°_cell = +0.34 − (−0.76) = +1.10 V",
      "The electrode with the higher reduction potential is more easily reduced and acts as the cathode; Zn (lower E°) is oxidized at the anode",
      "ΔG° = −nFE°_cell; a positive E° makes ΔG° negative, indicating a spontaneous (thermodynamically favorable) reaction",
    ],
    "Standard reduction potentials are tabulated for half-reactions as written in the reduction direction. E°_cell = E°_cathode − E°_anode. The half-reaction with the higher E° is reduced (cathode); the other is reversed (oxidation at anode). ΔG° = −nFE°_cell links electrochemistry to thermodynamics: E° > 0 → ΔG° < 0 → spontaneous. For Zn-Cu cell: E° = 0.34 − (−0.76) = +1.10 V.",
    "E°_cell = E°_cathode − E°_anode; higher E° = cathode; positive E°_cell = spontaneous = negative ΔG°.",
    "Students add both standard reduction potentials instead of subtracting, inflating the cell voltage.",
    ["Nernst equation", "Faraday's laws", "Gibbs free energy"],
    ["E°_cell = E°_cathode − E°_anode", "ΔG° = −nFE°_cell"]
  ),

  // 12. Activation energy and Arrhenius equation
  mk(0, "Chemical Kinetics", "Activation Energy and Arrhenius Equation",
    [
      "An enzyme reduces the activation energy of a reaction from 80 kJ/mol to 40 kJ/mol. According to the Arrhenius equation, what is the effect on the rate constant at 37 °C?",
      "A reaction rate doubles for every 10 °C increase in temperature. Which term in the Arrhenius equation (k = Ae^(−Ea/RT)) primarily accounts for this temperature dependence?",
      "A reaction coordinate diagram shows a high energy barrier for a forward reaction but the products are more stable than the reactants. Which process can lower the barrier without changing the thermodynamic driving force?",
    ],
    "The Arrhenius equation k = Ae^(−Ea/RT) shows that the rate constant increases exponentially as activation energy decreases or temperature increases; a catalyst lowers Ea for both forward and reverse reactions equally, increasing reaction rate without altering ΔG or Keq.",
    [
      "A catalyst increases the rate of the forward reaction but not the reverse reaction, shifting the equilibrium toward products",
      "Increasing temperature primarily increases the pre-exponential factor A, which accounts for successful collision geometry",
      "Halving the activation energy doubles the rate constant at any temperature",
    ],
    [
      "A catalyst lowers Ea for both forward and reverse reactions by the same amount, so Keq is unchanged; it speeds up reaching equilibrium without shifting it",
      "Temperature appears in the exponential term e^(−Ea/RT), not in A; increasing T makes the exponent less negative, exponentially increasing k",
      "Halving Ea affects k exponentially: k₂/k₁ = e^(Ea/2RT), which is much more than doubling for typical activation energies",
    ],
    "Arrhenius equation: k = Ae^(−Ea/RT), where A = frequency factor, Ea = activation energy, R = 8.314 J/mol·K, T in Kelvin. Reducing Ea by half greatly amplifies k exponentially. Catalysts (including enzymes) lower Ea by providing an alternative reaction pathway but do not change ΔG°, Keq, or product stability. Temperature increases rate by populating higher energy states (Maxwell-Boltzmann distribution).",
    "k = Ae^(−Ea/RT); catalysts lower Ea for both forward and reverse reactions, increasing rate without changing Keq.",
    "Students believe catalysts shift equilibrium toward products; catalysts only speed up the approach to equilibrium without changing its position.",
    ["rate law", "Gibbs free energy", "Le Chatelier's principle"],
    ["k = Ae^(−Ea/RT)", "ln(k₂/k₁) = (Ea/R)(1/T₁ − 1/T₂)"]
  ),

  // 13. Rate law and reaction order
  mk(0, "Chemical Kinetics", "Rate Law and Reaction Order",
    [
      "For the reaction A + B → products, doubling [A] quadruples the rate, but doubling [B] has no effect on rate. What is the rate law and overall order?",
      "In a first-order reaction with k = 0.0693 min⁻¹, what is the half-life, and how does the half-life change as the reaction proceeds?",
      "A researcher plots ln[A] vs time and obtains a straight line with slope −k. Which reaction order does this confirm, and what would a plot of 1/[A] vs time indicate?",
    ],
    "The rate law rate = k[A]^m[B]^n is determined experimentally, not from stoichiometry; reaction orders m and n indicate how each reactant's concentration affects the rate, with overall order = m + n; first-order reactions have constant half-lives (t₁/₂ = 0.693/k), and second-order reactions have half-lives that increase as concentration decreases.",
    [
      "Reaction orders can be determined directly from the balanced chemical equation's stoichiometric coefficients",
      "A first-order reaction's half-life increases as the reaction proceeds because less reactant is available",
      "If doubling [A] quadruples the rate, the reaction is first-order in A",
    ],
    [
      "Reaction orders must be determined experimentally; stoichiometric coefficients only equal rate orders in elementary reactions (one-step mechanisms)",
      "First-order half-life t₁/₂ = 0.693/k is constant and independent of concentration; only second-order half-life depends on concentration",
      "Quadrupling the rate when [A] doubles means rate ∝ [A]², so the reaction is second-order in A, not first-order",
    ],
    "Rate laws are experimental: rate = k[A]^m[B]^n. For the given example: rate ∝ [A]² (second-order in A), zero-order in B; rate = k[A]². Overall order = 2. Graphical analysis: ln[A] vs t is linear for first-order; 1/[A] vs t is linear for second-order; [A] vs t is linear for zero-order. First-order t₁/₂ = 0.693/k = 0.693/0.0693 = 10 min, constant throughout the reaction.",
    "Rate law from experiment: ln[A] vs t → 1st order; 1/[A] vs t → 2nd order; t₁/₂ = 0.693/k for 1st order (constant).",
    "Students read reaction orders from stoichiometric coefficients in the balanced equation rather than from experimental rate data.",
    ["activation energy", "equilibrium constant", "half-life"],
    ["rate = k[A]^m[B]^n", "t₁/₂ = 0.693/k (1st order)", "ln[A] = −kt + ln[A]₀"]
  ),

  // 14. Heterogeneous equilibria
  mk(0, "Equilibrium Chemistry", "Equilibrium Constant Expression (Heterogeneous)",
    [
      "For the reaction CaCO₃(s) ⇌ CaO(s) + CO₂(g), which species appear in the equilibrium constant expression Kp?",
      "A student writes Keq = [CaO][CO₂]/[CaCO₃] for the decomposition of calcium carbonate. What is wrong with this expression?",
      "If Keq for a heterogeneous reaction is written incorrectly to include solid concentrations, how would this affect the calculated value of Keq?",
    ],
    "In heterogeneous equilibria, pure solids and pure liquids are omitted from the equilibrium expression because their concentrations (activity = 1) are constant; for CaCO₃(s) ⇌ CaO(s) + CO₂(g), Kp = P_CO₂ and Kc = [CO₂].",
    [
      "Pure solids are included in Keq because their concentration can change as the reaction proceeds",
      "Kp = P_CO₂ / P_CaCO₃ because both gases and solids contribute to pressure in the system",
      "Liquids are included in heterogeneous equilibria expressions but solids are not",
    ],
    [
      "Pure solids have fixed density and constant molar concentration that does not change with amount; their activity is defined as 1 and they are excluded from Keq",
      "Solids do not exert partial pressure; only gaseous species contribute to Kp, so Kp = P_CO₂ for this reaction",
      "Both pure solids and pure liquids are excluded from equilibrium expressions; only the activity of dissolved species and gases are included",
    ],
    "Activity of pure solids and pure liquids equals 1 by convention, so they are excluded from Keq expressions. For CaCO₃(s) ⇌ CaO(s) + CO₂(g): Kc = [CO₂] and Kp = P_CO₂. Including solids in the denominator would make Keq appear concentration-dependent when it is not. This principle applies to heterogeneous reactions including dissolution (water excluded from Ka expressions) and enzyme-substrate reactions at physiological conditions.",
    "Pure solids and liquids are excluded from Keq; their activity = 1. For CaCO₃(s) ⇌ CaO(s) + CO₂(g), Kp = P_CO₂.",
    "Students include solid CaCO₃ in the denominator of Keq, making the expression incorrect and temperature-independent arguments invalid.",
    ["Le Chatelier's principle", "Ksp", "equilibrium constant"],
    ["Kp = P_CO₂ (for this reaction)", "Kp = Kc(RT)^Δn"]
  ),

  // 15. Acid-base definitions
  mk(0, "Acid-Base Chemistry", "Arrhenius vs Brønsted-Lowry vs Lewis Definitions",
    [
      "BF₃ has no protons to donate but reacts with NH₃ by accepting an electron pair. Which acid-base definition classifies BF₃ as an acid in this reaction?",
      "The reaction NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ involves NH₃ acting as a base. Under which definition(s) does this apply?",
      "A clinician notes that CO₂ dissolved in blood acts as an acid. Under which definition is dissolved CO₂ an acid, and why?",
    ],
    "Lewis acid-base theory is the most general: a Lewis acid accepts an electron pair, a Lewis base donates one; Brønsted-Lowry defines acids as proton donors and bases as proton acceptors; Arrhenius theory (most restrictive) requires H⁺ or OH⁻ production in water.",
    [
      "BF₃ is a Brønsted-Lowry acid because it reacts with bases by donating fluorine atoms",
      "NH₃ is a Lewis base but not a Brønsted-Lowry base because it does not accept protons",
      "CO₂ is an Arrhenius acid because it directly releases H⁺ ions in water",
    ],
    [
      "BF₃ cannot donate protons (it has none); it is a Lewis acid because it accepts an electron pair from NH₃'s lone pair on nitrogen",
      "NH₃ acts as both a Lewis base (donates electron pair) and a Brønsted-Lowry base (accepts H⁺ from water to form NH₄⁺)",
      "CO₂ does not directly release H⁺; it reacts with water to form H₂CO₃ which then releases H⁺, so it is a Brønsted-Lowry acid only after hydration (not an Arrhenius acid itself)",
    ],
    "The three definitions form a hierarchy of generality: Arrhenius ⊂ Brønsted-Lowry ⊂ Lewis. Arrhenius requires aqueous H⁺/OH⁻ production. Brønsted-Lowry requires proton transfer (NH₃ + H₂O → NH₄⁺ + OH⁻; NH₃ is B-L base, H₂O is B-L acid). Lewis requires electron pair transfer (BF₃ accepts lone pair from NH₃). All Arrhenius acids are B-L acids; all B-L acids are Lewis acids, but not vice versa.",
    "Lewis is broadest (e-pair); Brønsted-Lowry is proton transfer; Arrhenius is narrowest (H⁺/OH⁻ in water).",
    "Students apply Arrhenius definition to non-aqueous reactions, incorrectly classifying Lewis acids like BF₃ as non-acids.",
    ["Henderson-Hasselbalch", "Kw", "diprotic acids"],
    ["B-L acid: proton donor", "Lewis acid: e-pair acceptor"]
  ),

  // 16. Diprotic acids
  mk(0, "Acid-Base Chemistry", "Diprotic Acids and Titration Curves",
    [
      "The titration of H₂SO₄ (pKa1 ≈ −3, pKa2 = 1.99) with NaOH shows two distinct equivalence points. What species predominates at the midpoint between the first and second equivalence points?",
      "Carbonic acid (H₂CO₃, pKa1 = 6.35, pKa2 = 10.33) is important for blood pH buffering. At blood pH 7.4, which carbonate species predominates?",
      "A diprotic acid H₂A has pKa1 = 4.0 and pKa2 = 8.0. At what pH does [H₂A] = [A²⁻]?",
    ],
    "A diprotic acid H₂A has two ionizable protons and two pKa values, producing three species (H₂A, HA⁻, A²⁻) and two equivalence points on its titration curve; at each half-equivalence point, pH = pKa for that step, and the intermediate species HA⁻ predominates between the two equivalence points.",
    [
      "At the midpoint between two equivalence points, equal amounts of H₂A and A²⁻ are present",
      "Diprotic acids show only one equivalence point because both protons are lost simultaneously",
      "At pH = (pKa1 + pKa2)/2, the solution is a mixture with equal concentrations of H₂A and HA⁻",
    ],
    [
      "At the midpoint between the first and second equivalence points, pH = pKa2 and [HA⁻] = [A²⁻]; equal amounts of H₂A and A²⁻ coexist only at pH = (pKa1 + pKa2)/2",
      "Diprotic acids show two distinct equivalence points when pKa1 and pKa2 differ by more than ~2 pH units; each proton is removed stepwise",
      "At pH = (pKa1 + pKa2)/2 = 6 for this example, the predominant species is HA⁻ (the intermediate), not a mixture of H₂A and HA⁻",
    ],
    "Diprotic acids ionize in two steps with pKa1 < pKa2. The titration curve shows two buffer regions (near pKa1 and pKa2) and two equivalence points. At pH 7.4, for carbonic acid (pKa1=6.35, pKa2=10.33): pH > pKa1 means HCO₃⁻ dominates over H₂CO₃, and pH < pKa2 means HCO₃⁻ dominates over CO₃²⁻, so bicarbonate (HCO₃⁻) is the predominant species. The isoelectric point of HA⁻ = (pKa1 + pKa2)/2.",
    "Diprotic acids: two equivalence points; HA⁻ predominates between them; at blood pH 7.4, HCO₃⁻ dominates.",
    "Students confuse the two half-equivalence points, assigning pH = pKa1 to the second buffer region instead of pH = pKa2.",
    ["Henderson-Hasselbalch", "buffer capacity", "Arrhenius acid-base definition"],
    ["pH = pKa + log([A⁻]/[HA])", "isoelectric pH = (pKa1 + pKa2)/2"]
  ),

  // 17. E/Z nomenclature
  mk(0, "Organic Chemistry", "E/Z Nomenclature for Alkenes",
    [
      "In the drug fumaric acid, the two carboxyl groups are on opposite sides of the double bond, while maleic acid has them on the same side. Which is E and which is Z?",
      "Assign E or Z to the alkene with Br and CH₃ on one carbon and Cl and H on the other, where Br and Cl are on the same side.",
      "Why do E and Z isomers of 2-butene have different boiling points, and which isomer (E or F) has the higher boiling point?",
    ],
    "E/Z nomenclature uses Cahn-Ingold-Prelog priority rules: assign priorities to each substituent on each doubly bonded carbon by atomic number; Z (zusammen, 'together') means higher-priority groups are on the same side; E (entgegen, 'opposite') means they are on opposite sides.",
    [
      "E designation always corresponds to the trans isomer with identical groups on opposite sides of the double bond",
      "Z (zusammen) means the higher-priority groups are on opposite sides of the double bond",
      "Priority in CIP rules is assigned based on the number of substituents, not their atomic number",
    ],
    [
      "E/trans equivalence holds only when both carbons bear identical substituent pairs; when all four groups differ, E/Z may not correspond to cis/trans",
      "Z means higher-priority groups are on the same side (zusammen = together); E means they are on opposite sides (entgegen = opposite)",
      "CIP priority is assigned by atomic number of the directly attached atom; higher atomic number = higher priority",
    ],
    "CIP rules: compare substituents on each alkene carbon by atomic number. For fumaric acid (HOOC-CH=CH-COOH with groups trans): each carbon has COOH (higher priority, higher Z) and H (lower priority); groups on opposite sides → E. Maleic acid is Z. For Br vs CH₃: Br (Z=35) > CH₃ (C, Z=6); Cl (Z=17) > H (Z=1); Br and Cl on same side → Z. (Z)-2-butene is more polar (dipoles partially cancel in E), so Z has a slightly higher boiling point due to greater intermolecular interactions.",
    "CIP priority by atomic number; Z = higher-priority groups same side; E = opposite sides.",
    "Students confuse cis/trans (identical groups) with E/Z (priority-based), incorrectly assigning E to all trans-looking structures.",
    ["enantiomers vs diastereomers", "SN1 vs SN2", "stereochemistry"],
    ["Z: same side", "E: opposite side", "CIP: higher atomic number = higher priority"]
  ),

  // 18. Free radical halogenation
  mk(0, "Organic Chemistry", "Free Radical Halogenation",
    [
      "Chlorination of 2-methylbutane produces a mixture of monochlorinated products. Which carbon produces the most abundant major product, and why?",
      "Bromination is more selective than chlorination for free radical halogenation. How does Hammond's postulate explain this selectivity difference?",
      "A free radical chain reaction proceeds through initiation, propagation, and termination steps. Which step involves homolytic cleavage of the halogen molecule?",
    ],
    "Free radical halogenation proceeds by initiation (homolytic cleavage of X₂ by light/heat), propagation (H abstraction by X•, then R• + X₂ → RX + X•), and termination; selectivity follows radical stability: 3° > 2° > 1° > methyl; Br• is more selective than Cl• because it forms a later, more product-like transition state (Hammond's postulate).",
    [
      "Free radical halogenation proceeds via a carbocation intermediate, explaining tertiary selectivity",
      "Chlorination is more selective than bromination because Cl₂ is more reactive",
      "Termination in free radical halogenation involves the propagation radical reacting with the substrate",
    ],
    [
      "Free radical mechanisms involve radical intermediates (neutral species with unpaired electrons), not carbocations; carbocations appear in SN1 and E1 mechanisms",
      "Br• is more selective than Cl• precisely because it is less reactive (more discriminating); high reactivity of Cl• means it reacts at whichever C-H bond it encounters first",
      "Termination involves combination of two radicals (R• + X• → RX, or 2R• → R-R), eliminating chain-carrying species",
    ],
    "Free radical halogenation: initiation—X₂ → 2X• (homolysis by hν or Δ); propagation—X• + R-H → HX + R•, then R• + X₂ → R-X + X•; termination—radical combination. Radical stability: 3° > 2° > 1° (hyperconjugation and inductive effects). Br• reacts via a late (endothermic) transition state resembling the product radical, making it selective; Cl• reacts via an early (exothermic) TS and is less selective.",
    "Radical halogenation: 3° > 2° > 1° selectivity; Br is more selective than Cl; initiation = homolysis.",
    "Students apply carbocation stability rules (from SN1) to radical halogenation—the same stability order applies but for different reasons (radicals, not cations).",
    ["SN1 vs SN2", "E/Z nomenclature", "electrophilic aromatic substitution"],
    ["R• stability: 3° > 2° > 1°", "selectivity ∝ endothermicity of H-abstraction"]
  ),

  // 19. Nucleophilic acyl substitution
  mk(0, "Organic Chemistry", "Nucleophilic Acyl Substitution",
    [
      "Aspirin is synthesized by reacting acetic anhydride with salicylic acid. Why is acetic anhydride preferred over acetyl chloride for industrial synthesis despite similar reactivity?",
      "Rank the following toward nucleophilic acyl substitution: acyl chloride, anhydride, ester, amide. Which is most reactive and why?",
      "Base-catalyzed ester hydrolysis (saponification) is irreversible, but acid-catalyzed ester hydrolysis is reversible. Why does the presence of base make the reaction irreversible?",
    ],
    "Nucleophilic acyl substitution proceeds via a tetrahedral intermediate; the leaving group ability determines reactivity order: acyl chloride > anhydride > ester > amide; saponification is irreversible because the carboxylate product (RCOO⁻) is resonance-stabilized and a poor electrophile, preventing the reverse reaction.",
    [
      "Amides are more reactive than esters in nucleophilic acyl substitution because nitrogen is a better nucleophile than oxygen",
      "The leaving group in ester hydrolysis is OH⁻, which departs as a hydroxide ion",
      "Acid-catalyzed and base-catalyzed ester hydrolyses are both reversible under all conditions",
    ],
    [
      "Amides are the least reactive (not most) because N⁻ is a poor leaving group; the nitrogen lone pair stabilizes the carbonyl through resonance, making amide C=O less electrophilic",
      "The leaving group in ester hydrolysis is the alkoxide (RO⁻) or alcohol (ROH), not OH⁻; the incoming nucleophile is water or hydroxide",
      "Saponification (base-catalyzed hydrolysis) is irreversible because the carboxylate product is resonance-stabilized and will not re-react with the alcohol leaving group",
    ],
    "Nucleophilic acyl substitution: Nu attacks carbonyl C → tetrahedral intermediate → leaving group departs. Reactivity order (ease of substitution): acyl chloride > anhydride > ester ≈ thioester > amide. Better leaving groups (weaker conjugate bases, lower pKa) = more reactive substrate. Saponification: RCO₂Et + OH⁻ → RCO₂⁻ + EtOH. The carboxylate (pKa ~5) is far more stable than ethoxide (pKa ~16), preventing reversal.",
    "Acyl substitution reactivity: RCOCl > (RCO)₂O > RCOOR' > RCONR₂; saponification is irreversible due to carboxylate stability.",
    "Students think amides are highly reactive because N is nucleophilic; amides are actually the least reactive acyl derivatives toward nucleophilic substitution.",
    ["aldol condensation", "NaBH4 reduction", "electrophilic aromatic substitution"],
    ["Reactivity: acyl Cl > anhydride > ester > amide", "ΔG driven by leaving group pKa"]
  ),

  // 20. Aldol condensation
  mk(0, "Organic Chemistry", "Aldol Condensation Mechanism",
    [
      "Under basic conditions, acetaldehyde (CH₃CHO) undergoes aldol condensation. What is the first intermediate formed, and what is the product after dehydration?",
      "Why does aldol condensation require an α-hydrogen on one of the carbonyl compounds, and what is the role of base in the mechanism?",
      "An intramolecular aldol condensation of a diketone produces a cyclic enone. Which ring size is typically preferred, and why?",
    ],
    "The aldol condensation mechanism: base abstracts the α-hydrogen to form an enolate, which attacks the carbonyl carbon of a second molecule to form a β-hydroxy carbonyl compound (aldol product); elimination of water from the β-hydroxy carbonyl gives the α,β-unsaturated carbonyl (enone) product.",
    [
      "Base acts as a nucleophile attacking the carbonyl carbon directly in the aldol condensation",
      "The aldol product (β-hydroxy carbonyl) is the final product of an aldol condensation reaction",
      "Aldol condensation requires an α-hydrogen because the base must protonate the carbonyl oxygen first",
    ],
    [
      "Base acts as a Brønsted-Lowry base abstracting the acidic α-hydrogen (adjacent to C=O), generating the nucleophilic enolate; base does not attack the carbonyl directly",
      "The full aldol condensation includes dehydration to give the α,β-unsaturated carbonyl; the β-hydroxy carbonyl is only the aldol addition product (the first stage, which can stop there at low temperature)",
      "Base deprotonates the α-carbon (not the carbonyl oxygen) to form the resonance-stabilized enolate nucleophile; α-hydrogens are acidic (pKa ~20) due to adjacent carbonyl stabilization",
    ],
    "Aldol condensation: step 1—base (OH⁻) abstracts α-H to form enolate (RC⁻HR'C=O ↔ RCH=R'C-O⁻); step 2—enolate attacks C=O of second carbonyl compound; step 3—protonation gives β-hydroxy carbonyl (aldol product); step 4—dehydration (E1cb) gives α,β-unsaturated carbonyl (enone). Intramolecular aldols favor 5- and 6-membered rings for thermodynamic/entropy reasons. Acetaldehyde → 3-hydroxybutanal → crotonaldehyde (trans-2-butenal).",
    "Aldol: enolate + carbonyl → β-hydroxy carbonyl → (−H₂O) → α,β-unsaturated carbonyl.",
    "Students confuse the aldol addition product (β-hydroxy carbonyl, no dehydration) with the aldol condensation product (requires dehydration to form the enone).",
    ["nucleophilic acyl substitution", "NaBH4 reduction", "Gibbs free energy"],
    ["enolate: α-H abstraction by base", "E1cb: β-hydroxy → enone + H₂O"]
  ),

  // 21. Electrophilic aromatic substitution
  mk(0, "Organic Chemistry", "Electrophilic Aromatic Substitution",
    [
      "Nitration of toluene (methylbenzene) produces mainly ortho- and para-nitrotoluene rather than meta-nitrotoluene. What property of the methyl group directs substitution to ortho/para positions?",
      "Nitrobenzene undergoes nitration at the meta position. How does the nitro group direct incoming electrophiles to the meta position?",
      "A student reacts chlorobenzene with an electrophile. Is the Cl group an activating or deactivating director, and where does substitution preferentially occur?",
    ],
    "In electrophilic aromatic substitution, electron-donating groups (EDGs) activate the ring and direct ortho/para by stabilizing the arenium ion intermediate at those positions; electron-withdrawing groups (EWGs) deactivate the ring and direct meta because the positive charge in the arenium ion is destabilized at ortho/para positions adjacent to the EWG.",
    [
      "The methyl group directs meta substitution because it withdraws electron density inductively from the ring",
      "Halogens (Cl, Br) are activating ortho/para directors because they donate electrons by induction",
      "EWGs direct ortho/para because they stabilize the positive arenium ion intermediate through resonance",
    ],
    [
      "Alkyl groups are EDGs (hyperconjugation and induction) that activate the ring and direct ortho/para, not meta",
      "Halogens are deactivating (strong −I effect withdraws electrons) but ortho/para directors because lone pairs on X donate electrons by resonance into the ring at ortho/para positions, stabilizing the arenium ion",
      "EWGs direct meta precisely because they destabilize (not stabilize) ortho/para arenium ions; meta placement avoids positive charge adjacent to the electron-withdrawing group",
    ],
    "EAS mechanism: electrophile (E⁺) attacks aromatic ring → arenium ion (Wheland intermediate) → loss of H⁺ restores aromaticity. Directing: EDGs (OH, NH₂, alkyl) → ortho/para (arenium stabilized at ortho/para by lone pair donation or hyperconjugation). EWGs (NO₂, COOH, CHO) → meta (ortho/para arenium destabilized by positive charge next to EWG). Halogens: deactivating (I effect) but ortho/para directing (R effect by lone pairs).",
    "EDG → ortho/para director (activating); EWG → meta director (deactivating); halogens → deactivating ortho/para directors.",
    "Students classify halogens as activating because they direct ortho/para, forgetting that halogens are deactivating (slower reaction than benzene) due to the dominant inductive withdrawal.",
    ["free radical halogenation", "nucleophilic acyl substitution", "SN1 vs SN2"],
    ["EDG: o/p director", "EWG: m director", "Halogens: deactivating o/p"]
  ),

  // 22. NMR spectroscopy
  mk(0, "Spectroscopy", "NMR: Chemical Shift and Splitting",
    [
      "The ¹H NMR spectrum of ethanol (CH₃CH₂OH) shows three distinct signals. How many signals are expected, and what splitting pattern does the CH₂ group display?",
      "A compound shows a ¹H NMR signal at δ 9.5 ppm (singlet, 1H). What functional group is most likely present?",
      "In the n+1 rule, what does 'n' represent, and why does an isolated methyl group (CH₃) appear as a singlet?",
    ],
    "In ¹H NMR, chemically equivalent protons give one signal; the n+1 rule states a proton signal is split into n+1 peaks by n neighboring (vicinal) nonequivalent protons; downfield shifts (high δ) indicate deshielded protons near electronegative atoms or aromatic rings.",
    [
      "The CH₂ group in ethanol is split into a doublet by the adjacent OH proton",
      "A singlet at δ 9.5 ppm most likely corresponds to an aromatic CH proton",
      "In the n+1 rule, n represents the number of equivalent protons on the same carbon",
    ],
    [
      "In fast-exchange conditions (typical NMR), OH protons appear as a broad singlet and do not split adjacent protons; CH₂ is split only by the 3 protons on CH₃, giving a quartet (3+1=4)",
      "Aldehyde protons (−CHO) appear at δ 9–10 ppm as a singlet (or doublet if coupled); aromatic protons appear at δ 6.5–8 ppm",
      "In the n+1 rule, n = number of nonequivalent neighboring (vicinal) protons; an isolated CH₃ with no adjacent H gives n=0, so n+1=1 peak (singlet)",
    ],
    "¹H NMR chemical shifts: alkyl ~0–3 ppm, next to O/N ~3–4.5 ppm, vinyl/aromatic 5–8 ppm, aldehyde 9–10 ppm, carboxylic acid 10–12 ppm. Splitting (n+1 rule): n vicinal H's split signal into n+1 lines. Ethanol: CH₃ (3H, split by 2 on CH₂ → triplet); CH₂ (2H, split by 3 on CH₃ → quartet); OH (1H, singlet). Coupling constants (J) depend on dihedral angle (Karplus equation).",
    "¹H NMR: n+1 splitting rule; downfield (high δ) = deshielded; aldehyde ~9–10 ppm, aromatic ~6.5–8 ppm.",
    "Students apply the n+1 rule counting the protons on the same carbon rather than on adjacent carbons.",
    ["IR spectroscopy", "mass spectrometry", "optical activity"],
    ["n+1 rule: n = vicinal H's", "δ (ppm) = downfield = deshielded"]
  ),

  // 23. Mass spectrometry
  mk(0, "Spectroscopy", "Mass Spectrometry",
    [
      "A mass spectrum shows a molecular ion peak at m/z = 78 and a base peak at m/z = 77. The compound is likely benzene (MW = 78). What does the m/z = 77 fragment represent?",
      "A compound shows M⁺ at m/z = 120 and M+2 at m/z = 122 in roughly equal intensity. What element is most likely present?",
      "In mass spectrometry, what is the 'base peak' and how is it different from the molecular ion peak?",
    ],
    "In mass spectrometry, the molecular ion peak (M⁺) gives the molecular weight; the base peak is the most abundant fragment ion (set to 100% relative intensity); isotope patterns (M+2 of equal intensity to M+1) indicate bromine; a 1:3 M:M+2 ratio indicates chlorine.",
    [
      "The molecular ion peak is always the most abundant peak (base peak) in a mass spectrum",
      "An M+2 peak with equal intensity to M indicates the presence of sulfur",
      "The base peak corresponds to the intact molecule losing one electron",
    ],
    [
      "The base peak is the most abundant fragment, which is often not the molecular ion; very stable fragments (e.g., loss of CO from aldehydes, loss of Cl) are often the base peak",
      "Equal M and M+2 intensities indicate bromine (⁷⁹Br and ⁸¹Br are roughly equally abundant); chlorine shows M:M+2 ≈ 3:1 (³⁵Cl:³⁷Cl natural abundance); sulfur's M+2 is only ~4% of M",
      "The molecular ion peak corresponds to the intact molecule minus one electron (M⁺•); the base peak is the most abundant fragment from molecular ion fragmentation",
    ],
    "Mass spectrometry ionizes molecules (electron ionization: M → M⁺• + e⁻) and separates ions by m/z ratio. The molecular ion peak (M⁺) gives MW. Fragmentation patterns reveal structure: loss of 15 (CH₃), 29 (CHO), 31 (OCH₃), etc. Isotope clusters: Cl (M:M+2 = 3:1), Br (M:M+2 = 1:1). For benzene, m/z=77 is [C₆H₅]⁺ (tropylium-like, phenyl cation) from loss of H. High-resolution MS can determine molecular formula.",
    "MS: M⁺ = molecular weight; base peak = most abundant fragment; Br gives M:M+2 = 1:1, Cl gives 3:1.",
    "Students confuse the molecular ion peak with the base peak—the base peak is always the tallest but is not always M⁺.",
    ["NMR spectroscopy", "IR spectroscopy", "optical activity"],
    ["m/z = mass/charge", "M:M+2 = 3:1 → Cl; 1:1 → Br"]
  ),

  // 24. Optical activity
  mk(0, "Stereochemistry", "Optical Activity and Specific Rotation",
    [
      "A racemic mixture of alanine is dissolved and placed in a polarimeter. What observed rotation is recorded, and why?",
      "A pure sample of (R)-glyceraldehyde has a specific rotation [α] = +8.7°. What is the specific rotation of (S)-glyceraldehyde?",
      "A compound has [α] = +30° at 20°C. After a reaction, the product mixture shows [α] = +15°. What is the enantiomeric excess (ee) of the product?",
    ],
    "Optical activity arises from chiral molecules that rotate plane-polarized light; enantiomers rotate light equally but in opposite directions; a racemic mixture (50:50 mixture of enantiomers) shows zero net rotation; specific rotation [α] is an intrinsic property, and enantiomeric excess ee = (observed rotation / pure enantiomer rotation) × 100%.",
    [
      "A racemic mixture rotates light by the average of the two enantiomers' rotations",
      "The (S) enantiomer always has a negative (−) specific rotation",
      "Diastereomers always have equal and opposite specific rotations",
    ],
    [
      "A racemic mixture has equal amounts of (+) and (−) rotating enantiomers that cancel completely, giving zero net rotation (not the average)",
      "R/S designation (configuration) does not determine the sign of rotation (+/−); that must be determined experimentally",
      "Diastereomers are stereoisomers that are not mirror images; they have different physical properties including different (not necessarily equal and opposite) specific rotations",
    ],
    "Plane-polarized light is rotated by chiral (asymmetric) molecules. Dextrorotatory (+) rotates right; levorotatory (−) rotates left. Enantiomers: equal |[α]|, opposite sign. Racemic mixture: [α]_observed = 0. ee = ([α]_observed / [α]_pure) × 100 = (+15/+30) × 100 = 50% ee. This means 75% R and 25% S (or vice versa). Meso compounds have stereocenters but are achiral due to internal plane of symmetry.",
    "Racemic mixture: [α] = 0; ee = (observed/pure rotation) × 100%; R/S ≠ (+)/(−) sign.",
    "Students assume S-configuration always means (−) rotation and R always means (+); the sign of rotation has no correlation with R/S designation.",
    ["enantiomers vs diastereomers", "NMR spectroscopy", "E/Z nomenclature"],
    ["ee = ([α]_obs / [α]_pure) × 100%", "racemic: 50:50 ee = 0"]
  ),

  // 25. Projectile motion
  mk(0, "Physics: Mechanics", "Projectile Motion",
    [
      "A ball is launched horizontally from a cliff 80 m high with an initial speed of 20 m/s. How far from the base of the cliff does it land? (g = 10 m/s²)",
      "A projectile is launched at 45° with speed v₀. If the launch speed is doubled, by what factor does the horizontal range increase?",
      "A ball thrown horizontally and a ball dropped vertically from the same height are released simultaneously. Which hits the ground first?",
    ],
    "Projectile motion has independent horizontal (constant velocity, no acceleration) and vertical (constant downward acceleration g) components; time of flight is determined solely by the vertical component, and horizontal range = v₀ₓ × t; maximum range is achieved at 45° launch angle.",
    [
      "A horizontally thrown ball hits the ground later than a dropped ball because the horizontal motion slows the downfall",
      "Doubling the launch speed doubles the horizontal range because range is directly proportional to speed",
      "The horizontal component of velocity decreases during flight due to air resistance in ideal projectile motion",
    ],
    [
      "In ideal projectile motion, horizontal and vertical motions are independent; both balls fall the same vertical distance in the same time and hit simultaneously",
      "Range R = v₀² sin(2θ)/g; doubling v₀ increases R by 4× (range ∝ v₀²), not 2×",
      "In ideal projectile motion (no air resistance), the horizontal component of velocity remains constant throughout the flight",
    ],
    "Projectile motion: horizontal—x = v₀ₓt (constant velocity); vertical—y = ½gt² (free fall from rest horizontally launched), v_y = gt. For the cliff problem: time of flight from y = ½gt²: 80 = ½(10)t², t = 4 s; range = 20 × 4 = 80 m. At 45°, range R = v₀² sin(90°)/g = v₀²/g is maximized. Complementary angles (30° and 60°) give the same range.",
    "Horizontal and vertical motions are independent; R = v₀²sin(2θ)/g; maximum range at 45°; time of flight set by vertical fall.",
    "Students believe a horizontally thrown object falls slower because it has horizontal velocity, forgetting that vertical and horizontal motions are completely independent.",
    ["work-energy theorem", "conservation of momentum", "kinematics"],
    ["R = v₀²sin(2θ)/g", "y = ½gt²", "x = v₀ₓt"]
  ),

  // 26. Conservation of momentum
  mk(0, "Physics: Mechanics", "Conservation of Momentum",
    [
      "A 2 kg cart moving at 3 m/s collides with a stationary 1 kg cart. They stick together. What is the final velocity of the combined system?",
      "In an elastic collision between equal masses where one is initially at rest, what happens to the velocities of each mass after the collision?",
      "A gun (mass 2 kg) fires a bullet (mass 0.01 kg) at 300 m/s. What is the recoil speed of the gun?",
    ],
    "Conservation of momentum states that total momentum is conserved in isolated systems: p_total = Σmv = constant; in perfectly inelastic collisions, objects stick together and kinetic energy is not conserved; in elastic collisions, both momentum and kinetic energy are conserved.",
    [
      "In a perfectly inelastic collision, both momentum and kinetic energy are conserved",
      "In an elastic collision between equal masses, both objects move at the initial speed of the moving object",
      "A stationary gun experiences no recoil force when firing a bullet because the gun is initially at rest",
    ],
    [
      "In perfectly inelastic collisions, momentum is conserved but kinetic energy is lost to heat, sound, and deformation; only elastic collisions conserve KE",
      "In an elastic collision between equal masses (one at rest), the moving object stops and the stationary object moves at the initial speed—they exchange velocities",
      "Newton's third law requires the bullet and gun to experience equal and opposite impulses; the gun recoils because of conservation of momentum, regardless of its initial rest state",
    ],
    "p = mv; conservation of momentum: Σp_before = Σp_after in isolated systems. Perfectly inelastic (stick together): m₁v₁ = (m₁+m₂)v_f; v_f = m₁v₁/(m₁+m₂) = (2×3)/(2+1) = 2 m/s. Gun recoil: 0 = m_bullet × v_bullet + m_gun × v_gun; v_gun = −(0.01×300)/2 = −1.5 m/s. Elastic collision: KE and p both conserved; equal-mass exchange: moving object stops, stationary one moves forward.",
    "p_total = constant; inelastic: KE lost; elastic: KE conserved; perfectly inelastic: objects stick, v_f = m₁v₁/(m₁+m₂).",
    "Students think elastic collisions require objects to bounce back; in equal-mass elastic collisions, the moving object stops and transfers all momentum forward.",
    ["work-energy theorem", "projectile motion", "torque and rotational equilibrium"],
    ["p = mv", "m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'", "v_f = Σmv/Σm (inelastic)"]
  ),

  // 27. Torque and rotational equilibrium
  mk(0, "Physics: Mechanics", "Torque and Rotational Equilibrium",
    [
      "A 5 m uniform beam (mass 20 kg) is supported at its center. A 40 kg person stands 1 m from the left end. Where must a 30 kg person stand to balance the beam?",
      "A wrench applies a force of 20 N at a distance of 0.3 m from a bolt. If the force is applied perpendicular to the wrench, what is the torque applied?",
      "For a forearm in static equilibrium holding a weight, which forces create clockwise torques and which create counterclockwise torques about the elbow joint?",
    ],
    "Rotational equilibrium requires Στ = 0 about any pivot point; torque τ = rF sinθ, where r is the moment arm, F is the force, and θ is the angle between r and F; the sign convention (CW negative, CCW positive) must be consistent.",
    [
      "Rotational equilibrium requires that the net force equals zero, but torques need not be balanced",
      "A larger force always produces a larger torque, regardless of where it is applied",
      "Torque is calculated as τ = r + F, combining the moment arm and force by addition",
    ],
    [
      "Static equilibrium requires both Στ = 0 and ΣF = 0; a net torque would cause rotation even if forces balance",
      "Torque depends on both force magnitude and moment arm (perpendicular distance); a small force far from the pivot can exceed a large force close to the pivot",
      "Torque is τ = rF sinθ (a cross product), not a sum; for perpendicular force application sinθ = 1 and τ = rF",
    ],
    "For static equilibrium: ΣF = 0 and Στ = 0. Choose a pivot to simplify: τ = rF sinθ. For the beam problem (pivot at center, 2.5 m from each end): person 1 (40 kg) is 1.5 m left of center → τ_CCW = 40×10×1.5 = 600 N·m; beam weight acts at center (τ = 0). Person 2 (30 kg) at distance d right: 30×10×d = 600; d = 2 m from center = 4.5 m from left end. Wrench: τ = 20×0.3×sin90° = 6 N·m.",
    "Rotational equilibrium: Στ = 0; τ = rF sinθ; choose pivot wisely to eliminate unknown forces.",
    "Students forget to include the weight of the beam itself (acting at the center of mass) when summing torques.",
    ["conservation of momentum", "simple harmonic motion", "Poiseuille's law"],
    ["τ = rF sinθ", "Στ = 0 (rotational equilibrium)", "ΣF = 0 (translational equilibrium)"]
  ),

  // 28. Simple harmonic motion
  mk(0, "Physics: Waves and Oscillations", "Simple Harmonic Motion",
    [
      "A mass of 0.5 kg on a spring with k = 200 N/m is displaced 0.1 m and released. What is the period of oscillation?",
      "How does the period of a simple pendulum change if the length is quadrupled while the mass is doubled?",
      "At what position in simple harmonic motion is the velocity maximum, and where is the restoring force maximum?",
    ],
    "In simple harmonic motion, period T = 2π√(m/k) for a mass-spring system and T = 2π√(L/g) for a simple pendulum; velocity is maximum at the equilibrium position (where PE is zero and KE is maximum), and restoring force is maximum at maximum displacement (amplitude).",
    [
      "The period of a mass-spring system increases when the mass is increased and decreases when the spring constant is increased, so a stiffer spring has a longer period",
      "The period of a simple pendulum depends on the mass of the bob and the length of the string",
      "In SHM, velocity is maximum at maximum displacement and zero at the equilibrium position",
    ],
    [
      "A stiffer spring (larger k) actually decreases the period (T = 2π√(m/k)); k is in the denominator, so larger k → shorter period (faster oscillation)",
      "The period of a simple pendulum T = 2π√(L/g) depends only on length and gravitational acceleration, not on the mass of the bob",
      "In SHM, velocity is zero at maximum displacement (all energy is PE) and maximum at equilibrium (all energy is KE); restoring force F = −kx is maximum where displacement x is maximum",
    ],
    "SHM restoring force: F = −kx (Hooke's law). Period for spring: T = 2π√(m/k). For m=0.5 kg, k=200: T = 2π√(0.5/200) = 2π√(0.0025) = 2π×0.05 = 0.314 s. For pendulum: T = 2π√(L/g); quadrupling L doubles T (√4=2); mass is irrelevant. Energy: E = ½kA²; KE = ½mv², PE = ½kx²; at equilibrium x=0 so KE=E (v_max); at x=A, v=0 so PE=E.",
    "T_spring = 2π√(m/k); T_pendulum = 2π√(L/g), independent of mass; v_max at x=0, F_max at x=±A.",
    "Students think pendulum period depends on mass; it depends only on length and g, not on the bob's mass.",
    ["standing waves", "Doppler effect", "wave interference"],
    ["T = 2π√(m/k)", "T = 2π√(L/g)", "E = ½kA²"]
  ),

  // 29. Standing waves and resonance
  mk(0, "Physics: Waves and Oscillations", "Standing Waves and Resonance",
    [
      "A string of length L is fixed at both ends. What are the allowed wavelengths and frequencies for standing waves on this string?",
      "An open pipe of length L resonates at its fundamental frequency. How does the fundamental frequency of a closed pipe of the same length compare?",
      "In a standing wave, what distinguishes a node from an antinode, and at which points does the string have maximum kinetic energy?",
    ],
    "Standing waves on a string fixed at both ends have nodes at each end; allowed wavelengths are λ_n = 2L/n (n = 1, 2, 3,...) giving frequencies f_n = nv/2L; a closed pipe (one end open, one closed) has a node at the closed end and antinode at the open end, allowing only odd harmonics with f_n = nv/4L (n = 1, 3, 5...).",
    [
      "A closed pipe at one end resonates at all harmonics (both odd and even) just like an open pipe",
      "Nodes in a standing wave are points of maximum displacement from equilibrium",
      "The fundamental frequency of a closed pipe is the same as that of an open pipe of the same length",
    ],
    [
      "A pipe closed at one end supports only odd harmonics because the boundary conditions require a node at the closed end and antinode at the open end; open pipes (nodes at both ends or antinodes at both ends) support all harmonics",
      "Nodes are points of zero displacement (minimum amplitude); antinodes are points of maximum displacement",
      "A closed pipe's fundamental has wavelength 4L (vs 2L for open pipe), so f_closed = v/4L = ½ × (v/2L) = ½ f_open; the closed pipe fundamental is one octave lower",
    ],
    "Standing waves form from superposition of incident and reflected waves. Fixed/closed ends: nodes; open/free ends: antinodes. String fixed at both ends: λ_n = 2L/n, f_n = nv/2L. Open pipe (both ends open): same as string—all harmonics. Closed pipe (one end closed): λ_1 = 4L, f_1 = v/4L, only odd harmonics (1st, 3rd, 5th...). Antinodes have maximum displacement and maximum KE; nodes have zero displacement but maximum potential energy transfer.",
    "String/open pipe: f_n = nv/2L (all harmonics); closed pipe: f_n = nv/4L (odd harmonics only); nodes = zero displacement.",
    "Students assume all pipes (open and closed) support all harmonics equally; closed pipes support only odd harmonics due to asymmetric boundary conditions.",
    ["simple harmonic motion", "Doppler effect", "wave interference"],
    ["f_n = nv/2L (string/open pipe)", "f_n = nv/4L (closed pipe, n = 1,3,5...)"]
  ),

  // 30. Snell's law and critical angle
  mk(0, "Physics: Optics", "Snell's Law and Total Internal Reflection",
    [
      "Light traveling in glass (n = 1.5) strikes the glass-air interface at 30° from the normal. Does total internal reflection occur? The critical angle for glass-air is 41.8°.",
      "An optical fiber works by total internal reflection. If the fiber's core has n₁ = 1.5 and the cladding has n₂ = 1.4, what is the critical angle for total internal reflection?",
      "A ray of light passes from air into water (n = 1.33) at an angle of incidence of 45°. Does it bend toward or away from the normal, and what is the angle of refraction?",
    ],
    "Snell's law n₁sinθ₁ = n₂sinθ₂ governs refraction; total internal reflection occurs when light travels from a denser medium to a less dense medium at an angle ≥ the critical angle θ_c = arcsin(n₂/n₁); light bends toward the normal when entering a denser medium.",
    [
      "Total internal reflection can occur when light travels from air (n=1) into glass (n=1.5)",
      "The critical angle is the angle of incidence in the less dense medium at which refracted light travels along the interface",
      "Light bends away from the normal when traveling from a less dense to a more dense medium",
    ],
    [
      "Total internal reflection requires light to travel from higher-n (denser) to lower-n (less dense) medium; light going from air into glass cannot undergo TIR because n_glass > n_air",
      "The critical angle is measured in the denser (higher-n) medium, not the less dense one; at θ_c, the refracted ray travels at 90° (along the interface) in the less dense medium",
      "Light bends toward the normal when entering a more optically dense (higher-n) medium, and away from the normal when entering a less dense medium",
    ],
    "Snell's law: n₁sinθ₁ = n₂sinθ₂. Critical angle: sinθ_c = n₂/n₁ (total internal reflection requires n₁ > n₂). For glass-air: θ_c = arcsin(1/1.5) = arcsin(0.667) = 41.8°. At 30° incidence (< 41.8°), light refracts (no TIR). For optical fiber: θ_c = arcsin(1.4/1.5) = arcsin(0.933) = 68.9°. Air→water at 45°: n₁sinθ₁ = n₂sinθ₂; 1×sin45° = 1.33×sinθ₂; θ₂ = arcsin(0.707/1.33) = 32.1°; bends toward normal.",
    "TIR requires denser→less dense medium at θ ≥ θ_c = arcsin(n₂/n₁); entering denser medium: bend toward normal.",
    "Students apply TIR to light going from air into glass, forgetting TIR requires the light to be in the higher-index medium already.",
    ["converging lens", "Doppler effect", "wave interference"],
    ["n₁sinθ₁ = n₂sinθ₂", "sinθ_c = n₂/n₁"]
  ),

  // 31. Kirchhoff's voltage law
  mk(0, "Physics: Electricity", "Kirchhoff's Voltage Law",
    [
      "A series circuit contains a 12 V battery, a 4 Ω resistor, and a 2 Ω resistor. What is the voltage drop across each resistor?",
      "A circuit loop contains a 9 V battery, a 3 V battery (opposing), and a 6 Ω resistor. Using KVL, what is the current in the loop?",
      "Why must the sum of voltage drops around any closed loop in a circuit equal zero?",
    ],
    "Kirchhoff's Voltage Law (KVL) states that the algebraic sum of all voltage changes around any closed loop in a circuit equals zero, because voltage is a conservative quantity (like potential energy); this means the sum of EMF sources equals the sum of voltage drops across resistors.",
    [
      "KVL states that the sum of currents entering a node equals the sum of currents leaving that node",
      "Voltage adds across resistors in parallel circuits, so the total voltage exceeds the battery voltage",
      "In a series circuit, the resistor with higher resistance has a smaller voltage drop",
    ],
    [
      "The statement 'sum of currents at a node = 0' is Kirchhoff's Current Law (KCL), not KVL; KVL applies to voltage around a loop",
      "In a parallel circuit, voltage is the same across all parallel branches (equal to the source voltage), not additive",
      "In a series circuit, voltage drop V = IR is proportional to resistance; the higher resistance resistor has the larger voltage drop",
    ],
    "KVL (loop rule): ΣV = 0 around any closed loop. Voltages rise across EMF sources (traversing + to −) and drop across resistors. For 12 V battery with 4 Ω and 2 Ω in series: I = V/R_total = 12/6 = 2 A; V₁ = IR₁ = 2×4 = 8 V; V₂ = IR₂ = 2×2 = 4 V; check: 8+4 = 12 V. For opposing batteries: net EMF = 9−3 = 6 V; I = 6/6 = 1 A. KCL (junction rule): ΣI_in = ΣI_out at any node.",
    "KVL: ΣV = 0 around any loop; voltage drops across R proportional to R (in series); EMF rises = Σ(IR) drops.",
    "Students confuse KVL (voltage loop rule) with KCL (current junction rule), applying the wrong law to the wrong circuit element.",
    ["parallel vs series resistance", "RC circuit", "Ohm's law"],
    ["ΣV = 0 (KVL)", "ΣI = 0 (KCL)", "V = IR"]
  ),

  // 32. RC circuit
  mk(0, "Physics: Electricity", "RC Circuit Time Constant",
    [
      "A capacitor (C = 10 μF) charges through a resistor (R = 100 kΩ). What is the time constant τ, and what fraction of the maximum charge does the capacitor hold after one time constant?",
      "An RC circuit with τ = 2 ms is used as a filter. How long does it take for the capacitor to charge to approximately 99% of the supply voltage?",
      "During the discharge of a capacitor in an RC circuit, how does the current change over time, and what happens to the voltage across the resistor?",
    ],
    "The RC time constant τ = RC determines charging/discharging rate; after one time constant, a capacitor charges to 1 − e⁻¹ ≈ 63% of maximum voltage (or discharges to e⁻¹ ≈ 37%); after 5τ, the capacitor is essentially fully charged (>99%).",
    [
      "After one time constant, the capacitor is fully charged to 100% of the supply voltage",
      "The time constant τ has units of farads divided by ohms",
      "During capacitor discharge, the current remains constant while voltage decreases exponentially",
    ],
    [
      "After one time constant, V_C = V_s(1 − e⁻¹) ≈ 0.632 V_s (63%), not 100%; full charge (99%) requires approximately 5τ",
      "τ = RC has units of ohms × farads = (V/A)(C/V) = C/A = seconds; τ is in seconds, not F/Ω",
      "During discharge, both current and voltage decrease exponentially with the same time constant; I = (V₀/R)e^(−t/τ) and V_R = V₀e^(−t/τ)",
    ],
    "RC charging: V_C(t) = V_s(1 − e^(−t/τ)); discharging: V_C(t) = V₀e^(−t/τ). τ = RC (seconds). After 1τ: 63% charged; 2τ: 86%; 3τ: 95%; 5τ: ~99%. For τ = 10μF × 100kΩ = 10⁻⁵ × 10⁵ = 1 s. To reach 99%: t ≈ 5τ = 5 ms (for τ = 1 ms). RC circuits act as low-pass filters (slow charging smooths high-frequency signals) and are relevant to cardiac defibrillator timing and nerve axon capacitance.",
    "τ = RC (seconds); 1τ → 63% charged; 5τ → ~99% charged; both V and I decay exponentially during discharge.",
    "Students think the capacitor charges linearly over time rather than exponentially, leading to incorrect predictions about charging speed.",
    ["capacitor energy storage", "Kirchhoff's voltage law", "parallel vs series resistance"],
    ["τ = RC", "V_C(t) = V_s(1 − e^(−t/RC))", "V_C(t) = V₀e^(−t/RC) (discharge)"]
  ),

  // 33. Magnetic force
  mk(0, "Physics: Electricity and Magnetism", "Magnetic Force on Moving Charge",
    [
      "A proton (charge +1.6 × 10⁻¹⁹ C) moves at 2 × 10⁶ m/s perpendicular to a magnetic field of 0.5 T. What is the magnitude of the magnetic force on the proton?",
      "An electron moves parallel to a magnetic field. What is the magnetic force on the electron?",
      "A positive charge moving to the right enters a magnetic field directed into the page. In which direction is the magnetic force on the charge?",
    ],
    "The magnetic force on a moving charge is F = qvB sinθ, directed perpendicular to both the velocity and the magnetic field (right-hand rule); this force does no work on the charge because it is always perpendicular to velocity, causing circular motion but no change in speed.",
    [
      "The magnetic force on a moving charge acts in the direction of the magnetic field",
      "A magnetic force does positive work on a charge, increasing its kinetic energy",
      "An electron moving parallel to a magnetic field experiences a maximum magnetic force",
    ],
    [
      "The magnetic force F = qv × B is perpendicular to both velocity and field (given by the cross product); it never acts parallel to B",
      "F ⊥ v always, so F·v = 0 and no work is done; magnetic forces cause circular motion at constant speed, not acceleration in the direction of motion",
      "When velocity is parallel to B (θ = 0°), sinθ = 0 and F = 0; maximum force occurs when v ⊥ B (θ = 90°)",
    ],
    "Magnetic force: F = qvB sinθ. For perpendicular motion (θ = 90°): F = qvB = (1.6×10⁻¹⁹)(2×10⁶)(0.5) = 1.6×10⁻¹³ N. Direction: right-hand rule—fingers in direction of v (right), curl toward B (into page): thumb points upward for positive charge; force is upward. This force causes circular motion with radius r = mv/(qB). Magnetic forces do zero work, so the speed of a charged particle in a uniform magnetic field is constant.",
    "F = qvB sinθ; perpendicular to v and B (RHR); no work done → constant speed; parallel to B → zero force.",
    "Students think magnetic force accelerates charges along the field direction; magnetic force is always perpendicular to velocity and does zero work.",
    ["photoelectric effect", "Kirchhoff's voltage law", "RC circuit"],
    ["F = qvB sinθ", "r = mv/(qB) (circular motion)", "W_magnetic = 0"]
  ),

  // 34. Photoelectric effect
  mk(0, "Physics: Modern Physics", "Photoelectric Effect",
    [
      "A metal with a work function of 2.3 eV is illuminated with light of wavelength 400 nm (E = 3.1 eV). What is the maximum kinetic energy of ejected electrons?",
      "Why does increasing the intensity of light below the threshold frequency fail to eject electrons from a metal surface?",
      "What experimental observation from the photoelectric effect could NOT be explained by the classical wave theory of light?",
    ],
    "Einstein's photoelectric effect demonstrates light's particle nature: photons have energy E = hf; electrons are ejected only when photon energy exceeds the work function φ (threshold frequency); maximum kinetic energy KE_max = hf − φ is independent of intensity, and increasing intensity increases the number of ejected electrons (current), not their maximum energy.",
    [
      "Increasing light intensity above the threshold frequency increases the maximum kinetic energy of ejected electrons",
      "Classical wave theory correctly predicts the existence of a threshold frequency for the photoelectric effect",
      "The kinetic energy of ejected electrons depends on the brightness (amplitude) of the incident light",
    ],
    [
      "Increasing intensity above threshold increases the number of ejected electrons (photocurrent) but does NOT increase KE_max, which depends only on frequency: KE_max = hf − φ",
      "Classical wave theory predicts no threshold frequency and predicts that any light, given enough time, should eject electrons by accumulating energy—which is not observed; Einstein's photon model explains the threshold",
      "In the photon model, KE_max depends on photon energy (frequency), not intensity (number of photons); intensity affects current (number of electrons per second), not electron energy",
    ],
    "Photoelectric effect (Einstein, 1905): light consists of photons with E = hf. Ejection requires hf > φ (work function). KE_max = hf − φ. For 400 nm: KE_max = 3.1 − 2.3 = 0.8 eV. Observations unexplained by wave theory: (1) instantaneous ejection regardless of intensity; (2) threshold frequency; (3) KE independent of intensity. Stopping potential V_stop = KE_max/e. Applications: solar cells, digital cameras (CCDs).",
    "KE_max = hf − φ; threshold frequency f_min = φ/h; intensity → more electrons, not higher KE.",
    "Students think brighter light makes faster (higher KE) electrons; brightness (intensity) only affects the number of ejected electrons, not their kinetic energy.",
    ["nuclear chemistry", "RC circuit", "magnetic force"],
    ["E = hf", "KE_max = hf − φ", "f_min = φ/h"]
  ),

  // 35. Heat engines and Carnot efficiency
  mk(0, "Thermodynamics", "Heat Engines and Carnot Efficiency",
    [
      "A heat engine operates between a hot reservoir at 600 K and a cold reservoir at 300 K. What is the maximum theoretical (Carnot) efficiency?",
      "A real heat engine operating between the same temperatures as the above Carnot engine achieves 30% efficiency. Is this possible, and how does it compare to the maximum?",
      "Why is it impossible for any heat engine to be 100% efficient, even theoretically?",
    ],
    "The Carnot efficiency η_Carnot = 1 − T_cold/T_hot (temperatures in Kelvin) sets the maximum theoretical efficiency for any heat engine; it is impossible to achieve 100% efficiency because the second law of thermodynamics requires heat rejection to a cold reservoir, and T_cold can never reach absolute zero.",
    [
      "The Carnot efficiency for a 600 K/300 K engine is 50%, and a real engine can exceed this if it uses a better working fluid",
      "Heat engines can achieve 100% efficiency if all friction is eliminated and the process is reversible",
      "Carnot efficiency can be increased by lowering the hot reservoir temperature while keeping the cold reservoir fixed",
    ],
    [
      "Carnot efficiency = 1 − 300/600 = 50%; no real engine can exceed this—it is an absolute maximum set by the second law, regardless of the working fluid",
      "The second law prohibits 100% efficiency even for a perfectly reversible engine; some heat must be rejected to the cold reservoir (ΔS_universe ≥ 0 requires T_cold > 0)",
      "Carnot efficiency increases by raising T_hot or lowering T_cold; lowering T_hot would decrease efficiency",
    ],
    "Carnot efficiency: η = 1 − T_C/T_H (Kelvin required). For 300 K/600 K: η = 1 − 300/600 = 0.50 = 50%. A real engine at 30% is possible (real < Carnot). 100% efficiency requires T_C = 0 K (absolute zero), which is unattainable (third law). Heat engine: W = Q_H − Q_C; efficiency = W/Q_H = 1 − Q_C/Q_H. For a reversible (Carnot) engine, Q_C/Q_H = T_C/T_H.",
    "η_Carnot = 1 − T_C/T_H (Kelvin); maximum possible efficiency; real engines always less efficient.",
    "Students use Celsius instead of Kelvin in the Carnot efficiency formula, dramatically miscalculating efficiency.",
    ["Gibbs free energy", "specific heat capacity", "entropy"],
    ["η_Carnot = 1 − T_C/T_H", "W = Q_H − Q_C", "η = W/Q_H"]
  ),

  // 36. Buoyancy / Archimedes' principle
  mk(0, "Physics: Fluids", "Buoyancy and Archimedes' Principle",
    [
      "A 500 cm³ wooden block (density 0.6 g/cm³) is placed in water (density 1.0 g/cm³). What fraction of the block is submerged at equilibrium?",
      "A steel bolt is weighed in air (80 g) and then suspended in water. The apparent weight is 70 g. What is the density of the steel?",
      "Why does a ship made of steel (density ~7.8 g/cm³) float on water even though steel sinks?",
    ],
    "Archimedes' principle states that the buoyant force equals the weight of the displaced fluid (F_b = ρ_fluid × V_displaced × g); an object floats when its average density is less than the fluid density, with the submerged fraction equal to the ratio of object density to fluid density.",
    [
      "The buoyant force equals the weight of the entire object, not the weight of displaced fluid",
      "An object sinks if its weight exceeds the buoyant force only when the object has no hollow sections",
      "The submerged fraction of a floating object equals the ratio of the fluid density to the object's density",
    ],
    [
      "Buoyant force = weight of displaced fluid (Archimedes); for a floating object this equals the object's weight, but for a submerged object the buoyant force may be less than the object's weight",
      "A steel ship floats because it is hollow, giving it a large volume and thus a low average density (total mass/total volume < 1 g/cm³); the relevant density is the average density of the entire object including air-filled spaces",
      "Submerged fraction = ρ_object/ρ_fluid (not the inverse); for wood: 0.6/1.0 = 60% submerged",
    ],
    "F_b = ρ_fluid × V_sub × g. Floating: ρ_object × V_total × g = ρ_fluid × V_sub × g → V_sub/V_total = ρ_object/ρ_fluid. Wood: 0.6/1.0 = 60% submerged. For steel bolt: apparent weight loss = F_b = (80−70) g-weight = 10 g-weight; V = F_b/(ρ_water × g) = 10 cm³; density = 80 g / 10 cm³ = 8.0 g/cm³. Ships float because the average density (steel + air) < 1 g/cm³.",
    "F_b = ρ_fluid × V_sub × g; submerged fraction = ρ_obj/ρ_fluid; average density determines floating.",
    "Students think objects float based on total weight alone rather than average density; a dense small object sinks while a dense large hollow object floats.",
    ["Poiseuille's law", "conservation of momentum", "specific heat capacity"],
    ["F_b = ρ_fluid × V_displaced × g", "V_sub/V_total = ρ_obj/ρ_fluid"]
  ),

  // 37. Diffraction and single-slit minimum
  mk(0, "Physics: Optics", "Diffraction and Single-Slit Minimum",
    [
      "Light of wavelength 500 nm passes through a single slit of width 0.1 mm. What is the angle to the first diffraction minimum?",
      "As the width of a single slit decreases, how does the central diffraction maximum change in width?",
      "Why does diffraction become more pronounced when the slit width approaches the wavelength of light, and what is the limiting case when slit width << λ?",
    ],
    "For single-slit diffraction, the condition for dark fringes (minima) is a sinθ = mλ (m = ±1, ±2,...) where a is the slit width and λ is the wavelength; the central maximum becomes wider as slit width decreases, and when a << λ, the slit acts as a point source emitting Huygens wavelets uniformly in all directions.",
    [
      "The condition for the first single-slit minimum is a sinθ = λ/2, where a is the slit width",
      "Narrowing the slit causes the diffraction pattern to become narrower and more concentrated",
      "Diffraction minima occur when the path difference between waves from the slit center and slit edge equals a full wavelength",
    ],
    [
      "The first minimum occurs when a sinθ = λ (m = 1), not λ/2; the minima condition for single-slit is a sinθ = mλ",
      "Narrowing the slit widens the diffraction pattern (central maximum spreads more); this inverse relationship is fundamental to diffraction",
      "The first minimum occurs when path difference between waves from opposite edges of the slit = λ, causing destructive interference from paired Huygens sources across the slit",
    ],
    "Single-slit diffraction minima: a sinθ = mλ (m = 1, 2, 3,...). First minimum: sinθ = λ/a = 500×10⁻⁹/(0.1×10⁻³) = 0.005; θ ≈ 0.29°. Wider central maximum with narrower slit (a↓ → θ↑). Double-slit: interference maxima at d sinθ = mλ modulated by single-slit diffraction envelope. When a ≈ λ, diffraction spreads nearly 180°. This principle limits microscope resolution (Rayleigh criterion) and determines antenna design.",
    "Single-slit minima: a sinθ = mλ; narrower slit → wider diffraction pattern; λ/a gives angular spread.",
    "Students confuse the single-slit minimum condition (a sinθ = mλ) with the double-slit maximum condition (d sinθ = mλ), using the same formula for opposite purposes.",
    ["converging lens", "Snell's law", "wave interference"],
    ["a sinθ = mλ (single-slit minima)", "d sinθ = mλ (double-slit maxima)"]
  ),

  // 38. Capacitor energy storage
  mk(0, "Physics: Electricity", "Capacitor Energy Storage",
    [
      "A capacitor (C = 50 μF) is charged to a voltage of 100 V. How much energy is stored in the capacitor?",
      "If the voltage across a capacitor is doubled while the capacitance remains fixed, by what factor does the stored energy change?",
      "A defibrillator stores 360 J in a capacitor bank charged to 5000 V. What capacitance is used?",
    ],
    "The energy stored in a capacitor is U = ½CV² = Q²/(2C) = ½QV; since U depends on V², doubling the voltage quadruples the stored energy; capacitors store energy in the electric field between their plates.",
    [
      "The energy stored in a capacitor is U = CV², without the factor of ½",
      "Doubling the voltage on a capacitor doubles the stored energy because U is proportional to V",
      "A capacitor stores energy in the form of current flowing between its plates",
    ],
    [
      "The correct formula is U = ½CV²; the factor of ½ arises because voltage builds gradually during charging (average voltage = V/2), so U = Q × V/2 = ½CV²",
      "U ∝ V² means doubling V increases U by 2² = 4× (not 2×); this quadratic relationship is crucial for high-voltage energy storage",
      "Capacitors store energy in the electric field between the plates, not in current; current flows only during charging/discharging",
    ],
    "U = ½CV². For C=50 μF, V=100 V: U = ½(50×10⁻⁶)(100)² = ½(50×10⁻⁶)(10⁴) = 0.25 J. Doubling V: U_new = ½C(2V)² = 4×(½CV²); energy increases 4×. For defibrillator: C = 2U/V² = 2(360)/(5000)² = 720/25×10⁶ = 28.8 μF. Equivalent formulas: U = Q²/(2C) = ½QV. Capacitors in series: 1/C_total = Σ(1/C); in parallel: C_total = ΣC.",
    "U = ½CV²; energy ∝ V² so doubling V quadruples energy; capacitors store energy in electric field.",
    "Students omit the ½ factor in the energy formula, overestimating stored energy by a factor of 2.",
    ["RC circuit", "Kirchhoff's voltage law", "photoelectric effect"],
    ["U = ½CV²", "U = Q²/(2C)", "U = ½QV"]
  ),

  // 39. Raoult's law
  mk(0, "Physical Chemistry", "Raoult's Law and Vapor Pressure Depression",
    [
      "Pure water has a vapor pressure of 23.8 mmHg at 25°C. A solution is made by dissolving 18 g of glucose (MW = 180 g/mol) in 180 g of water (MW = 18 g/mol). What is the vapor pressure of the solution?",
      "Ethanol and water form a nearly ideal solution. If the mole fraction of ethanol is 0.4 in a solution, and pure ethanol has P° = 44.6 mmHg while pure water has P° = 23.8 mmHg, what is the total vapor pressure?",
      "Why does dissolving a nonvolatile solute always decrease the vapor pressure of the solvent, and how does this relate to colligative properties?",
    ],
    "Raoult's Law states that the partial vapor pressure of each component equals its mole fraction times its pure vapor pressure (P_A = χ_A × P°_A); for a nonvolatile solute, vapor pressure depression ΔP = χ_solute × P°_solvent because the solute molecules occupy the surface, reducing the rate of solvent evaporation.",
    [
      "Raoult's Law predicts that vapor pressure increases when a solute is added because dissolved particles increase kinetic energy",
      "Vapor pressure depression depends on the identity (mass) of the solute, not the number of particles",
      "The vapor pressure of the solution equals the mole fraction of the solute times the pure solvent vapor pressure",
    ],
    [
      "Adding a solute (especially nonvolatile) always decreases solvent vapor pressure because solute molecules displace solvent molecules from the surface, reducing evaporation rate",
      "Vapor pressure depression is a colligative property depending only on the number of solute particles (moles), not their identity or mass",
      "P_solvent = χ_solvent × P°_solvent (mole fraction of the solvent, not solute); the solute reduces χ_solvent, which reduces P",
    ],
    "Raoult's Law: P_A = χ_A × P°_A. For glucose solution: moles glucose = 18/180 = 0.1 mol; moles water = 180/18 = 10 mol; χ_water = 10/10.1 = 0.990; P_water = 0.990 × 23.8 = 23.6 mmHg. For ethanol-water: P_total = χ_EtOH × P°_EtOH + χ_water × P°_water = 0.4(44.6) + 0.6(23.8) = 17.84 + 14.28 = 32.1 mmHg. Vapor pressure depression ΔP = χ_solute × P°_solvent (for nonvolatile solute) is a colligative property.",
    "Raoult's Law: P_A = χ_A × P°_A; vapor pressure depression = χ_solute × P°_solvent; colligative = depends on particle number.",
    "Students use the mole fraction of the solute instead of the solvent when calculating solution vapor pressure with Raoult's law.",
    ["colligative properties", "van't Hoff factor", "ideal gas law"],
    ["P_A = χ_A × P°_A", "ΔP = χ_solute × P°_solvent"]
  ),

  // 40. Lattice energy
  mk(0, "Physical Chemistry", "Lattice Energy and Ionic Compound Stability",
    [
      "NaCl has a higher melting point than KCl. Which factor related to lattice energy explains this trend?",
      "MgO has a much higher lattice energy than NaCl despite both being 1:1 ionic compounds. What two factors in the Born-Landé equation account for MgO's higher lattice energy?",
      "Using the Born-Haber cycle, which step in forming NaCl(s) from Na(s) and ½Cl₂(g) releases the most energy?",
    ],
    "Lattice energy is the energy released when gaseous ions form a crystalline ionic solid; it increases with higher ionic charges and smaller ionic radii because the electrostatic attraction (U ∝ |z⁺||z⁻|/r) is stronger; MgO (Mg²⁺, O²⁻) has much higher lattice energy than NaCl (Na⁺, Cl⁻) because of both higher charge and smaller ionic size.",
    [
      "Lattice energy increases with increasing ionic radius because larger ions have more electrons to participate in bonding",
      "NaCl has higher lattice energy than MgO because Na⁺ and Cl⁻ are monovalent and pack more efficiently",
      "In the Born-Haber cycle, the ionization energy step releases the most energy when forming NaCl",
    ],
    [
      "Lattice energy decreases with increasing ionic radius; larger ions have greater interionic distance (r), reducing electrostatic attraction U ∝ 1/r",
      "MgO has much higher lattice energy (−3791 kJ/mol) than NaCl (−787 kJ/mol) because Mg²⁺ and O²⁻ have both higher charges (z = 2 vs 1) and smaller radii than Na⁺ and Cl⁻",
      "Ionization energy (Na → Na⁺ + e⁻) is endothermic (requires energy input); the most exothermic step in the Born-Haber cycle is the lattice energy (formation of the ionic crystal)",
    ],
    "Lattice energy U ∝ |z⁺||z⁻|/r (Coulomb's law). Larger charge and smaller radius → greater lattice energy → more stable ionic compound → higher melting point. NaCl vs KCl: Na⁺ is smaller than K⁺ (both +1), so NaCl has larger lattice energy and higher mp. MgO vs NaCl: z² factor = 4 vs 1, and Mg²⁺ and O²⁻ are smaller than Na⁺ and Cl⁻; combined effect gives MgO lattice energy ~5× larger. Born-Haber: sum of atomization, ionization, electron affinity, and lattice energies = ΔH_f.",
    "Lattice energy ∝ |z⁺||z⁻|/r; higher charge and smaller radius → greater lattice energy → more stable, higher mp ionic compound.",
    "Students assume larger ions have stronger lattice energy because 'more electrons = more attraction'; the opposite is true because larger ions increase the interionic distance, weakening electrostatic attraction.",
    ["colligative properties", "Gibbs free energy", "van der Waals equation"],
    ["U ∝ |z⁺||z⁻|/r", "Born-Haber cycle: ΔH_f = ΔH_atom + IE + EA + LE"]
  ),

];
