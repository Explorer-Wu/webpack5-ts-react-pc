const utils = require("../utils");
const rules = require("../rules");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const postcssNormalize = require("postcss-normalize");
const { cleanPlugin, dllPlugin } = require("../plugins");
const { dllOptimiz } = require("../optimization/dllOptimiz");

// const commonConfig
module.exports = {
  context: utils.resolve("/"),
  name: "vendor",
  //要打包的模块的数组
  entry: {
    vendor: [
      "@babel/polyfill",
      "react",
      "react-dom",
      "react-router-dom",
      "redux",
      "react-redux",
      "immer",
      "use-immer",
      "axios",
      "lodash",
      // "antd",
      // 'common/js/format',
      // 'popup',
    ],
  },
  output: {
    path: utils.resolve("libs"),
    filename: "[name].dll.js",
    // filename: '[name].[contenthash]js',
    chunkFilename: "[name].dll.[chunkhash].js", //决定 non-entry chunk(非入口 chunk) 的名称
    library: "[name]_dll_[hash]",
    libraryTarget: "umd",
    publicPath: "/",
  },
  module: {
    rules: utils.arrFilterEmpty([
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } }, // 禁用 require.ensure
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      rules.javascriptPreRule, // include: [utils.resolve("src")],
      rules.tsJsRules,
      rules.imagesRule,
      rules.fontsRule,
      rules.mixCssLessRules,
      rules.mixCssSassRules,
      ...rules.svgRules,
    ]),
  },
  optimization: dllOptimiz,
  plugins: [
    // 清除上一次生成的文件
    cleanPlugin,
    // new CleanWebpackPlugin({
    //   root: utils.resolve("libs"), // 绝对路径 utils.resolve('/dist'),
    //   verbose: true, // 是否显示到控制台
    //   dry: false, // 不删除所有
    // }),
    dllPlugin
  ],
};
