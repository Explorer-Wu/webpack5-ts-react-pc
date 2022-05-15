const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const { assetsPath, resolve } = require("../utils/index");

const MiniCssConfig = {
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    // 对输出的css文件进行重命名
    filename: assetsPath('css/[name].[contenthash].css'),
    chunkFilename: "static/css/[id].[contenthash].css"
};

// CSS Tree Shaking
const PurgeCSSConfig = {
  // **匹配任意字符，包括路径分割符，*匹配任意字符，不暴扣路径分割符
  paths: glob.sync(`${resolve('src')}/**/*`,  { nodir: true }),
  // 指明哪些安全不需要删除
  safelist: () => ({
    stardand: ['body']
  })
}

exports.purgeMiniCssExtractPlugins = [ new MiniCssExtractPlugin(MiniCssConfig), new PurgeCSSPlugin(PurgeCSSConfig) ];
