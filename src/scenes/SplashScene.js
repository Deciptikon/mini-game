console.log("start splash");
import { W, H, W2, H2, isMobile } from "../constants.js";
import { ListPets } from "../Pets/ListPets.js";
import { ListLoc } from "../Map/ListLoc.js";
import { ListItems } from "../Items/ListItems.js";
import { ListAchievements } from "../Achievements/ListAchievements.js";

const w = W * 0.75; // относительная длина полосы загрузки
const h = 10; // высота полосы
const y = H * 0.75; // положение по высоте

export default class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: "SplashScene" });

    // Добавляем переменную для хранения прогресс-бара
    this.progressBar = null;
  }

  preload() {
    this.createProgressBar();

    this.load.on("progress", (value) => {
      this.updateProgressBar(value);
    });

    this.load.on("complete", () => {
      //this.progressBar.destroy();
      console.log(`Loading complete`);
      this.time.delayedCall(3000, () => {
        this.scene.start("MenuScene");
      });
    });

    this.load.image("splash", "./assets/splash.png");

    this.loadFromKollection(ListPets, ["image", "icon"]);
    this.loadFromKollection(ListItems, ["image", "icon"]);
    this.loadFromKollection(ListAchievements, ["image", "icon"]);

    this.load.image("map_texture", "./src/Map/map_texture.png");
    /**for (const id in ListLoc) {
      if (ListLoc.hasOwnProperty(id)) {
        //this.load.image(`icon_loc_${id}`, ListLoc[id].icon_sprite);
      }
    }*/
    for (let i = 0; i <= 6; i++) {
      this.load.image(`loc_lvl_${i}`, `./assets/loc_lvl_${i}.png`);
    }

    this.load.image("tileset", "./src/Map/tileset3_x64.png");
  }

  loadFromKollection(kollection, list_property, prefix = "") {
    for (const key in kollection) {
      if (kollection.hasOwnProperty(key)) {
        for (let property of list_property) {
          const path = kollection[key]?.[property];
          if (path !== null && path !== undefined && path !== "undefined") {
            this.load.image(`${prefix}${property}_${key}`, path);
          }
        }
      }
    }
  }

  create() {
    this.splash = this.add.sprite(W2, H2, "splash").setScale(1).setOrigin(0.5);
  }

  // Создание элементов прогресс-бара
  createProgressBar() {
    const bg = this.add.graphics();
    bg.fillStyle(0x333333, 0.8);
    bg.fillRect((W - w) / 2, y, w, h);

    this.progressBar = this.add.graphics();
  }

  // Обновление прогресс-бара
  updateProgressBar(value) {
    //console.log(`Loading ${Math.ceil(value * 100)}%`);
    this.progressBar.clear();
    this.progressBar.fillStyle(0xfb8137, 1);
    this.progressBar.fillRect((W - w) / 2, y, w * value, h);
  }
}
