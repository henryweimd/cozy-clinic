# CHECKPOINT.md — Mabel expression integration (expression-integrator-01)

- Phase: expression state machine goes LIVE in the scene. Prior
  runs shipped the normative design (`docs/ANIMATION.md` +
  `docs/CHARACTER_BIBLE.md` expression sections) and the 3
  validated exports (`mochi-reboot-{sick,pained,relieved}.png`
  + contact sheet + manifest). This run wires exactly that
  design over existing clinical state — no engine edits.
- Files: `src/scenes/ClinicScene.ts` (preload 3 faces;
  steadyFace() stage map 0 relieved / 1 idle / 2 sick /
  3 pained + any-vital<=2 one-step-worse shift; Mabel opens on
  steady; cue-driven resolve flashes: happy->happy+bounce,
  recovery->relieved+bounce, sick->pained 600ms still hold,
  worried/idle/blocked->hold steady; shared standard bounce
  with monotonic flashToken guard + settle to steady map;
  blink fires only over idle steady with no flash, else
  reschedules; tap-hello happy+bounce unchanged; geometry,
  shadow, nametag, panel, nav, monitor, offline intact; zero
  new display copy), `PROGRESS.md` (ownership + result).
  `src/ui/mockData.ts` untouched — no seed change needed.
- Tests: `npm test` 29/29 pass (incl. patient-name guard);
  `npm run build` green (known benign font-URL + chunk-size
  warnings only). No expression regressions.
- Spend: image spend $0.00 (code only, 0 generations).
  Ledger stays ~$0.2344 — far under the operator's $20 cap;
  at >= $120, STOP (not reached).
- Deployment URL: none from this run (main agent merges +
  deploys).
- Playtest: NOT playtested in-game (no browser in sandbox).
  Operator: open the deployed URL at phone size — Mabel should
  open sick, flash relieved+bounce on rescue-puffer (2->1),
  flash pained-still on dusty-blanket (2->3), bounce happy on
  full recovery, and hold steady on the DANGEROUS veto.

STOP.
