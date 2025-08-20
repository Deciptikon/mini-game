export const saveLocsPrefix = "loc";
export const SaveLocsData = {
  unlocked: false,
  level: 0, // всего 7 уровней (0-6)

  countOfGame: 0, // количество игр на локации
};

export const ListLoc = {
  forest: {
    name: "Тайный лес",
    position: { x: 500, y: 400 },
    type: "forest",
    description:
      "Полулесная локация, много лужаек, мало озёр. \nВерный способ прокачать персонажа.",

    icon: "./src/Map/icon/forest.png",
    image: "./src/Map/image/forest.png",
  },
  lake: {
    name: "Озеро слез",
    position: { x: 300, y: 200 },
    type: "water",
    description: "Водная локация, много воды...",

    icon: "./src/Map/icon/lake.png",
    image: "./src/Map/image/lake.png",
  },
  eagle_peak: {
    name: "Орлиная вершина",
    position: { x: 800, y: 100 },
    type: "mountain",
    description: "Обилие высоких гор, это основа этого мира",

    icon: "./src/Map/icon/eagle_peak.png",
    image: "./src/Map/image/eagle_peak.png",
  },
  rubikon: {
    name: "<Рубикон>",
    position: { x: 1000, y: 500 },
    type: "tower",
    description: "Древняя башня посреди забытых земель",

    icon: "./src/Map/icon/rubikon.png",
    image: "./src/Map/image/rubikon.png",
  },
  desert_of_night: {
    name: "Пустыня ночи",
    position: { x: 1500, y: 900 },
    type: "sand",
    description: "До воды нужно ещё добраться...",

    icon: "./src/Map/icon/desert_of_night.png",
    image: "./src/Map/image/desert_of_night.png",
  },
  x_island: {
    name: "Остров X",
    position: { x: 1850, y: 750 },
    type: ["forest", "mountain"],
    description:
      "Возраст: неизвестен; Размер: неизвестен; Уровень опасности: неопределёный.",

    icon: "./src/Map/icon/x_island.png",
    image: "./src/Map/image/x_island.png",
  },
};
