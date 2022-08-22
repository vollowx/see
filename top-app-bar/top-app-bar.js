import BaseElement from '../shared/base-element.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';
import { html, css } from '../shared/template.js';

const TopAppBarStyle = new CSSStyleSheet();
TopAppBarStyle.replaceSync(css`
  :host {
    display: block;
    width: 100%;
    --md-top-app-bar-height: 64px;
    height: min-content;
  }
  /* FIXME: background no animation */
  [part~='header'] {
    position: relative;
    display: flex;
    width: var(--md-top-app-bar-width, 100%);
    min-height: var(--md-top-app-bar-height, 64px);
    background-color: var(--md-sys-color-surface);
    box-sizing: border-box;
  }
  @media (hover: hover) {
    :host([auto-padding]) [part~='header'] {
      padding-right: var(--md-global-padding-right);
    }
  }
  :host(:not([static])) [part~='header'] {
    position: fixed;
    top: 0;
    left: auto;
    right: 0;
    z-index: 2;
  }
  :host(:not([static])) [scrolled] {
    background: var(--md-sys-elevation-surface-2);
  }
  ::slotted([slot~='title']) {
    margin: 0;
    ${TypographyStylesGenerator('title', 'L')}
  }
  [part~='sections'] {
    display: flex;
    align-items: center;
    padding: 12px 8px;
  }
  :host([no-nav-btn]) [part~='left'] {
    display: none;
  }
  [part~='middle'],
  [part~='right'] {
    flex: 1;
  }
  [part~='right'] {
    gap: 8px;
    justify-content: flex-end;
  }
  :host([centered]) [part~='sections'] {
    flex: 1;
  }
  :host([centered]) [part~='middle'] {
    justify-content: center;
  }
  :host([medium]) {
    --md-top-app-bar-height: 112px;
  }
  :host([large]) {
    --md-top-app-bar-height: 152px;
  }
  :host([medium]) [part~='sections'],
  :host([large]) [part~='sections'] {
    align-items: flex-start;
  }
  :host([medium]) [part~='middle'],
  :host([large]) [part~='middle'] {
    align-items: flex-end;
  }
  :host([medium]) [part~='middle'] span {
    margin-bottom: 8px;
  }
  :host([large]) [part~='middle'] span {
    margin-bottom: 16px;
  }
  :host([medium]:not([centered])) [part~='middle'] span,
  :host([large]:not([centered])) [part~='middle'] span {
    margin-inline-start: -48px;
  }
  :host([medium]) ::slotted([slot~='title']) {
    ${TypographyStylesGenerator('headline', 'S')}
  }
  :host([large]) ::slotted([slot~='title']) {
    ${TypographyStylesGenerator('headline', 'M')}
  }
  [part~='contents'] {
    padding-top: var(--md-top-app-bar-height, 64px);
  }
  :host([no-contents]) [part~='contents'] {
    display: none;
  }
`);

export default class TopAppBar extends BaseElement {
  static get is() {
    return 'md-top-app-bar';
  }

  get _styles() {
    return [...super._styles, TopAppBarStyle];
  }
  get _template() {
    return html`
      <header part="inner header">
        <section part="sections left">
          <slot name="navBtn"></slot>
        </section>
        <section part="sections middle">
          <span>
            <slot name="title"></slot>
          </span>
        </section>
        <section part="sections right">
          <slot name="actionBtn"></slot>
        </section>
      </header>
      <div part="contents">
        <slot></slot>
      </div>
    `;
  }

  /** @type {Window|Element} */
  get bindElement() {
    return document.querySelector(`${this.getAttribute('bind-el')}`) || window;
  }

  /** @type {HTMLElement} */
  get topAppBarElement() {
    return this.getEl('header');
  }

  connectedCallback() {
    super.connectedCallback();
    this.bindElement.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll = () => {
    // scrollY for window, scrollTop for HTMLElement, but Typescript doesn't know this, so
    // @ts-ignore
    if (this.bindElement.scrollY || this.bindElement.scrollTop > 0) {
      this.topAppBarElement.setAttribute('scrolled', '');
    } else {
      this.topAppBarElement.removeAttribute('scrolled');
    }
  };
}

customElements.define(TopAppBar.is, TopAppBar);
