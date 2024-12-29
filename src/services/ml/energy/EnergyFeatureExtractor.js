import * as tf from '@tensorflow/tfjs';

export class EnergyFeatureExtractor {
  extractFeatures(data) {
    return tf.tidy(() => {
      const timeFeatures = this.extractTimeFeatures();
      const environmentFeatures = this.extractEnvironmentFeatures(data);
      const applianceFeatures = this.extractApplianceFeatures(data);
      
      return tf.concat([timeFeatures, environmentFeatures, applianceFeatures], 1);
    });
  }

  private extractTimeFeatures() {
    const now = new Date();
    return tf.tensor2d([[
      now.getHours() / 24, // Normalize hour to [0,1]
      now.getDay() / 7,    // Normalize day to [0,1]
    ]]);
  }

  private extractEnvironmentFeatures(data) {
    return tf.tensor2d([[
      this.normalizeTemperature(data.temperature),
      this.normalizeHumidity(data.humidity),
      data.occupancy ? 1 : 0,
    ]]);
  }

  private extractApplianceFeatures(data) {
    const appliances = [
      'hvac',
      'waterHeater',
      'refrigerator',
      'dishwasher',
      'washingMachine',
      'dryer',
    ];
    
    const features = appliances.map(app => data[app]?.active ? 1 : 0);
    return tf.tensor2d([features]);
  }

  private normalizeTemperature(temp) {
    return (temp + 10) / 50; // Normalize to [0,1] for range -10°C to 40°C
  }

  private normalizeHumidity(humidity) {
    return humidity / 100; // Normalize to [0,1]
  }
}