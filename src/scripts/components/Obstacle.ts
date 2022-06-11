import MovableObjects, { MovableObjectData } from './MovableObjects';

export default class Obstacle extends MovableObjects {
  public type: Obstacles;

  constructor(data: ObstacleData) {
    super({
      x: data.x,
      y: data.y,
      texture: data.texture,
      velocity: -200,
      scene: data.scene,
    });
    this.setScale(5);
    this.body.setCircle(10).setOffset(5, 5);
    this.type = data.texture;
  }
};

type ObstacleData = {
  scene: Phaser.Scene,
  x: number,
  y: number,
  texture: Obstacles,
}

enum Obstacles {
  Police_officer = 'police-officer',
  Traffic_cones = 'traffic-cones',
  Road_sign = 'road-sign',
  Open_hatch = 'open-hatch',
  Barrier = 'barrier',
}

export { ObstacleData, Obstacles };
