import { getRegionalEmissionFactors } from '../../api/emissionsApi';

export class EmissionsPredictor {
  async predictEmissions(tripData) {
    const { distance, mode, region } = tripData;
    const factors = await getRegionalEmissionFactors(region);
    
    return {
      emissions: this.calculateEmissions(distance, mode, factors),
      confidence: this.calculateConfidence(tripData),
      alternatives: await this.suggestAlternatives(tripData, factors),
    };
  }

  private calculateEmissions(distance, mode, factors) {
    const emissionFactor = factors[mode] || factors.default;
    return distance * emissionFactor;
  }

  private calculateConfidence(tripData) {
    // Consider factors like GPS accuracy, consistent speed patterns
    const { gpsAccuracy, speedVariance } = tripData;
    let confidence = 1.0;
    
    if (gpsAccuracy > 20) confidence *= 0.8;
    if (speedVariance > 5) confidence *= 0.9;
    
    return confidence;
  }

  private async suggestAlternatives(tripData, factors) {
    const { distance, mode } = tripData;
    const alternatives = [];
    
    for (const [altMode, factor] of Object.entries(factors)) {
      if (altMode === mode) continue;
      
      alternatives.push({
        mode: altMode,
        emissions: distance * factor,
        savings: distance * (factors[mode] - factor),
      });
    }
    
    return alternatives.sort((a, b) => b.savings - a.savings);
  }
}