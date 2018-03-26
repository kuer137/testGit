<template>
  <div id="app" ontouchstart="">
    <router-view></router-view>
    <loading :show="isShowLoading"></loading>
    <div class="loading-animate" v-if="isLoading">
      <img src="./assets/img/loading.gif">
      <span class="loading">正在加载中</span>
    </div>
    <toast :value="isShowToast" :text="toastText" @on-hide="hideToast"></toast>
    <!-- <iframe :src="iframe" style="display: none"></iframe> -->
  </div>
</template>
<script>
import { onBus, busName } from 'common/bus'
import Toast from 'components/toast'
import Loading from 'components/loading'
import { isString } from 'common/utils'
// import WxUtils from 'common/wx/wxUtils'
export default {
  name: 'App',
  components: {
    Toast,
    Loading
  },
  data() {
    return {
      isLoading: false,
      iframe: '',
      isShowLoading: false,
      isShowToast: false,
      isShowAlert: false,
      alertData: {
        title: '',
        content: '',
        confirm: () => {}
      },
      toastText: '',
      transitionName: 'slide-left'
    }
  },
  // watch: {
  //   '$route' (to, from) {
  //     const toDepth = to.path.split('/').length
  //     const fromDepth = from.path.split('/').length
  //     this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  //     console.log(this.transitionName)
  //   }
  // },
  mounted() {
    this.onBusHandler()
    // WxUtils.configWX(this, () => {
    //   WxUtils.getSignature()
    // })
    // this.setTitle('招募活动')
  },
  methods: {
    // 设置标题
    setTitle(title) {
      document.title = title
      // 判断是否为ios设备，ios设备需要通过加载iframe来刷新title
      // if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      //   this.iframe = 'assets/img/favicon.ico'
      // }
    },
    onBusHandler() {
      // 是否显示loading
      onBus(busName.showLoading, val => {
        // console.log('show: ',val)
        this.isShowLoading = val
      })

      // 是否显示提示
      onBus(busName.showToast, val => {
        if (val) {
          if (isString(val)) {
            this.toastText = val
          }
          this.isShowToast = true
        }
      })

      // 是否显示提示
      onBus(busName.showAlert, val => {
        if (val) {
          this.alertData = val
          this.isShowAlert = true
        }
      })

      onBus(busName.toLogin, val => {
        this.$router.replace('/login')
      })
    },
    // 隐藏提示
    hideToast() {
      this.isShowToast = false
      this.toastText = ''
    },
    hideAlert() {
      if (typeof this.alertData.confirm === 'function') {
        this.alertData.confirm()
      }
      this.isShowAlert = false
      this.alertData = {
        title: '',
        content: '',
        confirm: () => {}
      }
    }
  }
}
</script>
<style lang="scss">
@import 'assets/style/main.scss';
</style>
