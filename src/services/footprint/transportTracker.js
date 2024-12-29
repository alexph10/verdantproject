import * as Location from '@react-native-community/geolocation';
import { predictTransportMode } from '../ml/transportPredictor';
import { calculateEmissions } from '../utils/emissionsCalculator';
import { storeFootprintData } from '../storage/footprintStorage';

export class TransportTracker {
  constructor() {
    this.watchId = null;
    this.currentTrip = [];
  }

  startTracking() {
    this.watchId = Location.watchPosition(
      position => this.handleLocationUpdate(position),
      error => console.error('Location error:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Update every 10 meters
        interval: 5000, // 5 second interval
      }
    );
  }

  stopTracking() {
    if (this.watchId !== null) {
      Location.clearWatch(this.watchId);
      this.finalizeTrip();
    }
  }

  async handleLocationUpdate(position) {
    const { latitude, longitude, speed } = position.coords;
    const timestamp = position.timestamp;

    this.currentTrip.push({
      latitude,
      longitude,
      speed,
      timestamp,
    });

    // Predict transport mode every 5 points
    if (this.currentTrip.length % 5 === 0) {
      const transportMode = await predictTransportMode(this.currentTrip);
      const emissions = calculateEmissions(
        this.currentTrip,
        transportMode
      );
      
      await storeFootprintData('transport', {
        type: transportMode,
        emissions,
        timestamp,
        tripPoints: this.currentTrip,
      });
    }
  }

  async finalizeTrip() {
    if (this.currentTrip.length > 0) {
      const transportMode = await predictTransportMode(this.currentTrip);
      const emissions = calculateEmissions(
        this.currentTrip,
        transportMode
      );
      
      await storeFootprintData('transport', {
        type: transportMode,
        emissions,
        timestamp: Date.now(),
        tripPoints: this.currentTrip,
      });
      
      this.currentTrip = [];
    }
  }
}