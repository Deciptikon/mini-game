console.log("start house");
import { W2, H2, H4, wb, hb } from "../constants.js";
import Button from "../components/Button.js";
import { createButtonBack } from "../components/functions.js";

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
    createButtonBack(this);
  }
}
