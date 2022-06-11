import Obstacle, { Obstacles } from "./Obstacle";

export default class ObstacleSpawner extends Phaser.Physics.Arcade.Group {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
    this.init();
  }

  private init(): void {
    this.scene.add.existing(this);
  }

  public spawn(type: Obstacles): void {
    const x: number = this.scene.cameras.main.displayWidth + 200;
    const y: number =  this.scene.cameras.main.displayHeight - 140;
    const obstacle = new Obstacle({
      x: x,
      y: y,
      texture: type,
      scene: this.scene,
    });
    this.add(obstacle);
    obstacle.move();
  }
}



enum Boosts {
  Shield = 'boost-shield',
  Speed = 'boost-speed',
  Rolls = 'boost-rolls',
  Girls = 'boost-girls',
}