import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Surface, Title, Button } from 'react-native-paper';
import { EnergyAuditService } from '../../services/audit/EnergyAuditService';
import { WaterAuditService } from '../../services/audit/WaterAuditService';
import { AuditForm } from '../../components/audit/AuditForm';
import { AuditResults } from '../../components/audit/AuditResults';
import { theme } from '../../theme';

export function HomeAuditScreen() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  
  const energyAuditService = new EnergyAuditService();
  const waterAuditService = new WaterAuditService();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      
      const [energyAudit, waterAudit] = await Promise.all([
        energyAuditService.performAudit(formData),
        waterAuditService.performAudit(formData),
      ]);

      setResults({
        energy: energyAudit,
        water: waterAudit,
      });
    } catch (error) {
      console.error('Audit error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <Title>Home Resource Audit</Title>
      </Surface>

      <AuditForm onSubmit={handleSubmit} loading={loading} />

      {results && (
        <AuditResults
          energyResults={results.energy}
          waterResults={results.water}
        />
      )}

      {results && (
        <Button
          mode="contained"
          onPress={() => {/* Implement saving/sharing */}}
          style={styles.actionButton}
        >
          Save & Share Results
        </Button>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    margin: theme.spacing.lg,
  },
});