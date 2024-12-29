import * as Location from 'expo-location';

export class FacilityLocatorService {
  async findNearbyFacilities(location, materialType) {
    try {
      const userLocation = location || await this.getUserLocation();
      const facilities = await this.queryFacilities(userLocation, materialType);
      
      return {
        facilities: this.sortByDistance(facilities, userLocation),
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error finding facilities:', error);
      throw error;
    }
  }

  private async getUserLocation() {
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

  private async queryFacilities(location, materialType) {
    // This would integrate with a facility database
    // For now, return mock data
    return [
      {
        id: 'facility1',
        name: 'City Recycling Center',
        type: 'municipal',
        materials: ['plastic', 'paper', 'glass', 'metal'],
        location: {
          latitude: location.latitude + 0.01,
          longitude: location.longitude + 0.01,
        },
        hours: '9am-5pm',
        contact: '555-0123',
      },
      {
        id: 'facility2',
        name: 'E-Waste Drop-off',
        type: 'specialized',
        materials: ['electronics', 'batteries'],
        location: {
          latitude: location.latitude - 0.01,
          longitude: location.longitude - 0.01,
        },
        hours: '10am-4pm',
        contact: '555-0124',
      },
    ];
  }

  private sortByDistance(facilities, userLocation) {
    return facilities.sort((a, b) => {
      const distA = this.calculateDistance(userLocation, a.location);
      const distB = this.calculateDistance(userLocation, b.location);
      return distA - distB;
    });
  }

  private calculateDistance(point1, point2) {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(point2.latitude - point1.latitude);
    const dLon = this.toRad(point2.longitude - point1.longitude);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(this.toRad(point1.latitude)) * 
             Math.cos(this.toRad(point2.latitude)) *
             Math.sin(dLon/2) * Math.sin(dLon/2);
             
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRad(degrees) {
    return degrees * Math.PI / 180;
  }
}