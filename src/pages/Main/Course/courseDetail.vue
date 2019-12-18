<template>
  <div class="box courseDetail">
    <header-tit img="courT.png" tit="选课中心" back="1" />
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="80px">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="广告语" prop="ad">
          <el-input v-model="ruleForm.ad"></el-input>
        </el-form-item>
        <el-form-item label="课次" prop="classQty">
          <el-input v-model.number="ruleForm.classQty"></el-input>
        </el-form-item>
        <el-form-item label="课程学科" prop="subjectId">
          <el-select v-model="ruleForm.subjectId" placeholder="请选择">
            <el-option
              v-for="(item, i) in $store.state.BaseConfig.subjects"
              :key="i"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程年级" class="grade-margin" prop="gradeId" >
           <el-select v-model="ruleForm.gradeId" placeholder="请选择">
            <el-option
              v-for="(item, i) in $store.state.BaseConfig.grades"
              :key="i"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授课模式" class="grade-margin" prop="modeId" >
           <el-select v-model="ruleForm.modeId" placeholder="请选择">
            <el-option
              v-for="(item, i) in $store.state.BaseConfig.courses"
              :key="i"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授课教师" prop="teacherIds">
          <!-- <el-select multiple v-model="ruleForm.teacherIds" >
            <el-option v-for="(item, i) in teachers" :key="i" :label="item.name" :value="item.id"> </el-option>
            </el-select> -->
            <el-select multiple v-model="teacherIds" placeholder="请选择">
            <el-option
              v-for="(item, i) in teachers"
              :key="i"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属学期" prop="termId">
          <el-select v-model="ruleForm.termId" placeholder="请选择">
            <el-option
              v-for="(item, i) in $store.state.BaseConfig.terms"
              :key="i"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input  placeholder="请输入价格" v-model.number="price" autoComplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="notes">
          <el-input v-model="ruleForm.notes"></el-input>
        </el-form-item>
        <el-form-item label="缩略图" prop="coverUrl">
            <el-upload
            class="avatar-uploader"
            :data="{ token: $store.state.Account.QnInfo.token }"
            action="http://up-z0.qiniu.com"
            :show-file-list="false"
            :on-success="successFile">
            <img v-if="ruleForm.coverUrl" :src="ruleForm.coverUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="轮播顶图" prop="carouselUrl">
          <div class="swo">
             <el-upload
            class="avatar-uploader"
            :data="{ token: $store.state.Account.QnInfo.token }"
            action="http://up-z0.qiniu.com"
            :show-file-list="false"
            :on-success="successSwiper">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <img @click="handleRemove(i)" v-for="(item, i) in ruleForm.carouselUrl" :key="i" :src="item" class="img" alt="">
          </div>

        </el-form-item>
        <el-form-item prop="desc" label="课程详情">
          <div class="info">
            <div>
              <div ref="editor" style="text-align:left"></div>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="outline" label="课程大纲">
          <div class="info">
            <div ref="editor1" style="text-align:left"></div>
          </div>
        </el-form-item>
        <el-form-item label="上下架" prop="status">
          <el-radio v-model="ruleForm.status" label="ON_SALE">上架</el-radio>
          <el-radio v-model="ruleForm.status" label="disable">下架</el-radio>
        </el-form-item>
      </el-form>
      <div class="bo mar">
        <!-- <el-button type="primary">预览</el-button> -->
        <el-button type="primary" @click="createdSchool()">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Course, Teacher, Account } from "api"
import E from "wangeditor"

