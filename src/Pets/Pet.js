import { getLocality, rndL, tileToWorld } from "../components/functions.js";
import { dK, OBL, sizeOfInventory } from "../constants.js";
import { ListItems } from "../Items/ListItems.js";
import { TA, TileInfo } from "../Map/TileInfo.js";
import { ListPets } from "./ListPets.js";

export class Pet {
  constructor(pet, spritePet, map, x, y) {
    this.pet = pet;
    this.map = map;
    this.prob = new Array(8).fill(0);
    this.sprite = spritePet;
    this.mapWidth = map[0].length;
    this.mapHeight = map.length;
    this.x = x;
    this.y = y;

    this.emojiStatus = null;
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

  init() {
    ListPets[this.pet.id].init(this.pet);
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
        //const TYPE = `${type}`.toUpperCase();
        if (TA.hasOwnProperty(type)) {
          this.prob[i] = this.pet.probs[TA[type]];
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
    if (this.pet.stats.hp <= 0 || this.pet.stats.morale <= 0) {
      return;
    }

    const tile = TileInfo[this.map[this.y][this.x]].types[0];
    const current = {
      tile: tile,
      time: "day",
      weather: "warm",
    };

    ListPets[this.pet.id].step(this.pet, current);
    if (this.pet.stats.hp <= 0 || this.pet.stats.morale <= 0) {
      return;
    }

    for (const slot of this.pet.items) {
      if (slot !== null) {
        slot.item?.updateStats(this.pet, current);
      }
    }
    if (this.pet.stats.hp <= 0 || this.pet.stats.morale <= 0) {
      return;
    }

    this.prob = new Array(8).fill(0);

    this.probFromLocality();
    this.probFromWeather();
    this.probFromPredators();

    let isValid = false;
    const r = rndL(this.prob);

    const newX = this.x + OBL[r].x;
    const newY = this.y + OBL[r].y;
    isValid =
      newX >= 0 && newX < this.mapWidth && newY >= 0 && newY < this.mapHeight;

    if (isValid) {
      this.x = newX;
      this.y = newY;
    }

    //здесь обновить счётчики
  }
}

export function fullUpdateStats(gameState, petId) {
  const pet = {};

  pet.id = petId;
  pet.stats = { ...ListPets[petId].stats };
  pet.probs = { ...ListPets[petId].probs };
  pet.level = gameState.data.pets[petId].level;
  pet.experience = gameState.data.pets[petId].experience;

  console.log(`${pet.experiens} = ${gameState.data.pets[petId].experiens}`);

  pet.items = new Array(sizeOfInventory).fill(null);
  for (const key in ListItems) {
    const itemInfo = ListItems[key];
    const itemSave = gameState.data.items[key];
    if (itemSave.unlocked === true && itemSave.place === petId) {
      pet.items[Number(itemSave.slot)] = {
        key: key,
        item: itemInfo,
      };
    }
  }
  for (const slot of pet.items) {
    if (slot !== null) {
      console.log(slot.item?.modifyStats(pet));
    }
  }

  return pet;
}
