import { API_BASE_URL } from '../config';

export async function sendTrackingData(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/transport/tracking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending tracking data:', error);
    throw error;
  }
}

export async function getTransportHistory() {
  try {
    const response = await fetch(`${API_BASE_URL}/transport/history`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching transport history:', error);
    throw error;
  }
}