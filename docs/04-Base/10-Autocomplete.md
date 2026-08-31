# `Autocomplete`

- Mixes [`InternalsAttached`](./20-InternalsAttached.md)
- Mixes [`FocusDelegated`](./20-FocusDelegated.md)

## Slots

| name    | description       |
| ---     | ---               |
| `input` | The input element |
|         | Option elements   |

## Properties

| name     | description                                                                |
| ---      | ---                                                                        |
| `open`   |                                                                            |
| `mode`   | String; `none`, `list` or `both`; controls filtering and inline completion |
| `$popup` | The inner popup element                                                    |
| `$menu`  | The inner menu element                                                     |

## Methods

| signature                        | description                                           |
| ---                              | ---                                                   |
| `renderMenu() -> TemplateResult` | Override to render a custom menu inside the component |
