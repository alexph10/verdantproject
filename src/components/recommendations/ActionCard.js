import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { Text } from '../typography';
import { theme } from '../../theme';

export function ActionCard({ action }) {
  const { type, title, description, impact, difficulty } = action;

  const getImpactColor = (impact) => {
    if (impact > 100) return theme.colors.success;
    if (impact > 50) return theme.colors.warning;
    return theme.colors.info;
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <IconButton
            icon={getActionIcon(type)}
            color={theme.colors.primary}
          />
          <View style={styles.titleContainer}>
            <Text variant="h3">{title}</Text>
            <Text variant="caption" color="textSecondary">
              {getDifficultyLabel(difficulty)}
            </Text>
          </View>
        </View>

        <Text variant="bodyLarge" style={styles.description}>
          {description}
        </Text>

        <View style={styles.impactContainer}>
          <Text variant="bodyLarge" style={{ color: getImpactColor(impact) }}>
            {impact.toFixed(1)} kg CO₂e potential reduction
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

function getActionIcon(type) {
  switch (type) {
    case 'transport': return 'car';
    case 'energy': return 'lightning-bolt';
    case 'shopping': return 'shopping';
    default: return 'earth';
  }
}

function getDifficultyLabel(difficulty) {
  switch (difficulty) {
    case 'easy': return '🟢 Easy to implement';
    case 'medium': return '🟡 Moderate effort';
    case 'hard': return '🔴 Requires planning';
    default: return '';
  }
}

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  titleContainer: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  description: {
    marginBottom: theme.spacing.md,
  },
  impactContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.sm,
  },
});