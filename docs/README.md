# Project 528

Project 528 is a static-first MCAT prep app built with HTML, CSS, and vanilla JavaScript. It runs locally in the browser and is ready for GitHub Pages hosting.

## Features

- Dashboard with progress, streak, readiness estimate, weak topics, recent activity, and section progress.
- Learning, practice, timed test, full-length simulation, mistakes review, and spaced repetition modes.
- MCAT-style section presets: 59/95 for science sections, 53/90 for CARS, and 230 questions over 375 content minutes for full-length mode.
- Searchable MCAT question bank with 100,000 bundled original concept-generated questions.
- Question editor with schema validation, JSON import, CSV export, and custom question saving.
- Safe content ingestion workflow for legal source material, user notes, open-license content, and public-domain educational text.
- Draft question registry separated from the approved bank.
- Local progress persistence with backup, restore, progress reset, and full reset.
- Light and dark themes.

## Running Locally

Serve the folder with a tiny static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Directly opening `index.html` with `file://` may fall back to the small in-code demo bank because browsers restrict local JSON fetches. GitHub Pages and a local static server load the full sharded 100,000-question bank.

## MCAT Similarity

The simulator follows the official section structure published by the AAMC: three 59-question science/social science sections at 95 minutes each and one 53-question CARS section at 90 minutes. Science/social science presets prioritize passage-style items plus independent questions; CARS presets select passage-based CARS items only.

The content remains original/generated and should be reviewed before high-stakes use. It is not copied from AAMC or commercial prep products.

## Data Model

Approved questions are loaded from sharded JSON files under `data/questions/` and any approved custom questions saved in localStorage. Generated ingestion drafts are stored separately and exported separately until reviewed.

## Large Bank Generation

The bundled bank is generated from original concept templates:

```bash
node scripts/generateQuestionBank.mjs 50000
```

To generate a larger local file, pass a higher number:

```bash
node scripts/generateQuestionBank.mjs 50000
```

Very large static JSON files can slow first load in a browser, so keep the question-bank table filtered while browsing. The app renders a preview of the first 500 matching rows and exports the full set when requested.

The generator writes GitHub-friendly shards under `data/questions/`; each shard is small enough for a normal GitHub repository. `data/sample_questions.json` is only a tiny pointer file now.

## Legal Content Principle

The app is designed to turn lawful concept material into original MCAT-style teaching questions. It must not scrape, copy, lightly paraphrase, or import copyrighted MCAT questions or paywalled question-bank material.
