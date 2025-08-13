//import Phaser from "phaser";

export default class StatusBar extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    icon,
    maxValue,
    currentValue,
    fillColor,
    options = {}
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    // Параметры по умолчанию
    const {
      width = 200,
      height = 20,
      borderRadius = 0,
      baseColor = 0x555555,
      iconSize = "35px",
      label = "",
    } = options;

    // Сохраняем параметры для обновления
    this.barConfig = { width, height, baseColor, fillColor };
    this.maxValue = maxValue;
    this.currentValue = currentValue;

    // Создаем иконку
    this.icon = scene.add
      .text(0, 0, icon, { fontSize: iconSize })
      .setOrigin(0.5)
      .setPosition(0, height / 2);

    // Создаем текстовую метку (если есть)
    this.label = null;
    if (label) {
      this.label = scene.add
        .text(width + 15, height / 2, label, {
          fontSize: Math.max(12, height * 0.8),
          color: "#ffffff",
        })
        .setOrigin(0, 0.5);
    }

    // Создаем фон полосы
    this.baseBar = scene.add
      .graphics()
      .fillStyle(baseColor, 1)
      .fillRoundedRect(0, 0, width, height, borderRadius);

    // Создаем заполняемую часть
    this.fillBar = scene.add
      .graphics()
      .fillStyle(fillColor, 1)
      .fillRoundedRect(
        0,
        0,
        width * (currentValue / maxValue),
        height,
        borderRadius
      );

    // Добавляем все элементы в контейнер
    const children = [this.baseBar, this.fillBar, this.icon];
    if (this.label) children.push(this.label);
    this.add(children);

    // Позиционируем контейнер
    this.setSize(width, height);
  }

  // Обновление значения
  updateValue(newValue) {
    this.currentValue = Phaser.Math.Clamp(newValue, 0, this.maxValue);
    this.fillBar
      .clear()
      .fillStyle(this.barConfig.fillColor, 1)
      .fillRoundedRect(
        0,
        0,
        this.barConfig.width * (this.currentValue / this.maxValue),
        this.barConfig.height,
        0
      );

    return this.currentValue;
  }

  // Обновление иконки
  updateIcon(newIcon) {
    this.icon.setText(newIcon);
    return this;
  }

  // Обновление метки
  updateLabel(newLabel) {
    if (this.label) {
      this.label.setText(newLabel);
    }
    return this;
  }
}
