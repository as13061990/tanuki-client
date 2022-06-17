export default class Hero extends Phaser.Physics.Arcade.Sprite { 
  constructor(data: CarData) {
    super(data.scene, data.x, data.y, 'car');

    this.scene.add.existing(this);
    this.play('car-move');
    this.setScale(0.15);
    this.setDepth(1);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.body.setSize(5, this.scene.cameras.main.displayHeight)
  }


  public move(forvard: boolean) {
    this.scene.tweens.add({
      targets: this,
      x: forvard ? '+= 50' : '-= 50',
      duration: 500,
    });
  }
};

type CarData = {
  scene: Phaser.Scene,
  x: integer,
  y: integer,
};
