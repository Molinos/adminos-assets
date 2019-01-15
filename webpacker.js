const webpack = require("webpack");
const path = require("path");

module.exports = setupAdminos;

function setupAdminos(environment) {
  environment.config.merge({
    resolve: {
      alias: {
        jquery: "jquery/src/jquery",
        "jquery-ui/sortable": "jquery-ui/ui/widgets/sortable.js",
        modules: path.join(__dirname, "node_modules"),
      }
    }
  });

  // resolve-url-loader must be used before sass-loader
  environment.loaders.get("sass").use.splice(-1, 0, {
    loader: "resolve-url-loader"
  });

  environment.plugins.prepend("Provide", new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    jquery: "jquery",
    "window.jQuery": "jquery",
  }));

  // // TODO: replace with SplitChunks after upgrade to Webpack 4.x
  // // TODO: also do we really need it?
  // environment.plugins.append("CommonChunkVendor",
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: "vendor",
  //     minChunks: (module) => {
  //       // this assumes your vendor imports exist in the node_modules directory
  //       return module.context && module.context.indexOf('node_modules') !== -1
  //     }
  //   })
  // );
  //
  // environment.plugins.append(
  //   'CommonsChunkManifest',
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'manifest',
  //     minChunks: Infinity
  //   })
  // )
}
