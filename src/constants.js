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
export const statsCheckTimeOut = 3000;
