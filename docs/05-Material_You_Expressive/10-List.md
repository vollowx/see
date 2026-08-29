---
components:
  - m3/list/list-item
  - m3/list/list
---

# List

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/list/list-item.js';
import '@vollowx/seele/m3/list/list.js';
```

<!-- @show -->

```html
<md-list style="max-width: 300px">
  <md-list-item>List item 1</md-list-item>
  <md-list-item>List item 2</md-list-item>
  <md-list-item selected>List item 3</md-list-item>
  <md-list-item disabled>List item 4</md-list-item>
</md-list>
```

## `M3List`

- Inherits [`List`](../04-Base/10-List.md)

### Slots

| name | description |
| ---  | ---         |
|      | List items  |

### Properties

| name  | description |
| ---   | ---         |
| `color` | Reflected string |

## `M3ListItem`

- Inherits [`ListItem`](../04-Base/10-ListItem.md)

### Slots

| name                       | description     |
| ---                        | ---             |
|                            | Primary content |
| `start`                    |                 |
| `overline`                 |                 |
| `headline`                 |                 |
| `supporting-text`          |                 |
| `trailing-supporting-text` |                 |
| `end`                      |                 |

### Properties

TODO: prefix with $

| name        | description |
| ---         | ---         |
| `ripple`    |             |
| `focusRing` |             |

[overview]: https://m3.material.io/components/lists/overview
