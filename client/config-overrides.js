const {
  removeModuleScopePlugin,
  override,
  babelInclude,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  removeModuleScopePlugin(),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    shared: path.resolve(__dirname, "../shared"),
  }),
  babelInclude([path.resolve("src"), path.resolve("../shared")])
);
