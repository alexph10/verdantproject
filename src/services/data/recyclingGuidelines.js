export const recyclingGuidelines = {
  // United States - EPA guidelines
  US: {
    categories: {
      plastic: {
        accepted: ['#1 PET', '#2 HDPE', '#4 LDPE', '#5 PP'],
        preparation: 'Rinse containers, remove caps',
        exceptions: ['Plastic bags', 'Styrofoam'],
      },
      paper: {
        accepted: ['Newspapers', 'Magazines', 'Cardboard', 'Office paper'],
        preparation: 'Keep dry and clean',
        exceptions: ['Waxed paper', 'Food-contaminated paper'],
      },
      glass: {
        accepted: ['Clear glass', 'Green glass', 'Brown glass'],
        preparation: 'Rinse containers, remove lids',
        exceptions: ['Window glass', 'Ceramics'],
      },
      metal: {
        accepted: ['Aluminum cans', 'Steel cans', 'Tin cans'],
        preparation: 'Rinse containers',
        exceptions: ['Paint cans', 'Aerosol cans'],
      },
    },
    specialWaste: {
      electronics: 'Take to certified e-waste recycler',
      batteries: 'Return to retail collection points',
      chemicals: 'Take to household hazardous waste facility',
    },
  },

  // Canada - Environment Canada guidelines
  CA: {
    categories: {
      plastic: {
        accepted: ['#1 PET', '#2 HDPE', '#4 LDPE', '#5 PP'],
        preparation: 'Rinse containers, remove labels',
        exceptions: ['Plastic bags', 'Styrofoam'],
      },
      paper: {
        accepted: ['Newspapers', 'Magazines', 'Cardboard', 'Office paper'],
        preparation: 'Keep dry and clean',
        exceptions: ['Waxed paper', 'Tissues'],
      },
      glass: {
        accepted: ['Clear glass', 'Colored glass'],
        preparation: 'Rinse containers, remove lids',
        exceptions: ['Window glass', 'Drinking glasses'],
      },
      metal: {
        accepted: ['Aluminum cans', 'Steel cans', 'Tin cans'],
        preparation: 'Rinse containers',
        exceptions: ['Paint cans', 'Aerosol cans'],
      },
    },
    specialWaste: {
      electronics: 'Take to approved e-waste depot',
      batteries: 'Return to retail collection points',
      chemicals: 'Take to household hazardous waste depot',
    },
  },

  // European Union - EU guidelines
  EU: {
    categories: {
      plastic: {
        accepted: ['PET bottles', 'HDPE containers', 'PP containers'],
        preparation: 'Clean and sort by type',
        exceptions: ['Mixed plastics', 'Contaminated containers'],
      },
      paper: {
        accepted: ['Newspapers', 'Magazines', 'Cardboard', 'Office paper'],
        preparation: 'Keep dry and clean',
        exceptions: ['Thermal paper', 'Contaminated paper'],
      },
      glass: {
        accepted: ['Clear glass', 'Colored glass'],
        preparation: 'Sort by color, remove lids',
        exceptions: ['Crystal glass', 'Ceramics'],
      },
      metal: {
        accepted: ['Aluminum cans', 'Steel cans', 'Metal packaging'],
        preparation: 'Clean and compact',
        exceptions: ['Contaminated containers'],
      },
    },
    specialWaste: {
      electronics: 'Return to retailer or recycling center',
      batteries: 'Return to collection points',
      chemicals: 'Take to specialized waste facilities',
    },
  },

  // Japan - Ministry of Environment guidelines
  JP: {
    categories: {
      plastic: {
        accepted: ['PET bottles', 'Plastic containers', 'Packaging'],
        preparation: 'Clean, remove labels and caps',
        exceptions: ['Non-marked plastics'],
      },
      paper: {
        accepted: ['Newspapers', 'Magazines', 'Cardboard'],
        preparation: 'Bundle by type',
        exceptions: ['Thermal paper'],
      },
      glass: {
        accepted: ['Clear bottles', 'Colored bottles'],
        preparation: 'Sort by color',
        exceptions: ['Broken glass'],
      },
      metal: {
        accepted: ['Aluminum cans', 'Steel cans'],
        preparation: 'Clean and compact',
        exceptions: ['Spray cans'],
      },
    },
    specialWaste: {
      electronics: 'Follow home appliance recycling law',
      batteries: 'Return to collection points',
      chemicals: 'Follow municipal guidelines',
    },
  },

  // Add similar detailed guidelines for KR, AU, and NZ...
};