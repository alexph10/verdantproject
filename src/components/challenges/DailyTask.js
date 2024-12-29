import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Checkbox, Text, Button } from 'react-native-paper';
import { theme } from '../../theme';

export function DailyTask({ task, onComplete, onAddNote }) {
  const { title, description, completed, tips } = task;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Checkbox
            status={completed ? 'checked' : 'unchecked'}
            onPress={() => onComplete(task.id)}
          />
          <Text style={styles.title}>{title}</Text>
        </View>

        <Text style={styles.description}>{description}</Text>

        {tips && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Expert Tips:</Text>
            {tips.map((tip, index) => (
              <Text key={index} style={styles.tip}>• {tip}</Text>
            ))}
          </View>
        )}

        <Button
          mode="outlined"
          onPress={() => onAddNote(task.id)}
          style={styles.noteButton}
        >
          Add Note
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.sizes.h4,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: theme.spacing.sm,
  },
  tipsContainer: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.spacing.xs,
  },
  tipsTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  tip: {
    marginVertical: theme.spacing.xs,
  },
  noteButton: {
    marginTop: theme.spacing.md,
  },
});