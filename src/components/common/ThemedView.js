import React from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '../../hooks/useTheme';

export function ThemedView({ style, children, ...props }) {
  const theme = useThemedStyles(theme => ({
    container: {
      backgroundColor: theme.colors.background,
      ...style,
    },
  }));

  return (
    <View style={theme.container} {...props}>
      {children}
    </View>
  );
}