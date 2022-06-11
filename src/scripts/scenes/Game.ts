import Hero from './../components/Hero';
import ObstacleSpawner from '../components/ObstacleSpawner';
import  { Obstacles } from "../components/Obstacle";
import MovableObjects from './../components/MovableObjects';

export default class Game extends Phaser.Scene {
  private score: number = 0;

  constructor() {
    super('Game');
  }

  public init(): void {
    this.score = 0;
  }

  public create(): void {
    console.log('create, game')
    const { displayWidth, displayHeight, centerX, centerY } = this.cameras.main;
    this.add.tileSprite(0, 0, displayWidth, displayHeight, 'tile-bg').setOrigin(0);
    const hero = new Hero({ scene: this, x: 100, y: displayHeight - 200});

    const groundGroup = this.physics.add.staticGroup();
    groundGroup.create(centerX, displayHeight - 50, 'tile-ground');

    this.physics.add.collider(hero, groundGroup);

    const fakeBox = this.physics.add.sprite(20, centerY, 'hero-run');
    fakeBox.setVisible(false);
    fakeBox.body.setSize(5, displayHeight);

    const obstacleSpawner = new ObstacleSpawner(this);
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        obstacleSpawner.spawn(Obstacles.Barrier);
      },
      repeat: -1,
    });

    this.physics.add.overlap(hero, obstacleSpawner, this.onOverlap, undefined, this);
    this.physics.add.overlap(fakeBox, obstacleSpawner, this.incrementScore, undefined, this);

    console.log(this.score);
  }

  public onOverlap(source: Hero, target: MovableObjects): void {
    if (source.isDamaged) return;
    target.destroy();
    source.takeDamage();
  } 

  public incrementScore(source: Phaser.Physics.Arcade.Sprite, target: MovableObjects): void {
    if (target.type === Obstacles.Barrier) {
      console.log(this.score);
      this.score += 1;
      target.destroy();
      console.log(this.score);
    }
  }
};