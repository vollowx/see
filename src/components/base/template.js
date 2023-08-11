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
