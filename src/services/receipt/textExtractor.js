import { GoogleVisionAPI } from '../api/googleVision';
import { cleanText, groupLines } from '../utils/textProcessing';

export async function extractTextFromImage(imageUri) {
  try {
    const response = await GoogleVisionAPI.detectText(imageUri);
    const blocks = response.textAnnotations || [];
    
    // Process text blocks
    const lines = blocks.map(block => ({
      text: cleanText(block.description),
      bounds: block.boundingPoly.vertices,
    }));

    // Group lines into logical sections
    const sections = groupLines(lines);
    
    return parseReceiptSections(sections);
  } catch (error) {
    console.error('Text extraction error:', error);
    throw error;
  }
}

function parseReceiptSections(sections) {
  const items = [];
  let currentSection = null;

  for (const section of sections) {
    if (isItemLine(section.text)) {
      const [name, price] = parseItemLine(section.text);
      items.push({
        name: name.trim(),
        price: parseFloat(price),
        quantity: 1, // Default quantity
        category: detectCategory(name),
      });
    }
  }

  return items;
}

function isItemLine(text) {
  // Check if line contains both item name and price
  return /.*\s+\$?\d+\.\d{2}\s*$/.test(text);
}

function parseItemLine(text) {
  // Split line into item name and price
  const match = text.match(/(.*?)\s+\$?(\d+\.\d{2})\s*$/);
  return match ? [match[1], match[2]] : [text, '0.00'];
}

function detectCategory(itemName) {
  const categories = {
    produce: ['apple', 'banana', 'vegetable', 'fruit'],
    dairy: ['milk', 'cheese', 'yogurt', 'cream'],
    meat: ['chicken', 'beef', 'fish', 'pork'],
    pantry: ['pasta', 'rice', 'cereal', 'bread'],
    household: ['paper', 'cleaner', 'soap', 'detergent'],
  };

  const itemLower = itemName.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => itemLower.includes(keyword))) {
      return category;
    }
  }

  return 'other';
}