import { describe, expect, it } from 'vitest';
import { isSfxMuted, setSfxMuted, SFX_NOTES } from './sfx';
import type { SfxName } from './sfx';

describe('cozy synth', () => {
  it('scores four short cues in a warm register', () => {
    const names = Object.keys(SFX_NOTES) as SfxName[];
    expect(names).toEqual(['correct', 'wrong', 'coin', 'fanfare']);
    for (const name of names) {
      const notes = SFX_NOTES[name];
      expect(notes.length).toBeGreaterThanOrEqual(2);
      let end = 0;
      for (const n of notes) {
        expect(n.f).toBeGreaterThanOrEqual(100);
        expect(n.f).toBeLessThanOrEqual(2000);
        expect(n.d).toBeGreaterThan(0);
        end = Math.max(end, n.t + n.d);
      }
      // Every cue lands in under half a second.
      expect(end).toBeLessThanOrEqual(0.5);
    }
  });

  it('toggles mute', () => {
    setSfxMuted(true);
    expect(isSfxMuted()).toBe(true);
    setSfxMuted(false);
    expect(isSfxMuted()).toBe(false);
  });
});
