import { fetchSmartHomeData } from '../api/smartHome';
import { predictEnergyUsage } from '../ml/energyPredictor';
import { calculateEmissions } from '../utils/emissionsCalculator';
import { storeFootprintData } from '../storage/footprintStorage';

export class EnergyTracker {
  constructor() {
    this.updateInterval = null;
  }

  startTracking() {
    // Update every 30 minutes
    this.updateInterval = setInterval(() => this.updateEnergyData(), 1800000);
    this.updateEnergyData(); // Initial update
  }

  stopTracking() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  async updateEnergyData() {
    try {
      const smartHomeData = await fetchSmartHomeData();
      const predictedUsage = await predictEnergyUsage(smartHomeData);
      
      const emissions = calculateEmissions(
        predictedUsage,
        'electricity'
      );

      await storeFootprintData('energy', {
        usage: predictedUsage,
        emissions,
        timestamp: Date.now(),
        source: 'smart_home',
      });
    } catch (error) {
      console.error('Energy tracking error:', error);
    }
  }

  async addManualReading(reading) {
    try {
      const predictedUsage = await predictEnergyUsage({
        ...reading,
        type: 'manual',
      });

      const emissions = calculateEmissions(
        predictedUsage,
        'electricity'
      );

      await storeFootprintData('energy', {
        usage: predictedUsage,
        emissions,
        timestamp: Date.now(),
        source: 'manual',
      });
    } catch (error) {
      console.error('Manual reading error:', error);
    }
  }
}