const webpack = require('webpack');
const path = require('path');

function setupAdminos(environment) {
  environment.config.merge({
    resolve: {
      alias: {
        jquery: 'jquery/src/jquery',
        'jquery-ui/sortable': 'jquery-ui/ui/widgets/sortable.js',
        modules: path.join(__dirname, 'node_modules'),
      },
    },
  });

  // resolve-url-loader must be used before sass-loader
  environment.loaders.get('sass').use.splice(-1, 0, {
    loader: 'resolve-url-loader',
  });

  environment.plugins.prepend('Provide', new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery',
    'window.jQuery': 'jquery',
  }));
}

module.exports = setupAdminos;
