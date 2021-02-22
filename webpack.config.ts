import path from "path";
import {Configuration, WebpackPluginInstance} from "webpack";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import * as webpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";


const isDevelopment = process.env.NODE_ENV !== 'production';
const devPlugins: WebpackPluginInstance[] = [];
if (isDevelopment) {
    devPlugins.concat([
        new ReactRefreshPlugin(),
    ])
}

const webpackConfig = (): Configuration => ({
    entry: "./src/index.tsx",
    mode: isDevelopment ? 'development' : 'production',
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [/dist/, /node_modules/],
                use: [
                    ...(
                        isDevelopment ? [
                            {
                                loader: 'babel-loader',
                                options: { plugins: ['react-refresh/babel'] },
                            },
                        ] : []
                    ),
                    {
                        loader: 'ts-loader',
                        options: { transpileOnly: true },
                    },
                ].filter(Boolean),
            }
        ],
    },
    devServer: {
        publicPath: 'http://0.0.0.0:3000',
        hot: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 3000,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        clientLogLevel: 'info',
        overlay: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
    plugins: [
        ...(isDevelopment ? [
            new ReactRefreshPlugin(),
        ] : []),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin(),
    ],
});

export default webpackConfig;
