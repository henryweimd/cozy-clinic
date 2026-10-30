import { CONDITIONS } from './conditions';
import type {
  ActionDef,
  ChoiceGrade,
  ConditionDef,
  ConditionId,
  DecisionResult,
  PatientState,
  TrajectoryEdge,
  TrajectoryNode,
  Vitals,
} from './types';

export const VITALS_MIN = 0;
export const VITALS_MAX = 10;

export function clampVitals(v: Vitals): Vitals {
  const clamp = (n: number) => Math.min(VITALS_MAX, Math.max(VITALS_MIN, Math.round(n)));
  return { energy: clamp(v.energy), comfort: clamp(v.comfort), breathing: clamp(v.breathing) };
}

function moodForStage(stageIndex: number): PatientState['mood'] {
  if (stageIndex <= 0) return 'bright';
  if (stageIndex === 1) return 'okay';
  return 'droopy';
}

function cueForTransition(fromStage: number, toStage: number): TrajectoryNode['animationCue'] {
  if (toStage < fromStage) return toStage === 0 ? 'happy' : 'recovery';
  if (toStage > fromStage) return 'sick';
  return fromStage === 0 ? 'idle' : 'worried';
}

/**
 * The authoritative clinical engine. Deterministic: same state + same
 * action always yields the same node. Model output never overrides it —
 * see `vetoEdge` below, which Milestone 3 applies to every AI-generated
 * trajectory node before it is stored.
 */
export class ClinicalEngine {
  private nodeCounter = 0;

  /** Fresh presenting case for a condition (used by encounters + seeds). */
  initialState(conditionId: ConditionId): PatientState {
    const def = this.require(conditionId);
    return {
      conditionId,
      stageIndex: def.presentsAt,
      vitals: clampVitals({ energy: 6, comfort: 6, breathing: 6 }),
      mood: moodForStage(def.presentsAt),
      memory: `First visit: ${def.stages[def.presentsAt].label.toLowerCase()}.`,
    };
  }

  listActions(conditionId: ConditionId): ActionDef[] {
    return this.require(conditionId).actions;
  }

  getDef(conditionId: ConditionId): ConditionDef {
    return this.require(conditionId);
  }

  /** Grade an action at a state without applying it (for encounter setup). */
  gradeAction(state: PatientState, actionId: string): ChoiceGrade {
    return this.requireAction(state.conditionId, actionId).gradeByStage[state.stageIndex];
  }

  /**
   * Resolve one player decision. DANGEROUS picks are NEVER applied —
   * the result is `blocked: true` and the state node is unchanged, so
   * the rescue system (later milestone) can pause and teach here.
   */
  applyAction(state: PatientState, actionId: string): DecisionResult {
    const def = this.require(state.conditionId);
    const action = this.requireAction(state.conditionId, actionId);
    const grade = action.gradeByStage[state.stageIndex];
    const fromNodeId = this.previewNodeId();

    if (grade === 'DANGEROUS') {
      const node = this.makeNode(state, {
        narrative: `${this.stageLabel(def, state.stageIndex)} — held steady.`,
        animationCue: 'worried',
        teaching: action.hootLine,
        memory: `${state.memory} A risky idea came up; we steered clear.`,
      });
      const edge: TrajectoryEdge = {
        fromNodeId,
        toNodeId: node.id,
        kind: 'decision',
        choiceLabel: action.label,
        grade,
      };
      return { node, edge, blocked: true, blockReason: action.hootLine };
    }

    const delta = action.stageDeltaByGrade[grade];
    const nextStage = Math.min(def.stages.length - 1, Math.max(0, state.stageIndex + delta));
    const nextVitals = clampVitals({
      energy: state.vitals.energy + (action.vitalsDelta.energy ?? 0) + (delta < 0 ? 1 : 0),
      comfort: state.vitals.comfort + (action.vitalsDelta.comfort ?? 0) + (delta < 0 ? 1 : 0),
      breathing: state.vitals.breathing + (action.vitalsDelta.breathing ?? 0),
    });
    const next: PatientState = {
      conditionId: state.conditionId,
      stageIndex: nextStage,
      vitals: nextVitals,
      mood: nextStage < state.stageIndex ? 'perky' : moodForStage(nextStage),
      memory: `${state.memory} Tried "${action.label}" → ${def.stages[nextStage].label.toLowerCase()}.`,
    };
    const nextBlurb = def.stages[nextStage]?.blurb ?? '';
    const nextBlurbLow = nextBlurb.charAt(0).toLowerCase() + nextBlurb.slice(1);
    const node = this.makeNode(next, {
      narrative: `${def.stages[nextStage]?.label ?? ''} — ${nextBlurbLow}`,
      animationCue: cueForTransition(state.stageIndex, nextStage),
      teaching: action.hootLine,
    });
    const edge: TrajectoryEdge = {
      fromNodeId,
      toNodeId: node.id,
      kind: 'decision',
      choiceLabel: action.label,
      grade,
    };
    return { node, edge, blocked: false };
  }

