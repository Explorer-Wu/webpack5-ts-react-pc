const WebpackCdnPlugin = require('webpack-cdn-plugin');

// 生产环境 cdn
exports.cdnPlugin = new WebpackCdnPlugin({
  // prodUrl:string | //unpkg.com/:name@:version/:path
  modules: {
    'react': [
      { name: 'react', var: 'React', path: `umd/react.${process.env.NODE_ENV}.min.js`, 
        prodUrl: 'unpkg.com/react@^18/'
      },
      { name: 'react-dom', var: 'ReactDOM', path: `umd/react-dom.${process.env.NODE_ENV}.min.js`, 
        prodUrl: 'unpkg.com/react-dom@^18/' },
      { name: 'react-router-dom', var: 'react-router-dom', path: `react.${process.env.NODE_ENV}.min.js`,
      prodUrl: 'https://cdn.bootcdn.net/ajax/libs/react-router-dom/6.3.0/'},
      // { name: 'react-router-config', var: 'react-router-config', path: 'umd/react-router-config.min.js'},
      { name: 'redux', var: 'redux', path: 'redux.min.js', prodUrl: 'https://cdn.bootcdn.net/ajax/libs/redux/4.2.0/' },
      { name: 'react-redux', var: 'react-redux', path: 'dist/react-redux.min.js'},
      { name: 'immer', var: 'immer', path: 'immer.d.ts', prodUrl: 'https://cdn.bootcdn.net/ajax/libs/immer/9.0.14/' // https://cdn.bootcdn.net/ajax/libs/immer/9.0.14/immer.umd.production.min.js
    },
     ]
  },
  publicPath: '/node_modules'
});