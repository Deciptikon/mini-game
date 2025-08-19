import AchievementsScene from "./scenes/AchievementsScene";

export default class GameState {
  constructor() {
    this.settings = {
      sound: true,
      music: true,
      difficulty: "normal",
    };

    this.pet = {
      type: "cat",

      // неизменные данные, но модифицируемые в каждой локации
      stats: {}, // статы
      prob: {}, // вероятности наступить на ячейку

      // изменяемые (нужно сохранять)
      inventory: [], // список найденных предметов на локации
      level: 1, //      уровень
      experience: 0, // опыт

      // заполняемые
      items: [], //     список надетых предметов
    };

    this.currentLocation = "lake";

    // хранимые/загружаемые данные
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
          place: "PET.NONE", // 'PET.CAT'  ||  'PET.DOG'  || ....
          slot: 2, // слот в инвентаре питомца

          countOfLoc: 0, // количество завершенных миссий с этим предметом
        },
        axe: {},
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
        handOfGods: true,
        strongWarriors: 12,
        //....
      },
    };
  }

  saveToLocalStorage() {
    localStorage.setItem("petGameState", JSON.stringify(this));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem("petGameState");
    if (data) {
      const parsed = JSON.parse(data);
      Object.assign(this, parsed);
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
