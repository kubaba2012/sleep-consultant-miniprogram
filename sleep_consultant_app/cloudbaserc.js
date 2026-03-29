const path = require('path')

module.exports = {
  version: '2.0',
  envId: 'sleep-consultant-app', // 替换为你的 CloudBase 环境 ID
  static: {
    // 静态资源配置
    env: 'prod',
    distDir: '.', // 当前目录
    index: 'index.html', // 入口文件
    notFound: 'index.html', // 404 页面
    maxAge: 86400 // 缓存时间（秒）
  },
  functions: [],
  databases: [],
  storage: [
    {
      src: '**', // 匹配所有文件
      ignore: ['node_modules/**', '*.log', '*.tmp'] // 忽略文件
    }
  ],
  frameworks: [],
  plugins: []
}