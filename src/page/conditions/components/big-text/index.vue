<template>
  <div class="big-text">
    <ul>
      <li v-for="(item, index) in list" :key="index" @click="selectItemHandler(item)" class="item">
        <div class="left">
          <div class="no-select" v-if="!item.isSelect"></div>
          <img :src="selectImg" v-else class="select">
        </div>
        <div class="txt">{{item.optionName}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'BigText',
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      list: this.value.options || [],
      selectImg: require('assets/img/selectBlue@2x.png')
    }
  },
  watch: {
    value (val) {
      this.list = val.options
    }
  },
  methods: {
    // 选择选项
    selectItemHandler (item) {
      let list = []
      let vo = null
      for (let i = 0; i < this.list.length; i++) {
        vo = this.list[i]
        vo.isSelect = false
        if (vo.optionId === item.optionId) {
          vo.isSelect = true
        }
        list.push(vo)
      }
      this.list = list
      this.$emit('change', {aw: item.optionId, id: this.value.questionId})
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
    display: block;
    width: px2rem(40px);
    height: px2rem(40px);
    border: px2rem(1px) solid #ADADAD;
    border-radius: 50%;
    &:active {
      transform: scale(0.95);
    }
  }
  .select {
    display: block;
    width: px2rem(41px);
    height: px2rem(41px);
  }
}
</style>
