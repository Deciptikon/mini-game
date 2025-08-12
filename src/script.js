import { W2, H2 } from "./constants.js";
import MenuScene from "./scenes/MenuScene.js";
import PetScene from "./scenes/PetScene.js";

const config = {
  type: Phaser.CANVAS,
  width: 2 * W2,
  height: 2 * H2,
  scene: [MenuScene, PetScene],
  backgroundColor: "#9bd6ff",
};

const game = new Phaser.Game(config);
