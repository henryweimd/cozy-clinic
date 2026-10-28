# CHECKPOINT.md — Layout & composition pass (fix-layout-01)

- Phase: layout/composition fix only. No phase-02 / Milestone 2
  work started. No new patients, conditions, features, or art
  assets (one dado trim line as recomposition glue, same palette).
- Spend: ledger cumulative before this chunk $0.0544
  ($0.0304 phase-01 + $0.024 fix-art-01); image spend this chunk
  $0.00 (no generations). Next $20 gate is far off.
  At >= $120, STOP — not reached.
- Files: `src/scenes/ClinicScene.ts` (recomposition: window +16x/+14y
  onto SIDE=24 margin and WALL_BASE=352 sill line; cabinet +24x;
  dado trim line at y352; dots row dropped below trim; stool
  removed; plant -18x into solo corner anchor; Mochi 240->212
  recentered (270,614); rug 340x80; nametag to rug center y748;
  bubble width 492 bottom-docked at 936, still sizes to text),
  `PROGRESS.md` (step-1 audit, fix plan, outcome).
  Commit `d004960`, pushed to `main`.
- Tests: `npm test` 29/29 pass; `npm run build` green.
- Deployment URL: https://cozy-clinic.vercel.app/ (auto-deployed
  from the `main` push; live screenshots confirm the new layout:
  stool gone, shifted furniture, trim line, docked bubble).
- Playtest (deployed URL, phone viewport 540x960, idle + tap):
  Mochi unmistakably focal with walking space both sides; window
  and cabinet share margins and the sill baseline; no overflows,
  no clusters, no overlaps; tap opens the complaint bubble with
  correct text, framed with 24px margins; zero console errors.
- Before/after spacing fixes: (1) window finial clip + 8/48 margin
  asymmetry -> 24/24; (2) sill/cabinet baselines 338/350 ->
  shared dado line; (3) dead band A -> wainscot reveal;
  (4) Mochi 0/6px sprite gaps -> ~14/~78 (visual ~34+);
  (5) stool-plant cluster -> stool removed, open lane;
  (6) plant canopy overflow x544 -> inside screen;
  (7) bubble bleed to bottom edge -> docked 24px margins;
  (8) Mochi 240 vs bed 196 crib-read -> 212, mattress at hip
  height. Door considered and rejected (recorded in PROGRESS.md).
- Improvement loop on the deployed path: played the tap path,
  zero errors, no new defect found — no redeploy needed.
- Remaining feel risks for the operator's gate: (1) floor
  foreground intentionally empty as walking space — operator
  judges deliberate vs. empty; (2) bed still compact but at
  believable scale; (3) builder verification is headless
  screenshots only, no phone-in-hand test.
- STOP. Feel gate stays open until the operator confirms
  professional mobile framing on a real phone. Do not start
  phase-02.
