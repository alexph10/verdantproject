import { calculateResourceImpact } from '../utils/resourceCalculator';
import { storeFoodWasteData } from '../storage/foodWasteStorage';
import { getStorageTips } from '../utils/storageTipsGenerator';
import { generateMealPlan } from '../utils/mealPlanGenerator';

export class FoodWasteTracker {
  async logWastedFood(foodItem) {
    try {
      const impact = await calculateResourceImpact(foodItem);
      const storageTips = await getStorageTips(foodItem.category);
      
      const wasteRecord = {
        ...foodItem,
        impact,
        storageTips,
        timestamp: Date.now(),
      };

      await storeFoodWasteData(wasteRecord);
      return wasteRecord;
    } catch (error) {
      console.error('Error logging food waste:', error);
      throw error;
    }
  }

  async getWasteAnalysis(timeframe = 'month') {
    try {
      const wasteData = await this.getWasteHistory(timeframe);
      
      return {
        totalWaste: this.calculateTotalWaste(wasteData),
        resourceImpact: this.calculateResourceImpact(wasteData),
        commonItems: this.identifyCommonItems(wasteData),
        trends: this.analyzeTrends(wasteData),
        recommendations: await this.generateRecommendations(wasteData),
      };
    } catch (error) {
      console.error('Error analyzing waste:', error);
      throw error;
    }
  }

  async generateMealPlan(preferences) {
    try {
      const wasteHistory = await this.getWasteHistory('month');
      return await generateMealPlan(preferences, wasteHistory);
    } catch (error) {
      console.error('Error generating meal plan:', error);
      throw error;
    }
  }

  private calculateTotalWaste(wasteData) {
    return wasteData.reduce((total, item) => total + item.weight, 0);
  }

  private calculateResourceImpact(wasteData) {
    return wasteData.reduce((total, item) => ({
      water: total.water + item.impact.water,
      land: total.land + item.impact.land,
      emissions: total.emissions + item.impact.emissions,
    }), { water: 0, land: 0, emissions: 0 });
  }

  private identifyCommonItems(wasteData) {
    const itemCounts = {};
    wasteData.forEach(item => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
    });

    return Object.entries(itemCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  }

  private analyzeTrends(wasteData) {
    const weeklyTotals = this.calculateWeeklyTotals(wasteData);
    return {
      trend: this.calculateTrend(weeklyTotals),
      seasonalPatterns: this.identifySeasonalPatterns(wasteData),
    };
  }

  private async generateRecommendations(wasteData) {
    const commonItems = this.identifyCommonItems(wasteData);
    const recommendations = [];

    for (const item of commonItems) {
      recommendations.push({
        item: item.name,
        storageTips: await getStorageTips(item.name),
        alternatives: await this.findAlternatives(item.name),
      });
    }

    return recommendations;
  }
}