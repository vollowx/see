// @ts-check

/**
 * @param {TemplateStringsArray} strings
 * @param {string[]} substitutions
 * @returns {HTMLTemplateElement}
 */
export function html(strings, ...substitutions) {
  let template = document.createElement('template');
  template.innerHTML = String.raw(strings, ...substitutions);
  return template;
}

/**
 * @param {TemplateStringsArray} strings
 * @param {string[]} substitutions
 * @returns {CSSStyleSheet}
 */
export function css(strings, ...substitutions) {
  let sheet = new CSSStyleSheet();
  sheet.replaceSync(String.raw(strings, ...substitutions));
  return sheet;
}

/**
 * @param {string[]} csss
 * @returns {CSSStyleSheet[]}
 */
export function sheetsFromCss(csss) {
  let sheets = [];
  csss.map((css) => {
    let sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    sheets.push(sheet);
  });
  return sheets;
}
