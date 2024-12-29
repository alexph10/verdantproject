import { TokenClassifier } from './models/TokenClassifier';
import { SentimentAnalyzer } from './models/SentimentAnalyzer';
import { EntityRecognizer } from './models/EntityRecognizer';

export class NLPProcessor {
  constructor() {
    this.tokenClassifier = new TokenClassifier();
    this.sentimentAnalyzer = new SentimentAnalyzer();
    this.entityRecognizer = new EntityRecognizer();
  }

  async analyzeSustainabilityContent(texts) {
    const results = await Promise.all(texts.map(async text => {
      const tokens = await this.tokenClassifier.classify(text);
      const sentiment = await this.sentimentAnalyzer.analyze(text);
      const entities = await this.entityRecognizer.extract(text);

      return {
        sustainabilityScore: this.calculateSustainabilityScore(tokens, sentiment),
        environmentalClaims: this.extractEnvironmentalClaims(tokens, entities),
        certifications: this.extractCertifications(entities),
        confidence: this.calculateConfidence(tokens, sentiment),
      };
    }));

    return this.aggregateResults(results);
  }

  async extractMaterialComposition(texts) {
    const materials = [];

    for (const text of texts) {
      const entities = await this.entityRecognizer.extract(text);
      const materialEntities = entities.filter(e => e.type === 'MATERIAL');

      for (const material of materialEntities) {
        const percentage = this.extractPercentage(text, material);
        if (percentage) {
          materials.push({
            type: material.text,
            percentage,
            confidence: material.confidence,
          });
        }
      }
    }

    return this.normalizeMaterialComposition(materials);
  }

  private calculateSustainabilityScore(tokens, sentiment) {
    const environmentalTokens = tokens.filter(t => 
      t.category === 'ENVIRONMENTAL' || t.category === 'SUSTAINABILITY'
    );

    const tokenScore = environmentalTokens.length / tokens.length;
    const sentimentScore = (sentiment.score + 1) / 2; // Normalize to [0,1]

    return (tokenScore * 0.7 + sentimentScore * 0.3);
  }

  private extractEnvironmentalClaims(tokens, entities) {
    return entities
      .filter(e => e.type === 'CLAIM')
      .map(claim => ({
        text: claim.text,
        confidence: claim.confidence,
        sentiment: this.sentimentAnalyzer.analyze(claim.text),
        supportingTokens: this.findSupportingTokens(tokens, claim),
      }));
  }

  private normalizeMaterialComposition(materials) {
    const total = materials.reduce((sum, m) => sum + m.percentage, 0);
    
    if (Math.abs(total - 100) > 0.1) {
      // Normalize percentages to sum to 100
      return materials.map(m => ({
        ...m,
        percentage: (m.percentage / total) * 100,
      }));
    }

    return materials;
  }
}