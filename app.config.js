export default {
  name: 'Verdant',
  slug: 'verdant',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#12674A'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.verdant.app'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#12674A'
    },
    package: 'com.verdant.app'
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'webpack'
  }
};