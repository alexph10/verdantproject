import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../typography';
import { theme } from '../../theme';
import { supabase } from '../../services/config/supabaseClient';

export function RealTimeUpdates({ userId }) {
  const [latestEmissions, setLatestEmissions] = useState(null);

  useEffect(() => {
    // Subscribe to real-time emissions updates
    const subscription = supabase
      .channel('emissions_updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'emissions_data',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setLatestEmissions(payload.new);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  if (!latestEmissions) return null;

  return (
    <View style={styles.container}>
      <Text variant="h3">Latest Update</Text>
      <Text variant="bodyLarge">
        {latestEmissions.type}: {latestEmissions.emissions.toFixed(2)} kg CO2e
      </Text>
      <Text variant="caption" color="textSecondary">
        {new Date(latestEmissions.timestamp).toLocaleTimeString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.md,
  },
});