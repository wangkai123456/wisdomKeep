<template>
  <div class="box">
    <header-tit img="spT.png" tit="专题管理" back="1"/>
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" label-width="100px">
        <el-form-item label="专题名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="专题介绍" prop="desc">
          <el-input  v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上传专题页" prop="webUrl">
          <el-upload
            :data="{ token: $store.state.Account.QnInfo.token }"
            class="upload-demo"
            action="http://up-z0.qiniu.com"
            :limit="1"
            :on-success="successFile">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div>支持扩展名：rar.zip.doc.docx.pdf.jpg...
            <br>上传成功后生成访问地址
          </div>
        </el-form-item> -->
        <el-form-item label="编辑表单" prop="formFields">
          <table class="table">
            <tr>
              <td class="key">key</td>
              <td>type</td>
            </tr>
            <tr  v-for="(item, i)  in ruleForm.formFields" :key="i">
              <td class="key">{{item.key}}</td>
              <td>{{item.type}}</td>
              <td class="el-icon-error" @click="ruleForm.formFields.splice(i, 1)"></td>
            </tr>
          </table>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="showDiaLog()">添加表单</el-button>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button class="be" type="primary" @click="created()">保存</el-button>
      </div>
    </div>
    <el-dialog title="添加表单"  :visible.sync="diaLog" width="400px">
      <el-form v-if="form" :model="form" :rules="ruleForms" ref="form">
        <el-form-item label="key" prop="key">
          <el-input v-model="form.key" placeholder="请输入key"></el-input>
        </el-form-item>
        <el-form-item label="type" prop="type">
          <el-input v-model="form.type" placeholder="请输入type"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center" >
        <el-button class="btn" type="primary" @click="addForm()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { OnlyContent } from "api"
const Form = function () {
  return {
    key: "",
    type: ""
  }
}

export default {
  data () {
    return {
      ruleForm: {
        desc: "",
        formFields: [],
        name: ""
      },
      form: null,
      tableData: [],
      diaLog: false,
      rules: {
        name: [
          { required: true, message: "请输入专题名称", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请选择专题介绍", trigger: "change" }
        ],
        formFields: [
          { required: true, message: "请编辑表单", trigger: "change" }
        ]
      },
      ruleForms: {
        type: [
          { required: true, message: "请输入type", trigger: "change" }
        ],
        key: [
          { required: true, message: "请输入key", trigger: "change" }
        ]
      }
    }
  },

  watch: {
    diaLog (n) {
      if (!n) {
        this.form = null
      }
    }
  },

  async created () {
    if (this.$route.query.id) {
      let res = await OnlyContent.querySchoolDetail(this.$route.query.id)
      this.ruleForm = res.data
      this.ruleForm.formFields = JSON.parse(res.data.formFields)
    }
  },

  methods: {
    successFile (e) {
      this.ruleForm.webUrl = this.$store.state.Account.QnInfo.domainName + e.key
    },

    async addForm () {
      await this.$refs["form"].validate()
      this.ruleForm.formFields.push(this.form)
      this.diaLog = false
    },

    async created () {
      await this.$refs["ruleForm"].validate()
      this.ruleForm.formFields = JSON.stringify(this.ruleForm.formFields)
      await OnlyContent.createdSchool(this.ruleForm)
      this.$message.success("成功")
      this.$router.push("special")
    },

    showDiaLog () {
      this.form = new Form()
      this.diaLog = true
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
.be {
  width: 200px;
  margin-top: 100px;
}
.table {
  font-size: 16px;
  .key {
    margin-right: 20px;
    display: inline-block;
  }
}
</style>
