import type { ChoiceGrade } from '../clinical';
import type { MemoryMap, VisitMemory } from './memory';

/**
 * Patient meters: body + heart at a glance (pure,
 * unit-tested). Body derives live from engine vitals and
 * stage (nothing stored); heart is persistent ease per
 * patient (BEST reassures, WRONG shakes). Both render as
 * 5 pips plus a plain word — never color alone.
 */

export const EASE_START = 6;

/** Pure: 0-10 body from vitals, penalized by stage. */
export function physicalHealth(
  vitals: { energy: number; comfort: number; breathing: number },
  stageIndex: number,
): number {
  const avg = Math.round((vitals.energy + vitals.comfort + vitals.breathing) / 3);
  return Math.max(0, Math.min(10, avg - Math.max(0, stageIndex)));
}

/** Pure: 0-10 value onto 0-5 pips. */
export function meterPips(value: number): number {
  return Math.max(0, Math.min(5, Math.round(value / 2)));
}

/** Pure: plain word for a body band. */
export function bodyWord(value: number): string {
  if (value <= 1) return 'Weak';
  if (value <= 3) return 'Poor';
  if (value <= 5) return 'Fair';
  if (value <= 7) return 'Good';
  return 'Strong';
}

/** Pure: plain word for a heart band. */
export function heartWord(value: number): string {
  if (value <= 1) return 'Scared';
  if (value <= 3) return 'Unsure';
  if (value <= 5) return 'Okay';
  if (value <= 7) return 'Happy';
  return 'Glad';
}

/** Pure: held ease, clamped, defaulting newcomers. */
export function easeOf(mem: Pick<VisitMemory, 'ease'> | undefined): number {
  if (mem?.ease === undefined || typeof mem.ease !== 'number') return EASE_START;
  return Math.max(0, Math.min(10, Math.round(mem.ease)));
}

/** Pure: ease after one graded pick. */
export function easeOnGrade(ease: number, grade: ChoiceGrade): number {
  if (grade === 'BEST') return Math.min(10, ease + 1);
  if (grade === 'WRONG') return Math.max(0, ease - 2);
  return ease;
}

/** Pure: records ease for one patient (immutable update). */
export function updateEase(map: MemoryMap, name: string, ease: number): MemoryMap {
  const prev = map[name];
  const entry: VisitMemory =
    prev === undefined ? { score: 0, perfect: false, ease } : { ...prev, ease };
  return { ...map, [name]: entry };
}
