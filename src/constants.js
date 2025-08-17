// Рахмеры холста и сопряженные параметры
export const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

export const W = isMobile ? 540 : 1920;
export const H = 1080;
export const W2 = W / 2;
export const H2 = H / 2;
export const H4 = H / 4;
export const H8 = H / 8;

// Размеры кнопок
export const wb = 200;
export const hb = 60;

// Интервал обновления статов персонажа, ms
export const mapUpdateTimeOut = 1000;
// коэффициен смещения
export const dK = 0.05;

// Размер одного тайла
export const tileSize = 64;
// количество типов тайлов
export const tileCount = 4 * 4;

// размеры карты (в тайлах)
export const mapWidthTile = 16;
export const mapHeightTile = 16;

// область перемещения (алгебра по модулю 8)
// 5 6 7
// 4   0
// 3 2 1
const rawOBL = {
  0: { x: 1, y: 0 },
  1: { x: 1, y: 1 },
  2: { x: 0, y: 1 },
  3: { x: -1, y: 1 },
  4: { x: -1, y: 0 },
  5: { x: -1, y: -1 },
  6: { x: 0, y: -1 },
  7: { x: 1, y: -1 },
};

export const OBL = new Proxy(rawOBL, {
  get(target, prop) {
    if (prop in target) return target[prop];

    const mod = 8;
    const num = Number(prop);
    if (!isNaN(num)) {
      const safeIndex = num % mod;
      return target[safeIndex >= 0 ? safeIndex : safeIndex + mod];
    }

    return target[prop];
  },
});
