module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from', // For web support
      'react-native-worklets/plugin' // Must be last
    ]
  };
};
