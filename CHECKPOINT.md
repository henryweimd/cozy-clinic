# CHECKPOINT.md — P2 prop sprites (integrator)

- Phase: P2 integration only. One phase per run. No phase-02 /
  Milestone 2 work. No new patients, conditions, features, poses,
  fonts, or fx (P3-P5 explicitly out).
- Files changed (integrator): `src/scenes/ClinicScene.ts`
  (preload `prop-bed` from `assets/props/exam-bed.png` +
  `prop-plant` from `assets/props/plant.png`; new `drawProps()`
  feet-anchors both to GROUND=724 via origin (0.5,1) — bed 160
  wide at cx88, plant 110 wide at cx461; deleted
  `drawExamBed`/`drawPlant`/`drawRug` code passes, ~107 lines,
  plus the now-unused `INK` constant; header comment fixed —
  records P2 sprites + no-double-rug note; title / Mochi /
  bubble code untouched), `PROGRESS.md` (P2 integrator outcome
  block), `CHECKPOINT.md` (this file). No `art/*` or
  `public/assets/*` files touched (prop-artist ownership).
- Test result: `npm test` 29/29 pass;
  `npm run build` green (tsc + vite; exam-bed.png + plant.png
  bundled to `dist/assets/props/`). One P2 regression fixed:
  `INK` unused after the pass deletions broke tsc — removed
  the constant (same hex survives as literals in Mochi shadow
  + bubble stroke, behavior unchanged).
- Art spend: integrator $0.00 (no generations). P2 total $0.05
  (prop artist's 2 gen + 2 fix edits + 1 probe). Ledger
  ~$0.1144 cumulative. Next $20 gate far off; at >= $120, STOP.
- Behavior preserved (verified in code, not screenshots):
  Mochi shadow ellipse + Mochi 212px at (270,614) + nametag
  y748; bubble 492 wide docked at 936 sizing upward;
  tap-to-complaint + one-bounce happy; randomized 3–5 s blink
  + idle bob. Code rug deleted — painted bg rug is now the
  only rug (no double rug).
- Playtest note: NO headless screenshot possible in sandbox
  (Chromium Abort/Mach denial per prior audit). In-game render
  check + operator phone playtest (540x960) still REQUIRED on
  the deployed URL after the parent merges/deploys: confirm
  bed scale vs Mochi (160w chosen; artist suggested up to
  ~170w), bed-vs-bg-cabinet overlap lower-left, plant corner
  fit. No commit/push by the integrator (merges go through the
  main agent only).
- STOP.
