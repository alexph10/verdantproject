import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { Text, Heading } from '../typography';
import { theme } from '../../theme';

export function ArticleCard({
  title,
  excerpt,
  category,
  readTime,
  image,
  viewMode,
}) {
  return (
    <Card
      style={[
        styles.card,
        viewMode === 'grid' ? styles.gridCard : styles.listCard
      ]}
    >
      <Card.Cover source={{ uri: image }} />
      <Card.Content style={styles.content}>
        <Chip style={styles.category}>{category}</Chip>
        <Heading level={3}>{title}</Heading>
        <Text variant="bodyLarge" color="textSecondary">
          {excerpt}
        </Text>
        <Text variant="caption" style={styles.readTime}>
          {readTime} read
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  gridCard: {
    width: '48%',
  },
  listCard: {
    marginBottom: theme.spacing.md,
  },
  content: {
    padding: theme.spacing.md,
  },
  category: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  readTime: {
    marginTop: theme.spacing.sm,
  },
});