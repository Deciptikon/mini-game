export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, callback, options = {}) {
    super(scene, x, y);
    this.scene = scene;

    // Параметры по умолчанию
    const {
      width = 150,
      height = 50,
      color = 0xe91e63,
      textStyle = { fontSize: "24px", color: "#ffffff" },
      borderRadius = 10,
    } = options;

    // Создаем графику для фона
    this.background = scene.add
      .graphics()
      .fillStyle(color, 1)
      .fillRoundedRect(-width / 2, -height / 2, width, height, borderRadius);

    // Добавляем текст
    this.buttonText = scene.add.text(0, 0, text, textStyle).setOrigin(0.5);

    // Добавляем элементы в контейнер
    this.add([this.background, this.buttonText]);

    // Делаем интерактивным
    this.setSize(width, height);
    this.setInteractive({ useHandCursor: true })
      .on("pointerover", this.onHover.bind(this, color))
      .on("pointerout", this.onOut.bind(this, color))
      .on("pointerdown", callback);

    // Сохраняем параметры для перерисовки
    this.buttonOptions = { width, height, color, borderRadius };

    // Добавляем в сцену
    scene.add.existing(this);
  }

  onHover(baseColor) {
    this.background
      .clear()
      .fillStyle(baseColor - 0x333333, 1)
      .fillRoundedRect(
        -this.buttonOptions.width / 2,
        -this.buttonOptions.height / 2,
        this.buttonOptions.width,
        this.buttonOptions.height,
        this.buttonOptions.borderRadius
      );
  }

  onOut(baseColor) {
    this.background
      .clear()
      .fillStyle(baseColor, 1)
      .fillRoundedRect(
        -this.buttonOptions.width / 2,
        -this.buttonOptions.height / 2,
        this.buttonOptions.width,
        this.buttonOptions.height,
        this.buttonOptions.borderRadius
      );
  }

  // Дополнительные методы для управления
  setText(newText) {
    this.buttonText.setText(newText);
    return this;
  }

  setCallback(newCallback) {
    this.removeListener("pointerdown");
    this.on("pointerdown", newCallback);
    return this;
  }
}
