export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, callback, options = {}) {
    super(scene, x, y);
    this.scene = scene;

    const {
      width = 150,
      height = 50,
      color = 0xe91e63,
      textStyle = { fontSize: "24px", color: "#ffffff" },
      borderRadius = 10,
    } = options;

    this.buttonOptions = { width, height, color, borderRadius };

    this.background = scene.add
      .graphics()
      .fillStyle(color, 1)
      .fillRoundedRect(-width / 2, -height / 2, width, height, borderRadius);

    this.buttonText = scene.add.text(0, 0, text, textStyle).setOrigin(0.5);

    this.add([this.background, this.buttonText]);

    this.setSize(width, height);
    this.setInteractive({ useHandCursor: true })
      .on("pointerover", this.onHover.bind(this, color))
      .on("pointerout", this.onOut.bind(this, color))
      .on("pointerdown", callback);

    scene.add.existing(this);
  }

  drawBackground(color) {
    this.background
      .clear()
      .fillStyle(color, 1)
      .fillRoundedRect(
        -this.buttonOptions.width / 2,
        -this.buttonOptions.height / 2,
        this.buttonOptions.width,
        this.buttonOptions.height,
        this.buttonOptions.borderRadius
      );
  }

  onHover() {
    this.drawBackground(this.buttonOptions.color - 0x333333);
  }

  onOut() {
    this.drawBackground(this.buttonOptions.color);
  }

  setColor(newColor) {
    this.buttonOptions.color = newColor;
    this.drawBackground(newColor);
    return this;
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
