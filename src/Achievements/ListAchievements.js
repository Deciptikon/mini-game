export const saveAchiePrefix = "achie";
export const SaveAchieData = {
  unlocked: false,
  count: 0,
};

export const ListAchievements = {
  handOfGods: {
    name: "Рука Богов",
    description: "Вы достигли истинного совершенства.",
    icon: "./src/Achievements/handOfGods.png",
    condition: "",
    reward: "",

    // функция обновления состояния
    updateState: function (GameState = null, pet = null) {
      console.log("update Achievement handOfGods");
    },
  },
  strongestWarrior: {
    name: "Сильнейший воин",
    description: "Опасности закаляют вас",
    icon: "./src/Achievements/strongestWarrior.png",
    condition: "",
    reward: "",

    // функция обновления состояния
    updateState: function (GameState = null, pet = null) {
      console.log("update Achievement strongestWarrior");
    },
  },
};
