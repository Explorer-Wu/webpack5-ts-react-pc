const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolve } = require("../utils");
const config = require('../config/index');

// copy custom static assets
const customConfig = {
    // patterns: [{from: resolve('/src/assets'), to: 'assets'}],
    patterns: [
      {
        from: resolve("public/static"),
        to: config.dev.assetsSubDirectory,
      },
    ],
    options: {
      concurrency: 100,
    },
};

// 开发环境和生产环境都用到复制功能
exports.copyWebpackPlugin = new CopyWebpackPlugin(customConfig);