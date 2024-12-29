import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from '../typography';
import { Card } from 'react-native-paper';
import { theme } from '../../theme';

export function DonationSection({ donations }) {
  return (
    <View style={styles.container}>
      <Text variant="h2">Your donations</Text>
      
      <View style={styles.donationCards}>
        {donations.map((donation, index) => (
          <Card key={index} style={styles.card}>
            <Image source={donation.image} style={styles.image} />
            <Card.Content>
              <Text variant="h3">{donation.organization}</Text>
              <Text variant="caption">Your donation</Text>
              <Text variant="bodyLarge">${donation.amount} per month</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
  donationCards: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  card: {
    flex: 1,
    maxWidth: '33%',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
});