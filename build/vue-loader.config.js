module.exports = (isDev) => {
  return {
    preserveWhitespace: true,  // 设置.vue文件中template 模板多余的空格处理
    extractCSS: !isDev,         // true表示设置.vue文件中的css样式提取单独打包成一个文件，是否单独打包看具体项目，各有好处 
    cssModules: {
      localIdentName: isDev?'[path]-[name]-[hash:base64:5]':'[hash:base64:5]',    // 使css类名生成只有该文件能调用的独一无二的类名，如左是文件路径加上文件名加上hash，不会有class命名空间的冲突
      camelCase: true,                                    // css类名的驼峰命名              
    }
  }
}