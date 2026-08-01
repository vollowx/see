---
components:
  - m3/button/common-button
  - m3/menu/menu-item
  - m3/menu/menu
---

# Menu

- [Material Design](overview)

```typescript
import '@vollowx/seele/m3/menu/menu-item.js';
import '@vollowx/seele/m3/menu/menu.js';
```

<!-- @show -->

```html
<md-button id="someButton">File</md-button>
<md-menu id="someMenu" for="someButton" color="vibrant">
  <md-menu-item>New Text File</md-menu-item>
  <md-menu-item>
    New File...
    <span slot="supporting-text">Not so supporting texts</span>
  </md-menu-item>
  <md-menu-item>
    <span slot="overline">Over it</span>
    New Window
    <iconify-icon slot="end" icon="material-symbols:window"></iconify-icon>
  </md-menu-item>
  <md-divider inset></md-divider>
  <md-menu-item>Open File...</md-menu-item>
  <md-menu-item>Open Folder...</md-menu-item>
  <md-divider inset></md-divider>
  <md-menu-item selected>Save</md-menu-item>
  <md-menu-item>Save As...</md-menu-item>
</md-menu>

<script type="module">
someButton.addEventListener('click', () => {
  someMenu.open = !someMenu.open;
});
</script>
```

## `M3Menu`

- Inherits [`Menu`](../04-Base/10-Menu.md)

### Properties

| name    | description                                                      |
| ---     | ---                                                              |
| `color` | Reflected string; `standard` or `vibrant`; `standard` by default |

## `M3MenuItem`

- Inherits [`M3ListItem`](./10-List.md#m3listitem)
- Mixes [`MenuItemMixin`](../04-Base/20-MenuItemMixin.md)

[overview]: https://m3.material.io/components/menus/overview
