import Phaser from 'phaser';
import { ClinicScene } from './scenes/ClinicScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-root',
  width: 540,
  height: 960,
  backgroundColor: '#FCEBD6',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [ClinicScene],
};

// P4: boot only after the vendored Baloo 2 face is ready, so the
// scene never draws text in the fallback stack first (no FOUT swap
// mid-game). The 3s timeout keeps boot robust: if the local font
// ever fails, the game still starts in the rounded-system fallback.
async function boot(): Promise<void> {
  try {
    await Promise.race([
      Promise.all([
        document.fonts.load('500 22px "Baloo 2"'),
        document.fonts.load('700 44px "Baloo 2"'),
      ]),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
  } catch {
    // Fall through to the fallback stack; the game stays playable.
  }
  // eslint-disable-next-line no-new
  new Phaser.Game(config);
}

void boot();
