import { predictEnergyUsage } from '../ml/energyPredictor';
import { calculateEmissions } from '../utils/emissionsCalculator';
import { storeAuditData } from '../storage/auditStorage';

export class EnergyAuditService {
  async performAudit(auditData) {
    try {
      const prediction = await predictEnergyUsage(auditData);
      const emissions = calculateEmissions(prediction.predictedUsage, 'electricity');
      
      const recommendations = await this.generateRecommendations(auditData, prediction);
      const savings = this.calculatePotentialSavings(recommendations);

      const auditResult = {
        currentUsage: prediction.predictedUsage,
        emissions,
        recommendations,
        potentialSavings: savings,
        confidence: prediction.confidence,
        timestamp: Date.now(),
      };

      await storeAuditData('energy', auditResult);
      return auditResult;
    } catch (error) {
      console.error('Energy audit error:', error);
      throw error;
    }
  }

  async generateRecommendations(auditData, prediction) {
    const recommendations = [];

    // Analyze lighting
    if (auditData.lightingType !== 'LED') {
      recommendations.push({
        type: 'lighting',
        title: 'Switch to LED Bulbs',
        description: 'Replace traditional bulbs with LED alternatives',
        impact: {
          energySavings: 75, // kWh per year per bulb
          costSavings: 15, // $ per year per bulb
        },
        priority: 'high',
        implementation: 'easy',
      });
    }

    // Analyze HVAC
    if (prediction.hvacEfficiency < 0.8) {
      recommendations.push({
        type: 'hvac',
        title: 'HVAC Maintenance',
        description: 'Schedule regular HVAC maintenance to improve efficiency',
        impact: {
          energySavings: 120, // kWh per year
          costSavings: 25, // $ per year
        },
        priority: 'medium',
        implementation: 'medium',
      });
    }

    return recommendations;
  }

  calculatePotentialSavings(recommendations) {
    return recommendations.reduce(
      (total, rec) => ({
        energy: total.energy + rec.impact.energySavings,
        cost: total.cost + rec.impact.costSavings,
      }),
      { energy: 0, cost: 0 }
    );
  }
}