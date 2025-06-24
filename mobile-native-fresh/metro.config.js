// Learn more: https://docs.expo.dev/guides/customizing-metro/
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig; 