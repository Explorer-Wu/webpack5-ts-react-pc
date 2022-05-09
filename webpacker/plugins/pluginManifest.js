const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const config = require('../env');

exports.manifestPlugin = new WebpackManifestPlugin({
  fileName: "asset-manifest.json",
  // publicPath: '/',
  basePath: config.build.assetsRoot,
  publicPath: process.env.NODE_ENV === "production"
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath,
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