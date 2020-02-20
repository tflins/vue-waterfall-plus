module.exports = {
  devServer: {
    proxy: {
      // 配置跨域
      '/api': {
        target: 'https://api.ixiaowai.cn/api',
        ws: true,
        changOrigin: true, //是否开启代理
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
