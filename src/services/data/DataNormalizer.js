import { formatDate, roundNumber } from '../utils/formatters';

export class DataNormalizer {
  normalizeTransportData(data) {
    return {
      type: 'transport',
      timestamp: formatDate(data.timestamp),
      distance: roundNumber(data.distance, 2),
      mode: data.mode,
      coordinates: data.coordinates.map(coord => ({
        latitude: roundNumber(coord.latitude, 6),
        longitude: roundNumber(coord.longitude, 6),
        timestamp: formatDate(coord.timestamp),
      })),
    };
  }

  normalizeEnergyData(data) {
    return {
      type: 'energy',
      timestamp: formatDate(data.timestamp),
      usage: roundNumber(data.usage, 2),
      source: data.source,
      unit: data.unit || 'kWh',
    };
  }

  normalizeShoppingData(data) {
    return {
      type: 'shopping',
      timestamp: formatDate(data.timestamp),
      items: data.items.map(item => ({
        name: item.name,
        category: item.category,
        quantity: roundNumber(item.quantity, 2),
        price: roundNumber(item.price, 2),
        emissions: roundNumber(item.emissions, 2),
      })),
    };
  }
}