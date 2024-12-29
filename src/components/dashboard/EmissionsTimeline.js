import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../typography';
import { theme } from '../../theme';

export function EmissionsTimeline({ data, title, subtitle }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon} />
        <View>
          <Text variant="h3">{title}</Text>
          <Text variant="bodySmall" color="textSecondary">{subtitle}</Text>
        </View>
      </View>

      <View style={styles.chart}>
        {data.map((point, index) => (
          <View key={index} style={styles.dataPoint}>
            <View 
              style={[
                styles.bar,
                { height: `${(point.value / data.maxValue) * 100}%` }
              ]}
            />
            <Text variant="caption">{point.label}</Text>
          </View>
        ))}
      </View>
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
  chart: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  dataPoint: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 2,
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
});