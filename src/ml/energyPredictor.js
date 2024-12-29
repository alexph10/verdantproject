import * as tf from '@tensorflow/tfjs';
import { loadModel } from '../utils/modelLoader';

let model = null;

export async function predictEnergyUsage(data) {
  if (!model) {
    model = await loadModel('energy_predictor');
  }

  const features = extractFeatures(data);
  const prediction = await model.predict(features);
  
  return {
    predictedUsage: prediction.dataSync()[0],
    confidence: calculateConfidence(prediction),
    timestamp: Date.now(),
  };
}

function extractFeatures(data) {
  // Normalize and prepare features
  const timeOfDay = new Date().getHours() / 24;
  const dayOfWeek = new Date().getDay() / 7;
  
  const features = [
    timeOfDay,
    dayOfWeek,
    normalizeTemperature(data.temperature),
    normalizeHumidity(data.humidity),
    data.occupancy ? 1 : 0,
    ...getApplianceStates(data),
  ];
  
  return tf.tensor2d([features]);
}

function normalizeTemperature(temp) {
  // Normalize to range [0, 1] assuming temp range -10 to 40
  return (temp + 10) / 50;
}

function normalizeHumidity(humidity) {
  return humidity / 100;
}

function getApplianceStates(data) {
  const appliances = [
    'hvac',
    'waterHeater',
    'refrigerator',
    'dishwasher',
    'washingMachine',
    'dryer',
  ];
  
  return appliances.map(app => data[app]?.active ? 1 : 0);
}

function calculateConfidence(prediction) {
  const variance = prediction.square().mean().sub(prediction.mean().square());
  return 1 / (1 + variance.dataSync()[0]);
}