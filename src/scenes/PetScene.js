import { W, H, W2, H2, H8, wb, hb } from "../constants.js";
import Button from "../components/Button.js";
import StatusBar from "../components/StatusBar.js";
import { createButtonBack } from "../components/functions.js";

export default class PetScene extends Phaser.Scene {
  constructor() {
    super({ key: "PetScene" });
    this.stats = {};
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

    let y = H * 0.65;
    const s = hb + 15;
    const x = W2;

    /** 
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
    );*/

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
    const s = 15;
    const color = 0xbb22bb;

    // HP
    this.hpBar = new StatusBar(
      this,
      x,
      y,
      "❤️",
      10,
      this.gameState.pet.stats.hp,
      color,
      {
        width: barWidth,
        height: h,
        label: "HP",
      }
    );

    // Защита
    y += h + s;
    this.guardBar = new StatusBar(
      this,
      x,
      y,
      "🛡️",
      10,
      this.gameState.pet.stats.guard,
      color,
      {
        width: barWidth,
        height: h,
        label: "Защита",
      }
    );

    // Незаметность
    y += h + s;
    this.invisibleBar = new StatusBar(
      this,
      x,
      y,
      "👤",
      10,
      this.gameState.pet.stats.invisible,
      color,
      {
        width: barWidth,
        height: h,
        label: "Незаметность",
      }
    );

    // Скорость
    y += h + s;
    this.speedBar = new StatusBar(
      this,
      x,
      y,
      "👻",
      10,
      this.gameState.pet.stats.speed,
      color,
      {
        width: barWidth,
        height: h,
        label: "Скорость",
      }
    );

    // Осторожность
    y += h + s;
    this.cautionBar = new StatusBar(
      this,
      x,
      y,
      "👀",
      10,
      this.gameState.pet.stats.caution,
      color,
      {
        width: barWidth,
        height: h,
        label: "Осторожность",
      }
    );

    // Уклонение
    y += h + s;
    this.dodgeBar = new StatusBar(
      this,
      x,
      y,
      "🌀",
      10,
      this.gameState.pet.stats.dodge,
      color,
      {
        width: barWidth,
        height: h,
        label: "Уклонение",
      }
    );

    this.add.existing(this.hpBar);
    this.add.existing(this.guardBar);
    this.add.existing(this.invisibleBar);
    this.add.existing(this.speedBar);
    this.add.existing(this.cautionBar);
    this.add.existing(this.dodgeBar);
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
