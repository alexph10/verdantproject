export class MaterialCategoryService {
  categorizeItem(item) {
    const categories = this.detectCategories(item);
    return {
      primaryCategory: categories[0],
      alternativeCategories: categories.slice(1),
      confidence: this.calculateConfidence(categories),
      suggestions: this.generateSuggestions(categories),
    };
  }

  private detectCategories(item) {
    const categories = [];
    
    // Check material composition
    if (this.isPlastic(item)) categories.push('plastic');
    if (this.isPaper(item)) categories.push('paper');
    if (this.isGlass(item)) categories.push('glass');
    if (this.isMetal(item)) categories.push('metal');
    if (this.isOrganic(item)) categories.push('organic');
    if (this.isElectronic(item)) categories.push('e-waste');
    
    return categories;
  }

  private calculateConfidence(categories) {
    // Simple confidence calculation
    return categories.length > 0 ? 1 / categories.length : 0;
  }

  private generateSuggestions(categories) {
    return categories.map(category => ({
      category,
      preparation: this.getPreparationSteps(category),
      bestPractices: this.getBestPractices(category),
    }));
  }

  // Material detection methods
  private isPlastic(item) {
    const plasticKeywords = ['plastic', 'PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS'];
    return this.matchKeywords(item, plasticKeywords);
  }

  private isPaper(item) {
    const paperKeywords = ['paper', 'cardboard', 'carton', 'newspaper', 'magazine'];
    return this.matchKeywords(item, paperKeywords);
  }

  private isGlass(item) {
    const glassKeywords = ['glass', 'bottle', 'jar'];
    return this.matchKeywords(item, glassKeywords);
  }

  private isMetal(item) {
    const metalKeywords = ['metal', 'aluminum', 'steel', 'tin', 'can'];
    return this.matchKeywords(item, metalKeywords);
  }

  private isOrganic(item) {
    const organicKeywords = ['food', 'vegetable', 'fruit', 'plant'];
    return this.matchKeywords(item, organicKeywords);
  }

  private isElectronic(item) {
    const electronicKeywords = ['battery', 'electronic', 'device', 'charger'];
    return this.matchKeywords(item, electronicKeywords);
  }

  private matchKeywords(item, keywords) {
    return keywords.some(keyword => 
      item.name?.toLowerCase().includes(keyword.toLowerCase()) ||
      item.description?.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private getPreparationSteps(category) {
    const preparationGuides = {
      plastic: ['Rinse container', 'Remove caps', 'Flatten if possible'],
      paper: ['Remove tape', 'Flatten boxes', 'Keep dry'],
      glass: ['Rinse container', 'Remove lids', 'Sort by color'],
      metal: ['Rinse container', 'Remove labels if possible'],
      organic: ['Remove packaging', 'No meat or dairy'],
      'e-waste': ['Remove batteries', 'Secure personal data'],
    };
    
    return preparationGuides[category] || [];
  }

  private getBestPractices(category) {
    const bestPractices = {
      plastic: ['Check recycling number', 'Avoid black plastic'],
      paper: ['Keep clean and dry', 'Remove non-paper items'],
      glass: ['Sort by color', 'Handle with care'],
      metal: ['Check if magnetic', 'Remove non-metal parts'],
      organic: ['Use compost bin', 'Avoid contamination'],
      'e-waste': ['Use authorized recyclers', 'Keep batteries separate'],
    };
    
    return bestPractices[category] || [];
  }
}