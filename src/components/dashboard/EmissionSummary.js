import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../typography';
import { theme } from '../../theme';

export function EmissionSummary({ value, unit, description }) {
  return (
    <View style={styles.container}>
      <View style={styles.valueContainer}>
        <Text variant="display1" style={styles.value}>{value}</Text>
        <Text variant="bodySmall" color="textSecondary">{unit}</Text>
      </View>
      <Text variant="caption" style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: theme.spacing.xs,
  },
  value: {
    color: theme.colors.primary,
  },
  description: {
    marginTop: theme.spacing.xs,
  },
});