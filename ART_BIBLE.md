# ART_BIBLE.md — Little Lives: Cozy Clinic

The law for every asset. No asset enters the game unless it matches this
file and its character's master reference, and has passed validation
(dimensions, alpha, alignment, contact sheet, in-game render check).

> DIRECTION REBOOT — 2026-10-29. The old "plush room" direction
> (background and props in the same soft sculpted plush language as
> Mabel, thin warm-brown outline on everything, painted plush
> room-shell, `no photorealism` ban) is SUPERSEDED as of this date.
> It is preserved in git history only. The new direction below is
> authoritative: 3D Jolly-style mascots on clean modern photorealistic
> clinic backdrops. Grounded in recon of 13 Jolly reference images
> (all readable; evidence cited inline as [R]).

## Vision (locked for this chunk and all later phases)

- CHARACTERS are animated 3D Jolly-style mascots: soft 3D clay/Pixar-like
  render, dense short-pile oatmeal fleece body, smooth matte porcelain
  face plate, chibi egg/bean proportions, bead eyes + blush + one-curve
  smile. The mascot is the ONLY plush thing on screen [R].
- BACKDROP is a modern photorealistic minimal clinic: clean
  hard-surface 3D or photographic plates (light walls, pale wood floor,
  simple modern furniture), generous negative space — explicitly NOT
  fuzzy, NOT plush, NOT outlined [R].
- Clean, obvious, minimal: every graphic instantly readable at phone
  size. Minimalism is deliberate — the focus stays on the character
  and the relevant objects. Empty space is fine; flat, mismatched,
  unfinished space is not.
- Finish quality is the bar: clean silhouettes, soft grounding
  shadows, nothing floating, overflowing, or straddling lines.
  Nothing ships looking placeholder or amateur.

## Fixed style blocks (verbatim in EVERY image prompt)

Character prompts carry block C verbatim; backdrop prompts carry
block B verbatim. Never mix them; never drop the negative clauses.

> BLOCK C — CHARACTER (verbatim):
> Soft 3D animated mascot character, chibi egg-shaped body, head and
> body merged with no neck, dense short-pile oatmeal-cream fleece fur
> with visible fur strands and soft volumetric shading, smooth matte
> porcelain face plate inset into the fur, small round glossy black
> bead eyes with white highlight dots set wide, soft diffused pink
> blush circles, one thin dark curved smile, stubby mitten arms and
> nub legs, no fingers or toes, no outline or line art of any kind,
> no cel shading, soft rim light, soft floor shadow, full body,
> centered, plain solid warm-white studio void background, game sprite.
> No text, no busy background, no extra limbs, no open mouth,
> no outline, no flat 2D, no neon colors, no clutter.

> BLOCK B — BACKDROP (verbatim):
> Modern photorealistic minimal clinic interior, clean hard surfaces,
> light neutral walls, pale wood floor, simple modern furniture,
> soft daylight, gentle grounding shadows, generous negative space,
> vertical 9:16 composition, no characters, no plush or fuzzy
> surfaces anywhere, no outline or line art, no text, no clutter.

> BLOCK U — UI ILLUSTRATION (verbatim, proposed 2026-10-29, operator
> to lock): Soft flat cozy illustration, rounded shapes, matte
> texture, warm cream background, restrained pastel palette, gentle
> daylight, thin warm-brown outlines only, centered, generous
> negative space. No text, no words, no letters, no numbers, no
> photorealism, no 3D render look, no clutter, no scary imagery.

## Palette (exact hex)

Mascot palette (sampled from refs [R]; spirit-compatible with the
old creams, shifted oatmeal-neutral):

| Swatch | Hex | Use |
|---|---|---|
| Fur oatmeal | `#F1E7D4` | Mascot body fur (midpoint of `#F3EAD9`–`#EFE3D0`) |
| Face plate cream | `#FBF2E2` | Smooth face plate (between `#FBF0DC`–`#FFF6E8`) |
| Bead-eye near-black | `#1A1512` | Eyes |
| Blush pink | `#F6B8C1` | Cheeks (soft, diffused, almost always present) |
| Mouth cocoa | `#3A2E2A` | Smile curve |
| Studio void | `#FAF5EC` | Source-art character backdrops |

Photoreal clinic neutrals (backdrops; clean, NOT plush):

| Swatch | Hex | Use |
|---|---|---|
| Clinic wall | `#F4F1EA` | Walls, light neutrals |
| Clinic floor pale wood | `#E4CFA8` | Floor plates |
| Clinic accent sage | `#A9C6A2` | Scrubs, plants, calm accents |
| Clinic accent sky | `#A9CCE3` | Blankets, UI, daytime accents |
| Text cocoa | `#5C4633` | All in-game text |

