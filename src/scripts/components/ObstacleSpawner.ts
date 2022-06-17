import Obstacle, { Obstacles } from "./Obstacle";

export default class ObstacleSpawner extends Phaser.Physics.Arcade.Group {
  private timer: Phaser.Time.TimerEvent;
  
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
    this.init();
  }

  private init(): void {
    this.scene.add.existing(this);
    this.timer = this.scene.time.addEvent({
      delay: 2500,
      callback: () => {
        this.spawn(this.getRandomObstacle());
      },
      repeat: -1,
    });
    this.spawn(this.getRandomObstacle());
  }

  public stopTimer(): void {
    this.timer.destroy();
  }

  private getRandomObstacle(): Obstacles {
    return Phaser.Utils.Array.GetRandom(Object.values(Obstacles));
  }

  private spawn(type: Obstacles): void {
    const x: number = this.scene.cameras.main.displayWidth + 200;
    const y: number =  this.scene.cameras.main.displayHeight - 320;
    const obstacle = new Obstacle({
      x: x,
      y: y,
      texture: type,
      scene: this.scene,
    });
    this.add(obstacle);
    obstacle.move();
  }
};