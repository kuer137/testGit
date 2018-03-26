<template>
  <div align="center">
    <div class="pr-banner"></div>
    <div class="pr-content">
      <div class="pr-top">
        <div class="pr-icon ll"></div>
        <div class="cc">当前服务人员</div>
        <div class="pr-icon rr"></div>
      </div>
      <div class="pr-c-icon"></div>
      <div class="pr-bottom">
        <p class="pr-name">{{ personal.name }}</p>
        <p class="pr-describe">您的肯定是对我们最好的鼓励</p>
        <div>
          <button @click="toPathShare" class="pr-b-btn">为TA点赞</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from '@/api/praise/index'
export default {
  components: {
    //
  },
  data() {
    return {
      isPraise: null,
      personal: {}
    }
  },
  computed: {
    //
  },
  created() {
    this.getPersonal()
  },
  methods: {
    toPathShare() {
      if (!this.isPraise) {
        this.$router.replace({
          path: '/view/praise/user-verification',
          query: {
            waiterId: this.$route.query.waiterId
          }
        })
      } else {
        this.$Toast('您已为该服务人员点赞过咯，不能重复操作')
      }
    },
    getPersonal() {
      let pm = {
        waiterId: this.$route.query.waiterId  // 后期获取
      }
      Api.personalApi(pm).then(data => {
        if (data.status) {
          this.isPraise = data.content.praised
          this.personal = data.content
        } else {
          this.$Toast(data.error.errMsg)
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  @import "style.scss";
</style>
