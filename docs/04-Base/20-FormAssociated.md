# `FormAssociated`

Accepts only [`InternalsAttached`](./20-InternalsAttached.md) elements.

## Properties

They all appear on native form associated elements, better check one of those,
like [`<input>`](input-element).

name                | description
---                 | ---
`form`              |
`labels`            |
`name`              |
`disabled`          |
`validity`          |
`validationMessage` |
`willValidate`      |

## Methods

signature                                         | description
---                                               | ---
`formDisabledCallback(disabled: boolean) -> null` |
`checkValidity() -> null`                         |
`reportValidity() -> null`                        |

For elements mixing this in, they should also call
`this[internals].setFormValue(value: any)` when they are in forms, and provide
`formResetCallback()` and `formStateRestoreCallback(state: any, reason: string)`
to handle form reset and restoration/auto-fills.

[input-element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)
