# Dialog

- [Material Design](overview)

```typescript
import '@vollow/seele/m3/dialog/dialog.js';
```

<!-- @show -->

```html
<md-button variant="filled" onclick="dialogDiscard.show()">
  Discard Changes
</md-button>

<md-dialog id="dialogDiscard">
  Discard draft?

  <div slot="actions">
    <md-button variant="text" onclick="dialogDiscard.close()">
      Cancel
    </md-button>
    <md-button variant="text" onclick="dialogDiscard.close()">
      Discard
    </md-button>
  </div>
</md-dialog>
```

<!-- @show -->

```html
<md-button variant="filled" onclick="dialogDelete.show()">Delete All Media</md-button>

<md-dialog id="dialogDelete">
  <md-icon slot="icon">edit</md-icon>
  <h2 slot="headline">Confirm Deletion</h2>
  <p style="margin: 0">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lorem dui,
    tempus vitae mauris vel, ornare suscipit lectus. Nunc non viverra nisl,
    eget blandit nisl. Aenean tempor finibus lectus, et pulvinar risus
    ultricies non. Sed aliquam convallis ultrices. Sed non volutpat felis,
    ut iaculis augue. Nulla consectetur, nibh vitae commodo bibendum, justo
    tellus tempor odio, a fringilla ligula quam et urna. Donec laoreet, urna
    eu rhoncus mollis, risus lorem vestibulum nisl, at consequat elit ex id
    urna. Suspendisse risus enim, sollicitudin a iaculis vel, imperdiet in
    metus. Sed massa nulla, fermentum vel arcu ac, condimentum efficitur
    nulla. Cras rhoncus turpis non arcu feugiat, in consectetur erat
    pretium. Aenean fermentum arcu nec turpis vehicula finibus. Nulla
    ultrices dolor vel tortor bibendum rutrum. Morbi laoreet quam ipsum,
    quis molestie arcu volutpat a. Integer et odio purus.
  </p>
  <div slot="actions">
    <md-button variant="text" onclick="dialogDelete.close()">
      Cancel
    </md-button>
    <md-button onclick="dialogDelete.close()">
      Delete
    </md-button>
  </div>
</md-dialog>
```

## `M3Dialog`

- Inherits [`Dialog`](../04-Base/10-Dialog.md)

### Slots

| name       | description                             |
| ---        | ---                                     |
| `icon`     |                                         |
| `headline` |                                         |
|            | Content                                 |
| `actions`  | Should be a `<div>` with buttons inside |

### Parts

| name        | description |
| ---         | ---         |
| `container` |             |
| `headline`  |             |
| `content`   |             |
| `actions`   |             |

### Properties

| name                  | description                                   |
| ---                   | ---                                           |
| `$container`          |                                               |
| `$body`               |                                               |
| `$actions`            |                                               |
| `$actionsPlaceholder` | Used to do layout calc in place of `$actions` |
| `$scrim`              | Scrim behind the dialog                       |

[overview]: https://m3.material.io/components/dialogs/overview
