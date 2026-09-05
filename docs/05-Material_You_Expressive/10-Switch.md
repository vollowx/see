---
title: Switch component - seele/m3
components:
  - m3/switch/switch
---

# Switch

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/switch/switch.js';
```

Switches are not form element, for a two-state toggle in a form, use
[checkboxes](./10-Checkbox.md) instead.

<!-- @show -->

```html
<md-switch aria-label="Dark mode"></md-switch>

<label>
  Wi-Fi
  <md-switch checked></md-switch>
</label>

<label for="switch-bluetooth">Bluetooth</label>
<md-switch id="switch-bluetooth" icons checked-icon-only></md-switch>
```

Note that switches are not automatically labelled by `<label>` elements and
always need an `aria-label`.

## `M3Switch`

- Inherits [`ToggleButton`](../04-Base/10-ToggleButton.md)

### CSS Parts

| name       | description                           |
| ---        | ---                                   |
| `thumb`    |                                       |
| `icons`    | Container for both on/off icons       |
| `icon-on`  | SVG shown in the thumb when checked   |
| `icon-off` | SVG shown in the thumb when unchecked |

### Properties

| name              | description                                                                             |
| ---               | ---                                                                                     |
| `icons`           | Reflected boolean; show icons inside the thumb                                          |
| `checkedIconOnly` | Reflected boolean; only show the icon when checked; `checked-icon-only` as an attribute |
| `$ripple`         |                                                                                         |
| `$thumb`          |                                                                                         |

[overview]: https://m3.material.io/components/switch/overview
