import { TA } from "../Map/TileInfo.js";

export const saveItemsPrefix = "item";
export const SaveItemsData = {
  unlocked: false,
  place: "none", // 'PET.CAT'  ||  'PET.DOG'  || ....
  slot: 0, // слот в инвентаре питомца

  countOfLoc: 0, // количество завершенных миссий с этим предметом
};

export const ListItems = {
  walnut: {
    name: "Грецкий орех",
    description:
      "Небольшой по размеру орех увеличивающий жизненную силу владельца",
    descriptionEffect: "Повышает hp до 8, уменьшает защиту до 0",
    image: "./src/Items/img/walnut.png",
    icon: "./src/Items/icon/walnut.png",

    // эта функция вызывается тоьлко в конструкторе, один раз
    modifyStats: function (pet, val = null) {
      console.log(`modifyStats`);
      pet.stats.hp = 8;
      pet.stats.guard = 0;
    },

    // эта функция будет вызываться на каждом шаге расчетов.
    updateStats: function (pet, val = null) {},
  },

  leadBullet: {
    name: "Свинцовая пуля",
    description: "Эта пуля была незаметна пока её не нашли",
    descriptionEffect: "Незаметность = 8. Скорость = 1",
    image: "./src/Items/img/leadBullet.png",
    icon: "./src/Items/icon/leadBullet.png",

    // эта функция вызывается тоьлко в конструкторе, один раз
    modifyStats: function (pet, val = null) {
      console.log(`modifyStats`);
      pet.stats.invisible = 8;
      pet.stats.speed = 1;
    },

    // эта функция будет вызываться на каждом шаге расчетов.
    updateStats: function (pet, val = null) {},
  },

  wingOfFly: {
    name: "Крыло мухи",
    description:
      "Маленькое крылышко дающее большую силу не менее большой ценой",
    descriptionEffect: "Уклонение = 9. HP = 1",
    image: "./src/Items/img/wingOfFly.png",
    icon: "./src/Items/icon/wingOfFly.png",

    // эта функция вызывается тоьлко в конструкторе, один раз
    modifyStats: function (pet, val = null) {
      console.log(`modifyStats`);
      pet.stats.dodge = 9;
      pet.stats.hp = 1;
    },

    // эта функция будет вызываться на каждом шаге расчетов.
    updateStats: function (pet, val = null) {},
  },

  lastDrop: {
    name: "Последняя капля",
    description:
      "Последняя капля самого первого дождя избегает смешивания с иной водой",
    descriptionEffect: "Вероятность наступить в воду = 0%",
    image: "./src/Items/img/lastDrop.png",
    icon: "./src/Items/icon/lastDrop.png",

    // эта функция вызывается только в конструкторе, один раз
    modifyStats: function (pet, val = null) {
      console.log(`modifyStats`);
      pet.probs[TA.SEAS] = 0;
    },

    // эта функция будет вызываться на каждом шаге расчетов.
    updateStats: function (pet, val = null) {},
  },

  chamomile: {
    name: "Ромашка",
    description: "Говорят отвар из ромашки востанавливает силы",
    descriptionEffect: "Вероятность восполнить 1HP при движении по степи = 1%",
    image: "./src/Items/img/chamomile.png",
    icon: "./src/Items/icon/chamomile.png",

    // эта функция вызывается тоьлко в конструкторе, один раз
    modifyStats: function (pet, val = null) {},

    // эта функция будет вызываться на каждом шаге расчетов.
    updateStats: function (pet, current) {
      if (
        Math.random() < 0.01 &&
        current.tile === TA.STEPPES &&
        pet.stats.hp < 10
      ) {
        pet.stats.hp++;
        pet.emojiStatus = "+1❤️";
        console.log("        +1HP");
      }
    },
  },

  eyeOfStorm: {
    name: "Глаз бури",
    description: "Маленькая ручная буря, помогающая в трудных ситуациях",
    descriptionEffect: "Мораль в бурях и метелях не падает ниже 3",
    image: "./src/Items/img/eyeOfStorm.png",
    icon: "./src/Items/icon/eyeOfStorm.png",

    // эта функция вызывается тоьлко в конструкторе, один раз
    modifyStats: function (pet, val = null) {},

    // эта функция будет вызываться на каждом шаге расчетов.
    updateStats: function (pet, val = null) {
      console.log(`updateStats`);
      if (pet.stats?.morale < 3) {
        pet.stats.morale = 3;
      }
    },
  },
};
