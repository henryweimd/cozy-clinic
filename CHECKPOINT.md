# CHECKPOINT.md — P1 AI room shell (integrator)

- Phase: P1 integration only. One phase per run. No phase-02 /
  Milestone 2 work. No new patients, conditions, features, poses,
  fonts, or fx (P2-P5 explicitly out).
- Files changed (integrator): `src/scenes/ClinicScene.ts`
  (preload `room-shell` from `assets/room/room-shell-01.png`;
  drawRoom draws it centered 540x960 at (270,480); deleted
  `drawWallsAndFloor`/`drawWindow`/`drawCabinet` code passes,
  ~174 lines; header comment fixed — no more "finished art"
  claim, records P1 bg + layout contract; exam bed / plant /
  rug / title / Mochi / bubble code untouched), `PROGRESS.md`
  (P1 integrator outcome block), `CHECKPOINT.md` (this file).
  No `art/*` files touched (bg-artist ownership).
- Test result: `npm test` 29/29 pass;
  `npm run build` green (tsc + vite; room-shell-01.png bundled
  to `dist/assets/room/`). Zero regressions — no fixes needed.
- Art spend: integrator $0.00 (no generations). P1 total $0.01
  (bg artist's one room-shell generation). Ledger ~$0.0644
  cumulative. Next $20 gate far off; at >= $120, STOP.
- Behavior preserved (verified in code, not screenshots):
  Mochi 212px at (270,614) + nametag y748; code rug ellipse
  kept (P2 scope; soft overlap with painted rug accepted —
  code rug is Mochi's standing pad, painted rug is room rug);
  bubble 492 wide docked at 936 sizing upward; tap-to-complaint
  + one-bounce happy; randomized 3–5 s blink + idle bob.
- Playtest note: NO headless screenshot possible in sandbox
  (Chromium Abort/Mach denial per prior audit). In-game render
  check + operator phone playtest (540x960, room reads
  plush/coherent with Mochi) still REQUIRED on the deployed
  URL after the parent merges/deploys. No commit/push by the
  integrator (merges go through the main agent only).
- STOP.
