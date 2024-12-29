import { predictWaterUsage } from '../ml/waterPredictor';
import { storeAuditData } from '../storage/auditStorage';

export class WaterAuditService {
  async performAudit(auditData) {
    try {
      const prediction = await predictWaterUsage(auditData);
      const recommendations = await this.generateRecommendations(auditData);
      const savings = this.calculatePotentialSavings(recommendations);

      const auditResult = {
        currentUsage: prediction.predictedUsage,
        recommendations,
        potentialSavings: savings,
        confidence: prediction.confidence,
        timestamp: Date.now(),
      };

      await storeAuditData('water', auditResult);
      return auditResult;
    } catch (error) {
      console.error('Water audit error:', error);
      throw error;
    }
  }

  async generateRecommendations(auditData) {
    const recommendations = [];

    // Analyze fixtures
    if (!auditData.hasLowFlowFixtures) {
      recommendations.push({
        type: 'fixtures',
        title: 'Install Low-Flow Fixtures',
        description: 'Replace standard fixtures with low-flow alternatives',
        impact: {
          waterSavings: 15000, // Liters per year
          costSavings: 100, // $ per year
        },
        priority: 'high',
        implementation: 'easy',
      });
    }

    // Analyze irrigation
    if (auditData.hasIrrigation && !auditData.hasSmartIrrigation) {
      recommendations.push({
        type: 'irrigation',
        title: 'Smart Irrigation System',
        description: 'Install a smart irrigation controller',
        impact: {
          waterSavings: 30000, // Liters per year
          costSavings: 200, // $ per year
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
        water: total.water + rec.impact.waterSavings,
        cost: total.cost + rec.impact.costSavings,
      }),
      { water: 0, cost: 0 }
    );
  }
}