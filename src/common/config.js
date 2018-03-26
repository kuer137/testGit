/* host配置
 * @Author: LuoJW
 * @Date: 2018-01-06 09:56:22
 * @Last Modified by: xuxl
 * @Last Modified time: 2018-03-19 15:30:00
 */

// 返回环境
let ENV = (() => {
  if (location.href.indexOf('http://localhost') === 0 || location.href.indexOf('http://127.0.0.1') === 0) {
    return 'LOCAL'
  } else {
    return 'PROD'
  }
})()

let domainPath = ''
let index = 0
// domainPath
if (location.href.indexOf('http://localhost') === 0 || location.href.indexOf('http://127.0.0.1') === 0) {
  index = window.location.href.indexOf(window.location.hash) - 1
} else {
  index = window.location.href.indexOf(window.location.pathname)
}
domainPath = window.location.href.substring(0, index)

// 接口baseURL
let Config = {
  LOCAL: {
    basePath: domainPath + '/api'
  },
  PROD: {
    basePath: domainPath
    // basePath: domainPath + '/api'
    // basePath: 'http://10.73.32.5:8080/api'
    // basePath: 'http://10.17.145.47:8084/mockjsdata/25'
  }
}

export default Config[ENV]
