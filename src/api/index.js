import { request } from '@/common/request'

// 接口地址
const api = {
  sendSms: '/cfdq/weixin/getSmCode', // 获取验证码
  getQuestion: '/cfdq/weixin/getQuestion', // 获取题目列表
  getActivityMainPage: '/cfdq/weixin/getActivityMainPage', // 获取题目首页
  getActivityRule: '/cfdq/weixin/getActivityRule', // 获取活动规则
  getActivityDesc: '/cfdq/weixin/getActivityDesc', // 获取活动描述
  answer: '/cfdq/weixin/answer', // 答题
  checkSmCode: '/cfdq/weixin/checkSmCode', // 校验验证码
  checkSession: '/cfdq/weixin/checkSession',  // 检查session
  genSession: '/cfdq/weixin/genSession'  // 生成session
}
// 获取验证码
const sendSms = (activityId, mobile) => {
  return request({
    url: api.sendSms,
    method: 'get',
    data: {
      activityId: activityId,
      mobile: mobile
    }
  })
}
// 校验验证码
const checkSmCode = (activityId, mobile, smCode) => {
  return request({
    url: api.checkSmCode,
    method: 'get',
    data: {
      activityId: activityId,
      mobile: mobile,
      smCode: smCode
    }
  })
}
// 获取题目首页
const getActivityMainPage = (activityId) => {
  return request({
    url: api.getActivityMainPage,
    method: 'get',
    data: {
      activityId: activityId
    }
  })
}
// 获取活动规则
const getActivityRule = (activityId) => {
  return request({
    url: api.getActivityRule,
    method: 'get',
    data: {
      activityId: activityId
    }
  })
}
// 获取活动描述
const getActivityDesc = (activityId) => {
  return request({
    url: api.getActivityDesc,
    data: {
      activityId: activityId
    }
  })
}
// 获取题目列表
const getQuestion = (activityId) => {
  return request({
    url: api.getQuestion,
    data: {
      activityId: activityId
    }
  })
}
// 答题
const answer = (answer, questionId, activityId) => {
  return request({
    url: api.answer,
    method: 'post',
    data: {
      answer: answer,
      questionId: questionId,
      activityId: activityId
    }
  })
}
// 检查session
const checkSession = (activityId) => {
  return request({
    url: api.checkSession + '?activityId=' + activityId,
    noLoading: true
  })
}
// 生成session
const genSession = (activityId) => {
  return request({
    // url: api.genSession + '?activityId=' + activityId + '&openId=' + openId,
    url: api.genSession + '?activityId=' + activityId,
    noLoading: true
  })
}

export default {
  sendSms,
  checkSmCode,
  getActivityMainPage,
  getActivityRule,
  getActivityDesc,
  getQuestion,
  answer,
  checkSession,
  genSession
}
