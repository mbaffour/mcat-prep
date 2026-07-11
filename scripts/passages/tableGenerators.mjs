// Generates realistic MCAT-style data tables for passage questions.
// Each function returns a { title, columns, rows } object usable in passage.tables[].

export function enzymeKineticsTable(seed = 0) {
  const Vmax = [100, 120, 80][seed % 3];
  const Km   = [5, 10, 20][seed % 3];
  const inhibitorType = ["competitive", "noncompetitive", "uncompetitive"][seed % 3];

  const substrates = [1, 2, 5, 10, 20, 50, 100];
  const rows = substrates.map(S => {
    const vCtrl  = +(Vmax * S / (Km + S)).toFixed(1);
    let vInh;
    if (inhibitorType === "competitive") {
      const KmApp = Km * 2;
      vInh = +(Vmax * S / (KmApp + S)).toFixed(1);
    } else if (inhibitorType === "noncompetitive") {
      const VmaxApp = Vmax * 0.5;
      vInh = +(VmaxApp * S / (Km + S)).toFixed(1);
    } else {
      const KmApp  = Km * 0.5;
      const VmaxApp = Vmax * 0.5;
      vInh = +(VmaxApp * S / (KmApp + S)).toFixed(1);
    }
    return [String(S), String(vCtrl), String(vInh)];
  });

  return {
    title: `Table 1. Reaction velocity (μmol/min) at varying [S] with and without inhibitor`,
    columns: ["[S] (mM)", "Velocity — control (μmol/min)", "Velocity — + inhibitor (μmol/min)"],
    rows,
  };
}

export function labValuesTable(scenario = "metabolic_acidosis") {
  const panels = {
    metabolic_acidosis: {
      title: "Table 1. Arterial blood gas and serum chemistry",
      columns: ["Parameter", "Patient value", "Reference range"],
      rows: [
        ["pH",       "7.22",  "7.35–7.45"],
        ["PaCO₂",   "28 mmHg", "35–45 mmHg"],
        ["HCO₃⁻",  "12 mEq/L", "22–26 mEq/L"],
        ["Na⁺",    "138 mEq/L", "135–145 mEq/L"],
        ["K⁺",     "5.8 mEq/L", "3.5–5.0 mEq/L"],
        ["Cl⁻",    "108 mEq/L", "96–106 mEq/L"],
        ["Lactate", "6.2 mmol/L", "0.5–2.2 mmol/L"],
      ],
    },
    metabolic_alkalosis: {
      title: "Table 1. Arterial blood gas and serum chemistry",
      columns: ["Parameter", "Patient value", "Reference range"],
      rows: [
        ["pH",       "7.54",  "7.35–7.45"],
        ["PaCO₂",   "48 mmHg", "35–45 mmHg"],
        ["HCO₃⁻",  "38 mEq/L", "22–26 mEq/L"],
        ["Na⁺",    "140 mEq/L", "135–145 mEq/L"],
        ["K⁺",     "2.9 mEq/L", "3.5–5.0 mEq/L"],
        ["Cl⁻",    "90 mEq/L",  "96–106 mEq/L"],
        ["Urine Cl⁻", "8 mEq/L", "> 20 mEq/L (if volume replete)"],
      ],
    },
    renal_failure: {
      title: "Table 1. Serum chemistry",
      columns: ["Parameter", "Patient value", "Reference range"],
      rows: [
        ["Creatinine",   "4.2 mg/dL",   "0.6–1.2 mg/dL"],
        ["BUN",          "68 mg/dL",    "7–25 mg/dL"],
        ["BUN:Cr ratio", "16",          "10–20"],
        ["Na⁺",         "132 mEq/L",   "135–145 mEq/L"],
        ["K⁺",          "6.1 mEq/L",   "3.5–5.0 mEq/L"],
        ["HCO₃⁻",       "14 mEq/L",    "22–26 mEq/L"],
        ["GFR (est.)",   "18 mL/min",   "> 90 mL/min (normal)"],
      ],
    },
    adrenal_insufficiency: {
      title: "Table 1. Serum chemistry and hormones",
      columns: ["Parameter", "Patient value", "Reference range"],
      rows: [
        ["Na⁺",      "124 mEq/L",  "135–145 mEq/L"],
        ["K⁺",       "6.0 mEq/L",  "3.5–5.0 mEq/L"],
        ["Glucose",  "58 mg/dL",   "70–99 mg/dL"],
        ["Cortisol (8 AM)", "3.1 μg/dL", "6–23 μg/dL"],
        ["ACTH",     "320 pg/mL",  "10–60 pg/mL"],
        ["Aldosterone", "2 ng/dL", "3–35 ng/dL (supine)"],
      ],
    },
  };
  return panels[scenario] || panels.metabolic_acidosis;
}

