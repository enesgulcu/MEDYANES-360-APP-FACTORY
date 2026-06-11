// Expo'nun varsayılan Metro ayarı monorepo'yu otomatik tanır (watchFolders).
// withNativewind, Tailwind sınıflarının (className) native'e derlenmesini sağlar.
const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withNativewind(config);
