import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../theme';
import ChallengesList from '../components/challenges/ChallengesList';
import ActiveChallenge from '../components/challenges/ActiveChallenge';

export default function ChallengesScreen() {
  return (
    <ScrollView style={styles.container}>
      <ActiveChallenge />
      <Title style={styles.sectionTitle}>Available Challenges</Title>
      <ChallengesList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.h3,
    marginVertical: theme.spacing.md,
  },
});