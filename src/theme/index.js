import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

// Swiss Design-inspired theme system
export const theme = {
  colors: {
    // Primary colors
    primary: colors.verdantGreen,
    secondary: colors.leafGreen,
    background: colors.warmBeige,
    surface: colors.clay,
    
    // Text colors
    text: colors.darkGreen,
    textSecondary: colors.charcoalGreen,
    textTertiary: colors.softTaupe,
    
    // Accent colors
    accent: colors.teal,
    success: colors.leafGreen,
    error: '#D32F2F',
    warning: '#FFA000',
    info: '#1976D2',
    
    // UI elements
    border: colors.softTaupe,
    divider: colors.clay,
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  
  // Swiss typography system
  typography,
  
  // Consistent spacing scale
  spacing,
  
  // Swiss grid system
  grid: {
    container: 16,
    gutter: 16,
    margin: 16,
  },
  
  // Elevation and shadows
  elevation: {
    none: {
      shadowColor: 'transparent',
    },
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
  
  // Border radiuses
  borderRadius: {
    none: 0,
    small: 4,
    medium: 8,
    large: 12,
    full: 9999,
  },
};