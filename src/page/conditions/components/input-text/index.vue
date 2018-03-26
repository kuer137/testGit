<template>
  <div class="input_div">
    <p class="input_label">{{value.question}}</p>
    <div>
      <input type="text" class="input_inner" :maxlength="20" v-model.trim="answer" v-focus>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      answer: ''
    }
  },
  watch: {
    // 监听input
    answer (val) {
      setTimeout(() => {
        if (val) {
          this.$emit('change', { aw: val, id: this.value.questionId })
        }
      }, 500)
    },
    value (val) {
      this.answer = ''
    }
  }
}
</script>
<style lang='scss' scoped>
.input_div {
  text-align: left;
  margin: 40% auto;
}
.input_label {
  font-family: $PF;
  font-size: px2rem(32px);
  padding-left: px2rem(42px);
  color: #185c7d;
}
.input_inner {
  height: $height-46;
  width: px2rem(546px);
  margin-left: px2rem(42px);
  margin-top: px2rem(20px);
  padding-left: px2rem(22px);
  border: 0 solid #abadb2;
  font-size: $fz-16;
  background-color: #f5f5f5;
}
</style>
