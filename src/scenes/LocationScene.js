console.log("start LocationScene");
import {
  tileSize,
  mapUpdateTimeOut,
  tileCount,
  mapHeightTile,
  mapWidthTile,
  OBL,
  dK,
  sizeOfInventory,
} from "../constants.js";

import { ListLoc } from "../Map/ListLoc.js";
import Button from "../components/Button.js";
import {
  createButtonBack,
  generateLMatrix,
  generateRandomMatrix,
  rndInt,
  rndL,
  tileToWorld,
  getLocality,
} from "../components/functions.js";
import { TA, TileInfo } from "../Map/TileInfo.js";
import { Pet, fullUpdateStats } from "../Pets/Pet.js";
import { ListPets } from "../Pets/ListPets.js";
import { ListItems } from "../Items/ListItems.js";

export default class LocationScene extends Phaser.Scene {
  constructor() {
    super({ key: "LocationScene" });
    this.locationId = null;
    this.timeOut = 1000;
  }

  init(data) {
    //
  }

  create() {
    this.gameState = this.game.registry.get("gameState");
    this.locationId = this.gameState.currentLocation;

    /**
 * 

    this.pet = this.gameState.pet;
    this.pet.x = 3;
    this.pet.y = 5; */

    // Матрица карты
    this.mapMatrix = generateLMatrix(
      mapHeightTile,
      mapWidthTile,
      [10, 1, 5, 1]
    );

    //console.log(mapMatrix);

    /** 
    this.mapMatrix = generateRandomMatrix(
      mapHeightTile,
      mapWidthTile,
      tileCount
    );
    
    this.mapMatrix = [
      [0, 0, 1, 0],
      [1, 1, 0, 2],
      [2, 0, 1, 1],
      [2, 3, 3, 0],
    ];*/

    const map = this.make.tilemap({
      tileWidth: tileSize,
      tileHeight: tileSize,
      width: this.mapMatrix[0].length, // ширина в тайлах
      height: this.mapMatrix.length, // высота в тайлах
    });

    const tileset = map.addTilesetImage("tileset", null, tileSize, tileSize);

    const layer = map.createBlankLayer("mainLayer", tileset);

    this.mapMatrix.forEach((row, y) => {
      row.forEach((tileId, x) => {
        layer.putTileAt(tileId, x, y); // tileId соответствует порядку в тайлсете
      });
    });

    this.entitiesContainer = this.add.container(0, 0);
    this.petContainer = this.add.container(0, 0);

    this.wolf = this.add
      .sprite(tileToWorld(7), tileToWorld(7), `image_${"dog"}`)
      .setScale(0.1)
      .setOrigin(0.5);
    this.entitiesContainer.add(this.wolf);

    // Создание питомца

    const pet_sprite = this.add
      .sprite(
        tileToWorld(5),
        tileToWorld(3),
        `image_${this.gameState.currentPet}`
      )
      .setScale(0.1)
      .setOrigin(0.5);

    this.gameState.pet = fullUpdateStats(
      this.gameState,
      this.gameState.currentPet
    );

    console.log(this.gameState.pet);
    this.pet = new Pet(this.gameState.pet, pet_sprite, this.mapMatrix, 5, 3);
    this.petContainer.add(this.pet.sprite);

    // Настройка камеры
    const cx = (map.widthInPixels - this.sys.game.config.width) / 2;
    const cy = (map.heightInPixels - this.sys.game.config.height) / 2;
    const mw = map.widthInPixels;
    const mh = map.heightInPixels;
    const gw = this.sys.game.config.width;
    const gh = this.sys.game.config.height;

    this.cameras.main.setBounds(mw > gw ? 0 : cx, mh > gh ? 0 : cy, mw, mh);

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

    this.timeOut = 3000 - 2500 * (this.gameState.pet.stats.speed / 10);
    /** */
    this.petUpdateTimer = this.time.addEvent({
      delay: this.timeOut,
      callback: this.petStep,
      callbackScope: this,
      loop: true,
    });

    this.predatorUpdateTimer = this.time.addEvent({
      delay: 1500,
      callback: this.predatorStep,
      callbackScope: this,
      loop: true,
    });
  }

  petStep() {
    this.pet.doStep();
  }

  predatorStep() {
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

    const loc = getLocality(this.mapMatrix, x, y);

    let prob = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < loc.length; i++) {
      const t = loc[i];
      prob[i] = 1;
      if (TileInfo[t].types.includes(TA.WATER)) {
        prob[i] = 0; // боится воды
      }
      if (TileInfo[t].types.includes(TA.MOUNTAINE)) {
        prob[i] = 5; // любит горы
      }
    }

    const r = rndL(prob);

    return [x + OBL[r].x, y + OBL[r].y];
  }

  update() {
    //console.log("upd");
    /**
    const dx = tileToWorld(this.pet.x) - this.pet.sprite.x;
    const dy = tileToWorld(this.pet.y) - this.pet.sprite.y;

    this.pet.sprite.x += dx * dK;

    this.pet.sprite.y += dy * dK;*/
    this.pet.update();
  }
}
