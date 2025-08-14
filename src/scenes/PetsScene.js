import { W, W2, H2, H4, wb, hb } from "../constants.js";
import { ListPets } from "../Pets/ListPets.js";

import Button from "../components/Button.js";
import IconButton from "../components/IconButton.js";

export default class PetsScene extends Phaser.Scene {
  constructor() {
    super({ key: "PetsScene" });
  }

  create() {
    this.gameState = this.game.registry.get("gameState");

    const title = this.add
      .text(W2, H4, "Выбор", {
        fontSize: "48px",
        fontFamily: "Arial",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    // простая сетка
    const w = 110;
    const m = 3;
    const s = (W - m * w) / (m + 1);

    const x0 = w / 2 + s;
    const y0 = H2;

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
          key,
          "",
          () => {
            // onClick
            console.log("Клик по иконке!");
            this.gameState.pet.type = key;
            this.gameState.pet.stats = ListPets[key].stats;
            this.scene.start("PetScene");
          },
          {
            scale: 0.1,
            hoverScale: 0.11,
          }
        );

        j++;
        if (j >= m) {
          j = 0;
          i++;
        }
      }
    }
  }
}
