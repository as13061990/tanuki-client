import LoadingBar from '../components/LoadingBar';
import { State } from '../types';

const hero: string = require('../../assets/images/hero/hero.png');
const heroShield: string = require('../../assets/images/hero/shield.png');
const car: string = require('../../assets/images/car.png');
const city: string = require('../../assets/images/city.png');
const road: string = require('../../assets/images/road.png');
const bg: string = require('../../assets/images/tiles/bg.png');
const ground: string = require('../../assets/images/tiles/ground.png');
const background: string = require('../../assets/images/background.jpg');
const startBackground: string = require('../../assets/images/start-screen.jpg');
const startButton: string = require('../../assets/images/start-button.png');
const policeOfficer: string = require('../../assets/images/obstacles/police-officer.png');
const trafficCones: string = require('../../assets/images/obstacles/traffic-cones.png');
const roadSign: string = require('../../assets/images/obstacles/road-sign.png');
const openHatch: string = require('../../assets/images/obstacles/open-hatch.png');
const barrier: string = require('../../assets/images/obstacles/barrier.png');
const shield: string = require('../../assets/images/boosts/shield.png');
const speed: string = require('../../assets/images/boosts/speed.png');
const rolls: string = require('../../assets/images/boosts/rolls.png');
const girls: string = require('../../assets/images/boosts/girls.png');
const whitePixel: string = require('../../assets/images/white-pixel.jpg');
const modalBackground: string = require('../../assets/images/modal/modal-background.png');
const checkpoint: string = require('../../assets/images/modal/checkpoint.png');
const restartButton: string = require('../../assets/images/modal/restart-button.png');
const resumeButton: string = require('../../assets/images/modal/resume-button.png');
const endBig: string = require('../../assets/images/modal/end-big.png');
const endMini: string = require('../../assets/images/modal/end-mini.png');
const firstPlace: string = require('../../assets/images/modal/first-place.png');
const nextPlace: string = require('../../assets/images/modal/next-place.png');
const checkpointAnimation: string = require('../../assets/images/checkpoint/animation.png');
const checkpointSprite: string = require('../../assets/images/checkpoint/girl.png');

const boostGirls: string = require('../../assets/sounds/boost-girl.mp3');
const boostRolls: string = require('../../assets/sounds/boost-rolls.mp3');
const boost: string = require('../../assets/sounds/boost.mp3');
const checkpointSound: string = require('../../assets/sounds/checkpoint.mp3');
const jump: string = require('../../assets/sounds/jump.mp3');
const main: string = require('../../assets/sounds/main.mp3');
const police: string = require('../../assets/sounds/police.mp3');

export default class Preload extends Phaser.Scene {
  public state: State;

  constructor() {
    super('Preload');
  }

  public init(state: State) {
    this.state = state;
  }

  public preload(): void {
    this.add.sprite(0, 0, 'load-screen').setOrigin(0);
    new LoadingBar(this);
    this.preloadAssets();
  }

  private preloadAssets(): void {
    this.load.spritesheet('hero', hero, { frameWidth: 1418, frameHeight: 1521 });
    this.load.spritesheet('car', car, { frameWidth: 2411, frameHeight: 781 });
    this.load.spritesheet('checkpoint-animation', checkpointAnimation, { frameWidth: 424, frameHeight: 427 });
    this.load.image('hero-shield', heroShield);
    this.load.image('checkpoint-sprite', checkpointSprite);
    this.load.image('tile-bg', bg);
    this.load.image('tile-ground', ground);
    this.load.image('background', background);
    this.load.image('start-screen', startBackground);
    this.load.image('start-button', startButton);
    this.load.image('city', city);
    this.load.image('road', road);
    this.load.image('white-pixel', whitePixel);
    this.load.image('police-officer', policeOfficer);
    this.load.image('traffic-cones', trafficCones);
    this.load.image('road-sign', roadSign);
    this.load.image('open-hatch', openHatch);
    this.load.image('barrier', barrier);

    this.load.image('boost-shield', shield);
    this.load.image('boost-speed', speed);
    this.load.image('boost-rolls', rolls);
    this.load.image('boost-girls', girls);
    
    this.load.image('modal-background', modalBackground);

    this.load.image('checkpoint', checkpoint);
    this.load.image('restart-button', restartButton);
    this.load.image('resume-button', resumeButton);
    this.load.image('end-big', endBig);
    this.load.image('end-mini', endMini);
    this.load.image('first-place', firstPlace);
    this.load.image('next-place', nextPlace);

    this.load.audio('boost-girls', boostGirls);
    this.load.audio('boost-rolls', boostRolls);
    this.load.audio('boost', boost);
    this.load.audio('checkpoint', checkpointSound);
    this.load.audio('jump', jump);
    this.load.audio('main', main);
    this.load.audio('police', police);
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

    this.anims.create({
      key: 'checkpoint-anim',
      frames: this.anims.generateFrameNumbers('checkpoint-animation', { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1
    });
    this.scene.stop();
    this.scene.start('Start', this.state);
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
