import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ArticleCard } from './ArticleCard';
import { theme } from '../../theme';

export function ArticleList({ categories, viewMode, onViewModeChange }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon={viewMode === 'grid' ? 'view-grid' : 'view-list'}
          onPress={() => onViewModeChange(viewMode === 'grid' ? 'list' : 'grid')}
        />
      </View>

      <View style={[
        styles.grid,
        viewMode === 'list' && styles.list
      ]}>
        {/* Sample articles - replace with real data */}
        <ArticleCard
          title="Understanding Carbon Footprints"
          excerpt="A comprehensive guide to measuring and reducing your environmental impact."
          category="Education"
          readTime="5 min"
          image="carbon-footprint.jpg"
          viewMode={viewMode}
        />
        <ArticleCard
          title="Sustainable Home Guide"
          excerpt="Simple steps to make your living space more eco-friendly."
          category="Lifestyle"
          readTime="8 min"
          image="sustainable-home.jpg"
          viewMode={viewMode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  list: {
    flexDirection: 'column',
  },
});