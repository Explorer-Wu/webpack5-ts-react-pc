const { join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// import {sassResourceItems} from '../config/sassResources';
const { isProd, webpackDir, resolve } = require("../utils");

exports.mixLessSacssLoaders = function (options) {
  options = options || null
  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    if (!options.sourceMap) {
      if(loaderOptions) {
        return {
          loader: loader + '-loader',
          options: { ...loaderOptions }
        }
      }
      return {
        loader: loader + '-loader',
      }
    } else {
      return {
        loader: loader + '-loader',
        options: {
          ...loaderOptions,
          sourceMap: options.sourceMap
        }
      }
    }  
  };
  
  // console.log("cssLoaders:", generateLoaders())

  const css = generateLoaders('css', {
    // 每一个 CSS 的 `@import` 与 CSS 模块/ICSS 都会运行 `postcss-loader`，不要忘了 `sass-loader` 将不属于 CSS 的 `@import` 编译到一个文件中
    // 如果您需要在每个 CSS 的 `@import` 上运行 `sass-loader` 和 `postcss-loader`，请将其设置为 `2`。
    importLoaders: 1,
  });

  const postcss = generateLoaders('postcss', {
    postcssOptions: {
      // config: true, // 开启 / 关闭自动加载配置 postcss.config.js, 默认开启true
      // 处理写在 JavaScript 中的样式，那么你需要使用 postcss-js parser
      parser: 'postcss-js',
    },
    // 在 CSS-in-JS 中启动 PostCSS Parser 支持
    execute: true,
  });

  const less = generateLoaders('less', {
    lessOptions: {
      javascriptEnabled: true,
    }
  });

  const scss = generateLoaders('sass', {
    //开启 / 关闭默认的 Webpack importer。在某些情况下，可以提高性能. 但请慎用webpackImporter，因为 aliases 和以 〜 开头的 @import 规则将不起作用
    webpackImporter: false,
    // 极少数情况下，node-sass 会输出无效的 source maps（这是 node-sass 的 bug）
    // 为了避免这种情况，可将 node-sass 更新到最新版本，或者将 sassOptions 中的 outputStyle 选项设置为 compressed
    sassOptions: {
      outputStyle: 'compressed',
    },
    // Prefer `dart-sass` 是首选
    // implementation: require.resolve('sass'),
  });
  /** 调用generateLoaders执行... **/
  if(options.usePostCSS) {
    //MiniCssExtractPlugin只用在 production 配置中，并且在loaders链中不使用 style-loader, 特别是在开发中使用HMR，因为这个插件暂时不支持HMR
    if(options.miniCssExtract) {
      return {
        loader: MiniCssExtractPlugin.loader,
        css,
        postcss,
        less
      }
    }else{
      return {
        style: generateLoaders('style'),
        css,
        postcss,
        less
      }
    }
    
  } else {
    if(options.miniCssExtract) {
      return {
        loader: MiniCssExtractPlugin.loader,
        css,
        scss,
      }
    }else{
      return {
        style: generateLoaders('style'),
        css,
        // sass: generateLoaders('sass', { indentedSyntax: true }),
        scss,
      }
    }
  }
}

// Generate loaders for standalone style files
exports.mixStylesLoaders = function (options) {
  const output = []
  const loaders = exports.mixLessSacssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    // console.log("styleLoaders:", extension, loader)
    output.push(loader)
  }
  console.log("styleLoaders-out:", output)
  return output
}

exports.useCssLessLoaders = isProd
? mixStylesLoaders({
    sourceMap: config.build.productionSourceMap,
    miniCssExtract: true,
    usePostCSS: true
  })
: mixStylesLoaders({
  // sourceMap: config.dev.cssSourceMap,
    miniCssExtract: false,
    usePostCSS: true
  });

exports.useCssSassLoaders = isProd
  ? mixStylesLoaders({
      sourceMap: config.build.productionSourceMap,
      miniCssExtract: true,
      usePostCSS: false
    })
  : mixStylesLoaders({
    // sourceMap: config.dev.cssSourceMap,
      miniCssExtract: false,
      usePostCSS: false
    });


exports.cssLoader = {
  loader: 'css-loader',
};

/**
 * Sass loader with sass-resources-loader
 */
