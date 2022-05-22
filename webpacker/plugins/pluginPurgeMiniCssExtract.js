const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const { pathRelative, resolve } = require('../utils');
const { assetsSubDirectory } = require('../env');

const MiniCssConfig = {
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    // 对输出的css文件进行重命名
    filename: pathRelative(assetsSubDirectory, 'css/[name].[contenthash].css'),
    chunkFilename: pathRelative(assetsSubDirectory, 'css/[id].[contenthash].css')
};

// CSS Tree Shaking
const PurgeCSSConfig = {
  // **匹配任意字符，包括路径分割符，*匹配任意字符，不暴扣路径分割符
  paths: glob.sync(`${resolve('src')}/**/*`,  { nodir: true }),
  // glob.sync([
  //   resolve('public/*.html'),
  //   resolve('src/**/*'),
  // ]),
  // 指明哪些安全不需要删除
  safelist: () => ({
    stardand: ['body']
  }),
  // safelist: [
  //   /data-v-.*/, // scope样式保留
  //   /node_modules/,
  // ]
}

exports.purgeMiniCssExtractPlugins = [ new MiniCssExtractPlugin(MiniCssConfig), new PurgeCSSPlugin(PurgeCSSConfig) ];
