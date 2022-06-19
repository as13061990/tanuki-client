import * as Webfont from '../libs/Webfonts.js';
import { State } from '../types';
import state from '../state';
import api from '../libs/Api';

const loadScreen: string = require('../../assets/images/load.jpg');
const progressBar: string = require('../../assets/images/progress-bar.png');

export default class BootScene extends Phaser.Scene {
  private fontsReady: boolean;
  private userReady: boolean;
  public state: State;
  
  constructor() {
    super('Boot');
  }

  public init(): void {
    this.state = state;
    Webfont.load({
      custom: { families: [
      'LuckiestGuy',
    ] },
      active: () => { this.fontsReady = true },
    });

    //this.initTgUser();
    this.initTestUser();
    this.checkUser();
  }

  private initTgUser(): void {
    //@ts-ignore
    window.Telegram.WebApp.ready();
    //@ts-ignore
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
    this.state.tgId = userId;
    //@ts-ignore
    this.state.name = window.Telegram.WebApp.initDataUnsafe.user.first_name;
  }

  private initTestUser(): void {
    this.state.tgId = '12345678912';
    this.state.name = 'test user 3';
  }

  private checkUser(): void {
    api.checkUser({ tgId: this.state.tgId, name: this.state.name })
      .then(data => {
        this.state.attempts = data.attempts;
        this.userReady = true;
      });
  }

  public preload (): void {
    this.load.image('load-screen', loadScreen);
    this.load.image('progress-bar', progressBar);
  }

  public update(): void {
    if (!this.fontsReady) return;
    if (!this.userReady) return;
    this.scene.start('Preload', this.state);
  }
}