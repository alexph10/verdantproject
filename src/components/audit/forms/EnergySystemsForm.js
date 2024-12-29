import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Switch, Text } from 'react-native-paper';
import { theme } from '../../../theme';

export function EnergySystemsForm({ values, onChange }) {
  return (
    <View style={styles.container}>
      <TextInput
        label="HVAC System Type"
        value={values.hvacType}
        onChangeText={(value) => onChange('hvacType', value)}
        style={styles.input}
      />

      <TextInput
        label="Lighting Type"
        value={values.lightingType}
        onChangeText={(value) => onChange('lightingType', value)}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text>Smart Thermostat Installed</Text>
        <Switch
          value={values.hasSmartThermo}
          onValueChange={(value) => onChange('hasSmartThermo', value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
});