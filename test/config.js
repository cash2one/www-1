/**
 * Created by zhengchaofan on 2017/6/6.
 */
var  path = require('path');

const config={
    entry:'./webpack/main1.js',
    output:{
        path:path.resolve(__dirname, './webpack/dist'),
        filename: 'bundle[hash].js'
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: 'babel-loader'},
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    resolve: {//很重要不写这个东西就不能用template这个属性
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
};
module.exports=config;