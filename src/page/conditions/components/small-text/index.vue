<template>
  <div class="big-text">
    <ul>
      <li v-for="(item, index) in list" :key="index" @click="selectItemHandler(item)" class="item">
        <div class="left">
          <div class="no-select">
            <img :src="selectImg" v-if="item.isSelect" class="select">
          </div>
        </div>
        <div class="txt">{{item.optionName}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SmallText',
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      list: this.value.options || [],
      selectImg: require('assets/img/selectGreen@2x.png')
    }
  },
  watch: {
    value (val) {
      console.log(val)
      this.list = val.options
    }
  },
  methods: {
    // 选择选项
    selectItemHandler (item) {
      let list = []
      let vo = null
      let IdArray = []
      for (let i = 0; i < this.list.length; i++) {
        vo = this.list[i]
        if (vo.optionId === item.optionId) {
          vo.isSelect = !vo.isSelect
        }
        list.push(vo)
        if (vo.isSelect) {
          IdArray.push(vo.optionId)
        }
      }
      this.list = list
      this.$emit('moreChange', {aw: IdArray, id: this.value.questionId})
    }
  }
}
</script>
<style lang="scss" scoped>
.big-text {
  display: flex;
  height: px2rem(700px);
  // padding: px2rem(140px) 0 0 px2rem(60px);
  margin: px2rem(20px) 0 0 px2rem(60px);
  box-sizing: border-box;
  align-items: center;
  overflow: auto;
  .item {
    display: flex;
    margin-bottom: px2rem(64px);
    align-items: center;
    .txt {
      display: block;
      width: px2rem(450px);
      font-size: px2rem(32px);
      word-wrap: break-word;
      word-break: normal;
      color: #185C7D;
    }
  }
}

.left {
  display: block;
  margin-right: px2rem(20px);
  width: px2rem(45px);
  .no-select {
    display: flex;
    width: px2rem(35px);
    height: px2rem(35px);
    background: #FFFFFF;
    border-radius: px2rem(4px);
    border: px2rem(4px) solid #1D6080;
    align-items: center;
    &:active {
      transform: scale(0.95);
    }
  }
  .select {
    display: block;
    margin: 0 auto;
    width: px2rem(32px);
    height: px2rem(32px);
  }
}
</style>
