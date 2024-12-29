import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Surface, Title, Button } from 'react-native-paper';
import { FoodWasteTracker } from '../../services/foodWaste/FoodWasteTracker';
import { FoodItemForm } from '../../components/foodWaste/FoodItemForm';
import { WasteAnalytics } from '../../components/foodWaste/WasteAnalytics';
import { StorageTips } from '../../components/foodWaste/StorageTips';
import { theme } from '../../theme';

export function FoodWasteLogScreen() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  
  const wasteTracker = new FoodWasteTracker();

  const handleLogFood = async (foodItem) => {
    try {
      setLoading(true);
      const result = await wasteTracker.logWastedFood(foodItem);
      const newAnalysis = await wasteTracker.getWasteAnalysis();
      setAnalysis(newAnalysis);
    } catch (error) {
      console.error('Error logging food waste:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <Title>Food Waste Log</Title>
      </Surface>

      <FoodItemForm onSubmit={handleLogFood} loading={loading} />

      {analysis && (
        <>
          <WasteAnalytics analysis={analysis} />
          <StorageTips items={analysis.commonItems} />
          
          <Button
            mode="contained"
            onPress={() => {/* Navigate to meal planning */}}
            style={styles.planButton}
          >
            Generate Meal Plan
          </Button>
        </>
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
  planButton: {
    margin: theme.spacing.lg,
  },
});