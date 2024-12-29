import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Text } from '../../typography';
import { theme } from '../../../theme';

export function SavingsEstimate({ savings }) {
  return (
    <View style={styles.container}>
      <Text variant="h3" style={styles.title}>Potential Annual Savings</Text>
      
      <View style={styles.cardsContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="h4">Energy</Text>
            <Text variant="bodyLarge" style={styles.savingsText}>
              {savings.energy.potential}%
            </Text>
            <Text variant="caption">Reduction Potential</Text>
            <Text variant="bodyLarge" style={styles.costText}>
              ${savings.energy.costSavings}/year
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="h4">Water</Text>
            <Text variant="bodyLarge" style={styles.savingsText}>
              {savings.water.potential}%
            </Text>
            <Text variant="caption">Reduction Potential</Text>
            <Text variant="bodyLarge" style={styles.costText}>
              ${savings.water.costSavings}/year
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.md,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  card: {
    flex: 1,
  },
  savingsText: {
    color: theme.colors.success,
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: theme.spacing.xs,
  },
  costText: {
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
  },
});