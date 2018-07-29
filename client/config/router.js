import Router from 'vue-router'
import routes from './routes'

// 这样有利于服务端渲染，而不是使用先new Router然后再export
export default () => {
  return new Router({
    routes,
    // hash|history  hash路由影响seo
    mode: 'history',
    // 给url都加一个前缀路径，但不加的路径也能正常访问
    // base: '/vuetodo',
    // router-link 激活时全局的一个class
    linkActiveClass: 'active-class',
    // active和exactactive的区别，linkExactActiveClass是路由完全匹配激活会增加的类名，linkActiveClass是部分重合，如路由在该路由子路由中或者自己时才会添加的一个类
    linkExactActiveClass: 'exact-class'
  })
}
