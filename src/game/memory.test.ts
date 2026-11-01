import { describe, expect, it } from 'vitest';
import { followupLine, isMemoryMap, memoryLine, recordMemory } from './memory';

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
  it('records immutably, perfect at 4', () => {
    const map = recordMemory({}, 'Milo', 4);
    expect(map).toEqual({ Milo: { score: 4, perfect: true } });
    const next = recordMemory(map, 'June', 3);
    expect(map).toEqual({ Milo: { score: 4, perfect: true } });
    expect(next.June).toEqual({ score: 3, perfect: false });
  });

  it('keeps the visit pearl as the follow-up thread when given', () => {
    const map = recordMemory({}, 'Milo', 3, 'Cough + sniffles: a virus');
    expect(map.Milo).toEqual({ score: 3, perfect: false, pearl: 'Cough + sniffles: a virus' });
  });

  it('keeps held ease across visits', () => {
    const map = recordMemory({ Milo: { score: 2, perfect: false, ease: 8 } }, 'Milo', 4);
    expect(map.Milo).toEqual({ score: 4, perfect: true, ease: 8 });
  });
});

describe('followupLine', () => {
  it('stays silent without a remembered pearl', () => {
    expect(followupLine(undefined)).toBeNull();
    expect(followupLine({ score: 3, perfect: false })).toBeNull();
    expect(followupLine({ score: 3, perfect: false, pearl: '' })).toBeNull();
  });

  it('recalls the thread, never claiming health states', () => {
    const line = followupLine({ score: 3, perfect: false, pearl: 'Cough + sniffles: a virus' });
    expect(line).toBe('Last time we learned: Cough + sniffles: a virus');
    expect('Last time we learned: ').not.toMatch(/better|worse|cured|sick/i);
  });
});

describe('isMemoryMap', () => {
  it('accepts saved shapes, rejects junk', () => {
    expect(isMemoryMap({})).toBe(true);
    expect(isMemoryMap({ Milo: { score: 2, perfect: false } })).toBe(true);
    expect(isMemoryMap({ Milo: { score: 2, perfect: false, pearl: 'a virus' } })).toBe(true);
    expect(isMemoryMap(null)).toBe(false);
    expect(isMemoryMap([])).toBe(false);
    expect(isMemoryMap({ Milo: { score: 'x', perfect: false } })).toBe(false);
    expect(isMemoryMap({ Milo: { score: 2, perfect: false, pearl: 7 } })).toBe(false);
  });
});
