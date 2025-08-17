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

function generateListW(list) {
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total += list[i];
  }

  let listW = [];
  listW.push(0);
  for (let i = 0; i < list.length - 1; i++) {
    listW.push(listW[listW.length - 1] + list[i] / total);
  }
  console.log(listW);

  return listW;
}

function rndW(listW) {
  const p = Math.random();
  let r = 0;
  for (let i = 0; i < listW.length; i++) {
    if (p > listW[i]) r = i;
  }
  return r;
}

/**
 * Генерирует случайную матрицу m x n с числами от 0 до k
 * @param {number} m - количество строк
 * @param {number} n - количество столбцов
 * @param {list} list - список с весами типа [12.9, 0.86, 7, ...]
 * @returns {number[][]} - сгенерированная матрица
 */
export function generateLMatrix(m, n, list) {
  let mat = [];
  const listW = generateListW(list);
  for (let i = 0; i < m; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      row.push(rndW(listW));
    }
    mat.push(row);
  }
  return mat;
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
