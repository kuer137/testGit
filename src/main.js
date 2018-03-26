// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'common/flexible.js'
import Vue from 'vue'
// import MintUI from 'mint-ui'
import App from './App'
import store from '@/store'
import router from './router'
import '@/assets/fonts/iconfont.css'

import { initAxios } from 'common/request'
import { initBus } from 'common/bus.js'
import { routerBeforeEach, routerAfterEach } from 'common/utils'
import FastClick from 'fastclick'
// Vue.use(MintUI)

require('es6-promise').polyfill()
// 初始化Axios
initAxios()
// 初始化bus
initBus()

Vue.config.productionTip = false

// 自定义指令，input框自动获取焦点
Vue.directive('focus', {
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
// 自定义全局时间过滤器 yyyy.m.h
Vue.filter('date',
  function (date, type) {
    if (!date) {
      return ''
    }
    if (typeof date === 'number') {
      date = new Date(date)
    } else if (toString.call(date) === '[object Date]') {
      console.log(date)
      // date = date
    } else {
      return date
    }
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    if (type !== 'DATE') {
      return y + '.' + (m < 10 ? '0' + m : m) + '.' + (d < 10 ? '0' + d : d)
    } else {
      return y + '.' + (m < 10 ? '0' + m : m) + '.' + (d < 10 ? '0' + d : d)
    }
  }
)
// 设置FastClick
FastClick.attach(document.body)

// 添加路由钩子
router.beforeEach(routerBeforeEach)
router.afterEach(routerAfterEach)

/* eslint-disable no-new */
setTimeout(() => {
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
}, 300)
