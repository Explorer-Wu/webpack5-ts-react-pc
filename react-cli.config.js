const httpProxyTarget = {
  port: 3681, // 80
  protocol: 'http',
};

const httpsProxyTarget = {
  port: 3683, // 443
  protocol: 'https',
};

module.exports = {
  dev: {
    port: 3603,
    proxyTable: {
      "/api": {
        target: `${httpProxyTarget.protocol}://172.0.0.1:${httpProxyTarget.port}`,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
        // onProxyReq: function(proxyReq, req, res) {
        //   // add custom header to request
        //   proxyReq.setHeader('Cookie', 'username=wuwh; sessionid=xxxxx');
        //   // or log the req
        // }
      },
      "/auth": {
        target: `${httpsProxyTarget.protocol}://172.0.0.1:${httpsProxyTarget.port}`,
        changeOrigin: true,
        pathRewrite: {
          "^/auth": "/auth"
        }
      }
    },
  },
  build: {
    // 开启依赖分析
    bundleAnalyzerReport: true,
    // 开启Gzip
    productionGzip: true,
  },
  // 开启多进程
  useWorkerPool: true,
  // 是否使用CDN
  useCDN: true,
};