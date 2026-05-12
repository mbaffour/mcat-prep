# Adding Questions

Use the Question Editor for one-off items or JSON imports.

## Manual Entry

1. Open `#/editor`.
2. Load the blank template.
3. Write an original stem, four choices, correct answer, explanations, tags, and source metadata.
4. Set review status.
5. Validate the schema.
6. Save the custom question.

## Import JSON

Paste a JSON array of questions into the editor and choose **Import JSON array**. Every imported question must validate before saving.

## Import From Concepts

Use `#/ingestion` when you are working from legal source text or notes. The ingestion workflow creates draft questions only. Drafts remain outside the approved bank until human review is complete.

## Generate A Larger Original Bank

The project includes a deterministic original question generator:

```bash
node scripts/generateQuestionBank.mjs 50000
```

You can regenerate the 50,000-question bank with:

```bash
node scripts/generateQuestionBank.mjs 50000
```

The generator uses internal high-yield concept templates and marks output as original generated content. It does not import or rephrase proprietary MCAT question-bank items.

## Export

- Approved bank: use Question Bank export.
- Draft bank: use Ingestion export.
- CSV index: use the editor CSV export.
