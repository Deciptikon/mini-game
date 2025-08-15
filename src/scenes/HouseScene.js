console.log("start house");
import { W2, H2, H4, wb, hb } from "../constants.js";
import Button from "../components/Button.js";

export default class HouseScene extends Phaser.Scene {
  constructor() {
    super({ key: "HouseScene" });
  }

  create() {
    const title = this.add
      .text(W2, H4, "Дом", {
        fontSize: "48px",
        fontFamily: "Arial",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    // Кнопка возврата в меню
    new Button(this, 50, 50, "<--", () => this.scene.start("MenuScene"), {
      color: 0x2196f3,
      width: 80,
      height: 40,
    });
  }
}
