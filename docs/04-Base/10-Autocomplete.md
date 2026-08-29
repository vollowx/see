# `Autocomplete`

- Mixes [`InternalsAttached`](./20-InternalsAttached.md)
- Mixes [`FocusDelegated`](./20-FocusDelegated.md)

## Slots

| name    | description                     |
| ---     | ---                             |
| `input` | The input element               |
|         | Option elements                 |

## Properties

name              | description
---               | ---
`open`            | Boolean
`quick`           | Boolean; skip open animation
`offset`          | Number; pixel distance from anchor; `0` by default
`align`           | Reflected string; floating-ui placement; `bottom-start` by default
`alignStrategy`   | Reflected string; `absolute` or `fixed`; `absolute` by default; `align-strategy` as an attribute
`keepOpenSelect`  | Boolean; `keep-open-select` as an attribute
`mode`            | String; `none`, `list` or `both`; controls filtering and inline completion
`$menu`           | The inner menu element

## Methods

| signature                        | description                                             |
| ---                              | ---                                                     |
| `renderMenu() -> TemplateResult` | Override to render a custom menu inside the component   |
