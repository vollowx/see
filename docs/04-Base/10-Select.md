# `Select`

- Mixes [`InternalsAttached`](./20-InternalsAttached.md)
- Mixes [`FocusDelegated`](./20-FocusDelegated.md)
- Mixes [`FormAssociated`](./20-FormAssociated.md)

## CSS Parts

| name    | description               |
| ---     | ---                       |
| `field` | The field trigger element |
| `popup` | The dropdown              |
| `menu`  | The menu inside           |
| `value` | The displayed value text  |

## Events

| name     | description |
| ---      | ---         |
| `change` |             |
| `input`  |             |

## Properties

| name              | description                                                                       |
| ---               | ---                                                                               |
| `required`        | Reflected boolean                                                                 |
| `error`           |                                                                                   |
| `open`            |                                                                                   |
| `displayText`     | String; text shown in the field before options load (SSR); `display-text` as attr |
| `value`           | String; getting/setting also selects the matching option                          |
| `selectedIndex`   | Number; index of the selected option; `-1` if none; `selected-index` as attr      |
| `$field`          |                                                                                   |
| `$popup`          |                                                                                   |
| `$menu`           |                                                                                   |
| `$options`        | Array of `Option` elements inside the menu                                        |
| `selectedOptions` | Array of currently selected `Option` elements                                     |

## Methods

| signature                            | description                                 |
| ---                                  | ---                                         |
| `select(value: string) -> void`      | Selects the option matching the given value |
| `selectIndex(index: number) -> void` | Selects the option at the given index       |
| `reset() -> void`                    |                                             |
| `toggle() -> void`                   | Toggle the dropdown open/closed             |
