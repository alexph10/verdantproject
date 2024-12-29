import { storeProgress } from '../storage/challengeStorage';
import { calculateImpact } from '../utils/impactCalculator';
import { scheduleReminder } from '../utils/notificationScheduler';

export class ChallengeTracker {
  async startChallenge(userId, challengeId) {
    try {
      const challenge = await this.initializeChallenge(challengeId);
      await this.scheduleReminders(challenge);
      
      return {
        ...challenge,
        startDate: new Date(),
        progress: 0,
        status: 'active',
      };
    } catch (error) {
      console.error('Error starting challenge:', error);
      throw error;
    }
  }

  async updateProgress(userId, challengeId, progress) {
    try {
      const impact = await calculateImpact(progress);
      const updatedProgress = {
        ...progress,
        impact,
        timestamp: new Date(),
      };

      await storeProgress(userId, challengeId, updatedProgress);
      return updatedProgress;
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  }

  private async initializeChallenge(challengeId) {
    // Initialize challenge data and create daily tasks
    const challenge = await this.fetchChallengeTemplate(challengeId);
    return {
      ...challenge,
      dailyTasks: this.generateDailyTasks(challenge),
    };
  }

  private async scheduleReminders(challenge) {
    challenge.dailyTasks.forEach(task => {
      scheduleReminder({
        title: 'Daily Challenge Task',
        body: task.reminder,
        data: { challengeId: challenge.id, taskId: task.id },
        trigger: {
          hour: task.reminderTime.hour,
          minute: task.reminderTime.minute,
          repeats: true,
        },
      });
    });
  }

  private generateDailyTasks(challenge) {
    return challenge.taskTemplates.map(template => ({
      id: generateId(),
      title: template.title,
      description: template.description,
      tips: template.tips,
      reminder: template.reminder,
      reminderTime: template.reminderTime,
      completed: false,
    }));
  }
}