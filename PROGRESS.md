# PROGRESS.md — Little Lives: Cozy Clinic

## Done (Phase 01, this chunk)

- Repo hygiene: `AGENTS.md` present, `.gitignore` expanded, `.env.example`
  placeholders only, `git check-ignore` confirms `.env` ignored.
- Vite + TypeScript + Phaser scaffold, 540×960 FIT portrait, `index.html`.
- Clinical engine (`src/clinical/`): 4 conditions, grading, trajectory-ready
  node/edge shapes, engine veto; 28 vitest tests pass; `npm run build` green.
- `docs/PROGRESSION.md` schema sketch; `docs/AI_PROXY.md` Edge Function
  contract (recorded only, not implemented).
- `ART_BIBLE.md` with verbatim style block, exact hex palette, budgets.
- Mochi idle + blink sprites: Muse Image MCP (style block verbatim),
  programmatic key-out + verification (bboxes identical, opaque ratios
  within 0.007), contact sheet, masters in studio `art/source/mochi/`,
  exports in `public/assets/characters/`. SAM 3.1 was unavailable (no SAM
  tool in session) — fallback recorded in `art/manifest.json`.
- Clinic scene: warm room (code-drawn TEMPORARY geometry, marked), Mochi
  sprite with idle bob + randomized blink, tap-to-see-complaint + happy
  bounce. Headless playtest: 60.3 FPS, zero console errors.
- Improvement loop: bubble-cutoff/shadow-gap/favicon-404 fixed, re-tested.

## Not done

- Production deploy + URL playtest (no Vercel linkage/CLI in this session;
  operator deploys: import repo on Vercel, Vite preset, push `main`).
- Operator MVP feel-gate playtest (their step after deploy).
- Everything out of scope: encounter UI beyond tap, Supabase, Edge
  Function implementation, audio, more characters.

## Next (superseded — layout chunk below is the active work)

Operator: open production URL at phone size, confirm the scene feels
cute/friendly/inviting/professional (feel gate), then launch Phase 02.

## Active chunk: layout & composition pass (fix-layout-01)

- File ownership this chunk: single agent. Only files touched:
  `src/scenes/ClinicScene.ts`, `PROGRESS.md`, `CHECKPOINT.md`.
- Spend: ledger cumulative before this chunk $0.0544
  ($0.0304 phase-01 + $0.024 fix-art-01). Next $20 gate is far off.
  At >= $120, STOP — not reached. Image spend this chunk $0.00
  (recomposition only, no generations).
- No phase-02 work. No new patients, conditions, features, or art
  assets beyond recomposition glue.

### Step-1 spacing/composition audit (LIVE deploy, 540x960, before edits)

Screenshots: live `https://cozy-clinic.vercel.app/` at 540x960,
idle + tapped states, zero console errors. Element-by-element
(screen x/y in px, screen is 540 wide / 960 tall):

- Title "Cozy Clinic" (y56, 44px) + subtitle (y100, 22px): top-edge
  anchored, centered. HELP the composition. No change.
- Window (wall, x8-212 incl. rod finial, y118-338): rod finial
  circle at x8 r9 OVERFLOWS the left screen edge by ~1px. Left
  margin 8 vs cabinet right margin 48 — ASYMMETRIC margins. Hurts.
- Cabinet (wall, x368-492, y186-350): right margin 48, floats with
  no shared baseline (bottom 350 vs window sill bottom 338, 12px
  off) and no shared top (186 vs rod 118). Hurts.
- Dead band A (wall strip y~350-440, full width): ~90px of bare
  dots between furniture bottoms and baseboard. No purpose. Hurts.
- Baseboard (y440-466): fine, keep.
- Bed (floor left, x12-150, y520-716): left margin 12. Reads
  doll-sized next to 240px Mochi (bed height 196 < Mochi 240;
  mattress top y576 sits at Mochi's chest but the 138px width
  reads like a crib). Hurts scale. Position helps (left anchor).
- Mochi (center x270, sprite 240px => x150-390, y480-720):
  largest weight, clearly focal. HELPS. But sprite box touches
  bed's right edge (150) with 0px gap and nearly touches stool
  (6px) — ears have ~20px transparent pad so visual gap is
  ~20-30px, still tight. Hurts (crowded focal point).
- Stool (floor, x396-456, y636-730): 6px gap to Mochi sprite,
  6-12px gap to plant pot. Forms a CLUSTER with the plant; blocks
  the right walking lane. Hurts. Verdict: REMOVE (art bible:
  "if a scene feels busy, remove something"; chunk brief permits
  removing what crowds). No gameplay depends on it.
- Plant (floor right, pot x468-530, leaves to x544, y572-720):
  right leaf edge x544 OVERFLOWS the screen by ~4px. Pot right
  margin 10. Clustered with stool. Hurts (overflow + cluster).
- Rug (x90-450, y706-790): centered under Mochi. HELPS. Slightly
  wide on the right once the stool is gone; shrink to 340 wide.
- Nametag (y766, on rug): readable, HELPS. Keep on rug.
- Bubble (open state: top y798, width 460, extends to ~960):
  text fits (no regression of the bubble-text fix) and content
  HELPS, but the box BLEEDS to the bottom screen edge (0px
  bottom margin) and spans margins 40/40. Hurts framing.
- Dead band B (floor foreground y~800-960 when bubble closed):
  bare planks. Reframed as deliberate WALKING SPACE (genre bar:
  "walking space stays clear") — kept empty on purpose, not a
  defect once band A is fixed and edges are anchored.
- Floor plank joints: fine, keep.
- Misalignments: (1) wall left/right margins 8 vs 48;
  (2) sill/cabinet bottoms 338 vs 350; (3) bubble side margins
  40 vs room margins; (4) bubble bottom margin 0.

### Fix plan (one spacing system, applied to every element)

- SIDE = 24 outer margins; GUT = ~24 min sprite-box gap around
  Mochi; WALL_BASE = 352 shared sill baseline; GROUND = 724 kept.
- Window: shift +16x (margins 24/24-class; finial no longer
  clipped) and +14y (sill bottom lands on 352).
- Cabinet: shift +24x (right margin 24). Bottom 350 ~ baseline
  (2px, accepted). Tops intentionally differ (different pieces).
- Dado trim line at y352 full wall width (one 4px INK line, drawn
  in walls pass): converts dead band A into an intentional
  wainscot reveal; sill and cabinet sit on it. Recomposition
  glue, not new furniture.
- Wallpaper dots: drop the y382 row so the reveal strip stays
  clean cream.
- Bed: keep position (left floor anchor, margin 12 tolerance for
  grounded corner furniture). Gains relative scale from Mochi
  shrink (below).
- Mochi: 240 -> 212 display size, recentered (270, 614) so feet
  stay on GROUND. Still the largest visual weight; grows gaps:
  ~14px sprite (~34 visual) to bed, ~78 to plant pot. Mattress
  top now reads at hip height — believable scale.
- Stool: REMOVED (see audit). Right lane becomes walking space.
- Plant: shift -14x (pot 454-516, right margin 24; leaves no
  longer overflow). Solo corner anchor with 78px walking gap.
- Rug: 360x84 -> 340x80, stroke 320x60 -> 300x56. Nametag stays
  on rug (y752 after rug recenter check).
- Bubble: width 460 -> 492 (side margins 24, matches SIDE);
  bottom-docked at 936 (bottom margin 24): top = 936 - height,
  so any text length stays framed. Sizes to text (no regression).
- Door considered and REJECTED: center-wall gap becomes breathing
  room above the focal point once band A is a designed reveal;
  a door at x~250-370 would sit 20-40px off Mochi's axis and add
  noise behind the focal point. Not required by acceptance.

### Outcome (verified on the LIVE deploy, 540x960, idle + tapped)

- Every audit defect resolved: window/cabinet margins 24/24, no
  edge overflow (finial + canopy inside screen), sill and cabinet
  sit on the shared dado line, dead band A reads as a wainscot
  reveal, stool cluster gone (right lane is open walking space),
  Mochi focal with clear gaps both sides, bubble docked with
  24px margins on three sides and sized to its text (wording
  unchanged — no clinical-copy change).
- Round-1 local screenshots + round-2 live-deploy screenshots both
  confirm; zero console errors in all four captures. Tap opens the
  complaint bubble with correct text; no overlap with Mochi,
  nametag, rug, or edges.
- Improvement-loop pass on the deployed URL: played (tap path),
  no new defect found, no redeploy needed.
- `npm test` 29/29 pass; `npm run build` green. Commit `d004960`,
  pushed to `main` (Vercel auto-deploy verified live).
- Remaining feel risks for the operator: (1) floor foreground is
  intentionally empty walking space — operator judges whether it
  reads deliberate or empty; (2) bed still compact vs Mochi but
  now at believable hip-height scale; (3) no phone-in-hand test by
  the builder (headless screenshots only).

## Done (art & feel chunk)

- File ownership this chunk: single agent, all files above.
- Room redraw (`src/scenes/ClinicScene.ts`): perspectival room —
  wallpaper-dot wall, baseboard, plank floor; finished window
  (panes, sill, curtains, clouds + sun), cabinet (open shelf with
  bottles, double doors, handles; pink band fixed inside frame),
  plant grounded on floor (stems, leaves, soil, shadow); new exam
  bed, doctor's stool, rug. Mochi stands fully on the floor
  (feet/shadow on rug, body clear of wall line). Palette unchanged.
- Dialogue fix: `dehydration.plainWords` no longer names Maple;
  new `engine.test.ts` guard fails on any patient name in shipped
  clinical copy. No other shipped line named a patient (grep audit).
- Vision section recorded in `ART_BIBLE.md` for all later phases.
- Tests: `npm test` 29/29 pass; `npm run build` green.
- Playtest (local prod build, phone viewport, real tap): room reads
  cozy and unified, bubble opens with correct text, zero console
  errors. One loop fix applied: bubble hint no longer overlaps the
  complaint (bubble now sizes to its text).

## Active chunk: P1 AI room shell (bg artist workstream)

- P1 OWNERSHIP (declared BEFORE generating, per AGENTS.md workflow
  law): the P1 bg-artist agent owns `art/source/room/*`,
  `public/assets/room/*`, `art/contact-sheets/room-*`, and
  `art/manifest.json` room-bg additions ONLY. Nobody else writes
  those paths this run. The P1 bg artist makes NO scene-code edits
  (`src/scenes/ClinicScene.ts` belongs to the integrator).
- Scope: generate ONE 540x960 (or 2x 1080x1920) cozy clinic
  room-shell background, validate it, write master + export +
  contact sheet, update manifest with prompt hash + spend.
- Layout contract preserved for the integrator: SIDE=24,
  WALL_BASE=352, GROUND=724, Mochi 212px at (270,614), bubble
  492 wide docked at 936 (see fix-layout-01 spacing system above).
- P1 RESULT (bg artist): generated ONE room shell, 1 image x $0.01
  = $0.01 spend this workstream (ledger was $0.0544 before P1).
  Master `art/source/room/room-shell-01-master.png` (1152x2048),
  export `public/assets/room/room-shell-01.png` (1080x1920 2x),
  contact sheet `art/contact-sheets/room-shell-contact-sheet.png`
  (plain + Mochi-composite panels), manifest `backgrounds[0]`
  entry with prompt hash + validation + fallback note.
  Validation: exact 9:16, no characters/text, plush match to
  Mochi, Mochi footprint clear, feet at painted floor edge.
  Integrator notes: (1) code rug ellipse y708-788 overlaps the
  painted rug (y735-897) — hide the code rug or accept a double
  rug until P2; (2) window is right / cabinet is left in the bg
  (mirrored vs code passes, which are deleted anyway);
  (3) in-game render check still needs the integrator's deploy +
  operator phone playtest; (4) bg style-block variant for
  ART_BIBLE.md still owned by the spec author (roadmap D3).

