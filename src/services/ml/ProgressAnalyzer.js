import { analyzeUserBehavior } from './behaviorAnalysis';
import { predictCompletionLikelihood } from './completionPredictor';

export class ProgressAnalyzer {
  async analyzeProgress(challengeData, userHistory) {
    const behaviorPatterns = await analyzeUserBehavior(userHistory);
    const completionProbability = await predictCompletionLikelihood(
      challengeData,
      behaviorPatterns
    );

    return {
      likelihood: completionProbability,
      insights: this.generateInsights(behaviorPatterns, challengeData),
      suggestions: this.generateSuggestions(behaviorPatterns, challengeData),
    };
  }

  private generateInsights(patterns, challengeData) {
    const insights = [];
    
    // Analyze completion patterns
    if (patterns.completionRate < 0.5) {
      insights.push({
        type: 'completion_risk',
        message: 'You might need extra support with this challenge',
        severity: 'high',
      });
    }

    // Analyze time patterns
    if (patterns.preferredTime) {
      insights.push({
        type: 'timing',
        message: `You're most successful when starting tasks at ${patterns.preferredTime}`,
        severity: 'medium',
      });
    }

    return insights;
  }

  private generateSuggestions(patterns, challengeData) {
    const suggestions = [];

    // Suggest modifications based on patterns
    if (patterns.struggleAreas.includes(challengeData.category)) {
      suggestions.push({
        type: 'modification',
        message: 'Consider breaking this challenge into smaller steps',
        action: 'modify_schedule',
      });
    }

    // Suggest support mechanisms
    if (patterns.socialSupport) {
      suggestions.push({
        type: 'support',
        message: 'Invite a friend to join this challenge',
        action: 'invite_friend',
      });
    }

    return suggestions;
  }
}