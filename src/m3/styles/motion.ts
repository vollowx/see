/**
 * Workaround for `CSSNumericValue.parse()` not being supported by Firefox
 * https://developer.mozilla.org/en-US/docs/Web/API/CSSNumericValue/parse_static
 */
export const parseCSSNum = (css: string) => {
  if (typeof CSSNumericValue !== 'undefined') {
    try {
      return CSSNumericValue.parse(css).to('ms').value;
    } catch {
      return 0;
    }
  } else {
    css = css.trim().toLowerCase();

    if (css.endsWith('ms'))
      return parseFloat(css.substring(0, css.length - 2)) | 0;
    else if (css.endsWith('s'))
      return (parseFloat(css.substring(0, css.length - 1)) * 1000) | 0;
    else return 0;
  }
};

/**
 * https://m3.material.io/styles/motion/overview/specs
 */
export const getSpring = (
  element: HTMLElement,
  type: 'spatial' | 'effects',
  duration: 'fast' | 'default' | 'slow'
) => {
  const styles = getComputedStyle(element);
  const get = (suffix: string) =>
    styles.getPropertyValue(`--md-sys-motion-${type}-${duration}${suffix}`);
  return {
    easing: get('') || 'ease',
    duration: parseCSSNum(get('-duration')),
  };
};
