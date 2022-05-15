
const path = require('path')
const { merge } = require('webpack-merge')
const envConfig = require('../env')
const baseWebpackConfig = require('./webpack.base.config')
const { cleanPlugin, cdnPlugin,  htmlPlugin, purgeMiniCssExtractPlugins, copyPlugin } = require("../plugins");
const rules = require("../rules");
const utils = require('../utils');
const { prodOptimiz } = require("../optimization");

const env = process.env.NODE_ENV === 'testing'
  ? require('../env/test.env')
  : require('../env/prod.env')

const prodConfig = {
    mode: 'production',
    //生产环境中 (none)（省略 devtool 选项） - 不生成 source map，是一个不错的选择
    devtool: 'none', // envConfig.build.productionSourceMap ? envConfig.build.devtool : false,
    name: "app",
    // 在第一个错误出现时抛出失败结果，而不是容忍它。默认情况下，当使用 HMR 时，webpack 会将在终端以及浏览器控制台中，以红色文字记录这些错误，但仍然继续进行打包。
    bail: true,
    output: {
        path: envConfig.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
        publicPath: process.env.NODE_ENV === 'production' ?
            envConfig.build.assetsPublicPath :
            envConfig.dev.assetsPublicPath
    },
    module: {
      rules: [
        rules.tsJsRules,
        rules.mixCssLessRules,
        rules.mixCssSassRules,
      ],
    },
    optimization: prodOptimiz,
    // 插件配置
    plugins: [
      cleanPlugin, // 每次打包前清空
      ...purgeMiniCssExtractPlugins,
      htmlPlugin,
        // new HtmlWebpackPlugin({
        //     // title: 'title',
        //     // cdnModule: 'react',
        //     filename: process.env.NODE_ENV === 'testing'
        //       ? 'index.html'
        //       : envConfig.build.index,
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
    performance: {
      hints: "warning", // "warning" 枚举;  "error",性能提示中抛出错误;  false, 关闭性能提示   
      maxAssetSize: 256000, // 整数类型（以字节为单位）此选项根据单个资源体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)。
      maxEntrypointSize: 512000, // 整数类型（以字节为单位）此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)。
      assetFilter: function(assetFilename) { // 此属性允许 webpack 控制用于计算性能提示的文件
        // 提供资源文件名的断言函数
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
      }
    },
};

if (envConfig.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    prodConfig.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip', // 压缩算法
          test: new RegExp(
              '\\.(' +
              envConfig.build.productionGzipExtensions.join('|') +
              ')$'
          ),
          // cache: true,
          // include: /\/includes/, 所有包含(include)的文件
          // exclude: /\/excludes/, 所有排除(exclude)的文件
          threshold: 10240, // 只压缩大于 10240 bytes 的chunk
          minRatio: 0.8  // 只压缩大于该值的 minRatio = Compressed Size / Original Size
        })
    )
}

if (envConfig.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(baseWebpackConfig, prodConfig);