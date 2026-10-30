import { describe, expect, it } from 'vitest';
import { isMemoryMap, memoryLine, recordMemory } from './memory';

describe('memoryLine', () => {
  it('stays silent with no memory', () => {
    expect(memoryLine(undefined)).toBeNull();
  });

  it('thanks the player at every level, never claiming health states', () => {
    expect(memoryLine({ score: 3, perfect: true })).toBe('You got everything right last time!');
    expect(memoryLine({ score: 2, perfect: false })).toBe('Thanks for helping last time!');
    expect(memoryLine({ score: 0, perfect: false })).toBe("I'm glad you're my doctor.");
    for (const m of [
      { score: 3, perfect: true },
      { score: 2, perfect: false },
      { score: 1, perfect: false },
    ]) {
      expect(memoryLine(m)).not.toMatch(/better|worse|cured|sick/i);
    }
  });
});

describe('recordMemory', () => {
  it('records immutably, perfect at 3', () => {
    const map = recordMemory({}, 'Milo', 3);
    expect(map).toEqual({ Milo: { score: 3, perfect: true } });
    const next = recordMemory(map, 'June', 1);
    expect(map).toEqual({ Milo: { score: 3, perfect: true } });
    expect(next.June).toEqual({ score: 1, perfect: false });
  });
});

describe('isMemoryMap', () => {
  it('accepts saved shapes, rejects junk', () => {
    expect(isMemoryMap({})).toBe(true);
    expect(isMemoryMap({ Milo: { score: 2, perfect: false } })).toBe(true);
    expect(isMemoryMap(null)).toBe(false);
    expect(isMemoryMap([])).toBe(false);
    expect(isMemoryMap({ Milo: { score: 'x', perfect: false } })).toBe(false);
  });
});
