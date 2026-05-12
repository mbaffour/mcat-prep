import { MCAT_SECTIONS } from "./demoData.js";

export const MCAT_BLUEPRINT = [
  {
    section: MCAT_SECTIONS[0],
    shortName: "Chem/Phys",
    questions: 59,
    minutes: 95,
    passageSets: 10,
    passageQuestionRange: "4-6",
    independentQuestions: 15,
    focus: "Physical sciences in biological systems"
  },
  {
    section: MCAT_SECTIONS[1],
    shortName: "CARS",
    questions: 53,
    minutes: 90,
    passageSets: 9,
    passageQuestionRange: "5-7",
    independentQuestions: 0,
    focus: "Comprehension, analysis, and reasoning from humanities and social science passages"
  },
  {
    section: MCAT_SECTIONS[2],
    shortName: "Bio/Biochem",
    questions: 59,
    minutes: 95,
    passageSets: 10,
    passageQuestionRange: "4-6",
    independentQuestions: 15,
    focus: "Living systems, biology, and biochemistry"
  },
  {
    section: MCAT_SECTIONS[3],
    shortName: "Psych/Soc",
    questions: 59,
    minutes: 95,
    passageSets: 10,
    passageQuestionRange: "4-6",
    independentQuestions: 15,
    focus: "Behavior, society, research methods, and health"
  }
];

export const MCAT_TEST_DAY_FLOW = [
  { label: "Certification", minutes: 4, type: "admin" },
  { label: "Tutorial", minutes: 10, type: "optional" },
  { label: "Chem/Phys", minutes: 95, type: "section" },
  { label: "Break", minutes: 10, type: "break" },
  { label: "CARS", minutes: 90, type: "section" },
  { label: "Mid-exam break", minutes: 30, type: "break" },
  { label: "Bio/Biochem", minutes: 95, type: "section" },
  { label: "Break", minutes: 10, type: "break" },
  { label: "Psych/Soc", minutes: 95, type: "section" },
  { label: "Void question", minutes: 3, type: "admin" },
  { label: "Survey", minutes: 5, type: "optional" }
];

export function blueprintForSection(section) {
  return MCAT_BLUEPRINT.find((item) => item.section === section);
}

export function mcatContentMinutes() {
  return MCAT_BLUEPRINT.reduce((sum, item) => sum + item.minutes, 0);
}

export function mcatQuestionTotal() {
  return MCAT_BLUEPRINT.reduce((sum, item) => sum + item.questions, 0);
}
