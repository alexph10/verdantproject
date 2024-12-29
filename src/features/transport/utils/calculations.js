export function calculateDistance(coordinates) {
  let distance = 0;
  for (let i = 1; i < coordinates.length; i++) {
    distance += haversineDistance(coordinates[i-1], coordinates[i]);
  }
  return distance;
}

export function calculateEmissions(distance, mode) {
  const emissionFactors = {
    walking: 0,
    cycling: 0,
    bus: 0.089,
    train: 0.041,
  };
  
  return distance * (emissionFactors[mode] || 0);
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