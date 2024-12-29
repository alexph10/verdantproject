import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Display, Text } from '../typography';
import { theme } from '../../theme';

export function BlogHeader() {
  return (
    <View style={styles.container}>
      <Display size={1} color="primary">Verdant Journal</Display>
      <Text 
        variant="bodyLarge" 
        color="textSecondary"
        style={styles.subtitle}
      >
        Insights for sustainable living
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
});