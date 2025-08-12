import { W, H, W2, H2, H8, wb, hb, statsCheckTimeOut } from "../constants.js";
import Button from "../button.js";

export default class PetScene extends Phaser.Scene {
  constructor() {
    super({ key: "PetScene" });
    this.stats = { food: 7, mood: 5, energy: 6 };
  }

  preload() {
    this.load.image("cat", "./assets/cat.png");
    this.load.image("dog", "./assets/dog.png");
    this.load.image("bird", "./assets/bird.png");
  }

  create() {
    this.pet = this.add
      .sprite(W2, H * 0.3, "cat")
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
        this.stats.food = Math.min(10, this.stats.food + 2);
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
        this.stats.mood = Math.min(10, this.stats.mood + 2);
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
        this.stats.energy = Math.min(10, this.stats.energy + 2);
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
    const baseColor = 0x555555;
    const sizeIcons = "25px";

    // Еда
    this.statsBars.fillStyle(baseColor, 1).fillRect(x, y, barWidth, h);
    this.statsBars
      .fillStyle(0x5722ff, 1)
      .fillRect(x, y, barWidth * (this.stats.food / 10), h);
    this.add.text(x - 10, y, "🍎", { fontSize: sizeIcons });

    // Настроение
    y += h + s;
    this.statsBars.fillStyle(baseColor, 1).fillRect(x, y, barWidth, h);
    this.statsBars
      .fillStyle(0xffeb3b, 1)
      .fillRect(x, y, barWidth * (this.stats.mood / 10), h);
    this.add.text(x - 10, y, "😊", { fontSize: sizeIcons });

    // Энергия
    y += h + s;
    this.statsBars.fillStyle(baseColor, 1).fillRect(x, y, barWidth, h);
    this.statsBars
      .fillStyle(0x4caf50, 1)
      .fillRect(x, y, barWidth * (this.stats.energy / 10), h);
    this.add.text(x - 10, y, "⚡", { fontSize: sizeIcons });
  }

  decayStats() {
    this.stats.food = Math.max(0, this.stats.food - 1);
    this.stats.mood = Math.max(0, this.stats.mood - 0.5);
    this.stats.energy = Math.max(0, this.stats.energy - 0.7);
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
