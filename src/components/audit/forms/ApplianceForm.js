import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { theme } from '../../../theme';

export function ApplianceForm({ values, onChange }) {
  return (
    <View style={styles.container}>
      <TextInput
        label="Refrigerator Age (years)"
        value={values.applianceAges.refrigerator}
        onChangeText={(value) => onChange('applianceAges', {
          ...values.applianceAges,
          refrigerator: value
        })}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        label="Washer Age (years)"
        value={values.applianceAges.washer}
        onChangeText={(value) => onChange('applianceAges', {
          ...values.applianceAges,
          washer: value
        })}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        label="Dryer Age (years)"
        value={values.applianceAges.dryer}
        onChangeText={(value) => onChange('applianceAges', {
          ...values.applianceAges,
          dryer: value
        })}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        label="Dishwasher Age (years)"
        value={values.applianceAges.dishwasher}
        onChangeText={(value) => onChange('applianceAges', {
          ...values.applianceAges,
          dishwasher: value
        })}
        keyboardType="numeric"
        style={styles.input}
      />
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
});