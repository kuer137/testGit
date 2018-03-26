<template>
  <div class="pr-bg" align="center">
    <div class="pr-top"></div>
    <div class="pr-center">
      <p class="pr-t">为TA点赞成功，感谢您的参与</p>
      <p class="pt-c">您的奖励已经发放到“我的厨语”</p>
    </div>
    <div class="pr-bottom">
      <p class="pr-t">邀请小伙伴为TA点赞</p>
      <div>
        <button @click="showGuide" class="pr-btn">邀请伙伴</button>
      </div>
    </div>
    <template v-if="isShow">
      <guide :value="isShow" @hideGuide="hideGuide"></guide>
    </template>
  </div>
</template>
<script>
import Api from '@/api/praise/index'
import Guide from './component/guide.vue'
import WxUtils2 from './component/praiseShare'
export default {
  components: {
    Guide
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    WxUtils2.configWX2(this, () => {
      WxUtils2.getSignature2()
    })
  },
  methods: {
    hideGuide() {
      this.isShow = false
    },
    showGuide() {
      if (!this.$store.getters.priseJoined.posterPicUrl) {
        this.getPersonalApi()
      } else {
        this.isShow = true
      }
    },
    // 请求服务员数据
    getPersonalApi() {
      Api.joinedApi({}).then(data => {
        if (data.status) {
          if (data.content && data.content.joined) {
            this.activityPostPicUrl = data.content.posterPicUrl
            // 储存state
            this.$store.dispatch('setPraiseSIGNEDBEFORE', data.content.joined)
            this.$store.dispatch('setPraiseJOINED', data.content)
            this.$store.dispatch('setPraiseQRCODE', data.content.qrCode)
            // 显示弹窗
            this.isShow = true
          }
        } else {
          this.$Toast(data.error.errMsg)
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import 'style.scss';
</style>
