import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../typography';
import { ProgressBar } from 'react-native-paper';
import { theme } from '../../../theme';

export function EfficiencyScore({ score, label }) {
  const getScoreColor = (value) => {
    if (value >= 80) return theme.colors.success;
    if (value >= 60) return theme.colors.warning;
    return theme.colors.error;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h3">{label}</Text>
        <Text variant="h2" style={{ color: getScoreColor(score) }}>
          {score}/100
        </Text>
      </View>
      <ProgressBar
        progress={score / 100}
        color={getScoreColor(score)}
        style={styles.progressBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
});