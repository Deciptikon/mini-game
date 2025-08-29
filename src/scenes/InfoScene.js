console.log("start info");
import { W2, H2, H4, wb, hb, bigText, W, H, isMobile } from "../constants.js";
import Button from "../components/Button.js";
import { createButtonBack, FONT } from "../components/functions.js";

// Константы для стилей
const TEXT_COLOR = "#040404ff";
const HEADER_COLOR = "#0000ddff";
const SCROLL_BAR_COLOR = 0x000000;
const SCROLL_BAR_ALPHA = 0.3;
const SCROLL_THUMB_COLOR = 0x000000;
const SCROLL_THUMB_ALPHA = 0.7;

// Константы позиционирования
const CONTENT_MARGIN_X = W * 0.05;
const CONTENT_WIDTH = W * 0.85;
const CONTENT_START_Y = 100;
const CONTENT_VISIBLE_HEIGHT = H - 150;
const SCROLL_BAR_X = W * 0.93;
const SCROLL_BAR_Y = 100;
const SCROLL_BAR_WIDTH = 10;
const SCROLL_BAR_HEIGHT = H - 150;
const SCROLL_THUMB_WIDTH = 8;
const SCROLL_THUMB_HEIGHT = 100;

const im = isMobile ? 1 : 2;

export default class InfoScene extends Phaser.Scene {
  constructor() {
    super({ key: "InfoScene" });
  }

  create() {
    this.contentContainer = this.add.container(0, 0);
    this.createMask();
    this.showReadme();
    createButtonBack(this);
  }

  createMask() {
    const maskGraphics = this.make.graphics();
    maskGraphics.fillRect(
      CONTENT_MARGIN_X,
      CONTENT_START_Y,
      W * 0.85,
      CONTENT_VISIBLE_HEIGHT
    );

    this.contentContainer.mask = new Phaser.Display.Masks.GeometryMask(
      this,
      maskGraphics
    );
  }

  showReadme() {
    const content = this.cache.text.get("readme");
    this.parseAndDisplayContent(content);
    this.setupContainerScrolling();
    this.addScrollBar();
  }

  parseAndDisplayContent(text) {
    const lines = text.split("\n");
    let currentY = CONTENT_START_Y;

    lines.forEach((line) => {
      if (line.startsWith("# ")) {
        this.addHeader(line.substring(2), currentY, FONT(32 * im), true);
        currentY += 30 * im;
      } else if (line.startsWith("## ")) {
        this.addHeader(line.substring(3), currentY, FONT(28 * im), true);
        currentY += 25 * im;
      } else if (line.startsWith("### ")) {
        if (line.startsWith("### Версия")) {
          this.addVersionHeader(line.substring(4), currentY);
        } else {
          this.addHeader(line.substring(4), currentY, FONT(24 * im), true);
        }
        currentY += 25 * im;
      } else if (line.startsWith("![")) {
        const altText = line.match(/!\[(.*?)\]/)?.[1] || "";
        const image = this.add
          .image(W * 0.5, currentY, "someImage")
          .setOrigin(0.5, 0)
          .setDisplaySize(200, 150);

        this.contentContainer.add(image);
        currentY += 160;
      } else if (line.includes("**")) {
        currentY = this.addBoldText(line, currentY);
      } else if (line.trim() !== "") {
        currentY = this.addJustifiedText(line, currentY);
      } else {
        currentY += 10;
      }
    });

    this.contentHeight = currentY;
  }

  addHeader(text, y, fontSize, isCentered = true) {
    const header = this.add
      .text(isCentered ? W * 0.5 : CONTENT_MARGIN_X, y, text, {
        fontSize: fontSize,
        color: HEADER_COLOR,
        fontStyle: "bold",
        align: isCentered ? "center" : "left",
      })
      .setOrigin(isCentered ? 0.5 : 0, 0);

    this.contentContainer.add(header);
    return y + header.height + 10;
  }

  addBoldText(line, y) {
    // Просто делаем весь текст жирным, убирая **
    const cleanText = line.replace(/\*\*/g, "");
    const text = this.add.text(CONTENT_MARGIN_X, y, cleanText, {
      fontSize: FONT(20 * im),
      color: TEXT_COLOR,
      //fontStyle: "bold",
      wordWrap: { width: CONTENT_WIDTH },
      align: "justify", // Выравнивание по ширине
    });

    this.contentContainer.add(text);
    return y + text.height + 10;
  }

  addJustifiedText(text, y) {
    const textObject = this.add.text(CONTENT_MARGIN_X, y, text, {
      fontSize: FONT(20 * im),
      color: TEXT_COLOR,
      wordWrap: { width: CONTENT_WIDTH },
      align: "justify", // Выравнивание по ширине!
    });

    this.contentContainer.add(textObject);
    return y + textObject.height + 0;
  }

