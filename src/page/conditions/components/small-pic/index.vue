<template>
  <ul class="box">
    <li v-for="(item, index) in list" :key="index" @click="selectImgHandler(item)" class="box_item">
      <div class="item">
        <img :src="item.picUrl">
        <!-- <img :src="selectImg" class="select"> -->
        <img :src="selectImg" v-if="item.isSelect" class="select">
        <p>{{item.optionName}}</p>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'SmallPic',
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
      item.isSelect = !item.isSelect
      let IdArray = []
      for (let i of this.list) {
        vo = i
        arr.push(vo)
        if (i.isSelect) {
          IdArray.push(i.optionId)
        }
      }
      console.log(IdArray)
      this.list = arr
      this.$emit('moreChange', { aw: IdArray, id: this.value.questionId })
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
  img {
    display: block;
    margin: 0 auto;
    width: px2rem(160px);
    height: px2rem(160px);
    border-radius: 50%;
    &:active {
      transform: scale(0.95);
    }
  }
  p {
    margin: 0 auto;
    width: 80%;
    text-align: center;
    font-family: $PF;
    font-size: px2rem(36px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: #185c7d;
  }
  .select {
    margin-top: px2rem(-160px);
    &:active {
      transform: scale(0.95);
    }
  }
}
</style>
