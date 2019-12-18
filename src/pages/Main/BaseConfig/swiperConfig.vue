<template>
  <div class="box">
    <header-tit img="swiperT.png" tit="首页轮播列表"/>
    <div class="top">
      <div class="add">
        <el-button type="primary" @click="showDiaLog()">新增</el-button>
      </div>
       
    </div>
    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img class="img" :src="scope.row.adUrl" alt>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
      <el-table-column label="排序" prop="order"></el-table-column>
      <el-table-column label="使用状态">
        <template slot-scope="scope">
          <div class="blue" v-if="scope.row.status == 'enable'">使用中</div>
          <div class="red" v-if="scope.row.status == 'disable'">禁用</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showDiaLog(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteSchool(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增 首页广告轮播图" :visible.sync="diaLog">
      <el-form v-if="ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="新广告图片" prop="adUrl">
          <el-upload
            class="avatar-uploader"
            :data="{ token: $store.state.Account.QnInfo.token }"
            action="http://up-z0.qiniu.com"
            :show-file-list="false"
            :on-success="successFile"
          >
            <img v-if="ruleForm.adUrl" :src="ruleForm.adUrl" class="img">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div style="color:#F55D54">
            PNG，GIF
            上传大小：1920*500
          </div>
        </el-form-item>
        <el-form-item label="原广告图片" v-if="ruleForm.id">
          <img class="img" :src="ruleForm.adUrl" alt>
        </el-form-item>
        <el-form-item label="显示描述" prop="desc">
          <el-input v-model="ruleForm.desc" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="访问url" prop="redirectUrl">
          <el-input v-model="ruleForm.redirectUrl" placeholder="请输入访问url"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" prop="order">
          <el-input v-model="ruleForm.order" placeholder="请输入显示顺序"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-radio v-model="ruleForm.status" label="enable">启用</el-radio>
          <el-radio v-model="ruleForm.status" label="disable">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button class="btn" type="primary" @click="createdBanner()">提交</el-button>
      </div>
    </el-dialog>
    <div class="pat">
      <el-pagination
        v-if="count"
        background
        layout="prev, pager, next"
        :page-size="filter.limit"
        @current-change="currentPage"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { BaseConfig, Account } from "api"

const RuleForm = function () {
  return {
    adUrl: "",
    desc: "",
    order: "",
    redirectUrl: "",
    status: ""
  }
}

export default {
  data () {
    return {
      tableData3: [],
      filter: {
        offset: 0,
        limit: 10,
        status: "ALL"
      },
      ruleForm: null,
      diaLog: false,
      rules: {
        adUrl: [
          { required: true, message: "请上传新广告图片", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请输入显示描述", trigger: "change" }
        ],
        redirectUrl: [
          { required: true, message: "请输入访问url", trigger: "change" }
        ],
        order: [
          { required: true, message: "请输入显示顺序", trigger: "change" }
        ],
        status: [
          { required: true, message: "请选择是否启用", trigger: "change" }
        ]
      },

      count: 0
    }
  },

  async created () {
    this.queryBanner()
    let res = await Account.queryQnToken()
    this.$store.commit("Account/QUERY_QTOKEN", res.data)
  },

  methods: {
    async queryBanner () {
      let res = await BaseConfig.queryBanner(this.filter)
      this.tableData3 = res.data
      this.count = res.count
    },

    async deleteSchool (id) {
      await this.$confirm("确认要执行此操作吗")
      await BaseConfig.deleteBanner(id ? [id] : this.ids)
      this.queryBanner()
    },

    async createdBanner () {
      await this.$refs["ruleForm"].validate()
      await BaseConfig.createdBanner(this.ruleForm)
      this.$message.success("创建成功")
      this.diaLog = false
      this.queryBanner()
    },

    async showDiaLog (id) {
      if (id) {
        let { data } = await BaseConfig.queryBannerDetail(id)
        this.ruleForm = data
      } else {
        this.ruleForm = new RuleForm()
      }
      this.diaLog = true
    },

    successFile (e) {
      this.ruleForm.adUrl = this.$store.state.Account.QnInfo.domainName + e.key
    },

     currentPage (e) {
      this.filter.offset = e * this.filter.limit - 1
      this.queryBanner()
    },
  }
}
</script>
<style lang="less" scoped>
.add {
  color: #656565;
  font-size: 15px;
  text-align: right;
  margin: 20px 0;
  margin-right: 20px;
}
.top {
  margin-top: 20px;
  background: white;
}
.blue {
  color: rgb(90, 170, 220);
}
.red {
  color: rgb(245, 90, 85);
}
.btn {
  width: 0.9rem;
}
.el-dialog {
  background: #f5f8fd;
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
.img {
  width: 100px;
  height: 100px;
}
</style>
