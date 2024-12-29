import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import { Text } from '../../typography';
import { theme } from '../../../theme';

export function RecommendationsList({ recommendations }) {
  return (
    <View style={styles.container}>
      <Text variant="h3" style={styles.title}>Recommended Improvements</Text>

      {recommendations.map((rec, index) => (
        <List.Item
          key={index}
          title={rec.title}
          description={rec.description}
          left={props => (
            <IconButton
              {...props}
              icon={getRecommendationIcon(rec.type)}
              color={theme.colors.primary}
            />
          )}
          right={props => (
            <View style={styles.savingsContainer}>
              <Text variant="caption">Potential Savings</Text>
              <Text variant="bodyLarge" style={styles.savings}>
                ${rec.savings}/year
              </Text>
            </View>
          )}
          style={styles.listItem}
        />
      ))}
    </View>
  );
}

function getRecommendationIcon(type) {
  switch (type) {
    case 'hvac': return 'air-conditioner';
    case 'lighting': return 'lightbulb';
    case 'water': return 'water';
    case 'appliance': return 'washing-machine';
    default: return 'home';
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.md,
  },
  listItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.sm,
  },
  savingsContainer: {
    alignItems: 'flex-end',
  },
  savings: {
    color: theme.colors.success,
  },
});