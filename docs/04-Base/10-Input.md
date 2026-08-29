# `Input`

- Mixes [`InternalsAttached`](./20-InternalsAttached.md)
- Mixes [`FocusDelegated`](./20-FocusDelegated.md)
- Mixes [`FormAssociated`](./20-FormAssociated.md)

## Events

| name     | description |
| ---      | ---         |
| `change` |             |

## Properties

name                 | description
---                  | ---
`value`              |
`type`               | Reflected string; `text` by default; use `textarea` to render a `<textarea>`
`placeholder`        | Reflected string
`required`           | Reflected boolean
`readOnly`           | Reflected boolean
`multiple`           | Reflected boolean; allows multiple values (e.g. email)
`min`                |
`max`                |
`step`               |
`minLength`          | Number; `-1` means not set
`maxLength`          | Number; `-1` means not set
`pattern`            | String; regex pattern
`autocomplete`       | Reflected string
`focused`            | Reflected boolean; `true` while the inner input has focus
`$inputOrTextarea`   | The inner `<input>` or `<textarea>` element

## Methods

| signature              | description                    |
| ---                    | ---                            |
| `select() -> void`     | Selects all text in the input  |
| `stepUp(n?) -> void`   | Increments value by `step * n` |
| `stepDown(n?) -> void` | Decrements value by `step * n` |
