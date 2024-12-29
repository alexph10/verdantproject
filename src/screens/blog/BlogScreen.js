import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { BlogHeader } from '../../components/blog/BlogHeader';
import { ArticleList } from '../../components/blog/ArticleList';
import { CategoryFilter } from '../../components/blog/CategoryFilter';
import { NewsletterPreferences } from '../../components/blog/NewsletterPreferences';
import { theme } from '../../theme';

export function BlogScreen() {
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [view, setView] = useState('grid');

  return (
    <ScrollView style={styles.container}>
      <BlogHeader />
      
      <Surface style={styles.content}>
        <CategoryFilter
          selected={selectedCategories}
          onSelect={setSelectedCategories}
        />
        
        <ArticleList
          categories={selectedCategories}
          viewMode={view}
          onViewModeChange={setView}
        />
      </Surface>

      <NewsletterPreferences />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    margin: theme.spacing.md,
    borderRadius: theme.spacing.sm,
  },
});