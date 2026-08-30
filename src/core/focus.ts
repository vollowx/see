import { isServer } from 'lit';

export let focusVisible = false;

export function setFocusVisible(value: boolean) {
  focusVisible = value;
}

if (!isServer) {
  window.addEventListener('keydown', () => (focusVisible = true), {
    capture: true,
  });
  window.addEventListener('mousedown', () => (focusVisible = false), {
    capture: true,
  });
}

/**
 * Recursively walks the DOM tree, piercing Shadow DOM boundaries and
 * resolving slots, to find the first tabbable element.
 *
 * TODO: consider use document.createTreeWalker which might be faster, yet more
 *       complex in code; may find references in the core/experimental/popup
 *       before the commit that added this function
 */
export function getFirstTabbable(
  root: Element | DocumentFragment
): HTMLElement | null {
  if (root.nodeName === 'SLOT') {
    const assigned = (root as HTMLSlotElement).assignedElements({
      flatten: true,
    });
    for (const el of assigned) {
      const found = getFirstTabbable(el);
      if (found) return found;
    }
    return null;
  }

  if (root instanceof HTMLElement) {
    const isTabbable =
      root.tabIndex >= 0 &&
      !root.hasAttribute('disabled') &&
      !root.hidden &&
      root.getAttribute('tabindex') !== '-1';
    if (isTabbable) return root;
  }

  if ('shadowRoot' in root && root.shadowRoot) {
    const found = getFirstTabbable(root.shadowRoot);
    if (found) return found;
  }

  for (const child of root.children) {
    const found = getFirstTabbable(child);
    if (found) return found;
  }

  return null;
}
