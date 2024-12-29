import * as Notifications from 'expo-notifications';

export async function scheduleReminder(message, scheduledTime) {
  try {
    const trigger = new Date(scheduledTime);
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Challenge Reminder',
        body: message,
        data: { type: 'challenge_reminder' },
      },
      trigger,
    });
  } catch (error) {
    console.error('Error scheduling reminder:', error);
  }
}

export async function cancelReminder(identifier) {
  try {
    await Notifications.cancelScheduledNotificationAsync(identifier);
  } catch (error) {
    console.error('Error canceling reminder:', error);
  }
}