// const webpack = require("webpack");
const { merge } = require("webpack-merge");
const envConfig = require('../env');
const devServer = require("./dev.server");
const baseWebpackConfig = require("./webpack.base.config");
const { copyPlugin, dllReferencePlugin, cdnPlugin, HMRReactRefreshPlugins } = require("../plugins");
const rules = require("../rules");
// const utils = require("../utils");
const { devOptimiz } = require("../optimization");

const devConfig = {
  mode: "development",
  devtool: envConfig.dev.devtool,
  name: "app",
  dependencies: ["vendor"],
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

    // 自动加载模块，而不必到处 import 或 require. 开发模式下optimization.concatenateModules设为false，可使用ProvidePlugin
    // new webpack.ProvidePlugin({
    //   _: "lodash",
    //   //只获取 lodash 中提供的 join 方法。 与 tree shaking 配合，将 lodash library 中的其余没有用到的导出去除
    // //   join: ['lodash', 'join'],
    // }),
    
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
