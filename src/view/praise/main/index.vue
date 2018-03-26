<template>
  <div class="bg">
    <div class="loading-animate">
      <img :src="loadSrc">
      <span class="loading">正在加载中</span>
    </div>
  </div>
</template>
<script>
import Api from '@/api/praise/index'
export default {
  data() {
    return {
      loadSrc: require('assets/img/loading.gif')
    }
  },
  mounted() {
    this.checkSession()
  },
  methods: {
    // 检查sesion
    checkSession() {
      Api.checkSession({}).then(res => {
        if (res.status) {
          if (res.content.sessionValid) {
            // 校验是否已经参加活动
            let pm = {}
            Api.joinedApi(pm).then(data => {
              if (data.status) {
                // 储存state
                this.$store.dispatch('setPraiseSESSIONVALID', res.content.sessionValid)
                this.$store.dispatch('setPraiseSIGNEDBEFORE', data.content.joined)
                this.$store.dispatch('setPraiseJOINED', data.content)
                // 跳转路由
                let topart = ''
                if (data.content.joined) {
                  topart = '/view/praise/qrcode'
                } else {
                  topart = '/view/praise/home'
                }
                this.$router.replace({
                  path: topart,
                  query: {
                    sessionValid: res.sessionValid
                  }
                })
              } else {
                this.$Toast(data.error.errMsg)
              }
            })
          } else {
            // 如果校验sesssion不通过则重定向获取session
            let url = 'http://cmms2.meicloud.com/s/wechat/index.html#/view/praise/main'
            let firstUrl = `http://cmms2.meicloud.com/cfdq/weixin/checkToken?cmmsRedirectUri=${url}`
            let secondUrl = `https://iot2.midea.com.cn/artcook/userinfo?cyRedirectUrl=${firstUrl}`
            let tempUrl = encodeURIComponent(secondUrl)
            let thirdUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35a1bc53180263b6&redirect_uri=${tempUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
            location.href = thirdUrl
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.bg {
  position: relative;
  background-color: #d9d9d9;
}
.loading:after {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  animation: ellipsis 2s infinite;
  content: '\2026'; /* ascii code for the ellipsis character */
}
.loading-animate {
  position: absolute;
  top: px2rem(300px);
  left: 0;
  right: 0;
  margin: auto;
  width: px2rem(174px);
  height: px2rem(258px);
  img {
    width: px2rem(174px);
    height: px2rem(258px);
  }
  span {
    display: block;
    width: px2rem(234px);
    color: #999;
  }
}
</style>
