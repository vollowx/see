import BaseElement from '../shared/base-element.js';
import SegmentedButton from './segmented-button.js';
import { html, css } from '../shared/template.js';

const SegmentedButtonSetStyle = css`
  :host {
    display: flex;
  }
  [part~='inner'] {
    height: calc(40px - 2 * var(--md-seg-button-density, 0px));
    width: 100%;
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    grid-auto-rows: auto;
  }
  ::slotted(:first-child) {
    border-start-start-radius: var(--md-seg-button-shape-start-start, 9999px);
    border-end-start-radius: var(--md-seg-button-shape-end-start, 9999px);
  }
  ::slotted(:last-child) {
    border-start-end-radius: var(--md-seg-button-shape-start-end, 9999px);
    border-end-end-radius: var(--md-seg-button-shape-end-end, 9999px);
  }
`;

export default class SegmentedButtonSet extends BaseElement {
  static get is() {
    return 'md-seg-button-set';
  }

  get multiselect() {
    return this.hasAttribute('multiselect');
  }
  set multiselect(value) {
    this.toggleAttribute('multiselect', value);
  }

  get childrenElements() {
    return this.querySelectorAll('md-seg-button');
  }

  get _styles() {
    return [SegmentedButtonSetStyle];
  }
  get _template() {
    return html` <span role="group" part="inner"><slot></slot></span> `;
  }

  /**
   * @param {SegmentedButton} changedChild
   */
  childChanged(changedChild) {
    if (this.multiselect) return;
    this.childrenElements.forEach((child) => {
      if (child === changedChild) {
        return;
      }
      child.selected = false;
    });
  }
}

customElements.define(SegmentedButtonSet.is, SegmentedButtonSet);
