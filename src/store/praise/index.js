// 状态
const state = {
  praiseSessionValid: '',  // session是否有效
  praiseSignedBefore: '',   // 是否注册过,
  priseJoined: '',  // 是否已参加活动
  priseQrCode: ''  // 服务人员二维码
}

// 操作
const mutations = {
  // 设置session
  PRAISE_SET_SESSIONVALID (state, praiseSessionValid) {
    state.praiseSessionValid = praiseSessionValid
  },
  // 设置注册标识
  PRAISE_SET_SIGNEDBEFORE (state, praiseSignedBefore) {
    state.praiseSignedBefore = praiseSignedBefore
  },
  // 是否已参加活动
  PRAISE_SET_JOINED (state, priseJoined) {
    state.priseJoined = priseJoined
  },
  // 服务人员二维码
  PRAISE_SET_QRCODE (state, priseQrCode) {
    state.priseQrCode = priseQrCode
  }
}

// 方法
const actions = {
  // 设置session
  setPraiseSESSIONVALID ({ commit }, praiseSessionValid) {
    commit('PRAISE_SET_SESSIONVALID', praiseSessionValid)
  },
  // 设置注册标识
  setPraiseSIGNEDBEFORE ({ commit }, praiseSignedBefore) {
    commit('PRAISE_SET_SIGNEDBEFORE', praiseSignedBefore)
  },
  // 是否已参加活动
  setPraiseJOINED ({ commit }, priseJoined) {
    commit('PRAISE_SET_JOINED', priseJoined)
  },
  // 服务人员二维码
  setPraiseQRCODE ({ commit }, priseQrCode) {
    commit('PRAISE_SET_QRCODE', priseQrCode)
  }
}

// getters
const getters = {
  praiseSessionValid: state => state.praiseSessionValid,
  praiseSignedBefore: state => state.praiseSignedBefore,
  priseJoined: state => state.priseJoined,
  priseQrCode: state => state.priseQrCode
}

export default {
  state,
  mutations,
  actions,
  getters
}
