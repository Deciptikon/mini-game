console.log("start SettingsScene");
import { W2, H2, H4, wb, hb, bigText, W } from "../constants.js";
import Button from "../components/Button.js";
import { createButtonBack } from "../components/functions.js";

export default class SettingsScene extends Phaser.Scene {
  constructor() {
    super({ key: "SettingsScene" });
  }

  create() {
    this.gameState = this.game.registry.get("gameState");
    this.gameState.loadSettings();

    const colorA = 0x4caf50;
    const colorB = 0xaf4c50;

    const wb = 250;
    const hb = 50;
    const s = 70;
    const x = W2;
    let y = H2;

    const title = this.add.text(W2, H4, "Настройки", bigText).setOrigin(0.5);

    const soundButton = new Button(
      this,
      x,
      y,
      this.gameState.data.settings.sound ? "Выключить звуки" : "Включить звуки",
      () => {
        this.gameState.data.settings.sound =
          !this.gameState.data.settings.sound;
        soundButton.setColor(
          this.gameState.data.settings.sound ? colorB : colorA
        );
        soundButton.setText(
          this.gameState.data.settings.sound
            ? "Выключить звуки"
            : "Включить звуки"
        );

        this.gameState.saveSettings();
      },
      {
        color: this.gameState.data.settings.sound ? colorB : colorA,
        width: wb,
        height: hb,
      }
    );

    y += s;
    const musicButton = new Button(
      this,
      x,
      y,
      this.gameState.data.settings.music
        ? "Выключить музыку"
        : "Включить музыку",
      () => {
        this.gameState.data.settings.music =
          !this.gameState.data.settings.music;
        musicButton.setColor(
          this.gameState.data.settings.music ? colorB : colorA
        );
        musicButton.setText(
          this.gameState.data.settings.music
            ? "Выключить музыку"
            : "Включить музыку"
        );

        this.gameState.saveSettings();
      },
      {
        color: this.gameState.data.settings.music ? colorB : colorA,
        width: wb,
        height: hb,
      }
    );

    // Кнопка возврата в меню
    createButtonBack(this);
  }
}