import { uploadInit } from "utils"
import { mapState } from "vuex"
export default {
  data () {
    return {
      ruleForm: {
        ad: "",
        carouselUrl: [],
        coverUrl: "",
        desc: "",
        gradeId: "",
        name: "",
        notes: "",
        outline: "",
        plan: "",
        price: "",
        status: "",
        subjectId: "",
        teacherIds: "",
        termId: "",
        classQty: "",
        modeId: ""
      },
      price: 0,
      filter: {
        offset: 0,
        limit: 100000,
        name: "",
        subjectId: "",
        gradeId: "",
        status: ""
      },
      teacherIds: [],
      editor1: "",
      editor: "",
      teachers: [],
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "change" }],
        ad: [{ required: true, message: "请输入广告语", trigger: "change" }],
        subjectId: [{ required: true, message: "请选择学科", trigger: "change" }],
        gradeId: [{ required: true, message: "请选择年级", trigger: "change" }],
        termId: [{ required: true, message: "请选择所属学期", trigger: "change" }],
        notes: [{ required: true, message: "请输入备注信息", trigger: "change" }],
        coverUrl: [{ required: true, message: "请上传缩略图", trigger: "change" }],
        carouselUrl: [{ required: true, message: "请上传顶部轮播", trigger: "change" }],
        desc: [{ required: true, message: "请输入课程详情", trigger: "change" }],
        outline: [{ required: true, message: "请输入课程大纲", trigger: "change" }],
        status: [{ required: true, message: "请选择上下架", trigger: "change" }],
        classQty: [{ required: true, message: "请输入课次", trigger: "change" }],
        modeId: [{ required: true, message: "请选择授课模式", trigger: "change" }],
        price: [{ required: true, message: "价格不能为空" }, { type: "number", message: "价格为数字值" }]
      }
    }
  },

  computed: {
    ...mapState({
      QiuniuToken: state => state.Account.QnInfo.token,
      QiuniuDomain: state => state.Account.QnInfo.domainName
    })
  },

  watch: {
    price (n) {
      this.ruleForm.price = n * 100
    }
  },

  async mounted () {
    if (this.$route.query.id) {
      let res = await Course.querySchoolDetail(this.$route.query.id)
      this.ruleForm = res.data
      this.teacherIds = this.ruleForm.teachers ? this.ruleForm.teachers.map(item => item.id) : []
      this.ruleForm.desc = this.ruleForm.desc ? this.ruleForm.desc : ""
      this.ruleForm.outline = this.ruleForm.outline ? this.ruleForm.outline : ""
      this.price = this.ruleForm.price / 100
    }
    let res = await Account.queryQnToken()
    this.$store.commit("Account/QUERY_QTOKEN", res.data)
    this.remoteMethod()
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

    this.editor1 = new E(this.$refs.editor1)
    // 使用 base64 保存图片
    this.editor1.customConfig.uploadImgShowBase64 = false

    // 隐藏“网络图片”tab
    this.editor1.customConfig.showLinkImg = false

    // 允许上传到七牛云存储
    this.editor1.customConfig.qiniu = true

    this.editor1.create()
    if (this.$route.query.id) {
      this.editor1.txt.html(this.ruleForm.outline)
    }
    uploadInit({
      token: this.QiuniuToken,
      domain: this.QiuniuDomain
    })(this.editor1)
  },

  methods: {
    async createdSchool () {
      try {
        this.ruleForm.desc = this.editor.txt.html()
        this.ruleForm.outline = this.editor1.txt.html()
        await this.$refs["ruleForm"].validate()
        // this.ruleForm.teacherIds = this.$route.query.id ? this.teacherIds.map(item => item.id).join(":") : this.teacherIds.join(":")
        this.ruleForm.teacherIds = this.teacherIds.join(":")
        console.log(this.ruleForm.teacherIds)
        // console.log(this.teacherIds.join(":"))
        await Course.createdSchool(this.ruleForm)
        this.$message.success("成功")
        this.$router.push("course")
      } catch (err) {
        console.log(err)
        this.ruleForm.teacherIds = []
      }
    },

    async remoteMethod (query) {
      // this.filter.name = query
      let res = await Teacher.querySchool(this.filter)
      this.teachers = res.data
    },

    successFile (e) {
      this.ruleForm.coverUrl = this.$store.state.Account.QnInfo.domainName + e.key
    },

    successSwiper (e) {
      this.ruleForm.carouselUrl.push(this.$store.state.Account.QnInfo.domainName + e.key)
    },

    async handleRemove (i) {
      await this.$confirm("确定删除该轮播图")
      this.ruleForm.carouselUrl.splice(i, 1)
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  padding: 50px 10%;
  color: #626262;
}
.formInlines {
  .demo-form-inline {
    display: flex;
    justify-content: space-between;
    .grade-margin {
      margin-right: 0;
    }
  }
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
.to {
  border-top: 1px solid #ebebeb;
  padding-top: 30px;
}
.info {
  display: flex;
}
.deta {
  width: 200px;
}
.img {
  width: 100px;
  height: 100px;
  margin-left: 10px;
}
.swo {
  display: flex;
  align-items: center;
}
</style>
