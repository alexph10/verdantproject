import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { theme } from '../../../theme';

const TRANSPORT_MODES = [
  { id: 'walking', label: 'Walking', icon: 'walk' },
  { id: 'cycling', label: 'Cycling', icon: 'bike' },
  { id: 'bus', label: 'Bus', icon: 'bus' },
  { id: 'train', label: 'Train', icon: 'train' },
];

export function TransportModeSelector({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {TRANSPORT_MODES.map(mode => (
        <Chip
          key={mode.id}
          selected={selected === mode.id}
          onPress={() => onSelect(mode.id)}
          icon={mode.icon}
          style={styles.chip}
        >
          {mode.label}
        </Chip>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    marginBottom: theme.spacing.xs,
  },
});