# CHARACTER_BIBLE.md — Little Lives: Cozy Clinic

Cast law. Companion to `ART_BIBLE.md` (render rules) and
`docs/ANIMATION.md` (motion rules). Only Mochi ships this run;
every other row is a reserved design, not an asset order.

Source of truth for the Jolly look: recon of 13 reference images
(all readable): soft 3D clay/Pixar-like render, oatmeal fleece
body + porcelain face plate, chibi egg/bean 1:1, bead eyes +
blush + one-curve smile, NO outline, saturated color in
props/outfits only. All 13 refs show ONE identical character —
differentiation by costume/prop/context only — so the multi-patient
cast below is invented, not copied [R].

## Mochi — redesign brief (Jolly style, ships this run)

- Species/silhouette: chibi egg/bean mascot, head+body merged, no
  neck; stubby mitten arms, nub legs; the face dominates the upper
  half.
- Render: Block C verbatim (see `ART_BIBLE.md`): dense short-pile
  oatmeal fur `#F1E7D4`, smooth matte porcelain face plate
  `#FBF2E2`, bead eyes `#1A1512` with white highlights, blush
  `#F6B8C1`, smile `#3A2E2A`. No outline, no cel shading.
- Signature trait: small pink pouch on the belly (P3 noted a white
  cross emblem on the happy pose — keep the pouch shape identical
  across poses; the emblem stays only if it survives the Jolly
  redesign validation, else the pouch reads plain).
- Role: the returning patient who opens the demo; warm, familiar,
  the Living Chart made visible.
- Poses this run: idle, blink, happy (see `docs/ANIMATION.md`).
  Same 192×192 class, same foot anchor, bbox within 2 px of idle
  on all sides.

## Roster differentiation matrix (future cast — invented)

Every future patient shares Mochi's Jolly render language (Block C,
face rules, no outline) and differs ONLY by the three columns below,
following the refs' costume/prop/context pattern [R]. Fur tints stay
within the oatmeal-cream family so the cast reads as one game; strong
color lives in the accessory. No second body plan, no new species
without a bible amendment.

| Character | Fur tint | Distinguishing feature (accessory/prop) | Subtle trait |
|---|---|---|---|
| Mochi (SHIPS) | Oatmeal `#F1E7D4` | Pink belly pouch | Warm returning-patient smile |
| Patient 2 (reserved) | Honey `#EDD9B8` | Sage head-scarf | Slightly larger blush, gentle |
| Patient 3 (reserved) | Porcelain `#F5EEE0` | Round slate glasses (prop, never face paint) | Curious head-tilt in idle |
| Patient 4 (reserved) | Cocoa `#E0C9A8` | Butter-yellow knit cap | Sleepier blink cadence |
| Dr. colleague (reserved) | Oatmeal `#F1E7D4` | White coat + sage scrubs (outfit, same silhouette) | Reassuring half-smile |

Rules:

- One accessory per character, fixed across all its poses.
- Accessories never touch the face plate (no painted-on glasses,
  hats, or marks on the face).
- Subtle traits are code-motion or single-feature tweaks only —
  they must not break bbox/anchor matching with the idle pose.
- A new row ships only with its own master reference, turnaround,
  key poses, and full validation-gate pass.
