const EMISSIONS_FACTORS = {
  transport: {
    walking: 0,
    cycling: 0,
    driving: 0.2, // kg CO2e per km
    public_transport: 0.04,
  },
  electricity: {
    // kg CO2e per kWh by region
    regions: {
      'US-West': 0.2,
      'US-East': 0.3,
      'EU': 0.25,
      'Asia': 0.5,
    },
  },
};

export function calculateEmissions(data, type) {
  switch (type) {
    case 'walking':
    case 'cycling':
    case 'driving':
    case 'public_transport':
      return calculateTransportEmissions(data, type);
    case 'electricity':
      return calculateEnergyEmissions(data);
    default:
      throw new Error(`Unknown emissions type: ${type}`);
  }
}

function calculateTransportEmissions(tripPoints, mode) {
  const distance = calculateTripDistance(tripPoints);
  return distance * EMISSIONS_FACTORS.transport[mode];
}

function calculateEnergyEmissions(usage) {
  const region = determineUserRegion();
  const factor = EMISSIONS_FACTORS.electricity.regions[region];
  return usage * factor;
}

function calculateTripDistance(points) {
  let distance = 0;
  for (let i = 1; i < points.length; i++) {
    distance += haversineDistance(points[i-1], points[i]);
  }
  return distance;
}

function haversineDistance(point1, point2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(point2.latitude - point1.latitude);
  const dLon = toRad(point2.longitude - point1.longitude);
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
           Math.cos(toRad(point1.latitude)) * Math.cos(toRad(point2.latitude)) *
           Math.sin(dLon/2) * Math.sin(dLon/2);
           
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(degrees) {
  return degrees * Math.PI / 180;
}

function determineUserRegion() {
  // Implement region detection based on user's location
  // For now, return a default region
  return 'US-West';
}