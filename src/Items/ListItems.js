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
    callback: function (pet) {
      console.log(`callback 1`);
      console.log(`callback 1 | ${pet.stats.hp}`);
    },
    modifyStats: function (pet) {
      console.log(`modifyStats`);
      pet.stats.hp = 8;
      pet.stats.guard = 0;
    },
  },
  leadBullet: {
    name: "Свинцовая пуля",
    description: "Эта пуля была незаметна пока её не нашли",
    descriptionEffect: "Незаметность = 8. Скорость = 1",
    image: "./src/Items/img/leadBullet.png",
    icon: "./src/Items/icon/leadBullet.png",
    callback: function (pet) {
      console.log(`callback 2`);
      console.log(`callback 2 | ${pet.stats?.invisible}`);
    },
  },
  eyeOfStorm: {
    name: "Глаз бури",
    description: "-",
    descriptionEffect: "Мораль в бурях и метелях всегда > 3",
    image: "./src/Items/img/eyeOfStorm.png",
    icon: "./src/Items/icon/eyeOfStorm.png",
    callback: function (pet) {
      console.log(`callback 3`);
      console.log(`callback 3 | ${pet.stats?.morale}`);
    },
  },
};
