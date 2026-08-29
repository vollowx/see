---
components:
  - m3/navigation/navigation-rail-item
  - m3/navigation/navigation-rail
---

# Navigation rail

- WIP components, paths and API might change
- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/navigation/navigation-rail-item.js';
import '@vollowx/seele/m3/navigation/navigation-rail.js';
```

## `M3NavigationRail`

- Inherits `LitElement`

### Slots

| name   | description                                     |
| ---    | ---                                             |
|        | `md-nav-rail-item` elements                     |
| `menu` | Optional icon button for expanding the nav rail |
| `fab`  | Optional FAB                                    |

### Properties

| name      | description                      |
| ---       | ---                              |
| `$items`  | All `md-nav-rail-item` elements  |

## `M3NavigationRailItem`

- Inherits [`Button`](../04-Base/10-Button.md)

### Slots

| name     | description                           |
| ---      | ---                                   |
|          | Icon (default state)                  |
| `active` | Icon shown when `active` is true      |

### Properties

| name        | description                              |
| ---         | ---                                      |
| `label`     | Reflected string; also used as `aria-label` |
| `active`    | Reflected boolean; marks current item    |
| `$focusRing` |                                         |
| `$ripple`   |                                          |

[overview]: https://m3.material.io/components/navigation-rail/overview
