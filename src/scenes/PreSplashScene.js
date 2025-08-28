console.log("start presplash");

export default class PreSplashScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreSplashScene" });
  }

  preload() {
    this.load.on("complete", () => {
      console.log(`Loading PreSplash complete`);
      this.scene.start("SplashScene");
    });

    //загружаем картинку для сплеш-скрина
    this.load.image("splash", "./assets/splash.png");
  }

  create() {
    //
  }
}
