import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { theme } from '../../theme';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'climate', label: 'Climate' },
  { id: 'energy', label: 'Energy' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'food', label: 'Food' },
  { id: 'tech', label: 'Green Tech' },
];

export function CategoryFilter({ selected, onSelect }) {
  const toggleCategory = (categoryId) => {
    if (categoryId === 'all') {
      onSelect(['all']);
    } else {
      const newSelected = selected.includes(categoryId)
        ? selected.filter(id => id !== categoryId)
        : [...selected.filter(id => id !== 'all'), categoryId];
      onSelect(newSelected.length ? newSelected : ['all']);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {CATEGORIES.map(category => (
        <Chip
          key={category.id}
          selected={selected.includes(category.id)}
          onPress={() => toggleCategory(category.id)}
          style={styles.chip}
        >
          {category.label}
        </Chip>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm,
  },
  chip: {
    marginRight: theme.spacing.sm,
  },
});