console.log("start");
import { W, H } from "./constants.js";

import SplashScene from "./scenes/SplashScene.js";
import MenuScene from "./scenes/MenuScene.js";
import PetScene from "./scenes/PetScene.js";
import PetsScene from "./scenes/PetsScene.js";
import MapScene from "./scenes/MapScene.js";
import AchievementsScene from "./scenes/AchievementsScene.js";
import HouseScene from "./scenes/HouseScene.js";
import LocationInfoScene from "./scenes/LocationInfoScene.js";

import GameState from "./GameState.js";

export const gameState = new GameState();
gameState.loadFromLocalStorage();

const config = {
  type: Phaser.CANVAS,
  width: W,
  height: H,
  scene: [
    SplashScene,
    MenuScene,
    PetsScene,
    PetScene,
    MapScene,
    AchievementsScene,
    HouseScene,
    LocationInfoScene,
  ],
  backgroundColor: "#9bd6ff",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game-container",
  },
};

const game = new Phaser.Game(config);

game.registry.set("gameState", gameState);

window.addEventListener("beforeunload", () => {
  gameState.saveToLocalStorage();
});
