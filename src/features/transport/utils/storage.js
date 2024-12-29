import AsyncStorage from '@react-native-async-storage/async-storage';

const TRACKING_DATA_KEY = '@transport_tracking_data';

export async function storeTrackingData(location) {
  try {
    const existingData = await getTrackingData();
    existingData.push({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: location.timestamp,
    });
    
    await AsyncStorage.setItem(
      TRACKING_DATA_KEY,
      JSON.stringify(existingData)
    );
  } catch (error) {
    console.error('Error storing tracking data:', error);
  }
}

export async function getTrackingData() {
  try {
    const data = await AsyncStorage.getItem(TRACKING_DATA_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving tracking data:', error);
    return [];
  }
}

export async function clearTrackingData() {
  try {
    await AsyncStorage.removeItem(TRACKING_DATA_KEY);
  } catch (error) {
    console.error('Error clearing tracking data:', error);
  }
}