
// 状态
const state = {
  activityId: '', // 活动Id
  backgroundPic: '', // 背景图片
  sessionValid: '',  // session是否有效
  signedBefore: '',   // 是否注册过,
  activityName: ''   // 活动名称

}

// 操作
const mutations = {
  // 设置背景图
  MAIN_SET_BG (state, bg) {
    state.backgroundPic = bg
  },
  // 设置活动id
  MAIN_SET_ACTIVITYID (state, activityId) {
    state.activityId = activityId
  },
  // 设置session
  MAIN_SET_SESSIONVALID (state, sessionValid) {
    state.sessionValid = sessionValid
  },
  // 设置注册标识
  MAIN_SET_SIGNEDBEFORE (state, signedBefore) {
    state.signedBefore = signedBefore
  },
  // 设置活动名称
  MAIN_SET_ACTIVITYNAME (state, activityName) {
    state.activityName = activityName
  }
}

// 方法
const actions = {
  // 设置背景图
  setMainSetBG ({ commit }, bg) {
    commit('MAIN_SET_BG', bg)
  },
  // 设置活动id
  setMainSetACTIVITYID ({ commit }, activityId) {
    commit('MAIN_SET_ACTIVITYID', activityId)
  },
  // 设置session
  setMainSESSIONVALID ({ commit }, sessionValid) {
    commit('MAIN_SET_SESSIONVALID', sessionValid)
  },
  // 设置注册标识
  setMainSetSIGNEDBEFORE ({ commit }, signedBefore) {
    commit('MAIN_SET_SIGNEDBEFORE', signedBefore)
  },
  // 设置活动名称
  activityName ({ commit }, activityName) {
    commit('MAIN_SET_ACTIVITYNAME', activityName)
  }
}

// getters
const getters = {
  backgroundPic: state => state.backgroundPic,
  activityId: state => state.activityId,
  sessionValid: state => state.sessionValid,
  signedBefore: state => state.signedBefore,
  activityName: state => state.activityName
}

export default {
  getters,
  state,
  mutations,
  actions
}