exports.sassLoaderItems = [
  {
    loader: 'sass-loader',
    options: {
        sourceMap: true,
        // Prefer `dart-sassRules`
        implementation: require('sass'),
    },
  },
  // sassResourceItems.length
  //   ? {
  //         loader: 'sass-resources-loader',
  //         options: {
  //             resources: sassResourceItems,
  //         },
  //     }
  //   : null,
];

exports.postCssLoader = {
  loader: 'postcss-loader',
  options: {
      postcssOptions: {
        // config: true, // 开启 / 关闭自动加载配置 postcss.config.js, 默认开启true
        // 处理写在 JavaScript 中的样式，那么你需要使用 postcss-js parser
        parser: 'postcss-js',
      },
      // 在 CSS-in-JS 中启动 PostCSS Parser 支持
      execute: true,
      sourceMap: true,
  },
};

/***
 * Using MiniCssExtractPlugin in production or style-loader in development
 * @see https://webpack.js.org/plugins/mini-css-extract-plugin/#root
 * @see https://webpack.js.org/loaders/style-loader/#root
 */
exports.miniCssExtractLoader = isProd
  ? {
        loader: MiniCssExtractPlugin.loader,
        // options: {
        //     esModule: false,
        // },
    }
  : {
        loader: 'style-loader',
        // options: {
        //     esModule: false,
        // },
    };

/**
 * @see https://webpack.js.org/loaders/less-loader/#root
 */
exports.lessLoader = {
    loader: 'less-loader',
    options: {
        sourceMap: true,
        lessOptions: {
            javascriptEnabled: true,
        },
    },
};

/**
 * Using to convert CSS modules from css-loader to TypeScript typings
 * @see https://github.com/TeamSupercell/typings-for-css-modules-loader
 */
// exports.typingsCssModulesLoader = {
//     loader: '@teamsupercell/typings-for-css-modules-loader',
//     options: {
//         banner:
//             '// autogenerated by typings-for-css-modules-loader. \n// Please do not change this file!',
//         formatter: 'prettier',
//     },
// };

/**
 * @see https://webpack.js.org/loaders/sass-loader/#problems-with-url
 */
// exports.resolveUrlLoader = {
//     loader: 'resolve-url-loader',
//     options: {
//         sourceMap: true,
//     },
// };

exports.cssModulesSupportLoaderItems = [
  miniCssExtractLoader,
  // typingsCssModulesLoader,
  {
      ...cssLoader,
      options: {
          // esModule: false,
          modules: {
              exportLocalsConvention: 'camelCaseOnly',
              localIdentName: '[local]__[contenthash:base64:5]',
          },
      },
  },
];

exports.cssLoaderItems = [exports.miniCssExtractLoader, exports.cssLoader];


/**
 * js/jsx/ts/tsx eslint loader
 */

exports.tsLoader = {
  loader: "ts-loader",
  options: {
    /** 为 loader 传入 transpileOnly 选项，以缩短使用 ts-loader 时的构建时间。使用此选项，会关闭类型检查。
     * 如果要再次开启类型检查，请使用 ForkTsCheckerWebpackPlugin将检查过程移至单独的进程，可以加快 TypeScript 的类型检查和 ESLint 插入的速度
     **/
     transpileOnly: true,
    // getCustomTransformers: () => ({
    //   before: [ReactRefreshTypeScript()].filter(Boolean),
    //   transpileOnly: true
    // }),
  },
}

exports.babelLoader = {
    loader: 'babel-loader', // 代码换成ES5 的代码来做浏览器兼容
    options: {
      configFile: resolve('/.babelrc'),
      /*cacheDirectory是用来缓存编译结果，下次编译加速*/
      cacheDirectory: true,
      cacheCompression: isProd,
      compact: isProd,
      // plugins: ['syntax-dynamic-import'],
      // presets: [
      //   [
      //     '@babel/preset-env',
      //     {
      //         modules: false
      //     }
      //   ]
      // ]
    },
};

exports.eslintLoader = {
  loader: "eslint-loader",
  options: {
    // emitWarning: true,
    formatter: require.resolve("react-dev-utils/eslintFormatter"),
    eslintPath: require.resolve("eslint"),
  },
}