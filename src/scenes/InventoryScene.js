console.log("start InventoryScene");
import { W2, H, H4, wb, hb, bigText, W, isMobile, H2 } from "../constants.js";
import Button from "../components/Button.js";
import { createButtonBack } from "../components/functions.js";
import IconButton from "../components/IconButton.js";
import { ListPets } from "../Pets/ListPets.js";
import { Inventory } from "../Items/Inventory.js";
import { InventorySlot } from "../Items/InventorySlot.js";

export default class InventoryScene extends Phaser.Scene {
  constructor() {
    super({ key: "InventoryScene" });
  }

  create() {
    this.gameState = this.game.registry.get("gameState");

    const title = this.add
      .text(W2, H * 0.05, `Инвентарь`, bigText)
      .setOrigin(0.5);

    // простая сетка
    const w = 110;
    const m = isMobile ? 3 : 6;
    const s = (W - m * w) / (m + 1);

    const x0 = w / 2 + s;
    const y0 = H * 0.175;

    let i = 0;
    let j = 0;
    for (const key in ListPets) {
      if (ListPets.hasOwnProperty(key)) {
        const x = x0 + j * (w + s);
        const y = y0 + i * (w + s);

        new IconButton(
          this,
          x,
          y,
          w,
          w,
          `icon_${key}`,
          "",
          () => {
            // onClick
            console.log("Клик по иконке!");
            //this.gameState.currentPet = key;
            //this.gameState.pet.stats = ListPets[key].stats;
            //this.gameState.pet.probs = ListPets[key].probs;
            //this.scene.start("PetScene");
          },
          {
            scale: 0.25,
            hoverScale: 0.28,
          }
        );

        j++;
        if (j >= m) {
          j = 0;
          i++;
        }
      }
    }

    this.inventary = new Inventory(this, 10, H / 2, this.gameState.pet);

    // Кнопка возврата в меню
    createButtonBack(this);
  }
}
