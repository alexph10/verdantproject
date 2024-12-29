import { fontFamilies, fontVariants } from '../fonts';
import { fontSizes, lineHeights, letterSpacing } from './scales';

export const textVariants = {
  // Display variants
  display1: {
    fontFamily: fontVariants.black,
    fontSize: fontSizes['6xl'],
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  },
  display2: {
    fontFamily: fontVariants.bold,
    fontSize: fontSizes['5xl'],
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  },

  // Heading variants
  h1: {
    fontFamily: fontVariants.bold,
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily: fontVariants.semibold,
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily: fontVariants.semibold,
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights.snug,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontFamily: fontVariants.medium,
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.snug,
    letterSpacing: letterSpacing.normal,
  },

  // Body variants
  bodyLarge: {
    fontFamily: fontVariants.regular,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodyDefault: {
    fontFamily: fontVariants.regular,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontFamily: fontVariants.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
  },

  // Special variants
  caption: {
    fontFamily: fontVariants.light,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.wide,
  },
  overline: {
    fontFamily: fontVariants.medium,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.normal,
    letterSpacing: letterSpacing.widest,
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: fontVariants.semibold,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.none,
    letterSpacing: letterSpacing.wide,
  },
};