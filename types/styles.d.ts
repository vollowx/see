declare global {
  interface CSSStyleSheet {
    replaceSync(css: string): void;
    replace(css: string): void;
  }
  interface ShadowRoot {
    adoptedStyleSheets: CSSStyleSheet[];
  }
}

export {};
