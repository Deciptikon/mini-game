import { W, H, W2, H2, H8, wb, hb } from "../constants.js";
import Button from "../components/Button.js";
import StatusBar from "../components/StatusBar.js";
import { createButtonBack } from "../components/functions.js";
import { STATS } from "../Pets/ListPets.js";
import { fullUpdateStats } from "../Pets/Pet.js";

export default class PetScene extends Phaser.Scene {
  constructor() {
    super({ key: "PetScene" });
    this.stats = {};
  }

  create() {
    this.gameState = this.game.registry.get("gameState");
    //this.stats = this.gameState.pet.stats;

    this.pet = fullUpdateStats(this.gameState, this.gameState.currentPet);

    this.image_pet = this.add
      .sprite(W2, H * 0.3, `image_${this.gameState.currentPet}`)
      .setScale(0.3)
      .setInteractive();

    this.tweens.add({
      targets: this.image_pet,
      scale: 0.35,
      duration: 2000,
      yoyo: true,
      repeat: -1,
    });

    /** 
    this.statDecayTimer = this.time.addEvent({
      delay: 1000,
      callback: this.decayStats,
      callbackScope: this,
      loop: true,
    });*/

    this.drawStats();

    // Кнопка возврата в меню
    createButtonBack(this, "PetsScene");
  }

  drawStats() {
    if (this.statsBars) this.statsBars.clear();
    this.statsBars = this.add.graphics();

    const barWidth = 200;
    const x = W2 - barWidth / 2;
    let y = H2 * 0.9;
    const h = 20;
    const s = 20;
    const color = 0xbb22bb;

    this.bars = {};
    for (const key in STATS) {
      this.bars[key] = new StatusBar(
        this,
        x,
        y,
        STATS[key].icon,
        10,
        this.pet.stats[key],
        color,
        {
          width: barWidth,
          height: h,
          label: STATS[key].name,
        }
      );
      this.add.existing(this.bars[key]);

      y += h + s;
    }

    new Button(
      this,
      W2,
      H - 100,
      "Инвентарь",
      () => {
        this.scene.start("InventoryScene");
      },
      {
        color: 0x4caf50,
        width: wb,
        height: hb,
      }
    );
  }

  decayStats() {
    this.drawStats();

    if (this.stats.food < 3) this.showEmoji("🍽️", W2, H * 0.15);
    if (this.stats.energy < 3) this.showEmoji("💤", W2, H * 0.2);
  }

  petJump() {
    this.tweens.add({
      targets: this.pet,
      y: this.pet.y - 50,
      duration: 200,
      yoyo: true,
    });
  }

  showEmoji(emoji, x, y) {
    const effect = this.add
      .text(x, y, emoji, {
        fontSize: "48px",
        alpha: 0,
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: effect,
      y: y - 100,
      alpha: 1,
      duration: 800,
      onComplete: () => effect.destroy(),
    });
  }
}
