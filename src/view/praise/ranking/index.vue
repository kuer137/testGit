<template>
    <div class="pr-bg">
      <div v-if="isRegister && (rankingList.personal)" class="pr-top">
        <div>
          <p class="pr-num"><b>{{ rankingList.personal.ranking }}</b></p>
          <p>名词</p>
        </div>
        <div>
          <p class="pr-name">{{ rankingList.personal.name }}</p>
          <p>（本人）</p>
        </div>
        <div>
          <p class="pr-num"><b>{{ rankingList.personal.praiseCount }}</b></p>
          <p>点赞数</p>
        </div>
      </div>
      <div class="pr-table">
        <div class="tb-list" v-if="rankingList.rankingList" v-for="(row,inx) in rankingList.rankingList">
          <div class="tb-l">
            <div class="tb-sort">
              <div class="lis-sort" v-if="inx<=2" :class="{'one': inx===0,'two': inx===1,'three': inx===2}"></div>
              <div class="lis-sort other" v-else>{{ inx+1 }}</div>
            </div>
            <div class="tb-name">
              <div>
                <p class="lis-name">{{ row.name }}</p>
                <p class="lis-number">{{ row.mobile }}</p>
              </div>
            </div>
          </div>
          <div class="pr-number nav-three" v-if="inx<=2"><i>{{ row.count }}</i></div>
          <div class="pr-number" v-else>{{ row.count }}</div>
        </div>
      </div>
    </div>
</template>
<script>
import Api from '@/api/praise/index'
export default {
  components: {
    //
  },
  data() {
    return {
      isRegister: true,  // 是否注册
      rankingList: {}
    }
  },
  computed: {
    //
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      let pm = {
        type: 1
      }
      Api.rankingApi(pm).then(data => {
        if (data.status) {
          this.rankingList = data.content
        } else {
          this.$Toast(data.error.errMsg)
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  @import "style.scss";
</style>
