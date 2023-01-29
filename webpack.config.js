const path = require("path"); //require looks inside node_modules
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Import the plugin, look inside node_modules

module.exports = {
    entry: './src/index.ts', //Entry point
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist') //Absolute path to directory
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader"} //Use to load TS files and transpile to JS files
        ]
    },
    mode: "development", //Or 'production' when going to production
    devtool: 'inline-source-map', //Good for development purposes, recommended to remove when on production
    devServer: {
        static: false, //Assets will be bundled by the webpack
        port: 3000, //Use this port
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
        })
    ]
};