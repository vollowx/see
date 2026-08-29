# `Menu`

- Mixes [`InternalsAttached`](./20-InternalsAttached.md)
- Mixes [`Attachable`](./20-Attachable.md)
- Mixes [`FocusDelegated`](./20-FocusDelegated.md)

## CSS Parts

| name    | description                         |
| ---     | ---                                 |
| `menu`  | The inner focusable container `div` |
| `items` | The slot inside the container       |

## Events

| name         | description               |
| ---          | ---                       |
| `open`       |                           |
| `close`      |                           |
| `select`     | `detail: { item, index }` |
| `item-focus` | `detail: { item }`        |

## Properties

name                | description
---                 | ---
`type`              | String; ARIA role of the inner container; `menu` by default
`open`              | Reflected boolean
`quick`             | Boolean; skip open/close animation
`offset`            | Number; pixel distance from anchor; `0` by default
`align`             | Reflected string; floating-ui placement; `bottom-start` by default
`alignStrategy`     | Reflected string; `absolute` or `fixed`; `absolute` by default; `align-strategy` as an attribute
`keepOpenBlur`      | Boolean; keep open when focus leaves; `keep-open-blur` as an attribute
`keepOpenSelect`    | Boolean; keep open on item select; `keep-open-select` as an attribute
`keepOpenClickAway` | Boolean; keep open on outside click; `keep-open-click-away` as an attribute
`noFocusControl`    | Boolean; skip `ariaActiveDescendantElement` tracking; `no-focus-control` as an attribute
`tabIndex`          | Number; tabindex of the inner container; `0` by default; `data-tabindex` as an attribute
`$menu`             | The inner container element
`$items`            | Array of active `MenuItem`s
