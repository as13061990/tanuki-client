import Boost, { Boosts } from "./Boost";
const randomBoolean = [ true, false, false, false ];
export default class BoostSpawner extends Phaser.Physics.Arcade.Group {
  private timer: Phaser.Time.TimerEvent;
  
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
    this.init();
  }

  private init(): void {
    this.scene.add.existing(this);
    this.timer = this.scene.time.addEvent({
      delay: 900,
      callback: () => {
        if (Phaser.Utils.Array.GetRandom(randomBoolean)) {
          this.spawn(this.getRandomBoost());
        }
      },
      repeat: -1,
    });
  }

  public stopTimer(): void {
    this.timer.destroy();
  }

  private getRandomBoost(): Boosts {
    return Phaser.Utils.Array.GetRandom(Object.values(Boosts));
  }

  private spawn(type: Boosts): void {
    const x: number = this.scene.cameras.main.displayWidth + 200;
    const y: number =  this.scene.cameras.main.displayHeight - 320;
    const obstacle = new Boost({
      x: x,
      y: y,
      texture: type,
      scene: this.scene,
    });
    this.add(obstacle);
    obstacle.move();
  }
}



