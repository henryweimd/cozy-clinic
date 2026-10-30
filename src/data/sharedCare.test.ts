import { describe, expect, it } from 'vitest';
import {
  CHEER_PRESETS,
  DOCTOR_HANDLES,
  HANDOFF_PRESETS,
  handoffText,
  latestHandoff,
} from './sharedCare';
import type { HandoffNote } from './sharedCare';
import { FALLBACK_HANDOFFS, FALLBACK_PATIENTS } from './fallbackPack';

describe('handles + presets', () => {
  it('ships unique, short, DB-fitting handles', () => {
    expect(DOCTOR_HANDLES.length).toBeGreaterThanOrEqual(2);
    expect(new Set(DOCTOR_HANDLES).size).toBe(DOCTOR_HANDLES.length);
    for (const h of DOCTOR_HANDLES) {
      expect(h.length).toBeGreaterThanOrEqual(1);
      expect(h.length).toBeLessThanOrEqual(24);
    }
  });

  it('words every handoff preset at every tier', () => {
    expect(HANDOFF_PRESETS.length).toBeGreaterThan(0);
    for (const p of HANDOFF_PRESETS) {
      expect(p.id.length).toBeLessThanOrEqual(40);
      for (const tier of ['gentle', 'steady', 'expert'] as const) {
        expect(p[tier].length).toBeGreaterThan(0);
        expect(handoffText(p.id, tier)).toBe(p[tier]);
      }
    }
  });

  it('answers unknown presets kindly, never blank', () => {
    expect(handoffText('nope', 'gentle').length).toBeGreaterThan(0);
  });

  it('keeps cheers short enough for every tier', () => {
    expect(CHEER_PRESETS.length).toBeGreaterThan(0);
    for (const c of CHEER_PRESETS) expect(c.length).toBeLessThanOrEqual(24);
  });
});

describe('latestHandoff', () => {
  const notes: HandoffNote[] = [
    { id: 'a', patient_id: 'p1', from_handle: 'Fox', preset_id: 'rest-up', encounter_summary: '', outcome: 'struggling', score: 1, created_at: '2026-10-27T12:00:00.000Z' },
    { id: 'b', patient_id: 'p1', from_handle: 'Wren', preset_id: 'rest-up', encounter_summary: '', outcome: 'recovered', score: 3, created_at: '2026-10-28T12:00:00.000Z' },
    { id: 'c', patient_id: 'p2', from_handle: 'Fox', preset_id: 'rest-up', encounter_summary: '', outcome: 'recovered', score: 3, created_at: '2026-10-29T12:00:00.000Z' },
  ];

  it('picks the newest note per patient', () => {
    expect(latestHandoff(notes, 'p1')?.id).toBe('b');
    expect(latestHandoff(notes, 'p2')?.id).toBe('c');
    expect(latestHandoff(notes, 'nobody')).toBeNull();
  });
});

describe('fallback handoffs', () => {
  it('reference real fallback patients + known presets + handles', () => {
    const patientIds = new Set(FALLBACK_PATIENTS.map((p) => p.id));
    const presetIds = new Set(HANDOFF_PRESETS.map((p) => p.id));
    expect(FALLBACK_HANDOFFS.length).toBeGreaterThan(0);
    for (const h of FALLBACK_HANDOFFS) {
      expect(patientIds.has(h.patient_id)).toBe(true);
      expect(presetIds.has(h.preset_id)).toBe(true);
      expect(DOCTOR_HANDLES).toContain(h.from_handle);
      expect(h.encounter_summary.length).toBeLessThanOrEqual(280);
    }
  });
});
