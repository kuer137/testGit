<template>
  <transition :name="transition">
      <div class="loading_toast" v-show="show">
          <div class="mask_transparent"></div>
          <div class="toast">
               <i class="loading_icon_toast"></i>
                <p class="toast__content">{{ text }}<slot></slot></p>
          </div>
      </div>
  </transition>
</template>
<script>
/*
 * 参数：
 *  show Boolean   是否显示
 *  text String    显示文本
 *
 * 事件：
 *  update-show  显示／隐藏时触发   回调show
 *
 */
export default {
  name: 'loading',
  props: {
    show: Boolean,
    text: {
      type: String,
      default: '加载中'
    }
  },
  data() {
    return {
      transition: 'mask'
    }
  },
  watch: {
    show (val) {
      this.$emit('update-show', val)
    }
  }
}
</script>
<style lang="sass" scoped>
@import './style.scss'
</style>
