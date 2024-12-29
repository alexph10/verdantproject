import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { theme } from '../../../theme';

export function HomeDetailsForm({ values, onChange, errors }) {
  return (
    <View style={styles.container}>
      <TextInput
        label="Home Size (sq ft)"
        value={values.homeSize}
        onChangeText={(value) => onChange('homeSize', value)}
        keyboardType="numeric"
        error={!!errors?.homeSize}
        style={styles.input}
      />
      {errors?.homeSize && (
        <HelperText type="error">{errors.homeSize}</HelperText>
      )}

      <TextInput
        label="Number of Occupants"
        value={values.occupants}
        onChangeText={(value) => onChange('occupants', value)}
        keyboardType="numeric"
        error={!!errors?.occupants}
        style={styles.input}
      />
      {errors?.occupants && (
        <HelperText type="error">{errors.occupants}</HelperText>
      )}

      <TextInput
        label="Building Age (years)"
        value={values.buildingAge}
        onChangeText={(value) => onChange('buildingAge', value)}
        keyboardType="numeric"
        error={!!errors?.buildingAge}
        style={styles.input}
      />
      {errors?.buildingAge && (
        <HelperText type="error">{errors.buildingAge}</HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  input: {
    marginBottom: theme.spacing.sm,
  },
});