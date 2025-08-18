import { getLocality, rndL, tileToWorld } from "../components/functions.js";
import { dK, OBL } from "../constants.js";
import { TA, TileInfo } from "../Map/TileInfo.js";

export class Pet {
  constructor(pet, spritePet, map, x, y) {
    this.pet = pet;
    this.map = map;
    this.prob = [0, 0, 0, 0, 0, 0, 0, 0];
    this.sprite = spritePet;
    this.mapWidth = map[0].length;
    this.mapHeight = map.length;
    this.x = x;
    this.y = y;
  }

  update() {
    if (this.sprite === null) {
      return;
    }

    const dx = tileToWorld(this.x) - this.sprite.x;
    const dy = tileToWorld(this.y) - this.sprite.y;

    this.sprite.x += dx * dK;

    this.sprite.y += dy * dK;
  }

  create() {
    //
  }

  probFromLocality() {
    const loc = getLocality(this.map, this.x, this.y);
    for (let i = 0; i < loc.length; i++) {
      const t = loc[i];
      if (t < 0) {
        this.prob[i] = 0;
        continue;
      }
      this.prob[i] = 1;
      for (const type of TileInfo[t].types) {
        const TYPE = `${type}`.toUpperCase();
        if (TA.hasOwnProperty(TYPE)) {
          this.prob[i] = this.pet.probs[TA[TYPE]];
        }
      }
    }
  }

  probFromPredators() {
    //
  }

  probFromWeather() {
    //
  }

  doStep() {
    this.probFromLocality();

    let isValid = false;
    const r = rndL(this.prob);

    const newX = this.x + OBL[r].x;
    const newY = this.y + OBL[r].y;
    isValid =
      newX >= 0 && newX < this.mapWidth && newY >= 0 && newY < this.mapHeight;

    if (isValid) {
      this.x = newX;
      this.y = newY;
    } else {
      console.log(`not valid. newX=${newX} | newY=${newY}`);
      console.log(`prob = ${this.prob}`);
    }

    //
    this.prob = [0, 0, 0, 0, 0, 0, 0, 0];
  }
}
