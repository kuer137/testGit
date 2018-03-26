const praiseShare = () => import('@/view/praise/share/index.vue') // 分享
const praiseHome = () => import('@/view/praise/home/index.vue') // 首页
const praiseRanking = () => import('@/view/praise/ranking/index.vue') // 排行榜
const praiseVerification = () => import('@/view/praise/verification/index.vue') // 注册验证码
const userVerification = () => import('@/view/praise/userVerification/index.vue') // 点赞验证码
const praiseQrcode = () => import('@/view/praise/qrcode/index.vue') // 二维码
const praisePraise = () => import('@/view/praise/praise/index.vue') // 点赞
const praiseMain = () => import('@/view/praise/main/index.vue') // 获取session，中转页
const userMain = () => import('@/view/praise/main/userMain.vue') // 获取session，中转页

export const routers = [
  {
    path: '/view/praise/main',
    name: '登录点赞',
    component: praiseMain
  },
  {
    path: '/view/praise/share',
    name: '点赞活动分享',
    component: praiseShare
  },
  {
    path: '/view/praise/home',
    name: '点赞活动首页',
    component: praiseHome
  },
  {
    path: '/view/praise/ranking',
    name: '点赞活动排行榜',
    component: praiseRanking
  },
  {
    path: '/view/praise/verification',
    name: '注册验证码',
    component: praiseVerification
  },
  {
    path: '/view/praise/user-verification',
    name: '点赞验证码',
    component: userVerification
  },
  {
    path: '/view/praise/qrcode',
    name: '二维码',
    component: praiseQrcode
  },
  {
    path: '/view/praise/praise',
    name: '点赞',
    component: praisePraise
  },
  {
    path: '/view/praise/user-main',
    name: '点赞',
    component: userMain
  }
]
