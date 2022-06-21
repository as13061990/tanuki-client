import Hero from './../components/Hero';
import Car from './../components/Car';
import ObstacleSpawner from '../components/ObstacleSpawner';
import MovableObjects from './../components/MovableObjects';
import BoostSpawner from './../components/BoostSpawner';
import Boost, { Boosts } from '../components/Boost';
import { State } from '../types';
import { Modals } from './Modal';
import api from '../libs/Api';
import Checkpoint from '../components/Checkpoint';

export default class Game extends Phaser.Scene {
  private bg: Phaser.GameObjects.TileSprite;
  private road: Phaser.GameObjects.TileSprite;
  private scoreText: Phaser.GameObjects.Text;
  public hero: Hero;
  private car: Car;
  public currentVelocity: number = 300;
  private readonly minVelocity: number = 320;
  private readonly maxVelocity: number = 1000;
  public pause: boolean;

  public state: State;
  private checkpoint: Checkpoint;

  private checkpointCount: integer = 0;
  private timer: Phaser.Time.TimerEvent;
  obstacleSpawner: ObstacleSpawner;

  constructor() {
    super('Game');
  }

  public init(state: State): void {
    this.state = state;
    this.state.currentPoints = 0;
  }

  public create(): void {
    const { displayWidth, displayHeight, centerX, centerY } = this.cameras.main;
    this.add.sprite(centerX, centerY, 'background');
    this.createCityBackground();

    this.scoreText = this.add.text(580, 90, this.state.currentPoints.toString(), {
      fontFamily: 'LuckiestGuy',
      fontSize: '50px',
    }).setOrigin(0.5);


    this.hero = new Hero({ scene: this, x: 250, y: displayHeight - 400 });
    this.car = new Car({ scene: this, x: 80, y: displayHeight - 370 });

    const groundGroup = this.physics.add.staticGroup();
    groundGroup.create(centerX, displayHeight - 270, 'tile-ground');

    this.physics.add.collider(this.hero, groundGroup);

    this.obstacleSpawner = new ObstacleSpawner(this);
    const boostSpawner = new BoostSpawner(this);

    this.physics.add.overlap(this.hero, this.obstacleSpawner, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.car, this.obstacleSpawner, this.incrementScore, undefined, this);
    this.physics.add.overlap(this.hero, boostSpawner, this.onBoostOverlap, undefined, this);
    
    this.createTimer();
  }

  public onOverlap(hero: Hero, target: MovableObjects): void {
    if (hero.isDamaged || hero.hasShield) {
      target.destroy();
      this.state.currentPoints += 3;
      this.hero.spawnText('+3');
    } else {
      target.destroy();
      hero.takeDamage();
      this.car.move(hero.currentHealth);
      this.sound.play('police', { name: '12', duration: 3 });
    }
  } 

  private createCheckpoint(): void {
    this.checkpoint = new Checkpoint(this);
    this.physics.add.overlap(this.hero, this.checkpoint, this.onCheckpointOverlap, undefined, this);
  }

  private onCheckpointOverlap(hero: Hero, target: Checkpoint): void {
    this.checkpoint.destroy();
    this.checkpoint = null;
  }

  public setPause(anim: Phaser.GameObjects.Sprite): void {
    this.pause = true;
    this.hero.setVisible(false);
    this.sound.play('checkpoint', { name: 'checkpoint', duration: 3 } );
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.scene.pause();
        this.state.modal = Modals.Checkpoint;
        this.scene.launch('Modal', this.state);
        anim.destroy();
        this.checkpointCount = 0;
      }
    });
  }

  private createTimer(): void {
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.pause) return;
        this.checkpointCount += 1;
        this.state.currentPoints += 2;
      },
      loop: true,
    });
  }

  public setResume(): void {
    this.pause = false;
    this.hero.setVisible(true);
    this.scene.resume();
    this.obstacleSpawner.updateTimer();
  }

  public incrementScore(source: Phaser.Physics.Arcade.Sprite, target: MovableObjects): void {
    this.state.currentPoints += 3;
    this.checkpointCount += 3;
    target.destroy();
    this.hero.spawnText('+3');
  }

  public onBoostOverlap(hero: Hero, boost: Boost) {
    switch (boost.type) {
      case Boosts.Girls:
        this.state.currentPoints += 50;
        this.sound.play('boost-girls');
        hero.spawnText('+50');
        break;
      case Boosts.Rolls:
        this.state.currentPoints += 20;
        this.sound.play('boost-rolls');
        hero.spawnText('+20');
        break;
      case Boosts.Speed:
        this.sound.play('boost');
        if (hero.currentHealth < 3) {
          hero.incHealth();
          this.car.move(hero.currentHealth);
        }
        break;
      case Boosts.Shield:
        this.sound.play('boost');
        hero.setShield();
        break;
    }

    boost.destroy();
  }

  private endGame(): void {
    this.scene.pause();
    api.setNewScore({ tgId: this.state.tgId, points: this.state.currentPoints })
      .then(data => {
        if (!data.error) {
          this.state.modal = Modals.End;
          this.scene.launch('Modal', this.state);
        }
      });
  }

  public update(): void {
    if (this.pause) return;

    if (this.scoreText.text != this.state.currentPoints.toString()) {
      this.scoreText.text = this.state.currentPoints.toString();
    }

    if (this.hero.currentHealth <= 0) {
      this.endGame();
    }

    if (this.checkpointCount > 60 && !this.checkpoint) {
      this.createCheckpoint();
    }

    let velocity = this.minVelocity;
    const pointsOffset = 200;
    if (this.state.currentPoints > pointsOffset) {
      velocity += (this.state.currentPoints - pointsOffset) / 2;
    }
    this.currentVelocity = Math.min(velocity, this.maxVelocity);

    this.bg.tilePositionX += this.currentVelocity / this.minVelocity * 2.2;
    this.road.tilePositionX += this.currentVelocity / this.minVelocity * 2.2;
  }

  private createCityBackground(): void {
    this.road = this.add.tileSprite(0, this.cameras.main.displayHeight - 150, this.cameras.main.displayWidth, 254, 'road').setOrigin(0, 1);
    this.bg = this.add.tileSprite(0, this.cameras.main.displayHeight - 335, this.cameras.main.displayWidth, 751, 'city').setOrigin(0, 1);
  }
};