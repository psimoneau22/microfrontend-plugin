const app = (path, id) => ({
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ],
                    }
                }
            }
        ]
    },
    entry: path,
    output: {
        path: `${__dirname}/wwwroot/dist`,
        filename: `${id}.bundle.js`,
    },
})

module.exports = [
    app('./src/index.js', 'app'),
];
