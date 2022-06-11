export default class Hero extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;
  public damaged: boolean;
  private health: number = 5;

  public get isDamaged() { return this.damaged };
  public get currentHealth() { return this.health };

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

    this.body.setGravityY(1000);
  }

  private jump() {
    this.scene.input.keyboard.createCursorKeys().space.on('down', (): void => {
      if (this.body.touching.down) this.setVelocityY(-700);
    });
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.play(this.body.touching.down ? 'run' : 'jump', true);

  }

  private setAnimation() {
    this.scene.tweens.add({
      targets: this,
      duration: 200,
      loop: true,
      yoyo: true,
      onComplete: () => {
        this.damaged = false;
        this.alpha = 1;
      },
      props: {
        alpha: 0.3,
      },
    });
  }

  public takeDamage() {
    this.health -= 1;
    this.damaged = true;
    this.body.setVelocityY(-200);
    this.setAnimation();
    console.log(this.health);
  }
};

type HeroData = {
  scene: Phaser.Scene,
  x: number,
  y: number,
}
