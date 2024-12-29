const POINTS_MULTIPLIERS = {
  walking: 3,
  cycling: 2.5,
  publicTransport: 2,
  carpool: 1.5,
};

const STREAK_BONUSES = {
  weekly: 50,
  monthly: 200,
};

export function calculatePoints(commuteData) {
  const { distance, mode, streak } = commuteData;
  let points = 0;

  // Base points from distance and mode
  points += distance * (POINTS_MULTIPLIERS[mode] || 1);

  // Streak bonuses
  if (streak?.weekly) points += STREAK_BONUSES.weekly;
  if (streak?.monthly) points += STREAK_BONUSES.monthly;

  // Weather bonus (more points for sustainable commuting in bad weather)
  if (commuteData.weather?.unfavorable) {
    points *= 1.5;
  }

  // Round to nearest integer
  return Math.round(points);
}