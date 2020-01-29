const path = require('path')
module.exports = {
  resolve: [
    {
      extensions: ['.js', '.json', '.vue', '.ts'],
      root: path.resolve(__dirname),
      alias: {
        '@': path.resolve(__dirname),
        '~': path.resolve(__dirname),
        '~assets': path.resolve(__dirname + '/assets')
      }
    },
    {
      extensions: ['.css', '.sass', '.scss'],
      root: path.resolve(__dirname),
      alias: {
        '@': path.resolve(__dirname),
        '~': path.resolve(__dirname),
        '~assets': path.resolve(__dirname + '/assets')
      }
    }
  ]
}
