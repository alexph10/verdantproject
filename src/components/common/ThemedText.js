import React from 'react';
import { Text } from 'react-native';
import { useThemedStyles } from '../../hooks/useTheme';

export function ThemedText({ style, variant = 'body', children, ...props }) {
  const theme = useThemedStyles(theme => ({
    text: {
      color: theme.colors.text,
      fontSize: theme.typography.sizes[variant],
      lineHeight: theme.typography.lineHeights.normal,
      ...style,
    },
  }));

  return (
    <Text style={theme.text} {...props}>
      {children}
    </Text>
  );
}