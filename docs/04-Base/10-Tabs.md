# `Tabs`

## CSS Parts

| name      | description            |
| ---       | ---                    |
| `tablist` | The tab list container |

## Events

| name     | description                                         |
| ---      | ---                                                 |
| `select` | Fires on user interaction; `detail: { tab, value }` |

## Slots

| name     | description       |
| ---      | ---               |
|          | Tab elements      |
| `panels` | TabPanel elements |

## Properties

name       | description
---        | ---
`switch`   | String; `auto` (select on focus) or `manual` (select on click/Enter); `manual` by default
`selected` | Reflected string; `value` of the selected tab
`$tabs`    | Array of all `Tab` children
`$panels`  | Array of all `TabPanel` children

## Methods

| signature                                               | description                                             |
| ---                                                     | ---                                                     |
| `focusTab(tab: Tab) -> void`                            | Moves focus to the given tab                            |
| `_selectTab(tab: Tab, dispatchEvent?: boolean) -> void` | Selects the tab; pass `true` to fire the `select` event |
