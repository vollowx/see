---
components:
  - m3/switch/switch
---

# Switch

- [Material Design](overview)

```typescript
import '@vollow/seele/m3/slide/slider.js';
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
<md-switch id="switch-bluetooth" icons checkedicononly></md-switch>
```

Note that switches are not automatically labelled by `<label>` elements and
always need an `aria-label`.

## `M3Switch`

- Inherits [`ToggleButton`](../04-Base/10-ToggleButton.md)

[overview]: https://m3.material.io/components/switch/overview
