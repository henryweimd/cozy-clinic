# CHECKPOINT.md — backdrop plate integration (plate-integrator-01)

- Phase: plate integration, sequential after backdrop art. Wire
  the 8-plate library (ART_BIBLE.md appendix registry) into the
  clinic scene per the wiring rule. Bg-only change.
- Files: `src/scenes/ClinicScene.ts` (PLATE_FILE 8-slug
  registry, PLATE_SETTING view->setting, one-line PLATE_PIN
  override, plateForView parity rule, preload loop with keys
  `plate-<slug>`, roomBg + plateKey with exam-a fallback,
  swapPlate 150/180 fades called from showView),
  `PROGRESS.md` (ownership + result). No mockData change (variant
  derives from existing PROTOTYPE_SEEDS.visitNo). Mabel
  geometry/motion/expressions, all chrome, dev view, panel,
  offline intact. Zero new display copy.
- Tests: `npm test` 29/29 pass (incl. patient-name guard);
  `npm run build` green (known benign font-URL + chunk-size
  warnings only). Zero new strings, so Baloo-glyph and
  patient-name checks pass vacuously. No plate regressions.
- Spend: image spend $0.00 (code only, 0 generations).
  Ledger stays ~$0.3144 — far under the operator's $20 cap;
  at >= $120, STOP (not reached).
- Deployment URL: none from this run (main agent merges +
  deploys).
- Playtest: NOT playtested in-game (no browser in sandbox).
  Operator: open the deployed URL at phone size — opener Visit
  should look pixel-identical (exam-a); Waiting/Telemed/Portal
  tabs should each show their own cozy plate with a soft bg
  crossfade; set visitNo 5 (or a PLATE_PIN entry) to see the B
  variants.

STOP.
