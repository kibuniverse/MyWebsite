const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPluginHome = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/index.html'),
    filename: 'index.html',
    chunks: ['index']
})
const htmlPluginBlog = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/pages/blog.html'),
    filename: 'blog.html',
    chunks: ['blog']
})

const htmlPluginList = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/pages/list.html'),
    filename: 'list.html',
    chunks: ['list']
})

module.exports = {
    entry: {
        index: './src/index.js',
        blog: './src/components/blogPage/index.js',
        list: './src/components/list/Index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
        port: 8081,
        hot: true,
        historyApiFallback: {
            rewrite: [
                {
                    from: /list/,
                    to: '/list/html'
                }
            ]
        }
    },
    plugins: [
        htmlPluginHome,
        htmlPluginBlog,
        htmlPluginList
    ],
    devtool:  'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.md$/,
                use: 'raw-loader'
            }
        ]
    },
    mode: 'development'
}