//run webpack --watch
module.exports = {
  entry: './client/index.js',

  output: {
    filename: 'bundle.js',
    path: './client',
    publicPath: '/client',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}