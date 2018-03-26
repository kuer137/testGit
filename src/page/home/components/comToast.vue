<template>
  <div class="toast" v-show="show">
    <div class="mask_transparents"></div>
    <div class="currentToast">
      <div class="toast_header">{{Headtitle}}
        <!-- 关闭按钮 -->
        <img :src="closeSrc" @click="hide" class="close_btn">
      </div>
      <div class="toast_content" v-html="text">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'comToast',
  props: {
    value: Boolean,
    title: '',
    content: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      Headtitle: '活动规则',
      text: '', // 活动规则与活动提示公用字段
      closeSrc: require('assets/img/closeBlue@3x.png')
    }
  },
  methods: {
    hide() {
      this.show = false
      this.$emit('onHide')
    }
  },
  computed: {},
  watch: {
    value(val) {
      this.show = val
    },
    title(val) {
      this.Headtitle = val
    },
    content(val) {
      if (val && val.rule) {
        this.text = val.rule
      } else {
        this.text = val.desc
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.toast {
  display: block;
}
.mask_transparents {
  display: block !important;
  position: fixed;
  z-index: 1000;
  width: px2rem(750px);
  height: px2rem(1334px);
  background: rgba(0, 0, 0, 0.4);
  // background: blue;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.currentToast {
  position: fixed;
  z-index: 5001;
  width: px2rem(646px);
  height: px2rem(726px);
  top: px2rem(208px);
  left: 50%;
  margin-left: 0;
  transform: translateX(-50%);
  background: $white;
  text-align: center;
  border-radius: px2rem(26px);
  font-family: PingFangSC-Medium;
  font-size: px2rem(0px);
  color: #185c7d;
  overflow: auto;
}
.toast_header {
  position: relative;
  height: px2rem(100px);
  line-height: px2rem(100px);
  font-size: px2rem(36px);
  background: #e9e9e9;
  margin-bottom: px2rem(20px);
  border-radius: px2rem(26px) px2rem(26px) 0 0;
}
.close_btn {
  position: absolute;
  width: px2rem(40px);
  height: px2rem(40px);
  right: px2rem(34px);
  top: px2rem(32px);
}
.toast_content {
  display: block;
  width: px2rem(646px);
  height: px2rem(580px);
  text-align: justify;
  font-size: px2rem(28px);
  padding: 0 px2rem(28px);
  box-sizing: border-box;
  overflow: auto;
}
</style>
