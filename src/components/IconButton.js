export default class IconButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, w, h, img, text, onClick, config = {}) {
    super(scene, x, y);
    scene.add.existing(this);

    // Параметры по умолчанию
    const {
      textOffsetX = 0,
      textOffsetY = 0,
      textStyle = {},
      scale = 1,
      tint = 0xffffff,
      hoverTint = 0xcccccc,
      hoverScale = 1.1,
      bgColor = 0x333333, // Цвет фона
      bgAlpha = 0.7, // Прозрачность фона
      bgRadius = 10, // Радиус скругления углов
      borderWidth = 0, // Толщина обводки
      borderColor = 0xffffff, // Цвет обводки
      hoverBorderWidth = 2, // Толщина обводки при наведении
    } = config;

    // Сохраняем конфиг
    this.buttonConfig = {
      scale,
      hoverScale,
      tint,
      hoverTint,
      bgColor,
      bgAlpha,
      bgRadius,
      borderWidth,
      borderColor,
      hoverBorderWidth,
    };

    // Создаем фон (скругленный прямоугольник)
    this.bg = scene.add
      .graphics()
      .fillStyle(bgColor, bgAlpha)
      .fillRoundedRect(-w / 2, -h / 2, w, h, bgRadius)
      .lineStyle(borderWidth, borderColor)
      .strokeRoundedRect(-w / 2, -h / 2, w, h, bgRadius);

    // Создаем иконку
    this.icon = scene.add
      .sprite(0, 0, img)
      .setScale(scale)
      .setTint(tint)
      .setOrigin(0.5);

    // Создаем текст (если есть)
    this.label = null;
    if (text) {
      this.label = scene.add
        .text(textOffsetX, textOffsetY, text, textStyle)
        .setOrigin(0.5);
      this.add(this.label);
    }

    // Добавляем элементы в контейнер (фон первым!)
    this.add([this.bg, this.icon]);

    // Настраиваем интерактивность
    this.setSize(w, h);
    this.setInteractive({ useHandCursor: true })
      .on("pointerover", this.onHover.bind(this))
      .on("pointerout", this.onOut.bind(this))
      .on("pointerdown", onClick);
  }

  // Эффекты при наведении
  onHover() {
    this.scene.tweens.add({
      targets: this.icon,
      scale: this.buttonConfig.hoverScale,
      tint: this.buttonConfig.hoverTint,
      duration: 100,
    });

    // Анимация обводки
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

  // Эффекты при уходе
  onOut() {
    this.scene.tweens.add({
      targets: this.icon,
      scale: this.buttonConfig.scale,
      tint: this.buttonConfig.tint,
      duration: 100,
    });

    // Возвращаем исходную обводку
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

  // Обновление текста
  updateText(newText) {
    if (this.label) this.label.setText(newText);
    return this;
  }

  // Обновление иконки
  updateIcon(texture, frame = null) {
    this.icon.setTexture(texture, frame);
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
