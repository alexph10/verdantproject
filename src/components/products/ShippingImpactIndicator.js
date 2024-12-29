import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { theme } from '../../theme';

export function ShippingImpactIndicator({ impact }) {
  const { icon, label, color } = getImpactDetails(impact);

  return (
    <View style={styles.container}>
      <IconButton
        icon={icon}
        color={color}
        size={24}
      />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

function getImpactDetails(impact) {
  if (impact <= 0.3) {
    return {
      icon: 'leaf',
      label: 'Low Impact',
      color: theme.colors.success,
    };
  }
  if (impact <= 0.7) {
    return {
      icon: 'alert',
      label: 'Medium Impact',
      color: theme.colors.warning,
    };
  }
  return {
    icon: 'alert-circle',
    label: 'High Impact',
    color: theme.colors.error,
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xs,
  },
  label: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.caption,
  },
});