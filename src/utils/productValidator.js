export function validateProduct(product) {
  const requiredFields = [
    'id',
    'name',
    'category',
    'manufacturer',
    'price',
    'materials',
  ];

  const missingFields = requiredFields.filter(field => !product[field]);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  validateMaterials(product.materials);
  validatePrice(product.price);
  validateCategory(product.category);
}

function validateMaterials(materials) {
  if (!Array.isArray(materials)) {
    throw new Error('Materials must be an array');
  }

  materials.forEach(material => {
    if (!material.type || !material.percentage) {
      throw new Error('Each material must have a type and percentage');
    }

    if (material.percentage < 0 || material.percentage > 100) {
      throw new Error('Material percentage must be between 0 and 100');
    }
  });

  const totalPercentage = materials.reduce((sum, m) => sum + m.percentage, 0);
  if (Math.abs(totalPercentage - 100) > 0.1) {
    throw new Error('Material percentages must sum to 100%');
  }
}

function validatePrice(price) {
  if (typeof price !== 'number' || price < 0) {
    throw new Error('Price must be a positive number');
  }
}

function validateCategory(category) {
  const validCategories = [
    'clothing',
    'electronics',
    'home',
    'food',
    'beauty',
    'office',
  ];

  if (!validCategories.includes(category)) {
    throw new Error(`Invalid category. Must be one of: ${validCategories.join(', ')}`);
  }
}