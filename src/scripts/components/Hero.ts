export default class Hero extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;

  constructor(data: HeroData) {
    super(data.scene, data.x, data.y, 'hero-run');

    this.init();
    this.jump();
  }

  public init(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCircle(8).setOffset(4, 4);
    this.setScale(5);
    this.setCollideWorldBounds(true);
    this.body.enable = true;

    this.body.setGravityY(500);
  }

  private jump() {
    this.scene.input.keyboard.createCursorKeys().space.on('down', (): void => {
      if (this.body.touching.down) this.setVelocityY(-500);
    });
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.play(this.body.touching.down ? 'run' : 'jump', true);
  }
};

type HeroData = {
  scene: Phaser.Scene,
  x: number,
  y: number,
}
