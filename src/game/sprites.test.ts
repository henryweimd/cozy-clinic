import { describe, expect, it } from 'vitest';
import { MOCK_ROSTER } from '../ui/mockData';
import { blinkCloseMs, blinkGapMs, SPRITE_FRAMES, spritePrefix } from './sprites';

describe('sprite roster parity', () => {
  it('gives every rostered patient a sprite prefix', () => {
    expect(MOCK_ROSTER.length).toBeGreaterThan(0);
    for (const entry of MOCK_ROSTER) {
      // No prefix = elegant-rings placeholder + "still napping".
      expect(spritePrefix(entry.name), `${entry.name} has no sprite prefix`).toBeDefined();
    }
  });

  it('ships six expression frames per sprite', () => {
    expect([...SPRITE_FRAMES]).toEqual(['idle', 'blink', 'happy', 'sick', 'pained', 'relieved']);
  });

  it('blinks the cast per ANIMATION.md, Theo sleepier', () => {
    expect(blinkCloseMs('Milo')).toBe(120);
    expect(blinkGapMs('Milo')).toEqual([3000, 5000]);
    expect(blinkCloseMs('Theo')).toBeGreaterThan(blinkCloseMs('Milo'));
    const [lo, hi] = blinkGapMs('Theo');
    expect(lo).toBeLessThan(3000);
    expect(hi).toBeLessThanOrEqual(5000);
  });
});