Rules: all saturated color lives in props/outfits only [R]
(old blazer-yellow `#FFD21F` / Trip-blue `#1A56DB` class of accents).
Nothing neon, nothing dark or moody, nothing high-contrast or loud.
NO outline color exists in this direction — there is no outline [R].

## Character proportions

- Chibi egg/bean: head + body merged, no neck, ~1:1 head-to-body;
  the face dominates the upper half [R].
- Plump torso; stubby mitten arms, nub legs; no fingers, no toes,
  no sharp angles, no spindly limbs [R].
- Outfit/accessory is part of the silhouette and must not change
  between views of the same character.

## Face rules

- Small round glossy black bead eyes (`#1A1512`), wide-set, one
  white highlight dot each. Variants: closed happy curves
  (`^ ^`), single wink — never an open mouth [R].
- Soft diffused pink blush circles (`#F6B8C1`), almost always
  present (may go faintest in formal/costumed shots) [R].
- One thin dark curved smile (`#3A2E2A`), never open [R].
- Faces carry almost all expression; one small change (eyes, mouth,
  blush) must read instantly at phone size.

## Outline

- NONE. Form is defined entirely by fur shading/AO and the
  face-plate edge. No line art of any color or weight on any
  character, prop, or backdrop [R].

## Camera, lighting, composition

- Camera: slightly elevated 2.5D (front view with a hint of floor).
- Lighting: soft daylight, upper left; one gentle highlight per
  form; soft rim light + soft floor shadow on mascots [R].
- Composition: one focal character per shot; plain warm-white void
  in character source art; clean minimal plates in backdrops;
  generous negative space. If a scene feels busy, remove something.

## Asset specs

Mascot sprites:

- Sizes: 192×192 px per key pose (128×128 allowed for distant
  variants); consistent foot anchor (feet at bottom-center,
  grounded); consistent scale per character.
- Frame padding: ≥8 px clear space inside the frame on all sides.
- Transparent background in game-ready exports (alpha verified
  programmatically, never trusted from the generator).
- Naming: `public/assets/characters/<name>-<state>.png`
  (e.g. `mabel-idle.png`; shipped slugs keep the `mochi-*`
  working name for stability — see the manifest rename note).
- Display geometry (survives the reboot [R]): Mabel 212 px display
  size centered at (270,614), feet on GROUND=724; shadow ellipse
  under feet; nametag below on the rug zone.

Background plates (540×960 canvas, 2x 1080×1920 exports allowed):

- Format: exact 9:16, photorealistic or clean hard-surface 3D —
  never plush, never outlined, no characters, no text [R].
- Landmark contract (survives the reboot [R]): SIDE=24 outer
  margins; GROUND=724 (mascot/prop feet line); bubble 492 wide
  docked at bottom 936 sizing upward; mascot footprint zone
  (x164–376 at GROUND) kept clear of furniture.
- Props sit feet-anchored on GROUND via origin (0.5,1); corner
  anchors keep ≥24 px side margins and a clear walking gap to
  the mascot box.
- NOTE: P5 warm overlays (cream gradient + warm-brown vignette)
  were tuned for a painted room and must be re-tuned against
  photo/clean plates [R].

## Validation gate (every asset, no exceptions)

1. Dimensions: exact size class (192² mascot / 9:16 plate).
2. Alpha: mascot corners transparent, padding ≥8 px, bbox sane vs
   the character's idle; plates fully opaque RGB, no characters.
3. Alignment: foot anchor bottom-center; feet land on GROUND=724
   in composite; mascot footprint clear of furniture.
4. Contact sheet: idle/blink/happy (+alpha-checker row) for
   characters; plain + mascot-composite panels for plates/props.
5. In-game render check: deployed URL playtested at phone size —
   readable, grounded, no overflow, no wash-out, no flicker.

## Pipeline (summary; brief Section 5 is canonical)

Concepts → master reference per character (studio folder only) →
turnaround with reference attached → key poses → cutout →
programmatic validation → contact sheet → in-game render check.
Key poses only from the image model; all motion is built in code
(see `docs/ANIMATION.md`). Masters live in the studio folder
(`art/source/`); the repo holds game-ready exports only, under
`public/assets/`.

## Appendix: plate library registry (backdrop director, 2026-10-29)

Operator order: additional backdrops for the various settings +
multiple alternatives. Library cap: AT MOST 8 plates — 4
settings × 2 variants. Clean minimal photorealistic style; every
plate MUST read as a modern INVITING wellness clinic, never a
generic office. This appendix is SPEC ONLY — no images were
generated and no scene code was touched this run.

### Shared contract (all 8 plates)

