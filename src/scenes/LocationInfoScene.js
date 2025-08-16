console.log("start LocationInfoScene");
import { W2, H2, H4, wb, hb } from "../constants.js";
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
    const title = this.add
      .text(W2, H4, `Локация: ${ListLoc[this.locationId].name}`, {
        fontSize: "24px",
        fontFamily: "Arial",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

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
