<template>
  <div class="toast" @touchmove.prevent v-show="show">
    <div class="mask_transparents" v-if="isSuccess"></div>
    <div class="mask_transparents" @click="backHome" v-else></div>
    <!-- 报名成功提示begin -->
    <div class="currentToast" v-if="isSuccess">
      <div>
        <div class="success_Info">
          <img :src="closeSrc" @click="backHome">
          <span>恭喜！</span>
          <span>您已成功报名{{activityName}}</span>
        </div>
        <!-- <p class="sharetip">点击右上角分享给朋友</p> -->
        <!-- <div class="toast_footer" @click="showShareICon">确定</div> -->
        <div class="toast_footer" @click="backHome">确定</div>
      </div>
    </div>
    <!-- 报名成功提示end -->
    <!-- 引导分享begin -->
    <div class="guide" v-else @click="backHome">
      <img :src="guideSrc">
    </div>
    <!-- 引导分享begin -->
  </div>
</template>
<script>
export default {
  name: 'SuccessToast',
  props: {
    value: Boolean,
    default: true
  },
  data() {
    return {
      isSuccess: true, // 默认显示
      show: true,
      closeSrc: require('assets/img/close@3x.png'),
      guideSrc: require('assets/img/tip@3x.png'),
      activityName: this.$store.getters.activityName
    }
  },
  methods: {
    // 隐藏报名成功提示并弹出分享提示语
    showShareICon() {
      this.isSuccess = false
    },
    // 点击关闭按钮返回首页
    backHome() {
      this.$router.replace({
        path: '/home',
        query: {
          activityId: this.$store.getters.activityId,
          sessionValid: this.$store.getters.sessionValid,
          signedBefore: this.$store.getters.signedBefore
        }
      })
    }
  },
  computed: {},
  watch: {
    value(val) {
      this.show = val
    }
  }
}
</script>
<style lang="scss" scoped>
.guide {
  position: relative;
  width: 100%;
  height: px2rem(164px);
  z-index: 6005;
  img {
    position: absolute;
    width: px2rem(244px);
    height: inherit;
    right: px2rem(8px);
    top: px2rem(8px);
  }
}
.toast {
  display: block;
}
.sharetip {
  text-align: center;
  padding-top: px2rem(40px);
  font-size: px2rem(28px);
  color: #185c7d;
}
.mask_transparents {
  display: block !important;
  position: fixed;
  z-index: 6000;
  width: px2rem(750px);
  height: px2rem(1334px);
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.currentToast {
  position: fixed;
  z-index: 6001;
  width: px2rem(580px);
  height: px2rem(550px);
  border-radius: px2rem(28px);
  top: px2rem(210px);
  left: 50%;
  margin-left: 0;
  transform: translateX(-50%);
  background-image: url(../../../assets/img/toast@3x.png);
  background-size: 100% 100%;
}
.success_Info {
  display: flex;
  position: relative;
  flex-direction: column;
  text-align: center;
  padding-top: px2rem(218px);
  box-sizing: border-box;
  font-family: PingFangSC-Medium;
  font-size: px2rem(36px);
  color: $white;
  line-height: px2rem(56px);
  img {
    position: absolute;
    width: px2rem(50px);
    height: px2rem(50px);
    border-radius: px2rem(8px);
    right: px2rem(4px);
    top: px2rem(4px);
  }
}
.toast_header {
  font-size: px2rem(36px);
  padding: px2rem(40px) px2rem(250px);
  box-sizing: border-box;
}
.toast_content {
  font-size: px2rem(28px);
  margin: 0 px2rem(28px) px2rem(20px) px2rem(38px);
}
.toast_footer {
  @include buttom_btn($orange);
  border-radius: px2rem(200px);
  margin: 0 auto;
  margin-top: px2rem(70px);
  z-index: 5003;
  &:active {
    transform: scale(0.95);
  }
}
</style>
