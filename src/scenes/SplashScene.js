console.log("start splash");
import { W2, H2, H4, wb, hb } from "../constants.js";
import { ListPets } from "../Pets/ListPets.js";

export default class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: "SplashScene" });
  }

  preload() {
    this.load.image("splash", "./assets/splash.png");

    for (const key in ListPets) {
      if (ListPets.hasOwnProperty(key)) {
        this.load.image(key, ListPets[key].image);
      }
    }

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
