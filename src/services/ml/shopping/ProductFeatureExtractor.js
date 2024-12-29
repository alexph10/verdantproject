import * as tf from '@tensorflow/tfjs';

export class ProductFeatureExtractor {
  extractFeatures(product) {
    return tf.tidy(() => {
      const materialFeatures = this.encodeMaterial(product.material);
      const categoryFeatures = this.encodeCategory(product.category);
      const metricFeatures = this.extractMetricFeatures(product);
      const packagingFeatures = this.encodePackaging(product.packaging);
      
      return tf.concat([
        materialFeatures,
        categoryFeatures,
        metricFeatures,
        packagingFeatures,
      ], 1);
    });
  }

  private encodeMaterial(material) {
    const materialMap = {
      plastic: 0.8,
      paper: 0.4,
      glass: 0.6,
      metal: 0.7,
      organic: 0.2,
      textile: 0.5,
    };
    return tf.tensor2d([[materialMap[material] || 0.5]]);
  }

  private encodeCategory(category) {
    const categoryMap = {
      food: 0.3,
      electronics: 0.9,
      clothing: 0.5,
      furniture: 0.7,
      cosmetics: 0.4,
    };
    return tf.tensor2d([[categoryMap[category] || 0.5]]);
  }

  private extractMetricFeatures(product) {
    return tf.tensor2d([[
      this.normalizeWeight(product.weight),
      this.normalizeDistance(product.manufacturingDistance),
      product.isRecycled ? 1 : 0,
      product.hasEcoLabel ? 1 : 0,
    ]]);
  }

  private encodePackaging(packaging) {
    return tf.tensor2d([[
      packaging.isRecyclable ? 1 : 0,
      packaging.isMinimal ? 1 : 0,
      packaging.isBiodegradable ? 1 : 0,
    ]]);
  }

  private normalizeWeight(weight) {
    return Math.min(weight / 100, 1); // Normalize to [0,1] for 0-100kg
  }

  private normalizeDistance(distance) {
    return Math.min(distance / 20000, 1); // Normalize to [0,1] for 0-20000km
  }
}