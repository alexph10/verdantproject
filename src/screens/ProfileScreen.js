import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, List, Surface } from 'react-native-paper';
import { theme } from '../theme';
import UserStats from '../components/profile/UserStats';
import AchievementsList from '../components/profile/AchievementsList';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <Avatar.Image
          size={80}
          source={require('../assets/default-avatar.png')}
        />
        <UserStats />
      </Surface>
      <AchievementsList />
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
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
});