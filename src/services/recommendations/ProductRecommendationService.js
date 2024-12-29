import { fetchProductAlternatives } from '../api/productApi';
import { calculateSustainabilityScore } from '../utils/sustainabilityCalculator';
import { getShippingImpact } from '../utils/shippingCalculator';
import { validateProduct } from '../utils/productValidator';

export class ProductRecommendationService {
  async getRecommendations(product) {
    try {
      // Validate input product
      validateProduct(product);

      // Get eco-friendly alternatives
      const alternatives = await fetchProductAlternatives(product.category);

      // Calculate scores and impacts for each alternative
      const recommendationsWithScores = await Promise.all(
        alternatives.map(async (alt) => {
          const sustainabilityScore = await calculateSustainabilityScore(alt);
          const shippingImpact = await getShippingImpact(alt);

          return {
            ...alt,
            sustainabilityScore,
            shippingImpact,
            totalScore: this.calculateTotalScore(sustainabilityScore, shippingImpact),
          };
        })
      );

      // Sort by total score and return top recommendations
      return this.sortAndFilterRecommendations(recommendationsWithScores);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  }

  calculateTotalScore(sustainabilityScore, shippingImpact) {
    // Weight factors for different components
    const weights = {
      sustainability: 0.7,
      shipping: 0.3,
    };

    return (
      sustainabilityScore * weights.sustainability +
      (1 - shippingImpact) * weights.shipping
    );
  }

  sortAndFilterRecommendations(recommendations) {
    return recommendations
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 5); // Return top 5 recommendations
  }
}