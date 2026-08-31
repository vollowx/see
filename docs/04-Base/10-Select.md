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

## Events

| name     | description |
| ---      | ---         |
| `change` |             |
| `input`  |             |

## Properties

name            | description
---             | ---
`required`      | Reflected boolean
`error`         | Boolean
`quick`         | Boolean; skip open animation
`open`          | Boolean
`displayText`   | String; text shown in the field before options load (SSR)
`value`         | String; getting/setting also selects the matching option
`selectedIndex` | Number; getter/setter; index of the selected option; `-1` if none
`$field`        | The field element
`$popup`        | The popup element
`$menu`         | The menu element

## Methods

| signature                       | description                                 |
| ---                             | ---                                         |
| `select(value: string) -> void` | Selects the option matching the given value |
