<template>
  <div class="box">
    <header-tit img="disT.png" tit="折扣管理"/>
    <div class="content">
      <el-form ref="ruleForm" label-position="right" label-width="80px">
        <el-form-item label="折扣名称">单项课程 （指用户仅购买一个课程）</el-form-item>
        <el-form-item label="折扣比例">
          <el-input class="fi" v-model="ruleForm[0].tint"></el-input>
          <span>折</span>
        </el-form-item>
        <el-form-item label="折扣名称">双项课程 （指用户仅购买两个课程）</el-form-item>
        <el-form-item label="折扣比例">
          <el-input class="fi" v-model="ruleForm[1].tint"></el-input>
          <span>折</span>
        </el-form-item>
        <el-form-item label="折扣名称">多项课程 （指用户仅购买三个及以上课程）</el-form-item>
        <el-form-item label="折扣比例">
          <el-input class="fi" v-model="ruleForm[2].tint"></el-input>
          <span>折</span>
        </el-form-item>
      </el-form>
       <div style="text-align:center" class="mar">
        <el-button class="btn" type="primary" @click="createdDisCount()">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseConfig } from "api"
export default {
  data () {
    return {
      ruleForm: [
        {
          oint: "1",
          tint: "",
          typeCode: "PERCENT"
        },
        {
          oint: "2",
          tint: "",
          typeCode: "PERCENT"
        },
        {
          oint: "3",
          tint: "",
          typeCode: "PERCENT"
        }
      ],

      filter: {
        typeCode: "PERCENT",
        offset: 0,
        limit: 10
      }
    }
  },

  created () {
    this.queryDisCount()
  },

  methods: {
    async createdDisCount () {
      this.ruleForm.forEach(item => {
        item.tint = item.tint*10
      })
      await BaseConfig.createdCount(this.ruleForm)
      this.$message.success("成功")
      this.queryDisCount()
    },

    async queryDisCount () {
      let { data } = await BaseConfig.queryDiction(this.filter)
      this.ruleForm = data.length ? data : this.ruleForm
      this.ruleForm.forEach(item => {
        item.tint = item.tint/10
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 50px 30%;
  color: #626262;
}
.fi {
  margin-right: 20px;
  width: 200px;
}
.btn {
  width: 0.9rem;
  margin-top: 50px;
}
</style>
