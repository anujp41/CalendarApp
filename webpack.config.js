const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './CalendarFrontEnd/app/index.js',
  mode: 'development',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3001,
      server: { baseDir: ['public'] }
    })
  ]
}