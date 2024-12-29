import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../typography';
import { theme } from '../../theme';

export function RecommendationList({ recommendations }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon} />
        <Text variant="h3">Lower your emissions by 37 kg</Text>
      </View>

      {recommendations.map((rec, index) => (
        <TouchableOpacity 
          key={index}
          style={styles.recommendation}
          onPress={() => rec.onPress?.()}
        >
          <Text variant="h4" style={styles.number}>
            {String(index + 1).padStart(2, '0')}
          </Text>
          <Text variant="bodyLarge">{rec.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    marginVertical: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.md,
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.sm,
  },
  number: {
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.md,
    opacity: 0.5,
  },
});