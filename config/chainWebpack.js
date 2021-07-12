/*
 * @Author: lyu
 * @Date: 2021-03-16 17:05:17
 * @LastEditTime: 2021-06-28 16:11:36
 * @LastEditors: lyu
 * @FilePath: /gxs-user/config/chainWebpack.js
 */
module.exports = function chainWebpack(config) {
  // config.when(process.env.NODE_ENV === 'development', config => config.devtool('source-map'))
  // it can improve the speed of the first screen, it is recommended to turn on preload
  config.plugin('preload').tap(() => [
    {
      rel: 'preload',
      // to ignore runtime.js
      // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
      fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      include: 'initial'
    }
  ])

  // when there are many pages, it will cause too many meaningless requests
  config.plugins.delete('prefetch')

  config
    .when(process.env.NODE_ENV !== 'development',
      config => {
        // config.optimization.minimize(false)
        config
          .plugin('ScriptExtHtmlWebpackPlugin')
          .after('html')
          .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }])
          .end()
        config
          .optimization.splitChunks({
            chunks: 'all'
          })
        // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
        config.optimization.runtimeChunk('single')
      }
    )
}
