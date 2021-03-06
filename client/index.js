/*
* index.js
* 项目入口文件
* */
import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

// 引入全局CSS样式
import './assets/styles/global.styl'
import createRouter from './config/router'
Vue.use(VueRouter)

const router = createRouter()

// 没有模板时在body下创建一个根节点
// const root = document.createElement('div')
// document.body.appendChild(root)

// 将根节点root注入到app.vue组件中
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
