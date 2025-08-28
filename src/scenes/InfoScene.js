console.log("start info");
import { W2, H2, H4, wb, hb, bigText, W, H } from "../constants.js";
import Button from "../components/Button.js";
import { createButtonBack } from "../components/functions.js";

export default class InfoScene extends Phaser.Scene {
  constructor() {
    super({ key: "InfoScene" });
  }

  create() {
    this.showReadme();

    // Кнопка возврата в меню
    createButtonBack(this);
  }

  showReadme() {
    const content = this.cache.text.get("readme");
    const parsedContent = this.parseMarkdown(content);

    // Текст
    this.scrollText = this.add.text(W * 0.05, 100, parsedContent, {
      fontSize: "25px",
      color: "#040404ff",
      wordWrap: { width: W * 0.9 },
      lineSpacing: 8,
    });

    // Добавляем скроллинг
    this.setupScrolling(this.scrollText);
  }

  setupScrolling(text) {
    this.scrollY = 0;
    this.maxScroll = Math.max(0, text.height - H * 0.7);
    this.isDragging = false;
    this.lastY = 0;
    this.scrollSpeed = 15;

    // Инициализация клавиш
    this.keys = this.input.keyboard.addKeys("UP,DOWN");

    // Скроллинг колесиком мыши
    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY) => {
      this.scrollY = Phaser.Math.Clamp(
        this.scrollY + deltaY,
        0,
        this.maxScroll
      );
      text.y = 100 - this.scrollY;
    });

    // Тачскрин драг
    text.setInteractive();
    this.input.setDraggable(text);

    text.on("pointerdown", (pointer) => {
      this.isDragging = true;
      this.lastY = pointer.y;
    });

    text.on("pointerup", () => {
      this.isDragging = false;
    });

    text.on("pointermove", (pointer) => {
      if (this.isDragging && pointer.isDown) {
        const deltaY = pointer.y - this.lastY;
        this.scrollY = Phaser.Math.Clamp(
          this.scrollY - deltaY,
          0,
          this.maxScroll
        );
        text.y = 100 - this.scrollY;
        this.lastY = pointer.y;
      }
    });

    // Визуальный индикатор скролла
    this.addScrollIndicator(text);

    // Запускаем обновление скроллинга
    this.scrollUpdate();
  }

  scrollUpdate() {
    // Непрерывный скроллинг при зажатых клавишах
    this.time.addEvent({
      delay: 16, // ~60 FPS
      callback: () => {
        if (this.keys.UP.isDown) {
          this.scrollY = Phaser.Math.Clamp(
            this.scrollY - this.scrollSpeed,
            0,
            this.maxScroll
          );
          this.scrollText.y = 100 - this.scrollY;
        }

        if (this.keys.DOWN.isDown) {
          this.scrollY = Phaser.Math.Clamp(
            this.scrollY + this.scrollSpeed,
            0,
            this.maxScroll
          );
          this.scrollText.y = 100 - this.scrollY;
        }
      },
      loop: true,
    });
  }

  addScrollIndicator(text) {
    if (this.maxScroll > 0) {
      // полоска скрола
      const sx = W * 0.95;
      const sy = H * 0.2;
      const sw = 10;
      const sh = H * 0.6;

      // ползунок скролбара
      const bw = 8;
      const bh = 100;

      // Полоса прокрутки
      const scrollBar = this.add
        .rectangle(sx, sy, sw, sh, 0x000000, 0.3)
        .setOrigin(0.5, 0)
        .setScrollFactor(0);

      // Бегунок
      this.scrollThumb = this.add
        .rectangle(sx, sy, bw, bh, 0x000000, 0.7)
        .setOrigin(0.5, 0)
        .setScrollFactor(0);

      // Обновление позиции бегунка
      this.time.addEvent({
        delay: 16,
        callback: () => {
          const progress =
            this.maxScroll > 0 ? this.scrollY / this.maxScroll : 0;
          this.scrollThumb.y = sy + progress * (sh - bh);
        },
        loop: true,
      });
    }
  }

  parseMarkdown(text) {
    // Простой парсинг для улучшения читаемости
    return text
      .replace(/^# (.*$)/gim, "\n=== $1 ===")
      .replace(/^## (.*$)/gim, "\n== $1 ==")
      .replace(/^### (.*$)/gim, "\n= $1 =");
    //.replace(/\*\*(.*?)\*\*/g, "$1")
    //.replace(/\*(.*?)\*/g, "$1")
  }
}
