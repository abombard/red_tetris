var path = require('path');

module.exports = {
  devtool: 'eval',

  entry: './src/client/index.js',

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query:{
        presets: ["es2015", "react", "stage-0"]
      }
    },
    {
	  test: /\.css$/,
      exclude: /node_modules/,
	  loaders: [ 'style-loader', 'css-loader' ]
	}]
  }
};
