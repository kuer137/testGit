import { request } from '@/common/request'

// 接口地址
const api = {
  // 排行榜列表
  ranking: '/cfdq/weixin/praise/ranking',
  // 参加活动
  join: '/cfdq/weixin/praise/join',
  // 发验证码
  sendSms: '/cfdq/weixin/sendSms',
  // 点赞
  addPraise: '/cfdq/weixin/praise/addPraise',
  // 个人信息(是否能参与点赞活动)
  personal: '/cfdq/weixin/praise/personal',
  // 是否已参加
  joined: '/cfdq/weixin/praise/joined',
  // 检查session
  checkSession: '/cfdq/weixin/checkSession'
}

// 排行榜列表
const rankingApi = (pm) => {
  return request({
    url: api.ranking,
    data: pm
  })
}

// 参加活动
const joinApi = (pm) => {
  return request({
    url: api.join,
    method: 'post',
    data: pm
  })
}

// 发验证码
const sendSmsApi = (pm) => {
  return request({
    url: api.sendSms,
    method: 'post',
    data: pm
  })
}

// 点赞
const addPraiseApi = (pm) => {
  return request({
    url: api.addPraise,
    method: 'post',
    data: pm
  })
}

// 个人信息(是否能参与点赞活动)
const personalApi = (pm) => {
  return request({
    url: api.personal,
    data: pm
  })
}

// 是否已参加(是否需要注册)
const joinedApi = (pm) => {
  return request({
    url: api.joined,
    data: pm
  })
}

// 检查session
const checkSession = (pm) => {
  return request({
    url: api.checkSession,
    noLoading: true
  })
}

export default {
  rankingApi,
  joinApi,
  sendSmsApi,
  addPraiseApi,
  personalApi,
  joinedApi,
  checkSession
}
