export default class GameState {
  constructor() {
    this.settings = {
      sound: true,
      music: true,
      difficulty: "normal",
    };

    this.pet = {
      type: "cat",
      stats: {
        food: 7,
        mood: 5,
        energy: 6,
      },
      level: 1,
      experience: 0,
    };

    this.inventory = {
      coins: 100,
      items: ["food_basic", "toy_ball"],
    };

    this.locations = {
      id: "forest",
      name: "Тайный лес",
      position: { x: 300, y: 200 },
      type: "forest",
      discovered: true,
      sprite: "./loc_sprite.png",
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
