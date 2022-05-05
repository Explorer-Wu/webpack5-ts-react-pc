const { cdnPlugin } = require('./pluginCdn');
const { cleanPlugin } = require('./pluginClean');
const { copyPlugin } = require('./pluginCopy');
const { definePlugin } = require('./pluginDefine');
const { dllPlugin } = require('./pluginDll');
const { dllReferencePlugin } = require('./pluginDllReference');
const { forkTsCheckerPlugin } = require('./pluginForkTsChecker');
const { htmlPlugin } = require('./pluginHtml');
const { manifestPlugin } = require('./pluginManifest');
const { miniCssExtractPlugin } = require('./pluginMiniCssExtract');
// export * from './pluginEsLint';
// export * from './pluginProvide';

module.exports = {
  cdnPlugin,
  cleanPlugin,
  copyPlugin,
  definePlugin,
  dllPlugin,
  dllReferencePlugin,
  forkTsCheckerPlugin,
  htmlPlugin,
  manifestPlugin,
  miniCssExtractPlugin
}