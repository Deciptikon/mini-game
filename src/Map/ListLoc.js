export const ListLoc = {
  forest: {
    name: "Тайный лес",
    position: { x: 500, y: 400 },
    type: "forest",
    discovered: true,
    icon_sprite: "./assets/loc_sprite.png",
  },
  lake: {
    name: "Озеро слез",
    position: { x: 300, y: 200 },
    type: "water",
    discovered: true,
    icon_sprite: "./assets/loc_sprite.png",
  },
  eagle_peak: {
    name: "Орлиная вершина",
    position: { x: 800, y: 100 },
    type: "mountain",
    discovered: false,
    icon_sprite: "./assets/loc_sprite.png",
    unlockRequirement: "pet_level > 3",
  },
};
