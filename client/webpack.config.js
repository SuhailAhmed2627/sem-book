/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
   const isProduction = env === "production";
   return {
      entry: "./src/App.jsx",
      output: {
         path: path.resolve(__dirname, "build"),
         publicPath: "/",
         filename: "bundle.js",
      },
      resolve: {
         alias: {
            components: path.resolve(__dirname, "src"),
         },
         extensions: [".js", ".jsx"],
      },
      devServer: {
         contentBase: "./build",
         historyApiFallback: true,
         proxy: {
            "/api": "http://localhost:3000",
         },
      },
      module: {
         rules: [
            {
               test: /\.(js|jsx)$/,
               exclude: /node_modules/,
               use: ["babel-loader", "eslint-loader"],
            },
            {
               test: /\.css$/,
               use: ["style-loader", "css-loader"],
            },
            {
               test: /\.(png|svg|jpg|jpeg|gif)$/i,
               type: "asset/resource",
            },
            {
               test: /\.(woff|woff2|eot|ttf|otf)$/i,
               type: "asset/resource",
            },
         ],
      },
      plugins: [
         new HtmlWebpackPlugin({
            template: path.resolve("./index.html"),
         }),
      ],
      // externals: {
      //    "/local/ckeditor.js":
      //       "https://cdn.ckeditor.com/ckeditor5/29.1.0/classic/ckeditor.js",
      // },
      devtool: isProduction ? "source-map" : "inline-source-map",
   };
};
