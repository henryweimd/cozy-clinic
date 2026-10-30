import { describe, expect, it } from 'vitest';
import {
  CHEER_PRESETS,
  DOCTOR_HANDLES,
  HANDOFF_PRESETS,
  TEAM_TAGS,
  cleanHandle,
  cleanTeam,
  doctorByline,
  handoffSummary,
  handoffText,
  latestHandoff,
  nextCheer,
  pushOutbox,
  shiftOutbox,
  teammatesFirst,
} from './sharedCare';
import type { HandoffDraft, HandoffNote } from './sharedCare';
import { FALLBACK_CHEERS, FALLBACK_HANDOFFS, FALLBACK_PATIENTS } from './fallbackPack';

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
      for (const tier of ['gentle', 'steady', 'clinical', 'expert'] as const) {
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
    { id: 'a', patient_id: 'p1', from_handle: 'Fox', team_tag: 'Sun', preset_id: 'rest-up', encounter_summary: '', outcome: 'struggling', score: 1, created_at: '2026-10-27T12:00:00.000Z' },
    { id: 'b', patient_id: 'p1', from_handle: 'Wren', team_tag: null, preset_id: 'rest-up', encounter_summary: '', outcome: 'recovered', score: 3, created_at: '2026-10-28T12:00:00.000Z' },
    { id: 'c', patient_id: 'p2', from_handle: 'Fox', team_tag: 'Sun', preset_id: 'rest-up', encounter_summary: '', outcome: 'recovered', score: 3, created_at: '2026-10-29T12:00:00.000Z' },
  ];

  it('picks the newest note per patient', () => {
    expect(latestHandoff(notes, 'p1')?.id).toBe('b');
    expect(latestHandoff(notes, 'p2')?.id).toBe('c');
    expect(latestHandoff(notes, 'nobody')).toBeNull();
  });
});

describe('outbox', () => {
  const draft: HandoffDraft = {
    patient_id: 'p1',
    from_handle: 'Fox',
    team_tag: 'Sun',
    preset_id: 'rest-up',
    encounter_summary: 'Visit #2 · 1 of 3 so far',
    outcome: 'struggling',
    score: 1,
  };

  it('queues offline drafts and drops flushed ones', () => {
    const q1 = pushOutbox([], draft);
    expect(q1).toHaveLength(1);
    const q2 = pushOutbox(q1, { ...draft, score: 2 });
    expect(q2).toHaveLength(2);
    expect(shiftOutbox(q2, 1)).toHaveLength(1);
    expect(shiftOutbox(q2, 9)).toHaveLength(0);
    // Inputs never mutate.
    expect(q1).toHaveLength(1);
  });
});

describe('handoffSummary', () => {
  it('writes the encounter line for finished + live visits', () => {
    expect(handoffSummary(2, 3, true)).toBe('Visit #2 · 3 of 3 right');
    expect(handoffSummary(2, 1, false)).toBe('Visit #2 · 1 of 3 so far');
  });
});

describe('teams + cheers', () => {
  it('bylines the team tag only when present', () => {
    expect(doctorByline('Wren', 'Moon')).toBe('Doctor Wren · Moon');
    expect(doctorByline('Wren', null)).toBe('Doctor Wren');
  });

  it('ships short unique team tags', () => {
    expect(new Set(TEAM_TAGS).size).toBe(TEAM_TAGS.length);
    for (const t of TEAM_TAGS) expect(t.length).toBeLessThanOrEqual(24);
  });

  it('rotates cheers forever', () => {
    let cursor = 0;
    const seen = new Set<string>();
    for (let i = 0; i < CHEER_PRESETS.length * 2; i += 1) {
      const { cheer, next } = nextCheer(cursor);
      expect(CHEER_PRESETS).toContain(cheer);
      seen.add(cheer);
      cursor = next;
    }
    expect(seen.size).toBe(CHEER_PRESETS.length);
  });

  it('cleans typed doctor names, strips titles, rejects junk', () => {
    expect(cleanHandle('Fox')).toBe('Fox');
    expect(cleanHandle('  Amir  ')).toBe('Amir');
    expect(cleanHandle('Dr. Amir')).toBe('Amir');
    expect(cleanHandle('doctor amir')).toBe('amir');
    expect(cleanHandle("O'Brien")).toBe("O'Brien");
    expect(cleanHandle('Jo  Lee')).toBe('Jo Lee');
    expect(cleanHandle('x')).toBeNull();
    expect(cleanHandle('123')).toBeNull();
    expect(cleanHandle('a'.repeat(17))).toBeNull();
    expect(cleanHandle('<b>hi')).toBeNull();
    expect(cleanHandle('')).toBeNull();
  });

  it('cleans typed practice names (roomier, allows &)', () => {
    expect(cleanTeam('Sun')).toBe('Sun');
    expect(cleanTeam('Sunnyvale & Kids')).toBe('Sunnyvale & Kids');
    expect(cleanTeam('x')).toBeNull();
    expect(cleanTeam('a'.repeat(21))).toBeNull();
  });

  it('floats same-practice notes first, newest within groups', () => {
    const mk = (id: string, team: string | null, at: string): HandoffNote => ({
      id,
      patient_id: 'p',
      from_handle: 'Fox',
      team_tag: team,
      preset_id: 'keep-fluids',
      encounter_summary: 's',
      outcome: 'recovered',
      score: 3,
      created_at: at,
    });
    const notes = [
      mk('old-mine', 'Sun', '2026-10-27T10:00:00Z'),
      mk('new-other', 'Moon', '2026-10-28T10:00:00Z'),
      mk('new-mine', 'Sun', '2026-10-28T12:00:00Z'),
      mk('untagged', null, '2026-10-28T13:00:00Z'),
    ];
    expect(teammatesFirst(notes, 'Sun').map((n) => n.id)).toEqual([
      'new-mine',
      'old-mine',
      'untagged',
      'new-other',
    ]);
  });

  it('addresses fallback cheers to real handles with known presets', () => {
    for (const c of FALLBACK_CHEERS) {
      expect(DOCTOR_HANDLES).toContain(c.from_handle);
      expect(DOCTOR_HANDLES).toContain(c.to_handle);
      expect(CHEER_PRESETS).toContain(c.preset_id);
    }
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
