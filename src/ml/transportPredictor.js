import * as tf from '@tensorflow/tfjs';
import { loadModel } from '../utils/modelLoader';

let model = null;

export async function predictTransportMode(tripPoints) {
  if (!model) {
    model = await loadModel('transport_classifier');
  }

  // Extract features from trip points
  const features = extractFeatures(tripPoints);
  
  // Make prediction
  const prediction = await model.predict(features);
  const transportModes = ['walking', 'cycling', 'driving', 'public_transport'];
  
  // Get highest probability mode
  const modeIndex = prediction.argMax(1).dataSync()[0];
  return transportModes[modeIndex];
}

function extractFeatures(tripPoints) {
  // Calculate speed, acceleration, and movement patterns
  const speeds = tripPoints.map(point => point.speed || 0);
  const accelerations = calculateAccelerations(speeds);
  
  return tf.tensor2d([
    [
      calculateAverageSpeed(speeds),
      calculateMaxSpeed(speeds),
      calculateAverageAcceleration(accelerations),
      calculateStopFrequency(speeds),
      calculateDirectionChanges(tripPoints),
    ]
  ]);
}

// Helper functions for feature extraction
function calculateAccelerations(speeds) {
  return speeds.slice(1).map((speed, i) => speed - speeds[i]);
}

function calculateAverageSpeed(speeds) {
  return speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length;
}

function calculateMaxSpeed(speeds) {
  return Math.max(...speeds);
}

function calculateAverageAcceleration(accelerations) {
  return accelerations.reduce((sum, acc) => sum + Math.abs(acc), 0) / accelerations.length;
}

function calculateStopFrequency(speeds) {
  const stops = speeds.filter(speed => speed < 0.5).length;
  return stops / speeds.length;
}

function calculateDirectionChanges(points) {
  let changes = 0;
  for (let i = 2; i < points.length; i++) {
    const prev = points[i - 2];
    const curr = points[i];
    
    const bearing1 = calculateBearing(points[i - 1], prev);
    const bearing2 = calculateBearing(curr, points[i - 1]);
    
    if (Math.abs(bearing1 - bearing2) > 30) {
      changes++;
    }
  }
  return changes;
}

function calculateBearing(point1, point2) {
  const toRad = n => (n * Math.PI) / 180;
  const toDeg = n => (n * 180) / Math.PI;
  
  const lat1 = toRad(point1.latitude);
  const lon1 = toRad(point1.longitude);
  const lat2 = toRad(point2.latitude);
  const lon2 = toRad(point2.longitude);
  
  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
           Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
           
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}