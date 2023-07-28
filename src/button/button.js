// @ts-check

import BaseElement from '../shared/base-element';

import MdButtonElementStyle from './button.css?inline';

function getTemplateMdButton() {
  return `
    <style>${MdButtonElementStyle}</style>
    <span part="focus-ring"></span>
    <slot></slot>
  `;
}

export default class MdButtonElement extends BaseElement {
  static get is() {
    return 'md-button';
  }
  render() {
    return getTemplateMdButton();
  }
}
