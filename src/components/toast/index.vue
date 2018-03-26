<template>
  <div class="toast">
    <div class="mask_transparent" v-show="show"></div>
    <transition :name="currentTransition" v-on:after-leave="afterLeaveHandler" v-on:before-enter="beforeEnterHandler">
      <div class="currentToast toast_success" :style="{width: width}" :class="toastClass" v-show="show">
        <i class="icon_success_no_circle icon_toast" v-show="type !== 'text'"></i>
        <p class="toast__content" v-if="text" :style="style" v-html="text"></p>
        <p class="toast__content" v-else :style="style">
          <slot></slot>
        </p>
      </div>
    </transition>
  </div>
</template>
<script>
/*
 * 参数：
 *  value Boolean   是否显示
 *  text String    显示文本
 *  position String   显示位置
 *  time Number  倒计时
 *  type String  类型
 *  width String  宽度
 *
 * 事件：
 *  input  显示／隐藏时触发   回调true/false
 *  on-show   显示事件
 *  on-hide   隐藏事件
 */
export default {
  name: 'toast',
  props: {
    value: Boolean,
    text: String,
    position: String,
    time: {
      type: Number,
      default: 2000
    },
    type: {
      type: String,
      default: 'text'
    },
    width: {
      type: String,
      default: 'auto'
      // default: '3.25rem'
    }
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    if (this.value) {
      this.show = true
    }
  },
  methods: {
    // 显示前
    beforeEnterHandler (el) {
      this.$emit('on-show')
    },
    // 消失后
    afterLeaveHandler (el) {
      this.$emit('on-hide')
    }
  },
  computed: {
    currentTransition () {
      // 顶部动画
      if (this.position === 'top') {
        return 'fade-from-top'
      }
      // 底部动画
      if (this.position === 'bottom') {
        return 'fade-from-bottom'
      }
      // 默认动画
      return 'fade'
    },
    // 确定类型或位置
    toastClass () {
      return {
        toast_warn: this.type === 'warn',
        toast_cancel: this.type === 'cancel',
        toast_success: this.type === 'success',
        toast_text: this.type === 'text',
        'toast-top': this.position === 'top',
        'toast-bottom': this.position === 'bottom',
        'toast-middle': this.position === 'middle'
      }
    },
    // 文本样式处理
    style () {
      if (this.type === 'text' && this.width === 'auto') {
        return { padding: '0.26rem' }
      }
    }
  },
  watch: {
    show (val) {
      this.$emit('input', true)
      if (val) {
        if (this.timeId) {
          clearTimeout(this.timeId)
        }
        this.timeId = setTimeout(() => {
          this.show = false
          this.$emit('input', false)
        }, this.time)
      }
    },
    vaule (val) {
      this.show = val
    },
    text (val) {
      if (val) {
        this.show = val
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/assets/style/basic.scss";
@import "src/assets/style/font.scss";
/* ----------公共样式---------- */
.toast {
  display: block;
  .mask_transparent {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
}

.currentToast {
  position: fixed;
  z-index: 5001;
  width: px2rem(244px);
  min-height: px2rem(244px);
  top: px2rem(360px);
  left: 50%;
  margin-left: 0;
  transform: translateX(-50%);
  background: rgba(17, 17, 17, 0.7);
  text-align: center;
  border-radius: px2rem(10px);
  color: #ffffff;
}

.toast__content {
  font-size: px2rem(32px);
  margin: 0 0 px2rem(30px);
}

/* ----------类型样式---------- */
.toast-top {
  top: px2rem(112px);
}
.toast-bottom {
  top: auto;
  bottom: px2rem(120px);
  transform: translateX(-50%);
}
.toast-middle {
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.toast_warn {
  color: #f76260;
}

.toast_warn .toast__content {
  margin-top: px2rem(20px);
}

.toast_text {
  min-height: 0;
}
.toast_text .toast__content {
  margin: 0;
  padding-top: px2rem(20px);
  padding-bottom: px2rem(20px);
  border-radius: px2rem(30px);
}

.icon_toast {
  margin: px2rem(44px) 0 0;
  display: block;
}

.toast_success .icon_toast:before {
  content: "\EA08";
}
.toast_cancel .icon_toast:before {
  content: "\EA0D";
}
.toast_warn .icon_toast.icon_success_no_circle:before {
  content: "\EA0B";
  color: #f76260;
}

/* ----------动画样式---------- */
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: opacity linear 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-from-top-enter,
.fade-from-top-leave-active {
  opacity: 0;
  transform: translateX(-50%) translateY(-100%) !important;
}
.fade-from-bottom-enter,
.fade-from-bottom-leave-active {
  opacity: 0;
  transform: translateX(-50%) translateY(100%) !important;
}
.fade-from-top-enter-active,
.fade-from-top-leave-active,
.fade-from-bottom-enter-active,
.fade-from-bottom-leave-active {
  transition: all 400ms cubic-bezier(0.36, 0.66, 0.04, 1);
}
</style>
