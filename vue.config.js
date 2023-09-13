const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //map文件
  productionSourceMap: false,
  lintOnSave: false,
  // 代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        pathRewrite: { '^/api': '' },
        ['/api/']: '',
      },
    },
  },
})
