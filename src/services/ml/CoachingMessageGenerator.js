import { SentimentAnalyzer } from './models/SentimentAnalyzer';
import { MessageTemplateEngine } from './models/MessageTemplateEngine';

export class CoachingMessageGenerator {
  constructor() {
    this.sentimentAnalyzer = new SentimentAnalyzer();
    this.templateEngine = new MessageTemplateEngine();
  }

  async generateMessage(userData, challengeProgress) {
    const sentiment = await this.analyzeSentiment(userData.recentNotes);
    const context = this.buildContext(userData, challengeProgress);
    
    return this.templateEngine.generate({
      type: this.determineMessageType(context),
      sentiment,
      variables: context,
    });
  }

  private async analyzeSentiment(notes) {
    if (!notes?.length) return 'neutral';
    
    const sentiments = await Promise.all(
      notes.map(note => this.sentimentAnalyzer.analyze(note))
    );
    
    return this.aggregateSentiment(sentiments);
  }

  private determineMessageType(context) {
    if (context.progress < 0.3) return 'encouragement';
    if (context.progress > 0.7) return 'celebration';
    return 'motivation';
  }

  private buildContext(userData, progress) {
    return {
      progress: progress.completion,
      streak: userData.currentStreak,
      impact: progress.environmentalImpact,
      nextMilestone: this.calculateNextMilestone(progress),
      personalizedTips: this.getPersonalizedTips(userData, progress),
    };
  }

  private calculateNextMilestone(progress) {
    const milestones = [0.25, 0.5, 0.75, 1.0];
    return milestones.find(m => m > progress.completion) || 1.0;
  }

  private getPersonalizedTips(userData, progress) {
    // Select tips based on user's history and current progress
    const relevantTips = TIPS_DATABASE[progress.challengeType] || [];
    return relevantTips
      .filter(tip => !userData.seenTips.includes(tip.id))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3);
  }
}