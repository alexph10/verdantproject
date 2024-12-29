// Swiss typography system
export const typography = {
  // Font sizes following a modular scale
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
    '5xl': 48,
    '6xl': 64,
  },

  // Line heights
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: -0.05,
    tight: -0.025,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
    widest: 0.1,
  },

  // Font weights
  weights: {
    thin: '100',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },

  // Text variants
  variants: {
    display: {
      fontSize: 48,
      lineHeight: 1.2,
      fontWeight: '700',
      letterSpacing: -0.025,
    },
    h1: {
      fontSize: 40,
      lineHeight: 1.25,
      fontWeight: '700',
      letterSpacing: -0.025,
    },
    h2: {
      fontSize: 32,
      lineHeight: 1.25,
      fontWeight: '600',
      letterSpacing: -0.025,
    },
    h3: {
      fontSize: 24,
      lineHeight: 1.375,
      fontWeight: '600',
      letterSpacing: 0,
    },
    h4: {
      fontSize: 20,
      lineHeight: 1.375,
      fontWeight: '500',
      letterSpacing: 0,
    },
    body: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: '400',
      letterSpacing: 0,
    },
    caption: {
      fontSize: 14,
      lineHeight: 1.5,
      fontWeight: '400',
      letterSpacing: 0.025,
    },
  },
};