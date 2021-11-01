const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let meta = {
    charset: { charset: "UTF-8" },
    'viewport': 'width=device-width, initial-scale=1',
}

const directoryPath = path.join(__dirname, 'src');
let htmlPlugins = [];

let ejsFiles = fs.readdirSync(directoryPath);
let entry = { common: "./src/js/common.js" }
ejsFiles.filter(d => d.endsWith(".ejs")).forEach(function (file) {
    let filename = file.substr(0, file.length - 4);
    let entryPath = ["./src/js/" + filename + ".js", "./src/css/" + filename + ".less"];
    entry[filename] = [];
    entryPath.forEach((v, i) => {
        if (fs.existsSync(v)) {
            entry[filename].push(v);
        }
    })
    htmlPlugins.push(new HtmlWebpackPlugin({
        filename: filename + ".html",
        template: 'src/' + file,
        inject: true,
        meta: meta,
        chunks: ["common", filename]
    }));
});


module.exports = {
    mode: "development", //development、production
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "js/[name].js", //打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'ejs-loader',
                        options: {
                            esModule: false,
                            variable: 'data',
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css"
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new CopyWebpackPlugin({patterns:[{from:"./src/image/", to:"image"}]}),
        ...htmlPlugins
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: false
    }
}