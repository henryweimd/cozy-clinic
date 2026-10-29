import { describe, expect, it } from 'vitest';
import {
  WALLET_START,
  canAfford,
  deserializeWallet,
  earn,
  emptyWallet,
  serializeWallet,
  spend,
} from './economy';
import {
  UNDO_CAP,
  canUndo,
  clearUndo,
  emptyUndo,
  pushMove,
  undoDepth,
  undoMove,
} from './undo';

/** WS-E economy + undo (pure systems, scene wires later). */
describe('WS-E wallet', () => {
  it('starts at 12 and earns +1/BEST', () => {
    const w0 = emptyWallet();
    expect(w0.balance).toBe(WALLET_START);
    const w1 = earn(w0, 1, 'earn:best-resolve');
    expect(w1.balance).toBe(WALLET_START + 1);
    expect(w1.entries).toHaveLength(1);
    expect(w1.entries[0]).toMatchObject({ seq: 0, delta: 1 });
    // Reject junk amounts without mutating.
    expect(earn(w1, 0, 'x')).toBe(w1);
    expect(earn(w1, -3, 'x')).toBe(w1);
  });

  it('spends with no debt and no partials', () => {
    const w0 = emptyWallet(5);
    const w1 = spend(w0, 3, 'spend:hint');
    expect(w1?.balance).toBe(2);
    expect(spend(w0, 6, 'spend:hint')).toBeNull();
    expect(canAfford(w0, 5)).toBe(true);
    expect(canAfford(w0, 6)).toBe(false);
  });

  it('round-trips serialization and rejects corrupt saves', () => {
    const w0 = earn(emptyWallet(), 2, 'earn:visit-complete');
    const back = deserializeWallet(serializeWallet(w0));
    expect(back).toEqual(w0);
    expect(deserializeWallet('not json')).toEqual(emptyWallet());
    expect(deserializeWallet('{"balance":-5,"entries":[]}')).toEqual(emptyWallet());
    expect(deserializeWallet('{"balance":3,"entries":[{"seq":0}]}')).toEqual(
      emptyWallet(),
    );
  });
});

describe('WS-E undo stack', () => {
  it('pushes, undoes in LIFO order, empties cleanly', () => {
    let s = emptyUndo<string>();
    expect(canUndo(s)).toBe(false);
    expect(undoMove(s)).toBeNull();
    s = pushMove(pushMove(pushMove(s, 'm1'), 'm2'), 'm3');
    expect(undoDepth(s)).toBe(3);
    const u1 = undoMove(s);
    expect(u1?.snapshot).toBe('m3');
    const u2 = undoMove(u1?.stack ?? s);
    expect(u2?.snapshot).toBe('m2');
    expect(undoDepth(u2?.stack ?? s)).toBe(1);
  });

  it('caps at 10, dropping the oldest', () => {
    let s = emptyUndo<number>();
    for (let i = 0; i < UNDO_CAP + 4; i += 1) s = pushMove(s, i);
    expect(undoDepth(s)).toBe(UNDO_CAP);
    // Oldest surviving snapshot is 4 (0-3 dropped).
    let cur = s;
    let last = -1;
    for (let i = 0; i < UNDO_CAP; i += 1) {
      const u = undoMove(cur);
      if (!u) break;
      cur = u.stack;
      last = u.snapshot;
    }
    expect(last).toBe(4);
    expect(canUndo(cur)).toBe(false);
  });

  it('clears on demand', () => {
    const s = pushMove(emptyUndo<number>(), 1);
    expect(undoDepth(clearUndo())).toBe(0);
    expect(canUndo(clearUndo<typeof s.past>())).toBe(false);
  });
});
