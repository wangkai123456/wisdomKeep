<template>
  <div class="box">
    <header-tit img="newT.png" tit="新闻咨询" back="1"/>
    <div class="content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="绑定栏目" prop="columnId">
          <el-select v-model="ruleForm.columnId" placeholder="请选择">
            <el-option
              v-for="(item, i) in $store.state.BaseConfig.colums"
              :key="i"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章名称" prop="title">
          <el-input class="fi" v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章来源" prop="source">
          <el-input class="fi" v-model="ruleForm.source"></el-input>
        </el-form-item>
        <el-form-item label="作　　者" prop="author">
          <el-input class="fi" v-model="ruleForm.author"></el-input>
        </el-form-item>
        <el-form-item label="简　　介" prop="intro">
          <el-input class="fi" v-model="ruleForm.intro"></el-input>
        </el-form-item>
        <div class="to">
          <el-form-item prop="richText" label="文章内容">
            <div class="info">
              <div ref="editor" style="text-align:left"></div>
            </div>
          </el-form-item>
        </div>
        <el-form-item label="封面图片" prop="coverUrl">
          <!-- <upload-img /> -->
          <el-upload
            class="avatar-uploader"
            :data="{ token: $store.state.Account.QnInfo.token }"
            action="http://up-z0.qiniu.com"
            :show-file-list="false"
            :on-success="successFile1"
          >
            <img v-if="ruleForm.coverUrl" :src="ruleForm.coverUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传附件" prop="attachUrl">
          <el-upload
            :data="{ token: $store.state.Account.QnInfo.token }"
            class="upload-demo"
            action="http://up-z0.qiniu.com"
            :limit="1"
            :on-success="successFile"
            :file-list="names"
            :on-change="handleChange"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="bo mar">
        <el-button type="primary" @click="createdMsg('ON')">保存并签发</el-button>
        <el-button type="primary" @click="createdMsg('draft')">保存文章</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { NewMsg, Account } from "api"
import { uploadInit } from "utils"
import { mapState  } from "vuex"
import E from "wangeditor"
export default {
  computed: {
    ...mapState({
      QiuniuToken: state => state.Account.QnInfo.token,
      QiuniuDomain: state => state.Account.QnInfo.domainName
    })
  },
  data () {
    return {
      ruleForm: {
        attachUrl: "",
        author: "",
        columnId: "",
        richText: "",
        source: "",
        status: "",
        title: "",
        webName: "",
        intro: "",
        coverUrl: ""
      },
      name: "",
      names: [],
      editor: "",
      fileList: [],
      rules: {
        attachUrl: [
          { required: true, message: "请上传附件", trigger: "change" }
        ],
        intro: [{ required: true, message: "请输入简介", trigger: "change" }],

        author: [{ required: true, message: "请输入作者", trigger: "change" }],
        columnId: [
          { required: true, message: "请选择栏目", trigger: "change" }
        ],
        richText: [
          { required: true, message: "请输入文章内容", trigger: "change" }
        ],
        source: [
          { required: true, message: "请输入文章来源", trigger: "change" }
        ],
        title: [
          { required: true, message: "请输入文章名称", trigger: "change" }
        ],
        coverUrl: [
          { required: true, message: "请选择封面图", trigger: "change" }
        ]
      }
    }
  },

  async created () {

  },

  async mounted () {
    if (this.$route.query.id) {
      let { data } = await NewMsg.queryMsgDetai(this.$route.query.id)
      this.ruleForm = data
      this.names = [{ name: data.webName, url: data.attachUrl }]
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
      this.editor.txt.html(this.ruleForm.richText)
    }
    uploadInit({
      token: this.QiuniuToken,
      domain: this.QiuniuDomain
    })(this.editor)
  },

  methods: {
    async createdMsg (status) {
      this.ruleForm.richText = this.editor.txt.html()
      await this.$refs["ruleForm"].validate()
      this.ruleForm.status = status
      await NewMsg.createdMsg(this.ruleForm)
      this.$message.success("成功")
      this.$router.push("newMsg")
    },

    successFile (e) {
      this.ruleForm.attachUrl =
        this.$store.state.Account.QnInfo.domainName + e.key
      this.names = [
        { name: this.ruleForm.webName, url: this.ruleForm.attachUrl }
      ]
    },

    successFile1 (e) {
      this.ruleForm.coverUrl =
        this.$store.state.Account.QnInfo.domainName + e.key
    },

    handleChange (e) {
      this.ruleForm.webName = e.name
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 50px 10%;
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
.el-upload-list {
  width: 300px;
}
</style>
