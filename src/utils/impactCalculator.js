const IMPACT_FACTORS = {
  'plastic-free': {
    carbonPerUnit: 0.5, // kg CO2e per plastic item avoided
    waterPerUnit: 0.2, // L water per item
    wastePerUnit: 0.05, // kg waste per item
  },
  'plant-based': {
    carbonPerUnit: 2.5, // kg CO2e per meal
    waterPerUnit: 1000, // L water per meal
    wastePerUnit: 0.3, // kg waste per meal
  },
  'energy-saving': {
    carbonPerUnit: 0.4, // kg CO2e per kWh
    waterPerUnit: 0, // No direct water impact
    wastePerUnit: 0, // No direct waste impact
  },
};

export function calculateImpact(data) {
  const { category, units, progress } = data;
  const factors = IMPACT_FACTORS[category];

  if (!factors) return null;

  return {
    carbonReduction: units * progress * factors.carbonPerUnit,
    waterSaved: units * progress * factors.waterPerUnit,
    wasteReduced: units * progress * factors.wastePerUnit,
  };
}