import { OBL } from "../constants.js";
import { tileToWorld } from "./functions.js";

export default class ProbsGreed extends Phaser.GameObjects.Container {
  constructor(scene, pet) {
    // Вызываем конструктор родительского класса
    super(scene, tileToWorld(pet.x), tileToWorld(pet.y));

    this.pet = pet;

    this.labels = [];
    for (const i in OBL) {
      console.log(i);
      console.log(OBL[i]);

      const label = scene.add
        .text(0, 0, "0", {
          fontSize: "25px",
          color: "#ffffffff",
          fontFamily: "Arial",
          stroke: "#000000",
          strokeThickness: 2,
        })
        .setOrigin(0.5);
      label.x = tileToWorld(OBL[i].x - 0.5);
      label.y = tileToWorld(OBL[i].y - 0.5);

      this.labels.push(label);
      this.add(label);
    }

    // Добавляем контейнер на сцену
    scene.add.existing(this);
  }

  doStep() {
    const prob = this.pet.prob;
    let s = 0;
    prob.forEach((p) => {
      s += p;
    });

    if (s === 0) s = 1;

    for (const i in OBL) {
      const label = this.labels[i];

      label.setText(`${Math.floor((prob[i] * 1000) / s) / 10}`);
    }
    this.setPosition(tileToWorld(this.pet.x), tileToWorld(this.pet.y));
  }

  // Опционально: метод для обновления позиции, если pet двигается
  updatePosition() {
    this.setPosition(tileToWorld(this.pet.x), tileToWorld(this.pet.y));
  }
}
