<template>
  <div class="container" @touchmove.prevent>
    <div class="content">
      <div class="mobile">
        <div class="mobile-left" >
          <img :src='mobileSrc' class="password-icon">
          <input type="tel" maxlength="11"  v-model='mobile' class="input-inner" placeholder="请输入手机号">
        </div>
        <div class="mobile-right" :class="{ 'active': codeActive}" @click="getCode">{{codeText}}</div>
      </div>
      <div class="code">
        <img :src='codeStr' class="code-icon">
        <input type="tel"  v-model="code" class="input-inner" maxlength="6" placeholder="请输入短信验证码">
      </div>
      <div class="footer-button" @click="submit">
        提交
      </div>
    </div>
  </div>
</template>
<script>
import Api from 'api/index'
import { emitBus, busName } from '@/common/bus'
export default {
  data() {
    return {
      mobileSrc: require('assets/img/phone@3x.png'), // 手机图标
      codeStr: require('assets/img/password@3x.png'), // 密码图标
      mobile: null, // 手机号
      code: null, // 验证码
      codeText: '获取验证码',
      codeActive: false, // 验证码btn默认为未点击状态
      timeId: 0,
      times: 0
    }
  },
  methods: {
    // 提交
    submit() {
      // 提交之前校验是否已经输入手机号，验证码
      if (!this.mobile) {
        this.$Toast('请输入手机号码')
        return false
      }
      if (!/^1\d{10}$/.test(this.mobile)) {
        this.$Toast('请输入正确的手机号码')
        return false
      }
      if (!this.code) {
        this.$Toast('请输入短信验证码')
        return false
      }
      if (!/^\d{6}$/.test(this.code)) {
        this.$Toast('请输入正确的短信验证码')
        return false
      }
      Api.checkSmCode(this.$route.query.activityId, this.mobile, this.code)
        .then(data => {
          if (data.status) {
            // 提交成功后跳转到答题页
            this.$router.replace({
              path: '/conditions',
              query: {
                activityId: this.$route.query.activityId
              }
            })
          } else {
            this.$Toast(data.chnDesc)
          }
        })
    },
    // 获取验证码信息
    getCode() {
      console.log(!this.mobile)
      if (!this.mobile) {
        this.$Toast('请输入手机号码')
      }
      if (!/^1\d{10}$/.test(this.mobile)) {
        this.$Toast('请输入正确的手机号码')
        return false
      }
      this.sendSms()
    },
    sendSms() {
      Api.sendSms(this.$route.query.activityId, this.mobile)
        .then(data => {
          if (data.status) {
            this.codeText = '剩余60S'
            this.times = 60
            this.codeActive = true
            this.timeId = setInterval(() => {
              if (this.times > 0) {
                this.times = this.times - 1
                if (this.times <= 0) {
                  this.codeText = '重新获取验证码'
                  this.codeActive = false
                  window.clearInterval(this.timeId)
                } else {
                  this.codeText = '剩余' + this.times + 'S'
                }
              }
            }, 1000)
          } else {
            emitBus(busName.showToast, data.chnDesc) // 提示错误信息
          }
        })
        .catch(reject => {
          emitBus(busName.showToast, '发送验证码失败')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
// 点击验证码后背景置灰
.active {
  font-size: px2rem(28px);
  background: $disabled;
}
</style>
