---
components:
  - m3/button/common-button
  - m3/button/icon-button
  - m3/button/icon-button-toggle
  - m3/fab/fab
  - m3/toolbar/toolbar
  - m3/tooltip/tooltip
---

# Toolbar

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/toolbar/toolbar.js';
```

<!-- @show -->

```html
<md-toolbar>
  <md-icon-button aria-label="Back">
    <iconify-icon icon="material-symbols:arrow-back"></iconify-icon>
  </md-icon-button>
  <md-icon-button aria-label="Forward">
    <iconify-icon icon="material-symbols:arrow-forward"></iconify-icon>
  </md-icon-button>
  <md-icon-button variant="filled" square aria-label="New tab">
    <iconify-icon icon="material-symbols:add"></iconify-icon>
  </md-icon-button>
  <md-icon-button aria-label="Tabs">
    <iconify-icon icon="material-symbols:tab"></iconify-icon>
  </md-icon-button>
  <md-icon-button aria-label="More options">
    <iconify-icon icon="material-symbols:more-vert"></iconify-icon>
  </md-icon-button>
</md-toolbar>
```

<!-- @show -->

```html
<md-toolbar type="floating">
  <md-icon-button-toggle variant="tonal" checked>
    <iconify-icon aria-label="Unchecked" icon="material-symbols:format-bold"></iconify-icon>
    <iconify-icon slot="checked" aria-label="Checked" icon="material-symbols:format-bold"></iconify-icon>
  </md-icon-button-toggle>
  <md-icon-button-toggle variant="tonal">
    <iconify-icon aria-label="Unchecked" icon="material-symbols:format-italic"></iconify-icon>
    <iconify-icon slot="checked" aria-label="Checked" icon="material-symbols:format-italic"></iconify-icon>
  </md-icon-button-toggle>
  <md-icon-button-toggle variant="tonal">
    <iconify-icon aria-label="Unchecked" icon="material-symbols:format-underlined"></iconify-icon>
    <iconify-icon slot="checked" aria-label="Checked" icon="material-symbols:format-underlined"></iconify-icon>
  </md-icon-button-toggle>
  <md-button>Share</md-button>
</md-toolbar>
```

<!-- @show -->

```html
<md-toolbar type="floating">
  <md-icon-button id="toolbar-archive">
    <iconify-icon icon="material-symbols:archive"></iconify-icon>
  </md-icon-button>
  <md-icon-button id="toolbar-delete">
    <iconify-icon icon="material-symbols:delete"></iconify-icon>
  </md-icon-button>
  <md-icon-button id="toolbar-mail">
    <iconify-icon icon="material-symbols:mail"></iconify-icon>
  </md-icon-button>
  <md-icon-button id="toolbar-snooze">
    <iconify-icon icon="material-symbols:snooze"></iconify-icon>
  </md-icon-button>
  <md-icon-button id="toolbar-more-mailboxes">
    <iconify-icon icon="material-symbols:more-vert"></iconify-icon>
  </md-icon-button>

  <md-tooltip offset="16" for="toolbar-archive">Archive</md-tooltip>
  <md-tooltip offset="16" for="toolbar-delete">Delete</md-tooltip>
  <md-tooltip offset="16" for="toolbar-mail">Mail</md-tooltip>
  <md-tooltip offset="16" for="toolbar-snooze">Snooze</md-tooltip>
  <md-tooltip offset="16" for="toolbar-more-mailboxes">More mailboxes</md-tooltip>

  <md-fab slot="fab" color="tertiary" id="toolbar-reply">
    <iconify-icon icon="material-symbols:reply"></iconify-icon>
  </md-fab>
  <md-tooltip offset="8" for="toolbar-reply">Reply</md-tooltip>
</md-toolbar>
```

## `M3Toolbar`

- Inherits [`LitElement`](lit-ele)
- Mixes [`InternalsAttached`](../04-Base/20-InternalsAttached.md)

### Slots

| name  | description                     |
| ---   | ---                             |
|       | All the common and icon buttons |
| `fab` |                                 |

### CSS Parts

| name        | description                                    |
| ---         | ---                                            |
| `container` | Which contains all the common and icon buttons |
| `fab-slot`  | Which contains the FAB                         |

### Properties

| name          | description                                                           |
| ---           | ---                                                                   |
| `type`        | Reflected string; `docked` or `floating`; `docked` by default         |
| `color`       | Reflected string; `standard` or `vibrant`; `standard` by default      |
| `orientation` | Reflected string; `horizontal` or `vertical`; `horizontal` by default |

[overview]: https://m3.material.io/components/toolbars/overview
[lit-ele]: https://lit.dev/docs/api/LitElement/
