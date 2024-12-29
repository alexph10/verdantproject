import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Switch, Button } from 'react-native-paper';
import { theme } from '../../theme';

export function AuditForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    // Home Details
    homeSize: '',
    occupants: '',
    buildingAge: '',
    
    // Energy Systems
    hvacType: '',
    lightingType: '',
    hasSmartThermo: false,
    
    // Water Systems
    hasLowFlowFixtures: false,
    hasIrrigation: false,
    hasSmartIrrigation: false,
    
    // Appliances
    applianceAges: {
      refrigerator: '',
      washer: '',
      dryer: '',
      dishwasher: '',
    },
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Home Size (sq ft)"
        value={formData.homeSize}
        onChangeText={value => handleChange('homeSize', value)}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        label="Number of Occupants"
        value={formData.occupants}
        onChangeText={value => handleChange('occupants', value)}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Switch
          value={formData.hasSmartThermo}
          onValueChange={value => handleChange('hasSmartThermo', value)}
        />
        <Text>Smart Thermostat Installed</Text>
      </View>

      <View style={styles.switchContainer}>
        <Switch
          value={formData.hasLowFlowFixtures}
          onValueChange={value => handleChange('hasLowFlowFixtures', value)}
        />
        <Text>Low-Flow Fixtures Installed</Text>
      </View>

      <Button
        mode="contained"
        onPress={() => onSubmit(formData)}
        loading={loading}
        disabled={loading}
        style={styles.submitButton}
      >
        Start Audit
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  submitButton: {
    marginTop: theme.spacing.lg,
  },
});