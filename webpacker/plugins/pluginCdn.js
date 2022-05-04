const WebpackCdnPlugin = require('webpack-cdn-plugin');

// 生产环境 cdn
exports.cdnPlugin = new WebpackCdnPlugin({
  modules: [
      { name: 'react', var: 'React', path: `umd/react.${process.env.NODE_ENV}.min.js` },
      { name: 'react-dom', var: 'ReactDOM', path: `umd/react-dom.${process.env.NODE_ENV}.min.js` },
      { name: 'react-router-dom', var: 'react-router-dom', path: 'umd/react-router-dom.min.js' },
      { name: 'react-router-config', var: 'react-router-config', path: 'umd/react-router-config.min.js'},
      { name: 'redux', var: 'redux', path: 'dist/redux.min.js' },
      { name: 'react-redux', var: 'react-redux', path: 'dist/react-redux.min.js'}
  ],
  publicPath: '/node_modules'
});