// at project root
module.exports = {
  presets: ['@react-native/babel-preset'], // ✅ correct for RN 0.81.x
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    }],
    'react-native-reanimated/plugin',

  ],
};
