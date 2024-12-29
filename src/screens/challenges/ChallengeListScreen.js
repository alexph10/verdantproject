import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { ChallengeRecommender } from '../../services/challenges/ChallengeRecommender';
import { ChallengeCard } from '../../components/challenges/ChallengeCard';
import { ChallengeFilters } from '../../components/challenges/ChallengeFilters';
import { useAuth } from '../../hooks/useAuth';
import { theme } from '../../theme';

export function ChallengeListScreen({ navigation }) {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    category: 'all',
    duration: 'all',
  });

  const { user } = useAuth();
  const recommender = new ChallengeRecommender();

  useEffect(() => {
    loadChallenges();
  }, [user]);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      const personalizedChallenges = await recommender.getPersonalizedChallenges({
        userId: user.id,
        interests: user.interests,
        completedChallenges: user.completedChallenges,
        location: user.location,
      });

      setChallenges(personalizedChallenges);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    return (
      (filters.difficulty === 'all' || challenge.difficulty === filters.difficulty) &&
      (filters.category === 'all' || challenge.category === filters.category) &&
      (filters.duration === 'all' || challenge.duration === filters.duration)
    );
  });

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.filtersContainer}>
        <ChallengeFilters
          filters={filters}
          onFilterChange={setFilters}
        />
      </Surface>

      {filteredChallenges.map(challenge => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          onPress={() => navigation.navigate('ChallengeDetails', {
            challengeId: challenge.id,
          })}
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
  filtersContainer: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
});