export function experimentalResultsTable(seed = 0) {
  const experiments = [
    {
      title: "Table 1. Cell viability (%) after treatment",
      columns: ["Treatment group", "24 h", "48 h", "72 h"],
      rows: [
        ["Vehicle control",   "98 ± 2", "96 ± 3", "94 ± 2"],
        ["Drug A (1 μM)",     "85 ± 4", "70 ± 5", "52 ± 6"],
        ["Drug A (10 μM)",    "62 ± 5", "38 ± 4", "18 ± 3"],
        ["Drug A + inhibitor","94 ± 3", "90 ± 4", "87 ± 3"],
      ],
    },
    {
      title: "Table 1. Gene expression (fold change vs. control)",
      columns: ["Gene", "Wild type", "Mutant A", "Mutant B"],
      rows: [
        ["Target gene",      "1.0", "0.12 ± 0.03", "3.8 ± 0.4"],
        ["Housekeeping (GAPDH)", "1.0", "1.0 ± 0.1", "1.0 ± 0.1"],
        ["Apoptosis marker", "1.0", "4.2 ± 0.5", "0.9 ± 0.1"],
        ["Proliferation marker","1.0","0.8 ± 0.1","6.1 ± 0.7"],
      ],
    },
    {
      title: "Table 1. Physiological parameters across groups",
      columns: ["Group (n=20)", "Heart rate (bpm)", "MAP (mmHg)", "Stroke volume (mL)"],
      rows: [
        ["Control",         "68 ± 4",  "93 ± 5",  "72 ± 6"],
        ["Drug B (low)",    "74 ± 5",  "98 ± 6",  "78 ± 5"],
        ["Drug B (high)",   "88 ± 6*", "112 ± 8*","62 ± 7*"],
        ["Drug B + blocker","69 ± 4",  "94 ± 5",  "71 ± 5"],
      ],
    },
    {
      title: "Table 1. Survey outcomes by socioeconomic quartile",
      columns: ["Income quartile", "Healthcare access (%)", "Preventive visits/yr", "10-yr mortality (%)"],
      rows: [
        ["Q1 (lowest)",  "48",  "0.6", "18.2"],
        ["Q2",           "67",  "1.1", "13.4"],
        ["Q3",           "81",  "1.6", "10.1"],
        ["Q4 (highest)", "94",  "2.3",  "6.8"],
      ],
    },
  ];
  return experiments[seed % experiments.length];
}

export function hardyWeinbergTable(seed = 0) {
  const diseases = [
    { name: "Cystic fibrosis", q: 0.02 },
    { name: "PKU",             q: 0.01 },
    { name: "Sickle cell",     q: 0.04 },
  ];
  const { name, q } = diseases[seed % diseases.length];
  const p = +(1 - q).toFixed(3);
  return {
    title: `Table 1. Hardy-Weinberg frequencies for ${name}`,
    columns: ["Genotype", "Frequency", "Phenotype"],
    rows: [
      ["p² (AA)",  `${(p * p).toFixed(4)}`, "Unaffected, non-carrier"],
      ["2pq (Aa)", `${(2 * p * q).toFixed(4)}`, "Carrier (unaffected)"],
      ["q² (aa)",  `${(q * q).toFixed(4)}`, "Affected"],
    ],
  };
}

export function clearanceTable() {
  return {
    title: "Table 1. Renal handling of five compounds",
    columns: ["Compound", "Plasma conc. (mg/mL)", "Urine conc. (mg/mL)", "Urine flow (mL/min)", "Clearance (mL/min)"],
    rows: [
      ["Inulin",   "1.0", "120",  "1.0", "120"],
      ["Glucose",  "1.0", "0.0",  "1.0",   "0"],
      ["PAH",      "0.1", "14.4", "1.0", "144"],
      ["Urea",     "0.2", "12.0", "1.0",  "60"],
      ["Drug X",   "0.5", "90.0", "1.0", "180"],
    ],
  };
}
