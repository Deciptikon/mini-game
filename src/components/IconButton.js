export default class IconButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, w, h, img, text, onClick, config = {}) {
    super(scene, x, y);
    scene.add.existing(this);

    // Параметры по умолчанию
    const {
      textOffsetX = 0, // Смещение текста по X
      textOffsetY = 0, // Смещение текста по Y
      textStyle = {}, // Стиль текста
      scale = 1, // Масштаб иконки
      tint = 0xffffff, // Цвет иконки
      hoverTint = 0xcccccc, // Цвет при наведении
      hoverScale = 1.1, // Масштаб при наведении
    } = config;

    // Сохраняем конфиг
    this.buttonConfig = { scale, hoverScale, tint, hoverTint };

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

    // Добавляем иконку в контейнер
    this.add(this.icon);

    // Настраиваем интерактивность
    this.setSize(this.icon.displayWidth, this.icon.displayHeight);
    this.setInteractive({ useHandCursor: true })
      .on("pointerover", this.onHover.bind(this))
      .on("pointerout", this.onOut.bind(this))
      .on("pointerdown", onClick);
  }

  // Эффекты при наведении/уходе
  onHover() {
    this.scene.tweens.add({
      targets: this.icon,
      scale: this.buttonConfig.hoverScale,
      tint: this.buttonConfig.hoverTint,
      duration: 100,
    });
  }

  onOut() {
    this.scene.tweens.add({
      targets: this.icon,
      scale: this.buttonConfig.scale,
      tint: this.buttonConfig.tint,
      duration: 100,
    });
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
