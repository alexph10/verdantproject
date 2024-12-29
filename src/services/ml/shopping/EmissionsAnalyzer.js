export class EmissionsAnalyzer {
  analyzeFactors(product) {
    const factors = [];
    
    this.analyzeTransportation(product, factors);
    this.analyzeMaterials(product, factors);
    this.analyzeCertifications(product, factors);
    
    return factors;
  }

  private analyzeTransportation(product, factors) {
    if (product.manufacturingDistance > 1000) {
      factors.push({
        factor: 'transportation',
        impact: 'high',
        suggestion: 'Consider local alternatives',
        score: this.calculateTransportationScore(product.manufacturingDistance),
      });
    }
  }

  private analyzeMaterials(product, factors) {
    const highImpactMaterials = ['plastic', 'metal'];
    if (highImpactMaterials.includes(product.material)) {
      factors.push({
        factor: 'material',
        impact: 'medium',
        suggestion: 'Look for recycled options',
        score: this.calculateMaterialScore(product.material),
      });
    }
  }

  private analyzeCertifications(product, factors) {
    if (!product.hasEcoLabel) {
      factors.push({
        factor: 'certification',
        impact: 'low',
        suggestion: 'Prefer certified eco-friendly products',
        score: 0.3,
      });
    }
  }

  private calculateTransportationScore(distance) {
    return Math.min(distance / 10000, 1); // Normalize to [0,1]
  }

  private calculateMaterialScore(material) {
    const materialScores = {
      plastic: 0.8,
      metal: 0.7,
      paper: 0.4,
      glass: 0.6,
    };
    return materialScores[material] || 0.5;
  }
}