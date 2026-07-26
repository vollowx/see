# Material You Expressive

Components and other assets live in `@/src/m3/`.

## Systems

seele Material You Expressive components use CSS variables for styling. To
include the systems for them, add this to your style files.

```css
@import '@vollowx/seele/m3/systems/base.css';
/* This includes basic system variables including elevation system and
   typography system */
@import '@vollowx/seele/m3/systems/defaults.css';
/* (Optional) This includes basic styling for body, selection and links */
```

Note that there is **no** default color system and motion physics system to
have more flexibility and reduce redundant code. Below is how you can add them.

### Color

You can use the official [Material Theme Builder](mat-theme-builder).
Export with "Web (CSS)" option, the CSS files contains the desired CSS
variables.

You can also find some references in `@/dev/shared.css`.

### Motion Physics

Add either of them to where you want them to take effect, for example `:root`.

**Expressive** motion scheme:

```css
.selector {
  --md-sys-motion-spatial-fast: cubic-bezier(0.42, 1.67, 0.21, 0.9);
  --md-sys-motion-spatial-fast-duration: 350ms;
  --md-sys-motion-spatial-default: cubic-bezier(0.38, 1.21, 0.22, 1);
  --md-sys-motion-spatial-default-duration: 500ms;
  --md-sys-motion-spatial-slow: cubic-bezier(0.39, 1.29, 0.35, 0.98);
  --md-sys-motion-spatial-slow-duration: 650ms;

  --md-sys-motion-effects-fast: cubic-bezier(0.31, 0.94, 0.34, 1);
  --md-sys-motion-effects-fast-duration: 150ms;
  --md-sys-motion-effects-default: cubic-bezier(0.34, 0.8, 0.34, 1);
  --md-sys-motion-effects-default-duration: 200ms;
  --md-sys-motion-effects-slow: cubic-bezier(0.34, 0.88, 0.34, 1);
  --md-sys-motion-effects-slow-duration: 300ms;
}
```

**Standard** motion scheme:

```css
.selector {
  --md-sys-motion-spatial-fast: cubic-bezier(0.27, 1.06, 0.18, 1);
  --md-sys-motion-spatial-fast-duration: 350ms;
  --md-sys-motion-spatial-default: cubic-bezier(0.27, 1.06, 0.18, 1);
  --md-sys-motion-spatial-default-duration: 500ms;
  --md-sys-motion-spatial-slow: cubic-bezier(0.27, 1.06, 0.18, 1);
  --md-sys-motion-spatial-slow-duration: 750ms;

  --md-sys-motion-effects-fast: cubic-bezier(0.31, 0.94, 0.34, 1);
  --md-sys-motion-effects-fast-duration: 150ms;
  --md-sys-motion-effects-default: cubic-bezier(0.34, 0.8, 0.34, 1);
  --md-sys-motion-effects-default-duration: 200ms;
  --md-sys-motion-effects-slow: cubic-bezier(0.34, 0.88, 0.34, 1);
  --md-sys-motion-effects-slow-duration: 300ms;
}
```

## Components

### Button Group

```typescript
import '@vollow/seele/m3/button-group/standard-button-group.js';
// import '@vollow/seele/m3/button-group/connected-button-group.js';
// TODO: will be md-connected-button-group
```

```html
<md-button-group>
  <md-icon-button-toggle variant="filled">
    <md-icon>bluetooth_disabled</md-icon>
    <md-icon slot="checked">bluetooth</md-icon>
  </md-icon-button-toggle>

  <md-icon-button-toggle variant="filled" width="wide">
    <md-icon>alarm</md-icon>
    <md-icon slot="checked">alarm</md-icon>
  </md-icon-button-toggle>

  <md-button-toggle>
    <md-icon slot="icon">do_not_disturb_on</md-icon>
    <md-icon slot="icon-checked">do_not_disturb_on</md-icon>
    <span>Focus</span>
    <span slot="checked">Focus</span>
  </md-button-toggle>

  <md-icon-button-toggle variant="filled" width="narrow">
    <md-icon>flashlight_off</md-icon>
    <md-icon slot="checked">flashlight_on</md-icon>
  </md-icon-button-toggle>

  <md-icon-button-toggle variant="filled" checked>
    <md-icon>wifi_off</md-icon>
    <md-icon slot="checked">wifi</md-icon>
  </md-icon-button-toggle>
</md-button-group>
```

### Dialog

```typescript
import '@vollow/seele/m3/dialog/dialog.js';
```

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

### Loading Indicator

```typescript
import '@vollow/seele/m3/loading-indicator/loading-indicator.js';
```

```html
<md-loading aria-label="Loading pictures"></md-loading>
<md-loading aria-label="Loading pictures" contained style="width: 64px;"></md-loading>
```

Loading indicators have their roles set to `progressbar` by default, you should
write a `aria-label` to add semantic meaning to them.

[mat-theme-builder]: https://material-foundation.github.io/material-theme-builder/
