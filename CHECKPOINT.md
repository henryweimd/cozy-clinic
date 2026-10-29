# CHECKPOINT.md — UI polish + asthma opener (ui-polish-01)

- Phase: operator-ordered polish BEFORE backend work. One spacing
  system (M_EDGE 24 / M_NEST 16 / G_MD 12 / G_SM 8 / radii
  24-16-12-pill / Baloo slack) applied to ALL chrome; all 14
  audit-ranked overlaps fixed; featured case swapped
  dehydration→asthma (copy + seeds only, engine untouched).
- Files: `src/scenes/ClinicScene.ts` (A1–A14 geometry: inset
  waiting/portal rows, nametag/chips restack, pad restack, nav
  pill h60, portal h92 rows, telemed frame, monitor wrap/×,
  Nora pill, panel insets, 15px card labels; chips lead with
  live breath; Mabel/bg/GROUND/bubble geometry/texture keys
  untouched), `src/ui/mockData.ts` (conditionId asthma, asthma
  card row, portal threads re-flavored), `src/clinical/
  conditions.ts` COPY ONLY (one label line shortened),
  `docs/UI_PROTOTYPE.md` (spacing-system paragraph + asthma
  seed/profile/card/monitor blocks + corrected geometry),
  `PROGRESS.md`.
- Live wiring: cards/chips/monitor/complaint all resolve live
  from the engine — stage 2 wheezy, BEST/BEST/DANGEROUS row,
  veto blocks with Nora line, rescue-puffer heals 2→1.
- Tests: `npm test` 29/29 pass (incl. patient-name guard);
  `npm run build` green (known benign font-URL + chunk-size
  warnings only). Live probe verified grades/stage/vitals/
  veto/monitor strings. Zero polish regressions.
- Spend: image spend $0.00 (code + copy only, 0 generations).
  Ledger stays ~$0.1944 — far under the operator's $20 cap;
  at >= $120, STOP (not reached).
- Deployment URL: none from this run (main agent merges +
  deploys).
- Playtest: NOT playtested in-game (no browser in sandbox).
  Operator: open the deployed URL at phone size — confirm
  insets/gaps read clean, no Baloo overflow in pills/cards/
  threads, and the asthma opener feels clinical-but-cozy.

STOP.
