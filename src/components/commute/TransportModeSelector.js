import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { theme } from '../../theme';

const TRANSPORT_MODES = [
  { id: 'walking', label: 'Walking', icon: 'walk' },
  { id: 'cycling', label: 'Cycling', icon: 'bike' },
  { id: 'publicTransport', label: 'Public Transit', icon: 'bus' },
  { id: 'carpool', label: 'Carpool', icon: 'car-multiple' },
];

export function TransportModeSelector({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Transport Mode</Text>
      
      <View style={styles.chipsContainer}>
        {TRANSPORT_MODES.map(mode => (
          <Chip
            key={mode.id}
            icon={mode.icon}
            selected={selected === mode.id}
            onPress={() => onSelect(mode.id)}
            style={styles.chip}
          >
            {mode.label}
          </Chip>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.sm,
    color: theme.colors.textSecondary,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  chip: {
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
});