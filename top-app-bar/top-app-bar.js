import BaseElement from '../shared/base-element.js';
import { TypographyStylesGenerator } from '../system/typography-system.js';
import { html, css } from '../shared/template.js';

const TopAppBarStyle = new CSSStyleSheet();
TopAppBarStyle.replaceSync(css`
  :host {
    display: block;
  }
  [part~='header'] {
    display: flex;
    position: fixed;
    top: 0;
    left: auto;
    right: 0;
    z-index: 2;
    width: var(--md-top-app-bar-width, 100%);
    min-height: var(--md-top-app-bar-height, 64px);
    background-color: var(--md-sys-color-surface);
    box-sizing: border-box;
  }
  :host([static]) [part~='header'] {
    position: static;
  }
  [part~='tint'] {
    position: absolute;
    inset: 0;
    background-color: var(--md-sys-color-primary);
    opacity: 0;
    transition: 120ms opacity cubic-bezier(.4, 0, .2, 1);
    pointer-events: none;
  }
  [scrolled] [part~='tint'] {
    opacity: 0.08;
  }
  ::slotted([slot~='title']) {
    margin: 0;
    ${TypographyStylesGenerator('title', 'L')}
  }
  [part~='header'] section {
    display: flex;
    align-items: center;
    padding: 0 8px;
  }
  [part~='middle'],
  [part~='right'] {
    flex: 1;
  }
  [part~='right'] {
    justify-content: flex-end;
  }
  :host([centered]) [part~='header'] section {
    flex: 1;
  }
  :host([centered]) [part~='middle'] {
    justify-content: center;
  }
  [part~='contents'] {
    padding-top: var(--md-top-app-bar-height, 64px);
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
        <span part="tint"></span>
        <section part="left">
          <slot name="navBtn"></slot>
        </section>
        <section part="middle">
          <slot name="title"></slot>
        </section>
        <section part="right">
          <slot name="actionBtn"></slot>
        </section>
      </header>
      <div part="contents">
        <slot></slot>
      </div>
    `;
  }

  /** @type {Window|Element} */
  scrollBinder = document.querySelector(`${this.getAttribute('scroll-binder')}`) || window;

  /** @type {HTMLElement} */
  get topAppBarElement() {
    return this.getEl('header');
  }

  connectedCallback() {
    super.connectedCallback();
    this.scrollBinder.addEventListener('scroll', this.handleScroll);
    console.log(document.querySelector(`${this.getAttribute('scroll-binder')}`));
  }

  handleScroll = () => {
    // scrollY for window, scrollTop for HTMLElement, but Typescript doesn't know this, so
    // @ts-ignore
    if (this.scrollBinder.scrollY || this.scrollBinder.scrollTop > 0) {
      this.topAppBarElement.setAttribute('scrolled', '');
    } else {
      this.topAppBarElement.removeAttribute('scrolled');
    }
  }
}

customElements.define(TopAppBar.is, TopAppBar);
