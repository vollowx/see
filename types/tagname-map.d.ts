import Badge from "../badge/badge";
import CommonButton from "../button/common-button";
import FAB from "../button/fab";
import IconButton from "../button/icon-button";
import List from "../list/list";
import ListItem from "../list/list-item";
import Menu from "../menu/menu";
import Popover from "../popover/popover";
import Ripple from "../ripple/ripple";
import TopAppBar from "../top-app-bar/top-app-bar";
import Typography from "../typography/typography";

declare global {
  interface HTMLElementTagNameMap {
    'md-badge': Badge,
    'md-button': CommonButton,
    'md-fab': FAB,
    'md-icon-button': IconButton,
    'md-list': List,
    'md-list-item': ListItem,
    'md-menu': Menu,
    'md-popover': Popover,
    'md-ripple': Ripple,
    'md-top-app-bar': TopAppBar,
    'md-typography': Typography,
  }
}

export {}
