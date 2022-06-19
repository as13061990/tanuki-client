import MovableObjects from './MovableObjects';
import Game from './../scenes/Game';

export default class Checkpoint extends MovableObjects {
  public scene: Game;
  constructor(scene: Game) {
    const x: number = scene.cameras.main.displayWidth + 200;
    const y: number =  scene.cameras.main.displayHeight - 320;
    super({ 
      scene: 
      scene, 
      x: x, 
      y: y, 
      texture: 'checkpoint-sprite', 
    });
    this.setOrigin(0.5, 1);
    this.move();
  }

  public destroy(fromScene?: boolean): void {
    const animation = this.scene.add.sprite(this.x, this.y, 'checkpoint-animation');
    animation.setOrigin(0.5, 1);
    animation.play('checkpoint-anim')
    animation.setDepth(3);
    this.scene.setPause(animation);
    super.destroy(fromScene);
  }


};
