---
title: Checkbox component - seele/m3
components:
  - m3/checkbox/checkbox
---

# Checkbox

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/checkbox/checkbox.js';
```

<!-- @show -->

```html
<md-checkbox aria-label="View all"></md-checkbox>

<label>
  <md-checkbox
    checked
    aria-label="Pop">
  </md-checkbox>
  Recommended usage
</label>

<md-checkbox
  indeterminate
  aria-label="Agree to terms and conditions"
  id="checkbox1">
</md-checkbox>
<label for="checkbox1">Not recommended like this</label>
```

Note that checkboxes are not automatically labelled by `<label>` elements and
always need an `aria-label`.

## `M3Checkbox`

- Inherits [`Checkbox`](../04-Base/10-Checkbox.md)

### CSS Parts

name         | description
---          | ---
`icon`       |
`mark`       | The checkmark container
`mark-short` | Short leg of the mark
`mark-long`  | Long leg of the mark

### Properties

name      | description
---       | ---
`error`   | Reflected boolean; changes color to error state
`$ripple` |

[overview]: https://m3.material.io/components/checkbox/overview
