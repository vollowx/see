# Dialog

```typescript
import '@vollow/seele/m3/dialog/dialog.js';
```

```html
<md-button variant="filled" onclick="dialog.show()">
  Discard Changes
</md-button>

<md-dialog id="dialog">
  Discard draft?

  <div slot="actions">
    <md-button variant="text" onclick="dialog.close()">
      Cancel
    </md-button>
    <md-button variant="text" onclick="dialog.close()">
      Discard
    </md-button>
  </div>
</md-dialog>
```

## `M3Dialog`

- Inherits [`Dialog`](../04-Base/10-Dialog.md)

### Slots

| name | description |
| --- | --- |
| `icon` | |
| `headline` | |
| | Content |
| `actions` | Should be a `<div>` with buttons inside |

### Parts

| name | description |
| --- | --- |
| `container` | |
| `headline` | |
| `content` | |
| `actions` | |

### Properties

| name | description |
| --- | --- |
| `$container` | |
| `$body` | |
| `$actions` | |
| `$actionsPlaceholder` | Used to do layout calc in place of `$actions` |
| `$scrim` | Scrim behind the dialog |

### Methods

| signature | description |
| --- | --- |
| `open() -> null` | |
| `close() -> null` | |
