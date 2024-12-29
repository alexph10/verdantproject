import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, List, Text } from 'react-native-paper';
import ReceiptCamera from '../components/receipt/ReceiptCamera';
import { preprocessImage } from '../services/receipt/imageProcessor';
import { extractTextFromImage } from '../services/receipt/textExtractor';
import { theme } from '../theme';

export default function ReceiptScanScreen() {
  const [scanning, setScanning] = useState(false);
  const [items, setItems] = useState([]);
  const [showCamera, setShowCamera] = useState(false);

  const handleCapture = async (photo) => {
    try {
      setScanning(true);
      setShowCamera(false);

      // Process image
      const processedUri = await preprocessImage(photo.uri);
      const extractedItems = await extractTextFromImage(processedUri);

      setItems(extractedItems);
    } catch (error) {
      console.error('Receipt scanning error:', error);
    } finally {
      setScanning(false);
    }
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <ReceiptCamera onCapture={handleCapture} />
      ) : (
        <ScrollView>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>Scanned Items</Text>
              {items.length > 0 ? (
                <List.Section>
                  {items.map((item, index) => (
                    <List.Item
                      key={index}
                      title={item.name}
                      description={`$${item.price.toFixed(2)} - ${item.category}`}
                      left={props => (
                        <List.Icon
                          {...props}
                          icon={getCategoryIcon(item.category)}
                        />
                      )}
                    />
                  ))}
                </List.Section>
              ) : (
                <Text style={styles.emptyText}>
                  No items scanned yet
                </Text>
              )}
            </Card.Content>
          </Card>
          
          <Button
            mode="contained"
            onPress={() => setShowCamera(true)}
            style={styles.button}
            loading={scanning}
            disabled={scanning}
          >
            {scanning ? 'Processing...' : 'Scan Receipt'}
          </Button>
        </ScrollView>
      )}
    </View>
  );
}

function getCategoryIcon(category) {
  const icons = {
    produce: 'fruit-watermelon',
    dairy: 'cheese',
    meat: 'food-steak',
    pantry: 'food',
    household: 'home',
    other: 'shopping',
  };
  return icons[category] || 'shopping';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  card: {
    margin: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.h3,
    marginBottom: theme.spacing.md,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.text,
    opacity: 0.6,
  },
  button: {
    margin: theme.spacing.md,
  },
});