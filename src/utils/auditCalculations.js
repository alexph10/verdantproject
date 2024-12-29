export function calculateEnergyEfficiency(formData) {
  const {
    homeSize,
    buildingAge,
    hasSmartThermo,
    hvacType,
    lightingType,
    applianceAges,
  } = formData;

  let score = 100;

  // Age-based deductions
  score -= Math.min(buildingAge / 2, 30);

  // HVAC efficiency
  if (hvacType.toLowerCase().includes('old') || hvacType.toLowerCase().includes('conventional')) {
    score -= 15;
  }

  // Smart thermostat bonus
  if (hasSmartThermo) {
    score += 10;
  }

  // Lighting efficiency
  if (lightingType.toLowerCase().includes('led')) {
    score += 5;
  } else if (lightingType.toLowerCase().includes('incandescent')) {
    score -= 10;
  }

  // Appliance age impact
  Object.values(applianceAges).forEach(age => {
    if (age > 10) score -= 5;
  });

  return Math.max(0, Math.min(100, score));
}

export function calculateWaterEfficiency(formData) {
  const {
    hasLowFlowFixtures,
    hasIrrigation,
    hasSmartIrrigation,
    occupants,
  } = formData;

  let score = 100;

  // Base score adjustments
  if (!hasLowFlowFixtures) score -= 20;
  if (hasIrrigation && !hasSmartIrrigation) score -= 15;
  if (hasSmartIrrigation) score += 10;

  // Occupancy impact
  score -= Math.max(0, (occupants - 2) * 5);

  return Math.max(0, Math.min(100, score));
}

export function calculatePotentialSavings(formData) {
  const energyEfficiency = calculateEnergyEfficiency(formData);
  const waterEfficiency = calculateWaterEfficiency(formData);

  return {
    energy: {
      current: 100 - energyEfficiency,
      potential: Math.round((100 - energyEfficiency) * 0.4),
      costSavings: Math.round((100 - energyEfficiency) * 2.5),
    },
    water: {
      current: 100 - waterEfficiency,
      potential: Math.round((100 - waterEfficiency) * 0.35),
      costSavings: Math.round((100 - waterEfficiency) * 1.8),
    },
  };
}