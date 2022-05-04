const { isProd, arrFilterEmpty } = require("../utils");
const config = require("../config");
const {
  useCssLessLoaders,
  useCssSassLoaders,
  cssLoader,
  cssLoaderItems,
  cssModulesSupportLoaderItems,
  lessLoader,
  miniCssExtractLoader,
  postCssLoader,
  resolveUrlLoader,
  sassLoaderItems
} = require("./useLoaderRules");

/** css **/
exports.cssRule = {
  test: /\.css$/,
  use: [miniCssExtractLoader, cssLoader, postCssLoader]
};

/** less **/
exports.lessModulesRule = {
  test: /\.module.less$/,
  use: arrFilterEmpty([
    ...cssModulesSupportLoaderItems,
    postCssLoader,
    resolveUrlLoader,
    lessLoader
  ])
};
exports.lessRule = {
  test: /\.less$/,
  exclude: /\.module.less$/,
  use: arrFilterEmpty([...cssLoaderItems, postCssLoader, resolveUrlLoader, lessLoader])
};

exports.lessRules = [lessModulesRule, lessRule];

/** sass **/
exports.sassModulesRule = {
  test: /\.module\.s([ca])ss$/,
  use: arrFilterEmpty([
    ...cssModulesSupportLoaderItems,
    postCssLoader,
    resolveUrlLoader,
    ...sassLoaderItems
  ])
};

exports.sassRule = {
  test: /\.s([ca])ss$/,
  exclude: /\.module.scss$/,
  use: arrFilterEmpty([...cssLoaderItems, postCssLoader, resolveUrlLoader, ...sassLoaderItems])
};

exports.sassRules = [exports.sassModulesRule, exports.sassRule];

// /\.(css|less)$/
exports.mixCssLessRules = {
  test: /\.((c|le)ss)$/i,
  exclude: /\.module.less$/,
  use: [ ...useCssLessLoaders ]
};

// /\.(s[ac]ss)$/
exports.mixCssSassRules = {
  test: /\.((c|sa|sc)ss)$/i,
  exclude: /\.module.scss$/,
  use: [ ...useCssSassLoaders ]
};
