import { cleanText } from '../utils/textProcessing';

export async function preprocessProductData(product) {
  return {
    ...product,
    name: cleanText(product.name),
    description: cleanText(product.description),
    normalizedPrice: normalizePrice(product.price),
    materialFeatures: normalizeMaterials(product.materials),
    sustainabilityFeatures: extractSustainabilityFeatures(product),
  };
}

function normalizePrice(price) {
  // Normalize price within category range
  return (price - MIN_PRICE) / (MAX_PRICE - MIN_PRICE);
}

function normalizeMaterials(materials) {
  // Convert material compositions to normalized feature vector
  return materials.reduce((features, material) => {
    features[material.type] = material.percentage / 100;
    return features;
  }, {});
}

function extractSustainabilityFeatures(product) {
  return {
    certificationScore: calculateCertificationScore(product.certifications),
    carbonScore: normalizeCarbonFootprint(product.carbonFootprint),
    recycledContent: calculateRecycledContent(product.materials),
    localProduction: calculateLocalProductionScore(product.manufacturingLocation),
  };
}