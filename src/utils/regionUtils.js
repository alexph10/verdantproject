import { regions } from '../services/data/regions';

export function getUserRegion() {
  // This would normally use geolocation or user settings
  // For now, return a default region
  return 'US';
}

export function formatValue(value, unit, countryCode) {
  const region = regions[countryCode];
  
  switch (unit) {
    case 'weight':
      return region.weightUnit === 'lb'
        ? `${(value * 2.20462).toFixed(1)} lb`
        : `${value.toFixed(1)} kg`;
        
    case 'distance':
      return region.distanceUnit === 'mi'
        ? `${(value * 0.621371).toFixed(1)} mi`
        : `${value.toFixed(1)} km`;
        
    case 'temperature':
      return region.temperatureUnit === 'F'
        ? `${(value * 9/5 + 32).toFixed(1)}°F`
        : `${value.toFixed(1)}°C`;
        
    case 'currency':
      return new Intl.NumberFormat(countryCode, {
        style: 'currency',
        currency: region.currency,
      }).format(value);
        
    default:
      return value.toString();
  }
}

export function getLocalizedCertifications(countryCode) {
  const certifications = regions[countryCode]?.certifications || [];
  return certifications;
}

export function getLocalizedGuidelines(countryCode) {
  const guidelines = regions[countryCode]?.recyclingGuidelines || [];
  return guidelines;
}