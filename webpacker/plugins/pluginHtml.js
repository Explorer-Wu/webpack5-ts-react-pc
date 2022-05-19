const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, isProd } = require("../utils");
const envConfig = require('../env');

const baseConfig = {
  // title: 'title',
  cdnModule: 'react',
  filename: process.env.NODE_ENV === 'testing'
    ? 'index.html'
    : envConfig.build.index,
  template: './public/index.html', //resolve('/public/index.html'),
  inject: true,
  
  // chunks: ['main', 'vendors'],
  chunksSortMode: 'dependency',
  favicon: resolve("public/static/images/favicon.ico"),
};
const devConfig = {
  hash: true,
  cache: true,
}
const prodConfig = {
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
    // more options:  https://github.com/kangax/html-minifier#options-quick-reference
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