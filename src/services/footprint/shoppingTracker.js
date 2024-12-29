import { parseReceipt } from '../utils/receiptParser';
import { predictProductEmissions } from '../ml/shoppingPredictor';
import { storeFootprintData } from '../storage/footprintStorage';

export class ShoppingTracker {
  async processReceipt(receiptImage) {
    try {
      const items = await parseReceipt(receiptImage);
      const itemsWithEmissions = await Promise.all(
        items.map(async item => {
          const emissions = await predictProductEmissions(item);
          return { ...item, emissions };
        })
      );

      const totalEmissions = itemsWithEmissions.reduce(
        (sum, item) => sum + item.emissions,
        0
      );

      await storeFootprintData('shopping', {
        items: itemsWithEmissions,
        totalEmissions,
        timestamp: Date.now(),
      });

      return itemsWithEmissions;
    } catch (error) {
      console.error('Receipt processing error:', error);
      throw error;
    }
  }

  async processOnlineOrder(orderData) {
    try {
      const itemsWithEmissions = await Promise.all(
        orderData.items.map(async item => {
          const emissions = await predictProductEmissions(item);
          return { ...item, emissions };
        })
      );

      const shippingEmissions = await this.calculateShippingEmissions(
        orderData.shipping
      );

      const totalEmissions = itemsWithEmissions.reduce(
        (sum, item) => sum + item.emissions,
        0
      ) + shippingEmissions;

      await storeFootprintData('shopping', {
        items: itemsWithEmissions,
        shippingEmissions,
        totalEmissions,
        timestamp: Date.now(),
      });

      return {
        items: itemsWithEmissions,
        shippingEmissions,
        totalEmissions,
      };
    } catch (error) {
      console.error('Online order processing error:', error);
      throw error;
    }
  }

  async calculateShippingEmissions(shippingData) {
    // Calculate based on distance, method, and package weight
    const baseEmissions = shippingData.distance * 0.1; // kg CO2e per km
    const methodMultiplier = {
      ground: 1,
      air: 2.5,
      express: 3,
    }[shippingData.method] || 1;

    return baseEmissions * methodMultiplier * (shippingData.weight / 1000);
  }
}