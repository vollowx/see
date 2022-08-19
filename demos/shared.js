import { argbFromHex, themeFromSourceColor, applyTheme } from '../system/color-system.js';
const theme = themeFromSourceColor(argbFromHex(localStorage.getItem('key-color') || '#114514'));
applyTheme(theme, { target: document.documentElement, brightnessSuffix: true });

import * as TM from '../index.js';
TM;

import { TypographyStylesGenerator } from '../system/typography-system.js';

import FocusRingStyle from '../shared/focus-ring-style.js';
let FocusRingStyleText = [];
for (let i = 0; i < FocusRingStyle.cssRules.length; i++) {
  FocusRingStyleText.push(FocusRingStyle.cssRules[i].cssText);
}

/**
 * @param {Event} e
 */
function toggleTheme(e) {
  const themeAttr = document.documentElement.getAttribute('data-md-theme');
  const newTheme = themeAttr === 'light' ? 'dark' : 'light';
  localStorage.setItem('md-theme', newTheme);
  document.documentElement.setAttribute('data-md-theme', newTheme);
  // @ts-ignore
  e.target.setAttribute('icon', newTheme === 'light' ? 'material-symbols:mode-night' : 'material-symbols:sunny');
}
/**
 * @param {Event} e
 */
function toggleDir(e) {
  const dir = document.documentElement.getAttribute('dir');
  const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
  localStorage.setItem('md-dir', newDir);
  document.documentElement.setAttribute('dir', newDir);
  document.querySelectorAll('md-badge').forEach((badge) => {
    badge.setAttribute('dir', newDir);
  });
  // @ts-ignore
  e.target.setAttribute(
    'icon',
    localStorage.getItem('md-dir') === 'rtl'
      ? 'material-symbols:format-textdirection-l-to-r'
      : 'material-symbols:format-textdirection-r-to-l'
  );
}

const CSSBlock = document.createElement('style');
CSSBlock.innerHTML = /* css */ `
  .index h2 { ${TypographyStylesGenerator('label', 'L')} }
  .index li { ${TypographyStylesGenerator('label', 'M')} }
  .table-of-ctt ul li a { ${TypographyStylesGenerator('body', 'M')} }
  .color-item { ${TypographyStylesGenerator('label', 'L')} }
  ${FocusRingStyleText.join('')}
`;
document.head.appendChild(CSSBlock);

addEventListener('DOMContentLoaded', () => {
  const themeTgl = document.querySelector('#theme-tgl');
  const dirTgl = document.querySelector('#dir-tgl');

  themeTgl?.setAttribute(
    'icon',
    localStorage.getItem('md-theme') === 'light' ? 'material-symbols:mode-night' : 'material-symbols:sunny'
  );
  dirTgl?.setAttribute(
    'icon',
    localStorage.getItem('md-dir') === 'rtl'
      ? 'material-symbols:format-textdirection-l-to-r'
      : 'material-symbols:format-textdirection-r-to-l'
  );

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

import './lib/prism.js';
