// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = mergeConfig(defaultConfig, {
    resolver: {
        // keep existing extensions and add mjs (and cjs just in case)
        sourceExts: [...defaultConfig.resolver.sourceExts, 'mjs', 'cjs'],
    },
});
