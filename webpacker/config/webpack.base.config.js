"use strict";
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const { manifestPlugin, htmlPlugin } = require("../plugins");
const rules = require("../rules");
const alias = require("./alias");
const externals = require("./externals");
const utils = require("../utils");
const config = require("./index");
const { baseOptimiz } = require("../optimization");
const packageName = require("../../package.json").name;

module.exports = {
  //webpack 的主目录,基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
  // entry 和 module.rules.loader 选项,相对于此目录解析
  context: utils.resolve("/"),
  entry: {
    app: [
      // '@babel/polyfill',
      "./src/main.ts", //resolve('/src/main.js')
    ],
  },

  output: {
    path: config.build.assetsRoot, //path: resolve('/dist'),
    filename: "[name].[contenthash]js",
    chunkFilename: "[name].[chunkhash].js", //决定 non-entry chunk(非入口 chunk) 的名称
    //publicPath: "/"
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
    library: {
      type: "umd", // 通用模块定义 libraryTarget: "umd"
      // the type of the exported library
      name: `${packageName}-[name]`, // string | string[] // the name of the exported library
      /* Advanced output.library configuration */
      // export: "default", // string | string[]
    },
  },

  module: {
    // noParse: /lodash/, // 忽略未采用模块化的文件，因此jquery或lodash将不会被下面的loaders解析
    rules: utils.arrFilterEmpty([
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } }, // 禁用 require.ensure
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
      ...rules.svgRules,
    ]),
  },

  plugins: [
    // new webpack.ProgressPlugin(), // 废弃 自定义编译过程中的进度报告 
    manifestPlugin,
    //自动生成html文件
    htmlPlugin
  ],

  optimization: baseOptimiz,
  
  externals,
  // 配置模块如何解析
  // 请求重定向，显示指出依赖查找路径  resolve.alias 配置路径映射，减少文件递归解析
  resolve: {
    //webpack 解析模块时应该搜索的目录, （不适用于对 loader 解析）
    modules: [
      // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
      utils.resolve("libs"),
      utils.resolve("node_modules"),
      utils.resolve("src"),
    ],
    //mainFields将决定在 package.json 中使用哪个字段导入模块。根据 webpack 配置中指定的 target 不同，默认值也会有所不同。
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ["jsnext:main", "browser", "main"], // 只采用main字段作为入口文件描述字段，减少搜索步骤
    //自动解析确定的扩展, require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json",
      ".css",
      ".scss",
      ".less",
      ".tpl",
      "png",
      "jpg",
      "jpeg",
      "gif",
    ],
    //配置别名
    alias
  },
  //配置是否 polyfill 或 mock 某些 Node.js 全局变量和模块
  //配置是否 polyfill 或 mock 某些 Node.js 全局变量和模块
  //每个属性都是 Node.js 全局变量或模块的名称，每个 value 是以下其中之一
  // true：提供 polyfill。
  // "mock"：提供 mock 实现预期接口，但功能很少或没有。
  // "empty"：提供空对象。
  // false: 什么都不提供。预期获取此对象的代码，可能会因为获取不到此对象，触发 ReferenceError 而崩溃。
  //尝试使用 require('modulename') 导入模块的代码，可能会触发 Cannot find module "modulename" 错误。
  node: {
    // prevent webpack from injecting useless setImmediate polyfill
    // because source contains it (although only uses it if it's native).
    setImmediate: true, //boolean | "mock" | "empty"
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    module: "empty",
    dgram: "empty",
    dns: "mock",
    fs: "empty",
    http2: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
    // path: true,
    // url: false
  },
};
