// import Config from 'common/config'
require('./../../../../common/wx/jweixin.min.js')
/* global module */
/* global wx */
/* jshint -W016 */
/* jshint -W059 */
export default (function () {
  'use strict'
  let config = {
    // shareImg: Config.basePath + '/s/mobile/giftCard/assets/img/share.jpg'
    shareImg: 'http://f.hiphotos.baidu.com/image/pic/item/a8ec8a13632762d00a2abcb5a2ec08fa513dc6a0.jpg'
  }
  let defTitle = '活动来啦啦啦啦啦啦啦'
  let defDesc = '拉阿拉啦啦啦啦垃圾垃圾垃圾垃圾啦啦啦'
  function getShareLink() {
    return 'http://cmms2.meicloud.com/s/wechat/index.html#/view/praise/praise'
    // return Config.isDev ? 'weixincs.midea.com/apps/giftCard' : 'weixin.midea.com/apps/giftCard'
  }

  function getSignature2(ctx, callback) {
    var urlStr = window.location.href.split('#')[0]
    var url = 'http://weixincs.midea.com/beta/cmms/api/getJsSdkInitParam?pageUrl=' + encodeURIComponent(urlStr)
    // var url = Config.isDev ? 'http://weixincs.midea.com/beta/cmms/api/getJsSdkInitParam?pageUrl=' + encodeURIComponent(urlStr) : 'http://weixin.midea.com/cmms/api/getJsSdkInitParam?pageUrl=' + encodeURIComponent(urlStr)
    // var url = Config.isDev ? 'http://weixincs.midea.com/api/getJsSdkInitParam?pageUrl=' + window.location.href : 'http://weixin.midea.com/api/getJsSdkInitParam?pageUrl=' + window.location.href;
    // var url = Config.basePath + '/cmms/api/getJsSdkInitParam?pageUrl=' + encodeURIComponent(urlStr)
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.send(null)
    xhr.onreadystatechange = function () {
      if (xhr.status === 200 && xhr.readyState === 4) {
        var data = JSON.parse(xhr.responseText)
        if (data.code === 0) {
          if (typeof data.data === 'string') {
            data.data = JSON.parse(data.data)
          }
          if (callback && callback.apply) {
            callback.apply(ctx, [data.data])
          }
        }
      }
    }
  }
  function configWX2(ctx, callback) {
    // var times = 0
    getSignature2(ctx, function (data) {
      if (data) {
        wx.config({
          debug: false,
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'showMenuItems'] // 必填，需要使用的JS接口列表
        })
        wx.ready(function () {
          // wx.hideAllNonBaseMenuItem()
          wx.showMenuItems({
            menuList: ['menuItem:share:timeline', 'menuItem:share:appMessage', 'menuItem:favorite']
          })
          wx.onMenuShareTimeline({
            title: defTitle,
            link: getShareLink(),
            imgUrl: config.shareImg,
            success: callback
          })
          wx.onMenuShareAppMessage({
            title: defTitle,
            desc: defDesc,
            link: getShareLink(),
            imgUrl: config.shareImg,
            success: callback
          })
        })
      }
    })
  }

  return {
    getSignature2: getSignature2,
    configWX2: configWX2
  }
})()
