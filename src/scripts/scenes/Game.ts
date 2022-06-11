import Hero from './../components/Hero';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  public create(): void {
    console.log('create, game')
    const { displayWidth, displayHeight, centerX, centerY } = this.cameras.main;
    this.add.tileSprite(0, 0, displayWidth, displayHeight, 'tile-bg').setOrigin(0);
    const hero = new Hero({ scene: this, x: centerX, y: centerY});
    hero.play('run');
  }
};