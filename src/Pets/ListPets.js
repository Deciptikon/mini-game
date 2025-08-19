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

export const ListPets = {
  cat: {
    stats: {
      hp: 4, // жизнь
      guard: 4, // защита
      invisible: 6, // незаметность
      speed: 6, // скорость
      caution: 6, // осторожность
      dodge: 5, // уклонение
      // добавить Мораль
    },
    probs: {
      [TA.WATER]: 0,
      [TA.MOUNTAINE]: 1,
      [TA.SAND]: 1,
      [TA.GRASS]: 3,
    },
    image: "./assets/cat.png",
  },
  dog: {
    stats: {
      hp: 8, // жизнь
      guard: 4, // защита
      invisible: 3, // незаметность
      speed: 6, // скорость
      caution: 3, // осторожность
      dodge: 3, // уклонение
    },
    probs: {
      [TA.WATER]: 0,
      [TA.MOUNTAINE]: 2,
      [TA.SAND]: 1,
      [TA.GRASS]: 4,
    },
    image: "./assets/dog.png",
  },
  bird: {
    stats: {
      hp: 2, // жизнь
      guard: 1, // защита
      invisible: 9, // незаметность
      speed: 8, // скорость
      caution: 8, // осторожность
      dodge: 5, // уклонение
    },
    probs: {
      [TA.WATER]: 1,
      [TA.MOUNTAINE]: 3,
      [TA.SAND]: 1,
      [TA.GRASS]: 2,
    },
    image: "./assets/bird.png",
  },
  hedgehog: {
    stats: {
      hp: 5, // жизнь
      guard: 9, // защита
      invisible: 1, // незаметность
      speed: 3, // скорость
      caution: 4, // осторожность
      dodge: 3, // уклонение
    },
    probs: {
      [TA.WATER]: 0,
      [TA.MOUNTAINE]: 1,
      [TA.SAND]: 0,
      [TA.GRASS]: 2,
    },
    image: "./assets/hedgehog.png",
  },
};
