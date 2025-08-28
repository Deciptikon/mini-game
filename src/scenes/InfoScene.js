console.log("start info");
import { W2, H2, H4, wb, hb, bigText, W, H } from "../constants.js";
import Button from "../components/Button.js";
import { createButtonBack } from "../components/functions.js";
export default class InfoScene extends Phaser.Scene {
  constructor() {
    super({ key: "InfoScene" });
  }

  create() {
    // Создаем контейнер для всего контента
    this.contentContainer = this.add.container(0, 0);

    // Создаем маску для ограничения видимой области
    this.createMask();

    this.showReadme();

    // Кнопка возврата в меню
    createButtonBack(this);
  }

  createMask() {
    // Создаем графику для маски
    const maskGraphics = this.make.graphics();
    maskGraphics.fillRect(W * 0.05, 100, W * 0.9, H * 0.7);

    // Применяем маску к контейнеру
    this.contentContainer.mask = new Phaser.Display.Masks.GeometryMask(
      this,
      maskGraphics
    );
  }

  showReadme() {
    const content = this.cache.text.get("readme");
    this.parseAndDisplayContent(content);

    // Добавляем скроллинг для контейнера
    this.setupContainerScrolling();
  }

  parseAndDisplayContent(text) {
    const lines = text.split("\n");
    let currentY = 0;

    lines.forEach((line) => {
      if (line.startsWith("# ")) {
        // Заголовок 1 уровня
        const header = this.add
          .text(W * 0.5, currentY, line.substring(2), {
            fontSize: "32px",
            color: "#000000",
            fontStyle: "bold",
          })
          .setOrigin(0.5, 0);

        this.contentContainer.add(header);
        currentY += header.height + 20;
      } else if (line.startsWith("## ")) {
        // Заголовок 2 уровня
        const subheader = this.add
          .text(W * 0.5, currentY, line.substring(3), {
            fontSize: "28px",
            color: "#000000",
            fontStyle: "bold",
          })
          .setOrigin(0.5, 0);

        this.contentContainer.add(subheader);
        currentY += subheader.height + 15;
      } else if (line.startsWith("### ")) {
        // Заголовок 3 уровня
        const subsubheader = this.add
          .text(W * 0.5, currentY, line.substring(4), {
            fontSize: "24px",
            color: "#000000",
            fontStyle: "bold",
          })
          .setOrigin(0.5, 0);

        this.contentContainer.add(subsubheader);
        currentY += subsubheader.height + 10;
      } else if (line.startsWith("![")) {
        // Картинка
        const altText = line.match(/!\[(.*?)\]/)?.[1] || "";
        const image = this.add
          .image(W * 0.5, currentY, "someImage")
          .setOrigin(0.5, 0)
          .setDisplaySize(200, 150);

        this.contentContainer.add(image);
        currentY += 160;
      } else if (line.trim() !== "") {
        // Обычный текст
        const textLine = this.add.text(W * 0.05, currentY, line, {
          fontSize: "20px",
          color: "#000000",
          wordWrap: { width: W * 0.8 },
        });

        this.contentContainer.add(textLine);
        currentY += textLine.height + 10;
      } else {
        // Пустая строка
        currentY += 20;
      }
    });

    // Сохраняем высоту контента для скроллинга
    this.contentHeight = currentY;
  }

  setupContainerScrolling() {
    this.scrollY = 0;
    this.maxScroll = Math.max(0, this.contentHeight - H * 0.7);

    // Скроллинг колесиком
    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY) => {
      this.scrollContainer(deltaY);
    });

    // Скроллинг стрелками
    this.keys = this.input.keyboard.addKeys("UP,DOWN");
    this.scrollEvent = this.time.addEvent({
      delay: 16,
      callback: () => {
        if (this.keys.UP.isDown) this.scrollContainer(-15);
        if (this.keys.DOWN.isDown) this.scrollContainer(15);
      },
      loop: true,
    });

    // Тачскрин драг
    this.setupTouchScrolling();
  }

  scrollContainer(deltaY) {
    this.scrollY = Phaser.Math.Clamp(this.scrollY + deltaY, 0, this.maxScroll);
    this.contentContainer.y = -this.scrollY;
  }

  setupTouchScrolling() {
    let isDragging = false;
    let startY = 0;
    let startScrollY = 0;

    this.input.on("pointerdown", (pointer) => {
      if (pointer.y > 100 && pointer.y < H * 0.9) {
        isDragging = true;
        startY = pointer.y;
        startScrollY = this.scrollY;
      }
    });

    this.input.on("pointerup", () => {
      isDragging = false;
    });

    this.input.on("pointermove", (pointer) => {
      if (isDragging && pointer.isDown) {
        const deltaY = pointer.y - startY;
        this.scrollY = Phaser.Math.Clamp(
          startScrollY - deltaY,
          0,
          this.maxScroll
        );
        this.contentContainer.y = -this.scrollY;
      }
    });
  }
}
