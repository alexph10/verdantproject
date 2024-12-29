import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { theme } from '../../theme';

export function CommuteMap({ tracking, onLocationUpdate }) {
  const mapRef = useRef(null);
  const routeCoordinates = useRef([]);

  useEffect(() => {
    let locationSubscription;

    const startLocationTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
        },
        location => {
          const { latitude, longitude } = location.coords;
          const newCoordinate = { latitude, longitude };
          
          routeCoordinates.current = [...routeCoordinates.current, newCoordinate];
          
          onLocationUpdate({
            coordinates: routeCoordinates.current,
            distance: calculateDistance(routeCoordinates.current),
            duration: calculateDuration(routeCoordinates.current),
          });

          mapRef.current?.animateToRegion({
            ...newCoordinate,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      );
    };

    if (tracking) {
      startLocationTracking();
    }

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [tracking]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      showsUserLocation
      followsUserLocation
    >
      {routeCoordinates.current.length > 0 && (
        <Polyline
          coordinates={routeCoordinates.current}
          strokeColor={theme.colors.primary}
          strokeWidth={3}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});