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
