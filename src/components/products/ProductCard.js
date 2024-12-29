import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import { theme } from '../../theme';
import { SustainabilityBadge } from './SustainabilityBadge';
import { ShippingImpactIndicator } from './ShippingImpactIndicator';

export function ProductCard({ product }) {
  const {
    name,
    price,
    sustainabilityScore,
    shippingImpact,
    certifications,
    materials,
  } = product;

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: product.imageUrl }} />
      <Card.Content>
        <Title>{name}</Title>
        <Paragraph>${price.toFixed(2)}</Paragraph>
        
        <View style={styles.scoreContainer}>
          <SustainabilityBadge score={sustainabilityScore} />
          <ShippingImpactIndicator impact={shippingImpact} />
        </View>

        <View style={styles.certificationsContainer}>
          {certifications.map(cert => (
            <Chip key={cert} style={styles.chip}>
              {cert}
            </Chip>
          ))}
        </View>

        <View style={styles.materialsContainer}>
          {materials.map(material => (
            <Paragraph key={material.type}>
              {material.type}: {material.percentage}%
            </Paragraph>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.sm,
  },
  certificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: theme.spacing.sm,
  },
  chip: {
    margin: theme.spacing.xs,
  },
  materialsContainer: {
    marginTop: theme.spacing.sm,
  },
});