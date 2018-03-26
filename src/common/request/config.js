/*
 * @Author: LuoJW
 * @Date: 2018-01-06 09:55:43
 * @Last Modified by: LuoJW
 * @Last Modified time: 2018-01-06 11:18:48
 */
import apiHost from '../config'

// axios基本配置
const config = {
  baseURL: `${apiHost.basePath}`,
  method: 'get',
  withCredentials: false,
  params: {},
  timeout: 10000,
  headers: {'Content-type': 'application/json'}
}

export default config
