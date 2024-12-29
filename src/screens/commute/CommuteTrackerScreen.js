import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Title, Button } from 'react-native-paper';
import { CommuteTracker } from '../../services/commute/CommuteTracker';
import { CommuteMap } from '../../components/commute/CommuteMap';
import { CommuteStats } from '../../components/commute/CommuteStats';
import { TransportModeSelector } from '../../components/commute/TransportModeSelector';
import { theme } from '../../theme';

export function CommuteTrackerScreen() {
  const [tracking, setTracking] = useState(false);
  const [currentCommute, setCurrentCommute] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  
  const commuteTracker = new CommuteTracker();

  const handleStartTracking = () => {
    setTracking(true);
    commuteTracker.startTracking();
  };

  const handleStopTracking = async () => {
    setTracking(false);
    commuteTracker.stopTracking();

    if (selectedMode) {
      const commuteData = {
        ...currentCommute,
        mode: selectedMode,
      };
      
      const result = await commuteTracker.logCommute(commuteData);
      setCurrentCommute(result);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.mapContainer}>
        <CommuteMap tracking={tracking} onLocationUpdate={setCurrentCommute} />
      </Surface>

      <Surface style={styles.controlsContainer}>
        <Title>Track Your Commute</Title>
        
        <TransportModeSelector
          selected={selectedMode}
          onSelect={setSelectedMode}
        />

        <Button
          mode="contained"
          onPress={tracking ? handleStopTracking : handleStartTracking}
          style={styles.trackButton}
        >
          {tracking ? 'Stop Tracking' : 'Start Tracking'}
        </Button>
      </Surface>

      {currentCommute && (
        <CommuteStats commute={currentCommute} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  mapContainer: {
    flex: 1,
    marginBottom: theme.spacing.md,
  },
  controlsContainer: {
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.spacing.sm,
  },
  trackButton: {
    marginTop: theme.spacing.md,
  },
});