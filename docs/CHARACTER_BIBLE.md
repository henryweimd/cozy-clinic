# CHARACTER_BIBLE.md — Little Lives: Cozy Clinic

Cast law. Companion to `ART_BIBLE.md` (render rules) and
`docs/ANIMATION.md` (motion rules). Only Mabel ships this run;
every other row is a reserved design, not an asset order.

Source of truth for the Jolly look: recon of 13 reference images
(all readable): soft 3D clay/Pixar-like render, oatmeal fleece
body + porcelain face plate, chibi egg/bean 1:1, bead eyes +
blush + one-curve smile, NO outline, saturated color in
props/outfits only. All 13 refs show ONE identical character —
differentiation by costume/prop/context only — so the multi-patient
cast below is invented, not copied [R].

## Mabel — owned identity (rev-2, ships this run)

- Species/silhouette: chibi egg/bean mascot, head+body merged, no
  neck; stubby mitten arms, nub legs; the face dominates the upper
  half.
- Render: Block C verbatim (see `ART_BIBLE.md`) for the 3D
  clay language, with Mabel's OWNED deltas prepended in every
  prompt (see Differentiation below): muted rose-taupe fur
  (midtone `#A2766B`, range `#926A60`–`#C69C8F`), warm-cream
  porcelain face plate `#F5E0C8`, bead eyes `#1A1714` with white
  highlights, blush `#E2B7A4`, smile `#805446`. No outline,
  no cel shading.
- Signature traits (TWO, both fixed across all poses): small plain
  pink belly pouch (`#EBAFAF`, centered on the belly) AND a small
  pastel-pink nurse cap (`#E6B2B0`) tilted on the upper-left of
  the head with one tiny white cross emblem. The cross lives on
  the cap ONLY — the pouch reads plain (resolves the P3
  pouch-emblem question: emblem moved to the cap at rev-2).
- Role: the returning patient who opens the demo; warm, familiar,
  the Living Chart made visible.
- Poses this run: idle, blink, happy (shipped rev-2) + sick,
  pained, relieved (ORDERED by the expression-system design
  below; art + integration follow). Same 192×192 class, same
  foot anchor, shared union-crop window, bbox within 2 px per
  side of the rev-2 set ([25,9,165,182] at alpha>0). Baked
  floor shadow REMOVED at rev-2 (its shape varied per pose
  and broke parity); grounding comes from the code-drawn
  shadow ellipse + rug. Same surgery 2026-10-29 for the whole
  cast: June's white disc, Milo's beige slab, Mabel's last gap
  sliver all keyed out (feet fur 100% preserved, contact sheets
  `floor-*.png`); Block C now forbids baked shadows outright.

## Expression library — Mabel (normative)

Operator order: Mabel's face reflects illness/health status —
better or worse with medical state, reacting to correct /
incorrect decisions, plus neutral. Six faces total, three
shipped, three ordered. New art is capped at sick, pained,
relieved: idle stays the neutral face, happy stays the
correct-celebrate face. No other expressions without a bible
amendment.

Invariants (EVERY expression, no exceptions):

- Block C verbatim + all six Mabel deltas (rose-taupe fur,
  `#F5E0C8` plate, nurse cap + plain pouch fixed, no outline).
- Cap, pouch, plate, fur, limbs, foot anchor, silhouette:
  byte-identical read vs idle. Expression changes the FACE
  ONLY (eyes, mouth, blush) — the ANIMATION.md pose rule.
- Mouth always closed, never open (Block C ban survives all
  expressions; pain reads through a downturned closed curve,
  never an open mouth).
- One small change must read instantly at phone size.

Per-expression face spec:

