console.log("start LocationScene");
import {
  tileSize,
  mapUpdateTimeOut,
  tileCount,
  mapHeightTile,
  mapWidthTile,
} from "../constants.js";
import { ListLoc } from "../Map/ListLoc.js";
import Button from "../components/Button.js";
import {
  createButtonBack,
  generateRandomMatrix,
  rndInt,
  tileToWorld,
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

    this.pet = this.gameState.pet;
    this.pet.x = 3;
    this.pet.y = 5;

    // Матрица карты
    const mapMatrix = generateRandomMatrix(
      mapHeightTile,
      mapWidthTile,
      tileCount
    );
    /** 
    const mapMatrix = [
      [0, 0, 1, 0],
      [1, 1, 0, 2],
      [2, 0, 1, 1],
      [2, 3, 3, 0],
    ];*/

    const map = this.make.tilemap({
      tileWidth: tileSize,
      tileHeight: tileSize,
      width: mapMatrix[0].length, // ширина в тайлах
      height: mapMatrix.length, // высота в тайлах
    });

    const tileset = map.addTilesetImage("tileset", null, tileSize, tileSize);

    const layer = map.createBlankLayer("mainLayer", tileset);

    mapMatrix.forEach((row, y) => {
      row.forEach((tileId, x) => {
        layer.putTileAt(tileId, x, y); // tileId соответствует порядку в тайлсете
      });
    });

    this.entitiesContainer = this.add.container(0, 0);
    this.petContainer = this.add.container(0, 0);

    // Аналогично для врагов
    this.wolf = this.add
      .sprite(tileToWorld(7), tileToWorld(7), "dog")
      .setScale(0.1)
      .setOrigin(0.5);
    this.entitiesContainer.add(this.wolf);

    // Создание питомца
    this.pet.sprite = this.add
      .sprite(
        tileToWorld(this.pet.x),
        tileToWorld(this.pet.y),
        this.gameState.pet.type
      )
      .setScale(0.1)
      .setOrigin(0.5);
    this.petContainer.add(this.pet.sprite);

    // Настройка камеры
    const cx = (map.widthInPixels - this.sys.game.config.width) / 2;
    const cy = (map.heightInPixels - this.sys.game.config.height) / 2;
    if (map.widthInPixels > this.sys.game.config.width) {
      if (map.heightInPixels > this.sys.game.config.height) {
        this.cameras.main.setBounds(
          0,
          0,
          map.widthInPixels,
          map.heightInPixels
        );
      } else {
        this.cameras.main.setBounds(
          0,
          cy,
          map.widthInPixels,
          map.heightInPixels
        );
      }
    } else {
      if (map.heightInPixels > this.sys.game.config.height) {
        this.cameras.main.setBounds(
          cx,
          0,
          map.widthInPixels,
          map.heightInPixels
        );
      } else {
        this.cameras.main.setBounds(
          cx,
          cy,
          map.widthInPixels,
          map.heightInPixels
        );
      }
    }

    this.cameras.main.roundPixels = true;

    this.cameras.main.scrollX = cx;
    this.cameras.main.scrollY = cy;

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
      callback: this.updateState,
      callbackScope: this,
      loop: true,
    });
  }

  updateState() {
    console.log("Update...");
    [this.pet.x, this.pet.y] = this.getValidPositionPet(this.pet.x, this.pet.y);

    this.pet.sprite.x = tileToWorld(this.pet.x);
    this.pet.sprite.y = tileToWorld(this.pet.y);

    this.wolf.x -= tileSize;
  }

  getValidPositionPet(x, y) {
    const maxAttempts = 20; // Защитный лимит
    let attempts = 0;
    let newX, newY;
    let isValid = false;

    while (!isValid && attempts < maxAttempts) {
      [newX, newY] = this.calculateSmartStep(x, y);

      isValid =
        newX >= 0 && newX < mapWidthTile && newY >= 0 && newY < mapHeightTile;
      // + доп. проверки (например, нет ли там лавы)

      attempts++;
    }

    return isValid ? [newX, newY] : [x, y]; // Возвращаем текущие, если не нашли валидные
  }

  calculateSmartStep(x, y) {
    // Здесь сложная логика:
    // - Погода влияет на направление
    // - Характер питомца (осторожный/любопытный)
    // - Бонусы от предметов
    // - Угрозы (волки, ловушки)

    let dx = 0;
    let dy = 0;

    dx = Phaser.Math.Between(-1, 1);
    dy = Phaser.Math.Between(-1, 1);

    return [x + dx, y + dy];
  }
}
