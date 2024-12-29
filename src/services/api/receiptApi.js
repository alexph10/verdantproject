import { API_BASE_URL } from '../config';

export async function uploadReceipt(imageUri) {
  try {
    const formData = new FormData();
    formData.append('receipt', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'receipt.jpg',
    });

    const response = await fetch(`${API_BASE_URL}/receipts/upload`, {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error('Error uploading receipt:', error);
    throw error;
  }
}