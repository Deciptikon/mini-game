import Button from "./Button.js";

// Кнопка возврата в меню
export function createButtonBack(ctx, nameScene = "MenuScene") {
  return new Button(ctx, 50, 50, " ◀ ", () => ctx.scene.start(nameScene), {
    color: 0x2196f3,
    width: 80,
    height: 40,
  }); //◀️
}
