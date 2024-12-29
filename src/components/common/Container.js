import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export function Container({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.layout.container,
    backgroundColor: theme.colors.background,
  },
});