## Active chunk: P1 AI room shell (integrator workstream)

- P1 OWNERSHIP (integrator): owns `src/scenes/ClinicScene.ts`,
  `PROGRESS.md`, `CHECKPOINT.md` this run. No `art/*` edits
  (bg artist owns those paths); sequential after art, no
  concurrent writers.
- P1 RESULT (integrator): real background file existed
  (`public/assets/room/room-shell-01.png`, 1080x1920 RGB verified),
  so integrated it as the room shell: preload `room-shell` +
  centered 540x960 image at (270,480) as the first drawRoom draw;
  DELETED the replaced procedural passes `drawWallsAndFloor`
  (wall/dots/baseboard/floor), `drawWindow`, `drawCabinet`
  (~174 lines). Header comment fixed (no longer claims code-drawn
  "finished art"; records P1 bg + P2 furniture plan + layout
  contract). KEPT byte-identical in behavior: Mochi 212px at
  (270,614) + nametag, code rug ellipse (P2 scope; accepted soft
  overlap with the painted rug per artist note — code rug reads
  as Mochi's standing pad, painted rug as the room rug),
  bubble 492 wide docked at 936 sizing upward, tap-to-complaint
  + happy bounce, blink/bob. No clinical-copy change.
- Tests/build: `npm test` 29/29 pass; `npm run build` green
  (room-shell-01.png bundled into `dist/assets/room/`).
- Spend: integrator image spend $0.00 (no generations); P1 total
  stays $0.01 (bg artist's one generation). Ledger ~$0.0644.
  Next $20 gate far off; at >= $120, STOP — not reached.
- Not done by integrator: deploy + operator phone playtest
  (headless screenshot impossible in sandbox per prior audit;
  render check needs the deployed URL on a phone); P2 props,
  P3 poses, P4 font, P5 fx all out of scope. STOP after
  CHECKPOINT.md.

## Active chunk: P2 prop sprites (prop-artist workstream)

- P2 OWNERSHIP (declared BEFORE generating, per AGENTS.md workflow
  law): the P2 prop-artist agent owns `art/source/props/*`,
  `public/assets/props/*`, `art/contact-sheets/props-*`, and
  `art/manifest.json` props additions ONLY. Nobody else writes
  those paths this run. The P2 prop artist makes NO scene-code
  edits (`src/scenes/ClinicScene.ts` belongs to the integrator).
- Scope: exam-bed + potted-plant plush prop sprites (transparent
  PNG, foot-anchored, GROUND=724 aligned), validation + contact
  sheet + manifest props[] entries with FULL PROMPT TEXT.
- Rug verdict (from bg inspection): the painted rug in
  room-shell-01.png (large cream scalloped oval, centered) suffices
  — NO rug prop will be generated (avoids double-rug).
- P2 RESULT (prop artist): 2 sprites shipped, 5 images x $0.01 =
  $0.05 this workstream (2 gen + 2 fix edits + 1 probe after
  tool-arg failures; ledger ~$0.1144, $120 STOP far off).
  Exports `public/assets/props/exam-bed.png` (560x320, empty bed,
  headboard-left) + `plant.png` (418x560, faceless pot);
  masters in studio `art/source/props/` (git-ignored, correct);
  contact sheet `art/contact-sheets/props-contact-sheet.png`
  (checker cutout panels + room composite, feet at GROUND=724);
  manifest `props[]` with FULL PROMPT TEXT + hashes (P1 lesson).
  Fixes applied: bed gen had a sleeper (removed via edit — bed
  must be empty, patients are Mochi/future cast); plant gen had
  a pot face (removed via edit — props stay faceless furniture).
  Validation: border flood-fill keyout, assert bbox/padding(24px)/
  corners, foot-anchor bottom-center, composite alignment pass.
  Integrator notes: (1) bed 140x80 @cx82 reads small next to
  212px Mochi — may playtest up to ~170w, verify Mochi gap;
  (2) bed sits in front of bg cabinet lower-left, confirm on
  device; (3) plant 110x147 @cx461 corner-anchored, right
  margin 24; (4) delete code drawExamBed/drawPlant/drawRug on
  integration (painted rug replaces code rug — no double-rug).

## Active chunk: P2 prop sprites (integrator workstream)

- P2 OWNERSHIP (integrator): owns `src/scenes/ClinicScene.ts`,
  `PROGRESS.md`, `CHECKPOINT.md` this run. No `art/*` or
  `public/assets/*` edits (prop artist owns those paths);
  sequential after art, no concurrent writers.
- P2 RESULT (integrator): real prop files existed
  (`public/assets/props/exam-bed.png` 560x320 RGBA +
  `plant.png` 418x560 RGBA, verified on disk), so integrated
  them: preload `prop-bed` + `prop-plant`; new `drawProps()`
  places both feet-anchored to GROUND=724 via origin (0.5,1) —
  bed 160 wide at cx88 (left floor anchor; middle ground between
  the artist's 140 composite and the ~170 playtest suggestion,
  keeps a clear visual gap to Mochi's 212px box at x164+),
  plant 110 wide at cx461 (right corner anchor, box right
  margin 24). DELETED the replaced procedural passes
  `drawExamBed`/`drawPlant`/`drawRug` (~107 lines) plus the
  now-unused `INK` constant (build fix); code rug gone so no
  double rug with the painted bg rug. Header + drawRoom
  comments updated (P2 sprites + layout note). KEPT
  byte-identical in behavior: Mochi shadow ellipse + Mochi
  212px at (270,614) + nametag, bubble 492 wide docked at 936
  sizing upward, tap-to-complaint + happy bounce, blink/bob.
  No clinical-copy change.
- Tests/build: `npm test` 29/29 pass; `npm run build` green
  (tsc + vite; both props bundled into `dist/assets/props/`).
  One P2 regression fixed: `INK` unused after the pass
  deletions broke tsc — removed the constant (Mochi/bubble
  use the same hex as literals, behavior unchanged).
- Spend: integrator image spend $0.00 (no generations); P2
  total stays $0.05 (prop artist's 2 gen + 2 fix edits +
  1 probe). Ledger ~$0.1144. Next $20 gate far off; at >=
  $120, STOP — not reached.
- Not done by integrator: deploy + operator phone playtest
  (headless screenshot impossible in sandbox per prior audit;
  render check needs the deployed URL on a phone — confirm
  bed scale vs Mochi, bed-vs-bg-cabinet overlap lower-left,
  plant corner fit); P3 poses, P4 font, P5 fx out of scope.
  STOP after CHECKPOINT.md.

## Active chunk: P3 Mochi poses (character-artist workstream)

- P3 OWNERSHIP (declared BEFORE generating, per AGENTS.md workflow
  law): the P3 character-artist agent owns
  `public/assets/characters/mochi-<pose>.png` ADDITIONS ONLY
  (never modifies `mochi-idle.png` / `mochi-blink.png`),
  `art/contact-sheets/mochi-poses-*`, and `art/manifest.json`
  character additions ONLY. Nobody else writes those paths this
  run. The P3 character artist makes NO scene-code edits
  (`src/scenes/ClinicScene.ts` belongs to the integrator).
- Scope: at most TWO key poses via edit_image from mochi-idle.png
  (edits preserve identity): mochi-happy (joyful tap-react) and
  ONLY a second pose if the demo needs it. Transparent bg,
  192x192, same foot anchor/padding class. Style block verbatim
  in every prompt. Ledger was ~$0.1144 after P2; STOP at >=$120.
- P2 LESSON applied: manifest entry carries FULL PROMPT TEXT +
  prompt sha256 + export sha256 (no hash-only entries).
- P3 RESULT (character artist): ONE pose shipped — no second
  pose, the demo only needs the happy tap-react. 1 image x
  $0.01 = $0.01 this workstream (ledger ~$0.1244, $120 STOP
  far off). Export `public/assets/characters/mochi-happy.png`
  (192x192 RGBA, ^ ^ closed eyes, bigger smile, rosier blush);
  master in studio `art/source/mochi/` (git-ignored, correct);
  contact sheet `art/contact-sheets/mochi-poses-happy.png`
  (idle/blink/happy + alpha-checker row); manifest `assets[2]`
  with FULL PROMPT TEXT + hashes + validation + fallback.
  Validation: bbox [20,32,168,184] within 2px of idle on all
  sides, opaque ratio 0.335 vs 0.336, corners transparent,
  pad >= 8px all sides, identity match by eye. Minor noted:
  happy's pouch carries a small white cross emblem (idle
  pouch reads plain) — same pink pouch shape, accepted.
  Integrator notes: (1) preload `mochi-happy` + swap texture
  during the tap bounce, then restore `mochi-idle` on settle;
  (2) same 212px display size + (270,614) center as idle (bbox
  matched, no re-layout); (3) blink timer should not fight
  the happy swap — skip/suspend blink while happy shows;
  (4) in-game render check needs deploy + operator phone
  playtest; (5) `mochi-idle.png` / `mochi-blink.png` untouched
  (byte-identical, never rewritten).

## Active chunk: P3 Mochi poses (integrator workstream)

- P3 OWNERSHIP (integrator): owns `src/scenes/ClinicScene.ts`,
  `PROGRESS.md`, `CHECKPOINT.md` this run. No `art/*` or
  `public/assets/*` edits (character artist owns those paths);
  sequential after art, no concurrent writers.
- P3 RESULT (integrator): real pose file existed
  (`public/assets/characters/mochi-happy.png` 192x192 RGBA,
  bbox (20,32,169,184) within 2px of idle on all sides,
  verified on disk), so integrated it: preload `mochi-happy`;
  tap-react sets the happy texture for the bounce and restores
  `mochi-idle` on the bounce tween's onComplete (token-guarded
  so a stale bounce never clears a newer happy on rapid
  re-taps); blink now swaps idle<->blink ONLY when happy is
  not showing (`showingHappy` flag + texture-key guards both
  ways, so a tap during the 120ms blink window keeps happy and
  a blink never cuts happy short). Header comment records P3.
  KEPT byte-identical in behavior: idle bob, Mochi shadow
  ellipse + Mochi 212px at (270,614) + nametag, bubble 492
  wide docked at 936 sizing upward, tap-to-complaint toggle.
  No clinical-copy change.
- Tests/build: `npm test` 29/29 pass; `npm run build` green
  (tsc + vite; mochi-happy.png bundled into
  `dist/assets/characters/`). Zero P3 regressions — no fixes
  needed.
- Spend: integrator image spend $0.00 (no generations); P3
  total stays $0.01 (character artist's one edit). Ledger
  ~$0.1244. Next $20 gate far off; at >= $120, STOP — not
  reached.
- Not done by integrator: deploy + operator phone playtest
  (headless screenshot impossible in sandbox per prior audit;
  render check needs the deployed URL on a phone — confirm
  happy face reads joyful mid-bounce, no flicker vs blink);
  P4 font, P5 fx out of scope. STOP after CHECKPOINT.md.

## Active chunk: P4 typography (implementer workstream)

- P4 OWNERSHIP (declared BEFORE editing, per AGENTS.md workflow
  law): the P4 typography agent owns `index.html`,
  `src/main.ts` font loading, `src/scenes/ClinicScene.ts` text
  styles, `public/assets/fonts/`, `PROGRESS.md`, `CHECKPOINT.md`
  this run. Nobody else writes those paths this run.
- P4 RESULT (implementer): Baloo 2 (OFL, Ek Type) vendored —
  picked over Nunito/Quicksand for the roundest plush match.
  `public/assets/fonts/Baloo2.ttf` (683200 bytes, variable
  wght 400-800, curl'd from github.com/google/fonts raw;
  sfnt header + `file` verified) + `LICENSE.txt` OFL note
  (the follow-up OFL.txt curl timed out, so the note cites
  the OFL 1.1 by name + source URLs instead of pasting it;
  no @fontsource dependency needed). `index.html` gains a
  `@font-face` (`font-weight: 400 800`, relative
  `assets/fonts/` URL — NO CDN, fully offline). `src/main.ts`
  boots only after `document.fonts.load()` for 500/22px +
  700/44px resolves (3s timeout fallback, game still starts
  on failure — no FOUT swap mid-game). `ClinicScene.ts`: all
  5 Georgia sites (title/subtitle/nametag/bubble label+hint)
  now use one `FONT_FAMILY` const (`"Baloo 2", "Comic Sans
  MS", "Chalkboard SE", system-ui, sans-serif`); title adds
  `fontStyle: bold`; sizes/colors/copy unchanged. Bubble
  restyled as a plush panel: Graphics rounded rect (r24) in
  palette cream `#FFF3E2` + the one thin 3px warm-brown
  `#8A5A3B` outline (was: sharp rect, 4px stroke) — same
  w492/dockBottom936 sizing-upward geometry, same clinical
  copy.
- Tests/build: `npm test` 29/29 pass; `npm run build` green
  (tsc + vite; Baloo2.ttf + LICENSE.txt bundled into
  `dist/assets/fonts/`, @font-face URL verified unchanged in
  `dist/index.html`, fonts.load gate present in the bundle).
  Zero P4 regressions — no fixes needed. (Vite's benign
  "didn't resolve at build time" warning for the public/
  font URL is expected — it stays runtime-relative.)
- Spend: image spend $0.00 (no generations). P4 total $0.00.
  Ledger stays ~$0.1244. Next $20 gate far off; at >= $120,
  STOP — not reached.
- Not done by implementer: deploy + operator phone playtest
  (headless screenshot impossible in sandbox per prior audit;
  render check needs the deployed URL on a phone — confirm
  Baloo 2 renders in all 5 text sites with no FOUT, and the
  rounded bubble still clears the nametag/Mochi/edges with
  the new metrics); P5 fx out of scope. STOP after
  CHECKPOINT.md.

## Active chunk: P5 lighting/feel (implementer workstream)

- P5 OWNERSHIP (declared BEFORE editing, per AGENTS.md workflow
  law): the P5 lighting/feel agent owns `src/scenes/ClinicScene.ts`
  LIGHTING ADDITIONS ONLY (new overlay pass + bounce-tween
  tuning; no layout/behavior/copy changes),
  `public/assets/fonts/OFL.txt` (NEW license glue only),
  `PROGRESS.md`, `CHECKPOINT.md` this run. Nobody else writes
  those paths this run. Freeze-safe POLISH ONLY: no re-layout,
  no new features, no new patients/conditions, no image
  generations (code-only, $0.00 image spend target).
- P5 LIGHTING/FX LIST (declared BEFORE editing):
  (1) Window-light gradient overlay: one full-screen
  `fillGradientStyle` rect in palette cream/butter
  (`#FCEBD6`/`#FFF3E2`), strongest upper-left (bible light
  dir), alpha <= 0.12, drawn AFTER room/props and BEFORE
  title/Mochi/bubble so text and Mochi cannot wash out.
  (2) Warm vignette: four feathered edge strips in outline
  warm-brown `#8A5A3B`, ~0.10 at the screen edge fading to 0
  inward, same below-Mochi/text depth as (1).
  (3) Happy-bounce tuning ONLY if it improves tap feel:
  keep the same squash + token guard, add a tiny scale
  overshoot (bible: squash, rise, tiny overshoot, settle).
  No y-tween (the update() idle bob owns mochi.y).
  Layout constants, sprite positions, bubble geometry, copy,
  and all other behavior stay byte-identical.
- P5 RESULT (implementer): code-only warmth in
  `src/scenes/ClinicScene.ts` — new `drawLightOverlays()`,
  called after drawRoom / before title/Mochi/bubble:
  (1) full-screen window-light gradient (`fillGradientStyle`,
  `#FCEBD6` upper-left 0.12 fading to `#FFF3E2` 0.0
  lower-right); (2) warm vignette, four 56px feathered edge
  strips in `#8A5A3B`, 0.10 at the edge fading to 0 inward.
  Both tint room + props only — title/Mochi/bubble render
  above and cannot wash out. Happy bounce tuned per bible
  (squash, rise, tiny overshoot, settle): the 110ms squash
  yoyo is unchanged, then a chained 80ms scale overshoot
  (+0.03/-0.03) yoyo before idle restore; scale-only (no
  y-tween, the bob owns mochi.y), same token guard both
  steps. Header comment records P5. Diff is +67/-4, the 4
  removed lines being the restore-idle block re-indented
  into the nested onComplete — no layout/copy change.
- P5 LICENSE GLUE: OFL.txt retry FAILED both legs —
  google/fonts raw timed out (curl 28, 25s), opensource.org
  returned an HTML page (196635 bytes, not license text,
  deleted). No `OFL.txt` vendored; `LICENSE.txt` kept as-is
  (still cites OFL 1.1 by name + source URLs).
- Tests/build: `npm test` 29/29 pass; `npm run build` green
  (tsc + vite; only the known benign public/font-URL
  warning). Zero P5 regressions — no fixes needed.
- Spend: image spend $0.00 (no generations). P5 total $0.00.
  Ledger stays ~$0.1244. Next $20 gate far off; at >= $120,
  STOP — not reached.
- Not done by implementer: deploy + operator phone playtest
  (headless screenshot impossible in sandbox per prior audit;
  render check needs the deployed URL on a phone — confirm
  the room reads warmer/cozier with no haze on text or
  Mochi, vignette edges subtle, happy overshoot reads as
  one bounce with no flicker vs blink). No commit/push
  (main agent merges). STOP after CHECKPOINT.md.

## Active chunk: art-direction reboot (direction author workstream)

- DIRECTION-REBOOT OWNERSHIP (declared BEFORE editing, per
  AGENTS.md workflow law): the direction-author agent owns
  `ART_BIBLE.md`, `docs/CHARACTER_BIBLE.md`, `docs/ANIMATION.md`,
  and `PROGRESS.md` direction-reboot additions ONLY. Nobody else
  writes those paths this run. Doc edits only — no images, no
  scene code, no asset files.
- DIRECTION-REBOOT RESULT (direction author, 2026-10-29):
  rewrote the art direction around recon (13 Jolly refs, all
  readable — no blocker). `ART_BIBLE.md`: CHARACTERS = animated
  3D Jolly-style mascots (oatmeal fleece + porcelain face plate,
  1:1 chibi, bead eyes/blush/one-curve smile, NO outline);
  BACKDROP = modern photorealistic minimal clinic (clean, NOT
  plush). TWO fixed style blocks (C = character, B = backdrop)
  for all future prompts, verbatim. Palettes: mascot oatmeal
  family (`#F1E7D4`/`#FBF2E2`/`#1A1512`/`#F6B8C1`/`#3A2E2A`)
  + clinic neutrals (`#F4F1EA`/`#E4CFA8`/`#A9C6A2`/`#A9CCE3`).
  Asset specs: 192px mascot class (foot anchor, 8px pad), 9:16
  plates; layout contract survives (540x960, GROUND=724, Mochi
  212 at (270,614), bubble 492@936, SIDE=24). Validation gate:
  dimensions/alpha/alignment/contact-sheet/in-game-render. Old
  plush-room direction marked SUPERSEDED with date.
  `docs/CHARACTER_BIBLE.md` (NEW): Mochi Jolly redesign brief +
  roster matrix (fur tint / accessory / subtle trait; only Mochi
  ships). `docs/ANIMATION.md` (NEW): idle/blink/happy pose list
  + exact code-motion numbers (bob 3px @ 1.8 rad/s; blink 120ms
  per 3-5s; bounce 110ms squash +-0.06 + 80ms overshoot +-0.03,
  Sine easings, token-guarded tap sequencing) matching the
  shipped ClinicScene.ts. No images, no code — doc edits only,
  $0.00 spend. Follow-ups for later workstreams: P5 warm
  overlays need re-tuning vs photo plates; existing plush
  room-shell/props predate the reboot (replace, don't patch).

## Active chunk: art-direction reboot (reboot asset-artist workstream)

- REBOOT-ASSET OWNERSHIP (declared BEFORE generating, per
  AGENTS.md workflow law): the reboot asset-artist agent owns
  `public/assets/room/clinic-shell-reboot-01.png` (NEW),
  `public/assets/characters/mochi-reboot-<idle,blink,happy>.png`
  (NEW), `art/contact-sheets/*reboot*` (NEW), and
  `art/manifest.json` reboot additions + superseded flags ONLY.
  Nobody else writes those paths this run. The reboot asset
  artist makes NO scene-code edits and NO bible-doc edits, and
  never rewrites existing asset bytes (old plush files stay on
  disk, flagged superseded in the manifest only).
- Scope: ONE photorealistic minimal clinic backdrop (Block B
  verbatim, 9:16, no characters/text) + Mochi Jolly redesign
  idle/blink/happy (Block C verbatim each, ref-guided from the
  Jolly images, identity-consistent edits, 192px class,
  transparent bg). Validate all, write contact sheets +
  manifest entries with FULL PROMPT TEXT + sha256 + spend.
  Ledger was ~$0.1244; STOP at >= $120.
- REBOOT-ASSET RESULT (asset artist, 2026-10-29): 4 images x
  $0.01 = $0.04 this workstream (ledger ~$0.1644, $120 STOP
  far off). Backdrop `public/assets/room/clinic-shell-reboot-01.png`
  (1080x1920 RGB, Block B verbatim; photoreal minimal clinic:
  bench left, plant + cabinet right, window upper-right, woven
  rug center). Mochi redesign `mochi-reboot-idle/blink/happy.png`
  (192x192 RGBA, Block C verbatim each; idle ref-guided from
  jolly-trip + jolly-sunglasses, blink/happy identity edits of
  the idle master; oatmeal fleece + porcelain plate + plain
  pink pouch, no outline). Validation: mascot corners
  transparent, pad >= 8px all sides, bbox parity <= 1px vs
  idle, opaque delta <= 0.004; bg 9:16 exact, no
  characters/text, title center + bubble zone + walking space
  clear (window glass only x490-539 y95-199, keep title
  centered; bench leg x189-197 is a <= 7px depth sliver behind
  the mascot's left edge, accepted). Contact sheets
  `art/contact-sheets/mochi-reboot-poses.png` (poses +
  alpha-checker row) + `bg-reboot-contact-sheet.png` (plain +
  212px@(270,614) composite, grounded on rug). Manifest:
  3 assets[] + 1 backgrounds[] reboot entries with FULL
  PROMPT TEXT + prompt/export sha256 (blocks verified
  verbatim vs ART_BIBLE.md programmatically); all 6 old
  plush entries flagged SUPERSEDED, files left on disk
  byte-identical. Masters in studio `art/source/mochi-reboot/`
  + `art/source/room-reboot/` (git-ignored, correct).
  Integrator notes: (1) swap preloads to the reboot files;
  same 212px@(270,614) geometry, no re-layout; (2) P5 warm
  overlays still need re-tuning vs the photo plate (known);
  (3) in-game render check needs deploy + operator phone
  playtest. No scene-code or bible-doc edits (untouched).

## Active chunk: art-direction reboot (reboot integrator workstream)

- REBOOT-INTEGRATOR OWNERSHIP (declared BEFORE editing, per
  AGENTS.md workflow law): the reboot integrator agent owns
  `src/scenes/ClinicScene.ts`, `src/main.ts`, `index.html`
  (only if needed), `PROGRESS.md`, `CHECKPOINT.md` this run.
  No `art/*` or `public/assets/*` edits (asset artists own
  those paths); sequential after art, no concurrent writers.
- REBOOT-INTEGRATOR RESULT (integrator, 2026-10-29): real reboot
  files existed (bg 1080x1920 RGB + 3 poses 192x192 RGBA,
  verified on disk), so integrated them in
  `src/scenes/ClinicScene.ts`: preloads swapped to
  `clinic-shell-reboot-01.png` + `mochi-reboot-<idle,blink,
  happy>.png` (texture keys unchanged — only paths moved);
  `drawProps()` + prop preloads DELETED (per-asset call: the
  plate paints its own bench/plant/cabinet/rug, so the plush P2
  props would clash in style AND double every piece — removed,
  not re-pointed); P5 overlays re-tuned vs the photo plate
  (light 0.12 -> 0.07 max, vignette 0.10 -> 0.07 — the photo
  carries its own sunlight); motion verified == ANIMATION.md
  exact numbers (bob 3px@1.8rad/s, blink 120ms/3-5s, bounce
  110ms +-0.06 + 80ms +-0.03 Sine, token guard) — code already
  matched, comments now cite the spec. KEPT identical: Mochi
  212px@(270,614), bubble w492/dockBottom936 sizing-upward,
  all clinical copy, Baloo 2, tap-toggle. No `src/main.ts` /
  `index.html` change needed (font gate + markup unaffected).
  Re-measured reboot landmarks (contact sheet + pixel scans,
  540x960): baseboard ~696 center, rug top ~712 (feet 720 land
  ~8px inside), rug widest ~x40-500, bench x0-160 + accepted
  leg sliver x189-197, plant x415+, cabinet x465+, window glass
  x490+ y95-199, title + bubble zones clear. GROUND=724 kept.
  Old plush constants retired (recorded in code comments).
- Tests/build: `npm test` 29/29 pass; `npm run build` green
  (tsc + vite; reboot bg + 3 poses bundled into dist; only the
  known benign public/font-URL warning). Zero reboot
  regressions — no fixes needed.
- Spend: integrator image spend $0.00 (no generations). Ledger
  stays ~$0.1644. Next $20 gate far off; at >= $120, STOP —
  not reached.
- Not done by integrator: deploy + operator phone playtest
  (headless screenshot impossible in sandbox per prior audit;
  in-game render check needs the deployed URL on a phone —
  confirm Jolly Mochi reads cute on the photo plate, rug
  grounding holds, no haze from overlays, happy/blink clean).
  No commit/push (main agent merges). STOP after CHECKPOINT.md.

## Active chunk: mascot refinement (Mochi distance-from-Jolly + edge fix)

- MASCOT-REFINE OWNERSHIP (declared BEFORE editing, per AGENTS.md
  workflow law): the mascot-refinement agent owns
  `public/assets/characters/mochi-reboot-*.png` (refined bytes),
  `art/contact-sheets/mochi-reboot-poses.png` (refresh or v2),
  `art/manifest.json` mascot entries ONLY, and
  `docs/CHARACTER_BIBLE.md` differentiation-section edits ONLY.
  Nobody else writes those paths this run. NO bg / scene-code
  edits (`public/assets/room/*`, `src/*` untouched). Base ref is
  OUR `mochi-reboot-idle.png` master ONLY — no `jolly-*` image
  used as generation/edit reference this run (IP rule).
- EDGE-DEFECT BEFORE-NUMBERS (current rev-1 exports, 192x192 RGBA;
  script `/tmp/edge_metrics.py`; fringe = alpha 1..254 over alpha>0;
  j2/j3p = silhouette row-to-row jumps >=2 / >=3px; band = x>=60%w):
  idle: fringe 9.6% (AA-band 5.27%), right j1/j2/j3p 69/25/17,
  max-jump 17, stair-runs L4/R5, right-band fringe 14.95%;
  blink: fringe 9.74%, right 71/20/15, max 17, runs L5/R7,
  band 15.02%; happy: fringe 9.51%, right 74/18/18, max 16,
  runs L6/R9, band 14.52%. Corners alpha 0 (good), halo 0.
  Visual: pixel spikes + stair-steps along the fur silhouette,
  worst on the character's right side; floor-shadow smear
  partially keyed into a white fringe at the feet. Crops:
  `/tmp/mochi-rightside-before.png`, `/tmp/mochi-fringe-before.png`.
- MASCOT-REFINE RESULT (2026-10-29): Mochi rev-2 ships — owned
  identity at distance from Jolly + smooth edges. 3 images x
  $0.01 = $0.03 this workstream (ledger ~$0.1944, $120 STOP far
  off). Idle = differentiation edit of OUR rev-1 idle master;
  blink/happy = identity edits of the rev-2 idle master. NO
  `jolly-*` image used as reference (IP rule; distinction
  verified from descriptors only, 6/6 PASS in manifest).
  Deltas: muted rose-taupe fur (mid `#A2766B`), larger
  closer-higher eyes, wider warm smile, lower-outer blush,
  plain pink pouch KEPT + ADDED pastel-pink nurse cap w/ white
  cross (cross moved off the pouch — resolves P3 question).
  Exports `mochi-reboot-<idle,blink,happy>.png` 192x192 RGBA:
  pad 25/9/26/9, corners alpha 0, bbox IDENTICAL [25,9,165,182]
  across all 3 (delta 0). Vs rev-1 idle [24,9,168,183]:
  [1,0,3,1] — DELIBERATE delta (cap added, baked shadow
  removed, right fur 3px tighter). Edge AFTER (idle): right
  j2+j3p 42->15, hard01 745->448, AA-band 5.27%->10.11%
  smooth falloff; every remaining |dx|>=3 is anatomical
  (cap/arm-hip/feet). Pipeline: flood-fill keyout + despeckle
  + edge-band-only despill + shadow-ectomy below y=1350
  (shadow-shape variance was the parity breaker; code ellipse
  still grounds Mochi). Two draft defects caught and fixed:
  interior despill ate the face/cap (restricted to edge band),
  one stray top-edge pixel wrecked the union (despeckle).
  Sheet `mochi-reboot-poses-v2.png` (poses + checker row);
  rev-1 sheet kept as evidence. Manifest rev-2 entries carry
  FULL prompt text + prompt/export sha256 + before/after
  metrics + measured palette; bible gains Differentiation IP
  law + delta table + Supabase-aligned roster columns (name,
  persona, fur_shade, facial_features, accessories/clothing —
  sketch only, no DB work). Rev-1 masters backed up as
  `*-master-rev1.png`. Integrator notes: (1) same 192 class +
  foot anchor, no code change needed; (2) char reads a touch
  larger (tighter union, cap included) — confirm 212px display
  on device; (3) single grounding shadow now (code ellipse
  only). In-game render check needs deploy + operator phone
  playtest. No bg/scene-code edits (untouched).

## Active chunk: mascot refinement (refinement-integrator workstream)

- REFINE-INTEGRATOR OWNERSHIP (declared BEFORE editing, per AGENTS.md
  workflow law): the refinement integrator owns
  `src/scenes/ClinicScene.ts` header-comment touch ONLY,
  `PROGRESS.md`, `CHECKPOINT.md` this run. No `art/*` or
  `public/assets/*` edits (refinement artist owns those paths);
  sequential after art, no concurrent writers.
- REFINE-INTEGRATOR RESULT (integrator, 2026-10-29): art was REAL
  (3 rev-2 poses verified on disk: 192x192 RGBA, sha8
  idle 6a2edbb8 / blink 04828c3e / happy 8da2ad37 matching the
  art result, bbox identical across poses, corners alpha 0).
  Filenames, texture keys, 192 class, and foot anchor all
  UNCHANGED — so no preload/geometry/anchor edit: the only
  scene change is a 3-line header-comment touch recording the
  rev-2 refinement. Verified preserved in code: Mochi 212px at
  (270,614), code shadow ellipse at GROUND=724 (now the SOLE
  grounding shadow — rev-2 removed the baked shadow smear),
  nametag, bubble 492 wide docked at 936 sizing upward,
  tap-to-complaint + happy bounce, motion == ANIMATION.md
  (bob 3px@1.8rad/s, blink 120ms/3-5s, bounce 110ms +-0.06 +
  80ms +-0.03 Sine, token-guarded). No clinical-copy change.
- Tests/build: `npm test` 29/29 pass; `npm run build` green
  (tsc + vite; rev-2 poses bundled into dist; only the known
  benign public/font-URL warning). Zero refinement
  regressions — no fixes needed.
- Spend: integrator image spend $0.00 (no generations). Ledger
  stays ~$0.1944. Next $20 gate far off; at >= $120, STOP —
  not reached.
- Not done by integrator: deploy + operator phone playtest
  (headless screenshot impossible in sandbox per prior audit;
  in-game render check needs the deployed URL on a phone —
  confirm rev-2 Mochi (nurse cap, rose-taupe fur) reads cute
  on the photo plate at 212px, single-shadow grounding holds,
  happy/blink clean). No commit/push (main agent merges).
  STOP after CHECKPOINT.md.

## Active chunk: name refresh (rename-01, operator-ordered)

- Direction: names stay friendly but less silly. Mochi (mascot,
  first patient) → Mabel; patient roster Maple/Pip/Boba/Clover/
  Nori → Milo/June/Theo/Nora (guard list is now Mabel, Milo,
  June, Theo, Nora). Roster matrix rows named: June (gentle
  first-timer), Milo (curious kid), Theo (sleepy toddler),
  Dr. Nora (AI colleague doctor).
- File ownership this chunk: single agent (main). Files touched:
  `src/scenes/ClinicScene.ts` (display strings, identifiers,
  texture keys `mabel-*`), `src/clinical/engine.test.ts`
  (PATIENT_NAMES guard), `docs/CHARACTER_BIBLE.md` (full
  Mabel + named roster), `ART_BIBLE.md`, `docs/ANIMATION.md`
  (key refs), `art/manifest.json` (prose/name fields),
  `README.md`, `PROGRESS.md`, `CHECKPOINT.md`.
- Deliberately UNCHANGED (stability + provenance): asset file
  slugs (`mochi-reboot-*.png`, masters, sources, contact
  sheets incl. baked labels), `prompt_full`/`prompt_full_rev1`
  texts (sha256-attested as-run history), rev-1 backups,
  PROGRESS.md history above. Manifest carries a rename note.
- Outcome: `npm test` 29/29 pass (guard covers the new names;
  no condition text names a patient); `npm run build` green.
  No geometry/motion/copy change — strings + docs only.

## Active chunk: UI prototype pass (UI designer workstream)

- UI-PROTOTYPE OWNERSHIP (declared BEFORE writing, per AGENTS.md
  workflow law): the UI prototype designer owns `docs/UI_PROTOTYPE.md`
  (NEW) and `PROGRESS.md` UI-prototype additions ONLY. Nobody else
  writes those paths this run. NO game-code edits (`src/*`
  untouched), NO image generations, NO asset files. Mock/local
  content only — no backend calls, offline intact.
- UI-PROTOTYPE RESULT (designer, 2026-10-29): wrote
  `docs/UI_PROTOTYPE.md` — full 540x960 spec for the DEV ADMIN
  VIEW (title-5x trigger, MABEL code pad, sliding wall-mounted
  phosphor monitor with live mock profile) + PLAYER CHROME
  (upper conversation panel, 2-3 graded choice cards on the
  tap-resolve path, 4-tab nav: Waiting/Visit/Telemed/Portal),
  container-overlay architecture, mock-data shapes, and an
  8-question operator questionnaire. No code/assets touched.

## Active chunk: UI prototype pass (UI builder workstream)

- UI-BUILDER OWNERSHIP (declared BEFORE editing, per AGENTS.md
  workflow law): the UI prototype builder owns `src/scenes/*`,
  new `src/ui/*`, `docs/UI_PROTOTYPE.md` spec-correction edits
  ONLY if the spec needs correction, `PROGRESS.md`, `CHECKPOINT.md`
  this run. Nobody else writes those paths this run. Code-drawn
  UI strongly preferred: image budget AT MOST 6 ($0.06 cap, ledger
  MUST stay far under the operator's $20 cap); target $0.00.
- Scope: implement `docs/UI_PROTOTYPE.md` exactly — secret
  title-5x trigger + MABEL code pad + wall monitor wired to LIVE
  game state (real engine/scene values, no hardcoded vitals);
  conversation panel; decision card row on the REAL tap-resolve
  path; nav bar + 4 views with MOCK roster/message data in a
  local mock-data module shaped like future Supabase rows.
  Mabel's geometry/motion/bubble behavior identical in Visit.
  No commit/push (main agent merges).
- UI-BUILDER RESULT (builder, 2026-10-29): implemented the full
  spec in `src/scenes/ClinicScene.ts` + NEW `src/ui/mockData.ts`
  (MOCK roster/threads/seeds, Supabase-row-shaped with table
  mapping). Player chrome: nav bar (4 tabs, sage pill, 150/180ms
  fades) + Visit (conversation panel, 3-card row, live vitals
  chips) + Waiting (4-row MOCK roster) + Telemed (call frame,
  LIVE/Nora pills, call bar, shifted cards) + Portal (3 MOCK
  threads, inline expand). Admin: title-5x trigger + MABEL pad +
  sliding phosphor monitor. Cards resolve through the REAL engine
  (`gradeAction`/`applyAction` on live state) with the shared
  happy-bounce method; monitor/chips read LIVE state (no
  hardcoded vitals). Mabel 212px@(270,614), bob/blink/bounce, and
  complaint copy byte-identical; old bottom bubble retired per
  spec (panel is its new home, same fades/toggle).
- Live-vs-spec-seed deviations (parent law: live wins):
  (1) rest-shade grades BEST at stage 2 live (spec seed said
  NOT_GREAT) — spines show live grades, verified by probe;
  (2) live vitals start 6/6/6 (spec seed 2/2/1) — chips show
  pep(=energy)/comfort/visit#4, monitor adds breathing;
  (3) blocked DANGEROUS plays shake+dim+Nora line with NO happy
  bounce (a bounce would celebrate a veto);
  (4) Nora observing pill 14px not 15px (fits x352–512);
  (5) 'semibold' renders as 'bold' (Phaser fontStyle);
  (6) Telemed LIVE pill overlaps the panel corner per spec
  geometry — accepted, operator judges in Q5.
- Spec correction (owned): code-pad grid was A–L with code MABEL
  — no M, untypable. Corrected to A–M minus J in both the doc
  and the build (one grid, minimal edit).
- Tests/build: `npm test` 29/29 pass; `npm run build` green
  (only the known benign font-URL + chunk-size warnings). Logic
  probe (`/tmp/ui-probe.ts` via vite-node): stage/vitals/grade/
  block/node-id/monitor-string behavior all live-correct.
- Spend: image spend $0.00 (code-drawn UI only, no
  generations). Ledger stays ~$0.1944. $20 gate far off; at >=
  $120, STOP — not reached.
- Not done by builder: deploy + operator phone playtest
  (no browser in sandbox; in-game render check needs the
  deployed URL on a phone — confirm panel/cards/nav layout,
  Telemed pill overlap, Baloo glyph coverage for ◷✚◉✉♥✿☀›✕‹→).
  No commit/push (main agent merges). STOP after CHECKPOINT.md.

## Active chunk: UI polish + asthma opener (polish-fixer workstream)

- UI-POLISH OWNERSHIP (declared BEFORE editing, per AGENTS.md
  workflow law): the UI polish fixer owns `src/scenes/ClinicScene.ts`,
  `src/ui/mockData.ts`, `src/clinical/conditions.ts` COPY ONLY
  (display labels/blurbs/plainWords/hootLines — never IDs, grades
  arrays, stage counts, presentsAt, or action IDs),
  `docs/UI_PROTOTYPE.md` corrections, `PROGRESS.md`, `CHECKPOINT.md`
  this run. Nobody else writes those paths this run. Code + copy
  only — $0.00 image spend, no generations.
- Scope: (1) apply ONE spacing system to ALL chrome + fix every
  audit-ranked overlap (A1–A14); do NOT move Mabel, bg, GROUND,
  bubble geometry, or texture keys; (2) opener swap
  dehydration→asthma (display copy + mock seed + conversation +
  monitor defaults + spec doc only); (3) npm test + build;
  (4) PROGRESS.md + CHECKPOINT.md. No commit/push (main merges).
- UI-POLISH RESULT (fixer, 2026-10-29): one spacing system now
  documented in code + spec (M_EDGE 24, M_NEST 16, G_MD 12,
  G_SM 8, radii 24/16/12/pill, Baloo slack rules). All 14
  audit fixes applied in `ClinicScene.ts`: waiting rows +
  portal threads inset 16px inside their sheets (A1/A2);
  nametag 22px@744 + chips y766–788 h22 (A3); pad sheet/dots/
  keys/cancel re-stacked (A4); nav pill h60 + glyph 24px (A5);
  portal collapsed h92 re-balanced (A6); telemed frame inside
  the nav divider (A7); monitor wrap pulled in 16px (A8);
  Nora pill widened to 168 (A9); panel body/tag symmetric 16px
  insets (A10); card labels 15px/wrap144 (A11); shadow ellipse
  tightened (A12); monitor × fully on-screen (A13); footnotes
  unified at y826 (A14). Untouched per law: Mabel sprite
  (212px@(270,614)), bg, GROUND, panel/bubble geometry,
  texture keys.
- ASTHMA-OPENER RESULT (same run): `conditionId` → asthma,
  card row → calm-air/rescue-puffer/dusty-blanket (live grades
  BEST/BEST/DANGEROUS at stage 2 — veto demo survives);
  chips lead with live breath; portal threads re-flavored
  (puffer+spacer, breathe-easy plan); dusty-blanket label
  shortened to fit 2 lines (A11). conditions.ts diff is ONE
  label line — IDs, grades arrays, stage counts, presentsAt,
  action IDs byte-identical; dehydration def kept (tests
  reference it). Spec updated: seed/profile/card/monitor
  blocks → asthma, MockVitals hydration→breathing (pre-existing
  drift fixed), rest-shade NOT_GREAT claim gone with the old
  row, geometry lines match the new build. Complaint renders
  live: "Mabel feels wheezy: Whistly breaths, worried eyes…".
- Tests/build: `npm test` 29/29 pass (incl. patient-name guard
  over the new copy); `npm run build` green (known benign
  font-URL + chunk-size warnings only). Live probe
  (`/tmp/polish-probe.ts`): presentsAt 2/wheezy, veto blocks
  with Nora line, rescue-puffer 2→1 + breath 6→8. Zero
  polish regressions — no fixes needed.
- Spend: image spend $0.00 (code + copy only, no generations).
  Ledger stays ~$0.1944. $20 gate far off; at >= $120, STOP —
  not reached.
- Not done by fixer: deploy + operator phone playtest (no
  browser in sandbox — confirm insets/gaps read clean, no
  Baloo overflow in pills/cards/threads, asthma opener feels
  clinical-but-cozy). No commit/push (main agent merges).
  STOP after CHECKPOINT.md.

## Active chunk: Mabel expression system (design only, no code/art)

- EXPRESSION-SYSTEM OWNERSHIP (declared BEFORE editing, per
  AGENTS.md workflow law): the expression-system designer owns
  ONLY the expression sections of `docs/CHARACTER_BIBLE.md` and
  `docs/ANIMATION.md`, plus this PROGRESS.md entry. No code, no
  images, no other files. Operator order: Mabel's face reflects
  illness/health status.
- No commit/push (main agent merges). STOP after bibles updated.

## Active chunk: Mabel expression art (sick/pained/relieved)

- EXPRESSION-ART OWNERSHIP (declared BEFORE generating, per
  AGENTS.md workflow law): the expression artist owns ONLY these
  new files: `public/assets/characters/mochi-reboot-sick.png`,
  `public/assets/characters/mochi-reboot-pained.png`,
  `public/assets/characters/mochi-reboot-relieved.png`,
  `art/source/mochi-reboot/mochi-reboot-{sick,pained,relieved}-master.png`,
  `art/contact-sheets/mochi-reboot-expressions.png`, the 3 new
  entries appended to `art/manifest.json` assets[], plus this
  PROGRESS.md entry. No code, no bible docs. Nobody else writes
  those paths this run. Base: OUR rev-2 idle master only —
  never any jolly-* image as reference.
- Image budget this workstream: $0.05 cap (3 gens max); ledger
  ~$0.1944 before this chunk. At >= $120, STOP — not reached.
- No commit/push (main agent merges). STOP after manifest updated.
- EXPRESSION-ART RESULT (2026-10-29): all 3 ordered expressions
  shipped as identity edits of OUR rev-2 idle master (no jolly-*
  reference anywhere). Exports `public/assets/characters/
  mochi-reboot-{sick,pained,relieved}.png` (192x192 RGBA) via
  the rev-2 recipe (flood-fill keyout 32 + despeckle +
  edge-band despill, no interior despill, shadow-ectomy,
  shared union window, bottom row 184). Gates: bbox deltas vs
  idle [1,2,1,0]/[1,2,1,1]/[1,2,1,0] (all <=2px); opaque ratios
  0.4248/0.4243/0.4250 vs 0.4254 (all within 0.01); pad >=8,
  corners alpha 0; stair-jump j2+j3p 11/15/11 vs idle 15
  (at/below; max-25 at cap-notch rows is threshold snap on the
  shallow dome gradient, visually identical per 6x strip+XOR);
  silhouette XOR vs idle ~0.5% (1px edge snap only); palette
  fur +/-2, plate +/-6, pouch +/-4; eye-band dark px
  sick 53 / pained 9 / relieved 119 vs idle 128 (spec reads
  confirmed); sick-vs-pained-vs-happy confusion check PASSES
  in the face zoom. Pained v1 rejected (asymmetric brow tick),
  r2 shipped with a no-marks clause. Contact sheet
  `art/contact-sheets/mochi-reboot-expressions.png` (6 faces +
  checker row + face zoom + sick-in-room composite) viewed by
  eye. Manifest: 3 entries with full prompt text (Block C
  verified EXACT vs ART_BIBLE.md) + sha256 + metrics.
- Spend: $0.04 this workstream (4 images x $0.01; cap $0.05
  respected). Ledger ~$0.2344 cumulative. At >= $120, STOP —
  not reached.
- Not done by artist: ClinicScene integration + in-game render
  check of the new faces (follow-on work, explicitly out of
  scope; no code touched). No commit/push (main agent merges).
  STOP.

## Active chunk: Mabel expression integration (ClinicScene wiring)

- EXPRESSION-INTEGRATOR OWNERSHIP (declared BEFORE editing, per
  AGENTS.md workflow law): the expression integrator owns ONLY
  `src/scenes/ClinicScene.ts` (+ `src/ui/mockData.ts` if seeds
  need it, + this PROGRESS.md entry + CHECKPOINT.md). No
  engine/clinical edits — the expression map is presentation
  over existing state. Steady map + transient rules implemented
  exactly per `docs/ANIMATION.md` (normative) using the shipped
  `mochi-reboot-{sick,pained,relieved}.png` exports.
- EXPRESSION-INTEGRATOR RESULT (2026-10-29): state machine LIVE
  in `src/scenes/ClinicScene.ts` exactly per `docs/ANIMATION.md`
  (normative): preload mabel-sick/mabel-pained/mabel-relieved;
  steadyFace() = stage map (0 relieved / 1 idle / 2 sick /
  3 pained) + any-vital<=2 one-step-worse shift; Mabel opens on
  steady (sick at the stage-2 asthma opener); resolve flashes
  driven by the engine animationCue (happy->happy+bounce,
  recovery->relieved+bounce, sick->pained 600ms still hold,
  worried/idle/blocked->hold steady); shared standard bounce
  (110ms +-0.06 + 80ms +-0.03, scale-only) with the monotonic
  flashToken guard on both onCompletes + texture-ownership
  settle to the steady map; blink fires only over idle steady
  with no flash, else reschedules. Geometry untouched (212px @
  (270,614), shadow, nametag, panel, nav, monitor, offline).
  Zero new display copy (patient-name guard + Baloo vacuous).
  `src/ui/mockData.ts` untouched — no seed change needed.
- Tests: `npm test` 29/29 pass; `npm run build` green (same two
  known benign warnings: font-URL + chunk-size). No expression
  regressions.
- Spend: image spend $0.00 (code only, 0 generations). Ledger
  stays ~$0.2344 — far under the operator's $20 cap; at
  >= $120, STOP (not reached).
- Playtest: NOT playtested in-game (no browser in sandbox).
  Operator: open the deployed URL at phone size — Mabel should
  open sick, flash relieved+bounce on rescue-puffer (2->1),
  flash pained-still on dusty-blanket (2->3), bounce happy on
  full recovery, and hold steady on the DANGEROUS veto.
- No commit/push (main agent merges). STOP after CHECKPOINT.md.

## Active chunk: chrome-2 UI iteration (operator-ordered, code + copy only)

- CHROME-2 OWNERSHIP (declared BEFORE editing, per AGENTS.md workflow
  law): the chrome-2 builder owns ONLY `src/scenes/ClinicScene.ts`,
  `src/ui/mockData.ts`, `docs/UI_PROTOTYPE.md` corrections,
  `PROGRESS.md`, `CHECKPOINT.md` this run. Nobody else writes those
  paths this run. $0.00 image spend — code + copy only, no generations.
- Scope (ALL FIVE operator items): (1) subtle translucent chrome —
  slim top bar (profile chip + difficulty indicator, mock, room left
  for future controls) + translucent bottom toolbar, translucent
  fills with opaque text; (2) conversation-panel tail restyled as
  SOLID full-outline-color tucked under the panel; (3) quoted speech
  — MABEL + DR. NORA lines wrapped in quotes, narration unquoted, in
  conversation rendering + mock copy; (4) progress HUD — mock
  care-coins pill (ticks on BEST resolves), display-only mm:ss visit
  timer, visit-context label (new/sick/follow-up ×
  gentle-to-expert tier from mock difficulty); (5) taste guardrails
  on every added element. Mabel geometry/motion/expressions/panel
  behavior/dev-view/offline stay intact. New copy passes the
  patient-name guard + Baloo-2 cmap audit. No commit/push (main
  agent merges).
- CHROME-2 RESULT (builder, 2026-10-29): all five items shipped.
  `src/ui/mockData.ts`: ChromeTier gentle/steady/expert keyed by
  mock difficulty (+ labels), VISIT_CONTEXT_WORDING (3 contexts ×
  3 tiers, generic copy, no patient names), MOCK_CARE_COINS_START
  12, MOCK_PROFILE_LABEL, quoteIfSpoken render-time rule — all
  documented mock. `src/scenes/ClinicScene.ts`: (1) slim top bar
  y0–32 (cream 0.8 + whisper divider; profile chip left,
  difficulty word + 3 dots right, middle empty, display-only) +
  nav bar quieted (cream 0.8, 2px divider at 0.25; same 4 tabs,
  opaque pill/text); (2) panel tail now solid OUTLINE tucked
  under the panel; (3) renderPanel + portal bubbles quote
  MABEL/DR. NORA via quoteIfSpoken (YOU/me/Clinic/snippets
  bare), quoted before the truncate pass; (4) Visit-only HUD
  y376–412 (coins r18 +1/BEST, context r14 re-derived per
  resolve, timer r8 mm:ss display-only from scene start, 1Hz
  text updates); (5) taste: palette-only accents, no
  gradients/emoji/glow, 13→44px type steps, radii 8/12/14/18
  with intent, translucency on bar strips only. Untouched:
  Mabel geometry/motion/expressions, panel fades/toggle, admin
  stack, offline (no fetches). Copy checks: patient-name guard
  29/29 green (no conditions.ts edit; new copy name-free);
  fontTools cmap audit (`/tmp/chrome2_audit.py`) — zero missing
  Baloo-2 glyphs across all new strings incl. U+0022 + quoted
  portal lines; conditions.ts holds no `"` so no double-wrap.
- Tests/build: `npm test` 29/29 pass; `npm run build` green
  (known benign font-URL + chunk-size warnings only). Zero
  chrome-2 regressions — no fixes needed.
- Spend: image spend $0.00 (code + copy only, 0 generations).
  Ledger stays ~$0.2344 — far under the operator's $20 cap; at
  >= $120, STOP (not reached).
- Not done by builder: deploy + operator phone playtest (no
  browser in sandbox — confirm top bar/HUD read quiet over the
  photo plate, solid tail + quotes land, coins tick on BEST
  only, timer counts, context says "Feeling poorly" at the
  opener). No commit/push (main agent merges). STOP after
  CHECKPOINT.md.

## Active chunk: backdrop plate library (art direction, spec only)

- BACKDROP-DIRECTOR OWNERSHIP (declared BEFORE writing, per
  AGENTS.md workflow law): the backdrop art director owns ONLY
  the new "Appendix: plate library registry" section of
  `ART_BIBLE.md`, plus this PROGRESS.md entry. No images, no
  scene code, no other files. Nobody else writes those paths
  this run. Operator order: additional backdrops for the
  various settings + multiple alternatives, clean minimal
  photorealistic style, MUST read as a modern INVITING
  wellness clinic, never a generic office.
- Registry location chosen: `ART_BIBLE.md` appendix (NOT
  `docs/UI_PROTOTYPE.md` — plate specs are art law under the
  validation gate; the prototype spec stays frozen).
- BACKDROP-DIRECTOR RESULT (2026-10-29): 8-plate library specced
  in the new `ART_BIBLE.md` appendix (4 settings x 2 variants;
  `exam-a` = shipped `clinic-shell-reboot-01.png` stays the
  Visit default, 7 new plates to generate). Each plate carries a
  generation prefix (Block B verbatim appended), >=2 wellness
  cues, the shared 540x960 clear-zone contract (title y0-136,
  panel y136-356, HUD y376-412, footprint x164-376 y508-720,
  GROUND=724, cards + nav floor-only), palette bounds measured
  from the shipped plate (wall `#D3CCC5`/`#B7ACA0`, floor
  `#D7C1AA`/`#AA9178`, wood `#C8A583`, rug `#DAC7B3`,
  foliage `#655C47`, +/-14/channel), and the wiring rule (view
  -> setting; A/B by visitNo parity so both variants surface in
  normal play; one-line `PLATE_PIN` override; missing plates
  fall back to `exam-a` offline). Read before writing:
  ART_BIBLE Block B, the reboot manifest entry + contact sheet
  (viewed), ClinicScene view/chrome geometry, PROGRESS tail.
  Spend: image spend $0.00 (spec only, 0 generations). Ledger
  stays ~$0.2344; at >= $120, STOP (not reached).
- Not done by director: plate generation + manifest entries +
  contact sheets (artist follow-on, 7 plates), ClinicScene
  plate wiring + in-game render check (integrator follow-on).
  No commit/push (main agent merges). STOP.

## Active chunk: backdrop plate generation (artist run)

- BACKDROP-ARTIST OWNERSHIP (declared BEFORE generating, per AGENTS.md
  workflow law): the backdrop artist owns ONLY new
  `public/assets/room/*.png` (7 plates), masters under
  `art/source/room-reboot/`, contact sheet(s)
  `art/contact-sheets/*bg-*`, `art/manifest.json` backgrounds[]
  additions, plus this PROGRESS.md entry. No scene code, no other
  files. Nobody else writes those paths this run. Cap: AT MOST 8
  plates; generating the 7 SPEC plates (exam-a SHIPPED, stays).
  Workstream image cap $0.08 (7 x $0.01); at >= $120, STOP.
- BACKDROP-ARTIST RESULT (2026-10-29): all 7 SPEC plates generated,
  validated, shipped. Files: `public/assets/room/clinic-{exam-b,
  waiting-a, waiting-b, telemed-a, telemed-b, portal-a, portal-b}.png`
  (1080x1920 RGB, LANCZOS from 1152x2048 9:16 masters in
  `art/source/room-reboot/`), contact sheets
  `art/contact-sheets/bg-plates-visit-waiting.png` (exam-b,
  waiting-a, waiting-b) + `bg-plates-telemed-portal.png`
  (telemed-a/b, portal-a/b), each plate with plain + Mabel rev-2
  212px@(270,614) composite panels, 7 manifest backgrounds[]
  entries (FULL prompt text + sha256 + 540-space landmarks +
  view/variant role). Every prompt = registry prefix + Block B
  VERBATIM (verified programmatically EXACT vs ART_BIBLE.md).
  Validation per plate: dimensions exact; no people/text by eye
  (full plate + window/center zooms); footprint x164-376 y508-720
  clear (telemed-a zero dark px; exam-b stool leg to x170 + 
  telemed-b credenza edge x343 = <=7px slivers behind mascot,
  same class as shipped exam-a precedent, accepted);
  GROUND=724 on rug (exam-b, waiting-b, telemed-b) or floor at
  rug edge (waiting-a, telemed-a, portal-a/b) — all read
  grounded in composites; title/panel bands calm (energy
  1.4-2.7); cards/nav zones rug/floor only; style = one family
  with shipped exam-a by eye; >=2 wellness cues each; no office
  cues. Measured deviations (chrome-safe, documented in
  manifest): window glass bottoms run below spec y199
  (y220-365 by plate) but all at x432+ right edge, clear of
  every chrome zone; palette bands trend brighter than shipped
  anchors toward bible neutrals per the registry grade-toward
  clause. REJECT: waiting-a r1 (table at center x204-418 behind
  mascot) → r2 re-layout pinned furniture to edges, footprint
  clear. Spend: 8 images x $0.01 = $0.08 — workstream cap $0.08
  respected exactly; ledger ~$0.3144; at >= $120, STOP (not
  reached). Not done by artist: ClinicScene plate wiring +
  in-game render check (integrator follow-on). No commit/push
  (main agent merges). STOP.

## Active chunk: backdrop plate integration (integrator run)

- PLATE-INTEGRATOR OWNERSHIP (declared BEFORE editing, per AGENTS.md
  workflow law): the integrator owns ONLY `src/scenes/ClinicScene.ts`
  bg handling, `src/ui/mockData.ts` plate map if needed, plus this
  PROGRESS.md entry and CHECKPOINT.md. No art files, no manifest, no
  other code. Nobody else writes those paths this run.
- PLATE-INTEGRATOR RESULT (2026-10-29): per-view plate wiring live.
  `src/scenes/ClinicScene.ts` only (no mockData change needed —
  variant derives from the existing PROTOTYPE_SEEDS.visitNo):
  PLATE_FILE registry (8 slugs -> local files; `exam-a` = shipped
  `clinic-shell-reboot-01.png`, same pixels) + PLATE_SETTING
  (visit->exam, waiting->waiting, telemed->telemed,
  portal->portal) + one-line PLATE_PIN override (empty = parity
  rule, documented in code) + plateForView (PLATE_PIN wins;
  else even visitNo->A, odd->B). Preload loops the registry
  (keys `plate-<slug>`, all local, offline-safe); drawRoom
  stores roomBg and opens on the Visit plate; showView calls
  swapPlate (same plate = no-op; else 150-out/set-texture/180-in
  riding the existing fade durations); plateKey falls back to
  `plate-exam-a` if a texture is missing. Opener (visitNo 4)
  shows all A — the Visit opener is pixel-identical to before.
  Mabel geometry/motion/expressions, all chrome, dev view,
  panel, offline untouched. Zero new display copy: patient-name
  guard and Baloo-glyph checks pass vacuously (29/29 incl. the
  guard).
- Tests: `npm test` 29/29 pass; `npm run build` green (known
  benign font-URL + chunk-size warnings only). No plate
  regressions.
- Spend: image spend $0.00 (code only, 0 generations). Ledger
  stays ~$0.3144; at >= $120, STOP (not reached).
- Not done by integrator: in-game render check needs the
  deployed URL (main agent merges + deploys + playtests). No
  commit/push (main agent merges). STOP.

## Active chunk: chrome-3 icon/simplify pass (operator UI feedback)

- CHROME-3 OWNERSHIP (declared BEFORE editing, per AGENTS.md
  workflow law): this run owns ONLY `src/scenes/ClinicScene.ts`
  chrome/panel/nav, `docs/UI_PROTOTYPE.md` chrome-3 section, plus
  this PROGRESS.md entry and CHECKPOINT.md. No art files, no
  manifest, no clinical code, no backend. Nobody else writes those
  paths this run.
- CHROME-3 RESULT (2026-10-29): icon-led simplification live.
  `src/scenes/ClinicScene.ts`: (1) SAY vs TELL — renderPanel +
  setConversation take LineKind; 'say' quotes + tags, 'tell'
  is bare narration with the tag hidden for on-screen Mabel
  and kept for Nora's off-screen step-ins; all 3 callers pass
  'tell' (every current engine line verified third-person
  narrator voice — complaint, narrative, hootLine teaching,
  blocked reasons). (2) HUD moved off the y376 band into the
  top strip (coin+ cluster x24–124, bare context words center,
  clock-hands cluster x416–516; Visit-faded, strip persistent
  depth 19, contents 20); profile "You" chip + "Gentle"
  difficulty pill REMOVED to a future submenu. (3) Code-drawn
  icons: coin+, clock face+hands, 4 tab icons (queue dots /
  care cross / video play / envelope) replacing text glyphs;
  icons dim with labels. `docs/UI_PROTOTYPE.md`: top bar, nav,
  panel, Visit-HUD sections rewritten to chrome-3.
- Tests: `npm test` 29/29 pass; `npm run build` green (known
  benign chunk-size warning only). No copy changes: patient-name
  + glyph guards pass vacuously.
- Spend: image spend $0.00 (code-drawn icons, 0 generations).
  Ledger stays ~$0.3144; at >= $120, STOP (not reached);
  operator $20 cap respected.
- Not done: phone playtest (operator); profile/difficulty
  submenu; first-person trajectory dialogue (returns quotes to
  the panel). STOP.

## Queued parallel workstreams (operator-approved 2026-10-29)

One phase per run still holds (AGENTS.md) — the queue below runs
back-to-back, and the marked groups MAY parallelize across
worktrees because their file sets do not overlap. Main agent
merges everything; ownership declared per workstream before each
run starts.

- GATE 0 (operator, blocks H2 deploy): the `sbp_` token in `.env`
  is scope-narrow (CLI: missing projects_read, project_admin_read;
  MCP: missing edge_functions_write, api_gateway_keys_read).
  Operator: generate a FULL-access token (all scopes checked) and
  replace SUPABASE_ACCESS_TOKEN in local `.env` (never chat).
  Everything else below can run before this lands.
- GROUP 1 (parallel-safe, no shared files):
  WS-A art: C1 June/Milo portraits + T1 tool icons. Files:
  `public/assets/**`, `art/manifest.json`, `art/contact-sheets/**`
  only. Cap: <=6 portraits, <=8 plates total (plates done).
  WS-D content: treatments DB seed + learning-resource seeds +
  local fallback pack. Files: `data/**`, `src/data/**` (new).
  WS-E systems: C3 progression + L2 spendable economy + L3
  10-move undo. Files: `src/game/**` (new) + tests. No scene
  wiring yet (integration phase does that).
- GROUP 2 (after GATE 0): H2 backend — schema migration (6 tables)
  via MCP `apply_migration`, `supabase/functions/seed-patients` +
  `extend-trajectory` via CLI, 12-patient seed, veto audit, game
  reads live (scene touches sequenced AFTER WS-C modules land).
- GROUP 3 (parallel-safe vs GROUP 2, new files only): WS-C
  frontend modules — F1 ticker (`src/ui/ticker.ts`), T1 tool
  trays (`src/ui/toolTrays.ts`), L1 living chart
  (`src/ui/livingChart.ts`), E1 learning list (`src/ui/learn.ts`).
  NO ClinicScene.ts edits inside the group (integration wires).
- GROUP 4 (sequential, after 2+3): integration — wire modules +
  live reads into ClinicScene.ts, encounter rounds C2 on real
  trajectories, full playtest.
- GROUP 5 (daily from first stable build): D demo packaging.
- Freeze Nov 3 noon ET: C4-C5 first cut, then L2/L3 yield, D
  protected. Ledger ~$0.3144; STOP >= $120; operator cap $20.

## Active chunk: H2 backend simulation (patients + trajectories)

- H2 OWNERSHIP (declared BEFORE editing, per AGENTS.md workflow
  law): this run owns ONLY `supabase/migrations/**` (via MCP),
  `supabase/functions/seed-patients/**`,
  `supabase/functions/extend-trajectory/**`, `supabase/seed/**`
  (audit notes), `src/data/fallbackPack.ts` (DERIVED export of
  the H2 seed — WS-D is amended to exclude this one file),
  `docs/AI_PROXY.md` (contract updates), plus this PROGRESS.md
  entry and CHECKPOINT.md. No scene, no art, no manifest, no
  other code. Nobody else writes those paths this run.
- GATE 0 CLEARED (2026-10-29): operator installed a full-access
  `sbp_` token in local `.env`; `supabase link` succeeds and
  `secrets list` confirms META_API_KEY present server-side
  (name + digest only — value never exposed).

## Correction (2026-10-29): Playwright audit REVISED — screenshots work

- SUPERSEDES the Oct 28 "prior audit" lines above ("headless
  screenshot impossible in sandbox"): that finding was
  overgeneralized. Re-tested 2026-10-29, verified end to end.
- Still true: Chromium CANNOT launch inside Muse's SANDBOXED
  shell runner (seatbelt denies its Mach IPC rendezvous; the
  browser process gets SIGABRT, re-confirmed today). This
  affects interactive sessions with sandbox on (the default).
  Do not retry screenshot commands there.
- Now verified: headless Chromium screenshots WORK in any
  UNSANDBOXED runner — watchdog headless chunks (`muse exec
  --yolo`, sandbox off) and the operator's own terminal.
  Proof: default `p.chromium.launch()`, 540x960 capture of the
  live deploy with tap + zero console errors, pixels inspected.
- Setup fixed: `python3 -m playwright install chromium`
  installed the v1223 builds Playwright 1.60.0 expects
  (previously only orphan 1243/1248 builds from a removed
  newer Playwright were present, so default launch failed
  before even reaching the browser).
- Standing path: studio `tools/shot.py`
  (`python3 tools/shot.py <url> <out.png> [w h]`, `--no-tap`
  to skip the tap), REQUIRED wherever the brief demands a
  playtest. Rule recorded in studio AGENTS_PRIVATE.md
  Model-and-tool law + brief step 5. Never again skip a render
  check citing the old audit — run the screenshot in an
  unsandboxed chunk, or ask the operator to run the one-liner.

## Queued: V1 dev-view asset browser (operator request 2026-10-29)

- Sometime fitting (after GROUP 3 modules, before/inside GROUP 4
  integration): extend the secret dev view (MABEL staff terminal)
  with an asset-review tab — tap through ALTERNATE graphic assets
  (plate A/B variants, expression sprites, future portraits, tool
  icons) rendered live on-device, plus an "implement" panel that
  shows the exact code change each choice needs (file, constant,
  snippet — e.g. `PLATE_PIN = { visit: 'exam-b' }`). The operator
  pastes that snippet back into the main Muse Code session to
  apply it. Files (planned): `src/ui/assetBrowser.ts` (new) +
  minimal ClinicScene wiring at integration time.

## Browser-test dead end (evidence, 2026-10-29)

Operator asked for parallel Chromium testing. All four engines
tried, all die on sandbox-denied macOS services (NOT game bugs):
1. Chrome.app headless: SIGABRT in TransformProcessType →
   _RegisterApplication (no WindowServer session).
2. Firefox.app headless: identical SIGABRT signature.
3. Playwright chromium_headless_shell-1248: FATAL
   bootstrap_check_in MachPortRendezvousServer Permission denied.
4. Same shell --single-process: past rendezvous, then killed on
   HIServices XPC / LaunchServices denial. No screenshot.
Local static serving also impossible (bind: Operation not
permitted, even loopback). Pivot (same run, non-blocking):
programmatic layout auditor — rect overlaps, spacing-system
compliance, Baloo-measured text-in-pill fit, plate-landmark
clearance — then a polish fix loop for real findings.
- H2 RESULT (2026-10-29): backend simulation live end-to-end.
  Schema: `h2_patient_simulation_schema` migration (6 tables,
  RLS on, anon SELECT). Functions deployed via CLI:
  `seed-patients` + `extend-trajectory` (Deno, verify_jwt on,
  Meta contract recorded from dev.meta.ai/docs: POST
  api.meta.ai/v1/chat/completions, Bearer META_API_KEY,
  muse-spark-1.3, json_object). Cast: 12 patients (3 bands x 4
  conditions, Mabel/Milo/June/Theo fur canon kept), 204 nodes /
  192 edges depth-2, one patient per call (12-call batch hit
  WORKER_RESOURCE_LIMIT at 6/12 — wiped, reseeded 1-by-1).
  Vetoes: 0/204, spot-check stage-faithful. Static seeds: 4
  treatment classes, 4 MedlinePlus resources (all curl-200),
  Mabel visits 1-4. Offline: `src/data/fallbackPack.ts` (204KB
  snapshot, read back over anon REST) + 5 shape tests.
  `docs/AI_PROXY.md` records the live contract;
  `supabase/seed/audit-h2.md` is the audit.
- Tests: `npm test` 34/34 (29 engine + 5 pack); `npm run build`
  green (benign chunk warning). `.gitignore` += supabase/.temp/
  (pooler-url holds credentials — never committed).
- Spend: image $0.00; ~12 small Meta calls (cents). Ledger
  ~$0.3144; STOP >= $120 far off; $20 cap respected.
- P-polish (same run, parallel): browsers impossible (4 engines,
  evidence above); programmatic layout audit ran 40+ checks
  (overlaps, spacing, Baloo-measured fit, landmarks) — 0
  findings. Tightest clearance: title ink 3.5px below strip.
  No polish commit (nothing to fix). STOP.

## Active chunk: GROUP 3 frontend modules (long-horizon run)

- G3 OWNERSHIP (declared BEFORE editing): this phase owns ONLY
  `src/ui/chromeTheme.ts`, `src/ui/ticker.ts`,
  `src/ui/toolTrays.ts`, `src/ui/livingChart.ts`,
  `src/ui/learnList.ts`, `src/ui/g3.test.ts`, plus PROGRESS.md
  and CHECKPOINT.md. No scene edits (integration wires at G4).
- G3 RESULT: 4 frontend modules ship (unwired): `src/ui/ticker.ts`
  (F1 2-row terminal strip y852-888 + mock feed + rotation),
  `src/ui/toolTrays.ts` (T1 slide-in exam tray, 4 code-drawn
  tools, pick callback), `src/ui/livingChart.ts` (L1 memory-bead
  sheet, <=5 lines), `src/ui/learnList.ts` (E1 submenu fed by
  fallback resources), `src/ui/chromeTheme.ts` (shared palette),
  `src/ui/g3.test.ts` (4 pure-logic tests). G4 contract: card
  row shifts up 36px to clear the ticker.
- Tests: 38/38; build green. Spend $0.00.

## Active chunk: GROUP 4 integration (long-horizon run)

- G4 OWNERSHIP (declared BEFORE editing): this phase owns ONLY
  `src/data/patients.ts` + `src/data/patients.test.ts` (live-read
  layer), `src/scenes/ClinicScene.ts` (module wiring, geometry
  shifts, live resolve, extend trigger), plus PROGRESS.md and
  CHECKPOINT.md. G3 modules are consumed, not modified.
- G4 RESULT: integration live. `src/data/patients.ts`: loadCast
  (Supabase REST -> fallback), root/child lookups, mergeExtension,
  engine-built childSpecs, extendTree (+4 tests). Scene: ticker
  (1-row, all but Telemed) + mock ticks, tool tray (Visit-only;
  handle abuts panel at x516), Living Chart (nametag tap),
  Learning List (strip book, Waiting/Portal), opener + resolves
  read stored flesh with engine state authoritative, background
  growTree off-tree. Geometry: nametag 740, chips 758, cards
  y788 h74, toast y368; auditor re-run 0 findings (1 real
  chips/cards gap fixed 6->8px). Doc: card/chip geometry.
  NOTE: Vercel needs VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
  env for live reads in prod (else silent fallback — by design).
- Tests: 42/42; build green. Spend $0.00.

## Active chunk: WS-E economy + undo (long-horizon run)

- WS-E OWNERSHIP (declared BEFORE editing): this phase owns ONLY
  `src/game/economy.ts`, `src/game/undo.ts`,
  `src/game/ws-e.test.ts`, plus PROGRESS.md and CHECKPOINT.md.
  Unwired systems (submenu/HUD wiring at the next integration).
- WS-E RESULT: unwired economy + undo systems. `src/game/economy.ts`
  (Care Coins wallet: start 12, earn +1/BEST, spend with no debt,
  serialize/deserialize with corrupt-save rejection),
  `src/game/undo.ts` (generic 10-move capped stack, LIFO, clear),
  `src/game/ws-e.test.ts` (6 tests). Scene/submenu wiring at the
  next integration; coin_ledger table replaces local saves.
- Tests: 48/48; build green. Spend $0.00.

## Active chunk: WS-A June + Milo portraits (long-horizon run)

- WS-A OWNERSHIP (declared BEFORE editing): this phase owns ONLY
  `public/assets/characters/june-*`, `public/assets/characters/milo-*`,
  `art/manifest.json` (append 2 entries), `art/contact-sheets/*ws-a*`,
  `docs/CHARACTER_BIBLE.md` (master refs if missing), plus
  PROGRESS.md and CHECKPOINT.md. No code, no scene wiring
  (roster/encounter wiring at the next integration). Cap $0.02.
- WS-A RESULT: June + Milo idle portraits ship. Fresh generations
  (no refs, Block C verbatim, $0.02): honey-taupe June + sage
  scarf + larger blush; porcelain-taupe Milo + slate glasses +
  head tilt. Key-out: corner-sampled floodfill (June void ~253,
  Milo void ~240 beige — fixed-threshold r1 REJECTED on Milo,
  full-frame bbox); exports 192px, pad 9-10, corners clear,
  opaque 0.504/0.419; contact sheet + 2 manifest entries; bible
  rows now idle-current. In-game render check pending (no
  browser) — roster/encounter wiring at next integration.
- Tests: 48/48; build green. Spend $0.02 (ledger ~$0.3344).

## Active chunk: WS-A2 expression sets (continuous run)

- WS-A2 OWNERSHIP (declared BEFORE editing): this phase owns ONLY
  `public/assets/characters/{june,milo}-{blink,happy,sick,pained,relieved}.png`,
  `art/manifest.json` (append 10 entries),
  `art/contact-sheets/*ws-a2*`, plus PROGRESS.md and CHECKPOINT.md.
  Identity edits of the WS-A idle masters. Cap $0.10.

## Active chunk: tray-hotfix (user bug report, continuous run)

- TRAY-HOTFIX OWNERSHIP: this fix owns ONLY `src/ui/toolTrays.ts`
  plus PROGRESS.md and CHECKPOINT.md. WS-A2 art stays queued.
- TRAY-HOTFIX RESULT (user bug: tray started open + floated
  mid-screen): root cause — the panel was painted relative to
  the sliding container, so it showed on-screen at both ends of
  the tween. Rewrite: fixed handle tab (x516-540, depth 23) +
  panel sliding 540 (fully off-screen) <-> 348 (anchored right
  edge, depth 22); rows live in the panel's left 168px clear of
  the handle; glyph ‹/› swaps. Auditor 0 findings, 48/48, build
  green. Spend $0.00.

## Active chunk: choose-nudge hotfix (continuous run)

- CHOOSE-NUDGE OWNERSHIP: this fix owns ONLY `src/ui/mockData.ts`
  (prompt wording table), `src/scenes/ClinicScene.ts` (prompt tab
  + idle nudge), plus PROGRESS.md and CHECKPOINT.md. Round-type
  content variety (diagnose/ask/examine/watchful-waiting) is
  QUEUED as encounter-variety, not this fix.
- CHOOSE-NUDGE RESULT: tier-worded "Choose…" tab (w173 max)
  straddles the card row top (display-only, rides the row);
  6s-idle staggered card lift + tab swell, re-arming, Y-only
  tweens (never fights the press squash); grace on view change.
  Auditor 0 findings, 48/48, build green. Spend $0.00. QUEUED:
  encounter-variety (diagnose/ask/examine/watchful-waiting
  round types + actions).

## Active chunk: exam-maneuvers + illustrations (continuous run)

- EXAM-MANEUVER OWNERSHIP: this phase owns ONLY `src/ui/toolTrays.ts`
  (4 real maneuvers), `ART_BIBLE.md` (new Block U, proposed),
  `public/assets/exam/*.png`, `art/manifest.json` (4 appends),
  `art/contact-sheets/*exam*`, plus PROGRESS.md and CHECKPOINT.md.
- EXAM-MANEUVER RESULT: tray corrected to the 4 real maneuvers
  (inspection/look incl. ENT, palpation/feel, percussion/tap,
  auscultation/listen) with clinical-term hint lines + 4 new
  code-drawn icons (eye, pressing hand, tap arcs, chest piece).
  ART_BIBLE gains Block U (UI illustration, proposed). 4 exam-loop
  illustrations generated fresh ($0.04), all pass (flat, cream,
  no text), 512px exports + contact sheet + 4 manifest entries.
  48/48, build green. Ledger ~$0.3744. QUEUED: maneuver-library
  (8 condition specials + illustrations), exam-loop UI wiring,
  ortho/neuro with encounter-variety conditions.
- WS-A2 RESULT: full expression sets for June + Milo (blink, happy,
  sick, pained, relieved x2 = 10). Identity edits of WS-A idle
  masters, Block C verbatim, $0.10. Key-out clean all 10 (June
  opaque ~0.50, Milo ~0.42, matching idles = pose locked); pads
  9-10, corners clear. Contact strips reviewed: accessories
  persist, all expressions read. june-pained v1 moderation-hit
  on "winced/sweat" wording — reworded playful-scrunch r2
  shipped. Manifest now 25 assets. Ledger ~$0.4744.

## Active chunk: playable roster (continuous run)

- ROSTER OWNERSHIP: this phase owns ONLY `src/scenes/ClinicScene.ts`
  (active-patient generalization + switching), `src/ui/mockData.ts`
  (cast quote rule), `docs/UI_PROTOTYPE.md` (waiting spec touch),
  plus PROGRESS.md and CHECKPOINT.md. No engine/backend changes.
- ROSTER RESULT: June + Milo playable. Scene runs active patient
  (prefix/speaker/cast lookups); identifiers renamed
  patient-wide (tsc clean first pass); expressions/blink/bounce
  prefix-driven; complaint/resolves/chart/monitor follow the
  active name; cast quote rule covers JUNE/MILO; card rows
  rebuild per condition (asthma fixed demo row, else first 3
  live actions); waiting taps switch visits (Theo stays mock).
  Auditor 0 findings, 48/48, build green. Spend $0.00.
