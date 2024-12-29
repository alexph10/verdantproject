import { analyzePatterns } from '../../utils/patternAnalysis';

export class BehaviorAnalyzer {
  async analyzeCommutePatterns(userHistory) {
    const patterns = await analyzePatterns(userHistory);
    
    return {
      routineCommutes: this.identifyRoutineCommutes(patterns),
      modeSwitchingTriggers: this.identifyModeSwitchTriggers(patterns),
      sustainabilityScore: this.calculateSustainabilityScore(patterns),
      recommendations: await this.generateRecommendations(patterns),
    };
  }

  private identifyRoutineCommutes(patterns) {
    return patterns.trips
      .filter(trip => trip.frequency > 0.6) // 60% or more days
      .map(trip => ({
        ...trip,
        potentialAlternatives: this.suggestAlternatives(trip),
      }));
  }

  private identifyModeSwitchTriggers(patterns) {
    const triggers = [];
    
    // Weather impact
    if (patterns.weatherCorrelation > 0.7) {
      triggers.push({
        type: 'weather',
        impact: patterns.weatherCorrelation,
        suggestion: this.generateWeatherStrategy(patterns),
      });
    }
    
    // Time constraints
    if (patterns.timeConstraintImpact > 0.5) {
      triggers.push({
        type: 'time',
        impact: patterns.timeConstraintImpact,
        suggestion: this.generateTimeStrategy(patterns),
      });
    }
    
    return triggers;
  }

  private calculateSustainabilityScore(patterns) {
    const weights = {
      lowEmissionModeShare: 0.4,
      consistentBehavior: 0.3,
      improvementTrend: 0.3,
    };
    
    return (
      patterns.lowEmissionModeShare * weights.lowEmissionModeShare +
      patterns.consistentBehavior * weights.consistentBehavior +
      patterns.improvementTrend * weights.improvementTrend
    );
  }

  private async generateRecommendations(patterns) {
    const recommendations = [];
    
    if (patterns.lowEmissionModeShare < 0.3) {
      recommendations.push({
        type: 'mode_shift',
        priority: 'high',
        suggestion: 'Consider cycling for trips under 5km',
        potentialImpact: this.calculatePotentialImpact(patterns, 'cycling'),
      });
    }
    
    if (patterns.peakHourTravel > 0.7) {
      recommendations.push({
        type: 'time_shift',
        priority: 'medium',
        suggestion: 'Shift non-essential trips to off-peak hours',
        potentialImpact: this.calculatePotentialImpact(patterns, 'time_shift'),
      });
    }
    
    return recommendations;
  }
}