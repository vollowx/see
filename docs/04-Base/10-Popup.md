# `Popup`

- Mixes [`InternalsAttached`](./20-InternalsAttached.md)
- Mixes [`Attachable`](./20-Attachable.md)

Positioned floating container that anchors to a control element via
[`Attachable`](./20-Attachable.md). Uses the native `popover` attribute and
[floating-ui] for alignment.

## Properties

| name             | description                                                                             |
| ---              | ---                                                                                     |
| `open`           | Reflected boolean                                                                       |
| `noFocusControl` | Boolean; skip auto-focus management; `no-focus-control` as an attribute                 |
| `align`          | String; [floating-ui Placement][placement]; `bottom-start` by default                   |
| `strategy`       | String; `absolute` or `fixed`; `absolute` by default                                    |
| `offset`         | Number; pixel distance from anchor; `0` by default                                      |
| `windowPadding`  | Number; minimum distance from viewport edge; `8` by default; `window-padding` as attr   |

## Methods

| signature                   | description                  |
| ---                         | ---                          |
| `show() -> Promise<void>`   |                              |
| `hide() -> Promise<void>`   |                              |
| `toggle() -> Promise<void>` | Toggle between show and hide |

[floating-ui]: https://floating-ui.com/
[placement]: https://floating-ui.com/docs/computePosition#placement
