import MovableObjects from './MovableObjects';

export default class Boost extends MovableObjects {
  public type: Boosts;
  public flag: Phaser.Physics.Arcade.Body;

  constructor(data: BoostData) {
    super({
      x: data.x,
      y: data.y,
      texture: data.texture,
      velocity: -320,
      scene: data.scene,
    });
    this.setOrigin(0.5, 1);
    this.setDepth(1);
    this.type = data.texture;
  }
};

type BoostData = {
  scene: Phaser.Scene,
  x: number,
  y: number,
  texture: Boosts,
}

enum Boosts {
  Shield = 'boost-shield',
  Speed = 'boost-speed',
  Rolls = 'boost-rolls',
  Girls = 'boost-girls',
}

export { BoostData, Boosts };

