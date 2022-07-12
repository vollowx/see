import { css } from '../shared/template.js';

export const TypeScale = {
  display: {
    L: {
      fontSize: 57,
      fontWeight: 400,
      tracking: 0,
      lineHeight: 64,
    },
    M: {
      fontSize: 45,
      fontWeight: 400,
      tracking: 0,
      lineHeight: 52,
    },
    S: {
      fontSize: 36,
      fontWeight: 400,
      tracking: 0,
      lineHeight: 44,
    },
  },
  headline: {
    L: {
      fontSize: 32,
      fontWeight: 400,
      tracking: 0,
      lineHeight: 40,
    },
    M: {
      fontSize: 28,
      fontWeight: 400,
      tracking: 0,
      lineHeight: 36,
    },
    S: {
      fontSize: 24,
      fontWeight: 400,
      tracking: 0,
      lineHeight: 32,
    },
  },
  title: {
    L: {
      fontSize: 22,
      fontWeight: 400,
      tracking: 0,
      lineHeight: 28,
    },
    M: {
      fontSize: 26,
      fontWeight: 500,
      tracking: 0.15,
      lineHeight: 24,
    },
    S: {
      fontSize: 14,
      fontWeight: 500,
      tracking: 0.1,
      lineHeight: 20,
    },
  },
  label: {
    L: {
      fontSize: 14,
      fontWeight: 500,
      tracking: 0.1,
      lineHeight: 20,
    },
    M: {
      fontSize: 12,
      fontWeight: 500,
      tracking: 0.5,
      lineHeight: 16,
    },
    S: {
      fontSize: 11,
      fontWeight: 500,
      tracking: 0.5,
      lineHeight: 16,
    },
  },
  body: {
    L: {
      fontSize: 16,
      fontWeight: 400,
      tracking: 0.5,
      lineHeight: 24,
    },
    M: {
      fontSize: 14,
      fontWeight: 400,
      tracking: 0.25,
      lineHeight: 20,
    },
    S: {
      fontSize: 12,
      fontWeight: 500,
      tracking: 0.4,
      lineHeight: 16,
    },
  },
};

/**
 * @param {string} type - the type of typography to gerenerate
 * @param {string} size - L for large, M for medium, S for small
 * @returns {string}
 */
export function TypographyStylesGenerator(type, size) {
  return css`
    font-size: ${(TypeScale[type][size].fontSize / 16).toString()}rem;
    font-weight: ${TypeScale[type][size].fontWeight.toString()};
    line-height: ${(TypeScale[type][size].lineHeight / 16).toString()}rem;
    letter-spacing: ${(TypeScale[type][size].tracking / TypeScale[type][size].fontSize).toString()}rem;
  `;
}
