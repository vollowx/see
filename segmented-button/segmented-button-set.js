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
  static get observedAttributes() {
    return ['aria-label', 'data-aria-label', 'multiselect'];
  }

  get ariaLabel() {
    return this.getAttribute('data-aria-label');
  }
  set ariaLabel(value) {
    if (value) {
      this.setAttribute('data-aria-label', value);
    } else {
      this.removeAttribute('data-aria-label');
    }
  }
  get multiselect() {
    return this.hasAttribute('multiselect');
  }
  set multiselect(value) {
    this.toggleAttribute('multiselect', value);
  }

  get buttonElements() {
    return [...this.querySelectorAll('md-seg-button')];
  }

  get _styles() {
    return [SegmentedButtonSetStyle];
  }
  get _template() {
    return html` <span role="group" part="inner"><slot></slot></span> `;
  }

  /**
   * @param {number} index
   */
  getButtonDisabled(index) {
    if (this.indexOutOfBounds(index)) return false;
    return this.buttonElements[index].disabled;
  }
  /**
   * @param {number} index
   * @param {boolean} disabled
   */
  setButtonDisabled(index, disabled) {
    if (this.indexOutOfBounds(index)) return;
    this.buttonElements[index].disabled = disabled;
  }
  /**
   * @param {number} index
   */
  getButtonSelected(index) {
    if (this.indexOutOfBounds(index)) return false;
    return this.buttonElements[index].selected;
  }
  /**
   * @param {number} index
   * @param {boolean} selected
   */
  setButtonSelected(index, selected) {
    if (this.indexOutOfBounds(index)) return;
    if (this.getButtonDisabled(index)) return;

    if (this.multiselect) {
      this.buttonElements[index].selected = selected;
      this.emitChangeEvent(index);
      return;
    }

    // Single-select segmented buttons are not unselectable.
    if (!selected) return;

    this.buttonElements[index].selected = true;
    this.emitChangeEvent(index);
    // Deselect all other buttons for single-select.
    for (let i = 0; i < this.buttonElements.length; i++) {
      if (i === index) continue;
      this.buttonElements[i].selected = false;
    }
  }
  /**
   * @param {CustomEvent} e
   */
  handleSegButtonInteraction(e) {
    // @ts-ignore
    const index = this.buttonElements.indexOf(e.target);
    this.toggleSelection(index);
  }
  /**
   * @param {number} index
   */
  toggleSelection(index) {
    if (this.indexOutOfBounds(index)) return;
    this.setButtonSelected(index, !this.buttonElements[index].selected);
  }
  /**
   * @param {number} index
   */
  indexOutOfBounds(index) {
    return index < 0 || index >= this.buttonElements.length;
  }
  /**
   * @param {number} index
   */
  emitChangeEvent(index) {
    this.dispatchEvent(
      new CustomEvent('seg-button-set-change', {
        detail: {
          button: this.buttonElements[index],
          selected: this.buttonElements[index].selected,
          index,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * @param {SegmentedButton} changedChild
   */
  childChanged(changedChild) {
    if (this.multiselect) return;
    this.buttonElements.forEach((child) => {
      if (child === changedChild) {
        return;
      }
      child.selected = false;
    });
  }

  connectedCallback() {
    // @ts-ignore
    this.innerElement?.addEventListener('seg-button-interaction', this.handleSegButtonInteraction.bind(this));
  }
  /**
   * @param {string} name
   * @param {string|undefined} oldValue
   * @param {string|undefined} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (['aria-label', 'data-aria-label'].includes(name)) {
      this.syncDataAttrByEmpty(name);
      return;
    }
  }
}

customElements.define(SegmentedButtonSet.is, SegmentedButtonSet);
