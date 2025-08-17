import { tileSize, W } from "../constants.js";
import Button from "./Button.js";

// Кнопка возврата в меню
export function createButtonBack(ctx, nameScene = "MenuScene") {
  return new Button(ctx, 50, 50, " ◀ ", () => ctx.scene.start(nameScene), {
    color: 0x2196f3,
    width: 80,
    height: 40,
  }); //◀️
}

/**
 * Генерирует случайную матрицу m x n с числами от 0 до k
 * @param {number} m - количество строк
 * @param {number} n - количество столбцов
 * @param {number} k - максимальное значение
 * @returns {number[][]} - сгенерированная матрица
 */
export function generateRandomMatrix(m, n, k) {
  return Array.from({ length: m }, () =>
    Array.from({ length: n }, () => Math.floor(Math.random() * k))
  );
}

export function tileToWorld(tile) {
  return tile * tileSize + tileSize / 2; // Центрируем в тайле
}

export function rndInt(k) {
  const r = Math.floor(Math.random() * (k + 1));
  if (r === 0) return 0;
  if (2 * Math.random() < 1) {
    return -r;
  }
  return r;
}
