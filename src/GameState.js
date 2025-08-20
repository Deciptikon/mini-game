import { GAME_NAME } from "./constants.js";
import {
  ListItems,
  SaveItemsData,
  saveItemsPrefix,
} from "./Items/ListItems.js";
import { ListLoc, SaveLocsData, saveLocsPrefix } from "./Map/ListLoc.js";
import { ListPets, SavePetsData, savePetsPrefix } from "./Pets/ListPets.js";
import { SaveSetingsData, saveSetingsPrefix } from "./Settings.js";

export default class GameState {
  constructor() {
    // текущая локация
    this.currentLocation = "forest";
    // текущий питомец
    this.currentPet = "cat";

    // отображаемый питомец (с модификациями от предметов и скиллов)
    this.pet = {
      type: "cat",

      // неизменные данные, но модифицируемые в каждой локации
      stats: {}, // статы
      probs: {}, // вероятности наступить на ячейку

      // изменяемые (нужно сохранять)
      inventory: [], // список найденных предметов на локации
      level: 1, //      уровень
      experience: 0, // опыт

      // заполняемые
      items: [], //     список надетых предметов
    };

    // конструируем локацию, с учетом модификации предметами
    this.location = {
      //
    };

    // хранимые/загружаемые данные---------------------------------------------
    this.data = {
      // игровые ресурсы
      resources: {
        coins: 100,
        crystall: 7,
        recepts: 2,
      },

      // статистика по всем питомцам
      pets: {
        cat: {
          level: 1, //        уровень
          experience: 0, //   опыт
          unlocked: true, //  питомец разблокирован

          countOfloc: 0, //   количество пройденных локаций
          timeInLoc: 0, //    количество секунд в игре
          countOfDeath: 0, // количество смертей
          //
        },
        dog: {
          //
        },
        //
      },

      // Статистика по всем предметам
      items: {
        eyeOfStorm: {
          unlocked: true,
          place: "none", // 'PET.CAT'  ||  'PET.DOG'  || ....
          slot: 2, // слот в инвентаре питомца

          countOfLoc: 0, // количество завершенных миссий с этим предметом
        },
        walnut: {},
        //
      },

      // статистика по локациям
      locations: {
        forest: {
          unlocken: true,
          discoveredLevel: 0, // всего 7 уровней (0-6)

          countOfGame: 0, // количество игр на локации
        },
        lake: {},
        //
      },

      // игровые достижения (качественные и количественные)
      achievements: {
        handOfGods: { unlocked: false, count: 0 },
        strongestWarrior: {},
        //....
      },

      settings: {
        sound: true,
        music: true,
      },
    };
  }

  load() {
    this.loadFromLocalStorage();
  }

  save() {
    this.saveToLocalStorage();
  }

  loadFromLocalStorage() {
    //здесь настройки
    //this.loadFrom(this.data.settings, ListSetings, SaveSetingsData, saveSetingsPrefix);
    this.loadElement(this.data.settings, SaveSetingsData, saveSetingsPrefix);

    this.loadFrom(this.data.pets, ListPets, SavePetsData, savePetsPrefix);
    this.loadFrom(this.data.items, ListItems, SaveItemsData, saveItemsPrefix);
    this.loadFrom(this.data.locations, ListLoc, SaveLocsData, saveLocsPrefix);

    //ещё ачивки
  }

  saveToLocalStorage() {
    this.saveTo(this.data.pets, ListPets, savePetsPrefix);
    this.saveTo(this.data.items, ListItems, saveItemsPrefix);
    this.saveTo(this.data.locations, ListLoc, saveLocsPrefix);
  }

  loadElement(position, shablon, prefix, type = "") {
    const element = localStorage.getItem(`${GAME_NAME}_${prefix}_${type}`);
    if (element !== null && element !== undefined && element !== "undefined") {
      position[type] = JSON.parse(element);
    } else {
      position[type] = {};
    }

    for (const key in shablon) {
      if (position[type]?.[key] === undefined) {
        position[type][key] = shablon[key];
      }
    }
  }

  loadFrom(position, config, shablon, prefix) {
    for (const type in config) {
      this.loadElement(position, shablon, prefix, type);
    }
  }

  saveTo(position, config, prefix) {
    for (const type in config) {
      localStorage.setItem(
        `${GAME_NAME}_${prefix}_${type}`,
        JSON.stringify(position[type])
      );
    }
  }

  allSaveToLocalStorage() {
    localStorage.setItem("XPetsGameState", JSON.stringify(this.data));
  }

  allLoadFromLocalStorage() {
    const data = localStorage.getItem("XPetsGameState");
    if (data) {
      this.data = JSON.parse(data);
    }
  }

  addExperience(amount) {
    this.pet.experience += amount;
    if (this.pet.experience >= this.getRequiredExp()) {
      this.pet.level++;
      this.pet.experience = 0;
      return true; // Level up!
    }
    return false;
  }

  getRequiredExp() {
    return this.pet.level * 100;
  }
}
