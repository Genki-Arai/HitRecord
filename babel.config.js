module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Reanimatedプラグインをここで有効にします
      'react-native-reanimated/plugin',
    ],
  };
};