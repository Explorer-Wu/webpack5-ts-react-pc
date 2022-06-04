"use strict";
const utils = require("../utils");
const envConfig = require("../env");
const packageName = require("../../package.json").name;

const rules = require("../rules");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const { manifestPlugin, eslintPlugin, htmlPlugin } = require("../plugins");
const { baseOptimiz } = require("../optimization");
const resolve = require("./resolve");
const externals = require("./externals");

module.exports = {
  //webpack 的主目录,基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
  // entry 和 module.rules.loader 选项,相对于此目录解析
  context: utils.resolve("./"),

  entry: {
    app: [
      // "core-js/modules/es.promise",
      // "core-js/modules/es.array.iterator",
      "./src/main.tsx" //resolve('./src/main.js')
    ]
    // reactvendors: { import: ['react', 'react-dom', "react-router-dom",], runtime: 'runtime' },
    // app: { import: "./src/main.tsx", dependOn: "reactvendors" },
  },

  output: {
    path: envConfig.assetsRoot, //path: resolve('./dist'),
    //publicPath: "/"
    publicPath: envConfig.assetsPublicPath,
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[chunkhash].js", //决定 non-entry chunk(非入口 chunk) 的名称
    // 向外暴露的打包库名
    library: {
      type: "umd", // 通用模块定义 libraryTarget: "umd"
      // the type of the exported library
      name: `${packageName}_[name]_[fullhash]` // string | string[] the name of the exported library
    }
    // globalObject: 'window',
  },

  module: {
    // noParse: /lodash/, // 忽略未采用模块化的文件，因此jquery或lodash将不会被下面的loaders解析
    parser: {
      asset: {
        // 资产模块的 parser 选项
      },
      javascript: {
        // javascript 模块的解析器选项: 启用解析 require.ensure 语法的功能
        requireEnsure: true
      }
    },
    rules: utils.arrFilterEmpty([
      // Disable require.ensure as it's not a standard language feature.
      // {
      //   parser: {
      //     amd: false, // 禁用 AMD
      //     commonjs: false, // 禁用 CommonJS
      //     system: false, // 禁用 SystemJS
      //     harmony: false, // 禁用 ES2015 Harmony import/export
      //     requireInclude: false, // 禁用 require.include
      //     requireEnsure: false, // 禁用 require.ensure
      //     requireContext: false, // 禁用 require.context
      //     browserify: false, // 禁用特殊处理的 browserify bundle
      //     requireJs: false, // 禁用 requirejs.*
      //     node: false // 禁用 __dirname, __filename, module, require.extensions, require.main, 等。
      //   }
      // },
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      rules.javascriptPreRule,
      // rules.javascriptRule,
      // rules.typescriptRule,
      rules.htmlRule,
      rules.imagesRule,
      rules.fontsRule,
      // rules.cssRule,
      // ...rules.lessRules,
      // ...rules.sassRules,
      rules.svgRule
      // ...rules.svgRules
    ])
  },

  plugins: [
    // new webpack.ProgressPlugin(), // 废弃 自定义编译过程中的进度报告
    manifestPlugin,
    eslintPlugin,
    //自动生成html文件
    htmlPlugin
  ],
  // 代码分割、tree shaking等优化
  optimization: baseOptimiz,

  // externals: { React: 'React', 'react-dom': 'react-dom' },
  // library 需要一个名为 lodash 的依赖，这个依赖在 consumer 环境中必须存在且可用
  externals,
  // 配置模块如何解析
  // 请求重定向，显示指出依赖查找路径  resolve.alias 配置路径映射，减少文件递归解析
  resolve,

  //配置是否 polyfill 或 mock 某些 Node.js 全局变量和模块
  node: require("./node.config"),
  // 配置启用持久缓存: 这个个文件系统缓存是可选的
  cache: require("./cache.config"),
  ignoreWarnings: [/Failed to parse source map/]
};
