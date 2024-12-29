import * as tf from '@tensorflow/tfjs';
import { ModelRegistry } from '../utils/modelRegistry';

export class FoodWastePredictor {
  constructor() {
    this.model = null;
  }

  async initialize() {
    this.model = await ModelRegistry.loadModel('food_waste_predictor');
  }

  async predictWasteRisk(groceryList) {
    const features = await this.extractFeatures(groceryList);
    const prediction = await this.model.predict(features);
    
    return {
      items: this.identifyHighRiskItems(groceryList, prediction),
      recommendations: await this.generatePreventionStrategies(prediction),
    };
  }

  private async extractFeatures(groceryList) {
    return tf.tidy(() => {
      const features = groceryList.map(item => [
        item.quantity,
        item.shelfLife,
        item.historicalWasteRate || 0,
        item.seasonality || 0.5,
      ]);
      
      return tf.tensor2d(features);
    });
  }

  private identifyHighRiskItems(groceryList, prediction) {
    const riskScores = prediction.dataSync();
    
    return groceryList
      .map((item, index) => ({
        ...item,
        riskScore: riskScores[index],
      }))
      .filter(item => item.riskScore > 0.7)
      .sort((a, b) => b.riskScore - a.riskScore);
  }

  private async generatePreventionStrategies(prediction) {
    const strategies = [];
    const riskScores = prediction.dataSync();
    
    if (Math.max(...riskScores) > 0.8) {
      strategies.push({
        type: 'portion_control',
        message: 'Consider buying smaller quantities',
        priority: 'high',
      });
    }

    if (riskScores.filter(score => score > 0.6).length > 3) {
      strategies.push({
        type: 'meal_planning',
        message: 'Create a detailed meal plan for the week',
        priority: 'medium',
      });
    }

    return strategies;
  }
}