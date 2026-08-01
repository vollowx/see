---
components:
  - m3/tab/tab
  - m3/tab/tab-panel
  - m3/tab/tabs
---

# Tabs

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/tab/tab.js';
import '@vollowx/seele/m3/tab/tab-panel.js';
import '@vollowx/seele/m3/tab/tabs.js';
```

<!-- @show -->

```html
<div style="width: 100%">
  <md-tabs iconsabove selected="2">
    <md-tab value="1">
      <iconify-icon slot="icon" icon="material-symbols:search"></iconify-icon>
      J. Clarkson
    </md-tab>
    <md-tab value="2">
      <iconify-icon slot="icon" icon="material-symbols:search"></iconify-icon>
      J. Boar
    </md-tab>
    <md-tab value="3">
      <iconify-icon slot="icon" icon="material-symbols:search"></iconify-icon>
      R. Ham
    </md-tab>
    <md-tab value="4">
      <iconify-icon slot="icon" icon="material-symbols:search"></iconify-icon>
      Mr. William
    </md-tab>
  </md-tabs>
  <md-tab-panel value="1">
    <p>Jeremy Clarkson</p>
  </md-tab-panel>
  <md-tab-panel value="2">
    <p>James May</p>
  </md-tab-panel>
  <md-tab-panel value="3">
    <p>Richard Hammond</p>
  </md-tab-panel>
  <md-tab-panel value="4">
    <p>Le William</p>
  </md-tab-panel>
</div>
```

<!-- @show -->

```html
<div style="width: 100%">
  <md-tabs secondary switch="auto" selected="3">
    <md-tab value="1">
      <iconify-icon slot="icon" icon="material-symbols:search"></iconify-icon>
      Tab 1
    </md-tab>
    <md-tab value="2">
      <iconify-icon slot="icon" icon="material-symbols:search"></iconify-icon>
      Tab 2
    </md-tab>
    <md-tab value="3">
      <iconify-icon slot="icon" icon="material-symbols:search"></iconify-icon>
      Tab 3
    </md-tab>
    <md-tab value="4">
      <iconify-icon slot="icon" icon="material-symbols:search"></iconify-icon>
      Tab 4
    </md-tab>
  </md-tabs>
  <md-tab-panel value="1">
    <p>J. Clarkson</p>
  </md-tab-panel>
  <md-tab-panel value="2">
    <p>J. Boar</p>
  </md-tab-panel>
  <md-tab-panel value="3">
    <p>R. Ham</p>
  </md-tab-panel>
  <md-tab-panel value="4">
    <p>Le William</p>
  </md-tab-panel>
</div>
```

## `M3Tabs`

- Inherits [`Tabs`](../04-Base/10-Tabs.md)

### Properties

| name        | description                          |
| ---         | ---                                  |
| `switch`    | Reflected string; `auto` or `manual` |
| `selected`  | Reflected string                     |
| `secondary` | Reflected boolean                    |
| `iconsAbove` | Reflected boolean; `icons-above` as an attribute |

## `M3Tab`

- Inherits [`Tab`](../04-Base/10-Tab.md)

### Slots

| name   | description |
| ---    | ---         |
|        | Label       |
| `icon` |             |

## `M3TabPanel`

- Inherits [`TabPanel`](../04-Base/10-TabPanel.md)

[overview]: https://m3.material.io/components/tabs/overview
