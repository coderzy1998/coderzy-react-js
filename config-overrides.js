const path = require('path')

const {
  override,
  addLessLoader,
  fixBabelImports,
  addWebpackAlias,
  overrideDevServer
} = require('customize-cra')

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    }),

    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),

    addLessLoader({
      javascriptEnabled: true
    })
  ),
  devServer: overrideDevServer(config => {
    config.proxy = {
      '/api': {
        target: require('./dev-api-host'),
        pathRewrite: { '^/api': '/' },
        changeOrigin: true,
        secure: false
      }
    }

    return config
  })
}