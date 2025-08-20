console.log("start InventoryScene");
import { W2, H, H4, wb, hb, bigText } from "../constants.js";
import Button from "../components/Button.js";
import { createButtonBack } from "../components/functions.js";

export default class InventoryScene extends Phaser.Scene {
  constructor() {
    super({ key: "InventoryScene" });
  }

  create() {
    this.gameState = this.game.registry.get("gameState");

    const title = this.add.text(W2, H4, `Инвентарь`, bigText).setOrigin(0.5);

    // Кнопка возврата в меню
    createButtonBack(this);
  }
}
