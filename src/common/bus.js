/* bus配置
 * @Author: LuoJW
 * @Date: 2018-01-06 10:01:20
 * @Last Modified by: LuoJW
 * @Last Modified time: 2018-02-28 15:34:41
 */
import Vue from 'vue'
let bus

// 初始化
export const initBus = () => {
  bus = new Vue()
}

// 事件常量名
export const busName = {
  showLoading: 'show-loading',
  showToast: 'show-toast',
  showAlert: 'show-alert'
}

// 监听事件
export const onBus = (name, callback) => {
  bus.$on(name, callback)
}

// 广播事件
export const emitBus = (name, val = {}) => {
  bus.$emit(name, val)
}

// 全局注册loading
Vue.prototype.$loading = (flag) => {
  emitBus(busName.showLoading, flag)
}

// 全局注册toast
Vue.prototype.$Toast = (val) => {
  emitBus(busName.showToast, val)
}

// 全局注册alert
Vue.prototype.$Alert = (val) => {
  emitBus(busName.showAlert, val)
}
