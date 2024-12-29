import * as tf from '@tensorflow/tfjs';
import { ModelLoader } from '../core/ModelLoader';
import { EnergyFeatureExtractor } from './EnergyFeatureExtractor';
import { PredictionAnalyzer } from '../core/PredictionAnalyzer';

export class EnergyPredictor {
  constructor() {
    this.model = null;
    this.featureExtractor = new EnergyFeatureExtractor();
    this.predictionAnalyzer = new PredictionAnalyzer();
  }

  async initialize() {
    if (!this.model) {
      this.model = await ModelLoader.loadModel('energy_predictor');
    }
  }

  async predict(data) {
    await this.initialize();

    const features = this.featureExtractor.extractFeatures(data);
    const prediction = await this.model.predict(features);
    
    return {
      predictedUsage: prediction.dataSync()[0],
      confidence: this.predictionAnalyzer.calculateConfidence(prediction),
      timestamp: Date.now(),
    };
  }
}