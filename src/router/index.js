
import Vue from 'vue'
import Router from 'vue-router'
import { routers } from './praise/index'// 引入其它应用的路由
const Main = () => import('page/main/index.vue') // 加载页面
const verification = () => import('page/verification/index.vue') // 注册页面
const home = () => import('page/home/index.vue') // home 页面
const conditions = () => import('page/conditions/index.vue') // 答题页面
const share = () => import('page/share/index.vue') // 报名成功&&分享页面

Vue.use(Router)

const indexRouter = {
  routes: [
    {
      path: '/',
      redirect: 'main'
    },
    {
      path: '/main',
      name: '加载',
      component: Main
    },
    {
      path: '/verification',
      name: '手机验证',
      component: verification
    },
    {
      path: '/home',
      name: '首页',
      component: home
    },
    {
      path: '/conditions',
      name: '招募条件',
      component: conditions
    },
    {
      path: '/share',
      name: '分享',
      component: share
    },
    ...routers
  ]
}

export default new Router(indexRouter)
