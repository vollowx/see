import Badge from '../badge/badge';
import CommonButton from '../button/common-button';
import Checkbox from '../checkbox/checkbox';
import Divider from '../divider/divider';
import FAB from '../button/fab';
import Icon from '../icon/icon';
import IconButton from '../button/icon-button';
import List from '../list/list';
import ListItem from '../list/list-item';
import ListItemCheckbox from '../list/list-item-checkbox';
import ListItemRadio from '../list/list-item-radio';
import Menu from '../menu/menu';
import Popover from '../popover/popover';
import Ripple from '../ripple/ripple';
import TopAppBar from '../top-app-bar/top-app-bar';
import Typography from '../typography/typography';

declare global {
  interface HTMLElementTagNameMap {
    'md-badge': Badge;
    'md-button': CommonButton;
    'md-checkbox': Checkbox;
    'md-divider': Divider;
    'md-fab': FAB;
    'md-icon': Icon;
    'md-icon-button': IconButton;
    'md-list': List;
    'md-list-item': ListItem;
    'md-list-item-checkbox': ListItemCheckbox;
    'md-list-item-radio': ListItemRadio;
    'md-menu': Menu;
    'md-popover': Popover;
    'md-ripple': Ripple;
    'md-top-app-bar': TopAppBar;
    'md-typography': Typography;
  }
}

export {};
