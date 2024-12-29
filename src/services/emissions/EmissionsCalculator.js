import { EMISSION_FACTORS } from './constants';

export class EmissionsCalculator {
  calculateTransportEmissions(data) {
    const { distance, mode } = data;
    const factor = EMISSION_FACTORS.transport[mode] || 0;
    return distance * factor;
  }

  calculateEnergyEmissions(data) {
    const { usage, source } = data;
    const factor = EMISSION_FACTORS.energy[source] || EMISSION_FACTORS.energy.default;
    return usage * factor;
  }

  calculateShoppingEmissions(items) {
    return items.reduce((total, item) => {
      const factor = EMISSION_FACTORS.products[item.category] || 0;
      return total + (item.quantity * factor);
    }, 0);
  }
}