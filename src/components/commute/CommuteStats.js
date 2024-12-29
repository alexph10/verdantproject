import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Title, Text } from 'react-native-paper';
import { theme } from '../../theme';

export function CommuteStats({ commute }) {
  const {
    distance,
    duration,
    points,
    impact,
  } = commute;

  return (
    <Surface style={styles.container}>
      <Title>Trip Summary</Title>

      <View style={styles.statsGrid}>
        <StatItem
          label="Distance"
          value={`${(distance / 1000).toFixed(2)} km`}
          icon="map-marker-distance"
        />

        <StatItem
          label="Duration"
          value={formatDuration(duration)}
          icon="clock-outline"
        />

        <StatItem
          label="Points Earned"
          value={points}
          icon="star"
        />

        <StatItem
          label="CO₂ Saved"
          value={`${impact.emissionsSaved.toFixed(1)} kg`}
          icon="leaf"
        />
      </View>

      <View style={styles.impactContainer}>
        <Text>
          Equivalent to {impact.treesEquivalent.toFixed(1)} trees planted
        </Text>
      </View>
    </Surface>
  );
}

function StatItem({ label, value, icon }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    margin: theme.spacing.md,
    borderRadius: theme.spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.md,
  },
  statItem: {
    width: '50%',
    padding: theme.spacing.sm,
  },
  statLabel: {
    color: theme.colors.textSecondary,
  },
  statValue: {
    fontSize: theme.typography.sizes.h3,
    fontWeight: 'bold',
  },
  impactContainer: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  },
});