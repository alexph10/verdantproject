import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../typography';
import { IconButton } from 'react-native-paper';
import { theme } from '../../theme';

export function EmissionAlerts({ alerts }) {
  if (!alerts?.length) return null;

  return (
    <View style={styles.container}>
      {alerts.map((alert, index) => (
        <View key={index} style={styles.alert}>
          <View style={styles.iconContainer}>
            <IconButton
              icon={alert.type === 'warning' ? 'alert' : 'information'}
              color={alert.type === 'warning' ? theme.colors.warning : theme.colors.info}
            />
          </View>
          <View style={styles.content}>
            <Text variant="bodyLarge" style={styles.title}>
              {alert.title}
            </Text>
            <Text variant="bodySmall" color="textSecondary">
              {alert.message}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.sm,
  },
  iconContainer: {
    marginRight: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
});