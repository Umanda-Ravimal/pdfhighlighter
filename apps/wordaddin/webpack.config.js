/* eslint-disable no-undef */

const devCerts = require("office-addin-dev-certs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { join, resolve } = require("path");

const urlDev = "https://localhost:3000/";  // Development URL
const urlProd = "https://www.contoso.com/"; // CHANGE THIS TO YOUR PRODUCTION URL

// Asynchronous function to get HTTPS options for development
async function getHttpsOptions() {
  const httpsOptions = await devCerts.getHttpsServerOptions();
  return {
    ca: httpsOptions.ca,
    key: httpsOptions.key,
    cert: httpsOptions.cert,
  };
}

// Webpack configuration
module.exports = async (env, options) => {
  const dev = options.mode === "development"; // Check if in development mode

  const config = {
    devtool: "source-map",  // Generate source maps for easier debugging
    entry: {
      polyfill: ["core-js/stable", "regenerator-runtime/runtime"],
      vendor: ["react", "react-dom", "core-js"],
      taskpane: ["./src/taskpane/index.tsx", "./src/taskpane/taskpane.html"],
      commands: "./src/commands/commands.ts",
    },
    output: {
      clean: true, // Clean output directory before build
      path: join(__dirname, "../../dist/apps/wordaddin"),
    },
    resolve: {
      alias: {
        // Custom alias for packages in the monorepo
        "@my-workspace/packages-api": resolve("../../packages/api/src/index.ts"),
        "@my-workspace/packages-atoms": resolve("../../packages/atoms/src/index.ts"),
        "@my-workspace/packages-common": resolve("../../packages/common/src/index.ts"),
        "@my-workspace/packages-interfaces": resolve("../../packages/interfaces/src/index.ts"),
        "@my-workspace/packages-molecules": resolve("../../packages/molecules/src/index.ts"),
        "@my-workspace/packages-organisms": resolve("../../packages/organisms/src/index.ts"),
        "@my-workspace/packages-zustand": resolve("../../packages/zustand/src/index.ts"),
        "@my-workspace/packages-themes": resolve("../../packages/themes/src/index.ts"),
      },
      extensions: [".ts", ".tsx", ".html", ".js", ".mjs", ".css"], // Supported file types
    },
    module: {
      rules: [
        {
          test: /\.pdf$/,
          use: "file-loader",  // Load PDF files as static resources
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/, // Transpile JS using Babel
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/, // Transpile TypeScript using Babel
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript"],
            },
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/, // Use ts-loader for .ts/.tsx files
          use: ["ts-loader"],
        },
        {
          test: /\.html$/,
          exclude: /node_modules/, // Load HTML files
          use: "html-loader",
        },
        {
          test: /\.(png|jpg|jpeg|ttf|woff|woff2|gif|ico)$/, // Load image and font assets
          type: "asset/resource",
          generator: {
            filename: "assets/[name][ext][query]",
          },
        },
        {
          test: /\.css$/,  // Load CSS files
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.mjs$/,  // Handle `.mjs` files for modules
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
    plugins: [
      // Copy static assets
      new CopyWebpackPlugin({
        patterns: [
          { from: "assets/*", to: "assets/[name][ext][query]" },
          {
            from: "manifest*.xml",
            to: "[name][ext]",
            transform(content) {
              // Replace URL based on environment (development or production)
              return dev ? content : content.toString().replace(new RegExp(urlDev, "g"), urlProd);
            },
          },
        ],
      }),
      // Generate HTML files for taskpane and commands
      new HtmlWebpackPlugin({
        filename: "taskpane.html",
        template: "./src/taskpane/taskpane.html",
        chunks: ["polyfill", "vendor", "taskpane"],
      }),
      new HtmlWebpackPlugin({
        filename: "commands.html",
        template: "./src/commands/commands.html",
        chunks: ["commands"],
      }),
      // Provide global variables
      new webpack.ProvidePlugin({
        Promise: ["es6-promise", "Promise"],
      }),
    ],
    devServer: {
      hot: true,  // Enable hot module replacement
      headers: {
        "Access-Control-Allow-Origin": "*", // Set CORS headers for development
      },
      server: {
        type: "https",  // Use HTTPS for the development server
        options: env.WEBPACK_BUILD || options.https !== undefined ? options.https : await getHttpsOptions(),
      },
      port: process.env.npm_package_config_dev_server_port || 3000, // Define the dev server port
    },
  };

  return config;
};
