import { W2, H2, wb, hb } from "../constants.js";
import Button from "../button.js";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create() {
    const title = this.add
      .text(W2, H2 / 2, "Питомец-Эмодзи", {
        fontSize: "48px",
        fontFamily: "Arial",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    const startButton = new Button(
      this,
      W2,
      H2,
      "Начать",
      () => {
        this.scene.start("PetScene");
      },
      {
        color: 0x4caf50,
        width: wb,
        height: hb,
      }
    );
  }
}
