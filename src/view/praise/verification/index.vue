<template>
  <div class="pr-bg">
    <div class="pr-top">
      <div class="pr-l pr-radio">
        <p>服务类别</p>
        <div>
          <input type="radio" v-model="formData.type" value="1" :checked="formData.type===1" name="pr-radio" id="radio_a1" class="radio_1" />
          <label class="iconfont" for="radio_a1"></label>
          <!--<span class="pr-option active"></span>-->
          <span @click="formData.type=1">导购人员</span>
        </div>
        <div>
          <input type="radio" v-model="formData.type" value="2" :checked="formData.type===2" name="pr-radio" id="radio_a2" class="radio_1" />
          <label class="iconfont" for="radio_a2"></label>
          <!--<span class="pr-option"></span>-->
          <span @click="formData.type=2">安装人员</span>
        </div>
      </div>
    </div>
    <div class="pr-center">
      <div class="pr-inp-B">
        <div class="pr-icon-c">
          <div class="pr-icon-S one"></div>
        </div>
        <div>
          <input class="pr-inp" v-model="formData.name" maxlength="10" name="name" placeholder="请输入姓名" type="text">
        </div>
      </div>
      <div class="pr-inp-M">
        <div class="inp-content">
          <div class="pr-icon-c">
            <div class="pr-icon-S two"></div>
          </div>
          <div>
            <input class="pr-inp" v-model="formData.mobile" name="mobile" maxlength="11" placeholder="请输入手机号" type="tel">
          </div>
        </div>
        <div>
          <button @click="getCaptcha" :class="{ 'active': codeActive}" class="pr-btn-S">{{ codeText }}</button>
        </div>
      </div>
      <div class="pr-inp-B">
        <div class="pr-icon-c">
          <div class="pr-icon-S three"></div>
        </div>
        <div>
          <input class="pr-inp" v-model="formData.captcha" maxlength="6" name="captcha" placeholder="请输入短信验证码" type="number">
        </div>
      </div>
      <div>
        <button @click="submitJoinApi" class="pr-btn-All">提交</button>
      </div>
    </div>
  </div>
</template>
<script>
import Api from '@/api/praise/index'
import { emitBus, busName } from '@/common/bus'
export default {
  components: {
    //
  },
  data() {
    return {
      formData: {
        type: 1,
        name: '',
        mobile: '',
        captcha: ''
      },
      codeText: '获取验证码',
      codeActive: false, // 验证码btn默认为未点击状态
      timeId: 0,
      times: 0
      //      hasSubmit: false
    }
  },
  computed: {
    //
  },
  created() {},
  methods: {
    // 获取验证码
    getCaptcha() {
      if (this.codeActive) return
      let phoneText = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0-9])\d{8}$/
      if (
        this.formData.mobile === '' ||
        !phoneText.test(this.formData.mobile)
      ) {
        this.$Toast('请输入正确的手机号')
        return
      }
      this.sendSms()
    },
    // 提交表单，注册
    submitJoinApi() {
      let pm = this.formData
      //      this.hasSubmit = true
      if (
        this.formData.name === '' &&
        this.formData.mobile === '' &&
        this.formData.captcha === ''
      ) {
        this.$Toast('请完成提交信息')
        return
      }
      Api.joinApi(pm).then(data => {
        if (data.status) {
          // 储存state
          this.$store.dispatch('setPraiseSIGNEDBEFORE', true)
          this.$store.dispatch('setPraiseQRCODE', data.content.qrCode)
          // 跳转
          this.$router.push('/view/praise/qrcode')
        } else {
          this.$Toast(data.error.errMsg)
        }
      })
    },
    sendSms() {
      let pm = {
        mobile: this.formData.mobile
      }
      Api.sendSmsApi(pm)
        .then(data => {
          if (data.status) {
            this.codeText = '剩余60S'
            this.times = 60
            this.codeActive = true
            this.timeId = setInterval(() => {
              if (this.times > 0) {
                this.times = this.times - 1
                if (this.times <= 0) {
                  this.codeText = '获取验证码'
                  this.codeActive = false
                  window.clearInterval(this.timeId)
                } else {
                  this.codeText = '剩余' + this.times + 'S'
                }
              }
            }, 1000)
          } else {
            emitBus(busName.showToast, data.error.errMsg) // 提示错误信息
          }
        })
        .catch(reject => {
          emitBus(busName.showToast, '发送验证码失败')
        })
    }
  }
}
</script>
<style lang='scss' scoped>
@import 'style.scss';
</style>
