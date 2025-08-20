console.log("start");
import { W, H } from "./constants.js";

import GameState from "./GameState.js";

import SplashScene from "./scenes/SplashScene.js";
import MenuScene from "./scenes/MenuScene.js";
import PetScene from "./scenes/PetScene.js";
import PetsScene from "./scenes/PetsScene.js";
import MapScene from "./scenes/MapScene.js";
import AchievementsScene from "./scenes/AchievementsScene.js";
import HouseScene from "./scenes/HouseScene.js";
import LocationInfoScene from "./scenes/LocationInfoScene.js";
import LocationScene from "./scenes/LocationScene.js";
import SettingsScene from "./scenes/SettingsScene.js";
import InventoryScene from "./scenes/InventoryScene.js";

export const gameState = new GameState();
gameState.load();
gameState.data.pets.cat.unlocked = true;
gameState.data.locations.forest.unlocked = true;

gameState.data.items.walnut.unlocked = true;
gameState.data.items.walnut.place = "cat";

console.log(gameState.data);

const config = {
  type: Phaser.CANVAS,
  width: W, // Вертикальный макет для мобилок / альбомный для ПК
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
    LocationScene,
    SettingsScene,
    InventoryScene,
  ],
  backgroundColor: "#9bd6ff",
  scale: {
    mode: Phaser.Scale.FIT, //Phaser.Scale.ENVELOP
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game-container",
    backgroundColor: "#9bd6ff",
  },
};

const game = new Phaser.Game(config);

game.registry.set("gameState", gameState);

window.addEventListener("beforeunload", () => {
  gameState.save();
});
