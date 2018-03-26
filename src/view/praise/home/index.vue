<template>
    <div class="pr-bg">
      <div class="pr-bg-img">
        <div align="center">
          <button class="pr-btn-M" @click="toPathJoin">我要参加</button>
        </div>
        <div class="pr-foot-t" align="center">
          <span @click="showRule">活动规则</span>
          <span v-if="jionedData.joined" @click="toPathRanking" class="pl-138">排行榜</span>
        </div>
      </div>
      <!-- toast begin -->
      <com-toast :value="showToast" :content="jionedData" :title="title" @onHide="hideToast"></com-toast>
      <!-- toast end -->
    </div>
</template>
<script>
import Api from '@/api/praise/index'
import comToast from './components/comToast'
export default {
  components: {
    comToast
  },
  data() {
    return {
      jionedData: {},
      showToast: false,
      title: '活动规则'
    }
  },
  computed: {
    //
  },
  created() {
    this.getPersonal()
  },
  methods: {
    toPathRanking() {
      this.$router.push('/view/praise/ranking')
    },
    toPathJoin() {
      this.$router.push('/view/praise/verification')
    },
    // 判断是否存在store，存在则不在请求
    getPersonal() {
      console.log(this.$store.getters, 666)
      if (this.$store.getters.praiseSignedBefore && this.$store.getters.priseJoined !== '') {
        this.$router.replace('/view/praise/qrcode')
      } else {
        this.getPersonalApi()
      }
    },
    getPersonalApi() {
      Api.joinedApi({}).then(data => {
        if (data.status) {
          this.jionedData = data.content
          // 储存state
          this.$store.dispatch('setPraiseSIGNEDBEFORE', data.content.joined)
        } else {
          this.$Toast(data.error.errMsg)
        }
      })
    },
    // 活动规则
    showRule() {
      this.showToast = true
      this.title = '活动规则'
    },
    // 关闭弹框
    hideToast() {
      this.showToast = false
    }
  }
}
</script>
<style lang='scss' scoped>
  @import "style.scss";
</style>
