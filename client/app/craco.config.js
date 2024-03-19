const path = require('path')

module.exports = {
  //webpack配置
  webpack: {
    //配置别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}