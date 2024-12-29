export class EmissionsAnalyzer {
  analyzeEmissionsTrend(data) {
    const trend = this.calculateTrend(data);
    const categories = this.analyzeCategories(data);
    const recommendations = this.generateRecommendations(trend, categories);

    return {
      trend,
      categories,
      recommendations,
      summary: this.generateSummary(trend, categories),
    };
  }

  private calculateTrend(data) {
    // Calculate trend using linear regression
    const points = data.map((d, i) => ({ x: i, y: d.emissions }));
    return this.linearRegression(points);
  }

  private analyzeCategories(data) {
    return data.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + entry.emissions;
      return acc;
    }, {});
  }

  private generateRecommendations(trend, categories) {
    const recommendations = [];
    
    if (trend.slope > 0) {
      recommendations.push({
        type: 'warning',
        message: 'Your emissions are trending upward',
        priority: 'high',
      });
    }

    // Add category-specific recommendations
    Object.entries(categories).forEach(([category, emissions]) => {
      if (emissions > 100) {
        recommendations.push({
          type: 'reduction',
          category,
          message: `Consider reducing ${category} emissions`,
          priority: 'medium',
        });
      }
    });

    return recommendations;
  }

  private linearRegression(points) {
    // Simple linear regression implementation
    const n = points.length;
    const sumX = points.reduce((sum, p) => sum + p.x, 0);
    const sumY = points.reduce((sum, p) => sum + p.y, 0);
    const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
    const sumXX = points.reduce((sum, p) => sum + p.x * p.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  }
}