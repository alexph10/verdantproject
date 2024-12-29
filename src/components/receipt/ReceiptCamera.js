import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { IconButton, Text } from 'react-native-paper';
import { theme } from '../../theme';

export default function ReceiptCamera({ onCapture }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
        });
        onCapture(photo);
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        onCameraReady={() => setCameraReady(true)}
        ratio="16:9"
      >
        <View style={styles.overlay}>
          <View style={styles.guideBox} />
          <Text style={styles.guideText}>
            Align receipt within the box
          </Text>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleCapture}
          >
            <IconButton
              icon="camera"
              size={32}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideBox: {
    width: '80%',
    height: '60%',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: 'transparent',
  },
  guideText: {
    color: 'white',
    marginTop: theme.spacing.md,
    fontSize: 16,
  },
  captureButton: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: theme.spacing.xs,
  },
});