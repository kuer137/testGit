<template>
  <div class="pr-bg">
    <div class="pr-bg-img" align="center">
      <div class="pr-code-box">
        <div v-show="qrcode.isFlag">
          <!--<qrcode-vue :value="qrcode.value" :size="qrcode.size" level="L"></qrcode-vue>-->
          <img class="pr-code" :src="qrcode.value" alt="二维码">
        </div>
      </div>
      <div class="pr-center">
        <p class="b-c-text">服务专属二维码</p>
        <p class="b-c-num">{{ jionedData.praiseCount }}</p>
        <p class="s-c-text">本月点赞数</p>
      </div>
      <div class="pr-foot-t" align="center">
        <span @click="showRule">活动规则</span>
        <span @click="toPathRanking" class="pl-138">排行榜</span>
      </div>
    </div>
    <div class="getLength" ref="getlengths"></div>
    <!-- toast begin -->
    <com-toast :value="showToast" :content="jionedData" :title="title" @onHide="hideToast"></com-toast>
    <!-- toast end -->
  </div>
</template>
<script>
import Api from '@/api/praise/index'
// import QrcodeVue from 'qrcode.vue'
import comToast from './components/comToast'
export default {
  components: {
    //    QrcodeVue,
    comToast
  },
  data() {
    return {
      jionedData: {},
      showToast: false,
      title: '活动规则',
      qrcode: {
        value: this.$store.getters.priseQrCode || '',
        size: 195,
        isFlag: false
      }
    }
  },
  created() {
    this.getPersonal()
  },
  methods: {
    toPathRanking() {
      this.$router.push('/view/praise/ranking')
    },
    // 判断其是否已经储存store数据
    getPersonal() {
      console.log(this.$store.getters, 666)
      if (
        this.$store.getters.praiseSignedBefore &&
        this.qrcode.value !== '' &&
        this.$store.getters.priseJoined !== ''
      ) {
        this.jionedData = this.$store.getters.priseJoined
        this.qrcode.value = this.$store.getters.priseQrCode
        //        this.changecode()
        this.qrcode.isFlag = true
      } else {
        this.getPersonalApi()
      }
    },
    // 请求服务员数据
    getPersonalApi() {
      Api.joinedApi({}).then(data => {
        if (data.status) {
          if (data.content && data.content.joined) {
            this.jionedData = data.content
            this.qrcode.value = data.content.qrCode
            //            this.changecode()
            this.qrcode.isFlag = true
            // 储存state
            this.$store.dispatch('setPraiseSIGNEDBEFORE', data.content.joined)
            this.$store.dispatch('setPraiseJOINED', data.content)
            this.$store.dispatch('setPraiseQRCODE', data.content.qrCode)
          } else {
            this.$router.replace('/view/praise/home')
          }
        } else {
          this.$Toast(data.error.errMsg)
        }
      })
    },
    // 修改二维码宽度，使其自适应
    //    changecode() {
    //      let legth = this.$refs.getlengths.clientWidth
    //      this.qrcode.size = legth
    //    },
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
@import 'style.scss';
</style>
