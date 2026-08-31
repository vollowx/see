# `Menu`

- Mixes [`InternalsAttached`](./20-InternalsAttached.md)

## CSS Parts

| name    | description        |
| ---     | ---                |
| `items` | The slot container |

## Events

| name                 | description                                                                                          |
| ---                  | ---                                                                                                  |
| `action`             | `detail: { item, index }`                                                                            |
| `item-focus`         | `detail: { item, index }`                                                                            |
| `request-popup-hide` | Fired after an action when `keepOpenAction` is `false`; the parent `Popup` listens for this to close |

## Properties

| name             | description                                                                             |
| ---              | ---                                                                                     |
| `keepOpenAction` | Boolean; keep the menu from requesting popup hide on action; `keep-open-action` as attr |
| `bare`           | Reflected boolean; strip default menu styling                                           |
| `$items`         | Array of currently active `MenuItem`s                                                   |
| `currentIndex`   | Number; index of the focused item; `-1` if none                                         |

## Methods

| signature                                     | description                                                          |
| ---                                           | ---                                                                  |
| `focusFirstItem() -> void`                    |                                                                      |
| `focusLastItem() -> void`                     |                                                                      |
| `focusItem(item: MenuItem) -> void`           |                                                                      |
| `handleKeyDown(event: KeyboardEvent) -> void` | Process keyboard navigation; meant to be called by parent components |
