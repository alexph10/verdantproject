import * as Location from 'expo-location';
import { regions } from '../data/regions';

export class RegionDetector {
  async detectRegion(location) {
    try {
      if (!location) {
        location = await this.getCurrentLocation();
      }

      return this.mapCoordinatesToRegion(location);
    } catch (error) {
      console.error('Error detecting region:', error);
      return 'US'; // Default to US if detection fails
    }
  }

  private async getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Location permission not granted');
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  }

  private mapCoordinatesToRegion(location) {
    // This would use a proper geocoding service
    // For now, use simplified region mapping
    const { latitude, longitude } = location;
    
    if (latitude > 25 && latitude < 50 && longitude < -50 && longitude > -125) {
      return 'US';
    }
    if (latitude > 35 && latitude < 60 && longitude < -50 && longitude > -140) {
      return 'CA';
    }
    if (latitude > 35 && latitude < 70 && longitude > -10 && longitude < 40) {
      return 'EU';
    }
    if (latitude > 30 && latitude < 45 && longitude > 130 && longitude < 145) {
      return 'JP';
    }
    if (latitude > 33 && latitude < 38 && longitude > 125 && longitude < 130) {
      return 'KR';
    }
    
    return 'US'; // Default fallback
  }
}