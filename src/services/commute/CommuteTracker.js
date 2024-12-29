import { TransportTracker } from '../footprint/transportTracker';
import { calculatePoints } from '../gamification/pointsCalculator';
import { storeCommuteData } from '../storage/commuteStorage';

export class CommuteTracker {
  constructor() {
    this.transportTracker = new TransportTracker();
  }

  startTracking() {
    this.transportTracker.startTracking();
  }

  stopTracking() {
    this.transportTracker.stopTracking();
  }

  async logCommute(commuteData) {
    try {
      const points = calculatePoints(commuteData);
      const impact = await this.calculateEnvironmentalImpact(commuteData);
      
      const commuteRecord = {
        ...commuteData,
        points,
        impact,
        timestamp: Date.now(),
      };

      await storeCommuteData(commuteRecord);
      return commuteRecord;
    } catch (error) {
      console.error('Error logging commute:', error);
      throw error;
    }
  }

  private async calculateEnvironmentalImpact(commuteData) {
    const { distance, mode } = commuteData;
    const baselineEmissions = this.calculateBaselineEmissions(distance);
    const actualEmissions = this.calculateActualEmissions(distance, mode);

    return {
      emissionsSaved: baselineEmissions - actualEmissions,
      treesEquivalent: this.convertToTrees(baselineEmissions - actualEmissions),
      carbonCredits: this.convertToCarbonCredits(baselineEmissions - actualEmissions),
    };
  }

  private calculateBaselineEmissions(distance) {
    // Assume baseline is single-occupancy vehicle
    return distance * 0.2; // kg CO2e per km
  }

  private calculateActualEmissions(distance, mode) {
    const emissionFactors = {
      walking: 0,
      cycling: 0,
      publicTransport: 0.04,
      carpool: 0.1,
    };
    return distance * (emissionFactors[mode] || 0.2);
  }

  private convertToTrees(emissions) {
    // Average tree absorbs 22kg CO2 per year
    return emissions / 22;
  }

  private convertToCarbonCredits(emissions) {
    // 1 carbon credit = 1000kg CO2e
    return emissions / 1000;
  }
}