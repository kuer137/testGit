'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {    // options是loader的选项配置
      minimize: process.env.NODE_ENV === 'production',  // 生产环境下压缩文件
      sourceMap: options.sourceMap   // 根据参数是否生成sourceMap文件
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function resolveResouce(name) {
    return path.resolve(__dirname, '../src/assets/style/' + name);
  }

  function generateSassResourceLoader() {
    var loaders = [
      cssLoader,
      // 'postcss-loader',
      'sass-loader',
      {
          loader: 'sass-resources-loader',
          options: {
            // it need a absolute path
            resources: [resolveResouce('basic.scss'), resolveResouce('font.scss')]
          }
      }
    ];
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // generate loader string to be used with extract text plugin
  // 生成loader
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        // 将loaderOptions和sourceMap组成一个对象
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // ExtractTextPlugin分离js中引入的css文件
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader' // 没有被提取分离时使用的loader
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    // sass: generateLoaders('sass', { indentedSyntax: true }),
    // scss: generateLoaders('sass'),
    sass: generateSassResourceLoader(),
    scss: generateSassResourceLoader(),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  // 定义返回的数组，数组中保存的是针对各类型的样式文件的处理方式
  const output = []
  // 调用cssLoaders方法返回各类型的样式对象(css: loader)
  const loaders = exports.cssLoaders(options)

  // 循环遍历loaders
  for (const extension in loaders) {
    // 根据遍历获得的key(extension)来得到value(loader)
    const loader = loaders[extension]
    output.push({
      // 处理的文件类型
      test: new RegExp('\\.' + extension + '$'),
      // 用loader来处理，loader来自loaders[extension]
      use: loader
    })
  }

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
