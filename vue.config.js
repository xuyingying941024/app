// vue.config.js
const path = require('path')
// 用于自动化导入公共样式文件
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/styles/imports.styl'),
      ],
    })
}

module.exports = {
   /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "src",
  
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },
  configureWebpack: config=>{
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
    } else {
      // 开发环境
      // 加载express脚本
      require('./mock.js')
      // 配置方向代理
      config.devServer = { 
        proxy: {
          '/api': { // api表示当前项目请求的key
            target: 'http://127.0.0.1:8081', // 代理服务器路径
            pathRewrite: { '^/api': '/' }, // 重写路径
            changeOrigin: true
          }
        }   
      }
      // mutate cfor development...
    }   
  }
}