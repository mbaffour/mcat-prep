# Deployment

MCAT Forge is a static app and can be deployed on GitHub Pages.

## GitHub Pages

1. Commit the repo.
2. Push it to GitHub.
3. In repository settings, enable GitHub Pages.
4. Choose the branch and root folder.
5. Visit the Pages URL once the deployment finishes.

No build step is required.

## Files Required

- `index.html`
- `css/styles.css`
- `js/*.js`
- `data/questions/manifest.json`
- `data/questions/questions-*.json`
- `data/sample_questions.json`
- `data/schema/question_schema.json`
- `docs/*.md`

## Local Persistence

Progress, custom questions, sources, draft questions, spaced-repetition schedules, and settings are stored in browser localStorage. Use the in-app backup export before clearing browser data or switching devices.

## Large Question Bank

The 100,000-question bank is split into JSON shards so it can be committed to GitHub without hitting the normal 100 MB per-file limit. Regenerate it with:

```bash
node scripts/generateQuestionBank.mjs 100000
```

The generator targets MCAT-like section proportions using the 59/53/59/59 full-length structure.
