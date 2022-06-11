import Hero from './../components/Hero';
import ObstacleSpawner from '../components/ObstacleSpawner';
import  { Obstacles } from "../components/Obstacle";
import MovableObjects from './../components/MovableObjects';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  public create(): void {
    console.log('create, game')
    const { displayWidth, displayHeight, centerX, centerY } = this.cameras.main;
    this.add.tileSprite(0, 0, displayWidth, displayHeight, 'tile-bg').setOrigin(0);
    const hero = new Hero({ scene: this, x: 100, y: displayHeight - 200});

    const groundGroup = this.physics.add.staticGroup();
    groundGroup.create(centerX, displayHeight - 50, 'tile-ground');

    this.physics.add.collider(hero, groundGroup);

    const obstacleSpawner = new ObstacleSpawner(this);
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        obstacleSpawner.spawn(Obstacles.Barrier);
      },
      repeat: -1,
    });

    this.physics.add.overlap(hero, obstacleSpawner, this.onOverlap);
  }

  public onOverlap(source: Hero, target: MovableObjects): void {
  } 
};