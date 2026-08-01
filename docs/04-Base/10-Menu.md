# `Menu`

- Mixes [`FocusDelegated`](./20-FocusDelegated.md)
- Mixes [`InternalsAttached`](./20-InternalsAttached.md)
- Mixes [`Attachable`](./20-Attachable.md)

## Properties

name                | description
---                 | ---
`type`              | String; `menu` by default
`open`              | Reflected boolean; `false` by default
`quick`             | Boolean; `false` by default
`offset`            | Number; `0` by default
`align`             | Reflected string; `bottom-start` by default
`alignStrategy`     | String; `absolute` by default; `align-strategy` as an attribute
`keepOpenBlur`      | Boolean; `false` by default; `keep-open-blur` as an attribute
`keepOpenSelect`    | Boolean; `false` by default; `keep-open-select` as an attribute
`keepOpenClickAway` | Boolean; `false` by default; `keep-open-click-away` as an attribute
`noFocusControl`    | Boolean; `false` by default; `no-focus-control` as an attribute
`tabIndex`          | Number; `0` by default; `data-tabindex` as an attribute

## Events

| name         | description                    |
| ---          | ---                            |
| `open`       |                                |
| `close`      |                                |
| `select`     | Fires when an item is selected |
| `item-focus` | Fires when an item is focused  |

## CSS Parts

| name    | description |
| ---     | ---         |
| `menu`  |             |
| `items` |             |
