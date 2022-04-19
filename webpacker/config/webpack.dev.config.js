const webpack = require("webpack");
const utils = require("./utils");
const config = require("./index");
const merge = require("webpack-merge");
const path = require("path");
const baseWebpackConfig = require("./webpack.base.config");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devConfig = {
  mode: "development",
  devtool: config.dev.devtool,
  name: "app",
  dependencies: ["vendor"],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /\/node_modules\//,
        include: [
          utils.resolve("src"),
          utils.resolve("libs"),
          utils.resolve("test"),
        ],
        //resolve('node_modules/webpack-dev-server/client')  path.join(__dirname, 'src')
        // use: ['babel-loader?cacheDirectory=true'], 之前是使用这种方式直接使用 loader
        // 现在用下面的方式替换成 happypack/loader，并使用 id 指定创建的 HappyPack 插件
        use: "happypack/loader?id=babel", // use: 'happypack/loader?id=jsx'
        // use: [{
        //     loader: 'babel-loader',
        //     /*cacheDirectory是用来缓存编译结果，下次编译加速*/
        //     options: {
        //         cacheDirectory: true,
        //         // cacheCompression: isEnvProduction,
        //         // compact: isEnvProduction,
        //         plugins: ['syntax-dynamic-import'],
        //         presets: [
        //             [
        //                 '@babel/preset-env',
        //                 {
        //                     modules: false
        //                 }
        //             ]
        //         ]
        //     }
        // }],
      },
      {
        test: /\.(css|less)$/,
        // 现在用下面的方式替换成 happypack/loader，并使用 id 指定创建的 HappyPack 插件
        use: ["happypack/loader?id=styles"],
      },
      {
        test: /\.s[ac]ss$/i,
        // use: [...utils.styleLoaders({ usePostCSS: false })]
        use: ["happypack/loader?id=sass"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    //tree shaking通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)
    // usedExports: true,//依赖于 terser 去检测语句中的副作用。不能跳转子树/依赖由于细则中说副作用需要被评估。尽管导出函数能运作如常，但 React 框架的高阶函数（HOC）在这种情况下是会出问题的。
    //库的Tree Shaking,比如lodash. Webpack默认忽略了sideEffect标注，改变此行为需要设置optimization.sideEffects为true。你能手工设置它或通过设置mode:"production"模式也行。
    // 通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯正 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。
    sideEffects: true, //更为有效 是因为它允许跳过整个模块/文件和整个文件子树。需在package.json中设置， 否则影响less和scss的加载
  },
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    // 自动加载模块，而不必到处 import 或 require. 开发模式下optimization.concatenateModules设为false，可使用ProvidePlugin
    // new webpack.ProvidePlugin({
    //   _: "lodash",
    //   //只获取 lodash 中提供的 join 方法。 与 tree shaking 配合，将 lodash library 中的其余没有用到的导出去除
    // //   join: ['lodash', 'join'],
    // }),
    //开发环境使用dll分割代码
    new webpack.DllReferencePlugin({
      //content (optional): 请求到模块 id 的映射 (默认值为 manifest.content)
      context: utils.resolve("libs"), //(绝对路径) manifest (或者是内容属性)中请求的上下文
      manifest: utils.resolve("libs/vendor-dll-manifest.json"), //包含 content 和 name 的对象，或者在编译时(compilation)的一个用于加载的 JSON manifest 绝对路径
      //dll 暴露的地方的名称 (默认值为 manifest.name) (可参考 externals)
      name: "./libs/vendor.dll.js", // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
      // dll 是如何暴露的 (libraryTarget)
      sourceType: "umd", //对应 dll.config 中的 libraryTarget: 'umd'  //sourceType: "commonsjs",
      scope: "vendor", //dll 中内容的前缀
    }),
    // copy custom static assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: utils.resolve("public/static"),
          to: config.dev.assetsSubDirectory,
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: "warning",
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, "index.html"),
        },
      ],
    },
    hot: true,
    // lazy: true,
    /** inline模式：向网页中注入代理客户端代码，通过客户端发起刷新。向每个chunk中都注入客户端代码，当要输出很多chunk，会导致构建变慢。
     * 关闭inline模式减少构建时间。
     **/
    inline: true,
    //告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
    contentBase: false, //设置为 false 以禁用 contentBase。 默认情况下，将使用当前工作目录作为提供内容的目录，如：[path.join(__dirname, 'public'), path.join(__dirname, 'assets')]。
    compress: true, // gzip压缩
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: false, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    watchContentBase: false,
    liveReload: false,
    disableHostCheck: true,
  },
};

module.exports = merge(baseWebpackConfig, devConfig);
