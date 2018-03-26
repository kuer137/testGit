import Axios from 'axios'
import { emitBus, busName } from '../bus'
import config from './config'
import { requestInterceptors, responseInterceptors } from '../utils'
let ax = null
const CODE_OK = 200
const CODE_ERROR = 500

// 初始化
export const initAxios = () => {
  ax = Axios.create(config)
  requestInterceptors(ax)
  responseInterceptors(ax)
}

// 请求
export const request = (config) => {
  if (!ax) {
    throw new Error('axios实例未初始化')
  }

  // 拼接data
  let params = {}
  if (String(config.method).toLowerCase() === 'post') {
    params = config.params
  } else {
    params = config.data
    if (!params) {
      params = {}
    }
  }

  config.params = {...(params || {})}
  if (!config.noLoading) {
    emitBus(busName.showLoading, true)
  }
  // 接口返回
  return ax(config)
  .catch(response => {
    // console.log(response)
    emitBus(busName.showLoading, false)
    return new Promise().reject({code: CODE_ERROR, msg: '网络不给力，请检查网络'})
  })
  .then(resp => {
    emitBus(busName.showLoading, false)
    if (resp) {
      // console.log('resp', resp)
      if (resp.status !== CODE_OK) {
        emitBus(busName.showToast, '接口错误，请找管理员询问')
        return new Promise().reject({data: resp.data, req: config})
      }
      if (!resp.data.status) {
        emitBus(busName.showToast, resp.data.error.errMsg)
      }
      // console.log(resp.data)
      return resp.data
    } else {
      emitBus(busName.showToast, '接口不存在，请找管理员询问')
    }
  })
}
