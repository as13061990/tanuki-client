const heroRun: string = require('../../assets/images/hero/run.png');
const heroIdle: string = require('../../assets/images/hero/idle.png');
const heroJump: string = require('../../assets/images/hero/jump.png');
const heroDepth: string = require('../../assets/images/hero/depth.png');
const bg: string = require('../../assets/images/tiles/bg.png');
const ground: string = require('../../assets/images/tiles/ground.png');
const testObstacle: string = require('../../assets/images/obstacles/test.png');

export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  public preload(): void {
    this.load.spritesheet('hero-run', heroRun, { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('hero-idle', heroIdle, { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('hero-depth', heroDepth, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('hero-jump', heroJump, { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('barrier', testObstacle, { frameWidth: 32, frameHeight: 32 });
    this.load.image('tile-bg', bg);
    this.load.image('tile-ground', ground);
  }

  public create(): void {
    this.createAnimations('run', 6);
    this.createAnimations('idle', 6);
    this.createAnimations('depth', 4);
    this.createAnimations('jump', 5);
    
    this.scene.stop();
    this.scene.start('Game');
  }

  private createAnimations(key: string, frameCount: number): void {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNumbers(`hero-${key}`, { start: 0, end: frameCount - 1 }),
      frameRate: 10,
      repeat: -1
    });
  }
};
