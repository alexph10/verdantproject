import { regions } from './regions';
import { emissionFactors } from './emissionFactors';
import { certifications } from './certifications';
import { recyclingGuidelines } from './recyclingGuidelines';

export class RegionalDataService {
  constructor() {
    this.regions = regions;
    this.emissionFactors = emissionFactors;
    this.certifications = certifications;
    this.recyclingGuidelines = recyclingGuidelines;
  }

  getRegionData(countryCode) {
    return this.regions[countryCode];
  }

  getEmissionFactors(countryCode) {
    return this.emissionFactors[countryCode];
  }

  getCertifications(countryCode) {
    return this.certifications[countryCode];
  }

  getRecyclingGuidelines(countryCode) {
    return this.recyclingGuidelines[countryCode];
  }
}