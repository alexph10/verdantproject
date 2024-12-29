import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../typography';
import { ActionCard } from './ActionCard';
import { theme } from '../../theme';

export function RecommendationsList({ recommendations }) {
  const { immediate, longTerm, impact } = recommendations;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2">Recommended Actions</Text>
        <Text variant="bodyLarge" color="success">
          Potential impact: {impact.total.toFixed(1)} kg CO₂e
        </Text>
      </View>

      <View style={styles.section}>
        <Text variant="h3" style={styles.sectionTitle}>
          Immediate Actions
        </Text>
        {immediate.map((action, index) => (
          <ActionCard key={index} action={action} />
        ))}
      </View>

      <View style={styles.section}>
        <Text variant="h3" style={styles.sectionTitle}>
          Long-term Changes
        </Text>
        {longTerm.map((action, index) => (
          <ActionCard key={index} action={action} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
  },
});