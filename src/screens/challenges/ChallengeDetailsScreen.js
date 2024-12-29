import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Title, Surface } from 'react-native-paper';
import { ChallengeService } from '../../services/challenges/ChallengeService';
import { DailyTask } from '../../components/challenges/DailyTask';
import { ImpactMetrics } from '../../components/challenges/ImpactMetrics';
import { theme } from '../../theme';

export function ChallengeDetailsScreen({ route }) {
  const { challengeId } = route.params;
  const [challenge, setChallenge] = useState(null);
  const challengeService = new ChallengeService();

  useEffect(() => {
    loadChallenge();
  }, [challengeId]);

  const loadChallenge = async () => {
    try {
      const data = await challengeService.getActiveChallenge(challengeId);
      setChallenge(data);
    } catch (error) {
      console.error('Error loading challenge:', error);
    }
  };

  const handleTaskComplete = async (taskId) => {
    try {
      const progress = await challengeService.updateProgress(
        challengeId,
        taskId,
        { completed: true }
      );
      setChallenge(prev => ({
        ...prev,
        progress: progress.progress,
        impact: progress.impact,
      }));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (!challenge) return null;

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <Title>{challenge.title}</Title>
        <ImpactMetrics impact={challenge.impact} />
      </Surface>

      {challenge.dailyTasks.map(task => (
        <DailyTask
          key={task.id}
          task={task}
          onComplete={handleTaskComplete}
          onAddNote={(taskId) => {/* Implement note adding */}}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
});