/* 公共方法
 * @Author: LuoJW
 * @Date: 2017-12-02 17:17:22
 * @Last Modified by: xuxl
 * @Last Modified time: 2018-03-14 19:48:26
 */

import { emitBus, busName } from './bus'
let isFirst = true  // 是否第一次进入路由

// 请求拦截器
export const requestInterceptors = (ax) => {
  ax.interceptors.request.use(
    config => {
      return config
    },
    err => {
      return Promise.reject(err)
    })
}

// 响应拦截器
export const responseInterceptors = (ax) => {
  ax.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            break
          case 404:
            break
        }
      }
      return Promise.reject(error.response.data)
    }
  )
}

// 路由跳转前钩子
export const routerBeforeEach = (to, from, next) => {
  if (!isFirst) {
    emitBus(busName.showLoading, true)
  } else {
    isFirst = false
  }
  next()
}

// 路由跳转后钩子
export const routerAfterEach = (to) => {
  emitBus(busName.showLoading, false)
}

// 返回组合数组
export const getKeyArray = (items, key) => {
  let rs = []
  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].hasOwnProperty(key)) {
      rs.push(items[i][key])
    }
  }
  return rs
}

// 返回日期格式
export const dateFtt = (date, fmt) => {
  if (!date) {
    return
  }
  var o = {
    'M+': date.getMonth() + 1,                 // 月份
    'd+': date.getDate(),                    // 日
    'h+': date.getHours(),                   // 小时
    'm+': date.getMinutes(),                 // 分
    's+': date.getSeconds(),                 // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds()             // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}

/**
 * 过滤器
 * @type {Object}
 */
export const filters = {
  /**
   * 对数字进行处理
   * 如 19000  -》 190，00
   */
  number: function (value) {
    if (!value) return ''
    value = value + ''
    value = value.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
    return value
  },
  /**
   * 日期过滤器
   * @param  {[type]} date 需要过滤的数据
   * @param  {[type]} type 过滤类型, 'DATE' :过虑结果为日期
   * @return {[type]}      [description]
   */
  date: function (date, type, number = 5) {
    if (!date) {
      return ''
    }
    if (typeof date === 'number') {
      date = new Date(date)
    } else {
      return date
    }
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    if (type !== 'DATE') {
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + date.toTimeString().substr(0, number)
    } else {
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
    }
  },

  // 返回yyyy.mm.dd
  dates: function (date, type) {
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
  },

/**
 * 丢掉 ‘_’开头的参数
 * 并把 abc__list[]-》{a,b,c}(以逗号隔开)
 * 过滤空参数
 * zz_开始的为日期对象，处理为毫秒后，属性名去掉zz
 */
  filterParam (pm) {
    let rsPm = {}
    for (let key in pm) {
      if (pm[key] && pm[key] !== '' && key !== 'total') {
        if (key.indexOf('__') > 0) {
          // TODO 改用正则
          if (pm[key].length > 0) {
            // book__list =[1,2] ==> book='{1,2}';
            rsPm[key.substring(0, key.indexOf('__'))] = pm[key].join(',')
          }
        } else if (key.startsWith('_')) {
          continue
        } else if (key.startsWith('zz_')) {
          // zz开始的为日期对象，处理为毫秒后，属性名去掉zz
          rsPm[key.substring(3)] = typeof pm[key] === 'number' ? pm[key] : pm[key].getTime()
        } else {
          rsPm[key] = pm[key]
        }
        // delete pm[key]
      }
    }
    return rsPm
  }
}

// 判断是否是字符串
export const isString = (val) => {
  return toString.call(val) === '[object String]'
}

// 格式化时间
export const formatData = (date) => {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let mt = m < 10 ? '0' + m : m
  let d = date.getDate()
  let dt = d < 10 ? '0' + d : d
  return y + '-' + mt + '-' + dt
}
