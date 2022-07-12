/**
 * @param {TemplateStringsArray} strings - the strings passed to the JavaScript template
 * literal
 * @param {string[]} substitutions - the variable values passed to the
 * JavaScript template literal
 * @returns {DocumentFragment}
 */
export function html(strings, ...substitutions) {
  return template(strings, ...substitutions).content;
}

/**
 * @param {TemplateStringsArray} strings - the strings passed to the JavaScript template
 * literal
 * @param {string[]} substitutions - the variable values passed to the
 * JavaScript template literal
 * @returns {HTMLTemplateElement}
 */
export function template(strings, ...substitutions) {
  const template = document.createElement('template');
  template.innerHTML = String.raw(strings, ...substitutions);
  return template;
}

/**
 * @param {TemplateStringsArray} strings - the strings passed to the JavaScript template
 * literal
 * @param {string[]} substitutions - the variable values passed to the
 * JavaScript template literal
 * @returns {string}
 */
export function css(strings, ...substitutions) {
  return String.raw(strings, ...substitutions);
}