  addVersionHeader(text, y) {
    const header = this.add.text(CONTENT_MARGIN_X, y, text, {
      fontSize: FONT(22 * im),
      color: "#FF6600", // оранжевый для версий
      wordWrap: { width: CONTENT_WIDTH },
      fontStyle: "bold",
    });
    this.contentContainer.add(header);
  }

  setupContainerScrolling() {
    this.scrollY = 0;
    this.maxScroll = Math.max(0, this.contentHeight - CONTENT_VISIBLE_HEIGHT);
    this.scrollSpeed = 15;

    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY) => {
      this.scrollContainer(deltaY);
    });

    this.keys = this.input.keyboard.addKeys("UP,DOWN");
    this.scrollEvent = this.time.addEvent({
      delay: 16,
      callback: () => {
        if (this.keys.UP.isDown) this.scrollContainer(-this.scrollSpeed);
        if (this.keys.DOWN.isDown) this.scrollContainer(this.scrollSpeed);
      },
      loop: true,
    });

    this.setupTouchScrolling();
  }

  scrollContainer(deltaY) {
    this.scrollY = Phaser.Math.Clamp(this.scrollY + deltaY, 0, this.maxScroll);
    this.contentContainer.y = -this.scrollY;
    this.updateScrollBar();
  }

  setupTouchScrolling() {
    this.isDragging = false;
    this.startY = 0;
    this.startScrollY = 0;

    this.input.on("pointerdown", (pointer) => {
      if (
        pointer.y > CONTENT_START_Y &&
        pointer.y < CONTENT_START_Y + CONTENT_VISIBLE_HEIGHT
      ) {
        this.isDragging = true;
        this.startY = pointer.y;
        this.startScrollY = this.scrollY;
      }
    });

    this.input.on("pointerup", () => {
      this.isDragging = false;
    });

    this.input.on("pointermove", (pointer) => {
      if (this.isDragging && pointer.isDown) {
        const deltaY = pointer.y - this.startY;
        this.scrollY = Phaser.Math.Clamp(
          this.startScrollY - deltaY,
          0,
          this.maxScroll
        );
        this.contentContainer.y = -this.scrollY;
        this.updateScrollBar();
      }
    });
  }

  addScrollBar() {
    if (this.maxScroll > 0) {
      this.scrollBar = this.add
        .rectangle(
          SCROLL_BAR_X,
          SCROLL_BAR_Y,
          SCROLL_BAR_WIDTH,
          SCROLL_BAR_HEIGHT,
          SCROLL_BAR_COLOR,
          SCROLL_BAR_ALPHA
        )
        .setOrigin(0.5, 0);

      this.scrollThumb = this.add
        .rectangle(
          SCROLL_BAR_X,
          SCROLL_BAR_Y,
          SCROLL_THUMB_WIDTH,
          SCROLL_THUMB_HEIGHT,
          SCROLL_THUMB_COLOR,
          SCROLL_THUMB_ALPHA
        )
        .setOrigin(0.5, 0);

      this.setupScrollBarInteractivity();
    }
  }

  updateScrollBar() {
    if (this.scrollThumb && this.maxScroll > 0) {
      const progress = this.scrollY / this.maxScroll;
      this.scrollThumb.y =
        SCROLL_BAR_Y + progress * (SCROLL_BAR_HEIGHT - SCROLL_THUMB_HEIGHT);
    }
  }

  setupScrollBarInteractivity() {
    this.scrollBar.setInteractive({ useHandCursor: true });
    this.scrollThumb.setInteractive({ useHandCursor: true });

    this.scrollBar.on("pointerdown", (pointer) => {
      const localY = pointer.y - SCROLL_BAR_Y;
      const progress = Phaser.Math.Clamp(
        localY / (SCROLL_BAR_HEIGHT - SCROLL_THUMB_HEIGHT),
        0,
        1
      );
      this.scrollY = progress * this.maxScroll;
      this.contentContainer.y = -this.scrollY;
      this.updateScrollBar();
    });

    this.scrollThumb.on("pointerdown", (pointer) => {
      this.isThumbDragging = true;
      this.thumbStartY = pointer.y;
      this.thumbStartScrollY = this.scrollY;
    });

    this.input.on("pointerup", () => {
      this.isThumbDragging = false;
    });

    this.input.on("pointermove", (pointer) => {
      if (this.isThumbDragging && pointer.isDown) {
        const deltaY = pointer.y - this.thumbStartY;
        const scrollDelta =
          (this.maxScroll * deltaY) / (SCROLL_BAR_HEIGHT - SCROLL_THUMB_HEIGHT);
        this.scrollY = Phaser.Math.Clamp(
          this.thumbStartScrollY + scrollDelta,
          0,
          this.maxScroll
        );
        this.contentContainer.y = -this.scrollY;
        this.updateScrollBar();
      }
    });
  }
}
