import React from 'react';
import { ScrollView } from 'react-native';
import { useThemedStyles } from '../../hooks/useTheme';
import { RecyclingMap } from '../../components/recycling/RecyclingMap';
import { MaterialSearch } from '../../components/recycling/MaterialSearch';
import { LocalGuidelines } from '../../components/recycling/LocalGuidelines';
import { RecyclingStats } from '../../components/recycling/RecyclingStats';
import { useLocation } from '../../hooks/useLocation';

export function RecyclingGuideScreen() {
  const { location, loading: locationLoading } = useLocation();
  
  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.md,
    },
  }));

  return (
    <ScrollView style={styles.container}>
      <RecyclingMap location={location} loading={locationLoading} />
      <MaterialSearch />
      <LocalGuidelines location={location} />
      <RecyclingStats />
    </ScrollView>
  );
}