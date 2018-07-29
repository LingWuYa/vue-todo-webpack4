const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const defaultPlugins = [
  new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: '"development"'
      }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html') // 设置默认的模板
  })
];

const devServer = {
  port: '8080',
  host: '0.0.0.0',
  overlay: {  // webpack编译出现错误，则显示到网页上
      errors: true,
  },
  // open: true, // run dev时是否自动打开浏览器

  // 不刷新热加载数据
  hot: true
};

const config = merge(baseConfig,{
  entry: path.join(__dirname,'../practice/index.js'),
  devtool: '#cheap-module-eval-source-map', // 让调试时快速映射到对应的源文件中
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
            'vue-style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  // import Vue from 'vue'  resolve配置使practice目录中引用vue使用另一个vue包，使template不出错
  resolve: {
    alias: {
      'vue': path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ])
})

module.exports = config;
