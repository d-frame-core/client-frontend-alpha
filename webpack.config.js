module.exports = {
  // other configuration options
  module: {
    devtool: "none",
    rules: [
      // existing rules go here
      {
        test: /\.tsx?$/,
        enforce: "pre",
        loader: "source-map-loader",
      },
    ],
  },
};
