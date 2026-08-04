---
components:
  - m3/tab/tab
  - m3/tab/secondary-tab
  - m3/tab/tab-panel
  - m3/tab/tabs
---

# Tabs

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/tab/tab.js';
import '@vollowx/seele/m3/tab/secondary-tab.js';
import '@vollowx/seele/m3/tab/tab-panel.js';
import '@vollowx/seele/m3/tab/tabs.js';
```

<!-- @show -->

```html
<md-tabs iconsabove selected="2" style="width: 100%">
  <md-tab value="1">
    <iconify-icon slot="icon" icon="material-symbols:search"></iconify-icon>
    J. Clarkson
  </md-tab>
  <md-tab value="2" selected>
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
  <md-tab-panel value="1">
    <p>Jeremy Clarkson</p>
  </md-tab-panel>
  <md-tab-panel value="2" selected>
    <p>James May</p>
  </md-tab-panel>
  <md-tab-panel value="3">
    <p>Richard Hammond</p>
  </md-tab-panel>
  <md-tab-panel value="4">
    <p>Le William</p>
  </md-tab-panel>
</md-tabs>
```

<!-- @show -->

```html
<md-tabs switch="auto" selected="3" style="width: 100%">
  <md-secondary-tab value="1">
    <iconify-icon slot="icon" icon="material-symbols:search"></iconify-icon>
    Tab 1
  </md-secondary-tab>
  <md-secondary-tab value="2">
    <iconify-icon slot="icon" icon="material-symbols:search"></iconify-icon>
    Tab 2
  </md-secondary-tab>
  <md-secondary-tab value="3" selected>
    <iconify-icon slot="icon" icon="material-symbols:search"></iconify-icon>
    Tab 3
  </md-secondary-tab>
  <md-secondary-tab value="4">
    <iconify-icon slot="icon" icon="material-symbols:search"></iconify-icon>
    Tab 4
  </md-secondary-tab>
  <md-tab-panel value="1">
    <p>J. Clarkson</p>
  </md-tab-panel>
  <md-tab-panel value="2">
    <p>J. Boar</p>
  </md-tab-panel>
  <md-tab-panel value="3" selected>
    <p>R. Ham</p>
  </md-tab-panel>
  <md-tab-panel value="4">
    <p>Le William</p>
  </md-tab-panel>
</md-tabs>
```

The `selected` on `<md-tabs>` is the effective one, the ones on `<md-tab>` and
`<md-tab-panel>` are for better server-side rendering, and can be removed if you
do not use SSR at all. Without them, we cannot show the selected tab or tab
panel before hydration, which is a Lit SSR limitation - you cannot query parent
or child elements during SSR.

## `M3Tabs`

- Inherits [`Tabs`](../04-Base/10-Tabs.md)

### Properties

| name         | description                                      |
| ---          | ---                                              |
| `switch`     | Reflected string; `auto` or `manual`             |
| `selected`   | Reflected string                                 |
| `iconsAbove` | Reflected boolean; `icons-above` as an attribute |

## `M3Tab` and `M3SecondaryTab`

- `M3Tab` inherits [`Tab`](../04-Base/10-Tab.md)
- `M3SecondaryTab` inherits `M3Tab`

### Slots

| name   | description |
| ---    | ---         |
|        | Label       |
| `icon` |             |

## `M3TabPanel`

- Inherits [`TabPanel`](../04-Base/10-TabPanel.md)

[overview]: https://m3.material.io/components/tabs/overview
