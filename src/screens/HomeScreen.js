import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { Text } from '../components/typography';
import { FootprintSummary } from '../components/dashboard/FootprintSummary';
import { EmissionsTips } from '../components/dashboard/EmissionsTips';
import { DonationSection } from '../components/dashboard/DonationSection';
import { RealTimeUpdates } from '../components/dashboard/RealTimeUpdates';
import { LiveEmissionsChart } from '../components/dashboard/LiveEmissionsChart';
import { EmissionAlerts } from '../components/dashboard/EmissionAlerts';
import { useEmissionsData } from '../hooks/useEmissionsData';
import { theme } from '../theme';

export default function HomeScreen() {
  const [timeRange, setTimeRange] = useState('month');
  const { data, loading } = useEmissionsData('current-user', timeRange);

  const alerts = [
    {
      type: 'warning',
      title: 'High Transport Emissions',
      message: 'Your transport emissions are 20% above average this week.',
    },
    {
      type: 'info',
      title: 'Energy Savings',
      message: 'Great job! Your energy usage is down 15% this month.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <Text variant="h1">Dashboard</Text>
        <RealTimeUpdates userId="current-user" />
      </Surface>

      <LiveEmissionsChart 
        data={data} 
        timeRange={timeRange} 
      />

      <EmissionAlerts alerts={alerts} />
      
      <FootprintSummary 
        data={data} 
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />
      
      <EmissionsTips tips={mockTips} />
      <DonationSection donations={mockDonations} />
    </ScrollView>
  );
}

const mockTips = [
  {
    title: 'Invest in a renewable energy source for electricity',
  },
  {
    title: 'Insulate your house and draught-proof your windows and doors',
  },
  {
    title: 'Cut showering time by only one minute to save energy and water',
  },
];

const mockDonations = [
  {
    organization: 'Flower International',
    amount: 25,
    image: require('../assets/images/flower.png'),
  },
  {
    organization: 'Penguins International',
    amount: 25,
    image: require('../assets/images/penguin.png'),
  },
  {
    organization: 'Bee International',
    amount: 25,
    image: require('../assets/images/bee.png'),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
});