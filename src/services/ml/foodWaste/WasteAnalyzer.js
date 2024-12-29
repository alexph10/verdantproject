import { analyzePatterns } from '../../utils/patternAnalysis';
import { calculateResourceImpact } from '../../utils/resourceCalculator';

export class WasteAnalyzer {
  async analyzeWastePatterns(wasteHistory) {
    const patterns = await analyzePatterns(wasteHistory);
    const impact = await this.calculateCumulativeImpact(wasteHistory);
    
    return {
      patterns: this.identifyPatterns(patterns),
      impact,
      recommendations: await this.generateRecommendations(patterns),
      trends: this.analyzeTrends(wasteHistory),
    };
  }

  private identifyPatterns(patterns) {
    return {
      commonItems: this.findCommonItems(patterns),
      timePatterns: this.findTimePatterns(patterns),
      behavioralTriggers: this.identifyTriggers(patterns),
    };
  }

  private findCommonItems(patterns) {
    return patterns.items
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5)
      .map(item => ({
        ...item,
        wasteReason: this.analyzeWasteReason(item),
        preventionStrategy: this.suggestPrevention(item),
      }));
  }

  private findTimePatterns(patterns) {
    return {
      weeklyPeaks: this.identifyWeeklyPeaks(patterns),
      seasonalTrends: this.identifySeasonalTrends(patterns),
      shoppingCorrelation: this.analyzeShoppingPatterns(patterns),
    };
  }

  private identifyTriggers(patterns) {
    const triggers = [];
    
    if (patterns.overbuying > 0.6) {
      triggers.push({
        type: 'shopping_behavior',
        confidence: patterns.overbuying,
        suggestion: 'Create a shopping list and stick to it',
      });
    }
    
    if (patterns.improperStorage > 0.4) {
      triggers.push({
        type: 'storage_method',
        confidence: patterns.improperStorage,
        suggestion: 'Review proper storage guidelines for common items',
      });
    }
    
    return triggers;
  }

  private async calculateCumulativeImpact(wasteHistory) {
    const impacts = await Promise.all(
      wasteHistory.map(item => calculateResourceImpact(item))
    );
    
    return impacts.reduce((total, impact) => ({
      water: total.water + impact.water,
      land: total.land + impact.land,
      emissions: total.emissions + impact.emissions,
      cost: total.cost + impact.cost,
    }), { water: 0, land: 0, emissions: 0, cost: 0 });
  }

  private async generateRecommendations(patterns) {
    const recommendations = [];
    
    if (patterns.overbuying > 0.6) {
      recommendations.push({
        type: 'shopping',
        priority: 'high',
        suggestion: 'Use a shopping list app to plan purchases',
        potentialImpact: this.calculatePotentialSavings(patterns, 'shopping'),
      });
    }
    
    if (patterns.improperStorage > 0.4) {
      recommendations.push({
        type: 'storage',
        priority: 'medium',
        suggestion: 'Implement a first-in-first-out system',
        potentialImpact: this.calculatePotentialSavings(patterns, 'storage'),
      });
    }
    
    return recommendations;
  }

  private analyzeTrends(wasteHistory) {
    const weeklyTotals = this.calculateWeeklyTotals(wasteHistory);
    const monthlyTotals = this.calculateMonthlyTotals(wasteHistory);
    
    return {
      weeklyTrend: this.calculateTrend(weeklyTotals),
      monthlyTrend: this.calculateTrend(monthlyTotals),
      improvement: this.calculateImprovement(monthlyTotals),
    };
  }

  private calculatePotentialSavings(patterns, improvementType) {
    const savingsFactors = {
      shopping: 0.3, // 30% reduction potential
      storage: 0.25, // 25% reduction potential
      planning: 0.2, // 20% reduction potential
    };
    
    const factor = savingsFactors[improvementType] || 0.2;
    return {
      weight: patterns.averageWaste * factor,
      cost: patterns.averageCost * factor,
      emissions: patterns.averageEmissions * factor,
    };
  }
}