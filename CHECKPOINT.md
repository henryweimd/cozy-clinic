# CHECKPOINT.md — Art & feel chunk (phase-01 follow-up)

- Phase: art/feel fix only. No phase-02 / Milestone 2 work started.
- Spend: ledger cumulative before this chunk $0.0304 (one phase-01
  watchdog entry); image spend this chunk $0.00 (no image generation —
  room is finished code-drawn art, Mochi sprite reused). Next $20 gate
  is far off. At >= $120, STOP — not reached.
- Files: `src/scenes/ClinicScene.ts` (room redraw + bubble layout),
  `src/clinical/conditions.ts` (Maple line fixed),
  `src/clinical/engine.test.ts` (patient-name guard test),
  `ART_BIBLE.md` (Vision section), `PROGRESS.md` (chunk record).
  Commit `271da24`, pushed to `main`.
- Tests: `npm test` 29/29 pass (28 existing + 1 new copy guard);
  `npm run build` green.
- Deployment URL: https://cozy-clinic.vercel.app/ (auto-deployed from
  the `main` push). Verified live: served bundle contains the new
  room code and the fixed line, zero "Maple".
- Playtest (deployed URL, phone viewport 540×960, real tap): room
  reads as a coherent furnished clinic — plank floor, baseboard,
  finished window/cabinet/plant, exam bed, stool, rug; Mochi fully
  grounded, body clear of the wall line; tap opens the complaint
  bubble with the correct patient text; zero console errors.
- Improvement loop on the deployed path: one defect found and fixed
  before pushing — bubble hint text overlapped the complaint; bubble
  now sizes itself to its text. Re-tested locally and on production.
- Remaining feel risks for the operator's gate: (1) room art is
  code-drawn vector-plush, not AI-generated — cohesive with Mochi
  but simpler in texture; (2) no phone-in-hand test by the builder
  (headless screenshots only); (3) wallpaper dots may read busy on a
  small physical screen — operator to judge.
- STOP. Feel gate stays open until the operator confirms
  cute/friendly/inviting/professional. Do not start phase-02.
