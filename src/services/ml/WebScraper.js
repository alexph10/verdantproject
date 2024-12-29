import { JSDOM } from 'jsdom';
import { extractStructuredData } from '../utils/structuredDataExtractor';
import { NLPProcessor } from './NLPProcessor';

export class WebScraper {
  constructor() {
    this.nlpProcessor = new NLPProcessor();
  }

  async scrapeProductData(url) {
    try {
      const html = await this.fetchPage(url);
      const dom = new JSDOM(html);
      
      return {
        structuredData: await this.extractStructuredData(dom),
        sustainabilityData: await this.extractSustainabilityInfo(dom),
        certifications: await this.extractCertifications(dom),
        materialInfo: await this.extractMaterialInfo(dom),
      };
    } catch (error) {
      console.error('Error scraping product data:', error);
      throw error;
    }
  }

  async extractSustainabilityInfo(dom) {
    const sustainabilityTexts = this.extractSustainabilityTexts(dom);
    return await this.nlpProcessor.analyzeSustainabilityContent(sustainabilityTexts);
  }

  async extractCertifications(dom) {
    const certImages = Array.from(dom.window.document.querySelectorAll('img'))
      .filter(img => this.isCertificationImage(img));

    return await Promise.all(
      certImages.map(img => this.identifyCertification(img))
    );
  }

  async extractMaterialInfo(dom) {
    const materialTexts = this.extractMaterialTexts(dom);
    return await this.nlpProcessor.extractMaterialComposition(materialTexts);
  }

  private isCertificationImage(img) {
    const certKeywords = ['certified', 'certification', 'label', 'standard'];
    return certKeywords.some(keyword => 
      img.alt?.toLowerCase().includes(keyword) ||
      img.src?.toLowerCase().includes(keyword)
    );
  }

  private async identifyCertification(img) {
    // Use image recognition to identify certification logos
    const logoFeatures = await this.extractImageFeatures(img.src);
    return await this.certificationClassifier.predict(logoFeatures);
  }

  private extractSustainabilityTexts(dom) {
    const sustainabilityKeywords = [
      'sustainable',
      'eco-friendly',
      'environmental',
      'green',
      'recycled',
      'organic',
    ];

    return Array.from(dom.window.document.querySelectorAll('p, div, span'))
      .filter(element => 
        sustainabilityKeywords.some(keyword =>
          element.textContent.toLowerCase().includes(keyword)
        )
      )
      .map(element => element.textContent.trim());
  }
}