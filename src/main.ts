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

// eslint-disable-next-line no-new
new Phaser.Game(config);
