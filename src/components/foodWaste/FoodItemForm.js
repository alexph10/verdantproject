import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { theme } from '../../theme';

export function FoodItemForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    weight: '',
    reason: '',
  });

  const categories = [
    { label: 'Produce', value: 'produce' },
    { label: 'Dairy', value: 'dairy' },
    { label: 'Meat', value: 'meat' },
    { label: 'Pantry', value: 'pantry' },
  ];

  const reasons = [
    { label: 'Expired', value: 'expired' },
    { label: 'Spoiled', value: 'spoiled' },
    { label: 'Leftover', value: 'leftover' },
    { label: 'Too Much', value: 'excess' },
  ];

  return (
    <View style={styles.container}>
      <TextInput
        label="Food Item Name"
        value={formData.name}
        onChangeText={name => setFormData({ ...formData, name })}
        style={styles.input}
      />

      <SegmentedButtons
        value={formData.category}
        onValueChange={category => setFormData({ ...formData, category })}
        buttons={categories}
        style={styles.buttons}
      />

      <TextInput
        label="Weight (g)"
        value={formData.weight}
        onChangeText={weight => setFormData({ ...formData, weight })}
        keyboardType="numeric"
        style={styles.input}
      />

      <SegmentedButtons
        value={formData.reason}
        onValueChange={reason => setFormData({ ...formData, reason })}
        buttons={reasons}
        style={styles.buttons}
      />

      <Button
        mode="contained"
        onPress={() => onSubmit(formData)}
        loading={loading}
        disabled={loading}
        style={styles.submitButton}
      >
        Log Food Waste
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  buttons: {
    marginBottom: theme.spacing.md,
  },
  submitButton: {
    marginTop: theme.spacing.md,
  },
});