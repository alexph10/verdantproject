import { tokenizeText } from '../utils/textProcessing';
import { normalizeNumericFeatures } from '../utils/dataNormalization';

export async function extractFeatures(product) {
  const features = await Promise.all([
    extractTextFeatures(product),
    extractNumericalFeatures(product),
    extractCategoryFeatures(product),
    extractMaterialFeatures(product),
  ]);

  return tf.concat(features);
}

async function extractTextFeatures(product) {
  // Extract features from text descriptions using pre-trained embeddings
  const textFields = [
    product.name,
    product.description,
    product.manufacturer,
  ].filter(Boolean);

  const tokens = await tokenizeText(textFields.join(' '));
  return await getWordEmbeddings(tokens);
}

async function extractNumericalFeatures(product) {
  const features = [
    product.price,
    product.weight,
    product.carbonFootprint,
    ...product.ratings,
  ];

  return normalizeNumericFeatures(features);
}

async function extractCategoryFeatures(product) {
  // One-hot encode product categories
  const categories = await getCategoryHierarchy(product.category);
  return encodeCategoryFeatures(categories);
}

async function extractMaterialFeatures(product) {
  // Create material composition vector
  return product.materials.map(material => ({
    type: material.type,
    percentage: material.percentage / 100,
  }));
}

async function getWordEmbeddings(tokens) {
  // Use pre-trained word embeddings (e.g., GloVe)
  const embeddings = await ModelRegistry.loadEmbeddings('word2vec');
  return tokens.map(token => embeddings[token] || embeddings['UNK']);
}