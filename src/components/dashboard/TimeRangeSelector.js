import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../typography';
import { theme } from '../../theme';

const timeRanges = [
  { id: 'year', label: 'Last Year' },
  { id: 'custom', label: 'Custom range data' },
  { id: 'month', label: 'Last month' },
];

export function TimeRangeSelector({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {timeRanges.map(range => (
        <TouchableOpacity
          key={range.id}
          onPress={() => onSelect(range.id)}
          style={[
            styles.option,
            selected === range.id && styles.activeOption
          ]}
        >
          <Text
            style={[
              styles.text,
              selected === range.id && styles.activeText
            ]}
          >
            {range.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  option: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.small,
  },
  activeOption: {
    backgroundColor: theme.colors.primary,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.sm,
  },
  activeText: {
    color: theme.colors.surface,
  },
});