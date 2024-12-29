import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  TRANSPORT: '@footprint_transport',
  ENERGY: '@footprint_energy',
  SHOPPING: '@footprint_shopping',
};

export async function storeFootprintData(type, data) {
  try {
    const key = STORAGE_KEYS[type.toUpperCase()];
    const existingData = await getFootprintData(type);
    
    existingData.push(data);
    
    // Keep only last 30 days of data
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const filteredData = existingData.filter(
      item => item.timestamp > thirtyDaysAgo
    );
    
    await AsyncStorage.setItem(key, JSON.stringify(filteredData));
    
    // Trigger ML model update if enough new data
    if (filteredData.length % 50 === 0) {
      updateMLModels(type, filteredData);
    }
  } catch (error) {
    console.error('Error storing footprint data:', error);
    throw error;
  }
}

export async function getFootprintData(type) {
  try {
    const key = STORAGE_KEYS[type.toUpperCase()];
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving footprint data:', error);
    return [];
  }
}

export async function getAggregatedFootprint(timeframe = 'week') {
  const types = ['transport', 'energy', 'shopping'];
  let totalEmissions = 0;
  
  for (const type of types) {
    const data = await getFootprintData(type);
    const timeframeData = filterByTimeframe(data, timeframe);
    
    totalEmissions += timeframeData.reduce((sum, item) => {
      return sum + (item.emissions || item.totalEmissions || 0);
    }, 0);
  }
  
  return totalEmissions;
}

function filterByTimeframe(data, timeframe) {
  const now = Date.now();
  const timeframes = {
    day: now - (24 * 60 * 60 * 1000),
    week: now - (7 * 24 * 60 * 60 * 1000),
    month: now - (30 * 24 * 60 * 60 * 1000),
  };
  
  return data.filter(item => item.timestamp > timeframes[timeframe]);
}

async function updateMLModels(type, data) {
  // Trigger background model update with new data
  // Implementation depends on ML infrastructure
  console.log(`Updating ML models for ${type} with ${data.length} records`);
}