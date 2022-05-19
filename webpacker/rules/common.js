const { tsLoader, babelLoader, eslintLoader, tsJsThreadLoader } = require('./useLoaderRules');
const { resolve } = require("../utils");
const { useWorkerPool } = require('../env');
/**
 * @see https://webpack.js.org/guides/typescript/#loader
 */
exports.typescriptRule = {
  test: /\.tsx?$/,
  use: ["babel-loader", tsLoader],
  exclude: /\/node_modules\//,
  include: [
    resolve("./src"),
    resolve("./libs"),
    resolve("./tests"),
  ]
};
/**
 * @see https://webpack.js.org/loaders/babel-loader
 */
exports.javascriptRule = {
  test: /\.(js|jsx)$/,
  use: [babelLoader],
  //启用debug 用于故障排查。默认 false
  // debug: true,
  exclude: /\/node_modules\//,
  include: [
    resolve("./src"),
    resolve("./libs"),
    resolve("./tests"),
  ],
};

exports.javascriptPreRule = {
  test: /\.(js|jsx)$/,
  enforce: "pre",
  use: [eslintLoader],
  //启用debug 用于故障排查。默认 false
  // debug: true,
  exclude: /\/node_modules\//,
  include: [
    resolve("./src"),
    resolve("./libs"),
    resolve("./tests"),
  ],
};

exports.tsJsRules = {
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  use: [useWorkerPool && tsJsThreadLoader, babelLoader, tsLoader],
  exclude: /\/node_modules\//,
  include: [
    resolve("./src"),
    resolve("./libs"),
    resolve("./tests"),
  ]
};


/**
 * @see https://webpack.js.org/loaders/html-loader
 */
exports.htmlRule = {
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
  },
};

/**
 * @see https://webpack.js.org/guides/asset-modules/
 */
exports.imagesRule = {
  test: /\.(?:ico|gif|png|jpe?g|webp)$/i,
  type: 'asset/resource',
};
// options: {
//   limit: 10000,
//   name: utils.pathRelative("images/[name].[hash:7].[ext]"),
// },

exports.fontsRule = {
  test: /\.(woff(2)?|eot|ttf|otf|)(\?.*)?$/,
  type: 'asset/inline',
};