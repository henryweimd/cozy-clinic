# CHECKPOINT.md — chrome-2 UI iteration (chrome-2-builder-01)

- Phase: operator-ordered iteration on the shipped UI prototype.
  All five items in one run: translucent chrome, solid panel
  tail, quoted speech, progress HUD, taste guardrails. Code +
  copy only.
- Files: `src/ui/mockData.ts` (ChromeTier + labels,
  VISIT_CONTEXT_WORDING 3×3, MOCK_CARE_COINS_START,
  MOCK_PROFILE_LABEL, quoteIfSpoken — all documented mock),
  `src/scenes/ClinicScene.ts` (slim translucent top bar y0–32:
  profile chip + difficulty word/dots, middle empty,
  display-only; nav bar quieted to cream 0.8 + 2px divider;
  solid-outline panel tail; renderPanel + portal bubbles quote
  MABEL/DR. NORA, YOU/me/Clinic/snippets bare; Visit-only HUD
  y376–412: coins +1/BEST, tier-worded context label,
  display-only mm:ss timer; radii 8/12/14/18, palette accents
  only), `docs/UI_PROTOTYPE.md` (top-bar/HUD geometry, tail +
  quote law, card coin tick, chrome-2 mock shapes),
  `PROGRESS.md` (ownership + result). Mabel, panel fades,
  admin stack, offline intact.
- Tests: `npm test` 29/29 pass (incl. patient-name guard);
  `npm run build` green (known benign font-URL + chunk-size
  warnings only). fontTools Baloo-2 cmap audit over every new
  string: zero missing glyphs, zero patient names. No
  chrome-2 regressions.
- Spend: image spend $0.00 (code only, 0 generations).
  Ledger stays ~$0.2344 — far under the operator's $20 cap;
  at >= $120, STOP (not reached).
- Deployment URL: none from this run (main agent merges +
  deploys).
- Playtest: NOT playtested in-game (no browser in sandbox).
  Operator: open the deployed URL at phone size — top bar +
  toolbar should read quiet over the photo plate, tail solid
  outline-color, Mabel/Nora lines quoted, coins tick on BEST
  only, timer count up, context read "Feeling poorly".

STOP.
