const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ensure Metro can resolve ESM/mjs files
config.resolver.sourceExts = [...(config.resolver.sourceExts || []), 'mjs'];

// Force Metro to use project-local resolution only
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Prevent cross-project module resolution
config.resolver.disableHierarchicalLookup = true;

// Add alias for @supabase/node-fetch to prevent dynamic import issues
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@supabase/node-fetch': path.resolve(__dirname, 'shims', 'node-fetch.js'),
};

// Clear Metro transform cache on each build
config.resetCache = true;

// Ensure proper module resolution
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
];

module.exports = config;
