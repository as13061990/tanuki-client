import Hero from './../components/Hero';
import Car from './../components/Car';
import ObstacleSpawner from '../components/ObstacleSpawner';
import  { Obstacles } from "../components/Obstacle";
import MovableObjects from './../components/MovableObjects';
import BoostSpawner from './../components/BoostSpawner';
import Boost, { Boosts } from '../components/Boost';

export default class Game extends Phaser.Scene {
  private score: number = 0;
  private bg: Phaser.GameObjects.TileSprite;
  private road: Phaser.GameObjects.TileSprite;
  private scoreText: Phaser.GameObjects.Text;
  private car: Car;
  constructor() {
    super('Game');
  }

  public init(): void {
    this.score = 0;
  }

  public create(): void {
    console.log('create, game')
    const { displayWidth, displayHeight, centerX, centerY } = this.cameras.main;
    this.add.sprite(centerX, centerY, 'background');
    this.scoreText = this.add.text(580, 90, this.score.toString(), {
      fontFamily: 'LuckiestGuy',
      fontSize: '50px',
    }).setOrigin(0.5);


    const hero = new Hero({ scene: this, x: 250, y: displayHeight - 400 });
    this.car = new Car({ scene: this, x: 80, y: displayHeight - 370 });
    this.add.sprite(100, displayHeight - 370, 'car', 1);


    const groundGroup = this.physics.add.staticGroup();
    groundGroup.create(centerX, displayHeight - 270, 'tile-ground');

    this.physics.add.collider(hero, groundGroup);

    const obstacleSpawner = new ObstacleSpawner(this);
    const boostSpawner = new BoostSpawner(this);

    this.physics.add.overlap(hero, obstacleSpawner, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.car, obstacleSpawner, this.incrementScore, undefined, this);
    this.physics.add.overlap(hero, boostSpawner, this.onBoostOverlap, undefined, this);
    
    this.createCityBackground();

    console.log(this.score);
  }

  public onOverlap(hero: Hero, target: MovableObjects): void {
    if (hero.isDamaged) return;
    target.destroy();
    hero.takeDamage();
    this.car.move(true);
  } 

  public incrementScore(source: Phaser.Physics.Arcade.Sprite, target: MovableObjects): void {
    this.score += 3;
    target.destroy();
    console.log(this.score);
  }

  public onBoostOverlap(hero: Hero, boost: Boost) {
    switch (boost.type) {
      case Boosts.Girls:
        this.score += 50;
        break;
      case Boosts.Rolls:
        this.score += 20;
        break;
      case Boosts.Speed:
        break;
      case Boosts.Shield:
        break;
    }

    boost.destroy();
  }

  public update(): void {
    this.bg.tilePositionX += 1;
    this.road.tilePositionX += 1;

    if (this.scoreText.text != this.score.toString()) {
      this.scoreText.text = this.score.toString();
    }
  }

  private createCityBackground(): void {
    this.bg = this.add.tileSprite(0, this.cameras.main.displayHeight - 400, this.cameras.main.displayWidth, 564, 'city').setOrigin(0, 1);
    this.road = this.add.tileSprite(0, this.cameras.main.displayHeight - 150, this.cameras.main.displayWidth, 254, 'road').setOrigin(0, 1);
  }
};