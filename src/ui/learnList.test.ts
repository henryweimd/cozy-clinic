import { describe, expect, it } from 'vitest';
import { filedTopics, resourcesFor } from './learnList';

describe('resourcesFor', () => {
  it('finds each condition\'s authoritative rows', () => {
    for (const id of ['asthma', 'dehydration', 'viral-respiratory', 'hypertension']) {
      const rows = resourcesFor(id);
      expect(rows.length).toBeGreaterThan(0);
      for (const r of rows) {
        expect(r.url).toMatch(/^https:\/\//);
        expect(r.source.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('card summaries', () => {
  it('pre-caches a bounded summary on every resource', () => {
    for (const id of ['asthma', 'dehydration', 'viral-respiratory', 'hypertension']) {
      for (const r of resourcesFor(id)) {
        expect(r.summary.length).toBeGreaterThan(40);
        // Card budget: 7 wrapped lines max (auditor mirrors).
        expect(r.summary.length).toBeLessThanOrEqual(600);
      }
    }
  });
});

describe('filedTopics', () => {
  it('accumulates in visit order and never drops older topics', () => {
    const one = filedTopics([{ id: 'asthma', name: 'Asthma' }]);
    expect(one.length).toBeGreaterThan(0);
    const two = filedTopics([
      { id: 'asthma', name: 'Asthma' },
      { id: 'dehydration', name: 'Dehydration' },
    ]);
    // Every older topic survives, first, with its filing name.
    expect(two.length).toBeGreaterThan(one.length);
    expect(two.slice(0, one.length)).toEqual(one);
    expect(two[0]?.conditionName).toBe('Asthma');
    expect(two[two.length - 1]?.conditionName).toBe('Dehydration');
  });

  it('files nothing for an empty visit history', () => {
    expect(filedTopics([])).toEqual([]);
  });
});
