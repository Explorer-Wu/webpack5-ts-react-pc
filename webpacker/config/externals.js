const { isProd } = require("../utils");
// 自动解析确定的扩展, require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
module.exports = isProd ? [
  {
    'babel-polyfill': 'window', 
  //   react: 'react',
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
    // Object
    'lodash': {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_' // indicates global variable
    },
    'react-router-dom': 'react-router-dom',
    // 'react-router-config': 'react-router-config',
    'redux': 'redux',
    'react-redux': 'react-redux',
    // Array,  subtract 可以通过全局 math 对象下的属性 subtract 访问（例如 window['math']['subtract']）
    //subtract: ['./math', 'subtract'] 
    'BaiduMap': 'BMap',
    'BaiduMapGL': 'BMapGL'
  },
  // Function 对于 webpack 外部化，通过定义函数来控制行为, 'commonjs'+ request 定义了需要外部化的模块类型。
  // function(context, request, callback) {
  //     if (/^yourregex$/.test(request)){
  //     return callback(null, 'commonjs ' + request);
  //     }
  //     callback();
  // },
] : {
  'BaiduMap': 'BMap',
  'BaiduMapGL': 'BMapGL'
}