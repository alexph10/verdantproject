import { getActiveChallenge, getAllChallenges, updateChallengeProgress } from '../api/challengeApi';
import { calculateImpact } from '../utils/impactCalculator';
import { scheduleReminder } from '../utils/notificationScheduler';

export class ChallengeService {
  async getAvailableChallenges() {
    try {
      const challenges = await getAllChallenges();
      return challenges.map(challenge => ({
        ...challenge,
        estimatedImpact: calculateImpact(challenge),
      }));
    } catch (error) {
      console.error('Error fetching challenges:', error);
      throw error;
    }
  }

  async startChallenge(challengeId) {
    try {
      const challenge = await getActiveChallenge(challengeId);
      
      // Schedule daily reminders
      challenge.dailyTasks.forEach(task => {
        scheduleReminder(task.reminder, task.scheduledTime);
      });

      return challenge;
    } catch (error) {
      console.error('Error starting challenge:', error);
      throw error;
    }
  }

  async updateProgress(challengeId, taskId, data) {
    try {
      const progress = await updateChallengeProgress(challengeId, taskId, data);
      return {
        ...progress,
        impact: calculateImpact(progress),
      };
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  }
}