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

  // TODO: replace with SplitChunks after upgrade to Webpack 4.x
  environment.plugins.insert("CommonChunkVendor",
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: (module) => module.context && module.context.indexOf("node_modules") !== -1
    }),
    { before: "manifest" }
  );
}
