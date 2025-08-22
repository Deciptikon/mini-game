import {
  ListAchievements,
  SaveAchieData,
  saveAchiePrefix,
} from "./Achievements/ListAchievements.js";
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
      pets: {},

      // Статистика по всем предметам
      items: {},

      // статистика по локациям
      locations: {},

      // игровые достижения (качественные и количественные)
      achievements: {},

      settings: {},
    };
  }

  load() {
    this.loadFromLocalStorage();
  }

  save() {
    this.saveToLocalStorage();
  }

  loadFromLocalStorage() {
    this.loadSettings();
    this.loadPets();
    this.loadItems();
    this.loadLocations();
    this.loadAchievements();
  }

  saveToLocalStorage() {
    this.saveSettings();
    this.savePets();
    this.saveItems();
    this.saveLocations();
    this.saveAchievements();
  }

  loadElement(shablon, prefix, type = "") {
    let position = {};

    const element = localStorage.getItem(`${GAME_NAME}_${prefix}_${type}`);
    if (element !== null && element !== undefined && element !== "undefined") {
      position = JSON.parse(element);
    }

    for (const key in shablon) {
      if (position?.[key] === undefined) {
        position[key] = shablon[key];
      }
    }

    return position;
  }

  saveElement(position, prefix, type = "") {
    console.log(`${GAME_NAME}_${prefix}_${type}`);

    if (type !== "") {
      localStorage.setItem(
        `${GAME_NAME}_${prefix}_${type}`,
        JSON.stringify(position[type])
      );
    } else {
      localStorage.setItem(
        `${GAME_NAME}_${prefix}_${type}`,
        JSON.stringify(position)
      );
    }
  }

  loadFrom(config, shablon, prefix) {
    const position = {};
    for (const type in config) {
      position[type] = this.loadElement(shablon, prefix, type);
    }
    return position;
  }

  saveTo(position, config, prefix) {
    for (const type in config) {
      this.saveElement(position, prefix, type);
    }
  }

  loadSettings() {
    this.data.settings = this.loadElement(SaveSetingsData, saveSetingsPrefix);
  }

  saveSettings() {
    this.saveElement(this.data.settings, saveSetingsPrefix);
  }

  loadPets() {
    this.data.pets = this.loadFrom(ListPets, SavePetsData, savePetsPrefix);
  }

  loadPet(key) {
    return this.loadElement(SaveSetingsData, saveSetingsPrefix, key);
  }

  savePet(key) {
    this.saveElement(this.data.pets, savePetsPrefix, key);
  }

  savePets() {
    this.saveTo(this.data.pets, ListPets, savePetsPrefix);
  }

  loadItems() {
    this.data.items = this.loadFrom(ListItems, SaveItemsData, saveItemsPrefix);
  }

  saveItem(key) {
    this.saveElement(this.data.items, saveItemsPrefix, key);
  }

  saveItems() {
    this.saveTo(this.data.items, ListItems, saveItemsPrefix);
  }

  loadLocations() {
    this.data.locations = this.loadFrom(ListLoc, SaveLocsData, saveLocsPrefix);
  }

  saveLoc(key) {
    this.saveElement(this.data.locations, saveLocsPrefix, key);
  }

  saveLocations() {
    this.saveTo(this.data.locations, ListLoc, saveLocsPrefix);
  }

  loadAchievements() {
    this.data.achievements = this.loadFrom(
      ListAchievements,
      SaveAchieData,
      saveAchiePrefix
    );
  }

  saveAchie(key) {
    this.saveElement(this.data.achievements, saveAchiePrefix, key);
  }

  saveAchievements() {
    this.saveTo(this.data.achievements, ListAchievements, saveAchiePrefix);
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
