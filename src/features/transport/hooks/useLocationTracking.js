import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { storeTrackingData } from '../utils/storage';

export function useLocationTracking() {
  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let subscription;

    async function startTracking() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied');
          return;
        }

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 10,
          },
          (newLocation) => {
            setLocation(newLocation);
            storeTrackingData(newLocation);
          }
        );
      } catch (err) {
        setError(err.message);
      }
    }

    if (isTracking) {
      startTracking();
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isTracking]);

  return { isTracking, setIsTracking, location, error };
}