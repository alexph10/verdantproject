import * as ImageManipulator from 'expo-image-manipulator';

export async function preprocessImage(imageUri) {
  try {
    // Enhance image for better OCR
    const processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        { resize: { width: 1200 } },
        { normalize: true },
        { contrast: 1.2 },
        { sharpen: 1 },
      ],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );

    return processedImage.uri;
  } catch (error) {
    console.error('Image preprocessing error:', error);
    throw error;
  }
}

export async function detectReceiptBoundaries(imageUri) {
  // Implement receipt edge detection
  // This would use computer vision to find receipt edges
  // For now, return the original image
  return imageUri;
}