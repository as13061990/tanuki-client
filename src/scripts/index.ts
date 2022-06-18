import '../css/style.css';
import * as Phaser from 'phaser';
import Boot from './scenes/Boot';
import Preload from './scenes/Preload';
import Game from './scenes/Game';
import Start from './scenes/Start';
import Modal from './scenes/Modal';

const gcd = (num1: number, num2: number): number => {
  while (num1 && num2) num1 > num2 ? num1 %= num2 : num2 %= num1;
  num1 += num2;
  return num1;
}

// готовое DOM дерево
window.onload = (): void => {

  setTimeout((): void => {
    let width: number = 0;
    let height: number = 0;
    let root: HTMLElement = document.querySelector('#root');
    let clientHeight: number = Math.round(document.body.clientHeight);
    let clientWidth: number = Math.round(document.body.clientWidth);
    let canvasWidth: number = 720;
    let canvasHeight: number = 1280;
     
    let x: number = canvasWidth / gcd(canvasHeight, canvasWidth);
    let y: number = canvasHeight / gcd(canvasHeight, canvasWidth);
  
    // размеры в зависимости от высоты и ширины
    if (clientHeight / y > clientWidth / x) {
      width = clientWidth;
      height = clientWidth / x * y;
    } else {
      width = clientHeight / y * x;
      height = clientHeight;
    }
  
    root.style.height = height + 'px';
    root.style.width = width + 'px';

    // конфиг игры
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: canvasWidth,
      height: canvasHeight,
      parent: 'root',
      physics: {
        default: 'arcade',
        arcade: { debug: false }
      },
      render: {
        transparent: true // прозрачность канваса
      },
      scene: [
        Boot,
        Preload,
        Start,
        Game,
        Modal,
      ],
      loader: { maxParallelDownloads: 128 },
    }
    
    const game: Phaser.Game = new Phaser.Game(config);
  }, 100);
}
