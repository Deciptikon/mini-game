export const STATE_INVENTORY_SLOT = {
  LOCKED: "LOCKED",
  EMPTY: "EMPTY",
  ACTIVE: "ACTIVE",
};

export class InventorySlot extends Phaser.GameObjects.Container {
  constructor(scene, x, y, w, h, img, text, onClick, config = {}, id) {
    super(scene, x, y);
    scene.add.existing(this);

    this.itemId = null;
    this.id = id;

    // Параметры по умолчанию
    const {
      textOffsetX = 0,
      textOffsetY = 0,
      textStyle = {},
      tint = 0xffffff,
      hoverTint = 0xcccccc,
      bgColor = 0x333333, // Цвет фона
      bgAlpha = 0.7, // Прозрачность фона
      bgRadius = 10, // Радиус скругления углов
      borderWidth = 0, // Толщина обводки
      borderColor = 0xffffff, // Цвет обводки
      hoverBorderWidth = 2, // Толщина обводки при наведении
    } = config;

    // Сохраняем конфиг
    this.buttonConfig = {
      tint,
      hoverTint,
      bgColor,
      bgAlpha,
      bgRadius,
      borderWidth,
      borderColor,
      hoverBorderWidth,
    };

    this.iconScale = 0.25;
    this.iconHoverScale = 0.28;

    this.w = w;
    this.h = h;

    this.setLockedState();

    // Настраиваем интерактивность
    this.setSize(w, h);
    this.setInteractive({ useHandCursor: true })
      .on("pointerover", this.onHover.bind(this))
      .on("pointerout", this.onOut.bind(this))
      .on("pointerdown", onClick);
  }

  // Заблокированное состояние
  setLockedState() {
    this.state = STATE_INVENTORY_SLOT.LOCKED;
    this.itemId = null;

    const tint = 0xffffff;
    const hoverTint = 0xcccccc;
    const bgColor = 0x333333; // Цвет фона
    const bgAlpha = 0.7; // Прозрачность фона
    const bgRadius = 10; // Радиус скругления углов
    const borderWidth = 0; // Толщина обводки
    const borderColor = 0x000000; // Цвет обводки
    const hoverBorderWidth = 2; // Толщина обводки при наведении

    this.buttonConfig = {
      tint,
      hoverTint,
      bgColor,
      bgAlpha,
      bgRadius,
      borderWidth,
      borderColor,
      hoverBorderWidth,
    };

    if (this.bg) {
      this.bg.destroy();
      this.bg = null;
    }

    this.bg = this.scene.add
      .graphics()
      .fillStyle(bgColor, bgAlpha)
      .fillRoundedRect(-this.w / 2, -this.h / 2, this.w, this.h, bgRadius)
      .lineStyle(borderWidth, borderColor)
      .strokeRoundedRect(-this.w / 2, -this.h / 2, this.w, this.h, bgRadius);
    this.add(this.bg);

    if (this.icon) {
      this.icon.destroy();
      this.icon = null;
    }

    if (this.label) {
      this.label.destroy();
      this.label = null;
    }
  }

  // Пустое стояние
  setEmptyState() {
    this.state = STATE_INVENTORY_SLOT.EMPTY;
    this.itemId = null;

    const tint = 0xffffff;
    const hoverTint = 0xcccccc;
    const bgColor = 0x333333; // Цвет фона
    const bgAlpha = 0.1; // Прозрачность фона
    const bgRadius = 10; // Радиус скругления углов
    const borderWidth = 0; // Толщина обводки
    const borderColor = 0xffffff; // Цвет обводки
    const hoverBorderWidth = 2; // Толщина обводки при наведении

    this.buttonConfig = {
      tint,
      hoverTint,
      bgColor,
      bgAlpha,
      bgRadius,
      borderWidth,
      borderColor,
      hoverBorderWidth,
    };

    if (this.bg) {
      this.bg.destroy();
      this.bg = null;
    }

    this.bg = this.scene.add
      .graphics()
      .fillStyle(bgColor, bgAlpha)
      .fillRoundedRect(-this.w / 2, -this.h / 2, this.w, this.h, bgRadius)
      .lineStyle(borderWidth, borderColor)
      .strokeRoundedRect(-this.w / 2, -this.h / 2, this.w, this.h, bgRadius);

    this.add(this.bg);

    if (this.icon) {
      this.icon.destroy();
      this.icon = null;
    }

    if (this.label) {
      this.label.destroy();
      this.label = null;
    }
  }

