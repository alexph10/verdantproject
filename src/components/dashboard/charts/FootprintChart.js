import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { theme } from '../../../theme';

export function FootprintChart({ data, timeRange }) {
  const chartConfig = {
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    color: (opacity = 1) => `rgba(18, 103, 74, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
    propsForLabels: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.sizes.xs,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - theme.spacing.lg * 4}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.lg,
    alignItems: 'center',
  },
  chart: {
    borderRadius: theme.borderRadius.medium,
  },
});