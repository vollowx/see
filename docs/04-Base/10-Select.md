# `Select`

- Mixes [`InternalsAttached`](./20-InternalsAttached.md)
- Mixes [`FocusDelegated`](./20-FocusDelegated.md)
- Mixes [`FormAssociated`](./20-FormAssociated.md)

## CSS Parts

| name    | description               |
| ---     | ---                       |
| `field` | The field trigger element |
| `menu`  | The dropdown menu         |
| `items` | The slot inside the menu  |

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
`offset`        | Number; pixel distance from anchor; `0` by default
`align`         | Reflected string; floating-ui placement; `bottom-start` by default
`alignStrategy` | Reflected string; `absolute` or `fixed`; `absolute` by default; `align-strategy` as an attribute
`open`          | Boolean
`displayText`   | String; text shown in the field before options load (SSR)
`value`         | String; getting/setting also selects the matching option
`selectedIndex` | Number; getter/setter; index of the selected option; `-1` if none
`$field`        | The field element
`$menu`         | The dropdown menu element

## Methods

| signature                       | description                                 |
| ---                             | ---                                         |
| `select(value: string) -> void` | Selects the option matching the given value |
