// const { join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// import {sassResourceItems} from '../config/sassResources';
const config = require('../env');
const { isProd, resolve } = require("../utils");

function mixLessSacssLoaders(options) {
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
function mixStylesLoaders(options) {
  const output = []
  const loaders = mixLessSacssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    // console.log("styleLoaders:", extension, loader)
    output.push(loader)
  }
  // console.log("styleLoaders-out:", output)
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
        // implementation: require('sass'),
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
  exports.miniCssExtractLoader,
  // typingsCssModulesLoader,
  {
      ...exports.cssLoader,
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

/**
 * js兼容性处理：babel-loader @babel/core 
    1. 基本js兼容性处理 --> @babel/preset-env
      问题：只能转换基本语法，如promise高级语法不能转换
    2. 全部js兼容性处理 --> @babel/polyfill  
      问题：只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
    3. 需要做兼容性处理的就做：按需加载  --> core-js
**/
exports.babelLoader = {
    loader: 'babel-loader', // 代码换成ES5 的代码来做浏览器兼容
    options: {
      configFile: resolve('/.babelrc'),
      /*cacheDirectory是用来缓存编译结果，下次编译加速*/
      cacheDirectory: true, // 开启babel缓存， 第二次构建时，会读取之前的缓存
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

/**
 * 语法检查： eslint-loader  eslint
 * 注意：只检查自己写的源代码，第三方的库是不用检查的
*/
exports.eslintLoader = {
  loader: "eslint-loader",
  options: {
    // emitWarning: true,
    formatter: require.resolve("react-dev-utils/eslintFormatter"),
    eslintPath: require.resolve("eslint"),
  },
}

/**
 * 开启多进程打包： thread-loader
 * 每个 worker 都是一个独立的 node.js 进程，其开销大约为 600ms 左右。同时会限制跨进程的数据交换。
 * 注：请仅在耗时的操作中使用此 loader！
*/
const osCpus = require('os').cpus();
exports.threadLoader = {
  loader: "thread-loader",
  // 有同样配置的 loader 会共享一个 worker 池
  options: {
    // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，
    // 在 require('os').cpus() 是 undefined 时回退至 1
    workers: osCpus ? osCpus.length - 1 : 1,

    // 一个 worker 进程中并行执行工作的数量
    // 默认为 20
    workerParallelJobs: 2, // node-sass 中有个来自 Node.js 线程池的阻塞线程的 bug。 当使用 thread-loader 时，需要设置 workerParallelJobs: 2

    // 额外的 node.js 参数
    // workerNodeArgs: ['--max-old-space-size=1024'],

    // 允许重新生成一个僵死的 work 池
    // 这个过程会降低整体编译速度
    // 并且开发环境应该设置为 false
    // poolRespawn: false,

    // 闲置时定时删除 worker 进程
    // 默认为 500（ms）
    // 可以设置为无穷大，这样在监视模式(--watch)下可以保持 worker 持续存在
    // poolTimeout: 2000,

    // 池分配给 worker 的工作数量
    // 默认为 200
    // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
    // poolParallelJobs: 50,

    // 池的名称
    // 可以修改名称来创建其余选项都一样的池
    // name: "my-pool"
  },
}
