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

// Размер одного тайла
export const tileSize = 64;
// количество типов тайлов
export const tileCount = 4 * 4;

// размеры карты (в тайлах)
export const mapWidthTile = 32;
export const mapHeightTile = 32;
