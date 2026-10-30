/**
 * Visit-end rules + result copy (pure, unit-tested). A visit ends
 * at either ladder tip: stage 0 = recovered (got it right),
 * last stage = struggling (got it wrong — the wrong path
 * teaches too, and the result routes to learning first).
 */

export type VisitOutcome = 'recovered' | 'struggling';

export function visitOutcome(stageIndex: number, stageCount: number): VisitOutcome | null {
  if (stageIndex <= 0) return 'recovered';
  if (stageIndex >= stageCount - 1) return 'struggling';
  return null;
}

export interface ResultCopyInput {
  outcome: VisitOutcome;
  name: string;
  condition: string;
  visitNo: number;
  coinsEarned: number;
}

export interface ResultCopy {
  title: string;
  lines: string[];
  primary: string;
  secondary: string;
}

export function resultCopy(input: ResultCopyInput): ResultCopy {
  if (input.outcome === 'recovered') {
    return {
      title: `${input.name} is all better!`,
      lines: [`Visit #${input.visitNo} complete`, `+${input.coinsEarned} Care Coins earned`],
      primary: 'Next patient',
      secondary: `Learn about ${input.condition}`,
    };
  }
  return {
    title: `${input.name} still needs help`,
    lines: [
      `Visit #${input.visitNo} · The wrong path teaches too`,
      `Learn what helps ${input.condition.toLowerCase()}.`,
    ],
    primary: `Learn about ${input.condition}`,
    secondary: 'Try again',
  };
}
