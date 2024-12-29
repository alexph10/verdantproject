import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, ProgressBar } from 'react-native-paper';
import { theme } from '../../theme';
import { ImpactMetrics } from './ImpactMetrics';

export function ChallengeCard({ challenge, onPress }) {
  const {
    title,
    description,
    duration,
    difficulty,
    progress,
    impact,
    category,
  } = challenge;

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{description}</Paragraph>
        
        <View style={styles.metadataContainer}>
          <Paragraph>Duration: {duration} days</Paragraph>
          <Paragraph>Difficulty: {difficulty}</Paragraph>
          <Paragraph>Category: {category}</Paragraph>
        </View>

        <ProgressBar
          progress={progress}
          color={theme.colors.primary}
          style={styles.progressBar}
        />

        <ImpactMetrics impact={impact} />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
  },
  metadataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.sm,
  },
  progressBar: {
    marginVertical: theme.spacing.sm,
  },
});