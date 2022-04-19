
const path = require('path')
const config = require('./index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../../package.json')

exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
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
  }
  
  // console.log("cssLoaders:", generateLoaders())
  /** 调用generateLoaders执行... **/
  if(options.usePostCSS) {
    //MiniCssExtractPlugin只用在 production 配置中，并且在loaders链中不使用 style-loader, 特别是在开发中使用HMR，因为这个插件暂时不支持HMR
    if(options.extract) {
      return {
        css: generateLoaders('css'),
        postcss: generateLoaders('postcss'),
        less: generateLoaders('less', {javascriptEnabled: true})
      }
    }else{
      return {
        style: generateLoaders('style'),
        css: generateLoaders('css'),
        postcss: generateLoaders('postcss'),
        less: generateLoaders('less', {javascriptEnabled: true})
      }
    }
    
  } else {
    if(options.extract) {
      return {
        css: generateLoaders('css'),
        scss: generateLoaders('sass', { webpackImporter: true }), //implementation: require('node-sass'), 
      }
    }else{
      return {
        style: generateLoaders('style'),
        css: generateLoaders('css'),
        // sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass', { webpackImporter: true }),
      }
    }
  }
}

// Generate loaders for standalone style files
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    // console.log("styleLoaders:", extension, loader)
    // output.push({
    //   test: new RegExp('\\.' + extension + '$'),
    //   use: loader
    // })
    output.push(loader)
  }
  console.log("styleLoaders-out:", output)
  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
