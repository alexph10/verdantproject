import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../typography';
import { theme } from '../../theme';

export function FootprintChart({ data }) {
  const totalEmissions = data.reduce((sum, category) => sum + category.value, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2">Summary</Text>
        <Text variant="display1">{totalEmissions}</Text>
        <Text variant="bodySmall">kg CO2 eq</Text>
      </View>
      
      <View style={styles.chart}>
        {data.map((category, index) => (
          <View 
            key={category.name}
            style={[
              styles.wave,
              { 
                backgroundColor: theme.colors[category.color],
                left: `${index * 15}%`,
                height: `${(category.value / totalEmissions) * 100}%`
              }
            ]}
          >
            <Text style={styles.label}>{category.name}</Text>
            <Text style={styles.value}>{category.value}</Text>
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
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  chart: {
    height: 200,
    flexDirection: 'row',
    position: 'relative',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    width: '30%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  label: {
    position: 'absolute',
    top: -24,
    left: theme.spacing.sm,
    color: theme.colors.textSecondary,
  },
  value: {
    position: 'absolute',
    top: -48,
    left: theme.spacing.sm,
    fontWeight: 'bold',
  },
});