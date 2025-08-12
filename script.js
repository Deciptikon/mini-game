const W2 = 200;
const H2 = 400;
const H4 = H2 / 2;
const H8 = H4 / 2;

const wb = 100;
const hb = 30;

// ===== СЦЕНА МЕНЮ =====
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create() {
    // 1. Заголовок (Canvas-текст)
    const title = this.add
      .text(W2, H2 / 2, "Питомец-Эмодзи", {
        fontSize: "48px",
        fontFamily: "Arial",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    // 2. Кнопка "Старт" (Графика + Текст)
    const startBtn = this.add.graphics();
    startBtn.fillStyle(0x4caf50, 1); // Зеленый
    startBtn.fillRoundedRect(W2 - wb, H2 - hb, 2 * wb, 2 * hb, 16);

    const startText = this.add
      .text(W2, H2, "Начать", {
        fontSize: "28px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // 3. Делаем кнопку интерактивной
    startBtn.setInteractive(
      new Phaser.Geom.Rectangle(W2 - wb, H2 - hb, 2 * wb, 2 * hb),
      Phaser.Geom.Rectangle.Contains
    );

    startBtn.on("pointerdown", () => {
      this.scene.start("PetScene");
    });

    // 4. Анимация кнопки при наведении
    startBtn.on("pointerover", () => {
      startBtn.clear();
      startBtn.fillStyle(0x388e3c, 1); // Темно-зеленый
      startBtn.fillRoundedRect(W2 - wb, H2 - hb, 2 * wb, 2 * hb, 16);
    });

    startBtn.on("pointerout", () => {
      startBtn.clear();
      startBtn.fillStyle(0x4caf50, 1);
      startBtn.fillRoundedRect(W2 - wb, H2 - hb, 2 * wb, 2 * hb, 16);
    });
  }
}

// ===== СЦЕНА ПИТОМЦА =====
class PetScene extends Phaser.Scene {
  constructor() {
    super({ key: "PetScene" });
    this.stats = { food: 7, mood: 5, energy: 6 };
  }

  preload() {
    // Загружаем эмодзи-спрайты
    this.load.image("cat", "./assets/cat.png");
    this.load.image("dog", "./assets/dog.png");
    this.load.image("bird", "./assets/bird.png");
  }

  create() {
    // 1. Питомец
    this.pet = this.add
      .sprite(W2, H2 * 0.6, "cat")
      .setScale(0.3)
      .setInteractive();

    // Анимация "дыхания"
    this.tweens.add({
      targets: this.pet,
      scale: 0.4,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    this.statDecayTimer = this.time.addEvent({
      delay: 3000, // 30 секунд в миллисекундах
      callback: this.decayStats,
      callbackScope: this,
      loop: true, // повторять бесконечно
    });

    // 2. Статус-бары
    this.drawStats();

    let y = H2 * 1.3;
    const s = 50;
    const x = W2;

    // 3. Кнопки действий
    this.createButton("Покормить", x, y, () => {
      this.stats.food = Math.min(10, this.stats.food + 2);
      this.drawStats();
      this.showEmoji("❤️", W2, H8);
    });

    y += hb + s;
    this.createButton("Поиграть", x, y, () => {
      this.stats.mood = Math.min(10, this.stats.mood + 2);
      this.drawStats();
      this.petJump();
    });

    y += hb + s;
    this.createButton("Спать", x, y, () => {
      this.stats.energy = Math.min(10, this.stats.energy + 2);
      this.drawStats();
      this.showEmoji("💤", W2, H8);
    });

    // 4. Кнопка возврата
    this.createButton(
      "Меню",
      50,
      50,
      () => {
        this.scene.start("MenuScene");
      },
      0x2196f3,
      100,
      40
    );
  }

  // Создание кнопки
  createButton(
    text,
    x,
    y,
    callback,
    color = 0xe91e63,
    width = 150,
    height = 50
  ) {
    const btn = this.add
      .graphics()
      .fillStyle(color, 1)
      .fillRoundedRect(x - width / 2, y - height / 2, width, height, 10)
      .setInteractive(
        new Phaser.Geom.Rectangle(x - width / 2, y - height / 2, width, height),
        Phaser.Geom.Rectangle.Contains
      );

    this.add
      .text(x, y, text, {
        fontSize: "24px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    btn.on("pointerdown", callback);

    btn.on("pointerover", () => {
      btn.clear();
      btn.fillStyle(color - 0x333333, 1);
      btn.fillRoundedRect(x - width / 2, y - height / 2, width, height, 10);
    });

    btn.on("pointerout", () => {
      btn.clear();
      btn.fillStyle(color, 1);
      btn.fillRoundedRect(x - width / 2, y - height / 2, width, height, 10);
    });

    return btn;
  }

  // Отрисовка статус-баров
  drawStats() {
    if (this.statsBars) this.statsBars.clear();

    this.statsBars = this.add.graphics();
    const barWidth = 200;
    const x = W2 - barWidth / 2;
    let y = H2 * 0.9;
    const h = 20;
    const s = 15;
    const baseColor = 0x555555;
    // Еда
    this.statsBars.fillStyle(baseColor, 1);
    this.statsBars.fillRect(x, y, barWidth, h);
    this.statsBars.fillStyle(0x5722ff, 1);
    this.statsBars.fillRect(x, y, barWidth * (this.stats.food / 10), h);
    this.add.text(x - 10, y, "🍎", { fontSize: "20px" });

    // Настроение
    y += h + s;
    this.statsBars.fillStyle(baseColor, 1);
    this.statsBars.fillRect(x, y, barWidth, h);
    this.statsBars.fillStyle(0xffeb3b, 1);
    this.statsBars.fillRect(x, y, barWidth * (this.stats.mood / 10), h);
    this.add.text(x - 10, y, "😊", { fontSize: "20px" });

    // Энергия
    y += h + s;
    this.statsBars.fillStyle(baseColor, 1);
    this.statsBars.fillRect(x, y, barWidth, h);
    this.statsBars.fillStyle(0x4caf50, 1);
    this.statsBars.fillRect(x, y, barWidth * (this.stats.energy / 10), h);
    this.add.text(x - 10, y, "⚡", { fontSize: "20px" });
  }

  decayStats() {
    console.log("decayStats()");
    // Уменьшаем характеристики (но не ниже 0)
    this.stats.food = Math.max(0, this.stats.food - 1);
    this.stats.mood = Math.max(0, this.stats.mood - 0.5);
    this.stats.energy = Math.max(0, this.stats.energy - 0.7);

    // Обновляем визуальное отображение
    this.drawStats();

    // Визуальная индикация изменения
    if (this.stats.food < 3) {
      this.showEmoji("🍽️", W2, H8);
    }
    if (this.stats.energy < 3) {
      this.showEmoji("💤", W2, H8);
    }
  }

  // Анимация прыжка
  petJump() {
    this.tweens.add({
      targets: this.pet,
      y: 200,
      duration: 200,
      yoyo: true,
    });
  }

  // Эффект эмодзи
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

// Конфигурация Phaser (Canvas only)
const config = {
  type: Phaser.CANVAS,
  width: 2 * W2,
  height: 2 * H2,
  scene: [MenuScene, PetScene],
  backgroundColor: "#9bd6ff",
};

// Инициализация игры
const game = new Phaser.Game(config);
