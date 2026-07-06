# Improvements

This document records the fixes and additive features applied to Project 528.

## Fixes

- **Root `README.md` and `LICENSE`.** Added a concise root `README.md` (highlights, run instructions, and links into `docs/`) and a standard MIT `LICENSE` (Copyright (c) 2026 Michael Baffour Awuah). No license previously existed.
- **Backup import validation (`js/storage.js`).** `importBackup()` previously spread `parsed.data` after only a shallow truthiness check. It now:
  - Parses JSON defensively and reports invalid JSON clearly.
  - Verifies the payload is an object and carries a supported `schemaVersion` (falls back to the legacy `version` field for older exports).
  - Validates that each known field matches its expected type (arrays stay arrays, objects stay objects) before applying, rejecting malformed backups with a specific message.
  - `exportBackup()` now stamps `schemaVersion` alongside the legacy `version` so exports and imports stay in sync via a single `SCHEMA_VERSION` constant.

## New features

- **Pomodoro-style focus timer (`js/focusTimer.js`, wired in `js/app.js`).** A self-contained 25/5 focus/break timer mounted in the study/quiz Navigator sidebar (`#focusTimerMount`). Start / Pause / Reset / Skip controls, a completed-focus counter, and light/dark styling that matches existing tokens. It uses its own interval so it never collides with the quiz countdown, and its state persists across quiz re-renders. Purely additive: no existing behavior changes when it is ignored.
- **Portable progress export/import (`js/storage.js`, wired in `js/app.js`).** A focused, portable JSON containing only study stats and spaced-repetition state (`attempts`, `weakTopics`, `flags`, `savedQuestions`, `spaced`, `activity`, `streak`) — distinct from a full backup, so progress can move between devices without carrying custom questions, drafts, sources, or settings. Exposed via new "Export progress" / "Import progress" controls in the Backup and Restore dialog. Import merges only progress fields onto existing state and validates shape/`schemaVersion` before applying.

## Verification

- `node --check` passed on every changed/added JS module (`js/storage.js`, `js/focusTimer.js`, `js/app.js`).
- Existing behavior is preserved: the changes are additive (new module, new storage methods, new UI controls) or hardening (stricter backup validation with clearer errors).
