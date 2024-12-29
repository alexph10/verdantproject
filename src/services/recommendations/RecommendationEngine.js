import { EmissionsAnalyzer } from '../analysis/EmissionsAnalyzer';
import { DatabaseService } from '../storage/DatabaseService';
import { EMISSION_FACTORS } from '../emissions/constants';

export class RecommendationEngine {
  constructor() {
    this.emissionsAnalyzer = new EmissionsAnalyzer();
    this.databaseService = new DatabaseService();
  }

  async generateRecommendations(userId) {
    const userData = await this.getUserData(userId);
    const analysis = this.emissionsAnalyzer.analyzeEmissionsTrend(userData.emissions);
    
    return {
      immediate: this.getImmediateActions(analysis),
      longTerm: this.getLongTermActions(analysis),
      impact: this.calculatePotentialImpact(analysis),
    };
  }

  private async getUserData(userId) {
    const timeframe = {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
      end: new Date(),
    };
    
    return await this.databaseService.getUserEmissions(userId, timeframe);
  }

  private getImmediateActions(analysis) {
    const actions = [];
    const { categories, trend } = analysis;

    // Transport recommendations
    if (categories.transport > 100) {
      actions.push({
        type: 'transport',
        title: 'Switch to public transport',
        description: 'Using public transport can reduce your emissions by up to 70%',
        impact: categories.transport * 0.7,
        difficulty: 'medium',
      });
    }

    // Energy recommendations
    if (categories.energy > 200) {
      actions.push({
        type: 'energy',
        title: 'Optimize thermostat settings',
        description: 'Adjusting by 1°C can save 10% on heating/cooling emissions',
        impact: categories.energy * 0.1,
        difficulty: 'easy',
      });
    }

    return actions;
  }

  private getLongTermActions(analysis) {
    const actions = [];
    const { categories } = analysis;

    if (categories.energy > 500) {
      actions.push({
        type: 'energy',
        title: 'Install solar panels',
        description: 'Generate your own clean energy',
        impact: categories.energy * 0.9,
        difficulty: 'hard',
        timeframe: '1-2 years',
      });
    }

    return actions;
  }

  private calculatePotentialImpact(analysis) {
    const immediateReduction = this.getImmediateActions(analysis)
      .reduce((total, action) => total + action.impact, 0);
      
    const longTermReduction = this.getLongTermActions(analysis)
      .reduce((total, action) => total + action.impact, 0);

    return {
      immediate: immediateReduction,
      longTerm: longTermReduction,
      total: immediateReduction + longTermReduction,
    };
  }
}