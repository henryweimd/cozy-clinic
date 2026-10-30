# CHECKPOINT — Visit endings + floor shadows (2026-10-29)

Phase A (commit `1f92cca`): visits end at ladder tips with a
plain-speaking result card (recovered -> Next/Learn, struggling
-> pulsing Learn/Try again, clock frozen); grade stamps + toasts
make right/wrong read three ways; Learn tab joins the bar with
the full-screen Learning List behind it (strip book removed);
struggling lights a pulsing amber badge until Learn is visited.
Phase B (commit `16db2ac`): baked floor blobs keyed out of all
18 sprites (June disc, Milo slab, Mabel sliver; feet 100%
preserved, magenta-verified); Block C root cause fixed (it
ordered the shadow); validation gate + contact sheets filed.
Files: `src/game/visit.ts` (+tests), scene, learnList,
18 PNGs, ART_BIBLE, CHARACTER_BIBLE, UI_PROTOTYPE, 3 sheets.
Test result: auditor 0 findings; `npm test` 63/63; tsc clean
(one real catch: PLATE_SETTING needed the learn view); build
green.
Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200).
Playtest result: NOT playtested (headless browsers SIGABRT in
sandbox; operator playtesting live — endings, stamps, Learn
tab, clean feet await your notes).
Image spend this run: $0.00 (code + pixel surgery only).
Untouched: `src/data/maneuvers.*` + 7 illustrations + PROGRESS.md
maneuver entries remain uncommitted for the paused-phase resume.

STOP.
