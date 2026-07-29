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
import '@vollow/seele/m3/button-group/standard-button-group.js';
import '@vollow/seele/m3/button-group/connected-button-group.js';
```

## Stadard button group

<!-- @show -->

```html
<md-button-group>
  <md-icon-button-toggle variant="filled">
    <md-icon>bluetooth_disabled</md-icon>
    <md-icon slot="checked">bluetooth</md-icon>
  </md-icon-button-toggle>

  <md-icon-button-toggle variant="filled" width="wide">
    <md-icon>alarm</md-icon>
    <md-icon slot="checked">alarm</md-icon>
  </md-icon-button-toggle>

  <md-button-toggle>
    <md-icon slot="icon">do_not_disturb_on</md-icon>
    <md-icon slot="icon-checked">do_not_disturb_on</md-icon>
    <span>Focus</span>
    <span slot="checked">Focus</span>
  </md-button-toggle>

  <md-icon-button-toggle variant="filled" width="narrow">
    <md-icon>flashlight_off</md-icon>
    <md-icon slot="checked">flashlight_on</md-icon>
  </md-icon-button-toggle>

  <md-icon-button-toggle variant="filled" checked>
    <md-icon>wifi_off</md-icon>
    <md-icon slot="checked">wifi</md-icon>
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
