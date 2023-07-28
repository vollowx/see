// @ts-check

/**
 * Check if something exist
 * @param {any} value
 * @param {string} message
 */
export function assert(value, message = '') {
  if (value) {
    return;
  }
  throw new Error('Assertion failed' + (message ? `: ${message}` : ''));
}

export function isRTL() {
  return document.documentElement.dir === 'rtl';
}

export const distance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
