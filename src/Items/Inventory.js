import { H, W, isMobile, sizeOfInventory } from "../constants.js";
import { InventorySlot, STATE_INVENTORY_SLOT } from "./InventorySlot.js";

export class Inventory extends Phaser.GameObjects.Container {
  constructor(scene, x, y, pet) {
    super(scene, x, y);
    this.pet = pet;

    // Создаем графический объект
    this.graphics = scene.add.graphics();
    this.add(this.graphics);

    this.slots = new Array(sizeOfInventory).fill(null);
    this.currentItem = null;

    const w = 125;
    const s = 10;
    for (let i = -1; i <= 1; i++) {
      for (let j = 0; j <= 1; j++) {
        const n = i + 1 + j * 3;
        this.slots[n] = new InventorySlot(
          scene,
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
              this.slots[n].setActiveState(`icon_${"cat"}`); //`icon_${"cat"}`
              return;
            }
            if (this.slots[n].state === STATE_INVENTORY_SLOT.ACTIVE) {
              this.slots[n].setLockedState();
              return;
            }
          },
          {},
          n
        );
      }
    }
    scene.add.existing(this);
  }

  create(inventory) {}

  draw() {
    for (const item of this.pet.items) {
      //
    }
  }

  applyItem(item, icon, idSlot = null) {
    if (idSlot !== null) {
      this.slots[idSlot].setActiveState(icon);
      item.place = "cat";
      item.slot = idSlot;
    } else {
      for (const slot of this.slots) {
        if (slot.state === STATE_INVENTORY_SLOT.EMPTY) {
          slot.setActiveState(icon);
          item.place = "cat";
          item.slot = slot.id;
          break;
        }
      }
    }
  }
}