  // Активное состояние
  setActiveState(itemId, icon, text = null) {
    console.log(`setActiveState( itemId=${itemId}, icon=${icon}, text = null)`);

    this.state = STATE_INVENTORY_SLOT.ACTIVE;
    this.itemId = itemId;

    const textOffsetX = 0;
    const textOffsetY = 0;
    const textStyle = {};
    const tint = 0xffffff;
    const hoverTint = 0xcccccc;
    const bgColor = 0xff3333; // Цвет фона
    const bgAlpha = 1; // Прозрачность фона
    const bgRadius = 10; // Радиус скругления углов
    const borderWidth = 0; // Толщина обводки
    const borderColor = 0xffffff; // Цвет обводки
    const hoverBorderWidth = 2; // Толщина обводки при наведении

    this.buttonConfig = {
      tint,
      hoverTint,
      bgColor,
      bgAlpha,
      bgRadius,
      borderWidth,
      borderColor,
      hoverBorderWidth,
    };

    if (this.icon) {
      this.icon.destroy();
      this.icon = null;
    }

    if (this.label) {
      this.label.destroy();
      this.label = null;
    }

    // Создаем иконку
    this.icon = null;
    if (icon !== null && icon !== "") {
      console.log("Добавляем иконку");
      console.log(`this.buttonConfig.scale = ${this.iconScale}`);
      this.icon = this.scene.add
        .sprite(0, 0, icon)
        .setScale(this.iconScale)
        .setTint(this.buttonConfig.tint)
        .setOrigin(0.5);
      this.add(this.icon);
    }

    if (this.bg) {
      this.bg.destroy();
      this.bg = null;
    }

    const r = 25;
    // здесь должен быть крестик
    this.bg = this.scene.add
      .graphics()
      .fillStyle(bgColor, bgAlpha)
      .fillRoundedRect(this.w / 2 - r, -this.h / 2, r, r, r / 2)
      .lineStyle(borderWidth, borderColor)
      .strokeRoundedRect(this.w / 2 - r, -this.h / 2, r, r, r / 2);
    this.add(this.bg);

    // Создаем текст (если есть)
    this.label = null;
    if (text) {
      this.label = this.scene.add
        .text(textOffsetX, textOffsetY, text, textStyle)
        .setOrigin(0.5);
      this.add(this.label);
    }

    this.setSize(this.w, this.h);
  }

  // Эффекты при наведении
  onHover() {
    if (this.state === STATE_INVENTORY_SLOT.LOCKED) {
      return;
    }

    if (this.state === STATE_INVENTORY_SLOT.EMPTY) {
      this.bg
        .clear()
        .fillStyle(this.buttonConfig.bgColor, this.buttonConfig.bgAlpha)
        .fillRoundedRect(
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height,
          this.buttonConfig.bgRadius
        )
        .lineStyle(
          this.buttonConfig.hoverBorderWidth,
          this.buttonConfig.borderColor
        )
        .strokeRoundedRect(
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height,
          this.buttonConfig.bgRadius
        );
    }

    if (this.state === STATE_INVENTORY_SLOT.ACTIVE) {
      if (this.icon) {
        this.scene.tweens.add({
          targets: this.icon,
          scale: this.iconHoverScale,
          tint: this.buttonConfig.hoverTint,
          duration: 100,
        });
      }
    }
  }

  // Эффекты при уходе
  onOut() {
    if (this.state === STATE_INVENTORY_SLOT.LOCKED) {
      return;
    }

    if (this.state === STATE_INVENTORY_SLOT.EMPTY) {
      this.bg
        .clear()
        .fillStyle(this.buttonConfig.bgColor, this.buttonConfig.bgAlpha)
        .fillRoundedRect(
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height,
          this.buttonConfig.bgRadius
        )
        .lineStyle(this.buttonConfig.borderWidth, this.buttonConfig.borderColor)
        .strokeRoundedRect(
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height,
          this.buttonConfig.bgRadius
        );
    }

    if (this.state === STATE_INVENTORY_SLOT.ACTIVE) {
      if (this.icon) {
        this.scene.tweens.add({
          targets: this.icon,
          scale: this.iconScale,
          tint: this.buttonConfig.tint,
          duration: 100,
        });
      }
    }
  }

  // Обновление текста
  updateText(newText) {
    if (this.label) this.label.setText(newText);
    return this;
  }

  // Обновление иконки
  updateIcon(texture, frame = null) {
    if (this.icon) this.icon.setTexture(texture, frame);
    return this;
  }

  // Обновление позиции текста
  updateTextPosition(x, y) {
    if (this.label) {
      this.label.setPosition(x, y);
    }
    return this;
  }
}
