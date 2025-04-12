const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('cjs');
config.resolver.assetExts = ['ttf', 'png', 'jpg', 'jpeg', 'gif'];

module.exports = config;