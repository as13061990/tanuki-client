import * as Webfont from '../libs/Webfonts.js';

const loadScreen: string = require('../../assets/images/load.jpg');
const progressBar: string = require('../../assets/images/progress-bar.png');

export default class BootScene extends Phaser.Scene {
  private fontsReady: boolean;

  constructor() {
    super('Boot');
  }

  public init(): void {
    Webfont.load({
      custom: { families: [
      'LuckiestGuy',
    ] },
      active: () => { this.fontsReady = true },
    });
  }

  public preload (): void {
    this.load.image('load-screen', loadScreen);
    this.load.image('progress-bar', progressBar);
  }

  public update(): void {
    if (!this.fontsReady) return;
    this.scene.start('Preload');
  }
}