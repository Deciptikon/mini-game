import { W, H } from "./constants.js";
import MenuScene from "./scenes/MenuScene.js";
import PetScene from "./scenes/PetScene.js";
import GameState from "./GameState.js";

export const gameState = new GameState();
gameState.loadFromLocalStorage();

const config = {
  type: Phaser.CANVAS,
  width: W,
  height: H,
  scene: [MenuScene, PetScene],
  backgroundColor: "#9bd6ff",
};

const game = new Phaser.Game(config);

game.registry.set("gameState", gameState);

window.addEventListener("beforeunload", () => {
  gameState.saveToLocalStorage();
});
