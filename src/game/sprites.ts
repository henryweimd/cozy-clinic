/**
 * Playable-cast sprite roster (pure, unit-tested). Display name ->
 * texture prefix: Mabel keeps the `mabel-*` keys (files stay
 * `mochi-*` for stability); everyone else uses their own name.
 * Per-patient blink motion lives here too — Theo is the sleepy
 * toddler, so his eyes close longer and more often.
 */

export const SPRITE_PREFIX: Record<string, string> = {
  Mabel: 'mabel',
  June: 'june',
  Milo: 'milo',
  Theo: 'theo',
};

export function spritePrefix(name: string): string | undefined {
  return SPRITE_PREFIX[name];
}

/** Expression frames every playable sprite ships. */
export const SPRITE_FRAMES = ['idle', 'blink', 'happy', 'sick', 'pained', 'relieved'] as const;

/** Eyes-closed ms per blink (ANIMATION.md default 120). */
export function blinkCloseMs(name: string): number {
  return name === 'Theo' ? 220 : 120;
}

/** [min, max] ms between blinks (ANIMATION.md default 3000-5000). */
export function blinkGapMs(name: string): [number, number] {
  return name === 'Theo' ? [2000, 3500] : [3000, 5000];
}
