export default class GameState {
  constructor() {
    this.settings = {
      sound: true,
      music: true,
      difficulty: "normal",
    };

    this.pet = {
      type: "cat",
      stats: {},
      level: 1,
      experience: 0,
    };

    this.inventory = {
      coins: 100,
      items: ["food_basic", "toy_ball"],
    };

    this.currentLocation = "lake";
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
