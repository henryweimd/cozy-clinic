/**
 * Core clinical types for Cozy Clinic.
 *
 * Trajectory-ready by design: a patient's story is a graph of Nodes
 * (full state snapshots) connected by Edges (decisions or time passing).
 * Milestones 2-3 persist these nodes/edges to Supabase (`trajectory_nodes`,
 * `trajectory_edges`) and gameplay traverses stored nodes — this module's
 * shapes already match that storage contract, so no redesign is needed.
 */

/** The four launch conditions (brief Section 6). */
export type ConditionId =
  | 'asthma'
  | 'viral-respiratory'
  | 'dehydration'
  | 'hypertension';

/** Ordered stage within a condition. Lower index = healthier. */
export type StageId = string;

/** Vitals are always clamped to 0–10 by the engine. */
export interface Vitals {
  /** Overall pep / energy. */
  energy: number;
  /** Comfort (inverse of distress). */
  comfort: number;
  /** Ease of breathing. */
  breathing: number;
}

/** Option grading (brief Section 2C). Every decision edge carries a grade. */
export type ChoiceGrade = 'BEST' | 'NOT_GREAT' | 'WRONG' | 'DANGEROUS';

/** Kind of trajectory edge. */
export type EdgeKind = 'decision' | 'time';

/** Full patient state at one trajectory node. */
export interface PatientState {
  conditionId: ConditionId;
  /** Index into the condition's ordered stage list. */
  stageIndex: number;
  vitals: Vitals;
  /** Cozy mood cue driving animation + patient reaction. */
  mood: 'bright' | 'okay' | 'droopy' | 'perky';
  /** One-line memory snippet for the Living Chart timeline. */
  memory: string;
}

/**
 * A trajectory node: an id plus a full state snapshot.
 * Stored as `trajectory_nodes` rows (Milestones 2–3).
 */
export interface TrajectoryNode {
  id: string;
  state: PatientState;
  /** Short narrative beat shown when this node renders. */
  narrative: string;
  /** Animation cue for the scene (idle, sick, happy, recovery, worried). */
  animationCue: 'idle' | 'sick' | 'happy' | 'recovery' | 'worried';
  /** One-sentence teaching beat (Hoot's line), shown AFTER the consequence. */
  teaching: string;
}

/**
 * A trajectory edge: one decision or time step between nodes.
 * Stored as `trajectory_edges` rows (Milestones 2–3).
 */
export interface TrajectoryEdge {
  fromNodeId: string;
  toNodeId: string;
  kind: EdgeKind;
  /** Label of the choice taken (empty for time edges). */
  choiceLabel: string;
  grade: ChoiceGrade;
}

/** A playable action card offered to the player. */
export interface ActionDef {
  id: string;
  /**
   * Canonical label (=== labels.steady): engine memory,
   * choice records, and trajectory-edge matching all key on
   * this — tiers only ever reword the DISPLAY, never the
   * meaning, so a tier switch can't change the right answer.
   */
  label: string;
  /** Display wording per reading tier (Muse-drafted, engine-vetoed). */
  labels: { gentle: string; steady: string; expert: string };
  /** Grade of this action when taken at each stage index. */
  gradeByStage: ChoiceGrade[];
  /** Stage-index delta applied when the action resolves (before clamping). */
  stageDeltaByGrade: Record<ChoiceGrade, number>;
  /** Vitals nudge applied on resolution. */
  vitalsDelta: Partial<Vitals>;
  /** Follow-up line shown after the consequence lands. */
  hootLine: string;
}

/** Static definition of one condition's stage ladder + actions. */
export interface ConditionDef {
  id: ConditionId;
  name: string;
  plainWords: string;
  /** Ordered stages, index 0 = healthiest. */
  stages: { id: StageId; label: string; blurb: string; says: string }[];
  /** Stage index where a fresh case presents. */
  presentsAt: number;
  actions: ActionDef[];
  /** Exam-round: 3 bedside checks unique to this case + the best id. */
  examOptions: { id: string; label: string }[];
  examBestId: string;
  /** Exam-round: the best check's finding. */
  bestFinding: string;
  /** Diagnose-round: 3 option ids, one is `id` (position varies). */
  dxOptions: ConditionId[];
  /** Exam-round quiz question per tier ({name}/{demo} filled in). */
  examQuiz: { gentle: string; steady: string; expert: string };
  /** Diagnose-round teaching: why the pick fits (right) or not. */
  dxPearl: { right: string; wrong: string };
  /** The visit's one-line takeaway (result modal, ≤40 chars). */
  visitPearl: string;
}

/** Result of resolving one player decision. */
export interface DecisionResult {
  node: TrajectoryNode;
  edge: TrajectoryEdge;
  /** DANGEROUS picks are never applied — the rescue system hooks in here. */
  blocked: boolean;
  blockReason?: string;
}
