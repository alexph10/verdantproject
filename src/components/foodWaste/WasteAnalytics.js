import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Title, Text } from 'react-native-paper';
import { theme } from '../../theme';

export function WasteAnalytics({ analysis }) {
  const {
    totalWaste,
    resourceImpact,
    commonItems,
    trends,
  } = analysis;

  return (
    <Surface style={styles.container}>
      <Title>Waste Analysis</Title>

      <View style={styles.statsGrid}>
        <StatItem
          label="Total Waste"
          value={`${(totalWaste / 1000).toFixed(1)} kg`}
          icon="scale"
        />

        <StatItem
          label="Water Impact"
          value={`${resourceImpact.water.toFixed(0)} L`}
          icon="water"
        />

        <StatItem
          label="Land Impact"
          value={`${resourceImpact.land.toFixed(1)} m²`}
          icon="terrain"
        />

        <StatItem
          label="CO₂ Impact"
          value={`${resourceImpact.emissions.toFixed(1)} kg`}
          icon="molecule-co2"
        />
      </View>

      <View style={styles.trendContainer}>
        <Title>Common Wasted Items</Title>
        {commonItems.map(item => (
          <Text key={item.name} style={styles.trendItem}>
            • {item.name}: {item.count} times
          </Text>
        ))}
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
  trendContainer: {
    marginTop: theme.spacing.lg,
  },
  trendItem: {
    marginVertical: theme.spacing.xs,
  },
});