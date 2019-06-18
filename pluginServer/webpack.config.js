const AssetsPlugin = require('assets-webpack-plugin')

const pluginHostPublicUri = "http://localhost:5001/dist/plugins";

module.exports = {
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
    entry: {
        'com.blackdiamond.plugin1': './src/plugins/Plugin1',
        'com.blackdiamond.plugin2': './src/plugins/Plugin2',
        'com.blackdiamond.plugin3': './src/plugins/Plugin3',
    },
    output: {
        path: `${__dirname}/wwwroot/dist/plugins`,
        filename: '[name].bundle.js',
        library: '[name]',
        libraryTarget: 'global',
        libraryExport: 'default'
    },
    externals: {
        'react': ['com.blackdiamond.shared', 'dependencies', 'React'],
    },
    plugins: [
        new AssetsPlugin({
            path: 'wwwroot/dist',
            filename: 'pluginRegistration.json',
            processOutput: assets => JSON.stringify(Object.entries(assets).reduce((manifest, [key, value]) => ({
                ...manifest,
                [key]: {
                    id: key,
                    uri: `${pluginHostPublicUri}/${value.js}`,
                }
            }), {}))
        })
    ]
};
