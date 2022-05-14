const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// webpack 热替换
// https://github.com/glenjamin/webpack-hot-middleware#installation--usage
const hotModuleReplacePlugin = new webpack.HotModuleReplacementPlugin();

// 热更新 react 组件
const reactRefreshPlugin = new ReactRefreshWebpackPlugin();
// 开发环境使用
exports.HMRReactRefreshPlugins = [ hotModuleReplacePlugin, reactRefreshPlugin ];