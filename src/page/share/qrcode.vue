<template>
  <div class="big-container">
    <div class="container">
      <img :src="activityPostPicUrl" class="bg">
      <img :src="qrcodeSrc" class="qrcode">
    </div>
  </div>

</template>
<script>
// import Api from 'api/index'
export default {
  data() {
    return {
      qrcodeSrc: require('assets/img/qrcode.jpeg')
    }
  },
  computed: {
    activityPostPicUrl() {
      return this.$store.getters.backgroundPic || ''
    }
  }
}
</script>
<style lang='scss' scoped>
.big-container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: px2rem(1206px);
  height: 100vh;
  overflow: hidden;
  background-color: #a5d6ee;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: px2rem(1206px);
  z-index: 2;
  overflow: hidden;
}
.qrcode{
  width: px2rem(400px);
  height: px2rem(400px);



}
</style>
