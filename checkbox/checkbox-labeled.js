import Checkbox from "./checkbox.js";
import FormControlLabelStyle from "../shared/form-control-label-style.js";
import { html } from "../shared/template.js";

export default class CheckboxLabeled extends Checkbox {
  static get is() {
    return 'md-checkbox-labeled';
  }

  get _styles() {
    return [...super._styles, FormControlLabelStyle];
  }
  get _template() {
    return html`
      <label part="inner fcl-root">
        ${this._renderInput()}
        <span part="label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

customElements.define(CheckboxLabeled.is, CheckboxLabeled);
