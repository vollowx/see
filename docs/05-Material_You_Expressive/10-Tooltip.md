---
components:
  - m3/button/common-button
  - m3/button/icon-button
  - m3/tooltip/tooltip
---

# Tooltip

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/tooltip/tooltip.js';
```

<!-- @show -->

```html
<md-icon-button id="anchor-1">
  <iconify-icon icon="material-symbols:search"></iconify-icon>
</md-icon-button>
<md-tooltip for="anchor-1">Search for contact</md-tooltip>
<md-icon-button id="anchor-2">
  <iconify-icon icon="material-symbols:settings"></iconify-icon>
</md-icon-button>
<md-tooltip for="anchor-2">Settings</md-tooltip>
<md-button id="anchor-3">
  Max Width
  <iconify-icon slot="icon" icon="material-symbols:width"></iconify-icon>
</md-button>
<md-tooltip for="anchor-3">
  Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel
  aliquam tellus. Praesent non nunc mollis, fermentum neque at, semper arcu.
  Nullam eget est sed sem iaculis gravida eget vitae justo.
</md-tooltip>
```

## `M3Tooltip`

- Inherits [`Tooltip`](../04-Base/10-Tooltip.md)

[overview]: https://m3.material.io/components/tooltips/overview
