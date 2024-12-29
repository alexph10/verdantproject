import { API_BASE_URL } from '../config';

export async function syncSmartHomeData() {
  try {
    const response = await fetch(`${API_BASE_URL}/energy/smart-home/sync`);
    return await response.json();
  } catch (error) {
    console.error('Error syncing smart home data:', error);
    throw error;
  }
}

export async function submitManualReading(reading) {
  try {
    const response = await fetch(`${API_BASE_URL}/energy/readings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reading),
    });
    return await response.json();
  } catch (error) {
    console.error('Error submitting energy reading:', error);
    throw error;
  }
}