- Format: 540×960 canvas, 2x 1080×1920 exports under
  `public/assets/room/`; masters under `art/source/room-reboot/`.
  Fully opaque RGB, exact 9:16.
- Prompt law: each generation prompt = the plate's prefix below +
  BLOCK B verbatim (never mixed, never dropped). Prefixes carry
  "empty of people" as reinforcement; Block B's no-characters /
  no-plush / no-outline / no-text / no-clutter clauses do the
  rest.
- Palette bounds (measured from the shipped plate
  `public/assets/room/clinic-shell-reboot-01.png`, 540-space
  bands; new plates verify the same way): wall lit `#D3CCC5` /
  top `#B7ACA0`, floor lit `#D7C1AA` / shade `#AA9178`, wood
  `#C8A583`, rug `#DAC7B3`, foliage `#655C47` — corresponding
  band means within ±14 per channel. Grade toward the bible
  neutrals (`#F4F1EA` walls / `#E4CFA8` floor) where the
  generator allows; saturated color lives in small props only.
- Clear zones (540×960, SAME landmark contract as the shipped
  plate, so any plate works under any view): y0–136 title/chrome
  band = flat calm wall (window glass ONLY x490+ y95–199, clear
  of the title zone x150–390 y28–84 and top bar y0–32);
  y136–356 panel band = flat calm wall; y376–412 HUD/LIVE band =
  calm wall, no high-contrast edges; mascot footprint x164–376
  y508–720 clear of furniture, GROUND=724 on rug/floor;
  wall-floor boundary ~672–696 center, rug top ~712; card rows
  (Visit y796–876, Telemed y736–816) and nav strip y888–960 =
  floor/rug only; SIDE=24 margins. Visible art/furniture zone:
  y412–508 band + side lanes x24–164 / x376–516 y508–720.
  Waiting/Portal opaque sheets (x24–516 y136–876) cover center —
  plates still honor the full contract so margin/top/bottom
  slivers read calm and any future layout works.
- Wellness-no-office rule: every plate carries ≥2 cues from
  {warm wood, soft daylight, live plant, rounded furniture, calm
  abstract wall art}. NEVER people, NEVER text/signage/logos,
  NEVER office cues (blinds, cubicles, fluorescents, clutter,
  dark/moody). Wall prints: small (≤90px wide), thin
  light-wood frame, abstract only, in the visible zone.
- Validation: the same 5-gate (dimensions, opaque + no
  characters, GROUND/footprint fit, contact sheet plain +
  mascot-composite panels, in-game render check at phone size).

### The 8 plates

| Slug | File (`public/assets/room/`) | View | Variant | Status |
|---|---|---|---|---|
| `exam-a` | `clinic-shell-reboot-01.png` | Visit | A default | SHIPPED (manifest `backgrounds[]` reboot entry; prompt on record) |
| `exam-b` | `clinic-exam-b.png` | Visit | B alt | SPEC — generate |
| `waiting-a` | `clinic-waiting-a.png` | Waiting | A default | SPEC — generate |
| `waiting-b` | `clinic-waiting-b.png` | Waiting | B alt | SPEC — generate |
| `telemed-a` | `clinic-telemed-a.png` | Telemed | A default | SPEC — generate |
| `telemed-b` | `clinic-telemed-b.png` | Telemed | B alt | SPEC — generate |
| `portal-a` | `clinic-portal-a.png` | Portal | A default | SPEC — generate |
| `portal-b` | `clinic-portal-b.png` | Portal | B alt | SPEC — generate |

`exam-a` (Visit default — SHIPPED, stays): exam room, bench
left, plant + cabinet right, high window upper-right, round rug.
Wellness cues: warm bench wood, morning daylight shaft, live
plant, woven rug. No new art.

`exam-b` (Visit alt): opposite-corner exam-room arrangement.
Prefix: "Cozy modern pediatric clinic exam room photographed in
soft morning daylight, alternate arrangement: a low modern
wooden cabinet with a neatly folded sky-blue blanket on top
against the left wall, a small rounded wooden exam stool beside
it, a tall leafy green plant in a cream pot in the right corner,
pale wood floor, a flat oval woven natural rug centered on the
floor, one small calm abstract print of soft sage arcs in a thin
light-wood frame on the left wall, a high narrow window at the
upper right, the center floor kept completely empty for a
standing character, the upper wall band kept clear and empty for
a title, empty of people." Cues: warm wood (cabinet + stool),
daylight, live plant, sage wall art.

