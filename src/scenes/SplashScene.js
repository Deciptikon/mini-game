import { W2, H2, H4, wb, hb } from "../constants.js";

export default class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: "SplashScene" });
  }

  preload() {
    this.load.image("splash", "./assets/splash.png");
    this.load.image("cat", "./assets/cat.png");
    this.load.image("dog", "./assets/dog.png");
    this.load.image("bird", "./assets/bird.png");

    this.load.on("complete", () => {
      this.time.delayedCall(3000, () => {
        this.scene.start("MenuScene");
      });
    });
  }

  create() {
    this.splash = this.add.sprite(W2, H2, "splash").setScale(1).setOrigin(0.5);

    const progressBar = this.add.graphics();
    this.load.on("progress", (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(100, 280, 600 * value, 30);
    });
  }
}
