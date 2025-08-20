console.log("start LocationInfoScene");
import {
  H,
  W2,
  H2,
  H4,
  wb,
  hb,
  middleText,
  smallText,
  bigText,
  W,
} from "../constants.js";
import { ListLoc } from "../Map/ListLoc.js";
import Button from "../components/Button.js";
import { createButtonBack } from "../components/functions.js";

export default class LocationInfoScene extends Phaser.Scene {
  constructor() {
    super({ key: "LocationInfoScene" });
    this.locationId = null;
  }

  init(data) {
    this.locationId = data.locationId;
  }

  create() {
    this.gameState = this.game.registry.get("gameState");

    const title = this.add
      .text(W2, H4, `Локация: ${ListLoc[this.locationId].name}`, bigText)
      .setOrigin(0.5);

    const description = this.add
      .text(W2, H * 0.35, `${ListLoc[this.locationId].description}`, middleText)
      .setOrigin(0.5)
      .setWordWrapWidth(W * 0.9);

    createButtonBack(this, "MapScene");

    new Button(
      this,
      W2,
      H2,
      "GO",
      () => {
        this.scene.start("LocationScene");
      },
      {
        color: 0x4caf50,
        width: wb,
        height: hb,
      }
    );
  }
}
