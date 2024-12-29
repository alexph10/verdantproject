import React from 'react';
import { Text as RNText } from 'react-native';
import { useThemedStyles } from '../../hooks/useTheme';

export function Text({ 
  variant = 'bodyDefault',
  color,
  align,
  transform,
  style,
  children,
  ...props 
}) {
  const styles = useThemedStyles(theme => ({
    text: {
      ...theme.typography.variants[variant],
      color: color ? theme.colors[color] || color : theme.colors.text,
      textAlign: align,
      textTransform: transform,
      ...style,
    },
  }));

  return (
    <RNText style={styles.text} {...props}>
      {children}
    </RNText>
  );
}