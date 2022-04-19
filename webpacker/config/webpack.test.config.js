
// This is the webpack config used for unit tests.

const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

var webpackConfig = merge(baseWebpackConfig, {
    mode: "none",
    // use inline sourcemap for karma-sourcemap-loader
    module: {
        rules: utils.styleLoaders()
    },
    devtool: '#inline-source-map',
    resolveLoader: {
        alias: {
            // necessary to to make lang="scss" work in test
            'scss-loader': 'sass-loader'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('./test.env')
        })
    ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig