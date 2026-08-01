---
components:
  - m3/button/common-button-toggle
  - m3/button/icon-button-toggle
  - m3/button-group/standard-button-group
  - m3/button-group/connected-button-group
---

# Button group

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/button-group/standard-button-group.js';
import '@vollowx/seele/m3/button-group/connected-button-group.js';
```

## Stadard button group

<!-- @show -->

```html
<md-button-group>
  <md-icon-button-toggle variant="filled">
    <iconify-icon icon="material-symbols:bluetooth-disabled"></iconify-icon>
    <iconify-icon icon="material-symbols:bluetooth" slot="checked"></iconify-icon>
  </md-icon-button-toggle>

  <md-icon-button-toggle variant="filled" width="wide">
    <iconify-icon icon="material-symbols:alarm-off"></iconify-icon>
    <iconify-icon icon="material-symbols:alarm" slot="checked"></iconify-icon>
  </md-icon-button-toggle>

  <md-button-toggle>
    <iconify-icon icon="material-symbols:do-not-disturb-off-outline" slot="icon"></iconify-icon>
    <iconify-icon icon="material-symbols:do-not-disturb-on-outline" slot="icon-checked"></iconify-icon>
    <span>Focus</span>
    <span slot="checked">Focus</span>
  </md-button-toggle>

  <md-icon-button-toggle variant="filled" width="narrow">
    <iconify-icon icon="material-symbols:flashlight-off-outline"></iconify-icon>
    <iconify-icon icon="material-symbols:flashlight-on-outline" slot="checked"></iconify-icon>
  </md-icon-button-toggle>

  <md-icon-button-toggle variant="filled" checked>
    <iconify-icon icon="material-symbols:wifi-off"></iconify-icon>
    <iconify-icon icon="material-symbols:wifi" slot="checked"></iconify-icon>
  </md-icon-button-toggle>
</md-button-group>
```

## Connected button group

<!-- @show -->

```html
<md-connected-button-group multiple style="width: min(100%, 600px)">
  <md-button-toggle variant="tonal" size="xs">
    James May
    <span slot="checked">James May</span>
  </md-button-toggle>
  <md-button-toggle variant="tonal" size="xs">
    Richard Hammond
    <span slot="checked">Richard Hammond</span>
  </md-button-toggle>
  <md-button-toggle variant="tonal" size="xs">
    Jeremy Clarkson
    <span slot="checked">Jeremy Clarkson</span>
  </md-button-toggle>
  <md-button-toggle variant="tonal" size="xs">
    Mr. William
    <span slot="checked">Mr. William</span>
  </md-button-toggle>
</md-connected-button-group>
```

[overview]: https://m3.material.io/components/button-groups/overview
