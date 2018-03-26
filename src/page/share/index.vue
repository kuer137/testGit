<template>
    <div class="container">
      <img :src="activityPostPicUrl" class="bg">
       <template v-if="isShow">
        <success-toast @hideToast = "hideToast"></success-toast>
        </template>
    </div>
</template>
<script>
// import Api from 'api/index'
import SuccessToast from './success-toast/index'
export default {
  components: {
    SuccessToast
  },
  data() {
    return {
      isShow: true,
      activityId: this.$route.query.activityId || 2
    }
  },
  computed: {
    activityPostPicUrl() {
      return this.$store.getters.backgroundPic || ''
    }
  },
  created() {
  },
  methods: {
    hideToast () {
      this.isShow = false
    }
  }
}
</script>
<style lang='scss' scoped>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
}

.container {
  display: block;
  position: relative;
  width: 100%;
  // height: px2rem(1206px);
  height: 100vh;
  z-index: 2;
  overflow: hidden;
}
</style>
