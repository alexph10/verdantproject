import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { theme } from '../theme';
import CarbonChart from '../components/footprint/CarbonChart';
import CategoryBreakdown from '../components/footprint/CategoryBreakdown';

export default function FootprintScreen() {
  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.card}>
        <Text style={styles.title}>Your Carbon Footprint</Text>
        <CarbonChart />
        <CategoryBreakdown />
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  card: {
    padding: theme.spacing.md,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: theme.typography.h3,
    marginBottom: theme.spacing.md,
  },
});