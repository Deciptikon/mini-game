export const ListLoc = {
  discoveredLocations: ["forest", "lake"],
  currentLocation: "forest",
  regions: [
    {
      id: "starting_zone",
      name: "Начальные земли",
      locations: [
        {
          id: "forest",
          name: "Тайный лес",
          position: { x: 500, y: 400 },
          type: "forest",
          discovered: true,
          sprite: "./assets/loc_sprite.png",
        },
        {
          id: "lake",
          name: "Озеро слез",
          position: { x: 300, y: 200 },
          type: "water",
          discovered: true,
          sprite: "./assets/loc_sprite.png",
        },
      ],
    },
    {
      id: "mountain_region",
      name: "Горный хребет",
      locations: [
        {
          id: "eagle_peak",
          name: "Орлиная вершина",
          position: { x: 800, y: 100 },
          type: "mountain",
          discovered: false,
          sprite: "./assets/loc_sprite.png",
          unlockRequirement: "pet_level > 3",
        },
      ],
    },
  ],
};
