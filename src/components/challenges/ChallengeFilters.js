import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { theme } from '../../theme';

export function ChallengeFilters({ filters, onFilterChange }) {
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
  const categories = ['all', 'energy', 'water', 'waste', 'transport', 'food'];
  const durations = ['all', '7days', '14days', '30days'];

  return (
    <View style={styles.container}>
      <View style={styles.filterGroup}>
        {difficulties.map(difficulty => (
          <Chip
            key={difficulty}
            selected={filters.difficulty === difficulty}
            onPress={() => onFilterChange({ ...filters, difficulty })}
            style={styles.chip}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Chip>
        ))}
      </View>

      <View style={styles.filterGroup}>
        {categories.map(category => (
          <Chip
            key={category}
            selected={filters.category === category}
            onPress={() => onFilterChange({ ...filters, category })}
            style={styles.chip}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Chip>
        ))}
      </View>

      <View style={styles.filterGroup}>
        {durations.map(duration => (
          <Chip
            key={duration}
            selected={filters.duration === duration}
            onPress={() => onFilterChange({ ...filters, duration })}
            style={styles.chip}
          >
            {duration === 'all' ? 'All Durations' : duration}
          </Chip>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  filterGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  chip: {
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
});