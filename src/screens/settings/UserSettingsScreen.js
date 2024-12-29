import React from 'react';
import { ScrollView } from 'react-native';
import { useThemedStyles } from '../../hooks/useTheme';
import { SettingsSection } from '../../components/settings/SettingsSection';
import { ProfileSettings } from '../../components/settings/ProfileSettings';
import { SecuritySettings } from '../../components/settings/SecuritySettings';
import { BillingSettings } from '../../components/settings/BillingSettings';
import { PreferencesSettings } from '../../components/settings/PreferencesSettings';
import { DangerZone } from '../../components/settings/DangerZone';

export function UserSettingsScreen() {
  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  }));

  return (
    <ScrollView style={styles.container}>
      <ProfileSettings />
      <SecuritySettings />
      <BillingSettings />
      <PreferencesSettings />
      <DangerZone />
    </ScrollView>
  );
}