"use strict";
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const { manifestPlugin, htmlPlugin } = require("../plugins");
const rules = require("../rules");
const alias = require("./alias");
const externals = require("./externals");
const utils = require("../utils");
const config = require("./index");
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

  optimization: {
    // runtimeChunk 默认为false,runtime相关的代码(各个模块之间的引用和加载的逻辑)内嵌入每个entry
    // ‘single’: 会生成一个唯一单独的runtime.js文件，就是manifest
    // name:{}：自定义runtime文件的name
    // true：对于每个entry会生成runtime~${entrypoint.name}的文件
    // multiple：和true一致。
    runtimeChunk: true,
    //splitChunks（代码分割）主要就是根据不同的策略来分割打包出来的bundle。对应废弃插件：CommonsChunkPlugin
    splitChunks: {
      chunks: "async", // 默认‘async’。共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
      minSize: 30000, // 模块超过30k自动被抽离成公共模块
      minChunks: 1, // 最小公用模块次数，默认为1。模块被引用>=1次，便分割
      maxAsyncRequests: 5, // 异步加载chunk的并发请求数量<=5
      maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
      automaticNameDelimiter: "~", // 命名分隔符
      //name 分割的js名称，默认为true，返回${cacheGroup的key} ${automaticNameDelimiter} ${moduleName},可以自定义。
      name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
      //cacheGroups缓存策略，默认设置了分割node_modules和公用模块。内部的参数可以和覆盖外部的参数。
      cacheGroups: {
        default: {
          // 模块缓存规则，设置为false，默认缓存组将禁用
          minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
          priority: -20, // 优先级， 该配置项是设置处理的优先级，数值越大越优先处理
          reuseExistingChunk: true, // 是否复用存在的chunk，默认使用已有的模块，
        },
        defaultVendors: {
          idHint: 'vendors',
          // name: "vendor",
          chunks: "initial",
          priority: -10,
          reuseExistingChunk: false,
          test: /[\\/]node_modules[\\/]/,
        },
        manifest: {
          name: "manifest",
          chunks: "initial",
        },
        styles: {
          name: "styles",
          test: /\.scss|less|css$/,
          chunks: "all", // merge all the css chunk to one file
          enforce: true,
        },
      },
    },
    // emitOnErrors默认为true,在编译出错时是否生成资源，使用 optimization.emitOnErrors 来跳过生成阶段(emitting phase)。这可以确保没有生成出错误资源。而 stats 中所有 assets 中的 emitted 标记都是 false
    emitOnErrors: true,

    // concatenateModules 告知 webpack 去寻找模块类型中的片段，哪些是可以安全地被合并到单一模块中。这取决于 optimization.providedExports 和 optimization.usedExports。
    //“作用域提升(scope hoisting)”, 仅适用于由 webpack 直接处理的 ES6 模块。在使用转译器(transpiler)时，你需要禁用对模块的处理（例如 Babel 中的 modules 选项）。
    // 默认 optimization.concatenateModules 在生产模式下被启用，而在其它情况下被禁用。
    concatenateModules: false, //对应废弃插件：ModuleConcatenationPlugin
    //告知 webpack 去确定那些由模块提供的导出内容，为 export * from ... 生成更多高效的代码。 默认 optimization.providedExports 会被启用。
    providedExports: true,
  },
  
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
