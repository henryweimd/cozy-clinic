# CHECKPOINT.md — name refresh (rename-01)

- Phase: rename only, operator-ordered. Names stay friendly but
  less silly. No geometry, motion, copy, feature, patient,
  condition, or art change — strings + docs + test list only.
- Mapping: Mochi (mascot, first patient) → Mabel; roster
  Maple/Pip/Boba/Clover/Nori → Milo/June/Theo/Nora (guard
  list: Mabel, Milo, June, Theo, Nora). Roster matrix rows
  named June/Milo/Theo/Dr. Nora; personas unchanged.
- Files: `src/scenes/ClinicScene.ts` (3 display strings,
  identifiers, texture keys `mabel-*`; file slugs unchanged),
  `src/clinical/engine.test.ts` (PATIENT_NAMES guard),
  `docs/CHARACTER_BIBLE.md`, `ART_BIBLE.md`,
  `docs/ANIMATION.md`, `art/manifest.json` (prose/name
  fields + rename note), `README.md`, `PROGRESS.md`.
- Deliberately unchanged: asset slugs, `prompt_full` history
  (hash-attested), rev-1 backups, contact-sheet baked labels,
  PROGRESS.md history. Manifest + PROGRESS record the rule.
- Tests: `npm test` 29/29 pass (guard covers new names; no
  condition text names a patient); `npm run build` green.
- Deployment URL: none from this run (main agent merges +
  deploys).

STOP.
