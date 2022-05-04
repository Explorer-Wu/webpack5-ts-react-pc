
const path = require('path')
const merge = require('webpack-merge')
const config = require('./index')
const baseWebpackConfig = require('./webpack.base.config')
const { cleanPlugin, cdnPlugin,  htmlPlugin, miniCssExtractPlugin, copyPlugin } = require("../plugins");
const rules = require("../rules");
const utils = require('../utils')


const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('./test.env')
  : require('./prod.env')


const prodConfig = {
    mode: 'production',
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    name: "app",
    // 在第一个错误出现时抛出失败结果，而不是容忍它。默认情况下，当使用 HMR 时，webpack 会将在终端以及浏览器控制台中，以红色文字记录这些错误，但仍然继续进行打包。
    bail: true,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath :
            config.dev.assetsPublicPath
    },
    module: {
      rules: [
        rules.tsJsRules,
        rules.mixCssLessRules,
        rules.mixCssSassRules,
      ],
    },
    optimization: {
        // 在production模式，minimize默认为true，效果就是压缩混淆js代码。
        minimize: true,
        // 在构建时新增压缩配置
        minimizer: [
          // This is only used in production mode
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
            // Use multi-process parallel running to improve the build speed
            // Default number of concurrent runs: os.cpus().length - 1
            // Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
            // https://github.com/webpack-contrib/terser-webpack-plugin/issues/21
            parallel: true,
            // Enable file caching
            cache: true,
            // sourceMap: shouldUseSourceMap,
            sourceMap: true,
          }),
          // This is only used in production mode
          new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: config.build.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
            // cssProcessorOptions: {
            //   parser: true, //safePostCssParser,
            //   map: {
            //         // `inline: false` forces the sourcemap to be output into a separate file
            //         inline: false,
            //         // `annotation: true` appends the sourceMappingURL to the end of
            //         // the css file, helping the browser find the sourcemap
            //         annotation: true,
            //   }  //: false,
            // },
          }),
        ],
        // 移除 optimization.moduleIds 和 optimization.chunkIds, 使用默认值会更合适，因为默认值会在 production 模式 下支持长效缓存且可以在 development 模式下进行调试。
        // chunkIds: 'total-size',
        // moduleIds: 'size',

        // Automatically split vendor and commons
        // https://twitter.com/wSokra/status/969633336732905474
        // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
        splitChunks: {
          chunks: 'all',
          // 拆分 chunk 的名称。设为 false 将保持 chunk 的相同名称，因此不会不必要地更改名称。这是生产环境下构建的建议值。
          name: false,
        },
        // Keep the runtime chunk separated to enable long term caching
        runtimeChunk: true,
        concatenateModules: true,
    },
    // 插件配置
    plugins: [
      cleanPlugin, // 每次打包前清空
      miniCssExtractPlugin,
      htmlPlugin,
        // new HtmlWebpackPlugin({
        //     // title: 'title',
        //     // cdnModule: 'react',
        //     filename: process.env.NODE_ENV === 'testing'
        //       ? 'index.html'
        //       : config.build.index,
        //     template: './public/index.html', //resolve('/public/index.html'),
        //     inject: true,
        //     minify: {
        //       removeComments: true,
        //       collapseWhitespace: true,
        //       removeAttributeQuotes: true
        //       // more options:  https://github.com/kangax/html-minifier#options-quick-reference
        //     },
        //     // chunks: ['main', 'vendors'],
        //     chunksSortMode: 'dependency',
        //     favicon: utils.resolve('/public/favicon.ico'),
        // }),
        cdnPlugin,
        // enable scope hoisting
        // new webpack.optimize.ModuleConcatenationPlugin(),
        copyPlugin,
    ],
    // externals: { React: 'React', 'react-dom': 'react-dom' },
    // library 需要一个名为 lodash 的依赖，这个依赖在 consumer 环境中必须存在且可用
    externals: [
        {
          'babel-polyfill': 'window', 
        //   react: 'react',
          'react': {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
          },
          'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM',
          },
          // Object
          'lodash': {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_' // indicates global variable
          },
          'react-router-dom': 'react-router-dom',
          'react-router-config': 'react-router-config',
          'redux': 'redux',
          'react-redux': 'react-redux',
          // Array,  subtract 可以通过全局 math 对象下的属性 subtract 访问（例如 window['math']['subtract']）
          //subtract: ['./math', 'subtract'] 
        },
        // Function 对于 webpack 外部化，通过定义函数来控制行为, 'commonjs'+ request 定义了需要外部化的模块类型。
        // function(context, request, callback) {
        //     if (/^yourregex$/.test(request)){
        //     return callback(null, 'commonjs ' + request);
        //     }
        //     callback();
        // },
    ],
    performance: {
        hints: "warning", // "warning" 枚举;  "error",性能提示中抛出错误;  false, 关闭性能提示   
        maxAssetSize: 200000, // 整数类型（以字节为单位）此选项根据单个资源体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)。
        maxEntrypointSize: 400000, // 整数类型（以字节为单位）此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)。
        assetFilter: function(assetFilename) { //此属性允许 webpack 控制用于计算性能提示的文件
          // 提供资源文件名的断言函数
          return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
};

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    prodConfig.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
              '\\.(' +
              config.build.productionGzipExtensions.join('|') +
              ')$'
          ),
          // cache: true,
          // include: /\/includes/, 所有包含(include)的文件
          // exclude: /\/excludes/, 所有排除(exclude)的文件
          threshold: 10240,
          minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(baseWebpackConfig, prodConfig);