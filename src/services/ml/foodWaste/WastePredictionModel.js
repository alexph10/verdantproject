import * as tf from '@tensorflow/tfjs';
import { ModelRegistry } from '../../utils/modelRegistry';

export class WastePredictionModel {
  constructor() {
    this.model = null;
  }

  async initialize() {
    try {
      this.model = await ModelRegistry.loadModel('food_waste_predictor');
    } catch (error) {
      console.error('Error initializing waste prediction model:', error);
      throw error;
    }
  }

  async predictWasteRisk(foodItems) {
    const features = this.extractFeatures(foodItems);
    const predictions = await this.model.predict(features);
    
    return {
      riskScores: this.processRiskScores(predictions),
      recommendations: this.generateRecommendations(predictions),
    };
  }

  private extractFeatures(foodItems) {
    return tf.tidy(() => {
      const features = foodItems.map(item => [
        this.normalizeQuantity(item.quantity),
        this.normalizeShelfLife(item.expiryDate),
        item.previousWasteRate || 0,
        this.calculateSeasonality(item.category),
        this.encodeStorageMethod(item.storageMethod),
      ]);
      
      return tf.tensor2d(features);
    });
  }

  private normalizeQuantity(quantity) {
    // Normalize quantity to [0,1] range
    return Math.min(quantity / 1000, 1);
  }

  private normalizeShelfLife(expiryDate) {
    const daysUntilExpiry = (new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.min(daysUntilExpiry / 30, 1));
  }

  private calculateSeasonality(category) {
    const currentMonth = new Date().getMonth();
    const seasonalityMap = {
      produce: [
        [0, 1, 2], // Spring
        [3, 4, 5], // Summer
        [6, 7, 8], // Fall
        [9, 10, 11], // Winter
      ],
    };

    const seasons = seasonalityMap[category] || [];
    const currentSeason = Math.floor(currentMonth / 3);
    return seasons[currentSeason]?.includes(currentMonth) ? 1 : 0;
  }

  private encodeStorageMethod(method) {
    const methodMap = {
      refrigerated: 1,
      frozen: 0.8,
      roomTemp: 0.6,
      other: 0.4,
    };
    return methodMap[method] || 0.5;
  }

  private processRiskScores(predictions) {
    const scores = predictions.dataSync();
    return Array.from(scores).map(score => ({
      riskLevel: this.getRiskLevel(score),
      probability: score,
    }));
  }

  private getRiskLevel(score) {
    if (score > 0.7) return 'high';
    if (score > 0.4) return 'medium';
    return 'low';
  }

  private generateRecommendations(predictions) {
    const scores = predictions.dataSync();
    const recommendations = [];

    if (Math.max(...scores) > 0.7) {
      recommendations.push({
        type: 'storage',
        priority: 'high',
        message: 'Consider freezing items to extend shelf life',
      });
    }

    if (scores.filter(s => s > 0.5).length > 2) {
      recommendations.push({
        type: 'planning',
        priority: 'medium',
        message: 'Create a meal plan to use high-risk items',
      });
    }

    return recommendations;
  }
}