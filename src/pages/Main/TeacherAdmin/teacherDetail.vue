<template>
  <div class="box">
    <header-tit img="teT.png" tit="教师管理" back="1"/>
    <div class="content">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" label-width="80px">
        <el-form-item label="教师姓名" prop="name">
          <el-input class="fi" v-model="ruleForm.name"></el-input>
        </el-form-item>
          <el-form-item label="学历" prop="diploma">
          <el-input class="fi" v-model="ruleForm.diploma"></el-input>
        </el-form-item>
        <el-form-item label="毕业学校" prop="graduateSchool">
          <el-input class="fi" v-model="ruleForm.graduateSchool"></el-input>
        </el-form-item>
        <el-form-item label="座右铭" prop="intro">
          <el-input class="fi" v-model="ruleForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="负责年级" prop="grades">
          <el-select multiple v-model="ruleForm.grades" placeholder="请选择">
            <el-option
              v-for="(item, i) in this.$store.state.BaseConfig.grades"
              :key="i"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item style="margin-left:20px" label="授课学科" prop="subject">
          <el-select v-model="ruleForm.subject" placeholder="请选择">
            <el-option
              v-for="(item, i) in this.$store.state.BaseConfig.subjects"
              :key="i"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授课学校" prop="schooles">
          <el-select  multiple v-model="ruleForm.schooles" placeholder="请选择">
            <el-option
              v-for="(item, i) in this.$store.state.BaseConfig.schools"
              :key="i"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <div>
        <el-form-item label="上传图片" prop="photoUrl">
          <!-- <upload-img /> -->
         <el-upload
            class="avatar-uploader"
            :data="{ token: $store.state.Account.QnInfo.token }"
            action="http://up-z0.qiniu.com"
            :show-file-list="false"
            :on-success="successFile"
          >
            <img v-if="ruleForm.photoUrl" :src="ruleForm.photoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        </div>

        <div>
          <el-form-item label="教师描述" prop="desc">
             <div ref="editor" class="edit" style="text-align:left;z-index:9"></div>
          </el-form-item>
        </div>
     
      </el-form>
      <div class="bo mar">
        <el-button type="primary" @click="createdSchool">确认新增</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Teacher, Account } from "api"
import E from "wangeditor"

import { uploadInit } from "utils"
import { mapState } from "vuex"
export default {
  data () {
    return {
      ruleForm: {
        classRecord: "",
        desc: "",
        grades: [],
        graduateSchool: "",
        isDelete: false,
        name: "",
        photoUrl: "",
        schooles: [],
        subject: "",
        intro: ""
      },
      editor: "",
      rules: {
        name: [{ required: true, message: "请输入教师姓名", trigger: "change" }],
        gradeId: [{ required: true, message: "请选择授课学科", trigger: "change" }],
        graduateSchool: [{ required: true, message: "请输入毕业学校", trigger: "change" }],
        photoUrl: [{ required: true, message: "请上传图片", trigger: "change" }],
        desc: [{ required: true, message: "请输入教师描述", trigger: "change" }],
        intor: [{ required: true, message: "请输入教师描述", trigger: "change" }],
        grades: [{ required: true, type: "array", message: "请选择负责年级", trigger: "change" }],
        schooles: [{ required: true, type: "array", message: "请选择授课学校", trigger: "change" }],
        subject: [{ required: true, message: "请选择授课学科", trigger: "change" }],
        diploma: [{ required: true, message: "请输入学历", trigger: "change" }],
        intro: [{ required: true, message: "请输入座右铭", trigger: "change" }]
      }
    }
  },

  async created () {

  },
  computed: {
    ...mapState({
      QiuniuToken: state => state.Account.QnInfo.token,
      QiuniuDomain: state => state.Account.QnInfo.domainName
    })
  },

  async mounted () {
    if (this.$route.query.id) {
      let res = await Teacher.querySchoolDetail(this.$route.query.id)
      this.ruleForm = res.data
      this.ruleForm.schooles = this.ruleForm.schooles.map(item => item.id)
      this.ruleForm.grades = this.ruleForm.grades.map(item => item.id)
    }
    let res = await Account.queryQnToken()
    this.$store.commit("Account/QUERY_QTOKEN", res.data)
    this.editor = new E(this.$refs.editor)
    // 使用 base64 保存图片
    this.editor.customConfig.uploadImgShowBase64 = false

    // 隐藏“网络图片”tab
    this.editor.customConfig.showLinkImg = false

    // 允许上传到七牛云存储
    this.editor.customConfig.qiniu = true

    this.editor.create()
    if (this.$route.query.id) {
      this.editor.txt.html(this.ruleForm.desc)
    }
    uploadInit({
      token: this.QiuniuToken,
      domain: this.QiuniuDomain
    })(this.editor)
  },

  methods: {
    async createdSchool () {
      try {
        this.ruleForm.desc = this.editor.txt.html()
        await this.$refs["ruleForm"].validate()
        console.log(this.ruleForm)
        // let grades = this.ruleForm.grades.map(item =>item.id)
        // let schooles = this.ruleForm.schooles.map(item =>item.id)
        // if (this.$route.query.id) {
        //   this.ruleForm.grades = grades
        //   this.ruleForm.schooles = schooles
        // }

        this.ruleForm.grades = this.ruleForm.grades.join(":")
        console.log(this.ruleForm.grades)
        this.ruleForm.schooles = this.ruleForm.schooles.join(":")
        console.log(this.ruleForm)
        await Teacher.createdSchool(this.ruleForm)
        this.$message.success("成功")
        this.$router.push("teacherAdmin")
      } catch (err) {
        console.log(err)
        this.ruleForm.grades = []
        this.ruleForm.schooles = []
      }
    },

    successFile (e) {
      this.ruleForm.photoUrl = this.$store.state.Account.QnInfo.domainName + e.key
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 50px 6%;
  color: #626262;
}
.fi {
  margin-right: 20px;
  width: 350px;
}
.img_box {
  width: 1.64rem;
  height: 1.23rem;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(191, 191, 191, 1);
  position: relative;
  margin: auto;
}
.img_box > div {
  text-align: center;
  .tit_font {
    text-align: center;
    width: 100%;
  }
  input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
.bo {
  margin-top: 50px;
  text-align: center;
  .el-button {
    width: 200px;
  }
}
.el-select {
  width: 350px;
}
.edit div {
  z-index: 9 !important;
}
</style>
