const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolve } = require("../utils");
const envConfig = require('../env');

// console.log("assetsSubDirectory:", envConfig.assetsSubDirectory)
// copy custom static assets
const customConfig = {
  patterns: [
    {
      from: resolve('src/assets'),
      to: envConfig.assetsSubDirectory,
    },
    {
      from: resolve('public/static'),
      to: envConfig.assetsSubDirectory,
    },
  ],
  options: {
    concurrency: 100,
  },
};

// 开发环境和生产环境都用到复制功能
exports.copyPlugin = new CopyWebpackPlugin(customConfig);