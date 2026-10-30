import { describe, expect, it } from 'vitest';
import { EXAM_TOOLS } from './toolTrays';
import { MOCK_FEED, nextFeedLine, tickerVisible } from './ticker';
import { memoryBeads } from './livingChart';
import { resourcesFor } from './learnList';

/** G3 pure-logic tests (the Phaser shells verify in-game). */
describe('G3 modules', () => {
  it('rotates the ticker feed with wraparound', () => {
    const first = nextFeedLine(MOCK_FEED, 0);
    expect(first.line).toBe(MOCK_FEED[0]);
    const wrap = nextFeedLine(MOCK_FEED, MOCK_FEED.length);
    expect(wrap.line).toBe(MOCK_FEED[0]);
    expect(wrap.cursor).toBe(1);
    expect(nextFeedLine([], 9)).toEqual({ line: '', cursor: 0 });
  });

  it('shows the ticker unless toggled off or telemed', () => {
    expect(tickerVisible('visit', true)).toBe(true);
    expect(tickerVisible('waiting', true)).toBe(true);
    expect(tickerVisible('telemed', true)).toBe(false);
    expect(tickerVisible('visit', false)).toBe(false);
    expect(tickerVisible('telemed', false)).toBe(false);
  });

  it('ships 4 exam tools with unique ids', () => {
    expect(EXAM_TOOLS).toHaveLength(4);
    const ids = EXAM_TOOLS.map((t) => t.id);
    expect(new Set(ids).size).toBe(4);
  });

  it('takes the last 5 memory beads, oldest-first', () => {
    expect(memoryBeads('')).toEqual([]);
    expect(memoryBeads('First visit: wheezy.')).toEqual(['First visit: wheezy']);
    const many = [1, 2, 3, 4, 5, 6, 7].map((n) => `beat ${n}`).join('. ');
    expect(memoryBeads(many)).toEqual([
      'beat 3',
      'beat 4',
      'beat 5',
      'beat 6',
      'beat 7',
    ]);
  });

  it('files one resource per condition offline', () => {
    for (const id of ['asthma', 'viral-respiratory', 'dehydration', 'hypertension']) {
      const rows = resourcesFor(id);
      expect(rows.length).toBeGreaterThanOrEqual(1);
      for (const r of rows) expect(r.condition_id).toBe(id);
    }
    expect(resourcesFor('nope')).toEqual([]);
  });
});
