const TRANSPORT_EMISSIONS = {
  'ground': 0.1,
  'air': 0.5,
  'sea': 0.05,
};

export async function getShippingImpact(product) {
  const distance = await calculateShippingDistance(product);
  const transportType = determineTransportType(product);
  const weight = product.weight;

  return calculateEmissions(distance, transportType, weight);
}

async function calculateShippingDistance(product) {
  // This would use a mapping service API in production
  // For now, return an estimated distance based on regions
  const sourceRegion = product.manufacturingLocation;
  const destinationRegion = await getCurrentUserRegion();
  
  return estimateDistance(sourceRegion, destinationRegion);
}

function determineTransportType(product) {
  // Logic to determine most likely transport method
  if (product.requiresExpedited) return 'air';
  if (product.weight > 1000) return 'sea';
  return 'ground';
}

function calculateEmissions(distance, transportType, weight) {
  const baseEmissions = TRANSPORT_EMISSIONS[transportType];
  return (distance * baseEmissions * weight) / 1000; // kg CO2e
}

async function getCurrentUserRegion() {
  // This would use geolocation in production
  return 'US-WEST';
}

function estimateDistance(source, destination) {
  // Simplified distance calculation between regions
  const distances = {
    'US-WEST': {
      'US-EAST': 4000,
      'EUROPE': 9000,
      'ASIA': 10000,
    },
    // Add more regions as needed
  };

  return distances[source]?.[destination] || 5000; // Default to 5000km
}