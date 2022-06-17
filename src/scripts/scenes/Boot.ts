import * as Webfont from '../libs/Webfonts.js';

const hero: string = require('../../assets/images/hero/hero.png');
const car: string = require('../../assets/images/car.png');
const city: string = require('../../assets/images/city.png');
const road: string = require('../../assets/images/road.png');
const bg: string = require('../../assets/images/tiles/bg.png');
const ground: string = require('../../assets/images/tiles/ground.png');
const background: string = require('../../assets/images/background.jpg');
const policeOfficer: string = require('../../assets/images/obstacles/police-officer.png');
const trafficCones: string = require('../../assets/images/obstacles/traffic-cones.png');
const roadSign: string = require('../../assets/images/obstacles/road-sign.png');
const openHatch: string = require('../../assets/images/obstacles/open-hatch.png');
const barrier: string = require('../../assets/images/obstacles/barrier.png');
const shield: string = require('../../assets/images/boosts/shield.png');
const speed: string = require('../../assets/images/boosts/speed.png');
const rolls: string = require('../../assets/images/boosts/rolls.png');
const girls: string = require('../../assets/images/boosts/girls.png');

export default class Boot extends Phaser.Scene {
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
  public preload(): void {
    this.load.spritesheet('hero', hero, { frameWidth: 1418, frameHeight: 1521 });
    this.load.spritesheet('car', car, { frameWidth: 2411, frameHeight: 781 });
    this.load.image('tile-bg', bg);
    this.load.image('tile-ground', ground);
    this.load.image('background', background);
    this.load.image('city', city);
    this.load.image('road', road);

    this.load.image('police-officer', policeOfficer);
    this.load.image('traffic-cones', trafficCones);
    this.load.image('road-sign', roadSign);
    this.load.image('open-hatch', openHatch);
    this.load.image('barrier', barrier);

    this.load.image('boost-shield', shield);
    this.load.image('boost-speed', speed);
    this.load.image('boost-rolls', rolls);
    this.load.image('boost-girls', girls);

  }

  public create(): void {
    this.createAnimations('run', 0, 2);
    this.createAnimations('jump', 3, 4);
    this.createAnimations('fly', 5, 6);
    this.createAnimations('fall', 7, 8);

    this.anims.create({
      key: 'car-move',
      frames: this.anims.generateFrameNumbers('car', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

  }

  public update(): void {
    if (!this.fontsReady) return;
    this.scene.stop();
    this.scene.start('Game');
  }

  private createAnimations(key: string, frameStart: number, frameEnd: number): void {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNumbers('hero', { start: frameStart, end: frameEnd }),
      frameRate: 6,
      repeat: -1
    });
  }
};
