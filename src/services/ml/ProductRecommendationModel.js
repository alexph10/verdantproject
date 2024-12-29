import * as tf from '@tensorflow/tfjs';
import { preprocessProductData } from './preprocessing';
import { extractFeatures } from './featureExtraction';
import { ModelRegistry } from '../utils/modelRegistry';

export class ProductRecommendationModel {
  constructor() {
    this.model = null;
    this.userEmbeddings = null;
    this.productEmbeddings = null;
  }

  async initialize() {
    try {
      // Load pre-trained model
      this.model = await ModelRegistry.loadModel('product_recommendations');
      
      // Initialize embeddings
      await this.loadEmbeddings();
    } catch (error) {
      console.error('Error initializing recommendation model:', error);
      throw error;
    }
  }

  async getRecommendations(product, userHistory) {
    const productFeatures = await extractFeatures(product);
    const userProfile = await this.getUserProfile(userHistory);

    // Get product and user embeddings
    const productEmbedding = await this.model.predict(productFeatures);
    const userEmbedding = await this.model.predict(userProfile);

    // Find similar products using cosine similarity
    const similarities = await this.calculateSimilarities(
      productEmbedding,
      this.productEmbeddings
    );

    // Get top recommendations
    return this.getTopProducts(similarities);
  }

  async calculateSimilarities(embedding, allEmbeddings) {
    // Compute cosine similarity using TensorFlow.js
    const similarities = tf.tidy(() => {
      const normalized = tf.div(
        embedding,
        tf.norm(embedding, 2)
      );
      
      const allNormalized = tf.div(
        allEmbeddings,
        tf.norm(allEmbeddings, 2, -1, true)
      );

      return tf.matMul(normalized, allNormalized, false, true);
    });

    return similarities.dataSync();
  }

  async getUserProfile(history) {
    // Aggregate user's historical preferences
    const features = await Promise.all(
      history.map(item => extractFeatures(item))
    );

    return tf.tidy(() => {
      const tensorFeatures = features.map(f => tf.tensor(f));
      return tf.stack(tensorFeatures).mean(0);
    });
  }

  private async loadEmbeddings() {
    // Load pre-computed product embeddings
    this.productEmbeddings = await ModelRegistry.loadEmbeddings('products');
    this.userEmbeddings = await ModelRegistry.loadEmbeddings('users');
  }

  private getTopProducts(similarities, n = 5) {
    // Get indices of top N similar products
    return Array.from(similarities)
      .map((score, index) => ({ score, index }))
      .sort((a, b) => b.score - a.score)
      .slice(0, n)
      .map(({ index }) => this.productEmbeddings[index]);
  }
}