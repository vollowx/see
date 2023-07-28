import {
  html,
  Polymer,
  Base,
  dom,
  mixinBehaviors,
  PolymerElement,
  dedupingMixin,
  useShadow,
  dashToCamelCase,
  FlattenedNodesObserver,
  microTask,
  DomIf,
  afterNextRender,
  Templatizer,
  OptionalMutableDataBehavior,
  animationFrame,
  idlePeriod,
  flush,
  Debouncer,
  enqueueDebouncer,
  matches,
  translate,
  beforeNextRender,
  templatize,
  calculateSplices,
} from 'chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js';
import { addWebUiListener, removeWebUiListener, sendWithPromise } from 'chrome://resources/js/cr.js';
import { loadTimeData } from 'chrome://resources/js/load_time_data.js';
import './strings.m.js';
import { mojo } from 'chrome://resources/mojo/mojo/public/js/bindings.js';
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ const template$8 = html`
  <custom-style>
    <style is="custom-style">
      html {
        /* Material Design color palette for Google products */

        --google-red-100-rgb: 244, 199, 195; /* #f4c7c3 */
        --google-red-100: rgb(var(--google-red-100-rgb));
        --google-red-300-rgb: 230, 124, 115; /* #e67c73 */
        --google-red-300: rgb(var(--google-red-300-rgb));
        --google-red-500-rgb: 219, 68, 55; /* #db4437 */
        --google-red-500: rgb(var(--google-red-500-rgb));
        --google-red-700-rgb: 197, 57, 41; /* #c53929 */
        --google-red-700: rgb(var(--google-red-700-rgb));

        --google-blue-100-rgb: 198, 218, 252; /* #c6dafc */
        --google-blue-100: rgb(var(--google-blue-100-rgb));
        --google-blue-300-rgb: 123, 170, 247; /* #7baaf7 */
        --google-blue-300: rgb(var(--google-blue-300-rgb));
        --google-blue-500-rgb: 66, 133, 244; /* #4285f4 */
        --google-blue-500: rgb(var(--google-blue-500-rgb));
        --google-blue-700-rgb: 51, 103, 214; /* #3367d6 */
        --google-blue-700: rgb(var(--google-blue-700-rgb));

        --google-green-100-rgb: 183, 225, 205; /* #b7e1cd */
        --google-green-100: rgb(var(--google-green-100-rgb));
        --google-green-300-rgb: 87, 187, 138; /* #57bb8a */
        --google-green-300: rgb(var(--google-green-300-rgb));
        --google-green-500-rgb: 15, 157, 88; /* #0f9d58 */
        --google-green-500: rgb(var(--google-green-500-rgb));
        --google-green-700-rgb: 11, 128, 67; /* #0b8043 */
        --google-green-700: rgb(var(--google-green-700-rgb));

        --google-yellow-100-rgb: 252, 232, 178; /* #fce8b2 */
        --google-yellow-100: rgb(var(--google-yellow-100-rgb));
        --google-yellow-300-rgb: 247, 203, 77; /* #f7cb4d */
        --google-yellow-300: rgb(var(--google-yellow-300-rgb));
        --google-yellow-500-rgb: 244, 180, 0; /* #f4b400 */
        --google-yellow-500: rgb(var(--google-yellow-500-rgb));
        --google-yellow-700-rgb: 240, 147, 0; /* #f09300 */
        --google-yellow-700: rgb(var(--google-yellow-700-rgb));

        --google-grey-100-rgb: 245, 245, 245; /* #f5f5f5 */
        --google-grey-100: rgb(var(--google-grey-100-rgb));
        --google-grey-300-rgb: 224, 224, 224; /* #e0e0e0 */
        --google-grey-300: rgb(var(--google-grey-300-rgb));
        --google-grey-500-rgb: 158, 158, 158; /* #9e9e9e */
        --google-grey-500: rgb(var(--google-grey-500-rgb));
        --google-grey-700-rgb: 97, 97, 97; /* #616161 */
        --google-grey-700: rgb(var(--google-grey-700-rgb));

        /* Material Design color palette from online spec document */

        --paper-red-50: #ffebee;
        --paper-red-100: #ffcdd2;
        --paper-red-200: #ef9a9a;
        --paper-red-300: #e57373;
        --paper-red-400: #ef5350;
        --paper-red-500: #f44336;
        --paper-red-600: #e53935;
        --paper-red-700: #d32f2f;
        --paper-red-800: #c62828;
        --paper-red-900: #b71c1c;
        --paper-red-a100: #ff8a80;
        --paper-red-a200: #ff5252;
        --paper-red-a400: #ff1744;
        --paper-red-a700: #d50000;

        --paper-light-blue-50: #e1f5fe;
        --paper-light-blue-100: #b3e5fc;
        --paper-light-blue-200: #81d4fa;
        --paper-light-blue-300: #4fc3f7;
        --paper-light-blue-400: #29b6f6;
        --paper-light-blue-500: #03a9f4;
        --paper-light-blue-600: #039be5;
        --paper-light-blue-700: #0288d1;
        --paper-light-blue-800: #0277bd;
        --paper-light-blue-900: #01579b;
        --paper-light-blue-a100: #80d8ff;
        --paper-light-blue-a200: #40c4ff;
        --paper-light-blue-a400: #00b0ff;
        --paper-light-blue-a700: #0091ea;

        --paper-yellow-50: #fffde7;
        --paper-yellow-100: #fff9c4;
        --paper-yellow-200: #fff59d;
        --paper-yellow-300: #fff176;
        --paper-yellow-400: #ffee58;
        --paper-yellow-500: #ffeb3b;
        --paper-yellow-600: #fdd835;
        --paper-yellow-700: #fbc02d;
        --paper-yellow-800: #f9a825;
        --paper-yellow-900: #f57f17;
        --paper-yellow-a100: #ffff8d;
        --paper-yellow-a200: #ffff00;
        --paper-yellow-a400: #ffea00;
        --paper-yellow-a700: #ffd600;

        --paper-orange-50: #fff3e0;
        --paper-orange-100: #ffe0b2;
        --paper-orange-200: #ffcc80;
        --paper-orange-300: #ffb74d;
        --paper-orange-400: #ffa726;
        --paper-orange-500: #ff9800;
        --paper-orange-600: #fb8c00;
        --paper-orange-700: #f57c00;
        --paper-orange-800: #ef6c00;
        --paper-orange-900: #e65100;
        --paper-orange-a100: #ffd180;
        --paper-orange-a200: #ffab40;
        --paper-orange-a400: #ff9100;
        --paper-orange-a700: #ff6500;

        --paper-grey-50: #fafafa;
        --paper-grey-100: #f5f5f5;
        --paper-grey-200: #eeeeee;
        --paper-grey-300: #e0e0e0;
        --paper-grey-400: #bdbdbd;
        --paper-grey-500: #9e9e9e;
        --paper-grey-600: #757575;
        --paper-grey-700: #616161;
        --paper-grey-800: #424242;
        --paper-grey-900: #212121;

        --paper-blue-grey-50: #eceff1;
        --paper-blue-grey-100: #cfd8dc;
        --paper-blue-grey-200: #b0bec5;
        --paper-blue-grey-300: #90a4ae;
        --paper-blue-grey-400: #78909c;
        --paper-blue-grey-500: #607d8b;
        --paper-blue-grey-600: #546e7a;
        --paper-blue-grey-700: #455a64;
        --paper-blue-grey-800: #37474f;
        --paper-blue-grey-900: #263238;

        /* opacity for dark text on a light background */
        --dark-divider-opacity: 0.12;
        --dark-disabled-opacity: 0.38; /* or hint text or icon */
        --dark-secondary-opacity: 0.54;
        --dark-primary-opacity: 0.87;

        /* opacity for light text on a dark background */
        --light-divider-opacity: 0.12;
        --light-disabled-opacity: 0.3; /* or hint text or icon */
        --light-secondary-opacity: 0.7;
        --light-primary-opacity: 1;
      }
    </style>
  </custom-style>
`;
template$8.setAttribute('style', 'display: none;');
document.head.appendChild(template$8.content);
const template$7 = html`
  <custom-style>
    <style>
      html {
        --google-blue-50-rgb: 232, 240, 254;
        --google-blue-50: rgb(var(--google-blue-50-rgb));
        --google-blue-100-rgb: 210, 227, 252;
        --google-blue-100: rgb(var(--google-blue-100-rgb));
        --google-blue-200-rgb: 174, 203, 250;
        --google-blue-200: rgb(var(--google-blue-200-rgb));
        --google-blue-300-rgb: 138, 180, 248;
        --google-blue-300: rgb(var(--google-blue-300-rgb));
        --google-blue-400-rgb: 102, 157, 246;
        --google-blue-400: rgb(var(--google-blue-400-rgb));
        --google-blue-500-rgb: 66, 133, 244;
        --google-blue-500: rgb(var(--google-blue-500-rgb));
        --google-blue-600-rgb: 26, 115, 232;
        --google-blue-600: rgb(var(--google-blue-600-rgb));
        --google-blue-700-rgb: 25, 103, 210;
        --google-blue-700: rgb(var(--google-blue-700-rgb));
        --google-blue-800-rgb: 24, 90, 188;
        --google-blue-800: rgb(var(--google-blue-800-rgb));
        --google-blue-900-rgb: 23, 78, 166;
        --google-blue-900: rgb(var(--google-blue-900-rgb));
        --google-green-50-rgb: 230, 244, 234;
        --google-green-50: rgb(var(--google-green-50-rgb));
        --google-green-200-rgb: 168, 218, 181;
        --google-green-200: rgb(var(--google-green-200-rgb));
        --google-green-300-rgb: 129, 201, 149;
        --google-green-300: rgb(var(--google-green-300-rgb));
        --google-green-400-rgb: 91, 185, 116;
        --google-green-400: rgb(var(--google-green-400-rgb));
        --google-green-500-rgb: 52, 168, 83;
        --google-green-500: rgb(var(--google-green-500-rgb));
        --google-green-600-rgb: 30, 142, 62;
        --google-green-600: rgb(var(--google-green-600-rgb));
        --google-green-700-rgb: 24, 128, 56;
        --google-green-700: rgb(var(--google-green-700-rgb));
        --google-green-800-rgb: 19, 115, 51;
        --google-green-800: rgb(var(--google-green-800-rgb));
        --google-green-900-rgb: 13, 101, 45;
        --google-green-900: rgb(var(--google-green-900-rgb));
        --google-grey-50-rgb: 248, 249, 250;
        --google-grey-50: rgb(var(--google-grey-50-rgb));
        --google-grey-100-rgb: 241, 243, 244;
        --google-grey-100: rgb(var(--google-grey-100-rgb));
        --google-grey-200-rgb: 232, 234, 237;
        --google-grey-200: rgb(var(--google-grey-200-rgb));
        --google-grey-300-rgb: 218, 220, 224;
        --google-grey-300: rgb(var(--google-grey-300-rgb));
        --google-grey-400-rgb: 189, 193, 198;
        --google-grey-400: rgb(var(--google-grey-400-rgb));
        --google-grey-500-rgb: 154, 160, 166;
        --google-grey-500: rgb(var(--google-grey-500-rgb));
        --google-grey-600-rgb: 128, 134, 139;
        --google-grey-600: rgb(var(--google-grey-600-rgb));
        --google-grey-700-rgb: 95, 99, 104;
        --google-grey-700: rgb(var(--google-grey-700-rgb));
        --google-grey-800-rgb: 60, 64, 67;
        --google-grey-800: rgb(var(--google-grey-800-rgb));
        --google-grey-900-rgb: 32, 33, 36;
        --google-grey-900: rgb(var(--google-grey-900-rgb));
        --google-grey-900-white-4-percent: #292a2d;
        --google-purple-200-rgb: 215, 174, 251;
        --google-purple-200: rgb(var(--google-purple-200-rgb));
        --google-purple-900-rgb: 104, 29, 168;
        --google-purple-900: rgb(var(--google-purple-900-rgb));
        --google-red-300-rgb: 242, 139, 130;
        --google-red-300: rgb(var(--google-red-300-rgb));
        --google-red-500-rgb: 234, 67, 53;
        --google-red-500: rgb(var(--google-red-500-rgb));
        --google-red-600-rgb: 217, 48, 37;
        --google-red-600: rgb(var(--google-red-600-rgb));
        --google-yellow-50-rgb: 254, 247, 224;
        --google-yellow-50: rgb(var(--google-yellow-50-rgb));
        --google-yellow-100-rgb: 254, 239, 195;
        --google-yellow-100: rgb(var(--google-yellow-100-rgb));
        --google-yellow-200-rgb: 253, 226, 147;
        --google-yellow-200: rgb(var(--google-yellow-200-rgb));
        --google-yellow-300-rgb: 253, 214, 51;
        --google-yellow-300: rgb(var(--google-yellow-300-rgb));
        --google-yellow-400-rgb: 252, 201, 52;
        --google-yellow-400: rgb(var(--google-yellow-400-rgb));
        --google-yellow-500-rgb: 251, 188, 4;
        --google-yellow-500: rgb(var(--google-yellow-500-rgb));
        --cr-primary-text-color: var(--google-grey-900);
        --cr-secondary-text-color: var(--google-grey-700);
        --cr-card-background-color: white;
        --cr-shadow-color: var(--google-grey-800);
        --cr-shadow-key-color_: color-mix(in srgb, var(--cr-shadow-color) 30%, transparent);
        --cr-shadow-ambient-color_: color-mix(in srgb, var(--cr-shadow-color) 15%, transparent);
        --cr-elevation-1: var(--cr-shadow-key-color_) 0 1px 2px 0, var(--cr-shadow-ambient-color_) 0 1px 3px 1px;
        --cr-elevation-2: var(--cr-shadow-key-color_) 0 1px 2px 0, var(--cr-shadow-ambient-color_) 0 2px 6px 2px;
        --cr-elevation-3: var(--cr-shadow-key-color_) 0 1px 3px 0, var(--cr-shadow-ambient-color_) 0 4px 8px 3px;
        --cr-elevation-4: var(--cr-shadow-key-color_) 0 2px 3px 0, var(--cr-shadow-ambient-color_) 0 6px 10px 4px;
        --cr-elevation-5: var(--cr-shadow-key-color_) 0 4px 4px 0, var(--cr-shadow-ambient-color_) 0 8px 12px 6px;
        --cr-card-shadow: var(--cr-elevation-2);
        --cr-checked-color: var(--google-blue-600);
        --cr-focused-item-color: var(--google-grey-300);
        --cr-form-field-label-color: var(--google-grey-700);
        --cr-hairline-rgb: 0, 0, 0;
        --cr-iph-anchor-highlight-color: rgba(var(--google-blue-600-rgb), 0.1);
        --cr-link-color: var(--google-blue-700);
        --cr-menu-background-color: white;
        --cr-menu-background-focus-color: var(--google-grey-400);
        --cr-menu-shadow: 0 2px 6px var(--paper-grey-500);
        --cr-separator-color: rgba(0, 0, 0, 0.06);
        --cr-title-text-color: rgb(90, 90, 90);
        --cr-toolbar-background-color: white;
        --cr-hover-background-color: rgba(var(--google-grey-900-rgb), 0.1);
        --cr-active-background-color: rgba(var(--google-grey-900-rgb), 0.16);
        --cr-focus-outline-color: rgba(var(--google-blue-600-rgb), 0.4);
      }
      @media (prefers-color-scheme: dark) {
        html {
          --cr-primary-text-color: var(--google-grey-200);
          --cr-secondary-text-color: var(--google-grey-500);
          --cr-card-background-color: var(--google-grey-900-white-4-percent);
          --cr-card-shadow-color-rgb: 0, 0, 0;
          --cr-checked-color: var(--google-blue-300);
          --cr-focused-item-color: var(--google-grey-800);
          --cr-form-field-label-color: var(--dark-secondary-color);
          --cr-hairline-rgb: 255, 255, 255;
          --cr-iph-anchor-highlight-color: rgba(var(--google-grey-100-rgb), 0.1);
          --cr-link-color: var(--google-blue-300);
          --cr-menu-background-color: var(--google-grey-900);
          --cr-menu-background-focus-color: var(--google-grey-700);
          --cr-menu-background-sheen: rgba(255, 255, 255, 0.06);
          --cr-menu-shadow: rgba(0, 0, 0, 0.3) 0 1px 2px 0, rgba(0, 0, 0, 0.15) 0 3px 6px 2px;
          --cr-separator-color: rgba(255, 255, 255, 0.1);
          --cr-title-text-color: var(--cr-primary-text-color);
          --cr-toolbar-background-color: var(--google-grey-900-white-4-percent);
          --cr-hover-background-color: rgba(255, 255, 255, 0.1);
          --cr-active-background-color: rgba(var(--google-grey-200-rgb), 0.16);
          --cr-focus-outline-color: rgba(var(--google-blue-300-rgb), 0.4);
        }
      }
      @media (forced-colors: active) {
        html {
          --cr-focus-outline-hcm: 2px solid transparent;
          --cr-border-hcm: 2px solid transparent;
        }
      }
      html {
        --cr-button-edge-spacing: 12px;
        --cr-button-height: 32px;
        --cr-controlled-by-spacing: 24px;
        --cr-default-input-max-width: 264px;
        --cr-icon-ripple-size: 36px;
        --cr-icon-ripple-padding: 8px;
        --cr-icon-size: 20px;
        --cr-icon-button-margin-start: 16px;
        --cr-icon-ripple-margin: calc(var(--cr-icon-ripple-padding) * -1);
        --cr-section-min-height: 48px;
        --cr-section-two-line-min-height: 64px;
        --cr-section-padding: 20px;
        --cr-section-vertical-padding: 12px;
        --cr-section-indent-width: 40px;
        --cr-section-indent-padding: calc(var(--cr-section-padding) + var(--cr-section-indent-width));
        --cr-section-vertical-margin: 21px;
        --cr-centered-card-max-width: 680px;
        --cr-centered-card-width-percentage: 0.96;
        --cr-hairline: 1px solid rgba(var(--cr-hairline-rgb), 0.14);
        --cr-separator-height: 1px;
        --cr-separator-line: var(--cr-separator-height) solid var(--cr-separator-color);
        --cr-toolbar-overlay-animation-duration: 150ms;
        --cr-toolbar-height: 56px;
        --cr-container-shadow-height: 6px;
        --cr-container-shadow-margin: calc(-1 * var(--cr-container-shadow-height));
        --cr-container-shadow-max-opacity: 1;
        --cr-card-border-radius: 8px;
        --cr-disabled-opacity: 0.38;
        --cr-form-field-bottom-spacing: 16px;
        --cr-form-field-label-font-size: 0.625rem;
        --cr-form-field-label-height: 1em;
        --cr-form-field-label-line-height: 1;
      }
      html[chrome-refresh-2023] {
        --cr-fallback-color-outline: rgb(116, 119, 117);
        --cr-fallback-color-primary: rgb(11, 87, 208);
        --cr-fallback-color-on-primary: rgb(255, 255, 255);
        --cr-fallback-color-primary-container: rgb(211, 227, 253);
        --cr-fallback-color-on-primary-container: rgb(4, 30, 73);
        --cr-fallback-color-secondary-container: rgb(194, 231, 255);
        --cr-fallback-color-on-secondary-container: rgb(0, 29, 53);
        --cr-fallback-color-neutral-container: rgb(242, 242, 242);
        --cr-fallback-color-surface: rgb(255, 255, 255);
        --cr-fallback-color-on-surface-rgb: 31, 31, 31;
        --cr-fallback-color-on-surface: rgb(var(--cr-fallback-color-on-surface-rgb));
        --cr-fallback-color-surface-variant: rgb(225, 227, 225);
        --cr-fallback-color-on-surface-variant: rgb(68, 71, 70);
        --cr-fallback-color-on-surface-subtle: rgb(71, 71, 71);
        --cr-fallback-color-tonal-container: rgb(211, 227, 253);
        --cr-fallback-color-on-tonal-container: rgb(4, 30, 73);
        --cr-fallback-color-tonal-outline: rgb(168, 199, 250);
        --cr-fallback-color-error: rgb(179, 38, 30);
        --cr-fallback-color-state-on-subtle-rgb: 31, 31, 31;
        --cr-fallback-color-state-hover-on-subtle: rgba(var(--cr-fallback-color-state-on-subtle-rgb), 0.06);
        --cr-fallback-color-state-ripple-neutral-on-subtle: rgba(var(--cr-fallback-color-state-on-subtle-rgb), 0.08);
        --cr-fallback-color-base-container: rgba(105, 145, 214, 0.12);
        --cr-fallback-color-disabled-background: rgba(var(--cr-fallback-color-on-surface-rgb), 0.12);
        --cr-fallback-color-disabled-foreground: rgba(
          var(--cr-fallback-color-on-surface-rgb),
          var(--cr-disabled-opacity)
        );
        --cr-hover-background-color: var(--color-sys-state-hover, rgba(var(--cr-fallback-color-on-surface-rgb), 0.08));
        --cr-active-background-color: var(
          --color-sys-state-pressed,
          rgba(var(--cr-fallback-color-on-surface-rgb), 0.12)
        );
        --cr-focus-outline-color: var(--color-sys-state-focus-ring, var(--cr-fallback-color-primary));
        --cr-primary-text-color: var(--color-primary-foreground, var(--cr-fallback-color-on-surface));
        --cr-secondary-text-color: var(--color-secondary-foreground, var(--cr-fallback-color-on-surface-variant));
        --cr-button-height: 36px;
        --cr-shadow-color: var(--color-sys-shadow, rgb(0, 0, 0));
      }
      @media (prefers-color-scheme: dark) {
        html[chrome-refresh-2023] {
          --cr-fallback-color-outline: rgb(142, 145, 143);
          --cr-fallback-color-primary: rgb(168, 199, 250);
          --cr-fallback-color-on-primary: rgb(6, 46, 111);
          --cr-fallback-color-primary-container: rgb(8, 66, 160);
          --cr-fallback-color-on-primary-container: rgb(211, 227, 253);
          --cr-fallback-color-secondary-container: rgb(0, 74, 119);
          --cr-fallback-color-on-secondary-container: rgb(194, 231, 255);
          --cr-fallback-color-neutral-container: rgb(42, 42, 42);
          --cr-fallback-color-surface: rgb(26, 27, 30);
          --cr-fallback-color-on-surface-rgb: 227, 227, 227;
          --cr-fallback-color-surface-variant: rgb(68, 71, 70);
          --cr-fallback-color-on-surface-variant: rgb(196, 199, 197);
          --cr-fallback-color-on-surface-subtle: rgb(199, 199, 199);
          --cr-fallback-color-tonal-container: rgb(0, 74, 119);
          --cr-fallback-color-on-tonal-container: rgb(194, 231, 255);
          --cr-fallback-color-tonal-outline: rgb(0, 99, 155);
          --cr-fallback-color-error: rgb(242, 184, 181);
          --cr-fallback-color-state-on-subtle-rgb: 253, 252, 251;
          --cr-fallback-color-state-hover-on-subtle: rgba(var(--cr-fallback-color-state-on-subtle-rgb), 0.1);
          --cr-fallback-color-state-ripple-neutral-on-subtle: rgba(var(--cr-fallback-color-state-on-subtle-rgb), 0.16);
          --cr-fallback-color-base-container: rgba(40, 40, 40, 1);
        }
      }
      @media (forced-colors: active) {
        html[chrome-refresh-2023] {
          --cr-fallback-color-disabled-background: Canvas;
          --cr-fallback-color-disabled-foreground: GrayText;
        }
      }
    </style>
  </custom-style>
`;
document.head.appendChild(template$7.content);
// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function assert(value, message) {
  if (value) {
    return;
  }
  throw new Error('Assertion failed' + (message ? `: ${message}` : ''));
}
function assertInstanceof(value, type, message) {
  if (value instanceof type) {
    return;
  }
  throw new Error(message || `Value ${value} is not of type ${type.name || typeof type}`);
}
function assertNotReached(message = 'Unreachable code hit') {
  assert(false, message);
}
// Copyright 2022 The Chromium Authors
function getDeepActiveElement() {
  let a = document.activeElement;
  while (a && a.shadowRoot && a.shadowRoot.activeElement) {
    a = a.shadowRoot.activeElement;
  }
  return a;
}
function isRTL() {
  return document.documentElement.dir === 'rtl';
}
function listenOnce(target, eventNames, callback) {
  const eventNamesArray = Array.isArray(eventNames) ? eventNames : eventNames.split(/ +/);
  const removeAllAndCallCallback = function (event) {
    eventNamesArray.forEach(function (eventName) {
      target.removeEventListener(eventName, removeAllAndCallCallback, false);
    });
    return callback(event);
  };
  eventNamesArray.forEach(function (eventName) {
    target.addEventListener(eventName, removeAllAndCallCallback, false);
  });
}
function hasKeyModifiers(e) {
  return !!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey);
}
function isUndoKeyboardEvent(event) {
  if (event.key !== 'z') {
    return false;
  }
  const excludedModifiers = [event.altKey, event.shiftKey, event.metaKey];
  let targetModifier = event.ctrlKey;
  return targetModifier && !excludedModifiers.some((modifier) => modifier);
}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ class IronMeta {
  constructor(options) {
    IronMeta[' '](options);
    this.type = (options && options.type) || 'default';
    this.key = options && options.key;
    if (options && 'value' in options) {
      this.value = options.value;
    }
  }
  get value() {
    var type = this.type;
    var key = this.key;
    if (type && key) {
      return IronMeta.types[type] && IronMeta.types[type][key];
    }
  }
  set value(value) {
    var type = this.type;
    var key = this.key;
    if (type && key) {
      type = IronMeta.types[type] = IronMeta.types[type] || {};
      if (value == null) {
        delete type[key];
      } else {
        type[key] = value;
      }
    }
  }
  get list() {
    var type = this.type;
    if (type) {
      var items = IronMeta.types[this.type];
      if (!items) {
        return [];
      }
      return Object.keys(items).map(function (key) {
        return metaDatas[this.type][key];
      }, this);
    }
  }
  byKey(key) {
    this.key = key;
    return this.value;
  }
}
IronMeta[' '] = function () {};
IronMeta.types = {};
var metaDatas = IronMeta.types;
Polymer({
  is: 'iron-meta',
  properties: {
    type: { type: String, value: 'default' },
    key: { type: String },
    value: { type: String, notify: true },
    self: { type: Boolean, observer: '_selfChanged' },
    __meta: { type: Boolean, computed: '__computeMeta(type, key, value)' },
  },
  hostAttributes: { hidden: true },
  __computeMeta: function (type, key, value) {
    var meta = new IronMeta({ type: type, key: key });
    if (value !== undefined && value !== meta.value) {
      meta.value = value;
    } else if (this.value !== meta.value) {
      this.value = meta.value;
    }
    return meta;
  },
  get list() {
    return this.__meta && this.__meta.list;
  },
  _selfChanged: function (self) {
    if (self) {
      this.value = this;
    }
  },
  byKey: function (key) {
    return new IronMeta({ type: this.type, key: key }).value;
  },
});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ Polymer({
  _template: html`
    <style>
      :host {
        align-items: center;
        display: inline-flex;
        justify-content: center;
        position: relative;

        vertical-align: middle;

        fill: var(--iron-icon-fill-color, currentcolor);
        stroke: var(--iron-icon-stroke-color, none);

        width: var(--iron-icon-width, 24px);
        height: var(--iron-icon-height, 24px);
      }

      :host([hidden]) {
        display: none;
      }
    </style>
  `,
  is: 'iron-icon',
  properties: {
    icon: { type: String },
    theme: { type: String },
    src: { type: String },
    _meta: { value: Base.create('iron-meta', { type: 'iconset' }) },
  },
  observers: [
    '_updateIcon(_meta, isAttached)',
    '_updateIcon(theme, isAttached)',
    '_srcChanged(src, isAttached)',
    '_iconChanged(icon, isAttached)',
  ],
  _DEFAULT_ICONSET: 'icons',
  _iconChanged: function (icon) {
    var parts = (icon || '').split(':');
    this._iconName = parts.pop();
    this._iconsetName = parts.pop() || this._DEFAULT_ICONSET;
    this._updateIcon();
  },
  _srcChanged: function (src) {
    this._updateIcon();
  },
  _usesIconset: function () {
    return this.icon || !this.src;
  },
  _updateIcon: function () {
    if (this._usesIconset()) {
      if (this._img && this._img.parentNode) {
        dom(this.root).removeChild(this._img);
      }
      if (this._iconName === '') {
        if (this._iconset) {
          this._iconset.removeIcon(this);
        }
      } else if (this._iconsetName && this._meta) {
        this._iconset = this._meta.byKey(this._iconsetName);
        if (this._iconset) {
          this._iconset.applyIcon(this, this._iconName, this.theme);
          this.unlisten(window, 'iron-iconset-added', '_updateIcon');
        } else {
          this.listen(window, 'iron-iconset-added', '_updateIcon');
        }
      }
    } else {
      if (this._iconset) {
        this._iconset.removeIcon(this);
      }
      if (!this._img) {
        this._img = document.createElement('img');
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.draggable = false;
      }
      this._img.src = this.src;
      dom(this.root).appendChild(this._img);
    }
  },
});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ var KEY_IDENTIFIER = { 'U+0008': 'backspace', 'U+0009': 'tab', 'U+001B': 'esc', 'U+0020': 'space', 'U+007F': 'del' };
var KEY_CODE = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  27: 'esc',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  46: 'del',
  106: '*',
};
var MODIFIER_KEYS = { shift: 'shiftKey', ctrl: 'ctrlKey', alt: 'altKey', meta: 'metaKey' };
var KEY_CHAR = /[a-z0-9*]/;
var IDENT_CHAR = /U\+/;
var ARROW_KEY = /^arrow/;
var SPACE_KEY = /^space(bar)?/;
var ESC_KEY = /^escape$/;
function transformKey(key, noSpecialChars) {
  var validKey = '';
  if (key) {
    var lKey = key.toLowerCase();
    if (lKey === ' ' || SPACE_KEY.test(lKey)) {
      validKey = 'space';
    } else if (ESC_KEY.test(lKey)) {
      validKey = 'esc';
    } else if (lKey.length == 1) {
      if (!noSpecialChars || KEY_CHAR.test(lKey)) {
        validKey = lKey;
      }
    } else if (ARROW_KEY.test(lKey)) {
      validKey = lKey.replace('arrow', '');
    } else if (lKey == 'multiply') {
      validKey = '*';
    } else {
      validKey = lKey;
    }
  }
  return validKey;
}
function transformKeyIdentifier(keyIdent) {
  var validKey = '';
  if (keyIdent) {
    if (keyIdent in KEY_IDENTIFIER) {
      validKey = KEY_IDENTIFIER[keyIdent];
    } else if (IDENT_CHAR.test(keyIdent)) {
      keyIdent = parseInt(keyIdent.replace('U+', '0x'), 16);
      validKey = String.fromCharCode(keyIdent).toLowerCase();
    } else {
      validKey = keyIdent.toLowerCase();
    }
  }
  return validKey;
}
function transformKeyCode(keyCode) {
  var validKey = '';
  if (Number(keyCode)) {
    if (keyCode >= 65 && keyCode <= 90) {
      validKey = String.fromCharCode(32 + keyCode);
    } else if (keyCode >= 112 && keyCode <= 123) {
      validKey = 'f' + (keyCode - 112 + 1);
    } else if (keyCode >= 48 && keyCode <= 57) {
      validKey = String(keyCode - 48);
    } else if (keyCode >= 96 && keyCode <= 105) {
      validKey = String(keyCode - 96);
    } else {
      validKey = KEY_CODE[keyCode];
    }
  }
  return validKey;
}
function normalizedKeyForEvent(keyEvent, noSpecialChars) {
  if (keyEvent.key) {
    return transformKey(keyEvent.key, noSpecialChars);
  }
  if (keyEvent.detail && keyEvent.detail.key) {
    return transformKey(keyEvent.detail.key, noSpecialChars);
  }
  return transformKeyIdentifier(keyEvent.keyIdentifier) || transformKeyCode(keyEvent.keyCode) || '';
}
function keyComboMatchesEvent(keyCombo, event) {
  var keyEvent = normalizedKeyForEvent(event, keyCombo.hasModifiers);
  return (
    keyEvent === keyCombo.key &&
    (!keyCombo.hasModifiers ||
      (!!event.shiftKey === !!keyCombo.shiftKey &&
        !!event.ctrlKey === !!keyCombo.ctrlKey &&
        !!event.altKey === !!keyCombo.altKey &&
        !!event.metaKey === !!keyCombo.metaKey))
  );
}
function parseKeyComboString(keyComboString) {
  if (keyComboString.length === 1) {
    return { combo: keyComboString, key: keyComboString, event: 'keydown' };
  }
  return keyComboString.split('+').reduce(
    function (parsedKeyCombo, keyComboPart) {
      var eventParts = keyComboPart.split(':');
      var keyName = eventParts[0];
      var event = eventParts[1];
      if (keyName in MODIFIER_KEYS) {
        parsedKeyCombo[MODIFIER_KEYS[keyName]] = true;
        parsedKeyCombo.hasModifiers = true;
      } else {
        parsedKeyCombo.key = keyName;
        parsedKeyCombo.event = event || 'keydown';
      }
      return parsedKeyCombo;
    },
    { combo: keyComboString.split(':').shift() }
  );
}
function parseEventString(eventString) {
  return eventString
    .trim()
    .split(' ')
    .map(function (keyComboString) {
      return parseKeyComboString(keyComboString);
    });
}
const IronA11yKeysBehavior = {
  properties: {
    keyEventTarget: {
      type: Object,
      value: function () {
        return this;
      },
    },
    stopKeyboardEventPropagation: { type: Boolean, value: false },
    _boundKeyHandlers: {
      type: Array,
      value: function () {
        return [];
      },
    },
    _imperativeKeyBindings: {
      type: Object,
      value: function () {
        return {};
      },
    },
  },
  observers: ['_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)'],
  keyBindings: {},
  registered: function () {
    this._prepKeyBindings();
  },
  attached: function () {
    this._listenKeyEventListeners();
  },
  detached: function () {
    this._unlistenKeyEventListeners();
  },
  addOwnKeyBinding: function (eventString, handlerName) {
    this._imperativeKeyBindings[eventString] = handlerName;
    this._prepKeyBindings();
    this._resetKeyEventListeners();
  },
  removeOwnKeyBindings: function () {
    this._imperativeKeyBindings = {};
    this._prepKeyBindings();
    this._resetKeyEventListeners();
  },
  keyboardEventMatchesKeys: function (event, eventString) {
    var keyCombos = parseEventString(eventString);
    for (var i = 0; i < keyCombos.length; ++i) {
      if (keyComboMatchesEvent(keyCombos[i], event)) {
        return true;
      }
    }
    return false;
  },
  _collectKeyBindings: function () {
    var keyBindings = this.behaviors.map(function (behavior) {
      return behavior.keyBindings;
    });
    if (keyBindings.indexOf(this.keyBindings) === -1) {
      keyBindings.push(this.keyBindings);
    }
    return keyBindings;
  },
  _prepKeyBindings: function () {
    this._keyBindings = {};
    this._collectKeyBindings().forEach(function (keyBindings) {
      for (var eventString in keyBindings) {
        this._addKeyBinding(eventString, keyBindings[eventString]);
      }
    }, this);
    for (var eventString in this._imperativeKeyBindings) {
      this._addKeyBinding(eventString, this._imperativeKeyBindings[eventString]);
    }
    for (var eventName in this._keyBindings) {
      this._keyBindings[eventName].sort(function (kb1, kb2) {
        var b1 = kb1[0].hasModifiers;
        var b2 = kb2[0].hasModifiers;
        return b1 === b2 ? 0 : b1 ? -1 : 1;
      });
    }
  },
  _addKeyBinding: function (eventString, handlerName) {
    parseEventString(eventString).forEach(function (keyCombo) {
      this._keyBindings[keyCombo.event] = this._keyBindings[keyCombo.event] || [];
      this._keyBindings[keyCombo.event].push([keyCombo, handlerName]);
    }, this);
  },
  _resetKeyEventListeners: function () {
    this._unlistenKeyEventListeners();
    if (this.isAttached) {
      this._listenKeyEventListeners();
    }
  },
  _listenKeyEventListeners: function () {
    if (!this.keyEventTarget) {
      return;
    }
    Object.keys(this._keyBindings).forEach(function (eventName) {
      var keyBindings = this._keyBindings[eventName];
      var boundKeyHandler = this._onKeyBindingEvent.bind(this, keyBindings);
      this._boundKeyHandlers.push([this.keyEventTarget, eventName, boundKeyHandler]);
      this.keyEventTarget.addEventListener(eventName, boundKeyHandler);
    }, this);
  },
  _unlistenKeyEventListeners: function () {
    var keyHandlerTuple;
    var keyEventTarget;
    var eventName;
    var boundKeyHandler;
    while (this._boundKeyHandlers.length) {
      keyHandlerTuple = this._boundKeyHandlers.pop();
      keyEventTarget = keyHandlerTuple[0];
      eventName = keyHandlerTuple[1];
      boundKeyHandler = keyHandlerTuple[2];
      keyEventTarget.removeEventListener(eventName, boundKeyHandler);
    }
  },
  _onKeyBindingEvent: function (keyBindings, event) {
    if (this.stopKeyboardEventPropagation) {
      event.stopPropagation();
    }
    if (event.defaultPrevented) {
      return;
    }
    for (var i = 0; i < keyBindings.length; i++) {
      var keyCombo = keyBindings[i][0];
      var handlerName = keyBindings[i][1];
      if (keyComboMatchesEvent(keyCombo, event)) {
        this._triggerKeyHandler(keyCombo, handlerName, event);
        if (event.defaultPrevented) {
          return;
        }
      }
    }
  },
  _triggerKeyHandler: function (keyCombo, handlerName, keyboardEvent) {
    var detail = Object.create(keyCombo);
    detail.keyboardEvent = keyboardEvent;
    var event = new CustomEvent(keyCombo.event, { detail: detail, cancelable: true });
    this[handlerName].call(this, event);
    if (event.defaultPrevented) {
      keyboardEvent.preventDefault();
    }
  },
};
var MAX_RADIUS_PX = 300;
var MIN_DURATION_MS = 800;
var distance = function (x1, y1, x2, y2) {
  var xDelta = x1 - x2;
  var yDelta = y1 - y2;
  return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
};
Polymer({
  _template: html`
    <style>
      :host {
        bottom: 0;
        display: block;
        left: 0;
        overflow: hidden;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        /* For rounded corners: http://jsbin.com/temexa/4. */
        transform: translate3d(0, 0, 0);
      }

      .ripple {
        background-color: currentcolor;
        left: 0;
        opacity: var(--paper-ripple-opacity, 0.25);
        pointer-events: none;
        position: absolute;
        will-change: height, transform, width;
      }

      .ripple,
      :host(.circle) {
        border-radius: 50%;
      }
    </style>
  `,
  is: 'paper-ripple',
  behaviors: [IronA11yKeysBehavior],
  properties: {
    center: { type: Boolean, value: false },
    holdDown: { type: Boolean, value: false, observer: '_holdDownChanged' },
    recenters: { type: Boolean, value: false },
    noink: { type: Boolean, value: false },
  },
  keyBindings: {
    'enter:keydown': '_onEnterKeydown',
    'space:keydown': '_onSpaceKeydown',
    'space:keyup': '_onSpaceKeyup',
  },
  created: function () {
    this.ripples = [];
  },
  attached: function () {
    this.keyEventTarget = this.parentNode.nodeType == 11 ? dom(this).getOwnerRoot().host : this.parentNode;
    this.keyEventTarget = this.keyEventTarget;
    this.listen(this.keyEventTarget, 'up', 'uiUpAction');
    this.listen(this.keyEventTarget, 'down', 'uiDownAction');
  },
  detached: function () {
    this.unlisten(this.keyEventTarget, 'up', 'uiUpAction');
    this.unlisten(this.keyEventTarget, 'down', 'uiDownAction');
    this.keyEventTarget = null;
  },
  simulatedRipple: function () {
    this.downAction();
    this.async(
      function () {
        this.upAction();
      }.bind(this),
      1
    );
  },
  uiDownAction: function (e) {
    if (!this.noink) this.downAction(e);
  },
  downAction: function (e) {
    if (this.ripples.length && this.holdDown) return;
    this.debounce(
      'show ripple',
      function () {
        this.__showRipple(e);
      },
      1
    );
  },
  clear: function () {
    this.__hideRipple();
    this.holdDown = false;
  },
  showAndHoldDown: function () {
    this.ripples.forEach((ripple) => {
      ripple.remove();
    });
    this.ripples = [];
    this.holdDown = true;
  },
  __showRipple: function (e) {
    var rect = this.getBoundingClientRect();
    var roundedCenterX = function () {
      return Math.round(rect.width / 2);
    };
    var roundedCenterY = function () {
      return Math.round(rect.height / 2);
    };
    var centered = !e || this.center;
    if (centered) {
      var x = roundedCenterX();
      var y = roundedCenterY();
    } else {
      var sourceEvent = e.detail.sourceEvent;
      var x = Math.round(sourceEvent.clientX - rect.left);
      var y = Math.round(sourceEvent.clientY - rect.top);
    }
    var corners = [
      { x: 0, y: 0 },
      { x: rect.width, y: 0 },
      { x: 0, y: rect.height },
      { x: rect.width, y: rect.height },
    ];
    var cornerDistances = corners.map(function (corner) {
      return Math.round(distance(x, y, corner.x, corner.y));
    });
    var radius = Math.min(MAX_RADIUS_PX, Math.max.apply(Math, cornerDistances));
    var startTranslate = x - radius + 'px, ' + (y - radius) + 'px';
    if (this.recenters && !centered) {
      var endTranslate = roundedCenterX() - radius + 'px, ' + (roundedCenterY() - radius) + 'px';
    } else {
      var endTranslate = startTranslate;
    }
    var ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.height = ripple.style.width = 2 * radius + 'px';
    this.ripples.push(ripple);
    this.shadowRoot.appendChild(ripple);
    ripple.animate(
      { transform: ['translate(' + startTranslate + ') scale(0)', 'translate(' + endTranslate + ') scale(1)'] },
      {
        duration: Math.max(MIN_DURATION_MS, Math.log(radius) * radius) || 0,
        easing: 'cubic-bezier(.2, .9, .1, .9)',
        fill: 'forwards',
      }
    );
  },
  uiUpAction: function (e) {
    if (!this.noink) this.upAction();
  },
  upAction: function (e) {
    if (!this.holdDown)
      this.debounce(
        'hide ripple',
        function () {
          this.__hideRipple();
        },
        1
      );
  },
  __hideRipple: function () {
    Promise.all(
      this.ripples.map(function (ripple) {
        return new Promise(function (resolve) {
          var removeRipple = function () {
            ripple.remove();
            resolve();
          };
          var opacity = getComputedStyle(ripple).opacity;
          if (!opacity.length) {
            removeRipple();
          } else {
            var animation = ripple.animate({ opacity: [opacity, 0] }, { duration: 150, fill: 'forwards' });
            animation.addEventListener('finish', removeRipple);
            animation.addEventListener('cancel', removeRipple);
          }
        });
      })
    ).then(
      function () {
        this.fire('transitionend');
      }.bind(this)
    );
    this.ripples = [];
  },
  _onEnterKeydown: function () {
    this.uiDownAction();
    this.async(this.uiUpAction, 1);
  },
  _onSpaceKeydown: function () {
    this.uiDownAction();
  },
  _onSpaceKeyup: function () {
    this.uiUpAction();
  },
  _holdDownChanged: function (newHoldDown, oldHoldDown) {
    if (oldHoldDown === undefined) return;
    if (newHoldDown) this.downAction();
    else this.upAction();
  },
});
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ const IronButtonStateImpl = {
  properties: {
    pressed: { type: Boolean, readOnly: true, value: false, reflectToAttribute: true, observer: '_pressedChanged' },
    toggles: { type: Boolean, value: false, reflectToAttribute: true },
    active: { type: Boolean, value: false, notify: true, reflectToAttribute: true },
    pointerDown: { type: Boolean, readOnly: true, value: false },
    receivedFocusFromKeyboard: { type: Boolean, readOnly: true },
    ariaActiveAttribute: { type: String, value: 'aria-pressed', observer: '_ariaActiveAttributeChanged' },
  },
  listeners: { down: '_downHandler', up: '_upHandler', tap: '_tapHandler' },
  observers: ['_focusChanged(focused)', '_activeChanged(active, ariaActiveAttribute)'],
  keyBindings: {
    'enter:keydown': '_asyncClick',
    'space:keydown': '_spaceKeyDownHandler',
    'space:keyup': '_spaceKeyUpHandler',
  },
  _mouseEventRe: /^mouse/,
  _tapHandler: function () {
    if (this.toggles) {
      this._userActivate(!this.active);
    } else {
      this.active = false;
    }
  },
  _focusChanged: function (focused) {
    this._detectKeyboardFocus(focused);
    if (!focused) {
      this._setPressed(false);
    }
  },
  _detectKeyboardFocus: function (focused) {
    this._setReceivedFocusFromKeyboard(!this.pointerDown && focused);
  },
  _userActivate: function (active) {
    if (this.active !== active) {
      this.active = active;
      this.fire('change');
    }
  },
  _downHandler: function (event) {
    this._setPointerDown(true);
    this._setPressed(true);
    this._setReceivedFocusFromKeyboard(false);
  },
  _upHandler: function () {
    this._setPointerDown(false);
    this._setPressed(false);
  },
  _spaceKeyDownHandler: function (event) {
    var keyboardEvent = event.detail.keyboardEvent;
    var target = dom(keyboardEvent).localTarget;
    if (this.isLightDescendant(target)) return;
    keyboardEvent.preventDefault();
    keyboardEvent.stopImmediatePropagation();
    this._setPressed(true);
  },
  _spaceKeyUpHandler: function (event) {
    var keyboardEvent = event.detail.keyboardEvent;
    var target = dom(keyboardEvent).localTarget;
    if (this.isLightDescendant(target)) return;
    if (this.pressed) {
      this._asyncClick();
    }
    this._setPressed(false);
  },
  _asyncClick: function () {
    this.async(function () {
      this.click();
    }, 1);
  },
  _pressedChanged: function (pressed) {
    this._changedButtonState();
  },
  _ariaActiveAttributeChanged: function (value, oldValue) {
    if (oldValue && oldValue != value && this.hasAttribute(oldValue)) {
      this.removeAttribute(oldValue);
    }
  },
  _activeChanged: function (active, ariaActiveAttribute) {
    if (this.toggles) {
      this.setAttribute(this.ariaActiveAttribute, active ? 'true' : 'false');
    } else {
      this.removeAttribute(this.ariaActiveAttribute);
    }
    this._changedButtonState();
  },
  _controlStateChanged: function () {
    if (this.disabled) {
      this._setPressed(false);
    } else {
      this._changedButtonState();
    }
  },
  _changedButtonState: function () {
    if (this._buttonStateChanged) {
      this._buttonStateChanged();
    }
  },
};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ const PaperRippleBehavior = {
  properties: { noink: { type: Boolean, observer: '_noinkChanged' }, _rippleContainer: { type: Object } },
  _buttonStateChanged: function () {
    if (this.focused) {
      this.ensureRipple();
    }
  },
  _downHandler: function (event) {
    IronButtonStateImpl._downHandler.call(this, event);
    if (this.pressed) {
      this.ensureRipple(event);
    }
  },
  ensureRipple: function (optTriggeringEvent) {
    if (!this.hasRipple()) {
      this._ripple = this._createRipple();
      this._ripple.noink = this.noink;
      var rippleContainer = this._rippleContainer || this.root;
      if (rippleContainer) {
        dom(rippleContainer).appendChild(this._ripple);
      }
      if (optTriggeringEvent) {
        var domContainer = dom(this._rippleContainer || this);
        var target = dom(optTriggeringEvent).rootTarget;
        if (domContainer.deepContains(target)) {
          this._ripple.uiDownAction(optTriggeringEvent);
        }
      }
    }
  },
  getRipple: function () {
    this.ensureRipple();
    return this._ripple;
  },
  hasRipple: function () {
    return Boolean(this._ripple);
  },
  _createRipple: function () {
    var element = document.createElement('paper-ripple');
    return element;
  },
  _noinkChanged: function (noink) {
    if (this.hasRipple()) {
      this._ripple.noink = noink;
    }
  },
};
function getTemplate$M() {
  return html`<!--_html_template_start_-->
    <style>
      :host {
        --cr-icon-button-fill-color: var(--google-grey-700);
        --cr-icon-button-icon-start-offset: 0;
        --cr-icon-button-icon-size: 20px;
        --cr-icon-button-size: 36px;
        --cr-icon-button-height: var(--cr-icon-button-size);
        --cr-icon-button-transition: 150ms ease-in-out;
        --cr-icon-button-width: var(--cr-icon-button-size);
        -webkit-tap-highlight-color: transparent;
        border-radius: 50%;
        color: var(--cr-icon-button-stroke-color, var(--cr-icon-button-fill-color));
        cursor: pointer;
        display: inline-flex;
        flex-shrink: 0;
        height: var(--cr-icon-button-height);
        margin-inline-end: var(--cr-icon-button-margin-end, var(--cr-icon-ripple-margin));
        margin-inline-start: var(--cr-icon-button-margin-start);
        outline: 0;
        overflow: hidden;
        user-select: none;
        vertical-align: middle;
        width: var(--cr-icon-button-width);
      }
      :host-context([chrome-refresh-2023]):host {
        --cr-icon-button-fill-color: currentColor;
        --cr-icon-button-size: 32px;
        position: relative;
      }
      :host(:hover) {
        background-color: var(--cr-icon-button-hover-background-color, var(--cr-hover-background-color));
      }
      :host(:focus-visible:focus) {
        box-shadow: inset 0 0 0 2px var(--cr-icon-button-focus-outline-color, var(--cr-focus-outline-color));
      }
      @media (forced-colors: active) {
        :host(:focus-visible:focus) {
          outline: var(--cr-focus-outline-hcm);
        }
      }
      :host-context(html:not([chrome-refresh-2023])) :host(:active) {
        background-color: var(--cr-icon-button-active-background-color, var(--cr-active-background-color));
      }
      paper-ripple {
        display: none;
      }
      :host-context([chrome-refresh-2023]) paper-ripple {
        --paper-ripple-opacity: 1;
        color: var(--cr-active-background-color);
        display: block;
      }
      :host([disabled]) {
        cursor: initial;
        opacity: var(--cr-disabled-opacity);
        pointer-events: none;
      }
      :host(.no-overlap) {
        --cr-icon-button-margin-end: 0;
        --cr-icon-button-margin-start: 0;
      }
      :host-context([dir='rtl']):host(:not([dir='ltr']):not([multiple-icons_])) {
        transform: scaleX(-1);
      }
      :host-context([dir='rtl']):host(:not([dir='ltr'])[multiple-icons_]) iron-icon {
        transform: scaleX(-1);
      }
      :host(:not([iron-icon])) #maskedImage {
        -webkit-mask-image: var(--cr-icon-image);
        -webkit-mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: var(--cr-icon-button-icon-size);
        -webkit-transform: var(--cr-icon-image-transform, none);
        background-color: var(--cr-icon-button-fill-color);
        height: 100%;
        transition: background-color var(--cr-icon-button-transition);
        width: 100%;
      }
      @media (forced-colors: active) {
        :host(:not([iron-icon])) #maskedImage {
          background-color: ButtonText;
        }
      }
      #icon {
        align-items: center;
        border-radius: 4px;
        display: flex;
        height: 100%;
        justify-content: center;
        padding-inline-start: var(--cr-icon-button-icon-start-offset);
        position: relative;
        width: 100%;
      }
      iron-icon {
        --iron-icon-fill-color: var(--cr-icon-button-fill-color);
        --iron-icon-stroke-color: var(--cr-icon-button-stroke-color, none);
        --iron-icon-height: var(--cr-icon-button-icon-size);
        --iron-icon-width: var(--cr-icon-button-icon-size);
        transition: fill var(--cr-icon-button-transition), stroke var(--cr-icon-button-transition);
      }
      @media (prefers-color-scheme: dark) {
        :host {
          --cr-icon-button-fill-color: var(--google-grey-500);
        }
      }
    </style>
    <div id="icon">
      <div id="maskedImage"></div>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2018 The Chromium Authors
const CrIconbuttonElementBase = mixinBehaviors([PaperRippleBehavior], PolymerElement);
class CrIconButtonElement extends CrIconbuttonElementBase {
  static get is() {
    return 'cr-icon-button';
  }
  static get template() {
    return getTemplate$M();
  }
  static get properties() {
    return {
      disabled: { type: Boolean, value: false, reflectToAttribute: true, observer: 'disabledChanged_' },
      customTabIndex: { type: Number, observer: 'applyTabIndex_' },
      ironIcon: { type: String, observer: 'onIronIconChanged_', reflectToAttribute: true },
      multipleIcons_: { type: Boolean, reflectToAttribute: true },
    };
  }
  constructor() {
    super();
    this.spaceKeyDown_ = false;
    this.addEventListener('blur', this.onBlur_.bind(this));
    this.addEventListener('click', this.onClick_.bind(this));
    this.addEventListener('keydown', this.onKeyDown_.bind(this));
    this.addEventListener('keyup', this.onKeyUp_.bind(this));
    if (document.documentElement.hasAttribute('chrome-refresh-2023')) {
      this.addEventListener('pointerdown', this.onPointerDown_.bind(this));
    }
  }
  ready() {
    super.ready();
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }
  toggleClass(className) {
    this.classList.toggle(className);
  }
  disabledChanged_(newValue, oldValue) {
    if (!newValue && oldValue === undefined) {
      return;
    }
    if (this.disabled) {
      this.blur();
    }
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    this.applyTabIndex_();
  }
  applyTabIndex_() {
    let value = this.customTabIndex;
    if (value === undefined) {
      value = this.disabled ? -1 : 0;
    }
    this.setAttribute('tabindex', value.toString());
  }
  onBlur_() {
    this.spaceKeyDown_ = false;
  }
  onClick_(e) {
    if (this.disabled) {
      e.stopImmediatePropagation();
    }
  }
  onIronIconChanged_() {
    this.shadowRoot.querySelectorAll('iron-icon').forEach((el) => el.remove());
    if (!this.ironIcon) {
      return;
    }
    const icons = (this.ironIcon || '').split(',');
    this.multipleIcons_ = icons.length > 1;
    icons.forEach((icon) => {
      const ironIcon = document.createElement('iron-icon');
      ironIcon.icon = icon;
      this.$.icon.appendChild(ironIcon);
      if (ironIcon.shadowRoot) {
        ironIcon.shadowRoot.querySelectorAll('svg, img').forEach((child) => child.setAttribute('role', 'none'));
      }
    });
  }
  onKeyDown_(e) {
    if (e.key !== ' ' && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.repeat) {
      return;
    }
    if (e.key === 'Enter') {
      this.click();
    } else if (e.key === ' ') {
      this.spaceKeyDown_ = true;
    }
  }
  onKeyUp_(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
    }
    if (this.spaceKeyDown_ && e.key === ' ') {
      this.spaceKeyDown_ = false;
      this.click();
    }
  }
  onPointerDown_() {
    this.ensureRipple();
  }
}
customElements.define(CrIconButtonElement.is, CrIconButtonElement);
const styleMod$a = document.createElement('dom-module');
styleMod$a.appendChild(
  html`
    <template>
      <style>
        .icon-arrow-back {
          --cr-icon-image: url(chrome://resources/images/icon_arrow_back.svg);
        }
        .icon-arrow-dropdown {
          --cr-icon-image: url(chrome://resources/images/icon_arrow_dropdown.svg);
        }
        .icon-cancel {
          --cr-icon-image: url(chrome://resources/images/icon_cancel.svg);
        }
        .icon-clear {
          --cr-icon-image: url(chrome://resources/images/icon_clear.svg);
        }
        .icon-copy-content {
          --cr-icon-image: url(chrome://resources/images/icon_copy_content.svg);
        }
        .icon-delete-gray {
          --cr-icon-image: url(chrome://resources/images/icon_delete_gray.svg);
        }
        .icon-edit {
          --cr-icon-image: url(chrome://resources/images/icon_edit.svg);
        }
        .icon-file {
          --cr-icon-image: url(chrome://resources/images/icon_filetype_generic.svg);
        }
        .icon-folder-open {
          --cr-icon-image: url(chrome://resources/images/icon_folder_open.svg);
        }
        .icon-picture-delete {
          --cr-icon-image: url(chrome://resources/images/icon_picture_delete.svg);
        }
        .icon-expand-less {
          --cr-icon-image: url(chrome://resources/images/icon_expand_less.svg);
        }
        .icon-expand-more {
          --cr-icon-image: url(chrome://resources/images/icon_expand_more.svg);
        }
        .icon-external {
          --cr-icon-image: url(chrome://resources/images/open_in_new.svg);
        }
        .icon-more-vert {
          --cr-icon-image: url(chrome://resources/images/icon_more_vert.svg);
        }
        .icon-refresh {
          --cr-icon-image: url(chrome://resources/images/icon_refresh.svg);
        }
        .icon-search {
          --cr-icon-image: url(chrome://resources/images/icon_search.svg);
        }
        .icon-settings {
          --cr-icon-image: url(chrome://resources/images/icon_settings.svg);
        }
        .icon-visibility {
          --cr-icon-image: url(chrome://resources/images/icon_visibility.svg);
        }
        .icon-visibility-off {
          --cr-icon-image: url(chrome://resources/images/icon_visibility_off.svg);
        }
        .subpage-arrow {
          --cr-icon-image: url(chrome://resources/images/arrow_right.svg);
        }
        .cr-icon {
          -webkit-mask-image: var(--cr-icon-image);
          -webkit-mask-position: center;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-size: var(--cr-icon-size);
          background-color: var(--cr-icon-color, var(--google-grey-700));
          flex-shrink: 0;
          height: var(--cr-icon-ripple-size);
          margin-inline-end: var(--cr-icon-ripple-margin);
          margin-inline-start: var(--cr-icon-button-margin-start);
          user-select: none;
          width: var(--cr-icon-ripple-size);
        }
        :host-context([dir='rtl']) .cr-icon {
          transform: scaleX(-1);
        }
        .cr-icon.no-overlap {
          margin-inline-end: 0;
          margin-inline-start: 0;
        }
        @media (prefers-color-scheme: dark) {
          .cr-icon {
            background-color: var(--cr-icon-color, var(--google-grey-500));
          }
        }
      </style>
    </template>
  `.content
);
styleMod$a.register('cr-icons');
const styleMod$9 = document.createElement('dom-module');
styleMod$9.appendChild(
  html`
    <template>
      <style>
        :host([hidden]),
        [hidden] {
          display: none !important;
        }
      </style>
    </template>
  `.content
);
styleMod$9.register('cr-hidden-style');
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ Polymer({
  is: 'iron-iconset-svg',
  properties: {
    name: { type: String, observer: '_nameChanged' },
    size: { type: Number, value: 24 },
    rtlMirroring: { type: Boolean, value: false },
    useGlobalRtlAttribute: { type: Boolean, value: false },
  },
  created: function () {
    this._meta = new IronMeta({ type: 'iconset', key: null, value: null });
  },
  attached: function () {
    this.style.display = 'none';
  },
  getIconNames: function () {
    this._icons = this._createIconMap();
    return Object.keys(this._icons).map(function (n) {
      return this.name + ':' + n;
    }, this);
  },
  applyIcon: function (element, iconName) {
    this.removeIcon(element);
    var svg = this._cloneIcon(iconName, this.rtlMirroring && this._targetIsRTL(element));
    if (svg) {
      var pde = dom(element.root || element);
      pde.insertBefore(svg, pde.childNodes[0]);
      return (element._svgIcon = svg);
    }
    return null;
  },
  createIcon: function (iconName, targetIsRTL) {
    return this._cloneIcon(iconName, this.rtlMirroring && targetIsRTL);
  },
  removeIcon: function (element) {
    if (element._svgIcon) {
      dom(element.root || element).removeChild(element._svgIcon);
      element._svgIcon = null;
    }
  },
  _targetIsRTL: function (target) {
    if (this.__targetIsRTL == null) {
      if (this.useGlobalRtlAttribute) {
        var globalElement =
          document.body && document.body.hasAttribute('dir') ? document.body : document.documentElement;
        this.__targetIsRTL = globalElement.getAttribute('dir') === 'rtl';
      } else {
        if (target && target.nodeType !== Node.ELEMENT_NODE) {
          target = target.host;
        }
        this.__targetIsRTL = target && window.getComputedStyle(target)['direction'] === 'rtl';
      }
    }
    return this.__targetIsRTL;
  },
  _nameChanged: function () {
    this._meta.value = null;
    this._meta.key = this.name;
    this._meta.value = this;
    this.async(function () {
      this.fire('iron-iconset-added', this, { node: window });
    });
  },
  _createIconMap: function () {
    var icons = Object.create(null);
    dom(this)
      .querySelectorAll('[id]')
      .forEach(function (icon) {
        icons[icon.id] = icon;
      });
    return icons;
  },
  _cloneIcon: function (id, mirrorAllowed) {
    this._icons = this._icons || this._createIconMap();
    return this._prepareSvgClone(this._icons[id], this.size, mirrorAllowed);
  },
  _prepareSvgClone: function (sourceSvg, size, mirrorAllowed) {
    if (sourceSvg) {
      var content = sourceSvg.cloneNode(true),
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
        viewBox = content.getAttribute('viewBox') || '0 0 ' + size + ' ' + size,
        cssText = 'pointer-events: none; display: block; width: 100%; height: 100%;';
      if (mirrorAllowed && content.hasAttribute('mirror-in-rtl')) {
        cssText += '-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;';
      }
      svg.setAttribute('viewBox', viewBox);
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      svg.setAttribute('focusable', 'false');
      svg.style.cssText = cssText;
      svg.appendChild(content).removeAttribute('id');
      return svg;
    }
    return null;
  },
});
const template$6 = html`
  <iron-iconset-svg name="cr20" size="20">
    <svg>
      <defs>
        <g id="block">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM2 10C2 5.58 5.58 2 10 2C11.85 2 13.55 2.63 14.9 3.69L3.69 14.9C2.63 13.55 2 11.85 2 10ZM5.1 16.31C6.45 17.37 8.15 18 10 18C14.42 18 18 14.42 18 10C18 8.15 17.37 6.45 16.31 5.1L5.1 16.31Z"
          ></path>
        </g>
        <g id="cloud-off">
          <path
            d="M16 18.125L13.875 16H5C3.88889 16 2.94444 15.6111 2.16667 14.8333C1.38889 14.0556 1 13.1111 1 12C1 10.9444 1.36111 10.0347 2.08333 9.27083C2.80556 8.50694 3.6875 8.09028 4.72917 8.02083C4.77083 7.86805 4.8125 7.72222 4.85417 7.58333C4.90972 7.44444 4.97222 7.30555 5.04167 7.16667L1.875 4L2.9375 2.9375L17.0625 17.0625L16 18.125ZM5 14.5H12.375L6.20833 8.33333C6.15278 8.51389 6.09722 8.70139 6.04167 8.89583C6 9.07639 5.95139 9.25694 5.89583 9.4375L4.83333 9.52083C4.16667 9.57639 3.61111 9.84028 3.16667 10.3125C2.72222 10.7708 2.5 11.3333 2.5 12C2.5 12.6944 2.74306 13.2847 3.22917 13.7708C3.71528 14.2569 4.30556 14.5 5 14.5ZM17.5 15.375L16.3958 14.2917C16.7153 14.125 16.9792 13.8819 17.1875 13.5625C17.3958 13.2431 17.5 12.8889 17.5 12.5C17.5 11.9444 17.3056 11.4722 16.9167 11.0833C16.5278 10.6944 16.0556 10.5 15.5 10.5H14.125L14 9.14583C13.9028 8.11806 13.4722 7.25694 12.7083 6.5625C11.9444 5.85417 11.0417 5.5 10 5.5C9.65278 5.5 9.31944 5.54167 9 5.625C8.69444 5.70833 8.39583 5.82639 8.10417 5.97917L7.02083 4.89583C7.46528 4.61806 7.93056 4.40278 8.41667 4.25C8.91667 4.08333 9.44444 4 10 4C11.4306 4 12.6736 4.48611 13.7292 5.45833C14.7847 6.41667 15.375 7.59722 15.5 9C16.4722 9 17.2986 9.34028 17.9792 10.0208C18.6597 10.7014 19 11.5278 19 12.5C19 13.0972 18.8611 13.6458 18.5833 14.1458C18.3194 14.6458 17.9583 15.0556 17.5 15.375Z"
          ></path>
        </g>
        <g id="domain">
          <path
            d="M2,3 L2,17 L11.8267655,17 L13.7904799,17 L18,17 L18,7 L12,7 L12,3 L2,3 Z M8,13 L10,13 L10,15 L8,15 L8,13 Z M4,13 L6,13 L6,15 L4,15 L4,13 Z M8,9 L10,9 L10,11 L8,11 L8,9 Z M4,9 L6,9 L6,11 L4,11 L4,9 Z M12,9 L16,9 L16,15 L12,15 L12,9 Z M12,11 L14,11 L14,13 L12,13 L12,11 Z M8,5 L10,5 L10,7 L8,7 L8,5 Z M4,5 L6,5 L6,7 L4,7 L4,5 Z"
          ></path>
        </g>
        <g id="kite">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.6327 8.00094L10.3199 2L16 8.00094L10.1848 16.8673C10.0995 16.9873 10.0071 17.1074 9.90047 17.2199C9.42417 17.7225 8.79147 18 8.11611 18C7.44076 18 6.80806 17.7225 6.33175 17.2199C5.85545 16.7173 5.59242 16.0497 5.59242 15.3371C5.59242 14.977 5.46445 14.647 5.22275 14.3919C4.98104 14.1369 4.66825 14.0019 4.32701 14.0019H4V12.6667H4.32701C5.00237 12.6667 5.63507 12.9442 6.11137 13.4468C6.58768 13.9494 6.85071 14.617 6.85071 15.3296C6.85071 15.6896 6.97867 16.0197 7.22038 16.2747C7.46209 16.5298 7.77488 16.6648 8.11611 16.6648C8.45735 16.6648 8.77014 16.5223 9.01185 16.2747C9.02396 16.2601 9.03607 16.246 9.04808 16.2319C9.08541 16.1883 9.12176 16.1458 9.15403 16.0947L9.55213 15.4946L4.6327 8.00094ZM10.3199 13.9371L6.53802 8.17116L10.3199 4.1814L14.0963 8.17103L10.3199 13.9371Z"
          ></path>
        </g>
        <g id="menu">
          <path d="M2 4h16v2H2zM2 9h16v2H2zM2 14h16v2H2z"></path>
        </g>
      </defs>
    </svg>
  </iron-iconset-svg>

  <iron-iconset-svg name="cr" size="24">
    <svg>
      <defs>
        <g id="account-child-invert" viewBox="0 0 48 48">
          <path d="M24 4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"></path>
          <path fill="none" d="M0 0h48v48H0V0z"></path>
          <circle fill="none" cx="24" cy="26" r="4"></circle>
          <path
            d="M24 18c-6.16 0-13 3.12-13 7.23v11.54c0 2.32 2.19 4.33 5.2 5.63 2.32 1 5.12 1.59 7.8 1.59.66 0 1.33-.06 2-.14v-5.2c-.67.08-1.34.14-2 .14-2.63 0-5.39-.57-7.68-1.55.67-2.12 4.34-3.65 7.68-3.65.86 0 1.75.11 2.6.29 2.79.62 5.2 2.15 5.2 4.04v4.47c3.01-1.31 5.2-3.31 5.2-5.63V25.23C37 21.12 30.16 18 24 18zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
          ></path>
        </g>
        <g id="add">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </g>
        <g id="arrow-back">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
        </g>
        <g id="arrow-drop-up">
          <path d="M7 14l5-5 5 5z"></path>
        </g>
        <g id="arrow-drop-down">
          <path d="M7 10l5 5 5-5z"></path>
        </g>
        <g id="arrow-forward">
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
        </g>
        <g id="arrow-right">
          <path d="M10 7l5 5-5 5z"></path>
        </g>

        <g id="cancel">
          <path
            d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
          ></path>
        </g>
        <g id="check">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
        </g>
        <g id="check-circle">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          ></path>
        </g>
        <g id="chevron-left">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
        </g>
        <g id="chevron-right">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
        </g>
        <g id="clear">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          ></path>
        </g>
        <g id="close">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          ></path>
        </g>
        <g id="computer">
          <path
            d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"
          ></path>
        </g>
        <g id="create">
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          ></path>
        </g>
        <g id="delete">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
        </g>
        <g id="domain">
          <path
            d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"
          ></path>
        </g>
        <g id="error">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          ></path>
        </g>
        <g id="error-outline">
          <path
            d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
          ></path>
        </g>
        <g id="expand-less">
          <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
        </g>
        <g id="expand-more">
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
        </g>
        <g id="extension">
          <path
            d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"
          ></path>
        </g>
        <g id="file-download">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
        </g>

        <g id="fullscreen">
          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
        </g>
        <g id="group">
          <path
            d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
          ></path>
        </g>
        <g id="help-outline">
          <path
            d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
          ></path>
        </g>
        <g id="info">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
          ></path>
        </g>
        <g id="info-outline">
          <path
            d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"
          ></path>
        </g>
        <g id="insert-drive-file">
          <path
            d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"
          ></path>
        </g>
        <g id="location-on">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
          ></path>
        </g>
        <g id="mic">
          <path
            d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
          ></path>
        </g>
        <g id="more-vert">
          <path
            d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          ></path>
        </g>
        <g id="open-in-new">
          <path
            d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
          ></path>
        </g>
        <g id="person">
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          ></path>
        </g>
        <g id="phonelink">
          <path
            d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"
          ></path>
        </g>
        <g id="print">
          <path
            d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"
          ></path>
        </g>
        <g id="schedule">
          <path
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
          ></path>
        </g>
        <g id="search">
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          ></path>
        </g>
        <g id="security">
          <path
            d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
          ></path>
        </g>

        <g id="settings_icon">
          <path
            d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
          ></path>
        </g>
        <g id="star">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </g>
        <g id="sync">
          <path
            d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
          ></path>
        </g>
        <g id="videocam">
          <path
            d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
          ></path>
        </g>
        <g id="warning">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
        </g>
      </defs>
    </svg>
  </iron-iconset-svg>
`;
document.head.appendChild(template$6.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ Polymer({
  is: 'iron-media-query',
  properties: {
    queryMatches: { type: Boolean, value: false, readOnly: true, notify: true },
    query: { type: String, observer: 'queryChanged' },
    full: { type: Boolean, value: false },
    _boundMQHandler: {
      value: function () {
        return this.queryHandler.bind(this);
      },
    },
    _mq: { value: null },
  },
  attached: function () {
    this.style.display = 'none';
    this.queryChanged();
  },
  detached: function () {
    this._remove();
  },
  _add: function () {
    if (this._mq) {
      this._mq.addListener(this._boundMQHandler);
    }
  },
  _remove: function () {
    if (this._mq) {
      this._mq.removeListener(this._boundMQHandler);
    }
    this._mq = null;
  },
  queryChanged: function () {
    this._remove();
    var query = this.query;
    if (!query) {
      return;
    }
    if (!this.full && query[0] !== '(') {
      query = '(' + query + ')';
    }
    this._mq = window.matchMedia(query);
    this._add();
    this.queryHandler(this._mq);
  },
  queryHandler: function (mq) {
    this._setQueryMatches(mq.matches);
  },
});
const styleMod$8 = document.createElement('dom-module');
styleMod$8.appendChild(
  html`
    <template>
      <style include="cr-hidden-style cr-icons">
        :host,
        html {
          --scrollable-border-color: var(--google-grey-300);
        }
        @media (prefers-color-scheme: dark) {
          :host,
          html {
            --scrollable-border-color: var(--google-grey-700);
          }
        }
        [actionable] {
          cursor: pointer;
        }
        .hr {
          border-top: var(--cr-separator-line);
        }
        iron-list.cr-separators > :not([first]) {
          border-top: var(--cr-separator-line);
        }
        [scrollable] {
          border-color: transparent;
          border-style: solid;
          border-width: 1px 0;
          overflow-y: auto;
        }
        [scrollable].is-scrolled {
          border-top-color: var(--scrollable-border-color);
        }
        [scrollable].can-scroll:not(.scrolled-to-bottom) {
          border-bottom-color: var(--scrollable-border-color);
        }
        [scrollable] iron-list > :not(.no-outline):focus,
        [selectable]:focus,
        [selectable] > :focus {
          background-color: var(--cr-focused-item-color);
          outline: 0;
        }
        .scroll-container {
          display: flex;
          flex-direction: column;
          min-height: 1px;
        }
        [selectable] > * {
          cursor: pointer;
        }
        .cr-centered-card-container {
          box-sizing: border-box;
          display: block;
          height: inherit;
          margin: 0 auto;
          max-width: var(--cr-centered-card-max-width);
          min-width: 550px;
          position: relative;
          width: calc(100% * var(--cr-centered-card-width-percentage));
        }
        .cr-container-shadow {
          box-shadow: inset 0 5px 6px -3px rgba(0, 0, 0, 0.4);
          height: var(--cr-container-shadow-height);
          left: 0;
          margin: 0 0 var(--cr-container-shadow-margin);
          opacity: 0;
          pointer-events: none;
          position: relative;
          right: 0;
          top: 0;
          transition: opacity 0.5s;
          z-index: 1;
        }
        #cr-container-shadow-bottom {
          margin-bottom: 0;
          margin-top: var(--cr-container-shadow-margin);
          transform: scaleY(-1);
        }
        #cr-container-shadow-bottom.has-shadow,
        #cr-container-shadow-top.has-shadow {
          opacity: var(--cr-container-shadow-max-opacity);
        }
        .cr-row {
          align-items: center;
          border-top: var(--cr-separator-line);
          display: flex;
          min-height: var(--cr-section-min-height);
          padding: 0 var(--cr-section-padding);
        }
        .cr-row.continuation,
        .cr-row.first {
          border-top: none;
        }
        .cr-row-gap {
          padding-inline-start: 16px;
        }
        .cr-button-gap {
          margin-inline-start: 8px;
        }
        paper-tooltip::part(tooltip) {
          border-radius: var(--paper-tooltip-border-radius, 2px);
          font-size: 92.31%;
          font-weight: 500;
          max-width: 330px;
          min-width: var(--paper-tooltip-min-width, 200px);
          padding: var(--paper-tooltip-padding, 10px 8px);
        }
        .cr-padded-text {
          padding-block-end: var(--cr-section-vertical-padding);
          padding-block-start: var(--cr-section-vertical-padding);
        }
        .cr-title-text {
          color: var(--cr-title-text-color);
          font-size: 107.6923%;
          font-weight: 500;
        }
        .cr-secondary-text {
          color: var(--cr-secondary-text-color);
          font-weight: 400;
        }
        .cr-form-field-label {
          color: var(--cr-form-field-label-color);
          display: block;
          font-size: var(--cr-form-field-label-font-size);
          font-weight: 500;
          letter-spacing: 0.4px;
          line-height: var(--cr-form-field-label-line-height);
          margin-bottom: 8px;
        }
        .cr-vertical-tab {
          align-items: center;
          display: flex;
        }
        .cr-vertical-tab::before {
          border-radius: 0 3px 3px 0;
          content: '';
          display: block;
          flex-shrink: 0;
          height: var(--cr-vertical-tab-height, 100%);
          width: 4px;
        }
        .cr-vertical-tab.selected::before {
          background: var(--cr-vertical-tab-selected-color, var(--cr-checked-color));
        }
        :host-context([dir='rtl']) .cr-vertical-tab::before {
          transform: scaleX(-1);
        }
        .iph-anchor-highlight {
          background-color: var(--cr-iph-anchor-highlight-color);
        }
      </style>
    </template>
  `.content
);
styleMod$8.register('cr-shared-style');
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ const template$5 = html`<dom-module id="paper-spinner-styles">
  <template>
    <style>
      /*
      /**************************/
      /* STYLES FOR THE SPINNER */
      /**************************/

      /*
       * Constants:
       *      ARCSIZE     = 270 degrees (amount of circle the arc takes up)
       *      ARCTIME     = 1333ms (time it takes to expand and contract arc)
       *      ARCSTARTROT = 216 degrees (how much the start location of the arc
       *                                should rotate each time, 216 gives us a
       *                                5 pointed star shape (it's 360/5 * 3).
       *                                For a 7 pointed star, we might do
       *                                360/7 * 3 = 154.286)
       *      SHRINK_TIME = 400ms
       */

      :host {
        display: inline-block;
        position: relative;
        width: 28px;
        height: 28px;

        /* 360 * ARCTIME / (ARCSTARTROT + (360-ARCSIZE)) */
        --paper-spinner-container-rotation-duration: 1568ms;

        /* ARCTIME */
        --paper-spinner-expand-contract-duration: 1333ms;

        /* 4 * ARCTIME */
        --paper-spinner-full-cycle-duration: 5332ms;

        /* SHRINK_TIME */
        --paper-spinner-cooldown-duration: 400ms;
      }

      #spinnerContainer {
        width: 100%;
        height: 100%;

        /* The spinner does not have any contents that would have to be
         * flipped if the direction changes. Always use ltr so that the
         * style works out correctly in both cases. */
        direction: ltr;
      }

      #spinnerContainer.active {
        animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite;
      }

      @-webkit-keyframes container-rotate {
        to {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes container-rotate {
        to {
          transform: rotate(360deg);
        }
      }

      .spinner-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        white-space: nowrap;
        color: var(--paper-spinner-color, var(--google-blue-500));
      }

      .layer-1 {
        color: var(--paper-spinner-layer-1-color, var(--google-blue-500));
      }

      .layer-2 {
        color: var(--paper-spinner-layer-2-color, var(--google-red-500));
      }

      .layer-3 {
        color: var(--paper-spinner-layer-3-color, var(--google-yellow-500));
      }

      .layer-4 {
        color: var(--paper-spinner-layer-4-color, var(--google-green-500));
      }

      /**
       * IMPORTANT NOTE ABOUT CSS ANIMATION PROPERTIES (keanulee):
       *
       * iOS Safari (tested on iOS 8.1) does not handle animation-delay very well - it doesn't
       * guarantee that the animation will start _exactly_ after that value. So we avoid using
       * animation-delay and instead set custom keyframes for each color (as layer-2undant as it
       * seems).
       */
      .active .spinner-layer {
        animation-name: fill-unfill-rotate;
        animation-duration: var(--paper-spinner-full-cycle-duration);
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        animation-iteration-count: infinite;
        opacity: 1;
      }

      .active .spinner-layer.layer-1 {
        animation-name: fill-unfill-rotate, layer-1-fade-in-out;
      }

      .active .spinner-layer.layer-2 {
        animation-name: fill-unfill-rotate, layer-2-fade-in-out;
      }

      .active .spinner-layer.layer-3 {
        animation-name: fill-unfill-rotate, layer-3-fade-in-out;
      }

      .active .spinner-layer.layer-4 {
        animation-name: fill-unfill-rotate, layer-4-fade-in-out;
      }

      @-webkit-keyframes fill-unfill-rotate {
        12.5% {
          -webkit-transform: rotate(135deg);
        } /* 0.5 * ARCSIZE */
        25% {
          -webkit-transform: rotate(270deg);
        } /* 1   * ARCSIZE */
        37.5% {
          -webkit-transform: rotate(405deg);
        } /* 1.5 * ARCSIZE */
        50% {
          -webkit-transform: rotate(540deg);
        } /* 2   * ARCSIZE */
        62.5% {
          -webkit-transform: rotate(675deg);
        } /* 2.5 * ARCSIZE */
        75% {
          -webkit-transform: rotate(810deg);
        } /* 3   * ARCSIZE */
        87.5% {
          -webkit-transform: rotate(945deg);
        } /* 3.5 * ARCSIZE */
        to {
          -webkit-transform: rotate(1080deg);
        } /* 4   * ARCSIZE */
      }

      @keyframes fill-unfill-rotate {
        12.5% {
          transform: rotate(135deg);
        } /* 0.5 * ARCSIZE */
        25% {
          transform: rotate(270deg);
        } /* 1   * ARCSIZE */
        37.5% {
          transform: rotate(405deg);
        } /* 1.5 * ARCSIZE */
        50% {
          transform: rotate(540deg);
        } /* 2   * ARCSIZE */
        62.5% {
          transform: rotate(675deg);
        } /* 2.5 * ARCSIZE */
        75% {
          transform: rotate(810deg);
        } /* 3   * ARCSIZE */
        87.5% {
          transform: rotate(945deg);
        } /* 3.5 * ARCSIZE */
        to {
          transform: rotate(1080deg);
        } /* 4   * ARCSIZE */
      }

      @-webkit-keyframes layer-1-fade-in-out {
        0% {
          opacity: 1;
        }
        25% {
          opacity: 1;
        }
        26% {
          opacity: 0;
        }
        89% {
          opacity: 0;
        }
        90% {
          opacity: 1;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes layer-1-fade-in-out {
        0% {
          opacity: 1;
        }
        25% {
          opacity: 1;
        }
        26% {
          opacity: 0;
        }
        89% {
          opacity: 0;
        }
        90% {
          opacity: 1;
        }
        to {
          opacity: 1;
        }
      }

      @-webkit-keyframes layer-2-fade-in-out {
        0% {
          opacity: 0;
        }
        15% {
          opacity: 0;
        }
        25% {
          opacity: 1;
        }
        50% {
          opacity: 1;
        }
        51% {
          opacity: 0;
        }
        to {
          opacity: 0;
        }
      }

      @keyframes layer-2-fade-in-out {
        0% {
          opacity: 0;
        }
        15% {
          opacity: 0;
        }
        25% {
          opacity: 1;
        }
        50% {
          opacity: 1;
        }
        51% {
          opacity: 0;
        }
        to {
          opacity: 0;
        }
      }

      @-webkit-keyframes layer-3-fade-in-out {
        0% {
          opacity: 0;
        }
        40% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        75% {
          opacity: 1;
        }
        76% {
          opacity: 0;
        }
        to {
          opacity: 0;
        }
      }

      @keyframes layer-3-fade-in-out {
        0% {
          opacity: 0;
        }
        40% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        75% {
          opacity: 1;
        }
        76% {
          opacity: 0;
        }
        to {
          opacity: 0;
        }
      }

      @-webkit-keyframes layer-4-fade-in-out {
        0% {
          opacity: 0;
        }
        65% {
          opacity: 0;
        }
        75% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }

      @keyframes layer-4-fade-in-out {
        0% {
          opacity: 0;
        }
        65% {
          opacity: 0;
        }
        75% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }

      .circle-clipper {
        display: inline-block;
        position: relative;
        width: 50%;
        height: 100%;
        overflow: hidden;
      }

      /**
       * Patch the gap that appear between the two adjacent div.circle-clipper while the
       * spinner is rotating (appears on Chrome 50, Safari 9.1.1, and Edge).
       */
      .spinner-layer::after {
        content: '';
        left: 45%;
        width: 10%;
        border-top-style: solid;
      }

      .spinner-layer::after,
      .circle-clipper .circle {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        border-width: var(--paper-spinner-stroke-width, 3px);
        border-radius: 50%;
      }

      .circle-clipper .circle {
        bottom: 0;
        width: 200%;
        border-style: solid;
        border-bottom-color: transparent !important;
      }

      .circle-clipper.left .circle {
        left: 0;
        border-right-color: transparent !important;
        transform: rotate(129deg);
      }

      .circle-clipper.right .circle {
        left: -100%;
        border-left-color: transparent !important;
        transform: rotate(-129deg);
      }

      .active .gap-patch::after,
      .active .circle-clipper .circle {
        animation-duration: var(--paper-spinner-expand-contract-duration);
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        animation-iteration-count: infinite;
      }

      .active .circle-clipper.left .circle {
        animation-name: left-spin;
      }

      .active .circle-clipper.right .circle {
        animation-name: right-spin;
      }

      @-webkit-keyframes left-spin {
        0% {
          -webkit-transform: rotate(130deg);
        }
        50% {
          -webkit-transform: rotate(-5deg);
        }
        to {
          -webkit-transform: rotate(130deg);
        }
      }

      @keyframes left-spin {
        0% {
          transform: rotate(130deg);
        }
        50% {
          transform: rotate(-5deg);
        }
        to {
          transform: rotate(130deg);
        }
      }

      @-webkit-keyframes right-spin {
        0% {
          -webkit-transform: rotate(-130deg);
        }
        50% {
          -webkit-transform: rotate(5deg);
        }
        to {
          -webkit-transform: rotate(-130deg);
        }
      }

      @keyframes right-spin {
        0% {
          transform: rotate(-130deg);
        }
        50% {
          transform: rotate(5deg);
        }
        to {
          transform: rotate(-130deg);
        }
      }

      #spinnerContainer.cooldown {
        animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite,
          fade-out var(--paper-spinner-cooldown-duration) cubic-bezier(0.4, 0, 0.2, 1);
      }

      @-webkit-keyframes fade-out {
        0% {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }

      @keyframes fade-out {
        0% {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    </style>
  </template>
</dom-module>`;
document.head.appendChild(template$5.content);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ const PaperSpinnerBehavior = {
  properties: {
    active: { type: Boolean, value: false, reflectToAttribute: true, observer: '__activeChanged' },
    alt: { type: String, value: 'loading', observer: '__altChanged' },
    __coolingDown: { type: Boolean, value: false },
  },
  __computeContainerClasses: function (active, coolingDown) {
    return [active || coolingDown ? 'active' : '', coolingDown ? 'cooldown' : ''].join(' ');
  },
  __activeChanged: function (active, old) {
    this.__setAriaHidden(!active);
    this.__coolingDown = !active && old;
  },
  __altChanged: function (alt) {
    if (alt === 'loading') {
      this.alt = this.getAttribute('aria-label') || alt;
    } else {
      this.__setAriaHidden(alt === '');
      this.setAttribute('aria-label', alt);
    }
  },
  __setAriaHidden: function (hidden) {
    var attr = 'aria-hidden';
    if (hidden) {
      this.setAttribute(attr, 'true');
    } else {
      this.removeAttribute(attr);
    }
  },
  __reset: function () {
    this.active = false;
    this.__coolingDown = false;
  },
};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ const template$4 = html`
  <style include="paper-spinner-styles"></style>

  <div
    id="spinnerContainer"
    class-name="[[__computeContainerClasses(active, __coolingDown)]]"
    on-animationend="__reset"
    on-webkit-animation-end="__reset"
  >
    <div class="spinner-layer">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
`;
template$4.setAttribute('strip-whitespace', '');
Polymer({ _template: template$4, is: 'paper-spinner-lite', behaviors: [PaperSpinnerBehavior] });
// Copyright 2016 The Chromium Authors
const CrSearchFieldMixin = dedupingMixin((superClass) => {
  class CrSearchFieldMixin extends superClass {
    constructor() {
      super(...arguments);
      this.effectiveValue_ = '';
      this.searchDelayTimer_ = -1;
    }
    static get properties() {
      return {
        label: { type: String, value: '' },
        clearLabel: { type: String, value: '' },
        hasSearchText: { type: Boolean, reflectToAttribute: true, value: false },
      };
    }
    getSearchInput() {
      assertNotReached();
    }
    getValue() {
      return this.getSearchInput().value;
    }
    fire_(eventName, detail) {
      this.dispatchEvent(new CustomEvent(eventName, { bubbles: true, composed: true, detail: detail }));
    }
    setValue(value, noEvent) {
      const updated = this.updateEffectiveValue_(value);
      this.getSearchInput().value = this.effectiveValue_;
      if (!updated) {
        if (value === '' && this.hasSearchText) {
          this.hasSearchText = false;
        }
        return;
      }
      this.onSearchTermInput();
      if (!noEvent) {
        this.fire_('search-changed', this.effectiveValue_);
      }
    }
    scheduleSearch_() {
      if (this.searchDelayTimer_ >= 0) {
        clearTimeout(this.searchDelayTimer_);
      }
      const length = this.getValue().length;
      const timeoutMs = length > 0 ? 500 - 100 * (Math.min(length, 4) - 1) : 0;
      this.searchDelayTimer_ = setTimeout(() => {
        this.getSearchInput().dispatchEvent(new CustomEvent('search', { composed: true, detail: this.getValue() }));
        this.searchDelayTimer_ = -1;
      }, timeoutMs);
    }
    onSearchTermSearch() {
      this.onValueChanged_(this.getValue(), false);
    }
    onSearchTermInput() {
      this.hasSearchText = this.getSearchInput().value !== '';
      this.scheduleSearch_();
    }
    onValueChanged_(newValue, noEvent) {
      const updated = this.updateEffectiveValue_(newValue);
      if (updated && !noEvent) {
        this.fire_('search-changed', this.effectiveValue_);
      }
    }
    updateEffectiveValue_(value) {
      const effectiveValue = value.replace(/\s+/g, ' ').replace(/^\s/, '');
      if (effectiveValue === this.effectiveValue_) {
        return false;
      }
      this.effectiveValue_ = effectiveValue;
      return true;
    }
  }
  return CrSearchFieldMixin;
});
const template$3 = html`
  <iron-iconset-svg name="settings20" size="20">
    <svg>
      <defs>
        <g id="account-attention">
          <path
            d="M15.0714 6.66667V3.5H16.5V7.38889H15.0714V6.66667ZM15.0714 9.83333H16.5V8.38889H15.0714V9.83333ZM9.71429 10.9444C11.6214 10.9444 15.4286 11.9122 15.4286 13.8333V16H4V13.8333C4 11.9122 7.80714 10.9444 9.71429 10.9444ZM9.71429 4.44444C10.472 4.44444 11.1988 4.74881 11.7346 5.29058C12.2704 5.83235 12.5714 6.56715 12.5714 7.33333C12.5714 8.09951 12.2704 8.83431 11.7346 9.37609C11.1988 9.91786 10.472 10.2222 9.71429 10.2222C8.95652 10.2222 8.2298 9.91786 7.69398 9.37609C7.15816 8.83431 6.85714 8.09951 6.85714 7.33333C6.85714 6.56715 7.15816 5.83235 7.69398 5.29058C8.2298 4.74881 8.95652 4.44444 9.71429 4.44444ZM9.71429 12.3167C7.59286 12.3167 5.35714 13.3711 5.35714 13.8333V14.6278H14.0714V13.8333C14.0714 13.3711 11.8357 12.3167 9.71429 12.3167ZM9.71429 5.81667C9.31646 5.81667 8.93493 5.97646 8.65363 6.26089C8.37232 6.54532 8.21429 6.93109 8.21429 7.33333C8.21429 7.73558 8.37232 8.12135 8.65363 8.40578C8.93493 8.69021 9.31646 8.85 9.71429 8.85C10.1121 8.85 10.4936 8.69021 10.7749 8.40578C11.0563 8.12135 11.2143 7.73558 11.2143 7.33333C11.2143 6.93109 11.0563 6.54532 10.7749 6.26089C10.4936 5.97646 10.1121 5.81667 9.71429 5.81667Z"
          ></path>
        </g>
        <g id="account-circle">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 1.667A8.336 8.336 0 0 0 1.667 10c0 4.6 3.733 8.333 8.333 8.333S18.333 14.6 18.333 10 14.6 1.667 10 1.667zM5.89 15.233c.359-.75 2.542-1.483 4.109-1.483 1.566 0 3.758.733 4.108 1.483A6.578 6.578 0 0 1 10 16.667a6.577 6.577 0 0 1-4.109-1.434zM10 12.083c1.216 0 4.108.492 5.3 1.942A6.625 6.625 0 0 0 16.666 10 6.676 6.676 0 0 0 10 3.333 6.676 6.676 0 0 0 3.333 10c0 1.517.517 2.908 1.367 4.025 1.191-1.45 4.083-1.942 5.3-1.942zM10 5a2.91 2.91 0 0 0-2.917 2.917A2.91 2.91 0 0 0 10 10.833a2.91 2.91 0 0 0 2.916-2.916A2.91 2.91 0 0 0 10 5zM8.75 7.917c0 .691.558 1.25 1.25 1.25.691 0 1.25-.559 1.25-1.25 0-.692-.559-1.25-1.25-1.25-.692 0-1.25.558-1.25 1.25z"
          ></path>
        </g>
        <g id="ads-click">
          <path
            d="M10 15q-2.083 0-3.542-1.458Q5 12.083 5 10q0-2.083 1.458-3.542Q7.917 5 10 5q2.083 0 3.542 1.458Q15 7.917 15 10l-1.521-.5q-.187-1.292-1.177-2.146Q11.312 6.5 10 6.5q-1.458 0-2.479 1.021Q6.5 8.542 6.5 10q0 1.312.854 2.302T9.5 13.479Zm.917 2.938q-.229.041-.459.052-.229.01-.458.01-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 .229-.01.458-.011.23-.032.459l-1.458-.459V10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5q.104 0 .229-.01.125-.011.229-.011Zm6.166.562-3.458-3.479L12.5 18 10 10l8 2.5-2.979 1.104 3.479 3.479Z"
          ></path>
        </g>
        <g id="archive">
          <path
            d="M4.5 17C4.08333 17 3.72917 16.8542 3.4375 16.5625C3.14583 16.2708 3 15.9167 3 15.5V5.625C3 5.43055 3.03472 5.24306 3.10417 5.0625C3.1875 4.86805 3.29861 4.70139 3.4375 4.5625L4.5625 3.4375C4.70139 3.29861 4.86111 3.19444 5.04167 3.125C5.23611 3.04167 5.43056 3 5.625 3H14.375C14.5694 3 14.7569 3.04167 14.9375 3.125C15.1319 3.19444 15.2986 3.29861 15.4375 3.4375L16.5625 4.5625C16.7014 4.70139 16.8056 4.86805 16.875 5.0625C16.9583 5.24306 17 5.43055 17 5.625V15.5C17 15.9167 16.8542 16.2708 16.5625 16.5625C16.2708 16.8542 15.9167 17 15.5 17H4.5ZM4.625 5.5H15.375L14.375 4.5H5.625L4.625 5.5ZM4.5 7V15.5H15.5V7H4.5ZM10 14.25L13 11.25L11.9375 10.1875L10.75 11.375V8.25H9.25V11.375L8.0625 10.1875L7 11.25L10 14.25ZM4.5 15.5H15.5H4.5Z"
          ></path>
        </g>
        <g id="auto-delete">
          <path
            d="M6.5 5.5v10ZM9.396 17H6.5q-.625 0-1.062-.438Q5 16.125 5 15.5v-10H4V4h4V3h4v1h4v1.5h-1v3.104q-.375-.062-.75-.094-.375-.031-.75.011V5.5h-7v10h2.208q.104.396.282.771.177.375.406.729ZM8 14h.5q0-1.458.5-2.312l.5-.855V7H8Zm2.5-4.25q.292-.229.677-.469.385-.239.823-.406V7h-1.5ZM14 18q-1.667 0-2.833-1.167Q10 15.667 10 14q0-1.667 1.167-2.833Q12.333 10 14 10q1.667 0 2.833 1.167Q18 12.333 18 14q0 1.667-1.167 2.833Q15.667 18 14 18Zm1.146-2.146.708-.708-1.354-1.354V12h-1v2.208Z"
          ></path>
        </g>
        <g id="background-replace">
          <path
            d="M3 8.104V6.333L6.333 3h1.792Zm0-3.896V3h1.208Zm10.188 1.521Q13 5.5 12.76 5.281q-.239-.219-.51-.385L14.167 3h1.791Zm-8.73 6.938 2.063-2.042q.167.25.364.458.198.209.365.375l-.25.25q-.625.146-1.312.407-.688.26-1.23.552Zm9.667-3.979q0-.021.021-.136.021-.114.021-.156 0-.354-.052-.688-.053-.333-.157-.625L17 4.062v1.771Zm-5.354-4.23L10.271 3h1.771l-1.313 1.312q-.187-.041-.364-.052-.177-.01-.344-.01-.354 0-.667.052-.312.052-.583.156Zm-5.729 7.521v-1.771l3.062-3.041q-.104.291-.166.604-.063.312-.063.625 0 .166.01.333.011.167.053.354Zm13.729 1.833q-.167-.25-.365-.479-.198-.229-.489-.416L17 11.854v1.75ZM14.5 12.188q-.125-.042-.292-.105-.166-.062-.312-.104-.167-.062-.354-.114-.188-.053-.375-.094L17 7.938v1.791Zm-4.479-.688q-1.313 0-2.219-.917-.906-.916-.906-2.187 0-1.292.906-2.208.906-.917 2.219-.917 1.291 0 2.198.917.906.916.906 2.208 0 1.271-.906 2.187-.907.917-2.198.917Zm0-1.5q.667 0 1.135-.469.469-.469.469-1.135 0-.667-.469-1.146-.468-.479-1.135-.479t-1.146.479q-.479.479-.479 1.146 0 .666.479 1.135t1.146.469ZM4 17v-1.5q0-.604.323-1.125t.865-.813q1.124-.583 2.333-.895 1.208-.313 2.479-.313 1.25 0 2.458.313 1.209.312 2.334.895.541.292.875.813.333.521.333 1.125V17Zm1.5-1.5h9q0-.208-.125-.354t-.292-.25q-.937-.5-1.979-.771T10 13.854q-1.062 0-2.104.261-1.042.26-1.979.76-.188.104-.302.26-.115.157-.115.365Z"
          ></path>
        </g>
        <g id="bar-chart">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 16V8h3v8Zm4.5 0V4h3v12Zm4.5 0v-6h3v6Z"></path>
        </g>
        <g id="block">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.99984 1.66667C5.39984 1.66667 1.6665 5.40001 1.6665 10C1.6665 14.6 5.39984 18.3333 9.99984 18.3333C14.5998 18.3333 18.3332 14.6 18.3332 10C18.3332 5.40001 14.5998 1.66667 9.99984 1.66667ZM3.33317 10C3.33317 6.31667 6.3165 3.33334 9.99984 3.33334C11.5415 3.33334 12.9582 3.85834 14.0832 4.74167L4.7415 14.0833C3.85817 12.9583 3.33317 11.5417 3.33317 10ZM5.9165 15.2583C7.0415 16.1417 8.45817 16.6667 9.99984 16.6667C13.6832 16.6667 16.6665 13.6833 16.6665 10C16.6665 8.45834 16.1415 7.04167 15.2582 5.91667L5.9165 15.2583Z"
          ></path>
        </g>
        <g id="broken">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.8333 2.5H4.16667C3.25 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V4.16667C17.5 3.25 16.75 2.5 15.8333 2.5ZM15.8333 4.16667V9.29167L14 7L11.3333 10.3333L8.66667 7L6 10.3333L4.16667 8.04167V4.16667H15.8333ZM4.16667 10.7083V15.8333H15.8417V11.9583L14.0083 9.66667L11.3333 13L8.66667 9.66667L6 13L4.16667 10.7083Z"
          ></path>
        </g>
        <g id="check-circle-outline">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.99984 1.66663C5.39984 1.66663 1.6665 5.39996 1.6665 9.99996C1.6665 14.6 5.39984 18.3333 9.99984 18.3333C14.5998 18.3333 18.3332 14.6 18.3332 9.99996C18.3332 5.39996 14.5998 1.66663 9.99984 1.66663ZM9.99984 16.6666C6.32484 16.6666 3.33317 13.675 3.33317 9.99996C3.33317 6.32496 6.32484 3.33329 9.99984 3.33329C13.6748 3.33329 16.6665 6.32496 16.6665 9.99996C16.6665 13.675 13.6748 16.6666 9.99984 16.6666ZM6.1665 9.66663L8.33317 11.8333L13.8332 6.33329L14.9998 7.49996L8.33317 14.1666L4.99984 10.8333L6.1665 9.66663Z"
          ></path>
        </g>
        <g id="checklist">
          <path
            d="M4.833 15.5 2 12.667l1.062-1.063 1.75 1.771 3.542-3.542 1.084 1.063Zm0-6.5L2 6.167l1.062-1.063 1.771 1.771 3.521-3.542 1.084 1.063ZM11 14v-1.5h7V14Zm0-6.5V6h7v1.5Z"
          ></path>
        </g>
        <g id="credit-card">
          <path
            d="M16.4,4 L3.6,4 C2.716,4 2.008,4.7271875 2.008,5.625 L2,15.375 C2,16.2728125 2.716,17 3.6,17 L16.4,17 C17.284,17 18,16.2728125 18,15.375 L18,5.625 C18,4.7271875 17.284,4 16.4,4 Z M16.5,15 L3.5,15 L3.5,10 L16.5,10 L16.5,15 Z M16.5,7 L3.5,7 L3.5,5.5 L16.5,5.5 L16.5,7 Z"
          ></path>
        </g>
        <g id="dashboard">
          <path
            d="M3 10.5V4.5C3 4.08333 3.14583 3.72917 3.4375 3.4375C3.74306 3.14583 4.09722 3 4.5 3H9.25V10.5H3ZM10.75 3H15.5C15.9167 3 16.2708 3.14583 16.5625 3.4375C16.8542 3.72917 17 4.08333 17 4.5V8H10.75V3ZM10.75 17V9.5H17V15.5C17 15.9028 16.8542 16.2569 16.5625 16.5625C16.2708 16.8542 15.9167 17 15.5 17H10.75ZM3 12H9.25V17H4.5C4.09722 17 3.74306 16.8542 3.4375 16.5625C3.14583 16.2569 3 15.9028 3 15.5V12ZM4.5 9H7.75V4.5H4.5V9ZM12.25 6.5H15.5V4.5H12.25V6.5ZM12.25 11V15.5H15.5V11H12.25ZM4.5 13.5V15.5H7.75V13.5H4.5Z"
          ></path>
        </g>
        <g id="data">
          <path d="M0 0h20v20H0z" fill="none" fill-rule="evenodd"></path>
          <path d="M6.5 7v9H4V7h2.5zm5-3v12H9V4h2.5zm5 7v5H14v-5h2.5z"></path>
        </g>
        <g id="data-connectors-system">
          <path
            d="M10 4.16667C10.0833 4.16667 10.2333 4.18333 10.3667 4.30833L13.025 6.96667L15.675 9.60833C15.8083 9.74167 15.825 9.9 15.825 10.0167V10.0417C15.825 10.125 15.8 10.2 15.7667 10.2667C15.7583 10.2833 15.75 10.3 15.7417 10.3083C15.725 10.3333 15.7 10.3667 15.675 10.3917L10.4 15.65L10.3583 15.6917C10.2333 15.8167 10.0833 15.8333 10 15.8333C9.91667 15.8333 9.75 15.8167 9.61667 15.675L4.325 10.3833C4.18333 10.2583 4.16667 10.1 4.16667 9.99167C4.16667 9.90833 4.18333 9.75 4.31667 9.60833L6.44167 7.48333L9.60833 4.325C9.75 4.18333 9.91667 4.16667 10 4.16667ZM10 2.5C9.43333 2.5 8.86667 2.71667 8.44167 3.14167L5.275 6.3L3.15 8.425C2.70833 8.85833 2.5 9.43333 2.5 10C2.5 10.5667 2.70833 11.1417 3.14167 11.575L5.26667 13.7L8.43333 16.8583C8.86667 17.2833 9.43333 17.5 10 17.5C10.5667 17.5 11.1333 17.2833 11.5583 16.8583L16.8583 11.575C16.9667 11.4667 17.0583 11.35 17.1417 11.2333C17.1833 11.175 17.2167 11.1083 17.25 11.05C17.4167 10.7333 17.5 10.375 17.5 10.025C17.5 10.0167 17.5 10.0167 17.5 10.0083C17.5083 9.44167 17.2917 8.86667 16.8583 8.43333L11.5583 3.15C11.1333 2.71667 10.5667 2.5 10 2.5Z"
          ></path>
          <path d="M10 11.6667L8.33333 10L10 8.33333L11.6667 10L10 11.6667Z"></path>
          <path
            d="M10.5917 7.25833C10.9167 6.93333 10.9167 6.40833 10.5917 6.08333C10.2667 5.75833 9.74167 5.75833 9.41667 6.08333C9.09167 6.40833 9.09167 6.93333 9.41667 7.25833C9.73333 7.58333 10.2667 7.58333 10.5917 7.25833Z"
          ></path>
          <path
            d="M7.25833 10.5917C7.58333 10.2667 7.58333 9.74167 7.25833 9.41667C6.93333 9.09167 6.40833 9.09167 6.08333 9.41667C5.75833 9.74167 5.75833 10.2667 6.08333 10.5917C6.4 10.9167 6.93333 10.9167 7.25833 10.5917Z"
          ></path>
          <path
            d="M10.5917 13.925C10.9167 13.6 10.9167 13.075 10.5917 12.75C10.2667 12.425 9.74167 12.425 9.41667 12.75C9.09167 13.075 9.09167 13.6 9.41667 13.925C9.73333 14.25 10.2667 14.25 10.5917 13.925Z"
          ></path>
          <path
            d="M13.925 10.5917C14.25 10.2667 14.25 9.74167 13.925 9.41667C13.6 9.09167 13.075 9.09167 12.75 9.41667C12.425 9.74167 12.425 10.2667 12.75 10.5917C13.0667 10.9167 13.6 10.9167 13.925 10.5917Z"
          ></path>
        </g>
        <g id="delete">
          <path
            d="M6.5 17q-.625 0-1.062-.438Q5 16.125 5 15.5v-10H4V4h4V3h4v1h4v1.5h-1v10q0 .625-.438 1.062Q14.125 17 13.5 17Zm7-11.5h-7v10h7ZM8 14h1.5V7H8Zm2.5 0H12V7h-1.5Zm-4-8.5v10Z"
          ></path>
        </g>
        <g id="delete-forever">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.4999 3.33333V2.5H7.49992V3.33333H3.33325V5H4.16659V15.8333C4.16659 16.75 4.91659 17.5 5.83325 17.5H14.1666C15.0833 17.5 15.8333 16.75 15.8333 15.8333V5H16.6666V3.33333H12.4999ZM14.1666 5V15.8333H5.83325V5H14.1666ZM9.99992 11.5917L7.84158 13.75L6.66658 12.575L8.82492 10.4167L6.66658 8.25833L7.84158 7.08333L9.99992 9.24167L12.1583 7.08333L13.3333 8.25833L11.1749 10.4167L13.3333 12.575L12.1583 13.75L9.99992 11.5917Z"
          ></path>
        </g>
        <g id="dns">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.6667 2.5H3.33333C2.875 2.5 2.5 2.875 2.5 3.33333V9.16667C2.5 9.625 2.875 10 3.33333 10H16.6667C17.125 10 17.5 9.625 17.5 9.16667V3.33333C17.5 2.875 17.125 2.5 16.6667 2.5ZM7.5 6.25C7.5 6.94036 6.94036 7.5 6.25 7.5C5.55964 7.5 5 6.94036 5 6.25C5 5.55964 5.55964 5 6.25 5C6.94036 5 7.5 5.55964 7.5 6.25ZM7.5 14.5833C7.5 15.2737 6.94036 15.8333 6.25 15.8333C5.55964 15.8333 5 15.2737 5 14.5833C5 13.893 5.55964 13.3333 6.25 13.3333C6.94036 13.3333 7.5 13.893 7.5 14.5833ZM4.16667 8.33333H15.8333V4.16667H4.16667V8.33333ZM16.6667 10.8333H3.33333C2.875 10.8333 2.5 11.2083 2.5 11.6667V17.5C2.5 17.9583 2.875 18.3333 3.33333 18.3333H16.6667C17.125 18.3333 17.5 17.9583 17.5 17.5V11.6667C17.5 11.2083 17.125 10.8333 16.6667 10.8333ZM4.16667 16.6667H15.8333V12.5H4.16667V16.6667Z"
          ></path>
        </g>
        <g id="experiment">
          <path
            d="M17.2667 14.7583L12.5 8.18332V4.23332H14.1667V2.56665H5.83332V4.23332H7.49998V8.17498L2.61665 14.9166C2.24998 15.425 2.19998 16.0917 2.48332 16.65C2.76665 17.2083 3.34165 17.5583 3.96665 17.5583H16.05C16.9667 17.5583 17.7167 16.8083 17.7167 15.8917C17.7167 15.4583 17.5416 15.0583 17.2667 14.7583Z"
            fill="#5F6368"
          ></path>
        </g>
        <g id="filter-list"><path d="M8 14.5V13h4v1.5Zm-3-3.75v-1.5h10v1.5ZM3 7V5.5h14V7Z"></path></g>
        <g id="flash-on">
          <path d="M5.83337 1.66666V10.8333H8.33337V18.3333L14.1667 8.33332H10.8334L13.3334 1.66666H5.83337Z"></path>
        </g>
        <g id="googleg">
          <path
            d="M16.58 8H9v2.75h4.47c-.24 1.2-1.42 3.27-4.47 3.27-2.72 0-4.93-2.25-4.93-5.02S6.28 3.98 9 3.98c1.54 0 2.57.66 3.17 1.22l2.19-2.12C12.97 1.79 11.16 1 9 1 4.58 1 1 4.58 1 9s3.58 8 8 8c4.62 0 7.68-3.25 7.68-7.82 0-.46-.04-.83-.1-1.18z"
          ></path>
        </g>
        <g id="history">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.33341 5.00832V3.33332H1.66675V8.33332H6.66675V6.66666H4.24175C5.39175 4.67499 7.53341 3.33332 10.0001 3.33332C13.6834 3.33332 16.6667 6.31666 16.6667 9.99999C16.6667 13.6833 13.6834 16.6667 10.0001 16.6667C6.31675 16.6667 3.33341 13.6833 3.33341 9.99999H1.66675C1.66675 14.6 5.40008 18.3333 10.0084 18.3333C14.6084 18.3333 18.3334 14.6 18.3334 9.99999C18.3334 5.39999 14.6084 1.66666 10.0084 1.66666C7.27508 1.66666 4.85841 2.98332 3.33341 5.00832ZM10.8334 4.99999V9.99999L14.3584 12.45L13.3084 13.7417L9.16675 10.8333V4.99999H10.8334Z"
          ></path>
        </g>
        <g id="incognito" fill="#5F6368">
          <circle cx="6.8" cy="12.964" r="1.764" />
          <path
            d="M10 0C4.473 0 0 4.473 0 10s4.473 10 10 10 10-4.473 10-10S15.527 0 10 0zM7.619 4.1a.696.696 0 0 1 .881-.419l1.473.492 1.463-.492a.716.716 0 0 1 .883.419l1.608 4.291H6.02l1.6-4.291zm5.517 11.328a2.463 2.463 0 0 1-2.445-2.256c-.682-.436-1.237-.162-1.455-.017a2.45 2.45 0 0 1-2.445 2.263 2.471 2.471 0 0 1-2.464-2.463 2.47 2.47 0 0 1 2.463-2.464c1.165 0 2.138.809 2.391 1.9a1.934 1.934 0 0 1 1.546.009 2.462 2.462 0 0 1 2.392-1.909 2.47 2.47 0 0 1 2.462 2.463 2.435 2.435 0 0 1-2.445 2.474zM16.31 9.8H3.637v-.709H16.31V9.8h-.001z"
          />
          <circle cx="13.136" cy="12.964" r="1.764" />
        </g>
        <g id="incognito-unfilled">
          <path d="M17.5 9.16667H2.5V10H17.5V9.16667Z"></path>
          <path
            d="M14.6833 8.33334L12.775 3.25001C12.6167 2.83334 12.1583 2.60834 11.7333 2.75L10 3.33334L8.25833 2.75C7.83333 2.60834 7.375 2.83334 7.21667 3.25001L5.31667 8.33334H14.6833Z"
          ></path>
          <path
            d="M13.75 10.8333C12.3667 10.8333 11.2167 11.8 10.9167 13.0917C10.2167 12.7917 9.56667 12.875 9.08333 13.0833C8.775 11.7917 7.625 10.8333 6.25 10.8333C4.64167 10.8333 3.33333 12.1417 3.33333 13.75C3.33333 15.3583 4.64167 16.6667 6.25 16.6667C7.78333 16.6667 9.025 15.4833 9.14167 13.9833C9.39167 13.8083 10.05 13.4833 10.8583 14C10.9917 15.4917 12.225 16.6667 13.75 16.6667C15.3583 16.6667 16.6667 15.3583 16.6667 13.75C16.6667 12.1417 15.3583 10.8333 13.75 10.8333ZM6.25 15.8333C5.1 15.8333 4.16667 14.9 4.16667 13.75C4.16667 12.6 5.1 11.6667 6.25 11.6667C7.4 11.6667 8.33333 12.6 8.33333 13.75C8.33333 14.9 7.4 15.8333 6.25 15.8333ZM13.75 15.8333C12.6 15.8333 11.6667 14.9 11.6667 13.75C11.6667 12.6 12.6 11.6667 13.75 11.6667C14.9 11.6667 15.8333 12.6 15.8333 13.75C15.8333 14.9 14.9 15.8333 13.75 15.8333Z"
          ></path>
        </g>
        <g id="interests">
          <path
            d="m2 9 4-7 4 7Zm4 8q-1.25 0-2.125-.875T3 14q0-1.25.875-2.125T6 11q1.25 0 2.125.875T9 14q0 1.25-.875 2.125T6 17Zm0-1.5q.625 0 1.062-.438Q7.5 14.625 7.5 14t-.438-1.062Q6.625 12.5 6 12.5t-1.062.438Q4.5 13.375 4.5 14t.438 1.062Q5.375 15.5 6 15.5Zm-1.396-8h2.792L6 5.021ZM11 17v-6h6v6Zm1.5-1.5h3v-3h-3ZM14 9q-1.125-.938-1.854-1.552-.729-.615-1.167-1.083-.437-.469-.614-.865t-.177-.896q0-.875.583-1.489.583-.615 1.5-.615.541 0 .969.219.427.219.76.677.333-.458.771-.677.437-.219.958-.219.917 0 1.5.615.583.614.583 1.489 0 .5-.166.896-.167.396-.604.854-.438.458-1.177 1.073Q15.125 8.042 14 9Zm0-2q1.417-1.188 1.865-1.635.447-.448.447-.782 0-.229-.166-.406Q15.979 4 15.75 4q-.167 0-.312.083-.146.084-.25.209L14 5.396l-1.167-1.104q-.125-.125-.271-.209Q12.417 4 12.25 4q-.229 0-.396.177-.166.177-.166.406 0 .355.468.813Q12.625 5.854 14 7Zm0-1.604Zm-7.979 1Zm0 7.542Zm7.958 0Z"
          ></path>
        </g>
        <g id="lightbulb">
          <path
            d="M7.49996 17.5C7.49996 17.9583 7.87496 18.3333 8.33329 18.3333H11.6666C12.125 18.3333 12.5 17.9583 12.5 17.5V16.6667H7.49996V17.5ZM9.99996 1.66667C6.78329 1.66667 4.16663 4.28334 4.16663 7.50001C4.16663 9.48334 5.15829 11.225 6.66663 12.2833V14.1667C6.66663 14.625 7.04163 15 7.49996 15H12.5C12.9583 15 13.3333 14.625 13.3333 14.1667V12.2833C14.8416 11.225 15.8333 9.48334 15.8333 7.50001C15.8333 4.28334 13.2166 1.66667 9.99996 1.66667ZM12.375 10.9167L11.6666 11.4167V13.3333H8.33329V11.4167L7.62496 10.9167C6.49996 10.1333 5.83329 8.85834 5.83329 7.50001C5.83329 5.20001 7.69996 3.33334 9.99996 3.33334C12.3 3.33334 14.1666 5.20001 14.1666 7.50001C14.1666 8.85834 13.5 10.1333 12.375 10.9167Z"
          ></path>
        </g>
        <g id="link">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.16663 12.5H5.83329C4.45829 12.5 3.33329 11.375 3.33329 10C3.33329 8.62501 4.45829 7.50001 5.83329 7.50001H9.16663V5.83334H5.83329C3.53329 5.83334 1.66663 7.70001 1.66663 10C1.66663 12.3 3.53329 14.1667 5.83329 14.1667H9.16663V12.5ZM14.1666 5.83334H10.8333V7.50001H14.1666C15.5416 7.50001 16.6666 8.62501 16.6666 10C16.6666 11.375 15.5416 12.5 14.1666 12.5H10.8333V14.1667H14.1666C16.4666 14.1667 18.3333 12.3 18.3333 10C18.3333 7.70001 16.4666 5.83334 14.1666 5.83334ZM13.3333 9.16668H6.66663V10.8333H13.3333V9.16668Z"
          ></path>
        </g>
        <g id="logout">
          <path
            d="M14.1665 5.83333L12.9915 7.00833L15.1415 9.16667H6.6665V10.8333H15.1415L12.9915 12.9833L14.1665 14.1667L18.3332 10L14.1665 5.83333ZM3.33317 4.16667H9.99984V2.5H3.33317C2.4165 2.5 1.6665 3.25 1.6665 4.16667V15.8333C1.6665 16.75 2.4165 17.5 3.33317 17.5H9.99984V15.8333H3.33317V4.16667Z"
          ></path>
        </g>
        <g id="performance-max">
          <path
            d="m4.625 14-1.083-1.062L8 8.5l3.25 3.25 4.146-4.021 1.062 1.063-5.208 5.104L8 10.625Zm6.625-5-.771-1.729L8.75 6.5l1.729-.771L11.25 4l.771 1.729 1.729.771-1.729.771Z"
          ></path>
        </g>
        <g id="public">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 1.667A8.336 8.336 0 0 0 1.667 10c0 4.6 3.733 8.333 8.333 8.333S18.333 14.6 18.333 10 14.6 1.667 10 1.667zM3.333 10c0-.508.067-1.008.175-1.483L7.492 12.5v.833c0 .917.75 1.667 1.666 1.667v1.608C5.883 16.192 3.333 13.392 3.333 10zm9.992 3.333c.75 0 1.367.492 1.583 1.167a6.66 6.66 0 0 0 1.758-4.5 6.67 6.67 0 0 0-4.175-6.175v.342c0 .916-.75 1.666-1.666 1.666H9.158V7.5a.836.836 0 0 1-.833.833H6.658V10h5c.459 0 .834.375.834.833v2.5h.833z"
          ></path>
        </g>
        <g id="security">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.183 4.7L10 1.667 16.816 4.7v4.542c0 4.208-2.908 8.133-6.816 9.091-3.909-.958-6.817-4.883-6.817-9.091V4.7zM15.3 9.992H10V3.325L4.7 5.683V10l5.3-.008v6.775c2.816-.875 4.9-3.65 5.3-6.775z"
          ></path>
        </g>
        <g id="shoppingcart">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.1585 10.8333H12.8502C13.4502 10.8333 14.0002 10.5083 14.3002 9.99167L17.0335 5.20001C17.2502 4.81667 17.2502 4.33334 17.0335 3.95001C16.8168 3.56667 16.3918 3.33334 15.9502 3.33334H4.61683L3.87516 1.66667H0.833496V3.33334H2.79183L5.74183 9.98334L4.85016 11.7583C4.59183 12.275 4.61683 12.8833 4.92516 13.3833C5.2335 13.8833 5.7585 14.175 6.34183 14.175H15.8335V12.5083H6.35016L7.1835 10.8417H12.1585V10.8333ZM7.50016 16.6667C7.50016 17.5871 6.75397 18.3333 5.8335 18.3333C4.91302 18.3333 4.16683 17.5871 4.16683 16.6667C4.16683 15.7462 4.91302 15 5.8335 15C6.75397 15 7.50016 15.7462 7.50016 16.6667ZM15.8335 16.6667C15.8335 17.5871 15.0873 18.3333 14.1668 18.3333C13.2464 18.3333 12.5002 17.5871 12.5002 16.6667C12.5002 15.7462 13.2464 15 14.1668 15C15.0873 15 15.8335 15.7462 15.8335 16.6667ZM12.8502 9.16667L15.2335 5.00001H5.3585L7.2085 9.16667H12.8502Z"
          ></path>
        </g>
        <g id="spam">
          <path
            d="M15.0714 6.66667V3.5H16.5V7.38889H15.0714V6.66667ZM15.0714 9.83333H16.5V8.38889H15.0714V9.83333ZM9.71429 10.9444C11.6214 10.9444 15.4286 11.9122 15.4286 13.8333V16H4V13.8333C4 11.9122 7.80714 10.9444 9.71429 10.9444ZM9.71429 4.44444C10.472 4.44444 11.1988 4.74881 11.7346 5.29058C12.2704 5.83235 12.5714 6.56715 12.5714 7.33333C12.5714 8.09951 12.2704 8.83431 11.7346 9.37609C11.1988 9.91786 10.472 10.2222 9.71429 10.2222C8.95652 10.2222 8.2298 9.91786 7.69398 9.37609C7.15816 8.83431 6.85714 8.09951 6.85714 7.33333C6.85714 6.56715 7.15816 5.83235 7.69398 5.29058C8.2298 4.74881 8.95652 4.44444 9.71429 4.44444ZM9.71429 12.3167C7.59286 12.3167 5.35714 13.3711 5.35714 13.8333V14.6278H14.0714V13.8333C14.0714 13.3711 11.8357 12.3167 9.71429 12.3167ZM9.71429 5.81667C9.31646 5.81667 8.93493 5.97646 8.65363 6.26089C8.37232 6.54532 8.21429 6.93109 8.21429 7.33333C8.21429 7.73558 8.37232 8.12135 8.65363 8.40578C8.93493 8.69021 9.31646 8.85 9.71429 8.85C10.1121 8.85 10.4936 8.69021 10.7749 8.40578C11.0563 8.12135 11.2143 7.73558 11.2143 7.33333C11.2143 6.93109 11.0563 6.54532 10.7749 6.26089C10.4936 5.97646 10.1121 5.81667 9.71429 5.81667Z"
          ></path>
        </g>
        <g id="timer">
          <path
            d="M7.5 3V1.5H12.5V3H7.5ZM9.25 12H10.75V7H9.25V12ZM10 18C9.02778 18 8.11806 17.8194 7.27083 17.4583C6.42361 17.0833 5.68056 16.5833 5.04167 15.9583C4.41667 15.3194 3.91667 14.5764 3.54167 13.7292C3.18056 12.8819 3 11.9722 3 11C3 10.0278 3.18056 9.11806 3.54167 8.27083C3.91667 7.42361 4.41667 6.6875 5.04167 6.0625C5.68056 5.42361 6.42361 4.92361 7.27083 4.5625C8.11806 4.1875 9.02778 4 10 4C10.8056 4 11.5764 4.13889 12.3125 4.41667C13.0625 4.68055 13.7569 5.05555 14.3958 5.54167L15.4792 4.47917L16.5208 5.52083L15.4583 6.60417C15.9444 7.22917 16.3194 7.91667 16.5833 8.66667C16.8611 9.41667 17 10.1944 17 11C17 11.9722 16.8125 12.8819 16.4375 13.7292C16.0764 14.5764 15.5764 15.3194 14.9375 15.9583C14.3125 16.5833 13.5764 17.0833 12.7292 17.4583C11.8819 17.8194 10.9722 18 10 18ZM10 16.5C11.5278 16.5 12.8264 15.9653 13.8958 14.8958C14.9653 13.8264 15.5 12.5278 15.5 11C15.5 9.47222 14.9653 8.17361 13.8958 7.10417C12.8264 6.03472 11.5278 5.5 10 5.5C8.47222 5.5 7.17361 6.03472 6.10417 7.10417C5.03472 8.17361 4.5 9.47222 4.5 11C4.5 12.5278 5.03472 13.8264 6.10417 14.8958C7.17361 15.9653 8.47222 16.5 10 16.5Z"
          ></path>
        </g>
        <g id="undo">
          <path
            d="M11.8335 15.8333H5.8335V14.5833H11.8543C12.8266 14.5833 13.6634 14.2604 14.3647 13.6146C15.0661 12.9687 15.4168 12.1666 15.4168 11.2083C15.4168 10.25 15.0661 9.4479 14.3647 8.80206C13.6634 8.15623 12.8266 7.83331 11.8543 7.83331H5.7085L8.0835 10.2083L7.2085 11.0833L3.3335 7.20831L7.2085 3.33331L8.0835 4.20831L5.7085 6.58331H11.8335C13.1529 6.58331 14.2884 7.02776 15.2397 7.91665C16.1911 8.80554 16.6668 9.90276 16.6668 11.2083C16.6668 12.5139 16.1911 13.6111 15.2397 14.5C14.2884 15.3889 13.1529 15.8333 11.8335 15.8333Z"
          ></path>
        </g>
        <g id="volume-down">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 13H4.46667L8 16.5V3.5L4.46667 7H1V13ZM10 6.5V13.5C11.776 12.8652 12.5 11.0043 12.5 10C12.5 8.99565 11.776 7.14348 10 6.5Z"
          ></path>
        </g>
        <g id="volume-up">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 13H4.46667L8 16.4V3.40002L4.46667 7.00002H1V13ZM10 6.40002V13.4C11.776 12.7652 12.5 10.9044 12.5 9.90002C12.5 8.89568 11.776 7.0435 10 6.40002ZM10 4.16171C12.4771 4.89717 14.5 7.18908 14.5 9.90002C14.5 12.611 12.4771 14.9029 10 15.6383V17.4C13.4371 16.6218 16 13.5602 16 9.90002C16 6.23982 13.4371 3.17825 10 2.40002V4.16171Z"
          ></path>
        </g>
        <g id="volume-up-off">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 6.513V7.97617L12.4583 10.5528C12.6093 10.1206 12.5 7.42639 10 6.513ZM13.9946 12.3314L15.1797 13.4534C15.7487 12.3314 16 11.3267 16 9.9645C16 6.07761 13 3.12889 10 2.49896V4.2774C12.6423 5.05842 14.5 7.5 14.5 9.9645C14.5 10.8182 14.3055 11.5867 13.9946 12.3314ZM1 3.12889L4.71387 6.74969L4.5 7H1V13H4.5L8 16.5V10L12.5 14.3494C11.7872 14.8533 11.5515 15.2067 10 15.7357V17.4865C11.4697 17.2198 12.4473 16.5573 13.5598 15.6162L15.8711 18L17 16.8711L2.12889 2L1 3.12889ZM6.573 4.83173L8 6.16345V3.5L6.573 4.83173Z"
          ></path>
        </g>
        <g id="volume-zero">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 13H4.46667L8 16.5V3.5L4.46667 7H1V13Z"></path>
        </g>
        <g id="vpn-key">
          <path
            d="M10.4727273,8 C9.87272727,6.2525 8.26181818,5 6.36363636,5 C3.95272727,5 2,7.01375 2,9.5 C2,11.98625 3.95272727,14 6.36363636,14 C8.26181818,14 9.87272727,12.7475 10.4727273,11 L13.6363636,11 L13.6363636,14 L16.5454545,14 L16.5454545,11 L18,11 L18,8 L10.4727273,8 Z M6.36363636,11 C5.56,11 4.90909091,10.32875 4.90909091,9.5 C4.90909091,8.67125 5.56,8 6.36363636,8 C7.16727273,8 7.81818182,8.67125 7.81818182,9.5 C7.81818182,10.32875 7.16727273,11 6.36363636,11 Z"
          ></path>
        </g>
        <g id="cloud-off">
          <path
            d="M16.4732571,13.3443682 C16.8002856,12.9882746 17,12.5134184 17,11.9922 C17,10.8882 16.104,9.9922 15,9.9922 L13.494,9.9922 L13.494,9.0002 C13.494,7.0672 11.927,5.5002 9.994,5.5002 C9.5847901,5.5002 9.1930204,5.57089988 8.82954884,5.70065995 L7.33083687,4.20194798 C8.11843435,3.75577808 9.02717677,3.5002 10,3.5002 C12.71,3.5002 14.957,5.4612 15.411,8.0412 C17.424,8.2502 19,9.9312 19,12.0002 C19,13.0718701 18.5784721,14.0451601 17.8921876,14.7632987 L16.4732571,13.3443682 Z M17.8711111,17 L16.8711111,18 L14.8713111,16.0002 L6,16.0002 C3.239,16.0002 1,13.7622 1,11.0002 C1,8.58475294 2.71868905,6.59044755 4.99627833,6.12516722 L2,3.12888889 L3,2.12888889 L17.8711111,17 Z M6.86331111,7.9922 L6,7.9922 C4.343,7.9922 3,9.3352 3,10.9922 C3,12.6492 4.343,13.9922 6,13.9922 L12.8633111,13.9922 L6.86331111,7.9922 Z"
          ></path>
        </g>

        <g id="printer-add">
          <path
            d="M17.8734304,8.29826826 C17.2839707,8.10470383 16.6542128,8 16,8 C13.3875623,8 11.1650842,9.66961525 10.3414114,12 L7,12 L7,15 L10.0829584,15 C10.2034032,15.7179235 10.4513404,16.3926158 10.8026932,17 L5,17 L5,14 L2,14 L2,9 C2,7.8954305 2.8954305,7 4,7 L5,7 L5,3 L15,3 L15,7 L16,7 C16.8576527,7 17.5892179,7.53984453 17.8734304,8.29826826 Z M7,5 L7,7 L13,7 L13,5 L7,5 Z"
          ></path>
          <polygon
            fill="#4285F4"
            points="17 13 19 13 19 15 17 15 17 17 15 17 15 15 13 15 13 13 15 13 15 11 17 11"
          ></polygon>
        </g>
        <g id="safety-check">
          <path
            d="M10,1 L18,4.27272727 L18,9.18181818 C18,13.7227273 14.5866667,17.9690909 10,19 C5.41333333,17.9690909 2,13.7227273 2,9.18181818 L2,9.18181818 L2,4.27272727 L10,1 Z M13.57,6.38363636 L8.44444444,11.7754545 L6.43,9.66454545 L5.33333333,10.8181818 L8.44444444,14.0909091 L14.6666667,7.54545455 L13.57,6.38363636z"
          ></path>
        </g>
        <g id="web-asset">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.333 3.333h13.334c.924 0 1.666.75 1.666 1.667v10c0 .917-.75 1.667-1.666 1.667H3.332c-.925 0-1.667-.75-1.667-1.667V5c0-.917.742-1.667 1.667-1.667zm0 11.667h13.334V6.667H3.332V15z"
          ></path>
        </g>
        <g id="wind-rose">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.0001 18L8.70904 11.2912L2 10L8.70902 8.7089L10.0001 2L11.2913 8.70895L18 10L11.2913 11.2911L10.0001 18ZM9.99983 10.8889C10.4907 10.8889 10.8887 10.4909 10.8887 10C10.8887 9.5091 10.4907 9.11113 9.99983 9.11113C9.50891 9.11113 9.11094 9.5091 9.11094 10C9.11094 10.4909 9.50891 10.8889 9.99983 10.8889Z"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.81445 13.0941L7.66761 12.3311L6.90682 12.1847L5.00032 15L7.81445 13.0941ZM12.1835 13.0927L14.9997 15L13.0931 12.1846L12.33 12.3315L12.1835 13.0927ZM13.0933 7.81559L15 5L12.1835 6.90749L12.33 7.66869L13.0933 7.81559ZM7.81442 6.90608L5 5L6.90662 7.81552L7.66759 7.66907L7.81442 6.90608Z"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
          ></path>
        </g>
      </defs>
    </svg>
  </iron-iconset-svg>

  <iron-iconset-svg name="settings" size="24">
    <svg>
      <defs>
        <g id="ads">
          <path
            d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H5V8h14v10z"
          ></path>
        </g>
        <g id="ads-off">
          <path
            d="M21.8 21.6L19.95 19.75L18.2 18L8.2 8L4.32 4.12L2.6 2.4L1.2 3.8L3.05 5.65C3.03 5.77 3 5.88 3 6V18C3 19.1 3.89 20 5 20H17.4L20.4 23L21.8 21.6ZM5 18V8H5.4L15.4 18H5ZM11 8L7 4H19C20.11 4 21 4.9 21 6V18L19 16V8H11Z"
          ></path>
        </g>

        <g id="cookie">
          <path
            d="M15.5 7.5V7c0-.98-.5-1.5-1.5-1.5h-.5c-.276 0-.5-.224-.5-.5V3c0-.98-1-1-1-1C6.3 2 1.712 6.77 2.014 12.54c.265 5.046 4.4 9.18 9.448 9.446C17.23 22.288 22 17.7 22 12v-1c0-.553-.447-1-1-1h-1.998c-.277 0-.502-.225-.502-.502V9c0-.938-.48-1.48-1.5-1.5h-1.5zm-9.706 4.972c-1.057.2-1.966-.71-1.766-1.766.112-.587.592-1.067 1.18-1.178 1.055-.2 1.965.71 1.764 1.765-.11.588-.59 1.068-1.178 1.18zm1.734-5.178c-.2-1.057.71-1.966 1.766-1.766.587.11 1.067.59 1.178 1.178.2 1.057-.708 1.966-1.765 1.766-.587-.11-1.068-.59-1.18-1.178zm3.766 12.178c-1.057.2-1.966-.71-1.766-1.766.112-.587.592-1.067 1.18-1.178 1.056-.2 1.965.71 1.764 1.766-.11.587-.59 1.067-1.178 1.178zM11.5 14c-.828 0-1.5-.67-1.5-1.5s.672-1.5 1.5-1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5zm5 2c-.828 0-1.5-.67-1.5-1.5s.672-1.5 1.5-1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
            fill-rule="evenodd"
          ></path>
        </g>

        <g id="block">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"
          ></path>
        </g>

        <g id="googleg">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          ></path>
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          ></path>
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          ></path>
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          ></path>
          <path fill="none" d="M1 1h22v22H1z"></path>
        </g>

        <g id="permissions">
          <path
            d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"
          ></path>
        </g>

        <g id="protected-content">
          <path
            d="M10,15 L6,11.1783439 L7.41,9.83121019 L10,12.2961783 L16.59,6 L18,7.3566879 L10,15 Z M21,3 L3,3 C1.89,3 1,3.89 1,5 L1,17 C1,18.1 1.89,19 3,19 L8,19 L8,21 L16,21 L16,19 L21,19 C22.1,19 22.99,18.1 22.99,17 L23,5 C23,3.89 22.1,3 21,3 Z M21,17 L3,17 L3,5 L21,5 L21,17 Z"
          ></path>
        </g>
        <g id="protected-content-off">
          <path
            d="M23 6L22.99 18C22.99 18.55 22.77 19.05 22.41 19.41L21 18V6H9L7 4H21C22.1 4 23 4.89 23 6ZM16.59 7L13.22 10.22L14.6 11.6L18 8.36L16.59 7ZM20.2 20L21.8 21.6L20.4 23L17.4 20H16V22H8V20H3C1.89 20 1 19.1 1 18V6C1 5.34 1.32 4.77 1.8 4.4L1.2 3.8L2.6 2.4L4.2 4L6.2 6L11.79 11.59L13.17 12.97L18.2 18L20.2 20ZM15.4 18L11.74 14.34L10 16L6 12.18L7.41 10.83L10 13.3L10.36 12.96L3.4 6H3V18H15.4Z"
          ></path>
        </g>

        <g id="public">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
          ></path>
        </g>
        <g id="web">
          <path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"
          ></path>
        </g>

        <g id="vr-headset">
          <path
            d="M20.907 6.678A2.54 2.54 0 0019.16 6H4.9c-.659 0-1.28.24-1.747.678a2.229 2.229 0 00-.723 1.637v7.37c0 .618.256 1.2.723 1.637A2.54 2.54 0 004.9 18h3.424c.448 0 .884-.114 1.268-.33.384-.216.697-.522.908-.893l.967-1.68a.572.572 0 01.16-.74.67.67 0 01.806 0c.235.18.302.49.16.74l.967 1.68c.21.365.524.677.908.893.384.216.82.33 1.268.33h3.424c.659 0 1.28-.24 1.747-.678.467-.437.723-1.02.723-1.637v-7.37c0-.618-.256-1.2-.723-1.637zM7.83 13.8c-1.328 0-2.4-1.08-2.4-2.4 0-1.32 1.08-2.4 2.4-2.4 1.32 0 2.4 1.08 2.4 2.4 0 1.32-1.072 2.4-2.4 2.4zm8.4 0c-1.328 0-2.4-1.08-2.4-2.4 0-1.32 1.08-2.4 2.4-2.4 1.32 0 2.4 1.08 2.4 2.4 0 1.32-1.072 2.4-2.4 2.4z"
          ></path>
        </g>
        <g id="vr-headset-off">
          <path
            d="M2.81,2.81L1.39,4.22L3.68,6.5C3.26,6.87,3,7.41,3,8v8c0,1.1,0.9,2,2,2h3.53c1.42,0,2.02-1.24,2.03-1.27l0.91-1.76 c0.08-0.16,0.22-0.26,0.37-0.31l1.11,1.11l0.49,0.96c0.01,0.03,0.52,1.08,1.71,1.25l4.63,4.63l1.41-1.41L2.81,2.81z M9.87,12.7 C9.59,13.46,8.85,14,8,14c-1.1,0-2-0.9-2-2c0-0.85,0.54-1.59,1.3-1.87l0,0L9.87,12.7L9.87,12.7z M16.7,13.87l3.62,3.62 C20.74,17.13,21,16.59,21,16V8c0-1.1-0.9-2-2-2H8.83c0,0,5.3,5.3,5.3,5.3C14.41,10.54,15.15,10,16,10c1.1,0,2,0.9,2,2 C18,12.85,17.46,13.59,16.7,13.87z"
          ></path>
        </g>

        <g id="accessibility">
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path>
        </g>
        <g id="apps">
          <path
            d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"
          ></path>
        </g>
        <g id="assignment">
          <path
            d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
          ></path>
        </g>

        <g id="build">
          <path
            d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"
          ></path>
        </g>

        <g id="check-circle">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          ></path>
        </g>
        <g id="clipboard">
          <path
            d="M19,3h-4.18C14.4,1.84,13.3,1,12,1S9.6,1.84,9.18,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5 C21,3.9,20.1,3,19,3z M12,3c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,3,12,3z M19,19H5V5h2v3h10V5h2V19z"
          ></path>
        </g>
        <g id="clipboard-off">
          <path
            d="M21.19,21.19L2.81,2.81L1.39,4.22L3,5.83V19c0,1.1,0.9,2,2,2h13.17l1.61,1.61L21.19,21.19z M5,19V7.83L16.17,19H5z M17,8V5 h2v11.17l2,2V5c0-1.1-0.9-2-2-2h-4.18C14.4,1.84,13.3,1,12,1S9.6,1.84,9.18,3H5.83l5,5H17z M12,3c0.55,0,1,0.45,1,1s-0.45,1-1,1 s-1-0.45-1-1S11.45,3,12,3z"
          ></path>
        </g>
        <g id="cloud">
          <path
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
          ></path>
        </g>
        <g id="code">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
        </g>
        <g id="code-off">
          <path
            d="M19.17,12l-4.58-4.59L16,6l6,6l-3.59,3.59L17,14.17L19.17,12z M1.39,4.22l4.19,4.19L2,12l6,6l1.41-1.41L4.83,12L7,9.83 l12.78,12.78l1.41-1.41L2.81,2.81L1.39,4.22z"
          ></path>
        </g>
        <g id="content-copy">
          <path
            d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
          ></path>
        </g>
        <g id="database">
          <path
            d="M12 11q-3.75 0-6.375-1.175T3 7q0-1.65 2.625-2.825Q8.25 3 12 3t6.375 1.175Q21 5.35 21 7q0 1.65-2.625 2.825Q15.75 11 12 11Zm0 5q-3.75 0-6.375-1.175T3 12V9.5q0 1.1 1.025 1.863 1.025.762 2.45 1.237 1.425.475 2.963.687 1.537.213 2.562.213t2.562-.213q1.538-.212 2.963-.687 1.425-.475 2.45-1.237Q21 10.6 21 9.5V12q0 1.65-2.625 2.825Q15.75 16 12 16Zm0 5q-3.75 0-6.375-1.175T3 17v-2.5q0 1.1 1.025 1.863 1.025.762 2.45 1.237 1.425.475 2.963.688 1.537.212 2.562.212t2.562-.212q1.538-.213 2.963-.688t2.45-1.237Q21 15.6 21 14.5V17q0 1.65-2.625 2.825Q15.75 21 12 21Z"
          ></path>
        </g>
        <g id="database-off">
          <path d="M2.80002 2.7998L1.40002 4.2L19.8 22.5998L21.2 21.2L2.80002 2.7998Z"></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.66998 4.67007C3.55666 5.34598 3 6.12263 3 7C3 8.1 3.875 9.04167 5.625 9.825C7.13125 10.4992 8.91531 10.8833 10.9772 10.9772L4.66998 4.67007ZM13.7325 10.9325L6.59428 3.79422C8.14271 3.26474 9.94462 3 12 3C14.5 3 16.625 3.39167 18.375 4.175C20.125 4.95833 21 5.9 21 7C21 8.1 20.125 9.04167 18.375 9.825C17.0443 10.4206 15.4968 10.7898 13.7325 10.9325ZM13.4265 13.4265C12.8898 13.4755 12.4143 13.5 12 13.5C11.3167 13.5 10.4583 13.4333 9.425 13.3C8.40833 13.15 7.425 12.9167 6.475 12.6C5.525 12.2833 4.70833 11.875 4.025 11.375C3.34167 10.8583 3 10.2333 3 9.5V12C3 13.1 3.875 14.0417 5.625 14.825C7.375 15.6083 9.5 16 12 16C13.3286 16 14.5514 15.8894 15.6682 15.6681L13.4265 13.4265ZM17.8456 15.0456L15.8602 13.0602C16.4286 12.9339 16.9836 12.7805 17.525 12.6C18.475 12.2833 19.2917 11.875 19.975 11.375C20.6583 10.8583 21 10.2333 21 9.5V12C21 13.1 20.125 14.0417 18.375 14.825C18.2022 14.9024 18.0257 14.9759 17.8456 15.0456ZM17.5812 17.5811C17.5625 17.5875 17.5438 17.5937 17.525 17.6C16.575 17.9167 15.5833 18.15 14.55 18.3C13.5333 18.4333 12.6833 18.5 12 18.5C11.3167 18.5 10.4583 18.4333 9.425 18.3C8.40833 18.15 7.425 17.9167 6.475 17.6C5.525 17.2833 4.70833 16.875 4.025 16.375C3.34167 15.8583 3 15.2333 3 14.5V17C3 18.1 3.875 19.0417 5.625 19.825C7.375 20.6083 9.5 21 12 21C14.5 21 16.625 20.6083 18.375 19.825C18.7292 19.6665 19.0475 19.5014 19.33 19.3299L17.5812 17.5811ZM20.758 17.9581L19.4966 16.6967C19.6627 16.594 19.8222 16.4868 19.975 16.375C20.6583 15.8583 21 15.2333 21 14.5V17C21 17.334 20.9193 17.6533 20.758 17.9581Z"
          ></path>
        </g>
        <g id="devices">
          <path
            d="M5 6h16V4H5c-1.1 0-2 .9-2 2v11H1v3h11v-3H5V6zm16 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"
          ></path>
        </g>
        <g id="devices-off">
          <path
            d="M22 9V19L20 17V10H16V13L14 11V9C14 8.45 14.45 8 15 8H21C21.55 8 22 8.45 22 9ZM21 6V4H7L9 6H21ZM17.2 17L16 15.8L14 13.8L6.2 6L4.33 4.13L2.6 2.4L1.2 3.8L3.06 5.66C3.03 5.77 3 5.88 3 6V17H1V20H12V17H5V7.6L14 16.6V19C14 19.55 14.45 20 15 20H17.4L20.4 23L21.8 21.6L20.2 20L17.2 17Z"
          ></path>
        </g>
        <g id="exit-to-app">
          <path
            d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
          ></path>
        </g>
        <g id="federated-identity-api">
          <path
            d="M5.85,17.1q1.275,-0.975 2.85,-1.538Q10.275,15 12,15q1.725,0 3.3,0.563 1.575,0.562 2.85,1.537 0.875,-1.025 1.363,-2.325Q20,13.475 20,12q0,-3.325 -2.337,-5.662Q15.325,4 12,4T6.338,6.338Q4,8.675 4,12q0,1.475 0.487,2.775 0.488,1.3 1.363,2.325zM12,13q-1.475,0 -2.488,-1.012Q8.5,10.975 8.5,9.5t1.012,-2.487Q10.525,6 12,6t2.488,1.013Q15.5,8.024 15.5,9.5t-1.012,2.488Q13.475,13 12,13zM12,22q-2.075,0 -3.9,-0.788 -1.825,-0.787 -3.175,-2.137 -1.35,-1.35 -2.137,-3.175Q2,14.075 2,12t0.788,-3.9q0.787,-1.825 2.137,-3.175 1.35,-1.35 3.175,-2.137Q9.925,2 12,2t3.9,0.788q1.825,0.787 3.175,2.137 1.35,1.35 2.137,3.175Q22,9.925 22,12t-0.788,3.9q-0.787,1.825 -2.137,3.175 -1.35,1.35 -3.175,2.137Q14.075,22 12,22zM12,20q1.325,0 2.5,-0.387 1.175,-0.388 2.15,-1.113 -0.975,-0.725 -2.15,-1.113Q13.325,17 12,17t-2.5,0.387q-1.175,0.388 -2.15,1.113 0.975,0.725 2.15,1.113Q10.675,20 12,20zM12,11q0.65,0 1.075,-0.425 0.425,-0.425 0.425,-1.075 0,-0.65 -0.425,-1.075Q12.65,8 12,8q-0.65,0 -1.075,0.425Q10.5,8.85 10.5,9.5q0,0.65 0.425,1.075Q11.35,11 12,11zM12,9.5zM12,18.5z"
          ></path>
        </g>
        <g id="federated-identity-api-off">
          <path
            d="M14.41 9.41l.97.97s.12.02.12-.88C15.5 7.56 13.94 6 12 6c-.89 0-.88.12-.88.12l.47.47 2.82 2.82zM19.99 18c1.26-1.67 2.01-3.75 2.01-6 0-5.52-4.48-10-10-10-2.25 0-4.32.75-5.99 2.01-.01 0-.02.01-.02.01-.25.19-.49.39-.73.61-.01.01-.03.02-.04.04-.23.21-.45.43-.66.67-.01.01-.02.01-.03.02C2.96 7.13 2 9.45 2 12c0 5.52 4.48 10 10 10 2.55 0 4.87-.96 6.64-2.53l.03-.03c.23-.21.45-.43.66-.65.01-.02.03-.03.04-.05.21-.23.41-.47.6-.72l.02-.02zM12 4c4.41 0 8 3.59 8 8 0 1.7-.55 3.27-1.45 4.56l-3.72-3.72-.63-.63L9.3 7.3l-.13-.13-1.73-1.73C8.73 4.53 10.3 4 12 4zm0 16c-1.86 0-3.57-.64-4.93-1.72.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20zm0-5.5c-1.46 0-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-1.99.74-3.82 1.95-5.22l2.56 2.56c0 .05-.02.1-.02.15 0 1.94 1.56 3.5 3.5 3.5.05 0 .1-.01.15-.02l1.72 1.72c-.72-.12-1.4-.19-1.86-.19z"
          ></path>
        </g>
        <g id="file-download-off">
          <path
            d="M15.6 12.4L9 5.8V3H15V9H19L15.6 12.4ZM5 20H18.4V19.5L19 19L19.5 18.5L12.7 11.7L9 7.9L5.6 4.5L4.5 5.6L7.9 9H5L12 16L13.5 14.5L17 18H5V20Z"
          ></path>
        </g>
        <g id="file-editing-off">
          <path
            d="M19.5,16.67l1.09-1.09L22,17l-1.09,1.09L19.5,16.67z M17,14.17L17,13h2l0,3.17L17,14.17z M2.1,2.1L0.69,3.51l3.32,3.32L4,18 c0,1.1,0.89,2,1.99,2H12v-2H6V8.83L19.17,22H14v2h8v-2L2.1,2.1z M6.83,4H12v5h5v2h2V8l-6-6H6C5.66,2,5.34,2.09,5.06,2.24L6.83,4z"
          ></path>
        </g>
        <g id="hid-device">
          <path
            d="M20 6H4C2.9 6 2 6.9 2 8V16C2 17.1 2.9 18 4 18H20C21.1 18 22 17.1 22 16V8C22 6.9 21.1 6 20 6ZM11 13H9V15H7V13H5V11H7V9H9V11H11V13ZM14.5 15C13.67 15 13 14.33 13 13.5C13 12.67 13.67 12 14.5 12C15.33 12 16 12.67 16 13.5C16 14.33 15.33 15 14.5 15ZM17.5 12C16.67 12 16 11.33 16 10.5C16 9.67 16.67 9 17.5 9C18.33 9 19 9.67 19 10.5C19 11.33 18.33 12 17.5 12Z"
          ></path>
        </g>
        <g id="hid-device-off">
          <path
            d="M20.424 17.88C21.108 17.616 21.6 16.932 21.6 16.128V7.872C21.6 6.84 20.796 6 19.8 6H8.54399L20.424 17.88ZM17.4 9.3C18.228 9.3 18.9 9.972 18.9 10.8C18.9 11.628 18.228 12.3 17.4 12.3C16.572 12.3 15.9 11.628 15.9 10.8C15.9 9.972 16.572 9.3 17.4 9.3ZM20.484 20.484L3.51599 3.516L2.24399 4.788L3.57599 6.12C2.89199 6.384 2.39999 7.068 2.39999 7.872V16.128C2.39999 17.16 3.20399 18 4.19999 18H15.456L19.212 21.756L20.484 20.484ZM9.05999 12.9V15H7.25999V12.9H5.15999V11.1H7.25999V9.804L10.356 12.9H9.05999Z"
          ></path>
        </g>
        <g id="language">
          <path
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"
          ></path>
        </g>
        <g id="location-on">
          <path
            d="M12,2C8.13,2,5,5.13,5,9c0,5.34,4.21,6.79,6.03,12.28C11.17,21.7,11.55,22,12,22s0.83-0.3,0.97-0.72 C14.79,15.79,19,14.34,19,9C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5 C14.5,10.38,13.38,11.5,12,11.5z"
          ></path>
        </g>
        <g id="location-off">
          <path
            d="M12,6.88c1.38,0,2.5,1.12,2.5,2.5c0,0.64-0.25,1.21-0.64,1.65l3.38,3.38C18.24,12.95,19,11.39,19,9.13c0-3.87-3.13-7-7-7 c-1.94,0-3.7,0.79-4.97,2.07l3.32,3.32C10.79,7.13,11.36,6.88,12,6.88z"
          ></path>
          <path
            d="M2.81,2.81L1.39,4.22l3.72,3.72C5.04,8.33,5,8.72,5,9.13c0,5.34,4.21,6.79,6.03,12.28c0.14,0.42,0.52,0.72,0.97,0.72 s0.83-0.3,0.97-0.72c0.49-1.49,1.17-2.68,1.88-3.74l4.93,4.93l1.41-1.41L2.81,2.81z"
          ></path>
        </g>
        <g id="mic-off">
          <path
            d="M19,11h-2c0,0.91-0.25,1.76-0.68,2.49l1.45,1.45C18.54,13.82,19,12.47,19,11z M2.81,2.81L1.39,4.22l11.66,11.66 C12.71,15.96,12.36,16,12,16c-2.76,0-5-2.24-5-5H5c0,3.53,2.61,6.43,6,6.92V21h2v-3.08c0.57-0.08,1.12-0.24,1.64-0.45l5.14,5.14 l1.41-1.41L2.81,2.81z M15,11V5c0-1.66-1.34-3-3-3S9,3.34,9,5v1.17l5.81,5.81C14.92,11.67,15,11.35,15,11z"
          ></path>
        </g>
        <g id="midi">
          <path
            d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M14,14.5h0.25V19h-4.5v-4.5H10 c0.55,0,1-0.45,1-1V5h2v8.5C13,14.05,13.45,14.5,14,14.5z M5,5h2v8.5c0,0.55,0.45,1,1,1h0.25V19H5V5z M19,19h-3.25v-4.5H16 c0.55,0,1-0.45,1-1V5h2V19z"
          ></path>
        </g>
        <g id="midi-off">
          <path
            d="M21.19,21.19L2.81,2.81L1.39,4.22L3,5.83V19c0,1.1,0.9,2,2,2h13.17l1.61,1.61L21.19,21.19z M8.25,19H5V7.83l2,2v3.67 c0,0.55,0.45,1,1,1h0.25V19z M9.75,19v-4.5H10c0.46,0,0.82-0.31,0.94-0.73l3.31,3.31V19H9.75z M11,8.17L5.83,3H19c1.1,0,2,0.9,2,2 v13.17l-2-2V5h-2v8.5c0,0.19-0.07,0.36-0.16,0.51L13,10.17V5h-2V8.17z"
          ></path>
        </g>
        <g id="music-note">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path>
        </g>
        <g id="notifications">
          <path
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
          ></path>
        </g>
        <g id="notifications-none">
          <path
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
          ></path>
        </g>
        <g id="notifications-off">
          <path
            d="M18,10c0-2.79-1.91-5.14-4.5-5.8V3.5C13.5,2.67,12.83,2,12,2s-1.5,0.67-1.5,1.5v0.7C9.64,4.42,8.87,4.84,8.21,5.38 L18,15.17V10z M12,22c1.1,0,2-0.9,2-2h-4C10,21.1,10.9,22,12,22z M2.81,2.81L1.39,4.22L6.1,8.93C6.04,9.28,6,9.63,6,10v7H4v2h12.17 l3.61,3.61l1.41-1.41L2.81,2.81z"
          ></path>
        </g>
        <g id="open-in-new-off">
          <path
            d="M17.59,5H14V3h7v7h-2V6.41l-4.88,4.88l-1.41-1.41L17.59,5z M19,12v4.17l2,2V12H19z M19.78,22.61L18.17,21H5 c-1.11,0-2-0.9-2-2V5.83L1.39,4.22l1.41-1.41l18.38,18.38L19.78,22.61z M16.17,19l-4.88-4.88L9.7,15.71L8.29,14.3l1.59-1.59L5,7.83 V19H16.17z M7.83,5H12V3H5.83L7.83,5z"
          ></path>
        </g>
        <g id="open-in-browser">
          <path
            d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.11.9 2 2 2h5v-2H4V9h16v9h-5v2h5c1.1 0 2-.89 2-2V6c0-1.1-.9-2-2-2zm-3.79 10.21L12 10l-4.21 4.21 1.42 1.41L11 13.83V20h2v-6.17l1.79 1.79z"
          ></path>
        </g>
        <g id="pdf">
          <path
            d="M7 11.5h1v-1H7v1zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5c0 .83-.67 1.5-1.5 1.5H7v2H5.5V9H8c.83 0 1.5.67 1.5 1.5v1zm10-1H17v1h1.5V13H17v2h-1.5V9h4v1.5zm-5 3c0 .83-.67 1.5-1.5 1.5h-2.5V9H13c.83 0 1.5.67 1.5 1.5v3zm-2.5 0h1v-3h-1v3z"
          ></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
        <g id="palette">
          <path
            d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
          ></path>
        </g>
        <g id="payment-handler">
          <path
            d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"
          ></path>
        </g>
        <g id="payment-handler-off">
          <path
            d="M6.83,4H20c1.11,0,2,0.89,2,2v12c0,0.34-0.08,0.66-0.23,0.94L20,17.17V12h-5.17l-4-4H20V6H8.83 L6.83,4z M20.49,23.31L17.17,20H4c-1.11,0-2-0.89-2-2L2.01,6c0-0.34,0.08-0.66,0.23-0.93L0.69,3.51L2.1,2.1l19.8,19.8L20.49,23.31z M4,6.83V8h1.17L4,6.83z M15.17,18l-6-6H4v6H15.17z"
          ></path>
        </g>
        <g id="insecure-content"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
        <g id="photo">
          <path
            d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
          ></path>
        </g>
        <g id="photo-off">
          <path d="M21,5c0-1.1-0.9-2-2-2H5.83L21,18.17V5z"></path>
          <path
            d="M2.81,2.81L1.39,4.22L3,5.83V19c0,1.1,0.9,2,2,2h13.17l1.61,1.61l1.41-1.41L2.81,2.81z M6,17l3-4l2.25,3l0.82-1.1l2.1,2.1 H6z"
          ></path>
        </g>
        <g id="power-settings-new">
          <path
            d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"
          ></path>
        </g>
        <g id="protocol-handler">
          <path
            d="M21.72 11.33l-6.644-7.035a.97.97 0 0 0-1.38-.01l-1.67 1.72-1.617-1.712a.97.97 0 0 0-1.38-.01l-6.737 6.935c-.187.191-.29.447-.292.719-.002.272.099.529.28.722l6.644 7.034a.949.949 0 0 0 1.38.011l1.671-1.718 1.615 1.71a.949.949 0 0 0 1.381.01l6.74-6.935a1.054 1.054 0 0 0 .01-1.44zM6.947 12.464l3.657 3.785-.974.98-5.273-5.456 5.349-5.378.929.962-3.677 3.7a.998.998 0 0 0-.292.702 1 1 0 0 0 .28.705zm7.35 4.768l-.931-.963 3.68-3.7a1.012 1.012 0 0 0 .007-1.407l-3.656-3.784.974-.98 5.273 5.456-5.348 5.378z"
          ></path>
        </g>
        <g id="protocol-handler-off">
          <path
            d="M7.95,5.12l0.73-0.8C8.88,4.11,9.15,4,9.42,4c0.27,0,0.54,0.11,0.74,0.32L12,6.34l1.85-2.01C14.04,4.11,14.31,4,14.58,4 c0.27,0,0.54,0.11,0.74,0.32l6.42,7c0.35,0.38,0.35,0.97,0,1.35l-2.98,3.25l-1.42-1.42l2.3-2.51l-5.06-5.52l-1.23,1.34l3.21,3.51 c0.35,0.38,0.35,0.97,0,1.35l-0.51,0.56L7.95,5.12z M19.78,22.61l-3.73-3.73l-0.73,0.8c-0.2,0.22-0.47,0.32-0.74,0.32 c-0.27,0-0.54-0.11-0.74-0.32L12,17.66l-1.85,2.01C9.96,19.89,9.69,20,9.42,20c-0.27,0-0.54-0.11-0.74-0.32l-6.42-7 c-0.35-0.38-0.35-0.97,0-1.35l2.98-3.25L1.39,4.22l1.41-1.41l18.38,18.38L19.78,22.61z M10.64,16.18l-3.21-3.51 c-0.35-0.38-0.35-0.97,0-1.35l0.51-0.56L6.66,9.49L4.36,12l5.06,5.52L10.64,16.18z"
          ></path>
        </g>
        <g id="refresh">
          <path
            d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
          ></path>
        </g>
        <g id="restore">
          <path
            d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
          ></path>
        </g>
        <g id="rotate-right">
          <path
            d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"
          ></path>
        </g>
        <g id="save-original">
          <path
            d="M11 17H6V4h5v4h4v2h2V7l-5-5H6c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h5v-2zm9 5h-8v-2h8v2zm0-7l-4 4-4-4h3v-3h2v3h3z"
          ></path>
        </g>
        <g id="sensors">
          <path
            d="M7.76,16.24C6.67,15.16,6,13.66,6,12s0.67-3.16,1.76-4.24l1.42,1.42C8.45,9.9,8,10.9,8,12c0,1.1,0.45,2.1,1.17,2.83 L7.76,16.24z M16.24,16.24C17.33,15.16,18,13.66,18,12s-0.67-3.16-1.76-4.24l-1.42,1.42C15.55,9.9,16,10.9,16,12 c0,1.1-0.45,2.1-1.17,2.83L16.24,16.24z M12,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,10,12,10z M20,12 c0,2.21-0.9,4.21-2.35,5.65l1.42,1.42C20.88,17.26,22,14.76,22,12s-1.12-5.26-2.93-7.07l-1.42,1.42C19.1,7.79,20,9.79,20,12z M6.35,6.35L4.93,4.93C3.12,6.74,2,9.24,2,12s1.12,5.26,2.93,7.07l1.42-1.42C4.9,16.21,4,14.21,4,12S4.9,7.79,6.35,6.35z"
          ></path>
        </g>
        <g id="sensors-off">
          <path
            d="M16.94,6.91l-1.41,1.45c0.9,0.94,1.46,2.22,1.46,3.64c0,0.65-0.12,1.26-0.33,1.83l1.52,1.52c0.52-1,0.81-2.15,0.81-3.36 C18.99,10.02,18.21,8.21,16.94,6.91z M19.77,4l-1.41,1.45C19.98,7.13,21,9.44,21,12.01c0,1.78-0.48,3.44-1.32,4.84l1.46,1.46 c1.18-1.8,1.87-3.96,1.87-6.29C23,8.88,21.77,6.05,19.77,4z M11.83,9c0.06,0,0.11,0,0.17,0c1.66,0,3,1.34,3,3c0,0.06,0,0.11,0,0.17 L11.83,9z M20.49,23.31L12.17,15c-0.06,0-0.11,0-0.17,0c-1.66,0-3-1.34-3-3c0-0.06,0-0.11,0-0.17l-1.67-1.67 C7.13,10.74,7.01,11.35,7.01,12c0,1.42,0.56,2.7,1.46,3.64l-1.41,1.45c-1.27-1.3-2.05-3.1-2.05-5.09c0-1.21,0.29-2.36,0.8-3.36 L4.32,7.15C3.48,8.55,3,10.21,3,11.99c0,2.57,1.02,4.88,2.64,6.56L4.23,20C2.23,17.95,1,15.12,1,11.99c0-2.33,0.69-4.5,1.87-6.29 L0.69,3.51L2.1,2.1l19.8,19.8L20.49,23.31z"
          ></path>
        </g>
        <g id="serial-port">
          <path
            d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h4v3h-4zM6 7h5v5H6zm6 4h4v6h-4z"
          ></path>
        </g>
        <g id="serial-port-off">
          <path
            d="M7.83,5H18v10.17L19.83,17H22v-2h-2v-2h2v-2h-2V9h2V7h-2V5c0-1.1-0.9-2-2-2H5.83L7.83,5z M12,9.17V7h4v3h-3.17L12,9.17z M9.83,7H11v1.17L9.83,7z M13.83,11H16v2.17L13.83,11z M18,21c0.06,0,0.11,0,0.16-0.01l2.32,2.32l1.41-1.41L2.1,2.1L0.69,3.51 l1.32,1.32C2,4.89,2,4.94,2,5v14c0,1.1,0.9,2,2,2H18z M4,19V6.83l2,2V12h3.17l1,1H6v4h5v-3.17l1,1V17h2.17l2,2H4z"
          ></path>
        </g>
        <g id="sync-off">
          <path
            d="M12 1.05V4.05C16.35 4.05 19.95 7.65 19.95 12C19.95 13.35 19.5 14.7 18.9 15.9L17.4 14.4C17.85 13.65 18 12.9 18 12C18 8.7 15.3 6 12 6V8.85L8.1 4.95L12 1.05ZM19.35 22.5L15.9 19.05L12 22.95V19.95C7.65 19.95 4.05 16.35 4.05 12C4.05 10.65 4.5 9.3 5.1 8.1L1.5 4.65L3.15 3L21 20.85L19.35 22.5ZM12 15.15L6.45 9.6C6.15 10.35 6 11.1 6 12C6 15.3 8.7 18 12 18V15.15Z"
          ></path>
        </g>
        <g id="sync-disabled">
          <path
            d="M10 6.35V4.26c-.8.21-1.55.54-2.23.96l1.46 1.46c.25-.12.5-.24.77-.33zm-7.14-.94l2.36 2.36C4.45 8.99 4 10.44 4 12c0 2.21.91 4.2 2.36 5.64L4 20h6v-6l-2.24 2.24C6.68 15.15 6 13.66 6 12c0-1 .25-1.94.68-2.77l8.08 8.08c-.25.13-.5.25-.77.34v2.09c.8-.21 1.55-.54 2.23-.96l2.36 2.36 1.27-1.27L4.14 4.14 2.86 5.41zM20 4h-6v6l2.24-2.24C17.32 8.85 18 10.34 18 12c0 1-.25 1.94-.68 2.77l1.46 1.46C19.55 15.01 20 13.56 20 12c0-2.21-.91-4.2-2.36-5.64L20 4z"
          ></path>
        </g>
        <g id="sync-problem">
          <path
            d="M3 12c0 2.21.91 4.2 2.36 5.64L3 20h6v-6l-2.24 2.24C5.68 15.15 5 13.66 5 12c0-2.61 1.67-4.83 4-5.65V4.26C5.55 5.15 3 8.27 3 12zm8 5h2v-2h-2v2zM21 4h-6v6l2.24-2.24C18.32 8.85 19 10.34 19 12c0 2.61-1.67 4.83-4 5.65v2.09c3.45-.89 6-4.01 6-7.74 0-2.21-.91-4.2-2.36-5.64L21 4zm-10 9h2V7h-2v6z"
          ></path>
        </g>
        <g id="usb">
          <path
            d="M15 7v4h1v2h-3V5h2l-3-4-3 4h2v8H8v-2.07c.7-.37 1.2-1.08 1.2-1.93 0-1.21-.99-2.2-2.2-2.2-1.21 0-2.2.99-2.2 2.2 0 .85.5 1.56 1.2 1.93V13c0 1.11.89 2 2 2h3v3.05c-.71.37-1.2 1.1-1.2 1.95 0 1.22.99 2.2 2.2 2.2 1.21 0 2.2-.98 2.2-2.2 0-.85-.49-1.58-1.2-1.95V15h3c1.11 0 2-.89 2-2v-2h1V7h-4z"
          ></path>
        </g>
        <g id="usb-off">
          <path
            d="M15,8h4v4h-1v2c0,0.34-0.08,0.66-0.23,0.94L16,13.17V12h-1V8z M11,8.17l2,2V6h2l-3-4L9,6h2V8.17z M13,16v2.28 c0.6,0.34,1,0.98,1,1.72c0,1.1-0.9,2-2,2s-2-0.9-2-2c0-0.74,0.4-1.37,1-1.72V16H8c-1.11,0-2-0.89-2-2v-2.28C5.4,11.38,5,10.74,5,10 c0-0.59,0.26-1.13,0.68-1.49L1.39,4.22l1.41-1.41l18.38,18.38l-1.41,1.41L13.17,16H13z M11,14v-0.17l-2.51-2.51 c-0.14,0.16-0.31,0.29-0.49,0.4V14H11z"
          ></path>
        </g>
        <g id="videocam-off">
          <path
            d="M21 18L9 6H16C16.55 6 17 6.45 17 7V10.5L21 6.5V18ZM21.8 21.6L17 16.8L6.2 6L2.6 2.4L1.2 3.8L3.53 6.13C3.22 6.3 3 6.62 3 7V17C3 17.55 3.45 18 4 18H15.4L20.4 23L21.8 21.6Z"
          ></path>
        </g>
        <g id="volume-down">
          <path
            d="M1 13H4.46667L8 16.5V3.5L4.46667 7H1V13ZM10 6.5V13.5C11.776 12.8652 12.5 11.0043 12.5 10C12.5 8.99565 11.776 7.14348 10 6.5Z"
          ></path>
        </g>
        <g id="volume-up">
          <path
            d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
          ></path>
        </g>
        <g id="volume-up-off">
          <path d="M16.25,13.42C16.4,12.97,16.5,12.5,16.5,12c0-1.77-1.02-3.29-2.5-4.03v3.2L16.25,13.42z"></path>
          <path
            d="M19,12c0,1.21-0.31,2.34-0.85,3.32l1.46,1.46C20.48,15.39,21,13.76,21,12c0-4.28-2.99-7.86-7-8.77v2.06 C16.89,6.15,19,8.83,19,12z"
          ></path>
          <path
            d="M2.81,2.81L1.39,4.22L6.17,9H3v6h4l5,5v-5.17l3.32,3.32c-0.42,0.23-0.85,0.43-1.32,0.56v2.06c1-0.23,1.94-0.62,2.79-1.15 l2.99,2.99l1.41-1.41L2.81,2.81z"
          ></path>
          <polygon points="12,9.17 12,4 9.41,6.59"></polygon>
        </g>
        <g id="bluetooth-scanning">
          <path
            d="M14.24 12.01l2.32 2.32c.28-.72.44-1.51.44-2.33 0-.82-.16-1.59-.43-2.31l-2.33 2.32zm5.29-5.3l-1.26 1.26c.63 1.21.98 2.57.98 4.02s-.36 2.82-.98 4.02l1.2 1.2a9.936 9.936 0 0 0 1.54-5.31c-.01-1.89-.55-3.67-1.48-5.19zm-3.82 1L10 2H9v7.59L4.41 5 3 6.41 8.59 12 3 17.59 4.41 19 9 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM11 5.83l1.88 1.88L11 9.59V5.83zm1.88 10.46L11 18.17v-3.76l1.88 1.88z"
          ></path>
        </g>
        <g id="bluetooth">
          <path
            d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"
          ></path>
        </g>
        <g id="bluetooth-off">
          <path
            d="M13 5.83l1.88 1.88-1.6 1.6 1.41 1.41 3.02-3.02L12 2h-1v5.03l2 2v-3.2zM5.41 4L4 5.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l4.29-4.29 2.3 2.29L20 18.59 5.41 4zM13 18.17v-3.76l1.88 1.88L13 18.17z"
          ></path>
        </g>

        <g id="web">
          <path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"
          ></path>
        </g>

        <g id="window-management">
          <path
            d="M18 15v5q0 .825-.5875 1.4125Q16.825 22 16 22H4q-.825 0-1.4125-.5875Q2 20.825 2 20v-9q0-.825.5875-1.4125Q3.175 9 4 9h2V4q0-.825.5875-1.4125Q7.175 2 8 2h12q.825 0 1.4125.5875Q22 3.175 22 4v9q0 .825-.5875 1.4125Q20.825 15 20 15ZM4 13v7h12v-7Zm14 0h2V6H8v3h8q.825 0 1.4125.5875Q18 10.175 18 11Z"
          ></path>
        </g>
        <g id="window-management-off">
          <path
            d="m20.475 23.3-2.6-2.6q-.2.575-.7125.9375Q16.65 22 16 22H4q-.825 0-1.4125-.5875Q2 20.825 2 20v-9q0-.825.5875-1.4125Q3.175 9 4 9h2v-.175L.675 3.5 2.1 2.075l19.8 19.8ZM4 20h12v-1.175L10.175 13H4v7Zm14-4.875L15.875 13l-4-4H16q.825 0 1.4125.5875Q18 10.175 18 11v2h2V6H8.875L6.15 3.275q.2-.575.7-.925Q7.35 2 8 2h12q.825 0 1.4125.5875Q22 3.175 22 4v9q0 .825-.5875 1.4125Q20.825 15 20 15h-2Z"
          ></path>
        </g>
        <g id="zoom-in">
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          ></path>
        </g>
        <g id="local-fonts">
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path
            d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM10.69 6h2.6l4.51 12h-2.5l-1.01-2.87H9.7L8.7 18H6.2l4.49-12zm2.87 7.06l-1.06-3.02-.43-1.44h-.13l-.44 1.44-1.07 3.02h3.13z"
          ></path>
        </g>
        <g id="local-fonts-off">
          <path
            d="M4.83,2H20c1.1,0,2,0.9,2,2v15.17l-2-2V4H6.83L4.83,2z M10.92,6l-0.57,1.52l1.36,1.36l0.23-0.66h0.1l0.54,1.52l3.04,3.04 L13.07,6H10.92z M20.49,23.31L19.17,22H4c-1.1,0-2-0.9-2-2V4.83L0.69,3.51L2.1,2.1l19.8,19.8L20.49,23.31z M17.17,20l-5.07-5.07 H9.58L8.49,18H6.41l2.39-6.37L4,6.83V20H17.17z"
          ></path>
        </g>
        <g id="file-handling">
          <path
            d="M8 16h8v2H8v-2zm0-4h8v2H8v-2zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
            fill="#5F6368"
          ></path>
        </g>
        <g id="file-handling-off">
          <path
            d="M13.002 4.001H7.106L5.252 2.148c.232-.094.485-.147.75-.147h8l6 6v8.896l-2-2V9.001h-5v-5z"
            fill="#5F6368"
          ></path>
          <path
            d="M16.002 12.001h-.896l.896.896v-.896zM.6 3.45l1.414-1.414 19.94 19.94-1.414 1.414L.6 3.45zM3.986 20.01V6.84l2 2V20.01h11.172l1.765 1.766c-.28.15-.599.234-.937.234H5.976c-1.1 0-1.99-.9-1.99-2z"
            fill="#5F6368"
          ></path>
          <path d="M9.158 12.01H7.986v2h3.172l-2-2zM13.158 16.01H7.986v2h7.172l-2-2z" fill="#5F6368"></path>
        </g>
        <g id="performance">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="m20.38 8.57-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"
          ></path>
        </g>
        <g id="feedback" viewBox="0 0 24 24">
          <path
            d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zm-9-4h2v2h-2zm0-6h2v4h-2z"
          ></path>
        </g>
        <g id="storage-access" viewBox="0 -960 960 960">
          <path
            d="M320-250q-107-27-173.5-113.5T80-560q0-134 93-227t227-93q110 0 196.5 66.5T710-640h-84q-26-72-87.5-116T400-800q-100 0-170 70t-70 170q0 77 44 138.5T320-334v84ZM480-80q-33 0-56.5-23.5T400-160v-320q0-33 23.5-56.5T480-560h320q33 0 56.5 23.5T880-480v320q0 33-23.5 56.5T800-80H480Zm0-80h320v-320H480v320Zm20-40h280l-92-120-68 90-48-66-72 96Zm140-120ZM393-567Z"
          ></path>
        </g>
      </defs>
    </svg>
  </iron-iconset-svg>
`;
document.head.appendChild(template$3.content);
// Copyright 2012 The Chromium Authors
function sanitizeInnerHtmlInternal(rawString, opts) {
  opts = opts || {};
  const html = parseHtmlSubset(`<b>${rawString}</b>`, opts.tags, opts.attrs).firstElementChild;
  return html.innerHTML;
}
let sanitizedPolicy = null;
function sanitizeInnerHtml(rawString, opts) {
  assert(window.trustedTypes);
  if (sanitizedPolicy === null) {
    sanitizedPolicy = window.trustedTypes.createPolicy('sanitize-inner-html', {
      createHTML: sanitizeInnerHtmlInternal,
      createScript: () => assertNotReached(),
      createScriptURL: () => assertNotReached(),
    });
  }
  return sanitizedPolicy.createHTML(rawString, opts);
}
const allowAttribute = (_node, _value) => true;
const allowedAttributes = new Map([
  [
    'href',
    (node, value) =>
      node.tagName === 'A' && (value.startsWith('chrome://') || value.startsWith('https://') || value === '#'),
  ],
  ['target', (node, value) => node.tagName === 'A' && value === '_blank'],
]);
const allowedOptionalAttributes = new Map([
  ['class', allowAttribute],
  ['id', allowAttribute],
  ['is', (_node, value) => value === 'action-link' || value === ''],
  ['role', (_node, value) => value === 'link'],
  ['src', (node, value) => node.tagName === 'IMG' && value.startsWith('chrome://')],
  ['tabindex', allowAttribute],
  ['aria-hidden', allowAttribute],
  ['aria-label', allowAttribute],
  ['aria-labelledby', allowAttribute],
]);
const allowedTags = new Set(['A', 'B', 'BR', 'DIV', 'EM', 'KBD', 'P', 'PRE', 'SPAN', 'STRONG']);
const allowedOptionalTags = new Set(['IMG', 'LI', 'UL']);
let unsanitizedPolicy;
function mergeTags(optTags) {
  const clone = new Set(allowedTags);
  optTags.forEach((str) => {
    const tag = str.toUpperCase();
    if (allowedOptionalTags.has(tag)) {
      clone.add(tag);
    }
  });
  return clone;
}
function mergeAttrs(optAttrs) {
  const clone = new Map(allowedAttributes);
  optAttrs.forEach((key) => {
    if (allowedOptionalAttributes.has(key)) {
      clone.set(key, allowedOptionalAttributes.get(key));
    }
  });
  return clone;
}
function walk(n, f) {
  f(n);
  for (let i = 0; i < n.childNodes.length; i++) {
    walk(n.childNodes[i], f);
  }
}
function assertElement(tags, node) {
  if (!tags.has(node.tagName)) {
    throw Error(node.tagName + ' is not supported');
  }
}
function assertAttribute(attrs, attrNode, node) {
  const n = attrNode.nodeName;
  const v = attrNode.nodeValue || '';
  if (!attrs.has(n) || !attrs.get(n)(node, v)) {
    throw Error(node.tagName + '[' + n + '="' + v + '"] is not supported');
  }
}
function parseHtmlSubset(s, extraTags, extraAttrs) {
  const tags = extraTags ? mergeTags(extraTags) : allowedTags;
  const attrs = extraAttrs ? mergeAttrs(extraAttrs) : allowedAttributes;
  const doc = document.implementation.createHTMLDocument('');
  const r = doc.createRange();
  r.selectNode(doc.body);
  if (window.trustedTypes) {
    if (!unsanitizedPolicy) {
      unsanitizedPolicy = window.trustedTypes.createPolicy('parse-html-subset', {
        createHTML: (untrustedHTML) => untrustedHTML,
        createScript: () => assertNotReached(),
        createScriptURL: () => assertNotReached(),
      });
    }
    s = unsanitizedPolicy.createHTML(s);
  }
  const df = r.createContextualFragment(s);
  walk(df, function (node) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        assertElement(tags, node);
        const nodeAttrs = node.attributes;
        for (let i = 0; i < nodeAttrs.length; ++i) {
          assertAttribute(attrs, nodeAttrs[i], node);
        }
        break;
      case Node.COMMENT_NODE:
      case Node.DOCUMENT_FRAGMENT_NODE:
      case Node.TEXT_NODE:
        break;
      default:
        throw Error('Node type ' + node.nodeType + ' is not supported');
    }
  });
  return df;
}
// Copyright 2021 The Chromium Authors
const I18nMixin = dedupingMixin((superClass) => {
  class I18nMixin extends superClass {
    i18nRaw_(id, ...varArgs) {
      return varArgs.length === 0 ? loadTimeData.getString(id) : loadTimeData.getStringF(id, ...varArgs);
    }
    i18n(id, ...varArgs) {
      const rawString = this.i18nRaw_(id, ...varArgs);
      return parseHtmlSubset(`<b>${rawString}</b>`).firstChild.textContent;
    }
    i18nAdvanced(id, opts) {
      opts = opts || {};
      const rawString = this.i18nRaw_(id, ...(opts.substitutions || []));
      return sanitizeInnerHtml(rawString, opts);
    }
    i18nDynamic(_locale, id, ...varArgs) {
      return this.i18n(id, ...varArgs);
    }
    i18nRecursive(locale, id, ...varArgs) {
      let args = varArgs;
      if (args.length > 0) {
        args = args.map((str) => (this.i18nExists(str) ? loadTimeData.getString(str) : str));
      }
      return this.i18nDynamic(locale, id, ...args);
    }
    i18nExists(id) {
      return loadTimeData.valueExists(id);
    }
  }
  return I18nMixin;
});
// Copyright 2021 The Chromium Authors
const WebUiListenerMixin = dedupingMixin((superClass) => {
  class WebUiListenerMixin extends superClass {
    constructor() {
      super(...arguments);
      this.webUiListeners_ = [];
    }
    addWebUiListener(eventName, callback) {
      this.webUiListeners_.push(addWebUiListener(eventName, callback));
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      while (this.webUiListeners_.length > 0) {
        removeWebUiListener(this.webUiListeners_.pop());
      }
    }
  }
  return WebUiListenerMixin;
});
// Copyright 2016 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class PromiseResolver {
  constructor() {
    this.resolve_ = () => {};
    this.reject_ = () => {};
    this.isFulfilled_ = false;
    this.promise_ = new Promise((resolve, reject) => {
      this.resolve_ = (resolution) => {
        resolve(resolution);
        this.isFulfilled_ = true;
      };
      this.reject_ = (reason) => {
        reject(reason);
        this.isFulfilled_ = true;
      };
    });
  }
  get isFulfilled() {
    return this.isFulfilled_;
  }
  get promise() {
    return this.promise_;
  }
  get resolve() {
    return this.resolve_;
  }
  get reject() {
    return this.reject_;
  }
}
// Copyright 2015 The Chromium Authors
class CrSettingsPrefsInternal {
  constructor() {
    this.isInitialized = false;
    this.initializedResolver_ = new PromiseResolver();
    this.deferInitialization = false;
  }
  get initialized() {
    return this.initializedResolver_.promise;
  }
  setInitialized() {
    this.isInitialized = true;
    this.initializedResolver_.resolve();
  }
  resetForTesting() {
    this.isInitialized = false;
    this.initializedResolver_ = new PromiseResolver();
  }
}
const CrSettingsPrefs = new CrSettingsPrefsInternal();
/* Copyright 2015 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file. */ function deepEqual(val1, val2) {
  if (val1 === val2) {
    return true;
  }
  if (Array.isArray(val1) || Array.isArray(val2)) {
    if (!Array.isArray(val1) || !Array.isArray(val2)) {
      return false;
    }
    return arraysEqual(val1, val2);
  }
  if (val1 instanceof Object && val2 instanceof Object) {
    return objectsEqual(val1, val2);
  }
  return false;
}
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (!deepEqual(arr1[i], arr2[i])) {
      return false;
    }
  }
  return true;
}
function objectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}
function deepCopy(val) {
  if (!(val instanceof Object)) {
    return val;
  }
  return Array.isArray(val) ? deepCopyArray(val) : deepCopyObject(val);
}
function deepCopyArray(arr) {
  const copy = [];
  for (let i = 0; i < arr.length; i++) {
    copy.push(deepCopy(arr[i]));
  }
  return copy;
}
function deepCopyObject(obj) {
  const copy = {};
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    copy[key] = deepCopy(obj[key]);
  }
  return copy;
}
class SettingsPrefsElement extends PolymerElement {
  static get is() {
    return 'settings-prefs';
  }
  static get properties() {
    return {
      prefs: { type: Object, notify: true },
      lastPrefValues_: {
        type: Object,
        value() {
          return {};
        },
      },
    };
  }
  static get observers() {
    return ['prefsChanged_(prefs.*)'];
  }
  constructor() {
    super();
    this.settingsApi_ = chrome.settingsPrivate;
    this.initialized_ = false;
    if (!CrSettingsPrefs.deferInitialization) {
      this.initialize();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    CrSettingsPrefs.resetForTesting();
  }
  initialize(settingsApi) {
    if (this.initialized_) {
      return;
    }
    this.initialized_ = true;
    if (settingsApi) {
      this.settingsApi_ = settingsApi;
    }
    this.boundPrefsChanged_ = this.onSettingsPrivatePrefsChanged_.bind(this);
    this.settingsApi_.onPrefsChanged.addListener(this.boundPrefsChanged_);
    this.settingsApi_.getAllPrefs().then((prefs) => {
      this.updatePrefs_(prefs);
      CrSettingsPrefs.setInitialized();
    });
  }
  prefsChanged_(e) {
    if (!CrSettingsPrefs.isInitialized || e.path === 'prefs') {
      return;
    }
    const key = this.getPrefKeyFromPath_(e.path);
    const prefStoreValue = this.lastPrefValues_[key];
    const prefObj = this.get(key, this.prefs);
    if (!deepEqual(prefStoreValue, prefObj.value)) {
      this.settingsApi_.setPref(key, prefObj.value, '').then((success) => {
        if (!success) {
          this.refresh(key);
        }
      });
    }
  }
  onSettingsPrivatePrefsChanged_(prefs) {
    if (CrSettingsPrefs.isInitialized) {
      this.updatePrefs_(prefs);
    }
  }
  refresh(key) {
    this.settingsApi_.getPref(key).then((pref) => {
      this.updatePrefs_([pref]);
    });
  }
  updatePrefPath_(path, value, prefsObject) {
    const parts = path.split('.');
    let cur = prefsObject;
    for (let part; parts.length && (part = parts.shift()); ) {
      if (!parts.length) {
        cur[part] = value;
      } else if (part in cur) {
        cur = cur[part];
      } else {
        cur = cur[part] = {};
      }
    }
  }
  updatePrefs_(newPrefs) {
    const prefs = this.prefs || {};
    newPrefs.forEach((newPrefObj) => {
      this.lastPrefValues_[newPrefObj.key] = deepCopy(newPrefObj.value);
      if (!deepEqual(this.get(newPrefObj.key, prefs), newPrefObj)) {
        this.updatePrefPath_(newPrefObj.key, newPrefObj, prefs);
        if (prefs === this.prefs) {
          this.notifyPath('prefs.' + newPrefObj.key, newPrefObj);
        }
      }
    });
    if (!this.prefs) {
      this.prefs = prefs;
    }
  }
  getPrefKeyFromPath_(path) {
    const parts = path.split('.');
    assert(parts.shift() === 'prefs', "Path doesn't begin with 'prefs'");
    for (let i = 1; i <= parts.length; i++) {
      const key = parts.slice(0, i).join('.');
      if (this.lastPrefValues_.hasOwnProperty(key)) {
        return key;
      }
    }
    return '';
  }
  resetForTesting() {
    if (!this.initialized_) {
      return;
    }
    this.prefs = undefined;
    this.lastPrefValues_ = {};
    this.initialized_ = false;
    this.settingsApi_.onPrefsChanged.removeListener(this.boundPrefsChanged_);
    this.settingsApi_ = chrome.settingsPrivate;
  }
}
customElements.define(SettingsPrefsElement.is, SettingsPrefsElement);
// Copyright 2012 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const CLASS_NAME = 'focus-outline-visible';
const docsToManager = new Map();
class FocusOutlineManager {
  constructor(doc) {
    this.focusByKeyboard_ = true;
    this.classList_ = doc.documentElement.classList;
    doc.addEventListener('keydown', () => this.onEvent_(true), true);
    doc.addEventListener('mousedown', () => this.onEvent_(false), true);
    this.updateVisibility();
  }
  onEvent_(focusByKeyboard) {
    if (this.focusByKeyboard_ === focusByKeyboard) {
      return;
    }
    this.focusByKeyboard_ = focusByKeyboard;
    this.updateVisibility();
  }
  updateVisibility() {
    this.visible = this.focusByKeyboard_;
  }
  set visible(visible) {
    this.classList_.toggle(CLASS_NAME, visible);
  }
  get visible() {
    return this.classList_.contains(CLASS_NAME);
  }
  static forDocument(doc) {
    let manager = docsToManager.get(doc);
    if (!manager) {
      manager = new FocusOutlineManager(doc);
      docsToManager.set(doc, manager);
    }
    return manager;
  }
}
function getTemplate$L() {
  return html`<!--_html_template_start_-->
    <style include="cr-hidden-style">
      :host {
        --active-shadow-rgb: var(--google-grey-800-rgb);
        --active-shadow-action-rgb: var(--google-blue-500-rgb);
        --bg-action: var(--google-blue-600);
        --border-color: var(--google-grey-300);
        --disabled-bg-action: var(--google-grey-100);
        --disabled-bg: white;
        --disabled-border-color: var(--google-grey-100);
        --disabled-text-color: var(--google-grey-600);
        --focus-shadow-color: rgba(var(--google-blue-600-rgb), 0.4);
        --hover-bg-action: rgba(var(--google-blue-600-rgb), 0.9);
        --hover-bg-color: rgba(var(--google-blue-500-rgb), 0.04);
        --hover-border-color: var(--google-blue-100);
        --hover-shadow-action-rgb: var(--google-blue-500-rgb);
        --ink-color-action: white;
        --ink-color: var(--google-blue-600);
        --ripple-opacity-action: 0.32;
        --ripple-opacity: 0.1;
        --text-color-action: white;
        --text-color: var(--google-blue-600);
      }
      @media (prefers-color-scheme: dark) {
        :host {
          --active-bg: black linear-gradient(rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06));
          --active-shadow-rgb: 0, 0, 0;
          --active-shadow-action-rgb: var(--google-blue-500-rgb);
          --bg-action: var(--google-blue-300);
          --border-color: var(--google-grey-700);
          --disabled-bg-action: var(--google-grey-800);
          --disabled-bg: transparent;
          --disabled-border-color: var(--google-grey-800);
          --disabled-text-color: var(--google-grey-500);
          --focus-shadow-color: rgba(var(--google-blue-300-rgb), 0.5);
          --hover-bg-action: var(--bg-action) linear-gradient(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08));
          --hover-bg-color: rgba(var(--google-blue-300-rgb), 0.08);
          --ink-color-action: black;
          --ink-color: var(--google-blue-300);
          --ripple-opacity-action: 0.16;
          --ripple-opacity: 0.16;
          --text-color-action: var(--google-grey-900);
          --text-color: var(--google-blue-300);
        }
      }
      :host {
        --paper-ripple-opacity: var(--ripple-opacity);
        -webkit-tap-highlight-color: transparent;
        align-items: center;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        box-sizing: border-box;
        color: var(--text-color);
        cursor: pointer;
        display: inline-flex;
        flex-shrink: 0;
        font-weight: 500;
        height: var(--cr-button-height);
        justify-content: center;
        min-width: 5.14em;
        outline-width: 0;
        overflow: hidden;
        padding: 8px 16px;
        position: relative;
        user-select: none;
      }
      :host-context([chrome-refresh-2023]):host {
        --border-color: var(--color-button-border, var(--cr-fallback-color-tonal-outline));
        --text-color: var(--color-button-foreground, var(--cr-fallback-color-primary));
        --hover-bg-color: transparent;
        --hover-border-color: var(--border-color);
        --active-bg: transparent;
        --active-shadow: none;
        --ink-color: var(--cr-active-background-color);
        --ripple-opacity: 1;
        --disabled-bg: transparent;
        --disabled-border-color: var(--color-button-border-disabled, var(--cr-fallback-color-disabled-background));
        --disabled-text-color: var(--color-button-foreground-disabled, var(--cr-fallback-color-disabled-foreground));
        --bg-action: var(--color-button-background-prominent, var(--cr-fallback-color-primary));
        --text-color-action: var(--color-button-foreground-prominent, var(--cr-fallback-color-on-primary));
        --hover-bg-action: var(--bg-action);
        --active-shadow-action: none;
        --ink-color-action: var(--cr-active-background-color);
        --ripple-opacity-action: 1;
        --disabled-bg-action: var(
          --color-button-background-prominent-disabled,
          var(--cr-fallback-color-disabled-background)
        );
        background: 0 0;
        border-radius: 100px;
        isolation: isolate;
        line-height: 20px;
      }
      :host([has-prefix-icon_]),
      :host([has-suffix-icon_]) {
        --iron-icon-height: 16px;
        --iron-icon-width: 16px;
        gap: 8px;
        padding: 8px;
      }
      :host-context([chrome-refresh-2023]):host([has-prefix-icon_]),
      :host-context([chrome-refresh-2023]):host([has-suffix-icon_]) {
        --iron-icon-height: 20px;
        --iron-icon-width: 20px;
        --icon-block-padding-large: 16px;
        --icon-block-padding-small: 12px;
        padding-block-end: 8px;
        padding-block-start: 8px;
      }
      :host-context([chrome-refresh-2023]):host([has-prefix-icon_]) {
        padding-inline-end: var(--icon-block-padding-large);
        padding-inline-start: var(--icon-block-padding-small);
      }
      :host-context([chrome-refresh-2023]):host([has-suffix-icon_]) {
        padding-inline-end: var(--icon-block-padding-small);
        padding-inline-start: var(--icon-block-padding-large);
      }
      :host-context(.focus-outline-visible):host(:focus) {
        box-shadow: 0 0 0 2px var(--focus-shadow-color);
      }
      @media (forced-colors: active) {
        :host-context(.focus-outline-visible):host(:focus) {
          outline: var(--cr-focus-outline-hcm);
        }
        :host-context([chrome-refresh-2023]):host {
          forced-color-adjust: none;
        }
      }
      :host-context([chrome-refresh-2023].focus-outline-visible):host(:focus) {
        box-shadow: none;
        outline: 2px solid var(--cr-focus-outline-color);
        outline-offset: 2px;
      }
      :host(:active) {
        background: var(--active-bg);
        box-shadow: var(
          --active-shadow,
          0 1px 2px 0 rgba(var(--active-shadow-rgb), 0.3),
          0 3px 6px 2px rgba(var(--active-shadow-rgb), 0.15)
        );
      }
      :host(:hover) {
        background-color: var(--hover-bg-color);
      }
      @media (prefers-color-scheme: light) {
        :host(:hover) {
          border-color: var(--hover-border-color);
        }
      }
      #background {
        border-radius: inherit;
        inset: 0;
        pointer-events: none;
        position: absolute;
        z-index: 0;
      }
      :host-context([chrome-refresh-2023]):host(:hover) #background {
        background-color: var(--hover-bg-color);
      }
      :host-context([chrome-refresh-2023].focus-outline-visible):host(:focus) #background {
        background-clip: padding-box;
      }
      :host-context([chrome-refresh-2023]):host(.action-button) #background {
        background-color: var(--bg-action);
      }
      :host-context([chrome-refresh-2023]):host([disabled]) #background {
        background-color: var(--disabled-bg);
      }
      :host-context([chrome-refresh-2023]):host(.action-button[disabled]) #background {
        background-color: var(--disabled-bg-action);
      }
      :host-context([chrome-refresh-2023]):host(.floating-button) #background,
      :host-context([chrome-refresh-2023]):host(.tonal-button) #background {
        background-color: var(--color-button-background-tonal, var(--cr-fallback-color-secondary-container));
      }
      :host-context([chrome-refresh-2023]):host([disabled].floating-button) #background,
      :host-context([chrome-refresh-2023]):host([disabled].tonal-button) #background {
        background-color: var(--color-button-background-tonal-disabled, var(--cr-fallback-color-disabled-background));
      }
      #content {
        display: contents;
      }
      :host-context([chrome-refresh-2023]) #content {
        display: inline;
        z-index: 2;
      }
      :host-context([chrome-refresh-2023]) ::slotted(*) {
        z-index: 2;
      }
      #hoverBackground {
        content: '';
        display: none;
        inset: 0;
        pointer-events: none;
        position: absolute;
        z-index: 1;
      }
      :host-context([chrome-refresh-2023]):host(:hover) #hoverBackground {
        background: var(--cr-hover-background-color);
        display: block;
      }
      :host(.action-button) {
        --ink-color: var(--ink-color-action);
        --paper-ripple-opacity: var(--ripple-opacity-action);
        background-color: var(--bg-action);
        border: none;
        color: var(--text-color-action);
      }
      :host-context([chrome-refresh-2023]):host(.action-button) {
        background-color: transparent;
      }
      :host(.action-button:active) {
        box-shadow: var(
          --active-shadow-action,
          0 1px 2px 0 rgba(var(--active-shadow-action-rgb), 0.3),
          0 3px 6px 2px rgba(var(--active-shadow-action-rgb), 0.15)
        );
      }
      :host(.action-button:hover) {
        background: var(--hover-bg-action);
      }
      @media (prefers-color-scheme: light) {
        :host(.action-button:not(:active):hover) {
          box-shadow: 0 1px 2px 0 rgba(var(--hover-shadow-action-rgb), 0.3),
            0 1px 3px 1px rgba(var(--hover-shadow-action-rgb), 0.15);
        }
        :host-context([chrome-refresh-2023]):host(.action-button:not(:active):hover) {
          box-shadow: none;
        }
      }
      :host([disabled]) {
        background-color: var(--disabled-bg);
        border-color: var(--disabled-border-color);
        color: var(--disabled-text-color);
        cursor: auto;
        pointer-events: none;
      }
      :host(.action-button[disabled]) {
        background-color: var(--disabled-bg-action);
        border-color: transparent;
      }
      :host(.cancel-button) {
        margin-inline-end: 8px;
      }
      :host(.action-button),
      :host(.cancel-button) {
        line-height: 154%;
      }
      :host-context([chrome-refresh-2023]):host(.floating-button),
      :host-context([chrome-refresh-2023]):host(.tonal-button) {
        border: none;
        color: var(--color-button-foreground-tonal, var(--cr-fallback-color-on-tonal-container));
      }
      :host-context([chrome-refresh-2023]):host(.floating-button[disabled]),
      :host-context([chrome-refresh-2023]):host(.tonal-button[disabled]) {
        border: none;
        color: var(--disabled-text-color);
      }
      :host-context([chrome-refresh-2023]):host(.floating-button) {
        border-radius: 8px;
        height: 40px;
        transition: box-shadow 80ms linear;
      }
      :host-context([chrome-refresh-2023]):host(.floating-button:hover) {
        box-shadow: var(--cr-elevation-3);
      }
      paper-ripple {
        color: var(--ink-color);
        height: var(--paper-ripple-height);
        left: var(--paper-ripple-left, 0);
        top: var(--paper-ripple-top, 0);
        width: var(--paper-ripple-width);
      }
      :host-context([chrome-refresh-2023]) paper-ripple {
        z-index: 1;
      }
    </style>

    <div id="background"></div>
    <slot id="prefixIcon" name="prefix-icon" on-slotchange="onPrefixIconSlotChanged_"> </slot>
    <span id="content"><slot></slot></span>
    <slot id="suffixIcon" name="suffix-icon" on-slotchange="onSuffixIconSlotChanged_"> </slot>
    <div id="hoverBackground" part="hoverBackground"></div>
    <!--_html_template_end_-->`;
}
// Copyright 2019 The Chromium Authors
const CrButtonElementBase = mixinBehaviors([PaperRippleBehavior], PolymerElement);
class CrButtonElement extends CrButtonElementBase {
  static get is() {
    return 'cr-button';
  }
  static get template() {
    return getTemplate$L();
  }
  static get properties() {
    return {
      disabled: { type: Boolean, value: false, reflectToAttribute: true, observer: 'disabledChanged_' },
      customTabIndex: { type: Number, observer: 'applyTabIndex_' },
      circleRipple: { type: Boolean, value: false },
      hasPrefixIcon_: { type: Boolean, reflectToAttribute: true, value: false },
      hasSuffixIcon_: { type: Boolean, reflectToAttribute: true, value: false },
    };
  }
  constructor() {
    super();
    this.spaceKeyDown_ = false;
    this.timeoutIds_ = new Set();
    this.addEventListener('blur', this.onBlur_.bind(this));
    this.addEventListener('click', this.onClick_.bind(this));
    this.addEventListener('keydown', this.onKeyDown_.bind(this));
    this.addEventListener('keyup', this.onKeyUp_.bind(this));
    this.addEventListener('pointerdown', this.onPointerDown_.bind(this));
  }
  ready() {
    super.ready();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    if (!this.hasAttribute('aria-disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    }
    FocusOutlineManager.forDocument(document);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.timeoutIds_.forEach(clearTimeout);
    this.timeoutIds_.clear();
  }
  setTimeout_(fn, delay) {
    if (!this.isConnected) {
      return;
    }
    const id = setTimeout(() => {
      this.timeoutIds_.delete(id);
      fn();
    }, delay);
    this.timeoutIds_.add(id);
  }
  disabledChanged_(newValue, oldValue) {
    if (!newValue && oldValue === undefined) {
      return;
    }
    if (this.disabled) {
      this.blur();
    }
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    this.applyTabIndex_();
  }
  applyTabIndex_() {
    let value = this.customTabIndex;
    if (value === undefined) {
      value = this.disabled ? -1 : 0;
    }
    this.setAttribute('tabindex', value.toString());
  }
  onBlur_() {
    this.spaceKeyDown_ = false;
    this.setTimeout_(() => this.getRipple().uiUpAction(), 100);
  }
  onClick_(e) {
    if (this.disabled) {
      e.stopImmediatePropagation();
    }
  }
  onPrefixIconSlotChanged_() {
    this.hasPrefixIcon_ = this.$.prefixIcon.assignedElements().length > 0;
  }
  onSuffixIconSlotChanged_() {
    this.hasSuffixIcon_ = this.$.suffixIcon.assignedElements().length > 0;
  }
  onKeyDown_(e) {
    if (e.key !== ' ' && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.repeat) {
      return;
    }
    this.getRipple().uiDownAction();
    if (e.key === 'Enter') {
      this.click();
      this.setTimeout_(() => this.getRipple().uiUpAction(), 100);
    } else if (e.key === ' ') {
      this.spaceKeyDown_ = true;
    }
  }
  onKeyUp_(e) {
    if (e.key !== ' ' && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (this.spaceKeyDown_ && e.key === ' ') {
      this.spaceKeyDown_ = false;
      this.click();
      this.getRipple().uiUpAction();
    }
  }
  onPointerDown_() {
    this.ensureRipple();
  }
  _createRipple() {
    const ripple = super._createRipple();
    if (this.circleRipple) {
      ripple.setAttribute('center', '');
      ripple.classList.add('circle');
    }
    return ripple;
  }
}
customElements.define(CrButtonElement.is, CrButtonElement);
// Copyright 2017 The Chromium Authors
var CrContainerShadowSide;
(function (CrContainerShadowSide) {
  CrContainerShadowSide['TOP'] = 'top';
  CrContainerShadowSide['BOTTOM'] = 'bottom';
})(CrContainerShadowSide || (CrContainerShadowSide = {}));
const CrContainerShadowMixin = dedupingMixin((superClass) => {
  class CrContainerShadowMixin extends superClass {
    constructor() {
      super(...arguments);
      this.intersectionObserver_ = null;
      this.dropShadows_ = new Map();
      this.intersectionProbes_ = new Map();
      this.sides_ = null;
    }
    connectedCallback() {
      super.connectedCallback();
      const hasBottomShadow = this.getContainer_().hasAttribute('show-bottom-shadow');
      this.sides_ = hasBottomShadow
        ? [CrContainerShadowSide.TOP, CrContainerShadowSide.BOTTOM]
        : [CrContainerShadowSide.TOP];
      this.sides_.forEach((side) => {
        const shadow = document.createElement('div');
        shadow.id = `cr-container-shadow-${side}`;
        shadow.classList.add('cr-container-shadow');
        this.dropShadows_.set(side, shadow);
        this.intersectionProbes_.set(side, document.createElement('div'));
      });
      this.getContainer_().parentNode.insertBefore(
        this.dropShadows_.get(CrContainerShadowSide.TOP),
        this.getContainer_()
      );
      this.getContainer_().prepend(this.intersectionProbes_.get(CrContainerShadowSide.TOP));
      if (hasBottomShadow) {
        this.getContainer_().parentNode.insertBefore(
          this.dropShadows_.get(CrContainerShadowSide.BOTTOM),
          this.getContainer_().nextSibling
        );
        this.getContainer_().append(this.intersectionProbes_.get(CrContainerShadowSide.BOTTOM));
      }
      this.enableShadowBehavior(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.enableShadowBehavior(false);
    }
    getContainer_() {
      return this.shadowRoot.querySelector('#container');
    }
    getIntersectionObserver_() {
      const callback = (entries) => {
        for (const entry of entries) {
          const target = entry.target;
          this.sides_.forEach((side) => {
            if (target === this.intersectionProbes_.get(side)) {
              this.dropShadows_.get(side).classList.toggle('has-shadow', entry.intersectionRatio === 0);
            }
          });
        }
      };
      return new IntersectionObserver(callback, { root: this.getContainer_(), threshold: 0 });
    }
    enableShadowBehavior(enable) {
      if (enable === !!this.intersectionObserver_) {
        return;
      }
      if (!enable) {
        this.intersectionObserver_.disconnect();
        this.intersectionObserver_ = null;
        return;
      }
      this.intersectionObserver_ = this.getIntersectionObserver_();
      window.setTimeout(() => {
        if (this.intersectionObserver_) {
          this.intersectionProbes_.forEach((probe) => {
            this.intersectionObserver_.observe(probe);
          });
        }
      });
    }
    showDropShadows() {
      assert(!this.intersectionObserver_);
      assert(this.sides_);
      for (const side of this.sides_) {
        this.dropShadows_.get(side).classList.toggle('has-shadow', true);
      }
    }
  }
  return CrContainerShadowMixin;
});
function getTemplate$K() {
  return html`<!--_html_template_start_-->
    <style include="cr-hidden-style cr-icons">
      dialog {
        --scroll-border-color: var(--paper-grey-300);
        --scroll-border: 1px solid var(--scroll-border-color);
        background-color: var(--cr-dialog-background-color, #fff);
        border: 0;
        border-radius: var(--cr-dialog-border-radius, 8px);
        bottom: 50%;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.12), 0 16px 16px rgba(0, 0, 0, 0.24);
        color: inherit;
        max-height: initial;
        max-width: initial;
        overflow-y: hidden;
        padding: 0;
        position: absolute;
        top: 50%;
        width: var(--cr-dialog-width, 512px);
      }
      @media (prefers-color-scheme: dark) {
        dialog {
          --scroll-border-color: var(--google-grey-700);
          background-color: var(--cr-dialog-background-color, var(--google-grey-900));
          background-image: linear-gradient(rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04));
        }
      }
      @media (forced-colors: active) {
        dialog {
          border: var(--cr-border-hcm);
        }
      }
      dialog[open] #content-wrapper {
        display: flex;
        flex-direction: column;
        max-height: 100vh;
        overflow: auto;
      }
      .top-container,
      :host ::slotted([slot='button-container']),
      :host ::slotted([slot='footer']) {
        flex-shrink: 0;
      }
      dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.6);
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
      }
      :host ::slotted([slot='body']) {
        color: var(--cr-secondary-text-color);
        padding: 0 var(--cr-dialog-body-padding-horizontal, 20px);
      }
      :host ::slotted([slot='title']) {
        color: var(--cr-primary-text-color);
        flex: 1;
        font-family: var(--cr-dialog-font-family, inherit);
        font-size: var(--cr-dialog-title-font-size, calc(15 / 13 * 100%));
        line-height: 1;
        padding-bottom: var(--cr-dialog-title-slot-padding-bottom, 16px);
        padding-inline-end: var(--cr-dialog-title-slot-padding-end, 20px);
        padding-inline-start: var(--cr-dialog-title-slot-padding-start, 20px);
        padding-top: var(--cr-dialog-title-slot-padding-top, 20px);
      }
      :host ::slotted([slot='button-container']) {
        display: flex;
        justify-content: flex-end;
        padding-bottom: var(--cr-dialog-button-container-padding-bottom, 16px);
        padding-inline-end: var(--cr-dialog-button-container-padding-horizontal, 16px);
        padding-inline-start: var(--cr-dialog-button-container-padding-horizontal, 16px);
        padding-top: 16px;
      }
      :host ::slotted([slot='footer']) {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
        border-top: 1px solid #dbdbdb;
        margin: 0;
        padding: 16px 20px;
      }
      :host([hide-backdrop]) dialog::backdrop {
        opacity: 0;
      }
      @media (prefers-color-scheme: dark) {
        :host ::slotted([slot='footer']) {
          border-top-color: var(--cr-separator-color);
        }
      }
      .body-container {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        min-height: 1.375rem;
        overflow: auto;
      }
      :host {
        --transparent-border: 1px solid transparent;
      }
      #cr-container-shadow-top {
        border-bottom: var(--cr-dialog-body-border-top, var(--transparent-border));
      }
      #cr-container-shadow-bottom {
        border-bottom: var(--cr-dialog-body-border-bottom, var(--transparent-border));
      }
      #cr-container-shadow-bottom.has-shadow,
      #cr-container-shadow-top.has-shadow {
        border-bottom: var(--scroll-border);
      }
      .top-container {
        align-items: flex-start;
        display: flex;
        min-height: var(--cr-dialog-top-container-min-height, 31px);
      }
      .title-container {
        display: flex;
        flex: 1;
        font-size: inherit;
        font-weight: inherit;
        margin: 0;
        outline: 0;
      }
      #close {
        align-self: flex-start;
        margin-inline-end: 4px;
        margin-top: 4px;
      }
    </style>
    <dialog
      id="dialog"
      on-close="onNativeDialogClose_"
      on-cancel="onNativeDialogCancel_"
      part="dialog"
      aria-labelledby="title"
      aria-describedby="container"
    >
      <div id="content-wrapper" part="wrapper">
        <div class="top-container">
          <h2 id="title" class="title-container" tabindex="-1">
            <slot name="title"></slot>
          </h2>
          <cr-icon-button
            id="close"
            class="icon-clear"
            hidden$="[[!showCloseButton]]"
            aria-label$="[[closeText]]"
            on-click="cancel"
            on-keypress="onCloseKeypress_"
          >
          </cr-icon-button>
        </div>
        <slot name="header"></slot>
        <div class="body-container" id="container" show-bottom-shadow part="body-container">
          <slot name="body"></slot>
        </div>
        <slot name="button-container"></slot>
        <slot name="footer"></slot>
      </div>
    </dialog>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
const CrDialogElementBase = CrContainerShadowMixin(PolymerElement);
class CrDialogElement extends CrDialogElementBase {
  constructor() {
    super(...arguments);
    this.intersectionObserver_ = null;
    this.mutationObserver_ = null;
    this.boundKeydown_ = null;
  }
  static get is() {
    return 'cr-dialog';
  }
  static get template() {
    return getTemplate$K();
  }
  static get properties() {
    return {
      open: { type: Boolean, value: false, reflectToAttribute: true },
      closeText: String,
      ignorePopstate: { type: Boolean, value: false },
      ignoreEnterKey: { type: Boolean, value: false },
      consumeKeydownEvent: { type: Boolean, value: false },
      noCancel: { type: Boolean, value: false },
      showCloseButton: { type: Boolean, value: false },
      showOnAttach: { type: Boolean, value: false },
    };
  }
  ready() {
    super.ready();
    window.addEventListener('popstate', () => {
      if (!this.ignorePopstate && this.$.dialog.open) {
        this.cancel();
      }
    });
    if (!this.ignoreEnterKey) {
      this.addEventListener('keypress', this.onKeypress_.bind(this));
    }
    this.addEventListener('pointerdown', (e) => this.onPointerdown_(e));
  }
  connectedCallback() {
    super.connectedCallback();
    const mutationObserverCallback = () => {
      if (this.$.dialog.open) {
        this.enableShadowBehavior(true);
        this.addKeydownListener_();
      } else {
        this.enableShadowBehavior(false);
        this.removeKeydownListener_();
      }
    };
    this.mutationObserver_ = new MutationObserver(mutationObserverCallback);
    this.mutationObserver_.observe(this.$.dialog, { attributes: true, attributeFilter: ['open'] });
    mutationObserverCallback();
    if (this.showOnAttach) {
      this.showModal();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeKeydownListener_();
    if (this.mutationObserver_) {
      this.mutationObserver_.disconnect();
      this.mutationObserver_ = null;
    }
  }
  addKeydownListener_() {
    if (!this.consumeKeydownEvent) {
      return;
    }
    this.boundKeydown_ = this.boundKeydown_ || this.onKeydown_.bind(this);
    this.addEventListener('keydown', this.boundKeydown_);
    document.body.addEventListener('keydown', this.boundKeydown_);
  }
  removeKeydownListener_() {
    if (!this.boundKeydown_) {
      return;
    }
    this.removeEventListener('keydown', this.boundKeydown_);
    document.body.removeEventListener('keydown', this.boundKeydown_);
    this.boundKeydown_ = null;
  }
  showModal() {
    this.$.dialog.showModal();
    assert(this.$.dialog.open);
    this.open = true;
    this.dispatchEvent(new CustomEvent('cr-dialog-open', { bubbles: true, composed: true }));
  }
  cancel() {
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
    this.$.dialog.close();
    assert(!this.$.dialog.open);
    this.open = false;
  }
  close() {
    this.$.dialog.close('success');
    assert(!this.$.dialog.open);
    this.open = false;
  }
  setTitleAriaLabel(title) {
    this.$.dialog.removeAttribute('aria-labelledby');
    this.$.dialog.setAttribute('aria-label', title);
  }
  onCloseKeypress_(e) {
    e.stopPropagation();
  }
  onNativeDialogClose_(e) {
    if (e.target !== this.getNative()) {
      return;
    }
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }
  onNativeDialogCancel_(e) {
    if (e.target !== this.getNative()) {
      return;
    }
    if (this.noCancel) {
      e.preventDefault();
      return;
    }
    this.open = false;
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
  }
  getNative() {
    return this.$.dialog;
  }
  onKeypress_(e) {
    if (e.key !== 'Enter') {
      return;
    }
    const accept =
      e.target === this || e.composedPath().some((el) => el.tagName === 'CR-INPUT' && el.type !== 'search');
    if (!accept) {
      return;
    }
    const actionButton = this.querySelector('.action-button:not([disabled]):not([hidden])');
    if (actionButton) {
      actionButton.click();
      e.preventDefault();
    }
  }
  onKeydown_(e) {
    assert(this.consumeKeydownEvent);
    if (!this.getNative().open) {
      return;
    }
    if (this.ignoreEnterKey && e.key === 'Enter') {
      return;
    }
    e.stopPropagation();
  }
  onPointerdown_(e) {
    if (e.button !== 0 || e.composedPath()[0].tagName !== 'DIALOG') {
      return;
    }
    this.$.dialog.animate(
      [
        { transform: 'scale(1)', offset: 0 },
        { transform: 'scale(1.02)', offset: 0.4 },
        { transform: 'scale(1.02)', offset: 0.6 },
        { transform: 'scale(1)', offset: 1 },
      ],
      { duration: 180, easing: 'ease-in-out', iterations: 1 }
    );
    e.preventDefault();
  }
  focus() {
    const titleContainer = this.shadowRoot.querySelector('.title-container');
    assert(titleContainer);
    titleContainer.focus();
  }
}
customElements.define(CrDialogElement.is, CrDialogElement);
// Copyright 2016 The Chromium Authors
class LifetimeBrowserProxyImpl {
  restart() {
    chrome.send('restart');
  }
  relaunch() {
    chrome.send('relaunch');
  }
  shouldShowRelaunchConfirmationDialog() {
    return sendWithPromise('shouldShowRelaunchConfirmationDialog');
  }
  getRelaunchConfirmationDialogDescription() {
    return sendWithPromise('getRelaunchConfirmationDialogDescription');
  }
  static getInstance() {
    return instance$g || (instance$g = new LifetimeBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$g = obj;
  }
}
let instance$g = null;
function getTemplate$J() {
  return html`<!--_html_template_start_--><cr-dialog id="dialog" close-text="鍏抽棴" show-on-attach>
      <div slot="title">閲嶆柊鍚姩 Chrome锛�</div>
      <div slot="body">[[relaunchConfirmationDialogDesc]]</div>
      <div slot="button-container">
        <cr-button id="cancel" class="cancel-button" on-click="onDialogCancel_"> 鍙栨秷 </cr-button>
        <cr-button id="confirm" class="action-button" on-click="onDialogConfirm_"> 閲嶆柊鍚姩 </cr-button>
      </div>
    </cr-dialog>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
var RestartType;
(function (RestartType) {
  RestartType[(RestartType['RESTART'] = 0)] = 'RESTART';
  RestartType[(RestartType['RELAUNCH'] = 1)] = 'RELAUNCH';
})(RestartType || (RestartType = {}));
const RelaunchMixin = dedupingMixin((superClass) => {
  class RelaunchMixin extends superClass {
    static get properties() {
      return {
        shouldShowRelaunchDialog: { type: Boolean, value: false },
        restartTypeEnum: { type: Object, value: RestartType },
      };
    }
    constructor(...args) {
      super(...args);
      this.lifetimeBrowserProxy_ = LifetimeBrowserProxyImpl.getInstance();
    }
    onRelaunchDialogClose(_event) {
      this.shouldShowRelaunchDialog = false;
    }
    performRestartInternal_(restartType) {
      if (RestartType.RESTART === restartType) {
        this.lifetimeBrowserProxy_.restart();
      } else if (RestartType.RELAUNCH === restartType) {
        this.lifetimeBrowserProxy_.relaunch();
      } else {
        assertNotReached();
      }
    }
    async performRestartForNonChromeOs_(restartType) {
      const shouldShowDialog = await this.lifetimeBrowserProxy_.shouldShowRelaunchConfirmationDialog();
      if (!shouldShowDialog) {
        this.performRestartInternal_(restartType);
        return;
      }
      this.shouldShowRelaunchDialog = true;
    }
    performRestart(restartType) {
      this.performRestartForNonChromeOs_(restartType);
    }
  }
  return RelaunchMixin;
});
// Copyright 2021 The Chromium Authors
class RelaunchConfirmationDialogElement extends PolymerElement {
  static get is() {
    return 'relaunch-confirmation-dialog';
  }
  static get template() {
    return getTemplate$J();
  }
  static get properties() {
    return { relaunchConfirmationDialogDesc: String, restartType: Object };
  }
  async connectedCallback() {
    super.connectedCallback();
    this.relaunchConfirmationDialogDesc =
      await LifetimeBrowserProxyImpl.getInstance().getRelaunchConfirmationDialogDescription();
  }
  onDialogCancel_() {
    this.$.dialog.cancel();
  }
  onDialogConfirm_() {
    if (RestartType.RELAUNCH === this.restartType) {
      LifetimeBrowserProxyImpl.getInstance().relaunch();
    } else if (RestartType.RESTART === this.restartType) {
      LifetimeBrowserProxyImpl.getInstance().restart();
    } else {
      assertNotReached();
    }
  }
}
customElements.define(RelaunchConfirmationDialogElement.is, RelaunchConfirmationDialogElement);
const styleMod$7 = document.createElement('dom-module');
styleMod$7.appendChild(
  html`
    <template>
      <style>
        .search-bubble {
          --search-bubble-color: var(--paper-yellow-500);
          position: absolute;
          z-index: 1;
        }
        .search-bubble-innards {
          align-items: center;
          background-color: var(--search-bubble-color);
          border-radius: 2px;
          color: var(--google-grey-900);
          max-width: 100px;
          min-width: 64px;
          overflow: hidden;
          padding: 4px 10px;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .search-bubble-innards::after {
          background-color: var(--search-bubble-color);
          content: '';
          height: 10px;
          left: calc(50% - 5px);
          position: absolute;
          top: -5px;
          transform: rotate(-45deg);
          width: 10px;
          z-index: -1;
        }
        .search-bubble-innards.above::after {
          bottom: -5px;
          top: auto;
          transform: rotate(-135deg);
        }
      </style>
    </template>
  `.content
);
styleMod$7.register('search-highlight-style');
const template$2 = html`
  <custom-style>
    <style>
      html {
        --settings-error-color: var(--google-red-700);
        --iron-icon-fill-color: var(--google-grey-700);
        --iron-icon-height: var(--cr-icon-size);
        --iron-icon-width: var(--cr-icon-size);
        --cr-radio-group-item-padding: 0;
      }
      @media (prefers-color-scheme: dark) {
        html {
          --iron-icon-fill-color: var(--google-grey-500);
          --settings-error-color: var(--google-red-300);
        }
      }
    </style>
  </custom-style>
`;
document.head.appendChild(template$2.content);
const styleMod$6 = document.createElement('dom-module');
styleMod$6.appendChild(
  html`
    <template>
      <style include="cr-shared-style search-highlight-style">
        a[is='action-link'] {
          user-select: none;
        }
        h2 {
          align-items: center;
          align-self: flex-start;
          color: var(--cr-secondary-text-color);
          display: flex;
          font-size: inherit;
          font-weight: 500;
          margin: 0;
          padding-bottom: 12px;
          padding-top: 32px;
        }
        iron-icon {
          flex-shrink: 0;
        }
        iron-icon.policy {
          margin-inline-end: var(--cr-controlled-by-spacing);
        }
        iron-list {
          user-select: none;
        }
        iron-list[risk-selection] {
          user-select: text;
        }
        .separator + cr-icon-button {
          margin-inline-start: var(--cr-icon-ripple-margin);
        }
        .settings-box settings-toggle-button cr-button:last-of-type {
          margin-inline-end: 16px;
        }
        .settings-box controlled-button + controlled-button,
        .settings-box controlled-button + cr-button,
        .settings-box cr-button + controlled-button,
        .settings-box cr-button + cr-button {
          margin-inline-start: 8px;
        }
        a[href] {
          color: var(--cr-link-color);
        }
        .inherit-color {
          color: inherit !important;
        }
        .primary-toggle {
          color: var(--cr-secondary-text-color);
          font-weight: 500;
        }
        .primary-toggle[checked] {
          color: var(--google-blue-500);
        }
        collapse-radio-button,
        controlled-radio-button,
        cr-radio-button {
          min-height: var(--cr-section-min-height);
        }
        cr-radio-group {
          width: 100%;
        }
        .text-elide {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .no-min-width {
          min-width: 0;
        }
        .header-aligned-button {
          margin-top: 12px;
        }
        .link-wrapper {
          align-items: center;
          display: flex;
          flex-grow: 1;
        }
        .list-frame {
          display: block;
          padding-block-end: 0;
          padding-block-start: 0;
          padding-inline-end: var(--cr-section-padding);
          padding-inline-start: var(--cr-section-indent-padding);
        }
        .list-item {
          align-items: center;
          display: flex;
          min-height: var(--cr-section-min-height);
          padding: 0;
        }
        .list-item.underbar {
          border-bottom: var(--cr-separator-line);
        }
        .list-item.selected {
          font-weight: 500;
        }
        .list-item .middle {
          flex: 1;
          margin: 8px 16px;
        }
        .list-item > .start {
          flex: 1;
        }
        .list-button[is='action-link'] {
          align-items: center;
          display: flex;
          flex: 1;
          font-weight: 500;
          min-height: inherit;
        }
        :host-context(html:not(.focus-outline-visible)) .list-button[is='action-link'] {
          outline: 0;
        }
        .two-line {
          min-height: var(--cr-section-two-line-min-height);
        }
        .settings-box {
          align-items: center;
          border-top: var(--cr-separator-line);
          display: flex;
          min-height: var(--cr-section-min-height);
          padding: 0 var(--cr-section-padding);
        }
        .settings-box.no-padding {
          padding: 0;
        }
        .settings-box.no-padding .margin-matches-padding {
          margin: 0 var(--cr-section-padding);
        }
        .settings-box.no-padding > .link-wrapper {
          padding: 0 var(--cr-section-padding);
        }
        .settings-box.two-line {
          min-height: var(--cr-section-two-line-min-height);
        }
        .settings-box-text {
          box-sizing: border-box;
          padding-bottom: var(--cr-section-vertical-padding);
          padding-top: var(--cr-section-vertical-padding);
        }
        .settings-box.continuation,
        .settings-box.first {
          border-top: none;
        }
        h2.first {
          padding-top: 0;
        }
        .settings-box.block {
          display: block;
        }
        .single-column {
          align-items: flex-start;
          flex-direction: column;
          justify-content: center;
        }
        .settings-box.line-only {
          min-height: 0;
        }
        .settings-box.embedded {
          padding-inline-start: var(--cr-section-indent-padding);
        }
        .secondary {
          color: var(--cr-secondary-text-color);
          font-weight: 400;
        }
        .secondary:empty {
          margin: 0;
        }
        .settings-box .middle {
          align-items: center;
          flex: auto;
          padding-inline-start: 16px;
        }
        .settings-box .middle.two-line,
        .settings-box .start.two-line {
          display: flex;
        }
        .settings-box .start {
          align-items: center;
          flex: auto;
        }
        .settings-row {
          align-items: center;
          display: flex;
          flex-direction: row;
          max-width: 100%;
          min-width: 0;
        }
        .no-outline {
          background: 0 0;
          outline: 0;
        }
        .list-item,
        [scrollable],
        iron-list {
          --cr-icon-button-margin-end: 0;
        }
        .vertical-list > :not(:first-of-type) {
          border-top: var(--cr-separator-line);
        }
        .separator {
          border-inline-start: var(--cr-separator-line);
          flex-shrink: 0;
          height: 32px;
          margin: 0 16px;
        }
        .settings-box.no-padding > .link-wrapper ~ .separator {
          margin: 0;
        }
        .column-header {
          color: var(--cr-secondary-text-color);
          font-size: inherit;
          font-weight: 400;
        }
        .error-message {
          color: #fff;
          font: 13px;
          padding-bottom: 15px;
          padding-top: 15px;
          text-align: center;
          white-space: normal;
        }
        .url-directionality {
          direction: ltr;
          unicode-bidi: embed;
        }
      </style>
    </template>
  `.content
);
styleMod$6.register('settings-shared');
const styleMod$5 = document.createElement('dom-module');
styleMod$5.appendChild(
  html`
    <template>
      <style>
        :host {
          align-items: center;
          align-self: stretch;
          display: flex;
          margin: 0;
          outline: 0;
        }
        :host(:not([effectively-disabled_])) {
          cursor: pointer;
        }
        :host(:not([no-hover], [effectively-disabled_]):hover) {
          background-color: var(--cr-hover-background-color);
        }
        :host(:not([no-hover], [effectively-disabled_]):active) {
          background-color: var(--cr-active-background-color);
        }
        :host(:not([no-hover], [effectively-disabled_])) cr-icon-button {
          --cr-icon-button-hover-background-color: transparent;
          --cr-icon-button-active-background-color: transparent;
        }
      </style>
    </template>
  `.content
);
styleMod$5.register('cr-actionable-row-style');
function getTemplate$I() {
  return html`<!--_html_template_start_--><style include="cr-actionable-row-style cr-shared-style cr-hidden-style">
      :host {
        box-sizing: border-box;
        flex: 1;
        font-family: inherit;
        font-size: 100%;
        line-height: 154%;
        min-height: var(--cr-section-min-height);
        padding: 0;
      }
      :host(:not([embedded])) {
        padding: 0 var(--cr-section-padding);
      }
      #startIcon {
        --iron-icon-fill-color: var(--cr-link-row-start-icon-color, var(--google-grey-700));
        display: flex;
        flex-shrink: 0;
        padding-inline-end: var(--cr-icon-button-margin-start);
        width: var(--cr-link-row-icon-width, var(--cr-icon-size));
      }
      @media (prefers-color-scheme: dark) {
        #startIcon {
          --iron-icon-fill-color: var(--cr-link-row-start-icon-color, var(--google-grey-500));
        }
      }
      #labelWrapper {
        flex: 1;
        flex-basis: 0.000000001px;
        padding-bottom: var(--cr-section-vertical-padding);
        padding-top: var(--cr-section-vertical-padding);
        text-align: start;
      }
      #label,
      #subLabel {
        display: flex;
      }
      #buttonAriaDescription {
        clip: rect(0, 0, 0, 0);
        display: block;
        position: fixed;
      }
    </style>
    <iron-icon id="startIcon" icon="[[startIcon]]" hidden="[[!startIcon]]" aria-hidden="true"> </iron-icon>
    <div id="labelWrapper" hidden="[[hideLabelWrapper_]]">
      <div id="label" aria-hidden="[[!ariaShowLabel]]">
        [[label]]
        <slot name="label"></slot>
      </div>
      <div id="subLabel" class="cr-secondary-text" aria-hidden="[[!ariaShowSublabel]]">
        [[subLabel]]
        <slot name="sub-label"></slot>
      </div>
    </div>
    <slot></slot>
    <div id="buttonAriaDescription" aria-hidden="true">
      [[computeButtonAriaDescription_(external, buttonAriaDescription)]]
    </div>
    <cr-icon-button
      id="icon"
      iron-icon="[[getIcon_(external)]]"
      role="link"
      part="icon"
      aria-roledescription$="[[roleDescription]]"
      aria-describedby="buttonAriaDescription"
      aria-labelledby="label subLabel"
      disabled="[[disabled]]"
    >
    </cr-icon-button>
    <!--_html_template_end_-->`;
}
// Copyright 2017 The Chromium Authors
class CrLinkRowElement extends PolymerElement {
  static get is() {
    return 'cr-link-row';
  }
  static get template() {
    return getTemplate$I();
  }
  static get properties() {
    return {
      ariaShowLabel: { type: Boolean, reflectToAttribute: true, value: false },
      ariaShowSublabel: { type: Boolean, reflectToAttribute: true, value: false },
      startIcon: { type: String, value: '' },
      label: { type: String, value: '' },
      subLabel: { type: String, value: '' },
      disabled: { type: Boolean, reflectToAttribute: true },
      external: { type: Boolean, value: false },
      usingSlottedLabel: { type: Boolean, value: false },
      roleDescription: String,
      buttonAriaDescription: String,
      hideLabelWrapper_: { type: Boolean, computed: 'computeHideLabelWrapper_(label, usingSlottedLabel)' },
    };
  }
  focus() {
    this.$.icon.focus();
  }
  computeHideLabelWrapper_() {
    return !(this.label || this.usingSlottedLabel);
  }
  getIcon_() {
    return this.external ? 'cr:open-in-new' : 'cr:arrow-right';
  }
  computeButtonAriaDescription_(external, buttonAriaDescription) {
    return buttonAriaDescription ?? (external ? loadTimeData.getString('opensInNewTab') : '');
  }
}
customElements.define(CrLinkRowElement.is, CrLinkRowElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ const template$1 = html`
  /* Most common used flex styles*/
  <dom-module id="iron-flex">
    <template>
      <style>
        .layout.horizontal,
        .layout.vertical {
          display: flex;
        }

        .layout.inline {
          display: inline-flex;
        }

        .layout.horizontal {
          flex-direction: row;
        }

        .layout.vertical {
          flex-direction: column;
        }

        .layout.wrap {
          flex-wrap: wrap;
        }

        .layout.no-wrap {
          flex-wrap: nowrap;
        }

        .layout.center,
        .layout.center-center {
          align-items: center;
        }

        .layout.center-justified,
        .layout.center-center {
          justify-content: center;
        }

        .flex {
          flex: 1;
          flex-basis: 0.000000001px;
        }

        .flex-auto {
          flex: 1 1 auto;
        }

        .flex-none {
          flex: none;
        }
      </style>
    </template>
  </dom-module>
  /* Basic flexbox reverse styles */
  <dom-module id="iron-flex-reverse">
    <template>
      <style>
        .layout.horizontal-reverse,
        .layout.vertical-reverse {
          display: flex;
        }

        .layout.horizontal-reverse {
          flex-direction: row-reverse;
        }

        .layout.vertical-reverse {
          flex-direction: column-reverse;
        }

        .layout.wrap-reverse {
          flex-wrap: wrap-reverse;
        }
      </style>
    </template>
  </dom-module>
  /* Flexbox alignment */
  <dom-module id="iron-flex-alignment">
    <template>
      <style>
        /**
       * Alignment in cross axis.
       */
        .layout.start {
          align-items: flex-start;
        }

        .layout.center,
        .layout.center-center {
          align-items: center;
        }

        .layout.end {
          align-items: flex-end;
        }

        .layout.baseline {
          align-items: baseline;
        }

        /**
       * Alignment in main axis.
       */
        .layout.start-justified {
          justify-content: flex-start;
        }

        .layout.center-justified,
        .layout.center-center {
          justify-content: center;
        }

        .layout.end-justified {
          justify-content: flex-end;
        }

        .layout.around-justified {
          justify-content: space-around;
        }

        .layout.justified {
          justify-content: space-between;
        }

        /**
       * Self alignment.
       */
        .self-start {
          align-self: flex-start;
        }

        .self-center {
          align-self: center;
        }

        .self-end {
          align-self: flex-end;
        }

        .self-stretch {
          align-self: stretch;
        }

        .self-baseline {
          align-self: baseline;
        }

        /**
       * multi-line alignment in main axis.
       */
        .layout.start-aligned {
          align-content: flex-start;
        }

        .layout.end-aligned {
          align-content: flex-end;
        }

        .layout.center-aligned {
          align-content: center;
        }

        .layout.between-aligned {
          align-content: space-between;
        }

        .layout.around-aligned {
          align-content: space-around;
        }
      </style>
    </template>
  </dom-module>
  /* Non-flexbox positioning helper styles */
  <dom-module id="iron-flex-factors">
    <template>
      <style>
        .flex,
        .flex-1 {
          flex: 1;
          flex-basis: 0.000000001px;
        }

        .flex-2 {
          flex: 2;
        }

        .flex-3 {
          flex: 3;
        }

        .flex-4 {
          flex: 4;
        }

        .flex-5 {
          flex: 5;
        }

        .flex-6 {
          flex: 6;
        }

        .flex-7 {
          flex: 7;
        }

        .flex-8 {
          flex: 8;
        }

        .flex-9 {
          flex: 9;
        }

        .flex-10 {
          flex: 10;
        }

        .flex-11 {
          flex: 11;
        }

        .flex-12 {
          flex: 12;
        }
      </style>
    </template>
  </dom-module>
  <dom-module id="iron-positioning">
    <template>
      <style>
        .block {
          display: block;
        }

        [hidden] {
          display: none !important;
        }

        .invisible {
          visibility: hidden !important;
        }

        .relative {
          position: relative;
        }

        .fit {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        body.fullbleed {
          margin: 0;
          height: 100vh;
        }

        .scroll {
          -webkit-overflow-scrolling: touch;
          overflow: auto;
        }

        /* fixed position */
        .fixed-bottom,
        .fixed-left,
        .fixed-right,
        .fixed-top {
          position: fixed;
        }

        .fixed-top {
          top: 0;
          left: 0;
          right: 0;
        }

        .fixed-right {
          top: 0;
          right: 0;
          bottom: 0;
        }

        .fixed-bottom {
          right: 0;
          bottom: 0;
          left: 0;
        }

        .fixed-left {
          top: 0;
          bottom: 0;
          left: 0;
        }
      </style>
    </template>
  </dom-module>
`;
template$1.setAttribute('style', 'display: none;');
document.head.appendChild(template$1.content);
// Copyright 2016 The Chromium Authors
let pageVisibility;
if (loadTimeData.getBoolean('isGuest')) {
  pageVisibility = {
    a11y: false,
    advancedSettings: false,
    appearance: false,
    autofill: false,
    defaultBrowser: false,
    downloads: false,
    extensions: false,
    getMostChrome: false,
    languages: false,
    onStartup: false,
    people: false,
    performance: false,
    privacy: false,
    reset: false,
    safetyCheck: false,
    safetyHub: false,
    system: false,
  };
}
function setPageVisibilityForTesting(testVisibility) {
  pageVisibility = testVisibility;
}
// Copyright 2019 The Chromium Authors
class Route {
  constructor(path, title) {
    this.parent = null;
    this.depth = 0;
    this.isNavigableDialog = false;
    this.section = '';
    this.path = path;
    this.title = title;
  }
  createChild(path, title) {
    assert(path);
    const newUrl = path[0] === '/' ? path : `${this.path}/${path}`;
    const route = new Route(newUrl, title);
    route.parent = this;
    route.section = this.section;
    route.depth = this.depth + 1;
    return route;
  }
  createSection(path, section, title) {
    const route = this.createChild(path, title);
    route.section = section;
    return route;
  }
  getAbsolutePath() {
    return window.location.origin + this.path;
  }
  contains(route) {
    for (let r = route; r != null; r = r.parent) {
      if (this === r) {
        return true;
      }
    }
    return false;
  }
  isSubpage() {
    return !this.isNavigableDialog && !!this.parent && !!this.section && this.parent.section === this.section;
  }
}
const CANONICAL_PATH_REGEX = /(^\/)([\/-\w]+)(\/$)/;
let routerInstance = null;
class Router {
  static getInstance() {
    assert(routerInstance);
    return routerInstance;
  }
  static setInstance(instance) {
    assert(!routerInstance);
    routerInstance = instance;
  }
  static resetInstanceForTesting(instance) {
    if (routerInstance) {
      instance.routeObservers_ = routerInstance.routeObservers_;
    }
    routerInstance = instance;
  }
  constructor(availableRoutes) {
    this.currentQueryParameters_ = new URLSearchParams();
    this.wasLastRouteChangePopstate_ = false;
    this.initializeRouteFromUrlCalled_ = false;
    this.routeObservers_ = new Set();
    this.routes_ = availableRoutes;
    this.currentRoute = this.routes_.BASIC;
  }
  addObserver(observer) {
    assert(!this.routeObservers_.has(observer));
    this.routeObservers_.add(observer);
  }
  removeObserver(observer) {
    assert(this.routeObservers_.delete(observer));
  }
  getRoute(routeName) {
    return this.routeDictionary_()[routeName];
  }
  getRoutes() {
    return this.routes_;
  }
  setCurrentRoute(route, queryParameters, isPopstate) {
    this.recordMetrics(route.path);
    const oldRoute = this.currentRoute;
    this.currentRoute = route;
    this.currentQueryParameters_ = queryParameters;
    this.wasLastRouteChangePopstate_ = isPopstate;
    new Set(this.routeObservers_).forEach((observer) => {
      observer.currentRouteChanged(this.currentRoute, oldRoute);
    });
    this.updateTitle_();
  }
  updateTitle_() {
    if (this.currentRoute.title) {
      document.title = loadTimeData.getStringF('settingsAltPageTitle', this.currentRoute.title);
    } else if (this.currentRoute.isNavigableDialog && this.currentRoute.parent && this.currentRoute.parent.title) {
      document.title = loadTimeData.getStringF('settingsAltPageTitle', this.currentRoute.parent.title);
    } else if (!this.currentRoute.isSubpage() && !this.routes_.ABOUT.contains(this.currentRoute)) {
      document.title = loadTimeData.getString('settings');
    }
  }
  getCurrentRoute() {
    return this.currentRoute;
  }
  getQueryParameters() {
    return new URLSearchParams(this.currentQueryParameters_);
  }
  lastRouteChangeWasPopstate() {
    return this.wasLastRouteChangePopstate_;
  }
  routeDictionary_() {
    return this.routes_;
  }
  getRouteForPath(path) {
    const canonicalPath = path.replace(CANONICAL_PATH_REGEX, '$1$2');
    const matchingKey = Object.keys(this.routes_).find((key) => this.routeDictionary_()[key].path === canonicalPath);
    return matchingKey ? this.routeDictionary_()[matchingKey] : null;
  }
  updateRouteParams(params) {
    let url = this.currentRoute.path;
    const queryString = params.toString();
    if (queryString) {
      url += '?' + queryString;
    }
    window.history.replaceState(window.history.state, '', url);
    this.currentQueryParameters_ = params;
    new Set(this.routeObservers_).forEach((observer) => {
      observer.currentRouteChanged(this.currentRoute, this.currentRoute);
    });
  }
  navigateTo(route, dynamicParameters, removeSearch = false) {
    if (route === this.routes_.ADVANCED) {
      route = this.routes_.BASIC;
    }
    const params = dynamicParameters || new URLSearchParams();
    const oldSearchParam = this.getQueryParameters().get('search') || '';
    const newSearchParam = params.get('search') || '';
    if (!removeSearch && oldSearchParam && !newSearchParam) {
      params.append('search', oldSearchParam);
    }
    let url = route.path;
    const queryString = params.toString();
    if (queryString) {
      url += '?' + queryString;
    }
    window.history.pushState(this.currentRoute.path, '', url);
    this.setCurrentRoute(route, params, false);
  }
  navigateToPreviousRoute() {
    let previousRoute = null;
    if (window.history.state) {
      previousRoute = this.getRouteForPath(window.history.state);
      assert(previousRoute);
    }
    if (previousRoute && previousRoute.depth <= this.currentRoute.depth) {
      window.history.back();
    } else {
      this.navigateTo(this.currentRoute.parent || this.routes_.BASIC);
    }
  }
  initializeRouteFromUrl() {
    assert(!this.initializeRouteFromUrlCalled_);
    this.initializeRouteFromUrlCalled_ = true;
    const route = this.getRouteForPath(window.location.pathname);
    this.recordMetrics(route ? route.path : this.routes_.BASIC.path);
    if (route && route !== this.routes_.ADVANCED) {
      this.currentRoute = route;
      this.currentQueryParameters_ = new URLSearchParams(window.location.search);
    } else {
      window.history.replaceState(undefined, '', this.routes_.BASIC.path);
    }
    this.updateTitle_();
  }
  recordMetrics(urlPath) {
    assert(!urlPath.startsWith('chrome://'));
    assert(!urlPath.startsWith('settings'));
    assert(urlPath.startsWith('/'));
    assert(!urlPath.match(/\?/g));
    const metricName = 'WebUI.Settings.PathVisited';
    chrome.metricsPrivate.recordSparseValueWithPersistentHash(metricName, urlPath);
  }
  resetRouteForTesting() {
    this.initializeRouteFromUrlCalled_ = false;
    this.wasLastRouteChangePopstate_ = false;
    this.currentRoute = this.routes_.BASIC;
    this.currentQueryParameters_ = new URLSearchParams();
  }
}
const RouteObserverMixin = dedupingMixin((superClass) => {
  class RouteObserverMixin extends superClass {
    connectedCallback() {
      super.connectedCallback();
      assert(routerInstance);
      routerInstance.addObserver(this);
      this.currentRouteChanged(routerInstance.currentRoute, undefined);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      assert(routerInstance);
      routerInstance.removeObserver(this);
    }
    currentRouteChanged(_newRoute, _oldRoute) {
      assertNotReached();
    }
  }
  return RouteObserverMixin;
});
// Copyright 2016 The Chromium Authors
function addPrivacyChildRoutes(r) {
  assert(r.PRIVACY);
  r.CLEAR_BROWSER_DATA = r.PRIVACY.createChild('/clearBrowserData');
  r.CLEAR_BROWSER_DATA.isNavigableDialog = true;
  r.SAFETY_CHECK = r.PRIVACY.createSection('/safetyCheck', 'safetyCheck');
  if (loadTimeData.getBoolean('enableSafetyHub')) {
    r.SAFETY_HUB = r.PRIVACY.createChild('/safetyHub');
  }
  if (loadTimeData.getBoolean('showPrivacyGuide')) {
    r.PRIVACY_GUIDE = r.PRIVACY.createChild('guide');
  }
  r.SITE_SETTINGS = r.PRIVACY.createChild('/content');
  r.COOKIES = r.PRIVACY.createChild('/cookies');
  r.SECURITY = r.PRIVACY.createChild('/security');
  if (loadTimeData.getBoolean('isPrivacySandboxSettings4') && !loadTimeData.getBoolean('isPrivacySandboxRestricted')) {
    r.PRIVACY_SANDBOX = r.PRIVACY.createChild('/adPrivacy');
    r.PRIVACY_SANDBOX_TOPICS = r.PRIVACY_SANDBOX.createChild('/adPrivacy/interests');
    r.PRIVACY_SANDBOX_FLEDGE = r.PRIVACY_SANDBOX.createChild('/adPrivacy/sites');
    r.PRIVACY_SANDBOX_AD_MEASUREMENT = r.PRIVACY_SANDBOX.createChild('/adPrivacy/measurement');
  } else if (loadTimeData.getBoolean('isPrivacySandboxRestrictedNoticeEnabled')) {
    r.PRIVACY_SANDBOX = r.PRIVACY.createChild('/adPrivacy');
    r.PRIVACY_SANDBOX_AD_MEASUREMENT = r.PRIVACY_SANDBOX.createChild('/adPrivacy/measurement');
  }
  if (loadTimeData.getBoolean('enableSecurityKeysSubpage')) {
    r.SECURITY_KEYS = r.SECURITY.createChild('/securityKeys');
    r.SECURITY_KEYS_PHONES = r.SECURITY_KEYS.createChild('/securityKeys/phones');
  } else {
    r.SECURITY_KEYS_PHONES = r.SECURITY.createChild('/securityKeys/phones');
  }
  if (loadTimeData.getBoolean('showPreloadingSubPage')) {
    r.PRELOADING = r.COOKIES.createChild('/preloading');
  }
  r.SITE_SETTINGS_ALL = r.SITE_SETTINGS.createChild('all');
  r.SITE_SETTINGS_SITE_DETAILS = r.SITE_SETTINGS_ALL.createChild('/content/siteDetails');
  r.SITE_SETTINGS_HANDLERS = r.SITE_SETTINGS.createChild('/handlers');
  r.SITE_SETTINGS_ADS = r.SITE_SETTINGS.createChild('ads');
  r.SITE_SETTINGS_AR = r.SITE_SETTINGS.createChild('ar');
  r.SITE_SETTINGS_AUTOMATIC_DOWNLOADS = r.SITE_SETTINGS.createChild('automaticDownloads');
  if (loadTimeData.getBoolean('privateStateTokensEnabled')) {
    r.SITE_SETTINGS_AUTO_VERIFY = r.SITE_SETTINGS.createChild('autoVerify');
  }
  r.SITE_SETTINGS_BACKGROUND_SYNC = r.SITE_SETTINGS.createChild('backgroundSync');
  r.SITE_SETTINGS_CAMERA = r.SITE_SETTINGS.createChild('camera');
  r.SITE_SETTINGS_CLIPBOARD = r.SITE_SETTINGS.createChild('clipboard');
  r.SITE_SETTINGS_IDLE_DETECTION = r.SITE_SETTINGS.createChild('idleDetection');
  r.SITE_SETTINGS_IMAGES = r.SITE_SETTINGS.createChild('images');
  r.SITE_SETTINGS_MIXEDSCRIPT = r.SITE_SETTINGS.createChild('insecureContent');
  r.SITE_SETTINGS_JAVASCRIPT = r.SITE_SETTINGS.createChild('javascript');
  r.SITE_SETTINGS_SOUND = r.SITE_SETTINGS.createChild('sound');
  r.SITE_SETTINGS_SENSORS = r.SITE_SETTINGS.createChild('sensors');
  r.SITE_SETTINGS_LOCATION = r.SITE_SETTINGS.createChild('location');
  r.SITE_SETTINGS_MICROPHONE = r.SITE_SETTINGS.createChild('microphone');
  r.SITE_SETTINGS_NOTIFICATIONS = r.SITE_SETTINGS.createChild('notifications');
  r.SITE_SETTINGS_POPUPS = r.SITE_SETTINGS.createChild('popups');
  r.SITE_SETTINGS_MIDI_DEVICES = r.SITE_SETTINGS.createChild('midiDevices');
  r.SITE_SETTINGS_USB_DEVICES = r.SITE_SETTINGS.createChild('usbDevices');
  r.SITE_SETTINGS_HID_DEVICES = r.SITE_SETTINGS.createChild('hidDevices');
  r.SITE_SETTINGS_SERIAL_PORTS = r.SITE_SETTINGS.createChild('serialPorts');
  if (loadTimeData.getBoolean('enableWebBluetoothNewPermissionsBackend')) {
    r.SITE_SETTINGS_BLUETOOTH_DEVICES = r.SITE_SETTINGS.createChild('bluetoothDevices');
  }
  r.SITE_SETTINGS_ZOOM_LEVELS = r.SITE_SETTINGS.createChild('zoomLevels');
  r.SITE_SETTINGS_PDF_DOCUMENTS = r.SITE_SETTINGS.createChild('pdfDocuments');
  r.SITE_SETTINGS_PROTECTED_CONTENT = r.SITE_SETTINGS.createChild('protectedContent');
  if (loadTimeData.getBoolean('enablePaymentHandlerContentSetting')) {
    r.SITE_SETTINGS_PAYMENT_HANDLER = r.SITE_SETTINGS.createChild('paymentHandler');
  }
  if (loadTimeData.getBoolean('enableFederatedIdentityApiContentSetting')) {
    r.SITE_SETTINGS_FEDERATED_IDENTITY_API = r.SITE_SETTINGS.createChild('federatedIdentityApi');
  }
  if (loadTimeData.getBoolean('isPrivacySandboxSettings4')) {
    r.SITE_SETTINGS_SITE_DATA = r.SITE_SETTINGS.createChild('siteData');
  }
  r.SITE_SETTINGS_VR = r.SITE_SETTINGS.createChild('vr');
  if (loadTimeData.getBoolean('enableExperimentalWebPlatformFeatures')) {
    r.SITE_SETTINGS_BLUETOOTH_SCANNING = r.SITE_SETTINGS.createChild('bluetoothScanning');
  }
  r.SITE_SETTINGS_WINDOW_MANAGEMENT = r.SITE_SETTINGS.createChild('windowManagement');
  r.SITE_SETTINGS_FILE_SYSTEM_WRITE = r.SITE_SETTINGS.createChild('filesystem');
  r.SITE_SETTINGS_LOCAL_FONTS = r.SITE_SETTINGS.createChild('localFonts');
  if (loadTimeData.getBoolean('enablePermissionStorageAccessApi')) {
    r.SITE_SETTINGS_STORAGE_ACCESS = r.SITE_SETTINGS.createChild('storageAccess');
  }
}
function createBrowserSettingsRoutes() {
  const r = {};
  r.BASIC = new Route('/');
  r.ABOUT = new Route('/help', loadTimeData.getString('aboutPageTitle'));
  r.SEARCH = r.BASIC.createSection('/search', 'search', loadTimeData.getString('searchPageTitle'));
  if (!loadTimeData.getBoolean('isGuest')) {
    r.PEOPLE = r.BASIC.createSection('/people', 'people', loadTimeData.getString('peoplePageTitle'));
    r.SIGN_OUT = r.PEOPLE.createChild('/signOut');
    r.SIGN_OUT.isNavigableDialog = true;
    r.IMPORT_DATA = r.PEOPLE.createChild('/importData');
    r.IMPORT_DATA.isNavigableDialog = true;
    r.SYNC = r.PEOPLE.createChild('/syncSetup');
    r.SYNC_ADVANCED = r.SYNC.createChild('/syncSetup/advanced');
  }
  const visibility = pageVisibility || {};
  if (visibility.people !== false) {
    assert(r.PEOPLE);
    r.MANAGE_PROFILE = r.PEOPLE.createChild('/manageProfile');
  }
  if (visibility.appearance !== false) {
    r.APPEARANCE = r.BASIC.createSection('/appearance', 'appearance', loadTimeData.getString('appearancePageTitle'));
    r.FONTS = r.APPEARANCE.createChild('/fonts');
  }
  if (visibility.autofill !== false) {
    r.AUTOFILL = r.BASIC.createSection('/autofill', 'autofill', loadTimeData.getString('autofillPageTitle'));
    r.PAYMENTS = r.AUTOFILL.createChild('/payments');
    r.ADDRESSES = r.AUTOFILL.createChild('/addresses');
    r.PASSKEYS = r.AUTOFILL.createChild('/passkeys');
  }
  if (visibility.privacy !== false) {
    r.PRIVACY = r.BASIC.createSection('/privacy', 'privacy', loadTimeData.getString('privacyPageTitle'));
    addPrivacyChildRoutes(r);
  }
  if (visibility.defaultBrowser !== false) {
    r.DEFAULT_BROWSER = r.BASIC.createSection(
      '/defaultBrowser',
      'defaultBrowser',
      loadTimeData.getString('defaultBrowser')
    );
  }
  r.SEARCH_ENGINES = r.SEARCH.createChild('/searchEngines');
  if (visibility.onStartup !== false) {
    r.ON_STARTUP = r.BASIC.createSection('/onStartup', 'onStartup', loadTimeData.getString('onStartup'));
  }
  if (visibility.advancedSettings !== false) {
    r.ADVANCED = new Route('/advanced');
    r.LANGUAGES = r.ADVANCED.createSection('/languages', 'languages', loadTimeData.getString('languagesPageTitle'));
    r.SPELL_CHECK = r.LANGUAGES.createSection('/spellCheck', 'spellCheck');
    r.EDIT_DICTIONARY = r.SPELL_CHECK.createChild('/editDictionary');
    if (visibility.downloads !== false) {
      r.DOWNLOADS = r.ADVANCED.createSection('/downloads', 'downloads', loadTimeData.getString('downloadsPageTitle'));
    }
    r.ACCESSIBILITY = r.ADVANCED.createSection('/accessibility', 'a11y', loadTimeData.getString('a11yPageTitle'));
    if (!loadTimeData.getBoolean('isWindows10OrNewer')) {
      r.CAPTIONS = r.ACCESSIBILITY.createChild('/captions');
    }
    r.SYSTEM = r.ADVANCED.createSection('/system', 'system', loadTimeData.getString('systemPageTitle'));
    if (visibility.reset !== false) {
      r.RESET = r.ADVANCED.createSection('/reset', 'reset', loadTimeData.getString('resetPageTitle'));
      r.RESET_DIALOG = r.RESET.createChild('/resetProfileSettings');
      r.RESET_DIALOG.isNavigableDialog = true;
      r.TRIGGERED_RESET_DIALOG = r.RESET.createChild('/triggeredResetProfileSettings');
      r.TRIGGERED_RESET_DIALOG.isNavigableDialog = true;
      r.CHROME_CLEANUP = r.RESET.createChild('/cleanup');
      if (loadTimeData.getBoolean('showIncompatibleApplications')) {
        r.INCOMPATIBLE_APPLICATIONS = r.RESET.createChild('/incompatibleApplications');
      }
    }
    if (visibility.performance !== false) {
      r.PERFORMANCE = r.BASIC.createSection(
        '/performance',
        'performance',
        loadTimeData.getString('performancePageTitle')
      );
    }
    if (visibility.getMostChrome !== false && loadTimeData.getBoolean('showGetTheMostOutOfChromeSection')) {
      r.GET_MOST_CHROME = r.ADVANCED.createSection(
        '/getMostChrome',
        'getMostChrome',
        loadTimeData.getString('getTheMostOutOfChrome')
      );
    }
  }
  return r;
}
function buildRouter() {
  return new Router(createBrowserSettingsRoutes());
}
Router.setInstance(buildRouter());
window.addEventListener('popstate', function () {
  const routerInstance = Router.getInstance();
  routerInstance.setCurrentRoute(
    routerInstance.getRouteForPath(window.location.pathname) || routerInstance.getRoutes().BASIC,
    new URLSearchParams(window.location.search),
    true
  );
});
const routes = Router.getInstance().getRoutes();
function getTemplate$H() {
  return html`<!--_html_template_start_--><style>
      iron-icon {
        --iron-icon-height: var(--cr-icon-size);
        --iron-icon-width: var(--cr-icon-size);
        padding-inline-end: 10px;
      }
      cr-dialog::part(body-container) {
        padding-inline-start: 35px;
      }
    </style>

    <cr-dialog id="dialog" close-text="[[i18n('close')]]" show-on-attach>
      <div slot="title">
        <iron-icon icon="cr:domain" role="img" aria-label="[[i18n('controlledSettingPolicy')]]"> </iron-icon>
        [[title]]
      </div>
      <div slot="body">[[body]]</div>
      <div slot="button-container">
        <cr-button class="action-button" on-click="onOkClick_"> [[i18n('ok')]] </cr-button>
      </div>
    </cr-dialog>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
const ManagedDialogElementBase = I18nMixin(PolymerElement);
class ManagedDialogElement extends ManagedDialogElementBase {
  static get is() {
    return 'managed-dialog';
  }
  static get template() {
    return getTemplate$H();
  }
  static get properties() {
    return { title: String, body: String };
  }
  onOkClick_() {
    this.$.dialog.close();
  }
}
customElements.define(ManagedDialogElement.is, ManagedDialogElement);
const styleMod$4 = document.createElement('dom-module');
styleMod$4.appendChild(
  html`
    <template>
      <style>
        .md-select {
          --md-arrow-width: 10px;
          --md-select-bg-color: var(--google-grey-100);
          --md-select-focus-shadow-color: rgba(var(--google-blue-600-rgb), 0.4);
          --md-select-option-bg-color: white;
          --md-select-side-padding: 8px;
          --md-select-text-color: var(--cr-primary-text-color);
          -webkit-appearance: none;
          background: url(chrome://resources/images/arrow_down.svg) calc(100% - var(--md-select-side-padding)) center
            no-repeat;
          background-color: var(--md-select-bg-color);
          background-size: var(--md-arrow-width);
          border: none;
          border-radius: 4px;
          color: var(--md-select-text-color);
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          max-width: 100%;
          outline: 0;
          padding-bottom: 6px;
          padding-inline-end: calc(var(--md-select-side-padding) + var(--md-arrow-width) + 3px);
          padding-inline-start: var(--md-select-side-padding);
          padding-top: 6px;
          width: var(--md-select-width, 200px);
        }
        @media (prefers-color-scheme: dark) {
          .md-select {
            --md-select-bg-color: rgba(0, 0, 0, 0.3);
            --md-select-focus-shadow-color: rgba(var(--google-blue-300-rgb), 0.5);
            --md-select-option-bg-color: var(--google-grey-900-white-4-percent);
            background-image: url(chrome://resources/images/dark/arrow_down.svg);
          }
        }
        .md-select :-webkit-any(option, optgroup) {
          background-color: var(--md-select-option-bg-color);
        }
        .md-select[disabled] {
          opacity: var(--cr-disabled-opacity);
          pointer-events: none;
        }
        .md-select:focus {
          box-shadow: 0 0 0 2px var(--md-select-focus-shadow-color);
        }
        @media (forced-colors: active) {
          .md-select:focus {
            outline: var(--cr-focus-outline-hcm);
          }
        }
        .md-select:active {
          box-shadow: none;
        }
        :host-context([dir='rtl']) .md-select {
          background-position-x: var(--md-select-side-padding);
        }
      </style>
    </template>
  `.content
);
styleMod$4.register('md-select');
const styleMod$3 = document.createElement('dom-module');
styleMod$3.appendChild(
  html`
    <template>
      <style>
        :host {
          --cr-radio-button-checked-color: var(--google-blue-600);
          --cr-radio-button-checked-ripple-color: rgba(var(--google-blue-600-rgb), 0.2);
          --cr-radio-button-ink-size: 40px;
          --cr-radio-button-size: 16px;
          --cr-radio-button-unchecked-color: var(--google-grey-700);
          --cr-radio-button-unchecked-ripple-color: rgba(var(--google-grey-600-rgb), 0.15);
          --ink-to-circle: calc((var(--cr-radio-button-ink-size) - var(--cr-radio-button-size)) / 2);
          align-items: center;
          display: flex;
          flex-shrink: 0;
          gap: var(--cr-radio-button-label-spacing, 20px);
          outline: 0;
        }
        @media (prefers-color-scheme: dark) {
          :host {
            --cr-radio-button-checked-color: var(--google-blue-300);
            --cr-radio-button-checked-ripple-color: rgba(var(--google-blue-300-rgb), 0.4);
            --cr-radio-button-unchecked-color: var(--google-grey-500);
            --cr-radio-button-unchecked-ripple-color: rgba(var(--google-grey-300-rgb), 0.4);
          }
        }
        :host-context([chrome-refresh-2023]):host {
          --cr-radio-button-ink-size: 32px;
          --cr-radio-button-checked-color: var(
            --color-radio-button-foreground-checked,
            var(--cr-fallback-color-primary)
          );
          --cr-radio-button-checked-ripple-color: var(--cr-active-background-color);
          --cr-radio-button-unchecked-color: var(
            --color-radio-button-foreground-unchecked,
            var(--cr-fallback-color-outline)
          );
          --cr-radio-button-unchecked-ripple-color: var(--cr-active-background-color);
        }
        @media (forced-colors: active) {
          :host {
            --cr-radio-button-checked-color: SelectedItem;
          }
        }
        :host([disabled]) {
          opacity: var(--cr-disabled-opacity);
          pointer-events: none;
        }
        :host-context([chrome-refresh-2023]):host([disabled]) {
          opacity: 1;
          --cr-radio-button-checked-color: var(
            --color-radio-foreground-disabled,
            var(--cr-fallback-color-disabled-background)
          );
          --cr-radio-button-unchecked-color: var(
            --color-radio-foreground-disabled,
            var(--cr-fallback-color-disabled-background)
          );
        }
        :host(:not([disabled])) {
          cursor: pointer;
        }
        :host(.label-first) {
          flex-direction: row-reverse;
        }
        #labelWrapper {
          flex: 1;
        }
        :host-context([chrome-refresh-2023]):host([disabled]) #labelWrapper {
          opacity: var(--cr-disabled-opacity);
        }
        #label {
          color: inherit;
        }
        :host([hide-label-text]) #label {
          clip: rect(0, 0, 0, 0);
          display: block;
          position: fixed;
        }
        .disc,
        .disc-border,
        .disc-wrapper,
        paper-ripple {
          border-radius: 50%;
        }
        .disc-wrapper {
          height: var(--cr-radio-button-size);
          margin-block-start: var(--cr-radio-button-disc-margin-block-start, 0);
          position: relative;
          width: var(--cr-radio-button-size);
        }
        .disc,
        .disc-border {
          box-sizing: border-box;
          height: var(--cr-radio-button-size);
          width: var(--cr-radio-button-size);
        }
        .disc-border {
          border: 2px solid var(--cr-radio-button-unchecked-color);
        }
        :host([checked]) .disc-border {
          border-color: var(--cr-radio-button-checked-color);
        }
        #button:focus {
          outline: 0;
        }
        .disc {
          background-color: transparent;
          position: absolute;
          top: 0;
          transform: scale(0);
          transition: border-color 0.2s, transform 0.2s;
        }
        :host([checked]) .disc {
          background-color: var(--cr-radio-button-checked-color);
          transform: scale(0.5);
        }
        :host-context([chrome-refresh-2023]) #overlay {
          border-radius: 50%;
          box-sizing: border-box;
          display: none;
          height: var(--cr-radio-button-ink-size);
          left: 50%;
          pointer-events: none;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: var(--cr-radio-button-ink-size);
        }
        :host-context([chrome-refresh-2023]) #button:hover #overlay {
          background-color: var(--cr-hover-background-color);
          display: block;
        }
        :host-context([chrome-refresh-2023]) #button:focus-visible #overlay {
          border: 2px solid var(--cr-focus-outline-color);
          display: block;
        }
        paper-ripple {
          --paper-ripple-opacity: 1;
          color: var(--cr-radio-button-unchecked-ripple-color);
          height: var(--cr-radio-button-ink-size);
          left: calc(-1 * var(--ink-to-circle));
          pointer-events: none;
          position: absolute;
          top: calc(-1 * var(--ink-to-circle));
          transition: color linear 80ms;
          width: var(--cr-radio-button-ink-size);
        }
        :host-context([dir='rtl']) paper-ripple {
          left: auto;
          right: calc(-1 * var(--ink-to-circle));
        }
        :host([checked]) paper-ripple {
          color: var(--cr-radio-button-checked-ripple-color);
        }
      </style>
    </template>
  `.content
);
styleMod$3.register('cr-radio-button-style');
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        position: absolute;
        outline: none;
        z-index: 1002;
        user-select: none;
        cursor: default;
      }

      #tooltip {
        display: block;
        outline: none;
        font-size: 10px;
        line-height: 1;
        background-color: var(--paper-tooltip-background, #616161);
        color: var(--paper-tooltip-text-color, white);
        padding: 8px;
        border-radius: 2px;
      }

      @keyframes keyFrameScaleUp {
        0% {
          transform: scale(0);
        }
        100% {
          transform: scale(1);
        }
      }

      @keyframes keyFrameScaleDown {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(0);
        }
      }

      @keyframes keyFrameFadeInOpacity {
        0% {
          opacity: 0;
        }
        100% {
          opacity: var(--paper-tooltip-opacity, 0.9);
        }
      }

      @keyframes keyFrameFadeOutOpacity {
        0% {
          opacity: var(--paper-tooltip-opacity, 0.9);
        }
        100% {
          opacity: 0;
        }
      }

      @keyframes keyFrameSlideDownIn {
        0% {
          transform: translateY(-2000px);
          opacity: 0;
        }
        10% {
          opacity: 0.2;
        }
        100% {
          transform: translateY(0);
          opacity: var(--paper-tooltip-opacity, 0.9);
        }
      }

      @keyframes keyFrameSlideDownOut {
        0% {
          transform: translateY(0);
          opacity: var(--paper-tooltip-opacity, 0.9);
        }
        10% {
          opacity: 0.2;
        }
        100% {
          transform: translateY(-2000px);
          opacity: 0;
        }
      }

      .fade-in-animation {
        opacity: 0;
        animation-delay: var(--paper-tooltip-delay-in, 500ms);
        animation-name: keyFrameFadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-in, 500ms);
        animation-fill-mode: forwards;
      }

      .fade-out-animation {
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-out, 0ms);
        animation-name: keyFrameFadeOutOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
      }

      .scale-up-animation {
        transform: scale(0);
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-in, 500ms);
        animation-name: keyFrameScaleUp;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-in, 500ms);
        animation-fill-mode: forwards;
      }

      .scale-down-animation {
        transform: scale(1);
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-out, 500ms);
        animation-name: keyFrameScaleDown;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
      }

      .slide-down-animation {
        transform: translateY(-2000px);
        opacity: 0;
        animation-delay: var(--paper-tooltip-delay-out, 500ms);
        animation-name: keyFrameSlideDownIn;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
      }

      .slide-down-animation-out {
        transform: translateY(0);
        opacity: var(--paper-tooltip-opacity, 0.9);
        animation-delay: var(--paper-tooltip-delay-out, 500ms);
        animation-name: keyFrameSlideDownOut;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
        animation-duration: var(--paper-tooltip-duration-out, 500ms);
        animation-fill-mode: forwards;
      }

      .cancel-animation {
        animation-delay: -30s !important;
      }

      /* Thanks IE 10. */

      .hidden {
        display: none !important;
      }
    </style>

    <div id="tooltip" class="hidden" part="tooltip">
      <slot></slot>
    </div>
  `,
  is: 'paper-tooltip',
  hostAttributes: { role: 'tooltip', tabindex: -1 },
  properties: {
    for: { type: String, observer: '_findTarget' },
    manualMode: { type: Boolean, value: false, observer: '_manualModeChanged' },
    position: { type: String, value: 'bottom' },
    fitToVisibleBounds: { type: Boolean, value: false },
    offset: { type: Number, value: 14 },
    marginTop: { type: Number, value: 14 },
    animationDelay: { type: Number, value: 500, observer: '_delayChange' },
    animationEntry: { type: String, value: '' },
    animationExit: { type: String, value: '' },
    animationConfig: {
      type: Object,
      value: function () {
        return {
          entry: [{ name: 'fade-in-animation', node: this, timing: { delay: 0 } }],
          exit: [{ name: 'fade-out-animation', node: this }],
        };
      },
    },
    _showing: { type: Boolean, value: false },
  },
  listeners: { webkitAnimationEnd: '_onAnimationEnd' },
  get target() {
    if (this._manualTarget) return this._manualTarget;
    var parentNode = dom(this).parentNode;
    var ownerRoot = dom(this).getOwnerRoot();
    var target;
    if (this.for) {
      target = dom(ownerRoot).querySelector('#' + this.for);
    } else {
      target = parentNode.nodeType == Node.DOCUMENT_FRAGMENT_NODE ? ownerRoot.host : parentNode;
    }
    return target;
  },
  set target(target) {
    this._manualTarget = target;
    this._findTarget();
  },
  attached: function () {
    this._findTarget();
  },
  detached: function () {
    if (!this.manualMode) this._removeListeners();
  },
  playAnimation: function (type) {
    if (type === 'entry') {
      this.show();
    } else if (type === 'exit') {
      this.hide();
    }
  },
  cancelAnimation: function () {
    this.$.tooltip.classList.add('cancel-animation');
  },
  show: function () {
    if (this._showing) return;
    if (dom(this).textContent.trim() === '') {
      var allChildrenEmpty = true;
      var effectiveChildren = dom(this).getEffectiveChildNodes();
      for (var i = 0; i < effectiveChildren.length; i++) {
        if (effectiveChildren[i].textContent.trim() !== '') {
          allChildrenEmpty = false;
          break;
        }
      }
      if (allChildrenEmpty) {
        return;
      }
    }
    this._showing = true;
    this.$.tooltip.classList.remove('hidden');
    this.$.tooltip.classList.remove('cancel-animation');
    this.$.tooltip.classList.remove(this._getAnimationType('exit'));
    this.updatePosition();
    this._animationPlaying = true;
    this.$.tooltip.classList.add(this._getAnimationType('entry'));
  },
  hide: function () {
    if (!this._showing) {
      return;
    }
    if (this._animationPlaying) {
      this._showing = false;
      this._cancelAnimation();
      return;
    } else {
      this._onAnimationFinish();
    }
    this._showing = false;
    this._animationPlaying = true;
  },
  updatePosition: function () {
    if (!this._target) return;
    var offsetParent = this._composedOffsetParent();
    if (!offsetParent) return;
    var offset = this.offset;
    if (this.marginTop != 14 && this.offset == 14) offset = this.marginTop;
    var parentRect = offsetParent.getBoundingClientRect();
    var targetRect = this._target.getBoundingClientRect();
    var thisRect = this.getBoundingClientRect();
    var horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
    var verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
    var targetLeft = targetRect.left - parentRect.left;
    var targetTop = targetRect.top - parentRect.top;
    var tooltipLeft, tooltipTop;
    switch (this.position) {
      case 'top':
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop - thisRect.height - offset;
        break;
      case 'bottom':
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop + targetRect.height + offset;
        break;
      case 'left':
        tooltipLeft = targetLeft - thisRect.width - offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
      case 'right':
        tooltipLeft = targetLeft + targetRect.width + offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
    }
    if (this.fitToVisibleBounds) {
      if (parentRect.left + tooltipLeft + thisRect.width > window.innerWidth) {
        this.style.right = '0px';
        this.style.left = 'auto';
      } else {
        this.style.left = Math.max(0, tooltipLeft) + 'px';
        this.style.right = 'auto';
      }
      if (parentRect.top + tooltipTop + thisRect.height > window.innerHeight) {
        this.style.bottom = parentRect.height - targetTop + offset + 'px';
        this.style.top = 'auto';
      } else {
        this.style.top = Math.max(-parentRect.top, tooltipTop) + 'px';
        this.style.bottom = 'auto';
      }
    } else {
      this.style.left = tooltipLeft + 'px';
      this.style.top = tooltipTop + 'px';
    }
  },
  _addListeners: function () {
    if (this._target) {
      this.listen(this._target, 'mouseenter', 'show');
      this.listen(this._target, 'focus', 'show');
      this.listen(this._target, 'mouseleave', 'hide');
      this.listen(this._target, 'blur', 'hide');
      this.listen(this._target, 'tap', 'hide');
    }
    this.listen(this.$.tooltip, 'animationend', '_onAnimationEnd');
    this.listen(this, 'mouseenter', 'hide');
  },
  _findTarget: function () {
    if (!this.manualMode) this._removeListeners();
    this._target = this.target;
    if (!this.manualMode) this._addListeners();
  },
  _delayChange: function (newValue) {
    if (newValue !== 500) {
      this.updateStyles({ '--paper-tooltip-delay-in': newValue + 'ms' });
    }
  },
  _manualModeChanged: function () {
    if (this.manualMode) this._removeListeners();
    else this._addListeners();
  },
  _cancelAnimation: function () {
    this.$.tooltip.classList.remove(this._getAnimationType('entry'));
    this.$.tooltip.classList.remove(this._getAnimationType('exit'));
    this.$.tooltip.classList.remove('cancel-animation');
    this.$.tooltip.classList.add('hidden');
  },
  _onAnimationFinish: function () {
    if (this._showing) {
      this.$.tooltip.classList.remove(this._getAnimationType('entry'));
      this.$.tooltip.classList.remove('cancel-animation');
      this.$.tooltip.classList.add(this._getAnimationType('exit'));
    }
  },
  _onAnimationEnd: function () {
    this._animationPlaying = false;
    if (!this._showing) {
      this.$.tooltip.classList.remove(this._getAnimationType('exit'));
      this.$.tooltip.classList.add('hidden');
    }
  },
  _getAnimationType: function (type) {
    if (type === 'entry' && this.animationEntry !== '') {
      return this.animationEntry;
    }
    if (type === 'exit' && this.animationExit !== '') {
      return this.animationExit;
    }
    if (this.animationConfig[type] && typeof this.animationConfig[type][0].name === 'string') {
      if (
        this.animationConfig[type][0].timing &&
        this.animationConfig[type][0].timing.delay &&
        this.animationConfig[type][0].timing.delay !== 0
      ) {
        var timingDelay = this.animationConfig[type][0].timing.delay;
        if (type === 'entry') {
          this.updateStyles({ '--paper-tooltip-delay-in': timingDelay + 'ms' });
        } else if (type === 'exit') {
          this.updateStyles({ '--paper-tooltip-delay-out': timingDelay + 'ms' });
        }
      }
      return this.animationConfig[type][0].name;
    }
  },
  _removeListeners: function () {
    if (this._target) {
      this.unlisten(this._target, 'mouseenter', 'show');
      this.unlisten(this._target, 'focus', 'show');
      this.unlisten(this._target, 'mouseleave', 'hide');
      this.unlisten(this._target, 'blur', 'hide');
      this.unlisten(this._target, 'tap', 'hide');
    }
    this.unlisten(this.$.tooltip, 'animationend', '_onAnimationEnd');
    this.unlisten(this, 'mouseenter', 'hide');
  },
  _composedOffsetParent: function () {
    for (let ancestor = this; ancestor; ancestor = flatTreeParent(ancestor)) {
      if (!(ancestor instanceof Element)) continue;
      if (getComputedStyle(ancestor).display === 'none') return null;
    }
    for (let ancestor = flatTreeParent(this); ancestor; ancestor = flatTreeParent(ancestor)) {
      if (!(ancestor instanceof Element)) continue;
      const style = getComputedStyle(ancestor);
      if (style.display === 'contents') {
        continue;
      }
      if (style.position !== 'static') {
        return ancestor;
      }
      if (ancestor.tagName === 'BODY') return ancestor;
    }
    return null;
    function flatTreeParent(element) {
      if (element.assignedSlot) {
        return element.assignedSlot;
      }
      if (element.parentNode instanceof ShadowRoot) {
        return element.parentNode.host;
      }
      return element.parentNode;
    }
  },
});
function getTemplate$G() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style">
      :host {
        display: flex;
      }
      iron-icon {
        --iron-icon-width: var(--cr-icon-size);
        --iron-icon-height: var(--cr-icon-size);
        --iron-icon-fill-color: var(--cr-tooltip-icon-fill-color, var(--google-grey-700));
      }
      @media (prefers-color-scheme: dark) {
        iron-icon {
          --iron-icon-fill-color: var(--cr-tooltip-icon-fill-color, var(--google-grey-500));
        }
      }
    </style>
    <iron-icon
      id="indicator"
      tabindex="0"
      aria-label$="[[iconAriaLabel]]"
      aria-describedby="tooltip"
      icon="[[iconClass]]"
      role="img"
    ></iron-icon>
    <paper-tooltip id="tooltip" for="indicator" position="[[tooltipPosition]]" fit-to-visible-bounds part="tooltip">
      <slot name="tooltip-text">[[tooltipText]]</slot>
    </paper-tooltip>
    <!--_html_template_end_-->`;
}
// Copyright 2017 The Chromium Authors
class CrTooltipIconElement extends PolymerElement {
  static get is() {
    return 'cr-tooltip-icon';
  }
  static get template() {
    return getTemplate$G();
  }
  static get properties() {
    return {
      iconAriaLabel: String,
      iconClass: String,
      tooltipText: String,
      tooltipPosition: { type: String, value: 'top' },
    };
  }
  getFocusableElement() {
    return this.$.indicator;
  }
}
customElements.define(CrTooltipIconElement.is, CrTooltipIconElement);
// Copyright 2022 The Chromium Authors
var CrPolicyIndicatorType;
(function (CrPolicyIndicatorType) {
  CrPolicyIndicatorType['DEVICE_POLICY'] = 'devicePolicy';
  CrPolicyIndicatorType['EXTENSION'] = 'extension';
  CrPolicyIndicatorType['NONE'] = 'none';
  CrPolicyIndicatorType['OWNER'] = 'owner';
  CrPolicyIndicatorType['PRIMARY_USER'] = 'primary_user';
  CrPolicyIndicatorType['RECOMMENDED'] = 'recommended';
  CrPolicyIndicatorType['USER_POLICY'] = 'userPolicy';
  CrPolicyIndicatorType['PARENT'] = 'parent';
  CrPolicyIndicatorType['CHILD_RESTRICTION'] = 'childRestriction';
})(CrPolicyIndicatorType || (CrPolicyIndicatorType = {}));
const CrPolicyIndicatorMixin = dedupingMixin((superClass) => {
  class CrPolicyIndicatorMixin extends superClass {
    static get properties() {
      return {
        indicatorType: { type: String, value: CrPolicyIndicatorType.NONE },
        indicatorSourceName: { type: String, value: '' },
        indicatorVisible: { type: Boolean, computed: 'getIndicatorVisible_(indicatorType)' },
        indicatorIcon: { type: String, computed: 'getIndicatorIcon_(indicatorType)' },
      };
    }
    getIndicatorVisible_(type) {
      return type !== CrPolicyIndicatorType.NONE;
    }
    getIndicatorIcon_(type) {
      switch (type) {
        case CrPolicyIndicatorType.EXTENSION:
          return 'cr:extension';
        case CrPolicyIndicatorType.NONE:
          return '';
        case CrPolicyIndicatorType.PRIMARY_USER:
          return 'cr:group';
        case CrPolicyIndicatorType.OWNER:
          return 'cr:person';
        case CrPolicyIndicatorType.USER_POLICY:
        case CrPolicyIndicatorType.DEVICE_POLICY:
        case CrPolicyIndicatorType.RECOMMENDED:
          return 'cr20:domain';
        case CrPolicyIndicatorType.PARENT:
        case CrPolicyIndicatorType.CHILD_RESTRICTION:
          return 'cr20:kite';
        default:
          assertNotReached();
      }
    }
    getIndicatorTooltip(type, name, matches) {
      if (!window.CrPolicyStrings) {
        return '';
      }
      const CrPolicyStrings = window.CrPolicyStrings;
      switch (type) {
        case CrPolicyIndicatorType.EXTENSION:
          return name.length > 0
            ? CrPolicyStrings.controlledSettingExtension.replace('$1', name)
            : CrPolicyStrings.controlledSettingExtensionWithoutName;
        case CrPolicyIndicatorType.USER_POLICY:
        case CrPolicyIndicatorType.DEVICE_POLICY:
          return CrPolicyStrings.controlledSettingPolicy;
        case CrPolicyIndicatorType.RECOMMENDED:
          return matches
            ? CrPolicyStrings.controlledSettingRecommendedMatches
            : CrPolicyStrings.controlledSettingRecommendedDiffers;
        case CrPolicyIndicatorType.PARENT:
          return CrPolicyStrings.controlledSettingParent;
        case CrPolicyIndicatorType.CHILD_RESTRICTION:
          return CrPolicyStrings.controlledSettingChildRestriction;
      }
      return '';
    }
  }
  return CrPolicyIndicatorMixin;
});
function getTemplate$F() {
  return html`<!--_html_template_start_-->
    <style include="cr-hidden-style"></style>
    <cr-tooltip-icon
      id="tooltipIcon"
      hidden$="[[!indicatorVisible]]"
      tooltip-text="[[indicatorTooltip]]"
      icon-class="[[indicatorIcon]]"
      icon-aria-label="[[iconAriaLabel]]"
      exportparts="tooltip"
    >
    </cr-tooltip-icon>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const CrPolicyPrefIndicatorElementBase = CrPolicyIndicatorMixin(PolymerElement);
class CrPolicyPrefIndicatorElement extends CrPolicyPrefIndicatorElementBase {
  static get is() {
    return 'cr-policy-pref-indicator';
  }
  static get template() {
    return getTemplate$F();
  }
  static get properties() {
    return {
      iconAriaLabel: String,
      indicatorType: {
        type: String,
        value: CrPolicyIndicatorType.NONE,
        computed: 'getIndicatorTypeForPref_(pref.*, associatedValue)',
      },
      indicatorTooltip: { type: String, computed: 'getIndicatorTooltipForPref_(indicatorType, pref.*)' },
      pref: Object,
      associatedValue: Object,
    };
  }
  getIndicatorTypeForPref_() {
    assert(this.pref);
    const {
      enforcement: enforcement,
      userSelectableValues: userSelectableValues,
      controlledBy: controlledBy,
      recommendedValue: recommendedValue,
    } = this.pref;
    if (enforcement === chrome.settingsPrivate.Enforcement.RECOMMENDED) {
      if (this.associatedValue !== undefined && this.associatedValue !== recommendedValue) {
        return CrPolicyIndicatorType.NONE;
      }
      return CrPolicyIndicatorType.RECOMMENDED;
    }
    if (enforcement === chrome.settingsPrivate.Enforcement.ENFORCED) {
      if (userSelectableValues !== undefined) {
        if (recommendedValue && this.associatedValue === recommendedValue) {
          return CrPolicyIndicatorType.RECOMMENDED;
        } else if (userSelectableValues.includes(this.associatedValue)) {
          return CrPolicyIndicatorType.NONE;
        }
      }
      switch (controlledBy) {
        case chrome.settingsPrivate.ControlledBy.EXTENSION:
          return CrPolicyIndicatorType.EXTENSION;
        case chrome.settingsPrivate.ControlledBy.PRIMARY_USER:
          return CrPolicyIndicatorType.PRIMARY_USER;
        case chrome.settingsPrivate.ControlledBy.OWNER:
          return CrPolicyIndicatorType.OWNER;
        case chrome.settingsPrivate.ControlledBy.USER_POLICY:
          return CrPolicyIndicatorType.USER_POLICY;
        case chrome.settingsPrivate.ControlledBy.DEVICE_POLICY:
          return CrPolicyIndicatorType.DEVICE_POLICY;
        case chrome.settingsPrivate.ControlledBy.PARENT:
          return CrPolicyIndicatorType.PARENT;
        case chrome.settingsPrivate.ControlledBy.CHILD_RESTRICTION:
          return CrPolicyIndicatorType.CHILD_RESTRICTION;
      }
    }
    if (enforcement === chrome.settingsPrivate.Enforcement.PARENT_SUPERVISED) {
      return CrPolicyIndicatorType.PARENT;
    }
    return CrPolicyIndicatorType.NONE;
  }
  getIndicatorTooltipForPref_() {
    if (!this.pref) {
      return '';
    }
    const matches = this.pref && this.pref.value === this.pref.recommendedValue;
    return this.getIndicatorTooltip(this.indicatorType, this.pref.controlledByName || '', matches);
  }
  getFocusableElement() {
    return this.$.tooltipIcon.getFocusableElement();
  }
}
customElements.define(CrPolicyPrefIndicatorElement.is, CrPolicyPrefIndicatorElement);
// Copyright 2018 The Chromium Authors
const CrRadioButtonMixin = dedupingMixin((superClass) => {
  class CrRadioButtonMixin extends superClass {
    static get properties() {
      return {
        checked: { type: Boolean, value: false, reflectToAttribute: true },
        disabled: { type: Boolean, value: false, reflectToAttribute: true, notify: true },
        focusable: { type: Boolean, value: false, observer: 'onFocusableChanged_' },
        hideLabelText: { type: Boolean, value: false, reflectToAttribute: true },
        label: { type: String, value: '' },
        name: { type: String, notify: true, reflectToAttribute: true },
        buttonTabIndex_: { type: Number, computed: 'getTabIndex_(focusable)' },
      };
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener('blur', this.hideRipple_.bind(this));
      if (!document.documentElement.hasAttribute('chrome-refresh-2023')) {
        this.addEventListener('focus', this.onFocus_.bind(this));
      }
      this.addEventListener('up', this.hideRipple_.bind(this));
    }
    focus() {
      const button = this.shadowRoot.querySelector('#button');
      assert(button);
      button.focus();
    }
    getPaperRipple() {
      assertNotReached();
    }
    onFocus_() {
      this.getPaperRipple().showAndHoldDown();
    }
    hideRipple_() {
      this.getPaperRipple().clear();
    }
    onFocusableChanged_() {
      const links = this.querySelectorAll('a');
      links.forEach((link) => {
        link.tabIndex = this.checked ? 0 : -1;
      });
    }
    getAriaChecked_() {
      return this.checked ? 'true' : 'false';
    }
    getAriaDisabled_() {
      return this.disabled ? 'true' : 'false';
    }
    getTabIndex_() {
      return this.focusable ? 0 : -1;
    }
    onInputKeydown_(e) {
      if (e.shiftKey && e.key === 'Tab') {
        this.focus();
      }
    }
  }
  return CrRadioButtonMixin;
});
// Copyright 2015 The Chromium Authors
function stringToPrefValue(value, pref) {
  switch (pref.type) {
    case chrome.settingsPrivate.PrefType.BOOLEAN:
      return value === 'true';
    case chrome.settingsPrivate.PrefType.NUMBER:
      const n = parseFloat(value);
      if (isNaN(n)) {
        console.error('Argument to stringToPrefValue for number pref ' + 'was unparsable: ' + value);
        return undefined;
      }
      return n;
    case chrome.settingsPrivate.PrefType.STRING:
    case chrome.settingsPrivate.PrefType.URL:
      return value;
    default:
      assertNotReached('No conversion from string to ' + pref.type + ' pref');
  }
}
function prefToString(pref) {
  switch (pref.type) {
    case chrome.settingsPrivate.PrefType.BOOLEAN:
    case chrome.settingsPrivate.PrefType.NUMBER:
      return pref.value.toString();
    case chrome.settingsPrivate.PrefType.STRING:
    case chrome.settingsPrivate.PrefType.URL:
      return pref.value;
    default:
      assertNotReached('No conversion from ' + pref.type + ' pref to string');
  }
}
function getTemplate$E() {
  return html`<!--_html_template_start_--><style include="cr-radio-button-style">
      :host([disabled]) {
        opacity: 1;
      }
      :host([disabled]) #labelWrapper,
      :host([disabled]) .disc-wrapper {
        opacity: var(--cr-disabled-opacity);
      }
      cr-policy-pref-indicator {
        margin-inline-start: var(--cr-controlled-by-spacing);
        pointer-events: all;
      }
    </style>

    <div
      aria-checked$="[[getAriaChecked_(checked)]]"
      aria-describedby="slotted-content"
      aria-disabled$="[[getAriaDisabled_(disabled)]]"
      aria-labelledby="label"
      class="disc-wrapper"
      id="button"
      role="radio"
      tabindex$="[[buttonTabIndex_]]"
      on-keydown="onInputKeydown_"
    >
      <div class="disc-border"></div>
      <div class="disc"></div>
    </div>

    <div id="labelWrapper" part="labelWrapper">
      <span id="label" hidden$="[[!label]]">[[label]]</span>
      <span id="slotted-content">
        <slot></slot>
      </span>
    </div>

    <template is="dom-if" if="[[showIndicator_(disabled, name, pref.*)]]">
      <cr-policy-pref-indicator pref="[[pref]]" on-click="onIndicatorClick_" icon-aria-label="[[label]]">
      </cr-policy-pref-indicator>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
const PrefControlMixin = dedupingMixin((superClass) => {
  class PrefControlMixin extends superClass {
    static get properties() {
      return { pref: { type: Object, notify: true, observer: 'validatePref_' } };
    }
    connectedCallback() {
      super.connectedCallback();
      this.validatePref_();
    }
    validatePref_() {
      CrSettingsPrefs.initialized.then(() => {
        if (this.pref === undefined) {
          console.error(this.getErrorInfo('not found'));
        } else if (typeof this.pref === 'string') {
          console.error(this.getErrorInfo('incorrect type string'));
        } else if (this.pref.enforcement === chrome.settingsPrivate.Enforcement.PARENT_SUPERVISED) {
          console.error('PARENT_SUPERVISED is not enforced by pref controls');
        }
      });
    }
    getErrorInfo(message) {
      let error = `Pref error [${message}] for element ${this.tagName}`;
      if (this.id) {
        error += `#${this.id}`;
      }
      error += ` in ${this.getRootNode().host.tagName}`;
      return error;
    }
  }
  return PrefControlMixin;
});
// Copyright 2016 The Chromium Authors
const ControlledRadioButtonElementBase = mixinBehaviors(
  [PaperRippleBehavior],
  CrRadioButtonMixin(PrefControlMixin(PolymerElement))
);
class ControlledRadioButtonElement extends ControlledRadioButtonElementBase {
  static get is() {
    return 'controlled-radio-button';
  }
  static get template() {
    return getTemplate$E();
  }
  static get observers() {
    return ['updateDisabled_(pref.enforcement)'];
  }
  getPaperRipple() {
    return this.getRipple();
  }
  _createRipple() {
    this._rippleContainer = this.shadowRoot.querySelector('.disc-wrapper');
    const ripple = super._createRipple();
    ripple.id = 'ink';
    ripple.setAttribute('recenters', '');
    ripple.classList.add('circle', 'toggle-ink');
    return ripple;
  }
  updateDisabled_() {
    this.disabled = this.pref.enforcement === chrome.settingsPrivate.Enforcement.ENFORCED;
  }
  showIndicator_() {
    if (!this.disabled) {
      return false;
    }
    assert(this.pref);
    return this.name === prefToString(this.pref);
  }
  onIndicatorClick_(e) {
    e.preventDefault();
    e.stopPropagation();
  }
}
customElements.define(ControlledRadioButtonElement.is, ControlledRadioButtonElement);
// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class OpenWindowProxyImpl {
  openUrl(url) {
    window.open(url);
  }
  static getInstance() {
    return instance$f || (instance$f = new OpenWindowProxyImpl());
  }
  static setInstance(obj) {
    instance$f = obj;
  }
}
let instance$f = null;
// Copyright 2016 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class ExtensionControlBrowserProxyImpl {
  disableExtension(extensionId) {
    chrome.send('disableExtension', [extensionId]);
  }
  manageExtension(extensionId) {
    window.open('chrome://extensions?id=' + extensionId);
  }
  static getInstance() {
    return instance$e || (instance$e = new ExtensionControlBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$e = obj;
  }
}
let instance$e = null;
function getTemplate$D() {
  return html`<!--_html_template_start_--><style>
      :host {
        align-items: center;
        display: flex;
        margin-inline-start: 36px;
        min-height: var(--cr-section-min-height);
      }
      img {
        margin-inline-end: 16px;
      }
      iron-icon[icon='cr:open-in-new'] {
        fill: var(--text-color);
        height: var(--cr-icon-size);
        width: var(--cr-icon-size);
      }
      #disable {
        margin-inline-start: 8px;
      }
      :host > span {
        flex: 1;
        margin-inline-end: 8px;
      }
    </style>
    <img role="presentation" src="chrome://extension-icon/[[extensionId]]/20/1" />
    <span>[[getLabel_(extensionName)]]</span>
    <cr-button id="manage" on-click="onManageClick_">
      绠＄悊
      <iron-icon icon="cr:open-in-new" slot="suffix-icon"></iron-icon>
    </cr-button>
    <template is="dom-if" if="[[extensionCanBeDisabled]]" restamp>
      <cr-button id="disable" on-click="onDisableClick_">鍋滅敤</cr-button>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
class ExtensionControlledIndicatorElement extends PolymerElement {
  static get is() {
    return 'extension-controlled-indicator';
  }
  static get template() {
    return getTemplate$D();
  }
  static get properties() {
    return { extensionCanBeDisabled: Boolean, extensionId: String, extensionName: String };
  }
  getLabel_() {
    return loadTimeData.getStringF('controlledByExtension', this.extensionName);
  }
  onManageClick_() {
    const manageUrl = 'chrome://extensions/?id=' + this.extensionId;
    OpenWindowProxyImpl.getInstance().openUrl(manageUrl);
  }
  onDisableClick_() {
    assert(this.extensionCanBeDisabled);
    ExtensionControlBrowserProxyImpl.getInstance().disableExtension(this.extensionId);
    this.dispatchEvent(new CustomEvent('extension-disable', { bubbles: true, composed: true }));
  }
}
customElements.define(ExtensionControlledIndicatorElement.is, ExtensionControlledIndicatorElement);
function getTemplate$C() {
  return html`<!--_html_template_start_-->
    <style include="cr-radio-button-style cr-hidden-style"></style>

    <div
      aria-checked$="[[getAriaChecked_(checked)]]"
      aria-describedby="slotted-content"
      aria-disabled$="[[getAriaDisabled_(disabled)]]"
      aria-labelledby="label"
      class="disc-wrapper"
      id="button"
      role="radio"
      tabindex$="[[buttonTabIndex_]]"
      on-keydown="onInputKeydown_"
    >
      <div class="disc-border"></div>
      <div class="disc"></div>
      <div id="overlay"></div>
    </div>

    <div id="labelWrapper">
      <span id="label" hidden$="[[!label]]" aria-hidden="true">[[label]]</span>
      <span id="slotted-content">
        <slot></slot>
      </span>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2018 The Chromium Authors
const CrRadioButtonElementBase = mixinBehaviors([PaperRippleBehavior], CrRadioButtonMixin(PolymerElement));
class CrRadioButtonElement extends CrRadioButtonElementBase {
  static get is() {
    return 'cr-radio-button';
  }
  static get template() {
    return getTemplate$C();
  }
  getPaperRipple() {
    return this.getRipple();
  }
  _createRipple() {
    this._rippleContainer = this.shadowRoot.querySelector('.disc-wrapper');
    const ripple = super._createRipple();
    ripple.id = 'ink';
    ripple.setAttribute('recenters', '');
    ripple.classList.add('circle', 'toggle-ink');
    return ripple;
  }
}
customElements.define(CrRadioButtonElement.is, CrRadioButtonElement);
// Copyright 2011 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class EventTracker {
  constructor() {
    this.listeners_ = [];
  }
  add(target, eventType, listener, capture = false) {
    const h = { target: target, eventType: eventType, listener: listener, capture: capture };
    this.listeners_.push(h);
    target.addEventListener(eventType, listener, capture);
  }
  remove(target, eventType) {
    this.listeners_ = this.listeners_.filter((listener) => {
      if (listener.target === target && (!eventType || listener.eventType === eventType)) {
        EventTracker.removeEventListener(listener);
        return false;
      }
      return true;
    });
  }
  removeAll() {
    this.listeners_.forEach((listener) => EventTracker.removeEventListener(listener));
    this.listeners_ = [];
  }
  static removeEventListener(entry) {
    entry.target.removeEventListener(entry.eventType, entry.listener, entry.capture);
  }
}
function getTemplate$B() {
  return html`<!--_html_template_start_-->
    <style>
      :host {
        display: inline-block;
      }
      :host ::slotted(*) {
        padding: var(--cr-radio-group-item-padding, 12px);
      }
      :host([disabled]) {
        cursor: initial;
        pointer-events: none;
        user-select: none;
      }
      :host([disabled]) ::slotted(*) {
        opacity: var(--cr-disabled-opacity);
      }
    </style>
    <slot></slot>
    <!--_html_template_end_-->`;
}
// Copyright 2018 The Chromium Authors
function isEnabled(radio) {
  return (
    radio.matches(':not([disabled]):not([hidden])') &&
    radio.style.display !== 'none' &&
    radio.style.visibility !== 'hidden'
  );
}
class CrRadioGroupElement extends PolymerElement {
  constructor() {
    super(...arguments);
    this.buttons_ = null;
    this.buttonEventTracker_ = new EventTracker();
    this.deltaKeyMap_ = null;
    this.isRtl_ = false;
    this.populateBound_ = null;
  }
  static get is() {
    return 'cr-radio-group';
  }
  static get template() {
    return getTemplate$B();
  }
  static get properties() {
    return {
      disabled: { type: Boolean, value: false, reflectToAttribute: true, observer: 'update_' },
      selected: { type: String, notify: true, observer: 'update_' },
      selectableElements: { type: String, value: 'cr-radio-button, cr-card-radio-button, controlled-radio-button' },
      nestedSelectable: { type: Boolean, value: false, observer: 'populate_' },
      selectableRegExp_: { value: Object, computed: 'computeSelectableRegExp_(selectableElements)' },
    };
  }
  ready() {
    super.ready();
    this.addEventListener('keydown', (e) => this.onKeyDown_(e));
    this.addEventListener('click', this.onClick_.bind(this));
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'radiogroup');
    }
    this.setAttribute('aria-disabled', 'false');
  }
  connectedCallback() {
    super.connectedCallback();
    this.isRtl_ = this.matches(':host-context([dir=rtl]) cr-radio-group');
    this.deltaKeyMap_ = new Map([
      ['ArrowDown', 1],
      ['ArrowLeft', this.isRtl_ ? 1 : -1],
      ['ArrowRight', this.isRtl_ ? -1 : 1],
      ['ArrowUp', -1],
      ['PageDown', 1],
      ['PageUp', -1],
    ]);
    this.populateBound_ = () => this.populate_();
    assert(this.populateBound_);
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.populateBound_);
    this.populate_();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    assert(this.populateBound_);
    this.shadowRoot.querySelector('slot').removeEventListener('slotchange', this.populateBound_);
    this.buttonEventTracker_.removeAll();
  }
  focus() {
    if (this.disabled || !this.buttons_) {
      return;
    }
    const radio = this.buttons_.find((radio) => this.isButtonEnabledAndSelected_(radio));
    if (radio) {
      radio.focus();
    }
  }
  onKeyDown_(event) {
    if (this.disabled) {
      return;
    }
    if (event.ctrlKey || event.shiftKey || event.metaKey || event.altKey) {
      return;
    }
    const targetElement = event.target;
    if (!this.buttons_ || !this.buttons_.includes(targetElement)) {
      return;
    }
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.select_(targetElement);
      return;
    }
    const enabledRadios = this.buttons_.filter(isEnabled);
    if (enabledRadios.length === 0) {
      return;
    }
    assert(this.deltaKeyMap_);
    let selectedIndex;
    const max = enabledRadios.length - 1;
    if (event.key === 'Home') {
      selectedIndex = 0;
    } else if (event.key === 'End') {
      selectedIndex = max;
    } else if (this.deltaKeyMap_.has(event.key)) {
      const delta = this.deltaKeyMap_.get(event.key);
      const lastSelection = enabledRadios.findIndex((radio) => radio.checked);
      selectedIndex = Math.max(0, lastSelection) + delta;
      if (selectedIndex > max) {
        selectedIndex = 0;
      } else if (selectedIndex < 0) {
        selectedIndex = max;
      }
    } else {
      return;
    }
    const radio = enabledRadios[selectedIndex];
    const name = `${radio.name}`;
    if (this.selected !== name) {
      event.preventDefault();
      this.selected = name;
      radio.focus();
    }
  }
  computeSelectableRegExp_() {
    const tags = this.selectableElements.split(', ').join('|');
    return new RegExp(`^(${tags})$`, 'i');
  }
  onClick_(event) {
    const path = event.composedPath();
    if (path.some((target) => /^a$/i.test(target.tagName))) {
      return;
    }
    const target = path.find((n) => this.selectableRegExp_.test(n.tagName));
    if (target && this.buttons_ && this.buttons_.includes(target)) {
      this.select_(target);
    }
  }
  populate_() {
    const nodes = this.shadowRoot.querySelector('slot').assignedNodes({ flatten: true });
    this.buttons_ = Array.from(nodes).flatMap((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return [];
      }
      const el = node;
      let result = [];
      if (el.matches(this.selectableElements)) {
        result.push(el);
      }
      if (this.nestedSelectable) {
        result = result.concat(Array.from(el.querySelectorAll(this.selectableElements)));
      }
      return result;
    });
    this.buttonEventTracker_.removeAll();
    this.buttons_.forEach((el) => {
      this.buttonEventTracker_.add(el, 'disabled-changed', () => this.populate_());
      this.buttonEventTracker_.add(el, 'name-changed', () => this.populate_());
    });
    this.update_();
  }
  select_(button) {
    if (!isEnabled(button)) {
      return;
    }
    const name = `${button.name}`;
    if (this.selected !== name) {
      this.selected = name;
    }
  }
  isButtonEnabledAndSelected_(button) {
    return !this.disabled && button.checked && isEnabled(button);
  }
  update_() {
    if (!this.buttons_) {
      return;
    }
    let noneMadeFocusable = true;
    this.buttons_.forEach((radio) => {
      radio.checked = this.selected !== undefined && `${radio.name}` === `${this.selected}`;
      const disabled = this.disabled || !isEnabled(radio);
      const canBeFocused = radio.checked && !disabled;
      if (canBeFocused) {
        radio.focusable = true;
        noneMadeFocusable = false;
      } else {
        radio.focusable = false;
      }
      radio.setAttribute('aria-disabled', `${disabled}`);
    });
    this.setAttribute('aria-disabled', `${this.disabled}`);
    if (noneMadeFocusable && !this.disabled) {
      const radio = this.buttons_.find(isEnabled);
      if (radio) {
        radio.focusable = true;
      }
    }
  }
}
customElements.define(CrRadioGroupElement.is, CrRadioGroupElement);
function getTemplate$A() {
  return html`<!--_html_template_start_--><style>
      cr-radio-group {
        width: 100%;
      }
    </style>
    <cr-radio-group
      selected="[[selected]]"
      on-selected-changed="onSelectedChanged_"
      aria-label$="[[groupAriaLabel]]"
      selectable-elements="[[selectableElements]]"
    >
      <slot></slot>
    </cr-radio-group>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SettingsRadioGroupElementBase = PrefControlMixin(PolymerElement);
class SettingsRadioGroupElement extends SettingsRadioGroupElementBase {
  static get is() {
    return 'settings-radio-group';
  }
  static get template() {
    return getTemplate$A();
  }
  static get properties() {
    return {
      groupAriaLabel: String,
      noSetPref: { type: Boolean, value: false },
      selected: String,
      selectableElements: { type: String, value: ['cr-radio-button', 'controlled-radio-button'].join(', ') },
    };
  }
  static get observers() {
    return ['resetToPrefValue(pref.*)'];
  }
  ready() {
    super.ready();
    this.setAttribute('role', 'none');
  }
  focus() {
    this.shadowRoot.querySelector('cr-radio-group').focus();
  }
  resetToPrefValue() {
    this.selected = prefToString(this.pref);
  }
  sendPrefChange() {
    if (!this.pref) {
      return;
    }
    this.set('pref.value', stringToPrefValue(this.selected, this.pref));
  }
  onSelectedChanged_() {
    this.selected = this.shadowRoot.querySelector('cr-radio-group').selected;
    if (!this.noSetPref) {
      this.sendPrefChange();
    }
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }));
  }
}
customElements.define(SettingsRadioGroupElement.is, SettingsRadioGroupElement);
const styleMod$2 = document.createElement('dom-module');
styleMod$2.appendChild(
  html`
    <template>
      <style>
        [is='action-link'] {
          cursor: pointer;
          display: inline-block;
          text-decoration: underline;
        }
        [is='action-link'],
        [is='action-link']:active,
        [is='action-link']:hover,
        [is='action-link']:visited {
          color: var(--cr-link-color);
        }
        [is='action-link'][disabled] {
          color: var(--paper-grey-600);
          cursor: default;
          opacity: 0.65;
          pointer-events: none;
        }
        [is='action-link'].no-outline {
          outline: 0;
        }
      </style>
    </template>
  `.content
);
styleMod$2.register('action-link');
function getTemplate$z() {
  return html`<!--_html_template_start_-->
    <style>
      :host {
        --cr-toggle-checked-bar-color: var(--google-blue-600);
        --cr-toggle-checked-button-color: var(--google-blue-600);
        --cr-toggle-checked-ripple-color: rgba(var(--google-blue-600-rgb), 0.2);
        --cr-toggle-ripple-diameter: 40px;
        --cr-toggle-unchecked-bar-color: var(--google-grey-400);
        --cr-toggle-unchecked-button-color: white;
        --cr-toggle-unchecked-ripple-color: rgba(var(--google-grey-600-rgb), 0.15);
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        display: block;
        min-width: 34px;
        outline: 0;
        position: relative;
        width: 34px;
      }
      :host-context([chrome-refresh-2023]):host {
        --cr-toggle-checked-bar-color: var(--color-toggle-button-track-on, var(--cr-fallback-color-primary));
        --cr-toggle-checked-button-color: var(--color-toggle-button-thumb-on, var(--cr-fallback-color-on-primary));
        --cr-toggle-unchecked-bar-color: var(--color-toggle-button-track-off, var(--cr-fallback-color-surface-variant));
        --cr-toggle-unchecked-button-color: var(--color-toggle-button-thumb-off, var(--cr-fallback-color-outline));
        --cr-toggle-checked-ripple-color: var(--cr-active-background-color);
        --cr-toggle-unchecked-ripple-color: var(--cr-active-background-color);
        --cr-toggle-ripple-diameter: 20px;
        height: fit-content;
        isolation: isolate;
        min-width: initial;
        width: fit-content;
      }
      @media (forced-colors: active) {
        :host {
          forced-color-adjust: none;
        }
      }
      @media (prefers-color-scheme: dark) {
        :host {
          --cr-toggle-checked-bar-color: var(--google-blue-300);
          --cr-toggle-checked-button-color: var(--google-blue-300);
          --cr-toggle-checked-ripple-color: rgba(var(--google-blue-300-rgb), 0.4);
          --cr-toggle-unchecked-bar-color: var(--google-grey-500);
          --cr-toggle-unchecked-button-color: var(--google-grey-300);
          --cr-toggle-unchecked-ripple-color: rgba(var(--google-grey-300-rgb), 0.4);
        }
      }
      :host([dark]) {
        --cr-toggle-checked-bar-color: var(--google-blue-300);
        --cr-toggle-checked-button-color: var(--google-blue-300);
        --cr-toggle-checked-ripple-color: rgba(var(--google-blue-300-rgb), 0.4);
        --cr-toggle-unchecked-bar-color: var(--google-grey-500);
        --cr-toggle-unchecked-button-color: var(--google-grey-300);
        --cr-toggle-unchecked-ripple-color: rgba(var(--google-grey-300-rgb), 0.4);
      }
      :host([disabled]) {
        cursor: initial;
        opacity: var(--cr-disabled-opacity);
        pointer-events: none;
      }
      :host-context([chrome-refresh-2023]):host([disabled]) {
        --cr-toggle-checked-bar-color: var(
          --color-toggle-button-track-on-disabled,
          var(--cr-fallback-color-disabled-background)
        );
        --cr-toggle-checked-button-color: var(
          --color-toggle-button-thumb-on-disabled,
          var(--cr-fallback-color-surface)
        );
        --cr-toggle-unchecked-bar-color: transparent;
        --cr-toggle-unchecked-button-color: var(
          --color-toggle-button-thumb-off-disabled,
          var(--cr-fallback-color-disabled-foreground)
        );
        opacity: 1;
      }
      #bar {
        background-color: var(--cr-toggle-unchecked-bar-color);
        border-radius: 8px;
        height: 12px;
        left: 3px;
        position: absolute;
        top: 2px;
        transition: background-color linear 80ms;
        width: 28px;
        z-index: 0;
      }
      :host([checked]) #bar {
        background-color: var(--cr-toggle-checked-bar-color);
        opacity: var(--cr-toggle-checked-bar-opacity, 0.5);
      }
      :host-context([chrome-refresh-2023]) #bar {
        border: 1px solid var(--cr-toggle-unchecked-button-color);
        border-radius: 50px;
        box-sizing: border-box;
        display: block;
        height: 16px;
        opacity: 1;
        position: initial;
        width: 26px;
      }
      :host-context([chrome-refresh-2023]):host([checked]) #bar {
        border-color: var(--cr-toggle-checked-bar-color);
      }
      :host-context([chrome-refresh-2023]):host([disabled]) #bar {
        border-color: var(--cr-toggle-unchecked-button-color);
      }
      :host-context([chrome-refresh-2023]):host([disabled][checked]) #bar {
        border: none;
      }
      :host-context([chrome-refresh-2023]):host(:focus-visible) #bar {
        outline: 2px solid var(--cr-toggle-checked-bar-color);
        outline-offset: 2px;
      }
      #knob {
        background-color: var(--cr-toggle-unchecked-button-color);
        border-radius: 50%;
        box-shadow: var(--cr-toggle-box-shadow, 0 1px 3px 0 rgba(0, 0, 0, 0.4));
        display: block;
        height: 16px;
        position: relative;
        transition: transform linear 80ms, background-color linear 80ms;
        width: 16px;
        z-index: 1;
      }
      :host([checked]) #knob {
        background-color: var(--cr-toggle-checked-button-color);
        transform: translate3d(18px, 0, 0);
      }
      :host-context([dir='rtl']):host([checked]) #knob {
        transform: translate3d(-18px, 0, 0);
      }
      :host-context([chrome-refresh-2023]) #knob {
        --cr-toggle-knob-diameter_: 8px;
        --cr-toggle-knob-center-edge-distance_: 8px;
        box-shadow: none;
        height: var(--cr-toggle-knob-diameter_);
        left: var(--cr-toggle-knob-center-edge-distance_);
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: left linear 80ms, background-color linear 80ms, width linear 80ms, height linear 80ms;
        width: var(--cr-toggle-knob-diameter_);
      }
      :host-context([chrome-refresh-2023]):host(:active) #knob {
        --cr-toggle-knob-diameter_: 10px;
      }
      :host-context([chrome-refresh-2023]):host([checked]) #knob {
        --cr-toggle-knob-diameter_: 12px;
        left: calc(100% - var(--cr-toggle-knob-center-edge-distance_));
      }
      :host-context([chrome-refresh-2023]):host([checked]:active) #knob {
        --cr-toggle-knob-diameter_: 14px;
      }
      :host-context([chrome-refresh-2023]):host([checked]:active) #knob,
      :host-context([chrome-refresh-2023]):host([checked]:hover) #knob {
        --cr-toggle-checked-button-color: var(
          --color-toggle-button-thumb-on-hover-pressed,
          var(--cr-fallback-color-primary-container)
        );
      }
      :host-context([chrome-refresh-2023]):host(:hover) #knob::before {
        background-color: var(--cr-hover-background-color);
        border-radius: 50%;
        content: '';
        height: var(--cr-toggle-ripple-diameter);
        left: calc(var(--cr-toggle-knob-diameter_) / 2);
        position: absolute;
        top: calc(var(--cr-toggle-knob-diameter_) / 2);
        transform: translate(-50%, -50%);
        width: var(--cr-toggle-ripple-diameter);
      }
      paper-ripple {
        --paper-ripple-opacity: 1;
        color: var(--cr-toggle-unchecked-ripple-color);
        height: var(--cr-toggle-ripple-diameter);
        left: 50%;
        outline: var(--cr-toggle-ripple-ring, none);
        pointer-events: none;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: color linear 80ms;
        width: var(--cr-toggle-ripple-diameter);
      }
      :host([checked]) paper-ripple {
        color: var(--cr-toggle-checked-ripple-color);
      }
      :host-context([dir='rtl']) paper-ripple {
        left: auto;
        right: 50%;
        transform: translate(50%, -50%);
      }
    </style>
    <span id="bar"></span>
    <span id="knob"></span>
    <!--_html_template_end_-->`;
}
// Copyright 2017 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const MOVE_THRESHOLD_PX = 5;
const CrToggleElementBase = mixinBehaviors([PaperRippleBehavior], PolymerElement);
class CrToggleElement extends CrToggleElementBase {
  constructor() {
    super(...arguments);
    this.boundPointerMove_ = null;
    this.handledInPointerMove_ = false;
    this.pointerDownX_ = 0;
  }
  static get is() {
    return 'cr-toggle';
  }
  static get template() {
    return getTemplate$z();
  }
  static get properties() {
    return {
      checked: { type: Boolean, value: false, reflectToAttribute: true, observer: 'checkedChanged_', notify: true },
      dark: { type: Boolean, value: false, reflectToAttribute: true },
      disabled: { type: Boolean, value: false, reflectToAttribute: true, observer: 'disabledChanged_' },
    };
  }
  ready() {
    super.ready();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.setAttribute('aria-pressed', this.checked ? 'true' : 'false');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    if (!document.documentElement.hasAttribute('chrome-refresh-2023')) {
      this.addEventListener('blur', this.hideRipple_.bind(this));
      this.addEventListener('focus', this.onFocus_.bind(this));
    }
    this.addEventListener('click', this.onClick_.bind(this));
    this.addEventListener('keydown', this.onKeyDown_.bind(this));
    this.addEventListener('keyup', this.onKeyUp_.bind(this));
    this.addEventListener('pointerdown', this.onPointerDown_.bind(this));
    this.addEventListener('pointerup', this.onPointerUp_.bind(this));
  }
  connectedCallback() {
    super.connectedCallback();
    const direction = this.matches(':host-context([dir=rtl]) cr-toggle') ? -1 : 1;
    this.boundPointerMove_ = (e) => {
      e.preventDefault();
      const diff = e.clientX - this.pointerDownX_;
      if (Math.abs(diff) < MOVE_THRESHOLD_PX) {
        return;
      }
      this.handledInPointerMove_ = true;
      const shouldToggle = (diff * direction < 0 && this.checked) || (diff * direction > 0 && !this.checked);
      if (shouldToggle) {
        this.toggleState_(false);
      }
    };
  }
  checkedChanged_() {
    this.setAttribute('aria-pressed', this.checked ? 'true' : 'false');
  }
  disabledChanged_() {
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }
  onFocus_() {
    this.getRipple().showAndHoldDown();
  }
  hideRipple_() {
    this.getRipple().clear();
  }
  onPointerUp_() {
    assert(this.boundPointerMove_);
    this.removeEventListener('pointermove', this.boundPointerMove_);
    this.hideRipple_();
  }
  onPointerDown_(e) {
    if (e.button !== 0) {
      return;
    }
    this.setPointerCapture(e.pointerId);
    this.pointerDownX_ = e.clientX;
    this.handledInPointerMove_ = false;
    assert(this.boundPointerMove_);
    this.addEventListener('pointermove', this.boundPointerMove_);
  }
  onClick_(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.handledInPointerMove_) {
      return;
    }
    this.toggleState_(false);
  }
  toggleState_(fromKeyboard) {
    if (this.disabled) {
      return;
    }
    if (!fromKeyboard) {
      this.hideRipple_();
    }
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: this.checked }));
  }
  onKeyDown_(e) {
    if (e.key !== ' ' && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.repeat) {
      return;
    }
    if (e.key === 'Enter') {
      this.toggleState_(true);
    }
  }
  onKeyUp_(e) {
    if (e.key !== ' ' && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.key === ' ') {
      this.toggleState_(true);
    }
  }
  _createRipple() {
    this._rippleContainer = this.$.knob;
    const ripple = super._createRipple();
    ripple.id = 'ink';
    ripple.setAttribute('recenters', '');
    ripple.classList.add('circle', 'toggle-ink');
    return ripple;
  }
}
customElements.define(CrToggleElement.is, CrToggleElement);
// Copyright 2015 The Chromium Authors
const CrPolicyPrefMixin = dedupingMixin((superClass) => {
  class CrPolicyPrefMixin extends superClass {
    static get properties() {
      return { noExtensionIndicator: Boolean, pref: Object };
    }
    isPrefEnforced() {
      return !!this.pref && this.pref.enforcement === chrome.settingsPrivate.Enforcement.ENFORCED;
    }
    hasPrefPolicyIndicator() {
      if (!this.pref) {
        return false;
      }
      if (this.noExtensionIndicator && this.pref.controlledBy === chrome.settingsPrivate.ControlledBy.EXTENSION) {
        return false;
      }
      return this.isPrefEnforced() || this.pref.enforcement === chrome.settingsPrivate.Enforcement.RECOMMENDED;
    }
  }
  return CrPolicyPrefMixin;
});
// Copyright 2016 The Chromium Authors
const DEFAULT_UNCHECKED_VALUE = 0;
const DEFAULT_CHECKED_VALUE = 1;
const SettingsBooleanControlMixin = dedupingMixin((superClass) => {
  const superClassBase = CrPolicyPrefMixin(PrefControlMixin(superClass));
  class SettingsBooleanControlMixin extends superClassBase {
    static get properties() {
      return {
        inverted: { type: Boolean, value: false },
        checked: { type: Boolean, value: false, notify: true, reflectToAttribute: true },
        disabled: { type: Boolean, value: false, notify: true, reflectToAttribute: true },
        noSetPref: { type: Boolean, value: false },
        label: { type: String, value: '' },
        subLabel: { type: String, value: '' },
        numericUncheckedValue: { type: Number, value: DEFAULT_UNCHECKED_VALUE, reflectToAttribute: true },
        numericCheckedValue: { type: Number, value: DEFAULT_CHECKED_VALUE, reflectToAttribute: true },
      };
    }
    static get observers() {
      return ['prefValueChanged_(pref.value)'];
    }
    notifyChangedByUserInteraction() {
      this.dispatchEvent(new CustomEvent('settings-boolean-control-change', { bubbles: true, composed: true }));
      if (!this.pref || this.noSetPref) {
        return;
      }
      this.sendPrefChange();
    }
    resetToPrefValue() {
      if (this.pref === undefined) {
        this.checked = false;
        return;
      }
      this.checked = this.getNewValue_(this.pref.value);
    }
    sendPrefChange() {
      if (this.pref.type === chrome.settingsPrivate.PrefType.NUMBER) {
        assert(!this.inverted);
        this.set('pref.value', this.checked ? this.numericCheckedValue : this.numericUncheckedValue);
        return;
      }
      this.set('pref.value', this.inverted ? !this.checked : this.checked);
    }
    prefValueChanged_(prefValue) {
      this.checked = this.getNewValue_(prefValue);
    }
    getNewValue_(value) {
      if (this.pref.type === chrome.settingsPrivate.PrefType.NUMBER) {
        assert(!this.inverted);
        return value !== this.numericUncheckedValue;
      }
      return this.inverted ? !value : !!value;
    }
    controlDisabled() {
      return this.disabled || this.isPrefEnforced() || !!(this.pref && this.pref.userControlDisabled);
    }
  }
  return SettingsBooleanControlMixin;
});
function getTemplate$y() {
  return html`<!--_html_template_start_--><style
      include="cr-shared-style cr-actionable-row-style iron-flex action-link"
    >
      :host {
        --cr-icon-button-margin-end: 20px;
        padding: 0 var(--cr-section-padding);
      }
      :host([elide-label]),
      :host([elide-label]) #outerRow,
      :host([elide-label]) #outerRow > div.flex {
        min-width: 0;
      }
      :host([elide-label]) .label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      #outerRow {
        align-items: center;
        display: flex;
        min-height: var(--cr-section-two-line-min-height);
        width: 100%;
      }
      #outerRow[noSubLabel] {
        min-height: var(--cr-section-min-height);
      }
      #labelWrapper {
        padding: var(--cr-section-vertical-padding) 0;
      }
      #labelWrapper,
      ::slotted([slot='more-actions']) {
        margin-inline-end: 20px !important;
      }
      cr-policy-pref-indicator {
        margin-inline-end: var(--cr-controlled-by-spacing);
      }
      a {
        color: var(--cr-link-color);
      }
    </style>
    <div id="outerRow" nosublabel$="[[!subLabel]]">
      <div class="flex" id="labelWrapper" hidden$="[[!label]]">
        <div class="label" aria-hidden="[[!ariaShowLabel]]">[[label]]</div>
        <div class="cr-secondary-text label" id="sub-label">
          <template is="dom-if" if="[[subLabelIcon]]">
            <span id="sub-label-icon" aria-hidden="true">
              <iron-icon slot="icon" icon="[[subLabelIcon]]"> </iron-icon>
            </span>
          </template>
          <span id="sub-label-text" aria-hidden="[[!ariaShowSublabel]]"> [[subLabel]] </span>
          <template is="dom-if" if="[[learnMoreUrl]]">
            <a
              id="learn-more"
              href="[[learnMoreUrl]]"
              target="_blank"
              aria-labelledby="sub-label-text learn-more"
              on-click="onLearnMoreClick_"
            >
              浜嗚В璇︽儏
            </a>
          </template>
          <template is="dom-if" if="[[subLabelWithLink]]">
            <div
              id="sub-label-text-with-link"
              inner-h-t-m-l="[[getSubLabelWithLinkContent_(subLabelWithLink)]]"
              on-click="onSubLabelTextWithLinkClick_"
            ></div>
          </template>
        </div>
      </div>
      <slot name="more-actions"></slot>
      <template is="dom-if" if="[[hasPrefPolicyIndicator(pref.*)]]">
        <cr-policy-pref-indicator pref="[[pref]]" icon-aria-label="[[label]]"> </cr-policy-pref-indicator>
      </template>
      <cr-toggle
        id="control"
        checked="{{checked}}"
        on-change="onChange_"
        aria-label$="[[getAriaLabel_(label, ariaLabel)]]"
        aria-describedby="sub-label-text"
        disabled="[[controlDisabled(disabled, pref)]]"
      >
      </cr-toggle>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
const SettingsToggleButtonElementBase = SettingsBooleanControlMixin(PolymerElement);
class SettingsToggleButtonElement extends SettingsToggleButtonElementBase {
  static get is() {
    return 'settings-toggle-button';
  }
  static get template() {
    return getTemplate$y();
  }
  static get properties() {
    return {
      ariaLabel: { type: String, reflectToAttribute: false, observer: 'onAriaLabelSet_', value: '' },
      ariaShowLabel: { type: Boolean, reflectToAttribute: true, value: false },
      ariaShowSublabel: { type: Boolean, reflectToAttribute: true, value: false },
      elideLabel: { type: Boolean, reflectToAttribute: true },
      learnMoreUrl: { type: String, reflectToAttribute: true },
      subLabelWithLink: { type: String, reflectToAttribute: true },
      subLabelIcon: String,
    };
  }
  static get observers() {
    return ['onDisableOrPrefChange_(disabled, pref.*)'];
  }
  ready() {
    super.ready();
    this.addEventListener('click', this.onHostClick_);
  }
  fire_(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: detail, bubbles: true, composed: true }));
  }
  focus() {
    this.$.control.focus();
  }
  onAriaLabelSet_() {
    if (this.hasAttribute('aria-label')) {
      const ariaLabel = this.ariaLabel;
      this.removeAttribute('aria-label');
      this.ariaLabel = ariaLabel;
    }
  }
  getAriaLabel_() {
    return this.ariaLabel || this.label;
  }
  onDisableOrPrefChange_() {
    this.toggleAttribute('effectively-disabled_', this.controlDisabled());
  }
  onHostClick_(e) {
    e.stopPropagation();
    if (this.controlDisabled()) {
      return;
    }
    this.checked = !this.checked;
    this.notifyChangedByUserInteraction();
    this.fire_('change');
  }
  onLearnMoreClick_(e) {
    e.stopPropagation();
    this.fire_('learn-more-clicked');
  }
  getSubLabelWithLinkContent_(contents) {
    return sanitizeInnerHtml(contents, {
      attrs: ['id', 'is', 'aria-hidden', 'aria-label', 'aria-labelledby', 'tabindex'],
    });
  }
  onSubLabelTextWithLinkClick_(e) {
    const target = e.target;
    if (target.tagName === 'A') {
      this.fire_('sub-label-link-clicked', target.id);
      e.preventDefault();
      e.stopPropagation();
    }
  }
  onChange_(e) {
    this.checked = e.detail;
    this.notifyChangedByUserInteraction();
  }
}
customElements.define(SettingsToggleButtonElement.is, SettingsToggleButtonElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ var ORPHANS = new Set();
const IronResizableBehavior = {
  properties: {
    _parentResizable: { type: Object, observer: '_parentResizableChanged' },
    _notifyingDescendant: { type: Boolean, value: false },
  },
  listeners: { 'iron-request-resize-notifications': '_onIronRequestResizeNotifications' },
  created: function () {
    this._interestedResizables = [];
    this._boundNotifyResize = this.notifyResize.bind(this);
    this._boundOnDescendantIronResize = this._onDescendantIronResize.bind(this);
  },
  attached: function () {
    this._requestResizeNotifications();
  },
  detached: function () {
    if (this._parentResizable) {
      this._parentResizable.stopResizeNotificationsFor(this);
    } else {
      ORPHANS.delete(this);
      window.removeEventListener('resize', this._boundNotifyResize);
    }
    this._parentResizable = null;
  },
  notifyResize: function () {
    if (!this.isAttached) {
      return;
    }
    this._interestedResizables.forEach(function (resizable) {
      if (this.resizerShouldNotify(resizable)) {
        this._notifyDescendant(resizable);
      }
    }, this);
    this._fireResize();
  },
  assignParentResizable: function (parentResizable) {
    if (this._parentResizable) {
      this._parentResizable.stopResizeNotificationsFor(this);
    }
    this._parentResizable = parentResizable;
    if (parentResizable && parentResizable._interestedResizables.indexOf(this) === -1) {
      parentResizable._interestedResizables.push(this);
      parentResizable._subscribeIronResize(this);
    }
  },
  stopResizeNotificationsFor: function (target) {
    var index = this._interestedResizables.indexOf(target);
    if (index > -1) {
      this._interestedResizables.splice(index, 1);
      this._unsubscribeIronResize(target);
    }
  },
  _subscribeIronResize: function (target) {
    target.addEventListener('iron-resize', this._boundOnDescendantIronResize);
  },
  _unsubscribeIronResize: function (target) {
    target.removeEventListener('iron-resize', this._boundOnDescendantIronResize);
  },
  resizerShouldNotify: function (element) {
    return true;
  },
  _onDescendantIronResize: function (event) {
    if (this._notifyingDescendant) {
      event.stopPropagation();
      return;
    }
    if (!useShadow) {
      this._fireResize();
    }
  },
  _fireResize: function () {
    this.fire('iron-resize', null, { node: this, bubbles: false });
  },
  _onIronRequestResizeNotifications: function (event) {
    var target = dom(event).rootTarget;
    if (target === this) {
      return;
    }
    target.assignParentResizable(this);
    this._notifyDescendant(target);
    event.stopPropagation();
  },
  _parentResizableChanged: function (parentResizable) {
    if (parentResizable) {
      window.removeEventListener('resize', this._boundNotifyResize);
    }
  },
  _notifyDescendant: function (descendant) {
    if (!this.isAttached) {
      return;
    }
    this._notifyingDescendant = true;
    descendant.notifyResize();
    this._notifyingDescendant = false;
  },
  _requestResizeNotifications: function () {
    if (!this.isAttached) {
      return;
    }
    if (document.readyState === 'loading') {
      var _requestResizeNotifications = this._requestResizeNotifications.bind(this);
      document.addEventListener('readystatechange', function readystatechanged() {
        document.removeEventListener('readystatechange', readystatechanged);
        _requestResizeNotifications();
      });
    } else {
      this._findParent();
      if (!this._parentResizable) {
        ORPHANS.forEach(function (orphan) {
          if (orphan !== this) {
            orphan._findParent();
          }
        }, this);
        window.addEventListener('resize', this._boundNotifyResize);
        this.notifyResize();
      } else {
        this._parentResizable._interestedResizables.forEach(function (resizable) {
          if (resizable !== this) {
            resizable._findParent();
          }
        }, this);
      }
    }
  },
  _findParent: function () {
    this.assignParentResizable(null);
    this.fire('iron-request-resize-notifications', null, { node: this, bubbles: true, cancelable: true });
    if (!this._parentResizable) {
      ORPHANS.add(this);
    } else {
      ORPHANS.delete(this);
    }
  },
};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ class IronSelection {
  constructor(selectCallback) {
    this.selection = [];
    this.selectCallback = selectCallback;
  }
  get() {
    return this.multi ? this.selection.slice() : this.selection[0];
  }
  clear(excludes) {
    this.selection.slice().forEach(function (item) {
      if (!excludes || excludes.indexOf(item) < 0) {
        this.setItemSelected(item, false);
      }
    }, this);
  }
  isSelected(item) {
    return this.selection.indexOf(item) >= 0;
  }
  setItemSelected(item, isSelected) {
    if (item != null) {
      if (isSelected !== this.isSelected(item)) {
        if (isSelected) {
          this.selection.push(item);
        } else {
          var i = this.selection.indexOf(item);
          if (i >= 0) {
            this.selection.splice(i, 1);
          }
        }
        if (this.selectCallback) {
          this.selectCallback(item, isSelected);
        }
      }
    }
  }
  select(item) {
    if (this.multi) {
      this.toggle(item);
    } else if (this.get() !== item) {
      this.setItemSelected(this.get(), false);
      this.setItemSelected(item, true);
    }
  }
  toggle(item) {
    this.setItemSelected(item, !this.isSelected(item));
  }
}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ const IronSelectableBehavior = {
  properties: {
    attrForSelected: { type: String, value: null },
    selected: { type: String, notify: true },
    selectedItem: { type: Object, readOnly: true, notify: true },
    activateEvent: { type: String, value: 'tap', observer: '_activateEventChanged' },
    selectable: String,
    selectedClass: { type: String, value: 'iron-selected' },
    selectedAttribute: { type: String, value: null },
    fallbackSelection: { type: String, value: null },
    items: {
      type: Array,
      readOnly: true,
      notify: true,
      value: function () {
        return [];
      },
    },
    _excludedLocalNames: {
      type: Object,
      value: function () {
        return { template: 1, 'dom-bind': 1, 'dom-if': 1, 'dom-repeat': 1 };
      },
    },
  },
  observers: [
    '_updateAttrForSelected(attrForSelected)',
    '_updateSelected(selected)',
    '_checkFallback(fallbackSelection)',
  ],
  created: function () {
    this._bindFilterItem = this._filterItem.bind(this);
    this._selection = new IronSelection(this._applySelection.bind(this));
  },
  attached: function () {
    this._observer = this._observeItems(this);
    this._addListener(this.activateEvent);
  },
  detached: function () {
    if (this._observer) {
      dom(this).unobserveNodes(this._observer);
    }
    this._removeListener(this.activateEvent);
  },
  indexOf: function (item) {
    return this.items ? this.items.indexOf(item) : -1;
  },
  select: function (value) {
    this.selected = value;
  },
  selectPrevious: function () {
    var length = this.items.length;
    var index = length - 1;
    if (this.selected !== undefined) {
      index = (Number(this._valueToIndex(this.selected)) - 1 + length) % length;
    }
    this.selected = this._indexToValue(index);
  },
  selectNext: function () {
    var index = 0;
    if (this.selected !== undefined) {
      index = (Number(this._valueToIndex(this.selected)) + 1) % this.items.length;
    }
    this.selected = this._indexToValue(index);
  },
  selectIndex: function (index) {
    this.select(this._indexToValue(index));
  },
  forceSynchronousItemUpdate: function () {
    if (this._observer && typeof this._observer.flush === 'function') {
      this._observer.flush();
    } else {
      this._updateItems();
    }
  },
  get _shouldUpdateSelection() {
    return this.selected != null;
  },
  _checkFallback: function () {
    this._updateSelected();
  },
  _addListener: function (eventName) {
    this.listen(this, eventName, '_activateHandler');
  },
  _removeListener: function (eventName) {
    this.unlisten(this, eventName, '_activateHandler');
  },
  _activateEventChanged: function (eventName, old) {
    this._removeListener(old);
    this._addListener(eventName);
  },
  _updateItems: function () {
    var nodes = dom(this).queryDistributedElements(this.selectable || '*');
    nodes = Array.prototype.filter.call(nodes, this._bindFilterItem);
    this._setItems(nodes);
  },
  _updateAttrForSelected: function () {
    if (this.selectedItem) {
      this.selected = this._valueForItem(this.selectedItem);
    }
  },
  _updateSelected: function () {
    this._selectSelected(this.selected);
  },
  _selectSelected: function (selected) {
    if (!this.items) {
      return;
    }
    var item = this._valueToItem(this.selected);
    if (item) {
      this._selection.select(item);
    } else {
      this._selection.clear();
    }
    if (this.fallbackSelection && this.items.length && this._selection.get() === undefined) {
      this.selected = this.fallbackSelection;
    }
  },
  _filterItem: function (node) {
    return !this._excludedLocalNames[node.localName];
  },
  _valueToItem: function (value) {
    return value == null ? null : this.items[this._valueToIndex(value)];
  },
  _valueToIndex: function (value) {
    if (this.attrForSelected) {
      for (var i = 0, item; (item = this.items[i]); i++) {
        if (this._valueForItem(item) == value) {
          return i;
        }
      }
    } else {
      return Number(value);
    }
  },
  _indexToValue: function (index) {
    if (this.attrForSelected) {
      var item = this.items[index];
      if (item) {
        return this._valueForItem(item);
      }
    } else {
      return index;
    }
  },
  _valueForItem: function (item) {
    if (!item) {
      return null;
    }
    if (!this.attrForSelected) {
      var i = this.indexOf(item);
      return i === -1 ? null : i;
    }
    var propValue = item[dashToCamelCase(this.attrForSelected)];
    return propValue != undefined ? propValue : item.getAttribute(this.attrForSelected);
  },
  _applySelection: function (item, isSelected) {
    if (this.selectedClass) {
      this.toggleClass(this.selectedClass, isSelected, item);
    }
    if (this.selectedAttribute) {
      this.toggleAttribute(this.selectedAttribute, isSelected, item);
    }
    this._selectionChange();
    this.fire('iron-' + (isSelected ? 'select' : 'deselect'), { item: item });
  },
  _selectionChange: function () {
    this._setSelectedItem(this._selection.get());
  },
  _observeItems: function (node) {
    return dom(node).observeNodes(function (mutation) {
      this._updateItems();
      this._updateSelected();
      this.fire('iron-items-changed', mutation, { bubbles: false, cancelable: false });
    });
  },
  _activateHandler: function (e) {
    var t = e.target;
    var items = this.items;
    while (t && t != this) {
      var i = items.indexOf(t);
      if (i >= 0) {
        var value = this._indexToValue(i);
        this._itemActivate(value, t);
        return;
      }
      t = t.parentNode;
    }
  },
  _itemActivate: function (value, item) {
    if (!this.fire('iron-activate', { selected: value, item: item }, { cancelable: true }).defaultPrevented) {
      this.select(value);
    }
  },
};
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ Polymer({
  _template: html`
    <style>
      :host {
        display: block;
      }

      :host > ::slotted(:not(slot):not(.iron-selected)) {
        display: none !important;
      }
    </style>

    <slot></slot>
  `,
  is: 'iron-pages',
  behaviors: [IronResizableBehavior, IronSelectableBehavior],
  properties: { activateEvent: { type: String, value: null } },
  observers: ['_selectedPageChanged(selected)'],
  _selectedPageChanged: function (selected, old) {
    this.async(this.notifyResize);
  },
});
// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const isMac = /Mac/.test(navigator.platform);
const isWindows = /Win/.test(navigator.platform);
const isAndroid = /Android/.test(navigator.userAgent);
const isIOS = /CriOS/.test(navigator.userAgent);
// Copyright 2017 The Chromium Authors
let hideInk = false;
assert(!isIOS, "pointerdown doesn't work on iOS");
document.addEventListener(
  'pointerdown',
  function () {
    hideInk = true;
  },
  true
);
document.addEventListener(
  'keydown',
  function () {
    hideInk = false;
  },
  true
);
function focusWithoutInk(toFocus) {
  if (!('noink' in toFocus) || !hideInk) {
    toFocus.focus();
    return;
  }
  const toFocusWithNoInk = toFocus;
  assert(document === toFocusWithNoInk.ownerDocument);
  const { noink: noink } = toFocusWithNoInk;
  toFocusWithNoInk.noink = true;
  toFocusWithNoInk.focus();
  toFocusWithNoInk.noink = noink;
}
function getTemplate$x() {
  return html`<!--_html_template_start_-->
    <iron-pages id="animatedPages" attr-for-selected="route-path" on-iron-select="onIronSelect_">
      <slot></slot>
    </iron-pages>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SettingsAnimatedPagesElementBase = RouteObserverMixin(PolymerElement);
class SettingsAnimatedPagesElement extends SettingsAnimatedPagesElementBase {
  static get is() {
    return 'settings-animated-pages';
  }
  static get template() {
    return getTemplate$x();
  }
  static get properties() {
    return { section: String, focusConfig: Object };
  }
  constructor() {
    super();
    this.focusConfig = null;
    this.lightDomReady_ = false;
    this.queuedRouteChange_ = null;
    this.lightDomObserver_ = new FlattenedNodesObserver(this, this.lightDomChanged_.bind(this));
    this.previousRoute_ = null;
  }
  onIronSelect_(e) {
    if (e.target !== this.$.animatedPages) {
      return;
    }
    if (this.previousRoute_ && !Router.getInstance().lastRouteChangeWasPopstate()) {
      const subpage = this.querySelector('settings-subpage.iron-selected');
      if (subpage) {
        subpage.focusBackButton();
        return;
      }
    }
    if (!Router.getInstance().lastRouteChangeWasPopstate()) {
      return;
    }
    if (!this.focusConfig || !this.previousRoute_) {
      return;
    }
    assert(this.focusConfig instanceof Map);
    const currentRoute = Router.getInstance().getCurrentRoute();
    const fromToKey = `${this.previousRoute_.path}_${currentRoute.path}`;
    let pathConfig = this.focusConfig.get(fromToKey) || this.focusConfig.get(this.previousRoute_.path);
    if (pathConfig) {
      let handler;
      if (typeof pathConfig === 'function') {
        handler = pathConfig;
      } else {
        handler = () => {
          if (typeof pathConfig === 'string') {
            const element = this.querySelector(pathConfig);
            assert(element);
            pathConfig = element;
          }
          focusWithoutInk(pathConfig);
        };
      }
      handler();
    }
  }
  lightDomChanged_() {
    if (this.lightDomReady_) {
      return;
    }
    this.lightDomReady_ = true;
    this.lightDomObserver_.disconnect();
    this.lightDomObserver_ = null;
    this.runQueuedRouteChange_();
  }
  runQueuedRouteChange_() {
    if (!this.queuedRouteChange_) {
      return;
    }
    microTask.run(() => {
      this.currentRouteChanged(this.queuedRouteChange_.newRoute, this.queuedRouteChange_.oldRoute);
    });
  }
  currentRouteChanged(newRoute, oldRoute) {
    this.previousRoute_ = oldRoute || null;
    if (newRoute.section === this.section && newRoute.isSubpage()) {
      this.switchToSubpage_(newRoute, oldRoute);
    } else {
      this.$.animatedPages.selected = 'default';
    }
  }
  switchToSubpage_(newRoute, oldRoute) {
    if (!this.lightDomReady_) {
      this.queuedRouteChange_ = this.queuedRouteChange_ || { oldRoute: oldRoute, newRoute: newRoute };
      this.queuedRouteChange_.newRoute = newRoute;
      return;
    }
    this.ensureSubpageInstance_();
    this.$.animatedPages.selected = newRoute.path;
  }
  ensureSubpageInstance_() {
    const routePath = Router.getInstance().getCurrentRoute().path;
    const domIf = this.querySelector(`dom-if[route-path='${routePath}']`);
    if (!domIf || domIf.if) {
      return;
    }
    const content = DomIf._contentForTemplate(domIf.firstElementChild);
    const subpage = content.querySelector('settings-subpage');
    subpage.setAttribute('route-path', routePath);
    if (domIf.hasAttribute('no-search') || domIf['noSearch']) {
      subpage.setAttribute('no-search', '');
    }
    domIf.if = true;
    domIf.render();
  }
}
customElements.define(SettingsAnimatedPagesElement.is, SettingsAnimatedPagesElement);
const styleMod$1 = document.createElement('dom-module');
styleMod$1.appendChild(
  html`
    <template>
      <style>
        :host {
          --cr-input-background-color: var(--google-grey-100);
          --cr-input-color: var(--cr-primary-text-color);
          --cr-input-error-color: var(--google-red-600);
          --cr-input-focus-color: var(--google-blue-600);
          display: block;
          outline: 0;
        }
        :host-context([chrome-refresh-2023]):host {
          --cr-input-background-color: var(
            --color-textfield-filled-background,
            var(--cr-fallback-color-surface-variant)
          );
          --cr-input-border-bottom: 1px solid var(--color-textfield-filled-underline, var(--cr-fallback-color-outline));
          --cr-input-border-radius: 8px 8px 0 0;
          --cr-input-error-color: var(--color-textfield-filled-error, var(--cr-fallback-color-error));
          --cr-input-focus-color: var(--color-textfield-filled-underline-focused, var(--cr-fallback-color-primary));
          --cr-input-hover-background-color: var(--cr-hover-background-color);
          --cr-input-padding-bottom: 10px;
          --cr-input-padding-end: 10px;
          --cr-input-padding-start: 10px;
          --cr-input-padding-top: 10px;
          --cr-input-placeholder-color: var(
            --color-textfield-foreground-placeholder,
            var(--cr-fallback-on-surface-subtle)
          );
          isolation: isolate;
        }
        :host-context([chrome-refresh-2023]):host([readonly]) {
          --cr-input-border-radius: 8px 8px;
        }
        @media (prefers-color-scheme: dark) {
          :host {
            --cr-input-background-color: rgba(0, 0, 0, 0.3);
            --cr-input-error-color: var(--google-red-300);
            --cr-input-focus-color: var(--google-blue-300);
          }
        }
        :host-context(html:not([chrome-refresh-2023])):host([focused_]:not([readonly]):not([invalid])) #label {
          color: var(--cr-input-focus-color);
        }
        :host-context([chrome-refresh-2023]) #label {
          color: var(--color-textfield-foreground-label, var(--cr-fallback-color-on-surface-subtle));
          font-size: 11px;
          line-height: 16px;
        }
        #input-container {
          border-radius: var(--cr-input-border-radius, 4px);
          overflow: hidden;
          position: relative;
          width: var(--cr-input-width, 100%);
        }
        #inner-input-container {
          background-color: var(--cr-input-background-color);
          box-sizing: border-box;
          padding: 0;
        }
        :host-context([chrome-refresh-2023]) #inner-input-content ::slotted(*) {
          --cr-icon-button-fill-color: var(
            --color-textfield-foreground-icon,
            var(--cr-fallback-color-on-surface-subtle)
          );
          --cr-icon-button-icon-size: 16px;
          --cr-icon-button-size: 24px;
          --cr-icon-button-margin-start: 0;
          --cr-icon-color: var(--color-textfield-foreground-icon, var(--cr-fallback-color-on-surface-subtle));
        }
        :host-context([chrome-refresh-2023]) #inner-input-content ::slotted([slot='inline-prefix']) {
          --cr-icon-button-margin-start: -8px;
        }
        :host-context([chrome-refresh-2023]) #inner-input-content ::slotted([slot='inline-suffix']) {
          --cr-icon-button-margin-end: -4px;
        }
        :host-context([chrome-refresh-2023]):host([invalid]) #inner-input-content ::slotted(*) {
          --cr-icon-color: var(--cr-input-error-color);
          --cr-icon-button-fill-color: var(--cr-input-error-color);
        }
        #hover-layer {
          display: none;
        }
        :host-context([chrome-refresh-2023]) #hover-layer {
          background-color: var(--cr-input-hover-background-color);
          inset: 0;
          pointer-events: none;
          position: absolute;
          z-index: 0;
        }
        :host-context([chrome-refresh-2023]):host(:not([readonly]):not([disabled]))
          #input-container:hover
          #hover-layer {
          display: block;
        }
        #input {
          -webkit-appearance: none;
          background-color: transparent;
          border: none;
          box-sizing: border-box;
          caret-color: var(--cr-input-focus-color);
          color: var(--cr-input-color);
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          line-height: inherit;
          min-height: var(--cr-input-min-height, auto);
          outline: 0;
          padding-bottom: var(--cr-input-padding-bottom, 6px);
          padding-inline-end: var(--cr-input-padding-end, 8px);
          padding-inline-start: var(--cr-input-padding-start, 8px);
          padding-top: var(--cr-input-padding-top, 6px);
          text-align: inherit;
          text-overflow: ellipsis;
          width: 100%;
        }
        :host-context([chrome-refresh-2023]) #input {
          font-size: 12px;
          line-height: 16px;
          padding: 0;
        }
        :host-context([chrome-refresh-2023]) #inner-input-content {
          padding-bottom: var(--cr-input-padding-bottom);
          padding-inline-end: var(--cr-input-padding-end);
          padding-inline-start: var(--cr-input-padding-start);
          padding-top: var(--cr-input-padding-top);
        }
        #underline {
          border-bottom: 2px solid var(--cr-input-focus-color);
          border-radius: var(--cr-input-underline-border-radius, 0);
          bottom: 0;
          box-sizing: border-box;
          display: var(--cr-input-underline-display);
          height: var(--cr-input-underline-height, 0);
          left: 0;
          margin: auto;
          opacity: 0;
          position: absolute;
          right: 0;
          transition: opacity 120ms ease-out, width 0s linear 180ms;
          width: 0;
        }
        :host([focused_]) #underline,
        :host([force-underline]) #underline,
        :host([invalid]) #underline {
          opacity: 1;
          transition: opacity 120ms ease-in, width 180ms ease-out;
          width: 100%;
        }
        #underline-base {
          display: none;
        }
        :host-context([chrome-refresh-2023]):host([readonly]) #underline {
          display: none;
        }
        :host-context([chrome-refresh-2023]):host(:not([readonly])) #underline-base {
          border-bottom: var(--cr-input-border-bottom);
          bottom: 0;
          display: block;
          left: 0;
          position: absolute;
          right: 0;
        }
        :host-context([chrome-refresh-2023]):host([disabled]) {
          color: var(--color-textfield-foreground-disabled, var(--cr-fallback-color-disabled-foreground));
          --cr-input-border-bottom: 1px solid currentColor;
          --cr-input-placeholder-color: currentColor;
          --cr-input-color: currentColor;
          --cr-input-background-color: var(
            --color-textfield-background-disabled,
            var(--cr-fallback-color-disabled-background)
          );
        }
        :host-context([chrome-refresh-2023]):host([disabled]) #inner-input-content ::slotted(*) {
          --cr-icon-color: currentColor;
          --cr-icon-button-fill-color: currentColor;
        }
      </style>
    </template>
  `.content
);
styleMod$1.register('cr-input-style');
function getTemplate$w() {
  return html`<!--_html_template_start_-->
    <style include="cr-hidden-style cr-input-style cr-shared-style">
      :host([disabled]) :-webkit-any(#label, #error, #input-container) {
        opacity: var(--cr-disabled-opacity);
        pointer-events: none;
      }
      :host-context([chrome-refresh-2023]):host([disabled]) :is(#label, #error, #input-container) {
        opacity: 1;
      }
      :host ::slotted(cr-button[slot='suffix']) {
        margin-inline-start: var(--cr-button-edge-spacing) !important;
      }
      :host([invalid]) #label {
        color: var(--cr-input-error-color);
      }
      #input {
        border-bottom: var(--cr-input-border-bottom, none);
        letter-spacing: var(--cr-input-letter-spacing);
      }
      :host-context([chrome-refresh-2023]) #input {
        border-bottom: none;
      }
      :host-context([chrome-refresh-2023]) #input-container {
        border: var(--cr-input-border, none);
      }
      #input::placeholder {
        color: var(--cr-input-placeholder-color, var(--cr-secondary-text-color));
        letter-spacing: var(--cr-input-placeholder-letter-spacing);
      }
      :host([invalid]) #input {
        caret-color: var(--cr-input-error-color);
      }
      :host([readonly]) #input {
        opacity: var(--cr-input-readonly-opacity, 0.6);
      }
      :host([invalid]) #underline {
        border-color: var(--cr-input-error-color);
      }
      #error {
        color: var(--cr-input-error-color);
        display: var(--cr-input-error-display, block);
        font-size: var(--cr-form-field-label-font-size);
        height: var(--cr-form-field-label-height);
        line-height: var(--cr-form-field-label-line-height);
        margin: 8px 0;
        visibility: hidden;
        white-space: var(--cr-input-error-white-space);
      }
      :host-context([chrome-refresh-2023]) #error {
        font-size: 11px;
        line-height: 16px;
        margin: 4px 10px;
      }
      :host([invalid]) #error {
        visibility: visible;
      }
      #inner-input-content,
      #row-container {
        align-items: center;
        display: flex;
        justify-content: space-between;
        position: relative;
      }
      :host-context([chrome-refresh-2023]) #inner-input-content {
        gap: 4px;
        height: 16px;
        z-index: 1;
      }
      #input[type='search']::-webkit-search-cancel-button {
        display: none;
      }
      :host-context([dir='rtl']) #input[type='url'] {
        text-align: right;
      }
      #input[type='url'] {
        direction: ltr;
      }
    </style>
    <div id="label" class="cr-form-field-label" hidden="[[!label]]" aria-hidden="true">[[label]]</div>
    <div id="row-container" part="row-container">
      <div id="input-container">
        <div id="inner-input-container">
          <div id="hover-layer"></div>
          <div id="inner-input-content">
            <slot name="inline-prefix"></slot>

            <input
              id="input"
              disabled="[[disabled]]"
              autofocus="[[autofocus]]"
              value="{{value::input}}"
              tabindex$="[[inputTabindex]]"
              type="[[type]]"
              readonly$="[[readonly]]"
              maxlength$="[[maxlength]]"
              pattern$="[[pattern]]"
              required="[[required]]"
              minlength$="[[minlength]]"
              inputmode$="[[inputmode]]"
              aria-description$="[[ariaDescription]]"
              aria-label$="[[getAriaLabel_(ariaLabel, label, placeholder)]]"
              aria-invalid$="[[getAriaInvalid_(invalid)]]"
              max="[[max]]"
              min="[[min]]"
              on-focus="onInputFocus_"
              on-blur="onInputBlur_"
              on-change="onInputChange_"
              part="input"
              autocomplete="off"
            />
            <slot name="inline-suffix"></slot>
          </div>
        </div>
        <div id="underline-base"></div>
        <div id="underline"></div>
      </div>
      <slot name="suffix"></slot>
    </div>
    <div id="error" aria-live="assertive">[[displayErrorMessage_]]</div>
    <!--_html_template_end_-->`;
}
// Copyright 2018 The Chromium Authors
const SUPPORTED_INPUT_TYPES = new Set(['number', 'password', 'search', 'text', 'url']);
class CrInputElement extends PolymerElement {
  static get is() {
    return 'cr-input';
  }
  static get template() {
    return getTemplate$w();
  }
  static get properties() {
    return {
      ariaDescription: { type: String },
      ariaLabel: { type: String, value: '' },
      autofocus: { type: Boolean, value: false, reflectToAttribute: true },
      autoValidate: Boolean,
      disabled: { type: Boolean, value: false, reflectToAttribute: true },
      errorMessage: { type: String, value: '', observer: 'onInvalidOrErrorMessageChanged_' },
      displayErrorMessage_: { type: String, value: '' },
      focused_: { type: Boolean, value: false, reflectToAttribute: true },
      invalid: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true,
        observer: 'onInvalidOrErrorMessageChanged_',
      },
      max: { type: Number, reflectToAttribute: true },
      min: { type: Number, reflectToAttribute: true },
      maxlength: { type: Number, reflectToAttribute: true },
      minlength: { type: Number, reflectToAttribute: true },
      pattern: { type: String, reflectToAttribute: true },
      inputmode: String,
      label: { type: String, value: '' },
      placeholder: { type: String, value: null, observer: 'placeholderChanged_' },
      readonly: { type: Boolean, reflectToAttribute: true },
      required: { type: Boolean, reflectToAttribute: true },
      inputTabindex: { type: Number, value: 0, observer: 'onInputTabindexChanged_' },
      type: { type: String, value: 'text', observer: 'onTypeChanged_' },
      value: { type: String, value: '', notify: true, observer: 'onValueChanged_' },
    };
  }
  ready() {
    super.ready();
    assert(!this.hasAttribute('tabindex'));
  }
  onInputTabindexChanged_() {
    assert(this.inputTabindex === 0 || this.inputTabindex === -1);
  }
  onTypeChanged_() {
    assert(SUPPORTED_INPUT_TYPES.has(this.type));
  }
  get inputElement() {
    return this.$.input;
  }
  getAriaLabel_(ariaLabel, label, placeholder) {
    return ariaLabel || label || placeholder;
  }
  getAriaInvalid_(invalid) {
    return invalid ? 'true' : 'false';
  }
  onInvalidOrErrorMessageChanged_() {
    this.displayErrorMessage_ = this.invalid ? this.errorMessage : '';
    const ERROR_ID = 'error';
    const errorElement = this.shadowRoot.querySelector(`#${ERROR_ID}`);
    assert(errorElement);
    if (this.invalid) {
      errorElement.setAttribute('role', 'alert');
      this.inputElement.setAttribute('aria-errormessage', ERROR_ID);
    } else {
      errorElement.removeAttribute('role');
      this.inputElement.removeAttribute('aria-errormessage');
    }
  }
  placeholderChanged_() {
    if (this.placeholder || this.placeholder === '') {
      this.inputElement.setAttribute('placeholder', this.placeholder);
    } else {
      this.inputElement.removeAttribute('placeholder');
    }
  }
  focus() {
    this.focusInput();
  }
  focusInput() {
    if (this.shadowRoot.activeElement === this.inputElement) {
      return false;
    }
    this.inputElement.focus();
    return true;
  }
  onValueChanged_(newValue, oldValue) {
    if (!newValue && !oldValue) {
      return;
    }
    if (this.autoValidate) {
      this.validate();
    }
  }
  onInputChange_(e) {
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: { sourceEvent: e } }));
  }
  onInputFocus_() {
    this.focused_ = true;
  }
  onInputBlur_() {
    this.focused_ = false;
  }
  select(start, end) {
    this.inputElement.focus();
    if (start !== undefined && end !== undefined) {
      this.inputElement.setSelectionRange(start, end);
    } else {
      assert(start === undefined && end === undefined);
      this.inputElement.select();
    }
  }
  validate() {
    this.invalid = !this.inputElement.checkValidity();
    return !this.invalid;
  }
}
customElements.define(CrInputElement.is, CrInputElement);
function getTemplate$v() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style cr-input-style">
      :host {
        display: flex;
        user-select: none;
        --cr-search-field-clear-icon-fill: var(--google-grey-700);
        --cr-search-field-clear-icon-margin-end: -4px;
        --cr-search-field-input-border-bottom: 1px solid var(--cr-secondary-text-color);
      }
      #searchIcon {
        align-self: center;
        display: var(--cr-search-field-search-icon-display, inherit);
        height: 16px;
        padding: 4px;
        vertical-align: middle;
        width: 16px;
      }
      #searchIconInline {
        --iron-icon-fill-color: var(--cr-search-field-search-icon-fill, inherit);
        display: var(--cr-search-field-search-icon-inline-display, none);
        margin-inline-start: var(--cr-search-field-search-icon-inline-margin-start, 0);
      }
      #searchInput {
        --cr-input-background-color: transparent;
        --cr-input-border-bottom: var(--cr-search-field-input-border-bottom);
        --cr-input-border-radius: 0;
        --cr-input-error-display: none;
        --cr-input-min-height: var(--cr-search-field-input-min-height, 24px);
        --cr-input-padding-end: 0;
        --cr-input-padding-start: var(--cr-search-field-input-padding-start, 0);
        --cr-input-padding-bottom: var(--cr-search-field-input-padding-bottom, 2px);
        --cr-input-padding-top: var(--cr-search-field-input-padding-top, 2px);
        --cr-input-placeholder-color: var(--cr-search-field-placeholder-color);
        --cr-input-underline-display: var(--cr-search-field-underline-display);
        --cr-input-underline-border-radius: var(--cr-search-field-input-underline-border-radius, 0);
        --cr-input-underline-height: var(--cr-search-field-input-underline-height, 0);
        align-self: stretch;
        color: var(--cr-primary-text-color);
        display: block;
        font-size: 92.3076923%;
        width: var(--cr-search-field-input-width, 160px);
      }
      :host([has-search-text]) #searchInput {
        --cr-input-padding-end: calc(24px + var(--cr-search-field-clear-icon-margin-end));
      }
      #clearSearch {
        --cr-icon-button-fill-color: var(--cr-search-field-clear-icon-fill);
        --cr-icon-button-icon-size: var(--cr-search-field-clear-icon-size, 16px);
        --cr-icon-button-size: 24px;
        margin-inline-end: var(--cr-search-field-clear-icon-margin-end);
        margin-inline-start: 4px;
        position: absolute;
        right: 0;
      }
      :host-context([dir='rtl']) #clearSearch {
        left: 0;
        right: auto;
      }
    </style>
    <iron-icon id="searchIcon" icon="cr:search" part="searchIcon"></iron-icon>
    <cr-input
      id="searchInput"
      part="searchInput"
      on-search="onSearchTermSearch"
      on-input="onSearchTermInput"
      aria-label$="[[label]]"
      type="search"
      autofocus="[[autofocus]]"
      placeholder="[[label]]"
      spellcheck="false"
    >
      <iron-icon id="searchIconInline" slot="inline-prefix" icon="cr:search"></iron-icon>
      <cr-icon-button
        id="clearSearch"
        class="icon-cancel"
        hidden$="[[!hasSearchText]]"
        slot="suffix"
        on-click="onTapClear_"
        title="[[clearLabel]]"
      >
      </cr-icon-button>
    </cr-input>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
const CrSearchFieldElementBase = CrSearchFieldMixin(PolymerElement);
class CrSearchFieldElement extends CrSearchFieldElementBase {
  static get is() {
    return 'cr-search-field';
  }
  static get template() {
    return getTemplate$v();
  }
  static get properties() {
    return { autofocus: { type: Boolean, value: false } };
  }
  getSearchInput() {
    return this.$.searchInput;
  }
  onTapClear_() {
    this.setValue('');
    setTimeout(() => {
      this.$.searchInput.focus();
    });
  }
}
customElements.define(CrSearchFieldElement.is, CrSearchFieldElement);
// Copyright 2016 The Chromium Authors
function getSupportedScaleFactors() {
  const supportedScaleFactors = [];
  if (!isIOS) {
    supportedScaleFactors.push(1);
  }
  if (!isIOS && !isAndroid) {
    supportedScaleFactors.push(2);
  } else {
    supportedScaleFactors.push(window.devicePixelRatio);
  }
  return supportedScaleFactors;
}
function getUrlForCss(s) {
  const s2 = s.replace(/(\(|\)|\,|\s|\'|\"|\\)/g, '\\$1');
  return `url("${s2}")`;
}
function getImageSet(path) {
  const supportedScaleFactors = getSupportedScaleFactors();
  const replaceStartIndex = path.indexOf('SCALEFACTOR');
  if (replaceStartIndex < 0) {
    return getUrlForCss(path);
  }
  let s = '';
  for (let i = 0; i < supportedScaleFactors.length; ++i) {
    const scaleFactor = supportedScaleFactors[i];
    const pathWithScaleFactor =
      path.substr(0, replaceStartIndex) + scaleFactor + path.substr(replaceStartIndex + 'scalefactor'.length);
    s += getUrlForCss(pathWithScaleFactor) + ' ' + scaleFactor + 'x';
    if (i !== supportedScaleFactors.length - 1) {
      s += ', ';
    }
  }
  return 'image-set(' + s + ')';
}
function getImage(path) {
  const chromeThemePath = 'chrome://theme';
  const isChromeThemeUrl = path.slice(0, chromeThemePath.length) === chromeThemePath;
  return isChromeThemeUrl ? getImageSet(path + '@SCALEFACTORx') : getUrlForCss(path);
}
function getBaseFaviconUrl() {
  const faviconUrl = new URL('chrome://favicon2/');
  faviconUrl.searchParams.set('size', '16');
  faviconUrl.searchParams.set('scaleFactor', 'SCALEFACTORx');
  return faviconUrl;
}
function getFavicon(url) {
  const faviconUrl = getBaseFaviconUrl();
  faviconUrl.searchParams.set('iconUrl', url);
  return getImageSet(faviconUrl.toString());
}
function getFaviconForPageURL(
  url,
  isSyncedUrlForHistoryUi,
  remoteIconUrlForUma = '',
  size = 16,
  forceLightMode = false
) {
  const faviconUrl = getBaseFaviconUrl();
  faviconUrl.searchParams.set('size', size.toString());
  faviconUrl.searchParams.set('pageUrl', url);
  const fallback = isSyncedUrlForHistoryUi ? '1' : '0';
  faviconUrl.searchParams.set('allowGoogleServerFallback', fallback);
  if (isSyncedUrlForHistoryUi) {
    faviconUrl.searchParams.set('iconUrl', remoteIconUrlForUma);
  }
  if (forceLightMode) {
    faviconUrl.searchParams.set('forceLightMode', 'true');
  }
  return getImageSet(faviconUrl.toString());
}
function getTemplate$u() {
  return html`<!--_html_template_start_-->
    <style>
      :host {
        --site-favicon-height: 16px;
        --site-favicon-width: 16px;
      }
      #favicon {
        background-repeat: no-repeat;
        background-size: contain;
        border-radius: inherit;
        display: block;
        height: var(--site-favicon-height);
        width: var(--site-favicon-width);
      }
    </style>
    <div id="favicon" style="background-image:[[getBackgroundImage_(faviconUrl,url) ]]"></div>
    <!--_html_template_end_-->`;
}
// Copyright 2018 The Chromium Authors
class SiteFaviconElement extends PolymerElement {
  static get is() {
    return 'site-favicon';
  }
  static get template() {
    return getTemplate$u();
  }
  static get properties() {
    return { faviconUrl: String, url: String };
  }
  getBackgroundImage_() {
    let backgroundImage = getFavicon('');
    if (this.faviconUrl) {
      const url = this.ensureUrlHasScheme_(this.faviconUrl);
      backgroundImage = getFavicon(url);
    } else if (this.url) {
      let url = this.removePatternWildcard_(this.url);
      url = this.ensureUrlHasScheme_(url);
      backgroundImage = getFaviconForPageURL(url || '', false);
    }
    return backgroundImage;
  }
  removePatternWildcard_(pattern) {
    if (!pattern || pattern.length === 0) {
      return pattern;
    }
    if (pattern.startsWith('http://[*.]')) {
      return pattern.replace('http://[*.]', 'http://');
    } else if (pattern.startsWith('https://[*.]')) {
      return pattern.replace('https://[*.]', 'https://');
    } else if (pattern.startsWith('[*.]')) {
      return pattern.substring(4, pattern.length);
    }
    return pattern;
  }
  ensureUrlHasScheme_(url) {
    if (!url || url.length === 0) {
      return url;
    }
    return url.includes('://') ? url : 'http://' + url;
  }
}
customElements.define(SiteFaviconElement.is, SiteFaviconElement);
// Copyright 2019 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class KeyboardShortcut {
  constructor(shortcut) {
    this.useKeyCode_ = false;
    this.mods_ = {};
    this.key_ = null;
    this.keyCode_ = null;
    shortcut.split('|').forEach((part) => {
      const partLc = part.toLowerCase();
      switch (partLc) {
        case 'alt':
        case 'ctrl':
        case 'meta':
        case 'shift':
          this.mods_[partLc + 'Key'] = true;
          break;
        default:
          if (this.key_) {
            throw Error('Invalid shortcut');
          }
          this.key_ = part;
          if (part.match(/^[a-z]$/)) {
            this.useKeyCode_ = true;
            this.keyCode_ = part.toUpperCase().charCodeAt(0);
          }
      }
    });
  }
  matchesEvent(e) {
    if ((this.useKeyCode_ && e.keyCode === this.keyCode_) || e.key === this.key_) {
      const mods = this.mods_;
      return ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].every(function (k) {
        return e[k] === !!mods[k];
      });
    }
    return false;
  }
}
class KeyboardShortcutList {
  constructor(shortcuts) {
    this.shortcuts_ = shortcuts.split(/\s+/).map(function (shortcut) {
      return new KeyboardShortcut(shortcut);
    });
  }
  matchesEvent(e) {
    return this.shortcuts_.some(function (keyboardShortcut) {
      return keyboardShortcut.matchesEvent(e);
    });
  }
}
// Copyright 2021 The Chromium Authors
const FindShortcutManager = (() => {
  const listeners = [];
  let modalContextOpen = false;
  const shortcutCtrlF = new KeyboardShortcutList(isMac ? 'meta|f' : 'ctrl|f');
  const shortcutSlash = new KeyboardShortcutList('/');
  window.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || listeners.length === 0) {
      return;
    }
    const element = e.composedPath()[0];
    if (
      !shortcutCtrlF.matchesEvent(e) &&
      (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || !shortcutSlash.matchesEvent(e))
    ) {
      return;
    }
    const focusIndex = listeners.findIndex((listener) => listener.searchInputHasFocus());
    const index = focusIndex <= 0 ? listeners.length - 1 : focusIndex - 1;
    if (listeners[index].handleFindShortcut(modalContextOpen)) {
      e.preventDefault();
    }
  });
  window.addEventListener('cr-dialog-open', () => {
    modalContextOpen = true;
  });
  window.addEventListener('cr-drawer-opened', () => {
    modalContextOpen = true;
  });
  window.addEventListener('close', (e) => {
    if (['CR-DIALOG', 'CR-DRAWER'].includes(e.composedPath()[0].nodeName)) {
      modalContextOpen = false;
    }
  });
  return Object.freeze({ listeners: listeners });
})();
const FindShortcutMixin = dedupingMixin((superClass) => {
  class FindShortcutMixin extends superClass {
    constructor() {
      super(...arguments);
      this.findShortcutListenOnAttach = true;
    }
    connectedCallback() {
      super.connectedCallback();
      if (this.findShortcutListenOnAttach) {
        this.becomeActiveFindShortcutListener();
      }
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      if (this.findShortcutListenOnAttach) {
        this.removeSelfAsFindShortcutListener();
      }
    }
    becomeActiveFindShortcutListener() {
      const listeners = FindShortcutManager.listeners;
      assert(!listeners.includes(this), 'Already listening for find shortcuts.');
      listeners.push(this);
    }
    handleFindShortcutInternal_() {
      assertNotReached('Must override handleFindShortcut()');
    }
    handleFindShortcut(_modalContextOpen) {
      this.handleFindShortcutInternal_();
      return false;
    }
    removeSelfAsFindShortcutListener() {
      const listeners = FindShortcutManager.listeners;
      const index = listeners.indexOf(this);
      assert(listeners.includes(this), 'Find shortcut listener not found.');
      listeners.splice(index, 1);
    }
    searchInputHasFocusInternal_() {
      assertNotReached('Must override searchInputHasFocus()');
    }
    searchInputHasFocus() {
      this.searchInputHasFocusInternal_();
      return false;
    }
  }
  return FindShortcutMixin;
});
function getTemplate$t() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style settings-shared">
      :host {
        box-sizing: border-box;
        display: block;
        left: 0;
        min-height: calc(100vh - var(--cr-toolbar-height) - var(--cr-toolbar-padding-top, 0px));
        padding-bottom: 60px;
        position: absolute;
        right: 0;
        top: 0;
      }
      :host(:not(.multi-card)) {
        background-color: var(--cr-card-background-color);
        box-shadow: var(--cr-card-shadow);
      }
      @media (forced-colors: active) {
        :host(:not(.multi-card)) {
          border-inline-end: var(--cr-border-hcm);
          border-inline-start: var(--cr-border-hcm);
        }
      }
      #headerLine {
        min-height: 40px;
        padding-bottom: 24px;
        padding-top: 8px;
      }
      #learnMore {
        align-items: center;
        display: flex;
        height: var(--cr-icon-ripple-size);
        justify-content: center;
        margin-inline-end: var(--cr-icon-ripple-margin);
        margin-inline-start: var(--cr-icon-button-margin-start);
        position: relative;
        width: var(--cr-icon-ripple-size);
      }
      #title-icon {
        height: 36px;
        width: 36px;
      }
      #favicon,
      #title-icon {
        margin-inline-end: 12px;
        margin-inline-start: 2px;
      }
      #closeButton {
        margin-inline-end: 10px;
        margin-inline-start: -10px;
      }
      paper-spinner-lite {
        height: var(--cr-icon-size);
        width: var(--cr-icon-size);
      }
      h1 {
        flex: 1;
      }
      cr-search-field {
        margin-inline-start: 16px;
      }
    </style>
    <div class="cr-row first" id="headerLine">
      <cr-icon-button
        class="icon-arrow-back"
        id="closeButton"
        hidden="[[hideCloseButton]]"
        on-click="onBackClick_"
        aria-label$="[[getBackButtonAriaLabel_(pageTitle)]]"
        aria-roledescription$="[[getBackButtonAriaRoleDescription_(pageTitle)]]"
      >
      </cr-icon-button>
      <template is="dom-if" if="[[titleIcon]]">
        <img id="title-icon" src="[[titleIcon]]" aria-hidden="true" />
      </template>
      <template is="dom-if" if="[[faviconSiteUrl]]">
        <site-favicon id="favicon" url="[[faviconSiteUrl]]" aria-hidden="true"> </site-favicon>
      </template>
      <h1 class="cr-title-text">[[pageTitle]]</h1>
      <slot name="subpage-title-extra"></slot>
      <template is="dom-if" if="[[learnMoreUrl]]">
        <cr-icon-button
          iron-icon="cr:help-outline"
          dir="ltr"
          aria-label="[[getLearnMoreAriaLabel_(pageTitle)]]"
          on-click="onHelpClick_"
        >
        </cr-icon-button>
      </template>
      <template is="dom-if" if="[[searchLabel]]">
        <cr-search-field label="[[searchLabel]]" on-search-changed="onSearchChanged_" clear-label="娓呴櫎鎼滅储瀛楄瘝">
        </cr-search-field>
      </template>
      <template is="dom-if" if="[[showSpinner]]">
        <paper-spinner-lite active title$="[[spinnerTitle]]"> </paper-spinner-lite>
      </template>
    </div>
    <slot></slot>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
const SETTING_ID_URL_PARAM_NAME = 'settingId';
function getSettingIdParameter() {
  return Router.getInstance().getQueryParameters().get(SETTING_ID_URL_PARAM_NAME);
}
const SettingsSubpageElementBase = mixinBehaviors(
  [IronResizableBehavior],
  RouteObserverMixin(FindShortcutMixin(I18nMixin(PolymerElement)))
);
class SettingsSubpageElement extends SettingsSubpageElementBase {
  static get is() {
    return 'settings-subpage';
  }
  static get properties() {
    return {
      pageTitle: String,
      titleIcon: String,
      faviconSiteUrl: String,
      learnMoreUrl: String,
      searchLabel: String,
      searchTerm: { type: String, notify: true, value: '' },
      showSpinner: { type: Boolean, value: false },
      spinnerTitle: { type: String, value: '' },
      hideCloseButton: { type: Boolean, value: false },
      associatedControl: { type: Object, value: null },
      preserveSearchTerm: { type: Boolean, value: false },
      active_: { type: Boolean, value: false, observer: 'onActiveChanged_' },
    };
  }
  constructor() {
    super();
    this.lastActiveValue_ = false;
    this.eventTracker_ = null;
    this.findShortcutListenOnAttach = false;
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.searchLabel) {
      this.eventTracker_ = new EventTracker();
      this.eventTracker_.add(this, 'clear-subpage-search', this.onClearSubpageSearch_);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.eventTracker_) {
      this.eventTracker_.removeAll();
    }
  }
  getSearchField_() {
    let searchField = this.shadowRoot.querySelector('cr-search-field');
    if (searchField) {
      return Promise.resolve(searchField);
    }
    return new Promise((resolve) => {
      listenOnce(this, 'dom-change', () => {
        searchField = this.shadowRoot.querySelector('cr-search-field');
        assert(!!searchField);
        resolve(searchField);
      });
    });
  }
  restoreSearchInput_() {
    const searchField = this.shadowRoot.querySelector('cr-search-field');
    const urlSearchQuery = Router.getInstance().getQueryParameters().get('searchSubpage') || '';
    this.searchTerm = urlSearchQuery;
    searchField.setValue(urlSearchQuery);
  }
  preserveSearchInput_() {
    const query = this.searchTerm;
    const searchParams =
      query.length > 0 ? new URLSearchParams('searchSubpage=' + encodeURIComponent(query)) : undefined;
    const currentRoute = Router.getInstance().getCurrentRoute();
    Router.getInstance().navigateTo(currentRoute, searchParams);
  }
  focusBackButton() {
    if (this.hideCloseButton) {
      return;
    }
    afterNextRender(this, () => focusWithoutInk(this.$.closeButton));
  }
  currentRouteChanged(newRoute, oldRoute) {
    this.active_ = this.getAttribute('route-path') === newRoute.path;
    if (this.active_ && this.searchLabel && this.preserveSearchTerm) {
      this.getSearchField_().then(() => this.restoreSearchInput_());
    }
    if (!oldRoute && !getSettingIdParameter()) {
      this.focusBackButton();
    }
  }
  onActiveChanged_() {
    if (this.lastActiveValue_ === this.active_) {
      return;
    }
    this.lastActiveValue_ = this.active_;
    if (this.active_ && this.pageTitle) {
      document.title = loadTimeData.getStringF('settingsAltPageTitle', this.pageTitle);
    }
    if (!this.searchLabel) {
      return;
    }
    const searchField = this.shadowRoot.querySelector('cr-search-field');
    if (searchField) {
      searchField.setValue('');
    }
    if (this.active_) {
      this.becomeActiveFindShortcutListener();
    } else {
      this.removeSelfAsFindShortcutListener();
    }
  }
  onClearSubpageSearch_(e) {
    e.stopPropagation();
    this.shadowRoot.querySelector('cr-search-field').setValue('');
  }
  onBackClick_() {
    Router.getInstance().navigateToPreviousRoute();
  }
  onHelpClick_() {
    window.open(this.learnMoreUrl);
  }
  onSearchChanged_(e) {
    if (this.searchTerm === e.detail) {
      return;
    }
    this.searchTerm = e.detail;
    if (this.preserveSearchTerm && this.active_) {
      this.preserveSearchInput_();
    }
  }
  getBackButtonAriaLabel_() {
    return this.i18n('subpageBackButtonAriaLabel', this.pageTitle);
  }
  getBackButtonAriaRoleDescription_() {
    return this.i18n('subpageBackButtonAriaRoleDescription', this.pageTitle);
  }
  getLearnMoreAriaLabel_() {
    return this.i18n('subpageLearnMoreAriaLabel', this.pageTitle);
  }
  handleFindShortcut(modalContextOpen) {
    if (modalContextOpen) {
      return false;
    }
    this.shadowRoot.querySelector('cr-search-field').getSearchInput().focus();
    return true;
  }
  searchInputHasFocus() {
    const field = this.shadowRoot.querySelector('cr-search-field');
    return field.getSearchInput() === field.shadowRoot.activeElement;
  }
  static get template() {
    return getTemplate$t();
  }
}
customElements.define(SettingsSubpageElement.is, SettingsSubpageElement);
function getTemplate$s() {
  return html`<!--_html_template_start_--><style include="md-select">
      :host {
        align-items: center;
        display: inline-flex;
      }
      cr-policy-pref-indicator {
        height: var(--iron-icon-width, 24px);
        margin: 0 var(--cr-controlled-by-spacing);
        order: var(--settings-dropdown-menu-policy-order, 0);
        width: var(--iron-icon-width, 24px);
      }
      option:disabled {
        display: none;
      }
    </style>
    <template is="dom-if" if="[[pref.controlledBy]]" restamp>
      <cr-policy-pref-indicator pref="[[pref]]"></cr-policy-pref-indicator>
    </template>
    <select
      class="md-select"
      id="dropdownMenu"
      on-change="onChange_"
      aria-label$="[[label]]"
      disabled="[[shouldDisableMenu_(disabled, menuOptions.*, pref.*)]]"
    >
      <template is="dom-repeat" items="[[menuOptions]]">
        <option value="[[item.value]]">[[item.name]]</option>
      </template>
      <option value="[[notFoundValue]]" disabled="[[!showNotFoundValue_(menuOptions, pref.value)]]">鑷畾涔�</option>
    </select>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
const SettingsDropdownMenuElementBase = CrPolicyPrefMixin(PrefControlMixin(PolymerElement));
class SettingsDropdownMenuElement extends SettingsDropdownMenuElementBase {
  static get is() {
    return 'settings-dropdown-menu';
  }
  static get template() {
    return getTemplate$s();
  }
  static get properties() {
    return {
      menuOptions: Array,
      disabled: { type: Boolean, reflectToAttribute: true, value: false },
      prefKey: { type: String, value: null },
      notFoundValue: { type: String, value: 'SETTINGS_DROPDOWN_NOT_FOUND_ITEM', readOnly: true },
      label: String,
    };
  }
  static get observers() {
    return ['updateSelected_(menuOptions, pref.value.*, prefKey)'];
  }
  focus() {
    this.$.dropdownMenu.focus();
  }
  onChange_() {
    const selected = this.$.dropdownMenu.value;
    if (selected === this.notFoundValue) {
      return;
    }
    assert(this.pref);
    if (this.prefKey) {
      this.set(`pref.value.${this.prefKey}`, selected);
    } else {
      const prefValue = stringToPrefValue(selected, this.pref);
      if (prefValue !== undefined) {
        this.set('pref.value', prefValue);
      }
    }
    this.dispatchEvent(new CustomEvent('settings-control-change', { bubbles: true, composed: true }));
  }
  updateSelected_() {
    if (this.menuOptions === undefined || this.pref === undefined || this.prefKey === undefined) {
      return;
    }
    if (!this.menuOptions.length) {
      return;
    }
    const prefValue = this.prefStringValue_();
    const option = this.menuOptions.find(function (menuItem) {
      return menuItem.value.toString() === prefValue;
    });
    microTask.run(() => {
      this.$.dropdownMenu.value = option === undefined ? this.notFoundValue : prefValue;
    });
  }
  prefStringValue_() {
    if (this.prefKey) {
      return this.pref.value[this.prefKey];
    } else {
      assert(this.pref);
      return prefToString(this.pref);
    }
  }
  showNotFoundValue_(menuOptions, prefValue) {
    if (menuOptions === undefined || prefValue === undefined) {
      return false;
    }
    if (menuOptions === null || menuOptions.length === 0) {
      return false;
    }
    const option = menuOptions.find((menuItem) => menuItem.value.toString() === this.prefStringValue_());
    return !option;
  }
  shouldDisableMenu_() {
    return this.disabled || this.isPrefEnforced() || this.menuOptions === undefined || this.menuOptions.length === 0;
  }
}
customElements.define(SettingsDropdownMenuElement.is, SettingsDropdownMenuElement);
// Copyright 2015 The Chromium Authors
const PrefsMixin = dedupingMixin((superClass) => {
  class PrefsMixin extends superClass {
    static get properties() {
      return { prefs: { type: Object, notify: true } };
    }
    getPref(prefPath) {
      const pref = this.get(prefPath, this.prefs);
      assert(typeof pref !== 'undefined', 'Pref is missing: ' + prefPath);
      return pref;
    }
    setPrefValue(prefPath, value) {
      this.getPref(prefPath);
      this.set('prefs.' + prefPath + '.value', value);
    }
    appendPrefListItem(key, item) {
      const pref = this.getPref(key);
      assert(pref && pref.type === chrome.settingsPrivate.PrefType.LIST);
      if (pref.value.indexOf(item) === -1) {
        this.push('prefs.' + key + '.value', item);
      }
    }
    updatePrefListItem(key, item, newItem) {
      const pref = this.getPref(key);
      assert(pref && pref.type === chrome.settingsPrivate.PrefType.LIST);
      const index = pref.value.indexOf(item);
      if (index !== -1) {
        this.set(`prefs.${key}.value.${index}`, newItem);
      }
    }
    deletePrefListItem(key, item) {
      assert(this.getPref(key).type === chrome.settingsPrivate.PrefType.LIST);
      const index = this.getPref(key).value.indexOf(item);
      if (index !== -1) {
        this.splice(`prefs.${key}.value`, index, 1);
      }
    }
  }
  return PrefsMixin;
});
// Copyright 2021 The Chromium Authors
const BaseMixin = dedupingMixin((superClass) => {
  class BaseMixin extends superClass {
    $$(query) {
      return this.shadowRoot.querySelector(query);
    }
    fire(eventName, detail) {
      this.dispatchEvent(new CustomEvent(eventName, { bubbles: true, composed: true, detail: detail }));
    }
  }
  return BaseMixin;
});
// Copyright 2019 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var PrivacyElementInteractions;
(function (PrivacyElementInteractions) {
  PrivacyElementInteractions[(PrivacyElementInteractions['SYNC_AND_GOOGLE_SERVICES'] = 0)] = 'SYNC_AND_GOOGLE_SERVICES';
  PrivacyElementInteractions[(PrivacyElementInteractions['CHROME_SIGN_IN'] = 1)] = 'CHROME_SIGN_IN';
  PrivacyElementInteractions[(PrivacyElementInteractions['DO_NOT_TRACK'] = 2)] = 'DO_NOT_TRACK';
  PrivacyElementInteractions[(PrivacyElementInteractions['PAYMENT_METHOD'] = 3)] = 'PAYMENT_METHOD';
  PrivacyElementInteractions[(PrivacyElementInteractions['NETWORK_PREDICTION'] = 4)] = 'NETWORK_PREDICTION';
  PrivacyElementInteractions[(PrivacyElementInteractions['MANAGE_CERTIFICATES'] = 5)] = 'MANAGE_CERTIFICATES';
  PrivacyElementInteractions[(PrivacyElementInteractions['SAFE_BROWSING'] = 6)] = 'SAFE_BROWSING';
  PrivacyElementInteractions[(PrivacyElementInteractions['PASSWORD_CHECK'] = 7)] = 'PASSWORD_CHECK';
  PrivacyElementInteractions[(PrivacyElementInteractions['IMPROVE_SECURITY'] = 8)] = 'IMPROVE_SECURITY';
  PrivacyElementInteractions[(PrivacyElementInteractions['COOKIES_ALL'] = 9)] = 'COOKIES_ALL';
  PrivacyElementInteractions[(PrivacyElementInteractions['COOKIES_INCOGNITO'] = 10)] = 'COOKIES_INCOGNITO';
  PrivacyElementInteractions[(PrivacyElementInteractions['COOKIES_THIRD'] = 11)] = 'COOKIES_THIRD';
  PrivacyElementInteractions[(PrivacyElementInteractions['COOKIES_BLOCK'] = 12)] = 'COOKIES_BLOCK';
  PrivacyElementInteractions[(PrivacyElementInteractions['COOKIES_SESSION'] = 13)] = 'COOKIES_SESSION';
  PrivacyElementInteractions[(PrivacyElementInteractions['SITE_DATA_REMOVE_ALL'] = 14)] = 'SITE_DATA_REMOVE_ALL';
  PrivacyElementInteractions[(PrivacyElementInteractions['SITE_DATA_REMOVE_FILTERED'] = 15)] =
    'SITE_DATA_REMOVE_FILTERED';
  PrivacyElementInteractions[(PrivacyElementInteractions['SITE_DATA_REMOVE_SITE'] = 16)] = 'SITE_DATA_REMOVE_SITE';
  PrivacyElementInteractions[(PrivacyElementInteractions['COOKIE_DETAILS_REMOVE_ALL'] = 17)] =
    'COOKIE_DETAILS_REMOVE_ALL';
  PrivacyElementInteractions[(PrivacyElementInteractions['COOKIE_DETAILS_REMOVE_ITEM'] = 18)] =
    'COOKIE_DETAILS_REMOVE_ITEM';
  PrivacyElementInteractions[(PrivacyElementInteractions['SITE_DETAILS_CLEAR_DATA'] = 19)] = 'SITE_DETAILS_CLEAR_DATA';
  PrivacyElementInteractions[(PrivacyElementInteractions['THIRD_PARTY_COOKIES_ALLOW'] = 20)] =
    'THIRD_PARTY_COOKIES_ALLOW';
  PrivacyElementInteractions[(PrivacyElementInteractions['THIRD_PARTY_COOKIES_BLOCK_IN_INCOGNITO'] = 21)] =
    'THIRD_PARTY_COOKIES_BLOCK_IN_INCOGNITO';
  PrivacyElementInteractions[(PrivacyElementInteractions['THIRD_PARTY_COOKIES_BLOCK'] = 22)] =
    'THIRD_PARTY_COOKIES_BLOCK';
  PrivacyElementInteractions[(PrivacyElementInteractions['MAX_VALUE'] = 23)] = 'MAX_VALUE';
})(PrivacyElementInteractions || (PrivacyElementInteractions = {}));
var SafetyCheckInteractions;
(function (SafetyCheckInteractions) {
  SafetyCheckInteractions[(SafetyCheckInteractions['RUN_SAFETY_CHECK'] = 0)] = 'RUN_SAFETY_CHECK';
  SafetyCheckInteractions[(SafetyCheckInteractions['UPDATES_RELAUNCH'] = 1)] = 'UPDATES_RELAUNCH';
  SafetyCheckInteractions[(SafetyCheckInteractions['PASSWORDS_MANAGE_COMPROMISED_PASSWORDS'] = 2)] =
    'PASSWORDS_MANAGE_COMPROMISED_PASSWORDS';
  SafetyCheckInteractions[(SafetyCheckInteractions['SAFE_BROWSING_MANAGE'] = 3)] = 'SAFE_BROWSING_MANAGE';
  SafetyCheckInteractions[(SafetyCheckInteractions['EXTENSIONS_REVIEW'] = 4)] = 'EXTENSIONS_REVIEW';
  SafetyCheckInteractions[(SafetyCheckInteractions['CHROME_CLEANER_REBOOT'] = 5)] = 'CHROME_CLEANER_REBOOT';
  SafetyCheckInteractions[(SafetyCheckInteractions['CHROME_CLEANER_REVIEW_INFECTED_STATE'] = 6)] =
    'CHROME_CLEANER_REVIEW_INFECTED_STATE';
  SafetyCheckInteractions[(SafetyCheckInteractions['PASSWORDS_CARET_NAVIGATION'] = 7)] = 'PASSWORDS_CARET_NAVIGATION';
  SafetyCheckInteractions[(SafetyCheckInteractions['SAFE_BROWSING_CARET_NAVIGATION'] = 8)] =
    'SAFE_BROWSING_CARET_NAVIGATION';
  SafetyCheckInteractions[(SafetyCheckInteractions['EXTENSIONS_CARET_NAVIGATION'] = 9)] = 'EXTENSIONS_CARET_NAVIGATION';
  SafetyCheckInteractions[(SafetyCheckInteractions['CHROME_CLEANER_CARET_NAVIGATION'] = 10)] =
    'CHROME_CLEANER_CARET_NAVIGATION';
  SafetyCheckInteractions[(SafetyCheckInteractions['PASSWORDS_MANAGE_WEAK_PASSWORDS'] = 11)] =
    'PASSWORDS_MANAGE_WEAK_PASSWORDS';
  SafetyCheckInteractions[(SafetyCheckInteractions['UNUSED_SITE_PERMISSIONS_REVIEW'] = 12)] =
    'UNUSED_SITE_PERMISSIONS_REVIEW';
  SafetyCheckInteractions[(SafetyCheckInteractions['MAX_VALUE'] = 13)] = 'MAX_VALUE';
})(SafetyCheckInteractions || (SafetyCheckInteractions = {}));
var SafetyCheckNotificationsModuleInteractions;
(function (SafetyCheckNotificationsModuleInteractions) {
  SafetyCheckNotificationsModuleInteractions[(SafetyCheckNotificationsModuleInteractions['BLOCK'] = 0)] = 'BLOCK';
  SafetyCheckNotificationsModuleInteractions[(SafetyCheckNotificationsModuleInteractions['BLOCK_ALL'] = 1)] =
    'BLOCK_ALL';
  SafetyCheckNotificationsModuleInteractions[(SafetyCheckNotificationsModuleInteractions['IGNORE'] = 2)] = 'IGNORE';
  SafetyCheckNotificationsModuleInteractions[(SafetyCheckNotificationsModuleInteractions['MINIMIZE'] = 3)] = 'MINIMIZE';
  SafetyCheckNotificationsModuleInteractions[(SafetyCheckNotificationsModuleInteractions['RESET'] = 4)] = 'RESET';
  SafetyCheckNotificationsModuleInteractions[(SafetyCheckNotificationsModuleInteractions['UNDO_BLOCK'] = 5)] =
    'UNDO_BLOCK';
  SafetyCheckNotificationsModuleInteractions[(SafetyCheckNotificationsModuleInteractions['UNDO_IGNORE'] = 6)] =
    'UNDO_IGNORE';
  SafetyCheckNotificationsModuleInteractions[(SafetyCheckNotificationsModuleInteractions['UNDO_RESET'] = 7)] =
    'UNDO_RESET';
  SafetyCheckNotificationsModuleInteractions[(SafetyCheckNotificationsModuleInteractions['OPEN_REVIEW_UI'] = 8)] =
    'OPEN_REVIEW_UI';
  SafetyCheckNotificationsModuleInteractions[(SafetyCheckNotificationsModuleInteractions['MAX_VALUE'] = 9)] =
    'MAX_VALUE';
})(SafetyCheckNotificationsModuleInteractions || (SafetyCheckNotificationsModuleInteractions = {}));
var SafetyCheckUnusedSitePermissionsModuleInteractions;
(function (SafetyCheckUnusedSitePermissionsModuleInteractions) {
  SafetyCheckUnusedSitePermissionsModuleInteractions[
    (SafetyCheckUnusedSitePermissionsModuleInteractions['OPEN_REVIEW_UI'] = 0)
  ] = 'OPEN_REVIEW_UI';
  SafetyCheckUnusedSitePermissionsModuleInteractions[
    (SafetyCheckUnusedSitePermissionsModuleInteractions['ALLOW_AGAIN'] = 1)
  ] = 'ALLOW_AGAIN';
  SafetyCheckUnusedSitePermissionsModuleInteractions[
    (SafetyCheckUnusedSitePermissionsModuleInteractions['ACKNOWLEDGE_ALL'] = 2)
  ] = 'ACKNOWLEDGE_ALL';
  SafetyCheckUnusedSitePermissionsModuleInteractions[
    (SafetyCheckUnusedSitePermissionsModuleInteractions['UNDO_ALLOW_AGAIN'] = 3)
  ] = 'UNDO_ALLOW_AGAIN';
  SafetyCheckUnusedSitePermissionsModuleInteractions[
    (SafetyCheckUnusedSitePermissionsModuleInteractions['UNDO_ACKNOWLEDGE_ALL'] = 4)
  ] = 'UNDO_ACKNOWLEDGE_ALL';
  SafetyCheckUnusedSitePermissionsModuleInteractions[
    (SafetyCheckUnusedSitePermissionsModuleInteractions['MINIMIZE'] = 5)
  ] = 'MINIMIZE';
  SafetyCheckUnusedSitePermissionsModuleInteractions[
    (SafetyCheckUnusedSitePermissionsModuleInteractions['MAX_VALUE'] = 6)
  ] = 'MAX_VALUE';
})(SafetyCheckUnusedSitePermissionsModuleInteractions || (SafetyCheckUnusedSitePermissionsModuleInteractions = {}));
var SafeBrowsingInteractions;
(function (SafeBrowsingInteractions) {
  SafeBrowsingInteractions[(SafeBrowsingInteractions['SAFE_BROWSING_SHOWED'] = 0)] = 'SAFE_BROWSING_SHOWED';
  SafeBrowsingInteractions[(SafeBrowsingInteractions['SAFE_BROWSING_ENHANCED_PROTECTION_CLICKED'] = 1)] =
    'SAFE_BROWSING_ENHANCED_PROTECTION_CLICKED';
  SafeBrowsingInteractions[(SafeBrowsingInteractions['SAFE_BROWSING_STANDARD_PROTECTION_CLICKED'] = 2)] =
    'SAFE_BROWSING_STANDARD_PROTECTION_CLICKED';
  SafeBrowsingInteractions[(SafeBrowsingInteractions['SAFE_BROWSING_DISABLE_SAFE_BROWSING_CLICKED'] = 3)] =
    'SAFE_BROWSING_DISABLE_SAFE_BROWSING_CLICKED';
  SafeBrowsingInteractions[(SafeBrowsingInteractions['SAFE_BROWSING_ENHANCED_PROTECTION_EXPAND_ARROW_CLICKED'] = 4)] =
    'SAFE_BROWSING_ENHANCED_PROTECTION_EXPAND_ARROW_CLICKED';
  SafeBrowsingInteractions[(SafeBrowsingInteractions['SAFE_BROWSING_STANDARD_PROTECTION_EXPAND_ARROW_CLICKED'] = 5)] =
    'SAFE_BROWSING_STANDARD_PROTECTION_EXPAND_ARROW_CLICKED';
  SafeBrowsingInteractions[(SafeBrowsingInteractions['SAFE_BROWSING_DISABLE_SAFE_BROWSING_DIALOG_CONFIRMED'] = 6)] =
    'SAFE_BROWSING_DISABLE_SAFE_BROWSING_DIALOG_CONFIRMED';
  SafeBrowsingInteractions[(SafeBrowsingInteractions['SAFE_BROWSING_DISABLE_SAFE_BROWSING_DIALOG_DENIED'] = 7)] =
    'SAFE_BROWSING_DISABLE_SAFE_BROWSING_DIALOG_DENIED';
  SafeBrowsingInteractions[(SafeBrowsingInteractions['MAX_VALUE'] = 8)] = 'MAX_VALUE';
})(SafeBrowsingInteractions || (SafeBrowsingInteractions = {}));
var PrivacyGuideInteractions;
(function (PrivacyGuideInteractions) {
  PrivacyGuideInteractions[(PrivacyGuideInteractions['WELCOME_NEXT_BUTTON'] = 0)] = 'WELCOME_NEXT_BUTTON';
  PrivacyGuideInteractions[(PrivacyGuideInteractions['MSBB_NEXT_BUTTON'] = 1)] = 'MSBB_NEXT_BUTTON';
  PrivacyGuideInteractions[(PrivacyGuideInteractions['HISTORY_SYNC_NEXT_BUTTON'] = 2)] = 'HISTORY_SYNC_NEXT_BUTTON';
  PrivacyGuideInteractions[(PrivacyGuideInteractions['SAFE_BROWSING_NEXT_BUTTON'] = 3)] = 'SAFE_BROWSING_NEXT_BUTTON';
  PrivacyGuideInteractions[(PrivacyGuideInteractions['COOKIES_NEXT_BUTTON'] = 4)] = 'COOKIES_NEXT_BUTTON';
  PrivacyGuideInteractions[(PrivacyGuideInteractions['COMPLETION_NEXT_BUTTON'] = 5)] = 'COMPLETION_NEXT_BUTTON';
  PrivacyGuideInteractions[(PrivacyGuideInteractions['SETTINGS_LINK_ROW_ENTRY'] = 6)] = 'SETTINGS_LINK_ROW_ENTRY';
  PrivacyGuideInteractions[(PrivacyGuideInteractions['PROMO_ENTRY'] = 7)] = 'PROMO_ENTRY';
  PrivacyGuideInteractions[(PrivacyGuideInteractions['SWAA_COMPLETION_LINK'] = 8)] = 'SWAA_COMPLETION_LINK';
  PrivacyGuideInteractions[(PrivacyGuideInteractions['PRIVACY_SANDBOX_COMPLETION_LINK'] = 9)] =
    'PRIVACY_SANDBOX_COMPLETION_LINK';
  PrivacyGuideInteractions[(PrivacyGuideInteractions['MAX_VALUE'] = 10)] = 'MAX_VALUE';
})(PrivacyGuideInteractions || (PrivacyGuideInteractions = {}));
var PrivacyGuideSettingsStates;
(function (PrivacyGuideSettingsStates) {
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['MSBB_ON_TO_ON'] = 0)] = 'MSBB_ON_TO_ON';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['MSBB_ON_TO_OFF'] = 1)] = 'MSBB_ON_TO_OFF';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['MSBB_OFF_TO_ON'] = 2)] = 'MSBB_OFF_TO_ON';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['MSBB_OFF_TO_OFF'] = 3)] = 'MSBB_OFF_TO_OFF';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['BLOCK_3P_INCOGNITO_TO_3P_INCOGNITO'] = 4)] =
    'BLOCK_3P_INCOGNITO_TO_3P_INCOGNITO';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['BLOCK_3P_INCOGNITO_TO_3P'] = 5)] = 'BLOCK_3P_INCOGNITO_TO_3P';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['BLOCK_3P_TO_3P_INCOGNITO'] = 6)] = 'BLOCK_3P_TO_3P_INCOGNITO';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['BLOCK_3P_TO_3P'] = 7)] = 'BLOCK_3P_TO_3P';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['HISTORY_SYNC_ON_TO_ON'] = 8)] = 'HISTORY_SYNC_ON_TO_ON';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['HISTORY_SYNC_ON_TO_OFF'] = 9)] = 'HISTORY_SYNC_ON_TO_OFF';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['HISTORY_SYNC_OFF_TO_ON'] = 10)] = 'HISTORY_SYNC_OFF_TO_ON';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['HISTORY_SYNC_OFF_TO_OFF'] = 11)] = 'HISTORY_SYNC_OFF_TO_OFF';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['SAFE_BROWSING_ENHANCED_TO_ENHANCED'] = 12)] =
    'SAFE_BROWSING_ENHANCED_TO_ENHANCED';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['SAFE_BROWSING_ENHANCED_TO_STANDARD'] = 13)] =
    'SAFE_BROWSING_ENHANCED_TO_STANDARD';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['SAFE_BROWSING_STANDARD_TO_ENHANCED'] = 14)] =
    'SAFE_BROWSING_STANDARD_TO_ENHANCED';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['SAFE_BROWSING_STANDARD_TO_STANDARD'] = 15)] =
    'SAFE_BROWSING_STANDARD_TO_STANDARD';
  PrivacyGuideSettingsStates[(PrivacyGuideSettingsStates['MAX_VALUE'] = 16)] = 'MAX_VALUE';
})(PrivacyGuideSettingsStates || (PrivacyGuideSettingsStates = {}));
var PrivacyGuideStepsEligibleAndReached;
(function (PrivacyGuideStepsEligibleAndReached) {
  PrivacyGuideStepsEligibleAndReached[(PrivacyGuideStepsEligibleAndReached['MSBB_ELIGIBLE'] = 0)] = 'MSBB_ELIGIBLE';
  PrivacyGuideStepsEligibleAndReached[(PrivacyGuideStepsEligibleAndReached['MSBB_REACHED'] = 1)] = 'MSBB_REACHED';
  PrivacyGuideStepsEligibleAndReached[(PrivacyGuideStepsEligibleAndReached['HISTORY_SYNC_ELIGIBLE'] = 2)] =
    'HISTORY_SYNC_ELIGIBLE';
  PrivacyGuideStepsEligibleAndReached[(PrivacyGuideStepsEligibleAndReached['HISTORY_SYNC_REACHED'] = 3)] =
    'HISTORY_SYNC_REACHED';
  PrivacyGuideStepsEligibleAndReached[(PrivacyGuideStepsEligibleAndReached['SAFE_BROWSING_ELIGIBLE'] = 4)] =
    'SAFE_BROWSING_ELIGIBLE';
  PrivacyGuideStepsEligibleAndReached[(PrivacyGuideStepsEligibleAndReached['SAFE_BROWSING_REACHED'] = 5)] =
    'SAFE_BROWSING_REACHED';
  PrivacyGuideStepsEligibleAndReached[(PrivacyGuideStepsEligibleAndReached['COOKIES_ELIGIBLE'] = 6)] =
    'COOKIES_ELIGIBLE';
  PrivacyGuideStepsEligibleAndReached[(PrivacyGuideStepsEligibleAndReached['COOKIES_REACHED'] = 7)] = 'COOKIES_REACHED';
  PrivacyGuideStepsEligibleAndReached[(PrivacyGuideStepsEligibleAndReached['COMPLETION_ELIGIBLE'] = 8)] =
    'COMPLETION_ELIGIBLE';
  PrivacyGuideStepsEligibleAndReached[(PrivacyGuideStepsEligibleAndReached['COMPLETION_REACHED'] = 9)] =
    'COMPLETION_REACHED';
  PrivacyGuideStepsEligibleAndReached[(PrivacyGuideStepsEligibleAndReached['COUNT'] = 10)] = 'COUNT';
})(PrivacyGuideStepsEligibleAndReached || (PrivacyGuideStepsEligibleAndReached = {}));
var DeleteBrowsingDataAction;
(function (DeleteBrowsingDataAction) {
  DeleteBrowsingDataAction[(DeleteBrowsingDataAction['CLEAR_BROWSING_DATA_DIALOG'] = 0)] = 'CLEAR_BROWSING_DATA_DIALOG';
  DeleteBrowsingDataAction[(DeleteBrowsingDataAction['CLEAR_BROWSING_DATA_ON_EXIT'] = 1)] =
    'CLEAR_BROWSING_DATA_ON_EXIT';
  DeleteBrowsingDataAction[(DeleteBrowsingDataAction['INCOGNITO_CLOSE_TABS'] = 2)] = 'INCOGNITO_CLOSE_TABS';
  DeleteBrowsingDataAction[(DeleteBrowsingDataAction['COOKIES_IN_USE_DIALOG'] = 3)] = 'COOKIES_IN_USE_DIALOG';
  DeleteBrowsingDataAction[(DeleteBrowsingDataAction['SITES_SETTINGS_PAGE'] = 4)] = 'SITES_SETTINGS_PAGE';
  DeleteBrowsingDataAction[(DeleteBrowsingDataAction['HISTORY_PAGE_ENTRIES'] = 5)] = 'HISTORY_PAGE_ENTRIES';
  DeleteBrowsingDataAction[(DeleteBrowsingDataAction['QUICK_DELETE_LAST_15MINUTES'] = 6)] =
    'QUICK_DELETE_LAST_15MINUTES';
  DeleteBrowsingDataAction[(DeleteBrowsingDataAction['PAGE_INFO_RESET_PERMISSIONS'] = 7)] =
    'PAGE_INFO_RESET_PERMISSIONS';
  DeleteBrowsingDataAction[(DeleteBrowsingDataAction['MAX_VALUE'] = 8)] = 'MAX_VALUE';
})(DeleteBrowsingDataAction || (DeleteBrowsingDataAction = {}));
class MetricsBrowserProxyImpl {
  recordAction(action) {
    chrome.send('metricsHandler:recordAction', [action]);
  }
  recordSafetyCheckInteractionHistogram(interaction) {
    chrome.send('metricsHandler:recordInHistogram', [
      'Settings.SafetyCheck.Interactions',
      interaction,
      SafetyCheckInteractions.MAX_VALUE,
    ]);
  }
  recordSafetyCheckNotificationsListCountHistogram(suggestions) {
    chrome.send('metricsHandler:recordInHistogram', ['Settings.SafetyCheck.NotificationsListCount', suggestions, 99]);
  }
  recordSafetyCheckNotificationsModuleInteractionsHistogram(interaction) {
    chrome.send('metricsHandler:recordInHistogram', [
      'Settings.SafetyCheck.NotificationsModuleInteractions',
      interaction,
      SafetyCheckNotificationsModuleInteractions.MAX_VALUE,
    ]);
  }
  recordSafetyCheckNotificationsModuleEntryPointShown(visible) {
    chrome.send('metricsHandler:recordBooleanHistogram', [
      'Settings.SafetyCheck.NotificationsModuleEntryPointShown',
      visible,
    ]);
  }
  recordSafetyCheckUnusedSitePermissionsListCountHistogram(suggestions) {
    chrome.send('metricsHandler:recordInHistogram', [
      'Settings.SafetyCheck.UnusedSitePermissionsListCount',
      suggestions,
      99,
    ]);
  }
  recordSafetyCheckUnusedSitePermissionsModuleInteractionsHistogram(interaction) {
    chrome.send('metricsHandler:recordInHistogram', [
      'Settings.SafetyCheck.UnusedSitePermissionsModuleInteractions',
      interaction,
      SafetyCheckUnusedSitePermissionsModuleInteractions.MAX_VALUE,
    ]);
  }
  recordSafetyCheckUnusedSitePermissionsModuleEntryPointShown(visible) {
    chrome.send('metricsHandler:recordBooleanHistogram', [
      'Settings.SafetyCheck.UnusedSitePermissionsModuleEntryPointShown',
      visible,
    ]);
  }
  recordSettingsPageHistogram(interaction) {
    chrome.send('metricsHandler:recordInHistogram', [
      'Settings.PrivacyElementInteractions',
      interaction,
      PrivacyElementInteractions.MAX_VALUE,
    ]);
  }
  recordSafeBrowsingInteractionHistogram(interaction) {
    chrome.send('metricsHandler:recordInHistogram', [
      'SafeBrowsing.Settings.UserAction.Default',
      interaction,
      SafeBrowsingInteractions.MAX_VALUE,
    ]);
  }
  recordPrivacyGuideNextNavigationHistogram(interaction) {
    chrome.send('metricsHandler:recordInHistogram', [
      'Settings.PrivacyGuide.NextNavigation',
      interaction,
      PrivacyGuideInteractions.MAX_VALUE,
    ]);
  }
  recordPrivacyGuideEntryExitHistogram(interaction) {
    chrome.send('metricsHandler:recordInHistogram', [
      'Settings.PrivacyGuide.EntryExit',
      interaction,
      PrivacyGuideInteractions.MAX_VALUE,
    ]);
  }
  recordPrivacyGuideSettingsStatesHistogram(state) {
    chrome.send('metricsHandler:recordInHistogram', [
      'Settings.PrivacyGuide.SettingsStates',
      state,
      PrivacyGuideSettingsStates.MAX_VALUE,
    ]);
  }
  recordPrivacyGuideFlowLengthHistogram(steps) {
    chrome.send('metricsHandler:recordInHistogram', ['Settings.PrivacyGuide.FlowLength', steps, 5]);
  }
  recordPrivacyGuideStepsEligibleAndReachedHistogram(status) {
    chrome.send('metricsHandler:recordInHistogram', [
      'Settings.PrivacyGuide.StepsEligibleAndReached',
      status,
      PrivacyGuideStepsEligibleAndReached.COUNT,
    ]);
  }
  recordDeleteBrowsingDataAction(action) {
    chrome.send('metricsHandler:recordInHistogram', [
      'Privacy.DeleteBrowsingData.Action',
      action,
      DeleteBrowsingDataAction.MAX_VALUE,
    ]);
  }
  static getInstance() {
    return instance$d || (instance$d = new MetricsBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$d = obj;
  }
}
let instance$d = null;
function getTemplate$r() {
  return html`<!--_html_template_start_-->
    <style include="cr-actionable-row-style">
      :host([disabled]) {
        opacity: 0.65;
        pointer-events: none;
      }
      :host([disabled]) cr-icon-button {
        display: var(--cr-expand-button-disabled-display, initial);
      }
      #label {
        flex: 1;
        padding: var(--cr-section-vertical-padding) 0;
      }
      cr-icon-button {
        --cr-icon-button-icon-size: var(--cr-expand-button-icon-size, 20px);
        --cr-icon-button-size: var(--cr-expand-button-size, 36px);
      }
    </style>

    <div id="label" aria-hidden="true"><slot></slot></div>
    <cr-icon-button
      id="icon"
      aria-labelledby="label"
      disabled="[[disabled]]"
      tabindex="[[tabIndex]]"
      part="icon"
    ></cr-icon-button>
    <!--_html_template_end_-->`;
}
// Copyright 2015 The Chromium Authors
class CrExpandButtonElement extends PolymerElement {
  static get is() {
    return 'cr-expand-button';
  }
  static get template() {
    return getTemplate$r();
  }
  static get properties() {
    return {
      expanded: { type: Boolean, value: false, notify: true, observer: 'onExpandedChange_' },
      disabled: { type: Boolean, value: false, reflectToAttribute: true },
      ariaLabel: { type: String, observer: 'onAriaLabelChange_' },
      tabIndex: { type: Number, value: 0 },
      expandIcon: { type: String, value: 'cr:expand-more', observer: 'onIconChange_' },
      collapseIcon: { type: String, value: 'cr:expand-less', observer: 'onIconChange_' },
      expandTitle: String,
      collapseTitle: String,
      tooltipText_: {
        type: String,
        computed: 'computeTooltipText_(expandTitle, collapseTitle, expanded)',
        observer: 'onTooltipTextChange_',
      },
    };
  }
  static get observers() {
    return ['updateAriaExpanded_(disabled, expanded)'];
  }
  ready() {
    super.ready();
    this.addEventListener('click', this.toggleExpand_);
  }
  computeTooltipText_() {
    return this.expanded ? this.collapseTitle : this.expandTitle;
  }
  onTooltipTextChange_() {
    this.title = this.tooltipText_;
  }
  focus() {
    this.$.icon.focus();
  }
  onAriaLabelChange_() {
    if (this.ariaLabel) {
      this.$.icon.removeAttribute('aria-labelledby');
      this.$.icon.setAttribute('aria-label', this.ariaLabel);
    } else {
      this.$.icon.removeAttribute('aria-label');
      this.$.icon.setAttribute('aria-labelledby', 'label');
    }
  }
  onExpandedChange_() {
    this.updateIcon_();
  }
  onIconChange_() {
    this.updateIcon_();
  }
  updateIcon_() {
    this.$.icon.ironIcon = this.expanded ? this.collapseIcon : this.expandIcon;
  }
  toggleExpand_(event) {
    event.stopPropagation();
    event.preventDefault();
    this.scrollIntoViewIfNeeded();
    this.expanded = !this.expanded;
    focusWithoutInk(this.$.icon);
  }
  updateAriaExpanded_() {
    if (this.disabled) {
      this.$.icon.removeAttribute('aria-expanded');
    } else {
      this.$.icon.setAttribute('aria-expanded', this.expanded ? 'true' : 'false');
    }
  }
}
customElements.define(CrExpandButtonElement.is, CrExpandButtonElement);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        transition-duration: var(--iron-collapse-transition-duration, 300ms);
        /* Safari 10 needs this property prefixed to correctly apply the custom property */
        overflow: visible;
      }

      :host(.iron-collapse-closed) {
        display: none;
      }

      :host(:not(.iron-collapse-opened)) {
        overflow: hidden;
      }
    </style>

    <slot></slot>
  `,
  is: 'iron-collapse',
  behaviors: [IronResizableBehavior],
  properties: {
    horizontal: { type: Boolean, value: false, observer: '_horizontalChanged' },
    opened: { type: Boolean, value: false, notify: true, observer: '_openedChanged' },
    transitioning: { type: Boolean, notify: true, readOnly: true },
    noAnimation: { type: Boolean },
    _desiredSize: { type: String, value: '' },
  },
  get dimension() {
    return this.horizontal ? 'width' : 'height';
  },
  get _dimensionMax() {
    return this.horizontal ? 'maxWidth' : 'maxHeight';
  },
  get _dimensionMaxCss() {
    return this.horizontal ? 'max-width' : 'max-height';
  },
  hostAttributes: { role: 'group', 'aria-hidden': 'true' },
  listeners: { transitionend: '_onTransitionEnd' },
  toggle: function () {
    this.opened = !this.opened;
  },
  show: function () {
    this.opened = true;
  },
  hide: function () {
    this.opened = false;
  },
  updateSize: function (size, animated) {
    size = size === 'auto' ? '' : size;
    var willAnimate = animated && !this.noAnimation && this.isAttached && this._desiredSize !== size;
    this._desiredSize = size;
    this._updateTransition(false);
    if (willAnimate) {
      var startSize = this._calcSize();
      if (size === '') {
        this.style[this._dimensionMax] = '';
        size = this._calcSize();
      }
      this.style[this._dimensionMax] = startSize;
      this.scrollTop = this.scrollTop;
      this._updateTransition(true);
      willAnimate = size !== startSize;
    }
    this.style[this._dimensionMax] = size;
    if (!willAnimate) {
      this._transitionEnd();
    }
  },
  enableTransition: function (enabled) {
    Base._warn('`enableTransition()` is deprecated, use `noAnimation` instead.');
    this.noAnimation = !enabled;
  },
  _updateTransition: function (enabled) {
    this.style.transitionDuration = enabled && !this.noAnimation ? '' : '0s';
  },
  _horizontalChanged: function () {
    this.style.transitionProperty = this._dimensionMaxCss;
    var otherDimension = this._dimensionMax === 'maxWidth' ? 'maxHeight' : 'maxWidth';
    this.style[otherDimension] = '';
    this.updateSize(this.opened ? 'auto' : '0px', false);
  },
  _openedChanged: function () {
    this.setAttribute('aria-hidden', !this.opened);
    this._setTransitioning(true);
    this.toggleClass('iron-collapse-closed', false);
    this.toggleClass('iron-collapse-opened', false);
    this.updateSize(this.opened ? 'auto' : '0px', true);
    if (this.opened) {
      this.focus();
    }
  },
  _transitionEnd: function () {
    this.style[this._dimensionMax] = this._desiredSize;
    this.toggleClass('iron-collapse-closed', !this.opened);
    this.toggleClass('iron-collapse-opened', this.opened);
    this._updateTransition(false);
    this.notifyResize();
    this._setTransitioning(false);
  },
  _onTransitionEnd: function (event) {
    if (dom(event).rootTarget === this) {
      this._transitionEnd();
    }
  },
  _calcSize: function () {
    return this.getBoundingClientRect()[this.dimension] + 'px';
  },
});
function getTemplate$q() {
  return html`<!--_html_template_start_-->
    <style include="settings-shared cr-radio-button-style">
      :host {
        display: block;
      }
      :host([disabled]) {
        opacity: 1;
      }
      :host([disabled]) cr-expand-button,
      cr-policy-pref-indicator {
        pointer-events: auto;
      }
      :host([disabled]) .disc-wrapper {
        opacity: var(--cr-disabled-opacity);
      }
      iron-collapse {
        margin-inline-end: 0;
        margin-inline-start: calc(var(--cr-radio-button-label-spacing, 20px) + var(--cr-radio-button-size));
      }
      .disc-wrapper {
        margin-inline-end: var(--cr-radio-button-label-spacing, 20px);
      }
      .separator {
        margin-inline-end: 0;
        min-height: calc(var(--settings-collapse-toggle-min-height, 48px) / 2);
      }
      #borderWrapper {
        align-items: center;
        border-top: var(--settings-collapse-separator-line);
        display: flex;
        min-height: var(--settings-collapse-toggle-min-height);
        width: 100%;
      }
      #buttonIcon {
        padding-inline-end: 6px;
      }
      #labelWrapper {
        --cr-radio-button-label-spacing: 0;
      }
      #radioCollapse {
        align-items: center;
        display: flex;
      }
      slot[name='noSelectionCollapse'] {
        cursor: auto;
      }
    </style>
    <div id="radioCollapse">
      <div
        aria-checked$="[[getAriaChecked_(checked)]]"
        aria-disabled$="[[getAriaDisabled_(disabled)]]"
        aria-labelledby="label"
        class="disc-wrapper"
        id="button"
        role="radio"
        tabindex$="[[buttonTabIndex_]]"
        on-focus="onRadioFocus_"
        on-keydown="onInputKeydown_"
      >
        <div class="disc-border"></div>
        <div class="disc"></div>
      </div>
      <div id="borderWrapper">
        <iron-icon id="buttonIcon" icon="[[icon]]" hidden$="[[!icon]]"></iron-icon>
        <div id="labelWrapper" class="cr-padded-text">
          <div id="label" aria-hidden="true">
            [[label]]
            <slot name="label"></slot>
          </div>
          <div hidden$="[[!subLabel]]" class="secondary">
            [[subLabel]]
            <slot name="sub-label"></slot>
          </div>
        </div>
        <template is="dom-if" if="[[pref]]">
          <cr-policy-pref-indicator
            pref="[[pref]]"
            icon-aria-label="[[indicatorAriaLabel]]"
            associated-value="[[name]]"
            on-focus="onNonRadioFocus_"
          >
          </cr-policy-pref-indicator>
        </template>
        <div hidden$="[[noCollapse]]" class="separator"></div>
        <cr-expand-button
          id="expandButton"
          no-hover
          aria-label="[[expandAriaLabel]]"
          hidden$="[[noCollapse]]"
          expanded="{{expanded}}"
          on-click="onExpandClicked_"
          on-focus="onNonRadioFocus_"
        >
        </cr-expand-button>
      </div>
    </div>

    <iron-collapse opened="[[expanded]]">
      <slot name="collapse"></slot>
      <slot name="noSelectionCollapse"></slot>
    </iron-collapse>
    <!--_html_template_end_-->`;
}
// Copyright 2020 The Chromium Authors
const SettingsCollapseRadioButtonElementBase = mixinBehaviors(
  [PaperRippleBehavior],
  CrRadioButtonMixin(PolymerElement)
);
class SettingsCollapseRadioButtonElement extends SettingsCollapseRadioButtonElementBase {
  static get is() {
    return 'settings-collapse-radio-button';
  }
  static get template() {
    return getTemplate$q();
  }
  static get properties() {
    return {
      expanded: { type: Boolean, notify: true, value: false },
      noAutomaticCollapse: { type: Boolean, value: false },
      noCollapse: Boolean,
      label: String,
      indicatorAriaLabel: String,
      icon: { type: String, value: null },
      pref: Object,
      disabled: { type: Boolean, value: false, reflectToAttribute: true },
      subLabel: { type: String, value: '' },
      expandAriaLabel: String,
    };
  }
  static get observers() {
    return ['onCheckedChanged_(checked)', 'onPrefChanged_(pref.*)'];
  }
  constructor() {
    super();
    this.pendingUpdateCollapsed_ = false;
  }
  getPaperRipple() {
    return this.getRipple();
  }
  _createRipple() {
    this._rippleContainer = this.shadowRoot.querySelector('.disc-wrapper');
    const ripple = super._createRipple();
    ripple.id = 'ink';
    ripple.setAttribute('recenters', '');
    ripple.classList.add('circle', 'toggle-ink');
    return ripple;
  }
  updateCollapsed() {
    if (this.pendingUpdateCollapsed_) {
      this.pendingUpdateCollapsed_ = false;
      this.expanded = this.checked;
    }
  }
  getBubbleAnchor() {
    const anchor = this.shadowRoot.querySelector('#button');
    assert(anchor);
    return anchor;
  }
  onCheckedChanged_() {
    this.pendingUpdateCollapsed_ = true;
    if (!this.noAutomaticCollapse) {
      this.updateCollapsed();
    }
  }
  onPrefChanged_() {
    this.disabled =
      !!this.pref &&
      this.pref.enforcement === chrome.settingsPrivate.Enforcement.ENFORCED &&
      !(!!this.pref.userSelectableValues && this.pref.userSelectableValues.includes(this.name));
  }
  onExpandClicked_() {
    this.dispatchEvent(new CustomEvent('expand-clicked', { bubbles: true, composed: true }));
  }
  onRadioFocus_() {
    this.getRipple().showAndHoldDown();
  }
  onNonRadioFocus_(e) {
    this.getRipple().clear();
    e.stopPropagation();
  }
}
customElements.define(SettingsCollapseRadioButtonElement.is, SettingsCollapseRadioButtonElement);
// Copyright 2015 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var ContentSettingsTypes;
(function (ContentSettingsTypes) {
  ContentSettingsTypes['ADS'] = 'ads';
  ContentSettingsTypes['ANTI_ABUSE'] = 'anti-abuse';
  ContentSettingsTypes['AR'] = 'ar';
  ContentSettingsTypes['AUTOMATIC_DOWNLOADS'] = 'multiple-automatic-downloads';
  ContentSettingsTypes['BACKGROUND_SYNC'] = 'background-sync';
  ContentSettingsTypes['BLUETOOTH_DEVICES'] = 'bluetooth-devices';
  ContentSettingsTypes['BLUETOOTH_SCANNING'] = 'bluetooth-scanning';
  ContentSettingsTypes['CAMERA'] = 'media-stream-camera';
  ContentSettingsTypes['CLIPBOARD'] = 'clipboard';
  ContentSettingsTypes['COOKIES'] = 'cookies';
  ContentSettingsTypes['FEDERATED_IDENTITY_API'] = 'federated-identity-api';
  ContentSettingsTypes['FILE_SYSTEM_WRITE'] = 'file-system-write';
  ContentSettingsTypes['GEOLOCATION'] = 'location';
  ContentSettingsTypes['HID_DEVICES'] = 'hid-devices';
  ContentSettingsTypes['IDLE_DETECTION'] = 'idle-detection';
  ContentSettingsTypes['IMAGES'] = 'images';
  ContentSettingsTypes['JAVASCRIPT'] = 'javascript';
  ContentSettingsTypes['LOCAL_FONTS'] = 'local-fonts';
  ContentSettingsTypes['MIC'] = 'media-stream-mic';
  ContentSettingsTypes['MIDI_DEVICES'] = 'midi-sysex';
  ContentSettingsTypes['MIXEDSCRIPT'] = 'mixed-script';
  ContentSettingsTypes['NOTIFICATIONS'] = 'notifications';
  ContentSettingsTypes['PAYMENT_HANDLER'] = 'payment-handler';
  ContentSettingsTypes['POPUPS'] = 'popups';
  ContentSettingsTypes['PRIVATE_NETWORK_DEVICES'] = 'private-network-devices';
  ContentSettingsTypes['PROTECTED_CONTENT'] = 'protected-content';
  ContentSettingsTypes['PROTOCOL_HANDLERS'] = 'register-protocol-handler';
  ContentSettingsTypes['SENSORS'] = 'sensors';
  ContentSettingsTypes['SERIAL_PORTS'] = 'serial-ports';
  ContentSettingsTypes['SOUND'] = 'sound';
  ContentSettingsTypes['STORAGE_ACCESS'] = 'storage-access';
  ContentSettingsTypes['USB_DEVICES'] = 'usb-devices';
  ContentSettingsTypes['VR'] = 'vr';
  ContentSettingsTypes['WINDOW_MANAGEMENT'] = 'window-placement';
  ContentSettingsTypes['ZOOM_LEVELS'] = 'zoom-levels';
  ContentSettingsTypes['PDF_DOCUMENTS'] = 'pdfDocuments';
  ContentSettingsTypes['SITE_DATA'] = 'site-data';
})(ContentSettingsTypes || (ContentSettingsTypes = {}));
var ContentSetting;
(function (ContentSetting) {
  ContentSetting['DEFAULT'] = 'default';
  ContentSetting['ALLOW'] = 'allow';
  ContentSetting['BLOCK'] = 'block';
  ContentSetting['ASK'] = 'ask';
  ContentSetting['SESSION_ONLY'] = 'session_only';
  ContentSetting['IMPORTANT_CONTENT'] = 'detect_important_content';
})(ContentSetting || (ContentSetting = {}));
var ChooserType;
(function (ChooserType) {
  ChooserType['NONE'] = '';
  ChooserType['USB_DEVICES'] = 'usb-devices-data';
  ChooserType['SERIAL_PORTS'] = 'serial-ports-data';
  ChooserType['HID_DEVICES'] = 'hid-devices-data';
  ChooserType['BLUETOOTH_DEVICES'] = 'bluetooth-devices-data';
  ChooserType['PRIVATE_NETWORK_DEVICES'] = 'private-network-devices-data';
})(ChooserType || (ChooserType = {}));
var CookieControlsMode;
(function (CookieControlsMode) {
  CookieControlsMode[(CookieControlsMode['OFF'] = 0)] = 'OFF';
  CookieControlsMode[(CookieControlsMode['BLOCK_THIRD_PARTY'] = 1)] = 'BLOCK_THIRD_PARTY';
  CookieControlsMode[(CookieControlsMode['INCOGNITO_ONLY'] = 2)] = 'INCOGNITO_ONLY';
})(CookieControlsMode || (CookieControlsMode = {}));
var SiteSettingSource;
(function (SiteSettingSource) {
  SiteSettingSource['ADS_FILTER_BLACKLIST'] = 'ads-filter-blacklist';
  SiteSettingSource['ALLOWLIST'] = 'allowlist';
  SiteSettingSource['DEFAULT'] = 'default';
  SiteSettingSource['EMBARGO'] = 'embargo';
  SiteSettingSource['EXTENSION'] = 'extension';
  SiteSettingSource['HOSTED_APP'] = 'HostedApp';
  SiteSettingSource['INSECURE_ORIGIN'] = 'insecure-origin';
  SiteSettingSource['KILL_SWITCH'] = 'kill-switch';
  SiteSettingSource['POLICY'] = 'policy';
  SiteSettingSource['PREFERENCE'] = 'preference';
})(SiteSettingSource || (SiteSettingSource = {}));
var NotificationSetting;
(function (NotificationSetting) {
  NotificationSetting[(NotificationSetting['ASK'] = 0)] = 'ASK';
  NotificationSetting[(NotificationSetting['QUIETER_MESSAGING'] = 1)] = 'QUIETER_MESSAGING';
  NotificationSetting[(NotificationSetting['BLOCK'] = 2)] = 'BLOCK';
})(NotificationSetting || (NotificationSetting = {}));
const INVALID_CATEGORY_SUBTYPE = '';
var AllSitesAction2;
(function (AllSitesAction2) {
  AllSitesAction2[(AllSitesAction2['LOAD_PAGE'] = 0)] = 'LOAD_PAGE';
  AllSitesAction2[(AllSitesAction2['RESET_SITE_GROUP_PERMISSIONS'] = 1)] = 'RESET_SITE_GROUP_PERMISSIONS';
  AllSitesAction2[(AllSitesAction2['RESET_ORIGIN_PERMISSIONS'] = 2)] = 'RESET_ORIGIN_PERMISSIONS';
  AllSitesAction2[(AllSitesAction2['CLEAR_ALL_DATA'] = 3)] = 'CLEAR_ALL_DATA';
  AllSitesAction2[(AllSitesAction2['CLEAR_SITE_GROUP_DATA'] = 4)] = 'CLEAR_SITE_GROUP_DATA';
  AllSitesAction2[(AllSitesAction2['CLEAR_ORIGIN_DATA'] = 5)] = 'CLEAR_ORIGIN_DATA';
  AllSitesAction2[(AllSitesAction2['ENTER_SITE_DETAILS'] = 6)] = 'ENTER_SITE_DETAILS';
  AllSitesAction2[(AllSitesAction2['REMOVE_SITE_GROUP'] = 7)] = 'REMOVE_SITE_GROUP';
  AllSitesAction2[(AllSitesAction2['REMOVE_ORIGIN'] = 8)] = 'REMOVE_ORIGIN';
  AllSitesAction2[(AllSitesAction2['REMOVE_ORIGIN_PARTITIONED'] = 9)] = 'REMOVE_ORIGIN_PARTITIONED';
  AllSitesAction2[(AllSitesAction2['FILTER_BY_FPS_OWNER'] = 10)] = 'FILTER_BY_FPS_OWNER';
  AllSitesAction2[(AllSitesAction2['DELETE_FOR_ENTIRE_FPS'] = 11)] = 'DELETE_FOR_ENTIRE_FPS';
})(AllSitesAction2 || (AllSitesAction2 = {}));
var SortMethod;
(function (SortMethod) {
  SortMethod['NAME'] = 'name';
  SortMethod['MOST_VISITED'] = 'most-visited';
  SortMethod['STORAGE'] = 'data-stored';
})(SortMethod || (SortMethod = {}));
var AllSitesDialog;
(function (AllSitesDialog) {
  AllSitesDialog['CLEAR_DATA'] = 'ClearData';
  AllSitesDialog['RESET_PERMISSIONS'] = 'ResetPermissions';
})(AllSitesDialog || (AllSitesDialog = {}));
const SITE_EXCEPTION_WILDCARD = '*';
const MODEL_UPDATE_DELAY_MS = 300;
var CookiesExceptionType;
(function (CookiesExceptionType) {
  CookiesExceptionType['THIRD_PARTY'] = 'third-party';
  CookiesExceptionType['SITE_DATA'] = 'site-data';
  CookiesExceptionType['COMBINED'] = 'combined';
})(CookiesExceptionType || (CookiesExceptionType = {}));
function getTemplate$p() {
  return html`<!--_html_template_start_--><style include="settings-shared">
      #radioSection {
        padding: 0 var(--cr-section-padding);
      }
      #radioGroupSubLabel {
        padding-bottom: 10px;
      }
      settings-collapse-radio-button {
        --settings-collapse-toggle-min-height: var(--cr-section-min-height);
      }
      settings-collapse-radio-button.two-line {
        --settings-collapse-toggle-min-height: var(--cr-section-two-line-min-height);
      }
      settings-collapse-radio-button:not(:first-of-type) {
        --settings-collapse-separator-line: var(--cr-separator-line);
      }
    </style>
    <div id="radioSection">
      <h2>[[header]]</h2>
      <div id="radioGroupSubLabel" class="secondary">[[description]]</div>
      <settings-radio-group
        id="settingsCategoryDefaultRadioGroup"
        pref="{{pref_}}"
        selectable-elements="settings-collapse-radio-button"
        on-change="onSelectedChanged_"
      >
        <settings-collapse-radio-button
          id="enabledRadioOption"
          class$="[[getEnabledButtonClass_(allowOptionSubLabel)]]"
          name="[[siteContentRadioSettingEnum_.ENABLED]]"
          pref="[[pref_]]"
          label="[[allowOptionLabel]]"
          sub-label="[[allowOptionSubLabel]]"
          disabled$="[[isRadioGroupDisabled_(category)]]"
          icon="[[allowOptionIcon]]"
          no-collapse
        >
        </settings-collapse-radio-button>
        <settings-collapse-radio-button
          id="disabledRadioOption"
          class$="[[getDisabledButtonClass_(blockOptionSubLabel)]]"
          name="[[siteContentRadioSettingEnum_.DISABLED]]"
          pref="[[pref_]]"
          label="[[blockOptionLabel]]"
          sub-label="[[blockOptionSubLabel]]"
          disabled$="[[isRadioGroupDisabled_(category)]]"
          icon="[[blockOptionIcon]]"
          no-collapse
        >
        </settings-collapse-radio-button>
      </settings-radio-group>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
var ContentSettingProvider;
(function (ContentSettingProvider) {
  ContentSettingProvider['POLICY'] = 'policy';
  ContentSettingProvider['SUPERVISED_USER'] = 'supervised_user';
  ContentSettingProvider['EXTENSION'] = 'extension';
  ContentSettingProvider['INSTALLED_WEBAPP_PROVIDER'] = 'installed_webapp_provider';
  ContentSettingProvider['NOTIFICATION_ANDROID'] = 'notification_android';
  ContentSettingProvider['EPHEMERAL'] = 'ephemeral';
  ContentSettingProvider['PREFERENCE'] = 'preference';
  ContentSettingProvider['DEFAULT'] = 'default';
  ContentSettingProvider['TESTS'] = 'tests';
  ContentSettingProvider['TESTS_OTHER'] = 'tests_other';
})(ContentSettingProvider || (ContentSettingProvider = {}));
var CookiePrimarySetting;
(function (CookiePrimarySetting) {
  CookiePrimarySetting[(CookiePrimarySetting['ALLOW_ALL'] = 0)] = 'ALLOW_ALL';
  CookiePrimarySetting[(CookiePrimarySetting['BLOCK_THIRD_PARTY_INCOGNITO'] = 1)] = 'BLOCK_THIRD_PARTY_INCOGNITO';
  CookiePrimarySetting[(CookiePrimarySetting['BLOCK_THIRD_PARTY'] = 2)] = 'BLOCK_THIRD_PARTY';
  CookiePrimarySetting[(CookiePrimarySetting['BLOCK_ALL'] = 3)] = 'BLOCK_ALL';
})(CookiePrimarySetting || (CookiePrimarySetting = {}));
class SiteSettingsPrefsBrowserProxyImpl {
  setDefaultValueForContentType(contentType, defaultValue) {
    chrome.send('setDefaultValueForContentType', [contentType, defaultValue]);
  }
  getDefaultValueForContentType(contentType) {
    return sendWithPromise('getDefaultValueForContentType', contentType);
  }
  getAllSites() {
    return sendWithPromise('getAllSites');
  }
  getCategoryList(origin) {
    return sendWithPromise('getCategoryList', origin);
  }
  getCookieSettingDescription() {
    return sendWithPromise('getCookieSettingDescription');
  }
  getRecentSitePermissions(numSources) {
    return sendWithPromise('getRecentSitePermissions', numSources);
  }
  getChooserExceptionList(chooserType) {
    return sendWithPromise('getChooserExceptionList', chooserType);
  }
  getFormattedBytes(numBytes) {
    return sendWithPromise('getFormattedBytes', numBytes);
  }
  getExceptionList(contentType) {
    return sendWithPromise('getExceptionList', contentType);
  }
  getFileSystemGrants() {
    return sendWithPromise('getFileSystemGrants');
  }
  revokeFileSystemGrant(origin, filePath) {
    chrome.send('revokeFileSystemGrant', [origin, filePath]);
  }
  revokeFileSystemGrants(origin) {
    chrome.send('revokeFileSystemGrants', [origin]);
  }
  getOriginPermissions(origin, contentTypes) {
    return sendWithPromise('getOriginPermissions', origin, contentTypes);
  }
  setOriginPermissions(origin, category, blanketSetting) {
    chrome.send('setOriginPermissions', [origin, category, blanketSetting]);
  }
  resetCategoryPermissionForPattern(primaryPattern, secondaryPattern, contentType, incognito) {
    chrome.send('resetCategoryPermissionForPattern', [primaryPattern, secondaryPattern, contentType, incognito]);
  }
  resetChooserExceptionForSite(chooserType, origin, exception) {
    chrome.send('resetChooserExceptionForSite', [chooserType, origin, exception]);
  }
  setCategoryPermissionForPattern(primaryPattern, secondaryPattern, contentType, value, incognito) {
    chrome.send('setCategoryPermissionForPattern', [primaryPattern, secondaryPattern, contentType, value, incognito]);
  }
  isOriginValid(origin) {
    return sendWithPromise('isOriginValid', origin);
  }
  isPatternValidForType(pattern, category) {
    return sendWithPromise('isPatternValidForType', pattern, category);
  }
  getDefaultCaptureDevices(type) {
    chrome.send('getDefaultCaptureDevices', [type]);
  }
  setDefaultCaptureDevice(type, defaultValue) {
    chrome.send('setDefaultCaptureDevice', [type, defaultValue]);
  }
  observeProtocolHandlers() {
    chrome.send('observeProtocolHandlers');
  }
  observeAppProtocolHandlers() {
    chrome.send('observeAppProtocolHandlers');
  }
  observeProtocolHandlersEnabledState() {
    chrome.send('observeProtocolHandlersEnabledState');
  }
  setProtocolHandlerDefault(enabled) {
    chrome.send('setHandlersEnabled', [enabled]);
  }
  setProtocolDefault(protocol, url) {
    chrome.send('setDefault', [protocol, url]);
  }
  removeProtocolHandler(protocol, url) {
    chrome.send('removeHandler', [protocol, url]);
  }
  removeAppAllowedHandler(protocol, url, appId) {
    chrome.send('removeAppAllowedHandler', [protocol, url, appId]);
  }
  removeAppDisallowedHandler(protocol, url, appId) {
    chrome.send('removeAppDisallowedHandler', [protocol, url, appId]);
  }
  updateIncognitoStatus() {
    chrome.send('updateIncognitoStatus');
  }
  fetchZoomLevels() {
    chrome.send('fetchZoomLevels');
  }
  removeZoomLevel(host) {
    chrome.send('removeZoomLevel', [host]);
  }
  fetchBlockAutoplayStatus() {
    chrome.send('fetchBlockAutoplayStatus');
  }
  clearSiteGroupDataAndCookies(groupingKey) {
    chrome.send('clearSiteGroupDataAndCookies', [groupingKey]);
  }
  clearUnpartitionedOriginDataAndCookies(origin) {
    chrome.send('clearUnpartitionedUsage', [origin]);
  }
  clearPartitionedOriginDataAndCookies(origin, groupingKey) {
    chrome.send('clearPartitionedUsage', [origin, groupingKey]);
  }
  recordAction(action) {
    chrome.send('recordAction', [action]);
  }
  getFpsMembershipLabel(fpsNumMembers, fpsOwner) {
    return sendWithPromise('getFpsMembershipLabel', fpsNumMembers, fpsOwner);
  }
  getNumCookiesString(numCookies) {
    return sendWithPromise('getNumCookiesString', numCookies);
  }
  static getInstance() {
    return instance$c || (instance$c = new SiteSettingsPrefsBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$c = obj;
  }
}
let instance$c = null;
// Copyright 2015 The Chromium Authors
const SiteSettingsMixin = dedupingMixin((superClass) => {
  class SiteSettingsMixin extends superClass {
    static get properties() {
      return { category: String, contentTypes_: { type: Array, value: [] } };
    }
    constructor(...args) {
      super(...args);
      this.browserProxy = SiteSettingsPrefsBrowserProxyImpl.getInstance();
    }
    ensureUrlHasScheme(url) {
      if (url.length === 0) {
        return url;
      }
      return url.includes('://') ? url : 'http://' + url;
    }
    sanitizePort(url) {
      const urlWithScheme = this.ensureUrlHasScheme(url);
      if (urlWithScheme.startsWith('https://') && urlWithScheme.endsWith(':443')) {
        return url.slice(0, -4);
      }
      if (urlWithScheme.startsWith('http://') && urlWithScheme.endsWith(':80')) {
        return url.slice(0, -3);
      }
      return url;
    }
    computeIsSettingEnabled(setting) {
      return setting !== ContentSetting.BLOCK;
    }
    toUrl(originOrPattern) {
      if (originOrPattern.length === 0) {
        return null;
      }
      originOrPattern = originOrPattern.replace('*://', '');
      originOrPattern = originOrPattern.replace('[*.]', '');
      return new URL(this.ensureUrlHasScheme(originOrPattern));
    }
    originRepresentation(origin) {
      try {
        const url = this.toUrl(origin);
        return url ? url.host || url.origin : '';
      } catch (error) {
        return '';
      }
    }
    expandSiteException(exception) {
      const origin = exception.origin;
      const embeddingOrigin = exception.embeddingOrigin;
      let enforcement = null;
      if (
        exception.source === SiteSettingSource.EXTENSION ||
        exception.source === SiteSettingSource.HOSTED_APP ||
        exception.source === SiteSettingSource.POLICY
      ) {
        enforcement = chrome.settingsPrivate.Enforcement.ENFORCED;
      }
      let controlledBy = chrome.settingsPrivate.ControlledBy.PRIMARY_USER;
      if (exception.source === SiteSettingSource.EXTENSION || exception.source === SiteSettingSource.HOSTED_APP) {
        controlledBy = chrome.settingsPrivate.ControlledBy.EXTENSION;
      } else if (exception.source === SiteSettingSource.POLICY) {
        controlledBy = chrome.settingsPrivate.ControlledBy.USER_POLICY;
      }
      return {
        category: this.category,
        embeddingOrigin: embeddingOrigin,
        incognito: exception.incognito,
        isEmbargoed: exception.isEmbargoed,
        origin: origin,
        displayName: exception.displayName,
        setting: exception.setting,
        enforcement: enforcement,
        controlledBy: controlledBy,
      };
    }
  }
  return SiteSettingsMixin;
});
// Copyright 2020 The Chromium Authors
var SiteContentRadioSetting;
(function (SiteContentRadioSetting) {
  SiteContentRadioSetting[(SiteContentRadioSetting['DISABLED'] = 0)] = 'DISABLED';
  SiteContentRadioSetting[(SiteContentRadioSetting['ENABLED'] = 1)] = 'ENABLED';
})(SiteContentRadioSetting || (SiteContentRadioSetting = {}));
const SettingsCategoryDefaultRadioGroupElementBase = SiteSettingsMixin(WebUiListenerMixin(PolymerElement));
class SettingsCategoryDefaultRadioGroupElement extends SettingsCategoryDefaultRadioGroupElementBase {
  static get is() {
    return 'settings-category-default-radio-group';
  }
  static get template() {
    return getTemplate$p();
  }
  static get properties() {
    return {
      header: {
        type: String,
        value() {
          return loadTimeData.getString('siteSettingsDefaultBehavior');
        },
      },
      description: {
        type: String,
        value() {
          return loadTimeData.getString('siteSettingsDefaultBehaviorDescription');
        },
      },
      allowOptionLabel: String,
      allowOptionSubLabel: String,
      allowOptionIcon: String,
      blockOptionLabel: String,
      blockOptionSubLabel: String,
      blockOptionIcon: String,
      siteContentRadioSettingEnum_: { type: Object, value: SiteContentRadioSetting },
      pref_: {
        type: Object,
        value() {
          return { type: chrome.settingsPrivate.PrefType.NUMBER, value: -1 };
        },
      },
    };
  }
  static get observers() {
    return ['onCategoryChanged_(category)'];
  }
  ready() {
    super.ready();
    this.addWebUiListener('contentSettingCategoryChanged', (category) => this.onCategoryChanged_(category));
  }
  getAllowOptionForCategory_() {
    switch (this.category) {
      case ContentSettingsTypes.ADS:
      case ContentSettingsTypes.BACKGROUND_SYNC:
      case ContentSettingsTypes.FEDERATED_IDENTITY_API:
      case ContentSettingsTypes.IMAGES:
      case ContentSettingsTypes.JAVASCRIPT:
      case ContentSettingsTypes.MIXEDSCRIPT:
      case ContentSettingsTypes.PAYMENT_HANDLER:
      case ContentSettingsTypes.POPUPS:
      case ContentSettingsTypes.PROTECTED_CONTENT:
      case ContentSettingsTypes.PROTOCOL_HANDLERS:
      case ContentSettingsTypes.SENSORS:
      case ContentSettingsTypes.SOUND:
        return ContentSetting.ALLOW;
      case ContentSettingsTypes.AR:
      case ContentSettingsTypes.AUTOMATIC_DOWNLOADS:
      case ContentSettingsTypes.BLUETOOTH_DEVICES:
      case ContentSettingsTypes.BLUETOOTH_SCANNING:
      case ContentSettingsTypes.CAMERA:
      case ContentSettingsTypes.CLIPBOARD:
      case ContentSettingsTypes.FILE_SYSTEM_WRITE:
      case ContentSettingsTypes.GEOLOCATION:
      case ContentSettingsTypes.HID_DEVICES:
      case ContentSettingsTypes.IDLE_DETECTION:
      case ContentSettingsTypes.LOCAL_FONTS:
      case ContentSettingsTypes.MIC:
      case ContentSettingsTypes.MIDI_DEVICES:
      case ContentSettingsTypes.NOTIFICATIONS:
      case ContentSettingsTypes.SERIAL_PORTS:
      case ContentSettingsTypes.STORAGE_ACCESS:
      case ContentSettingsTypes.USB_DEVICES:
      case ContentSettingsTypes.VR:
      case ContentSettingsTypes.WINDOW_MANAGEMENT:
        return ContentSetting.ASK;
      default:
        assertNotReached('Invalid category: ' + this.category);
    }
  }
  getEnabledButtonClass_() {
    return this.allowOptionSubLabel ? 'two-line' : '';
  }
  getDisabledButtonClass_() {
    return this.blockOptionSubLabel ? 'two-line' : '';
  }
  onSelectedChanged_() {
    assert(this.pref_.enforcement !== chrome.settingsPrivate.Enforcement.ENFORCED);
    const allowOption = this.getAllowOptionForCategory_();
    this.browserProxy.setDefaultValueForContentType(
      this.category,
      this.categoryEnabled_ ? allowOption : ContentSetting.BLOCK
    );
  }
  updatePref_(update) {
    if (update.source !== undefined && update.source !== ContentSettingProvider.PREFERENCE) {
      this.set('pref_.enforcement', chrome.settingsPrivate.Enforcement.ENFORCED);
      let controlledBy = chrome.settingsPrivate.ControlledBy.USER_POLICY;
      switch (update.source) {
        case ContentSettingProvider.POLICY:
          controlledBy = chrome.settingsPrivate.ControlledBy.DEVICE_POLICY;
          break;
        case ContentSettingProvider.SUPERVISED_USER:
          controlledBy = chrome.settingsPrivate.ControlledBy.PARENT;
          break;
        case ContentSettingProvider.EXTENSION:
          controlledBy = chrome.settingsPrivate.ControlledBy.EXTENSION;
          break;
      }
      this.set('pref_.controlledBy', controlledBy);
    } else {
      this.set('pref_.enforcement', undefined);
      this.set('pref_.controlledBy', undefined);
    }
    const enabled = this.computeIsSettingEnabled(update.setting);
    const prefValue = enabled ? SiteContentRadioSetting.ENABLED : SiteContentRadioSetting.DISABLED;
    this.set('pref_.value', prefValue);
  }
  async onCategoryChanged_(category) {
    if (category !== this.category) {
      return;
    }
    const defaultValue = await this.browserProxy.getDefaultValueForContentType(this.category);
    this.updatePref_(defaultValue);
  }
  get categoryEnabled_() {
    return this.pref_.value === SiteContentRadioSetting.ENABLED;
  }
  isRadioGroupDisabled_() {
    return this.category === ContentSettingsTypes.POPUPS && loadTimeData.getBoolean('isGuest');
  }
}
customElements.define(SettingsCategoryDefaultRadioGroupElement.is, SettingsCategoryDefaultRadioGroupElement);
function getTemplate$o() {
  return html`<!--_html_template_start_-->
    <style>
      :host ::slotted([slot='view']) {
        bottom: 0;
        display: none;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
      }
      :host ::slotted(.active),
      :host ::slotted(.closing) {
        display: block;
      }
    </style>
    <slot name="view"></slot>
    <!--_html_template_end_-->`;
}
// Copyright 2018 The Chromium Authors
function getEffectiveView(element) {
  return element.matches('cr-lazy-render') ? element.get() : element;
}
function dispatchCustomEvent(element, eventType) {
  element.dispatchEvent(new CustomEvent(eventType, { bubbles: true, composed: true }));
}
const viewAnimations = new Map();
viewAnimations.set('fade-in', (element) => {
  const animation = element.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 180,
    easing: 'ease-in-out',
    iterations: 1,
  });
  return animation.finished;
});
viewAnimations.set('fade-out', (element) => {
  const animation = element.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 180,
    easing: 'ease-in-out',
    iterations: 1,
  });
  return animation.finished;
});
viewAnimations.set('slide-in-fade-in-ltr', (element) => {
  const animation = element.animate(
    [
      { transform: 'translateX(-8px)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 },
    ],
    { duration: 300, easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)', fill: 'forwards', iterations: 1 }
  );
  return animation.finished;
});
viewAnimations.set('slide-in-fade-in-rtl', (element) => {
  const animation = element.animate(
    [
      { transform: 'translateX(8px)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 },
    ],
    { duration: 300, easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)', fill: 'forwards', iterations: 1 }
  );
  return animation.finished;
});
class CrViewManagerElement extends PolymerElement {
  static get is() {
    return 'cr-view-manager';
  }
  static get template() {
    return getTemplate$o();
  }
  exit_(element, animation) {
    const animationFunction = viewAnimations.get(animation);
    element.classList.remove('active');
    element.classList.add('closing');
    dispatchCustomEvent(element, 'view-exit-start');
    if (!animationFunction) {
      element.classList.remove('closing');
      dispatchCustomEvent(element, 'view-exit-finish');
      return Promise.resolve();
    }
    return animationFunction(element).then(() => {
      element.classList.remove('closing');
      dispatchCustomEvent(element, 'view-exit-finish');
    });
  }
  enter_(view, animation) {
    const animationFunction = viewAnimations.get(animation);
    const effectiveView = getEffectiveView(view);
    effectiveView.classList.add('active');
    dispatchCustomEvent(effectiveView, 'view-enter-start');
    if (!animationFunction) {
      dispatchCustomEvent(effectiveView, 'view-enter-finish');
      return Promise.resolve();
    }
    return animationFunction(effectiveView).then(() => {
      dispatchCustomEvent(effectiveView, 'view-enter-finish');
    });
  }
  switchView(newViewId, enterAnimation, exitAnimation) {
    const previousView = this.querySelector('.active');
    const newView = this.querySelector('#' + newViewId);
    assert(!!newView);
    const promises = [];
    if (previousView) {
      promises.push(this.exit_(previousView, exitAnimation || 'fade-out'));
      promises.push(this.enter_(newView, enterAnimation || 'fade-in'));
    } else {
      promises.push(this.enter_(newView, 'no-animation'));
    }
    return Promise.all(promises).then(() => {});
  }
}
customElements.define(CrViewManagerElement.is, CrViewManagerElement);
function getTemplate$n() {
  return html`<!--_html_template_start_--><style include="cr-shared-style cr-actionable-row-style">
      :host {
        padding-inline-start: 4px;
      }
      #labelWrapper {
        flex: 1;
        padding-inline-start: 16px;
      }
      #label {
        font-size: 0.875rem;
        padding-bottom: 4px;
      }
      cr-icon-button {
        --cr-icon-button-icon-size: 24px;
        margin: 2px;
      }
    </style>
    <picture>
      <source srcset="[[darkImgSrc]]" media="(prefers-color-scheme: dark)" />
      <img alt="" src="[[lightImgSrc]]" />
    </picture>
    <div id="labelWrapper" class="cr-padded-text">
      <div id="label" aria-hidden="true">[[label]]</div>
      <div id="subLabel" class="cr-secondary-text" aria-hidden="true">[[subLabel]]</div>
    </div>
    <cr-icon-button
      iron-icon="cr:open-in-new"
      role="link"
      aria-describedby="subLabel"
      aria-labelledby="label"
      aria-roledescription$="瀛愰〉闈㈡寜閽�"
    >
    </cr-icon-button>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
class PrivacyGuideCompletionLinkRowElement extends PolymerElement {
  static get is() {
    return 'privacy-guide-completion-link-row';
  }
  static get template() {
    return getTemplate$n();
  }
  static get properties() {
    return { label: String, subLabel: String, lightImgSrc: String, darkImgSrc: String };
  }
}
customElements.define(PrivacyGuideCompletionLinkRowElement.is, PrivacyGuideCompletionLinkRowElement);
const styleMod = document.createElement('dom-module');
styleMod.appendChild(
  html`
    <template>
      <style include="cr-shared-style settings-shared">
        :host {
          display: block;
          flex: 1;
          padding: 0 24px;
        }
        .headline-container {
          align-items: center;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-between;
          text-align: center;
        }
        .headline {
          color: var(--google-grey-800);
          font-size: 22px;
          line-height: 1.15;
        }
        .description-column {
          width: 50%;
        }
        .description-column-first {
          padding-inline-end: 12px;
        }
        .description-header {
          color: var(--google-blue-600);
          font-weight: 400;
        }
        @media (prefers-color-scheme: dark) {
          .description-header {
            color: var(--google-blue-300);
          }
        }
        .description-wrapper {
          padding: 16px;
        }
        .description-wrapper-radio {
          padding: 4px 0 16px 0;
        }
        settings-collapse-radio-button:not(:first-of-type) {
          --settings-collapse-separator-line: var(--cr-separator-line);
        }
        .header {
          align-items: center;
          column-gap: 16px;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          outline: 0;
          padding: 24px 0 16px 0;
        }
        .header-phase2 {
          align-items: center;
          display: flex;
          flex-direction: column;
          outline: 0;
          padding: 24px 0 16px 0;
        }
        .header-label {
          align-self: normal;
          color: var(--cr-primary-text-color);
          flex: 1;
          font-size: 123%;
          font-weight: 400;
          padding-bottom: 0;
          padding-top: 0;
        }
        .header-label-phase2 {
          align-self: center;
          color: var(--cr-primary-text-color);
          font-size: 138%;
          font-weight: 400;
          justify-content: center;
        }
        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes slide-in {
          0% {
            transform: translateX(calc(var(--privacy-guide-v2-translate-multiplier) * 20px));
          }
          100% {
            transform: translateX(0);
          }
        }
        :host-context([is-privacy-guide-v2]) .cr-secondary-text,
        :host-context([is-privacy-guide-v2]) .fragment-content,
        :host-context([is-privacy-guide-v2]) .header-phase2 picture,
        :host-context([is-privacy-guide-v2]) .headline {
          animation: fade-in var(--privacy-guide-animation-duration), slide-in 450ms;
        }
        :host-context([is-privacy-guide-v2]) .header-label-phase2 {
          animation: fade-in var(--privacy-guide-animation-duration);
        }
        @media (prefers-color-scheme: dark) {
          .headline {
            color: var(--google-grey-200);
          }
        }
        .embedded-setting-wrapper {
          border: 1px solid var(--google-grey-300);
          border-radius: 4px;
        }
        @media (prefers-color-scheme: dark) {
          .embedded-setting-wrapper {
            border-color: var(--google-grey-700);
          }
        }
        .two-column {
          display: flex;
        }
        settings-toggle-button {
          padding-bottom: 8px;
          padding-top: 8px;
        }
        picture {
          align-items: center;
          display: flex;
        }
      </style>
    </template>
  `.content
);
styleMod.register('privacy-guide-fragment-shared');
// Copyright 2016 The Chromium Authors
class ClearBrowsingDataBrowserProxyImpl {
  clearBrowsingData(dataTypes, timePeriod) {
    return sendWithPromise('clearBrowsingData', dataTypes, timePeriod);
  }
  initialize() {
    return sendWithPromise('initializeClearBrowsingData');
  }
  getSyncState() {
    return sendWithPromise('getSyncState');
  }
  static getInstance() {
    return instance$b || (instance$b = new ClearBrowsingDataBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$b = obj;
  }
}
let instance$b = null;
function getTemplate$m() {
  return html`<!--_html_template_start_--><style include="privacy-guide-fragment-shared">
      :host {
        display: flex;
        flex-flow: column;
        min-height: calc(432px - var(--privacy-guide-footer-total-height));
      }
      .headline {
        outline: 0;
      }
      .headline-container {
        padding: 36px 120px 16px 120px;
        row-gap: 8px;
      }
      :host-context([is-privacy-guide-v2]) .header-phase2 picture {
        animation: fade-in var(--privacy-guide-animation-duration);
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
        opacity: 0;
      }
      :host-context([is-privacy-guide-v2]) .cr-secondary-text,
      :host-context([is-privacy-guide-v2]) .headline {
        animation: fade-in var(--privacy-guide-animation-duration);
      }
      :host-context([is-privacy-guide-v2]) #privacySandboxRow,
      :host-context([is-privacy-guide-v2]) #waaRow {
        animation: fade-in var(--privacy-guide-animation-duration);
      }
      #picture-container {
        height: 153px;
        margin-block-end: 12px;
        position: relative;
        width: 354px;
      }
      :host-context([is-no-link-layout]) #picture-container {
        margin-block-end: 32px;
        margin-block-start: 24px;
      }
      .picture-shapes-container {
        --shape-color-green: rgba(71, 166, 86, 1);
        --shape-color-red: rgba(255, 127, 116, 1);
        --shape-color-yellow: rgba(251, 188, 4, 1);
        animation: fade-in 50ms ease-in 0.2s forwards;
        opacity: 0;
      }
      @media (prefers-color-scheme: dark) {
        .picture-shapes-container {
          --shape-color-green: rgba(129, 201, 149, 1);
          --shape-color-yellow: rgba(253, 214, 99, 1);
        }
      }
      .picture-shape {
        -webkit-mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        animation-delay: 0.2s;
        animation-duration: 0.3s;
        animation-fill-mode: forwards;
        left: 0;
        position: absolute;
        top: 0;
        transform-origin: center center;
      }
      @keyframes circle {
        0% {
          transform: translate(134px, 131px) rotate(80deg);
        }
        100% {
          transform: translate(0, 117px) rotate(0);
        }
      }
      #circle {
        -webkit-mask-image: url(images/privacy_guide/completion_banner_circle.svg);
        animation-name: circle;
        animation-timing-function: cubic-bezier(0.12, 0.44, 0.46, 0.78);
        background: var(--shape-color-yellow);
        height: 18px;
        width: 18px;
      }
      @keyframes pill {
        0% {
          transform: translate(194px, 91px) rotate(145deg);
        }
        100% {
          transform: translate(325px, 29px) rotate(-125deg);
        }
      }
      #pill {
        -webkit-mask-image: url(images/privacy_guide/completion_banner_pill.svg);
        animation-name: pill;
        animation-timing-function: cubic-bezier(0.06, 0.55, 0.44, 0.87);
        background: var(--shape-color-yellow);
        height: 18px;
        width: 25px;
      }
      @keyframes square {
        0% {
          transform: translate(128px, 99px) rotate(80deg);
        }
        100% {
          transform: translate(83px, 8px) rotate(0);
        }
      }
      #square {
        -webkit-mask-image: url(images/privacy_guide/completion_banner_square.svg);
        animation-name: square;
        animation-timing-function: cubic-bezier(0.26, 0.59, 0.54, 0.87);
        background: var(--shape-color-green);
        height: 13px;
        width: 13px;
      }
      @keyframes triangle {
        0% {
          transform: translate(243px, 103px) rotate(60deg);
        }
        100% {
          transform: translate(290px, 96px) rotate(0);
        }
      }
      #triangle {
        -webkit-mask-image: url(images/privacy_guide/completion_banner_triangle.svg);
        animation-name: triangle;
        animation-timing-function: cubic-bezier(0.19, 0.5, 0.52, 0.82);
        background: var(--shape-color-red);
        height: 12px;
        width: 13px;
      }
      privacy-guide-completion-link-row {
        border-radius: 4px;
      }
      .footer {
        align-items: center;
        bottom: calc(-1 * var(--privacy-guide-footer-total-height));
        display: flex;
        justify-content: space-between;
        padding: var(--privacy-guide-footer-vertical-padding) 0;
        position: absolute;
        width: calc(100% - 48px);
      }
    </style>
    <div class="header-phase2">
      <div id="picture-container">
        <div class="picture-shapes-container">
          <div id="circle" class="picture-shape"></div>
          <div id="pill" class="picture-shape"></div>
          <div id="square" class="picture-shape"></div>
          <div id="triangle" class="picture-shape"></div>
        </div>
        <picture>
          <source srcset="./images/privacy_guide/completion_banner_dark_v2.svg" media="(prefers-color-scheme: dark)" />
          <img alt="" src="./images/privacy_guide/completion_banner_v2.svg" />
        </picture>
      </div>
      <div class="headline" tabindex="-1">妫€鏌ュ畬姣�</div>
      <div class="cr-secondary-text">[[subheader_]]</div>
    </div>
    <template is="dom-if" if="[[shouldShowPrivacySandbox_]]">
      <privacy-guide-completion-link-row
        id="privacySandboxRow"
        label="闅愮娌欑洅璇曠敤"
        sub-label="Chrome 鍥㈤槦姝ｅ湪鎺㈢储鏂板姛鑳斤紝浠ヤ究缃戠珯鍙渶浣跨敤鎮ㄧ殑杈冨皯鏁版嵁灏辫兘鎻愪緵鍚屾牱鐨勬祻瑙堜綋楠�"
        light-img-src="./images/privacy_guide/privacy_sandbox_graphic.svg"
        dark-img-src="./images/privacy_guide/privacy_sandbox_graphic_dark.svg"
        on-click="onPrivacySandboxClick_"
      >
      </privacy-guide-completion-link-row>
    </template>
    <div aria-disabled="true" role="none">
      <a
        id="privacySandboxLink"
        href="privacySandbox"
        target="_blank"
        tabindex="-1"
        aria-disabled="true"
        role="none"
      ></a>
    </div>
    <template is="dom-if" if="[[shouldShowWaa_]]">
      <privacy-guide-completion-link-row
        id="waaRow"
        label="缃戠粶涓庡簲鐢ㄦ椿鍔ㄨ褰�"
        sub-label="閫夋嫨鏄惁瑕佸寘鍚� Chrome 鍘嗗彶璁板綍浠ヤ究鍦ㄥ悇娆� Google 鏈嶅姟涓幏浜洿涓€у寲鐨勪綋楠�"
        light-img-src="./images/privacy_guide/waa_graphic.svg"
        dark-img-src="./images/privacy_guide/waa_graphic_dark.svg"
        on-click="onWaaClick_"
      >
      </privacy-guide-completion-link-row>
    </template>
    <div class="footer">
      <cr-button id="backButton" role="button" on-click="onBackButtonClick_"> 杩斿洖 </cr-button>
      <cr-button class="action-button" id="leaveButton" on-click="onLeaveButtonClick_"> 瀹屾垚 </cr-button>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
const PrivacyGuideCompletionFragmentElementBase = WebUiListenerMixin(I18nMixin(PolymerElement));
class PrivacyGuideCompletionFragmentElement extends PrivacyGuideCompletionFragmentElementBase {
  constructor() {
    super(...arguments);
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'privacy-guide-completion-fragment';
  }
  static get template() {
    return getTemplate$m();
  }
  static get properties() {
    return {
      isNoLinkLayout: {
        reflectToAttribute: true,
        type: Boolean,
        computed: 'computeIsNoLinkLayout_(shouldShowWaa_, shouldShowPrivacySandbox_)',
      },
      subheader_: { type: String, computed: 'computeSubheader_(isNoLinkLayout)' },
      shouldShowPrivacySandbox_: {
        type: Boolean,
        value: () =>
          !loadTimeData.getBoolean('isPrivacySandboxRestricted') ||
          loadTimeData.getBoolean('isPrivacySandboxRestrictedNoticeEnabled'),
      },
      shouldShowWaa_: { type: Boolean, value: false },
    };
  }
  ready() {
    super.ready();
    this.addEventListener('view-enter-start', this.onViewEnterStart_);
    this.addWebUiListener('update-sync-state', (event) => this.updateWaaLink_(event.signedIn));
    ClearBrowsingDataBrowserProxyImpl.getInstance()
      .getSyncState()
      .then((status) => this.updateWaaLink_(status.signedIn));
  }
  focus() {
    this.shadowRoot.querySelector('.headline').focus();
  }
  onViewEnterStart_() {
    this.metricsBrowserProxy_.recordPrivacyGuideStepsEligibleAndReachedHistogram(
      PrivacyGuideStepsEligibleAndReached.COMPLETION_REACHED
    );
  }
  computeIsNoLinkLayout_() {
    return !this.shouldShowWaa_ && !this.shouldShowPrivacySandbox_;
  }
  computeSubheader_() {
    return this.computeIsNoLinkLayout_()
      ? this.i18n('privacyGuideCompletionCardSubHeaderNoLinks')
      : this.i18n('privacyGuideCompletionCardSubHeader');
  }
  updateWaaLink_(isSignedIn) {
    this.shouldShowWaa_ = isSignedIn;
  }
  onBackButtonClick_(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('back-button-click', { bubbles: true, composed: true }));
  }
  onLeaveButtonClick_() {
    this.metricsBrowserProxy_.recordPrivacyGuideNextNavigationHistogram(
      PrivacyGuideInteractions.COMPLETION_NEXT_BUTTON
    );
    this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.NextClickCompletion');
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }
  onPrivacySandboxClick_() {
    this.metricsBrowserProxy_.recordPrivacyGuideEntryExitHistogram(
      PrivacyGuideInteractions.PRIVACY_SANDBOX_COMPLETION_LINK
    );
    this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.CompletionPSClick');
    this.shadowRoot.querySelector('#privacySandboxLink').dispatchEvent(new MouseEvent('click'));
  }
  onWaaClick_() {
    this.metricsBrowserProxy_.recordPrivacyGuideEntryExitHistogram(PrivacyGuideInteractions.SWAA_COMPLETION_LINK);
    this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.CompletionSWAAClick');
    OpenWindowProxyImpl.getInstance().openUrl(loadTimeData.getString('activityControlsUrlInPrivacyGuide'));
  }
}
customElements.define(PrivacyGuideCompletionFragmentElement.is, PrivacyGuideCompletionFragmentElement);
function getTemplate$l() {
  return html`<!--_html_template_start_--><style include="cr-shared-style settings-shared">
      #descriptionItemWrapper {
        display: flex;
        margin: 12px 0;
        padding-inline-end: 12px;
      }
      iron-icon {
        --iron-icon-fill-color: var(--cr-link-row-start-icon-color, var(--google-grey-700));
        display: flex;
        flex-shrink: 0;
        padding: 2px 0;
        padding-inline-end: 10px;
        width: var(--cr-link-row-icon-width, var(--cr-icon-size));
      }
      @media (prefers-color-scheme: dark) {
        iron-icon {
          --iron-icon-fill-color: var(--cr-link-row-start-icon-color, var(--google-grey-500));
        }
      }
    </style>
    <div id="descriptionItemWrapper">
      <iron-icon icon="[[icon]]" aria-hidden="true"></iron-icon>
      <div class="secondary">
        <div inner-h-t-m-l="[[sanitizeInnerHtml_(labelHtml)]]"></div>
        [[label]]
      </div>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
class PrivacyGuideDescriptionItemElement extends PolymerElement {
  static get is() {
    return 'privacy-guide-description-item';
  }
  static get template() {
    return getTemplate$l();
  }
  static get properties() {
    return {
      icon: { type: String, value: '' },
      label: { type: String, value: '' },
      labelHtml: { type: String, value: '' },
    };
  }
  sanitizeInnerHtml_(rawString) {
    return sanitizeInnerHtml(rawString);
  }
}
customElements.define(PrivacyGuideDescriptionItemElement.is, PrivacyGuideDescriptionItemElement);
function getTemplate$k() {
  return html`<!--_html_template_start_--><style include="privacy-guide-fragment-shared"></style>
    <div class="header-phase2" focus-element tabindex="-1">
      <picture>
        <source srcset="./images/privacy_guide/cookies_graphic_dark_v2.svg" media="(prefers-color-scheme: dark)" />
        <img alt="" src="./images/privacy_guide/cookies_graphic_v2.svg" />
      </picture>
      <h2 class="header-label-phase2">璇烽€夋嫨鎮ㄧ殑绗笁鏂� Cookie 鍋忓ソ璁剧疆</h2>
    </div>
    <div class="fragment-content">
      <settings-radio-group
        id="cookiesRadioGroup"
        pref="{{prefs.generated.cookie_primary_setting}}"
        selectable-elements="settings-collapse-radio-button"
        on-keydown="onRadioGroupKeyDown_"
      >
        <settings-collapse-radio-button
          id="block3PIncognito"
          pref="[[prefs.generated.cookie_primary_setting]]"
          name="[[cookiePrimarySettingEnum_.BLOCK_THIRD_PARTY_INCOGNITO]]"
          label="鍦ㄦ棤鐥曟ā寮忎笅闃绘绗笁鏂� Cookie"
          expand-aria-label="鏄剧ず鍦ㄦ棤鐥曟ā寮忎笅灞忚斀绗笁鏂� Cookie 鐨勬湁鍏宠鎯�"
          on-click="onCookies3pIncognitoClick_"
        >
          <div slot="collapse" class="description-wrapper-radio two-column">
            <div class="description-column description-column-first">
              <div class="description-header">澶勪簬寮€鍚姸鎬佹椂</div>
              <div role="list">
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:shoppingcart"
                  label="缃戠珯鍙互浣跨敤 Cookie 鏉ユ彁鍗囨偍鐨勬祻瑙堜綋楠岋紝渚嬪璁╂偍淇濇寔鐧诲綍鐘舵€佹垨璁颁綇鎮ㄨ喘鐗╄溅涓殑鍟嗗搧"
                >
                </privacy-guide-description-item>
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:broken"
                  label="鍦ㄦ棤鐥曟ā寮忎笅锛屾煇浜涚綉绔欎笂鐨勫姛鑳藉彲鑳戒細鏃犳硶姝ｅ父杩愪綔"
                >
                </privacy-guide-description-item>
              </div>
            </div>
            <div class="description-column">
              <div class="description-header">娉ㄦ剰浜嬮」</div>
              <div role="list">
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:block"
                  label="缃戠珯鍙互浣跨敤 Cookie 鏌ョ湅鎮ㄥ湪鍚勪釜涓嶅悓缃戠珯涓婄殑娴忚娲诲姩锛屼互渚垮疄鐜版煇浜涘姛鑳芥垨鐩殑锛堜緥濡備负鎮ㄥ睍绀轰釜鎬у寲骞垮憡锛�"
                >
                </privacy-guide-description-item>
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:incognito-unfilled"
                  label="褰撴偍澶勪簬鏃犵棔妯″紡鏃讹紝缃戠珯鍙兘浣跨敤 Cookie 鏌ョ湅鎮ㄥ湪鐩稿簲缃戠珯涓婄殑娴忚娲诲姩銆傛棤鐥曞紡浼氳瘽缁撴潫鏃讹紝绯荤粺浼氬垹闄� Cookie銆�"
                >
                </privacy-guide-description-item>
              </div>
            </div>
          </div>
        </settings-collapse-radio-button>
        <settings-collapse-radio-button
          id="block3P"
          pref="[[prefs.generated.cookie_primary_setting]]"
          name="[[cookiePrimarySettingEnum_.BLOCK_THIRD_PARTY]]"
          label="鎷︽埅鎵€鏈夌涓夋柟 Cookie"
          expand-aria-label="鏄剧ず灞忚斀绗笁鏂� Cookie 鐨勬湁鍏宠鎯�"
          on-click="onCookies3pClick_"
        >
          <div slot="collapse" class="description-wrapper-radio two-column">
            <div class="description-column description-column-first">
              <div class="description-header">澶勪簬寮€鍚姸鎬佹椂</div>
              <div role="list">
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:shoppingcart"
                  label="缃戠珯鍙互浣跨敤 Cookie 鏉ユ彁鍗囨偍鐨勬祻瑙堜綋楠岋紝渚嬪璁╂偍淇濇寔鐧诲綍鐘舵€佹垨璁颁綇鎮ㄨ喘鐗╄溅涓殑鍟嗗搧"
                >
                </privacy-guide-description-item>
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:broken"
                  label="鏌愪簺缃戠珯涓婄殑鍔熻兘鍙兘鏃犳硶姝ｅ父杩愯"
                >
                </privacy-guide-description-item>
              </div>
            </div>
            <div class="description-column">
              <div class="description-header">娉ㄦ剰浜嬮」</div>
              <div role="list">
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:block"
                  label="缃戠珯鍙兘浣跨敤 Cookie 鏌ョ湅鎮ㄥ湪鐩稿簲缃戠珯涓婄殑娴忚娲诲姩"
                >
                </privacy-guide-description-item>
              </div>
            </div>
          </div>
        </settings-collapse-radio-button>
      </settings-radio-group>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
const PrivacyGuideCookiesFragmentBase = PrefsMixin(PolymerElement);
class PrivacyGuideCookiesFragmentElement extends PrivacyGuideCookiesFragmentBase {
  constructor() {
    super(...arguments);
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'privacy-guide-cookies-fragment';
  }
  static get template() {
    return getTemplate$k();
  }
  static get properties() {
    return {
      prefs: { type: Object, notify: true },
      cookiePrimarySettingEnum_: { type: Object, value: CookiePrimarySetting },
    };
  }
  ready() {
    super.ready();
    this.addEventListener('view-enter-start', this.onViewEnterStart_);
    this.addEventListener('view-exit-finish', this.onViewExitFinish_);
  }
  focus() {
    this.shadowRoot.querySelector('[focus-element]').focus();
  }
  onViewEnterStart_() {
    this.startStateBlock3PIncognito_ =
      this.getPref('generated.cookie_primary_setting').value === CookiePrimarySetting.BLOCK_THIRD_PARTY_INCOGNITO;
    this.metricsBrowserProxy_.recordPrivacyGuideStepsEligibleAndReachedHistogram(
      PrivacyGuideStepsEligibleAndReached.COOKIES_REACHED
    );
  }
  onViewExitFinish_() {
    const endStateBlock3PIncognito =
      this.getPref('generated.cookie_primary_setting').value === CookiePrimarySetting.BLOCK_THIRD_PARTY_INCOGNITO;
    let state = null;
    if (this.startStateBlock3PIncognito_) {
      state = endStateBlock3PIncognito
        ? PrivacyGuideSettingsStates.BLOCK_3P_INCOGNITO_TO_3P_INCOGNITO
        : PrivacyGuideSettingsStates.BLOCK_3P_INCOGNITO_TO_3P;
    } else {
      state = endStateBlock3PIncognito
        ? PrivacyGuideSettingsStates.BLOCK_3P_TO_3P_INCOGNITO
        : PrivacyGuideSettingsStates.BLOCK_3P_TO_3P;
    }
    this.metricsBrowserProxy_.recordPrivacyGuideSettingsStatesHistogram(state);
  }
  onCookies3pIncognitoClick_() {
    this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.ChangeCookiesBlock3PIncognito');
  }
  onCookies3pClick_() {
    this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.ChangeCookiesBlock3P');
  }
  onRadioGroupKeyDown_(event) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        event.stopPropagation();
        break;
    }
  }
}
customElements.define(PrivacyGuideCookiesFragmentElement.is, PrivacyGuideCookiesFragmentElement);
// Copyright 2016 The Chromium Authors
var StatusAction;
(function (StatusAction) {
  StatusAction['NO_ACTION'] = 'noAction';
  StatusAction['REAUTHENTICATE'] = 'reauthenticate';
  StatusAction['UPGRADE_CLIENT'] = 'upgradeClient';
  StatusAction['ENTER_PASSPHRASE'] = 'enterPassphrase';
  StatusAction['RETRIEVE_TRUSTED_VAULT_KEYS'] = 'retrieveTrustedVaultKeys';
  StatusAction['CONFIRM_SYNC_SETTINGS'] = 'confirmSyncSettings';
})(StatusAction || (StatusAction = {}));
const syncPrefsIndividualDataTypes = [
  'appsSynced',
  'autofillSynced',
  'bookmarksSynced',
  'extensionsSynced',
  'readingListSynced',
  'passwordsSynced',
  'paymentsSynced',
  'preferencesSynced',
  'savedTabGroupsSynced',
  'tabsSynced',
  'themesSynced',
  'typedUrlsSynced',
  'wifiConfigurationsSynced',
];
var PageStatus;
(function (PageStatus) {
  PageStatus['SPINNER'] = 'spinner';
  PageStatus['CONFIGURE'] = 'configure';
  PageStatus['DONE'] = 'done';
  PageStatus['PASSPHRASE_FAILED'] = 'passphraseFailed';
})(PageStatus || (PageStatus = {}));
var TrustedVaultBannerState;
(function (TrustedVaultBannerState) {
  TrustedVaultBannerState[(TrustedVaultBannerState['NOT_SHOWN'] = 0)] = 'NOT_SHOWN';
  TrustedVaultBannerState[(TrustedVaultBannerState['OFFER_OPT_IN'] = 1)] = 'OFFER_OPT_IN';
  TrustedVaultBannerState[(TrustedVaultBannerState['OPTED_IN'] = 2)] = 'OPTED_IN';
})(TrustedVaultBannerState || (TrustedVaultBannerState = {}));
const PROMO_IMPRESSION_COUNT_KEY = 'signin-promo-count';
class SyncBrowserProxyImpl {
  startSignIn() {
    chrome.send('SyncSetupStartSignIn');
  }
  signOut(deleteProfile) {
    chrome.send('SyncSetupSignout', [deleteProfile]);
  }
  pauseSync() {
    chrome.send('SyncSetupPauseSync');
  }
  getPromoImpressionCount() {
    return parseInt(window.localStorage.getItem(PROMO_IMPRESSION_COUNT_KEY), 10) || 0;
  }
  incrementPromoImpressionCount() {
    window.localStorage.setItem(PROMO_IMPRESSION_COUNT_KEY, (this.getPromoImpressionCount() + 1).toString());
  }
  startKeyRetrieval() {
    chrome.send('SyncStartKeyRetrieval');
  }
  getSyncStatus() {
    return sendWithPromise('SyncSetupGetSyncStatus');
  }
  getStoredAccounts() {
    return sendWithPromise('SyncSetupGetStoredAccounts');
  }
  didNavigateToSyncPage() {
    chrome.send('SyncSetupShowSetupUI');
  }
  didNavigateAwayFromSyncPage(didAbort) {
    chrome.send('SyncSetupDidClosePage', [didAbort]);
  }
  setSyncDatatypes(syncPrefs) {
    return sendWithPromise('SyncSetupSetDatatypes', JSON.stringify(syncPrefs));
  }
  setEncryptionPassphrase(passphrase) {
    return sendWithPromise('SyncSetupSetEncryptionPassphrase', passphrase);
  }
  setDecryptionPassphrase(passphrase) {
    return sendWithPromise('SyncSetupSetDecryptionPassphrase', passphrase);
  }
  startSyncingWithEmail(email, isDefaultPromoAccount) {
    chrome.send('SyncSetupStartSyncingWithEmail', [email, isDefaultPromoAccount]);
  }
  openActivityControlsUrl() {
    chrome.metricsPrivate.recordUserAction('Signin_AccountSettings_GoogleActivityControlsClicked');
  }
  sendSyncPrefsChanged() {
    chrome.send('SyncPrefsDispatch');
  }
  sendTrustedVaultBannerStateChanged() {
    chrome.send('SyncTrustedVaultBannerStateDispatch');
  }
  static getInstance() {
    return instance$a || (instance$a = new SyncBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$a = obj;
  }
}
let instance$a = null;
// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var PrivacyGuideStep;
(function (PrivacyGuideStep) {
  PrivacyGuideStep['WELCOME'] = 'welcome';
  PrivacyGuideStep['MSBB'] = 'msbb';
  PrivacyGuideStep['HISTORY_SYNC'] = 'historySync';
  PrivacyGuideStep['SAFE_BROWSING'] = 'safeBrowsing';
  PrivacyGuideStep['COOKIES'] = 'cookies';
  PrivacyGuideStep['COMPLETION'] = 'completion';
})(PrivacyGuideStep || (PrivacyGuideStep = {}));
function getTemplate$j() {
  return html`<!--_html_template_start_--><style include="privacy-guide-fragment-shared"></style>
    <div class="header-phase2" focus-element tabindex="-1">
      <picture>
        <source srcset="./images/privacy_guide/history_sync_graphic_dark_v2.svg" media="(prefers-color-scheme: dark)" />
        <img alt="" src="./images/privacy_guide/history_sync_graphic_v2.svg" />
      </picture>
      <h2 class="header-label-phase2">閫夋嫨鏄惁瑕佸悓姝ュ巻鍙茶褰�</h2>
    </div>
    <div class="fragment-content">
      <div class="embedded-setting-wrapper">
        <settings-toggle-button
          id="historyToggle"
          pref="{{historySyncVirtualPref_}}"
          on-change="onToggleClick_"
          label="鍘嗗彶璁板綍鍚屾"
        >
        </settings-toggle-button>
      </div>
      <div class="description-wrapper two-column">
        <div class="description-column description-column-first">
          <div class="description-header">澶勪簬寮€鍚姸鎬佹椂</div>
          <div role="list">
            <privacy-guide-description-item
              role="listitem"
              icon="settings20:history"
              label="鎮ㄥ皢鑳藉鍦ㄦ墍鏈夊凡鍚屾鐨勮澶囦笂鏌ョ湅鎮ㄧ殑鍘嗗彶璁板綍锛屼互缁х画鎵ц鍏堝墠鏈畬鎴愮殑鎿嶄綔"
            >
            </privacy-guide-description-item>
            <privacy-guide-description-item
              role="listitem"
              icon="settings20:dns"
              label="濡傛灉 Google 涔熸槸鎮ㄧ殑榛樿鎼滅储寮曟搸锛屾偍灏嗕細鐪嬪埌鏇村疄鐢ㄣ€佷笌涓婁笅鏂囨洿鐩稿叧鐨勫缓璁�"
            >
            </privacy-guide-description-item>
          </div>
        </div>
        <div class="description-column">
          <div class="description-header">娉ㄦ剰浜嬮」</div>
          <div role="list">
            <privacy-guide-description-item
              role="listitem"
              icon="settings20:link"
              label="绯荤粺浼氬皢鎮ㄨ闂殑缃戝潃淇濆瓨鍒版偍鐨� Google 甯愬彿涓�"
            >
            </privacy-guide-description-item>
          </div>
        </div>
      </div>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
const PrivacyGuideHistorySyncFragmentElementBase = RouteObserverMixin(WebUiListenerMixin(BaseMixin(PolymerElement)));
class PrivacyGuideHistorySyncFragmentElement extends PrivacyGuideHistorySyncFragmentElementBase {
  constructor() {
    super(...arguments);
    this.syncBrowserProxy_ = SyncBrowserProxyImpl.getInstance();
    this.syncAllCache_ = null;
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
    this.firstSyncPrefUpdate_ = true;
  }
  static get is() {
    return 'privacy-guide-history-sync-fragment';
  }
  static get template() {
    return getTemplate$j();
  }
  static get properties() {
    return {
      prefs: { type: Object, notify: true },
      historySyncVirtualPref_: {
        type: Object,
        notify: true,
        value() {
          return { type: chrome.settingsPrivate.PrefType.BOOLEAN, value: false };
        },
      },
    };
  }
  ready() {
    super.ready();
    this.addEventListener('view-enter-start', this.onViewEnterStart_);
    this.addEventListener('view-exit-finish', this.onViewExitFinish_);
    this.addWebUiListener('sync-prefs-changed', (syncPrefs) => this.onSyncPrefsChange_(syncPrefs));
    this.syncBrowserProxy_.sendSyncPrefsChanged();
  }
  focus() {
    this.shadowRoot.querySelector('[focus-element]').focus();
  }
  onViewEnterStart_() {
    this.metricsBrowserProxy_.recordPrivacyGuideStepsEligibleAndReachedHistogram(
      PrivacyGuideStepsEligibleAndReached.HISTORY_SYNC_REACHED
    );
  }
  onViewExitFinish_() {
    const endStateHistorySyncOn = this.syncPrefs_.typedUrlsSynced;
    let state = null;
    if (this.startStateHistorySyncOn_) {
      state = endStateHistorySyncOn
        ? PrivacyGuideSettingsStates.HISTORY_SYNC_ON_TO_ON
        : PrivacyGuideSettingsStates.HISTORY_SYNC_ON_TO_OFF;
    } else {
      state = endStateHistorySyncOn
        ? PrivacyGuideSettingsStates.HISTORY_SYNC_OFF_TO_ON
        : PrivacyGuideSettingsStates.HISTORY_SYNC_OFF_TO_OFF;
    }
    this.metricsBrowserProxy_.recordPrivacyGuideSettingsStatesHistogram(state);
    this.firstSyncPrefUpdate_ = true;
  }
  currentRouteChanged(newRoute) {
    if (
      newRoute === routes.PRIVACY_GUIDE &&
      Router.getInstance().getQueryParameters().get('step') === PrivacyGuideStep.HISTORY_SYNC
    ) {
      this.syncAllCache_ = null;
    }
  }
  onSyncPrefsChange_(syncPrefs) {
    this.syncPrefs_ = syncPrefs;
    if (this.syncAllCache_ === null) {
      this.syncAllCache_ = this.syncPrefs_.syncAllDataTypes;
    }
    this.set('historySyncVirtualPref_.value', this.syncPrefs_.syncAllDataTypes || this.syncPrefs_.typedUrlsSynced);
    if (this.firstSyncPrefUpdate_) {
      this.startStateHistorySyncOn_ = this.syncPrefs_.typedUrlsSynced;
      this.firstSyncPrefUpdate_ = false;
    }
  }
  onToggleClick_() {
    this.syncPrefs_.typedUrlsSynced = this.historySyncVirtualPref_.value;
    this.syncPrefs_.syncAllDataTypes = this.shouldSyncAllBeOn_();
    this.syncBrowserProxy_.setSyncDatatypes(this.syncPrefs_);
    if (this.syncPrefs_.typedUrlsSynced) {
      this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.ChangeHistorySyncOn');
    } else {
      this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.ChangeHistorySyncOff');
    }
  }
  shouldSyncAllBeOn_() {
    if (!this.syncAllCache_) {
      return false;
    }
    for (const datatype of syncPrefsIndividualDataTypes) {
      if (this.syncPrefs_[datatype]) {
        continue;
      }
      if (datatype === 'wifiConfigurationsSynced' && !this.syncPrefs_.wifiConfigurationsRegistered) {
        continue;
      }
      return false;
    }
    return true;
  }
}
customElements.define(PrivacyGuideHistorySyncFragmentElement.is, PrivacyGuideHistorySyncFragmentElement);
function getTemplate$i() {
  return html`<!--_html_template_start_--><style include="privacy-guide-fragment-shared"></style>
    <div class="header-phase2" focus-element tabindex="-1">
      <picture>
        <source srcset="./images/privacy_guide/msbb_graphic_dark_v2.svg" media="(prefers-color-scheme: dark)" />
        <img alt="" src="./images/privacy_guide/msbb_graphic_v2.svg" />
      </picture>
      <h2 class="header-label-phase2">閫夋嫨鎮ㄦ墍闇€鐨勬悳绱㈠拰娴忚璐ㄩ噺</h2>
    </div>
    <div class="fragment-content">
      <div class="embedded-setting-wrapper">
        <settings-toggle-button
          id="urlCollectionToggle"
          pref="{{prefs.url_keyed_anonymized_data_collection.enabled}}"
          label="鏀瑰杽鎼滅储鍜屾祻瑙堜綋楠�"
          on-change="onMsbbToggleClick_"
        >
        </settings-toggle-button>
      </div>
      <div class="description-wrapper two-column">
        <div class="description-column description-column-first">
          <div class="description-header">澶勪簬寮€鍚姸鎬佹椂</div>
          <div role="list">
            <privacy-guide-description-item
              role="listitem"
              icon="settings20:flash-on"
              label="鎮ㄧ殑娴忚閫熷害浼氭洿蹇紝鍥犱负绯荤粺浼氭牴鎹偍褰撳墠璁块棶鐨勭綉椤典富鍔ㄥ姞杞藉唴瀹�"
            >
            </privacy-guide-description-item>
            <privacy-guide-description-item
              role="listitem"
              icon="settings20:lightbulb"
              label="鎮ㄤ細鍦ㄥ湴鍧€鏍忎腑鑾峰緱缁忚繃鏀硅繘鐨勫缓璁�"
            >
            </privacy-guide-description-item>
          </div>
        </div>
        <div class="description-column">
          <div class="description-header">娉ㄦ剰浜嬮」</div>
          <div role="list">
            <privacy-guide-description-item
              role="listitem"
              icon="settings20:link"
              label="绯荤粺浼氬皢鎮ㄨ闂繃鐨勭綉鍧€鍙戦€佺粰 Google锛屼互棰勬祴鎮ㄦ帴涓嬫潵鍙兘浼氳闂殑缃戠珯"
            >
            </privacy-guide-description-item>
            <privacy-guide-description-item
              role="listitem"
              icon="settings20:data-connectors-system"
              label="濡傛灉鎮ㄨ繕鍏变韩浜� Chrome 浣跨敤鎯呭喌鎶ュ憡锛岃繖浜涙姤鍛婁細鍖呭惈鎮ㄨ闂繃鐨勭綉鍧€"
            >
            </privacy-guide-description-item>
          </div>
        </div>
      </div>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
const PrivacyGuideMsbbFragmentBase = PrefsMixin(PolymerElement);
class PrivacyGuideMsbbFragmentElement extends PrivacyGuideMsbbFragmentBase {
  constructor() {
    super(...arguments);
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'privacy-guide-msbb-fragment';
  }
  static get template() {
    return getTemplate$i();
  }
  static get properties() {
    return { prefs: { type: Object, notify: true } };
  }
  ready() {
    super.ready();
    this.addEventListener('view-enter-start', this.onViewEnterStart_);
    this.addEventListener('view-exit-finish', this.onViewExitFinish_);
  }
  focus() {
    this.shadowRoot.querySelector('[focus-element]').focus();
  }
  onViewEnterStart_() {
    this.startStateMsbbOn_ = this.getPref('url_keyed_anonymized_data_collection.enabled').value;
    this.metricsBrowserProxy_.recordPrivacyGuideStepsEligibleAndReachedHistogram(
      PrivacyGuideStepsEligibleAndReached.MSBB_REACHED
    );
  }
  onViewExitFinish_() {
    const endStateMsbbOn = this.getPref('url_keyed_anonymized_data_collection.enabled').value;
    let state = null;
    if (this.startStateMsbbOn_) {
      state = endStateMsbbOn ? PrivacyGuideSettingsStates.MSBB_ON_TO_ON : PrivacyGuideSettingsStates.MSBB_ON_TO_OFF;
    } else {
      state = endStateMsbbOn ? PrivacyGuideSettingsStates.MSBB_OFF_TO_ON : PrivacyGuideSettingsStates.MSBB_OFF_TO_OFF;
    }
    this.metricsBrowserProxy_.recordPrivacyGuideSettingsStatesHistogram(state);
  }
  onMsbbToggleClick_() {
    if (this.getPref('url_keyed_anonymized_data_collection.enabled').value) {
      this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.ChangeMSBBOn');
    } else {
      this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.ChangeMSBBOff');
    }
  }
}
customElements.define(PrivacyGuideMsbbFragmentElement.is, PrivacyGuideMsbbFragmentElement);
function getTemplate$h() {
  return html`<!--_html_template_start_--><style include="cr-hidden-style cr-input-style cr-shared-style">
      textarea {
        display: block;
        resize: none;
      }
      #input-container {
        background-color: var(--cr-input-background-color);
      }
      :host([autogrow][has-max-height]) #input-container {
        box-sizing: content-box;
        max-height: var(--cr-textarea-autogrow-max-height);
        min-height: 1lh;
      }
      :host([invalid]) #underline {
        border-color: var(--cr-input-error-color);
      }
      :host-context([chrome-refresh-2023]) #input {
        padding-bottom: var(--cr-input-padding-bottom);
        padding-inline-end: var(--cr-input-padding-end);
        padding-inline-start: var(--cr-input-padding-start);
        padding-top: var(--cr-input-padding-top);
      }
      #footerContainer {
        border-top: 0;
        display: var(--cr-textarea-footer-display, none);
        font-size: var(--cr-form-field-label-font-size);
        height: var(--cr-form-field-label-height);
        justify-content: space-between;
        line-height: var(--cr-form-field-label-line-height);
        margin: 8px 0;
        min-height: 0;
        padding: 0;
        white-space: var(--cr-input-error-white-space);
      }
      :host([invalid]) #footerContainer,
      :host([invalid]) #label {
        color: var(--cr-input-error-color);
      }
      #mirror {
        display: none;
      }
      :host([autogrow]) #mirror {
        display: block;
        visibility: hidden;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      :host([autogrow]) #mirror,
      :host([autogrow]) textarea {
        border: 0;
        box-sizing: border-box;
        padding-bottom: var(--cr-input-padding-bottom, 6px);
        padding-inline-end: var(--cr-input-padding-end, 8px);
        padding-inline-start: var(--cr-input-padding-start, 8px);
        padding-top: var(--cr-input-padding-top, 6px);
      }
      :host([autogrow]) textarea {
        height: 100%;
        left: 0;
        overflow: hidden;
        position: absolute;
        resize: none;
        top: 0;
        width: 100%;
      }
      :host([autogrow][has-max-height]) #mirror,
      :host([autogrow][has-max-height]) textarea {
        overflow-x: hidden;
        overflow-y: auto;
      }
      :host-context([chrome-refresh-2023]) textarea {
        position: relative;
        z-index: 1;
      }
    </style>
    <div id="label" class="cr-form-field-label" hidden="[[!label]]" aria-hidden="true">[[label]]</div>
    <div id="input-container">
      <div id="mirror">[[calculateMirror_(value)]]</div>

      <div id="hover-layer"></div>
      <textarea
        id="input"
        autofocus="[[autofocus]]"
        rows="[[rows]]"
        value="{{value::input}}"
        aria-label$="[[label]]"
        on-focus="onInputFocusChange_"
        on-blur="onInputFocusChange_"
        on-change="onInputChange_"
        disabled="[[disabled]]"
        maxlength$="[[maxlength]]"
        readonly$="[[readonly]]"
        required$="[[required]]"
      ></textarea>
      <div id="underline-base"></div>
      <div id="underline"></div>
    </div>
    <div id="footerContainer" class="cr-row">
      <div id="firstFooter" aria-live="[[getFooterAria_(invalid)]]">[[firstFooter]]</div>
      <div id="secondFooter" aria-live="[[getFooterAria_(invalid)]]">[[secondFooter]]</div>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2018 The Chromium Authors
class CrTextareaElement extends PolymerElement {
  static get is() {
    return 'cr-textarea';
  }
  static get template() {
    return getTemplate$h();
  }
  static get properties() {
    return {
      autofocus: { type: Boolean, value: false, reflectToAttribute: true },
      disabled: { type: Boolean, value: false, reflectToAttribute: true, observer: 'onDisabledChanged_' },
      required: { type: Boolean, value: false, reflectToAttribute: true },
      maxlength: { type: Number },
      readonly: Boolean,
      rows: { type: Number, value: 3, reflectToAttribute: true },
      label: { type: String, value: '' },
      value: { type: String, value: '', notify: true },
      autogrow: { type: Boolean, value: false, reflectToAttribute: true },
      hasMaxHeight: { type: Boolean, value: false, reflectToAttribute: true },
      invalid: { type: Boolean, value: false, reflectToAttribute: true },
      firstFooter: { type: String, value: '' },
      secondFooter: { type: String, value: '' },
    };
  }
  focusInput() {
    this.$.input.focus();
  }
  onInputChange_(e) {
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: { sourceEvent: e } }));
  }
  calculateMirror_() {
    if (!this.autogrow) {
      return '';
    }
    const tokens = this.value ? this.value.split('\n') : [''];
    while (this.rows > 0 && tokens.length < this.rows) {
      tokens.push('');
    }
    return tokens.join('\n') + '&nbsp;';
  }
  onInputFocusChange_() {
    if (this.shadowRoot.activeElement === this.$.input) {
      this.setAttribute('focused_', '');
    } else {
      this.removeAttribute('focused_');
    }
  }
  onDisabledChanged_() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }
  getFooterAria_() {
    return this.invalid ? 'assertive' : 'polite';
  }
}
customElements.define(CrTextareaElement.is, CrTextareaElement);
// Copyright 2016 The Chromium Authors
var SecureDnsMode;
(function (SecureDnsMode) {
  SecureDnsMode['OFF'] = 'off';
  SecureDnsMode['AUTOMATIC'] = 'automatic';
  SecureDnsMode['SECURE'] = 'secure';
})(SecureDnsMode || (SecureDnsMode = {}));
var SecureDnsUiManagementMode;
(function (SecureDnsUiManagementMode) {
  SecureDnsUiManagementMode[(SecureDnsUiManagementMode['NO_OVERRIDE'] = 0)] = 'NO_OVERRIDE';
  SecureDnsUiManagementMode[(SecureDnsUiManagementMode['DISABLED_MANAGED'] = 1)] = 'DISABLED_MANAGED';
  SecureDnsUiManagementMode[(SecureDnsUiManagementMode['DISABLED_PARENTAL_CONTROLS'] = 2)] =
    'DISABLED_PARENTAL_CONTROLS';
})(SecureDnsUiManagementMode || (SecureDnsUiManagementMode = {}));
class PrivacyPageBrowserProxyImpl {
  getMetricsReporting() {
    return sendWithPromise('getMetricsReporting');
  }
  setMetricsReportingEnabled(enabled) {
    chrome.send('setMetricsReportingEnabled', [enabled]);
  }
  setBlockAutoplayEnabled(enabled) {
    chrome.send('setBlockAutoplayEnabled', [enabled]);
  }
  showManageSslCertificates() {
    chrome.send('showManageSSLCertificates');
  }
  getSecureDnsResolverList() {
    return sendWithPromise('getSecureDnsResolverList');
  }
  getSecureDnsSetting() {
    return sendWithPromise('getSecureDnsSetting');
  }
  isValidConfig(entry) {
    return sendWithPromise('isValidConfig', entry);
  }
  probeConfig(entry) {
    return sendWithPromise('probeConfig', entry);
  }
  recordUserDropdownInteraction(oldSelection, newSelection) {
    chrome.send('recordUserDropdownInteraction', [oldSelection, newSelection]);
  }
  static getInstance() {
    return instance$9 || (instance$9 = new PrivacyPageBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$9 = obj;
  }
}
let instance$9 = null;
function getTemplate$g() {
  return html`<!--_html_template_start_-->
    <style>
      :host {
        cursor: auto;
        display: block;
        width: 100%;
      }
      cr-textarea {
        width: 100%;
        --cr-input-width: 75%;
        --cr-textarea-footer-display: flex;
      }
    </style>

    <cr-textarea
      id="input"
      value="{{value}}"
      rows="1"
      autogrow="true"
      placeholder="璇疯緭鍏ヨ嚜瀹氫箟鎻愪緵鍟�"
      invalid="[[showError_]]"
      first-footer="[[errorText_]]"
      maxlength="102400"
      spellcheck="false"
      on-keypress="onKeyPress_"
      on-input="onInput_"
      on-blur="validate"
      on-change="validate"
    >
    </cr-textarea>
    <!--_html_template_end_-->`;
}
// Copyright 2020 The Chromium Authors
class SecureDnsInputElement extends PolymerElement {
  constructor() {
    super(...arguments);
    this.browserProxy_ = PrivacyPageBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'secure-dns-input';
  }
  static get template() {
    return getTemplate$g();
  }
  static get properties() {
    return {
      value: String,
      showError_: { type: Boolean, computed: 'isInvalid_(errorText_)' },
      errorText_: { type: String, value: '' },
    };
  }
  onKeyPress_(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.validate();
    }
  }
  onInput_() {
    this.errorText_ = '';
  }
  async validate() {
    this.errorText_ = '';
    const valueToValidate = this.value;
    const valid = await this.browserProxy_.isValidConfig(valueToValidate);
    const successfulProbe = valid && (await this.browserProxy_.probeConfig(valueToValidate));
    if (valueToValidate === this.value && this.value !== '' && !successfulProbe) {
      this.errorText_ = loadTimeData.getString(valid ? 'secureDnsCustomConnectionError' : 'secureDnsCustomFormatError');
    }
    this.dispatchEvent(
      new CustomEvent('value-update', {
        bubbles: true,
        composed: true,
        detail: { isValid: valid, text: valueToValidate },
      })
    );
  }
  focus() {
    this.$.input.focusInput();
  }
  isInvalid_() {
    return this.errorText_.length > 0;
  }
}
customElements.define(SecureDnsInputElement.is, SecureDnsInputElement);
function getTemplate$f() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style md-select">
      #automaticRadioButton {
        align-items: flex-start;
        min-height: var(--cr-section-min-height);
        padding: 6px 0;
        --cr-radio-button-disc-margin-block-start: calc((1.54em - var(--cr-radio-button-size)) / 2);
      }
      #secureDnsRadioGroup {
        display: block;
        padding-inline-end: var(--cr-section-padding);
        padding-inline-start: var(--cr-section-indent-padding);
      }
      #secureResolverSelectRadioButton {
        align-items: flex-start;
        --cr-radio-button-disc-margin-block-start: calc((1.54em + 12px - var(--cr-radio-button-size)) / 2);
      }
      #secureRadioButtonItem {
        align-items: baseline;
        display: flex;
        min-height: var(--cr-section-min-height);
      }
      #secureRadioButtonItemInner {
        margin-inline-start: 0.5em;
        width: 80%;
      }
      #privacyPolicy {
        display: none;
        padding: 8px;
      }
      #privacyPolicy a {
        color: var(--cr-link-color);
      }
      #secureDnsInput {
        margin-top: 6px;
      }
    </style>
    <settings-toggle-button
      id="secureDnsToggle"
      class="hr"
      pref="{{secureDnsToggle_}}"
      label="浣跨敤瀹夊叏 DNS"
      sub-label="[[secureDnsDescription_]]"
      on-change="onToggleChanged_"
    >
    </settings-toggle-button>
    <cr-radio-group
      id="secureDnsRadioGroup"
      selected="{{secureDnsRadio_}}"
      on-selected-changed="onRadioSelectionChanged_"
      hidden="[[!showRadioGroup_]]"
    >
      <cr-radio-button
        id="automaticRadioButton"
        name="[[secureDnsModeEnum_.AUTOMATIC]]"
        label="浣跨敤鎮ㄥ綋鍓嶇殑鏈嶅姟鎻愪緵鍟�"
      >
        <div class="cr-secondary-text">瀹夊叏 DNS 鏈繀涓€鐩村彲鐢�</div>
      </cr-radio-button>
      <cr-radio-button
        id="secureResolverSelectRadioButton"
        name="[[secureDnsModeEnum_.SECURE]]"
        aria-label="浣跨敤鎮ㄩ€夋嫨鐨勬彁渚涘晢"
      >
        <div id="secureRadioButtonItem">
          浣跨敤
          <div id="secureRadioButtonItemInner">
            <select
              id="secureResolverSelect"
              class="md-select"
              aria-label="鎻愪緵鍟嗛€夐」"
              on-click="stopEventPropagation_"
              on-change="onDropdownSelectionChanged_"
            >
              <template is="dom-repeat" items="[[resolverOptions_]]">
                <option value="[[item.value]]">[[item.name]]</option>
              </template>
            </select>
            <div id="privacyPolicy" class="cr-secondary-text" inner-h-t-m-l="[[privacyPolicyString_]]"></div>
            <secure-dns-input
              id="secureDnsInput"
              value="[[secureDnsInputValue_]]"
              on-value-update="onSecureDnsInputEvaluated_"
              on-click="stopEventPropagation_"
            >
            </secure-dns-input>
          </div>
        </div>
      </cr-radio-button>
    </cr-radio-group>
    <!--_html_template_end_-->`;
}
// Copyright 2020 The Chromium Authors
const SettingsSecureDnsElementBase = WebUiListenerMixin(PrefsMixin(PolymerElement));
class SettingsSecureDnsElement extends SettingsSecureDnsElementBase {
  constructor() {
    super(...arguments);
    this.browserProxy_ = PrivacyPageBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-secure-dns';
  }
  static get template() {
    return getTemplate$f();
  }
  static get properties() {
    return {
      prefs: { type: Object, notify: true },
      secureDnsModeEnum_: { type: Object, value: SecureDnsMode },
      secureDnsDescription_: String,
      secureDnsToggle_: {
        type: Object,
        value() {
          return { type: chrome.settingsPrivate.PrefType.BOOLEAN, value: false };
        },
      },
      showRadioGroup_: Boolean,
      secureDnsRadio_: { type: String, value: SecureDnsMode.AUTOMATIC },
      resolverOptions_: Array,
      lastResolverOption_: String,
      privacyPolicyString_: String,
      secureDnsInputValue_: String,
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.browserProxy_.getSecureDnsResolverList().then((resolvers) => {
      this.resolverOptions_ = resolvers;
      this.lastResolverOption_ = this.resolverOptions_[0].value;
      this.browserProxy_.getSecureDnsSetting().then((setting) => this.onSecureDnsPrefsChanged_(setting));
      this.addWebUiListener('secure-dns-setting-changed', (setting) => this.onSecureDnsPrefsChanged_(setting));
    });
  }
  onSecureDnsPrefsChanged_(setting) {
    switch (setting.mode) {
      case SecureDnsMode.SECURE:
        this.set('secureDnsToggle_.value', true);
        this.secureDnsRadio_ = SecureDnsMode.SECURE;
        this.updateConfigRepresentation_(setting.config);
        this.updatePrivacyPolicyLine_();
        break;
      case SecureDnsMode.AUTOMATIC:
        this.set('secureDnsToggle_.value', true);
        this.secureDnsRadio_ = SecureDnsMode.AUTOMATIC;
        break;
      case SecureDnsMode.OFF:
        this.set('secureDnsToggle_.value', false);
        break;
      default:
        assertNotReached('Received unknown secure DNS mode');
    }
    this.updateManagementView_(setting);
  }
  onToggleChanged_() {
    this.showRadioGroup_ = this.secureDnsToggle_.value;
    if (this.secureDnsRadio_ === SecureDnsMode.SECURE && !this.$.secureResolverSelect.value) {
      this.$.secureDnsInput.focus();
    }
    this.updateDnsPrefs_(this.secureDnsToggle_.value ? this.secureDnsRadio_ : SecureDnsMode.OFF);
  }
  onRadioSelectionChanged_(event) {
    if (event.detail.value === SecureDnsMode.SECURE && !this.$.secureResolverSelect.value) {
      this.$.secureDnsInput.focus();
    }
    this.updateDnsPrefs_(event.detail.value);
  }
  updateDnsPrefs_(mode, templates = '') {
    switch (mode) {
      case SecureDnsMode.SECURE:
        if (!this.$.secureResolverSelect.value) {
          if (!templates) {
            return;
          }
          this.setPrefValue('dns_over_https.templates', templates);
        } else {
          this.setPrefValue('dns_over_https.templates', this.$.secureResolverSelect.value);
        }
        this.setPrefValue('dns_over_https.mode', mode);
        break;
      case SecureDnsMode.AUTOMATIC:
      case SecureDnsMode.OFF:
        this.setPrefValue('dns_over_https.mode', mode);
        this.setPrefValue('dns_over_https.templates', '');
        break;
      default:
        assertNotReached('Received unknown secure DNS mode');
    }
  }
  stopEventPropagation_(event) {
    event.stopPropagation();
  }
  onDropdownSelectionChanged_() {
    if (this.secureDnsRadio_ === SecureDnsMode.SECURE) {
      this.updateDnsPrefs_(SecureDnsMode.SECURE);
    }
    this.updatePrivacyPolicyLine_();
    if (!this.$.secureResolverSelect.value) {
      this.$.secureDnsInput.focus();
    }
    this.browserProxy_.recordUserDropdownInteraction(this.lastResolverOption_, this.$.secureResolverSelect.value);
    this.lastResolverOption_ = this.$.secureResolverSelect.value;
  }
  updateManagementView_(setting) {
    if (this.prefs === undefined) {
      return;
    }
    const pref = { key: '', type: chrome.settingsPrivate.PrefType.BOOLEAN, value: this.secureDnsToggle_.value };
    let secureDescription = loadTimeData.getString('secureDnsDescription');
    if (this.getPref('dns_over_https.mode').enforcement === chrome.settingsPrivate.Enforcement.ENFORCED) {
      pref.enforcement = chrome.settingsPrivate.Enforcement.ENFORCED;
      pref.controlledBy = this.getPref('dns_over_https.mode').controlledBy;
      this.secureDnsDescription_ = secureDescription;
    } else {
      switch (setting.managementMode) {
        case SecureDnsUiManagementMode.NO_OVERRIDE:
          this.secureDnsDescription_ = secureDescription;
          break;
        case SecureDnsUiManagementMode.DISABLED_MANAGED:
          pref.enforcement = chrome.settingsPrivate.Enforcement.ENFORCED;
          this.secureDnsDescription_ = loadTimeData.getString('secureDnsDisabledForManagedEnvironment');
          break;
        case SecureDnsUiManagementMode.DISABLED_PARENTAL_CONTROLS:
          pref.enforcement = chrome.settingsPrivate.Enforcement.ENFORCED;
          this.secureDnsDescription_ = loadTimeData.getString('secureDnsDisabledForParentalControl');
          break;
        default:
          assertNotReached('Received unknown secure DNS management mode ' + setting.managementMode);
      }
    }
    this.secureDnsToggle_ = pref;
    if (this.secureDnsToggle_.enforcement === chrome.settingsPrivate.Enforcement.ENFORCED) {
      this.showRadioGroup_ = false;
    } else {
      this.showRadioGroup_ = this.secureDnsToggle_.value;
    }
  }
  updateConfigRepresentation_(secureDnsConfig) {
    const resolver = this.resolverOptions_.slice(1).find((r) => r.value === secureDnsConfig);
    if (resolver) {
      this.$.secureResolverSelect.value = resolver.value;
      this.lastResolverOption_ = resolver.value;
      return;
    }
    this.$.secureResolverSelect.value = '';
    this.lastResolverOption_ = '';
    if (secureDnsConfig.length > 0) {
      this.secureDnsInputValue_ = secureDnsConfig;
    }
  }
  updatePrivacyPolicyLine_() {
    if (!this.$.secureResolverSelect.value) {
      this.$.privacyPolicy.style.display = 'none';
      this.$.secureDnsInput.style.display = 'block';
      return;
    }
    this.$.privacyPolicy.style.display = 'block';
    this.$.secureDnsInput.style.display = 'none';
    const resolver = this.resolverOptions_.find((r) => r.value === this.$.secureResolverSelect.value);
    if (!resolver) {
      return;
    }
    this.privacyPolicyString_ = sanitizeInnerHtml(
      loadTimeData.substituteString(loadTimeData.getString('secureDnsSecureDropdownModePrivacyPolicy'), resolver.policy)
    );
  }
  onSecureDnsInputEvaluated_(event) {
    if (event.detail.isValid) {
      this.updateDnsPrefs_(this.secureDnsRadio_, event.detail.text);
    }
  }
}
customElements.define(SettingsSecureDnsElement.is, SettingsSecureDnsElement);
function getTemplate$e() {
  return html`<!--_html_template_start_--><cr-dialog id="dialog" close-text="鍏抽棴" show-on-attach>
      <div slot="title">[[titleText]]</div>
      <div slot="body">[[bodyText]]</div>
      <div slot="button-container">
        <cr-button id="cancel" class="cancel-button" on-click="onCancelClick_"> 鍙栨秷 </cr-button>
        <cr-button id="confirm" class$="[[getConfirmButtonCssClass_(noPrimaryButton)]]" on-click="onConfirmClick_">
          [[confirmText]]
        </cr-button>
      </div>
    </cr-dialog>
    <!--_html_template_end_-->`;
}
// Copyright 2023 The Chromium Authors
class SettingsSimpleConfirmationDialogElement extends PolymerElement {
  static get is() {
    return 'settings-simple-confirmation-dialog';
  }
  static get template() {
    return getTemplate$e();
  }
  static get properties() {
    return {
      titleText: String,
      bodyText: String,
      confirmText: String,
      noPrimaryButton: { type: Boolean, value: false },
    };
  }
  wasConfirmed() {
    return this.$.dialog.getNative().returnValue === 'success';
  }
  onCancelClick_() {
    this.$.dialog.cancel();
  }
  onConfirmClick_() {
    this.$.dialog.close();
  }
  getConfirmButtonCssClass_() {
    return this.noPrimaryButton ? '' : 'action-button';
  }
}
customElements.define(SettingsSimpleConfirmationDialogElement.is, SettingsSimpleConfirmationDialogElement);
const PointSpec = { $: {} };
const PointFSpec = { $: {} };
const Point3FSpec = { $: {} };
const SizeSpec = { $: {} };
const SizeFSpec = { $: {} };
const RectSpec = { $: {} };
const RectFSpec = { $: {} };
const InsetsSpec = { $: {} };
const InsetsFSpec = { $: {} };
const Vector2dSpec = { $: {} };
const Vector2dFSpec = { $: {} };
const Vector3dFSpec = { $: {} };
const QuaternionSpec = { $: {} };
const QuadFSpec = { $: {} };
mojo.internal.Struct(
  PointSpec.$,
  'Point',
  [
    mojo.internal.StructField('x', 0, 0, mojo.internal.Int32, 0, false, 0),
    mojo.internal.StructField('y', 4, 0, mojo.internal.Int32, 0, false, 0),
  ],
  [[0, 16]]
);
mojo.internal.Struct(
  PointFSpec.$,
  'PointF',
  [
    mojo.internal.StructField('x', 0, 0, mojo.internal.Float, 0, false, 0),
    mojo.internal.StructField('y', 4, 0, mojo.internal.Float, 0, false, 0),
  ],
  [[0, 16]]
);
mojo.internal.Struct(
  Point3FSpec.$,
  'Point3F',
  [
    mojo.internal.StructField('x', 0, 0, mojo.internal.Float, 0, false, 0),
    mojo.internal.StructField('y', 4, 0, mojo.internal.Float, 0, false, 0),
    mojo.internal.StructField('z', 8, 0, mojo.internal.Float, 0, false, 0),
  ],
  [[0, 24]]
);
mojo.internal.Struct(
  SizeSpec.$,
  'Size',
  [
    mojo.internal.StructField('width', 0, 0, mojo.internal.Int32, 0, false, 0),
    mojo.internal.StructField('height', 4, 0, mojo.internal.Int32, 0, false, 0),
  ],
  [[0, 16]]
);
mojo.internal.Struct(
  SizeFSpec.$,
  'SizeF',
  [
    mojo.internal.StructField('width', 0, 0, mojo.internal.Float, 0, false, 0),
    mojo.internal.StructField('height', 4, 0, mojo.internal.Float, 0, false, 0),
  ],
  [[0, 16]]
);
mojo.internal.Struct(
  RectSpec.$,
  'Rect',
  [
    mojo.internal.StructField('x', 0, 0, mojo.internal.Int32, 0, false, 0),
    mojo.internal.StructField('y', 4, 0, mojo.internal.Int32, 0, false, 0),
    mojo.internal.StructField('width', 8, 0, mojo.internal.Int32, 0, false, 0),
    mojo.internal.StructField('height', 12, 0, mojo.internal.Int32, 0, false, 0),
  ],
  [[0, 24]]
);
mojo.internal.Struct(
  RectFSpec.$,
  'RectF',
  [
    mojo.internal.StructField('x', 0, 0, mojo.internal.Float, 0, false, 0),
    mojo.internal.StructField('y', 4, 0, mojo.internal.Float, 0, false, 0),
    mojo.internal.StructField('width', 8, 0, mojo.internal.Float, 0, false, 0),
    mojo.internal.StructField('height', 12, 0, mojo.internal.Float, 0, false, 0),
  ],
  [[0, 24]]
);
class RectF {
  constructor() {
    this.x;
    this.y;
    this.width;
    this.height;
  }
}
mojo.internal.Struct(
  InsetsSpec.$,
  'Insets',
  [
    mojo.internal.StructField('top', 0, 0, mojo.internal.Int32, 0, false, 0),
    mojo.internal.StructField('left', 4, 0, mojo.internal.Int32, 0, false, 0),
    mojo.internal.StructField('bottom', 8, 0, mojo.internal.Int32, 0, false, 0),
    mojo.internal.StructField('right', 12, 0, mojo.internal.Int32, 0, false, 0),
  ],
  [[0, 24]]
);
mojo.internal.Struct(
  InsetsFSpec.$,
  'InsetsF',
  [
    mojo.internal.StructField('top', 0, 0, mojo.internal.Float, 0, false, 0),
    mojo.internal.StructField('left', 4, 0, mojo.internal.Float, 0, false, 0),
    mojo.internal.StructField('bottom', 8, 0, mojo.internal.Float, 0, false, 0),
    mojo.internal.StructField('right', 12, 0, mojo.internal.Float, 0, false, 0),
  ],
  [[0, 24]]
);
class InsetsF {
  constructor() {
    this.top;
    this.left;
    this.bottom;
    this.right;
  }
}
mojo.internal.Struct(
  Vector2dSpec.$,
  'Vector2d',
  [
    mojo.internal.StructField('x', 0, 0, mojo.internal.Int32, 0, false, 0),
    mojo.internal.StructField('y', 4, 0, mojo.internal.Int32, 0, false, 0),
  ],
  [[0, 16]]
);
mojo.internal.Struct(
  Vector2dFSpec.$,
  'Vector2dF',
  [
    mojo.internal.StructField('x', 0, 0, mojo.internal.Float, 0, false, 0),
    mojo.internal.StructField('y', 4, 0, mojo.internal.Float, 0, false, 0),
  ],
  [[0, 16]]
);
mojo.internal.Struct(
  Vector3dFSpec.$,
  'Vector3dF',
  [
    mojo.internal.StructField('x', 0, 0, mojo.internal.Float, 0, false, 0),
    mojo.internal.StructField('y', 4, 0, mojo.internal.Float, 0, false, 0),
    mojo.internal.StructField('z', 8, 0, mojo.internal.Float, 0, false, 0),
  ],
  [[0, 24]]
);
mojo.internal.Struct(
  QuaternionSpec.$,
  'Quaternion',
  [
    mojo.internal.StructField('x', 0, 0, mojo.internal.Double, 0, false, 0),
    mojo.internal.StructField('y', 8, 0, mojo.internal.Double, 0, false, 0),
    mojo.internal.StructField('z', 16, 0, mojo.internal.Double, 0, false, 0),
    mojo.internal.StructField('w', 24, 0, mojo.internal.Double, 0, false, 0),
  ],
  [[0, 40]]
);
mojo.internal.Struct(
  QuadFSpec.$,
  'QuadF',
  [
    mojo.internal.StructField('p1', 0, 0, PointFSpec.$, null, false, 0),
    mojo.internal.StructField('p2', 8, 0, PointFSpec.$, null, false, 0),
    mojo.internal.StructField('p3', 16, 0, PointFSpec.$, null, false, 0),
    mojo.internal.StructField('p4', 24, 0, PointFSpec.$, null, false, 0),
  ],
  [[0, 40]]
);
const template = html`<iron-iconset-svg name="iph" size="24">
  <svg>
    <defs>
      <g id="celebration">
        <path fill="none" d="M0 0h20v20H0z"></path>
        <path
          fill-rule="evenodd"
          d="m2 22 14-5-9-9-5 14Zm10.35-5.82L5.3 18.7l2.52-7.05 4.53 4.53ZM14.53 12.53l5.59-5.59a1.25 1.25 0 0 1 1.77 0l.59.59 1.06-1.06-.59-.59a2.758 2.758 0 0 0-3.89 0l-5.59 5.59 1.06 1.06ZM10.06 6.88l-.59.59 1.06 1.06.59-.59a2.758 2.758 0 0 0 0-3.89l-.59-.59-1.06 1.07.59.59c.48.48.48 1.28 0 1.76ZM17.06 11.88l-1.59 1.59 1.06 1.06 1.59-1.59a1.25 1.25 0 0 1 1.77 0l1.61 1.61 1.06-1.06-1.61-1.61a2.758 2.758 0 0 0-3.89 0ZM15.06 5.88l-3.59 3.59 1.06 1.06 3.59-3.59a2.758 2.758 0 0 0 0-3.89l-1.59-1.59-1.06 1.06 1.59 1.59c.48.49.48 1.29 0 1.77Z"
        ></path>
      </g>
      <g id="lightbulb_outline">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path
          d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2 11.7V16h-4v-2.3C8.48 12.63 7 11.53 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.49-1.51 3.65-3 4.7z"
        ></path>
      </g>
    </defs>
  </svg>
</iron-iconset-svg> `;
document.head.appendChild(template.content);
function getTemplate$d() {
  return html`<!--_html_template_start_--><link
      rel="stylesheet"
      href="chrome://theme/colors.css?sets=ui,chrome&shadow_host=true"
    />
    <style include="cr-hidden-style">
      :host {
        --help-bubble-background: var(--color-feature-promo-bubble-background, var(--google-blue-700));
        --help-bubble-foreground: var(--color-feature-promo-bubble-foreground, var(--google-grey-200));
        --help-bubble-border-radius: 8px;
        --help-bubble-close-button-icon-size: 16px;
        --help-bubble-close-button-size: 24px;
        --help-bubble-element-spacing: 8px;
        --help-bubble-padding: 16px 20px;
        --help-bubble-font-weight: 500;
        border-radius: var(--help-bubble-border-radius);
        box-shadow: 0 6px 10px 4px rgba(60, 64, 67, 0.15), 0 2px 3px rgba(60, 64, 67, 0.3);
        box-sizing: border-box;
        position: absolute;
        z-index: 1;
      }
      :host-context([chrome-refresh-2023]):host {
        --help-bubble-border-radius: 12px;
        --help-bubble-close-button-size: 20px;
        --help-bubble-padding: 20px;
        --help-bubble-font-weight: 400;
      }
      #arrow {
        --help-bubble-arrow-size: 11.3px;
        --help-bubble-arrow-size-half: calc(var(--help-bubble-arrow-size) / 2);
        --help-bubble-arrow-diameter: 16px;
        --help-bubble-arrow-radius: calc(var(--help-bubble-arrow-diameter) / 2);
        --help-bubble-arrow-edge-offset: 22px;
        --help-bubble-arrow-offset: calc(var(--help-bubble-arrow-edge-offset) + var(--help-bubble-arrow-radius));
        --help-bubble-arrow-border-radius: 2px;
        position: absolute;
      }
      #inner-arrow {
        background-color: var(--help-bubble-background);
        height: var(--help-bubble-arrow-size);
        left: calc(0px - var(--help-bubble-arrow-size-half));
        position: absolute;
        top: calc(0px - var(--help-bubble-arrow-size-half));
        transform: rotate(45deg);
        width: var(--help-bubble-arrow-size);
        z-index: -1;
      }
      #arrow.bottom-edge {
        bottom: 0;
      }
      #arrow.bottom-edge #inner-arrow {
        border-bottom-right-radius: var(--help-bubble-arrow-border-radius);
      }
      #arrow.top-edge {
        top: 0;
      }
      #arrow.top-edge #inner-arrow {
        border-top-left-radius: var(--help-bubble-arrow-border-radius);
      }
      #arrow.right-edge {
        right: 0;
      }
      #arrow.right-edge #inner-arrow {
        border-top-right-radius: var(--help-bubble-arrow-border-radius);
      }
      #arrow.left-edge {
        left: 0;
      }
      #arrow.left-edge #inner-arrow {
        border-bottom-left-radius: var(--help-bubble-arrow-border-radius);
      }
      #arrow.top-position {
        top: var(--help-bubble-arrow-offset);
      }
      #arrow.vertical-center-position {
        top: 50%;
      }
      #arrow.bottom-position {
        bottom: var(--help-bubble-arrow-offset);
      }
      #arrow.left-position {
        left: var(--help-bubble-arrow-offset);
      }
      #arrow.horizontal-center-position {
        left: 50%;
      }
      #arrow.right-position {
        right: var(--help-bubble-arrow-offset);
      }
      #topContainer {
        display: flex;
        flex-direction: row;
      }
      #progress {
        display: inline-block;
        flex: auto;
      }
      #progress div {
        --help-bubble-progress-size: 8px;
        background-color: var(--help-bubble-foreground);
        border: 1px solid var(--help-bubble-foreground);
        border-radius: 50%;
        display: inline-block;
        height: var(--help-bubble-progress-size);
        margin-inline-end: var(--help-bubble-element-spacing);
        margin-top: 5px;
        width: var(--help-bubble-progress-size);
      }
      #progress .total-progress {
        background-color: var(--help-bubble-background);
      }
      #mainBody,
      #topBody {
        flex: 1;
        font-size: 14px;
        font-style: normal;
        font-weight: var(--help-bubble-font-weight);
        letter-spacing: 0.3px;
        line-height: 20px;
        margin: 0;
      }
      #title {
        flex: 1;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
        margin: 0;
      }
      .help-bubble {
        --cr-focus-outline-color: var(--help-bubble-foreground);
        background-color: var(--help-bubble-background);
        border-radius: var(--help-bubble-border-radius);
        box-sizing: border-box;
        color: var(--help-bubble-foreground);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 340px;
        min-width: 200px;
        padding: var(--help-bubble-padding);
        position: relative;
      }
      #main {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-top: var(--help-bubble-element-spacing);
      }
      #middleRowSpacer {
        margin-inline-start: 32px;
      }
      cr-button,
      cr-icon-button {
        --help-bubble-button-foreground: var(--help-bubble-foreground);
        --help-bubble-button-background: var(--help-bubble-background);
        --help-bubble-button-hover-alpha: 10%;
      }
      cr-button.default-button {
        --help-bubble-button-foreground: var(
          --color-feature-promo-bubble-default-button-foreground,
          var(--help-bubble-background)
        );
        --help-bubble-button-background: var(
          --color-feature-promo-bubble-default-button-background,
          var(--help-bubble-foreground)
        );
        --help-bubble-button-hover-alpha: 6%;
      }
      @media (prefers-color-scheme: dark) {
        cr-button,
        cr-icon-button {
          --help-bubble-button-hover-alpha: 6%;
        }
        cr-button.default-button {
          --help-bubble-button-hover-alpha: 10%;
        }
      }
      #buttons cr-button:hover,
      cr-icon-button:hover {
        background-color: color-mix(
          in srgb,
          var(--help-bubble-button-foreground) var(--help-bubble-button-hover-alpha),
          var(--help-bubble-button-background)
        );
      }
      cr-icon-button {
        --cr-icon-button-fill-color: var(--help-bubble-button-foreground);
        --cr-icon-button-icon-size: var(--help-bubble-close-button-icon-size);
        --cr-icon-button-size: var(--help-bubble-close-button-size);
        --cr-icon-button-stroke-color: var(--help-bubble-button-foreground);
        box-sizing: border-box;
        display: block;
        flex: none;
        float: right;
        height: var(--cr-icon-button-size);
        margin: 0;
        margin-inline-start: var(--help-bubble-element-spacing);
        order: 2;
        width: var(--cr-icon-button-size);
      }
      #bodyIcon {
        --help-bubble-body-icon-image-size: 18px;
        --help-bubble-body-icon-size: 24px;
        --iron-icon-height: var(--help-bubble-body-icon-image-size);
        --iron-icon-width: var(--help-bubble-body-icon-image-size);
        background-color: var(--help-bubble-foreground);
        border-radius: 50%;
        box-sizing: border-box;
        color: var(--help-bubble-background);
        height: var(--help-bubble-body-icon-size);
        margin-inline-end: var(--help-bubble-element-spacing);
        padding: calc((var(--help-bubble-body-icon-size) - var(--help-bubble-body-icon-image-size)) / 2);
        text-align: center;
        width: var(--help-bubble-body-icon-size);
      }
      #bodyIcon iron-icon {
        display: block;
      }
      #buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 16px;
      }
      #buttons cr-button {
        --border-color: var(--help-bubble-foreground);
        --focus-shadow-color: var(--help-bubble-foreground);
        --text-color: var(--help-bubble-button-foreground);
        background-color: var(--help-bubble-button-background);
      }
      #buttons cr-button:focus {
        border: 2px solid var(--help-bubble-background);
        padding: 7px 15px;
      }
      #buttons cr-button:not(:first-child) {
        margin-inline-start: var(--help-bubble-element-spacing);
      }
    </style>

    <div
      class="help-bubble"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="title"
      aria-describedby="body"
      aria-live="assertive"
      on-keydown="onKeyDown_"
      on-click="blockPropagation_"
    >
      <div id="topContainer">
        <div id="bodyIcon" hidden$="[[!shouldShowBodyIcon_(bodyIconName)]]" aria-label$="[[bodyIconAltText]]">
          <iron-icon icon="iph:[[bodyIconName]]"></iron-icon>
        </div>
        <div
          id="progress"
          hidden$="[[!progress]]"
          role="progressbar"
          aria-valuenow$="[[progress.current]]"
          aria-valuemin="1"
          aria-valuemax$="[[progress.total]]"
        >
          <template is="dom-repeat" items="[[progressData_]]">
            <div class$="[[getProgressClass_(index)]]"></div>
          </template>
        </div>
        <h1 id="title" hidden$="[[!shouldShowTitleInTopContainer_(progress, titleText)]]">[[titleText]]</h1>
        <p id="topBody" hidden$="[[!shouldShowBodyInTopContainer_(progress, titleText)]]">[[bodyText]]</p>
        <cr-icon-button
          id="close"
          iron-icon="cr:close"
          aria-label$="[[closeButtonAltText]]"
          on-click="dismiss_"
          tabindex$="[[closeButtonTabIndex]]"
        >
        </cr-icon-button>
      </div>
      <div id="main" hidden$="[[!shouldShowBodyInMain_(progress, titleText)]]">
        <div id="middleRowSpacer" hidden$="[[!shouldShowBodyIcon_(bodyIconName)]]"></div>
        <p id="mainBody">[[bodyText]]</p>
      </div>
      <div id="buttons" hidden$="[[!buttons.length]]">
        <template is="dom-repeat" id="buttonlist" items="[[buttons]]" sort="buttonSortFunc_">
          <cr-button
            id$="[[getButtonId_(itemsIndex)]]"
            tabindex$="[[getButtonTabIndex_(itemsIndex, item.isDefault)]]"
            class$="[[getButtonClass_(item.isDefault)]]"
            on-click="onButtonClick_"
            role="button"
            aria-label="[[item.text]]"
            >[[item.text]]</cr-button
          >
        </template>
      </div>
      <div id="arrow" class$="[[getArrowClass_(position)]]">
        <div id="inner-arrow"></div>
      </div>
    </div>
    <!--_html_template_end_-->`;
}
const TimeSpec = { $: {} };
const TimeDeltaSpec = { $: {} };
const TimeTicksSpec = { $: {} };
mojo.internal.Struct(
  TimeSpec.$,
  'Time',
  [mojo.internal.StructField('internalValue', 0, 0, mojo.internal.Int64, BigInt(0), false, 0)],
  [[0, 16]]
);
mojo.internal.Struct(
  TimeDeltaSpec.$,
  'TimeDelta',
  [mojo.internal.StructField('microseconds', 0, 0, mojo.internal.Int64, BigInt(0), false, 0)],
  [[0, 16]]
);
mojo.internal.Struct(
  TimeTicksSpec.$,
  'TimeTicks',
  [mojo.internal.StructField('internalValue', 0, 0, mojo.internal.Int64, BigInt(0), false, 0)],
  [[0, 16]]
);
const HelpBubbleArrowPositionSpec = { $: mojo.internal.Enum() };
var HelpBubbleArrowPosition;
(function (HelpBubbleArrowPosition) {
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['TOP_LEFT'] = 0)] = 'TOP_LEFT';
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['TOP_CENTER'] = 1)] = 'TOP_CENTER';
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['TOP_RIGHT'] = 2)] = 'TOP_RIGHT';
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['BOTTOM_LEFT'] = 3)] = 'BOTTOM_LEFT';
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['BOTTOM_CENTER'] = 4)] = 'BOTTOM_CENTER';
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['BOTTOM_RIGHT'] = 5)] = 'BOTTOM_RIGHT';
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['LEFT_TOP'] = 6)] = 'LEFT_TOP';
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['LEFT_CENTER'] = 7)] = 'LEFT_CENTER';
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['LEFT_BOTTOM'] = 8)] = 'LEFT_BOTTOM';
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['RIGHT_TOP'] = 9)] = 'RIGHT_TOP';
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['RIGHT_CENTER'] = 10)] = 'RIGHT_CENTER';
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['RIGHT_BOTTOM'] = 11)] = 'RIGHT_BOTTOM';
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['MIN_VALUE'] = 0)] = 'MIN_VALUE';
  HelpBubbleArrowPosition[(HelpBubbleArrowPosition['MAX_VALUE'] = 11)] = 'MAX_VALUE';
})(HelpBubbleArrowPosition || (HelpBubbleArrowPosition = {}));
const HelpBubbleClosedReasonSpec = { $: mojo.internal.Enum() };
var HelpBubbleClosedReason;
(function (HelpBubbleClosedReason) {
  HelpBubbleClosedReason[(HelpBubbleClosedReason['kPageChanged'] = 0)] = 'kPageChanged';
  HelpBubbleClosedReason[(HelpBubbleClosedReason['kDismissedByUser'] = 1)] = 'kDismissedByUser';
  HelpBubbleClosedReason[(HelpBubbleClosedReason['kTimedOut'] = 2)] = 'kTimedOut';
  HelpBubbleClosedReason[(HelpBubbleClosedReason['MIN_VALUE'] = 0)] = 'MIN_VALUE';
  HelpBubbleClosedReason[(HelpBubbleClosedReason['MAX_VALUE'] = 2)] = 'MAX_VALUE';
})(HelpBubbleClosedReason || (HelpBubbleClosedReason = {}));
class HelpBubbleHandlerFactoryPendingReceiver {
  constructor(handle) {
    this.handle = mojo.internal.interfaceSupport.getEndpointForReceiver(handle);
  }
  bindInBrowser(scope = 'context') {
    mojo.internal.interfaceSupport.bind(this.handle, 'help_bubble.mojom.HelpBubbleHandlerFactory', scope);
  }
}
class HelpBubbleHandlerFactoryRemote {
  constructor(handle) {
    this.proxy = new mojo.internal.interfaceSupport.InterfaceRemoteBase(
      HelpBubbleHandlerFactoryPendingReceiver,
      handle
    );
    this.$ = new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);
    this.onConnectionError = this.proxy.getConnectionErrorEventRouter();
  }
  createHelpBubbleHandler(client, handler) {
    this.proxy.sendMessage(2022619593, HelpBubbleHandlerFactory_CreateHelpBubbleHandler_ParamsSpec.$, null, [
      client,
      handler,
    ]);
  }
}
class HelpBubbleHandlerFactory {
  static get $interfaceName() {
    return 'help_bubble.mojom.HelpBubbleHandlerFactory';
  }
  static getRemote() {
    let remote = new HelpBubbleHandlerFactoryRemote();
    remote.$.bindNewPipeAndPassReceiver().bindInBrowser();
    return remote;
  }
}
class HelpBubbleHandlerPendingReceiver {
  constructor(handle) {
    this.handle = mojo.internal.interfaceSupport.getEndpointForReceiver(handle);
  }
  bindInBrowser(scope = 'context') {
    mojo.internal.interfaceSupport.bind(this.handle, 'help_bubble.mojom.HelpBubbleHandler', scope);
  }
}
class HelpBubbleHandlerRemote {
  constructor(handle) {
    this.proxy = new mojo.internal.interfaceSupport.InterfaceRemoteBase(HelpBubbleHandlerPendingReceiver, handle);
    this.$ = new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);
    this.onConnectionError = this.proxy.getConnectionErrorEventRouter();
  }
  helpBubbleAnchorVisibilityChanged(nativeIdentifier, visible, rect) {
    this.proxy.sendMessage(187018319, HelpBubbleHandler_HelpBubbleAnchorVisibilityChanged_ParamsSpec.$, null, [
      nativeIdentifier,
      visible,
      rect,
    ]);
  }
  helpBubbleAnchorActivated(nativeIdentifier) {
    this.proxy.sendMessage(1416709410, HelpBubbleHandler_HelpBubbleAnchorActivated_ParamsSpec.$, null, [
      nativeIdentifier,
    ]);
  }
  helpBubbleAnchorCustomEvent(nativeIdentifier, customEventName) {
    this.proxy.sendMessage(1962268573, HelpBubbleHandler_HelpBubbleAnchorCustomEvent_ParamsSpec.$, null, [
      nativeIdentifier,
      customEventName,
    ]);
  }
  helpBubbleButtonPressed(nativeIdentifier, buttonIndex) {
    this.proxy.sendMessage(1978955630, HelpBubbleHandler_HelpBubbleButtonPressed_ParamsSpec.$, null, [
      nativeIdentifier,
      buttonIndex,
    ]);
  }
  helpBubbleClosed(nativeIdentifier, reason) {
    this.proxy.sendMessage(475253988, HelpBubbleHandler_HelpBubbleClosed_ParamsSpec.$, null, [
      nativeIdentifier,
      reason,
    ]);
  }
}
class HelpBubbleClientPendingReceiver {
  constructor(handle) {
    this.handle = mojo.internal.interfaceSupport.getEndpointForReceiver(handle);
  }
  bindInBrowser(scope = 'context') {
    mojo.internal.interfaceSupport.bind(this.handle, 'help_bubble.mojom.HelpBubbleClient', scope);
  }
}
class HelpBubbleClientRemote {
  constructor(handle) {
    this.proxy = new mojo.internal.interfaceSupport.InterfaceRemoteBase(HelpBubbleClientPendingReceiver, handle);
    this.$ = new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);
    this.onConnectionError = this.proxy.getConnectionErrorEventRouter();
  }
  showHelpBubble(params) {
    this.proxy.sendMessage(536475917, HelpBubbleClient_ShowHelpBubble_ParamsSpec.$, null, [params]);
  }
  toggleFocusForAccessibility(nativeIdentifier) {
    this.proxy.sendMessage(951305126, HelpBubbleClient_ToggleFocusForAccessibility_ParamsSpec.$, null, [
      nativeIdentifier,
    ]);
  }
  hideHelpBubble(nativeIdentifier) {
    this.proxy.sendMessage(998054010, HelpBubbleClient_HideHelpBubble_ParamsSpec.$, null, [nativeIdentifier]);
  }
  externalHelpBubbleUpdated(nativeIdentifier, shown) {
    this.proxy.sendMessage(729562544, HelpBubbleClient_ExternalHelpBubbleUpdated_ParamsSpec.$, null, [
      nativeIdentifier,
      shown,
    ]);
  }
}
class HelpBubbleClientCallbackRouter {
  constructor() {
    this.helper_internal_ = new mojo.internal.interfaceSupport.InterfaceReceiverHelperInternal(HelpBubbleClientRemote);
    this.$ = new mojo.internal.interfaceSupport.InterfaceReceiverHelper(this.helper_internal_);
    this.router_ = new mojo.internal.interfaceSupport.CallbackRouter();
    this.showHelpBubble = new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
    this.helper_internal_.registerHandler(
      536475917,
      HelpBubbleClient_ShowHelpBubble_ParamsSpec.$,
      null,
      this.showHelpBubble.createReceiverHandler(false)
    );
    this.toggleFocusForAccessibility = new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
    this.helper_internal_.registerHandler(
      951305126,
      HelpBubbleClient_ToggleFocusForAccessibility_ParamsSpec.$,
      null,
      this.toggleFocusForAccessibility.createReceiverHandler(false)
    );
    this.hideHelpBubble = new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
    this.helper_internal_.registerHandler(
      998054010,
      HelpBubbleClient_HideHelpBubble_ParamsSpec.$,
      null,
      this.hideHelpBubble.createReceiverHandler(false)
    );
    this.externalHelpBubbleUpdated = new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
    this.helper_internal_.registerHandler(
      729562544,
      HelpBubbleClient_ExternalHelpBubbleUpdated_ParamsSpec.$,
      null,
      this.externalHelpBubbleUpdated.createReceiverHandler(false)
    );
    this.onConnectionError = this.helper_internal_.getConnectionErrorEventRouter();
  }
  removeListener(id) {
    return this.router_.removeListener(id);
  }
}
const HelpBubbleButtonParamsSpec = { $: {} };
const ProgressSpec = { $: {} };
const HelpBubbleParamsSpec = { $: {} };
const HelpBubbleHandlerFactory_CreateHelpBubbleHandler_ParamsSpec = { $: {} };
const HelpBubbleHandler_HelpBubbleAnchorVisibilityChanged_ParamsSpec = { $: {} };
const HelpBubbleHandler_HelpBubbleAnchorActivated_ParamsSpec = { $: {} };
const HelpBubbleHandler_HelpBubbleAnchorCustomEvent_ParamsSpec = { $: {} };
const HelpBubbleHandler_HelpBubbleButtonPressed_ParamsSpec = { $: {} };
const HelpBubbleHandler_HelpBubbleClosed_ParamsSpec = { $: {} };
const HelpBubbleClient_ShowHelpBubble_ParamsSpec = { $: {} };
const HelpBubbleClient_ToggleFocusForAccessibility_ParamsSpec = { $: {} };
const HelpBubbleClient_HideHelpBubble_ParamsSpec = { $: {} };
const HelpBubbleClient_ExternalHelpBubbleUpdated_ParamsSpec = { $: {} };
mojo.internal.Struct(
  HelpBubbleButtonParamsSpec.$,
  'HelpBubbleButtonParams',
  [
    mojo.internal.StructField('text', 0, 0, mojo.internal.String, null, false, 0),
    mojo.internal.StructField('isDefault', 8, 0, mojo.internal.Bool, false, false, 0),
  ],
  [[0, 24]]
);
mojo.internal.Struct(
  ProgressSpec.$,
  'Progress',
  [
    mojo.internal.StructField('current', 0, 0, mojo.internal.Uint8, 0, false, 0),
    mojo.internal.StructField('total', 1, 0, mojo.internal.Uint8, 0, false, 0),
  ],
  [[0, 16]]
);
mojo.internal.Struct(
  HelpBubbleParamsSpec.$,
  'HelpBubbleParams',
  [
    mojo.internal.StructField('nativeIdentifier', 0, 0, mojo.internal.String, null, false, 0),
    mojo.internal.StructField(
      'position',
      8,
      0,
      HelpBubbleArrowPositionSpec.$,
      HelpBubbleArrowPosition.TOP_CENTER,
      false,
      0
    ),
    mojo.internal.StructField('titleText', 16, 0, mojo.internal.String, null, true, 0),
    mojo.internal.StructField('bodyText', 24, 0, mojo.internal.String, null, false, 0),
    mojo.internal.StructField('closeButtonAltText', 32, 0, mojo.internal.String, null, false, 0),
    mojo.internal.StructField('bodyIconName', 40, 0, mojo.internal.String, null, true, 0),
    mojo.internal.StructField('bodyIconAltText', 48, 0, mojo.internal.String, null, false, 0),
    mojo.internal.StructField('progress', 56, 0, ProgressSpec.$, null, true, 0),
    mojo.internal.StructField(
      'buttons',
      64,
      0,
      mojo.internal.Array(HelpBubbleButtonParamsSpec.$, false),
      null,
      false,
      0
    ),
    mojo.internal.StructField('timeout', 72, 0, TimeDeltaSpec.$, null, true, 0),
  ],
  [[0, 88]]
);
mojo.internal.Struct(
  HelpBubbleHandlerFactory_CreateHelpBubbleHandler_ParamsSpec.$,
  'HelpBubbleHandlerFactory_CreateHelpBubbleHandler_Params',
  [
    mojo.internal.StructField('client', 0, 0, mojo.internal.InterfaceProxy(HelpBubbleClientRemote), null, false, 0),
    mojo.internal.StructField(
      'handler',
      8,
      0,
      mojo.internal.InterfaceRequest(HelpBubbleHandlerPendingReceiver),
      null,
      false,
      0
    ),
  ],
  [[0, 24]]
);
mojo.internal.Struct(
  HelpBubbleHandler_HelpBubbleAnchorVisibilityChanged_ParamsSpec.$,
  'HelpBubbleHandler_HelpBubbleAnchorVisibilityChanged_Params',
  [
    mojo.internal.StructField('nativeIdentifier', 0, 0, mojo.internal.String, null, false, 0),
    mojo.internal.StructField('visible', 8, 0, mojo.internal.Bool, false, false, 0),
    mojo.internal.StructField('rect', 16, 0, RectFSpec.$, null, false, 0),
  ],
  [[0, 32]]
);
mojo.internal.Struct(
  HelpBubbleHandler_HelpBubbleAnchorActivated_ParamsSpec.$,
  'HelpBubbleHandler_HelpBubbleAnchorActivated_Params',
  [mojo.internal.StructField('nativeIdentifier', 0, 0, mojo.internal.String, null, false, 0)],
  [[0, 16]]
);
mojo.internal.Struct(
  HelpBubbleHandler_HelpBubbleAnchorCustomEvent_ParamsSpec.$,
  'HelpBubbleHandler_HelpBubbleAnchorCustomEvent_Params',
  [
    mojo.internal.StructField('nativeIdentifier', 0, 0, mojo.internal.String, null, false, 0),
    mojo.internal.StructField('customEventName', 8, 0, mojo.internal.String, null, false, 0),
  ],
  [[0, 24]]
);
mojo.internal.Struct(
  HelpBubbleHandler_HelpBubbleButtonPressed_ParamsSpec.$,
  'HelpBubbleHandler_HelpBubbleButtonPressed_Params',
  [
    mojo.internal.StructField('nativeIdentifier', 0, 0, mojo.internal.String, null, false, 0),
    mojo.internal.StructField('buttonIndex', 8, 0, mojo.internal.Uint8, 0, false, 0),
  ],
  [[0, 24]]
);
mojo.internal.Struct(
  HelpBubbleHandler_HelpBubbleClosed_ParamsSpec.$,
  'HelpBubbleHandler_HelpBubbleClosed_Params',
  [
    mojo.internal.StructField('nativeIdentifier', 0, 0, mojo.internal.String, null, false, 0),
    mojo.internal.StructField('reason', 8, 0, HelpBubbleClosedReasonSpec.$, 0, false, 0),
  ],
  [[0, 24]]
);
mojo.internal.Struct(
  HelpBubbleClient_ShowHelpBubble_ParamsSpec.$,
  'HelpBubbleClient_ShowHelpBubble_Params',
  [mojo.internal.StructField('params', 0, 0, HelpBubbleParamsSpec.$, null, false, 0)],
  [[0, 16]]
);
mojo.internal.Struct(
  HelpBubbleClient_ToggleFocusForAccessibility_ParamsSpec.$,
  'HelpBubbleClient_ToggleFocusForAccessibility_Params',
  [mojo.internal.StructField('nativeIdentifier', 0, 0, mojo.internal.String, null, false, 0)],
  [[0, 16]]
);
mojo.internal.Struct(
  HelpBubbleClient_HideHelpBubble_ParamsSpec.$,
  'HelpBubbleClient_HideHelpBubble_Params',
  [mojo.internal.StructField('nativeIdentifier', 0, 0, mojo.internal.String, null, false, 0)],
  [[0, 16]]
);
mojo.internal.Struct(
  HelpBubbleClient_ExternalHelpBubbleUpdated_ParamsSpec.$,
  'HelpBubbleClient_ExternalHelpBubbleUpdated_Params',
  [
    mojo.internal.StructField('nativeIdentifier', 0, 0, mojo.internal.String, null, false, 0),
    mojo.internal.StructField('shown', 8, 0, mojo.internal.Bool, false, false, 0),
  ],
  [[0, 24]]
);
// Copyright 2021 The Chromium Authors
const ACTION_BUTTON_ID_PREFIX = 'action-button-';
const HELP_BUBBLE_DISMISSED_EVENT = 'help-bubble-dismissed';
const HELP_BUBBLE_TIMED_OUT_EVENT = 'help-bubble-timed-out';
const HELP_BUBBLE_SCROLL_ANCHOR_OPTIONS = { behavior: 'smooth', block: 'center' };
function debounceEnd(fn, time = 50) {
  let timerId;
  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(fn, time);
  };
}
class HelpBubbleElement extends PolymerElement {
  constructor() {
    super(...arguments);
    this.closeButtonTabIndex = 0;
    this.buttons = [];
    this.progress = null;
    this.timeoutMs = null;
    this.timeoutTimerId = null;
    this.debouncedUpdate = null;
    this.padding = new InsetsF();
    this.fixed = false;
    this.anchorElement_ = null;
    this.progressData_ = [];
    this.resizeObserver_ = null;
  }
  static get is() {
    return 'help-bubble';
  }
  static get template() {
    return getTemplate$d();
  }
  static get properties() {
    return {
      nativeId: { type: String, value: '', reflectToAttribute: true },
      position: { type: HelpBubbleArrowPosition, value: HelpBubbleArrowPosition.TOP_CENTER, reflectToAttribute: true },
    };
  }
  show(anchorElement) {
    this.anchorElement_ = anchorElement;
    if (this.progress) {
      this.progressData_ = new Array(this.progress.total);
    } else {
      this.progressData_ = [];
    }
    this.closeButtonTabIndex = this.buttons.length ? this.buttons.length + 2 : 1;
    assert(this.anchorElement_, 'Tried to show a help bubble but anchorElement does not exist');
    this.style.display = 'block';
    this.style.position = this.fixed ? 'fixed' : 'absolute';
    this.removeAttribute('aria-hidden');
    this.updatePosition_();
    this.debouncedUpdate = debounceEnd(() => {
      if (this.anchorElement_) {
        this.updatePosition_();
      }
    }, 50);
    this.$.buttonlist.addEventListener('rendered-item-count-changed', this.debouncedUpdate);
    window.addEventListener('resize', this.debouncedUpdate);
    if (this.timeoutMs !== null) {
      const timedOutCallback = () => {
        this.dispatchEvent(new CustomEvent(HELP_BUBBLE_TIMED_OUT_EVENT, { detail: { nativeId: this.nativeId } }));
      };
      this.timeoutTimerId = setTimeout(timedOutCallback, this.timeoutMs);
    }
    if (this.offsetParent && !this.fixed) {
      this.resizeObserver_ = new ResizeObserver(() => {
        this.updatePosition_();
        this.anchorElement_?.scrollIntoView(HELP_BUBBLE_SCROLL_ANCHOR_OPTIONS);
      });
      this.resizeObserver_.observe(this.offsetParent);
    }
  }
  hide() {
    if (this.resizeObserver_) {
      this.resizeObserver_.disconnect();
      this.resizeObserver_ = null;
    }
    this.style.display = 'none';
    this.setAttribute('aria-hidden', 'true');
    this.anchorElement_ = null;
    if (this.timeoutTimerId !== null) {
      clearInterval(this.timeoutTimerId);
      this.timeoutTimerId = null;
    }
    if (this.debouncedUpdate) {
      window.removeEventListener('resize', this.debouncedUpdate);
      this.$.buttonlist.removeEventListener('rendered-item-count-changed', this.debouncedUpdate);
      this.debouncedUpdate = null;
    }
  }
  getAnchorElement() {
    return this.anchorElement_;
  }
  getButtonForTesting(buttonIndex) {
    return this.$.buttons.querySelector(`[id="${ACTION_BUTTON_ID_PREFIX + buttonIndex}"]`);
  }
  focus() {
    this.$.buttonlist.render();
    const button =
      this.$.buttons.querySelector('cr-button.default-button') ||
      this.$.buttons.querySelector('cr-button') ||
      this.$.close;
    assert(button);
    button.focus();
  }
  static isDefaultButtonLeading() {
    return isWindows;
  }
  dismiss_() {
    assert(this.nativeId, 'Dismiss: expected help bubble to have a native id.');
    this.dispatchEvent(
      new CustomEvent(HELP_BUBBLE_DISMISSED_EVENT, { detail: { nativeId: this.nativeId, fromActionButton: false } })
    );
  }
  onKeyDown_(e) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      this.dismiss_();
    }
  }
  blockPropagation_(e) {
    e.stopPropagation();
  }
  getProgressClass_(index) {
    return index < this.progress.current ? 'current-progress' : 'total-progress';
  }
  shouldShowTitleInTopContainer_(progress, titleText) {
    return !!titleText && !progress;
  }
  shouldShowBodyInTopContainer_(progress, titleText) {
    return !progress && !titleText;
  }
  shouldShowBodyInMain_(progress, titleText) {
    return !!progress || !!titleText;
  }
  shouldShowBodyIcon_(bodyIconName) {
    return bodyIconName !== null && bodyIconName !== '';
  }
  onButtonClick_(e) {
    assert(this.nativeId, 'Action button clicked: expected help bubble to have a native ID.');
    const index = parseInt(e.target.id.substring(ACTION_BUTTON_ID_PREFIX.length));
    this.dispatchEvent(
      new CustomEvent(HELP_BUBBLE_DISMISSED_EVENT, {
        detail: { nativeId: this.nativeId, fromActionButton: true, buttonIndex: index },
      })
    );
  }
  getButtonId_(index) {
    return ACTION_BUTTON_ID_PREFIX + index;
  }
  getButtonClass_(isDefault) {
    return isDefault ? 'default-button focus-outline-visible' : 'focus-outline-visible';
  }
  getButtonTabIndex_(index, isDefault) {
    return isDefault ? 1 : index + 2;
  }
  buttonSortFunc_(button1, button2) {
    if (button1.isDefault) {
      return isWindows ? -1 : 1;
    }
    if (button2.isDefault) {
      return isWindows ? 1 : -1;
    }
    return 0;
  }
  getArrowClass_(position) {
    let classList = '';
    switch (position) {
      case HelpBubbleArrowPosition.TOP_LEFT:
      case HelpBubbleArrowPosition.TOP_CENTER:
      case HelpBubbleArrowPosition.TOP_RIGHT:
        classList = 'top-edge ';
        break;
      case HelpBubbleArrowPosition.BOTTOM_LEFT:
      case HelpBubbleArrowPosition.BOTTOM_CENTER:
      case HelpBubbleArrowPosition.BOTTOM_RIGHT:
        classList = 'bottom-edge ';
        break;
      case HelpBubbleArrowPosition.LEFT_TOP:
      case HelpBubbleArrowPosition.LEFT_CENTER:
      case HelpBubbleArrowPosition.LEFT_BOTTOM:
        classList = 'left-edge ';
        break;
      case HelpBubbleArrowPosition.RIGHT_TOP:
      case HelpBubbleArrowPosition.RIGHT_CENTER:
      case HelpBubbleArrowPosition.RIGHT_BOTTOM:
        classList = 'right-edge ';
        break;
      default:
        assertNotReached('Unknown help bubble position: ' + position);
    }
    switch (position) {
      case HelpBubbleArrowPosition.TOP_LEFT:
      case HelpBubbleArrowPosition.BOTTOM_LEFT:
        classList += 'left-position';
        break;
      case HelpBubbleArrowPosition.TOP_CENTER:
      case HelpBubbleArrowPosition.BOTTOM_CENTER:
        classList += 'horizontal-center-position';
        break;
      case HelpBubbleArrowPosition.TOP_RIGHT:
      case HelpBubbleArrowPosition.BOTTOM_RIGHT:
        classList += 'right-position';
        break;
      case HelpBubbleArrowPosition.LEFT_TOP:
      case HelpBubbleArrowPosition.RIGHT_TOP:
        classList += 'top-position';
        break;
      case HelpBubbleArrowPosition.LEFT_CENTER:
      case HelpBubbleArrowPosition.RIGHT_CENTER:
        classList += 'vertical-center-position';
        break;
      case HelpBubbleArrowPosition.LEFT_BOTTOM:
      case HelpBubbleArrowPosition.RIGHT_BOTTOM:
        classList += 'bottom-position';
        break;
      default:
        assertNotReached('Unknown help bubble position: ' + position);
    }
    return classList;
  }
  updatePosition_() {
    assert(this.anchorElement_, 'Update position: expected valid anchor element.');
    const ANCHOR_OFFSET = 16;
    const ARROW_WIDTH = 16;
    const ARROW_OFFSET_FROM_EDGE = 22 + ARROW_WIDTH / 2;
    const anchorRect = this.anchorElement_.getBoundingClientRect();
    const anchorRectCenter = { x: anchorRect.left + anchorRect.width / 2, y: anchorRect.top + anchorRect.height / 2 };
    const helpBubbleRect = this.getBoundingClientRect();
    let offsetX = this.anchorElement_.offsetLeft;
    let offsetY = this.anchorElement_.offsetTop;
    switch (this.position) {
      case HelpBubbleArrowPosition.TOP_LEFT:
      case HelpBubbleArrowPosition.TOP_CENTER:
      case HelpBubbleArrowPosition.TOP_RIGHT:
        offsetY += anchorRect.height + ANCHOR_OFFSET + this.padding.bottom;
        break;
      case HelpBubbleArrowPosition.BOTTOM_LEFT:
      case HelpBubbleArrowPosition.BOTTOM_CENTER:
      case HelpBubbleArrowPosition.BOTTOM_RIGHT:
        offsetY -= helpBubbleRect.height + ANCHOR_OFFSET + this.padding.top;
        break;
      case HelpBubbleArrowPosition.LEFT_TOP:
      case HelpBubbleArrowPosition.LEFT_CENTER:
      case HelpBubbleArrowPosition.LEFT_BOTTOM:
        offsetX += anchorRect.width + ANCHOR_OFFSET + this.padding.right;
        break;
      case HelpBubbleArrowPosition.RIGHT_TOP:
      case HelpBubbleArrowPosition.RIGHT_CENTER:
      case HelpBubbleArrowPosition.RIGHT_BOTTOM:
        offsetX -= helpBubbleRect.width + ANCHOR_OFFSET + this.padding.left;
        break;
      default:
        assertNotReached();
    }
    switch (this.position) {
      case HelpBubbleArrowPosition.TOP_LEFT:
      case HelpBubbleArrowPosition.BOTTOM_LEFT:
        if (anchorRect.left + ARROW_OFFSET_FROM_EDGE > anchorRectCenter.x) {
          offsetX += anchorRect.width / 2 - ARROW_OFFSET_FROM_EDGE;
        }
        break;
      case HelpBubbleArrowPosition.TOP_CENTER:
      case HelpBubbleArrowPosition.BOTTOM_CENTER:
        offsetX += anchorRect.width / 2 - helpBubbleRect.width / 2;
        break;
      case HelpBubbleArrowPosition.TOP_RIGHT:
      case HelpBubbleArrowPosition.BOTTOM_RIGHT:
        if (anchorRect.right - ARROW_OFFSET_FROM_EDGE < anchorRectCenter.x) {
          offsetX += anchorRect.width / 2 - helpBubbleRect.width + ARROW_OFFSET_FROM_EDGE;
        } else {
          offsetX += anchorRect.width - helpBubbleRect.width;
        }
        break;
      case HelpBubbleArrowPosition.LEFT_TOP:
      case HelpBubbleArrowPosition.RIGHT_TOP:
        if (anchorRect.top + ARROW_OFFSET_FROM_EDGE > anchorRectCenter.y) {
          offsetY += anchorRect.height / 2 - ARROW_OFFSET_FROM_EDGE;
        }
        break;
      case HelpBubbleArrowPosition.LEFT_CENTER:
      case HelpBubbleArrowPosition.RIGHT_CENTER:
        offsetY += anchorRect.height / 2 - helpBubbleRect.height / 2;
        break;
      case HelpBubbleArrowPosition.LEFT_BOTTOM:
      case HelpBubbleArrowPosition.RIGHT_BOTTOM:
        if (anchorRect.bottom - ARROW_OFFSET_FROM_EDGE < anchorRectCenter.y) {
          offsetY += anchorRect.height / 2 - helpBubbleRect.height + ARROW_OFFSET_FROM_EDGE;
        } else {
          offsetY += anchorRect.height - helpBubbleRect.height;
        }
        break;
      default:
        assertNotReached();
    }
    this.style.top = offsetY.toString() + 'px';
    this.style.left = offsetX.toString() + 'px';
  }
}
customElements.define(HelpBubbleElement.is, HelpBubbleElement);
// Copyright 2022 The Chromium Authors
const ANCHOR_HIGHLIGHT_CLASS = 'help-anchor-highlight';
function isRtlLang(element) {
  return window.getComputedStyle(element).direction === 'rtl';
}
function reflectArrowPosition(position) {
  switch (position) {
    case HelpBubbleArrowPosition.TOP_LEFT:
      return HelpBubbleArrowPosition.TOP_RIGHT;
    case HelpBubbleArrowPosition.TOP_RIGHT:
      return HelpBubbleArrowPosition.TOP_LEFT;
    case HelpBubbleArrowPosition.BOTTOM_LEFT:
      return HelpBubbleArrowPosition.BOTTOM_RIGHT;
    case HelpBubbleArrowPosition.BOTTOM_RIGHT:
      return HelpBubbleArrowPosition.BOTTOM_LEFT;
    case HelpBubbleArrowPosition.LEFT_TOP:
      return HelpBubbleArrowPosition.RIGHT_TOP;
    case HelpBubbleArrowPosition.LEFT_CENTER:
      return HelpBubbleArrowPosition.RIGHT_CENTER;
    case HelpBubbleArrowPosition.LEFT_BOTTOM:
      return HelpBubbleArrowPosition.RIGHT_BOTTOM;
    case HelpBubbleArrowPosition.RIGHT_TOP:
      return HelpBubbleArrowPosition.LEFT_TOP;
    case HelpBubbleArrowPosition.RIGHT_CENTER:
      return HelpBubbleArrowPosition.LEFT_CENTER;
    case HelpBubbleArrowPosition.RIGHT_BOTTOM:
      return HelpBubbleArrowPosition.LEFT_BOTTOM;
    default:
      return position;
  }
}
class HelpBubbleController {
  constructor(nativeId, root) {
    this.anchor_ = null;
    this.bubble_ = null;
    this.options_ = { padding: new InsetsF(), fixed: false };
    this.isBubbleShowing_ = false;
    this.isAnchorVisible_ = false;
    this.lastAnchorBounds_ = new RectF();
    this.isExternal_ = false;
    assert(nativeId, 'HelpBubble: nativeId was not defined when registering help bubble');
    assert(root, 'HelpBubble: shadowRoot was not defined when registering help bubble');
    this.nativeId_ = nativeId;
    this.root_ = root;
  }
  isBubbleShowing() {
    return this.isBubbleShowing_;
  }
  canShowBubble() {
    return this.hasAnchor();
  }
  hasBubble() {
    return !!this.bubble_;
  }
  getBubble() {
    return this.bubble_;
  }
  hasAnchor() {
    return !!this.anchor_;
  }
  getAnchor() {
    return this.anchor_;
  }
  getNativeId() {
    return this.nativeId_;
  }
  getPadding() {
    return this.options_.padding;
  }
  getAnchorVisibility() {
    return this.isAnchorVisible_;
  }
  getLastAnchorBounds() {
    return this.lastAnchorBounds_;
  }
  updateAnchorVisibility(isVisible, bounds) {
    const changed =
      isVisible !== this.isAnchorVisible_ ||
      bounds.x !== this.lastAnchorBounds_.x ||
      bounds.y !== this.lastAnchorBounds_.y ||
      bounds.width !== this.lastAnchorBounds_.width ||
      bounds.height !== this.lastAnchorBounds_.height;
    this.isAnchorVisible_ = isVisible;
    this.lastAnchorBounds_ = bounds;
    return changed;
  }
  isAnchorFixed() {
    return this.options_.fixed;
  }
  isExternal() {
    return this.isExternal_;
  }
  updateExternalShowingStatus(isShowing) {
    this.isExternal_ = true;
    this.isBubbleShowing_ = isShowing;
    this.setAnchorHighlight_(isShowing);
  }
  track(trackable, options) {
    assert(!this.anchor_);
    let anchor = null;
    if (typeof trackable === 'string') {
      anchor = this.root_.querySelector(trackable);
    } else if (Array.isArray(trackable)) {
      anchor = this.deepQuery(trackable);
    } else if (trackable instanceof HTMLElement) {
      anchor = trackable;
    } else {
      assertNotReached('HelpBubble: anchor argument was unrecognized when registering ' + 'help bubble');
    }
    if (!anchor) {
      return false;
    }
    anchor.dataset['nativeId'] = this.nativeId_;
    this.anchor_ = anchor;
    this.options_ = options;
    return true;
  }
  deepQuery(selectors) {
    let cur = this.root_;
    for (const selector of selectors) {
      if (cur.shadowRoot) {
        cur = cur.shadowRoot;
      }
      const el = cur.querySelector(selector);
      if (!el) {
        return null;
      } else {
        cur = el;
      }
    }
    return cur;
  }
  show() {
    this.isExternal_ = false;
    if (!(this.bubble_ && this.anchor_)) {
      return;
    }
    this.bubble_.show(this.anchor_);
    this.isBubbleShowing_ = true;
    this.setAnchorHighlight_(true);
  }
  hide() {
    if (!this.bubble_) {
      return;
    }
    this.bubble_.hide();
    this.bubble_.remove();
    this.bubble_ = null;
    this.isBubbleShowing_ = false;
    this.setAnchorHighlight_(false);
  }
  createBubble(params) {
    assert(this.anchor_, 'HelpBubble: anchor was not defined when showing help bubble');
    assert(this.anchor_.parentNode, 'HelpBubble: anchor element not in DOM');
    this.bubble_ = document.createElement('help-bubble');
    this.bubble_.nativeId = this.nativeId_;
    this.bubble_.position = isRtlLang(this.anchor_) ? reflectArrowPosition(params.position) : params.position;
    this.bubble_.closeButtonAltText = params.closeButtonAltText;
    this.bubble_.bodyText = params.bodyText;
    this.bubble_.bodyIconName = params.bodyIconName || null;
    this.bubble_.bodyIconAltText = params.bodyIconAltText;
    this.bubble_.titleText = params.titleText || '';
    this.bubble_.progress = params.progress || null;
    this.bubble_.buttons = params.buttons;
    this.bubble_.padding = this.options_.padding;
    if (params.timeout) {
      this.bubble_.timeoutMs = Number(params.timeout.microseconds / 1000n);
      assert(this.bubble_.timeoutMs > 0);
    }
    assert(!this.bubble_.progress || this.bubble_.progress.total >= this.bubble_.progress.current);
    assert(this.root_);
    if (getComputedStyle(this.anchor_).getPropertyValue('position') === 'fixed') {
      this.bubble_.fixed = true;
    }
    this.anchor_.parentNode.insertBefore(this.bubble_, this.anchor_);
    return this.bubble_;
  }
  setAnchorHighlight_(highlight) {
    assert(this.anchor_, 'Set anchor highlight: expected valid anchor element.');
    this.anchor_.classList.toggle(ANCHOR_HIGHLIGHT_CLASS, highlight);
    if (highlight) {
      (this.bubble_ || this.anchor_).focus();
      this.anchor_.scrollIntoView(HELP_BUBBLE_SCROLL_ANCHOR_OPTIONS);
    }
  }
  static getImmediateAncestor(element) {
    if (element.parentElement) {
      return element.parentElement;
    }
    if (element.parentNode instanceof ShadowRoot) {
      return element.parentNode.host;
    }
    return null;
  }
}
// Copyright 2022 The Chromium Authors
class HelpBubbleProxyImpl {
  constructor() {
    this.callbackRouter_ = new HelpBubbleClientCallbackRouter();
    this.handler_ = new HelpBubbleHandlerRemote();
    const factory = HelpBubbleHandlerFactory.getRemote();
    factory.createHelpBubbleHandler(
      this.callbackRouter_.$.bindNewPipeAndPassRemote(),
      this.handler_.$.bindNewPipeAndPassReceiver()
    );
  }
  static getInstance() {
    return instance$8 || (instance$8 = new HelpBubbleProxyImpl());
  }
  static setInstance(obj) {
    instance$8 = obj;
  }
  getHandler() {
    return this.handler_;
  }
  getCallbackRouter() {
    return this.callbackRouter_;
  }
}
let instance$8 = null;
// Copyright 2022 The Chromium Authors
const HelpBubbleMixin = dedupingMixin((superClass) => {
  class HelpBubbleMixin extends superClass {
    constructor(...args) {
      super(...args);
      this.helpBubbleControllerById_ = new Map();
      this.helpBubbleListenerIds_ = [];
      this.helpBubbleFixedAnchorObserver_ = null;
      this.helpBubbleResizeObserver_ = null;
      this.helpBubbleDismissedEventTracker_ = new EventTracker();
      this.debouncedAnchorMayHaveChangedCallback_ = null;
      this.helpBubbleHandler_ = HelpBubbleProxyImpl.getInstance().getHandler();
      this.helpBubbleCallbackRouter_ = HelpBubbleProxyImpl.getInstance().getCallbackRouter();
    }
    connectedCallback() {
      super.connectedCallback();
      const router = this.helpBubbleCallbackRouter_;
      this.helpBubbleListenerIds_.push(
        router.showHelpBubble.addListener(this.onShowHelpBubble_.bind(this)),
        router.toggleFocusForAccessibility.addListener(this.onToggleHelpBubbleFocusForAccessibility_.bind(this)),
        router.hideHelpBubble.addListener(this.onHideHelpBubble_.bind(this)),
        router.externalHelpBubbleUpdated.addListener(this.onExternalHelpBubbleUpdated_.bind(this))
      );
      const isVisible = (element) => {
        const rect = element.getBoundingClientRect();
        return rect.height > 0 && rect.width > 0;
      };
      this.debouncedAnchorMayHaveChangedCallback_ = debounceEnd(this.onAnchorBoundsMayHaveChanged_.bind(this), 50);
      this.helpBubbleResizeObserver_ = new ResizeObserver((entries) =>
        entries.forEach(({ target: target }) => {
          if (target === document.body) {
            if (this.debouncedAnchorMayHaveChangedCallback_) {
              this.debouncedAnchorMayHaveChangedCallback_();
            }
          } else {
            this.onAnchorVisibilityChanged_(target, isVisible(target));
          }
        })
      );
      this.helpBubbleFixedAnchorObserver_ = new IntersectionObserver(
        (entries) =>
          entries.forEach(({ target: target, isIntersecting: isIntersecting }) =>
            this.onAnchorVisibilityChanged_(target, isIntersecting)
          ),
        { root: null }
      );
      document.addEventListener('scroll', this.debouncedAnchorMayHaveChangedCallback_, { passive: true });
      this.helpBubbleResizeObserver_.observe(document.body);
      this.controllers.forEach((ctrl) => this.observeControllerAnchor_(ctrl));
    }
    get controllers() {
      return Array.from(this.helpBubbleControllerById_.values());
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      for (const listenerId of this.helpBubbleListenerIds_) {
        this.helpBubbleCallbackRouter_.removeListener(listenerId);
      }
      this.helpBubbleListenerIds_ = [];
      assert(this.helpBubbleResizeObserver_);
      this.helpBubbleResizeObserver_.disconnect();
      this.helpBubbleResizeObserver_ = null;
      assert(this.helpBubbleFixedAnchorObserver_);
      this.helpBubbleFixedAnchorObserver_.disconnect();
      this.helpBubbleFixedAnchorObserver_ = null;
      this.helpBubbleControllerById_.clear();
      if (this.debouncedAnchorMayHaveChangedCallback_) {
        document.removeEventListener('scroll', this.debouncedAnchorMayHaveChangedCallback_);
        this.debouncedAnchorMayHaveChangedCallback_ = null;
      }
    }
    registerHelpBubble(nativeId, trackable, options = {}) {
      if (this.helpBubbleControllerById_.has(nativeId)) {
        const ctrl = this.helpBubbleControllerById_.get(nativeId);
        if (ctrl && ctrl.isBubbleShowing()) {
          return null;
        }
        this.unregisterHelpBubble(nativeId);
      }
      const controller = new HelpBubbleController(nativeId, this.shadowRoot);
      controller.track(trackable, parseOptions(options));
      this.helpBubbleControllerById_.set(nativeId, controller);
      if (this.helpBubbleResizeObserver_) {
        this.observeControllerAnchor_(controller);
      }
      return controller;
    }
    unregisterHelpBubble(nativeId) {
      const ctrl = this.helpBubbleControllerById_.get(nativeId);
      if (ctrl && ctrl.hasAnchor()) {
        this.onAnchorVisibilityChanged_(ctrl.getAnchor(), false);
        this.unobserveControllerAnchor_(ctrl);
      }
      this.helpBubbleControllerById_.delete(nativeId);
    }
    observeControllerAnchor_(controller) {
      const anchor = controller.getAnchor();
      assert(anchor, 'Help bubble does not have anchor');
      if (controller.isAnchorFixed()) {
        assert(this.helpBubbleFixedAnchorObserver_);
        this.helpBubbleFixedAnchorObserver_.observe(anchor);
      } else {
        assert(this.helpBubbleResizeObserver_);
        this.helpBubbleResizeObserver_.observe(anchor);
      }
    }
    unobserveControllerAnchor_(controller) {
      const anchor = controller.getAnchor();
      assert(anchor, 'Help bubble does not have anchor');
      if (controller.isAnchorFixed()) {
        assert(this.helpBubbleFixedAnchorObserver_);
        this.helpBubbleFixedAnchorObserver_.unobserve(anchor);
      } else {
        assert(this.helpBubbleResizeObserver_);
        this.helpBubbleResizeObserver_.unobserve(anchor);
      }
    }
    isHelpBubbleShowing() {
      return this.controllers.some((ctrl) => ctrl.isBubbleShowing());
    }
    isHelpBubbleShowingForTesting(id) {
      const ctrls = this.controllers.filter(this.filterMatchingIdForTesting_(id));
      return !!ctrls[0];
    }
    getHelpBubbleForTesting(id) {
      const ctrls = this.controllers.filter(this.filterMatchingIdForTesting_(id));
      return ctrls[0] ? ctrls[0].getBubble() : null;
    }
    filterMatchingIdForTesting_(anchorId) {
      return (ctrl) => ctrl.isBubbleShowing() && ctrl.getAnchor() !== null && ctrl.getAnchor().id === anchorId;
    }
    getSortedAnchorStatusesForTesting() {
      return this.controllers
        .sort((a, b) => a.getNativeId().localeCompare(b.getNativeId()))
        .map((ctrl) => [ctrl.getNativeId(), ctrl.hasAnchor()]);
    }
    canShowHelpBubble(controller) {
      if (!this.helpBubbleControllerById_.has(controller.getNativeId())) {
        return false;
      }
      if (!controller.canShowBubble()) {
        return false;
      }
      const anchor = controller.getAnchor();
      const anchorIsUsed = this.controllers.some(
        (otherCtrl) => otherCtrl.isBubbleShowing() && otherCtrl.getAnchor() === anchor
      );
      return !anchorIsUsed;
    }
    showHelpBubble(controller, params) {
      assert(this.canShowHelpBubble(controller), "Can't show help bubble");
      const bubble = controller.createBubble(params);
      this.helpBubbleDismissedEventTracker_.add(
        bubble,
        HELP_BUBBLE_DISMISSED_EVENT,
        this.onHelpBubbleDismissed_.bind(this)
      );
      this.helpBubbleDismissedEventTracker_.add(
        bubble,
        HELP_BUBBLE_TIMED_OUT_EVENT,
        this.onHelpBubbleTimedOut_.bind(this)
      );
      controller.show();
    }
    hideHelpBubble(nativeId) {
      const ctrl = this.helpBubbleControllerById_.get(nativeId);
      if (!ctrl || !ctrl.hasBubble()) {
        return false;
      }
      this.helpBubbleDismissedEventTracker_.remove(ctrl.getBubble(), HELP_BUBBLE_DISMISSED_EVENT);
      this.helpBubbleDismissedEventTracker_.remove(ctrl.getBubble(), HELP_BUBBLE_TIMED_OUT_EVENT);
      ctrl.hide();
      return true;
    }
    notifyHelpBubbleAnchorActivated(nativeId) {
      const ctrl = this.helpBubbleControllerById_.get(nativeId);
      if (!ctrl || !ctrl.isBubbleShowing()) {
        return false;
      }
      this.helpBubbleHandler_.helpBubbleAnchorActivated(nativeId);
      return true;
    }
    notifyHelpBubbleAnchorCustomEvent(nativeId, customEvent) {
      const ctrl = this.helpBubbleControllerById_.get(nativeId);
      if (!ctrl || !ctrl.isBubbleShowing()) {
        return false;
      }
      this.helpBubbleHandler_.helpBubbleAnchorCustomEvent(nativeId, customEvent);
      return true;
    }
    onAnchorVisibilityChanged_(target, isVisible) {
      const nativeId = target.dataset['nativeId'];
      assert(nativeId);
      const ctrl = this.helpBubbleControllerById_.get(nativeId);
      const hidden = this.hideHelpBubble(nativeId);
      if (hidden) {
        this.helpBubbleHandler_.helpBubbleClosed(nativeId, HelpBubbleClosedReason.kPageChanged);
      }
      const bounds = isVisible ? this.getElementBounds_(target) : new RectF();
      if (!ctrl || ctrl.updateAnchorVisibility(isVisible, bounds)) {
        this.helpBubbleHandler_.helpBubbleAnchorVisibilityChanged(nativeId, isVisible, bounds);
      }
    }
    onAnchorBoundsMayHaveChanged_() {
      for (const ctrl of this.controllers) {
        if (ctrl.hasAnchor() && ctrl.getAnchorVisibility()) {
          const bounds = this.getElementBounds_(ctrl.getAnchor());
          if (ctrl.updateAnchorVisibility(true, bounds)) {
            this.helpBubbleHandler_.helpBubbleAnchorVisibilityChanged(ctrl.getNativeId(), true, bounds);
          }
        }
      }
    }
    getElementBounds_(element) {
      const rect = new RectF();
      const bounds = element.getBoundingClientRect();
      rect.x = bounds.x;
      rect.y = bounds.y;
      rect.width = bounds.width;
      rect.height = bounds.height;
      const nativeId = element.dataset['nativeId'];
      if (!nativeId) {
        return rect;
      }
      const ctrl = this.helpBubbleControllerById_.get(nativeId);
      if (ctrl) {
        const padding = ctrl.getPadding();
        rect.x -= padding.left;
        rect.y -= padding.top;
        rect.width += padding.left + padding.right;
        rect.height += padding.top + padding.bottom;
      }
      return rect;
    }
    onShowHelpBubble_(params) {
      if (!this.helpBubbleControllerById_.has(params.nativeIdentifier)) {
        return;
      }
      const ctrl = this.helpBubbleControllerById_.get(params.nativeIdentifier);
      this.showHelpBubble(ctrl, params);
    }
    onToggleHelpBubbleFocusForAccessibility_(nativeId) {
      if (!this.helpBubbleControllerById_.has(nativeId)) {
        return;
      }
      const ctrl = this.helpBubbleControllerById_.get(nativeId);
      if (ctrl) {
        const anchor = ctrl.getAnchor();
        if (anchor) {
          anchor.focus();
        }
      }
    }
    onHideHelpBubble_(nativeId) {
      this.hideHelpBubble(nativeId);
    }
    onExternalHelpBubbleUpdated_(nativeId, shown) {
      if (!this.helpBubbleControllerById_.has(nativeId)) {
        return;
      }
      const ctrl = this.helpBubbleControllerById_.get(nativeId);
      ctrl.updateExternalShowingStatus(shown);
    }
    onHelpBubbleDismissed_(e) {
      const nativeId = e.detail.nativeId;
      assert(nativeId);
      const hidden = this.hideHelpBubble(nativeId);
      assert(hidden);
      if (nativeId) {
        if (e.detail.fromActionButton) {
          this.helpBubbleHandler_.helpBubbleButtonPressed(nativeId, e.detail.buttonIndex);
        } else {
          this.helpBubbleHandler_.helpBubbleClosed(nativeId, HelpBubbleClosedReason.kDismissedByUser);
        }
      }
    }
    onHelpBubbleTimedOut_(e) {
      const nativeId = e.detail.nativeId;
      const ctrl = this.helpBubbleControllerById_.get(nativeId);
      assert(ctrl);
      const hidden = this.hideHelpBubble(nativeId);
      assert(hidden);
      if (nativeId) {
        this.helpBubbleHandler_.helpBubbleClosed(nativeId, HelpBubbleClosedReason.kTimedOut);
      }
    }
  }
  return HelpBubbleMixin;
});
function parseOptions(options) {
  const padding = new InsetsF();
  padding.top = clampPadding(options.anchorPaddingTop);
  padding.left = clampPadding(options.anchorPaddingLeft);
  padding.bottom = clampPadding(options.anchorPaddingBottom);
  padding.right = clampPadding(options.anchorPaddingRight);
  return { padding: padding, fixed: !!options.fixed };
}
function clampPadding(n = 0) {
  return Math.max(0, Math.min(20, n));
}
function getTemplate$c() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style settings-shared">
      img {
        width: 100%;
      }
      #safeBrowsingSection {
        padding: 0 var(--cr-section-padding);
      }
      #httpsOnlyModeToggle {
        padding: 0 var(--cr-section-padding);
      }
      .bullet-line {
        align-items: center;
        display: flex;
        min-height: var(--cr-section-min-height);
      }
      .bullet-line > div {
        padding-inline-start: var(--cr-radio-button-size);
      }
      settings-collapse-radio-button:not(:first-of-type) {
        --settings-collapse-separator-line: var(--cr-separator-line);
      }
      settings-collapse-radio-button[hidden] + settings-collapse-radio-button {
        --settings-collapse-separator-line: 0;
      }
      settings-collapse-radio-button .bullet-line:last-child {
        padding-bottom: 12px;
      }
      settings-toggle-button {
        padding-inline-end: 0;
        padding-inline-start: 0;
      }
      settings-toggle-button:not([disabled]) {
        pointer-events: all;
      }
      #safeBrowsingEnhanced .bullet-line:last-of-type {
        padding-bottom: 12px;
      }
      #safeBrowsingEnhanced {
        --cr-radio-button-unchecked-ripple-color: var(--cr-radio-button-checked-ripple-color);
      }
    </style>
    <picture>
      <source srcset="chrome://settings/images/safe_browsing_banner_dark.svg" media="(prefers-color-scheme: dark)" />
      <img id="banner" alt="" src="chrome://settings/images/safe_browsing_banner.svg" />
    </picture>
    <div id="safeBrowsingSection">
      <h2>瀹夊叏娴忚</h2>
      <settings-radio-group
        id="safeBrowsingRadioGroup"
        no-set-pref
        pref="{{prefs.generated.safe_browsing}}"
        selectable-elements="cr-radio-button, settings-collapse-radio-button"
        on-change="onSafeBrowsingRadioChange_"
      >
        <settings-collapse-radio-button
          id="safeBrowsingEnhanced"
          name="[[safeBrowsingSettingEnum_.ENHANCED]]"
          pref="[[prefs.generated.safe_browsing]]"
          label="澧炲己鍨嬩繚鎶�"
          sub-label="涓烘偍鎻愪緵鏇村揩閫熶富鍔ㄧ殑淇濇姢鎺柦锛屽厤鍙楀嵄闄╃綉绔欍€佷笅杞藉唴瀹规垨鎵╁睍绋嬪簭鐨勫▉鑳併€傜郴缁熶細鍦ㄥ瘑鐮侀伃娉勯湶鏃跺悜鎮ㄥ彂鍑鸿鍛娿€傛偍闇€瑕佸悜 Google 鍙戦€佹祻瑙堟暟鎹€�"
          indicator-aria-label="姝よ缃敱鎮ㄧ殑绠＄悊鍛樼鐞嗐€�"
          expand-aria-label="鏄剧ず澧炲己鍨嬩繚鎶よ鎯�"
          on-expand-clicked="onEnhancedProtectionExpandButtonClicked_"
          no-automatic-collapse
        >
          <div slot="collapse">
            <div class="bullet-line">
              <iron-icon icon="cr:security"></iron-icon>
              <div class="cr-secondary-text">棰勬祴鍗遍櫓浜嬩欢骞跺湪姝ょ被浜嬩欢鍙戠敓鍓嶅悜鎮ㄥ彂鍑鸿鍛�</div>
            </div>
            <div class="bullet-line">
              <iron-icon icon="settings20:googleg"></iron-icon>
              <div class="cr-secondary-text">
                淇濇姢鎮ㄥ湪 Chrome 涓厤鍙楀畨鍏ㄥ▉鑳侊紝鐧诲綍鐘舵€佷笅杩樺彲璁╂偍鏇村畨鍏ㄥ湴浣跨敤鍏朵粬 Google
                搴旂敤
              </div>
            </div>
            <div class="bullet-line">
              <iron-icon icon="settings:public"></iron-icon>
              <div class="cr-secondary-text">涓烘偍鍜岀綉缁滀笂鐨勬墍鏈変汉鎻愪緵鏇村ソ鐨勫畨鍏ㄤ繚闅�</div>
            </div>
            <div class="bullet-line">
              <iron-icon icon="settings20:vpn-key"></iron-icon>
              <div class="cr-secondary-text">瀵嗙爜閬亣鏁版嵁娉勯湶鏃跺悜鎮ㄥ彂鍑鸿鍛�</div>
            </div>
            <div class="bullet-line last-collapse-item">
              <iron-icon icon="settings20:data"></iron-icon>
              <div class="cr-secondary-text cr-padded-text">
                绯荤粺浼氬皢缃戝潃鍙戦€佺粰鈥滃畨鍏ㄦ祻瑙堚€濆姛鑳借繘琛屾鏌ワ紝杩樹細鍙戦€佺綉椤点€佷笅杞藉唴瀹广€佹墿灞曠▼搴忔椿鍔ㄥ拰绯荤粺淇℃伅鐨勫皯閲忔牱鏈紝浠ュ府鍔╁彂鐜版柊濞佽儊銆傚綋鎮ㄧ櫥褰曞悗锛屼細鏆傛椂灏嗚繖浜涙暟鎹叧鑱斿埌鎮ㄧ殑
                Google 甯愬彿锛屼互渚垮湪鍚勪釜 Google 搴旂敤涓负鎮ㄦ彁渚涗繚鎶ゃ€�
              </div>
            </div>
          </div>
        </settings-collapse-radio-button>
        <settings-collapse-radio-button
          id="safeBrowsingStandard"
          name="[[safeBrowsingSettingEnum_.STANDARD]]"
          pref="[[prefs.generated.safe_browsing]]"
          label="鏍囧噯淇濇姢"
          sub-label="[[getSafeBrowsingStandardSubLabel_(
                        enableFriendlierSafeBrowsingSettings_)]]"
          indicator-aria-label="姝よ缃敱鎮ㄧ殑绠＄悊鍛樼鐞嗐€�"
          expand-aria-label="鏄剧ず鏍囧噯淇濇姢璇︽儏"
          info-opened="{{infoOpened_}}"
          on-expand-clicked="onStandardProtectionExpandButtonClicked_"
          no-automatic-collapse
        >
          <template is="dom-if" if="[[!enableFriendlierSafeBrowsingSettings_]]">
            <div slot="collapse">
              <div class="bullet-line">
                <iron-icon icon="cr:security"></iron-icon>
                <div class="cr-secondary-text">妫€娴嬪嵄闄╀簨浠跺苟鍦ㄦ绫讳簨浠跺彂鐢熸椂鍚戞偍鍙戝嚭璀﹀憡</div>
              </div>
              <div class="bullet-line">
                <iron-icon icon="settings20:data"></iron-icon>
                <div class="cr-secondary-text cr-padded-text">
                  灏嗙綉鍧€涓庡瓨鍌ㄥ湪 Chrome
                  涓殑涓嶅畨鍏ㄧ綉绔欏垪琛ㄨ繘琛屾瘮瀵广€傚鏋滄煇涓綉绔欎紒鍥剧獌鍙栨偍鐨勫瘑鐮侊紝鎴栬€呮偍涓嬭浇浜嗘湁瀹崇殑鏂囦欢锛孋hrome
                  鍙兘杩樹細灏嗙浉搴旂綉鍧€杩炲悓灏戦噺缃戦〉鍐呭鍙戦€佺粰鈥滃畨鍏ㄦ祻瑙堚€濆姛鑳姐€�
                </div>
              </div>
            </div>
          </template>
          <div slot="noSelectionCollapse">
            <settings-toggle-button
              id="safeBrowsingReportingToggle"
              pref="{{prefs.safebrowsing.scout_reporting_enabled}}"
              label="甯姪鎴戜滑涓烘墍鏈変汉鏀瑰杽缃戠粶瀹夊叏鐜"
              sub-label="鍚� Google 鍙戦€佹偍璁块棶鐨勯儴鍒嗙綉椤电殑缃戝潃銆佹湁闄愮殑绯荤粺淇℃伅浠ュ強閮ㄥ垎缃戦〉鍐呭锛屼互鍗忓姪鎴戜滑鍙戠幇鏂板▉鑳佸苟淇濇姢缃戠粶涓婄殑鎵€鏈夌敤鎴枫€�"
              on-change="onSafeBrowsingExtendedReportingChange_"
              disabled="[[getDisabledExtendedSafeBrowsing_(
                              prefs.generated.safe_browsing.*)]]"
            >
            </settings-toggle-button>
            <settings-toggle-button
              id="passwordsLeakToggle"
              label="[[getPasswordsLeakToggleLabel_(
                        enableFriendlierSafeBrowsingSettings_)]]"
              pref="{{prefs.generated.password_leak_detection}}"
              sub-label="[[getPasswordsLeakToggleSubLabel_(
                              enableFriendlierSafeBrowsingSettings_,
                              prefs.profile.password_manager_leak_detection.*,
                              prefs.generated.password_leak_detection.*)]]"
            >
            </settings-toggle-button>
          </div>
        </settings-collapse-radio-button>
        <settings-collapse-radio-button
          id="safeBrowsingDisabled"
          no-collapse
          name="[[safeBrowsingSettingEnum_.DISABLED]]"
          pref="[[prefs.generated.safe_browsing]]"
          label="涓嶄繚鎶わ紙涓嶅缓璁級"
          sub-label="涓嶄細淇濇姢鎮ㄥ厤鍙楀嵄闄╃綉绔欍€佷笅杞藉唴瀹瑰拰鎵╁睍绋嬪簭鐨勪镜瀹炽€傚湪 Gmail 鍜� Google 鎼滅储绛夊叾浠� Google 鏈嶅姟涓紝鑻ュ畨鍏ㄦ祻瑙堜繚鎶ゅ彲鐢紝鎮ㄤ粛灏嗚幏寰楄淇濇姢銆�"
          indicator-aria-label="姝よ缃敱鎮ㄧ殑绠＄悊鍛樼鐞嗐€�"
        >
        </settings-collapse-radio-button>
      </settings-radio-group>
    </div>
    <div class="cr-row first">
      <h2>楂樼骇</h2>
    </div>
    <template is="dom-if" if="[[showHttpsOnlyModeSetting_]]">
      <settings-toggle-button
        id="httpsOnlyModeToggle"
        pref="{{prefs.generated.https_first_mode_enabled}}"
        label="涓€寰嬩娇鐢ㄥ畨鍏ㄨ繛鎺�"
        sub-label="[[getHttpsFirstModeSubLabel_(
                        prefs.generated.https_first_mode_enabled.*)]]"
      >
      </settings-toggle-button>
    </template>
    <template is="dom-if" if="[[showSecureDnsSetting_]]">
      <settings-secure-dns prefs="{{prefs}}"></settings-secure-dns>
    </template>

    <template is="dom-if" if="[[enableSecurityKeysSubpage_]]">
      <cr-link-row
        id="security-keys-subpage-trigger"
        class="hr"
        label="绠＄悊瀹夊叏瀵嗛挜"
        sub-label="閲嶇疆瀹夊叏瀵嗛挜骞跺垱寤� PIN 鐮�"
        on-click="onSecurityKeysClick_"
        role-description="瀛愰〉闈㈡寜閽�"
      ></cr-link-row>
    </template>

    <template is="dom-if" if="[[enableSecurityKeysPhonesSubpage_]]">
      <cr-link-row
        id="security-keys-phones-subpage-trigger"
        label="绠＄悊鎵嬫満"
        sub-label="鎺у埗鎮ㄤ娇鐢ㄥ摢浜涙墜鏈轰綔涓哄畨鍏ㄥ瘑閽�"
        on-click="onManagePhonesClick_"
      ></cr-link-row>
    </template>

    <template is="dom-if" if="[[!showChromeRootStoreCertificates_]]">
      <cr-link-row
        id="manageCertificates"
        class="hr"
        external
        label="绠＄悊璇佷功"
        sub-label="绠＄悊 HTTPS/SSL 璇佷功鍜岃缃�"
        on-click="onManageCertificatesClick_"
      ></cr-link-row>
    </template>

    <template is="dom-if" if="[[showChromeRootStoreCertificates_]]">
      <cr-link-row
        id="manageCertificates"
        class="hr"
        external
        label="绠＄悊璁惧璇佷功"
        sub-label="绠＄悊鎮ㄨ澶囦笂鐨� HTTPS/SSL 璇佷功"
        on-click="onManageCertificatesClick_"
      ></cr-link-row>

      <cr-link-row
        id="chromeCertificates"
        class="hr"
        external
        label="鐢� Chrome 绠＄悊鐨勮瘉涔�"
        sub-label="涓� Chrome 濡備綍绠＄悊鍏舵牴璇佷功鏈夊叧鐨勪俊鎭�"
        on-click="onChromeCertificatesClick_"
      ></cr-link-row>
    </template>

    <cr-link-row
      id="advanced-protection-program-link"
      class="hr"
      label="Google 楂樼骇淇濇姢璁″垝"
      sub-label="涓烘墍鏈夊彲鑳戒細閬埌瀹氬悜鏀诲嚮鐨勪釜浜� Google 甯愬彿鎻愪緵淇濇姢"
      on-click="onAdvancedProtectionProgramLinkClick_"
      external
    >
    </cr-link-row>
    <template is="dom-if" if="[[showDisableSafebrowsingDialog_]]" restamp>
      <settings-simple-confirmation-dialog
        title-text="瑕佸叧闂€滃畨鍏ㄦ祻瑙堚€濆姛鑳藉悧锛�"
        body-text="鈥滃畨鍏ㄦ祻瑙堚€濆姛鑳藉彲淇濇姢鎮ㄥ厤鍙楁敾鍑昏€呰楠楋紝浠ラ槻鍋氬嚭涓€浜涘嵄闄╂搷浣滐紝渚嬪瀹夎鎭舵剰杞欢鎴栨硠闇蹭釜浜轰俊鎭紙濡傚瘑鐮併€佺數璇濆彿鐮佹垨淇＄敤鍗′俊鎭級銆傚鏋滃叧闂鍔熻兘锛屽綋娴忚涓嶇啛鎮夋垨淇¤獕涓嶄匠鐨勭綉绔欐椂锛岃涓€瀹氬鍔犲皬蹇冦€�"
        confirm-text="鍏抽棴"
        on-close="onDisableSafebrowsingDialogClose_"
      >
      </settings-simple-confirmation-dialog>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2019 The Chromium Authors
var SafeBrowsingSetting;
(function (SafeBrowsingSetting) {
  SafeBrowsingSetting[(SafeBrowsingSetting['ENHANCED'] = 0)] = 'ENHANCED';
  SafeBrowsingSetting[(SafeBrowsingSetting['STANDARD'] = 1)] = 'STANDARD';
  SafeBrowsingSetting[(SafeBrowsingSetting['DISABLED'] = 2)] = 'DISABLED';
})(SafeBrowsingSetting || (SafeBrowsingSetting = {}));
const SettingsSecurityPageElementBase = HelpBubbleMixin(RouteObserverMixin(I18nMixin(PrefsMixin(PolymerElement))));
class SettingsSecurityPageElement extends SettingsSecurityPageElementBase {
  constructor() {
    super(...arguments);
    this.browserProxy_ = PrivacyPageBrowserProxyImpl.getInstance();
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-security-page';
  }
  static get template() {
    return getTemplate$c();
  }
  static get properties() {
    return {
      prefs: { type: Object, notify: true },
      showChromeRootStoreCertificates_: {
        type: Boolean,
        readOnly: true,
        value: function () {
          return loadTimeData.getBoolean('showChromeRootStoreCertificates');
        },
      },
      showHttpsOnlyModeSetting_: {
        type: Boolean,
        readOnly: true,
        value: function () {
          return loadTimeData.getBoolean('showHttpsOnlyModeSetting');
        },
      },
      showSecureDnsSetting_: {
        type: Boolean,
        readOnly: true,
        value: function () {
          return loadTimeData.getBoolean('showSecureDnsSetting');
        },
      },
      safeBrowsingSettingEnum_: { type: Object, value: SafeBrowsingSetting },
      enableSecurityKeysSubpage_: {
        type: Boolean,
        readOnly: true,
        value() {
          return loadTimeData.getBoolean('enableSecurityKeysSubpage');
        },
      },
      enableSecurityKeysPhonesSubpage_: {
        type: Boolean,
        readOnly: true,
        value() {
          return !loadTimeData.getBoolean('enableSecurityKeysSubpage');
        },
      },
      focusConfig: { type: Object, observer: 'focusConfigChanged_' },
      enableFriendlierSafeBrowsingSettings_: {
        type: Boolean,
        value() {
          return loadTimeData.getBoolean('enableFriendlierSafeBrowsingSettings');
        },
      },
      showDisableSafebrowsingDialog_: Boolean,
    };
  }
  focusConfigChanged_(_newConfig, oldConfig) {
    assert(!oldConfig);
    if (routes.SECURITY_KEYS) {
      this.focusConfig.set(routes.SECURITY_KEYS.path, () => {
        const toFocus = this.shadowRoot.querySelector('#security-keys-subpage-trigger');
        assert(toFocus);
        focusWithoutInk(toFocus);
      });
    }
  }
  ready() {
    super.ready();
    CrSettingsPrefs.initialized.then(() => {
      const prefValue = this.getPref('generated.safe_browsing').value;
      if (prefValue === SafeBrowsingSetting.ENHANCED) {
        this.$.safeBrowsingEnhanced.expanded = true;
      } else if (prefValue === SafeBrowsingSetting.STANDARD) {
        this.$.safeBrowsingStandard.expanded = true;
      }
    });
    this.registerHelpBubble('kEnhancedProtectionSettingElementId', this.$.safeBrowsingEnhanced.getBubbleAnchor(), {
      anchorPaddingTop: 10,
    });
  }
  currentRouteChanged(route) {
    if (route === routes.SECURITY) {
      this.metricsBrowserProxy_.recordSafeBrowsingInteractionHistogram(SafeBrowsingInteractions.SAFE_BROWSING_SHOWED);
      const queryParams = Router.getInstance().getQueryParameters();
      const section = queryParams.get('q');
      if (section === 'enhanced') {
        this.$.safeBrowsingEnhanced.expanded = !loadTimeData.getBoolean('enableEsbCollapse');
        this.$.safeBrowsingStandard.expanded = false;
      }
    }
  }
  updateCollapsedButtons_() {
    this.$.safeBrowsingEnhanced.updateCollapsed();
    this.$.safeBrowsingStandard.updateCollapsed();
  }
  onSafeBrowsingRadioChange_() {
    const selected = Number.parseInt(this.$.safeBrowsingRadioGroup.selected, 10);
    const prefValue = this.getPref('generated.safe_browsing').value;
    if (prefValue !== selected) {
      this.recordInteractionHistogramOnRadioChange_(selected);
      this.recordActionOnRadioChange_(selected);
    }
    if (selected === SafeBrowsingSetting.DISABLED) {
      this.showDisableSafebrowsingDialog_ = true;
    } else {
      this.updateCollapsedButtons_();
      this.$.safeBrowsingRadioGroup.sendPrefChange();
    }
  }
  getDisabledExtendedSafeBrowsing_() {
    return this.getPref('generated.safe_browsing').value !== SafeBrowsingSetting.STANDARD;
  }
  getSafeBrowsingStandardSubLabel_() {
    return this.i18n(
      this.enableFriendlierSafeBrowsingSettings_ ? 'safeBrowsingStandardDescUpdated' : 'safeBrowsingStandardDesc'
    );
  }
  getPasswordsLeakToggleLabel_() {
    return this.i18n(
      this.enableFriendlierSafeBrowsingSettings_ ? 'passwordsLeakDetectionLabelUpdated' : 'passwordsLeakDetectionLabel'
    );
  }
  getPasswordsLeakToggleSubLabel_() {
    let subLabel = this.i18n(
      this.enableFriendlierSafeBrowsingSettings_
        ? 'passwordsLeakDetectionGeneralDescriptionUpdated'
        : 'passwordsLeakDetectionGeneralDescription'
    );
    if (this.prefs !== undefined) {
      const generatedPref = this.getPref('generated.password_leak_detection');
      if (
        this.getPref('profile.password_manager_leak_detection').value &&
        !generatedPref.value &&
        generatedPref.userControlDisabled
      ) {
        subLabel += ' ' + this.i18n('passwordsLeakDetectionSignedOutEnabledDescription');
      }
    }
    return subLabel;
  }
  getHttpsFirstModeSubLabel_() {
    const generatedPref = this.getPref('generated.https_first_mode_enabled');
    return this.i18n(
      generatedPref.userControlDisabled ? 'httpsOnlyModeDescriptionAdvancedProtection' : 'httpsOnlyModeDescription'
    );
  }
  onManageCertificatesClick_() {
    this.browserProxy_.showManageSslCertificates();
    this.metricsBrowserProxy_.recordSettingsPageHistogram(PrivacyElementInteractions.MANAGE_CERTIFICATES);
  }
  onChromeCertificatesClick_() {
    OpenWindowProxyImpl.getInstance().openUrl(loadTimeData.getString('chromeRootStoreHelpCenterURL'));
  }
  onAdvancedProtectionProgramLinkClick_() {
    window.open(loadTimeData.getString('advancedProtectionURL'));
  }
  onSecurityKeysClick_() {
    Router.getInstance().navigateTo(routes.SECURITY_KEYS);
  }
  onManagePhonesClick_() {
    Router.getInstance().navigateTo(routes.SECURITY_KEYS_PHONES);
  }
  onSafeBrowsingExtendedReportingChange_() {
    this.metricsBrowserProxy_.recordSettingsPageHistogram(PrivacyElementInteractions.IMPROVE_SECURITY);
  }
  onDisableSafebrowsingDialogClose_() {
    const dialog = this.shadowRoot.querySelector('settings-simple-confirmation-dialog');
    assert(dialog);
    const confirmed = dialog.wasConfirmed();
    this.recordInteractionHistogramOnSafeBrowsingDialogClose_(confirmed);
    this.recordActionOnSafeBrowsingDialogClose_(confirmed);
    if (confirmed) {
      this.$.safeBrowsingRadioGroup.sendPrefChange();
      this.updateCollapsedButtons_();
    } else {
      this.$.safeBrowsingRadioGroup.resetToPrefValue();
    }
    this.showDisableSafebrowsingDialog_ = false;
    focusWithoutInk(this.$.safeBrowsingDisabled);
  }
  onEnhancedProtectionExpandButtonClicked_() {
    this.recordInteractionHistogramOnExpandButtonClicked_(SafeBrowsingSetting.ENHANCED);
    this.recordActionOnExpandButtonClicked_(SafeBrowsingSetting.ENHANCED);
  }
  onStandardProtectionExpandButtonClicked_() {
    this.recordInteractionHistogramOnExpandButtonClicked_(SafeBrowsingSetting.STANDARD);
    this.recordActionOnExpandButtonClicked_(SafeBrowsingSetting.STANDARD);
  }
  recordInteractionHistogramOnRadioChange_(safeBrowsingSetting) {
    let action;
    if (safeBrowsingSetting === SafeBrowsingSetting.ENHANCED) {
      action = SafeBrowsingInteractions.SAFE_BROWSING_ENHANCED_PROTECTION_CLICKED;
    } else if (safeBrowsingSetting === SafeBrowsingSetting.STANDARD) {
      action = SafeBrowsingInteractions.SAFE_BROWSING_STANDARD_PROTECTION_CLICKED;
    } else {
      action = SafeBrowsingInteractions.SAFE_BROWSING_DISABLE_SAFE_BROWSING_CLICKED;
    }
    this.metricsBrowserProxy_.recordSafeBrowsingInteractionHistogram(action);
  }
  recordInteractionHistogramOnExpandButtonClicked_(safeBrowsingSetting) {
    this.metricsBrowserProxy_.recordSafeBrowsingInteractionHistogram(
      safeBrowsingSetting === SafeBrowsingSetting.ENHANCED
        ? SafeBrowsingInteractions.SAFE_BROWSING_ENHANCED_PROTECTION_EXPAND_ARROW_CLICKED
        : SafeBrowsingInteractions.SAFE_BROWSING_STANDARD_PROTECTION_EXPAND_ARROW_CLICKED
    );
  }
  recordInteractionHistogramOnSafeBrowsingDialogClose_(confirmed) {
    this.metricsBrowserProxy_.recordSafeBrowsingInteractionHistogram(
      confirmed
        ? SafeBrowsingInteractions.SAFE_BROWSING_DISABLE_SAFE_BROWSING_DIALOG_CONFIRMED
        : SafeBrowsingInteractions.SAFE_BROWSING_DISABLE_SAFE_BROWSING_DIALOG_DENIED
    );
  }
  recordActionOnRadioChange_(safeBrowsingSetting) {
    let actionName;
    if (safeBrowsingSetting === SafeBrowsingSetting.ENHANCED) {
      actionName = 'SafeBrowsing.Settings.EnhancedProtectionClicked';
    } else if (safeBrowsingSetting === SafeBrowsingSetting.STANDARD) {
      actionName = 'SafeBrowsing.Settings.StandardProtectionClicked';
    } else {
      actionName = 'SafeBrowsing.Settings.DisableSafeBrowsingClicked';
    }
    this.metricsBrowserProxy_.recordAction(actionName);
  }
  recordActionOnExpandButtonClicked_(safeBrowsingSetting) {
    this.metricsBrowserProxy_.recordAction(
      safeBrowsingSetting === SafeBrowsingSetting.ENHANCED
        ? 'SafeBrowsing.Settings.EnhancedProtectionExpandArrowClicked'
        : 'SafeBrowsing.Settings.StandardProtectionExpandArrowClicked'
    );
  }
  recordActionOnSafeBrowsingDialogClose_(confirmed) {
    this.metricsBrowserProxy_.recordAction(
      confirmed
        ? 'SafeBrowsing.Settings.DisableSafeBrowsingDialogConfirmed'
        : 'SafeBrowsing.Settings.DisableSafeBrowsingDialogDenied'
    );
  }
}
customElements.define(SettingsSecurityPageElement.is, SettingsSecurityPageElement);
function getTemplate$b() {
  return html`<!--_html_template_start_--><style include="privacy-guide-fragment-shared"></style>
    <div class="header-phase2" focus-element tabindex="-1">
      <picture>
        <source
          srcset="./images/privacy_guide/safe_browsing_graphic_dark_v2.svg"
          media="(prefers-color-scheme: dark)"
        />
        <img alt="" src="./images/privacy_guide/safe_browsing_graphic_v2.svg" />
      </picture>
      <h2 class="header-label-phase2">閫夋嫨鎵€闇€鐨勨€滃畨鍏ㄦ祻瑙堚€濆姛鑳戒繚鎶ょ骇鍒�</h2>
    </div>
    <div class="fragment-content">
      <settings-radio-group
        id="safeBrowsingRadioGroup"
        pref="{{prefs.generated.safe_browsing}}"
        selectable-elements="settings-collapse-radio-button"
        on-keydown="onRadioGroupKeyDown_"
      >
        <settings-collapse-radio-button
          id="safeBrowsingRadioEnhanced"
          pref="[[prefs.generated.safe_browsing]]"
          name="[[safeBrowsingSettingEnum_.ENHANCED]]"
          label="澧炲己鍨嬩繚鎶�"
          sub-label="涓烘偍鎻愪緵鏇村揩閫熶富鍔ㄧ殑淇濇姢鎺柦锛屽厤鍙楀嵄闄╃綉绔欍€佷笅杞藉唴瀹规垨鎵╁睍绋嬪簭鐨勫▉鑳併€傜郴缁熶細鍦ㄥ瘑鐮侀伃娉勯湶鏃跺悜鎮ㄥ彂鍑鸿鍛娿€傛偍闇€瑕佸悜 Google 鍙戦€佹祻瑙堟暟鎹€�"
          expand-aria-label="鏄剧ず澧炲己鍨嬩繚鎶よ鎯�"
          on-click="onSafeBrowsingEnhancedClick_"
        >
          <div slot="collapse" class="description-wrapper-radio two-column">
            <div class="description-column description-column-first">
              <div class="description-header">澶勪簬寮€鍚姸鎬佹椂</div>
              <div role="list">
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:security"
                  label="棰勬祴鍗遍櫓浜嬩欢骞跺湪姝ょ被浜嬩欢鍙戠敓鍓嶅悜鎮ㄥ彂鍑鸿鍛�"
                >
                </privacy-guide-description-item>
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:googleg"
                  label="淇濇姢鎮ㄥ湪 Chrome 涓厤鍙楀畨鍏ㄥ▉鑳侊紝鐧诲綍鐘舵€佷笅杩樺彲璁╂偍鏇村畨鍏ㄥ湴浣跨敤鍏朵粬 Google 搴旂敤"
                >
                </privacy-guide-description-item>
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:public"
                  label="涓烘偍鍜岀綉缁滀笂鐨勬墍鏈変汉鎻愪緵鏇村ソ鐨勫畨鍏ㄤ繚闅�"
                >
                </privacy-guide-description-item>
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:vpn-key"
                  label="瀵嗙爜閬亣鏁版嵁娉勯湶鏃跺悜鎮ㄥ彂鍑鸿鍛�"
                >
                </privacy-guide-description-item>
              </div>
            </div>
            <div class="description-column">
              <div class="description-header">娉ㄦ剰浜嬮」</div>
              <div role="list">
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:data"
                  label="浼氬皢缃戝潃鍙戦€佺粰鈥滃畨鍏ㄦ祻瑙堚€濆姛鑳借繘琛屾鏌�"
                >
                </privacy-guide-description-item>
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:web-asset"
                  label="杩樹細鍙戦€佺綉椤点€佷笅杞藉唴瀹广€佹墿灞曠▼搴忔椿鍔ㄥ拰绯荤粺淇℃伅鐨勫皯閲忔牱鏈紝浠ュ府鍔╁彂鐜版柊濞佽儊"
                >
                </privacy-guide-description-item>
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:account-circle"
                  label="鑰屼笖锛屼細鍦ㄦ偍鐧诲綍鍚庢殏鏃跺皢杩欎簺鏁版嵁鍏宠仈鍒版偍鐨� Google 甯愬彿锛屼互渚垮湪鍚勬 Google 搴旂敤涓负鎮ㄦ彁渚涗繚鎶�"
                >
                </privacy-guide-description-item>
              </div>
            </div>
          </div>
        </settings-collapse-radio-button>
        <settings-collapse-radio-button
          id="safeBrowsingRadioStandard"
          pref="[[prefs.generated.safe_browsing]]"
          name="[[safeBrowsingSettingEnum_.STANDARD]]"
          label="鏍囧噯淇濇姢"
          sub-label="閽堝宸茬煡鍗遍櫓缃戠珯銆佷笅杞藉唴瀹瑰拰鎵╁睍绋嬪簭鎻愪緵鏍囧噯淇濇姢"
          expand-aria-label="鏄剧ず鏍囧噯淇濇姢璇︽儏"
          on-click="onSafeBrowsingStandardClick_"
        >
          <div slot="collapse" class="description-wrapper-radio two-column">
            <div class="description-column description-column-first">
              <div class="description-header">澶勪簬寮€鍚姸鎬佹椂</div>
              <div role="list">
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:security"
                  label="妫€娴嬪嵄闄╀簨浠跺苟鍦ㄦ绫讳簨浠跺彂鐢熸椂鍚戞偍鍙戝嚭璀﹀憡"
                >
                </privacy-guide-description-item>
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:googleg"
                  label="灏嗙綉鍧€涓庡瓨鍌ㄥ湪 Chrome 涓殑涓嶅畨鍏ㄧ綉绔欏垪琛ㄨ繘琛屾瘮瀵�"
                >
                </privacy-guide-description-item>
              </div>
            </div>
            <div class="description-column">
              <div class="description-header">娉ㄦ剰浜嬮」</div>
              <div role="list">
                <privacy-guide-description-item
                  role="listitem"
                  icon="settings20:data"
                  label="濡傛灉鏌愪釜缃戠珯浼佸浘绐冨彇鎮ㄧ殑瀵嗙爜锛屾垨鑰呮偍涓嬭浇浜嗘湁瀹崇殑鏂囦欢锛孋hrome 鍙兘杩樹細灏嗙浉搴旂綉鍧€杩炲悓灏戦噺缃戦〉鍐呭鍙戦€佺粰鈥滃畨鍏ㄦ祻瑙堚€濆姛鑳�"
                >
                </privacy-guide-description-item>
              </div>
            </div>
          </div>
        </settings-collapse-radio-button>
      </settings-radio-group>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
const PrivacyGuideSafeBrowsingFragmentBase = PrefsMixin(PolymerElement);
class PrivacyGuideSafeBrowsingFragmentElement extends PrivacyGuideSafeBrowsingFragmentBase {
  constructor() {
    super(...arguments);
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'privacy-guide-safe-browsing-fragment';
  }
  static get template() {
    return getTemplate$b();
  }
  static get properties() {
    return {
      prefs: { type: Object, notify: true },
      safeBrowsingSettingEnum_: { type: Object, value: SafeBrowsingSetting },
    };
  }
  ready() {
    super.ready();
    this.addEventListener('view-enter-start', this.onViewEnterStart_);
    this.addEventListener('view-exit-finish', this.onViewExitFinish_);
  }
  focus() {
    this.shadowRoot.querySelector('[focus-element]').focus();
  }
  onViewEnterStart_() {
    this.startStateEnhanced_ = this.getPref('generated.safe_browsing').value === SafeBrowsingSetting.ENHANCED;
    this.metricsBrowserProxy_.recordPrivacyGuideStepsEligibleAndReachedHistogram(
      PrivacyGuideStepsEligibleAndReached.SAFE_BROWSING_REACHED
    );
  }
  onViewExitFinish_() {
    const endStateEnhanced = this.getPref('generated.safe_browsing').value === SafeBrowsingSetting.ENHANCED;
    let state = null;
    if (this.startStateEnhanced_) {
      state = endStateEnhanced
        ? PrivacyGuideSettingsStates.SAFE_BROWSING_ENHANCED_TO_ENHANCED
        : PrivacyGuideSettingsStates.SAFE_BROWSING_ENHANCED_TO_STANDARD;
    } else {
      state = endStateEnhanced
        ? PrivacyGuideSettingsStates.SAFE_BROWSING_STANDARD_TO_ENHANCED
        : PrivacyGuideSettingsStates.SAFE_BROWSING_STANDARD_TO_STANDARD;
    }
    this.metricsBrowserProxy_.recordPrivacyGuideSettingsStatesHistogram(state);
  }
  onSafeBrowsingEnhancedClick_() {
    this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.ChangeSafeBrowsingEnhanced');
  }
  onSafeBrowsingStandardClick_() {
    this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.ChangeSafeBrowsingStandard');
  }
  onRadioGroupKeyDown_(event) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        event.stopPropagation();
        break;
    }
  }
}
customElements.define(PrivacyGuideSafeBrowsingFragmentElement.is, PrivacyGuideSafeBrowsingFragmentElement);
function getTemplate$a() {
  return html`<!--_html_template_start_--><style include="privacy-guide-fragment-shared">
      :host {
        display: flex;
        flex-flow: column;
        min-height: calc(432px - var(--privacy-guide-footer-total-height));
      }
      .headline {
        outline: 0;
      }
      .headline-container {
        padding: 48px 116px var(--cr-section-padding) 116px;
        row-gap: 12px;
      }
      .footer {
        align-items: center;
        bottom: calc(-1 * var(--privacy-guide-footer-total-height));
        display: flex;
        justify-content: flex-end;
        padding-bottom: var(--privacy-guide-footer-vertical-padding);
        position: absolute;
        width: calc(100% - 48px);
      }
      :host-context([is-privacy-guide-v2]) picture {
        animation: fade-in 1.5s, slide-in 0.3s;
      }
      :host-context([is-privacy-guide-v2]) .footer {
        animation: fade-in var(--privacy-guide-animation-duration);
      }
    </style>
    <div class="headline-container">
      <picture>
        <source srcset="./images/privacy_guide/welcome_banner_dark.svg" media="(prefers-color-scheme: dark)" />
        <img alt="" src="./images/privacy_guide/welcome_banner.svg" />
      </picture>
      <div class="headline" tabindex="-1">闅愮鎺у埗閫夐」鎸囧崡</div>
      <div class="cr-secondary-text">
        瑙傜湅瀵艰锛屼簡瑙ｉ噸瑕佺殑闅愮鎺у埗璁剧疆鍜屽畨鍏ㄦ帶浠躲€傚闇€鏌ョ湅鏇村閫夐」锛岃杞埌鍚勯」璁剧疆銆�
      </div>
    </div>
    <div class="footer">
      <cr-button class="action-button" id="startButton" on-click="onStartButtonClick_"> 涓嬩竴姝� </cr-button>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
class PrivacyGuideWelcomeFragmentElement extends PolymerElement {
  static get is() {
    return 'privacy-guide-welcome-fragment';
  }
  static get template() {
    return getTemplate$a();
  }
  focus() {
    this.shadowRoot.querySelector('.headline').focus();
  }
  onStartButtonClick_(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('start-button-click', { bubbles: true, composed: true }));
  }
}
customElements.define(PrivacyGuideWelcomeFragmentElement.is, PrivacyGuideWelcomeFragmentElement);
function getTemplate$9() {
  return html`<!--_html_template_start_--><style include="cr-shared-style">
      :host {
        align-items: center;
        display: flex;
      }
      span {
        background: var(--google-grey-200);
        border-radius: 50%;
        display: inline-block;
        height: 8px;
        margin: 0 4px;
        width: 8px;
      }
      span.active {
        background: var(--google-blue-600);
      }
      .screen-reader-only {
        clip: rect(0, 0, 0, 0);
        position: fixed;
      }
      @media (prefers-color-scheme: dark) {
        span {
          background: var(--google-grey-500);
        }
        span.active {
          background: var(--google-blue-300);
        }
      }
    </style>
    <template is="dom-repeat" items="[[dots_]]">
      <span class$="[[getActiveClass_(index, model.active)]]"></span>
    </template>
    <div class="screen-reader-only">[[computeA11yLabel_(model.active, model.total)]]</div>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
const StepIndicatorBase = I18nMixin(PolymerElement);
class StepIndicator extends StepIndicatorBase {
  static get is() {
    return 'step-indicator';
  }
  static get properties() {
    return { model: Object, dots_: { type: Array, computed: 'computeDots_(model.total)' } };
  }
  computeA11yLabel_() {
    return this.i18n('privacyGuideSteps', this.model.active + 1, this.model.total);
  }
  computeDots_() {
    return new Array(this.model.total > 1 ? this.model.total : 0);
  }
  getActiveClass_(index) {
    return index === this.model.active ? 'active' : '';
  }
  static get template() {
    return getTemplate$9();
  }
}
customElements.define(StepIndicator.is, StepIndicator);
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var TrustSafetyInteraction;
(function (TrustSafetyInteraction) {
  TrustSafetyInteraction[(TrustSafetyInteraction['RAN_SAFETY_CHECK'] = 0)] = 'RAN_SAFETY_CHECK';
  TrustSafetyInteraction[(TrustSafetyInteraction['USED_PRIVACY_CARD'] = 1)] = 'USED_PRIVACY_CARD';
  TrustSafetyInteraction[(TrustSafetyInteraction['OPENED_PRIVACY_SANDBOX'] = 2)] = 'OPENED_PRIVACY_SANDBOX';
  TrustSafetyInteraction[(TrustSafetyInteraction['OPENED_PASSWORD_MANAGER'] = 3)] = 'OPENED_PASSWORD_MANAGER';
  TrustSafetyInteraction[(TrustSafetyInteraction['COMPLETED_PRIVACY_GUIDE'] = 4)] = 'COMPLETED_PRIVACY_GUIDE';
  TrustSafetyInteraction[(TrustSafetyInteraction['RAN_PASSWORD_CHECK'] = 5)] = 'RAN_PASSWORD_CHECK';
  TrustSafetyInteraction[(TrustSafetyInteraction['OPENED_AD_PRIVACY'] = 6)] = 'OPENED_AD_PRIVACY';
  TrustSafetyInteraction[(TrustSafetyInteraction['OPENED_TOPICS_SUBPAGE'] = 7)] = 'OPENED_TOPICS_SUBPAGE';
  TrustSafetyInteraction[(TrustSafetyInteraction['OPENED_FLEDGE_SUBPAGE'] = 8)] = 'OPENED_FLEDGE_SUBPAGE';
  TrustSafetyInteraction[(TrustSafetyInteraction['OPENED_AD_MEASUREMENT_SUBPAGE'] = 9)] =
    'OPENED_AD_MEASUREMENT_SUBPAGE';
})(TrustSafetyInteraction || (TrustSafetyInteraction = {}));
class HatsBrowserProxyImpl {
  trustSafetyInteractionOccurred(interaction) {
    chrome.send('trustSafetyInteractionOccurred', [interaction]);
  }
  static getInstance() {
    return instance$7 || (instance$7 = new HatsBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$7 = obj;
  }
}
let instance$7 = null;
// Copyright 2023 The Chromium Authors
const PrivacyGuideAvailabilityMixin = dedupingMixin((superClass) => {
  const superClassBase = WebUiListenerMixin(superClass);
  class PrivacyGuideAvailabilityMixinInternal extends superClassBase {
    static get properties() {
      return { isPrivacyGuideAvailable: { type: Boolean, value: () => loadTimeData.getBoolean('showPrivacyGuide') } };
    }
    connectedCallback() {
      super.connectedCallback();
      this.addWebUiListener('is-managed-changed', (isManaged) => this.onPrivacyGuideAvailabilityChanged_(!isManaged));
      this.addWebUiListener('sync-status-changed', (syncStatus) =>
        this.onPrivacyGuideAvailabilityChanged_(!syncStatus.supervisedUser)
      );
    }
    onPrivacyGuideAvailabilityChanged_(isAvailable) {
      this.isPrivacyGuideAvailable = this.isPrivacyGuideAvailable && isAvailable;
    }
  }
  return PrivacyGuideAvailabilityMixinInternal;
});
function getTemplate$8() {
  return html`<!--_html_template_start_--><style include="cr-shared-style settings-shared">
      :host {
        --privacy-guide-animation-duration: 900ms;
        --privacy-guide-footer-vertical-padding: 16px;
        --privacy-guide-footer-total-height: calc(
          var(--cr-button-height) + 2 * var(--privacy-guide-footer-vertical-padding)
        );
      }
      .footer {
        align-items: center;
        bottom: 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: var(--privacy-guide-footer-vertical-padding) 24px;
        position: absolute;
        width: 100%;
      }
      .managed-fragment {
        bottom: initial;
        grid-column-start: 1;
        grid-row-start: 1;
        left: initial;
        position: unset;
        right: initial;
        top: initial;
      }
      #viewManager {
        position: relative;
      }
      #viewManager > :not(.active) {
        left: 0;
        position: absolute;
        top: 0;
      }
      .visibility-hidden {
        visibility: hidden;
      }
      #privacyGuideCard {
        background-color: var(--cr-card-background-color);
        border-radius: var(--cr-card-border-radius);
        box-shadow: var(--cr-card-shadow);
        box-sizing: border-box;
        display: flex;
        flex-flow: column;
        min-height: 432px;
        padding-bottom: var(--privacy-guide-footer-total-height);
        position: relative;
      }
      @keyframes fade-in {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      #background {
        animation: fade-in var(--privacy-guide-animation-duration);
        height: 100px;
        left: 50%;
        position: absolute;
        top: 24px;
        transform: translateX(-50%);
        width: 360px;
      }
      #background picture {
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }
      #backgroundClouds {
        transform: translateX(calc(var(--privacy-guide-step) * -10px));
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      :host-context([dir='rtl']) #backgroundClouds {
        transform: translateX(calc(var(--privacy-guide-step) * 10px));
      }
      #backgroundHills {
        transform: translateX(calc(var(--privacy-guide-step) * -5px));
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      :host-context([dir='rtl']) #backgroundHills {
        transform: translateX(calc(var(--privacy-guide-step) * 5px));
      }
    </style>
    <div
      id="privacyGuideCard"
      on-keydown="onKeyDown_"
      part="privacyGuideCard"
      style="--privacy-guide-v2-translate-multiplier:[[translateMultiplier_]]"
    >
      <div
        id="background"
        aria-hidden="true"
        hidden$="[[!showAnySettingFragment_(privacyGuideStep_)]]"
        style="--privacy-guide-step:[[stepIndicatorModel_.active]]"
      >
        <picture id="backgroundClouds">
          <source srcset="./images/privacy_guide/clouds_graphic_dark.svg" media="(prefers-color-scheme: dark)" />
          <img alt="" src="./images/privacy_guide/clouds_graphic.svg" />
        </picture>
        <picture id="backgroundHills">
          <source srcset="./images/privacy_guide/hills_graphic_dark.svg" media="(prefers-color-scheme: dark)" />
          <img alt="" src="./images/privacy_guide/hills_graphic.svg" />
        </picture>
        <picture>
          <source srcset="./images/privacy_guide/horizon_graphic_dark.svg" media="(prefers-color-scheme: dark)" />
          <img alt="" src="./images/privacy_guide/horizon_graphic.svg" />
        </picture>
      </div>
      <cr-view-manager id="viewManager">
        <privacy-guide-welcome-fragment
          id="[[privacyGuideStepEnum_.WELCOME]]"
          class="managed-fragment"
          on-start-button-click="onNextButtonClick_"
          slot="view"
        >
        </privacy-guide-welcome-fragment>
        <privacy-guide-msbb-fragment
          id="[[privacyGuideStepEnum_.MSBB]]"
          class="managed-fragment"
          prefs="{{prefs}}"
          slot="view"
        >
        </privacy-guide-msbb-fragment>
        <privacy-guide-history-sync-fragment
          id="[[privacyGuideStepEnum_.HISTORY_SYNC]]"
          class="managed-fragment"
          prefs="{{prefs}}"
          slot="view"
        >
        </privacy-guide-history-sync-fragment>
        <privacy-guide-safe-browsing-fragment
          id="[[privacyGuideStepEnum_.SAFE_BROWSING]]"
          class="managed-fragment"
          prefs="{{prefs}}"
          slot="view"
        >
        </privacy-guide-safe-browsing-fragment>
        <privacy-guide-cookies-fragment
          id="[[privacyGuideStepEnum_.COOKIES]]"
          class="managed-fragment"
          prefs="{{prefs}}"
          slot="view"
        >
        </privacy-guide-cookies-fragment>
        <privacy-guide-completion-fragment
          id="[[privacyGuideStepEnum_.COMPLETION]]"
          class="managed-fragment"
          on-back-button-click="onBackButtonClick_"
          slot="view"
        >
        </privacy-guide-completion-fragment>
      </cr-view-manager>
      <template is="dom-if" if="[[showAnySettingFragment_(privacyGuideStep_)]]">
        <div id="settingFooter" class="footer hr">
          <cr-button
            id="backButton"
            role="button"
            on-click="onBackButtonClick_"
            class$="[[computeBackButtonClass_(privacyGuideStep_)]]"
          >
            杩斿洖
          </cr-button>
          <step-indicator model="[[stepIndicatorModel_]]"></step-indicator>
          <cr-button class="action-button" id="nextButton" role="button" tabindex="0" on-click="onNextButtonClick_">
            涓嬩竴姝�
          </cr-button>
        </div>
      </template>
    </div>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
function eligibilityToRecord(step) {
  switch (step) {
    case PrivacyGuideStep.MSBB:
      return PrivacyGuideStepsEligibleAndReached.MSBB_ELIGIBLE;
    case PrivacyGuideStep.HISTORY_SYNC:
      return PrivacyGuideStepsEligibleAndReached.HISTORY_SYNC_ELIGIBLE;
    case PrivacyGuideStep.SAFE_BROWSING:
      return PrivacyGuideStepsEligibleAndReached.SAFE_BROWSING_ELIGIBLE;
    case PrivacyGuideStep.COOKIES:
      return PrivacyGuideStepsEligibleAndReached.COOKIES_ELIGIBLE;
    case PrivacyGuideStep.COMPLETION:
      return PrivacyGuideStepsEligibleAndReached.COMPLETION_ELIGIBLE;
    default:
      assertNotReached();
  }
}
const PrivacyGuideBase = RouteObserverMixin(
  PrivacyGuideAvailabilityMixin(WebUiListenerMixin(I18nMixin(PrefsMixin(PolymerElement))))
);
class SettingsPrivacyGuidePageElement extends PrivacyGuideBase {
  static get is() {
    return 'settings-privacy-guide-page';
  }
  static get template() {
    return getTemplate$8();
  }
  static get properties() {
    return {
      prefs: { type: Object, notify: true },
      privacyGuideStepEnum_: { type: Object, value: PrivacyGuideStep },
      privacyGuideStep_: { type: String, value: undefined },
      translateMultiplier_: { type: Number, value: 1 },
      stepIndicatorModel_: {
        type: Object,
        computed:
          'computeStepIndicatorModel(privacyGuideStep_, prefs.generated.cookie_primary_setting, prefs.generated.safe_browsing)',
      },
      syncStatus_: Object,
    };
  }
  static get observers() {
    return [
      'onPrefsChanged_(prefs.generated.cookie_primary_setting, prefs.generated.safe_browsing)',
      'exitIfNecessary(isPrivacyGuideAvailable)',
    ];
  }
  constructor() {
    super();
    this.syncBrowserProxy_ = SyncBrowserProxyImpl.getInstance();
    this.animationsEnabled_ = true;
    this.metricsBrowserProxy_ = MetricsBrowserProxyImpl.getInstance();
    this.privacyGuideStepToComponentsMap_ = this.computePrivacyGuideStepToComponentsMap_();
  }
  ready() {
    super.ready();
    this.addWebUiListener('sync-status-changed', (syncStatus) => this.onSyncStatusChanged_(syncStatus));
    this.syncBrowserProxy_.getSyncStatus().then((syncStatus) => this.onSyncStatusChanged_(syncStatus));
  }
  disableAnimationsForTesting() {
    this.animationsEnabled_ = false;
  }
  currentRouteChanged(newRoute) {
    if (newRoute !== routes.PRIVACY_GUIDE || this.exitIfNecessary()) {
      return;
    }
    this.updateStateFromQueryParameters_();
  }
  computePrivacyGuideStepToComponentsMap_() {
    return new Map([
      [
        PrivacyGuideStep.WELCOME,
        {
          nextStep: PrivacyGuideStep.MSBB,
          isAvailable: () => true,
          onForwardNavigation: () => {
            this.metricsBrowserProxy_.recordPrivacyGuideNextNavigationHistogram(
              PrivacyGuideInteractions.WELCOME_NEXT_BUTTON
            );
            this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.NextClickWelcome');
            this.metricsBrowserProxy_.recordPrivacyGuideFlowLengthHistogram(this.computeStepIndicatorModel().total);
            this.recordEligibleSteps_();
          },
        },
      ],
      [
        PrivacyGuideStep.MSBB,
        {
          nextStep: PrivacyGuideStep.HISTORY_SYNC,
          previousStep: PrivacyGuideStep.WELCOME,
          onForwardNavigation: () => {
            this.metricsBrowserProxy_.recordPrivacyGuideNextNavigationHistogram(
              PrivacyGuideInteractions.MSBB_NEXT_BUTTON
            );
            this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.NextClickMSBB');
          },
          onBackwardNavigation: () => {
            this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.BackClickMSBB');
          },
          isAvailable: () => true,
        },
      ],
      [
        PrivacyGuideStep.HISTORY_SYNC,
        {
          nextStep: PrivacyGuideStep.SAFE_BROWSING,
          previousStep: PrivacyGuideStep.MSBB,
          onForwardNavigation: () => {
            this.metricsBrowserProxy_.recordPrivacyGuideNextNavigationHistogram(
              PrivacyGuideInteractions.HISTORY_SYNC_NEXT_BUTTON
            );
            this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.NextClickHistorySync');
          },
          onBackwardNavigation: () => {
            this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.BackClickHistorySync');
          },
          isAvailable: () => !this.syncStatus_ || this.isSyncOn_(),
        },
      ],
      [
        PrivacyGuideStep.SAFE_BROWSING,
        {
          nextStep: PrivacyGuideStep.COOKIES,
          previousStep: PrivacyGuideStep.HISTORY_SYNC,
          onForwardNavigation: () => {
            this.metricsBrowserProxy_.recordPrivacyGuideNextNavigationHistogram(
              PrivacyGuideInteractions.SAFE_BROWSING_NEXT_BUTTON
            );
            this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.NextClickSafeBrowsing');
          },
          onBackwardNavigation: () => {
            this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.BackClickSafeBrowsing');
          },
          isAvailable: () => this.shouldShowSafeBrowsingCard_(),
        },
      ],
      [
        PrivacyGuideStep.COOKIES,
        {
          nextStep: PrivacyGuideStep.COMPLETION,
          onForwardNavigation: () => {
            HatsBrowserProxyImpl.getInstance().trustSafetyInteractionOccurred(
              TrustSafetyInteraction.COMPLETED_PRIVACY_GUIDE
            );
            this.metricsBrowserProxy_.recordPrivacyGuideNextNavigationHistogram(
              PrivacyGuideInteractions.COOKIES_NEXT_BUTTON
            );
            this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.NextClickCookies');
          },
          onBackwardNavigation: () => {
            this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.BackClickCookies');
          },
          previousStep: PrivacyGuideStep.SAFE_BROWSING,
          isAvailable: () => this.shouldShowCookiesCard_(),
        },
      ],
      [
        PrivacyGuideStep.COMPLETION,
        {
          onBackwardNavigation: () => {
            this.metricsBrowserProxy_.recordAction('Settings.PrivacyGuide.BackClickCompletion');
          },
          previousStep: PrivacyGuideStep.COOKIES,
          isAvailable: () => true,
        },
      ],
    ]);
  }
  exitIfNecessary() {
    if (!this.isPrivacyGuideAvailable) {
      Router.getInstance().navigateTo(routes.PRIVACY);
      return true;
    }
    return false;
  }
  onSyncStatusChanged_(syncStatus) {
    this.syncStatus_ = syncStatus;
    this.navigateForwardIfCurrentCardNoLongerAvailable();
  }
  onPrefsChanged_() {
    this.navigateForwardIfCurrentCardNoLongerAvailable();
  }
  navigateForwardIfCurrentCardNoLongerAvailable() {
    if (!this.privacyGuideStep_) {
      return;
    }
    if (!this.privacyGuideStepToComponentsMap_.get(this.privacyGuideStep_).isAvailable()) {
      this.navigateForward_();
    }
  }
  async updateStateFromQueryParameters_() {
    assert(Router.getInstance().getCurrentRoute() === routes.PRIVACY_GUIDE);
    await CrSettingsPrefs.initialized;
    this.setPrefValue('privacy_guide.viewed', true);
    const step = Router.getInstance().getQueryParameters().get('step');
    if (this.privacyGuideStep_ && step === this.privacyGuideStep_) {
      return;
    }
    if (Object.values(PrivacyGuideStep).includes(step)) {
      this.navigateToCard_(step, false, true);
    } else {
      this.navigateToCard_(PrivacyGuideStep.WELCOME, false, true);
    }
  }
  onNextButtonClick_() {
    this.navigateForward_();
  }
  recordEligibleSteps_() {
    for (const key in PrivacyGuideStep) {
      const step = PrivacyGuideStep[key];
      if (step === PrivacyGuideStep.WELCOME) {
        continue;
      }
      const component = this.privacyGuideStepToComponentsMap_.get(step);
      assert(component);
      if (!component.isAvailable()) {
        continue;
      }
      this.metricsBrowserProxy_.recordPrivacyGuideStepsEligibleAndReachedHistogram(eligibilityToRecord(step));
    }
  }
  navigateForward_() {
    const components = this.privacyGuideStepToComponentsMap_.get(this.privacyGuideStep_);
    if (components.onForwardNavigation) {
      components.onForwardNavigation();
    }
    if (components.nextStep) {
      this.navigateToCard_(components.nextStep, false, false);
    }
  }
  onBackButtonClick_() {
    this.navigateBackward_();
  }
  navigateBackward_() {
    const components = this.privacyGuideStepToComponentsMap_.get(this.privacyGuideStep_);
    if (components.onBackwardNavigation) {
      components.onBackwardNavigation();
    }
    if (components.previousStep) {
      this.navigateToCard_(components.previousStep, true, false);
    }
  }
  navigateToCard_(step, isBackwardNavigation, isFirstNavigation) {
    assert(step !== this.privacyGuideStep_);
    this.privacyGuideStep_ = step;
    const animateFromLeftToRight = isBackwardNavigation === (loadTimeData.getString('textdirection') === 'ltr');
    this.translateMultiplier_ = animateFromLeftToRight ? -1 : 1;
    if (!this.privacyGuideStepToComponentsMap_.get(step).isAvailable()) {
      if (isBackwardNavigation) {
        this.navigateBackward_();
      } else {
        this.navigateForward_();
      }
    } else {
      if (this.animationsEnabled_) {
        this.$.viewManager.switchView(this.privacyGuideStep_, 'no-animation', 'fade-out');
      } else {
        this.$.viewManager.switchView(this.privacyGuideStep_, 'no-animation', 'no-animation');
      }
      Router.getInstance().updateRouteParams(new URLSearchParams('step=' + step));
      if (isFirstNavigation) {
        return;
      }
      const elementToFocus = this.shadowRoot.querySelector('#' + this.privacyGuideStep_);
      assert(elementToFocus);
      afterNextRender(this, () => elementToFocus.focus());
    }
  }
  computeBackButtonClass_() {
    if (!this.privacyGuideStep_) {
      return '';
    }
    const components = this.privacyGuideStepToComponentsMap_.get(this.privacyGuideStep_);
    return components.previousStep === undefined ? 'visibility-hidden' : '';
  }
  computeStepIndicatorModel() {
    let stepCount = 0;
    let activeIndex = 0;
    for (const step of Object.values(PrivacyGuideStep)) {
      if (step === PrivacyGuideStep.WELCOME || step === PrivacyGuideStep.COMPLETION) {
        continue;
      }
      if (this.privacyGuideStepToComponentsMap_.get(step).isAvailable()) {
        if (step === this.privacyGuideStep_) {
          activeIndex = stepCount;
        }
        ++stepCount;
      }
    }
    return { active: activeIndex, total: stepCount };
  }
  isSyncOn_() {
    assert(this.syncStatus_);
    return !!this.syncStatus_.signedIn && !this.syncStatus_.hasError;
  }
  shouldShowCookiesCard_() {
    if (!this.prefs) {
      return true;
    }
    const currentCookieSetting = this.getPref('generated.cookie_primary_setting').value;
    return (
      currentCookieSetting === CookiePrimarySetting.BLOCK_THIRD_PARTY ||
      currentCookieSetting === CookiePrimarySetting.BLOCK_THIRD_PARTY_INCOGNITO
    );
  }
  shouldShowSafeBrowsingCard_() {
    if (!this.prefs) {
      return true;
    }
    const currentSafeBrowsingSetting = this.getPref('generated.safe_browsing').value;
    return (
      currentSafeBrowsingSetting === SafeBrowsingSetting.ENHANCED ||
      currentSafeBrowsingSetting === SafeBrowsingSetting.STANDARD
    );
  }
  showAnySettingFragment_() {
    return (
      this.privacyGuideStep_ !== PrivacyGuideStep.WELCOME && this.privacyGuideStep_ !== PrivacyGuideStep.COMPLETION
    );
  }
  onKeyDown_(event) {
    const isLtr = loadTimeData.getString('textdirection') === 'ltr';
    switch (event.key) {
      case 'ArrowLeft':
        isLtr ? this.navigateBackward_() : this.navigateForward_();
        break;
      case 'ArrowRight':
        isLtr ? this.navigateForward_() : this.navigateBackward_();
        break;
    }
  }
}
customElements.define(SettingsPrivacyGuidePageElement.is, SettingsPrivacyGuidePageElement);
function getTemplate$7() {
  return html`<!--_html_template_start_--><style include="cr-shared-style settings-shared">
      #headerLine {
        margin: 8px;
      }
      #backToSettingsButton {
        margin-inline-end: 10px;
        margin-inline-start: -10px;
      }
      #dialog {
        background-color: var(--cr-card-background-color);
        border: 0;
        height: 100vh;
        margin: 0;
        max-height: 100vh;
        max-width: 100vw;
        padding: 0;
        width: 100vw;
      }
      #dialog[open] {
        display: block;
      }
      settings-privacy-guide-page::part(privacyGuideCard) {
        background-color: transparent;
        box-shadow: none;
        margin: auto;
        max-width: 680px;
        min-width: 550px;
      }
    </style>
    <dialog id="dialog" on-cancel="onDialogCancel_" on-close="onDialogClose_" aria-label="闅愮淇濇姢鎸囧崡">
      <div class="cr-row first" id="headerLine" slot="title">
        <cr-icon-button
          class="icon-arrow-back"
          id="backToSettingsButton"
          on-click="onSettingsBackClick_"
          aria-label="鈥滈殣绉佷繚鎶ゆ寚鍗椻€濊繑鍥炴寜閽�"
          aria-roledescription="鐐瑰嚮鍗冲彲閫€鍑衡€滈殣绉佷繚鎶ゆ寚鍗椻€濄€�"
        >
        </cr-icon-button>
        <h1 class="cr-title-text">闅愮淇濇姢鎸囧崡</h1>
      </div>
      <settings-privacy-guide-page on-close="onPrivacyGuidePageClose_" prefs="{{prefs}}" slot="body">
      </settings-privacy-guide-page>
    </dialog>
    <!--_html_template_end_-->`;
}
// Copyright 2022 The Chromium Authors
class SettingsPrivacyGuideDialogElement extends PolymerElement {
  static get is() {
    return 'settings-privacy-guide-dialog';
  }
  static get template() {
    return getTemplate$7();
  }
  static get properties() {
    return { prefs: { type: Object, notify: true } };
  }
  connectedCallback() {
    super.connectedCallback();
    this.$.dialog.showModal();
    const elementToFocus = this.shadowRoot.querySelector('#backToSettingsButton');
    afterNextRender(this, () => elementToFocus.focus());
  }
  onDialogCancel_(e) {
    if (e.target === this.$.dialog) {
      e.preventDefault();
    }
  }
  onDialogClose_(e) {
    if (e.target !== this.$.dialog) {
      return;
    }
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }
  onPrivacyGuidePageClose_(e) {
    e.stopPropagation();
    this.$.dialog.close();
  }
  onSettingsBackClick_(e) {
    e.stopPropagation();
    this.$.dialog.close();
  }
}
customElements.define(SettingsPrivacyGuideDialogElement.is, SettingsPrivacyGuideDialogElement);
// Copyright 2022 The Chromium Authors
class SafetyHubBrowserProxyImpl {
  acknowledgeRevokedUnusedSitePermissionsList() {
    chrome.send('acknowledgeRevokedUnusedSitePermissionsList');
  }
  allowPermissionsAgainForUnusedSite(origin) {
    chrome.send('allowPermissionsAgainForUnusedSite', [origin]);
  }
  getRevokedUnusedSitePermissionsList() {
    return sendWithPromise('getRevokedUnusedSitePermissionsList');
  }
  undoAcknowledgeRevokedUnusedSitePermissionsList(unusedSitePermissionsList) {
    chrome.send('undoAcknowledgeRevokedUnusedSitePermissionsList', [unusedSitePermissionsList]);
  }
  undoAllowPermissionsAgainForUnusedSite(unusedSitePermissions) {
    chrome.send('undoAllowPermissionsAgainForUnusedSite', [unusedSitePermissions]);
  }
  getNotificationPermissionReview() {
    return sendWithPromise('getNotificationPermissionReview');
  }
  blockNotificationPermissionForOrigins(origins) {
    chrome.send('blockNotificationPermissionForOrigins', [origins]);
  }
  allowNotificationPermissionForOrigins(origins) {
    chrome.send('allowNotificationPermissionForOrigins', [origins]);
  }
  ignoreNotificationPermissionForOrigins(origins) {
    chrome.send('ignoreNotificationPermissionReviewForOrigins', [origins]);
  }
  undoIgnoreNotificationPermissionForOrigins(origins) {
    chrome.send('undoIgnoreNotificationPermissionReviewForOrigins', [origins]);
  }
  resetNotificationPermissionForOrigins(origins) {
    chrome.send('resetNotificationPermissionForOrigins', [origins]);
  }
  static getInstance() {
    return instance$6 || (instance$6 = new SafetyHubBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$6 = obj;
  }
}
let instance$6 = null;
function getTemplate$6() {
  return html`<!--_html_template_start_--><style>
      :host {
        clip: rect(0 0 0 0);
        height: 1px;
        overflow: hidden;
        position: fixed;
        width: 1px;
      }
    </style>

    <div id="messages" role="alert" aria-live="polite" aria-relevant="additions"></div>
    <!--_html_template_end_-->`;
}
// Copyright 2021 The Chromium Authors
const TIMEOUT_MS = 150;
const instances = new Map();
function getInstance(container = document.body) {
  if (instances.has(container)) {
    return instances.get(container);
  }
  assert(container.isConnected);
  const instance = new CrA11yAnnouncerElement();
  container.appendChild(instance);
  instances.set(container, instance);
  return instance;
}
class CrA11yAnnouncerElement extends PolymerElement {
  constructor() {
    super(...arguments);
    this.currentTimeout_ = null;
    this.messages_ = [];
  }
  static get is() {
    return 'cr-a11y-announcer';
  }
  static get template() {
    return getTemplate$6();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.currentTimeout_ !== null) {
      clearTimeout(this.currentTimeout_);
      this.currentTimeout_ = null;
    }
    for (const [parent, instance] of instances) {
      if (instance === this) {
        instances.delete(parent);
        break;
      }
    }
  }
  announce(message) {
    if (this.currentTimeout_ !== null) {
      clearTimeout(this.currentTimeout_);
      this.currentTimeout_ = null;
    }
    this.messages_.push(message);
    this.currentTimeout_ = setTimeout(() => {
      const messagesDiv = this.shadowRoot.querySelector('#messages');
      messagesDiv.innerHTML = window.trustedTypes.emptyHTML;
      for (const message of this.messages_) {
        const div = document.createElement('div');
        div.textContent = message;
        messagesDiv.appendChild(div);
      }
      this.dispatchEvent(
        new CustomEvent('cr-a11y-announcer-messages-sent', {
          bubbles: true,
          detail: { messages: this.messages_.slice() },
        })
      );
      this.messages_.length = 0;
      this.currentTimeout_ = null;
    }, TIMEOUT_MS);
  }
}
customElements.define(CrA11yAnnouncerElement.is, CrA11yAnnouncerElement);
// Copyright 2014 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class ActionLink extends HTMLAnchorElement {
  constructor() {
    super(...arguments);
    this.boundOnKeyDown_ = null;
    this.boundOnMouseDown_ = null;
    this.boundOnBlur_ = null;
  }
  connectedCallback() {
    this.tabIndex = this.disabled ? -1 : 0;
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'link');
    }
    this.boundOnKeyDown_ = (e) => {
      if (!this.disabled && e.key === 'Enter' && !this.href) {
        window.setTimeout(() => this.click(), 0);
      }
    };
    this.addEventListener('keydown', this.boundOnKeyDown_);
    function preventDefault(e) {
      e.preventDefault();
    }
    function removePreventDefault() {
      document.removeEventListener('selectstart', preventDefault);
      document.removeEventListener('mouseup', removePreventDefault);
    }
    this.boundOnMouseDown_ = () => {
      document.addEventListener('selectstart', preventDefault);
      document.addEventListener('mouseup', removePreventDefault);
      if (document.activeElement !== this) {
        this.classList.add('no-outline');
      }
    };
    this.addEventListener('mousedown', this.boundOnMouseDown_);
    this.boundOnBlur_ = () => this.classList.remove('no-outline');
    this.addEventListener('blur', this.boundOnBlur_);
  }
  disconnectedCallback() {
    this.removeEventListener('keydown', this.boundOnKeyDown_);
    this.boundOnKeyDown_ = null;
    this.removeEventListener('mousedown', this.boundOnMouseDown_);
    this.boundOnMouseDown_ = null;
    this.removeEventListener('blur', this.boundOnBlur_);
    this.boundOnBlur_ = null;
  }
  set disabled(disabled) {
    if (disabled) {
      HTMLAnchorElement.prototype.setAttribute.call(this, 'disabled', '');
    } else {
      HTMLAnchorElement.prototype.removeAttribute.call(this, 'disabled');
    }
    this.tabIndex = disabled ? -1 : 0;
  }
  get disabled() {
    return this.hasAttribute('disabled');
  }
  setAttribute(attr, val) {
    if (attr.toLowerCase() === 'disabled') {
      this.disabled = true;
    } else {
      super.setAttribute(attr, val);
    }
  }
  removeAttribute(attr) {
    if (attr.toLowerCase() === 'disabled') {
      this.disabled = false;
    } else {
      super.removeAttribute(attr);
    }
  }
}
customElements.define('action-link', ActionLink, { extends: 'a' });
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ const IronScrollTargetBehavior = {
  properties: {
    scrollTarget: {
      type: HTMLElement,
      value: function () {
        return this._defaultScrollTarget;
      },
    },
  },
  observers: ['_scrollTargetChanged(scrollTarget, isAttached)'],
  _shouldHaveListener: true,
  _scrollTargetChanged: function (scrollTarget, isAttached) {
    if (this._oldScrollTarget) {
      this._toggleScrollListener(false, this._oldScrollTarget);
      this._oldScrollTarget = null;
    }
    if (!isAttached) {
      return;
    }
    if (scrollTarget === 'document') {
      this.scrollTarget = this._doc;
    } else if (typeof scrollTarget === 'string') {
      var domHost = this.domHost;
      this.scrollTarget =
        domHost && domHost.$ ? domHost.$[scrollTarget] : dom(this.ownerDocument).querySelector('#' + scrollTarget);
    } else if (this._isValidScrollTarget()) {
      this._oldScrollTarget = scrollTarget;
      this._toggleScrollListener(this._shouldHaveListener, scrollTarget);
    }
  },
  _scrollHandler: function scrollHandler() {},
  get _defaultScrollTarget() {
    return this._doc;
  },
  get _doc() {
    return this.ownerDocument.documentElement;
  },
  get _scrollTop() {
    if (this._isValidScrollTarget()) {
      return this.scrollTarget === this._doc ? window.pageYOffset : this.scrollTarget.scrollTop;
    }
    return 0;
  },
  get _scrollLeft() {
    if (this._isValidScrollTarget()) {
      return this.scrollTarget === this._doc ? window.pageXOffset : this.scrollTarget.scrollLeft;
    }
    return 0;
  },
  set _scrollTop(top) {
    if (this.scrollTarget === this._doc) {
      window.scrollTo(window.pageXOffset, top);
    } else if (this._isValidScrollTarget()) {
      this.scrollTarget.scrollTop = top;
    }
  },
  set _scrollLeft(left) {
    if (this.scrollTarget === this._doc) {
      window.scrollTo(left, window.pageYOffset);
    } else if (this._isValidScrollTarget()) {
      this.scrollTarget.scrollLeft = left;
    }
  },
  scroll: function (leftOrOptions, top) {
    var left;
    if (typeof leftOrOptions === 'object') {
      left = leftOrOptions.left;
      top = leftOrOptions.top;
    } else {
      left = leftOrOptions;
    }
    left = left || 0;
    top = top || 0;
    if (this.scrollTarget === this._doc) {
      window.scrollTo(left, top);
    } else if (this._isValidScrollTarget()) {
      this.scrollTarget.scrollLeft = left;
      this.scrollTarget.scrollTop = top;
    }
  },
  get _scrollTargetWidth() {
    if (this._isValidScrollTarget()) {
      return this.scrollTarget === this._doc ? window.innerWidth : this.scrollTarget.offsetWidth;
    }
    return 0;
  },
  get _scrollTargetHeight() {
    if (this._isValidScrollTarget()) {
      return this.scrollTarget === this._doc ? window.innerHeight : this.scrollTarget.offsetHeight;
    }
    return 0;
  },
  _isValidScrollTarget: function () {
    return this.scrollTarget instanceof HTMLElement;
  },
  _toggleScrollListener: function (yes, scrollTarget) {
    var eventTarget = scrollTarget === this._doc ? window : scrollTarget;
    if (yes) {
      if (!this._boundScrollHandler) {
        this._boundScrollHandler = this._scrollHandler.bind(this);
        eventTarget.addEventListener('scroll', this._boundScrollHandler);
      }
    } else {
      if (this._boundScrollHandler) {
        eventTarget.removeEventListener('scroll', this._boundScrollHandler);
        this._boundScrollHandler = null;
      }
    }
  },
  toggleScrollListener: function (yes) {
    this._shouldHaveListener = yes;
    this._toggleScrollListener(yes, this.scrollTarget);
  },
};
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ var IOS = navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/);
var IOS_TOUCH_SCROLLING = IOS && IOS[1] >= 8;
var DEFAULT_PHYSICAL_COUNT = 3;
var HIDDEN_Y = '-10000px';
var SECRET_TABINDEX = -100;
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
      }

      @media only screen and (-webkit-max-device-pixel-ratio: 1) {
        :host {
          will-change: transform;
        }
      }

      #items {
        position: relative;
      }

      :host(:not([grid])) #items > ::slotted(*) {
        width: 100%;
      }

      #items > ::slotted(*) {
        box-sizing: border-box;
        margin: 0;
        position: absolute;
        top: 0;
        will-change: transform;
      }
    </style>

    <array-selector
      id="selector"
      items="{{items}}"
      selected="{{selectedItems}}"
      selected-item="{{selectedItem}}"
    ></array-selector>

    <div id="items">
      <slot></slot>
    </div>
  `,
  is: 'iron-list',
  properties: {
    items: { type: Array },
    as: { type: String, value: 'item' },
    indexAs: { type: String, value: 'index' },
    selectedAs: { type: String, value: 'selected' },
    grid: { type: Boolean, value: false, reflectToAttribute: true, observer: '_gridChanged' },
    selectionEnabled: { type: Boolean, value: false },
    selectedItem: { type: Object, notify: true },
    selectedItems: { type: Object, notify: true },
    multiSelection: { type: Boolean, value: false },
    scrollOffset: { type: Number, value: 0 },
    preserveFocus: { type: Boolean, value: false },
  },
  observers: [
    '_itemsChanged(items.*)',
    '_selectionEnabledChanged(selectionEnabled)',
    '_multiSelectionChanged(multiSelection)',
    '_setOverflow(scrollTarget, scrollOffset)',
  ],
  behaviors: [Templatizer, IronResizableBehavior, IronScrollTargetBehavior, OptionalMutableDataBehavior],
  _ratio: 0.5,
  _scrollerPaddingTop: 0,
  _scrollPosition: 0,
  _physicalSize: 0,
  _physicalAverage: 0,
  _physicalAverageCount: 0,
  _physicalTop: 0,
  _virtualCount: 0,
  _estScrollHeight: 0,
  _scrollHeight: 0,
  _viewportHeight: 0,
  _viewportWidth: 0,
  _physicalItems: null,
  _physicalSizes: null,
  _firstVisibleIndexVal: null,
  _lastVisibleIndexVal: null,
  _maxPages: 2,
  _focusedItem: null,
  _focusedVirtualIndex: -1,
  _focusedPhysicalIndex: -1,
  _offscreenFocusedItem: null,
  _focusBackfillItem: null,
  _itemsPerRow: 1,
  _itemWidth: 0,
  _rowHeight: 0,
  _templateCost: 0,
  _parentModel: true,
  get _physicalBottom() {
    return this._physicalTop + this._physicalSize;
  },
  get _scrollBottom() {
    return this._scrollPosition + this._viewportHeight;
  },
  get _virtualEnd() {
    return this._virtualStart + this._physicalCount - 1;
  },
  get _hiddenContentSize() {
    var size = this.grid ? this._physicalRows * this._rowHeight : this._physicalSize;
    return size - this._viewportHeight;
  },
  get _itemsParent() {
    return dom(dom(this._userTemplate).parentNode);
  },
  get _maxScrollTop() {
    return this._estScrollHeight - this._viewportHeight + this._scrollOffset;
  },
  get _maxVirtualStart() {
    var virtualCount = this._convertIndexToCompleteRow(this._virtualCount);
    return Math.max(0, virtualCount - this._physicalCount);
  },
  set _virtualStart(val) {
    val = this._clamp(val, 0, this._maxVirtualStart);
    if (this.grid) {
      val = val - (val % this._itemsPerRow);
    }
    this._virtualStartVal = val;
  },
  get _virtualStart() {
    return this._virtualStartVal || 0;
  },
  set _physicalStart(val) {
    val = val % this._physicalCount;
    if (val < 0) {
      val = this._physicalCount + val;
    }
    if (this.grid) {
      val = val - (val % this._itemsPerRow);
    }
    this._physicalStartVal = val;
  },
  get _physicalStart() {
    return this._physicalStartVal || 0;
  },
  get _physicalEnd() {
    return (this._physicalStart + this._physicalCount - 1) % this._physicalCount;
  },
  set _physicalCount(val) {
    this._physicalCountVal = val;
  },
  get _physicalCount() {
    return this._physicalCountVal || 0;
  },
  get _optPhysicalSize() {
    return this._viewportHeight === 0 ? Infinity : this._viewportHeight * this._maxPages;
  },
  get _isVisible() {
    return Boolean(this.offsetWidth || this.offsetHeight);
  },
  get firstVisibleIndex() {
    var idx = this._firstVisibleIndexVal;
    if (idx == null) {
      var physicalOffset = this._physicalTop + this._scrollOffset;
      idx =
        this._iterateItems(function (pidx, vidx) {
          physicalOffset += this._getPhysicalSizeIncrement(pidx);
          if (physicalOffset > this._scrollPosition) {
            return this.grid ? vidx - (vidx % this._itemsPerRow) : vidx;
          }
          if (this.grid && this._virtualCount - 1 === vidx) {
            return vidx - (vidx % this._itemsPerRow);
          }
        }) || 0;
      this._firstVisibleIndexVal = idx;
    }
    return idx;
  },
  get lastVisibleIndex() {
    var idx = this._lastVisibleIndexVal;
    if (idx == null) {
      if (this.grid) {
        idx = Math.min(this._virtualCount, this.firstVisibleIndex + this._estRowsInView * this._itemsPerRow - 1);
      } else {
        var physicalOffset = this._physicalTop + this._scrollOffset;
        this._iterateItems(function (pidx, vidx) {
          if (physicalOffset < this._scrollBottom) {
            idx = vidx;
          }
          physicalOffset += this._getPhysicalSizeIncrement(pidx);
        });
      }
      this._lastVisibleIndexVal = idx;
    }
    return idx;
  },
  get _defaultScrollTarget() {
    return this;
  },
  get _virtualRowCount() {
    return Math.ceil(this._virtualCount / this._itemsPerRow);
  },
  get _estRowsInView() {
    return Math.ceil(this._viewportHeight / this._rowHeight);
  },
  get _physicalRows() {
    return Math.ceil(this._physicalCount / this._itemsPerRow);
  },
  get _scrollOffset() {
    return this._scrollerPaddingTop + this.scrollOffset;
  },
  ready: function () {
    this.addEventListener('focus', this._didFocus.bind(this), true);
  },
  attached: function () {
    this._debounce('_render', this._render, animationFrame);
    this.listen(this, 'iron-resize', '_resizeHandler');
    this.listen(this, 'keydown', '_keydownHandler');
  },
  detached: function () {
    this.unlisten(this, 'iron-resize', '_resizeHandler');
    this.unlisten(this, 'keydown', '_keydownHandler');
  },
  _setOverflow: function (scrollTarget) {
    this.style.webkitOverflowScrolling = scrollTarget === this ? 'touch' : '';
    this.style.overflowY = scrollTarget === this ? 'auto' : '';
    this._lastVisibleIndexVal = null;
    this._firstVisibleIndexVal = null;
    this._debounce('_render', this._render, animationFrame);
  },
  updateViewportBoundaries: function () {
    var styles = window.getComputedStyle(this);
    this._scrollerPaddingTop = this.scrollTarget === this ? 0 : parseInt(styles['padding-top'], 10);
    this._isRTL = Boolean(styles.direction === 'rtl');
    this._viewportWidth = this.$.items.offsetWidth;
    this._viewportHeight = this._scrollTargetHeight;
    this.grid && this._updateGridMetrics();
  },
  _scrollHandler: function () {
    var scrollTop = Math.max(0, Math.min(this._maxScrollTop, this._scrollTop));
    var delta = scrollTop - this._scrollPosition;
    var isScrollingDown = delta >= 0;
    this._scrollPosition = scrollTop;
    this._firstVisibleIndexVal = null;
    this._lastVisibleIndexVal = null;
    if (Math.abs(delta) > this._physicalSize && this._physicalSize > 0) {
      delta = delta - this._scrollOffset;
      var idxAdjustment = Math.round(delta / this._physicalAverage) * this._itemsPerRow;
      this._virtualStart = this._virtualStart + idxAdjustment;
      this._physicalStart = this._physicalStart + idxAdjustment;
      this._physicalTop = Math.min(
        Math.floor(this._virtualStart / this._itemsPerRow) * this._physicalAverage,
        this._scrollPosition
      );
      this._update();
    } else if (this._physicalCount > 0) {
      var reusables = this._getReusables(isScrollingDown);
      if (isScrollingDown) {
        this._physicalTop = reusables.physicalTop;
        this._virtualStart = this._virtualStart + reusables.indexes.length;
        this._physicalStart = this._physicalStart + reusables.indexes.length;
      } else {
        this._virtualStart = this._virtualStart - reusables.indexes.length;
        this._physicalStart = this._physicalStart - reusables.indexes.length;
      }
      this._update(reusables.indexes, isScrollingDown ? null : reusables.indexes);
      this._debounce('_increasePoolIfNeeded', this._increasePoolIfNeeded.bind(this, 0), microTask);
    }
  },
  _getReusables: function (fromTop) {
    var ith, offsetContent, physicalItemHeight;
    var idxs = [];
    var protectedOffsetContent = this._hiddenContentSize * this._ratio;
    var virtualStart = this._virtualStart;
    var virtualEnd = this._virtualEnd;
    var physicalCount = this._physicalCount;
    var top = this._physicalTop + this._scrollOffset;
    var bottom = this._physicalBottom + this._scrollOffset;
    var scrollTop = this._scrollPosition;
    var scrollBottom = this._scrollBottom;
    if (fromTop) {
      ith = this._physicalStart;
      this._physicalEnd;
      offsetContent = scrollTop - top;
    } else {
      ith = this._physicalEnd;
      this._physicalStart;
      offsetContent = bottom - scrollBottom;
    }
    while (true) {
      physicalItemHeight = this._getPhysicalSizeIncrement(ith);
      offsetContent = offsetContent - physicalItemHeight;
      if (idxs.length >= physicalCount || offsetContent <= protectedOffsetContent) {
        break;
      }
      if (fromTop) {
        if (virtualEnd + idxs.length + 1 >= this._virtualCount) {
          break;
        }
        if (top + physicalItemHeight >= scrollTop - this._scrollOffset) {
          break;
        }
        idxs.push(ith);
        top = top + physicalItemHeight;
        ith = (ith + 1) % physicalCount;
      } else {
        if (virtualStart - idxs.length <= 0) {
          break;
        }
        if (top + this._physicalSize - physicalItemHeight <= scrollBottom) {
          break;
        }
        idxs.push(ith);
        top = top - physicalItemHeight;
        ith = ith === 0 ? physicalCount - 1 : ith - 1;
      }
    }
    return { indexes: idxs, physicalTop: top - this._scrollOffset };
  },
  _update: function (itemSet, movingUp) {
    if ((itemSet && itemSet.length === 0) || this._physicalCount === 0) {
      return;
    }
    this._manageFocus();
    this._assignModels(itemSet);
    this._updateMetrics(itemSet);
    if (movingUp) {
      while (movingUp.length) {
        var idx = movingUp.pop();
        this._physicalTop -= this._getPhysicalSizeIncrement(idx);
      }
    }
    this._positionItems();
    this._updateScrollerSize();
  },
  _createPool: function (size) {
    this._ensureTemplatized();
    var i, inst;
    var physicalItems = new Array(size);
    for (i = 0; i < size; i++) {
      inst = this.stamp(null);
      physicalItems[i] = inst.root.querySelector('*');
      this._itemsParent.appendChild(inst.root);
    }
    return physicalItems;
  },
  _isClientFull: function () {
    return (
      this._scrollBottom != 0 &&
      this._physicalBottom - 1 >= this._scrollBottom &&
      this._physicalTop <= this._scrollPosition
    );
  },
  _increasePoolIfNeeded: function (count) {
    var nextPhysicalCount = this._clamp(
      this._physicalCount + count,
      DEFAULT_PHYSICAL_COUNT,
      this._virtualCount - this._virtualStart
    );
    nextPhysicalCount = this._convertIndexToCompleteRow(nextPhysicalCount);
    if (this.grid) {
      var correction = nextPhysicalCount % this._itemsPerRow;
      if (correction && nextPhysicalCount - correction <= this._physicalCount) {
        nextPhysicalCount += this._itemsPerRow;
      }
      nextPhysicalCount -= correction;
    }
    var delta = nextPhysicalCount - this._physicalCount;
    var nextIncrease = Math.round(this._physicalCount * 0.5);
    if (delta < 0) {
      return;
    }
    if (delta > 0) {
      var ts = window.performance.now();
      [].push.apply(this._physicalItems, this._createPool(delta));
      for (var i = 0; i < delta; i++) {
        this._physicalSizes.push(0);
      }
      this._physicalCount = this._physicalCount + delta;
      if (
        this._physicalStart > this._physicalEnd &&
        this._isIndexRendered(this._focusedVirtualIndex) &&
        this._getPhysicalIndex(this._focusedVirtualIndex) < this._physicalEnd
      ) {
        this._physicalStart = this._physicalStart + delta;
      }
      this._update();
      this._templateCost = (window.performance.now() - ts) / delta;
      nextIncrease = Math.round(this._physicalCount * 0.5);
    }
    if (this._virtualEnd >= this._virtualCount - 1 || nextIncrease === 0);
    else if (!this._isClientFull()) {
      this._debounce('_increasePoolIfNeeded', this._increasePoolIfNeeded.bind(this, nextIncrease), microTask);
    } else if (this._physicalSize < this._optPhysicalSize) {
      this._debounce(
        '_increasePoolIfNeeded',
        this._increasePoolIfNeeded.bind(this, this._clamp(Math.round(50 / this._templateCost), 1, nextIncrease)),
        idlePeriod
      );
    }
  },
  _render: function () {
    if (!this.isAttached || !this._isVisible) {
      return;
    }
    if (this._physicalCount !== 0) {
      var reusables = this._getReusables(true);
      this._physicalTop = reusables.physicalTop;
      this._virtualStart = this._virtualStart + reusables.indexes.length;
      this._physicalStart = this._physicalStart + reusables.indexes.length;
      this._update(reusables.indexes);
      this._update();
      this._increasePoolIfNeeded(0);
    } else if (this._virtualCount > 0) {
      this.updateViewportBoundaries();
      this._increasePoolIfNeeded(DEFAULT_PHYSICAL_COUNT);
    }
  },
  _ensureTemplatized: function () {
    if (this.ctor) {
      return;
    }
    this._userTemplate = this.queryEffectiveChildren('template');
    if (!this._userTemplate) {
      console.warn('iron-list requires a template to be provided in light-dom');
    }
    var instanceProps = {};
    instanceProps.__key__ = true;
    instanceProps[this.as] = true;
    instanceProps[this.indexAs] = true;
    instanceProps[this.selectedAs] = true;
    instanceProps.tabIndex = true;
    this._instanceProps = instanceProps;
    this.templatize(this._userTemplate, this.mutableData);
  },
  _gridChanged: function (newGrid, oldGrid) {
    if (typeof oldGrid === 'undefined') return;
    this.notifyResize();
    flush();
    newGrid && this._updateGridMetrics();
  },
  _getFocusedElement: function () {
    function doSearch(node, query) {
      let result = null;
      let type = node.nodeType;
      if (type == Node.ELEMENT_NODE || type == Node.DOCUMENT_FRAGMENT_NODE) result = node.querySelector(query);
      if (result) return result;
      let child = node.firstChild;
      while (child !== null && result === null) {
        result = doSearch(child, query);
        child = child.nextSibling;
      }
      if (result) return result;
      const shadowRoot = node.shadowRoot;
      return shadowRoot ? doSearch(shadowRoot, query) : null;
    }
    const focusWithin = doSearch(this, ':focus-within');
    return focusWithin ? doSearch(focusWithin, ':focus') : null;
  },
  _itemsChanged: function (change) {
    var rendering = /^items(\.splices){0,1}$/.test(change.path);
    var lastFocusedIndex, focusedElement;
    if (rendering && this.preserveFocus) {
      lastFocusedIndex = this._focusedVirtualIndex;
      focusedElement = this._getFocusedElement();
    }
    var preservingFocus = rendering && this.preserveFocus && focusedElement;
    if (change.path === 'items') {
      this._virtualStart = 0;
      this._physicalTop = 0;
      this._virtualCount = this.items ? this.items.length : 0;
      this._physicalIndexForKey = {};
      this._firstVisibleIndexVal = null;
      this._lastVisibleIndexVal = null;
      this._physicalCount = this._physicalCount || 0;
      this._physicalItems = this._physicalItems || [];
      this._physicalSizes = this._physicalSizes || [];
      this._physicalStart = 0;
      if (this._scrollTop > this._scrollOffset && !preservingFocus) {
        this._resetScrollPosition(0);
      }
      this._removeFocusedItem();
      this._debounce('_render', this._render, animationFrame);
    } else if (change.path === 'items.splices') {
      this._adjustVirtualIndex(change.value.indexSplices);
      this._virtualCount = this.items ? this.items.length : 0;
      var itemAddedOrRemoved = change.value.indexSplices.some(function (splice) {
        return splice.addedCount > 0 || splice.removed.length > 0;
      });
      if (itemAddedOrRemoved) {
        var activeElement = this._getActiveElement();
        if (this.contains(activeElement)) {
          activeElement.blur();
        }
      }
      var affectedIndexRendered = change.value.indexSplices.some(function (splice) {
        return splice.index + splice.addedCount >= this._virtualStart && splice.index <= this._virtualEnd;
      }, this);
      if (!this._isClientFull() || affectedIndexRendered) {
        this._debounce('_render', this._render, animationFrame);
      }
    } else if (change.path !== 'items.length') {
      this._forwardItemPath(change.path, change.value);
    }
    if (preservingFocus) {
      flush();
      focusedElement.blur();
      this._focusPhysicalItem(Math.min(this.items.length - 1, lastFocusedIndex));
      if (!this._isIndexVisible(this._focusedVirtualIndex)) {
        this.scrollToIndex(this._focusedVirtualIndex);
      }
    }
  },
  _forwardItemPath: function (path, value) {
    path = path.slice(6);
    var dot = path.indexOf('.');
    if (dot === -1) {
      dot = path.length;
    }
    var isIndexRendered;
    var pidx;
    var inst;
    var offscreenInstance = this.modelForElement(this._offscreenFocusedItem);
    var vidx = parseInt(path.substring(0, dot), 10);
    isIndexRendered = this._isIndexRendered(vidx);
    if (isIndexRendered) {
      pidx = this._getPhysicalIndex(vidx);
      inst = this.modelForElement(this._physicalItems[pidx]);
    } else if (offscreenInstance) {
      inst = offscreenInstance;
    }
    if (!inst || inst[this.indexAs] !== vidx) {
      return;
    }
    path = path.substring(dot + 1);
    path = this.as + (path ? '.' + path : '');
    inst._setPendingPropertyOrPath(path, value, false, true);
    inst._flushProperties && inst._flushProperties();
    if (isIndexRendered) {
      this._updateMetrics([pidx]);
      this._positionItems();
      this._updateScrollerSize();
    }
  },
  _adjustVirtualIndex: function (splices) {
    splices.forEach(function (splice) {
      splice.removed.forEach(this._removeItem, this);
      if (splice.index < this._virtualStart) {
        var delta = Math.max(splice.addedCount - splice.removed.length, splice.index - this._virtualStart);
        this._virtualStart = this._virtualStart + delta;
        if (this._focusedVirtualIndex >= 0) {
          this._focusedVirtualIndex = this._focusedVirtualIndex + delta;
        }
      }
    }, this);
  },
  _removeItem: function (item) {
    this.$.selector.deselect(item);
    if (this._focusedItem && this.modelForElement(this._focusedItem)[this.as] === item) {
      this._removeFocusedItem();
    }
  },
  _iterateItems: function (fn, itemSet) {
    var pidx, vidx, rtn, i;
    if (arguments.length === 2 && itemSet) {
      for (i = 0; i < itemSet.length; i++) {
        pidx = itemSet[i];
        vidx = this._computeVidx(pidx);
        if ((rtn = fn.call(this, pidx, vidx)) != null) {
          return rtn;
        }
      }
    } else {
      pidx = this._physicalStart;
      vidx = this._virtualStart;
      for (; pidx < this._physicalCount; pidx++, vidx++) {
        if ((rtn = fn.call(this, pidx, vidx)) != null) {
          return rtn;
        }
      }
      for (pidx = 0; pidx < this._physicalStart; pidx++, vidx++) {
        if ((rtn = fn.call(this, pidx, vidx)) != null) {
          return rtn;
        }
      }
    }
  },
  _computeVidx: function (pidx) {
    if (pidx >= this._physicalStart) {
      return this._virtualStart + (pidx - this._physicalStart);
    }
    return this._virtualStart + (this._physicalCount - this._physicalStart) + pidx;
  },
  _assignModels: function (itemSet) {
    this._iterateItems(function (pidx, vidx) {
      var el = this._physicalItems[pidx];
      var item = this.items && this.items[vidx];
      if (item != null) {
        var inst = this.modelForElement(el);
        inst.__key__ = null;
        this._forwardProperty(inst, this.as, item);
        this._forwardProperty(inst, this.selectedAs, this.$.selector.isSelected(item));
        this._forwardProperty(inst, this.indexAs, vidx);
        this._forwardProperty(inst, 'tabIndex', this._focusedVirtualIndex === vidx ? 0 : -1);
        this._physicalIndexForKey[inst.__key__] = pidx;
        inst._flushProperties && inst._flushProperties(true);
        el.removeAttribute('hidden');
      } else {
        el.setAttribute('hidden', '');
      }
    }, itemSet);
  },
  _updateMetrics: function (itemSet) {
    flush();
    var newPhysicalSize = 0;
    var oldPhysicalSize = 0;
    var prevAvgCount = this._physicalAverageCount;
    var prevPhysicalAvg = this._physicalAverage;
    this._iterateItems(function (pidx, vidx) {
      oldPhysicalSize += this._physicalSizes[pidx];
      this._physicalSizes[pidx] = this._physicalItems[pidx].offsetHeight;
      newPhysicalSize += this._physicalSizes[pidx];
      this._physicalAverageCount += this._physicalSizes[pidx] ? 1 : 0;
    }, itemSet);
    if (this.grid) {
      this._updateGridMetrics();
      this._physicalSize = Math.ceil(this._physicalCount / this._itemsPerRow) * this._rowHeight;
    } else {
      oldPhysicalSize =
        this._itemsPerRow === 1
          ? oldPhysicalSize
          : Math.ceil(this._physicalCount / this._itemsPerRow) * this._rowHeight;
      this._physicalSize = this._physicalSize + newPhysicalSize - oldPhysicalSize;
      this._itemsPerRow = 1;
    }
    if (this._physicalAverageCount !== prevAvgCount) {
      this._physicalAverage = Math.round(
        (prevPhysicalAvg * prevAvgCount + newPhysicalSize) / this._physicalAverageCount
      );
    }
  },
  _updateGridMetrics: function () {
    this._itemWidth = this._physicalCount > 0 ? this._physicalItems[0].getBoundingClientRect().width : 200;
    this._rowHeight = this._physicalCount > 0 ? this._physicalItems[0].offsetHeight : 200;
    this._itemsPerRow = this._itemWidth ? Math.floor(this._viewportWidth / this._itemWidth) : this._itemsPerRow;
  },
  _positionItems: function () {
    this._adjustScrollPosition();
    var y = this._physicalTop;
    if (this.grid) {
      var totalItemWidth = this._itemsPerRow * this._itemWidth;
      var rowOffset = (this._viewportWidth - totalItemWidth) / 2;
      this._iterateItems(function (pidx, vidx) {
        var modulus = vidx % this._itemsPerRow;
        var x = Math.floor(modulus * this._itemWidth + rowOffset);
        if (this._isRTL) {
          x = x * -1;
        }
        this.translate3d(x + 'px', y + 'px', 0, this._physicalItems[pidx]);
        if (this._shouldRenderNextRow(vidx)) {
          y += this._rowHeight;
        }
      });
    } else {
      const order = [];
      this._iterateItems(function (pidx, vidx) {
        const item = this._physicalItems[pidx];
        this.translate3d(0, y + 'px', 0, item);
        y += this._physicalSizes[pidx];
        const itemId = item.id;
        if (itemId) {
          order.push(itemId);
        }
      });
      if (order.length) {
        this.setAttribute('aria-owns', order.join(' '));
      }
    }
  },
  _getPhysicalSizeIncrement: function (pidx) {
    if (!this.grid) {
      return this._physicalSizes[pidx];
    }
    if (this._computeVidx(pidx) % this._itemsPerRow !== this._itemsPerRow - 1) {
      return 0;
    }
    return this._rowHeight;
  },
  _shouldRenderNextRow: function (vidx) {
    return vidx % this._itemsPerRow === this._itemsPerRow - 1;
  },
  _adjustScrollPosition: function () {
    var deltaHeight =
      this._virtualStart === 0 ? this._physicalTop : Math.min(this._scrollPosition + this._physicalTop, 0);
    if (deltaHeight !== 0) {
      this._physicalTop = this._physicalTop - deltaHeight;
      var scrollTop = this._scrollPosition;
      if (!IOS_TOUCH_SCROLLING && scrollTop > 0) {
        this._resetScrollPosition(scrollTop - deltaHeight);
      }
    }
  },
  _resetScrollPosition: function (pos) {
    if (this.scrollTarget && pos >= 0) {
      this._scrollTop = pos;
      this._scrollPosition = this._scrollTop;
    }
  },
  _updateScrollerSize: function (forceUpdate) {
    if (this.grid) {
      this._estScrollHeight = this._virtualRowCount * this._rowHeight;
    } else {
      this._estScrollHeight =
        this._physicalBottom +
        Math.max(this._virtualCount - this._physicalCount - this._virtualStart, 0) * this._physicalAverage;
    }
    forceUpdate = forceUpdate || this._scrollHeight === 0;
    forceUpdate = forceUpdate || this._scrollPosition >= this._estScrollHeight - this._physicalSize;
    forceUpdate = forceUpdate || (this.grid && this.$.items.style.height < this._estScrollHeight);
    if (forceUpdate || Math.abs(this._estScrollHeight - this._scrollHeight) >= this._viewportHeight) {
      this.$.items.style.height = this._estScrollHeight + 'px';
      this._scrollHeight = this._estScrollHeight;
    }
  },
  scrollToItem: function (item) {
    return this.scrollToIndex(this.items.indexOf(item));
  },
  scrollToIndex: function (idx) {
    if (typeof idx !== 'number' || idx < 0 || idx > this.items.length - 1) {
      return;
    }
    flush();
    if (this._physicalCount === 0) {
      return;
    }
    idx = this._clamp(idx, 0, this._virtualCount - 1);
    if (!this._isIndexRendered(idx) || idx >= this._maxVirtualStart) {
      this._virtualStart = this.grid ? idx - this._itemsPerRow * 2 : idx - 1;
    }
    this._manageFocus();
    this._assignModels();
    this._updateMetrics();
    this._physicalTop = Math.floor(this._virtualStart / this._itemsPerRow) * this._physicalAverage;
    var currentTopItem = this._physicalStart;
    var currentVirtualItem = this._virtualStart;
    var targetOffsetTop = 0;
    var hiddenContentSize = this._hiddenContentSize;
    while (currentVirtualItem < idx && targetOffsetTop <= hiddenContentSize) {
      targetOffsetTop = targetOffsetTop + this._getPhysicalSizeIncrement(currentTopItem);
      currentTopItem = (currentTopItem + 1) % this._physicalCount;
      currentVirtualItem++;
    }
    this._updateScrollerSize(true);
    this._positionItems();
    this._resetScrollPosition(this._physicalTop + this._scrollOffset + targetOffsetTop);
    this._increasePoolIfNeeded(0);
    this._firstVisibleIndexVal = null;
    this._lastVisibleIndexVal = null;
  },
  _resetAverage: function () {
    this._physicalAverage = 0;
    this._physicalAverageCount = 0;
  },
  _resizeHandler: function () {
    this._debounce(
      '_render',
      function () {
        this._firstVisibleIndexVal = null;
        this._lastVisibleIndexVal = null;
        if (this._isVisible) {
          this.updateViewportBoundaries();
          this.toggleScrollListener(true);
          this._resetAverage();
          this._render();
        } else {
          this.toggleScrollListener(false);
        }
      },
      animationFrame
    );
  },
  selectItem: function (item) {
    return this.selectIndex(this.items.indexOf(item));
  },
  selectIndex: function (index) {
    if (index < 0 || index >= this._virtualCount) {
      return;
    }
    if (!this.multiSelection && this.selectedItem) {
      this.clearSelection();
    }
    if (this._isIndexRendered(index)) {
      var model = this.modelForElement(this._physicalItems[this._getPhysicalIndex(index)]);
      if (model) {
        model[this.selectedAs] = true;
      }
      this.updateSizeForIndex(index);
    }
    this.$.selector.selectIndex(index);
  },
  deselectItem: function (item) {
    return this.deselectIndex(this.items.indexOf(item));
  },
  deselectIndex: function (index) {
    if (index < 0 || index >= this._virtualCount) {
      return;
    }
    if (this._isIndexRendered(index)) {
      var model = this.modelForElement(this._physicalItems[this._getPhysicalIndex(index)]);
      model[this.selectedAs] = false;
      this.updateSizeForIndex(index);
    }
    this.$.selector.deselectIndex(index);
  },
  toggleSelectionForItem: function (item) {
    return this.toggleSelectionForIndex(this.items.indexOf(item));
  },
  toggleSelectionForIndex: function (index) {
    var isSelected = this.$.selector.isIndexSelected
      ? this.$.selector.isIndexSelected(index)
      : this.$.selector.isSelected(this.items[index]);
    isSelected ? this.deselectIndex(index) : this.selectIndex(index);
  },
  clearSelection: function () {
    this._iterateItems(function (pidx, vidx) {
      this.modelForElement(this._physicalItems[pidx])[this.selectedAs] = false;
    });
    this.$.selector.clearSelection();
  },
  _selectionEnabledChanged: function (selectionEnabled) {
    var handler = selectionEnabled ? this.listen : this.unlisten;
    handler.call(this, this, 'tap', '_selectionHandler');
  },
  _selectionHandler: function (e) {
    var model = this.modelForElement(e.target);
    if (!model) {
      return;
    }
    var modelTabIndex, activeElTabIndex;
    var target = dom(e).path[0];
    var activeEl = this._getActiveElement();
    var physicalItem = this._physicalItems[this._getPhysicalIndex(model[this.indexAs])];
    if (target.localName === 'input' || target.localName === 'button' || target.localName === 'select') {
      return;
    }
    modelTabIndex = model.tabIndex;
    model.tabIndex = SECRET_TABINDEX;
    activeElTabIndex = activeEl ? activeEl.tabIndex : -1;
    model.tabIndex = modelTabIndex;
    if (
      activeEl &&
      physicalItem !== activeEl &&
      physicalItem.contains(activeEl) &&
      activeElTabIndex !== SECRET_TABINDEX
    ) {
      return;
    }
    this.toggleSelectionForItem(model[this.as]);
  },
  _multiSelectionChanged: function (multiSelection) {
    this.clearSelection();
    this.$.selector.multi = multiSelection;
  },
  updateSizeForItem: function (item) {
    return this.updateSizeForIndex(this.items.indexOf(item));
  },
  updateSizeForIndex: function (index) {
    if (!this._isIndexRendered(index)) {
      return null;
    }
    this._updateMetrics([this._getPhysicalIndex(index)]);
    this._positionItems();
    return null;
  },
  _manageFocus: function () {
    var fidx = this._focusedVirtualIndex;
    if (fidx >= 0 && fidx < this._virtualCount) {
      if (this._isIndexRendered(fidx)) {
        this._restoreFocusedItem();
      } else {
        this._createFocusBackfillItem();
      }
    } else if (this._virtualCount > 0 && this._physicalCount > 0) {
      this._focusedPhysicalIndex = this._physicalStart;
      this._focusedVirtualIndex = this._virtualStart;
      this._focusedItem = this._physicalItems[this._physicalStart];
    }
  },
  _convertIndexToCompleteRow: function (idx) {
    this._itemsPerRow = this._itemsPerRow || 1;
    return this.grid ? Math.ceil(idx / this._itemsPerRow) * this._itemsPerRow : idx;
  },
  _isIndexRendered: function (idx) {
    return idx >= this._virtualStart && idx <= this._virtualEnd;
  },
  _isIndexVisible: function (idx) {
    return idx >= this.firstVisibleIndex && idx <= this.lastVisibleIndex;
  },
  _getPhysicalIndex: function (vidx) {
    return (this._physicalStart + (vidx - this._virtualStart)) % this._physicalCount;
  },
  focusItem: function (idx) {
    this._focusPhysicalItem(idx);
  },
  _focusPhysicalItem: function (idx) {
    if (idx < 0 || idx >= this._virtualCount) {
      return;
    }
    this._restoreFocusedItem();
    if (!this._isIndexRendered(idx)) {
      this.scrollToIndex(idx);
    }
    var physicalItem = this._physicalItems[this._getPhysicalIndex(idx)];
    var model = this.modelForElement(physicalItem);
    var focusable;
    model.tabIndex = SECRET_TABINDEX;
    if (physicalItem.tabIndex === SECRET_TABINDEX) {
      focusable = physicalItem;
    }
    if (!focusable) {
      focusable = dom(physicalItem).querySelector('[tabindex="' + SECRET_TABINDEX + '"]');
    }
    model.tabIndex = 0;
    this._focusedVirtualIndex = idx;
    focusable && focusable.focus();
  },
  _removeFocusedItem: function () {
    if (this._offscreenFocusedItem) {
      this._itemsParent.removeChild(this._offscreenFocusedItem);
    }
    this._offscreenFocusedItem = null;
    this._focusBackfillItem = null;
    this._focusedItem = null;
    this._focusedVirtualIndex = -1;
    this._focusedPhysicalIndex = -1;
  },
  _createFocusBackfillItem: function () {
    var fpidx = this._focusedPhysicalIndex;
    if (this._offscreenFocusedItem || this._focusedVirtualIndex < 0) {
      return;
    }
    if (!this._focusBackfillItem) {
      var inst = this.stamp(null);
      this._focusBackfillItem = inst.root.querySelector('*');
      this._itemsParent.appendChild(inst.root);
    }
    this._offscreenFocusedItem = this._physicalItems[fpidx];
    this.modelForElement(this._offscreenFocusedItem).tabIndex = 0;
    this._physicalItems[fpidx] = this._focusBackfillItem;
    this._focusedPhysicalIndex = fpidx;
    this.translate3d(0, HIDDEN_Y, 0, this._offscreenFocusedItem);
  },
  _restoreFocusedItem: function () {
    if (!this._offscreenFocusedItem || this._focusedVirtualIndex < 0) {
      return;
    }
    this._assignModels();
    var fpidx = (this._focusedPhysicalIndex = this._getPhysicalIndex(this._focusedVirtualIndex));
    var onScreenItem = this._physicalItems[fpidx];
    if (!onScreenItem) {
      return;
    }
    var onScreenInstance = this.modelForElement(onScreenItem);
    var offScreenInstance = this.modelForElement(this._offscreenFocusedItem);
    if (onScreenInstance[this.as] === offScreenInstance[this.as]) {
      this._focusBackfillItem = onScreenItem;
      onScreenInstance.tabIndex = -1;
      this._physicalItems[fpidx] = this._offscreenFocusedItem;
      this.translate3d(0, HIDDEN_Y, 0, this._focusBackfillItem);
    } else {
      this._removeFocusedItem();
      this._focusBackfillItem = null;
    }
    this._offscreenFocusedItem = null;
  },
  _didFocus: function (e) {
    var targetModel = this.modelForElement(e.target);
    var focusedModel = this.modelForElement(this._focusedItem);
    var hasOffscreenFocusedItem = this._offscreenFocusedItem !== null;
    var fidx = this._focusedVirtualIndex;
    if (!targetModel) {
      return;
    }
    if (focusedModel === targetModel) {
      if (!this._isIndexVisible(fidx)) {
        this.scrollToIndex(fidx);
      }
    } else {
      this._restoreFocusedItem();
      if (focusedModel) {
        focusedModel.tabIndex = -1;
      }
      targetModel.tabIndex = 0;
      fidx = targetModel[this.indexAs];
      this._focusedVirtualIndex = fidx;
      this._focusedPhysicalIndex = this._getPhysicalIndex(fidx);
      this._focusedItem = this._physicalItems[this._focusedPhysicalIndex];
      if (hasOffscreenFocusedItem && !this._offscreenFocusedItem) {
        this._update();
      }
    }
  },
  _keydownHandler: function (e) {
    switch (e.keyCode) {
      case 40:
        if (this._focusedVirtualIndex < this._virtualCount - 1) e.preventDefault();
        this._focusPhysicalItem(this._focusedVirtualIndex + (this.grid ? this._itemsPerRow : 1));
        break;
      case 39:
        if (this.grid) this._focusPhysicalItem(this._focusedVirtualIndex + (this._isRTL ? -1 : 1));
        break;
      case 38:
        if (this._focusedVirtualIndex > 0) e.preventDefault();
        this._focusPhysicalItem(this._focusedVirtualIndex - (this.grid ? this._itemsPerRow : 1));
        break;
      case 37:
        if (this.grid) this._focusPhysicalItem(this._focusedVirtualIndex + (this._isRTL ? 1 : -1));
        break;
      case 13:
        this._focusPhysicalItem(this._focusedVirtualIndex);
        if (this.selectionEnabled) this._selectionHandler(e);
        break;
    }
  },
  _clamp: function (v, min, max) {
    return Math.min(max, Math.max(min, v));
  },
  _debounce: function (name, cb, asyncModule) {
    this._debouncers = this._debouncers || {};
    this._debouncers[name] = Debouncer.debounce(this._debouncers[name], asyncModule, cb.bind(this));
    enqueueDebouncer(this._debouncers[name]);
  },
  _forwardProperty: function (inst, name, value) {
    inst._setPendingProperty(name, value);
  },
  _forwardHostPropV2: function (prop, value) {
    (this._physicalItems || []).concat([this._offscreenFocusedItem, this._focusBackfillItem]).forEach(function (item) {
      if (item) {
        this.modelForElement(item).forwardHostProp(prop, value);
      }
    }, this);
  },
  _notifyInstancePropV2: function (inst, prop, value) {
    if (matches(this.as, prop)) {
      var idx = inst[this.indexAs];
      if (prop == this.as) {
        this.items[idx] = value;
      }
      this.notifyPath(translate(this.as, 'items.' + idx, prop), value);
    }
  },
  _getStampedChildren: function () {
    return this._physicalItems;
  },
  _forwardInstancePath: function (inst, path, value) {
    if (path.indexOf(this.as + '.') === 0) {
      this.notifyPath('items.' + inst.__key__ + '.' + path.slice(this.as.length + 1), value);
    }
  },
  _forwardParentPath: function (path, value) {
    (this._physicalItems || []).concat([this._offscreenFocusedItem, this._focusBackfillItem]).forEach(function (item) {
      if (item) {
        this.modelForElement(item).notifyPath(path, value);
      }
    }, this);
  },
  _forwardParentProp: function (prop, value) {
    (this._physicalItems || []).concat([this._offscreenFocusedItem, this._focusBackfillItem]).forEach(function (item) {
      if (item) {
        this.modelForElement(item)[prop] = value;
      }
    }, this);
  },
  _getActiveElement: function () {
    var itemsHost = this._itemsParent.node.domHost;
    return dom(itemsHost ? itemsHost.root : document).activeElement;
  },
});
// Copyright 2022 The Chromium Authors
const CrScrollableMixin = dedupingMixin((superClass) => {
  class CrScrollableMixin extends superClass {
    constructor(...args) {
      super(...args);
      this.resizeObserver_ = new ResizeObserver((entries) => {
        requestAnimationFrame(() => {
          for (const entry of entries) {
            this.onScrollableContainerResize_(entry.target);
          }
        });
      });
    }
    ready() {
      super.ready();
      beforeNextRender(this, () => {
        this.requestUpdateScroll();
        const scrollableElements = this.shadowRoot.querySelectorAll('[scrollable]');
        for (const scrollableElement of scrollableElements) {
          scrollableElement.addEventListener('scroll', this.updateScrollEvent_.bind(this));
        }
      });
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.resizeObserver_.disconnect();
    }
    updateScrollableContents() {
      this.requestUpdateScroll();
      const ironLists = this.shadowRoot.querySelectorAll('[scrollable] iron-list');
      for (const ironList of ironLists) {
        const scrollContainer = ironList.parentElement;
        const scrollHeight = scrollContainer.scrollHeight;
        if (
          scrollHeight <= 1 &&
          ironList.items.length > 0 &&
          window.getComputedStyle(scrollContainer).display !== 'none'
        ) {
          this.resizeObserver_.observe(scrollContainer);
        }
        if (scrollHeight !== 0) {
          ironList.notifyResize();
        }
      }
    }
    requestUpdateScroll() {
      requestAnimationFrame(() => {
        const scrollableElements = this.shadowRoot.querySelectorAll('[scrollable]');
        for (const scrollableElement of scrollableElements) {
          this.updateScroll_(scrollableElement);
        }
      });
    }
    saveScroll(list) {
      list.savedScrollTops = list.savedScrollTops || [];
      list.savedScrollTops.push(list.scrollTarget.scrollTop);
    }
    restoreScroll(list) {
      microTask.run(() => {
        const scrollTop = list.savedScrollTops.shift();
        if (scrollTop !== 0) {
          list.scroll(0, scrollTop);
        }
      });
    }
    updateScrollEvent_(event) {
      const scrollable = event.target;
      this.updateScroll_(scrollable);
    }
    updateScroll_(scrollable) {
      scrollable.classList.toggle('can-scroll', scrollable.clientHeight < scrollable.scrollHeight);
      scrollable.classList.toggle('is-scrolled', scrollable.scrollTop > 0);
      scrollable.classList.toggle(
        'scrolled-to-bottom',
        scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight
      );
    }
    onScrollableContainerResize_(scrollable) {
      const nodeList = scrollable.querySelectorAll('iron-list');
      if (nodeList.length === 0 || scrollable.scrollHeight > 1) {
        this.resizeObserver_.unobserve(scrollable);
      }
      if (scrollable.scrollHeight !== 0) {
        for (const node of nodeList) {
          node.notifyResize();
        }
      }
    }
  }
  return CrScrollableMixin;
});
// Copyright 2014 The Chromium Authors
const ACTIVE_CLASS = 'focus-row-active';
class FocusRow {
  constructor(root, boundary, delegate) {
    this.eventTracker = new EventTracker();
    this.root = root;
    this.boundary_ = boundary || document.documentElement;
    this.delegate = delegate;
  }
  static isFocusable(element) {
    if (!element || element.disabled) {
      return false;
    }
    let current = element;
    while (true) {
      assertInstanceof(current, Element);
      const style = window.getComputedStyle(current);
      if (style.visibility === 'hidden' || style.display === 'none') {
        return false;
      }
      const parent = current.parentNode;
      if (!parent) {
        return false;
      }
      if (parent === current.ownerDocument || parent instanceof DocumentFragment) {
        return true;
      }
      current = parent;
    }
  }
  static getFocusableElement(element) {
    const withFocusable = element;
    if (withFocusable.getFocusableElement) {
      return withFocusable.getFocusableElement();
    }
    return element;
  }
  addItem(type, selectorOrElement) {
    assert(type);
    let element;
    if (typeof selectorOrElement === 'string') {
      element = this.root.querySelector(selectorOrElement);
    } else {
      element = selectorOrElement;
    }
    if (!element) {
      return false;
    }
    element.setAttribute('focus-type', type);
    element.tabIndex = this.isActive() ? 0 : -1;
    this.eventTracker.add(element, 'blur', this.onBlur_.bind(this));
    this.eventTracker.add(element, 'focus', this.onFocus_.bind(this));
    this.eventTracker.add(element, 'keydown', this.onKeydown_.bind(this));
    this.eventTracker.add(element, 'mousedown', this.onMousedown_.bind(this));
    return true;
  }
  destroy() {
    this.eventTracker.removeAll();
  }
  getCustomEquivalent(_sampleElement) {
    const focusable = this.getFirstFocusable();
    assert(focusable);
    return focusable;
  }
  getElements() {
    return Array.from(this.root.querySelectorAll('[focus-type]')).map(FocusRow.getFocusableElement);
  }
  getEquivalentElement(sampleElement) {
    if (this.getFocusableElements().indexOf(sampleElement) >= 0) {
      return sampleElement;
    }
    const sampleFocusType = this.getTypeForElement(sampleElement);
    if (sampleFocusType) {
      const sameType = this.getFirstFocusable(sampleFocusType);
      if (sameType) {
        return sameType;
      }
    }
    return this.getCustomEquivalent(sampleElement);
  }
  getFirstFocusable(type) {
    const element = this.getFocusableElements().find((el) => !type || el.getAttribute('focus-type') === type);
    return element || null;
  }
  getFocusableElements() {
    return this.getElements().filter(FocusRow.isFocusable);
  }
  getTypeForElement(element) {
    return element.getAttribute('focus-type') || '';
  }
  isActive() {
    return this.root.classList.contains(ACTIVE_CLASS);
  }
  makeActive(active) {
    if (active === this.isActive()) {
      return;
    }
    this.getElements().forEach(function (element) {
      element.tabIndex = active ? 0 : -1;
    });
    this.root.classList.toggle(ACTIVE_CLASS, active);
  }
  onBlur_(e) {
    if (!this.boundary_.contains(e.relatedTarget)) {
      return;
    }
    const currentTarget = e.currentTarget;
    if (this.getFocusableElements().indexOf(currentTarget) >= 0) {
      this.makeActive(false);
    }
  }
  onFocus_(e) {
    if (this.delegate) {
      this.delegate.onFocus(this, e);
    }
  }
  onMousedown_(e) {
    if (e.button) {
      return;
    }
    const target = e.currentTarget;
    if (!target.disabled) {
      target.tabIndex = 0;
    }
  }
  onKeydown_(e) {
    const elements = this.getFocusableElements();
    const currentElement = FocusRow.getFocusableElement(e.currentTarget);
    const elementIndex = elements.indexOf(currentElement);
    assert(elementIndex >= 0);
    if (this.delegate && this.delegate.onKeydown(this, e)) {
      return;
    }
    const isShiftTab = !e.altKey && !e.ctrlKey && !e.metaKey && e.shiftKey && e.key === 'Tab';
    if (hasKeyModifiers(e) && !isShiftTab) {
      return;
    }
    let index = -1;
    let shouldStopPropagation = true;
    if (isShiftTab) {
      index = elementIndex - 1;
      if (index < 0) {
        return;
      }
    } else if (e.key === 'ArrowLeft') {
      index = elementIndex + (isRTL() ? 1 : -1);
    } else if (e.key === 'ArrowRight') {
      index = elementIndex + (isRTL() ? -1 : 1);
    } else if (e.key === 'Home') {
      index = 0;
    } else if (e.key === 'End') {
      index = elements.length - 1;
    } else {
      shouldStopPropagation = false;
    }
    const elementToFocus = elements[index];
    if (elementToFocus) {
      this.getEquivalentElement(elementToFocus).focus();
      e.preventDefault();
    }
    if (shouldStopPropagation) {
      e.stopPropagation();
    }
  }
}
function getTemplate$5() {
  return html`<!--_html_template_start_-->
    <style>
      :host dialog {
        background-color: var(--cr-menu-background-color);
        border: none;
        border-radius: var(--cr-menu-border-radius, 4px);
        box-shadow: var(--cr-menu-shadow);
        margin: 0;
        min-width: 128px;
        outline: 0;
        padding: 0;
        position: absolute;
      }
      @media (forced-colors: active) {
        :host dialog {
          border: var(--cr-border-hcm);
        }
      }
      :host dialog::backdrop {
        background-color: transparent;
      }
      :host ::slotted(.dropdown-item) {
        -webkit-tap-highlight-color: transparent;
        background: 0 0;
        border: none;
        border-radius: 0;
        box-sizing: border-box;
        color: var(--cr-primary-text-color);
        font: inherit;
        min-height: 32px;
        padding: 8px 24px;
        text-align: start;
        user-select: none;
        width: 100%;
      }
      :host ::slotted(.dropdown-item:not([hidden])) {
        align-items: center;
        display: flex;
      }
      :host ::slotted(.dropdown-item[disabled]) {
        color: var(--cr-action-menu-disabled-item-color, var(--cr-primary-text-color));
        opacity: var(--cr-action-menu-disabled-item-opacity, 0.65);
      }
      :host ::slotted(.dropdown-item:not([disabled])) {
        cursor: pointer;
      }
      :host ::slotted(.dropdown-item:focus) {
        background-color: var(--cr-menu-background-focus-color);
        outline: 0;
      }
      @media (forced-colors: active) {
        :host ::slotted(.dropdown-item:focus) {
          outline: var(--cr-focus-outline-hcm);
        }
      }
      .item-wrapper {
        background: var(--cr-menu-background-sheen);
        outline: 0;
        padding: 8px 0;
      }
    </style>
    <dialog
      id="dialog"
      part="dialog"
      on-close="onNativeDialogClose_"
      role="application"
      aria-roledescription$="[[roleDescription]]"
    >
      <div id="wrapper" class="item-wrapper" role="menu" tabindex="-1" aria-label$="[[accessibilityLabel]]">
        <slot id="contentNode"></slot>
      </div>
    </dialog>
    <!--_html_template_end_-->`;
}
// Copyright 2016 The Chromium Authors
var AnchorAlignment;
(function (AnchorAlignment) {
  AnchorAlignment[(AnchorAlignment['BEFORE_START'] = -2)] = 'BEFORE_START';
  AnchorAlignment[(AnchorAlignment['AFTER_START'] = -1)] = 'AFTER_START';
  AnchorAlignment[(AnchorAlignment['CENTER'] = 0)] = 'CENTER';
  AnchorAlignment[(AnchorAlignment['BEFORE_END'] = 1)] = 'BEFORE_END';
  AnchorAlignment[(AnchorAlignment['AFTER_END'] = 2)] = 'AFTER_END';
})(AnchorAlignment || (AnchorAlignment = {}));
const DROPDOWN_ITEM_CLASS = 'dropdown-item';
const SELECTABLE_DROPDOWN_ITEM_QUERY = `.${DROPDOWN_ITEM_CLASS}:not([hidden]):not([disabled])`;
const AFTER_END_OFFSET = 10;
function getStartPointWithAnchor(start, end, menuLength, anchorAlignment, min, max) {
  let startPoint = 0;
  switch (anchorAlignment) {
    case AnchorAlignment.BEFORE_START:
      startPoint = -menuLength;
      break;
    case AnchorAlignment.AFTER_START:
      startPoint = start;
      break;
    case AnchorAlignment.CENTER:
      startPoint = (start + end - menuLength) / 2;
      break;
    case AnchorAlignment.BEFORE_END:
      startPoint = end - menuLength;
      break;
    case AnchorAlignment.AFTER_END:
      startPoint = end;
      break;
  }
  if (startPoint + menuLength > max) {
    startPoint = end - menuLength;
  }
  if (startPoint < min) {
    startPoint = start;
  }
  startPoint = Math.max(min, Math.min(startPoint, max - menuLength));
  return startPoint;
}
function getDefaultShowConfig() {
  return {
    top: 0,
    left: 0,
    height: 0,
    width: 0,
    anchorAlignmentX: AnchorAlignment.AFTER_START,
    anchorAlignmentY: AnchorAlignment.AFTER_START,
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  };
}
class CrActionMenuElement extends PolymerElement {
  constructor() {
    super(...arguments);
    this.boundClose_ = null;
    this.contentObserver_ = null;
    this.resizeObserver_ = null;
    this.hasMousemoveListener_ = false;
    this.anchorElement_ = null;
    this.lastConfig_ = null;
  }
  static get is() {
    return 'cr-action-menu';
  }
  static get template() {
    return getTemplate$5();
  }
  static get properties() {
    return {
      accessibilityLabel: String,
      autoReposition: { type: Boolean, value: false },
      open: { type: Boolean, notify: true, value: false },
      roleDescription: String,
    };
  }
  ready() {
    super.ready();
    this.addEventListener('keydown', this.onKeyDown_.bind(this));
    this.addEventListener('mouseover', this.onMouseover_);
    this.addEventListener('click', this.onClick_);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeListeners_();
  }
  fire_(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, { bubbles: true, composed: true, detail: detail }));
  }
  getDialog() {
    return this.$.dialog;
  }
  removeListeners_() {
    window.removeEventListener('resize', this.boundClose_);
    window.removeEventListener('popstate', this.boundClose_);
    if (this.contentObserver_) {
      this.contentObserver_.disconnect();
      this.contentObserver_ = null;
    }
    if (this.resizeObserver_) {
      this.resizeObserver_.disconnect();
      this.resizeObserver_ = null;
    }
  }
  onNativeDialogClose_(e) {
    if (e.target !== this.$.dialog) {
      return;
    }
    this.fire_('close');
  }
  onClick_(e) {
    if (e.target === this) {
      this.close();
      e.stopPropagation();
    }
  }
  onKeyDown_(e) {
    e.stopPropagation();
    if (e.key === 'Tab' || e.key === 'Escape') {
      this.close();
      if (e.key === 'Tab') {
        this.fire_('tabkeyclose', { shiftKey: e.shiftKey });
      }
      e.preventDefault();
      return;
    }
    if (e.key !== 'Enter' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
      return;
    }
    const options = Array.from(this.querySelectorAll(SELECTABLE_DROPDOWN_ITEM_QUERY));
    if (options.length === 0) {
      return;
    }
    const focused = getDeepActiveElement();
    const index = options.findIndex((option) => FocusRow.getFocusableElement(option) === focused);
    if (e.key === 'Enter') {
      if (index !== -1) {
        return;
      }
      if (isWindows || isMac) {
        this.close();
        e.preventDefault();
        return;
      }
    }
    e.preventDefault();
    this.updateFocus_(options, index, e.key !== 'ArrowUp');
    if (!this.hasMousemoveListener_) {
      this.hasMousemoveListener_ = true;
      this.addEventListener(
        'mousemove',
        (e) => {
          this.onMouseover_(e);
          this.hasMousemoveListener_ = false;
        },
        { once: true }
      );
    }
  }
  onMouseover_(e) {
    const item = e.composedPath().find((el) => el.matches && el.matches(SELECTABLE_DROPDOWN_ITEM_QUERY));
    (item || this.$.wrapper).focus();
  }
  updateFocus_(options, focusedIndex, next) {
    const numOptions = options.length;
    assert(numOptions > 0);
    let index;
    if (focusedIndex === -1) {
      index = next ? 0 : numOptions - 1;
    } else {
      const delta = next ? 1 : -1;
      index = (numOptions + focusedIndex + delta) % numOptions;
    }
    options[index].focus();
  }
  close() {
    this.removeListeners_();
    this.$.dialog.close();
    this.open = false;
    if (this.anchorElement_) {
      assert(this.anchorElement_);
      focusWithoutInk(this.anchorElement_);
      this.anchorElement_ = null;
    }
    if (this.lastConfig_) {
      this.lastConfig_ = null;
    }
  }
  showAt(anchorElement, config) {
    this.anchorElement_ = anchorElement;
    this.anchorElement_.scrollIntoViewIfNeeded();
    const rect = this.anchorElement_.getBoundingClientRect();
    let height = rect.height;
    if (config && !config.noOffset && config.anchorAlignmentY === AnchorAlignment.AFTER_END) {
      height -= AFTER_END_OFFSET;
    }
    this.showAtPosition(
      Object.assign(
        {
          top: rect.top,
          left: rect.left,
          height: height,
          width: rect.width,
          anchorAlignmentX: AnchorAlignment.BEFORE_END,
        },
        config
      )
    );
    this.$.wrapper.focus();
  }
  showAtPosition(config) {
    const doc = document.scrollingElement;
    const scrollLeft = doc.scrollLeft;
    const scrollTop = doc.scrollTop;
    this.resetStyle_();
    this.$.dialog.showModal();
    this.open = true;
    config.top += scrollTop;
    config.left += scrollLeft;
    this.positionDialog_(
      Object.assign(
        { minX: scrollLeft, minY: scrollTop, maxX: scrollLeft + doc.clientWidth, maxY: scrollTop + doc.clientHeight },
        config
      )
    );
    doc.scrollTop = scrollTop;
    doc.scrollLeft = scrollLeft;
    this.addListeners_();
    const openedByKey = FocusOutlineManager.forDocument(document).visible;
    if (openedByKey) {
      const firstSelectableItem = this.querySelector(SELECTABLE_DROPDOWN_ITEM_QUERY);
      if (firstSelectableItem) {
        requestAnimationFrame(() => {
          firstSelectableItem.focus();
        });
      }
    }
  }
  resetStyle_() {
    this.$.dialog.style.left = '';
    this.$.dialog.style.right = '';
    this.$.dialog.style.top = '0';
  }
  positionDialog_(config) {
    this.lastConfig_ = config;
    const c = Object.assign(getDefaultShowConfig(), config);
    const top = c.top;
    const left = c.left;
    const bottom = top + c.height;
    const right = left + c.width;
    const rtl = getComputedStyle(this).direction === 'rtl';
    if (rtl) {
      c.anchorAlignmentX *= -1;
    }
    const offsetWidth = this.$.dialog.offsetWidth;
    const menuLeft = getStartPointWithAnchor(left, right, offsetWidth, c.anchorAlignmentX, c.minX, c.maxX);
    if (rtl) {
      const menuRight = document.scrollingElement.clientWidth - menuLeft - offsetWidth;
      this.$.dialog.style.right = menuRight + 'px';
    } else {
      this.$.dialog.style.left = menuLeft + 'px';
    }
    const menuTop = getStartPointWithAnchor(
      top,
      bottom,
      this.$.dialog.offsetHeight,
      c.anchorAlignmentY,
      c.minY,
      c.maxY
    );
    this.$.dialog.style.top = menuTop + 'px';
  }
  addListeners_() {
    this.boundClose_ =
      this.boundClose_ ||
      (() => {
        if (this.$.dialog.open) {
          this.close();
        }
      });
    window.addEventListener('resize', this.boundClose_);
    window.addEventListener('popstate', this.boundClose_);
    this.contentObserver_ = new FlattenedNodesObserver(this.$.contentNode, (info) => {
      info.addedNodes.forEach((node) => {
        if (node.classList && node.classList.contains(DROPDOWN_ITEM_CLASS) && !node.getAttribute('role')) {
          node.setAttribute('role', 'menuitem');
        }
      });
    });
    if (this.autoReposition) {
      this.resizeObserver_ = new ResizeObserver(() => {
        if (this.lastConfig_) {
          this.positionDialog_(this.lastConfig_);
          this.fire_('cr-action-menu-repositioned');
        }
      });
      this.resizeObserver_.observe(this.$.dialog);
    }
  }
}
customElements.define(CrActionMenuElement.is, CrActionMenuElement);
// Copyright 2016 The Chromium Authors
class CrLazyRenderElement extends PolymerElement {
  constructor() {
    super(...arguments);
    this.child_ = null;
    this.instance_ = null;
  }
  static get is() {
    return 'cr-lazy-render';
  }
  static get template() {
    return html`<slot></slot>`;
  }
  get() {
    if (!this.child_) {
      this.render_();
    }
    assert(this.child_);
    return this.child_;
  }
  getIfExists() {
    return this.child_;
  }
  render_() {
    const template = this.shadowRoot
      .querySelector('slot')
      .assignedNodes({ flatten: true })
      .filter((n) => n.nodeType === Node.ELEMENT_NODE)[0];
    const TemplateClass = templatize(template, this, { mutableData: false, forwardHostProp: this._forwardHostPropV2 });
    const parentNode = this.parentNode;
    if (parentNode && !this.child_) {
      this.instance_ = new TemplateClass();
      this.child_ = this.instance_.root.firstElementChild;
      parentNode.insertBefore(this.instance_.root, this);
    }
  }
  _forwardHostPropV2(prop, value) {
    if (this.instance_) {
      this.instance_.forwardHostProp(prop, value);
    }
  }
}
customElements.define(CrLazyRenderElement.is, CrLazyRenderElement);
// Copyright 2022 The Chromium Authors
class FocusRowMixinDelegate {
  constructor(listItem) {
    this.listItem_ = listItem;
  }
  onFocus(_row, e) {
    const element = e.composedPath()[0];
    const focusableElement = FocusRow.getFocusableElement(element);
    if (element !== focusableElement) {
      focusableElement.focus();
    }
    this.listItem_.lastFocused = focusableElement;
  }
  onKeydown(_row, e) {
    if (e.key === 'Enter') {
      e.stopPropagation();
    }
    return false;
  }
  getCustomEquivalent(sampleElement) {
    return this.listItem_.overrideCustomEquivalent ? this.listItem_.getCustomEquivalent(sampleElement) : null;
  }
}
class VirtualFocusRow extends FocusRow {
  constructor(root, delegate) {
    super(root, null, delegate);
  }
  getCustomEquivalent(sampleElement) {
    const equivalent = this.delegate ? this.delegate.getCustomEquivalent(sampleElement) : null;
    return equivalent || super.getCustomEquivalent(sampleElement);
  }
}
const FocusRowMixin = dedupingMixin((superClass) => {
  class FocusRowMixin extends superClass {
    constructor() {
      super(...arguments);
      this.firstControl_ = null;
      this.controlObservers_ = [];
      this.boundOnFirstControlKeydown_ = null;
    }
    static get properties() {
      return {
        row_: Object,
        mouseFocused_: Boolean,
        id: { type: String, reflectToAttribute: true },
        isFocused: { type: Boolean, notify: true },
        focusRowIndex: { type: Number, observer: 'focusRowIndexChanged' },
        lastFocused: { type: Object, notify: true },
        ironListTabIndex: { type: Number, observer: 'ironListTabIndexChanged_' },
        listBlurred: { type: Boolean, notify: true },
      };
    }
    connectedCallback() {
      super.connectedCallback();
      this.classList.add('no-outline');
      this.boundOnFirstControlKeydown_ = this.onFirstControlKeydown_.bind(this);
      afterNextRender(this, () => {
        const rowContainer = this.root.querySelector('[focus-row-container]');
        assert(rowContainer);
        this.row_ = new VirtualFocusRow(rowContainer, new FocusRowMixinDelegate(this));
        this.addItems_();
        this.addEventListener('focus', this.onFocus_);
        this.addEventListener('dom-change', this.addItems_);
        this.addEventListener('mousedown', this.onMouseDown_);
        this.addEventListener('blur', this.onBlur_);
      });
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('focus', this.onFocus_);
      this.removeEventListener('dom-change', this.addItems_);
      this.removeEventListener('mousedown', this.onMouseDown_);
      this.removeEventListener('blur', this.onBlur_);
      this.removeObservers_();
      if (this.firstControl_ && this.boundOnFirstControlKeydown_) {
        this.firstControl_.removeEventListener('keydown', this.boundOnFirstControlKeydown_);
        this.boundOnFirstControlKeydown_ = null;
      }
      if (this.row_) {
        this.row_.destroy();
      }
    }
    computeId_(index) {
      return index !== undefined ? `frb${index}` : undefined;
    }
    focusRowIndexChanged(newIndex, oldIndex) {
      this.setAttribute('aria-rowindex', (newIndex + 1).toString());
      if (this.id === this.computeId_(oldIndex)) {
        this.id = this.computeId_(newIndex) || '';
      }
    }
    getFocusRow() {
      assert(this.row_);
      return this.row_;
    }
    updateFirstControl_() {
      const newFirstControl = this.row_.getFirstFocusable();
      if (newFirstControl === this.firstControl_) {
        return;
      }
      if (this.firstControl_) {
        this.firstControl_.removeEventListener('keydown', this.boundOnFirstControlKeydown_);
      }
      this.firstControl_ = newFirstControl;
      if (this.firstControl_) {
        this.firstControl_.addEventListener('keydown', this.boundOnFirstControlKeydown_);
      }
    }
    removeObservers_() {
      if (this.controlObservers_.length > 0) {
        this.controlObservers_.forEach((observer) => {
          observer.disconnect();
        });
      }
      this.controlObservers_ = [];
    }
    addItems_() {
      this.ironListTabIndexChanged_();
      if (this.row_) {
        this.removeObservers_();
        this.row_.destroy();
        const controls = this.root.querySelectorAll('[focus-row-control]');
        controls.forEach((control) => {
          assert(control);
          this.row_.addItem(control.getAttribute('focus-type'), FocusRow.getFocusableElement(control));
          this.addMutationObservers_(control);
        });
        this.updateFirstControl_();
      }
    }
    createObserver_() {
      return new MutationObserver((mutations) => {
        const mutation = mutations[0];
        if (mutation.attributeName === 'style' && mutation.oldValue) {
          const newStyle = window.getComputedStyle(mutation.target);
          const oldDisplayValue = mutation.oldValue.match(/^display:(.*)(?=;)/);
          const oldVisibilityValue = mutation.oldValue.match(/^visibility:(.*)(?=;)/);
          if (
            oldDisplayValue &&
            newStyle.display === oldDisplayValue[1].trim() &&
            oldVisibilityValue &&
            newStyle.visibility === oldVisibilityValue[1].trim()
          ) {
            return;
          }
        }
        this.updateFirstControl_();
      });
    }
    addMutationObservers_(control) {
      let current = control;
      while (current && current !== this.root) {
        const currentObserver = this.createObserver_();
        currentObserver.observe(current, {
          attributes: true,
          attributeFilter: ['hidden', 'disabled', 'style'],
          attributeOldValue: true,
        });
        this.controlObservers_.push(currentObserver);
        current = current.parentNode;
      }
    }
    onFocus_(e) {
      if (this.mouseFocused_) {
        this.mouseFocused_ = false;
        return;
      }
      const restoreFocusToFirst = this.listBlurred && e.composedPath()[0] === this;
      if (this.lastFocused && !restoreFocusToFirst) {
        focusWithoutInk(this.row_.getEquivalentElement(this.lastFocused));
      } else {
        assert(this.firstControl_);
        const firstFocusable = this.firstControl_;
        focusWithoutInk(firstFocusable);
      }
      this.listBlurred = false;
      this.isFocused = true;
    }
    onFirstControlKeydown_(e) {
      const keyEvent = e;
      if (keyEvent.shiftKey && keyEvent.key === 'Tab') {
        this.focus();
      }
    }
    ironListTabIndexChanged_() {
      if (this.row_) {
        this.row_.makeActive(this.ironListTabIndex === 0);
      }
      if (this.ironListTabIndex === 0) {
        this.listBlurred = false;
      }
    }
    onMouseDown_() {
      this.mouseFocused_ = true;
    }
    onBlur_(e) {
      this.mouseFocused_ = false;
      this.isFocused = false;
      const node = e.relatedTarget ? e.relatedTarget : null;
      if (!this.parentNode.contains(node)) {
        this.listBlurred = true;
      }
    }
  }
  return FocusRowMixin;
});
function getTemplate$4() {
  return html`<!--_html_template_start_-->
    <style>
      :host {
        --cr-toast-background: #323232;
        --cr-toast-button-color: var(--google-blue-300);
        --cr-toast-text-color: #fff;
      }
      @media (prefers-color-scheme: dark) {
        :host {
          --cr-toast-background: var(--google-grey-900)
            linear-gradient(rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06));
          --cr-toast-button-color: var(--google-blue-300);
          --cr-toast-text-color: var(--google-grey-200);
        }
      }
      :host {
        align-items: center;
        background: var(--cr-toast-background);
        border-radius: 4px;
        bottom: 0;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.28);
        box-sizing: border-box;
        display: flex;
        margin: 24px;
        max-width: 568px;
        min-height: 52px;
        min-width: 288px;
        opacity: 0;
        padding: 0 24px;
        position: fixed;
        transform: translateY(100px);
        transition: opacity 0.3s, transform 0.3s;
        visibility: hidden;
        z-index: 1;
      }
      :host-context([dir='ltr']) {
        left: 0;
      }
      :host-context([dir='rtl']) {
        right: 0;
      }
      :host([open]) {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
      }
      :host ::slotted(*) {
        color: var(--cr-toast-text-color);
      }
      :host ::slotted(cr-button) {
        background-color: transparent !important;
        border: none !important;
        color: var(--cr-toast-button-color) !important;
        margin-inline-start: 32px !important;
        min-width: 52px !important;
        padding: 8px !important;
      }
      :host ::slotted(cr-button:hover) {
        background-color: transparent !important;
      }
    </style>
    <slot></slot>
    <!--_html_template_end_-->`;
}
// Copyright 2017 The Chromium Authors
class CrToastElement extends PolymerElement {
  constructor() {
    super(...arguments);
    this.hideTimeoutId_ = null;
  }
  static get is() {
    return 'cr-toast';
  }
  static get template() {
    return getTemplate$4();
  }
  static get properties() {
    return {
      duration: { type: Number, value: 0 },
      open: { readOnly: true, type: Boolean, value: false, reflectToAttribute: true },
    };
  }
  static get observers() {
    return ['resetAutoHide_(duration, open)'];
  }
  resetAutoHide_() {
    if (this.hideTimeoutId_ !== null) {
      window.clearTimeout(this.hideTimeoutId_);
      this.hideTimeoutId_ = null;
    }
    if (this.open && this.duration !== 0) {
      this.hideTimeoutId_ = window.setTimeout(() => {
        this.hide();
      }, this.duration);
    }
  }
  show() {
    const shouldResetAutohide = this.open;
    this.removeAttribute('role');
    this.removeAttribute('aria-hidden');
    this._setOpen(true);
    this.setAttribute('role', 'alert');
    if (shouldResetAutohide) {
      this.resetAutoHide_();
    }
  }
  hide() {
    this.setAttribute('aria-hidden', 'true');
    this._setOpen(false);
  }
}
customElements.define(CrToastElement.is, CrToastElement);
function getTemplate$3() {
  return html`<!--_html_template_start_-->
    <style include="cr-hidden-style"></style>
    <cr-tooltip-icon
      hidden$="[[!indicatorVisible]]"
      tooltip-text="[[indicatorTooltip_]]"
      icon-class="[[indicatorIcon]]"
      icon-aria-label="[[iconAriaLabel]]"
    >
    </cr-tooltip-icon>
    <!--_html_template_end_-->`;
}
// Copyright 2017 The Chromium Authors
const CrPolicyIndicatorElementBase = CrPolicyIndicatorMixin(PolymerElement);
class CrPolicyIndicatorElement extends CrPolicyIndicatorElementBase {
  static get is() {
    return 'cr-policy-indicator';
  }
  static get template() {
    return getTemplate$3();
  }
  static get properties() {
    return {
      iconAriaLabel: String,
      indicatorTooltip_: { type: String, computed: 'getIndicatorTooltip_(indicatorType, indicatorSourceName)' },
    };
  }
  getIndicatorTooltip_(indicatorType, indicatorSourceName) {
    return this.getIndicatorTooltip(indicatorType, indicatorSourceName);
  }
}
customElements.define(CrPolicyIndicatorElement.is, CrPolicyIndicatorElement);
// Copyright 2016 The Chromium Authors
class ProfileInfoBrowserProxyImpl {
  getProfileInfo() {
    return sendWithPromise('getProfileInfo');
  }
  getProfileStatsCount() {
    chrome.send('getProfileStatsCount');
  }
  static getInstance() {
    return instance$5 || (instance$5 = new ProfileInfoBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$5 = obj;
  }
}
let instance$5 = null;
function getTemplate$2() {
  return html`<!--_html_template_start_-->
    <style include="cr-shared-style settings-shared">
      :host {
        --shown-avatar-size: 40px;
        --sync-icon-border-size: 2px;
        --sync-icon-size: 16px;
      }
      .account-icon {
        border-radius: 20px;
        flex-shrink: 0;
        height: var(--shown-avatar-size);
        width: var(--shown-avatar-size);
      }
      .account-icon.small {
        height: 20px;
        width: 20px;
      }
      #menu .dropdown-item {
        padding: 12px;
      }
      #menu .dropdown-item span {
        margin-inline-start: 8px;
      }
      .flex {
        display: flex;
        flex: 1;
        flex-direction: column;
      }
      #avatar-container {
        height: var(--shown-avatar-size);
        position: relative;
      }
      #sync-icon-container {
        align-items: center;
        background: var(--google-green-700);
        border: var(--sync-icon-border-size) solid #fff;
        border-radius: 50%;
        display: flex;
        height: var(--sync-icon-size);
        position: absolute;
        right: -6px;
        top: calc(var(--shown-avatar-size) - var(--sync-icon-size) - var(--sync-icon-border-size));
        width: var(--sync-icon-size);
      }
      :host-context([dir='rtl']) #sync-icon-container {
        left: -6px;
        right: initial;
      }
      @media (prefers-color-scheme: dark) {
        #sync-icon-container {
          background: var(--google-green-300);
          border-color: var(--google-grey-900);
        }
      }
      #sync-icon-container.sync-problem {
        background: var(--settings-error-color);
      }
      #sync-icon-container.sync-paused {
        background: var(--google-blue-500);
      }
      @media (prefers-color-scheme: dark) {
        #sync-icon-container.sync-paused {
          background: var(--google-blue-300);
        }
      }
      #sync-icon-container.sync-disabled {
        background: var(--google-grey-400);
      }
      @media (prefers-color-scheme: dark) {
        #sync-icon-container.sync-disabled {
          background: var(--google-grey-500);
        }
      }
      #sync-icon-container iron-icon {
        fill: #fff;
        height: 12px;
        margin: auto;
        width: 12px;
      }
      #signIn {
        min-width: 100px;
      }
      #banner {
        background: url(chrome://settings/images/sync_banner.svg) no-repeat;
        background-size: 100% auto;
        display: none;
        padding-top: calc(120 / 680 * 100%);
      }
      @media (prefers-color-scheme: dark) {
        #banner {
          background-image: url(chrome://settings/images/sync_banner_dark.svg);
        }
      }
      :host([showing-promo]) #banner {
        display: block;
      }
    </style>

    <div id="banner" hidden="[[syncStatus.signedIn]]" part="banner"></div>
    <div class="cr-row first" id="promo-header" hidden="[[syncStatus.signedIn]]">
      <div class="flex cr-padded-text">
        <div id="promo-title" part="title">
          [[getLabel_(promoLabelWithAccount, promoLabelWithNoAccount, shownAccount_)]]
        </div>
        <div class="secondary">[[subLabel_]]</div>
      </div>
      <cr-button
        class="action-button cr-button-gap"
        on-click="onSigninClick_"
        id="signIn"
        disabled="[[shouldDisableSyncButton_(showSetupButtons_,
                  syncStatus.firstSetupInProgress,
                  prefs.signin.allowed_on_next_startup.value)]]"
        hidden="[[shouldShowAvatarRow_]]"
      >
        寮€鍚悓姝ュ姛鑳解€�
      </cr-button>
    </div>
    <template is="dom-if" if="[[shouldShowAvatarRow_]]">
      <div class="cr-row first two-line" id="avatar-row">
        <div id="avatar-container">
          <img class="account-icon" alt="" src="[[getAccountImageSrc_(shownAccount_.avatarImage)]]" />
          <div
            id="sync-icon-container"
            hidden="[[!syncStatus.signedIn]]"
            class$="[[getSyncIconStyle_(
                  syncStatus.hasError, syncStatus.statusAction,
                  syncStatus.disabled)]]"
          >
            <iron-icon
              icon$="[[getSyncIcon_(
                syncStatus.hasError, syncStatus.statusAction,
                syncStatus.disabled)]]"
            ></iron-icon>
          </div>
        </div>
        <div class="cr-row-gap cr-padded-text flex no-min-width" id="user-info">
          <div class="text-elide">
            [[getAvatarRowTitle_(shownAccount_.fullName, '鍚屾鍔熻兘鏃犳硶姝ｅ父杩愯', '鏃犳硶鍚屾瀵嗙爜',
            '鍚屾宸叉殏鍋�', '鍚屾鍔熻兘宸插仠鐢�', syncStatus.hasError, syncStatus.statusAction,
            syncStatus.disabled)]]
          </div>
          <div class="secondary text-elide">
            [[getAccountLabel_( '鍚屾鍒� $1', shownAccount_.email, syncStatus.hasError, syncStatus.signedIn,
            syncStatus.disabled, syncStatus.firstSetupInProgress)]]
          </div>
        </div>

        <cr-icon-button
          class="icon-arrow-dropdown cr-button-gap"
          hidden="[[!shouldAllowAccountSwitch_(syncStatus.signedIn,
                syncStatus.domain)]]"
          on-click="onMenuButtonClick_"
          id="dropdown-arrow"
          aria-label="浣跨敤鍏朵粬甯愬彿"
        >
        </cr-icon-button>
        <div
          class="separator"
          hidden="[[!shouldAllowAccountSwitch_(syncStatus.signedIn,
                syncStatus.domain)]]"
        ></div>

        <cr-button
          id="sync-button"
          class="action-button cr-button-gap"
          hidden="[[syncStatus.signedIn]]"
          on-click="onSyncButtonClick_"
          disabled="[[shouldDisableSyncButton_(showSetupButtons_,
                    syncStatus.firstSetupInProgress,
                    prefs.signin.allowed_on_next_startup.value)]]"
        >
          寮€鍚悓姝ュ姛鑳解€�
        </cr-button>
        <cr-button
          id="turn-off"
          class="cr-button-gap"
          hidden="[[!shouldShowTurnOffButton_(syncStatus.signedIn,
                syncStatus.domain, showSetupButtons_)]]"
          on-click="onTurnOffButtonClick_"
          disabled="[[syncStatus.firstSetupInProgress]]"
        >
          鍏抽棴
        </cr-button>
        <cr-button
          id="sync-error-button"
          class="action-button cr-button-gap"
          hidden="[[!shouldShowErrorActionButton_(syncStatus,
                showSetupButtons_)]]"
          on-click="onErrorButtonClick_"
          disabled="[[syncStatus.firstSetupInProgress]]"
        >
          [[syncStatus.statusActionText]]
        </cr-button>
        <div id="setup-buttons" hidden="[[!showSetupButtons_]]" class="cr-button-gap">
          <cr-button on-click="onSetupCancel_">鍙栨秷</cr-button>
          <cr-button class="action-button cr-button-gap" on-click="onSetupConfirm_"> 纭 </cr-button>
        </div>
      </div>

      <template
        is="dom-if"
        if="[[shouldAllowAccountSwitch_(syncStatus.signedIn,
              syncStatus.domain)]]"
        restamp
      >
        <cr-action-menu id="menu" auto-reposition role-description="鑿滃崟">
          <template is="dom-repeat" items="[[storedAccounts_]]">
            <button class="dropdown-item" on-click="onAccountClick_">
              <img class="account-icon small" alt="" src="[[getAccountImageSrc_(item.avatarImage)]]" />
              <span>[[item.email]]</span>
            </button>
          </template>
          <button
            class="dropdown-item"
            on-click="onSigninClick_"
            disabled="[[syncStatus.firstSetupInProgress]]"
            id="sign-in-item"
          >
            <img class="account-icon small" alt="" src="chrome://theme/IDR_PROFILE_AVATAR_PLACEHOLDER_LARGE" />
            <span>浣跨敤鍏朵粬甯愬彿</span>
          </button>
          <button
            class="dropdown-item"
            on-click="onSignoutClick_"
            disabled="[[syncStatus.firstSetupInProgress]]"
            id="sign-out-item"
          >
            <iron-icon icon="settings:exit-to-app"></iron-icon>
            <span>閫€鍑�</span>
          </button>
        </cr-action-menu>
      </template>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2018 The Chromium Authors
const MAX_SIGNIN_PROMO_IMPRESSION = 10;
const SettingsSyncAccountControlElementBase = WebUiListenerMixin(PrefsMixin(PolymerElement));
class SettingsSyncAccountControlElement extends SettingsSyncAccountControlElementBase {
  constructor() {
    super(...arguments);
    this.syncBrowserProxy_ = SyncBrowserProxyImpl.getInstance();
  }
  static get is() {
    return 'settings-sync-account-control';
  }
  static get template() {
    return getTemplate$2();
  }
  static get properties() {
    return {
      prefs: { type: Object, notify: true },
      syncStatus: Object,
      promoLabelWithAccount: String,
      promoLabelWithNoAccount: String,
      promoSecondaryLabelWithAccount: String,
      promoSecondaryLabelWithNoAccount: String,
      signedIn_: { type: Boolean, computed: 'computeSignedIn_(syncStatus.signedIn)', observer: 'onSignedInChanged_' },
      storedAccounts_: Object,
      shownAccount_: Object,
      showingPromo: { type: Boolean, value: false, reflectToAttribute: true },
      embeddedInSubpage: { type: Boolean, reflectToAttribute: true },
      hideButtons: { type: Boolean, value: false, reflectToAttribute: true },
      shouldShowAvatarRow_: {
        type: Boolean,
        value: false,
        computed:
          'computeShouldShowAvatarRow_(storedAccounts_, syncStatus,' + 'storedAccounts_.length, syncStatus.signedIn)',
        observer: 'onShouldShowAvatarRowChange_',
      },
      subLabel_: {
        type: String,
        computed:
          'computeSubLabel_(promoSecondaryLabelWithAccount,' + 'promoSecondaryLabelWithNoAccount, shownAccount_)',
      },
      showSetupButtons_: {
        type: Boolean,
        computed: 'computeShowSetupButtons_(' + 'hideButtons, syncStatus.firstSetupInProgress)',
      },
    };
  }
  static get observers() {
    return ['onShownAccountShouldChange_(storedAccounts_, syncStatus)'];
  }
  connectedCallback() {
    super.connectedCallback();
    this.syncBrowserProxy_.getStoredAccounts().then(this.handleStoredAccounts_.bind(this));
    this.addWebUiListener('stored-accounts-updated', this.handleStoredAccounts_.bind(this));
  }
  recordImpressionUserActions_() {
    assert(!this.syncStatus.signedIn);
    chrome.metricsPrivate.recordUserAction('Signin_Impression_FromSettings');
  }
  computeSignedIn_() {
    return !!this.syncStatus && !!this.syncStatus.signedIn;
  }
  onSignedInChanged_() {
    if (this.embeddedInSubpage) {
      this.showingPromo = true;
      return;
    }
    if (
      !this.showingPromo &&
      !this.syncStatus.signedIn &&
      this.syncBrowserProxy_.getPromoImpressionCount() < MAX_SIGNIN_PROMO_IMPRESSION
    ) {
      this.showingPromo = true;
      this.syncBrowserProxy_.incrementPromoImpressionCount();
    } else {
      this.showingPromo = false;
    }
    if (!this.syncStatus.signedIn && this.shownAccount_ !== undefined) {
      this.recordImpressionUserActions_();
    }
  }
  getLabel_(labelWithAccount, labelWithNoAccount) {
    return this.shownAccount_ ? labelWithAccount : labelWithNoAccount;
  }
  computeSubLabel_() {
    return this.getLabel_(this.promoSecondaryLabelWithAccount, this.promoSecondaryLabelWithNoAccount);
  }
  getSubstituteLabel_(label, name) {
    return loadTimeData.substituteString(label, name);
  }
  getAccountLabel_(label, account) {
    if (this.syncStatus.firstSetupInProgress) {
      return this.syncStatus.statusText || account;
    }
    return this.syncStatus.signedIn && !this.syncStatus.hasError && !this.syncStatus.disabled
      ? loadTimeData.substituteString(label, account)
      : account;
  }
  getAccountImageSrc_(image) {
    return image || 'chrome://theme/IDR_PROFILE_AVATAR_PLACEHOLDER_LARGE';
  }
  getSyncIconStyle_() {
    if (this.syncStatus.disabled) {
      return 'sync-disabled';
    }
    if (!this.syncStatus.hasError) {
      return 'sync';
    }
    if (this.syncStatus.hasUnrecoverableError) {
      return 'sync-problem';
    }
    if (this.syncStatus.statusAction === StatusAction.REAUTHENTICATE) {
      return 'sync-paused';
    }
    return 'sync-problem';
  }
  getSyncIcon_() {
    switch (this.getSyncIconStyle_()) {
      case 'sync-problem':
        return 'settings:sync-problem';
      case 'sync-paused':
        return 'settings:sync-disabled';
      default:
        return 'cr:sync';
    }
  }
  getAvatarRowTitle_(accountName, syncErrorLabel, syncPasswordsOnlyErrorLabel, authErrorLabel, disabledLabel) {
    if (this.syncStatus.disabled) {
      return disabledLabel;
    }
    if (!this.syncStatus.hasError) {
      return accountName;
    }
    if (this.syncStatus.hasUnrecoverableError) {
      return syncErrorLabel;
    }
    if (this.syncStatus.statusAction === StatusAction.REAUTHENTICATE) {
      return authErrorLabel;
    }
    if (this.syncStatus.hasPasswordsOnlyError) {
      return syncPasswordsOnlyErrorLabel;
    }
    return syncErrorLabel;
  }
  shouldDisableSyncButton_() {
    if (this.hideButtons || this.prefs === undefined) {
      return this.computeShowSetupButtons_();
    }
    return !!this.syncStatus.firstSetupInProgress || !this.getPref('signin.allowed_on_next_startup').value;
  }
  shouldShowTurnOffButton_() {
    return !this.hideButtons && !this.showSetupButtons_ && !!this.syncStatus.signedIn;
  }
  shouldShowErrorActionButton_() {
    if (this.embeddedInSubpage && this.syncStatus.statusAction === StatusAction.ENTER_PASSPHRASE) {
      return false;
    }
    return (
      !this.hideButtons &&
      !this.showSetupButtons_ &&
      !!this.syncStatus.signedIn &&
      !!this.syncStatus.hasError &&
      this.syncStatus.statusAction !== StatusAction.NO_ACTION
    );
  }
  shouldAllowAccountSwitch_() {
    return (
      !this.syncStatus.signedIn &&
      (!loadTimeData.getBoolean('turnOffSyncAllowedForManagedProfiles') || !this.syncStatus.domain)
    );
  }
  handleStoredAccounts_(accounts) {
    this.storedAccounts_ = accounts;
  }
  computeShouldShowAvatarRow_() {
    if (this.storedAccounts_ === undefined || this.syncStatus === undefined) {
      return false;
    }
    return this.syncStatus.signedIn || this.storedAccounts_.length > 0;
  }
  onErrorButtonClick_() {
    const router = Router.getInstance();
    const routes = router.getRoutes();
    switch (this.syncStatus.statusAction) {
      case StatusAction.REAUTHENTICATE:
        this.syncBrowserProxy_.startSignIn();
        break;
      case StatusAction.UPGRADE_CLIENT:
        router.navigateTo(routes.ABOUT);
        break;
      case StatusAction.RETRIEVE_TRUSTED_VAULT_KEYS:
        this.syncBrowserProxy_.startKeyRetrieval();
        break;
      case StatusAction.ENTER_PASSPHRASE:
      case StatusAction.CONFIRM_SYNC_SETTINGS:
      default:
        router.navigateTo(routes.SYNC);
    }
  }
  onSigninClick_() {
    this.syncBrowserProxy_.startSignIn();
    const actionMenu = this.shadowRoot.querySelector('cr-action-menu');
    if (actionMenu) {
      actionMenu.close();
    }
  }
  onSignoutClick_() {
    this.syncBrowserProxy_.signOut(false);
    this.shadowRoot.querySelector('cr-action-menu').close();
  }
  onSyncButtonClick_() {
    assert(this.shownAccount_);
    assert(this.storedAccounts_.length > 0);
    const isDefaultPromoAccount = this.shownAccount_.email === this.storedAccounts_[0].email;
    this.syncBrowserProxy_.startSyncingWithEmail(this.shownAccount_.email, isDefaultPromoAccount);
  }
  onTurnOffButtonClick_() {
    const router = Router.getInstance();
    router.navigateTo(router.getRoutes().SIGN_OUT);
  }
  onMenuButtonClick_() {
    const actionMenu = this.shadowRoot.querySelector('cr-action-menu');
    assert(actionMenu);
    const anchor = this.shadowRoot.querySelector('#dropdown-arrow');
    assert(anchor);
    actionMenu.showAt(anchor);
  }
  onShouldShowAvatarRowChange_() {
    const actionMenu = this.shadowRoot.querySelector('cr-action-menu');
    if (!this.shouldShowAvatarRow_ && actionMenu && actionMenu.open) {
      actionMenu.close();
    }
  }
  onAccountClick_(e) {
    this.shownAccount_ = e.model.item;
    this.shadowRoot.querySelector('cr-action-menu').close();
  }
  onShownAccountShouldChange_() {
    if (this.storedAccounts_ === undefined || this.syncStatus === undefined) {
      return;
    }
    if (this.syncStatus.signedIn) {
      for (let i = 0; i < this.storedAccounts_.length; i++) {
        if (this.storedAccounts_[i].email === this.syncStatus.signedInUsername) {
          this.shownAccount_ = this.storedAccounts_[i];
          return;
        }
      }
    } else {
      const firstStoredAccount = this.storedAccounts_.length > 0 ? this.storedAccounts_[0] : null;
      const shouldRecordImpression =
        this.shownAccount_ === undefined ||
        (!this.shownAccount_ && firstStoredAccount) ||
        (this.shownAccount_ && !firstStoredAccount);
      this.shownAccount_ = firstStoredAccount;
      if (shouldRecordImpression) {
        this.recordImpressionUserActions_();
      }
    }
  }
  computeShowSetupButtons_() {
    return !this.hideButtons && !!this.syncStatus.firstSetupInProgress;
  }
  onSetupCancel_() {
    this.dispatchEvent(new CustomEvent('sync-setup-done', { bubbles: true, composed: true, detail: false }));
  }
  onSetupConfirm_() {
    this.dispatchEvent(new CustomEvent('sync-setup-done', { bubbles: true, composed: true, detail: true }));
  }
}
customElements.define(SettingsSyncAccountControlElement.is, SettingsSyncAccountControlElement);
// Copyright 2021 The Chromium Authors
const ListPropertyUpdateMixin = dedupingMixin((superClass) => {
  class ListPropertyUpdateMixin extends superClass {
    updateList(propertyPath, identityGetter, updatedList, identityBasedUpdate = false) {
      const list = this.get(propertyPath);
      const splices = calculateSplices(
        updatedList.map((item) => identityGetter(item)),
        list.map(identityGetter)
      );
      splices.forEach((splice) => {
        const index = splice.index;
        const deleteCount = splice.removed.length;
        splice.removed = list.slice(index, index + deleteCount);
        splice.object = list;
        splice.type = 'splice';
        const added = updatedList.slice(index, index + splice.addedCount);
        const spliceParams = [index, deleteCount].concat(added);
        list.splice.apply(list, spliceParams);
      });
      let updated = splices.length > 0;
      if (!identityBasedUpdate) {
        list.forEach((item, index) => {
          const updatedItem = updatedList[index];
          if (JSON.stringify(item) !== JSON.stringify(updatedItem)) {
            this.set([propertyPath, index], updatedItem);
            updated = true;
          }
        });
      }
      if (splices.length > 0) {
        this.notifySplices(propertyPath, splices);
      }
      return updated;
    }
  }
  return ListPropertyUpdateMixin;
});
function getTemplate$1() {
  return html`<!--_html_template_start_-->
    <style include="cr-hidden-style">
      :host {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        font-size: var(--cr-tabs-font-size, 14px);
        font-weight: 500;
        height: var(--cr-tabs-height, 48px);
        user-select: none;
      }
      .tab {
        align-items: center;
        color: var(--cr-secondary-text-color);
        display: flex;
        flex: auto;
        height: 100%;
        justify-content: center;
        opacity: 0.8;
        outline: 0;
        padding: 0 var(--cr-tabs-tab-inline-padding, 0);
        position: relative;
        transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);
      }
      :host-context(.focus-outline-visible) .tab:focus {
        outline: var(--cr-tabs-focus-outline, auto);
      }
      .selected {
        color: var(--cr-tabs-selected-color, var(--google-blue-600));
        opacity: 1;
      }
      @media (prefers-color-scheme: dark) {
        .selected {
          color: var(--cr-tabs-selected-color, var(--google-blue-300));
        }
      }
      .selected:focus {
        font-weight: var(--cr-tabs-selected-tab-focused-font-weight, 700);
      }
      .tab-icon {
        -webkit-mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: var(--cr-tabs-icon-size, var(--cr-icon-size));
        background-color: var(--cr-secondary-text-color);
        display: none;
        height: var(--cr-tabs-icon-size, var(--cr-icon-size));
        margin-inline-end: var(--cr-tabs-icon-margin-end, var(--cr-icon-size));
        width: var(--cr-tabs-icon-size, var(--cr-icon-size));
      }
      .selected .tab-icon {
        background-color: var(--cr-tabs-selected-color, var(--google-blue-600));
      }
      @media (prefers-color-scheme: dark) {
        .selected .tab-icon {
          background-color: var(--cr-tabs-selected-color, var(--google-blue-300));
        }
      }
      .tab-indicator {
        background: var(--cr-tabs-selected-color, var(--google-blue-600));
        border-top-left-radius: var(--cr-tabs-selection-bar-width, 2px);
        border-top-right-radius: var(--cr-tabs-selection-bar-width, 2px);
        bottom: 0;
        height: var(--cr-tabs-selection-bar-width, 2px);
        left: var(--cr-tabs-tab-inline-padding, 0);
        opacity: 0;
        position: absolute;
        right: var(--cr-tabs-tab-inline-padding, 0);
        transform-origin: left center;
        transition: transform;
      }
      .selected .tab-indicator {
        opacity: 1;
      }
      .tab-indicator.expand {
        transition-duration: 150ms;
        transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
      }
      .tab-indicator.contract {
        transition-duration: 180ms;
        transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
      @media (prefers-color-scheme: dark) {
        .tab-indicator {
          background: var(--cr-tabs-selected-color, var(--google-blue-300));
        }
      }
      @media (forced-colors: active) {
        .tab-indicator {
          background: SelectedItem;
        }
      }
    </style>
    <template is="dom-repeat" items="[[tabNames]]">
      <div
        role="tab"
        class$="tab [[getSelectedClass_(index, selected)]]"
        on-click="onTabClick_"
        aria-selected$="[[getAriaSelected_(index, selected)]]"
        tabindex$="[[getTabindex_(index, selected)]]"
      >
        <div class="tab-icon" style$="[[getIconStyle_(index)]]"></div>
        [[item]]
        <div class="tab-indicator"></div>
      </div>
    </template>
    <!--_html_template_end_-->`;
}
// Copyright 2019 The Chromium Authors
class CrTabsElement extends PolymerElement {
  constructor() {
    super(...arguments);
    this.isRtl_ = false;
    this.lastSelected_ = null;
  }
  static get is() {
    return 'cr-tabs';
  }
  static get template() {
    return getTemplate$1();
  }
  static get properties() {
    return {
      tabIcons: { type: Array, value: () => [] },
      tabNames: { type: Array, value: () => [] },
      selected: { type: Number, notify: true, observer: 'onSelectedChanged_' },
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.isRtl_ = this.matches(':host-context([dir=rtl]) cr-tabs');
  }
  ready() {
    super.ready();
    this.setAttribute('role', 'tablist');
    this.addEventListener('keydown', this.onKeyDown_.bind(this));
  }
  getAriaSelected_(index) {
    return index === this.selected ? 'true' : 'false';
  }
  getIconStyle_(index) {
    const icon = this.tabIcons[index];
    return icon ? `-webkit-mask-image: url(${icon}); display: block;` : '';
  }
  getTabindex_(index) {
    return index === this.selected ? '0' : '-1';
  }
  getSelectedClass_(index) {
    return index === this.selected ? 'selected' : '';
  }
  onSelectedChanged_(newSelected, oldSelected) {
    const tabs = this.shadowRoot.querySelectorAll('.tab');
    if (tabs.length === 0 || oldSelected === undefined) {
      return;
    }
    const oldTabRect = tabs[oldSelected].getBoundingClientRect();
    const newTabRect = tabs[newSelected].getBoundingClientRect();
    const newIndicator = tabs[newSelected].querySelector('.tab-indicator');
    newIndicator.classList.remove('expand', 'contract');
    this.updateIndicator_(newIndicator, newTabRect, oldTabRect.left, oldTabRect.width);
    newIndicator.getBoundingClientRect();
    newIndicator.classList.add('expand');
    newIndicator.addEventListener('transitionend', (e) => this.onIndicatorTransitionEnd_(e), { once: true });
    const leftmostEdge = Math.min(oldTabRect.left, newTabRect.left);
    const fullWidth =
      newTabRect.left > oldTabRect.left ? newTabRect.right - oldTabRect.left : oldTabRect.right - newTabRect.left;
    this.updateIndicator_(newIndicator, newTabRect, leftmostEdge, fullWidth);
  }
  onKeyDown_(e) {
    const count = this.tabNames.length;
    let newSelection;
    if (e.key === 'Home') {
      newSelection = 0;
    } else if (e.key === 'End') {
      newSelection = count - 1;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const delta = e.key === 'ArrowLeft' ? (this.isRtl_ ? 1 : -1) : this.isRtl_ ? -1 : 1;
      newSelection = (count + this.selected + delta) % count;
    } else {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.selected = newSelection;
    this.shadowRoot.querySelector('.tab.selected').focus();
  }
  onIndicatorTransitionEnd_(event) {
    const indicator = event.target;
    indicator.classList.replace('expand', 'contract');
    indicator.style.transform = `translateX(0) scaleX(1)`;
  }
  onTabClick_(e) {
    this.selected = e.model.index;
  }
  updateIndicator_(indicator, originRect, newLeft, newWidth) {
    const leftDiff = (100 * (newLeft - originRect.left)) / originRect.width;
    const widthRatio = newWidth / originRect.width;
    const transform = `translateX(${leftDiff}%) scaleX(${widthRatio})`;
    indicator.style.transform = transform;
  }
}
customElements.define(CrTabsElement.is, CrTabsElement);
function getTemplate() {
  return html`<!--_html_template_start_-->
    <style>
      :host {
        -webkit-tap-highlight-color: transparent;
        align-items: center;
        cursor: pointer;
        display: flex;
        outline: 0;
        user-select: none;
        --cr-checkbox-border-size: 2px;
        --cr-checkbox-size: 16px;
        --cr-checkbox-ripple-size: 40px;
        --cr-checkbox-ripple-offset: calc(
          var(--cr-checkbox-size) / 2 - var(--cr-checkbox-ripple-size) / 2 - var(--cr-checkbox-border-size)
        );
        --cr-checkbox-checked-box-color: var(--cr-checked-color);
        --cr-checkbox-ripple-checked-color: var(--cr-checked-color);
        --cr-checkbox-checked-ripple-opacity: 0.2;
        --cr-checkbox-mark-color: white;
        --cr-checkbox-ripple-unchecked-color: var(--google-grey-900);
        --cr-checkbox-unchecked-box-color: var(--google-grey-700);
        --cr-checkbox-unchecked-ripple-opacity: 0.15;
      }
      @media (prefers-color-scheme: dark) {
        :host {
          --cr-checkbox-checked-ripple-opacity: 0.4;
          --cr-checkbox-mark-color: var(--google-grey-900);
          --cr-checkbox-ripple-unchecked-color: var(--google-grey-500);
          --cr-checkbox-unchecked-box-color: var(--google-grey-500);
          --cr-checkbox-unchecked-ripple-opacity: 0.4;
        }
      }
      :host-context([chrome-refresh-2023]):host {
        --cr-checkbox-ripple-size: 32px;
        --cr-checkbox-mark-color: var(--color-checkbox-check, var(--cr-fallback-color-on-primary));
        --cr-checkbox-checked-box-color: var(--color-checkbox-foreground-checked, var(--cr-fallback-color-primary));
        --cr-checkbox-unchecked-box-color: var(--color-checkbox-foreground-unchecked, var(--cr-fallback-color-outline));
        --cr-checkbox-ripple-checked-color: var(--cr-active-background-color);
        --cr-checkbox-ripple-unchecked-color: var(--cr-active-background-color);
        --cr-checkbox-ripple-offset: 50%;
        --cr-checkbox-ripple-opacity: 1;
      }
      :host([disabled]) {
        cursor: initial;
        opacity: var(--cr-disabled-opacity);
        pointer-events: none;
      }
      :host-context([chrome-refresh-2023]):host([disabled]) {
        opacity: 1;
        --cr-checkbox-checked-box-color: var(
          --color-checkbox-background-disabled,
          var(--cr-fallback-color-disabled-background)
        );
        --cr-checkbox-unchecked-box-color: var(
          --color-checkbox-background-disabled,
          var(--cr-fallback-color-disabled-background)
        );
        --cr-checkbox-mark-color: var(
          --color-checkbox-foreground-disabled,
          var(--cr-fallback-color-disabled-foreground)
        );
      }
      #checkbox {
        background: 0 0;
        border: var(--cr-checkbox-border-size) solid var(--cr-checkbox-unchecked-box-color);
        border-radius: 2px;
        box-sizing: border-box;
        cursor: pointer;
        display: block;
        flex-shrink: 0;
        height: var(--cr-checkbox-size);
        isolation: isolate;
        margin: 0;
        outline: 0;
        padding: 0;
        position: relative;
        transform: none;
        width: var(--cr-checkbox-size);
      }
      :host-context([chrome-refresh-2023]):host([disabled][checked]) #checkbox {
        border-color: transparent;
      }
      :host-context([chrome-refresh-2023]) #hover-layer {
        display: none;
      }
      :host-context([chrome-refresh-2023]) #checkbox:hover #hover-layer {
        background-color: var(--cr-hover-background-color);
        border-radius: 50%;
        display: block;
        height: 32px;
        left: 50%;
        overflow: hidden;
        pointer-events: none;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 32px;
      }
      @media (forced-colors: active) {
        :host(:focus) #checkbox {
          outline: var(--cr-focus-outline-hcm);
        }
      }
      :host-context([chrome-refresh-2023]) #checkbox:focus-visible {
        outline: 2px solid var(--cr-focus-outline-color);
        outline-offset: 2px;
      }
      #checkmark {
        display: block;
        forced-color-adjust: auto;
        position: relative;
        transform: scale(0);
        z-index: 1;
      }
      #checkmark path {
        fill: var(--cr-checkbox-mark-color);
      }
      :host([checked]) #checkmark {
        transform: scale(1);
        transition: transform 140ms ease-out;
      }
      :host([checked]) #checkbox {
        background: var(--cr-checkbox-checked-box-background-color, var(--cr-checkbox-checked-box-color));
        border-color: var(--cr-checkbox-checked-box-color);
      }
      paper-ripple {
        --paper-ripple-opacity: var(--cr-checkbox-ripple-opacity, var(--cr-checkbox-unchecked-ripple-opacity));
        color: var(--cr-checkbox-ripple-unchecked-color);
        height: var(--cr-checkbox-ripple-size);
        left: var(--cr-checkbox-ripple-offset);
        outline: var(--cr-checkbox-ripple-ring, none);
        pointer-events: none;
        top: var(--cr-checkbox-ripple-offset);
        transition: color linear 80ms;
        width: var(--cr-checkbox-ripple-size);
      }
      :host([checked]) paper-ripple {
        --paper-ripple-opacity: var(--cr-checkbox-ripple-opacity, var(--cr-checkbox-checked-ripple-opacity));
        color: var(--cr-checkbox-ripple-checked-color);
      }
      :host-context([dir='rtl']) paper-ripple {
        left: auto;
        right: var(--cr-checkbox-ripple-offset);
      }
      :host-context([chrome-refresh-2023]) paper-ripple {
        transform: translate(-50%, -50%);
      }
      #label-container {
        color: var(--cr-checkbox-label-color, var(--cr-primary-text-color));
        padding-inline-start: var(--cr-checkbox-label-padding-start, 20px);
        white-space: normal;
      }
      :host(.label-first) #label-container {
        order: -1;
        padding-inline-end: var(--cr-checkbox-label-padding-end, 20px);
        padding-inline-start: 0;
      }
      :host(.no-label) #label-container {
        display: none;
      }
      #ariaDescription {
        height: 0;
        overflow: hidden;
        width: 0;
      }
    </style>
    <div
      id="checkbox"
      tabindex$="[[tabIndex]]"
      role="checkbox"
      on-keydown="onKeyDown_"
      on-keyup="onKeyUp_"
      aria-disabled="false"
      aria-checked="false"
      aria-labelledby="label-container"
      aria-describedby="ariaDescription"
    >
      <svg id="checkmark" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="m10.192 2.121-6.01 6.01-2.121-2.12L1 7.07l2.121 2.121.707.707.354.354 7.071-7.071-1.06-1.06Z"
        ></path>
      </svg>
      <div id="hover-layer"></div>
    </div>
    <div id="label-container" aria-hidden="true" part="label-container">
      <slot></slot>
    </div>
    <div id="ariaDescription" aria-hidden="true">[[ariaDescription]]</div>
    <!--_html_template_end_-->`;
}
// Copyright 2018 The Chromium Authors
const CrCheckboxElementBase = mixinBehaviors([PaperRippleBehavior], PolymerElement);
class CrCheckboxElement extends CrCheckboxElementBase {
  static get is() {
    return 'cr-checkbox';
  }
  static get template() {
    return getTemplate();
  }
  static get properties() {
    return {
      checked: { type: Boolean, value: false, reflectToAttribute: true, observer: 'checkedChanged_', notify: true },
      disabled: { type: Boolean, value: false, reflectToAttribute: true, observer: 'disabledChanged_' },
      ariaDescription: String,
      tabIndex: { type: Number, value: 0, observer: 'onTabIndexChanged_' },
    };
  }
  ready() {
    super.ready();
    this.removeAttribute('unresolved');
    this.addEventListener('click', this.onClick_.bind(this));
    this.addEventListener('pointerup', this.hideRipple_.bind(this));
    if (document.documentElement.hasAttribute('chrome-refresh-2023')) {
      this.addEventListener('pointerdown', this.showRipple_.bind(this));
      this.addEventListener('pointerleave', this.hideRipple_.bind(this));
    } else {
      this.addEventListener('blur', this.hideRipple_.bind(this));
      this.addEventListener('focus', this.showRipple_.bind(this));
    }
  }
  focus() {
    this.$.checkbox.focus();
  }
  getFocusableElement() {
    return this.$.checkbox;
  }
  checkedChanged_() {
    this.$.checkbox.setAttribute('aria-checked', this.checked ? 'true' : 'false');
  }
  disabledChanged_(_current, previous) {
    if (previous === undefined && !this.disabled) {
      return;
    }
    this.tabIndex = this.disabled ? -1 : 0;
    this.$.checkbox.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }
  showRipple_() {
    if (this.noink) {
      return;
    }
    this.getRipple().showAndHoldDown();
  }
  hideRipple_() {
    this.getRipple().clear();
  }
  onClick_(e) {
    if (this.disabled || e.target.tagName === 'A') {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: this.checked }));
  }
  onKeyDown_(e) {
    if (e.key !== ' ' && e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (e.repeat) {
      return;
    }
    if (e.key === 'Enter') {
      this.click();
    }
  }
  onKeyUp_(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
    }
    if (e.key === ' ') {
      this.click();
    }
  }
  onTabIndexChanged_() {
    this.removeAttribute('tabindex');
  }
  _createRipple() {
    this._rippleContainer = this.$.checkbox;
    const ripple = super._createRipple();
    ripple.id = 'ink';
    ripple.setAttribute('recenters', '');
    ripple.classList.add('circle', 'toggle-ink');
    return ripple;
  }
}
customElements.define(CrCheckboxElement.is, CrCheckboxElement);
// Copyright 2022 The Chromium Authors
const TooltipMixin = dedupingMixin((superClass) => {
  class TooltipMixin extends superClass {
    showTooltipAtTarget(tooltip, target) {
      if (!tooltip.for) {
        tooltip.target = target;
        tooltip.updatePosition();
      }
      const hide = () => {
        tooltip.hide();
        target.removeEventListener('mouseleave', hide);
        target.removeEventListener('blur', hide);
        target.removeEventListener('click', hide);
        tooltip.removeEventListener('mouseenter', hide);
      };
      target.addEventListener('mouseleave', hide);
      target.addEventListener('blur', hide);
      target.addEventListener('click', hide);
      tooltip.addEventListener('mouseenter', hide);
      tooltip.show();
    }
  }
  return TooltipMixin;
});
// Copyright 2016 The Chromium Authors
class ResetBrowserProxyImpl {
  performResetProfileSettings(sendSettings, requestOrigin) {
    return sendWithPromise('performResetProfileSettings', sendSettings, requestOrigin);
  }
  onHideResetProfileDialog() {
    chrome.send('onHideResetProfileDialog');
  }
  onHideResetProfileBanner() {
    chrome.send('onHideResetProfileBanner');
  }
  onShowResetProfileDialog() {
    chrome.send('onShowResetProfileDialog');
  }
  showReportedSettings() {
    sendWithPromise('getReportedSettings').then(function (settings) {
      const output = settings.map(function (entry) {
        return entry.key + ': ' + entry.value.replace(/\n/g, ', ');
      });
      const win = window.open('about:blank');
      const div = win.document.createElement('div');
      div.textContent = output.join('\n');
      div.style.whiteSpace = 'pre';
      win.document.body.appendChild(div);
    });
  }
  getTriggeredResetToolName() {
    return sendWithPromise('getTriggeredResetToolName');
  }
  static getInstance() {
    return instance$4 || (instance$4 = new ResetBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$4 = obj;
  }
}
let instance$4 = null;
// Copyright 2016 The Chromium Authors
var SearchEnginesInteractions;
(function (SearchEnginesInteractions) {
  SearchEnginesInteractions[(SearchEnginesInteractions['ACTIVATE'] = 0)] = 'ACTIVATE';
  SearchEnginesInteractions[(SearchEnginesInteractions['DEACTIVATE'] = 1)] = 'DEACTIVATE';
  SearchEnginesInteractions[(SearchEnginesInteractions['KEYBOARD_SHORTCUT_TAB'] = 2)] = 'KEYBOARD_SHORTCUT_TAB';
  SearchEnginesInteractions[(SearchEnginesInteractions['KEYBOARD_SHORTCUT_SPACE_OR_TAB'] = 3)] =
    'KEYBOARD_SHORTCUT_SPACE_OR_TAB';
  SearchEnginesInteractions[(SearchEnginesInteractions['COUNT'] = 4)] = 'COUNT';
})(SearchEnginesInteractions || (SearchEnginesInteractions = {}));
class SearchEnginesBrowserProxyImpl {
  setDefaultSearchEngine(modelIndex) {
    chrome.send('setDefaultSearchEngine', [modelIndex]);
  }
  setIsActiveSearchEngine(modelIndex, isActive) {
    chrome.send('setIsActiveSearchEngine', [modelIndex, isActive]);
    this.recordSearchEnginesPageHistogram(
      isActive ? SearchEnginesInteractions.ACTIVATE : SearchEnginesInteractions.DEACTIVATE
    );
  }
  removeSearchEngine(modelIndex) {
    chrome.send('removeSearchEngine', [modelIndex]);
  }
  searchEngineEditStarted(modelIndex) {
    chrome.send('searchEngineEditStarted', [modelIndex]);
  }
  searchEngineEditCancelled() {
    chrome.send('searchEngineEditCancelled');
  }
  searchEngineEditCompleted(searchEngine, keyword, queryUrl) {
    chrome.send('searchEngineEditCompleted', [searchEngine, keyword, queryUrl]);
  }
  getSearchEnginesList() {
    return sendWithPromise('getSearchEnginesList');
  }
  validateSearchEngineInput(fieldName, fieldValue) {
    return sendWithPromise('validateSearchEngineInput', fieldName, fieldValue);
  }
  recordSearchEnginesPageHistogram(interaction) {
    chrome.metricsPrivate.recordEnumerationValue(
      'Settings.SearchEngines.Interactions',
      interaction,
      SearchEnginesInteractions.COUNT
    );
  }
  static getInstance() {
    return instance$3 || (instance$3 = new SearchEnginesBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$3 = obj;
  }
}
let instance$3 = null;
// Copyright 2017 The Chromium Authors
class LanguagesBrowserProxyImpl {
  setProspectiveUiLanguage(languageCode) {
    chrome.send('setProspectiveUILanguage', [languageCode]);
  }
  getProspectiveUiLanguage() {
    return sendWithPromise('getProspectiveUILanguage');
  }
  getLanguageSettingsPrivate() {
    return chrome.languageSettingsPrivate;
  }
  static getInstance() {
    return instance$2 || (instance$2 = new LanguagesBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance$2 = obj;
  }
}
let instance$2 = null;
// Copyright 2015 The Chromium Authors
const MoveType = chrome.languageSettingsPrivate.MoveType;
const kChromeToTranslateCode = new Map([
  ['fil', 'tl'],
  ['he', 'iw'],
  ['jv', 'jw'],
  ['kok', 'gom'],
  ['nb', 'no'],
]);
const kTranslateToChromeCode = new Map([
  ['gom', 'kok'],
  ['iw', 'he'],
  ['jw', 'jv'],
  ['no', 'nb'],
  ['tl', 'fil'],
]);
const kArcImeLanguage = '_arc_ime_language_';
const SettingsLanguagesElementBase = PrefsMixin(PolymerElement);
class SettingsLanguagesElement extends SettingsLanguagesElementBase {
  static get is() {
    return 'settings-languages';
  }
  static get properties() {
    return {
      languages: { type: Object, notify: true },
      languageHelper: {
        type: Object,
        notify: true,
        readOnly: true,
        value() {
          return this;
        },
      },
      resolver_: { type: Object, value: () => new PromiseResolver() },
      supportedLanguageMap_: { type: Object, value: () => new Map() },
      enabledLanguageSet_: { type: Object, value: () => new Set() },
      originalProspectiveUILanguage_: String,
    };
  }
  static get observers() {
    return [
      'alwaysTranslateLanguagesPrefChanged_(' + 'prefs.translate_allowlists.value.*, languages)',
      'neverTranslateLanguagesPrefChanged_(' + 'prefs.translate_blocked_languages.value.*, languages)',
      'neverTranslateSitesPrefChanged_(' + 'prefs.translate_site_blocklist_with_time.value.*, languages)',
      'prospectiveUiLanguageChanged_(prefs.intl.app_locale.value, languages)',
      'preferredLanguagesPrefChanged_(' + 'prefs.intl.accept_languages.value, languages)',
      'preferredLanguagesPrefChanged_(' + 'prefs.intl.forced_languages.value.*, languages)',
      'spellCheckDictionariesPrefChanged_(' +
        'prefs.spellcheck.dictionaries.value.*, ' +
        'prefs.spellcheck.forced_dictionaries.value.*, ' +
        'prefs.spellcheck.blocked_dictionaries.value.*, languages)',
      'translateLanguagesPrefChanged_(' + 'prefs.translate_blocked_languages.value.*, languages)',
      'translateTargetPrefChanged_(' + 'prefs.translate_recent_target.value, languages)',
      'updateRemovableLanguages_(' + 'prefs.intl.app_locale.value, languages.enabled)',
      'updateRemovableLanguages_(' + 'prefs.translate_blocked_languages.value.*)',
    ];
  }
  constructor() {
    super();
    this.boundOnSpellcheckDictionariesChanged_ = null;
    this.browserProxy_ = LanguagesBrowserProxyImpl.getInstance();
    this.languageSettingsPrivate_ = this.browserProxy_.getLanguageSettingsPrivate();
  }
  connectedCallback() {
    super.connectedCallback();
    const promises = [];
    const args = {
      supportedLanguages: [],
      translateTarget: '',
      alwaysTranslateCodes: [],
      neverTranslateCodes: [],
      neverTranslateSites: [],
      startingUILanguage: '',
      supportedInputMethods: [],
      currentInputMethodId: '',
    };
    promises.push(CrSettingsPrefs.initialized);
    promises.push(
      this.languageSettingsPrivate_.getLanguageList().then((result) => {
        args.supportedLanguages = result;
      })
    );
    promises.push(
      this.languageSettingsPrivate_.getTranslateTargetLanguage().then((result) => {
        args.translateTarget = result;
      })
    );
    promises.push(
      this.languageSettingsPrivate_.getAlwaysTranslateLanguages().then((result) => {
        args.alwaysTranslateCodes = result;
      })
    );
    promises.push(
      this.languageSettingsPrivate_.getNeverTranslateLanguages().then((result) => {
        args.neverTranslateCodes = result;
      })
    );
    promises.push(
      this.browserProxy_.getProspectiveUiLanguage().then((prospectiveUILanguage) => {
        this.originalProspectiveUILanguage_ = prospectiveUILanguage || window.navigator.language;
      })
    );
    Promise.all(promises).then(() => {
      if (!this.isConnected) {
        return;
      }
      this.createModel_(args);
      this.boundOnSpellcheckDictionariesChanged_ = this.onSpellcheckDictionariesChanged_.bind(this);
      this.languageSettingsPrivate_.onSpellcheckDictionariesChanged.addListener(
        this.boundOnSpellcheckDictionariesChanged_
      );
      this.languageSettingsPrivate_.getSpellcheckDictionaryStatuses().then(this.boundOnSpellcheckDictionariesChanged_);
      this.resolver_.resolve();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.boundOnSpellcheckDictionariesChanged_) {
      this.languageSettingsPrivate_.onSpellcheckDictionariesChanged.removeListener(
        this.boundOnSpellcheckDictionariesChanged_
      );
      this.boundOnSpellcheckDictionariesChanged_ = null;
    }
  }
  prospectiveUiLanguageChanged_(prospectiveUILanguage) {
    this.set('languages.prospectiveUILanguage', prospectiveUILanguage || this.originalProspectiveUILanguage_);
  }
  preferredLanguagesPrefChanged_() {
    if (this.prefs === undefined || this.languages === undefined) {
      return;
    }
    const enabledLanguageStates = this.getEnabledLanguageStates_(
      this.languages.translateTarget,
      this.languages.prospectiveUILanguage
    );
    this.enabledLanguageSet_.clear();
    for (let i = 0; i < enabledLanguageStates.length; i++) {
      this.enabledLanguageSet_.add(enabledLanguageStates[i].language.code);
    }
    this.set('languages.enabled', enabledLanguageStates);
    if (this.boundOnSpellcheckDictionariesChanged_) {
      this.languageSettingsPrivate_.getSpellcheckDictionaryStatuses().then(this.boundOnSpellcheckDictionariesChanged_);
    }
    this.languageSettingsPrivate_.getTranslateTargetLanguage().then((result) => {
      this.set('languages.translateTarget', result);
    });
  }
  spellCheckDictionariesPrefChanged_() {
    if (this.prefs === undefined || this.languages === undefined) {
      return;
    }
    const spellCheckSet = this.makeSetFromArray_(this.getPref('spellcheck.dictionaries').value);
    const spellCheckForcedSet = this.makeSetFromArray_(this.getPref('spellcheck.forced_dictionaries').value);
    const spellCheckBlockedSet = this.makeSetFromArray_(this.getPref('spellcheck.blocked_dictionaries').value);
    for (let i = 0; i < this.languages.enabled.length; i++) {
      const languageState = this.languages.enabled[i];
      const isUser = spellCheckSet.has(languageState.language.code);
      const isForced = spellCheckForcedSet.has(languageState.language.code);
      const isBlocked = spellCheckBlockedSet.has(languageState.language.code);
      this.set(`languages.enabled.${i}.spellCheckEnabled`, (isUser && !isBlocked) || isForced);
      this.set(`languages.enabled.${i}.isManaged`, isForced || isBlocked);
    }
    const { on: spellCheckOnLanguages, off: spellCheckOffLanguages } = this.getSpellCheckLanguages_(
      this.languages.supported
    );
    this.set('languages.spellCheckOnLanguages', spellCheckOnLanguages);
    this.set('languages.spellCheckOffLanguages', spellCheckOffLanguages);
  }
  getSpellCheckLanguages_(supportedLanguages) {
    const seenCodes = new Set();
    const getPrefAndDedupe = (prefName) => {
      const result = this.getPref(prefName).value.filter((x) => !seenCodes.has(x));
      result.forEach((code) => seenCodes.add(code));
      return result;
    };
    const forcedCodes = getPrefAndDedupe('spellcheck.forced_dictionaries');
    const forcedCodesSet = new Set(forcedCodes);
    const blockedCodes = getPrefAndDedupe('spellcheck.blocked_dictionaries');
    const blockedCodesSet = new Set(blockedCodes);
    const enabledCodes = getPrefAndDedupe('spellcheck.dictionaries');
    const on = [];
    for (const code of [...forcedCodes, ...enabledCodes]) {
      const language = this.supportedLanguageMap_.get(code);
      if (language) {
        on.push({
          language: language,
          isManaged: forcedCodesSet.has(code),
          spellCheckEnabled: true,
          downloadDictionaryStatus: null,
          downloadDictionaryFailureCount: 0,
        });
      }
    }
    const off = [];
    for (const language of supportedLanguages) {
      if (language.supportsSpellcheck && (!seenCodes.has(language.code) || blockedCodesSet.has(language.code))) {
        off.push({
          language: language,
          isManaged: blockedCodesSet.has(language.code),
          spellCheckEnabled: false,
          downloadDictionaryStatus: null,
          downloadDictionaryFailureCount: 0,
        });
      }
    }
    return { on: on, off: off };
  }
  alwaysTranslateLanguagesPrefChanged_() {
    if (this.prefs === undefined || this.languages === undefined) {
      return;
    }
    const alwaysTranslateCodes = Object.keys(this.getPref('translate_allowlists').value);
    const alwaysTranslateLanguages = alwaysTranslateCodes.map((code) => this.getLanguage(code));
    this.set('languages.alwaysTranslate', alwaysTranslateLanguages);
  }
  neverTranslateLanguagesPrefChanged_() {
    if (this.prefs === undefined || this.languages === undefined) {
      return;
    }
    const neverTranslateCodes = this.getPref('translate_blocked_languages').value;
    const neverTranslateLanguages = neverTranslateCodes.map((code) => this.getLanguage(code));
    this.set('languages.neverTranslate', neverTranslateLanguages);
  }
  neverTranslateSitesPrefChanged_() {
    if (this.prefs === undefined || this.languages === undefined) {
      return;
    }
    const neverTranslateSites = Object.keys(this.getPref('translate_site_blocklist_with_time').value);
    this.set('languages.neverTranslateSites', neverTranslateSites);
  }
  translateLanguagesPrefChanged_() {
    if (this.prefs === undefined || this.languages === undefined) {
      return;
    }
    const translateBlockedPrefValue = this.getPref('translate_blocked_languages').value;
    const translateBlockedSet = this.makeSetFromArray_(translateBlockedPrefValue);
    for (let i = 0; i < this.languages.enabled.length; i++) {
      const language = this.languages.enabled[i].language;
      const translateEnabled = this.isTranslateEnabled_(
        language.code,
        !!language.supportsTranslate,
        translateBlockedSet,
        this.languages.translateTarget,
        this.languages.prospectiveUILanguage
      );
      this.set('languages.enabled.' + i + '.translateEnabled', translateEnabled);
    }
  }
  translateTargetPrefChanged_() {
    if (this.prefs === undefined || this.languages === undefined) {
      return;
    }
    this.set('languages.translateTarget', this.getPref('translate_recent_target').value);
  }
  createModel_(args) {
    for (let i = 0; i < args.supportedLanguages.length; i++) {
      const language = args.supportedLanguages[i];
      language.supportsUI = !!language.supportsUI;
      language.supportsTranslate = !!language.supportsTranslate;
      language.supportsSpellcheck = !!language.supportsSpellcheck;
      language.isProhibitedLanguage = !!language.isProhibitedLanguage;
      this.supportedLanguageMap_.set(language.code, language);
    }
    let prospectiveUILanguage;
    prospectiveUILanguage = this.getPref('intl.app_locale').value || this.originalProspectiveUILanguage_;
    const enabledLanguageStates = this.getEnabledLanguageStates_(args.translateTarget, prospectiveUILanguage);
    for (let l = 0; l < enabledLanguageStates.length; l++) {
      this.enabledLanguageSet_.add(enabledLanguageStates[l].language.code);
    }
    const { on: spellCheckOnLanguages, off: spellCheckOffLanguages } = this.getSpellCheckLanguages_(
      args.supportedLanguages
    );
    const alwaysTranslateLanguages = args.alwaysTranslateCodes.map((code) => this.getLanguage(code));
    const neverTranslateLanguages = args.neverTranslateCodes.map((code) => this.getLanguage(code));
    const model = {
      supported: args.supportedLanguages,
      enabled: enabledLanguageStates,
      translateTarget: args.translateTarget,
      alwaysTranslate: alwaysTranslateLanguages,
      neverTranslate: neverTranslateLanguages,
      neverTranslateSites: args.neverTranslateSites,
      spellCheckOnLanguages: spellCheckOnLanguages,
      spellCheckOffLanguages: spellCheckOffLanguages,
      prospectiveUILanguage: prospectiveUILanguage,
    };
    this.languages = model;
  }
  getEnabledLanguageStates_(translateTarget, prospectiveUILanguage) {
    assert(CrSettingsPrefs.isInitialized);
    const pref = this.getPref('intl.accept_languages');
    const enabledLanguageCodes = pref.value.split(',');
    const languagesForcedPref = this.getPref('intl.forced_languages');
    const spellCheckPref = this.getPref('spellcheck.dictionaries');
    const spellCheckForcedPref = this.getPref('spellcheck.forced_dictionaries');
    const spellCheckBlockedPref = this.getPref('spellcheck.blocked_dictionaries');
    const languageForcedSet = this.makeSetFromArray_(languagesForcedPref.value);
    const spellCheckSet = this.makeSetFromArray_(spellCheckPref.value.concat(spellCheckForcedPref.value));
    const spellCheckForcedSet = this.makeSetFromArray_(spellCheckForcedPref.value);
    const spellCheckBlockedSet = this.makeSetFromArray_(spellCheckBlockedPref.value);
    const translateBlockedPrefValue = this.getPref('translate_blocked_languages').value;
    const translateBlockedSet = this.makeSetFromArray_(translateBlockedPrefValue);
    const enabledLanguageStates = [];
    for (let i = 0; i < enabledLanguageCodes.length; i++) {
      const code = enabledLanguageCodes[i];
      const language = this.supportedLanguageMap_.get(code);
      if (!language) {
        continue;
      }
      const languageState = {
        language: language,
        spellCheckEnabled:
          (spellCheckSet.has(code) && !spellCheckBlockedSet.has(code)) || spellCheckForcedSet.has(code),
        translateEnabled: this.isTranslateEnabled_(
          code,
          !!language.supportsTranslate,
          translateBlockedSet,
          translateTarget,
          prospectiveUILanguage
        ),
        isManaged: spellCheckForcedSet.has(code) || spellCheckBlockedSet.has(code),
        isForced: languageForcedSet.has(code),
        downloadDictionaryFailureCount: 0,
        removable: false,
        downloadDictionaryStatus: null,
      };
      enabledLanguageStates.push(languageState);
    }
    return enabledLanguageStates;
  }
  isTranslateEnabled_(code, supportsTranslate, translateBlockedSet, translateTarget, prospectiveUILanguage) {
    const translateCode = this.convertLanguageCodeForTranslate(code);
    return (
      supportsTranslate &&
      !translateBlockedSet.has(translateCode) &&
      translateCode !== translateTarget &&
      (!prospectiveUILanguage || code !== prospectiveUILanguage)
    );
  }
  onSpellcheckDictionariesChanged_(statuses) {
    const statusMap = new Map();
    statuses.forEach((status) => {
      statusMap.set(status.languageCode, status);
    });
    const collectionNames = ['enabled', 'spellCheckOnLanguages', 'spellCheckOffLanguages'];
    const languages = this.languages;
    collectionNames.forEach((collectionName) => {
      languages[collectionName].forEach((languageState, index) => {
        const status = statusMap.get(languageState.language.code);
        if (!status) {
          return;
        }
        const previousStatus = languageState.downloadDictionaryStatus;
        const keyPrefix = `languages.${collectionName}.${index}`;
        this.set(`${keyPrefix}.downloadDictionaryStatus`, status);
        const failureCountKey = `${keyPrefix}.downloadDictionaryFailureCount`;
        if (status.downloadFailed && !(previousStatus && previousStatus.downloadFailed)) {
          const failureCount = languageState.downloadDictionaryFailureCount + 1;
          this.set(failureCountKey, failureCount);
        } else if (status.isReady && !(previousStatus && previousStatus.isReady)) {
          this.set(failureCountKey, 0);
        }
      });
    });
  }
  updateRemovableLanguages_() {
    if (this.prefs === undefined || this.languages === undefined) {
      return;
    }
    for (let i = 0; i < this.languages.enabled.length; i++) {
      const languageState = this.languages.enabled[i];
      this.set('languages.enabled.' + i + '.removable', this.canDisableLanguage(languageState));
    }
  }
  makeSetFromArray_(list) {
    return new Set(list);
  }
  whenReady() {
    return this.resolver_.promise;
  }
  setProspectiveUiLanguage(languageCode) {
    this.browserProxy_.setProspectiveUiLanguage(languageCode);
  }
  requiresRestart() {
    return this.originalProspectiveUILanguage_ !== this.languages.prospectiveUILanguage;
  }
  getArcImeLanguageCode() {
    return kArcImeLanguage;
  }
  getFullName(language) {
    let fullName = language.displayName;
    if (language.displayName !== language.nativeDisplayName) {
      fullName += ' - ' + language.nativeDisplayName;
    }
    return fullName;
  }
  isLanguageCodeForArcIme(languageCode) {
    return languageCode === kArcImeLanguage;
  }
  isTranslateBaseLanguage(language) {
    if (!language.supportsTranslate) {
      return false;
    }
    if (language.code === 'zh-CN' || language.code === 'zh-TW') {
      return true;
    }
    if (language.code === 'mni-Mtei') {
      return true;
    }
    const baseLanguage = this.getBaseLanguage(language.code);
    if (baseLanguage === 'nb') {
      return false;
    }
    return language.code === baseLanguage;
  }
  isLanguageEnabled(languageCode) {
    return this.enabledLanguageSet_.has(languageCode);
  }
  enableLanguage(languageCode) {
    if (!CrSettingsPrefs.isInitialized) {
      return;
    }
    this.languageSettingsPrivate_.enableLanguage(languageCode);
  }
  disableLanguage(languageCode) {
    if (!CrSettingsPrefs.isInitialized) {
      return;
    }
    this.deletePrefListItem('spellcheck.dictionaries', languageCode);
    this.languageSettingsPrivate_.disableLanguage(languageCode);
  }
  canDisableLanguage(_languageState) {
    if (_languageState.language.code === this.languages.prospectiveUILanguage) {
      return false;
    }
    if (this.languages.enabled.length === 1) {
      return false;
    }
    return true;
  }
  canEnableLanguage(language) {
    return !(
      this.isLanguageEnabled(language.code) ||
      language.isProhibitedLanguage ||
      this.isLanguageCodeForArcIme(language.code)
    );
  }
  setLanguageAlwaysTranslateState(languageCode, alwaysTranslate) {
    this.languageSettingsPrivate_.setLanguageAlwaysTranslateState(languageCode, alwaysTranslate);
  }
  moveLanguage(languageCode, upDirection) {
    if (!CrSettingsPrefs.isInitialized) {
      return;
    }
    if (upDirection) {
      this.languageSettingsPrivate_.moveLanguage(languageCode, MoveType.UP);
    } else {
      this.languageSettingsPrivate_.moveLanguage(languageCode, MoveType.DOWN);
    }
  }
  moveLanguageToFront(languageCode) {
    if (!CrSettingsPrefs.isInitialized) {
      return;
    }
    this.languageSettingsPrivate_.moveLanguage(languageCode, MoveType.TOP);
  }
  enableTranslateLanguage(languageCode) {
    this.languageSettingsPrivate_.setEnableTranslationForLanguage(languageCode, true);
  }
  disableTranslateLanguage(languageCode) {
    this.languageSettingsPrivate_.setEnableTranslationForLanguage(languageCode, false);
  }
  setTranslateTargetLanguage(languageCode) {
    this.languageSettingsPrivate_.setTranslateTargetLanguage(languageCode);
  }
  toggleSpellCheck(languageCode, enable) {
    if (!this.languages) {
      return;
    }
    if (enable) {
      this.getPref('spellcheck.dictionaries');
      this.appendPrefListItem('spellcheck.dictionaries', languageCode);
    } else {
      this.deletePrefListItem('spellcheck.dictionaries', languageCode);
    }
  }
  convertLanguageCodeForTranslate(languageCode) {
    const base = this.getBaseLanguage(languageCode);
    if (base === 'zh') {
      return languageCode === 'zh-HK' ? 'zh-TW' : languageCode;
    }
    return kChromeToTranslateCode.get(base) || base;
  }
  convertLanguageCodeForChrome(languageCode) {
    return kTranslateToChromeCode.get(languageCode) || languageCode;
  }
  getBaseLanguage(languageCode) {
    return languageCode.split('-')[0];
  }
  getLanguage(languageCode) {
    if (this.supportedLanguageMap_.has(languageCode)) {
      return this.supportedLanguageMap_.get(languageCode);
    }
    const chromeLanguage = this.convertLanguageCodeForChrome(this.getBaseLanguage(languageCode));
    return this.supportedLanguageMap_.get(chromeLanguage);
  }
  retryDownloadDictionary(languageCode) {
    this.languageSettingsPrivate_.retryDownloadDictionary(languageCode);
  }
}
customElements.define(SettingsLanguagesElement.is, SettingsLanguagesElement);
// Copyright 2016 The Chromium Authors
let scrollTargetResolver = new PromiseResolver();
const GlobalScrollTargetMixin = dedupingMixin((superClass) => {
  const superClassBase = RouteObserverMixin(superClass);
  class GlobalScrollTargetMixin extends superClassBase {
    static get properties() {
      return {
        scrollTarget: Object,
        subpageScrollTarget: { type: Object, computed: 'getActiveTarget_(scrollTarget, active_)' },
        subpageRoute: Object,
        active_: Boolean,
      };
    }
    connectedCallback() {
      super.connectedCallback();
      this.active_ = Router.getInstance().getCurrentRoute() === this.subpageRoute;
      scrollTargetResolver.promise.then((scrollTarget) => {
        this.scrollTarget = scrollTarget;
      });
    }
    currentRouteChanged(route) {
      if (route === this.subpageRoute) {
        this.active_ = true;
      } else {
        setTimeout(() => {
          this.active_ = false;
        });
      }
    }
    getActiveTarget_(target, active) {
      if (target === undefined || active === undefined) {
        return undefined;
      }
      return active ? target : null;
    }
  }
  return GlobalScrollTargetMixin;
});
function setGlobalScrollTarget(scrollTarget) {
  scrollTargetResolver.resolve(scrollTarget);
}
function resetGlobalScrollTargetForTesting() {
  scrollTargetResolver = new PromiseResolver();
}
// Copyright 2020 The Chromium Authors
class PluralStringProxyImpl {
  getPluralString(messageName, itemCount) {
    return sendWithPromise('getPluralString', messageName, itemCount);
  }
  getPluralStringTupleWithComma(messageName1, itemCount1, messageName2, itemCount2) {
    return sendWithPromise('getPluralStringTupleWithComma', messageName1, itemCount1, messageName2, itemCount2);
  }
  getPluralStringTupleWithPeriods(messageName1, itemCount1, messageName2, itemCount2) {
    return sendWithPromise('getPluralStringTupleWithPeriods', messageName1, itemCount1, messageName2, itemCount2);
  }
  static getInstance() {
    return instance$1 || (instance$1 = new PluralStringProxyImpl());
  }
  static setInstance(obj) {
    instance$1 = obj;
  }
}
let instance$1 = null;
// Copyright 2021 The Chromium Authors
class PrivacySandboxBrowserProxyImpl {
  getFledgeState() {
    return sendWithPromise('getFledgeState');
  }
  setFledgeJoiningAllowed(site, allowed) {
    chrome.send('setFledgeJoiningAllowed', [site, allowed]);
  }
  getTopicsState() {
    return sendWithPromise('getTopicsState');
  }
  setTopicAllowed(topic, allowed) {
    chrome.send('setTopicAllowed', [topic.topicId, topic.taxonomyVersion, allowed]);
  }
  topicsToggleChanged(newToggleValue) {
    chrome.send('topicsToggleChanged', [newToggleValue]);
  }
  static getInstance() {
    return instance || (instance = new PrivacySandboxBrowserProxyImpl());
  }
  static setInstance(obj) {
    instance = obj;
  }
}
let instance = null;
export {
  DEFAULT_CHECKED_VALUE as $,
  ResetBrowserProxyImpl as A,
  BaseMixin as B,
  CrSearchFieldMixin as C,
  SearchEnginesBrowserProxyImpl as D,
  PromiseResolver as E,
  FocusRowMixin as F,
  IronSelectableBehavior as G,
  HatsBrowserProxyImpl as H,
  I18nMixin as I,
  FocusOutlineManager as J,
  CrContainerShadowMixin as K,
  ListPropertyUpdateMixin as L,
  MetricsBrowserProxyImpl as M,
  NotificationSetting as N,
  OpenWindowProxyImpl as O,
  PaperRippleBehavior as P,
  FindShortcutMixin as Q,
  RelaunchMixin as R,
  SiteSettingsPrefsBrowserProxyImpl as S,
  TrustSafetyInteraction as T,
  pageVisibility as U,
  setGlobalScrollTarget as V,
  WebUiListenerMixin as W,
  resetGlobalScrollTargetForTesting as X,
  PluralStringProxyImpl as Y,
  ControlledRadioButtonElement as Z,
  ExtensionControlledIndicatorElement as _,
  assertNotReached as a,
  CrIconButtonElement as a$,
  DEFAULT_UNCHECKED_VALUE as a0,
  SettingsDropdownMenuElement as a1,
  SettingsToggleButtonElement as a2,
  ExtensionControlBrowserProxyImpl as a3,
  LifetimeBrowserProxyImpl as a4,
  PageStatus as a5,
  StatusAction as a6,
  syncPrefsIndividualDataTypes as a7,
  TrustedVaultBannerState as a8,
  SecureDnsMode as a9,
  EventTracker as aA,
  AnchorAlignment as aB,
  SettingsBooleanControlMixin as aC,
  ClearBrowsingDataBrowserProxyImpl as aD,
  GlobalScrollTargetMixin as aE,
  SiteSettingsMixin as aF,
  ContentSettingProvider as aG,
  ContentSetting as aH,
  CookiesExceptionType as aI,
  SITE_EXCEPTION_WILDCARD as aJ,
  INVALID_CATEGORY_SUBTYPE as aK,
  CookiePrimarySetting as aL,
  AllSitesAction2 as aM,
  SortMethod as aN,
  AllSitesDialog as aO,
  SiteSettingSource as aP,
  MODEL_UPDATE_DELAY_MS as aQ,
  isUndoKeyboardEvent as aR,
  hasKeyModifiers as aS,
  isWindows as aT,
  IronA11yKeysBehavior as aU,
  LanguagesBrowserProxyImpl as aV,
  SettingsRadioGroupElement as aW,
  SettingsSecureDnsElement as aX,
  SecureDnsInputElement as aY,
  CrCheckboxElement as aZ,
  CrDialogElement as a_,
  SecureDnsUiManagementMode as aa,
  prefToString as ab,
  stringToPrefValue as ac,
  SettingsPrefsElement as ad,
  CrSettingsPrefs as ae,
  CrActionMenuElement as af,
  CrButtonElement as ag,
  CrLinkRowElement as ah,
  CrRadioButtonElement as ai,
  CrRadioGroupElement as aj,
  CrToggleElement as ak,
  DeleteBrowsingDataAction as al,
  PrivacyElementInteractions as am,
  PrivacyGuideSettingsStates as an,
  PrivacyGuideStepsEligibleAndReached as ao,
  SafeBrowsingInteractions as ap,
  SafetyCheckNotificationsModuleInteractions as aq,
  SafetyCheckUnusedSitePermissionsModuleInteractions as ar,
  setPageVisibilityForTesting as as,
  MAX_SIGNIN_PROMO_IMPRESSION as at,
  SettingsSyncAccountControlElement as au,
  PrivacySandboxBrowserProxyImpl as av,
  buildRouter as aw,
  Route as ax,
  SearchEnginesInteractions as ay,
  SiteFaviconElement as az,
  assert as b,
  CrInputElement as b0,
  CrTextareaElement as b1,
  SettingsCollapseRadioButtonElement as b2,
  PrivacyGuideStep as b3,
  PrivacyGuideCompletionFragmentElement as b4,
  PrivacyGuideCookiesFragmentElement as b5,
  PrivacyGuideDescriptionItemElement as b6,
  SettingsPrivacyGuideDialogElement as b7,
  PrivacyGuideHistorySyncFragmentElement as b8,
  PrivacyGuideMsbbFragmentElement as b9,
  SettingsPrivacyGuidePageElement as ba,
  PrivacyGuideSafeBrowsingFragmentElement as bb,
  PrivacyGuideWelcomeFragmentElement as bc,
  SafeBrowsingSetting as bd,
  SettingsSecurityPageElement as be,
  SettingsSimpleConfirmationDialogElement as bf,
  SettingsCategoryDefaultRadioGroupElement as bg,
  RestartType as c,
  Router as d,
  CrPolicyPrefMixin as e,
  PrefControlMixin as f,
  PrefsMixin as g,
  PrivacyGuideInteractions as h,
  PrivacyGuideAvailabilityMixin as i,
  RouteObserverMixin as j,
  PrivacyPageBrowserProxyImpl as k,
  listenOnce as l,
  SafetyHubBrowserProxyImpl as m,
  ContentSettingsTypes as n,
  ChooserType as o,
  focusWithoutInk as p,
  CookieControlsMode as q,
  routes as r,
  sanitizeInnerHtml as s,
  SafetyCheckInteractions as t,
  getInstance as u,
  CrScrollableMixin as v,
  SyncBrowserProxyImpl as w,
  ProfileInfoBrowserProxyImpl as x,
  getImage as y,
  TooltipMixin as z,
};
