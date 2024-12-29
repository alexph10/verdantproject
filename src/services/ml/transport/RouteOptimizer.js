import { fetchTransitData } from '../../api/transitApi';
import { calculateRoute } from '../../utils/routeCalculator';

export class RouteOptimizer {
  async optimizeRoute(startPoint, endPoint, preferences) {
    const transitData = await fetchTransitData(startPoint, endPoint);
    const routes = await this.generateRouteOptions(startPoint, endPoint, transitData);
    
    return this.rankRoutes(routes, preferences);
  }

  private async generateRouteOptions(start, end, transitData) {
    const options = [];
    
    // Generate multimodal route options
    for (const mode of ['walking', 'cycling', 'transit']) {
      const route = await calculateRoute(start, end, {
        mode,
        transitData,
      });
      
      options.push({
        ...route,
        emissions: this.calculateRouteEmissions(route),
        duration: this.calculateRouteDuration(route),
        complexity: this.calculateRouteComplexity(route),
      });
    }
    
    return options;
  }

  private rankRoutes(routes, preferences) {
    const { prioritizeTime, maxWalkingDistance, avoidTransfers } = preferences;
    
    return routes
      .filter(route => route.walkingDistance <= maxWalkingDistance)
      .map(route => ({
        ...route,
        score: this.calculateRouteScore(route, preferences),
      }))
      .sort((a, b) => b.score - a.score);
  }

  private calculateRouteScore(route, preferences) {
    const { prioritizeTime, avoidTransfers } = preferences;
    
    const timeScore = 1 - (route.duration / 3600); // Normalize to 0-1
    const emissionScore = 1 - (route.emissions / 10); // Normalize to 0-1
    const transferScore = 1 - (route.transfers * 0.2);
    
    return (
      timeScore * (prioritizeTime ? 0.5 : 0.3) +
      emissionScore * 0.4 +
      transferScore * (avoidTransfers ? 0.3 : 0.1)
    );
  }
}