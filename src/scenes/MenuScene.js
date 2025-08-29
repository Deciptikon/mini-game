console.log("start menu");
import { W2, H2, H4, wb, hb, isMobile, W, H, bigText } from "../constants.js";
import Button from "../components/Button.js";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create() {
    const title = this.add
      .text(W2, H4, "XPets", {
        fontSize: "48px",
        fontFamily: "Arial",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    if (!isMobile) {
      const fullscreenButton = new Button(
        this,
        W - 50,
        50,
        this.scale.isFullscreen ? "[=]" : "[ ]",
        () => {
          if (this.scale.isFullscreen) {
            this.scale.stopFullscreen();
            fullscreenButton.setText("[ ]");
          } else {
            this.scale.startFullscreen();
            fullscreenButton.setText("[=]");
          }
        },
        {
          color: 0xaf4c50,
          width: 50,
          height: 50,
        }
      );
    }

    const s = hb / 4;
    const x = W2;
    let y = H2;

    const petsButton = new Button(
      this,
      x,
      y,
      "Персонажи",
      () => {
        this.scene.start("PetsScene");
      },
      {
        color: 0x4caf50,
        width: wb,
        height: hb,
      }
    );

    y += hb + s;
    const houseButton = new Button(
      this,
      x,
      y,
      "Дом",
      () => {
        this.scene.start("HouseScene");
      },
      {
        color: 0x4caf50,
        width: wb,
        height: hb,
      }
    );

    y += hb + s;
    const mapButton = new Button(
      this,
      x,
      y,
      "Карта",
      () => {
        this.scene.start("MapScene");
      },
      {
        color: 0x4caf50,
        width: wb,
        height: hb,
      }
    );

    y += hb + s;
    const achievementsButton = new Button(
      this,
      x,
      y,
      "Достижения",
      () => {
        this.scene.start("AchievementsScene");
      },
      {
        color: 0x4caf50,
        width: wb,
        height: hb,
      }
    );

    y += hb + s;
    const settingsButton = new Button(
      this,
      x,
      y,
      "Настройки",
      () => {
        this.scene.start("SettingsScene");
      },
      {
        color: 0x4caf50,
        width: wb,
        height: hb,
      }
    );

    // Кнопка показа README
    const infoButton = new Button(
      this,
      W - 50,
      H - 50,
      "?",
      () => {
        this.scene.start("InfoScene");
      },
      {
        color: 0xea7026,
        width: 50,
        height: 50,
      }
    );
  }
}
