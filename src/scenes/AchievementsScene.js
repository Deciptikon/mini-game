console.log("start achievements");
import { W2, H2, H4, wb, hb, bigText, W, isMobile } from "../constants.js";
import Button from "../components/Button.js";
import { createButtonBack } from "../components/functions.js";
import { ListAchievements } from "../Achievements/ListAchievements.js";
import IconButton from "../components/IconButton.js";

export default class AchievementsScene extends Phaser.Scene {
  constructor() {
    super({ key: "AchievementsScene" });
  }

  create() {
    this.gameState = this.game.registry.get("gameState");

    const title = this.add.text(W2, H4, "Достижения", bigText).setOrigin(0.5);

    // простая сетка
    const w = 110;
    const m = isMobile ? 3 : 9;
    const s = (W - m * w) / (m + 1);

    const x0 = w / 2 + s;
    const y0 = H2;

    let i = 0;
    let j = 0;
    for (const key in ListAchievements) {
      if (ListAchievements.hasOwnProperty(key)) {
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
            //console.log("Клик по иконке!");
            //this.gameState.currentPet = key;
            console.log(`Name: ${ListAchievements[key].name}`);
            console.log(`Info: ${ListAchievements[key].description}`);
            console.log(
              `Unlock: ${this.gameState.data.achievements[key].unlocked}`
            );
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

    // Кнопка возврата в меню
    createButtonBack(this);
  }
}
