import Utils from '../libs/Utils';
import { State } from '../types';
import api from './../libs/Api';
import { Modals } from './Modal';

export default class Start extends Phaser.Scene {
  public state: State;

  constructor() {
    super('Start');
  }

  public init(state: State) {
    this.state = state;
  }

  public create() {
    this.sound.play('main', { loop: true, volume: 0.7 });
    this.add.sprite(0, 0, 'start-screen').setOrigin(0);
    const { centerX, centerY } = this.cameras.main;
    const attempts = this.state.attempts;
    const fontConfig: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '24px',
      fontFamily: 'LuckiestGuy',
    };

    const text1 = this.add.text(centerX, centerY + 110, 'Твои попытки:', fontConfig).setOrigin(0, 0.5);
    const text2 = this.add.text(centerX, centerY + 110, `${attempts}`, fontConfig).setColor('#FEDE17').setOrigin(0, 0.5);
    const width = text1.displayWidth + text2.displayWidth + 10;
    const halfWidth = width / 2;
    text1.setX(centerX - halfWidth);
    text2.setX(text1.getRightCenter().x + 5);

    const button = this.add.sprite(centerX, centerY + 190, this.state.attempts > 0 ? 'start-button' : 'start-button-disable');
    Utils.clickButton(this, button, () => {
      api.startGame({tgId: this.state.tgId }).then(data => {
        if (!data.error) {
          this.state.attempts -= 1;
          this.scene.stop();
          this.scene.start('Game', this.state);
        }
      });
    });

    const textButton = this.add.text(centerX, centerY + 270, 'Таблица лидеров', fontConfig).setColor('#FEDE17').setOrigin(0.5);
    Utils.click(textButton, () => {
      this.state.modal = Modals.Raitings;
      this.scene.launch('Modal', this.state);
    });
  }
}