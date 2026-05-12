# Question Schema

The schema lives at `data/schema/question_schema.json`.

Each question includes:

- MCAT section, topic, subtopic, difficulty, and question type.
- Optional passage data with figures and tables.
- Four answer choices labeled `A` through `D`.
- Correct answer and detailed explanations.
- High-yield takeaway, common trap, related concepts, formulas, and step-by-step solution fields.
- Source metadata with source type, URL, license, attribution, and notes.
- Review metadata with status, reviewer notes, created date, and updated date.

Review statuses:

- `draft`: early authoring state.
- `needs_review`: generated or imported item awaiting inspection.
- `approved`: usable in the official bank.
- `rejected`: should not be used.

Ingestion-generated questions may include a `similarity` object:

- `max_overlap_ratio`: shingle-overlap estimate against source text.
- `shared_phrases`: matching phrases detected.
- `level`: `low`, `review`, or `blocked`.

Publishing requires valid schema, source/license/attribution fields, human review notes, `approved` status, and acceptable similarity.
