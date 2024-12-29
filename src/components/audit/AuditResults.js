import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../../theme';
import { RecommendationsList } from './RecommendationsList';
import { SavingsMetrics } from './SavingsMetrics';

export function AuditResults({ energyResults, waterResults }) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Energy Usage</Title>
          <Paragraph>
            Current Usage: {energyResults.currentUsage} kWh/month
          </Paragraph>
          <Paragraph>
            CO2 Emissions: {energyResults.emissions} kg/month
          </Paragraph>
          <SavingsMetrics
            energy={energyResults.potentialSavings}
            type="energy"
          />
          <RecommendationsList
            recommendations={energyResults.recommendations}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Water Usage</Title>
          <Paragraph>
            Current Usage: {waterResults.currentUsage} L/month
          </Paragraph>
          <SavingsMetrics
            water={waterResults.potentialSavings}
            type="water"
          />
          <RecommendationsList
            recommendations={waterResults.recommendations}
          />
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  card: {
    marginBottom: theme.spacing.lg,
  },
});