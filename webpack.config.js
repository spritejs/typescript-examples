const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = function (env = {}) {
  const plugins = [];

  if(env.mode === 'development') {
    plugins.push(new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    }));
  }

  plugins.push(new webpack.DefinePlugin({
    __DEV__: env.mode === 'development',
  }));

  let paths = fs.readdirSync(path.resolve(__dirname, 'src/output'));
  const entry = {};
  paths.forEach((p) => {
    if(/\.ts$/.test(p)) {
      entry[p] = path.resolve(__dirname, 'src/output', p);
    }
  });

  return {
    mode: env.mode || 'none',
    entry,
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/js/',
      // library: ['doodles'],
      // libraryTarget: 'umd',
      // libraryExport: 'default',
      globalObject: 'this',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],

      /* Advanced module configuration (click to show) */
    },

    externals: {

    },
    // Don't follow/bundle these modules, but request them at runtime from the environment

    stats: 'errors-only',
    // lets you precisely control what bundle information gets displayed

    devServer: {
      contentBase: path.join(__dirname, env.server || '.'),
      compress: true,
      port: 9090,
      hot: true,
      // ...
    },

    plugins,
    // list of additional plugins

    /* Advanced configuration (click to show) */
  };
};
