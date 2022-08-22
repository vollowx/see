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
 * @param {(string|CSSStyleSheet)[]} substitutions - the variable values passed to the
 * JavaScript template literal
 * @returns {CSSStyleSheet}
 */
export function css(strings, ...substitutions) {
  const styleSheet = new CSSStyleSheet();
  // const processedSubstitutions = [];
  // for (const substitution of substitutions) {
  //   if (typeof substitution === 'string') {
  //     processedSubstitutions.push(substitution);
  //   } else {
  //     const cssRules = substitution.cssRules;
  //     const cssStrings = [];
  //     for (let i = 0; i < cssRules.length; i++) { cssStrings.push(cssRules[i].cssText); }
  //     processedSubstitutions.push(cssStrings.join(''));
  //   }
  // }
  styleSheet.replaceSync(String.raw(strings, ...substitutions));
  return styleSheet;
}
