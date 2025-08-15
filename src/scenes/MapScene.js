console.log("start map");
import { H, H2, W, W2 } from "../constants.js";
import { ListLoc } from "../Map/ListLoc.js";

import LocationPoint from "../components/LocationPoint.js";
import Button from "../components/Button.js";
import { createButtonBack } from "../components/functions.js";

export default class MapScene extends Phaser.Scene {
  constructor() {
    super({ key: "MapScene" });
  }

  create() {
    this.gameState = this.game.registry.get("gameState");

    this.mapWidth = 1920;
    this.mapHeight = 1080;

    this.mapBg = this.add
      .tileSprite(0, 0, this.mapWidth, this.mapHeight, "map_texture")
      .setOrigin(0)
      .setInteractive();

    this.locationsContainer = this.add.container(0, 0);
    for (const id in ListLoc) {
      if (ListLoc.hasOwnProperty(id)) {
        const location = ListLoc[id];
        const point = new LocationPoint(
          this,
          location.position.x,
          location.position.y,
          id
        );
        if (id === this.gameState.currentLocation) {
          this.cameras.main.scrollX = Math.max(
            0,
            Math.min(this.mapWidth - W, location.position.x - W2) /
              this.cameras.main.zoom
          );
          this.cameras.main.scrollY = Math.max(
            0,
            Math.min(this.mapHeight - H, location.position.y - H2) /
              this.cameras.main.zoom
          );
        }
        this.locationsContainer.add(point);
      }
    }

    this.cameras.main.setBounds(0, 0, this.mapWidth, this.mapHeight);
    //this.physics.world.setBounds(0, 0, this.mapWidth, this.mapHeight);

    this.input.on("pointerdown", (pointer) => {
      if (pointer.button === 0) {
        this.dragStart = { x: pointer.x, y: pointer.y };
      }
    });

    this.input.on("pointermove", (pointer) => {
      if (pointer.isDown) {
        const dx = (pointer.x - this.dragStart.x) / this.cameras.main.zoom;
        const dy = (pointer.y - this.dragStart.y) / this.cameras.main.zoom;

        this.cameras.main.scrollX -= dx;
        this.cameras.main.scrollY -= dy;

        this.dragStart = { x: pointer.x, y: pointer.y };
      }
    });

    this.input.on("wheel", (pointer, deltaY) => {
      const zoomStep = 0.1;
      const newZoom = Phaser.Math.Clamp(
        this.cameras.main.zoom + (deltaY > 0 ? -zoomStep : zoomStep),
        0.5,
        2
      );

      this.cameras.main.zoomTo(newZoom, 300);
    });

    // Кнопка возврата
    createButtonBack(this).setScrollFactor(0).setDepth(1000);

    // Обработчик выбора локации
    this.events.on("locationSelected", (locationId) => {
      this.gameState.currentLocation = locationId;
      this.scene.start("LocationInfoScene", { locationId });
    });
  }
}
