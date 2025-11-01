module.exports = {
  presets: ['module:metro-react-native-babel-preset'], // ✅ correct preset for RN

  plugins: [
    ['module-resolver', {
      root: ['./src'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    }],
    'react-native-reanimated/plugin', // ✅ must be last
  ],
};
