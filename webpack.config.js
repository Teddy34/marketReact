module.exports = {
  entry: './main.js',
  output: {
    path: './',
    filename: 'index.js'
  },
  devServer: {
    inline: true,
    port:3333,
    proxy: {
      '/backend': {
        target: 'http://primamarket.herokuapp.com/api',
        secure: false
      }
    }
  },
  module: {
    loaders: [{
      test: /\.js?$/, // A regexp to test the require path. accepts either js or jsx
      loader: 'babel-loader', // The module to load. "babel" is short for "babel-loader"
      query: {
        presets: ['es2015', 'react']
      },
      exclude: /node_modules/
    }]
  }
};

