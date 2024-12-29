import * as tf from '@tensorflow/tfjs';

export class PredictionAnalyzer {
  calculateConfidence(prediction) {
    return tf.tidy(() => {
      const variance = prediction.square().mean().sub(prediction.mean().square());
      return 1 / (1 + variance.dataSync()[0]);
    });
  }

  calculateUncertainty(prediction) {
    return tf.tidy(() => {
      const stdDev = prediction.sub(prediction.mean()).square().mean().sqrt();
      return stdDev.dataSync()[0];
    });
  }

  getConfidenceLevel(confidence) {
    if (confidence > 0.8) return 'high';
    if (confidence > 0.5) return 'medium';
    return 'low';
  }
}