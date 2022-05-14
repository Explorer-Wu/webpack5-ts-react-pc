const { DllPlugin } = require('webpack');
const { resolve } = require("../utils");

const config = {
  context: resolve("libs"),
  path: resolve("libs/[name]-dll-manifest.json"),
  name: "[name]_dll_[fullhash]",
};

exports.dllPlugin = new DllPlugin(config);