// const webpack = require("webpack");
const { merge } = require("webpack-merge");
const envConfig = require('../env');
const devServer = require("./dev.server");
const baseWebpackConfig = require("./webpack.base.config");
const { copyPlugin, dllReferencePlugin, cdnPlugin, providePlugin, HMRReactRefreshPlugins } = require("../plugins");
const rules = require("../rules");
// const utils = require("../utils");
const { devOptimiz } = require("../optimization");

const devConfig = {
  mode: "development",
  devtool: envConfig.dev.devtool,
  name: "app",
  // 一个 name 列表，定义它所依赖的所有兄弟（sibling）配置。需要首先编译依赖的配置
  // dependencies: ["reactvendors"],
  module: {
    rules: [
      rules.tsJsRules,
      rules.mixCssLessRules,
      rules.mixCssSassRules,
    ],
  },
  optimization: devOptimiz,
  plugins: [
    // webpack 热替换 和 热更新react组件
    ...HMRReactRefreshPlugins,
    providePlugin,
    // 开发环境判断是需要dll动态第三方库还是CDN引入的方式
    envConfig.useCDN ? cdnPlugin : dllReferencePlugin,
    // copy custom static assets
    copyPlugin
  ],
  // these devServer options should be customized in /config/index.js
  devServer,
};

console.log("config-dev:", JSON.stringify(rules.javascriptPreRule), merge(baseWebpackConfig, devConfig));
module.exports = merge(baseWebpackConfig, devConfig);
