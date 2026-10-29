import { describe, expect, it } from 'vitest';
import { ClinicalEngine } from './engine';
import { CONDITIONS } from './conditions';
import type { ConditionId } from './types';

const CONDITION_IDS = Object.keys(CONDITIONS) as ConditionId[];

function bestActionId(engine: ClinicalEngine, condition: ConditionId): string {
  const state = engine.initialState(condition);
  const action = engine.listActions(condition).find((a) => engine.gradeAction(state, a.id) === 'BEST');
  if (!action) throw new Error(`no BEST action at presentation for ${condition}`);
  return action.id;
}

function dangerousActionId(engine: ClinicalEngine, condition: ConditionId): string {
  const state = engine.initialState(condition);
  const action = engine.listActions(condition).find((a) => engine.gradeAction(state, a.id) === 'DANGEROUS');
  if (!action) throw new Error(`no DANGEROUS action at presentation for ${condition}`);
  return action.id;
}

describe.each(CONDITION_IDS)('condition %s', (condition) => {
  it('presents at its configured stage', () => {
    const engine = new ClinicalEngine();
    const state = engine.initialState(condition);
    expect(state.stageIndex).toBe(CONDITIONS[condition].presentsAt);
  });

  it('BEST action moves one stage toward recovery', () => {
    const engine = new ClinicalEngine();
    const before = engine.initialState(condition);
    const result = engine.applyAction(before, bestActionId(engine, condition));
    expect(result.blocked).toBe(false);
    expect(result.edge.grade).toBe('BEST');
    expect(result.node.state.stageIndex).toBe(before.stageIndex - 1);
  });

  it('WRONG action never improves the stage', () => {
    const engine = new ClinicalEngine();
    const before = engine.initialState(condition);
    const wrong = engine
      .listActions(condition)
      .find((a) => engine.gradeAction(before, a.id) === 'WRONG');
    expect(wrong).toBeDefined();
    const result = engine.applyAction(before, wrong!.id);
    expect(result.blocked).toBe(false);
    expect(result.node.state.stageIndex).toBeGreaterThanOrEqual(before.stageIndex);
  });

  it('DANGEROUS action is blocked and state never changes', () => {
    const engine = new ClinicalEngine();
    const before = engine.initialState(condition);
    const result = engine.applyAction(before, dangerousActionId(engine, condition));
    expect(result.blocked).toBe(true);
    expect(result.edge.grade).toBe('DANGEROUS');
    expect(result.node.state.stageIndex).toBe(before.stageIndex);
    expect(result.blockReason).toBeTruthy();
  });

  it('neglected time worsens by exactly one stage; cared time recovers one', () => {
    const engine = new ClinicalEngine();
    const before = engine.initialState(condition);
    const last = CONDITIONS[condition].stages.length - 1;

    const neglected = engine.advanceTime(before, false);
    expect(neglected.node.state.stageIndex).toBe(Math.min(last, before.stageIndex + 1));

    const cared = engine.advanceTime(before, true);
    expect(cared.node.state.stageIndex).toBe(Math.max(0, before.stageIndex - 1));
  });

  it('vitals stay clamped to 0–10 across repeated BEST actions', () => {
    const engine = new ClinicalEngine();
    let state = engine.initialState(condition);
    for (let i = 0; i < 12; i++) {
      const result = engine.applyAction(state, bestActionId(engine, condition));
      state = result.node.state;
      // re-present if fully recovered so the loop keeps exercising transitions
      if (state.stageIndex === 0) state = engine.initialState(condition);
    }
    for (const v of Object.values(state.vitals)) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(10);
    }
  });
});

describe('engine veto (model output can never override the engine)', () => {
  it('rejects stage jumps larger than 1', () => {
    const engine = new ClinicalEngine();
    const from = engine.initialState('asthma');
    const to = { ...from, stageIndex: from.stageIndex + 2 };
    const reason = engine.vetoEdge(from, to, {
      fromNodeId: 'n1',
      toNodeId: 'n2',
      kind: 'decision',
      choiceLabel: 'x',
      grade: 'BEST',
    });
    expect(reason).toMatch(/jump/);
  });

  it('rejects DANGEROUS edges that change state', () => {
    const engine = new ClinicalEngine();
    const from = engine.initialState('dehydration');
    const to = { ...from, stageIndex: from.stageIndex + 1 };
    const reason = engine.vetoEdge(from, to, {
      fromNodeId: 'n1',
      toNodeId: 'n2',
      kind: 'decision',
      choiceLabel: 'x',
      grade: 'DANGEROUS',
    });
    expect(reason).toMatch(/DANGEROUS/);
  });

  it('accepts the engine’s own edges', () => {
    const engine = new ClinicalEngine();
    const from = engine.initialState('hypertension');
    const result = engine.applyAction(from, bestActionId(engine, 'hypertension'));
    expect(
      engine.vetoEdge(from, result.node.state, result.edge),
    ).toBeNull();
  });

  it('throws on unknown conditions and actions', () => {
    const engine = new ClinicalEngine();
    expect(() => engine.initialState('flu' as ConditionId)).toThrow(/unknown condition/);
    expect(() => engine.applyAction(engine.initialState('asthma'), 'nope')).toThrow(/unknown action/);
  });
});

describe('shipped copy', () => {
  // The scene supplies the shown patient's name; clinical copy must never
  // name a patient, or the wrong name can ship in another patient's line.
  const PATIENT_NAMES = ['Mabel', 'Milo', 'June', 'Theo', 'Nora'];

  it('names no patient in any condition text', () => {
    for (const def of Object.values(CONDITIONS)) {
      const lines = [
        def.plainWords,
        ...def.stages.flatMap((s) => [s.label, s.blurb]),
        ...def.actions.flatMap((a) => [a.label, a.hootLine]),
      ];
      for (const line of lines) {
        for (const name of PATIENT_NAMES) {
          expect(line).not.toMatch(new RegExp(`\\b${name}\\b`));
        }
      }
    }
  });
});
