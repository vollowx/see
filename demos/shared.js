import { argbFromHex, themeFromSourceColor, applyTheme } from '../system/color-system.js';
const theme = themeFromSourceColor(argbFromHex(localStorage.getItem('key-color') || '#6750a4'));
applyTheme(theme, { target: document.documentElement, brightnessSuffix: true });

import * as TM from '../index.js';
TM;

import { TypographyStylesGenerator } from '../system/typography-system.js';

import FocusRingStyle from '../shared/focus-ring-style.js';
let FocusRingStyleText = [];
for (let i = 0; i < FocusRingStyle.cssRules.length; i++) {
  FocusRingStyleText.push(FocusRingStyle.cssRules[i].cssText);
}

const iconNames = {
  theme: {
    light: 'material-symbols:sunny',
    dark: 'material-symbols:mode-night',
  },
  dir: {
    ltr: 'material-symbols:format-textdirection-l-to-r',
    rtl: 'material-symbols:format-textdirection-r-to-l',
  },
};
const updateThemeIcon = (on, theme) => {
  on.setAttribute('icon', iconNames.theme[theme !== 'light' ? 'light' : 'dark']);
};
const updateDirIcon = (on, dir) => {
  on.setAttribute('icon', iconNames.dir[dir !== 'ltr' ? 'ltr' : 'rtl']);
};
/**
 * @param {Event} _ev
 */
const toggleTheme = (_ev) => {
  const oldTheme = document.documentElement.getAttribute('data-md-theme');
  const newTheme = oldTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('md-theme', newTheme);
  document.documentElement.setAttribute('data-md-theme', newTheme);
  // @ts-ignore
  updateThemeIcon(_ev.target, newTheme);
};
/**
 * @param {Event} _ev
 */
const toggleDir = (_ev) => {
  const oldDir = document.documentElement.getAttribute('dir');
  const newDir = oldDir === 'rtl' ? 'ltr' : 'rtl';
  localStorage.setItem('md-dir', newDir);
  document.documentElement.setAttribute('dir', newDir);
  document.querySelectorAll('md-badge').forEach((badge) => badge.setAttribute('dir', newDir));
  // @ts-ignore
  updateDirIcon(_ev.target, newDir);
};

const CSSBlock = document.createElement('style');
CSSBlock.innerHTML = /* css */ `
  .index h2 { ${TypographyStylesGenerator('label', 'S')} }
  .index p { ${TypographyStylesGenerator('body', 'S')} }
  .index li { ${TypographyStylesGenerator('label', 'M')} }
  .overview-content ul li a { ${TypographyStylesGenerator('body', 'M')} }
  .color-item { ${TypographyStylesGenerator('label', 'L')} }
  ${FocusRingStyleText.join('')}
`;
document.head.appendChild(CSSBlock);

addEventListener('DOMContentLoaded', () => {
  const themeTgl = document.querySelector('#theme-tgl');
  const dirTgl = document.querySelector('#dir-tgl');

  // Init
  const localDarkData = localStorage.getItem('md-theme');
  const systemDarkData = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme;
  if (localDarkData) {
    theme = localDarkData;
  } else if (systemDarkData) {
    theme = 'dark';
  } else {
    theme = 'light';
  }
  const dir = localStorage.getItem('md-dir') || 'ltr';

  // Applying
  document.documentElement.setAttribute('data-md-theme', theme);
  document.documentElement.setAttribute('dir', dir);
  document.querySelectorAll('md-badge').forEach((badge) => {
    badge.setAttribute('dir', dir);
  });

  updateThemeIcon(themeTgl, theme);
  updateDirIcon(dirTgl, dir);

  themeTgl?.addEventListener('click', toggleTheme);
  dirTgl?.addEventListener('click', toggleDir);
});
