import { ChallengeRecommendationEngine } from '../ml/ChallengeRecommendationEngine';
import { ProgressAnalyzer } from '../ml/ProgressAnalyzer';
import { CoachingMessageGenerator } from '../ml/CoachingMessageGenerator';

export class ChallengeRecommender {
  constructor() {
    this.recommendationEngine = new ChallengeRecommendationEngine();
    this.progressAnalyzer = new ProgressAnalyzer();
    this.messageGenerator = new CoachingMessageGenerator();
  }

  async getPersonalizedChallenges(userData) {
    try {
      const challenges = await this.recommendationEngine.getPersonalizedChallenges(userData);
      
      return challenges.map(challenge => ({
        ...challenge,
        difficulty: this.calculateDifficulty(challenge, userData),
        estimatedImpact: this.calculateEstimatedImpact(challenge, userData),
        relevanceScore: this.calculateRelevanceScore(challenge, userData),
      }));
    } catch (error) {
      console.error('Error getting personalized challenges:', error);
      throw error;
    }
  }

  async generateCoachingMessage(userData, challengeProgress) {
    try {
      const analysis = await this.progressAnalyzer.analyzeProgress(
        challengeProgress,
        userData.history
      );

      return this.messageGenerator.generateMessage(userData, analysis);
    } catch (error) {
      console.error('Error generating coaching message:', error);
      throw error;
    }
  }

  private calculateDifficulty(challenge, userData) {
    const baseScore = challenge.difficulty;
    const completedSimilar = userData.completedChallenges.filter(
      c => c.category === challenge.category
    ).length;

    return Math.max(1, baseScore - (completedSimilar * 0.2));
  }

  private calculateEstimatedImpact(challenge, userData) {
    const baseImpact = challenge.baseImpact;
    const userEfficiency = this.calculateUserEfficiency(userData);

    return {
      carbon: baseImpact.carbon * userEfficiency,
      water: baseImpact.water * userEfficiency,
      waste: baseImpact.waste * userEfficiency,
    };
  }

  private calculateRelevanceScore(challenge, userData) {
    const factors = {
      userInterests: this.matchUserInterests(challenge, userData.interests),
      seasonality: this.checkSeasonality(challenge),
      localRelevance: this.checkLocalRelevance(challenge, userData.location),
      urgency: this.calculateUrgency(challenge, userData),
    };

    return Object.values(factors).reduce((sum, score) => sum + score, 0) / 4;
  }

  private calculateUserEfficiency(userData) {
    const completionRates = userData.completedChallenges.map(c => c.completionRate);
    return completionRates.length > 0
      ? completionRates.reduce((sum, rate) => sum + rate, 0) / completionRates.length
      : 0.8; // Default efficiency for new users
  }
}