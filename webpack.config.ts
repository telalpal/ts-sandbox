import path from "path";
import webpack, {Configuration} from "webpack";
import * as webpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from "html-webpack-plugin";

const webpackConfig = (env: any): Configuration => ({
    entry: "./src/index.tsx",
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
                loader: 'awesome-typescript-loader',
                exclude: /dist/
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
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env.PRODUCTION": env.production || !env.development,
            "process.env.NAME": JSON.stringify(require("./package.json").name),
            "process.env.VERSION": JSON.stringify(require("./package.json").version)
        })
    ]
});

export default webpackConfig;