  /**
   * Simulate time passing between visits. Good ongoing care (`cared=true`)
   * steps toward recovery; neglect steps toward worse. Never jumps —
   * one stage per call, so stored time edges stay coherent.
   */
  advanceTime(state: PatientState, cared: boolean): { node: TrajectoryNode; edge: TrajectoryEdge } {
    const def = this.require(state.conditionId);
    const nextStage = cared
      ? Math.max(0, state.stageIndex - 1)
      : Math.min(def.stages.length - 1, state.stageIndex + 1);
    const next: PatientState = {
      ...state,
      stageIndex: nextStage,
      mood: nextStage < state.stageIndex ? 'perky' : moodForStage(nextStage),
      memory: cared
        ? `${state.memory} Kept up the care plan between visits.`
        : `${state.memory} Time passed without care.`,
    };
    const node = this.makeNode(next, {
      narrative: cared
        ? `Time and steady care — feeling ${def.stages[nextStage]?.label.toLowerCase() ?? ''}.`
        : `Time passed without care — feeling ${def.stages[nextStage]?.label.toLowerCase() ?? ''}.`,
      animationCue: cueForTransition(state.stageIndex, nextStage),
      teaching: cared
        ? 'Steady care between visits is the quiet hero.'
        : 'Skipped care drifts the wrong way — gently.',
    });
    const edge: TrajectoryEdge = {
      fromNodeId: this.previewNodeId(),
      toNodeId: node.id,
      kind: 'time',
      choiceLabel: '',
      grade: cared ? 'BEST' : 'NOT_GREAT',
    };
    return { node, edge };
  }

  /**
   * Engine veto for model-generated trajectory content (brief Section 6).
   * Returns null when the edge is coherent, else the rejection reason.
   * Rules: single-stage steps only, vitals in 0–10, DANGEROUS never applied
   * (its node must equal its from-state).
   */
  vetoEdge(from: PatientState, to: PatientState, edge: TrajectoryEdge): string | null {
    if (edge.grade === 'DANGEROUS' && to.stageIndex !== from.stageIndex) {
      return 'veto: DANGEROUS edge must not change state';
    }
    if (Math.abs(to.stageIndex - from.stageIndex) > 1) {
      return 'veto: stage jump larger than 1';
    }
    for (const [k, v] of Object.entries(to.vitals)) {
      if (!Number.isFinite(v) || v < VITALS_MIN || v > VITALS_MAX) {
        return `veto: vitals.${k} out of range`;
      }
    }
    if (edge.kind === 'time' && edge.choiceLabel !== '') {
      return 'veto: time edge must not carry a choice label';
    }
    return null;
  }

  // -- internals ----------------------------------------------------------

  private require(conditionId: ConditionId): ConditionDef {
    const def = CONDITIONS[conditionId];
    if (!def) throw new Error(`unknown condition: ${conditionId}`);
    return def;
  }

  private requireAction(conditionId: ConditionId, actionId: string): ActionDef {
    const action = this.require(conditionId).actions.find((a) => a.id === actionId);
    if (!action) throw new Error(`unknown action ${actionId} for ${conditionId}`);
    return action;
  }

  private stageLabel(def: ConditionDef, i: number): string {
    return def.stages[i].label;
  }

  private previewNodeId(): string {
    return `n${this.nodeCounter}`;
  }

  private makeNode(
    state: PatientState,
    extra: Pick<TrajectoryNode, 'narrative' | 'animationCue' | 'teaching'> & { memory?: string },
  ): TrajectoryNode {
    this.nodeCounter += 1;
    return {
      id: `n${this.nodeCounter}`,
      state: { ...state, memory: extra.memory ?? state.memory },
      narrative: extra.narrative,
      animationCue: extra.animationCue,
      teaching: extra.teaching,
    };
  }
}
