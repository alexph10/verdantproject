const CERTIFICATION_WEIGHTS = {
  'b-corp': 0.3,
  'eco-cert': 0.2,
  'fair-trade': 0.2,
  'organic': 0.15,
  'energy-star': 0.15,
};

const MATERIAL_SCORES = {
  'recycled': 0.9,
  'organic': 0.8,
  'sustainable': 0.7,
  'conventional': 0.4,
};

export async function calculateSustainabilityScore(product) {
  const certificationScore = calculateCertificationScore(product.certifications);
  const materialScore = calculateMaterialScore(product.materials);
  const supplyChainScore = await calculateSupplyChainScore(product.manufacturer);
  const carbonFootprintScore = calculateCarbonFootprintScore(product.carbonData);

  // Weighted average of all components
  return (
    certificationScore * 0.3 +
    materialScore * 0.25 +
    supplyChainScore * 0.25 +
    carbonFootprintScore * 0.2
  );
}

function calculateCertificationScore(certifications = []) {
  return certifications.reduce((score, cert) => {
    return score + (CERTIFICATION_WEIGHTS[cert] || 0);
  }, 0);
}

function calculateMaterialScore(materials = []) {
  return materials.reduce((score, material) => {
    return score + (MATERIAL_SCORES[material.type] || 0) * material.percentage;
  }, 0) / 100;
}

async function calculateSupplyChainScore(manufacturer) {
  // This would typically involve API calls to get real-time supply chain data
  // For now, return a placeholder score
  return 0.75;
}

function calculateCarbonFootprintScore(carbonData) {
  const { emissions, industryAverage } = carbonData;
  if (!emissions || !industryAverage) return 0.5;
  
  // Lower emissions = better score
  const ratio = emissions / industryAverage;
  return Math.max(0, 1 - ratio);
}