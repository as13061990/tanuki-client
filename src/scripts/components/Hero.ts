import { Modals } from '../scenes/Modal';
import Game from './../scenes/Game';

export default class Hero extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;
  public damaged: boolean;
  private health: number = 3;
  private shield: integer = 0;
  private shieldSprite: Phaser.GameObjects.Sprite;
  public scene: Game;

  public get hasShield(): boolean { return this.shield > 0 };
  public get isDamaged(): boolean { return this.damaged };
  public get currentHealth() { return this.health };

  constructor(data: HeroData) {
    super(data.scene, data.x, data.y, 'hero', 1);

    this.init();
    this.jump();
  }

  public init(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(0.1);
    this.body.setCircle(400).setOffset(600, 500);
    this.setCollideWorldBounds(true);
    this.body.enable = true;
    this.setDepth(2);
    
    this.body.setGravityY(1000);

    this.shieldSprite = this.scene.add.sprite(this.x + 20, this.y + 20, 'hero-shield').setScale(1.5).setAlpha(0.5).setDepth(1);
    this.setShieldAnimation();
  }

  private jump(): void {
    this.scene.input.on('pointerdown', (): void => {
      if (this.body.touching.down) {
        this.setVelocityY(-700);
        this.scene.sound.play('jump');
      }
    });
  }

  public setVisible(value: boolean): this {
    this.shieldSprite.setVisible(value);
    return super.setVisible(value);
  }

  public setShield(): void {
    this.shield = 10000;
  }

  public incHealth(): void {
    this.health = this.health >= 3 ? this.health : this.health + 1;
  }

  public spawnText(str: string): void {
    const text = this.scene.add.text(this.x, this.y - 150, str, {
      fontFamily: 'LuckiestGuy',
      fontSize: '30px',
      color: '#FEDE17',
    }).setDepth(2);
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        text.destroy();
      },
    });
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    
    if (this.hasShield && !this.scene.pause) {
      this.shield -= delta;
    } else {
      this.shield = 0;
    }

    this.shieldSprite.setVisible(this.hasShield);
    this.shieldSprite.setPosition(this.x + 20, this.y - 10);
    this.playAnimation();
  }

  private playAnimation(): void {
    if (this.body.touching.down) {
      this.play('run', true);
    } else {
      const flyOffset = 150;
      if (this.body.velocity.y > 0 && this.body.velocity.y > flyOffset) {
        this.play('fall', true);
      } else if (this.body.velocity.y < 0 && this.body.velocity.y < -flyOffset) {
        this.play('jump', true);
      } else {
        this.play('fly', true);
      }
    }
  }

  private setShieldAnimation(): void {
    this.scene.tweens.add({
      targets: this.shieldSprite,
      duration: 400, 
      alpha: { from: 0.3, to: 0.7 },
      yoyo: true,
      repeat: -1,
    });
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
  }
};

type HeroData = {
  scene: Phaser.Scene,
  x: number,
  y: number,
}
