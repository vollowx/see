export async function ensureReady(element: HTMLElement) {
  if (!element) return null;

  if (element.matches(':not(:defined)'))
    await customElements.whenDefined(element.tagName.toLowerCase());

  // Handles Lit update
  if ('updateComplete' in element) {
    await element.updateComplete;
  } else {
    // Yield to the next frame to allow initial render to finish
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }

  return element;
}
