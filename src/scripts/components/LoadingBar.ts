export default class LoadingBar {
  private scene: Phaser.Scene;
  private progressBar: Phaser.GameObjects.TileSprite;
  private text: Phaser.GameObjects.Text;

  constructor(scene) {
    this.scene = scene;
    const { centerX, centerY } = this.scene.cameras.main;
    this.progressBar = this.scene.add.tileSprite(centerX - 277, centerY + 180, 0, 34, 'progress-bar').setOrigin(0, 0.5);
    this.text = this.scene.add.text(centerX, centerY + 250, '0%', { fontFamily: 'LuckiestGuy', fontSize: '50px' }).setOrigin(0.5);
    this.setEvents();
  }

  private setEvents(): void {
    this.scene.load.on('progress', this.showProgressBar, this);
    this.scene.load.on('fileprogress', this.onFileProgress, this);
    this.scene.load.on('complete', this.onLoadComplete, this);
  }

  private showProgressBar(value: number): void {
    this.progressBar.setDisplaySize(554 * value, 34);
    this.text.text = Math.round(value * 100) + '%';
  }

  private onFileProgress(file): void {

  }

  private onLoadComplete(): void {
    //this.progressBar.destroy();
  }
};
