/**
 * Visit-end rules + result copy (pure, unit-tested). A visit is a
 * 4-round mini-story (ask → examine → diagnose → treat); the SET
 * of choices decides the ending. Recovered takes the right
 * diagnosis AND the right treatment; the ask/exam rounds pay
 * coins and clues. Copy congratulates the PLAYER — never claims
 * the patient is better or worse.
 */

export type VisitOutcome = 'recovered' | 'struggling';

export interface RoundScore {
  hxBest: boolean;
  examBest: boolean;
  dxCorrect: boolean;
  txBest: boolean;
}

export function visitOutcome(score: RoundScore): VisitOutcome {
  return score.dxCorrect && score.txBest ? 'recovered' : 'struggling';
}

export function scoreCount(score: RoundScore): number {
  return (
    (score.hxBest ? 1 : 0) +
    (score.examBest ? 1 : 0) +
    (score.dxCorrect ? 1 : 0) +
    (score.txBest ? 1 : 0)
  );
}

/** All four rounds right — earns the perfect-visit bonus. */
export function isPerfectVisit(score: RoundScore): boolean {
  return score.hxBest && score.examBest && score.dxCorrect && score.txBest;
}

type QuizTier = 'gentle' | 'steady' | 'clinical' | 'expert';

/** Diagnose/treat round questions per tier ({name} filled in). */
const ROUND_QUESTIONS: Record<'diagnose' | 'treat', Record<QuizTier, string>> = {
  diagnose: {
    gentle: 'What do you think {name} has? Pick below.',
    steady: "What's your diagnosis? Choose one.",
    clinical: 'Your clinical impression? Choose one.',
    expert: 'Most likely diagnosis?',
  },
  treat: {
    gentle: 'How will you help {name} feel better? Choose one.',
    steady: 'Choose the treatment.',
    clinical: 'Choose the intervention.',
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
  /** The visit's one-line takeaway (the report card's line 3). */
  pearl: string;
}

export interface ResultCopy {
  title: string;
  lines: string[];
  primary: string;
  secondary: string;
}

export function resultCopy(input: ResultCopyInput): ResultCopy {
  const scoreLine = `${scoreCount(input.score)} of 4 right`;
  if (input.outcome === 'recovered') {
    return {
      // Flawless 4/4 earns its own headline (perfect-visit bonus
      // lands with it); 3/4 keeps the warm standard praise.
      title: scoreCount(input.score) === 4 ? 'Flawless visit, Doctor!' : 'Great work, Doctor!',
      lines: [
        `Visit #${input.visitNo} complete`,
        scoreLine,
        input.pearl,
        `+${input.coinsEarned} Care Coins earned`,
      ],
      primary: 'Next patient',
      secondary: `Learn about ${input.condition}`,
    };
  }
  return {
    title: 'Tough case — keep going!',
    lines: [`Visit #${input.visitNo}`, scoreLine, input.pearl, 'Every doctor keeps learning.'],
    // Learning is invited (pulsing Learn badge + tab), never
    // obliged: both endings lead with the next patient.
    primary: 'Next patient',
    secondary: 'Try again',
  };
}
