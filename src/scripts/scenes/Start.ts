import Utils from '../libs/Utils';

export default class Start extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  public create() {
    this.add.sprite(0, 0, 'start-screen').setOrigin(0);
    const { centerX, centerY } = this.cameras.main;
    const attempts = 5;
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

    const button = this.add.sprite(centerX, centerY + 190, 'start-button');
    Utils.clickButton(this, button, () => {
      this.scene.stop();
      this.scene.start('Game');
    });

    const textButton = this.add.text(centerX, centerY + 270, 'Таблица лидеров', fontConfig).setColor('#FEDE17').setOrigin(0.5);
    const undeline = this.add.sprite(centerX, centerY + 290, 'white-pixel').setSize(textButton.displayWidth, 100).setTint(0xFEDE17);
  }
}