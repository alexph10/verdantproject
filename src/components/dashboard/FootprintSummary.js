import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../typography';
import { TimeRangeSelector } from './TimeRangeSelector';
import { EmissionSummary } from './EmissionSummary';
import { FootprintChart } from './FootprintChart';
import { theme } from '../../theme';

export function FootprintSummary({ data }) {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1">Your footprint</Text>
        <TimeRangeSelector 
          selected={timeRange}
          onSelect={setTimeRange}
        />
      </View>
      
      <EmissionSummary
        value={186}
        unit="kg CO2 eq"
        description="Total amount of emissions"
      />

      <FootprintChart data={data} timeRange={timeRange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    margin: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
});