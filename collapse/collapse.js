import BaseElement from '../shared/base-element.js';
import { html, css } from '../shared/template.js';

const CollapseStyle = css`
  :host {
    display: block;
    min-height: 0;
    height: 0;
    overflow: hidden;
    transition: var(--md-collapse-transition-duration, 250ms) height cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    visibility: hidden;
  }
  :host([open]) {
    height: auto;
    visibility: visible;
  }
  :host([in-drawer]) {
    padding-inline-start: 16px;
  }
  [part~='inner'] {
    display: block;
    height: max-content;
  }
`;

export default class Collapse extends BaseElement {
  static get is() {
    return 'ns-collapse';
  }

  static get observedAttributes() {
    return ['open'];
  }

  get open() {
    return this.hasAttribute('open');
  }
  set open(value) {
    this.toggleAttribute('open', value);
  }

  get _styles() {
    return [CollapseStyle];
  }
  get _template() {
    return html`<slot part="inner"></slot>`;
  }

  toggle() {
    this.open = !this.open;
  }

  updateStates() {
    if (this.open) {
      this.style.height = this.innerElement?.getBoundingClientRect().height + 'px';
    } else {
      this.style.height = '0';
      this.style.visibility = 'visible';
      setTimeout(() => {
        this.style.visibility = '';
      }, 250);
    }
    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent('collapse-changed', { detail: { opened: this.open }, bubbles: true, composed: true })
      );
    }, 250);
  }

  connectedCallback() {
    this.style.height = '0';
  }
  /**
   * @param {string} name
   * @param {string|undefined} oldValue
   * @param {string|undefined} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open') {
      this.updateStates();
    }
  }
}

customElements.define(Collapse.is, Collapse);
