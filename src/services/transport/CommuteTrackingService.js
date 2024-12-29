import { TripClassifier } from '../ml/transport/TripClassifier';
import { EmissionsPredictor } from '../ml/transport/EmissionsPredictor';
import { RouteOptimizer } from '../ml/transport/RouteOptimizer';
import { BehaviorAnalyzer } from '../ml/transport/BehaviorAnalyzer';

export class CommuteTrackingService {
  constructor() {
    this.tripClassifier = new TripClassifier();
    this.emissionsPredictor = new EmissionsPredictor();
    this.routeOptimizer = new RouteOptimizer();
    this.behaviorAnalyzer = new BehaviorAnalyzer();
  }

  async initialize() {
    await this.tripClassifier.initialize();
  }

  async trackCommute(tripData) {
    const transportMode = await this.tripClassifier.classifyTransportMode(tripData);
    const emissions = await this.emissionsPredictor.predictEmissions({
      ...tripData,
      mode: transportMode.mode,
    });
    
    return {
      ...tripData,
      transportMode,
      emissions,
      timestamp: Date.now(),
    };
  }

  async optimizeRoute(startPoint, endPoint, preferences) {
    return await this.routeOptimizer.optimizeRoute(
      startPoint,
      endPoint,
      preferences
    );
  }

  async analyzeCommutePatterns(userId) {
    const userHistory = await this.getUserCommuteHistory(userId);
    return await this.behaviorAnalyzer.analyzeCommutePatterns(userHistory);
  }

  private async getUserCommuteHistory(userId) {
    // Fetch user's commute history from storage
    return await CommuteStorage.getHistory(userId);
  }
}