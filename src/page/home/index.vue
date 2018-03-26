<template>
  <div class="home" :class="{'isFix': showToast}">
    <div class="container">
      <img :src="content.activityPostPicUrl" class="bg">
      <div class="content">
        <div class="poster">{{content.activityPoster}}</div>
        <div class="sign-content">
          <div class="sign-time">报名时间：{{content.startTime | date}}-{{content.endTime | date}}</div>
          <div :class="{'sign-button':content.canAnswer,'no-sign':!content.canAnswer}" @click='signUp' >
          <!-- <div :class="{'sign-button':true}" @click='signUp'> -->
            我要报名
            <!-- 我要报名<span class="signNum">（已有{{content.signNum}}人报名）</span> -->
          </div>
        </div>
        <div class="footer">
          <span @click="showRule">活动规则</span>
          <span>&nbsp;</span>
          <span @click="showDetail">活动提示</span>
        </div>
      </div>
      <!-- toast begin -->
      <com-toast :value="showToast" :content="comContent" :title="title" @onHide="hideToast"></com-toast>
      <!-- toast end -->
    </div>
  </div>
</template>
<script>
import comToast from './components/comToast'
import Api from 'api/index'
// import { BusName } from 'common/bus'
export default {
  components: {
    'com-toast': comToast
    // 'success-toast': successToast
  },
  data() {
    return {
      showToast: false,
      activityId: this.$route.query.activityId || 2,
      title: '', // 弹出框title
      content: {
        // 首页内容
        activityName: '',
        activityPostPicUrl: '',
        activityPoster: '',
        endTime: '',
        signNum: '',
        startTime: ''
      },
      comContent: null // 规则内容&&活动说明公用容器
    }
  },
  created() {
    this.getHomeDetail()
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
    // 活动规则
    showRule() {
      Api.getActivityRule(this.activityId).then(data => {
        if (data.status) {
          this.showToast = true
          this.title = '活动规则'
          this.comContent = data.content
        } else {
          this.$Toast(data.chnDesc)
        }
      })
    },
    // 活动提示
    showDetail() {
      Api.getActivityDesc(this.activityId).then(data => {
        if (data.status) {
          this.showToast = true
          this.title = '活动提示'
          this.comContent = data.content
        } else {
          this.$Toast(data.chnDesc)
        }
      })
    },
    // 关闭弹框
    hideToast() {
      this.showToast = false
    },
    // 跳转到手机验证页面
    signUp() {
      // 如果不能报名则返回false
      console.log(this.content.canAnswer)
      if (!this.content.canAnswer) {
        return false
      }
      let sessionValid = this.$route.query.sessionValid // sessionValid 是否有效
      let signedBefore = this.$route.query.signedBefore // 是否已经注册
      if (sessionValid && signedBefore) {
        this.$router.replace({
          path: '/conditions',
          query: {
            activityId: this.$route.query.activityId
          }
        })
      } else {
        this.$router.replace({
          path: '/verification',
          query: {
            activityId: this.$route.query.activityId
          }
        })
      }
    },
    // 获取首页数据
    getHomeDetail() {
      Api.getActivityMainPage(this.activityId).then(data => {
        if (data.status) {
          this.content = data.content
          this.setTitle(data.content.activityName) // 将活动名称设置为title
          this.$store.dispatch('setMainSetBG', data.content.activityPostPicUrl)
          this.$store.dispatch('activityName', data.content.activityName)
        } else {
          this.$Toast(data.chnDesc)
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import './style.scss';
.sign-time {
  color: #fff;
  font-size: px2rem(24px);
}
</style>
