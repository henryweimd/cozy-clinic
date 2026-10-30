/**
 * Care Coin icon: code-drawn metallic disc ($0, pixel-crisp at any
 * DPI, offline-safe). Gold body, warm-brown outline, inner light
 * ring, care-cross emblem, specular dot — the currency symbol the
 * coin always deserved. One helper serves Profile, Shop, and the
 * result modal so the coin never drifts between screens.
 */

export const COIN_GOLD = 0xe9b44c;
export const COIN_LIGHT = 0xf6d789;
export const COIN_DEEP = 0xb97a2a;
const COIN_OUTLINE = 0x8a5a3b;

export function drawCoin(
  g: Phaser.GameObjects.Graphics,
  x: number,
  y: number,
  r: number,
): void {
  g.fillStyle(COIN_GOLD, 1);
  g.lineStyle(2, COIN_OUTLINE, 1);
  g.fillCircle(x, y, r);
  g.strokeCircle(x, y, r);
  g.lineStyle(2, COIN_LIGHT, 1);
  g.strokeCircle(x, y, r - 4);
  // Care-cross emblem.
  const t = Math.max(2, r * 0.3);
  const a = r * 0.52;
  g.fillStyle(COIN_DEEP, 1);
  g.fillRect(x - t / 2, y - a, t, a * 2);
  g.fillRect(x - a, y - t / 2, a * 2, t);
  // Specular dot (the metallic read at small sizes).
  g.fillStyle(0xffffff, 0.9);
  g.fillCircle(x - r * 0.34, y - r * 0.38, Math.max(1.5, r * 0.16));
}
