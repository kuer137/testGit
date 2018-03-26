<template>
  <div class="toast" @touchmove.prevent v-show="show">
    <img :src="activityPostPicUrl" class="bg">
    <div class="mask_transparents" @click="closeGuide"></div>
    <!-- 引导分享begin -->
    <div class="guide" @click="closeGuide">
      <img :src="guideSrc">
    </div>
    <!-- 引导分享begin -->
  </div>
</template>
<script>
export default {
  name: 'Guide',
  props: {
    value: Boolean
  },
  data() {
    return {
      show: true,
      guideSrc: require('assets/img/tip@3x.png'),
      activityPostPicUrl: this.$store.getters.priseJoined.posterPicUrl || ''
    }
  },
  methods: {
    // 点击页面，返回分享页
    closeGuide() {
      this.show = false
      this.$emit('hideGuide')
    }
  },
  watch: {
    value(val) {
      this.show = val
    }
  }
}
</script>
<style lang="scss" scoped>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
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
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
img {
  position: absolute;
  width: px2rem(50px);
  height: px2rem(50px);
  border-radius: px2rem(8px);
  right: px2rem(4px);
  top: px2rem(4px);
}
</style>
