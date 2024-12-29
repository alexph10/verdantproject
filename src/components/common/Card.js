import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export function Card({ children, variant = 'default', style }) {
  return (
    <View style={[styles.card, styles[variant], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.elevation.small,
  },
  elevated: {
    ...theme.elevation.medium,
  },
  flat: {
    elevation: 0,
    shadowColor: 'transparent',
  },
});