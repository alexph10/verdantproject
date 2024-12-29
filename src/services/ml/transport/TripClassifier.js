import * as tf from '@tensorflow/tfjs';
import { ModelRegistry } from '../../utils/modelRegistry';

export class TripClassifier {
  constructor() {
    this.model = null;
  }

  async initialize() {
    this.model = await ModelRegistry.loadModel('transport_classifier');
  }

  async classifyTransportMode(tripData) {
    const features = this.extractFeatures(tripData);
    const prediction = await this.model.predict(features);
    
    return {
      mode: this.getMostLikelyMode(prediction),
      confidence: this.getConfidence(prediction),
    };
  }

  private extractFeatures(tripData) {
    const { speeds, accelerations, stops } = tripData;
    
    return tf.tidy(() => {
      return tf.tensor2d([
        this.calculateAverageSpeed(speeds),
        this.calculateMaxSpeed(speeds),
        this.calculateAverageAcceleration(accelerations),
        this.calculateStopFrequency(stops),
        this.calculateDirectionChanges(tripData.coordinates),
      ]);
    });
  }

  private getMostLikelyMode(prediction) {
    const modes = ['walking', 'cycling', 'driving', 'public_transport'];
    const probabilities = prediction.dataSync();
    const maxIndex = probabilities.indexOf(Math.max(...probabilities));
    return modes[maxIndex];
  }

  private getConfidence(prediction) {
    const probabilities = prediction.dataSync();
    return Math.max(...probabilities);
  }
}