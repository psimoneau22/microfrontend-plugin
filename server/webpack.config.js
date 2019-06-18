const baseConfig = {
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
                        plugins: [
                            "@babel/plugin-syntax-dynamic-import",
                        ]
                    }
                }
            }
        ]
    },
}

const app = (path, id) => ({
    ...baseConfig,
    entry: path,
    output: {
        path: `${__dirname}/wwwroot/dist`,
        filename: `${id}.bundle.js`,
    },
})

const plugin = (path, id) => ({
    ...baseConfig,
    entry: path,
    output: {
        path: `${__dirname}/wwwroot/dist/plugins`,
        filename: `${id}.bundle.js`,
        library: id,
        libraryTarget: 'global',
        libraryExport: 'default'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
})

module.exports = [
    app('./src/index.js', 'app'),
    plugin('./src/plugins/Comp1', 'com.blackdiamond.comp1'),
    plugin('./src/plugins/Comp2', 'com.blackdiamond.comp2')
];
