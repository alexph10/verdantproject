import { useColorScheme } from 'react-native';
import { theme } from '../theme';

export function useTheme() {
  const colorScheme = useColorScheme();
  
  // Return the appropriate theme based on system preferences
  return theme[colorScheme] || theme.default;
}

export function useThemedStyles(stylesFn) {
  const currentTheme = useTheme();
  return stylesFn(currentTheme);
}