import { ListLoc } from "../Map/ListLoc.js";

export default class LocationPoint extends Phaser.GameObjects.Container {
  constructor(scene, x, y, locationId) {
    super(scene, x, y);
    scene.add.existing(this);
    this.originalIconScale = 0.2;
    this.locationData = ListLoc[locationId];

    // Основной круг
    this.circle = scene.add
      .circle(0, 0, 25, 0x005500)
      .setStrokeStyle(3, 0xffffff);

    // Иконка типа локации
    this.icon = scene.add
      .sprite(0, 0, `icon_loc_${locationId}`) //`icon_${locationData.type}`
      .setOrigin(0.5, 0.75)
      .setScale(this.originalIconScale);

    // Название локации
    this.label = scene.add
      .text(0, 40, this.locationData.name, {
        fontSize: "16px",
        color: "#FFFFFF",
        backgroundColor: "#000000",
        padding: { x: 5, y: 2 },
      })
      .setOrigin(0.5);

    this.add([this.circle, this.icon, this.label]);
    this.setSize(50, 50);

    // Интерактивность
    this.setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.onHover())
      .on("pointerout", () => this.onOut())
      .on("pointerdown", () =>
        this.scene.events.emit("locationSelected", locationId)
      );

    // Для неоткрытых локаций
    if (!this.locationData.discovered) {
      this.setLocked();
    }
  }

  setLocked() {
    this.circle.setFillStyle(0x333333);
    this.icon.setAlpha(0.3);
    this.label.setText("???");
    this.disableInteractive();
  }

  onHover() {
    this.scene.tweens.add({
      targets: this.circle,
      scale: 1.1,
      duration: 100,
    });

    this.scene.tweens.add({
      targets: this.icon,
      scale: this.originalIconScale * 1.3,
      duration: 100,
    });
  }

  onOut() {
    this.scene.tweens.add({
      targets: this.circle,
      scale: 1,
      duration: 100,
    });

    this.scene.tweens.add({
      targets: this.icon,
      scale: this.originalIconScale,
      duration: 100,
    });

    //this.scene.tweens.killTweensOf(this.icon);
  }
}
