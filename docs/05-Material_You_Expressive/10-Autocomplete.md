---
components:
  - m3/select/option
  - m3/text-field/outlined-text-field
  - m3/autocomplete/autocomplete
---

# Autocomplete

```typescript
import '@vollowx/seele/m3/select/option.js';
import '@vollowx/seele/m3/text-field/outlined-text-field.js';
import '@vollowx/seele/m3/autocomplete/autocomplete.js';
```

<!-- @show -->

```html
<md-autocomplete mode="both" quick style="width: 300px">
  <md-outlined-text-field slot="input" label="Le Movies"
                          placeholder="What d'you wanna watch?"></md-outlined-text-field>
  <md-option>The Shawshank Redemption</md-option>
  <md-option>The Godfather</md-option>
  <md-option>The Godfather: Part II</md-option>
  <md-option>The Dark Knight</md-option>
  <md-option>12 Angry Men</md-option>
  <md-option>Schindler's List</md-option>
  <md-option>Pulp Fiction</md-option>
  <md-option>The Lord of the Rings: The Return of the King</md-option>
  <md-option>The Good, the Bad and the Ugly</md-option>
  <md-option>Fight Club</md-option>
</md-autocomplete>
```

## `M3Autocomplete`

- Inherits [`Autocomplete`](../04-Base/10-Autocomplete.md)

### Slots

| name    | description       |
| ---     | ---               |
| `input` | The input field   |
|         | Options to select |

### Properties

| name    | description                 |
| ---     | ---                         |
| `quick` | Boolean; `false` by default |
