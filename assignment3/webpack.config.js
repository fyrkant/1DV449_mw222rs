module.exports = {
    entry: './client/src/index.js',
    output: {
        filename: './client/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};
