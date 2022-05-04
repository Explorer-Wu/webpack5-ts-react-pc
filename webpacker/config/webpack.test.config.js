// This is the webpack config used for unit tests.
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const { cleanPlugin, definePlugin } = require("../plugins");
const rules = require("../rules");
// const utils = require('../utils')

var webpackConfig = merge(baseWebpackConfig, {
  mode: "none",
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    // rules: styleLoaders()
    rules: [rules.tsJsRules, rules.mixCssLessRules, rules.mixCssSassRules]
  },
  devtool: "#inline-source-map",
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test
      "scss-loader": "sass-loader"
    }
  },
  plugins: [definePlugin]
});

// no need for app entry during tests
delete webpackConfig.entry;

module.exports = webpackConfig;
