<template>
  <div class="box">
    <header-tit img="spT.png" tit="专题管理-表单数据" back="1"/>
    <!-- <div class="lo">查看表单数据</div> -->
    <el-table style="width: 100%" :data="datas">
      <el-table-column :label="key" v-for="(key, i) in keys" :key="i" :prop="key">
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { OnlyContent } from "api"
export default {
  data () {
    return {
      datas: [],
      filter: {
        offset: 0,
        limit: 30,
        webId: ""
      },
      keys: []
    }
  },

  async created () {
    this.filter.webId = this.$route.query.id
    let { data } = await OnlyContent.queryFormDetail(this.filter)
    this.datas = data.map(item => {
      this.keys = Object.keys(JSON.parse(item.form))
      return JSON.parse(item.form)
    })
    console.log(this.keys)
  }
}
</script>

<style lang="less" scoped>
.box {
  overflow: hidden;
  margin-bottom: 100px;
}
.pat {
  margin-top: 40px;
  text-align: center;
}
.lo {
  color: #59A9DE;
  font-size: 18px;
  margin-top: 20px;
}
.from_box {
  display: flex;
  border: 1px solid black;
  margin: auto;
  margin-top: 20px;
}
.from_box>div {
  div {
    border: 1px solid black;
    padding: 20px 40px;
  }
}
</style>
