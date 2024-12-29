// API configuration
export const API_BASE_URL = 'https://api.verdant.app/v1';

// Feature flags
export const FEATURES = {
  SMART_HOME_INTEGRATION: true,
  RECEIPT_SCANNING: true,
  GPS_TRACKING: true,
};

// API endpoints
export const ENDPOINTS = {
  TRANSPORT: '/transport',
  RECEIPTS: '/receipts',
  ENERGY: '/energy',
};

// Request timeouts
export const TIMEOUTS = {
  DEFAULT: 5000,
  UPLOAD: 15000,
  SYNC: 10000,
};