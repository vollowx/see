import { Button } from './button.js';
import { ButtonToggleMixin } from './mixins/button-toggle-mixin.js';

/**
 * @deprecated compose the mixins yourself instead
 */
export class ToggleButton extends ButtonToggleMixin(Button) {}
