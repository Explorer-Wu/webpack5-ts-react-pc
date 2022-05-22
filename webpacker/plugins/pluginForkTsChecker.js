const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { resolve, isDev } = require("../utils");

const config = {
  async: isDev,
  typescript: {
    configFile: resolve('./tsconfig.json'),
  },
  // eslint: {enabled: true, files: '../../src/**/*.{ts,tsx,js,jsx}'},
};

exports.forkTsCheckerPlugin = new ForkTsCheckerWebpackPlugin(config);