| Face | Eyes | Mouth | Blush | Reads as |
|---|---|---|---|---|
| idle (neutral, shipped) | Beads open, larger/closer/higher per delta 2 | Gentle wide warm closed curve `#805446` | Baseline `#E2B7A4`, lower-outer | Resting / okay |
| blink (shipped) | Closed (lid-matched variant of idle) | Identical to idle | Identical to idle | Blink frame only, never a state |
| happy (shipped) | Closed `^ ^` happy curves | Bigger smile | Rosier | Full-recovery / tap-hello celebrate |
| sick (ORDERED) | Half-lidded droopy beads: beads smaller, set LOWER, upper lid overlapping top third (lid shaded in fur `#A2766B` family, never a line) | Smaller flatter closed curve, ends level (smile gone flat, not a frown) | Fainter/paler than baseline (washed-out cheeks) | Unwell but cozy |
| pained (ORDERED) | Shut scrunched curves, `> <` angled slanting DOWN toward center (visually distinct from happy's up-arched `^ ^`) | Small downturned closed curve (gentle frown-fun, cozy bounds — droopy, never grim) | Baseline kept (position + tone — pain reads in eyes/mouth, not cheeks) | Hurting / setback |
| relieved (ORDERED) | Beads OPEN (this is what separates it from happy: relieved = open-eye bright face, happy = closed-eye celebrate) | Warm wider smile, upturned ends (between idle and happy in size) | Brighter/fuller than baseline (color back in the cheeks) | Better / on the mend |

Ordered-asset validation (same gate as the rev-2 set):

- Files: `public/assets/characters/mochi-reboot-sick.png`,
  `mochi-reboot-pained.png`, `mochi-reboot-relieved.png`
  (slugs keep the `mochi-*` working name; texture keys
  `mabel-sick`, `mabel-pained`, `mabel-relieved`).
- Base every generation on OUR `mochi-reboot` idle master —
  never on a `jolly-*` image, never on another expression.
- Mabel deltas 1–5 hold on all three; bbox within 2 px per
  side of idle; opaque ratio within 0.01 of idle; ≥8 px pad;
  corners transparent; contact-sheet + in-game render check.
- sick vs pained vs happy confusion check: the three closed /
  narrowed-eye faces must be told apart at phone size in the
  contact sheet (droopy lids vs scrunched `> <` vs arched
  `^ ^`) or the set fails.
- NO blink variants for sick/pained/relieved are ordered —
  the blink rule in `docs/ANIMATION.md` is written so none
  are ever needed (blink fires over idle only).

## Differentiation — Mabel vs Jolly (IP law)

Mabel must read VERY reminiscent of the Jolly render language but
unmistakably its own character. Six owned deltas, all locked at
rev-2; every future Mabel prompt carries them + Block C verbatim.
Base all Mabel work on OUR `mochi-reboot` masters — never use a
`jolly-*` image as a generation/edit reference. (Asset slugs keep
the `mochi-*` working name for stability; the character's name is
Mabel everywhere it is shown or documented.)

| # | Trait | Jolly (reference language) | Mabel (owned) | rev-2 evidence |
|---|---|---|---|---|
| 1 | `fur_shade` | Oatmeal-cream `#F1E7D4` | Muted rose-taupe, mid `#A2766B` (`#926A60`–`#C69C8F`) | Sampled from idle master |
| 2 | Eyes (`facial_features`) | Small beads, set wide | LARGER beads, set CLOSER + HIGHER, one highlight each | Pose sheet v2 |
| 3 | Smile (`facial_features`) | One thin dark curve | WIDER warm closed curve, upturned ends, `#805446` | Pose sheet v2 |
| 4 | Blush (`facial_features`) | Soft diffused circles | LARGER circles, LOWER + more OUTWARD, `#E2B7A4` | Pose sheet v2 |
| 5 | Accessories | Varies per shot (costume/prop) | TWO fixed traits: plain pink pouch + pink nurse cap w/ white cross | All 3 poses |
| 6 | Plate | Porcelain `#FBF2E2` | Warm-cream porcelain `#F5E0C8` | Sampled forehead |

Rules:

- A Mabel render passes only if deltas 1–5 ALL hold (6 is a tint
  shift, checked by sampling). Fail one = regenerate, never ship.
- Accessories never touch the face plate (cap sits on the fur
  hood, upper-left; pouch on the belly).
- One accessory set per character, fixed across all its poses.
- Subtle traits are code-motion or single-feature tweaks only —
  they must not break bbox/anchor matching with the idle pose.
- A new row ships only with its own master reference, turnaround,
  key poses, and full validation-gate pass.

## Roster matrix (future cast — invented; Supabase-aligned columns)

Column names below match the future Supabase Patient Database
patient table: `name`, `persona`, `fur_shade`,
`facial_features`, `accessories/clothing` of the future patient table. Schema sketch
only — NO database work exists or is ordered this run. Every future
patient shares Mabel's Block C render language (face rules, no
outline) and differs ONLY by the persona/fur/face/accessory
columns, following the refs' costume/prop/context pattern [R].
Fur tints stay in Mabel's muted rose-taupe family so the cast
reads as one game; strong color lives in the accessory. No second
body plan, no new species without a bible amendment.

| name | persona | fur_shade | facial_features | accessories/clothing |
|---|---|---|---|---|
| Mabel (SHIPS) | Warm returning patient; the Living Chart made visible | Rose-taupe `#A2766B` | Larger closer-higher beads; wide warm smile; lower-outer blush | Pink belly pouch + pink nurse cap w/ white cross (fixed) |
| June (idle current) | Gentle first-timer, slightly shy | Honey-taupe `#C4A484` | Slightly larger blush, gentle | Sage head-scarf |
| Milo (idle current) | Curious kid, asks questions | Porcelain-taupe `#CDB9A8` | Curious head-tilt in idle (motion) | Round slate glasses (prop, never face paint) |
| Theo (SHIPS) | Sleepy toddler, slow blinks | Cocoa-taupe `#8F7364` | Sleepier blink cadence (motion: 220ms/2–3.5s) | Butter-yellow knit cap (fixed; never touches face) |
| Dr. Nora (reserved) | Reassuring AI colleague doctor | Rose-taupe `#A2766B` | Reassuring half-smile | White coat + sage scrubs (outfit, same silhouette) |
