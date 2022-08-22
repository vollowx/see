import BaseElement from '../shared/base-element.js';
import { html, css } from '../shared/template.js';

const DividerStyle = css`
  :host {
    display: block;
    flex-shrink: 0;
  }
  [part~='divider'] {
    margin: 0px;
    flex-shrink: 0;
    border-width: 0px 0px thin;
    border-style: solid;
    border-color: var(--md-sys-color-surface-variant);
  }
  :host([vert-margin]) [part~='divider'] {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  :host([inset]) [part~='divider'] {
    margin-inline-start: 16px;
  }
  :host([inset~='end']) [part~='divider'] {
    margin-inline-end: 16px;
  }
  :host([inset~='icon']) [part~='divider'] {
    margin-inline-start: 56px;
  }
  :host([inset~='avatar']) [part~='divider'],
  :host([inset~='subtitle']) [part~='divider'] {
    margin-inline-start: 72px;
  }
`;

export default class Divider extends BaseElement {
  static get is() {
    return 'md-divider';
  }

  get inList() {
    // @ts-ignore
    return ['MD-LIST', 'MD-MENU'].includes(this.parentNode.tagName);
  }

  get _styles() {
    return [DividerStyle];
  }
  get _template() {
    return html`<${this.inList ? 'li role="separator"' : 'hr'} part="inner divider"><slot></slot></${
      this.inList ? 'li' : 'hr'
    }>`;
  }
}

customElements.define(Divider.is, Divider);
