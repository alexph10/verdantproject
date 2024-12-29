import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { theme } from '../../theme';

export function ImpactMetrics({ impact }) {
  const { carbonReduction, waterSaved, wasteReduced } = impact;

  return (
    <View style={styles.container}>
      <View style={styles.metric}>
        <IconButton icon="molecule-co2" size={24} />
        <Text>{carbonReduction} kg CO₂e saved</Text>
      </View>

      <View style={styles.metric}>
        <IconButton icon="water" size={24} />
        <Text>{waterSaved} L water saved</Text>
      </View>

      <View style={styles.metric}>
        <IconButton icon="delete-outline" size={24} />
        <Text>{wasteReduced} kg waste reduced</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.md,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.xs,
  },
});