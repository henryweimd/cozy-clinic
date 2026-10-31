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
  Priya: 'priya',
  Ellis: 'ellis',
  Nina: 'nina',
  Kai: 'kai',
  Ada: 'ada',
  Felix: 'felix',
};

export function spritePrefix(name: string): string | undefined {
  return SPRITE_PREFIX[name];
}

/** Expression frames every playable sprite ships. */
export const SPRITE_FRAMES = ['idle', 'blink', 'happy', 'sick', 'pained', 'relieved'] as const;

/** Eyes-closed ms per blink (ANIMATION.md default 120). */
export function blinkCloseMs(name: string): number {
  if (name === 'Theo') return 220;
  if (name === 'Ellis') return 160;
  return 120;
}

/** [min, max] ms between blinks (ANIMATION.md default 3000-5000). */
export function blinkGapMs(name: string): [number, number] {
  return name === 'Theo' ? [2000, 3500] : [3000, 5000];
}

/**
 * Idle-bob angular speed in rad/s (ANIMATION.md default 1.8).
 * Priya bounces eager; Ellis sways slow and calm.
 */
export function bobRate(name: string): number {
  if (name === 'Priya') return 2.3;
  if (name === 'Ellis') return 1.4;
  if (name === 'Kai') return 2.2;
  if (name === 'Nina') return 1.9;
  if (name === 'Ada') return 1.6;
  if (name === 'Felix') return 1.5;
  return 1.8;
}
