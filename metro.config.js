const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add polyfills for Node.js modules
config.resolver.extraNodeModules = {
  buffer: require.resolve('buffer'),
  crypto: require.resolve('crypto-browserify'),
  stream: require.resolve('stream-browserify'),
  util: require.resolve('util'),
};

// Ensure proper module resolution
config.watchFolders = [path.resolve(__dirname)];

module.exports = config;