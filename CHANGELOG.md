# Changelog

## v2.0.0 — 2026-05-17

### Question Bank
- **60,000 questions** across 24 shards (up from 20,000 in 8 shards)
- **300+ concepts** added via modular files: Chem/Phys (40), Bio/Biochem (31), Psych/Soc (30)
- **20 original CARS passages** — 300–500 words each, real academic prose on bioethics, philosophy of science, sociology, health policy, and more
- **4 clinical vignettes** with real lab-value tables: DKA (metabolic acidosis), CKD (renal failure), Addison's disease, enzyme kinetics
- Unique stem count tripled to 457

### Repetition Fix
- `sortByStudyPriority()`: sessions now order questions as **unseen → wrong → correct** using `state.attempts`
- Starting Learn or Practice always exhausts unseen questions before cycling repeats
- Session-level stem deduplication prevents identical stems within any single session

### Quiz Interface
- Compact **quiz-chrome header** replaces the oversized "Question N of M" h1
- Navigation buttons (← Prev / Next →) now appear at the **top** of the chrome bar — no scrolling required
- Choice buttons: 62 px tall, full-colour feedback — correct = green bg + filled badge, incorrect = red
- Passage area: blue left-border accent, caption label, 1.7 line-height
- Quiz footer: secondary actions (Flag / Save / Weak) left; Prev / Submit / Next right
- Secondary actions collapsible behind a **⋮ More** toggle on narrow viewports

### Explanation Redesign
- "Correct: X" badge in a green pill, visible without scrolling
- Wrong-answer list: each distractor gets a red lettered badge + inline reason
- Expandable `<details>` sections for Why Correct, Wrong Answers, Takeaway, Trap, Related, Formulas

### Dashboard
- Mode cards: emoji icons (📖 🎯 ⏱ 🧪 🔴 🔁 📊 ⚡), white surface, layered shadow
- Metric cards: uppercase label, larger number (2.1 rem), tighter letter-spacing
- Difficulty pills: colour-coded (easy = green, medium = amber, hard = red)

### Navigation
- Primary nav (student flow): Dashboard · Learn · Practice · Timed · Full Length · Mistakes · Spaced · Analytics · Fun Science
- Tools nav (secondary strip): Bank · Editor · Ingestion · Feedback
- Both navbars receive `aria-current` active-page highlighting

### CSS Design Tokens
- `--radius: 10px` (up from 8px); `--radius-sm: 6px`; `--radius-lg: 16px`
- `--shadow` and `--shadow-md` use layered approach for depth without heaviness
- Updated dark theme: deeper bg (`#0f1319`), adjusted line/muted/primary values
