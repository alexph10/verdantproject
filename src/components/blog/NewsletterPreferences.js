import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Switch, Button } from 'react-native-paper';
import { Heading, Text } from '../typography';
import { theme } from '../../theme';

export function NewsletterPreferences() {
  const [preferences, setPreferences] = useState({
    frequency: 'weekly',
    format: 'rich',
    categories: ['climate', 'lifestyle'],
  });

  return (
    <Surface style={styles.container}>
      <Heading level={2}>Newsletter Preferences</Heading>
      
      <View style={styles.section}>
        <Text variant="bodyLarge">Delivery Frequency</Text>
        <View style={styles.options}>
          <Button
            mode={preferences.frequency === 'daily' ? 'contained' : 'outlined'}
            onPress={() => setPreferences({ ...preferences, frequency: 'daily' })}
          >
            Daily
          </Button>
          <Button
            mode={preferences.frequency === 'weekly' ? 'contained' : 'outlined'}
            onPress={() => setPreferences({ ...preferences, frequency: 'weekly' })}
          >
            Weekly
          </Button>
          <Button
            mode={preferences.frequency === 'monthly' ? 'contained' : 'outlined'}
            onPress={() => setPreferences({ ...preferences, frequency: 'monthly' })}
          >
            Monthly
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="bodyLarge">Format Preferences</Text>
        <View style={styles.switchOption}>
          <Text>Include Infographics</Text>
          <Switch
            value={preferences.format === 'rich'}
            onValueChange={(value) =>
              setPreferences({ ...preferences, format: value ? 'rich' : 'text' })
            }
          />
        </View>
      </View>

      <Button
        mode="contained"
        onPress={() => {/* Save preferences */}}
        style={styles.saveButton}
      >
        Save Preferences
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    margin: theme.spacing.md,
    borderRadius: theme.spacing.sm,
  },
  section: {
    marginVertical: theme.spacing.md,
  },
  options: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  saveButton: {
    marginTop: theme.spacing.lg,
  },
});