import MovableObjects from './MovableObjects';
import Game from './../scenes/Game';

export default class Obstacle extends MovableObjects {
  public type: Obstacles;
  public flag: Phaser.Physics.Arcade.Body;

  constructor(data: ObstacleData) {
    super({
      x: data.x,
      y: data.y,
      texture: data.texture,
      scene: data.scene,
    });
    this.setOrigin(0.5, 1);
    this.setScale(0.22);
    this.type = data.texture;
  }
};

type ObstacleData = {
  scene: Game,
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
