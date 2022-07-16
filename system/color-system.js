export * from './material-color-utilities/index.js';

/**
 * @param {string} _color 
 */
export function updateCrTitleBarColor(_color) {
  let crTitleBarColor = document.querySelector('meta[name="theme-color"]');
  if (crTitleBarColor) {
    crTitleBarColor.setAttribute('content', _color);
  } else {
    crTitleBarColor = document.createElement('meta');
    crTitleBarColor.setAttribute('name', 'theme-color');
    crTitleBarColor.setAttribute('content', _color);
    document.head.appendChild(crTitleBarColor);
  }
}
