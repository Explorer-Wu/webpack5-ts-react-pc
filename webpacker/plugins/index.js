const { cdnPlugin } = require('./pluginCdn');
const { cleanPlugin } = require('./pluginClean');
const { copyPlugin } = require('./pluginCopy');
const { definePlugin } = require('./pluginDefine');
const { dllPlugin } = require('./pluginDll');
const { dllReferencePlugin } = require('./pluginDllReference');
const { providePlugin } = require('./pluginProvide');
const { forkTsCheckerPlugin } = require('./pluginForkTsChecker');
const { htmlPlugin } = require('./pluginHtml');
const { manifestPlugin } = require('./pluginManifest');
const { purgeMiniCssExtractPlugins } = require('./pluginPurgeMiniCssExtract');
const { HMRReactRefreshPlugins } = require('./pluginHMRReactRefresh');
const { compressionPlugin } = require('./pluginCompression');
const { bundleAnalyzerPlugin } = require('./pluginBundleAnalyzer');

// export * from './pluginEsLint';
// export * from './pluginProvide';

module.exports = {
  cdnPlugin,
  cleanPlugin,
  copyPlugin,
  definePlugin,
  dllPlugin,
  dllReferencePlugin,
  providePlugin,
  forkTsCheckerPlugin,
  htmlPlugin,
  manifestPlugin,
  purgeMiniCssExtractPlugins,
  HMRReactRefreshPlugins,
  compressionPlugin,
  bundleAnalyzerPlugin
}