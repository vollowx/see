# `Dialog`

The dialog is always a modal dialog. Calling `show()` auto-focuses the first
element with `[autofocus]` or the first tabbable element inside.

## CSS Parts

| name     | description                   |
| ---      | ---                           |
| `dialog` | The native `<dialog>` element |

## Properties

| name      | description |
| ---       | ---         |
| `$dialog` |             |

## Methods

| signature                  | description |
| ---                        | ---         |
| `show() -> Promise<void>`  |             |
| `close() -> Promise<void>` |             |
