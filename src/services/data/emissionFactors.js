export const emissionFactors = {
  // United States - EPA data
  US: {
    electricity: {
      national: 0.417, // kg CO2e per kWh
      regions: {
        'US-WECC': 0.327,
        'US-MRO': 0.456,
        'US-RFC': 0.437,
        'US-NPCC': 0.219,
      },
    },
    transport: {
      car: 0.404, // kg CO2e per mile
      bus: 0.14,
      train: 0.14,
      plane: 0.25,
    },
  },

  // Canada - Environment Canada data
  CA: {
    electricity: {
      national: 0.120,
      regions: {
        'CA-BC': 0.019,
        'CA-AB': 0.630,
        'CA-ON': 0.030,
        'CA-QC': 0.001,
      },
    },
    transport: {
      car: 0.206, // kg CO2e per km
      bus: 0.089,
      train: 0.041,
      plane: 0.121,
    },
  },

  // European Union - EEA data
  EU: {
    electricity: {
      national: 0.275,
      regions: {
        'EU-FR': 0.052,
        'EU-DE': 0.338,
        'EU-IT': 0.233,
      },
    },
    transport: {
      car: 0.192,
      bus: 0.068,
      train: 0.028,
      plane: 0.144,
    },
  },

  // Japan - Ministry of Environment data
  JP: {
    electricity: {
      national: 0.463,
      regions: {
        'JP-TEPCO': 0.468,
        'JP-KEPCO': 0.318,
        'JP-TOHOKU': 0.522,
      },
    },
    transport: {
      car: 0.173,
      bus: 0.048,
      train: 0.022,
      plane: 0.112,
    },
  },

  // South Korea - Ministry of Environment data
  KR: {
    electricity: {
      national: 0.459,
      regions: {
        'KR-KEPCO': 0.459,
      },
    },
    transport: {
      car: 0.198,
      bus: 0.062,
      train: 0.025,
      plane: 0.135,
    },
  },

  // Australia - Department of Industry, Science, Energy and Resources data
  AU: {
    electricity: {
      national: 0.79,
      regions: {
        'AU-NSW': 0.81,
        'AU-VIC': 0.98,
        'AU-QLD': 0.81,
        'AU-WA': 0.69,
      },
    },
    transport: {
      car: 0.182,
      bus: 0.065,
      train: 0.040,
      plane: 0.115,
    },
  },

  // New Zealand - Ministry for the Environment data
  NZ: {
    electricity: {
      national: 0.098,
      regions: {
        'NZ-NTH': 0.098,
        'NZ-STH': 0.098,
      },
    },
    transport: {
      car: 0.171,
      bus: 0.058,
      train: 0.032,
      plane: 0.116,
    },
  },
};