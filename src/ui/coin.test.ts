import { describe, expect, it, vi } from 'vitest';
import { COIN_DEEP, COIN_GOLD, COIN_LIGHT, drawCoin } from './coin';

/** Records Graphics calls so the coin design locks without a canvas. */
function stubGraphics(): {
  g: Phaser.GameObjects.Graphics;
  calls: { op: string; args: unknown[] }[];
} {
  const calls: { op: string; args: unknown[] }[] = [];
  const rec = (op: string) =>
    vi.fn((...args: unknown[]) => {
      calls.push({ op, args });
    });
  const g = {
    fillStyle: rec('fillStyle'),
    lineStyle: rec('lineStyle'),
    fillCircle: rec('fillCircle'),
    strokeCircle: rec('strokeCircle'),
    fillRect: rec('fillRect'),
  } as unknown as Phaser.GameObjects.Graphics;
  return { g, calls };
}

describe('drawCoin', () => {
  it('draws body, ring, cross, and specular in that order', () => {
    const { g, calls } = stubGraphics();
    drawCoin(g, 100, 200, 10);
    const ops = calls.map((c) => c.op);
    expect(ops).toEqual([
      'fillStyle',
      'lineStyle',
      'fillCircle',
      'strokeCircle',
      'lineStyle',
      'strokeCircle',
      'fillStyle',
      'fillRect',
      'fillRect',
      'fillStyle',
      'fillCircle',
    ]);
  });

  it('centers every element on (x, y) with the gold palette', () => {
    const { g, calls } = stubGraphics();
    drawCoin(g, 100, 200, 10);
    expect(calls[0]).toEqual({ op: 'fillStyle', args: [COIN_GOLD, 1] });
    expect(calls[2]).toEqual({ op: 'fillCircle', args: [100, 200, 10] });
    expect(calls[3]).toEqual({ op: 'strokeCircle', args: [100, 200, 10] });
    expect(calls[5]).toEqual({ op: 'strokeCircle', args: [100, 200, 6] });
    expect(calls[4]).toEqual({ op: 'lineStyle', args: [2, COIN_LIGHT, 1] });
    expect(calls[6]).toEqual({ op: 'fillStyle', args: [COIN_DEEP, 1] });
    // Cross bars are symmetric about the center.
    const [vx, vy, vw, vh] = calls[7].args as number[];
    const [hx, hy, hw, hh] = calls[8].args as number[];
    expect(vx + vw / 2).toBeCloseTo(100, 5);
    expect(vy + vh / 2).toBeCloseTo(200, 5);
    expect(hx + hw / 2).toBeCloseTo(100, 5);
    expect(hy + hh / 2).toBeCloseTo(200, 5);
    // Specular sits up-left of center.
    const [sx, sy] = calls[10].args as number[];
    expect(sx).toBeLessThan(100);
    expect(sy).toBeLessThan(200);
  });
});
