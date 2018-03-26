<template>
  <div class="bg">
    <div class="loading-animate">
      <img :src="loadSrc">
      <span class="loading">正在加载中</span>
    </div>
  </div>
</template>
<script>
// import { emitBus, busName } from 'common/bus'
import Api from 'api'
export default {
  data() {
    return {
      loadSrc: require('assets/img/loading.gif'),
      activityId: this.$route.query.activityId,
      openId: this.$route.query.openId

    }
  },
  mounted() {
    // this.genSession()
    this.checkSession()
  },
  methods: {
    // 检查sesion
    checkSession() {
      Api.checkSession(this.activityId).then(res => {
        if (res.status) {
          console.log(res)
          let sessionValid = res.content.sessionValid
          let signedBefore = res.content.signedBefore
          this.$store.dispatch('setMainSetACTIVITYID', this.$route.query.activityId)
          this.$store.dispatch('setMainSESSIONVALID', sessionValid)
          this.$store.dispatch('setMainSetSIGNEDBEFORE', signedBefore)
          if (sessionValid) {
            this.$router.replace({
              path: '/home',
              query: {
                activityId: this.$route.query.activityId,
                sessionValid: sessionValid,
                signedBefore: signedBefore
              }
            })
          } else {
            this.genSession()
          }
        }
        //  else {
        //   this.genSession()
        // }
      })
    },
    // 生成Session
    genSession() {
      Api.genSession(this.activityId).then(res => {
        if (res.status) {
          // this.checkSession()
          this.$router.replace({
            path: '/home',
            query: {
              activityId: this.$route.query.activityId
            }
          })
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
