// @ts-check

export function isRTL() {
  return document.documentElement.dir === 'rtl';
}

export function distance({ x: x1, y: y1 }, { x: x2, y: y2 }) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
