import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { theme } from '../../../theme';

export function TrackingButton({ isTracking, onToggle }) {
  return (
    <Button
      mode="contained"
      onPress={onToggle}
      style={styles.button}
      icon={isTracking ? 'stop' : 'play'}
    >
      {isTracking ? 'Stop Tracking' : 'Start Tracking'}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: theme.spacing.md,
  },
});