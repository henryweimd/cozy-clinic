/**
 * Visit-end rules + result copy (pure, unit-tested). A visit is a
 * 3-round mini-story (examine → diagnose → treat); the SET of
 * choices decides the ending. Recovered takes the right
 * diagnosis AND the right treatment; the exam round pays coins
 * and findings. Copy congratulates the PLAYER — never claims
 * the patient is better or worse.
 */

export type VisitOutcome = 'recovered' | 'struggling';

export interface RoundScore {
  examBest: boolean;
  dxCorrect: boolean;
  txBest: boolean;
}

export function visitOutcome(score: RoundScore): VisitOutcome {
  return score.dxCorrect && score.txBest ? 'recovered' : 'struggling';
}

export function scoreCount(score: RoundScore): number {
  return (score.examBest ? 1 : 0) + (score.dxCorrect ? 1 : 0) + (score.txBest ? 1 : 0);
}

type QuizTier = 'gentle' | 'steady' | 'expert';

/** Diagnose/treat round questions per tier ({name} filled in). */
const ROUND_QUESTIONS: Record<'diagnose' | 'treat', Record<QuizTier, string>> = {
  diagnose: {
    gentle: 'What do you think {name} has? Pick below.',
    steady: "What's your diagnosis? Choose one.",
    expert: 'Your diagnosis?',
  },
  treat: {
    gentle: 'How will you help {name} feel better? Choose one.',
    steady: 'Choose the treatment.',
    expert: 'Your management plan? Choose one.',
  },
};

export function roundQuestion(
  round: 'diagnose' | 'treat',
  tier: QuizTier,
  name: string,
): string {
  return ROUND_QUESTIONS[round][tier].replace('{name}', name);
}

/** Fills {name} + {demo} (8yF-style) in an exam quiz template. */
export function examQuestion(template: string, name: string, demo: string): string {
  return template.replace('{name}', name).replace('{demo}', demo);
}

export interface ResultCopyInput {
  outcome: VisitOutcome;
  visitNo: number;
  coinsEarned: number;
  score: RoundScore;
  condition: string;
}

export interface ResultCopy {
  title: string;
  lines: string[];
  primary: string;
  secondary: string;
}

export function resultCopy(input: ResultCopyInput): ResultCopy {
  const scoreLine = `${scoreCount(input.score)} of 3 right`;
  if (input.outcome === 'recovered') {
    return {
      title: 'Great work, Doctor!',
      lines: [`Visit #${input.visitNo} complete`, scoreLine, `+${input.coinsEarned} Care Coins earned`],
      primary: 'Next patient',
      secondary: `Learn about ${input.condition}`,
    };
  }
  return {
    title: 'Tough case — keep going!',
    lines: [`Visit #${input.visitNo}`, scoreLine, 'Every doctor keeps learning.'],
    primary: `Learn about ${input.condition}`,
    secondary: 'Try again',
  };
}
