var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = [{
        entry: {
            './public/js/index': './src/front/js/main.js',
        },
        output: {
            path: __dirname,
            filename: '[name].js',
        },
        devtool: 'source-map',
        module: {
            loaders: [
                {
                    test: /.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015'],
                    },
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
            ],
        },
        plugins: [
            new CopyWebpackPlugin([{
                context: 'src/front/static',
                from: '**/*',
                to: 'public/',
            }]),
            new CopyWebpackPlugin([{
                context: 'src/server/',
                from: '**/*',
                to: 'server/',
            }]),
        ],
    }
];