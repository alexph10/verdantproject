import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { theme } from '../../../theme';

export function WaterSystemsForm({ values, onChange }) {
  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>Low-Flow Fixtures Installed</Text>
        <Switch
          value={values.hasLowFlowFixtures}
          onValueChange={(value) => onChange('hasLowFlowFixtures', value)}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text>Irrigation System Installed</Text>
        <Switch
          value={values.hasIrrigation}
          onValueChange={(value) => onChange('hasIrrigation', value)}
        />
      </View>

      {values.hasIrrigation && (
        <View style={styles.switchContainer}>
          <Text>Smart Irrigation Controller</Text>
          <Switch
            value={values.hasSmartIrrigation}
            onValueChange={(value) => onChange('hasSmartIrrigation', value)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
});