import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { theme } from '../../theme';

export function LiveEmissionsChart({ data, timeRange }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    // Update chart data when new emissions data arrives
    if (data?.length) {
      const labels = data.map(d => 
        new Date(d.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      );
      const values = data.map(d => d.emissions);

      setChartData({
        labels: labels.slice(-6), // Show last 6 points
        datasets: [{ data: values.slice(-6) }],
      });
    }
  }, [data]);

  const chartConfig = {
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    color: (opacity = 1) => `rgba(18, 103, 74, ${opacity})`,
    strokeWidth: 2,
    propsForLabels: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.sizes.xs,
    },
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.lg,
  },
  chart: {
    borderRadius: theme.borderRadius.medium,
  },
});