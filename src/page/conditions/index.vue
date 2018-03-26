<template>
  <div class="home" :class="{'isFix': showToast}">
    <div class="container">
      <img :src="activityPostPicUrl" class="bg">
      <template v-if="false">
        <success-toast></success-toast>
      </template>
      <div class="content">
        <!-- title begin -->
        <div class="title">{{title}}</div>
        <!-- title end -->
        <div class="content_bottom"></div>
        <div class="content_middle"></div>
        <div class="content_top">
          <div :class="{'effect_left': isNextEffect && !currentFlag, 'content_foreBg': !currentFlag, 'content_backBg': currentFlag}">
            <template v-if="checkType(currentQuestion) === 1">
              <!-- 单选没图 -->
              <big-text :value="currentQuestion" @change="changeHandler"></big-text>
            </template>
            <template v-if="checkType(currentQuestion) === 2">
              <!-- 单选有图 -->
              <big-pic :value="currentQuestion" @change="changeHandler"></big-pic>
            </template>
            <template v-if="checkType(currentQuestion) === 3">
              <!-- 多选没图 -->
              <small-text :value="currentQuestion" @moreChange="moreChangeHandler"></small-text>
            </template>
            <template v-if="checkType(currentQuestion) === 4">
              <!-- 多选有图 -->
              <small-pic :value="currentQuestion" @moreChange="moreChangeHandler"></small-pic>
            </template>
            <template v-if="checkType(currentQuestion) === 5">
              <!-- 输入框 -->
              <input-text :value="currentQuestion" @change="changeHandler"></input-text>
            </template>

          </div>
          <div :class="{'effect_right': isNextEffect && currentFlag, 'content_foreBg': currentFlag, 'content_backBg': !currentFlag}">
            <template v-if="checkType(nextQuestion) === 1">
              <!-- 单选没图 -->
              <big-text :value="nextQuestion" @change="changeHandler"></big-text>
            </template>
            <template v-if="checkType(nextQuestion) === 2">
              <!-- 单选有图 -->
              <big-pic :value="nextQuestion" @change="changeHandler"></big-pic>
            </template>
            <template v-if="checkType(nextQuestion) === 3">
              <!-- 多选没图 -->
              <small-text :value="nextQuestion" @moreChange="moreChangeHandler"></small-text>
            </template>
            <template v-if="checkType(nextQuestion) === 4">
              <!-- 多选有图 -->
              <small-pic :value="nextQuestion" @moreChange="moreChangeHandler"></small-pic>
            </template>
            <template v-if="checkType(nextQuestion) === 5">
              <!-- 输入框 -->
              <input-text :value="nextQuestion" @change="changeHandler"></input-text>
            </template>
          </div>
        </div>
        <!-- <div class="next-btn" :class="{'no-next': !isDone}" @click="nextHandler">下一题</div> -->
        <div class="next-btn" @click="nextHandler">下一题</div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from 'api/index'
import SmallPic from './components/small-pic'
import BigPic from './components/big-pic'
import BigText from './components/big-text'
import SmallText from './components/small-text'
import InputText from './components/input-text'
export default {
  components: {
    SmallPic,
    BigPic,
    BigText,
    SmallText,
    InputText
  },
  data() {
    return {
      showToast: false,
      questionArray: [],
      activityId: this.$route.query.activityId || 2,
      isDone: false, // 判断是否已经答题，为true可点击进入下一题
      list: [],
      currentQuestion: null, // 当前题目
      nextQuestion: null, // 下一题目
      isNextEffect: false, // 是否下一特效
      currentFlag: false, // 切换当前题目
      isClick: true,
      currentIndex: 0,
      currentTitleIndex: 0,
      answer: '', // 答题的答案
      questionId: null, // 问题ID
      isEnd: true, // 是否最后一题
      questions: []
    }
  },
  computed: {
    // 题目标题
    title() {
      if (this.questions && this.questions.length === 0) {
        return ''
      } else {
        return this.questions[this.currentTitleIndex].question
      }
    },
    activityPostPicUrl() {
      return this.$store.getters.backgroundPic || ''
    }
  },
  created() {
    this.getItemList()
  },
  methods: {
    // 提交答案
    submitAnswer() {
      Api.answer(this.answer, this.questionId, this.activityId).then(data => {
        if (data.status) {
          console.log('该题提交成功')
        }
      })
    },
    // 多选题所传回答案
    moreChangeHandler(answer) {
      if (answer.aw && answer.aw.length > 0) {
        this.isDone = true
        this.answer = answer.aw.join()
        this.questionId = answer.id
      } else {
        this.isDone = false
      }
    },
    // 判断是否答题并将答案传回父组件
    changeHandler(answer) {
      if (answer.aw) {
        this.isDone = true
        this.answer = answer.aw
        this.questionId = answer.id
      } else {
        this.isDone = false
      }
    },
    // 获取数据
    getItemList() {
      Api.getQuestion(this.activityId).then(data => {
        if (data.status) {
          this.questions = data.content.questions
          for (let q of this.questions) {
            for (let t of q.options) {
              t['isSelect'] = false
            }
          }
          this.currentQuestion = this.questions[0]
          if (this.questions.length > 1) {
            this.nextQuestion = this.questions[1] || {}
          } else {
            this.nextQuestion = {}
          }
        } else {
          this.$Toast(data.chnDesc)
        }
      })
    },

    // 判断哪种类型
    checkType(item) {
      if (!item) {
        return false
      }
      if (item.type === 1 && item.withPic === false) {
        return 1 // 单选没图
      } else if (item.type === 1 && item.withPic === true) {
        return 2 // 单选有图
      } else if (item.type === 2 && item.withPic === false) {
        return 3 // 多选没图
      } else if (item.type === 2 && item.withPic === true) {
        return 4 // 多选有图
      } else if (item.type === 3) {
        return 5 // 输入框
      }
    },

    // 下一题
    nextHandler() {
      if (this.isDone) {
        // 禁止快速点击
        if (!this.isClick) {
          return
        }
        // 最后一题
        this.isNextEffect = true
        this.isClick = false
        this.isDone = false
        this.submitAnswer() // 答题
        if (this.currentTitleIndex >= this.questions.length - 1) {
          this.isDone = false
          this.$router.replace({
            path: '/share'
          })
          return false
        }
        setTimeout(() => {
          this.isNextEffect = false
          this.currentFlag = !this.currentFlag
          // debugger
          this.currentTitleIndex += 1
          if (this.currentFlag) {
            this.currentIndex += 2
            if (this.currentIndex > this.questions.length - 1) {
              this.currentQuestion = {}
            } else {
              this.currentQuestion = this.questions[this.currentIndex]
            }
          } else {
            if (this.currentIndex + 1 > this.questions.length - 1) {
              this.nextQuestion = {}
            } else {
              this.nextQuestion = this.questions[this.currentIndex + 1]
            }
          }
          this.isClick = true
        }, 1000)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import './style.scss';
</style>
