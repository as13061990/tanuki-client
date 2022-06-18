import Utils from '../libs/Utils';
import { RaitingsUser } from '../types';

export default class Modal extends Phaser.Scene {
  private bg: Phaser.GameObjects.Sprite;
  private type: Modals;

  constructor() {
    super('Modal');
  }

  public create(): void {
    const { centerX, centerY } = this.cameras.main;
    console.log('Modal');
    this.bg = this.add.sprite(centerX, centerY, 'modal-background');
    //this.createCheckpoint();
    //this.createEndGame();
  }

  private createCheckpoint(): void {
    const score = 100;
    const { centerX, centerY } = this.cameras.main;
    const bg = this.add.sprite(centerX, centerY, 'checkpoint');
    const fontConfig: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '24px',
      fontFamily: 'LuckiestGuy',
    };

    const text1 = this.add.text(centerX, centerY + 50, 'Твой счет:', fontConfig).setOrigin(0, 0.5);
    const text2 = this.add.text(centerX, centerY + 50, `${score}`, fontConfig).setColor('#FEDE17').setOrigin(0, 0.5);
    const width = text1.displayWidth + text2.displayWidth + 10;
    const halfWidth = width / 2;
    text1.setX(centerX - halfWidth);
    text2.setX(text1.getRightCenter().x + 5);

    const button = this.add.sprite(centerX, centerY + 140, 'resume-button');
    Utils.clickButton(this, button, () => {
      this.scene.stop();
      this.scene.resume('Game');
    });
  }

  private createEndGame(): void {
    const raitings: RaitingsUser[] = [
      {
        place: 1,
        points: 1000,
        name: 'Василий',
      },
      {
        place: 2,
        points: 1000,
        name: 'Федор',
      },
      {
        place: 3,
        points: 1000,
        name: 'Клементий',
      },
      {
        place: 4,
        points: 1000,
        name: 'Алексей',
      },
      {
        place: 5,
        points: 1000,
        name: 'Игнат',
      }
    ];
    const userRaiting: RaitingsUser = {
      place: 1000,
      name: 'Пупкин',
      points: 23,
    };
    const { centerX, centerY } = this.cameras.main;
    const minPoints = 100;
    const currentPoints = 110;
    const bg = this.add.sprite(centerX, centerY,  minPoints < currentPoints ? 'end-big' : 'end-mini');

    const elements: RaitingElement[] = [];
    const offset = 45;
    let currentHeight = bg.displayHeight + offset;

    raitings.forEach(el => {
      const raitingElement = new RaitingElement(this, el);
      elements.push(raitingElement);
      currentHeight += raitingElement.displayHeight + offset;
    });

    if (userRaiting.place > 5) {
      const raitingElement = new RaitingElement(this, userRaiting);
      elements.push(raitingElement);
      currentHeight += raitingElement.displayHeight + offset;
    }

    bg.setY(currentHeight / 2 - bg.displayHeight / 2 - offset);
    if (minPoints < currentPoints) {
      const text = this.add.text(centerX, bg.y + 130, '5050505', {
        fontSize: '30px',
        fontFamily: 'LuckiestGuy',
      }).setOrigin(0.5);
    }
    const bgBottom = bg.getBottomCenter().y;

    elements.forEach((el, index) => {
      if (index > 0) {
        const previous = elements[index - 1];
        const previousBottom = previous.getBottomCenter().y;
        el.setY(previousBottom + offset);
      } else {
        el.setY(bgBottom + offset + 15);
      }
    });

    const button = this.add.sprite(centerX, elements[elements.length - 1].getBottomCenter().y + 80, 'restart-button');
    Utils.clickButton(this, button, () => {
      this.scene.stop();
      this.scene.resume('Game');
    });
  }
}

class RaitingElement {
  private scene: Phaser.Scene;
  private bg: Phaser.GameObjects.Sprite;
  private place: Phaser.GameObjects.Text;  
  private name: Phaser.GameObjects.Text;  
  private points: Phaser.GameObjects.Text;
  private data: RaitingsUser;

  constructor(scene: Phaser.Scene, data: RaitingsUser) {
    this.scene = scene;
    this.data = data;
    this.createElements();
  }

  private createElements(): void {
    const { centerX, centerY } = this.scene.cameras.main;
    const color = this.data.place === 1 ? '#FEDE17' :
    this.data.place === 2 ? '#D1D1D1' : 
    this.data.place === 3 ? '#AF6428' : 
    this.data.place > 5 ? '#8A8A8A' : 
    '#FFFFFF';
    const config: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: this.data.place === 1 ? '40px' : '30px',
      fontFamily: 'LuckiestGuy',
      color: color,
    };
    this.bg = this.scene.add.sprite(centerX, centerY, this.data.place === 1 ? 'first-place' : 'next-place');
    this.place = this.scene.add.text(centerX - 280, centerY, `#${this.data.place}`, config).setOrigin(0, 0.5);
    this.name = this.scene.add.text(centerX - 140, centerY, `${this.data.name}`, config).setOrigin(0, 0.5);
    this.points = this.scene.add.text(centerX + 280, centerY, `${this.data.points}`, config).setOrigin(1, 0.5);
  }

  public get displayHeight(): number { return this.bg.displayHeight };
  public getBottomCenter(): Phaser.Math.Vector2 { return this.bg.getBottomCenter() };
  public setY(y: number) {
    this.bg.setY(y);
    this.place.setY(y);
    this.name.setY(y);
    this.points.setY(y);
  }
}

enum Modals {
  Checkpoint,
  End,
};
