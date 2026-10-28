import { ClinicalEngine } from '../clinical';
import type { AIProvider, EncounterRequest, EncounterResponse } from './provider';
import { validateEncounterResponse } from './provider';

/**
 * Deterministic MockAIProvider — the fallback that always works.
 *
 * It derives intro + 2–3 choices from the authoritative clinical engine, so
 * the demo path completes fully offline (local fallback dataset). The live
 * engine is never the plan here — Milestone 3 wires the Edge Function call.
 */
export class MockAIProvider implements AIProvider {
  readonly name = 'mock' as const;
  private engine = new ClinicalEngine();

  async getEncounter(req: EncounterRequest): Promise<EncounterResponse> {
    const def = this.engine.getDef(req.conditionId);
    const stage = def.stages[req.stageIndex] ?? def.stages[def.presentsAt];
    const state = {
      conditionId: req.conditionId,
      stageIndex: req.stageIndex,
      vitals: req.vitals,
      mood: 'okay' as const,
      memory: '',
    };

    const actions = this.engine.listActions(req.conditionId);
    const best = actions.find((a) => this.engine.gradeAction(state, a.id) === 'BEST');
    const others = actions.filter((a) => a.id !== best?.id).slice(0, 2);
    const picked = [...(best ? [best] : []), ...others].slice(0, 3);

    const response: EncounterResponse = {
      intro: `${req.patientName} is feeling ${stage.label.toLowerCase()}: ${stage.blurb} What will you try?`,
      choices: picked.map((a) => ({
        id: a.id,
        label: a.label,
        grade: this.engine.gradeAction(state, a.id),
      })),
      provider: 'mock',
    };

    // Even the fallback passes schema validation — invalid output is never used.
    if (!validateEncounterResponse(response)) {
      throw new Error('MockAIProvider produced an invalid response');
    }
    return response;
  }
}
