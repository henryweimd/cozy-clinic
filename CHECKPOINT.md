# CHECKPOINT.md — UI prototype build (ui-builder-01)

- Phase: operator-ordered UI prototype BEFORE backend work.
  Implements `docs/UI_PROTOTYPE.md` exactly: container overlays
  on the one clinic scene (depths room 0 < Mabel 5 < views
  10/11 < nav 20 < pad 30 < monitor 31 < toast 40).
- Files: `src/scenes/ClinicScene.ts` (panel, card row, chips,
  4 views, nav, admin stack, toast; Mabel geometry/motion/copy
  identical, old bottom bubble retired per spec),
  `src/ui/mockData.ts` (NEW — MOCK roster/threads/seeds,
  Supabase-row-shaped), `docs/UI_PROTOTYPE.md` (one owned
  correction: pad grid A–L → A–M minus J, the spec's grid had
  no M so MABEL was untypable), `PROGRESS.md`.
- Live wiring: cards resolve via the real engine
  (`gradeAction`/`applyAction`); monitor + chips read live
  state (stage/vitals/node/memory update on every tap).
  Mock seeds (visit #4, wording, difficulty, roster, inbox)
  single-sourced in `mockData.ts`, never hard-coded twice.
- Tests: `npm test` 29/29 pass; `npm run build` green
  (known benign font-URL + chunk-size warnings only).
- Spend: image spend $0.00 (code-drawn UI, 0 generations).
  Ledger stays ~$0.1944 — far under the operator's $20 cap;
  at >= $120, STOP (not reached).
- Deployment URL: none from this run (main agent merges +
  deploys).
- Playtest: NOT playtested in-game (no browser in sandbox;
  logic probe via vite-node verified live grades/stage/
  vitals/block/monitor strings). Operator: open the deployed
  URL at phone size and answer the 8 spec questions in
  `docs/UI_PROTOTYPE.md` — especially Q5 (Telemed pill
  overlap) and glyph coverage (◷✚◉✉♥✿☀›✕‹→).

STOP.
