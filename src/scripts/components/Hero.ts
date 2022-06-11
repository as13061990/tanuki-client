import MovableObjects from './MovableObjects';

export default class Hero extends MovableObjects {
  constructor(data: HeroData) {
    super({
      scene: data.scene,
      x: data.x,
      y: data.y,
      texture: 'hero-run',
      velocity: 100,
    });
    this.setScale(5); // нужно будет убрать потом
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.body.setGravityY(300);
    
    this.jump();
  }

  private jump() {
    this.scene.input.keyboard.createCursorKeys().space.on('down', (): void => {
      this.setVelocityY(-300)
    });
  }
};

type HeroData = {
  scene: Phaser.Scene,
  x: number,
  y: number,
}
