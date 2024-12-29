import React from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '../../hooks/useTheme';
import { SettingsSection } from './SettingsSection';
import { PlanCard } from './billing/PlanCard';
import { PaymentMethodsList } from './billing/PaymentMethodsList';
import { AddPaymentMethod } from './billing/AddPaymentMethod';
import { BillingHistory } from './billing/BillingHistory';
import { useBilling } from '../../hooks/useBilling';
import { Text } from '../typography';

export function BillingSettings() {
  const { currentPlan, loading } = useBilling();
  
  const styles = useThemedStyles(theme => ({
    container: {
      marginBottom: theme.spacing.lg,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: theme.spacing.lg,
    },
  }));

  if (loading) {
    return (
      <SettingsSection title="Billing & Payments">
        <Text>Loading billing information...</Text>
      </SettingsSection>
    );
  }

  return (
    <SettingsSection title="Billing & Payments">
      <View style={styles.container}>
        <View style={styles.section}>
          <Text variant="h4" color="textSecondary">Current Plan</Text>
          <PlanCard
            title="Personal Plan"
            price={10}
            interval="month"
            features={[
              'Carbon offsetting features',
              'Exclusive newsletters',
              'No commission fees for donations',
            ]}
            isActive={currentPlan === 'personal'}
          />
        </View>

        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text variant="h4" color="textSecondary">Payment Methods</Text>
          <PaymentMethodsList />
          <AddPaymentMethod />
        </View>

        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text variant="h4" color="textSecondary">Billing History</Text>
          <BillingHistory />
        </View>
      </View>
    </SettingsSection>
  );
}