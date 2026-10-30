/**
 * Code-drawn UI icons ($0, pixel-crisp at any DPI, offline-safe).
 * One helper per icon so Profile, Shop, and the result modal never
 * drift between screens. Palette matches the cozy art bible (gold,
 * cream paper, warm-brown outline).
 */

export const COIN_GOLD = 0xe9b44c;
export const COIN_LIGHT = 0xf6d789;
export const COIN_DEEP = 0xb97a2a;
const INK = 0x8a5a3b;
const PAPER = 0xfffdf5;
const FAINT = 0xc9a87f;
const CARD_BG = 0xfff9ef;
const SAGE = 0xa9c6a2;

/** Metallic Care Coin: gold body, inner ring, care cross, specular. */
export function drawCoin(
  g: Phaser.GameObjects.Graphics,
  x: number,
  y: number,
  r: number,
): void {
  g.fillStyle(COIN_GOLD, 1);
  g.lineStyle(2, INK, 1);
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

/**
 * Open book: cream pages, spine, two text lines a side. (x, y) is
 * the spine center; s is the half-width of the whole book.
 */
export function drawBook(
  g: Phaser.GameObjects.Graphics,
  x: number,
  y: number,
  s: number,
): void {
  const h = s * 0.75;
  g.fillStyle(PAPER, 1);
  g.lineStyle(2, INK, 1);
  g.fillRoundedRect(x - s, y - h, s, h * 2, 4);
  g.strokeRoundedRect(x - s, y - h, s, h * 2, 4);
  g.fillRoundedRect(x, y - h, s, h * 2, 4);
  g.strokeRoundedRect(x, y - h, s, h * 2, 4);
  // Spine + page text lines.
  g.lineStyle(2, INK, 1);
  g.lineBetween(x, y - h, x, y + h);
  g.lineStyle(2, FAINT, 1);
  for (const dy of [-h * 0.4, 0, h * 0.4]) {
    g.lineBetween(x - s + 6, y + dy, x - 8, y + dy);
    g.lineBetween(x + 8, y + dy, x + s - 6, y + dy);
  }
}

/**
 * Team badge: Sun gets rays, Moon a crescent (cut with the card
 * fill), Star a 5-point path, anything typed a sage disc (the
 * scene overlays the initial). (x, y) is the center; r the body.
 */
export function drawTeamBadge(
  g: Phaser.GameObjects.Graphics,
  x: number,
  y: number,
  r: number,
  tag: string,
): void {
  const t = tag.toLowerCase();
  if (t === 'sun') {
    g.lineStyle(3, COIN_DEEP, 1);
    for (let i = 0; i < 8; i += 1) {
      const a = (i / 8) * Math.PI * 2;
      g.lineBetween(
        x + Math.cos(a) * (r + 3),
        y + Math.sin(a) * (r + 3),
        x + Math.cos(a) * (r + 9),
        y + Math.sin(a) * (r + 9),
      );
    }
    g.fillStyle(COIN_GOLD, 1);
    g.lineStyle(2, INK, 1);
    g.fillCircle(x, y, r);
    g.strokeCircle(x, y, r);
    return;
  }
  if (t === 'moon') {
    g.fillStyle(COIN_GOLD, 1);
    g.lineStyle(2, INK, 1);
    g.fillCircle(x, y, r);
    g.strokeCircle(x, y, r);
    g.fillStyle(CARD_BG, 1);
    g.fillCircle(x + r * 0.45, y - r * 0.25, r * 0.78);
    return;
  }
  if (t === 'star') {
    g.fillStyle(COIN_GOLD, 1);
    g.lineStyle(2, INK, 1);
    g.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const rr = i % 2 === 0 ? r : r * 0.45;
      const a = -Math.PI / 2 + (i / 10) * Math.PI * 2;
      const px = x + Math.cos(a) * rr;
      const py = y + Math.sin(a) * rr;
      if (i === 0) g.moveTo(px, py);
      else g.lineTo(px, py);
    }
    g.closePath();
    g.fillPath();
    g.strokePath();
    return;
  }
  g.fillStyle(SAGE, 1);
  g.lineStyle(2, INK, 1);
  g.fillCircle(x, y, r);
  g.strokeCircle(x, y, r);
}
