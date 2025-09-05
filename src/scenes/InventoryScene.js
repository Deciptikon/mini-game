console.log("start InventoryScene");
import {
  W2,
  H,
  H4,
  wb,
  hb,
  bigText,
  W,
  isMobile,
  H2,
  sizeOfInventory,
} from "../constants.js";
import Button from "../components/Button.js";
import { createButtonBack } from "../components/functions.js";
import IconButton from "../components/IconButton.js";
import { ListPets } from "../Pets/ListPets.js";
import { Inventory } from "../Items/Inventory.js";
import { InventorySlot, STATE_INVENTORY_SLOT } from "../Items/InventorySlot.js";
import { ListItems } from "../Items/ListItems.js";

const xOut = -100;
const yOut = -100;

export default class InventoryScene extends Phaser.Scene {
  constructor() {
    super({ key: "InventoryScene" });

    this.slots = new Array(sizeOfInventory).fill(null);
    this.inventory = {};
    this;
    this.currentItem = null;
  }

  create() {
    this.gameState = this.game.registry.get("gameState");

    const title = this.add
      .text(W2, H * 0.05, `Инвентарь`, bigText)
      .setOrigin(0.5);

    //this.graphics = scene.add.graphics();
    //this.add(this.graphics);
    this.createSlots();
    this.resetSlots();
    //scene.add.existing(this);

    this.createInventory();

    this.updateInventory();

    // Кнопка возврата в меню
    createButtonBack(this, "PetScene");
  }

  createSlots() {
    const w = 125;
    const s = 10;
    for (let i = -1; i <= 1; i++) {
      for (let j = 0; j <= 1; j++) {
        const n = i + 1 + j * 3;
        this.slots[n] = new InventorySlot(
          this,
          W / 2 + (W / 4) * i,
          H * 0.8 + (W / 4) * j,
          w,
          w,
          `icon_${"cat"}`,
          "",
          () => {
            console.log(`Клик по иконке n=${n}`);
            if (this.slots[n].state === STATE_INVENTORY_SLOT.LOCKED) {
              this.slots[n].setEmptyState();
              return;
            }
            if (this.slots[n].state === STATE_INVENTORY_SLOT.EMPTY) {
              //this.slots[n].setActiveState(`chamomile`, `icon_${"chamomile"}`); //`icon_${"cat"}`
              return;
            }
            if (this.slots[n].state === STATE_INVENTORY_SLOT.ACTIVE) {
              const id = this.slots[n].itemId;
              if (id) {
                console.log(`id = ${id}`);
                console.log(this.gameState.data.items[id]);
                this.gameState.data.items[id].place = null;
                this.gameState.data.items[id].slot = null;
              }

              //this.slots[n].setLockedState();
              this.slots[n].setEmptyState();
              this.updateInventory();
              return;
            }
          },
          {},
          n
        );
      }
    }
  }

  createInventory() {
    for (const key in ListItems) {
      if (ListItems.hasOwnProperty(key)) {
        const item = ListItems[key];
        item.place = this.gameState.data.items[key].place;
        item.slot = this.gameState.data.items[key].slot;

        console.log(item);

        const w = 110;

        const icon = new IconButton(
          this,
          xOut,
          yOut,
          w,
          w,
          `icon_${key}`,
          "",
          () => {
            console.log(`Клик по иконке ${key}`);
            this.applyItem(key, this.gameState.data.items[key], `icon_${key}`);
            this.updateInventory();
          },
          {
            scale: 0.25,
            hoverScale: 0.28,
          }
        );

        //icon.key = key;

        this.inventory[key] = icon;
      }
    }
  }

  updateInventory() {
    // простая сетка
    const w = 110;
    const m = isMobile ? 3 : 6;
    const s = (W - m * w) / (m + 1);

    const x0 = w / 2 + s;
    const y0 = H * 0.175;

    let i = 0;
    let j = 0;
    for (const key in ListItems) {
      if (ListItems.hasOwnProperty(key)) {
        const item = ListItems[key];
        item.place = this.gameState.data.items[key].place;
        item.slot = this.gameState.data.items[key].slot;

        console.log(item);

        if (this.gameState.data.items[key].place !== null) {
          if (
            this.gameState.data.items[key].place === this.gameState.currentPet
          ) {
            const idSlot = this.gameState.data.items[key].slot;
            if (idSlot || idSlot === 0) {
              this.slots[idSlot].setActiveState(key, `icon_${key}`);
            }
          }
          this.inventory[key].setPosition(xOut, yOut);
        } else {
          const x = x0 + j * (w + s);
          const y = y0 + i * (w + s);

          this.inventory[key].setPosition(x, y);

          j++;
          if (j >= m) {
            j = 0;
            i++;
          }
        }
      }
    }
  }

  resetSlots() {
    for (const slot of this.slots) {
      slot.setEmptyState();
    }
  }

  insertItem(itemId, item, icon, idSlot) {
    console.log(`idSlot = ${idSlot}`);

    if (idSlot) {
      console.log(this.slots[idSlot]);
      this.slots[idSlot].setActiveState(itemId, icon);
      //item.place = "cat";
      //item.slot = idSlot;
    }
  }

  applyItem(itemId, item, icon) {
    for (const slot of this.slots) {
      if (slot.state === STATE_INVENTORY_SLOT.EMPTY) {
        slot.setActiveState(itemId, icon);
        item.place = "cat";
        item.slot = slot.id;
        break;
      }
    }
  }
}
