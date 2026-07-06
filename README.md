# Project 528

A local-first, static MCAT prep platform built with HTML, CSS, and vanilla JavaScript (ES modules). It runs entirely in the browser, stores progress in `localStorage`, and is ready for GitHub Pages hosting.

## Highlights

- Dashboard, learning, practice, timed test, full-length simulation, mistakes review, and spaced-repetition modes.
- MCAT-style section presets and a bundled bank of original, concept-generated questions.
- Question editor with schema validation, JSON import, and CSV export.
- Safe content-ingestion workflow for legal/open-license source material.
- Local progress persistence with backup, restore, and reset.
- A Pomodoro-style focus timer inside the study view and portable progress export/import (see [`IMPROVEMENTS.md`](IMPROVEMENTS.md)).

## Running locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` via `file://` falls back to a small demo bank because browsers restrict local JSON fetches.

## Tests

```bash
npm test
```

## Documentation

Full documentation lives in [`docs/`](docs/):

- [`docs/README.md`](docs/README.md) — features, data model, and MCAT similarity notes.
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — GitHub Pages deployment.
- [`docs/ADDING_QUESTIONS.md`](docs/ADDING_QUESTIONS.md) — adding questions.
- [`docs/QUESTION_SCHEMA.md`](docs/QUESTION_SCHEMA.md) — question schema reference.
- [`docs/LEGAL_CONTENT_GUIDE.md`](docs/LEGAL_CONTENT_GUIDE.md) — legal content principles.

## License

Released under the [MIT License](LICENSE).
