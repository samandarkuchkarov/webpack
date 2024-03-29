const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin  = require('copy-webpack-plugin')

const config = {
    context: path.resolve(__dirname,'src'),
    mode:'development',
    entry:{
        main:'./index.js'
    },
    output:{
        filename:'[name].[contenthash].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:'./index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns:[
                {   
                    from: path.resolve(__dirname,'src/assets/Logo.png'),
                    to:   path.resolve(__dirname,'dist')
                }
            ]
            
})
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(png|jpg|svg|gif)$/,
                use:['file-loader']
            },
            {
                test:/\.(ttf|woff|woff2|eot)$/,
                use:['file-loader']
            },
            {
                test:/\.xml$/,
                use:['xml-loader']
            },
        ]
    }
}

module.exports = config