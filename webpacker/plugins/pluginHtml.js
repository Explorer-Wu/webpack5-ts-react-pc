const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, isProd } = require("../utils");
const envConfig = require('../env');

const baseConfig = {
  // title: 'title',
  cdnModule: 'react',
  filename: process.env.NODE_ENV === 'testing'
    ? 'index.html'
    : envConfig.build.index,
  template: resolve('/public/index.html'), // './public/index.html',
  // templateContent: false, // {string|Function|false}
  // templateParameters: {Boolean|Object|Function}
  inject: true,
  // publicPath: 'auto',
  scriptLoading: 'module', // {'blocking'|'defer'|'module'}
  // meta: {Object}
  // base: {Object|String|false}
  // showErrors: {Boolean}
  chunks: ['main', 'vendors'], // only the unit-test chunk
  chunksSortMode: 'auto', // {String|Function}
  // excludeChunks: [ 'dev-helper' ], // {Array.<string>}
  favicon: resolve("public/static/images/favicon.ico"),
};
const devConfig = {
  hash: true,
  cache: true,
}
const prodConfig = {
  // more options:  https://github.com/terser/html-minifier-terser
  minify: {
    collapseWhitespace: true,
    keepClosingSlash: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  },
}
const mergeConfig = isProd ? {
  ...baseConfig,
  ...prodConfig
} : {
  ...baseConfig,
  devConfig
}

//自动生成html文件
exports.htmlPlugin = new HtmlWebpackPlugin(mergeConfig);