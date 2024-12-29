import { useState, useEffect } from 'react';
import {
  calculateEnergyEfficiency,
  calculateWaterEfficiency,
  calculatePotentialSavings,
} from '../utils/auditCalculations';

export function useAuditResults(formData) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!formData) return;

    setLoading(true);
    
    // Calculate efficiency scores
    const energyEfficiency = calculateEnergyEfficiency(formData);
    const waterEfficiency = calculateWaterEfficiency(formData);
    
    // Calculate potential savings
    const potentialSavings = calculatePotentialSavings(formData);
    
    // Generate recommendations based on scores
    const recommendations = generateRecommendations(
      energyEfficiency,
      waterEfficiency,
      formData
    );

    setResults({
      energyEfficiency,
      waterEfficiency,
      potentialSavings,
      recommendations,
    });
    
    setLoading(false);
  }, [formData]);

  return { results, loading };
}

function generateRecommendations(energyScore, waterScore, formData) {
  const recommendations = [];

  // Energy recommendations
  if (!formData.hasSmartThermo) {
    recommendations.push({
      type: 'hvac',
      title: 'Install Smart Thermostat',
      description: 'Smart thermostats can reduce HVAC energy usage by up to 15%',
      savings: 180,
    });
  }

  if (formData.lightingType.toLowerCase().includes('incandescent')) {
    recommendations.push({
      type: 'lighting',
      title: 'Switch to LED Lighting',
      description: 'LED bulbs use 75% less energy than incandescent bulbs',
      savings: 120,
    });
  }

  // Water recommendations
  if (!formData.hasLowFlowFixtures) {
    recommendations.push({
      type: 'water',
      title: 'Install Low-Flow Fixtures',
      description: 'Low-flow fixtures can reduce water usage by up to 30%',
      savings: 100,
    });
  }

  // Appliance recommendations
  Object.entries(formData.applianceAges).forEach(([appliance, age]) => {
    if (age > 10) {
      recommendations.push({
        type: 'appliance',
        title: `Replace ${appliance.charAt(0).toUpperCase() + appliance.slice(1)}`,
        description: `Your ${appliance} is over 10 years old. New models are much more efficient`,
        savings: 150,
      });
    }
  });

  return recommendations;
}