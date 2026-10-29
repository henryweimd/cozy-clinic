# CHECKPOINT.md — art-direction reboot (integrator)

- Phase: reboot integration. One phase per run. No Milestone 2
  work. No new features, patients, conditions, art, or
  clinical-copy change. Art was REAL (bg 1080x1920 + 3 poses
  192x192 verified on disk), so scene edits proceeded.
- Files changed (integrator): `src/scenes/ClinicScene.ts`
  (reboot preload swap, drawProps deletion, overlay re-tune,
  ANIMATION.md comment citations, reboot header + landmark
  survey — see below); `PROGRESS.md` (ownership declared
  BEFORE editing, then this outcome block); `CHECKPOINT.md`
  (this file). `src/main.ts` / `index.html` untouched (not
  needed — font gate + markup unaffected). No `art/*` or
  `public/assets/*` edits. No commit/push (main agent merges).
- Integration shipped: preloads point at
  `assets/room/clinic-shell-reboot-01.png` +
  `assets/characters/mochi-reboot-<idle,blink,happy>.png`
  (texture keys unchanged); `drawProps()` + `prop-bed` /
  `prop-plant` preloads DELETED — per-asset call: the photo
  plate paints its own bench/plant/cabinet/rug, so plush props
  would clash AND double up (removed, not re-pointed); window
  light 0.12 -> 0.07 max + vignette 0.10 -> 0.07 vs the photo
  plate; motion verified == ANIMATION.md exact spec (bob
  3px@1.8rad/s; blink 120ms/3-5s; bounce 110ms +-0.06 + 80ms
  +-0.03 Sine, token-guarded) — code already matched.
  Re-measured landmarks (540x960): baseboard ~696, rug top
  ~712, bench x0-160 (+accepted leg sliver x189-197), plant
  x415+, cabinet x465+, window glass x490+ y95-199, title +
  bubble zones clear; GROUND=724 kept (feet 720 on rug).
  Old plush constants retired (in code comments).
- Behavior preserved (verified in code + diff): Mochi
  212px@(270,614), bubble w492/dockBottom936 sizing-upward,
  all clinical copy, Baloo 2, tap-toggle, blink/bob/bounce
  timings identical.
- Test result: `npm test` 29/29 pass; `npm run build` green
  (tsc + vite; reboot bg + 3 poses bundled into `dist/`;
  only the known benign public/font-URL warning). Zero
  reboot regressions — no fixes needed.
- Art spend: integrator $0.00 (no generations). Ledger stays
  ~$0.1644 cumulative. Next $20 gate far off; at >= $120, STOP.
- Playtest result: NOT DONE by integrator — headless
  screenshot impossible in sandbox per prior audit. Needs
  deploy + operator phone playtest at the deployment URL:
  confirm Jolly Mochi reads cute on the photo plate, rug
  grounding holds, overlays add warmth with no haze, happy /
  blink clean, bubble clears nametag/Mochi/edges.
- Deployment URL: none from this run (main agent merges +
  deploys).

STOP.
