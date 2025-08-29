console.log("start presplash");

export default class PreSplashScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreSplashScene" });
  }

  preload() {
    this.load.on("complete", () => {
      console.log(`Loading PreSplash complete`);

      this.time.delayedCall(500, () => {
        this.scene.start("SplashScene");
      });
    });

    //загружаем картинку для сплеш-скрина
    this.load.image("splash", "./assets/splash.png");
  }

  create() {
    this.splash = this.add.sprite(W2, H2, "splash").setScale(1).setOrigin(0.5);
  }
}
