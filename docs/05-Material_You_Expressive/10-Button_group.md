# Button group

- [Material Design](overview)

```typescript
import '@vollow/seele/m3/button-group/standard-button-group.js';
// import '@vollow/seele/m3/button-group/connected-button-group.js';
// TODO: will be md-connected-button-group
```

## Stadard button group

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

[overview]: https://m3.material.io/components/button-groups/overview
