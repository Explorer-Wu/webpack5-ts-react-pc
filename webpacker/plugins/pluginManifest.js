const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const envConfig = require('../env');

exports.manifestPlugin = new WebpackManifestPlugin({
  fileName: "asset-manifest.json",
  // publicPath: '/',
  basePath: envConfig.build.assetsRoot,
  publicPath: process.env.NODE_ENV === "production"
    ? envConfig.build.assetsPublicPath
    : envConfig.dev.assetsPublicPath,
  generate: (seed, files) => {
    const manifestFiles = files.reduce(function (manifest, file) {
      manifest[file.name] = file.path;
      return manifest;
    }, seed);

    return {
      files: manifestFiles,
    };
  },
})