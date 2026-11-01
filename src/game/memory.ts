/**
 * Visit memory: what each patient remembers about YOUR last visit.
 * Deliberately small — one summary per patient, persisted locally.
 * The greeting line thanks the PLAYER and never claims the patient
 * is better or worse (the endings rule applies to memory too).
 */

export interface VisitMemory {
  score: number;
  perfect: boolean;
  /** Last visit's takeaway (the follow-up thread). Absent on old saves. */
  pearl?: string;
}

export type MemoryMap = Record<string, VisitMemory>;

/** Pure: the memory greeting, or null when there's nothing to recall. */
export function memoryLine(mem: VisitMemory | undefined): string | null {
  if (mem === undefined) return null;
  if (mem.perfect) return 'You got everything right last time!';
  if (mem.score >= 2) return 'Thanks for helping last time!';
  return "I'm glad you're my doctor.";
}

/** Pure: records one finished visit (immutable update). */
export function recordMemory(
  map: MemoryMap,
  name: string,
  score: number,
  pearl?: string,
): MemoryMap {
  return {
    ...map,
    [name]: { score, perfect: score >= 4, ...(pearl !== undefined ? { pearl } : {}) },
  };
}

/**
 * Pure: the follow-up thread, or null when nothing was kept.
 * Recalls the teaching, never the patient state (the endings
 * rule applies to memory too).
 */
export function followupLine(mem: VisitMemory | undefined): string | null {
  if (mem?.pearl === undefined || mem.pearl === '') return null;
  return `Last time we learned: ${mem.pearl}`;
}

/** Shape guard for the persisted map (unit-tested). */
export function isMemoryMap(v: unknown): v is MemoryMap {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false;
  return Object.values(v as Record<string, unknown>).every((m) => {
    if (typeof m !== 'object' || m === null) return false;
    const { score, perfect, pearl } = m as {
      score?: unknown;
      perfect?: unknown;
      pearl?: unknown;
    };
    return (
      typeof score === 'number' &&
      typeof perfect === 'boolean' &&
      (pearl === undefined || typeof pearl === 'string')
    );
  });
}
