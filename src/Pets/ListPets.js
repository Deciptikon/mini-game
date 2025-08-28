import { TA } from "../Map/TileInfo.js";

export const savePetsPrefix = "pet";
export const SavePetsData = {
  level: 1, //        уровень
  experience: 0, //   опыт
  unlocked: false, //  питомец разблокирован

  countOfloc: 0, //   количество пройденных локаций
  timeInLoc: 0, //    количество секунд в игре
  countOfDeath: 0, // количество смертей
};

export const STATS = {
  hp: { name: "Жизнь", icon: "❤️" },
  guard: { name: "Защита", icon: "🛡️" },
  invisible: { name: "Незаметность", icon: "👤" },
  speed: { name: "Скорость", icon: "🌪️" },
  caution: { name: "Осторожность", icon: "👀" },
  dodge: { name: "Уклонение", icon: "🌀" },
  morale: { name: "Мораль", icon: "⚖️" },
};

// разблокировка слотов инвенторя и абилок в зависимости от уровня прокачки
export const LVL_UNLOCKED = {
  0: 0,
  ability1: 3,
  1: 6,
  2: 9,
  ability2: 12,
  3: 15,
  4: 18,
  ability3: 21,
  5: 24,
};

export const ListPets = {
  cat: {
    stats: {
      hp: 4, //         жизнь
      guard: 4, //      защита
      invisible: 6, //  незаметность
      speed: 6, //      скорость
      caution: 6, //    осторожность
      dodge: 5, //      уклонение
      morale: 6, //     мораль
    },
    probs: {
      [TA.STEPPES]: 100,
      [TA.DESERTS]: 50,
      [TA.SEAS]: 10,
      [TA.MOUNTAINS]: 30,
      [TA.FORESTS]: 100,
      [TA.SWAMPS]: 10,
      [TA.TUNDRA]: 20,
      [TA.BADLANDS]: 5,
      [TA.SNOW]: 20,
      [TA.ICE]: 10,
      [TA.LAVA]: 2,
      [TA.CITIES]: 40,
    },
    image: "./assets/cat.png",
    icon: "./src/Pets/icon/cat.png",

    init: function (pet) {
      pet.selfCounter = 0;
      pet.lastTile = null;
    },
    step: function (pet, current = null) {
      pet.selfCounter++;
      pet.experience += 0.7;
      if ([TA.SEAS, TA.LAVA].includes(current.tile)) {
        if ([TA.SEAS, TA.LAVA].includes(pet.lastTile)) {
          pet.stats.hp = 0;
          pet.emojiStatus = "-❤️❤️❤️...";
          console.log(`hp = ${pet.stats.hp}`);
          return;
        }
        pet.stats.hp--;
        pet.experience += 0.7;
        pet.emojiStatus = "-1❤️";
      }
      pet.lastTile = current.tile;
      console.log(`hp = ${pet.stats.hp}`);
    },
  },
  dog: {
    stats: {
      hp: 8, // жизнь
      guard: 4, // защита
      invisible: 3, // незаметность
      speed: 6, // скорость
      caution: 3, // осторожность
      dodge: 3, // уклонение
      morale: 6,
    },
    probs: {
      [TA.STEPPES]: 100,
      [TA.DESERTS]: 20,
      [TA.SEAS]: 15,
      [TA.MOUNTAINS]: 30,
      [TA.FORESTS]: 100,
      [TA.SWAMPS]: 10,
      [TA.TUNDRA]: 20,
      [TA.BADLANDS]: 5,
      [TA.SNOW]: 40,
      [TA.ICE]: 15,
      [TA.LAVA]: 5,
      [TA.CITIES]: 50,
    },
    image: "./assets/dog.png",
    icon: "./src/Pets/icon/dog.png",
    step: function (pet, current = null) {
      //можно добавить счетчики и условия
    },
  },
  bird: {
    stats: {
      hp: 2, // жизнь
      guard: 1, // защита
      invisible: 9, // незаметность
      speed: 8, // скорость
      caution: 8, // осторожность
      dodge: 5, // уклонение
      morale: 6,
    },
    probs: {
      [TA.STEPPES]: 50,
      [TA.DESERTS]: 20,
      [TA.SEAS]: 20,
      [TA.MOUNTAINS]: 30,
      [TA.FORESTS]: 100,
      [TA.SWAMPS]: 20,
      [TA.TUNDRA]: 20,
      [TA.BADLANDS]: 20,
      [TA.SNOW]: 20,
      [TA.ICE]: 20,
      [TA.LAVA]: 20,
      [TA.CITIES]: 100,
    },
    image: "./assets/bird.png",
    icon: "./src/Pets/icon/bird.png",
    step: function (pet, current = null) {
      //можно добавить счетчики и условия
    },
  },
  hedgehog: {
    stats: {
      hp: 5, // жизнь
      guard: 9, // защита
      invisible: 1, // незаметность
      speed: 3, // скорость
      caution: 4, // осторожность
      dodge: 3, // уклонение
      morale: 6,
    },
    probs: {
      [TA.STEPPES]: 100,
      [TA.DESERTS]: 20,
      [TA.SEAS]: 10,
      [TA.MOUNTAINS]: 20,
      [TA.FORESTS]: 100,
      [TA.SWAMPS]: 10,
      [TA.TUNDRA]: 20,
      [TA.BADLANDS]: 5,
      [TA.SNOW]: 10,
      [TA.ICE]: 10,
      [TA.LAVA]: 2,
      [TA.CITIES]: 40,
    },
    image: "./assets/hedgehog.png",
    icon: "./src/Pets/icon/hedgehog.png",
    step: function (pet, current = null) {
      //можно добавить счетчики и условия
    },
  },
};
