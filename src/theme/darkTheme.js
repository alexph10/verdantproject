import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const darkTheme = {
  dark: true,
  colors: {
    primary: colors.mossyGreen,
    background: colors.deepForestGreen,
    surface: colors.darkCharcoalGreen,
    text: colors.paleGreenGray,
    textSecondary: colors.mossyGreen,
    accent: colors.brightLeaf,
    border: colors.subdeedLime,
    notification: colors.brightLeaf,
    card: colors.darkCharcoalGreen,
    error: colors.error,
    success: colors.success,
    warning: colors.warning,
    info: colors.info,
  },
  spacing,
  typography,
};