console.log("start LocationScene");
import { tileSize, mapUpdateTimeOut } from "../constants.js";
import { ListLoc } from "../Map/ListLoc.js";
import Button from "../components/Button.js";
import {
  createButtonBack,
  generateRandomMatrix,
} from "../components/functions.js";

export default class LocationScene extends Phaser.Scene {
  constructor() {
    super({ key: "LocationScene" });
    this.locationId = null;
  }

  init(data) {
    //
  }

  create() {
    this.gameState = this.game.registry.get("gameState");
    this.locationId = this.gameState.currentLocation;

    // Матрица карты
    const mapMatrix = generateRandomMatrix(32, 32, 3);
    /** 
    const mapMatrix = [
      [0, 0, 1, 0],
      [1, 1, 0, 2],
      [2, 0, 1, 1],
      [2, 3, 3, 0],
    ];*/

    // 1. Создаём пустую тайловую карту
    const map = this.make.tilemap({
      tileWidth: tileSize,
      tileHeight: tileSize,
      width: mapMatrix[0].length, // ширина в тайлах
      height: mapMatrix.length, // высота в тайлах
    });

    // 2. Добавляем тайлсет с УКАЗАНИЕМ РАЗМЕРА ТАЙЛОВ
    const tileset = map.addTilesetImage("tileset", null, tileSize, tileSize);

    // 3. Создаём слой
    const layer = map.createBlankLayer("mainLayer", tileset);

    // 4. Заполняем слой из матрицы
    mapMatrix.forEach((row, y) => {
      row.forEach((tileId, x) => {
        layer.putTileAt(tileId, x, y); // tileId соответствует порядку в тайлсете
      });
    });

    // Настройка камеры
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.roundPixels = true;

    // Кнопка возврата (в координатах экрана)
    const backButton = createButtonBack(this, "MapScene")
      .setPosition(50, 50)
      .setScrollFactor(0)
      .setDepth(1000);

    // Drag-to-Pan скроллинг
    let isDragging = false;
    let startX, startY;

    this.input.on("pointerdown", (pointer) => {
      isDragging = true;
      startX = pointer.x + this.cameras.main.scrollX;
      startY = pointer.y + this.cameras.main.scrollY;
    });

    this.input.on("pointermove", (pointer) => {
      if (!isDragging) return;
      this.cameras.main.scrollX = startX - pointer.x;
      this.cameras.main.scrollY = startY - pointer.y;
    });

    this.input.on("pointerup", () => (isDragging = false));

    /** */
    this.statDecayTimer = this.time.addEvent({
      delay: mapUpdateTimeOut,
      callback: this.decayStats,
      callbackScope: this,
      loop: true,
    });
  }
}
