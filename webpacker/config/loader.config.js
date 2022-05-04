// const path = require("path");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require("./index");
const utils = require("../utils");

import {join} from 'path';

let devCssConfig = [
  "style-loader",
  "css-loader",
  "postcss-loader",
  "less-loader",
];
const prodCssConfig = [
  {
    loader: "style-loader",
    options: { },
  },
  {
    loader: "css-loader",
    options: {
      // minimize: process.env.NODE_ENV === 'production' ? true : false,
      sourceMap: true,
    },
  },
  {
    loader: "postcss-loader",
    options: {
      sourceMap: true,
      // plugins: () => [
      //     require('autoprefixer')()
      // ],
    },
  },
  {
    loader: "less-loader",
    options: {
      sourceMap: true,
      // javascriptEnabled: true,
    },
  },
]; //devCssConfig.splice(0,1)

const HappyPackPlugin = [
  new HappyPack({
    /** 必须配置, 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件 **/
    // id 标识符，要和 rules 中指定的 id 对应起来
    id: "eslint",
    // 需要使用的 loader，用法和 rules 中 Loader 配置一样
    // 可以直接是字符串，也可以是对象形式
    loaders: [
      {
        loader: "eslint-loader",
        options: {
          // emitWarning: true,
          formatter: require.resolve("react-dev-utils/eslintFormatter"),
          eslintPath: require.resolve("eslint"),
        },
      },
    ],
    //启用debug 用于故障排查。默认 false
    debug: true,
  }),
  //js 编译多线程
  new HappyPack({
    id: "babel",
    loaders: [
      {
        loader: "babel-loader",
        options: {
          /*cacheDirectory是用来缓存编译结果，下次编译加速*/
          cacheDirectory: true, //process.env.NODE_ENV === 'development' ? true : false,
          cacheCompression: process.env.NODE_ENV === "production" ? true : false,
          compact: process.env.NODE_ENV === "production" ? true : false,
          // presets: [ '@babel/preset-env' ], //'env', '@babel/preset-react'
          // plugins: ['@babel/plugin-syntax-dynamic-import'] //'transform-object-rest-spread'
        },
      },
    ],
    debug: true,
    threadPool: happyThreadPool,
  }),
  // css 编译多线程
  new HappyPack({
    id: "styles",
    // loaders: process.env.NODE_ENV === 'production' ? prodCssConfig : devCssConfig,
    loaders:
      process.env.NODE_ENV === "production"
        ? utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true,
            // tests: 'css|postcss|less|sass'
          })
        : utils.styleLoaders({
            // sourceMap: config.dev.cssSourceMap,
            usePostCSS: true,
            // tests: 'css|less'
          }),
    debug: true,
    threadPool: happyThreadPool,
  }),
  // sass 编译多线程
  new HappyPack({
    id: "sass",
    threadPool: happyThreadPool,
    // loaders: process.env.NODE_ENV === 'production' ? ['css-loader', 'sass-loader']:['style-loader', 'css-loader', 'sass-loader']
    loaders:
      process.env.NODE_ENV === "production"
        ? utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: false,
          })
        : utils.styleLoaders({
            // sourceMap: config.dev.cssSourceMap,
            usePostCSS: false,
          }),
  }),

  // image 编译多线程
  new HappyPack({
    id: "image",
    loaders: [
      {
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          // name: '[name].[ext]',
          name: utils.assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
    ],
    threadPool: happyThreadPool,
  }),
];

