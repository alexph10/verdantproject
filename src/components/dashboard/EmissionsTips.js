import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../typography';
import { IconButton } from 'react-native-paper';
import { theme } from '../../theme';

export function EmissionsTips({ tips }) {
  return (
    <View style={styles.container}>
      <Text variant="h2">Lower your emissions by 37 kg</Text>
      <Text variant="bodySmall" color="textSecondary">
        to respect the Paris agreement. This is how:
      </Text>

      {tips.map((tip, index) => (
        <View key={index} style={styles.tipCard}>
          <View style={styles.tipContent}>
            <Text variant="h3" style={styles.tipNumber}>
              {String(index + 1).padStart(2, '0')}
            </Text>
            <Text variant="bodyLarge">{tip.title}</Text>
          </View>
          <IconButton icon="arrow-right" />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
  tipCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    marginTop: theme.spacing.md,
  },
  tipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  tipNumber: {
    color: theme.colors.textSecondary,
    opacity: 0.5,
  },
});