const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPluginHome = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/index.html'),
    filename: 'index.html'
})
const htmlPluginBlog = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/index.html'),
})

module.exports = {
    entry: {
        home: './src/index',
        blog: ''
    }
    plugins: [
        htmlPluginHome,
        htmlPluginBlog
    ],
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    mode: 'development'
}