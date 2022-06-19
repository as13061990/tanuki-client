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
  private hero: Hero;
  private car: Car;
  public currentVelocity: number = 300;
  private readonly minVelocity: number = 320;
  private readonly maxVelocity: number = 1000;
  public pause: boolean;

  public state: State;
  private checkpoint: Checkpoint;

  private checkpointCount: integer = 0;

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
    this.scoreText = this.add.text(580, 90, this.state.currentPoints.toString(), {
      fontFamily: 'LuckiestGuy',
      fontSize: '50px',
    }).setOrigin(0.5);


    this.hero = new Hero({ scene: this, x: 250, y: displayHeight - 400 });
    this.car = new Car({ scene: this, x: 80, y: displayHeight - 370 });

    const groundGroup = this.physics.add.staticGroup();
    groundGroup.create(centerX, displayHeight - 270, 'tile-ground');

    this.physics.add.collider(this.hero, groundGroup);

    const obstacleSpawner = new ObstacleSpawner(this);
    const boostSpawner = new BoostSpawner(this);

    this.physics.add.overlap(this.hero, obstacleSpawner, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.car, obstacleSpawner, this.incrementScore, undefined, this);
    this.physics.add.overlap(this.hero, boostSpawner, this.onBoostOverlap, undefined, this);
    
    this.createCityBackground();
  }

  public onOverlap(hero: Hero, target: MovableObjects): void {
    if (hero.isDamaged || hero.hasShield) {
      target.destroy();
    } else {
      target.destroy();
      hero.takeDamage();
      this.car.move(hero.currentHealth);
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
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.scene.pause();
        this.state.modal = Modals.Checkpoint;
        this.scene.launch('Modal', this.state);
        anim.destroy();
        this.checkpointCount = 0;
      }
    });
  }

  public setResume(): void {
    this.pause = false;
    this.hero.setVisible(true);
    this.scene.resume();
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
        this.checkpointCount += 50;
        hero.spawnText('+50');
        break;
      case Boosts.Rolls:
        this.state.currentPoints += 20;
        this.checkpointCount += 20;
        hero.spawnText('+20');
        break;
      case Boosts.Speed:
        if (hero.currentHealth < 3) {
          hero.incHealth();
          this.car.move(hero.currentHealth);
        }
        break;
      case Boosts.Shield:
        hero.setShield();
        break;
    }

    boost.destroy();
    console.log(this.checkpointCount);
  }

  private endGame(): void {
    this.scene.pause();
    api.setNewScore({ tgId: this.state.tgId, points: this.state.currentPoints })
      .then(data => {
        if (!data.error) {
          this.state.currentPoints = 0;
          this.state.modal = Modals.End;
          this.scene.launch('Modal', this.state);
        }
      });
  }

  public update(): void {
    if (this.pause) return;
    this.bg.tilePositionX += 1;
    this.road.tilePositionX += 1;

    if (this.scoreText.text != this.state.currentPoints.toString()) {
      this.scoreText.text = this.state.currentPoints.toString();
    }

    if (this.hero.currentHealth <= 0) {
      this.endGame();
    }

    if (this.checkpointCount > 500 && !this.checkpoint) {
      this.createCheckpoint();
    }

    let velocity = this.minVelocity;
    const pointsOffset = 200;
    if (this.state.currentPoints > pointsOffset) {
      velocity += this.state.currentPoints - pointsOffset;
    }
    this.currentVelocity = Math.min(velocity, this.maxVelocity);
  }

  private createCityBackground(): void {
    this.bg = this.add.tileSprite(0, this.cameras.main.displayHeight - 400, this.cameras.main.displayWidth, 564, 'city').setOrigin(0, 1);
    this.road = this.add.tileSprite(0, this.cameras.main.displayHeight - 150, this.cameras.main.displayWidth, 254, 'road').setOrigin(0, 1);
  }
};