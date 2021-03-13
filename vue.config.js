module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
  // devServer: {
  //   overlay: {
  //     warnings: true,
  //     errors: true
  //   }
  // }
}