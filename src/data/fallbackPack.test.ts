import { describe, expect, it } from 'vitest';
import {
  FALLBACK_EDGES,
  FALLBACK_NODES,
  FALLBACK_PATIENTS,
  FALLBACK_RESOURCES,
  FALLBACK_TREATMENTS,
} from './fallbackPack';

/**
 * The fallback pack is the committed offline snapshot of the H2
 * Supabase seed. These tests pin its shape so a bad export fails
 * loudly instead of shipping a broken offline demo.
 */
describe('fallback pack (H2 seed snapshot)', () => {
  it('holds the full 32-patient cast', () => {
    expect(FALLBACK_PATIENTS).toHaveLength(32);
    const names = FALLBACK_PATIENTS.map((p) => p.name);
    expect(names).toContain('Mabel');
    expect(new Set(names).size).toBe(32);
  });

  it('covers 3 age bands x 24 conditions', () => {
    const bands = new Set(FALLBACK_PATIENTS.map((p) => p.age_band));
    const conds = new Set(FALLBACK_PATIENTS.map((p) => p.condition_id));
    expect(bands.size).toBe(3);
    expect(conds.size).toBe(24);
  });

  it('holds 544 nodes with valid stages and vitals', () => {
    expect(FALLBACK_NODES).toHaveLength(544);
    const patientIds = new Set(FALLBACK_PATIENTS.map((p) => p.id));
    for (const n of FALLBACK_NODES) {
      expect(patientIds.has(n.patient_id)).toBe(true);
      expect(n.stage_index).toBeGreaterThanOrEqual(0);
      expect(n.stage_index).toBeLessThanOrEqual(3);
      expect(n.depth).toBeGreaterThanOrEqual(0);
      expect(n.depth).toBeLessThanOrEqual(2);
      for (const v of [n.vitals.energy, n.vitals.comfort, n.vitals.breathing]) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(10);
      }
      expect(n.narrative.length).toBeGreaterThan(0);
      expect(n.teaching.length).toBeGreaterThan(0);
    }
  });

  it('holds 512 edges that resolve to real nodes', () => {
    expect(FALLBACK_EDGES).toHaveLength(512);
    const nodeIds = new Set(FALLBACK_NODES.map((n) => n.id));
    for (const e of FALLBACK_EDGES) {
      expect(nodeIds.has(e.from_node_id)).toBe(true);
      expect(nodeIds.has(e.to_node_id)).toBe(true);
    }
  });

  it('ships treatments + learning resources offline', () => {
    expect(FALLBACK_TREATMENTS.length).toBeGreaterThanOrEqual(4);
    expect(FALLBACK_RESOURCES).toHaveLength(24);
    for (const r of FALLBACK_RESOURCES) {
      expect(r.url).toMatch(/^https:\/\/medlineplus\.gov\//);
    }
  });

  it('pre-caches a valid prize quiz on every resource', () => {
    const answers = new Set<number>();
    for (const r of FALLBACK_RESOURCES) {
      expect(r.quiz.stem.length).toBeGreaterThan(10);
      expect(r.quiz.choices).toHaveLength(3);
      for (const c of r.quiz.choices) {
        expect(c.length).toBeGreaterThan(0);
      }
      expect(Number.isInteger(r.quiz.answer)).toBe(true);
      expect(r.quiz.answer).toBeGreaterThanOrEqual(0);
      expect(r.quiz.answer).toBeLessThanOrEqual(2);
      expect(r.quiz.pearl.length).toBeGreaterThan(10);
      answers.add(r.quiz.answer);
    }
    // Answer positions vary — the prize is never guessable.
    expect(answers.size).toBeGreaterThan(1);
  });
});
