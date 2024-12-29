import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { Text } from '../../typography';
import { EfficiencyScore } from './EfficiencyScore';
import { SavingsEstimate } from './SavingsEstimate';
import { RecommendationsList } from './RecommendationsList';
import { theme } from '../../../theme';

export function AuditSummary({ results }) {
  const {
    energyEfficiency,
    waterEfficiency,
    potentialSavings,
    recommendations,
  } = results;

  return (
    <Surface style={styles.container}>
      <Text variant="h2" style={styles.title}>Audit Results</Text>

      <View style={styles.scoresContainer}>
        <EfficiencyScore
          score={energyEfficiency}
          label="Energy Efficiency"
        />
        <EfficiencyScore
          score={waterEfficiency}
          label="Water Efficiency"
        />
      </View>

      <SavingsEstimate savings={potentialSavings} />
      
      <RecommendationsList recommendations={recommendations} />

      <View style={styles.disclaimer}>
        <Text variant="caption" color="textSecondary">
          These estimates are based on typical usage patterns and local utility rates.
          Actual savings may vary.
        </Text>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.large,
  },
  title: {
    marginBottom: theme.spacing.xl,
  },
  scoresContainer: {
    marginBottom: theme.spacing.xl,
  },
  disclaimer: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
  },
});