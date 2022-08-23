export * from './material-color-utilities/index.js';

// /**
//  * @param {string} _color
//  */
// export function setCrTitleBarColor(_color) {
//   let crTitleBarColor = document.querySelector('meta[name="theme-color"]');
//   if (crTitleBarColor) {
//     crTitleBarColor.setAttribute('content', _color);
//   } else {
//     crTitleBarColor = document.createElement('meta');
//     crTitleBarColor.setAttribute('name', 'theme-color');
//     crTitleBarColor.setAttribute('content', _color);
//     document.head.appendChild(crTitleBarColor);
//   }
// }

// /**
//  * @param {HTMLElement} el
//  */
// export function listenThemeChange(el) {
//   let options = { attributes: true };
//   /** @type {MutationCallback} */
//   let callback = (records) => {
//     for (let i = 0; i < records.length; i++) {
//       if (['data-md-theme', 'style'].includes(records[i].attributeName || '')) {
//         setCrTitleBarColor(el.style.getPropertyValue('--md-sys-color-background-' + el.getAttribute('data-md-theme')));
//       }
//     }
//   };
//   const mutationObserver = new MutationObserver(callback);
//   mutationObserver.observe(el, options);
//   return mutationObserver;
// }
// if (document) listenThemeChange(document.documentElement);
