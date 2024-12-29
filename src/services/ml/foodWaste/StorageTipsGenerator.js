import { NLPProcessor } from '../NLPProcessor';

export class StorageTipsGenerator {
  constructor() {
    this.nlpProcessor = new NLPProcessor();
  }

  async generateTips(foodItem) {
    const itemContext = await this.analyzeItemContext(foodItem);
    const storageTips = await this.getStorageTipsForContext(itemContext);
    
    return {
      tips: this.prioritizeTips(storageTips, itemContext),
      confidence: this.calculateConfidence(storageTips),
    };
  }

  private async analyzeItemContext(foodItem) {
    const { category, condition, storageMethod } = foodItem;
    
    return {
      category,
      perishability: this.calculatePerishability(category),
      currentStorageEffectiveness: this.evaluateStorageMethod(storageMethod),
      environmentalFactors: await this.getEnvironmentalFactors(),
    };
  }

  private calculatePerishability(category) {
    const perishabilityScores = {
      produce: 0.8,
      dairy: 0.7,
      meat: 0.9,
      pantry: 0.3,
    };
    return perishabilityScores[category] || 0.5;
  }

  private evaluateStorageMethod(method) {
    const methodScores = {
      refrigerated: 0.8,
      frozen: 0.9,
      roomTemp: 0.5,
      sealed: 0.7,
    };
    return methodScores[method] || 0.5;
  }

  private async getEnvironmentalFactors() {
    // Get local temperature and humidity data
    return {
      temperature: 22, // Celsius
      humidity: 50, // Percentage
      season: this.getCurrentSeason(),
    };
  }

  private async getStorageTipsForContext(context) {
    const tips = [];
    
    if (context.perishability > 0.7) {
      tips.push({
        type: 'temperature',
        tip: this.generateTemperatureTip(context),
        importance: 'high',
      });
    }

    if (context.currentStorageEffectiveness < 0.6) {
      tips.push({
        type: 'method',
        tip: this.generateStorageMethodTip(context),
        importance: 'medium',
      });
    }

    return tips;
  }

  private generateTemperatureTip(context) {
    const { category, environmentalFactors } = context;
    const tempRanges = {
      produce: [1, 4],
      dairy: [0, 4],
      meat: [0, 2],
    };

    const range = tempRanges[category];
    if (range) {
      return `Store between ${range[0]}°C and ${range[1]}°C for optimal freshness`;
    }
    return 'Store at room temperature in a cool, dry place';
  }

  private generateStorageMethodTip(context) {
    const { category, perishability } = context;
    
    if (perishability > 0.8) {
      return 'Use airtight containers and store in the coldest part of your fridge';
    }
    if (perishability > 0.5) {
      return 'Store in a sealed container to maintain freshness';
    }
    return 'Store in a cool, dry place away from direct sunlight';
  }

  private prioritizeTips(tips, context) {
    return tips
      .sort((a, b) => {
        const importanceScore = {
          high: 3,
          medium: 2,
          low: 1,
        };
        return importanceScore[b.importance] - importanceScore[a.importance];
      })
      .map(tip => ({
        ...tip,
        relevance: this.calculateTipRelevance(tip, context),
      }));
  }

  private calculateTipRelevance(tip, context) {
    let relevance = 1.0;
    
    if (tip.type === 'temperature' && context.environmentalFactors.temperature > 25) {
      relevance *= 1.2;
    }
    
    if (tip.type === 'method' && context.perishability > 0.7) {
      relevance *= 1.3;
    }
    
    return Math.min(relevance, 1);
  }

  private calculateConfidence(tips) {
    return tips.reduce((sum, tip) => sum + tip.relevance, 0) / tips.length;
  }

  private getCurrentSeason() {
    const month = new Date().getMonth();
    const seasons = ['winter', 'spring', 'summer', 'fall'];
    return seasons[Math.floor(month / 3) % 4];
  }
}