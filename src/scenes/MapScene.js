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

    // Размеры карты
    this.mapWidth = 1920;
    this.mapHeight = 1080;

    // Основной слой карты
    this.mapBg = this.add
      .tileSprite(0, 0, this.mapWidth, this.mapHeight, "map_texture")
      .setOrigin(0)
      .setInteractive();

    // Контейнер для точек локаций
    this.locationsContainer = this.add.container(0, 0);

    for (const id in ListLoc) {
      if (ListLoc.hasOwnProperty(id)) {
        const location = ListLoc[id];
        const point = new LocationPoint(
          this,
          location.position.x,
          location.position.y,
          id,
          location,
          this.gameState.data.locations[id]
        );
        if (id === this.gameState.currentLocation) {
          this.cameras.main.scrollX = Math.max(
            0,
            Math.min(this.mapWidth - W, location.position.x - W2)
          );
          this.cameras.main.scrollY = Math.max(
            0,
            Math.min(this.mapHeight - H, location.position.y - H2)
          );
        }
        this.locationsContainer.add(point);
      }
    }

    // Настройка камеры
    this.cameras.main.setBounds(0, 0, this.mapWidth, this.mapHeight);

    // Кнопка возврата (в координатах экрана)
    const backButton = createButtonBack(this)
      .setPosition(50, 50)
      .setScrollFactor(0)
      .setDepth(1000);

    // Обработчики событий для карты
    this.input.on("pointerdown", (pointer) => {
      if (
        pointer.button === 0 &&
        !backButton.getBounds().contains(pointer.x, pointer.y)
      ) {
        this.dragStart = {
          x: pointer.x,
          y: pointer.y,
          scrollX: this.cameras.main.scrollX,
          scrollY: this.cameras.main.scrollY,
        };
      }
    });

    this.input.on("pointermove", (pointer) => {
      if (pointer.isDown && this.dragStart) {
        const dx = (pointer.x - this.dragStart.x) / this.cameras.main.zoom;
        const dy = (pointer.y - this.dragStart.y) / this.cameras.main.zoom;

        this.cameras.main.scrollX = this.dragStart.scrollX - dx;
        this.cameras.main.scrollY = this.dragStart.scrollY - dy;
      }
    });

    this.events.on("locationSelected", (locationId) => {
      this.gameState.currentLocation = locationId;
      this.scene.start("LocationInfoScene", { locationId });
    });
  }
}
