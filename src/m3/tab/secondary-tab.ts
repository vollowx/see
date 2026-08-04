import { customElement } from '../../core/decorators.js';
import { M3Tab } from './tab.js';
import { secondaryTabStyles } from './secondary-tab-styles.css.js';

@customElement('md-secondary-tab')
export class M3SecondaryTab extends M3Tab {
  protected override _isSecondary = true;
  static override styles = [...super.styles, secondaryTabStyles];
}
