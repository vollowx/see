import { argbFromHex, themeFromSourceColor, applyTheme } from '../system/color-system.js';
const theme = themeFromSourceColor(argbFromHex('#114514'), [
  {
    name: 'custom-1',
    value: argbFromHex('#ff0000'),
    blend: true,
  },
]);
applyTheme(theme, { target: document.documentElement, brightnessSuffix: true });

import '../badge/badge.js';
import '../button/common-button.js';
import '../button/fab.js';
import '../button/icon-button.js';
import '../ripple/ripple.js';
import '../top-app-bar/top-app-bar.js';
import '../typography/typography.js';

import { TypographyStylesGenerator } from '../system/typography-system.js';

import FocusRingStyle from '../shared/focus-ring-style.js';
let FocusRingStyleText = [];
for (let i = 0; i < FocusRingStyle.cssRules.length; i++) {
  FocusRingStyleText.push(FocusRingStyle.cssRules[i].cssText);
}

function toggleTheme() {
  const themeAttr = document.documentElement.getAttribute('data-md-theme');
  const newTheme = themeAttr === 'light' ? 'dark' : 'light';
  localStorage.setItem('md-theme', newTheme);
  document.documentElement.setAttribute('data-md-theme', newTheme);
}
function toggleDir() {
  const dir = document.documentElement.getAttribute('dir');
  const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
  localStorage.setItem('md-dir', newDir);
  document.documentElement.setAttribute('dir', newDir);
  document.querySelectorAll('md-badge').forEach((badge) => {
    badge.setAttribute('dir', newDir);
  });
}

const CSSBlock = document.createElement('style');
CSSBlock.innerHTML = /* css */ `
  .index h2 { ${TypographyStylesGenerator('label', 'L')} }
  .index li { ${TypographyStylesGenerator('label', 'M')} }
  .table-of-ctt ul li a { ${TypographyStylesGenerator('body', 'M')} }
  ${FocusRingStyleText.join('')}
`;
document.head.appendChild(CSSBlock);

addEventListener('DOMContentLoaded', () => {
  const themeTgl = document.querySelector('.theme-tgl');
  const dirTgl = document.querySelector('.dir-tgl');

  const localDarkData = localStorage.getItem('md-theme');
  const systemDarkData = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let finalDarkData;
  if (localDarkData) {
    finalDarkData = localDarkData;
  } else if (systemDarkData) {
    finalDarkData = 'dark';
  } else {
    finalDarkData = 'light';
  }

  const newDir = localStorage.getItem('md-dir') || 'ltr';
  document.documentElement.setAttribute('data-md-theme', finalDarkData);
  document.documentElement.setAttribute('dir', newDir);
  document.querySelectorAll('md-badge').forEach((badge) => {
    badge.setAttribute('dir', newDir);
  });

  themeTgl?.addEventListener('click', toggleTheme);
  dirTgl?.addEventListener('click', toggleDir);
});
