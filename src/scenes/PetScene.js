import { W, H, W2, H2, H8, wb, hb, statsCheckTimeOut } from "../constants.js";
import Button from "./src/components/Button.js";
import StatusBar from "./src/components/StatusBar.js";

export default class PetScene extends Phaser.Scene {
  constructor() {
    super({ key: "PetScene" });
    this.stats = {
      food: 7,
      mood: 5,
      energy: 6,
    };
  }

  create() {
    this.gameState = this.game.registry.get("gameState");
    this.stats = this.gameState.pet.stats;
    this.pet = this.add
      .sprite(W2, H * 0.3, this.gameState.pet.type)
      .setScale(0.3)
      .setInteractive();

    this.tweens.add({
      targets: this.pet,
      scale: 0.4,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    this.statDecayTimer = this.time.addEvent({
      delay: statsCheckTimeOut,
      callback: this.decayStats,
      callbackScope: this,
      loop: true,
    });

    this.drawStats();

    let y = H * 0.65;
    const s = hb + 15;
    const x = W2;

    // Кнопки действий
    new Button(
      this,
      x,
      y,
      "Покормить",
      () => {
        this.gameState.pet.stats.food = Math.min(
          10,
          this.gameState.pet.stats.food + 1
        );
        this.drawStats();
        this.showEmoji("❤️", W2, H8);
      },
      { color: 0xe91e63, width: wb, height: hb }
    );

    y += s;
    new Button(
      this,
      x,
      y,
      "Поиграть",
      () => {
        this.gameState.pet.stats.mood = Math.min(
          10,
          this.gameState.pet.stats.mood + 1
        );
        this.drawStats();
        this.petJump();
      },
      { color: 0xe91e63, width: wb, height: hb }
    );

    y += s;
    new Button(
      this,
      x,
      y,
      "Спать",
      () => {
        this.gameState.pet.stats.energy = Math.min(
          10,
          this.gameState.pet.stats.energy + 1
        );
        this.drawStats();
        this.showEmoji("💤", W2, H8);
      },
      { color: 0xe91e63, width: wb, height: hb }
    );

    // Кнопка возврата в меню
    new Button(this, 50, 50, "<--", () => this.scene.start("MenuScene"), {
      color: 0x2196f3,
      width: 80,
      height: 40,
    });
  }

  drawStats() {
    if (this.statsBars) this.statsBars.clear();
    this.statsBars = this.add.graphics();

    const barWidth = 200;
    const x = W2 - barWidth / 2;
    let y = H2 * 0.9;
    const h = 20;
    const s = 15;

    // Еда
    this.foodBar = new StatusBar(
      this,
      x,
      y,
      "🍎",
      10,
      this.gameState.pet.stats.food,
      0x5722ff,
      {
        width: barWidth,
        height: h,
        //label: "Голод",
      }
    );

    // Настроение
    y += h + s;
    this.moodBar = new StatusBar(
      this,
      x,
      y,
      "😊",
      10,
      this.gameState.pet.stats.mood,
      0xffeb3b,
      {
        width: barWidth,
        height: h,
        //label: "Голод",
      }
    );

    // Энергия
    y += h + s;
    this.energyBar = new StatusBar(
      this,
      x,
      y,
      "⚡",
      10,
      this.gameState.pet.stats.energy,
      0x4caf50,
      {
        width: barWidth,
        height: h,
        //label: "Голод",
      }
    );

    this.add.existing(this.foodBar);
    this.add.existing(this.moodBar);
    this.add.existing(this.energyBar);
  }

  decayStats() {
    this.gameState.pet.stats.food = Math.max(
      0,
      this.gameState.pet.stats.food - 1
    );
    this.gameState.pet.stats.mood = Math.max(
      0,
      this.gameState.pet.stats.mood - 0.5
    );
    this.gameState.pet.stats.energy = Math.max(
      0,
      this.gameState.pet.stats.energy - 0.7
    );

    // Обновляем UI
    this.foodBar.updateValue(this.gameState.pet.stats.food);
    this.moodBar.updateValue(this.gameState.pet.stats.mood);
    this.energyBar.updateValue(this.gameState.pet.stats.energy);

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
