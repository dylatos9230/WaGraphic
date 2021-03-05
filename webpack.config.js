const webpack = require('webpack')
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = (env, args) => {
    const isProductionMode = (args.mode === 'production');
    return {
        devServer: {
            open: 'Google Chrome',
            hot: true,
            liveReload: false
        },
        entry: './index.ts',
        devtool: 'inline-source-map',
        mode: args.mode,
        output:{
            path: path.resolve(__dirname, 'dist'),
            filename: isProductionMode? '[name].[contenthash].js' : '[name].[hash].js',
        },
        module:{
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                }
            ]
        },
        resolve:{
            extensions: ['.tsx', '.ts', '.js']
        },
        experiments:{
            syncWebAssembly: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new CleanWebpackPlugin(),
            new WasmPackPlugin({
                crateDirectory: path.resolve(__dirname, '.'),
            }),
            new webpack.ProvidePlugin({
                TextDecoder: ['text-encoding', 'TextDecoder'],
                TextEncoder: ['text-encoding', 'TextEncoder']
            })
        ]
    }
}