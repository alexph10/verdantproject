import * as tf from '@tensorflow/tfjs';
import { ModelRegistry } from '../utils/modelRegistry';
import { extractUserFeatures } from './featureExtraction';

export class ChallengeRecommendationEngine {
  constructor() {
    this.model = null;
    this.challengeEmbeddings = null;
  }

  async initialize() {
    try {
      this.model = await ModelRegistry.loadModel('challenge_recommendations');
      this.challengeEmbeddings = await ModelRegistry.loadEmbeddings('challenges');
    } catch (error) {
      console.error('Error initializing challenge recommendation engine:', error);
      throw error;
    }
  }

  async getPersonalizedChallenges(userData) {
    const userFeatures = await extractUserFeatures(userData);
    const userEmbedding = await this.model.predict(userFeatures);
    
    // Find challenges that match user's sustainability profile
    const similarities = await this.calculateSimilarities(
      userEmbedding,
      this.challengeEmbeddings
    );

    return this.rankChallenges(similarities, userData.completedChallenges);
  }

  async calculateSimilarities(userEmbedding, challengeEmbeddings) {
    return tf.tidy(() => {
      const normalized = tf.div(userEmbedding, tf.norm(userEmbedding));
      const allNormalized = tf.div(
        challengeEmbeddings,
        tf.norm(challengeEmbeddings, 2, -1, true)
      );
      return tf.matMul(normalized, allNormalized, false, true);
    });
  }

  private rankChallenges(similarities, completedChallenges) {
    return similarities
      .map((score, index) => ({
        challenge: this.challengeEmbeddings[index],
        score,
        difficulty: this.calculateDifficulty(
          this.challengeEmbeddings[index],
          completedChallenges
        ),
      }))
      .sort((a, b) => b.score - a.score)
      .filter(item => !completedChallenges.includes(item.challenge.id));
  }

  private calculateDifficulty(challenge, completedChallenges) {
    // Adjust difficulty based on user's history
    const baseScore = challenge.difficulty;
    const relatedCompleted = completedChallenges.filter(
      c => c.category === challenge.category
    ).length;
    
    return Math.max(1, baseScore - (relatedCompleted * 0.2));
  }
}