`waiting-a` (Waiting default): waiting lounge. Prefix: "Clean
minimal pediatric clinic waiting lounge photographed in soft
daylight: two small rounded armchairs with smooth cream
upholstery angled at the left and right edges, a low round
light-oak side table between them with one tiny succulent, a
potted olive tree in the right corner, pale wood floor, a flat
round woven cream rug centered on the floor, one small calm
abstract print of a soft sky wash in a thin light-wood frame on
the wall, a high narrow window at the upper right, the center
floor kept completely empty for a standing character, the upper
wall band kept clear and empty for a title, empty of people."
Cues: rounded chairs, warm oak table, olive tree + succulent,
sky-wash art.

`waiting-b` (Waiting alt): bench lounge. Prefix: "Clean minimal
pediatric clinic waiting lounge photographed in soft daylight,
alternate arrangement: a long low light-oak bench with two
smooth sage cushions along the left wall, a small round side
table with a tiny fern on the right, a tall potted plant in the
left corner, pale wood floor, a flat oval woven natural rug
centered on the floor, one small calm abstract print of soft
peach arcs in a thin light-wood frame on the right wall, a high
narrow window at the upper right, the center floor kept
completely empty for a standing character, the upper wall band
kept clear and empty for a title, empty of people." Cues: warm
bench wood, daylight, two live plants, peach-arc art.

`telemed-a` (Telemed default): studio corner. Prefix: "Soft
modern telemedicine studio corner in a pediatric wellness clinic
photographed in soft daylight: one rounded cream armchair with a
small folded amber throw at the left edge, a small round oak
side table with a tiny succulent beside it, a modern arc floor
lamp with a warm rounded shade on the right, a small potted
plant in the right corner, pale wood floor, a flat round woven
cream rug centered on the floor, one small calm abstract print
of soft sky-and-sage waves on the wall, a high narrow frosted
window at the upper right, the center floor kept completely
empty for a standing character, the upper wall band kept clear
and empty for a title, empty of people." Cues: rounded armchair,
warm lamp glow + daylight, live plants, wave art.

`telemed-b` (Telemed alt): credenza corner. Prefix: "Soft modern
telemedicine studio corner in a pediatric wellness clinic
photographed in soft daylight, alternate arrangement: a low
light-oak credenza with two small potted plants and neatly
folded sage and sky blankets on the right, one rounded cream
chair at the left edge, a tall leafy plant in the left corner,
pale wood floor, a flat oval woven natural rug centered on the
floor, one small calm abstract print of soft green hills on the
wall, a high narrow frosted window at the upper right, the
center floor kept completely empty for a standing character, the
upper wall band kept clear and empty for a title, empty of
people." Cues: warm credenza wood, daylight, three live plants,
hill art.

`portal-a` (Portal default): wellness nook. Prefix: "Calm
wellness reading nook in a pediatric clinic photographed in soft
daylight: one low rounded cream armchair at the left edge, a
small round light-oak side table with a tiny trailing plant
beside it, a low oak shelf with folded cream and sage blankets
and one small plant on the right, pale wood floor, a flat round
woven cream rug centered on the floor, one small calm abstract
print of a soft sunrise arc on the wall, a high narrow window at
the upper right, the center floor kept completely empty for a
standing character, the upper wall band kept clear and empty for
a title, empty of people." Cues: rounded armchair, warm oak,
trailing + shelf plants, sunrise art.

`portal-b` (Portal alt): rocker nook. Prefix: "Calm wellness
reading nook in a pediatric clinic photographed in soft daylight,
alternate arrangement: a rounded modern light-oak rocking chair
with a smooth cream cushion at the left edge, a small round side
table with a tiny fern on the right, a tall potted fern in the
right corner, pale wood floor, a flat oval woven natural rug
centered on the floor, one small calm abstract print of soft
blue rain arcs on the wall, a high narrow window at the upper
right, the center floor kept completely empty for a standing
character, the upper wall band kept clear and empty for a title,
empty of people." Cues: warm rocker wood, daylight, two ferns,
rain-arc art.

### Per-view wiring rule (for the integrator; no code this run)

- Each view shows its setting plate: Visit → exam, Waiting →
  waiting, Telemed → telemed, Portal → portal.
- B alternates rotate in by visit-count parity: variant =
  even visitNo → A, odd visitNo → B. The opener (visitNo 4)
  shows all A (`exam-a` = shipped plate); visit 5 shows all B —
  both variants surface in normal play as visits increment.
- One-line pin: an override map (e.g. `PLATE_PIN = { visit:
  'exam-b' }`; empty = parity rule) pins any view to any plate
  with one line; unpinned views keep rotating.
- Transitions ride the existing 180/150 view fades; texture keys
  `plate-<slug>`; all 8 plates preload locally and any missing
  plate falls back to `exam-a`, so the demo path stays fully
  offline.
