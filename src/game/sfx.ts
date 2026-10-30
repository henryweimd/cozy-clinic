/**
 * Cozy synth SFX: raw WebAudio oscillators, zero assets, fully
 * offline. Four quiet cues (correct / wrong / coin / fanfare) —
 * soft sine/triangle voices, never harsh. Autoplay-safe: the
 * context unlocks on the first pointer tap (the scene calls
 * unlockSfx once); every call is try/caught so audio can never
 * break play. Mute persists via the scene (About sheet toggle).
 */

export type SfxName = 'correct' | 'wrong' | 'coin' | 'fanfare';

interface Note {
  /** Hz. */
  f: number;
  /** Start offset in seconds. */
  t: number;
  /** Seconds. */
  d: number;
}

/** The whole score: soft, short, warm. */
export const SFX_NOTES: Record<SfxName, readonly Note[]> = {
  // Two rising notes (E5→A5): a gentle "yes".
  correct: [
    { f: 659, t: 0, d: 0.1 },
    { f: 880, t: 0.09, d: 0.14 },
  ],
  // Two low soft notes (G3→D3): a cozy "not quite".
  wrong: [
    { f: 196, t: 0, d: 0.14 },
    { f: 147, t: 0.12, d: 0.2 },
  ],
  // Bright coin ping (B5→E6), quick and light.
  coin: [
    { f: 988, t: 0, d: 0.07 },
    { f: 1319, t: 0.06, d: 0.12 },
  ],
  // Four-note arp (C5→C6) for flawless visits + quiz prizes.
  fanfare: [
    { f: 523, t: 0, d: 0.1 },
    { f: 659, t: 0.08, d: 0.1 },
    { f: 784, t: 0.16, d: 0.1 },
    { f: 1047, t: 0.24, d: 0.2 },
  ],
};

let ctx: AudioContext | null = null;
let muted = false;

export function setSfxMuted(m: boolean): void {
  muted = m;
}

export function isSfxMuted(): boolean {
  return muted;
}

/** Create/resume the context (first user gesture only). */
export function unlockSfx(): void {
  try {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
  } catch {
    ctx = null;
  }
}

export function playSfx(name: SfxName): void {
  if (muted) return;
  try {
    if (!ctx || ctx.state !== 'running') return;
    const t0 = ctx.currentTime;
    for (const note of SFX_NOTES[name]) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = name === 'wrong' ? 'triangle' : 'sine';
      osc.frequency.value = note.f;
      gain.gain.setValueAtTime(0.0001, t0 + note.t);
      gain.gain.exponentialRampToValueAtTime(0.18, t0 + note.t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + note.t + note.d);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0 + note.t);
      osc.stop(t0 + note.t + note.d + 0.02);
    }
  } catch {
    // Audio never breaks play.
  }
}
