import Phaser from 'phaser';
import { THEME } from './chromeTheme';

/**
 * F1 backend ticker: 1-2 rows of translucent terminal text above
 * the menu bar, narrating backend activity for judges + technical
 * players (e.g. trajectory pre-computation). Subtle, muted, small,
 * legible; the About sheet toggle turns it off (persisted).
 *
 * GEOMETRY CONTRACT (G4 honors): the strip owns x0-540, y852-888
 * (2 rows) and collapses to y870-888 (1 row). G4 shifts the Visit
 * card row up 36px so nothing sits under the ticker.
 */

/** Rotating mock feed until the live backend feed ships. */
export const MOCK_FEED: readonly string[] = [
  'ready: 12 patients \u00b7 204 nodes pre-computed',
  'supabase: primary \u00b7 fallback pack loaded',
  'muse-spark-1.3: idle \u00b7 last seed 0 vetoes',
  'trajectories: 2 turns ahead \u00b7 instant reads',
  'engine: authoritative \u00b7 veto armed',
];

/**
 * Pure visibility rule (unit-tested): the player toggle wins,
 * then the Telemed call band (its buttons own y852-888).
 */
export function tickerVisible(view: string, tickerOn: boolean): boolean {
  if (!tickerOn) return false;
  return view !== 'telemed';
}

/** Pure feed rotation (unit-tested). */
export function nextFeedLine(
  feed: readonly string[],
  cursor: number,
): { line: string; cursor: number } {
  if (feed.length === 0) return { line: '', cursor: 0 };
  const at = ((cursor % feed.length) + feed.length) % feed.length;
  const line = feed[at] ?? '';
  return { line, cursor: at + 1 };
}

export class BackendTicker {
  private root: Phaser.GameObjects.Container;
  private bg: Phaser.GameObjects.Graphics;
  private rows: Phaser.GameObjects.Text[] = [];
  private collapsed = false;
  private feedCursor = 0;
  private useMockFeed = true;

  constructor(private scene: Phaser.Scene) {
    this.bg = this.scene.add.graphics();
    for (let i = 0; i < 2; i += 1) {
      this.rows.push(
        this.scene.add
          .text(12, 861 + i * 18, '', {
            fontFamily: THEME.mono,
            fontSize: '11px',
            color: THEME.terminalInk,
          })
          .setOrigin(0, 0.5),
      );
    }
    this.root = this.scene.add.container(0, 0, [this.bg, ...this.rows]);
    this.root.setDepth(18);
    this.paint();
    this.setLines(['', '']);
  }

  private paint(): void {
    const top = this.collapsed ? 870 : 852;
    this.bg.clear();
    this.bg.fillStyle(THEME.terminalBg, THEME.terminalBgAlpha);
    this.bg.fillRect(0, top, 540, 888 - top);
    this.bg.fillStyle(THEME.outline, 0.25);
    this.bg.fillRect(0, top, 540, 1);
    this.rows.forEach((row, i) => {
      row.setVisible(!this.collapsed || i === 1);
      row.setY((this.collapsed ? 879 : 861) + i * 18);
    });
  }

  setCollapsed(collapsed: boolean): void {
    this.collapsed = collapsed;
    this.paint();
  }

  setLines(lines: readonly [string, string]): void {
    this.rows.forEach((row, i) => {
      const line = lines[i] ?? '';
      row.setText(line === '' ? '' : `> ${line}`);
    });
  }

  /** One-shot: the Muse reword proxy went live (row 1 kept). */
  noteRewordLive(): void {
    const first = this.rows[0]?.text.replace(/^> /, '') ?? '';
    this.setLines([first, 'muse-reword: live · greeting variants on']);
  }

  /** One scroll step: row 2 climbs, the live note lands (11px mono). */
  pushLive(line: string): void {
    const second = this.rows[1]?.text.replace(/^> /, '') ?? '';
    this.setLines([second, line]);
  }

  /** One mock-feed tick: scrolls line 2 up, pulls the next line. */
  tickMock(): void {
    if (!this.useMockFeed) return;
    const second = this.rows[1]?.text.replace(/^> /, '') ?? '';
    const next = nextFeedLine(MOCK_FEED, this.feedCursor);
    this.feedCursor = next.cursor;
    this.setLines([second, next.line]);
  }

  useLiveFeed(): void {
    this.useMockFeed = false;
  }

  setVisible(visible: boolean): void {
    this.root.setVisible(visible);
  }
}
