export default class Hero extends Phaser.Physics.Arcade.Sprite {
  private startX: integer;

  constructor(data: CarData) {
    super(data.scene, data.x, data.y, 'car');
    this.startX = data.x;
    this.scene.add.existing(this);
    this.play('car-move');
    this.setScale(0.15);
    this.setDepth(2);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.body.setSize(5, this.scene.cameras.main.displayHeight);
  }


  public move(health: integer) {
    this.scene.tweens.add({
      targets: this,
      x: this.startX + (3 - health) * 50,
      duration: 500,
    });
  }
};

type CarData = {
  scene: Phaser.Scene,
  x: integer,
  y: integer,
};
