import * as tf from '@tensorflow/tfjs';
import { loadModel } from '../utils/modelLoader';

let model = null;

export async function predictProductEmissions(product) {
  if (!model) {
    model = await loadModel('product_emissions');
  }

  const features = extractProductFeatures(product);
  const prediction = await model.predict(features);
  
  return {
    emissions: prediction.dataSync()[0],
    confidence: calculateConfidence(prediction),
    factors: analyzeEmissionFactors(product),
  };
}

function extractProductFeatures(product) {
  // Convert product attributes to numerical features
  const features = [
    encodeMaterial(product.material),
    encodeCategory(product.category),
    normalizeWeight(product.weight),
    normalizeDistance(product.manufacturingDistance),
    product.isRecycled ? 1 : 0,
    product.hasEcoLabel ? 1 : 0,
    ...encodePackaging(product.packaging),
  ];
  
  return tf.tensor2d([features]);
}

function encodeMaterial(material) {
  const materialMap = {
    plastic: 0.8,
    paper: 0.4,
    glass: 0.6,
    metal: 0.7,
    organic: 0.2,
    textile: 0.5,
  };
  return materialMap[material] || 0.5;
}

function encodeCategory(category) {
  const categoryMap = {
    food: 0.3,
    electronics: 0.9,
    clothing: 0.5,
    furniture: 0.7,
    cosmetics: 0.4,
  };
  return categoryMap[category] || 0.5;
}

function normalizeWeight(weight) {
  // Normalize weight to [0, 1] assuming max weight of 100kg
  return Math.min(weight / 100, 1);
}

function normalizeDistance(distance) {
  // Normalize distance to [0, 1] assuming max distance of 20000km
  return Math.min(distance / 20000, 1);
}

function encodePackaging(packaging) {
  return [
    packaging.isRecyclable ? 1 : 0,
    packaging.isMinimal ? 1 : 0,
    packaging.isBiodegradable ? 1 : 0,
  ];
}

function calculateConfidence(prediction) {
  const variance = prediction.square().mean().sub(prediction.mean().square());
  return 1 / (1 + variance.dataSync()[0]);
}

function analyzeEmissionFactors(product) {
  // Identify main contributors to emissions
  const factors = [];
  
  if (product.manufacturingDistance > 1000) {
    factors.push({
      factor: 'transportation',
      impact: 'high',
      suggestion: 'Consider local alternatives',
    });
  }
  
  if (['plastic', 'metal'].includes(product.material)) {
    factors.push({
      factor: 'material',
      impact: 'medium',
      suggestion: 'Look for recycled options',
    });
  }
  
  if (!product.hasEcoLabel) {
    factors.push({
      factor: 'certification',
      impact: 'low',
      suggestion: 'Prefer certified eco-friendly products',
    });
  }
  
  return factors;
}