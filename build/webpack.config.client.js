const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin'); // 将css单独打包一个文件
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development';
let config;
const defaultPlugins = [
  new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: isDev ? '"development"' : '"production"'
      }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
];

const devServer = {
  port: '8001',
  host: '0.0.0.0',
  overlay: {  // webpack编译出现错误，则显示到网页上
      errors: true,
  },
  historyApiFallback: true,
  // historyApiFallback: {
  //   index: 'dist/index.html'  // 路径前缀和webpack.config.base中的publicPath是要对应
  // },
  // open: true, // run dev时是否自动打开浏览器

  // 不刷新热加载数据
  hot: true
};

if (isDev) {
    // 开发坏境的配置
    config = merge(baseConfig,{
      devtool: '#cheap-module-eval-source-map', // 让调试时快速映射到对应的源文件中
      module: {
        rules: [
          {
            test: /\.styl/,
            use: [
                'vue-style-loader',
                'css-loader',
                // {
                //     loader: 'css-loader',
                //     options: {
                //         module: true,
                //         localIdentName: isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
                //     }
                // },
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
      plugins: defaultPlugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin()
      ])
    })
} else {
    // 生产坏境的配置
    config = merge(baseConfig,{
      entry: { // 将所用到的类库单独打包
        app: path.join(__dirname, '../client/index.js'),
        vendor: ['vue']
      },
      output: {
        filename: '[name].[chunkhash:8].js'
      },
      module: {
        rules: [
          {
            test: /\.styl/,
            use: ExtractPlugin.extract({
                fallback: 'vue-style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            })
          }
        ]
      },
      plugins: defaultPlugins.concat([
        new ExtractPlugin('styles.[contentHash:8].css'),
      ]),
      optimization: {
        // runtimeChunk: {
        //     name: "manifest"                // webpack相关的代码单独打包?
        // },
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all'
            // cacheGroups: {                  // 这里开始设置缓存的 chunks
            //     commons: {
            //         chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            //         minSize: 0,             // 最小尺寸，默认0,
            //         minChunks: 2,           // 最小 chunk ，默认1
            //         maxInitialRequests: 5   // 最大初始化请求书，默认1
            //     },
            //     vendor: {
            //         test: /node_modules/,   // 正则规则验证，如果符合就提取 chunk
            //         chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            //         name: 'vendor',         // 要缓存的 分隔出来的 chunk 名称
            //         priority: 10,           // 缓存组优先级
            //         enforce: true
            //     }
            // }
        },
        runtimeChunk: true
      }
    })
}

module.exports = config;
