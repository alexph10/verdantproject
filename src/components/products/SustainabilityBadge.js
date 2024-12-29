import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../../theme';

export function SustainabilityBadge({ score }) {
  const backgroundColor = getScoreColor(score);

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.score}>{(score * 100).toFixed(0)}</Text>
      <Text style={styles.label}>Eco Score</Text>
    </View>
  );
}

function getScoreColor(score) {
  if (score >= 0.8) return theme.colors.success;
  if (score >= 0.6) return theme.colors.warning;
  return theme.colors.error;
}

const styles = StyleSheet.create({
  badge: {
    padding: theme.spacing.sm,
    borderRadius: theme.spacing.sm,
    alignItems: 'center',
    minWidth: 60,
  },
  score: {
    color: 'white',
    fontSize: theme.typography.h3,
    fontWeight: 'bold',
  },
  label: {
    color: 'white',
    fontSize: theme.typography.caption,
  },
});