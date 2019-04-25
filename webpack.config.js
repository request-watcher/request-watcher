const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        filename: 'request-watcher.js',
        path: path.resolve(__dirname, 'lib'),
        library: 'RequestWatcher',
        libraryTarget: 'commonjs2',
        libraryExport: 'default'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css']
    },
    devtool: 'source-map'
}