const { babelLoader } = require('./useLoaderRules');

/**
 * Using @svgr/webpack for handling svg files in react components
 * @see https://react-svgr.com/docs/webpack/
 */
exports.svgReactComponentRule = {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    issuer: /\.[jt]sx$/,
    use: [
        babelLoader,
        {
            loader: '@svgr/webpack',
            options: {
                babel: false,
                icon: true,
            },
        },
    ],
};

/**
 * Using file-loader for handling svg files
 * @see https://webpack.js.org/guides/asset-modules/
 */
exports.svgRule = {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    issuer: {not: [/\.[jt]sx$/]},
    type: 'asset/inline',
};

exports.svgRules = [exports.svgReactComponentRule, exports.svgRule];