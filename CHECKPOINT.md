# CHECKPOINT.md — H2 backend simulation + P-polish audit

- Phase: H2 (patients + pre-computed trajectories, Supabase
  primary, local fallback) + P-polish (programmatic layout audit;
  browsers impossible — evidence in PROGRESS.md).
- Files changed: `supabase/functions/seed-patients/index.ts`,
  `supabase/functions/extend-trajectory/index.ts` (both deployed),
  `supabase/seed/audit-h2.md`, `src/data/fallbackPack.ts` +
  `fallbackPack.test.ts` (new), `docs/AI_PROXY.md` (live contract),
  `.gitignore` (+supabase/.temp/), `PROGRESS.md`, `CHECKPOINT.md`.
  DB: migration `h2_patient_simulation_schema` (6 tables, RLS).
- Test result: `npm test` 34/34; `npm run build` green (benign
  chunk warning). Seed: 12/12 patients, 204 nodes, vetoes 0/204.
- Deployment URL: `https://cozy-clinic.vercel.app/` (game
  unchanged this phase — backend + data only; live-poll below).
- Playtest result: NOT playtested (no browser in sandbox) —
  operator phone playtest pending; nothing player-visible
  changed except the shipped fallback data.
- Spend: image $0.00; Meta seed calls a few cents. Ledger ~$0.3144.
- Next: GROUP 1 (WS-A art, WS-D content, WS-E systems) or GROUP 3
  frontend modules, then GROUP 4 integration (game reads live).

STOP.
