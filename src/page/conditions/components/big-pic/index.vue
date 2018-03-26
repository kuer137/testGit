<template>
  <ul class="box">
    <li v-for="(item, index) in list" :key="index" @click="selectImgHandler(item)" class="box_item">
      <div class="item">
        <!-- <img :src="iconImage"> -->
        <img :src="item.picUrl">
        <img :src="selectImg" v-if="item.isSelect" class="select">
        <!-- <img :src="selectImg" class="select"> -->
        <p>{{item.optionName}}</p>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'BigPic',
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      list: [],
      selectImg: require('assets/img/select@3x.png')
    }
  },
  methods: {
    // 选中图片
    selectImgHandler(item) {
      let arr = []
      let vo
      for (let i = 0; i < this.list.length; i++) {
        vo = this.list[i]
        vo.isSelect = false
        if (vo.optionName === item.optionName) {
          vo.isSelect = true
        }
        arr.push(vo)
      }
      this.list = arr
      this.$emit('change', { aw: item.optionId, id: this.value.questionId })
    },
    // 初始化
    getList() {
      this.list = this.value.options
    }
  },
  watch: {
    value(val) {
      this.list = val.options
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
.box {
  display: block;
  padding-top: px2rem(22px);
  width: px2rem(646px);
  height: px2rem(726px);
  overflow: auto;
  box-sizing: border-box;
}
.box_item {
  display: block;
  float: left;
  margin-bottom: px2rem(22px);
  width: 50%;
}
.item {
  display: block;
  width: 100%;
  margin-top: px2rem(160px);
  img {
    display: block;
    margin: 0 auto;
    width: px2rem(200px);
    height: px2rem(200px);
    border-radius: 50%;
    &:active {
      transform: scale(0.95);
    }
  }
  p {
    text-align: center;
    font-family: $PF;
    font-size: px2rem(32px);
    color: #185c7d;
  }
  .select {
    margin-top: px2rem(-200px);
    &:active {
      transform: scale(0.95);
    }
  }
}
</style>
