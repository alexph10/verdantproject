import * as tf from '@tensorflow/tfjs';

export class ModelLoader {
  static async loadModel(modelId) {
    try {
      // Load model from storage or API
      const model = await tf.loadLayersModel(`models/${modelId}/model.json`);
      await model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError',
      });
      return model;
    } catch (error) {
      console.error(`Error loading model ${modelId}:`, error);
      throw error;
    }
  }

  static async loadEmbeddings(embeddingId) {
    try {
      // Load embeddings from storage or API
      const response = await fetch(`embeddings/${embeddingId}.json`);
      return response.json();
    } catch (error) {
      console.error(`Error loading embeddings ${embeddingId}:`, error);
      throw error;
    }
  }
}